#!/usr/bin/env python3
"""
AI 新闻自动抓取脚本
从多个 RSS 源获取 AI 相关新闻，生成 Hexo 格式的 Markdown 文章。
"""

import feedparser
import hashlib
import json
import os
import re
from datetime import datetime, timedelta
from pathlib import Path

# ── 配置 ──────────────────────────────────────────────────────────────────────

RSS_FEEDS = [
    {"name": "机器之心", "url": "https://www.jiqizhixin.com/rss", "lang": "zh"},
    {"name": "InfoQ", "url": "https://www.infoq.cn/feed", "lang": "zh"},
    {"name": "Hacker News", "url": "https://hnrss.org/newest?q=AI+OR+LLM+OR+GPT+OR+machine+learning", "lang": "en"},
    {"name": "The Verge", "url": "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml", "lang": "en"},
    {"name": "MIT Tech Review", "url": "https://www.technologyreview.com/feed/", "lang": "en"},
    {"name": "ArXiv AI", "url": "http://export.arxiv.org/rss/cs.AI", "lang": "en"},
]

MAX_NEWS_PER_DAY = 20
DEDUP_FILE = "tools/news_history.json"
OUTPUT_DIR = "source/_posts"
JSON_OUTPUT = "source/data/latest-news.json"
CATEGORY = "AI新闻"


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

    # 清理 HTML 标签
    text = clean_html(text)

    # 移除 Hacker News 的无用信息
    if source == "Hacker News":
        hn_patterns = [
            r'Article URL:\s*https?://\S+',
            r'Comments URL:\s*https?://\S+',
            r'Points:\s*\d+',
            r'#\s*Comments:\s*\d+',
        ]
        for pattern in hn_patterns:
            text = re.sub(pattern, '', text)

    # 清理多余空白和标点
    text = re.sub(r'\s+', ' ', text).strip()
    text = re.sub(r'^[\s\-:：,，]+', '', text)
    text = re.sub(r'[\s\-:：,，]+$', '', text)

    # 如果清理后内容太短，返回空
    if len(text) < 15:
        return ""

    return text[:250]


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
                # 尝试从多个字段获取摘要
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

    # 按来源分组
    by_source = {}
    for entry in entries:
        source = entry["source"]
        if source not in by_source:
            by_source[source] = []
        by_source[source].append(entry)

    # 从每个来源选取新闻，确保多样性
    unique = []
    per_source = max(3, MAX_NEWS_PER_DAY // len(by_source)) if by_source else MAX_NEWS_PER_DAY

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


# ── Markdown 生成 ─────────────────────────────────────────────────────────────

def generate_markdown(entries: list) -> str:
    """生成一篇 Hexo 文章，包含当日所有新闻"""
    today = datetime.now()
    date_str = today.strftime("%Y-%m-%d")
    title = f"AI 日报 - {date_str}"

    front_matter = f"""---
title: "{title}"
date: {today.strftime("%Y-%m-%d %H:%M:%S")}
description: "每日 AI 行业新闻速递，涵盖 AI 技术、大模型、行业应用等领域。"
categories: {CATEGORY}
tags: [AI, 新闻, 日报, LLM]
top_img: /img/core/bkgnd.jpg
cover: /img/core/bkgnd.jpg
---
"""

    body = f"\n# {title}\n\n"
    body += f"> 本文由脚本自动生成，共收录 {len(entries)} 条 AI 相关资讯。\n\n"

    for i, entry in enumerate(entries, 1):
        summary = clean_html(entry["summary"])
        lang_text = "中文" if entry["lang"] == "zh" else "英文"
        body += f"## {i}. {entry['title']}\n\n"
        body += f"**来源**: {entry['source']} | **语言**: {lang_text}\n\n"
        if summary:
            body += f"{summary}\n\n"
        body += f"[阅读原文]({entry['link']})\n\n"
        body += "---\n\n"

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
        summary = entry["summary"] if entry["summary"] else "暂无摘要，点击阅读原文查看完整内容"
        data["items"].append({
            "title": entry["title"],
            "link": entry["link"],
            "summary": summary,
            "source": entry["source"],
            "lang": entry["lang"]
        })
    return json.dumps(data, ensure_ascii=False, indent=2)


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
