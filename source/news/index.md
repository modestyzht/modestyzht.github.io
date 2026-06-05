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

## 最新资讯

<div id="news-loading" style="text-align: center; padding: 40px; color: #666;">
  <i class="fas fa-spinner fa-spin"></i> 正在加载最新新闻...
</div>

<div id="news-container"></div>

<div id="news-archive" style="margin-top: 30px; text-align: center;">
  <a href="/categories/AI新闻/" class="btn">查看历史新闻 →</a>
</div>

<style>
.news-card {
  padding: 24px;
  margin-bottom: 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border: 1px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 4px 12px rgba(138, 138, 138, 0.1);
  transition: all 0.3s ease;
}
.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(73, 177, 245, 0.2);
  border-color: rgba(73, 177, 245, 0.3);
}
.news-card h3 {
  margin: 0 0 12px 0;
  font-size: 1.2rem;
  font-weight: 600;
}
.news-card h3 a {
  color: #2c3e50;
  text-decoration: none;
}
.news-card h3 a:hover {
  color: #49b1f5;
}
.news-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 10px;
  font-size: 0.85rem;
  color: #666;
}
.news-meta i {
  margin-right: 4px;
}
.news-summary {
  color: #555;
  line-height: 1.7;
  font-size: 0.95rem;
}
.news-link {
  display: inline-block;
  margin-top: 12px;
  color: #49b1f5;
  font-size: 0.9rem;
}
.news-link:hover {
  text-decoration: underline;
}
html[data-theme="dark"] .news-card {
  background: rgba(30, 30, 30, 0.6);
  border-color: rgba(255, 255, 255, 0.08);
}
html[data-theme="dark"] .news-card h3 a {
  color: #c0c0c0;
}
html[data-theme="dark"] .news-meta {
  color: #999;
}
html[data-theme="dark"] .news-summary {
  color: #aaa;
}
</style>

<script>
fetch('/data/latest-news.json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('news-loading').style.display = 'none';
    const container = document.getElementById('news-container');
    if (!data.items || data.items.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:#666;">暂无新闻</p>';
      return;
    }
    let html = `<p style="color:#666;margin-bottom:20px;">更新时间：${data.updated} | 共 ${data.count} 条资讯</p>`;
    data.items.forEach((item, i) => {
      const lang = item.lang === 'zh' ? '中文' : '英文';
      html += `
        <div class="news-card">
          <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
          <div class="news-meta">
            <span><i class="fas fa-globe"></i> ${item.source}</span>
            <span><i class="fas fa-language"></i> ${lang}</span>
          </div>
          <p class="news-summary">${item.summary}</p>
          <a class="news-link" href="${item.link}" target="_blank">阅读原文 →</a>
        </div>
      `;
    });
    container.innerHTML = html;
  })
  .catch(() => {
    document.getElementById('news-loading').innerHTML = '<p style="color:#999;">暂无新闻数据，请等待每日自动更新。</p>';
  });
</script>
