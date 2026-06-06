#!/usr/bin/env python3
"""
AI 新闻自动抓取脚本
从多个 RSS 源获取 AI 相关新闻，抓取完整内容，生成 Hexo 格式的 Markdown 文章。
"""

import feedparser
import hashlib
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
    """生成一篇 Hexo 文章，包含每篇新闻的完整内容"""
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
    body += f"> 本文由脚本自动生成，共收录 {len(entries)} 条 AI 相关资讯。\n\n"

    # 生成目录
    body += "## 目录\n\n"
    for i, entry in enumerate(entries, 1):
        body += f"{i}. [{entry['title']}](#{i})\n"
    body += "\n---\n\n"

    # 生成每篇文章
    for i, entry in enumerate(entries, 1):
        lang_text = "中文" if entry["lang"] == "zh" else "英文"
        body += f"<h2 id=\"{i}\">{i}. {entry['title']}</h2>\n\n"
        body += f"**来源**: {entry['source']} | **语言**: {lang_text} | "
        body += f"[原文链接]({entry['link']})\n\n"

        if entry.get("content"):
            body += entry["content"]
        elif entry.get("summary"):
            body += f"> {entry['summary']}\n\n"
            body += f"*（无法获取完整内容，请点击原文链接阅读）*\n"
        else:
            body += f"*（无法获取内容，请点击原文链接阅读）*\n"

        body += "\n\n---\n\n"

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

def strip_old_daily_frontmatter():
    """移除旧 AI 日报的 front-matter，使首页只展示最新一篇"""
    today_file = f"ai-daily-{datetime.now().strftime('%Y-%m-%d')}.md"
    for fname in os.listdir(OUTPUT_DIR):
        if not fname.startswith("ai-daily-") or not fname.endswith(".md"):
            continue
        if fname == today_file:
            continue
        filepath = os.path.join(OUTPUT_DIR, fname)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        # 匹配开头的 front-matter 块
        match = re.match(r'^---\s*\n.*?\n---\s*\n', content, re.DOTALL)
        if match:
            new_content = content[match.end():]
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"[Clean] Stripped front-matter: {fname}")


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

    # 移除旧日报的 front-matter
    strip_old_daily_frontmatter()

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
