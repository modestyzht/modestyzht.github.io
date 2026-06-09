#!/usr/bin/env python3
"""
AI 新闻自动抓取脚本
从多个 RSS 源获取 AI 相关新闻，抓取完整内容，生成 Hexo 格式的 Markdown 文章。
"""

import feedparser
import hashlib
import html
import json
import os
import re
import requests
from datetime import datetime, timedelta
from bs4 import BeautifulSoup
from markdownify import markdownify as md

# ── 配置 ──────────────────────────────────────────────────────────────────────

RSS_FEEDS = [
    {"name": "机器之心", "url": "https://www.jiqizhixin.com/rss", "lang": "zh"},
    {"name": "InfoQ", "url": "https://www.infoq.cn/feed", "lang": "zh"},
    {"name": "Hacker News", "url": "https://hnrss.org/newest?q=AI+OR+LLM+OR+GPT+OR+machine+learning", "lang": "en"},
    {"name": "The Verge", "url": "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml", "lang": "en"},
    {"name": "MIT Tech Review", "url": "https://www.technologyreview.com/feed/", "lang": "en"},
    {"name": "ArXiv AI", "url": "http://export.arxiv.org/rss/cs.AI", "lang": "en"},
]

MAX_NEWS_PER_DAY = 10  # 减少数量，因为每篇都会抓取完整内容
DEDUP_FILE = "tools/news_history.json"
OUTPUT_DIR = "source/_posts"
JSON_OUTPUT = "source/data/latest-news.json"
CATEGORY = "AI新闻"

# 请求头
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}


# ── 工具函数 ──────────────────────────────────────────────────────────────────

def clean_html(text: str) -> str:
    """清理 HTML 标签和多余空白"""
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def escape_html(value: str) -> str:
    """转义用于 HTML 片段的文本"""
    return html.escape(str(value or ""), quote=True)


def normalize_spaces(value: str) -> str:
    """压缩空白，便于生成摘要和卡片文案"""
    return re.sub(r'\s+', ' ', str(value or "")).strip()


def strip_markdown(text: str) -> str:
    """把抓取到的 Markdown 内容尽量转成纯文本摘要"""
    text = str(text or "")
    text = re.sub(r'```.*?```', ' ', text, flags=re.S)
    text = re.sub(r'!\[[^\]]*\]\([^)]+\)', ' ', text)
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)
    text = re.sub(r'[#>*_`~\-\|]+', ' ', text)
    return clean_html(text)


def shorten_text(text: str, limit: int = 180) -> str:
    """生成固定长度以内的短摘要"""
    text = normalize_spaces(text)
    if len(text) <= limit:
        return text
    return text[:limit].rstrip(" ,，。.;；:：") + "..."


def entry_brief(entry: dict, limit: int = 180) -> str:
    """优先使用 RSS 摘要，缺失时从正文中提取速览摘要"""
    source_text = entry.get("summary") or strip_markdown(entry.get("content", ""))
    return shorten_text(source_text, limit) or "暂无摘要，建议展开查看原文信息。"


def demote_markdown_headings(content: str) -> str:
    """避免折叠详情里的原文标题进入页面 TOC"""
    return re.sub(r'(?m)^(#{1,6})\s+(.+?)\s*$', r'**\2**', str(content or ""))


def render_daily_styles() -> str:
    """生成日报内嵌样式，让折叠内容在主题中保持可读"""
    return """<style>
.ai-daily-overview {
  display: grid;
  gap: 0.75rem;
  margin: 1rem 0 2rem;
}
.ai-daily-card {
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr) auto;
  gap: 0.75rem;
  align-items: start;
  padding: 0.85rem 1rem;
  border: 1px solid rgba(71, 85, 105, 0.18);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.72);
  color: inherit !important;
  text-decoration: none !important;
}
.ai-daily-card:hover,
.ai-daily-item:hover {
  border-color: rgba(37, 99, 235, 0.42);
}
.ai-daily-index,
.ai-daily-summary-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.1);
  color: #1d4ed8;
  font-weight: 700;
  font-size: 0.86rem;
}
.ai-daily-card-main {
  min-width: 0;
}
.ai-daily-card-title,
.ai-daily-summary-title {
  display: block;
  color: inherit;
  font-weight: 700;
  line-height: 1.45;
}
.ai-daily-card-summary {
  display: block;
  margin-top: 0.28rem;
  color: #64748b;
  line-height: 1.65;
  font-size: 0.94rem;
}
.ai-daily-card-meta,
.ai-daily-summary-meta {
  color: #0f766e;
  font-size: 0.84rem;
  white-space: nowrap;
}
.ai-daily-item {
  margin: 1rem 0;
  padding: 0.85rem 1rem;
  border: 1px solid rgba(71, 85, 105, 0.18);
  border-radius: 8px;
  background: rgba(248, 250, 252, 0.82);
}
.ai-daily-item summary {
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr) auto auto;
  gap: 0.75rem;
  align-items: center;
  cursor: pointer;
  list-style: none;
}
.ai-daily-item summary::-webkit-details-marker {
  display: none;
}
.ai-daily-item summary::after {
  content: "展开";
  justify-self: end;
  color: #b45309;
  font-size: 0.84rem;
  font-weight: 700;
}
.ai-daily-item[open] summary::after {
  content: "收起";
}
.ai-daily-item-brief {
  margin: 1rem 0;
  padding: 0.75rem 0.9rem;
  border-left: 3px solid #2563eb;
  background: rgba(37, 99, 235, 0.06);
  color: #475569;
  line-height: 1.75;
}
.ai-daily-item-meta {
  color: #64748b;
  font-size: 0.92rem;
}
[data-theme="dark"] .ai-daily-card,
[data-theme="dark"] .ai-daily-item {
  border-color: rgba(148, 163, 184, 0.22);
  background: rgba(15, 23, 42, 0.68);
}
[data-theme="dark"] .ai-daily-card-summary,
[data-theme="dark"] .ai-daily-item-brief,
[data-theme="dark"] .ai-daily-item-meta {
  color: #cbd5e1;
}
[data-theme="dark"] .ai-daily-card-meta,
[data-theme="dark"] .ai-daily-summary-meta {
  color: #5eead4;
}
@media (max-width: 640px) {
  .ai-daily-card {
    grid-template-columns: 2.6rem minmax(0, 1fr);
  }
  .ai-daily-card-meta {
    grid-column: 2;
    justify-self: start;
  }
  .ai-daily-item summary {
    grid-template-columns: 2.6rem minmax(0, 1fr) auto;
  }
  .ai-daily-summary-meta {
    grid-column: 2;
    justify-self: start;
  }
}
</style>
"""


def extract_summary(text: str, source: str) -> str:
    """提取并清理摘要内容"""
    if not text:
        return ""

    text = clean_html(text)

    if source == "Hacker News":
        hn_patterns = [
            r'Article URL:\s*https?://\S+',
            r'Comments URL:\s*https?://\S+',
            r'Points:\s*\d+',
            r'#\s*Comments:\s*\d+',
        ]
        for pattern in hn_patterns:
            text = re.sub(pattern, '', text)

    text = re.sub(r'\s+', ' ', text).strip()
    text = re.sub(r'^[\s\-:：,，]+', '', text)
    text = re.sub(r'[\s\-:：,，]+$', '', text)

    if len(text) < 15:
        return ""

    return text[:250]


def fetch_article_content(url: str) -> str:
    """抓取文章完整内容并转换为 Markdown"""
    try:
        response = requests.get(url, headers=HEADERS, timeout=15)
        response.raise_for_status()
        response.encoding = response.apparent_encoding or 'utf-8'

        soup = BeautifulSoup(response.text, 'html.parser')

        # 移除无用元素
        for tag in soup.find_all(['script', 'style', 'nav', 'header', 'footer', 'aside', 'iframe']):
            tag.decompose()

        # 尝试找到文章主体
        article = None
        # 常见的文章容器选择器
        selectors = [
            'article',
            '[class*="article"]',
            '[class*="post"]',
            '[class*="content"]',
            '[class*="story"]',
            'main',
            '.entry-content',
            '#content',
        ]
        for selector in selectors:
            article = soup.select_one(selector)
            if article and len(article.get_text(strip=True)) > 200:
                break

        if not article:
            article = soup.find('body')

        if not article:
            return ""

        # 转换为 Markdown
        content = md(str(article), heading_style="ATX", strip=['img'])

        # 清理 Markdown
        content = re.sub(r'\n{3,}', '\n\n', content)
        content = content.strip()

        # 限制长度（避免过长）
        if len(content) > 8000:
            content = content[:8000] + "\n\n*（内容已截断）*"

        return content

    except Exception as e:
        print(f"  [WARN] Failed to fetch article: {e}")
        return ""


def load_history() -> dict:
    """加载已发布新闻的哈希记录，用于去重"""
    if os.path.exists(DEDUP_FILE):
        with open(DEDUP_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"published": []}


def save_history(history: dict):
    """保存去重记录，仅保留近 7 天"""
    cutoff = (datetime.now() - timedelta(days=7)).isoformat()
    history["published"] = [
        h for h in history["published"] if h["date"] > cutoff
    ]
    with open(DEDUP_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, ensure_ascii=False, indent=2)


# ── RSS 抓取 ──────────────────────────────────────────────────────────────────

def fetch_all_feeds() -> list:
    """从所有 RSS 源拉取条目"""
    entries = []
    for feed_config in RSS_FEEDS:
        try:
            feed = feedparser.parse(feed_config["url"])
            for entry in feed.entries[:10]:
                raw_summary = entry.get("summary", "") or entry.get("description", "")
                summary = extract_summary(raw_summary, feed_config["name"])

                entries.append({
                    "title": entry.get("title", "").strip(),
                    "link": entry.get("link", ""),
                    "summary": summary,
                    "published": entry.get("published", ""),
                    "source": feed_config["name"],
                    "lang": feed_config["lang"],
                })
            print(f"[OK] {feed_config['name']}: {len(feed.entries)} entries")
        except Exception as e:
            print(f"[WARN] Failed to fetch {feed_config['name']}: {e}")
    return entries


def deduplicate(entries: list, history: dict) -> list:
    """基于链接哈希去重，确保每个来源都有新闻"""
    seen = set(h["hash"] for h in history["published"])

    by_source = {}
    for entry in entries:
        source = entry["source"]
        if source not in by_source:
            by_source[source] = []
        by_source[source].append(entry)

    unique = []
    per_source = max(2, MAX_NEWS_PER_DAY // len(by_source)) if by_source else MAX_NEWS_PER_DAY

    for source, source_entries in by_source.items():
        count = 0
        for entry in source_entries:
            if count >= per_source:
                break
            h = hashlib.md5(entry["link"].encode()).hexdigest()
            if h not in seen:
                entry["hash"] = h
                unique.append(entry)
                history["published"].append({
                    "hash": h,
                    "date": datetime.now().isoformat()
                })
                seen.add(h)
                count += 1

    return unique[:MAX_NEWS_PER_DAY]


# ── 内容抓取 ──────────────────────────────────────────────────────────────────

def fetch_full_content(entries: list) -> list:
    """抓取每篇文章的完整内容"""
    print("\n--- Fetching full article content ---")
    for i, entry in enumerate(entries, 1):
        print(f"[{i}/{len(entries)}] {entry['title'][:50]}...")
        content = fetch_article_content(entry["link"])
        entry["content"] = content
        if content:
            print(f"  OK: {len(content)} chars")
        else:
            print(f"  SKIP: no content")
    return entries


# ── Markdown 生成 ─────────────────────────────────────────────────────────────

def generate_markdown(entries: list) -> str:
    """生成一篇 Hexo 文章：顶部速览，正文默认折叠"""
    today = datetime.now()
    date_str = today.strftime("%Y-%m-%d")
    title = f"AI 日报 - {date_str}"

    front_matter = f"""---
title: "{title}"
date: {today.strftime("%Y-%m-%d %H:%M:%S")}
description: "每日 AI 行业新闻速递，涵盖 AI 技术、大模型、行业应用等领域。"
categories: {CATEGORY}
tags: [AI, 新闻, 日报, LLM]
top_img: /img/core/ai-daily-cover.png
cover: /img/core/ai-daily-cover.png
---
"""

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

        if entry.get("content"):
            body += demote_markdown_headings(entry["content"]).strip()
        elif entry.get("summary"):
            body += f"> {entry['summary']}\n\n"
            body += f"*（无法获取完整内容，请点击原文链接阅读）*\n"
        else:
            body += f"*（无法获取内容，请点击原文链接阅读）*\n"

        body += "\n\n</details>\n\n"

    return front_matter + body


def generate_json(entries: list) -> str:
    """生成 JSON 数据文件，供前端页面加载"""
    today = datetime.now()
    data = {
        "date": today.strftime("%Y-%m-%d"),
        "updated": today.strftime("%Y-%m-%d %H:%M:%S"),
        "count": len(entries),
        "items": []
    }
    for entry in entries:
        summary = entry["summary"] if entry["summary"] else "暂无摘要"
        has_content = bool(entry.get("content"))
        data["items"].append({
            "title": entry["title"],
            "link": entry["link"],
            "summary": summary,
            "source": entry["source"],
            "lang": entry["lang"],
            "has_content": has_content
        })
    return json.dumps(data, ensure_ascii=False, indent=2)


# ── 旧日报清理 ────────────────────────────────────────────────────────────────

# ── 主流程 ────────────────────────────────────────────────────────────────────

def main():
    print("=" * 50)
    print(f"AI News Fetcher - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 50)

    history = load_history()
    entries = fetch_all_feeds()
    entries = deduplicate(entries, history)

    if not entries:
        print("No new AI news found today.")
        return

    # 抓取完整内容
    entries = fetch_full_content(entries)

    # 生成 Markdown 文章
    markdown = generate_markdown(entries)
    date_str = datetime.now().strftime("%Y-%m-%d")
    filename = f"ai-daily-{date_str}.md"
    filepath = os.path.join(OUTPUT_DIR, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(markdown)

    # 生成 JSON 数据文件
    json_dir = os.path.dirname(JSON_OUTPUT)
    if not os.path.exists(json_dir):
        os.makedirs(json_dir)
    json_content = generate_json(entries)
    with open(JSON_OUTPUT, "w", encoding="utf-8") as f:
        f.write(json_content)

    save_history(history)
    print(f"\nGenerated: {filepath}")
    print(f"Generated: {JSON_OUTPUT}")
    print(f"Total news items: {len(entries)}")


if __name__ == "__main__":
    main()
