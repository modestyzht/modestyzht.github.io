# 西北驴哥的个人博客

> 基于 [Hexo](https://hexo.io) 框架和 [Butterfly](https://butterfly.js.org) 主题构建的个人技术博客

[在线访问](https://modestyzht.github.io) | [GitHub](https://github.com/modestyzht/modestyzht.github.io)

## 项目简介

这是一个使用 Hexo 静态博客框架和 Butterfly 主题搭建的个人技术博客，专注于 Java 开发、Linux 系统和前端技术分享。博客采用毛玻璃风格设计，支持明暗主题切换，提供舒适的阅读体验。

## 主要特性

### AI 新闻日报系统
- **自动抓取**: 基于 RSS 订阅源，每天自动抓取全球 AI 领域最新资讯
- **多源聚合**: 聚合机器之心、InfoQ、Hacker News、The Verge、MIT Tech Review、ArXiv 等 6 大来源
- **智能去重**: 基于链接哈希自动去重，确保内容唯一性
- **完整内容**: 自动抓取文章全文并转换为 Markdown 格式
- **定时更新**: 通过 GitHub Actions 每天北京时间 8:00 自动更新
- **专属封面**: AI 日报配有专属封面图片，提升视觉识别度

### AI Skill 技能中心
- **25+ 热门 Skill**: 涵盖设计、前端、移动端、动画、文档、多媒体、代码工具等 7 大类
- **详细文档**: 每个 Skill 包含名称、作用、使用方法、适配工具和 GitHub 仓库
- **主流工具支持**: 兼容 Claude Code、Codex、Cursor、OpenCode、MiniMax CLI 等 AI 编码工具
- **仓库溯源**: 标注每个 Skill 的 GitHub 仓库地址和 Star 数量

### 主题与样式
- **Butterfly 主题**: 功能丰富、设计优雅的 Hexo 主题
- **毛玻璃效果**: 全局半透明模糊背景，营造现代感
- **明暗切换**: 支持亮色/暗色主题，自动适配系统偏好
- **自定义代码块**: 双色系语法高亮配色方案
- **标签云美化**: 渐变色标签云，悬停动画效果
- **分类页优化**: 卡片式分类展示，带滑入动画

### 功能配置
- **文章目录**: 自动生成目录，显示阅读进度
- **文章版权**: 自动添加 CC BY-NC-SA 4.0 版权声明
- **相关推荐**: 智能推荐相关文章
- **本地搜索**: 支持文章内容搜索
- **中英文排版**: pangu 插件自动添加中英文空格
- **运行时间**: 页脚显示网站运行时间（电子钟风格）

### 社交链接
- [GitHub](https://github.com/modestyzht/modestyzht.github.io)
- [哔哩哔哩](https://space.bilibili.com/1089540568)
- QQ邮箱: 2855935354@qq.com

## 文章内容

博客包含 21 篇技术文章，涵盖以下分类:

### AI 新闻日报 (每日更新)
- 自动抓取全球 AI 领域最新资讯
- 涵盖大模型、AI 应用、学术研究等方向
- 支持中英文双语内容
- 查看最新日报: [AI 新闻](https://modestyzht.github.io/news/)

### Java 开发 (6 篇)
- IDEA 安装及环境配置
- Java 语言基础知识
- Maven 配置
- Spring Boot 快速上手
- RESTful API + Swagger
- MyBatis Plus 快速上手

### Linux 基础 (6 篇)
- Linux 系统安装
- 基础命令指南与进阶
- Shell 入门、脚本与进阶

### 前端开发
- 微信小程序开发
- Vibe Coding 零基础入门

### 工具与方法论
- 单词记忆工具项目
- 博客入坑指南
- 模块化 PRD 方法

### AI Skill 技能中心
- **设计类**: soft-skill、redesign-skill、minimalist-skill、brutalist-skill、color-font-skill、brandkit
- **前端开发类**: frontend-dev、fullstack-dev、imagegen-frontend-web
- **移动端开发类**: react-native-dev、flutter-dev、ios-application-dev、android-native-dev
- **GSAP 动画类**: gsap-core、gsap-scrolltrigger、gsap-react
- **文档生成类**: minimax-docx、minimax-pdf、minimax-xlsx、pptx-generator
- **多媒体创作类**: minimax-music-gen、web-video-presentation、image-to-code-skill、gif-sticker-maker
- **代码工具类**: code-review、claude-api、security-review、simplify
- 查看全部技能: [AI Skill](https://modestyzht.github.io/skills/)

## 项目结构

```
modestyzht.github.io/
├── _config.yml              # Hexo 主配置
├── _config.butterfly.yml    # Butterfly 主题配置
├── package.json             # 项目依赖
├── tools/
│   ├── fetch_ai_news.py     # AI 新闻自动抓取脚本
│   └── news_history.json    # 新闻去重记录
├── source/
│   ├── _posts/              # 文章目录
│   │   ├── Java_posts/      # Java 系列文章
│   │   ├── Linux_postd/     # Linux 系列文章
│   │   └── ai-daily-*.md    # AI 日报文章
│   ├── news/                # AI 新闻日报页面
│   │   └── index.md
│   ├── skills/              # AI Skill 技能中心
│   │   └── index.md
│   ├── data/
│   │   └── latest-news.json # 最新新闻 JSON 数据
│   ├── css/
│   │   └── custom.css       # 自定义样式
│   ├── js/
│   │   └── runtime.js       # 运行时间脚本
│   ├── img/
│   │   └── core/
│   │       ├── bkgnd.jpg    # 默认背景图
│   │       └── ai-daily-cover.png  # AI 日报封面
│   ├── tags/                # 标签页
│   └── categories/          # 分类页
├── themes/
│   └── butterfly/           # Butterfly 主题
└── .github/workflows/
    ├── gh-pages.yml         # GitHub Actions 部署配置
    └── ai-news.yml          # AI 新闻自动更新配置
```

## 自定义样式说明

### 毛玻璃效果
全局卡片采用半透明背景配合模糊滤镜，明亮模式使用 `rgba(255, 255, 255, 0.85)`，暗色模式使用 `rgba(30, 30, 30, 0.6)`。

### 代码块配色
- **明亮模式**: 浅灰背景 (#f4f7fa)，蓝色关键字，绿色字符串
- **暗色模式**: 深蓝背景 (#0b0f19)，亮蓝关键字，亮绿字符串

### 标签云样式
渐变色圆形标签，带悬停上浮动画和文章数量徽标。

### 分类页样式
卡片式布局，每个分类带有独立图标和渐变色背景，子分类缩进展示。

## 本地开发

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装与运行

```bash
# 克隆项目
git clone https://github.com/modestyzht/modestyzht.github.io.git
cd modestyzht.github.io

# 安装依赖
npm install

# 启动开发服务器
npm run server

# 构建静态文件
npm run build

# 清除缓存
npm run clean
```

### 常用命令

```bash
# 创建新文章
hexo new "文章标题"

# 创建新页面
hexo new page "页面名称"

# 生成并部署
hexo generate --deploy
```

## 部署方式

### GitHub Actions 自动部署

项目使用 GitHub Actions 实现 CI/CD 自动部署:

1. 推送代码到 `main` 分支
2. GitHub Actions 自动触发构建
3. 构建产物部署到 `gh-pages` 分支
4. 通过 GitHub Pages 访问: https://modestyzht.github.io

### 手动部署

```bash
# 生成静态文件
npm run build

# 部署到 GitHub Pages
npm run deploy
```

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| [Hexo](https://hexo.io) | 8.1.2 | 静态博客框架 |
| [Butterfly](https://butterfly.js.org) | 5.0.0 | Hexo 主题 |
| [GitHub Actions](https://github.com/features/actions) | - | CI/CD 自动化 |
| [GitHub Pages](https://pages.github.com) | - | 静态网站托管 |

## 主要依赖

- hexo-generator-search - 本地搜索
- hexo-renderer-marked - Markdown 渲染
- hexo-renderer-stylus - CSS 预处理
- hexo-server - 本地预览

## 配置要点

### 网站基本信息

```yaml
# _config.yml
title: 西北驴哥
author: 驴哥
language: zh-CN
url: https://modestyzht.github.io
```

### 主题配置

```yaml
# _config.butterfly.yml
theme: butterfly
nav:
  logo: /img/glama.png
  fixed: false

aside:
  enable: true
  position: left
```

### 自定义样式引入

```yaml
# _config.butterfly.yml
inject:
  head:
    - <link rel="stylesheet" href="/css/custom.css">
  bottom:
    - <script src="https://cdnjs.cloudflare.com/ajax/libs/pangu/4.0.7/pangu.min.js"></script>
```

## 相关文档

- [Hexo 官方文档](https://hexo.io/docs/)
- [Butterfly 主题文档](https://butterfly.js.org)
- [GitHub Pages 文档](https://docs.github.com/en/pages)

## 许可证

本项目基于 [MIT License](LICENSE) 开源。

文章内容采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可协议。

## 联系方式

- GitHub: [modestyzht](https://github.com/modestyzht)
- 哔哩哔哩: [1089540568](https://space.bilibili.com/1089540568)
- 邮箱: 2855935354@qq.com
