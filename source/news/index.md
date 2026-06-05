---
title: AI 新闻
date: 2026-06-05 22:50:00
top_img: transparent
---

# AI 新闻日报

每日自动抓取全球 AI 领域最新资讯，涵盖大模型、AI 应用、学术研究等方向。

## 新闻来源

| 来源 | 说明 | 语言 |
|------|------|------|
| 机器之心 | 国内顶级 AI 媒体 | 中文 |
| InfoQ | 技术深度文章 | 中文 |
| Hacker News | 英文 AI 热帖 | 英文 |
| The Verge | 科技媒体 AI 版块 | 英文 |
| MIT Tech Review | MIT 科技评论 | 英文 |
| ArXiv | 学术论文 RSS | 英文 |

## 更新机制

新闻由 RSS 订阅源自动聚合，通过 GitHub Actions 每天北京时间 8:00 自动更新。

---

## 今日日报

<div id="news-loading" style="text-align: center; padding: 40px; color: #666;">
  <i class="fas fa-spinner fa-spin"></i> 正在加载今日日报...
</div>

<div id="news-container" style="margin-top: 20px;"></div>

<div id="news-archive" style="margin-top: 30px; text-align: center;">
  <a href="/categories/AI新闻/" class="btn">查看历史日报 →</a>
</div>

<script>
// 获取今天的日期
const today = new Date();
const dateStr = today.getFullYear() + '-' +
  String(today.getMonth() + 1).padStart(2, '0') + '-' +
  String(today.getDate()).padStart(2, '0');

// 加载今日日报
fetch(`/ai-daily-${dateStr}/`)
  .then(res => {
    if (!res.ok) throw new Error('Not found');
    return res.text();
  })
  .then(html => {
    document.getElementById('news-loading').style.display = 'none';
    // 提取文章内容
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const article = doc.querySelector('#article-container') ||
                    doc.querySelector('.post-content') ||
                    doc.querySelector('article');
    if (article) {
      document.getElementById('news-container').innerHTML = article.innerHTML;
    } else {
      throw new Error('Content not found');
    }
  })
  .catch(() => {
    // 如果今日日报不存在，显示 JSON 摘要
    fetch('/data/latest-news.json')
      .then(res => res.json())
      .then(data => {
        document.getElementById('news-loading').innerHTML =
          '<p style="color:#666;">今日日报暂未生成，以下是最新资讯摘要：</p>';
        const container = document.getElementById('news-container');
        if (!data.items || data.items.length === 0) {
          container.innerHTML = '<p style="text-align:center;color:#666;">暂无新闻</p>';
          return;
        }
        let html = '';
        data.items.forEach((item, i) => {
          const lang = item.lang === 'zh' ? '中文' : '英文';
          html += `
            <div style="padding: 20px; margin-bottom: 16px; border-radius: 10px;
                        background: rgba(255,255,255,0.85); border: 1px solid rgba(255,255,255,0.85);
                        box-shadow: 0 4px 12px rgba(138,138,138,0.1);">
              <h3 style="margin:0 0 10px 0;"><a href="${item.link}" target="_blank"
                  style="color:#2c3e50; text-decoration:none;">${item.title}</a></h3>
              <p style="margin:0 0 8px 0; font-size:0.85rem; color:#666;">
                <i class="fas fa-globe"></i> ${item.source} |
                <i class="fas fa-language"></i> ${lang}
              </p>
              <p style="margin:0; color:#555; line-height:1.7;">${item.summary}</p>
              <a href="${item.link}" target="_blank"
                 style="display:inline-block; margin-top:10px; color:#49b1f5;">阅读原文 →</a>
            </div>
          `;
        });
        container.innerHTML = html;
      })
      .catch(() => {
        document.getElementById('news-loading').innerHTML =
          '<p style="color:#999;">暂无新闻数据，请等待每日自动更新。</p>';
      });
  });
</script>
