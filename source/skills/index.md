---
title: AI Skill
date: 2026-06-06 12:00:00
top_img: transparent
---

<style>
  .skills-hero {
    text-align: center;
    padding: 60px 20px 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    margin-bottom: 40px;
    color: white;
  }
  .skills-hero h1 { font-size: 2.5rem; margin: 0 0 12px; color: white; }
  .skills-hero p { font-size: 1.1rem; opacity: 0.9; max-width: 600px; margin: 0 auto; }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 24px;
    margin-top: 30px;
  }
  .skill-card {
    background: rgba(255,255,255,0.95);
    border-radius: 14px;
    padding: 28px;
    border: 1px solid rgba(0,0,0,0.06);
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .skill-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.12);
  }
  .skill-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: var(--accent);
    border-radius: 14px 14px 0 0;
  }
  .skill-icon {
    width: 56px; height: 56px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    margin-bottom: 18px;
    background: var(--accent);
  }
  .skill-card h3 { margin: 0 0 10px; font-size: 1.2rem; color: #2c3e50; }
  .skill-card .skill-desc { margin: 0 0 16px; color: #666; line-height: 1.7; font-size: 0.95rem; }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
  .skill-tag { padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; background: #f0f2f5; color: #555; }

  .skill-meta {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 16px;
    font-size: 0.88rem;
    border: 1px solid #eef0f2;
  }
  .skill-meta code {
    background: #e9ecef;
    padding: 2px 8px;
    border-radius: 6px;
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    color: #e74c3c;
  }
  .skill-meta .meta-label {
    font-weight: 600;
    color: #555;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .skill-meta .meta-row {
    padding: 4px 0;
    color: #666;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .skill-meta .meta-row a {
    color: #49b1f5;
    text-decoration: none;
  }
  .skill-meta .meta-row a:hover {
    text-decoration: underline;
  }
  .skill-meta .tool-badge {
    display: inline-block;
    padding: 2px 10px;
    border-radius: 12px;
    font-size: 0.78rem;
    background: #e3f2fd;
    color: #1976d2;
    margin: 2px 4px 2px 0;
  }

  .section-title {
    font-size: 1.5rem;
    color: #2c3e50;
    margin: 50px 0 10px;
    padding-bottom: 12px;
    border-bottom: 2px solid #f0f2f5;
  }
  .section-desc { color: #888; margin-bottom: 30px; }

  .repo-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #49b1f5;
    font-size: 0.85rem;
    text-decoration: none;
  }
  .repo-link:hover { text-decoration: underline; }
</style>

<div class="skills-hero">
  <h1><i class="fas fa-magic"></i> AI Skill</h1>
  <p>Claude Code 生态热门 Skill 合集 —— 输入斜杠命令即可调用</p>
</div>

## <i class="fas fa-palette"></i> 设计类 {.section-title}

高端视觉设计能力，从 UI 到品牌一站式覆盖 {.section-desc}

<div class="skills-grid">
  <div class="skill-card" style="--accent: #e74c3c;">
    <div class="skill-icon"><i class="fas fa-paint-brush"></i></div>
    <h3>soft-skill</h3>
    <p class="skill-desc">高端设计方法论 Skill。定义精确的字体、间距、阴影、卡片结构和动画，让网站呈现高端 agency 质感。屏蔽常见 AI 设计廉价默认值。</p>
    <div class="skill-tags">
      <span class="skill-tag">高端 UI</span>
      <span class="skill-tag">设计系统</span>
      <span class="skill-tag">排版</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/soft-skill</code> 激活，描述你想要的页面或组件</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">Codex</span><span class="tool-badge">Cursor</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/mattpocock/skills" target="_blank">mattpocock/skills</a> · 118k ⭐</div>
    </div>
  </div>

  <div class="skill-card" style="--accent: #9b59b6;">
    <div class="skill-icon"><i class="fas fa-magic"></i></div>
    <h3>redesign-skill</h3>
    <p class="skill-desc">网站升级 Skill。审计现有设计，识别通用 AI 模式，应用高端设计标准，在不破坏功能的前提下提升视觉品质。</p>
    <div class="skill-tags">
      <span class="skill-tag">网站升级</span>
      <span class="skill-tag">设计审计</span>
      <span class="skill-tag">UI 重构</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/redesign-skill</code>，指定要升级的页面或组件</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">Codex</span><span class="tool-badge">Cursor</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/affaan-m/ECC" target="_blank">affaan-m/ECC</a> · 208k ⭐</div>
    </div>
  </div>

  <div class="skill-card" style="--accent: #3498db;">
    <div class="skill-icon"><i class="fas fa-brush"></i></div>
    <h3>minimalist-skill</h3>
    <p class="skill-desc">极简主义设计 Skill。专注于留白、排版层次和克制的视觉表达，打造高端简洁的界面风格。</p>
    <div class="skill-tags">
      <span class="skill-tag">极简</span>
      <span class="skill-tag">留白</span>
      <span class="skill-tag">排版</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/minimalist-skill</code>，描述你的设计需求</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">Codex</span><span class="tool-badge">Cursor</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/sickn33/antigravity-awesome-skills" target="_blank">antigravity-awesome-skills</a> · 39k ⭐</div>
    </div>
  </div>

  <div class="skill-card" style="--accent: #e67e22;">
    <div class="skill-icon"><i class="fas fa-pen-nib"></i></div>
    <h3>brutalist-skill</h3>
    <p class="skill-desc">粗野主义设计 Skill。大胆的排版、强烈的对比、原始的视觉张力，适合创意项目和艺术类网站。</p>
    <div class="skill-tags">
      <span class="skill-tag">粗野主义</span>
      <span class="skill-tag">大胆排版</span>
      <span class="skill-tag">艺术感</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/brutalist-skill</code>，描述你的设计需求</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">Codex</span><span class="tool-badge">Cursor</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/sickn33/antigravity-awesome-skills" target="_blank">antigravity-awesome-skills</a> · 39k ⭐</div>
    </div>
  </div>

  <div class="skill-card" style="--accent: #1abc9c;">
    <div class="skill-icon"><i class="fas fa-font"></i></div>
    <h3>color-font-skill</h3>
    <p class="skill-desc">色彩与字体 Skill。提供专业的配色方案和字体搭配建议，确保视觉一致性和品牌调性。</p>
    <div class="skill-tags">
      <span class="skill-tag">配色</span>
      <span class="skill-tag">字体搭配</span>
      <span class="skill-tag">品牌调性</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/color-font-skill</code>，描述品牌或设计方向</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">Codex</span><span class="tool-badge">Cursor</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/sickn33/antigravity-awesome-skills" target="_blank">antigravity-awesome-skills</a> · 39k ⭐</div>
    </div>
  </div>

  <div class="skill-card" style="--accent: #2ecc71;">
    <div class="skill-icon"><i class="fas fa-vector-square"></i></div>
    <h3>brandkit</h3>
    <p class="skill-desc">品牌工具包 Skill。生成完整的品牌视觉体系：Logo、配色、字体、图标风格、组件库等。</p>
    <div class="skill-tags">
      <span class="skill-tag">品牌设计</span>
      <span class="skill-tag">Logo</span>
      <span class="skill-tag">VI 系统</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/brandkit</code>，描述品牌名称和定位</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">Codex</span><span class="tool-badge">Cursor</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/nexu-io/open-design" target="_blank">nexu-io/open-design</a> · 59k ⭐</div>
    </div>
  </div>
</div>

## <i class="fas fa-code"></i> 前端开发类 {.section-title}

现代前端框架 + 高级动画，构建极致用户体验 {.section-desc}

<div class="skills-grid">
  <div class="skill-card" style="--accent: #61dafb;">
    <div class="skill-icon"><i class="fab fa-react"></i></div>
    <h3>frontend-dev</h3>
    <p class="skill-desc">全栈前端开发 Skill。结合高级 UI 设计、电影级动画、AI 媒体资产生成、文案撰写和视觉艺术，构建完整的高视觉冲击力网页。</p>
    <div class="skill-tags">
      <span class="skill-tag">React</span>
      <span class="skill-tag">动画</span>
      <span class="skill-tag">UI 设计</span>
      <span class="skill-tag">媒体生成</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/frontend-dev</code>，描述你要构建的页面功能</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">Codex</span><span class="tool-badge">Cursor</span><span class="tool-badge">OpenCode</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/angelapaia/frontend-design-engineer-skill" target="_blank">frontend-design-engineer-skill</a></div>
    </div>
  </div>

  <div class="skill-card" style="--accent: #8cc84b;">
    <div class="skill-icon"><i class="fab fa-node-js"></i></div>
    <h3>fullstack-dev</h3>
    <p class="skill-desc">全栈开发 Skill。覆盖前后端、数据库、API 设计，适合快速搭建完整 Web 应用。</p>
    <div class="skill-tags">
      <span class="skill-tag">Node.js</span>
      <span class="skill-tag">API</span>
      <span class="skill-tag">数据库</span>
      <span class="skill-tag">认证</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/fullstack-dev</code>，描述应用需求和功能</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">Codex</span><span class="tool-badge">Cursor</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/viknesh20-20/claude-code-tool-kit" target="_blank">claude-code-tool-kit</a></div>
    </div>
  </div>

  <div class="skill-card" style="--accent: #4fc08d;">
    <div class="skill-icon"><i class="fas fa-image"></i></div>
    <h3>imagegen-frontend-web</h3>
    <p class="skill-desc">Web 图像生成 Skill。为网页自动生成配图、Hero 背景、产品展示图等视觉资产。</p>
    <div class="skill-tags">
      <span class="skill-tag">图像生成</span>
      <span class="skill-tag">Web 配图</span>
      <span class="skill-tag">Hero 图</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/imagegen-frontend-web</code>，描述需要的图像内容和风格</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">Codex</span><span class="tool-badge">Cursor</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/nexu-io/open-design" target="_blank">nexu-io/open-design</a> · 59k ⭐</div>
    </div>
  </div>
</div>

## <i class="fas fa-mobile-alt"></i> 移动端开发类 {.section-title}

跨平台移动应用开发，一套代码多端运行 {.section-desc}

<div class="skills-grid">
  <div class="skill-card" style="--accent: #61dafb;">
    <div class="skill-icon"><i class="fab fa-react"></i></div>
    <h3>react-native-dev</h3>
    <p class="skill-desc">React Native 移动开发 Skill。使用 React 语法构建原生 iOS 和 Android 应用，支持热重载和原生模块集成。</p>
    <div class="skill-tags">
      <span class="skill-tag">React Native</span>
      <span class="skill-tag">iOS</span>
      <span class="skill-tag">Android</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/react-native-dev</code>，描述 App 功能需求</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">Codex</span><span class="tool-badge">Cursor</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/sickn33/antigravity-awesome-skills" target="_blank">antigravity-awesome-skills</a> · 39k ⭐</div>
    </div>
  </div>

  <div class="skill-card" style="--accent: #02569B;">
    <div class="skill-icon"><i class="fas fa-feather"></i></div>
    <h3>flutter-dev</h3>
    <p class="skill-desc">Flutter 移动开发 Skill。使用 Dart 语言和 Flutter 框架构建精美的跨平台应用。</p>
    <div class="skill-tags">
      <span class="skill-tag">Flutter</span>
      <span class="skill-tag">Dart</span>
      <span class="skill-tag">Material Design</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/flutter-dev</code>，描述 App 功能需求</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">Codex</span><span class="tool-badge">Cursor</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/sickn33/antigravity-awesome-skills" target="_blank">antigravity-awesome-skills</a> · 39k ⭐</div>
    </div>
  </div>

  <div class="skill-card" style="--accent: #007AFF;">
    <div class="skill-icon"><i class="fab fa-apple"></i></div>
    <h3>ios-application-dev</h3>
    <p class="skill-desc">iOS 原生开发 Skill。使用 Swift/SwiftUI 构建原生 iOS 应用，深度集成 Apple 生态。</p>
    <div class="skill-tags">
      <span class="skill-tag">Swift</span>
      <span class="skill-tag">SwiftUI</span>
      <span class="skill-tag">iOS</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/ios-application-dev</code>，描述 App 功能需求</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">Codex</span><span class="tool-badge">Cursor</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/sickn33/antigravity-awesome-skills" target="_blank">antigravity-awesome-skills</a> · 39k ⭐</div>
    </div>
  </div>

  <div class="skill-card" style="--accent: #3DDC84;">
    <div class="skill-icon"><i class="fab fa-android"></i></div>
    <h3>android-native-dev</h3>
    <p class="skill-desc">Android 原生开发 Skill。使用 Kotlin/Jetpack Compose 构建现代 Android 应用。</p>
    <div class="skill-tags">
      <span class="skill-tag">Kotlin</span>
      <span class="skill-tag">Jetpack Compose</span>
      <span class="skill-tag">Android</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/android-native-dev</code>，描述 App 功能需求</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">Codex</span><span class="tool-badge">Cursor</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/sickn33/antigravity-awesome-skills" target="_blank">antigravity-awesome-skills</a> · 39k ⭐</div>
    </div>
  </div>
</div>

## <i class="fas fa-film"></i> GSAP 动画类 {.section-title}

专业级网页动画引擎，打造电影般流畅体验 {.section-desc}

<div class="skills-grid">
  <div class="skill-card" style="--accent: #88ce02;">
    <div class="skill-icon"><i class="fas fa-play-circle"></i></div>
    <h3>gsap-core</h3>
    <p class="skill-desc">GSAP 核心动画 Skill。掌握 Tween、Timeline、缓动函数等核心概念，创建流畅的网页动画。</p>
    <div class="skill-tags">
      <span class="skill-tag">Tween</span>
      <span class="skill-tag">Timeline</span>
      <span class="skill-tag">缓动函数</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/gsap-core</code>，描述动画效果需求</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">Codex</span><span class="tool-badge">Cursor</span><span class="tool-badge">OpenCode</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/viknesh20-20/claude-code-tool-kit" target="_blank">claude-code-tool-kit</a></div>
    </div>
  </div>

  <div class="skill-card" style="--accent: #4CAF50;">
    <div class="skill-icon"><i class="fas fa-arrows-alt"></i></div>
    <h3>gsap-scrolltrigger</h3>
    <p class="skill-desc">GSAP 滚动触发动画 Skill。基于滚动位置触发动画，实现视差、固定、进度驱动等高级交互效果。</p>
    <div class="skill-tags">
      <span class="skill-tag">ScrollTrigger</span>
      <span class="skill-tag">视差</span>
      <span class="skill-tag">滚动动画</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/gsap-scrolltrigger</code>，描述滚动交互效果</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">Codex</span><span class="tool-badge">Cursor</span><span class="tool-badge">OpenCode</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/viknesh20-20/claude-code-tool-kit" target="_blank">claude-code-tool-kit</a></div>
    </div>
  </div>

  <div class="skill-card" style="--accent: #66BB6A;">
    <div class="skill-icon"><i class="fab fa-react"></i></div>
    <h3>gsap-react</h3>
    <p class="skill-desc">GSAP + React 集成 Skill。在 React 组件中正确使用 GSAP，处理 Refs、Cleanup 和 SSR 兼容。</p>
    <div class="skill-tags">
      <span class="skill-tag">React</span>
      <span class="skill-tag">useGSAP</span>
      <span class="skill-tag">Ref</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/gsap-react</code>，描述 React 组件动画需求</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">Codex</span><span class="tool-badge">Cursor</span><span class="tool-badge">OpenCode</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/Nyx-abu/awwwards-ui-skill" target="_blank">awwwards-ui-skill</a></div>
    </div>
  </div>
</div>

## <i class="fas fa-file-alt"></i> 文档生成类 {.section-title}

自动化文档生成，支持多种办公格式 {.section-desc}

<div class="skills-grid">
  <div class="skill-card" style="--accent: #2b579a;">
    <div class="skill-icon"><i class="fas fa-file-word"></i></div>
    <h3>minimax-docx</h3>
    <p class="skill-desc">Word 文档生成 Skill。自动创建专业格式的 .docx 文档，支持表格、图片、样式等复杂排版。</p>
    <div class="skill-tags">
      <span class="skill-tag">Word</span>
      <span class="skill-tag">报告</span>
      <span class="skill-tag">文档自动化</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/minimax-docx</code>，描述文档内容和格式要求</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">MiniMax CLI</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/sickn33/antigravity-awesome-skills" target="_blank">antigravity-awesome-skills</a> · 39k ⭐</div>
    </div>
  </div>

  <div class="skill-card" style="--accent: #d32f2f;">
    <div class="skill-icon"><i class="fas fa-file-pdf"></i></div>
    <h3>minimax-pdf</h3>
    <p class="skill-desc">PDF 文档生成 Skill。创建高质量 PDF 文件，支持自定义页面布局、字体、图表等。</p>
    <div class="skill-tags">
      <span class="skill-tag">PDF</span>
      <span class="skill-tag">排版</span>
      <span class="skill-tag">打印</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/minimax-pdf</code>，描述 PDF 内容需求</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">MiniMax CLI</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/sickn33/antigravity-awesome-skills" target="_blank">antigravity-awesome-skills</a> · 39k ⭐</div>
    </div>
  </div>

  <div class="skill-card" style="--accent: #217346;">
    <div class="skill-icon"><i class="fas fa-file-excel"></i></div>
    <h3>minimax-xlsx</h3>
    <p class="skill-desc">Excel 表格生成 Skill。创建带公式、图表、数据验证的专业 Excel 文件。</p>
    <div class="skill-tags">
      <span class="skill-tag">Excel</span>
      <span class="skill-tag">数据分析</span>
      <span class="skill-tag">报表</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/minimax-xlsx</code>，描述表格数据和结构</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">MiniMax CLI</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/sickn33/antigravity-awesome-skills" target="_blank">antigravity-awesome-skills</a> · 39k ⭐</div>
    </div>
  </div>

  <div class="skill-card" style="--accent: #d04423;">
    <div class="skill-icon"><i class="fas fa-file-powerpoint"></i></div>
    <h3>pptx-generator</h3>
    <p class="skill-desc">PPT 演示文稿生成 Skill。自动创建专业幻灯片，支持主题、动画、图表、图片等。</p>
    <div class="skill-tags">
      <span class="skill-tag">PPT</span>
      <span class="skill-tag">演示</span>
      <span class="skill-tag">幻灯片</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/pptx-generator</code>，描述演示文稿主题和内容</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">MiniMax CLI</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/sickn33/antigravity-awesome-skills" target="_blank">antigravity-awesome-skills</a> · 39k ⭐</div>
    </div>
  </div>
</div>

## <i class="fas fa-music"></i> 多媒体创作类 {.section-title}

AI 驱动的音乐、视频、图像创作 {.section-desc}

<div class="skills-grid">
  <div class="skill-card" style="--accent: #ff6b6b;">
    <div class="skill-icon"><i class="fas fa-music"></i></div>
    <h3>minimax-music-gen</h3>
    <p class="skill-desc">AI 音乐生成 Skill。根据文字描述创作音乐，支持多种风格：流行、电子、古典、嘻哈等。</p>
    <div class="skill-tags">
      <span class="skill-tag">AI 作曲</span>
      <span class="skill-tag">多风格</span>
      <span class="skill-tag">背景音乐</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/minimax-music-gen</code>，描述音乐风格、情绪、时长</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">MiniMax CLI</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/lrzniu/Minimax-skills-for-music-gen" target="_blank">Minimax-skills-for-music-gen</a></div>
      <div class="meta-row"><a href="https://github.com/HZ6112/minimax-music-skills-v2" target="_blank">minimax-music-skills-v2</a></div>
    </div>
  </div>

  <div class="skill-card" style="--accent: #9c27b0;">
    <div class="skill-icon"><i class="fas fa-video"></i></div>
    <h3>web-video-presentation</h3>
    <p class="skill-desc">网页视频演示 Skill。将文章或口播稿转化为 16:9 交互式网页演示，支持逐章点击推进、口播音频合成。</p>
    <div class="skill-tags">
      <span class="skill-tag">动态 PPT</span>
      <span class="skill-tag">口播</span>
      <span class="skill-tag">交互演示</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/web-video-presentation</code>，提供文章或口播稿内容</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">MiniMax CLI</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/sylvial928/interactive-slides" target="_blank">interactive-slides</a></div>
    </div>
  </div>

  <div class="skill-card" style="--accent: #ff9800;">
    <div class="skill-icon"><i class="fas fa-exchange-alt"></i></div>
    <h3>image-to-code-skill</h3>
    <p class="skill-desc">图像转代码 Skill。将设计稿、截图转化为 HTML/CSS 代码，支持响应式布局。</p>
    <div class="skill-tags">
      <span class="skill-tag">设计稿转代码</span>
      <span class="skill-tag">截图还原</span>
      <span class="skill-tag">响应式</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/image-to-code-skill</code>，提供设计稿图片路径</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">Codex</span><span class="tool-badge">Cursor</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/voidmatcha/ui-clone-skills" target="_blank">ui-clone-skills</a></div>
    </div>
  </div>

  <div class="skill-card" style="--accent: #00bcd4;">
    <div class="skill-icon"><i class="fas fa-film"></i></div>
    <h3>gif-sticker-maker</h3>
    <p class="skill-desc">GIF 表情包制作 Skill。创建动态 GIF 贴纸和表情包，适合社交媒体和聊天应用。</p>
    <div class="skill-tags">
      <span class="skill-tag">GIF</span>
      <span class="skill-tag">表情包</span>
      <span class="skill-tag">动画</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/gif-sticker-maker</code>，描述表情内容和风格</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">Codex</span><span class="tool-badge">Cursor</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/sickn33/antigravity-awesome-skills" target="_blank">antigravity-awesome-skills</a> · 39k ⭐</div>
    </div>
  </div>
</div>

## <i class="fas fa-code-branch"></i> 代码工具类 {.section-title}

代码质量、审查、调试一站式工具 {.section-desc}

<div class="skills-grid">
  <div class="skill-card" style="--accent: #4CAF50;">
    <div class="skill-icon"><i class="fas fa-check-double"></i></div>
    <h3>code-review</h3>
    <p class="skill-desc">代码审查 Skill。审查当前 diff，发现正确性 Bug、复用机会和效率问题。支持低/中/高三种审查力度。</p>
    <div class="skill-tags">
      <span class="skill-tag">Code Review</span>
      <span class="skill-tag">Bug 检测</span>
      <span class="skill-tag">代码质量</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/code-review</code>，添加 <code>--fix</code> 自动修复，<code>--comment</code> 发布 PR 评论</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">Codex</span><span class="tool-badge">Cursor</span><span class="tool-badge">OpenCode</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/awesome-skills/code-review-skill" target="_blank">code-review-skill</a> · 929 ⭐</div>
    </div>
  </div>

  <div class="skill-card" style="--accent: #2196F3;">
    <div class="skill-icon"><i class="fas fa-bug"></i></div>
    <h3>claude-api</h3>
    <p class="skill-desc">Claude API 开发 Skill。构建、调试和优化 Claude API 应用，支持 Prompt Caching、Tool Use 等高级特性。</p>
    <div class="skill-tags">
      <span class="skill-tag">Claude API</span>
      <span class="skill-tag">SDK</span>
      <span class="skill-tag">Prompt Caching</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/claude-api</code>，描述 API 集成需求</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">Anthropic SDK</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/anthropics/claude-code" target="_blank">anthropics/claude-code</a> · 130k ⭐</div>
    </div>
  </div>

  <div class="skill-card" style="--accent: #ff5722;">
    <div class="skill-icon"><i class="fas fa-shield-alt"></i></div>
    <h3>security-review</h3>
    <p class="skill-desc">安全审查 Skill。对当前分支的待提交变更进行安全审查，检测 OWASP Top 10 等常见漏洞。</p>
    <div class="skill-tags">
      <span class="skill-tag">安全审查</span>
      <span class="skill-tag">漏洞检测</span>
      <span class="skill-tag">OWASP</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/security-review</code>，AI 会扫描当前变更并输出安全报告</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">Codex</span><span class="tool-badge">Cursor</span><span class="tool-badge">OpenCode</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/waybarrios/opencode-power-pack" target="_blank">opencode-power-pack</a> · 374 ⭐</div>
    </div>
  </div>

  <div class="skill-card" style="--accent: #607D8B;">
    <div class="skill-icon"><i class="fas fa-compress-alt"></i></div>
    <h3>simplify</h3>
    <p class="skill-desc">代码简化 Skill。审查当前 diff 并应用修复 —— 等同于 <code>/code-review --fix</code>，自动简化和优化代码。</p>
    <div class="skill-tags">
      <span class="skill-tag">代码简化</span>
      <span class="skill-tag">自动修复</span>
      <span class="skill-tag">重构</span>
    </div>
    <div class="skill-meta">
      <div class="meta-label"><i class="fas fa-terminal"></i> 使用方法</div>
      <div class="meta-row">输入 <code>/simplify</code>，AI 会分析并自动应用简化修复</div>
      <div class="meta-label" style="margin-top:12px;"><i class="fas fa-tools"></i> 适配工具</div>
      <div><span class="tool-badge">Claude Code</span><span class="tool-badge">Codex</span><span class="tool-badge">Cursor</span><span class="tool-badge">OpenCode</span></div>
      <div class="meta-label" style="margin-top:12px;"><i class="fab fa-github"></i> 仓库</div>
      <div class="meta-row"><a href="https://github.com/waybarrios/opencode-power-pack" target="_blank">opencode-power-pack</a> · 374 ⭐</div>
    </div>
  </div>
</div>

---

<div style="text-align: center; padding: 50px 20px; color: #888; background: #f8f9fa; border-radius: 14px; margin-top: 40px;">
  <p style="font-size: 1.1rem; margin-bottom: 10px;"><i class="fas fa-terminal"></i> 使用方式</p>
  <p>在 Claude Code 中输入 <code style="background:#e9ecef; padding:4px 12px; border-radius:6px; color:#e74c3c;">/skill-name</code> 即可调用对应 Skill</p>
  <p style="font-size: 0.9rem; margin-top: 15px;">部分 Skill 需要额外配置 API Key 或依赖，请参考各仓库说明</p>
  <p style="font-size: 0.85rem; margin-top: 8px; color: #aaa;">持续更新中 · 基于 Claude Code 生态</p>
</div>
