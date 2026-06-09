---
title: 论文
date: 2026-06-06 12:00:00
top_img: transparent
type: paper
---

<style>
  .paper-hero {
    text-align: center;
    padding: 60px 20px 40px;
    background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
    border-radius: 16px;
    margin-bottom: 40px;
    color: white;
  }
  .paper-hero h1 { font-size: 2.5rem; margin: 0 0 12px; color: white; }
  .paper-hero p { font-size: 1.1rem; opacity: 0.9; max-width: 600px; margin: 0 auto; }

  .paper-grid {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
  }
  .paper-card {
    background: rgba(255,255,255,0.95);
    border-radius: 14px;
    padding: 24px 28px;
    border: 1px solid rgba(0,0,0,0.06);
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 24px;
    cursor: pointer;
    text-decoration: none !important;
    color: inherit;
  }
  .paper-card:hover {
    text-decoration: none !important;
  }
  .paper-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(102, 126, 234, 0.15);
    border-color: rgba(102, 126, 234, 0.3);
  }
  .paper-card:hover .paper-arrow {
    transform: translateX(4px);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
  .paper-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 5px;
    background: var(--accent);
    border-radius: 14px 0 0 14px;
  }
  .paper-icon {
    width: 64px; height: 64px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    color: white;
    flex-shrink: 0;
    background: var(--accent);
  }
  .paper-card-content {
    flex: 1;
    min-width: 0;
  }
  .paper-card h3 { margin: 0 0 8px; font-size: 1.15rem; color: #2c3e50; }
  .paper-card .paper-desc { margin: 0 0 12px; color: #666; line-height: 1.6; font-size: 0.93rem; }
  .paper-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
  .paper-tag { padding: 3px 10px; border-radius: 20px; font-size: 0.78rem; background: #f0f2f5; color: #555; }

  .paper-meta {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 14px 16px;
    font-size: 0.85rem;
    border: 1px solid #eef0f2;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  .paper-meta-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .paper-meta .meta-label {
    font-weight: 600;
    color: #555;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .paper-meta .meta-row {
    color: #666;
    font-size: 0.85rem;
  }
  .paper-meta .meta-row a {
    color: #49b1f5;
    text-decoration: none;
  }
  .paper-meta .meta-row a:hover {
    text-decoration: underline;
  }
  .paper-card-action {
    flex-shrink: 0;
  }

  .paper-arrow {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f0f2f5;
    color: #666;
    font-size: 1rem;
    transition: all 0.3s ease;
    flex-shrink: 0;
  }

  .section-title {
    font-size: 1.5rem;
    color: #2c3e50;
    margin: 50px 0 10px;
    padding-bottom: 12px;
    border-bottom: 2px solid #f0f2f5;
  }
  .section-desc { color: #888; margin-bottom: 30px; }
</style>

<div class="paper-hero">
  <h1><i class="fas fa-file-alt"></i> 论文</h1>
  <p>AI 领域前沿论文速递 —— 大模型、机器学习、计算机视觉等方向</p>
</div>

<div style="background: #e8f5e9; padding: 16px 20px; border-radius: 10px; margin-bottom: 30px; color: #2e7d32;">
  <i class="fas fa-info-circle"></i> <strong>说明</strong>：论文内容独立于博客文章，不会出现在归档、标签、分类中。
  论文文件存放在 <code>source/paper/papers/</code> 目录下。
</div>

## <i class="fas fa-robot"></i> 大语言模型 {.section-title}

LLM 架构、训练、对齐与应用 {.section-desc}

<div class="paper-grid">
  <a href="/paper/papers/attention-is-all-you-need.html" class="paper-card" style="--accent: #3498db;">
    <div class="paper-icon"><i class="fas fa-brain"></i></div>
    <div class="paper-card-content">
      <h3>Attention Is All You Need</h3>
      <p class="paper-desc">Transformer 架构的奠基论文，提出自注意力机制，彻底改变了 NLP 领域，成为 GPT、BERT 等模型的基础。</p>
      <div class="paper-tags">
        <span class="paper-tag">Transformer</span>
        <span class="paper-tag">自注意力</span>
        <span class="paper-tag">NLP</span>
      </div>
      <div class="paper-meta">
        <div class="paper-meta-item">
          <div class="meta-label"><i class="fas fa-users"></i> 作者</div>
          <div class="meta-row">Ashish Vaswani, Noam Shazeer 等</div>
        </div>
        <div class="paper-meta-item">
          <div class="meta-label"><i class="fas fa-calendar"></i> 发表时间</div>
          <div class="meta-row">2017 年 (NeurIPS)</div>
        </div>
      </div>
    </div>
    <div class="paper-arrow">
      <i class="fas fa-arrow-right"></i>
    </div>
  </a>
</div>

<div style="text-align: center; padding: 50px 20px; color: #888; background: #f8f9fa; border-radius: 14px; margin-top: 40px;">
  <p style="font-size: 1.1rem; margin-bottom: 10px;"><i class="fas fa-plus-circle"></i> 添加新论文</p>
  <p>在 <code style="background:#e9ecef; padding:4px 8px; border-radius:4px;">source/paper/papers/</code> 目录下创建新的 .md 文件</p>
  <p style="font-size: 0.9rem; margin-top: 10px;">使用 <code>type: paper</code> 标记 front matter</p>
</div>
