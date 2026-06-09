#!/usr/bin/env python3
"""
把旧版 AI 日报 Markdown 迁移为“今日速览 + 折叠详情”布局。
用于修复已生成的历史日报；新的日报由 fetch_ai_news.py 直接生成新版布局。
"""

from pathlib import Path
import html
import re
import sys

from fetch_ai_news import demote_markdown_headings, entry_brief, escape_html, render_daily_styles

POST_DIR = Path("source/_posts")
POST_PATTERN = "ai-daily-*.md"

FRONT_MATTER_RE = re.compile(r"\A(---\n.*?\n---\n)(.*)\Z", re.S)
H2_RE = re.compile(r'<h2 id="(\d+)">\s*(?:\d+\.\s*)?(.*?)\s*</h2>', re.S)
MD_SECTION_RE = re.compile(r"^##\s+(\d+)\.\s+(.+?)\s*$", re.M)
META_RE = re.compile(
    r"\*\*来源\*\*:\s*(.*?)\s*\|\s*\*\*语言\*\*:\s*(.*?)\s*\|\s*\[原文链接\]\((.*?)\)",
    re.S,
)
META_SIMPLE_RE = re.compile(r"\*\*来源\*\*:\s*(.*?)\s*\|\s*\*\*语言\*\*:\s*(.*?)\s*$", re.M)
READ_LINK_RE = re.compile(r"\[阅读原文\]\((.*?)\)")
DETAIL_RE = re.compile(r'(<details class="ai-daily-item"[^>]*>)(.*?)(</details>)', re.S)


def split_front_matter(text: str) -> tuple[str, str]:
    match = FRONT_MATTER_RE.match(text)
    if not match:
        raise ValueError("missing front matter")
    return match.group(1), match.group(2)


def extract_title(front_matter: str, body: str, fallback: str) -> str:
    front_title = re.search(r'^title:\s*"?([^"\n]+)"?\s*$', front_matter, re.M)
    if front_title:
        return front_title.group(1).strip()

    body_title = re.search(r"^#\s+(.+?)\s*$", body, re.M)
    if body_title:
        return body_title.group(1).strip()

    return fallback


def strip_horizontal_rules(text: str) -> str:
    text = text.strip()
    text = re.sub(r"(?m)^\s*---\s*$\s*", "", text, count=1)
    text = re.sub(r"(?m)\s*^\s*---\s*$\s*\Z", "", text)
    return text.strip()


def parse_entries(body: str) -> list[dict]:
    matches = list(H2_RE.finditer(body))
    if not matches:
        return parse_markdown_heading_entries(body)

    entries = []

    for index, match in enumerate(matches):
        next_start = matches[index + 1].start() if index + 1 < len(matches) else len(body)
        section = body[match.end():next_start].strip()
        metadata = META_RE.search(section)

        if not metadata:
            continue

        title = html.unescape(re.sub(r"\s+", " ", match.group(2)).strip())
        source = metadata.group(1).strip()
        lang_text = metadata.group(2).strip()
        link = metadata.group(3).strip()
        content = strip_horizontal_rules(section[metadata.end():])
        lang = "zh" if "中文" in lang_text else "en"

        entries.append({
            "title": title,
            "link": link,
            "summary": "",
            "source": source,
            "lang": lang,
            "content": content,
        })

    return entries


def parse_markdown_heading_entries(body: str) -> list[dict]:
    matches = list(MD_SECTION_RE.finditer(body))
    entries = []

    for index, match in enumerate(matches):
        next_start = matches[index + 1].start() if index + 1 < len(matches) else len(body)
        section = body[match.end():next_start].strip()
        metadata = META_SIMPLE_RE.search(section)
        link_match = READ_LINK_RE.search(section)

        if not metadata or not link_match:
            continue

        title = html.unescape(re.sub(r"\s+", " ", match.group(2)).strip())
        source = metadata.group(1).strip()
        lang_text = metadata.group(2).strip()
        link = link_match.group(1).strip()
        content = strip_horizontal_rules(section[metadata.end():])
        lang = "zh" if "中文" in lang_text else "en"

        entries.append({
            "title": title,
            "link": link,
            "summary": "",
            "source": source,
            "lang": lang,
            "content": content,
        })

    return entries


def demote_existing_detail_headings(text: str) -> str:
    def replace_detail(match: re.Match) -> str:
        return match.group(1) + demote_markdown_headings(match.group(2)) + match.group(3)

    return DETAIL_RE.sub(replace_detail, text)


def render_post(front_matter: str, title: str, entries: list[dict]) -> str:
    body = f"\n# {title}\n\n"
    body += f"> 本文由脚本自动生成，共收录 {len(entries)} 条 AI 相关资讯。默认展示速览，展开后阅读完整内容。\n\n"
    body += render_daily_styles()
    body += "\n## 今日速览\n\n"
    body += '<div class="ai-daily-overview">\n'

    for i, entry in enumerate(entries, 1):
        lang_text = "中文" if entry.get("lang") == "zh" else "英文"
        brief = entry_brief(entry)
        body += f'<a class="ai-daily-card" href="#news-{i}">\n'
        body += f'  <span class="ai-daily-index">{i:02d}</span>\n'
        body += '  <span class="ai-daily-card-main">\n'
        body += f'    <span class="ai-daily-card-title">{escape_html(entry.get("title"))}</span>\n'
        body += f'    <span class="ai-daily-card-summary">{escape_html(brief)}</span>\n'
        body += '  </span>\n'
        body += f'  <span class="ai-daily-card-meta">{escape_html(entry.get("source"))} / {lang_text}</span>\n'
        body += '</a>\n'

    body += '</div>\n\n'
    body += "## 详细内容\n\n"

    for i, entry in enumerate(entries, 1):
        lang_text = "中文" if entry.get("lang") == "zh" else "英文"
        brief = entry_brief(entry)
        title_html = escape_html(entry.get("title"))
        source_html = escape_html(entry.get("source"))
        link_html = escape_html(entry.get("link"))

        body += f'<details class="ai-daily-item" id="news-{i}">\n'
        body += '<summary>\n'
        body += f'  <span class="ai-daily-summary-index">{i:02d}</span>\n'
        body += f'  <span class="ai-daily-summary-title">{title_html}</span>\n'
        body += f'  <span class="ai-daily-summary-meta">{source_html} / {lang_text}</span>\n'
        body += '</summary>\n\n'
        body += f'<p class="ai-daily-item-brief">{escape_html(brief)}</p>\n\n'
        body += f'<p class="ai-daily-item-meta">来源：{source_html} | 语言：{lang_text} | <a href="{link_html}" target="_blank" rel="noopener noreferrer">原文链接</a></p>\n\n'
        body += demote_markdown_headings(entry.get("content", "")).strip()
        body += "\n\n</details>\n\n"

    return front_matter + body


def migrate_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    if 'class="ai-daily-item"' in text and "## 今日速览" in text:
        demoted_text = demote_existing_detail_headings(text)
        if demoted_text != text:
            path.write_text(demoted_text, encoding="utf-8")
            print(f"[OK] {path}: demoted detail headings")
            return True

        print(f"[SKIP] {path}")
        return False

    front_matter, body = split_front_matter(text)
    title = extract_title(front_matter, body, path.stem)
    entries = parse_entries(body)

    if not entries:
        print(f"[WARN] no entries parsed: {path}")
        return False

    path.write_text(render_post(front_matter, title, entries), encoding="utf-8")
    print(f"[OK] {path}: {len(entries)} entries")
    return True


def main() -> int:
    changed = 0
    for path in sorted(POST_DIR.glob(POST_PATTERN)):
        try:
            changed += int(migrate_file(path))
        except Exception as exc:
            print(f"[ERROR] {path}: {exc}", file=sys.stderr)
            return 1

    print(f"Changed files: {changed}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
