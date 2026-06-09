#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const OUTPUT_FILE = path.join(ROOT, "source", "data", "skills-catalog.json");
const GITHUB_API = "https://api.github.com";
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";

const CATEGORIES = [
  {
    id: "design",
    name: "设计",
    icon: "fas fa-palette",
    description: "视觉设计、品牌、排版与界面重塑",
  },
  {
    id: "frontend",
    name: "前端",
    icon: "fas fa-code",
    description: "网页、组件、交互和全栈应用",
  },
  {
    id: "mobile",
    name: "移动端",
    icon: "fas fa-mobile-alt",
    description: "iOS、Android 与跨平台移动应用",
  },
  {
    id: "animation",
    name: "动画",
    icon: "fas fa-film",
    description: "GSAP、滚动触发和复杂动效",
  },
  {
    id: "documents",
    name: "文档",
    icon: "fas fa-file-alt",
    description: "Word、PDF、Excel、PPT 自动生成",
  },
  {
    id: "creative",
    name: "创作",
    icon: "fas fa-wand-magic-sparkles",
    description: "音乐、视频、图像和演示内容",
  },
  {
    id: "code",
    name: "代码工具",
    icon: "fas fa-code-branch",
    description: "审查、调试、安全和 API 开发",
  },
];

const GITHUB_SEARCH_QUERIES = [
  '"claude code" skill in:name,description,readme',
  '"claude code" skills in:name,description,readme',
  '"codex" skills in:name,description,readme',
  '"ai agent" skills in:name,description,readme',
  '"opencode" skills in:name,description,readme',
];

function repo(owner, name) {
  return {
    owner,
    name,
    fullName: `${owner}/${name}`,
    url: `https://github.com/${owner}/${name}`,
  };
}

const CURATED_SKILLS = [
  {
    id: "soft-skill",
    name: "soft-skill",
    command: "/soft-skill",
    category: "design",
    icon: "fas fa-paint-brush",
    accent: "#d94f48",
    description: "高端设计方法论 Skill，约束字体、间距、阴影、卡片结构和动效，减少常见 AI 设计默认味。",
    tags: ["高端 UI", "设计系统", "排版"],
    tools: ["Claude Code", "Codex", "Cursor"],
    repositories: [repo("mattpocock", "skills")],
    features: ["建立视觉层级", "修正廉价渐变和卡片堆叠", "统一间距、阴影和动效节奏"],
    useCases: ["落地页视觉升级", "SaaS 控制台打磨", "品牌官网首屏重做"],
    keywords: ["ui", "agency", "typography", "premium", "layout", "视觉", "高端"],
  },
  {
    id: "redesign-skill",
    name: "redesign-skill",
    command: "/redesign-skill",
    category: "design",
    icon: "fas fa-magic",
    accent: "#8f5bd6",
    description: "网站升级 Skill，先审计现有界面，再在不破坏功能的前提下重做布局、层级和视觉语言。",
    tags: ["网站升级", "设计审计", "UI 重构"],
    tools: ["Claude Code", "Codex", "Cursor"],
    repositories: [repo("affaan-m", "ECC")],
    features: ["识别旧页面视觉问题", "保留原交互和信息结构", "输出可直接落地的 UI 改版"],
    useCases: ["旧博客页面改版", "管理后台视觉统一", "组件库风格校正"],
    keywords: ["redesign", "audit", "refactor", "ui", "重构", "升级"],
  },
  {
    id: "minimalist-skill",
    name: "minimalist-skill",
    command: "/minimalist-skill",
    category: "design",
    icon: "fas fa-brush",
    accent: "#2f83c7",
    description: "极简主义设计 Skill，聚焦留白、字号层级、线条密度和克制的视觉表达。",
    tags: ["极简", "留白", "排版"],
    tools: ["Claude Code", "Codex", "Cursor"],
    repositories: [repo("sickn33", "antigravity-awesome-skills")],
    features: ["压缩视觉噪音", "建立清晰阅读节奏", "用少量元素完成高级感表达"],
    useCases: ["作品集", "个人主页", "信息型页面"],
    keywords: ["minimal", "minimalist", "white space", "clean", "极简", "留白"],
  },
  {
    id: "brutalist-skill",
    name: "brutalist-skill",
    command: "/brutalist-skill",
    category: "design",
    icon: "fas fa-pen-nib",
    accent: "#d87830",
    description: "粗野主义设计 Skill，用大胆排版、高对比和原始结构制造强烈视觉张力。",
    tags: ["粗野主义", "大胆排版", "艺术感"],
    tools: ["Claude Code", "Codex", "Cursor"],
    repositories: [repo("sickn33", "antigravity-awesome-skills")],
    features: ["大字号视觉锚点", "高反差内容块", "非常规但可读的版式"],
    useCases: ["创意活动页", "艺术家作品集", "实验性网页"],
    keywords: ["brutalist", "bold", "poster", "contrast", "粗野", "艺术"],
  },
  {
    id: "color-font-skill",
    name: "color-font-skill",
    command: "/color-font-skill",
    category: "design",
    icon: "fas fa-font",
    accent: "#168f7a",
    description: "色彩与字体 Skill，为品牌或页面提供配色、字体组合、层级和可读性建议。",
    tags: ["配色", "字体搭配", "品牌调性"],
    tools: ["Claude Code", "Codex", "Cursor"],
    repositories: [repo("sickn33", "antigravity-awesome-skills")],
    features: ["生成配色系统", "匹配中英文字体气质", "检查对比度和品牌一致性"],
    useCases: ["品牌站", "产品页", "内容型博客"],
    keywords: ["color", "font", "palette", "brand", "配色", "字体"],
  },
  {
    id: "brandkit",
    name: "brandkit",
    command: "/brandkit",
    category: "design",
    icon: "fas fa-vector-square",
    accent: "#2ca66f",
    description: "品牌工具包 Skill，围绕品牌定位生成 Logo 方向、配色、字体、图标和组件风格。",
    tags: ["品牌设计", "Logo", "VI 系统"],
    tools: ["Claude Code", "Codex", "Cursor"],
    repositories: [repo("nexu-io", "open-design")],
    features: ["品牌视觉方向", "Logo 与图标风格", "组件库基础变量"],
    useCases: ["新产品品牌启动", "个人 IP 视觉体系", "活动视觉规范"],
    keywords: ["brand", "logo", "identity", "kit", "品牌", "视觉识别"],
  },
  {
    id: "frontend-dev",
    name: "frontend-dev",
    command: "/frontend-dev",
    category: "frontend",
    icon: "fab fa-react",
    accent: "#2aa8c8",
    description: "前端开发 Skill，把需求转成完整页面、组件结构、响应式布局和必要动效。",
    tags: ["React", "动画", "UI 设计", "媒体生成"],
    tools: ["Claude Code", "Codex", "Cursor", "OpenCode"],
    repositories: [repo("angelapaia", "frontend-design-engineer-skill")],
    features: ["拆解页面组件", "生成响应式布局", "补齐交互状态和视觉资产"],
    useCases: ["产品页面", "工具型 Web App", "高表现力 Demo"],
    keywords: ["frontend", "react", "component", "responsive", "前端", "网页"],
  },
  {
    id: "fullstack-dev",
    name: "fullstack-dev",
    command: "/fullstack-dev",
    category: "frontend",
    icon: "fab fa-node-js",
    accent: "#67a843",
    description: "全栈开发 Skill，覆盖前端、API、数据库、认证和部署前的工程结构。",
    tags: ["Node.js", "API", "数据库", "认证"],
    tools: ["Claude Code", "Codex", "Cursor"],
    repositories: [repo("viknesh20-20", "claude-code-tool-kit")],
    features: ["设计 API 合同", "规划数据模型", "补齐认证与权限边界"],
    useCases: ["MVP 快速搭建", "内部管理系统", "数据驱动 Web 应用"],
    keywords: ["fullstack", "api", "database", "auth", "全栈", "数据库"],
  },
  {
    id: "imagegen-frontend-web",
    name: "imagegen-frontend-web",
    command: "/imagegen-frontend-web",
    category: "frontend",
    icon: "fas fa-image",
    accent: "#4aa979",
    description: "Web 图像生成 Skill，为网页补齐 Hero、产品图、插图和内容配图。",
    tags: ["图像生成", "Web 配图", "Hero 图"],
    tools: ["Claude Code", "Codex", "Cursor"],
    repositories: [repo("nexu-io", "open-design")],
    features: ["生成首屏视觉资产", "匹配页面风格", "输出可用于网页的图片提示"],
    useCases: ["博客题图", "产品展示图", "活动页背景"],
    keywords: ["image", "hero", "asset", "illustration", "图像", "配图"],
  },
  {
    id: "react-native-dev",
    name: "react-native-dev",
    command: "/react-native-dev",
    category: "mobile",
    icon: "fab fa-react",
    accent: "#269dc2",
    description: "React Native 移动开发 Skill，用 React 语法构建 iOS 和 Android 应用。",
    tags: ["React Native", "iOS", "Android"],
    tools: ["Claude Code", "Codex", "Cursor"],
    repositories: [repo("sickn33", "antigravity-awesome-skills")],
    features: ["规划导航结构", "拆分移动端组件", "处理平台差异和原生模块"],
    useCases: ["跨平台 App", "移动端 MVP", "已有 Web 能力迁移到 App"],
    keywords: ["react native", "mobile", "ios", "android", "移动端", "跨平台"],
  },
  {
    id: "flutter-dev",
    name: "flutter-dev",
    command: "/flutter-dev",
    category: "mobile",
    icon: "fas fa-feather",
    accent: "#2278b5",
    description: "Flutter 移动开发 Skill，使用 Dart 和 Flutter 构建跨平台应用与精细 UI。",
    tags: ["Flutter", "Dart", "Material Design"],
    tools: ["Claude Code", "Codex", "Cursor"],
    repositories: [repo("sickn33", "antigravity-awesome-skills")],
    features: ["搭建 Widget 层级", "实现 Material 风格页面", "处理状态管理和路由"],
    useCases: ["跨端 App", "原型验证", "移动端 UI 快速复刻"],
    keywords: ["flutter", "dart", "widget", "material", "移动开发"],
  },
  {
    id: "ios-application-dev",
    name: "ios-application-dev",
    command: "/ios-application-dev",
    category: "mobile",
    icon: "fab fa-apple",
    accent: "#3878c9",
    description: "iOS 原生开发 Skill，面向 Swift、SwiftUI 和 Apple 生态原生能力。",
    tags: ["Swift", "SwiftUI", "iOS"],
    tools: ["Claude Code", "Codex", "Cursor"],
    repositories: [repo("sickn33", "antigravity-awesome-skills")],
    features: ["SwiftUI 页面结构", "原生权限和系统能力", "App Store 风格交互"],
    useCases: ["iPhone App", "Apple 生态工具", "SwiftUI 原型"],
    keywords: ["ios", "swift", "swiftui", "apple", "原生"],
  },
  {
    id: "android-native-dev",
    name: "android-native-dev",
    command: "/android-native-dev",
    category: "mobile",
    icon: "fab fa-android",
    accent: "#39a46f",
    description: "Android 原生开发 Skill，面向 Kotlin、Jetpack Compose 和现代 Android 应用。",
    tags: ["Kotlin", "Jetpack Compose", "Android"],
    tools: ["Claude Code", "Codex", "Cursor"],
    repositories: [repo("sickn33", "antigravity-awesome-skills")],
    features: ["Compose 组件拆解", "处理 Activity 和导航", "接入 Android 原生能力"],
    useCases: ["Android App", "Material You 页面", "移动端业务工具"],
    keywords: ["android", "kotlin", "compose", "原生", "安卓"],
  },
  {
    id: "gsap-core",
    name: "gsap-core",
    command: "/gsap-core",
    category: "animation",
    icon: "fas fa-play-circle",
    accent: "#71a832",
    description: "GSAP 核心动画 Skill，覆盖 Tween、Timeline、缓动函数和动画编排。",
    tags: ["Tween", "Timeline", "缓动函数"],
    tools: ["Claude Code", "Codex", "Cursor", "OpenCode"],
    repositories: [repo("viknesh20-20", "claude-code-tool-kit")],
    features: ["拆解动画时间线", "设置缓动和节奏", "组织复杂入场与状态动效"],
    useCases: ["产品展示动画", "首屏入场", "交互反馈动效"],
    keywords: ["gsap", "timeline", "tween", "animation", "动画"],
  },
  {
    id: "gsap-scrolltrigger",
    name: "gsap-scrolltrigger",
    command: "/gsap-scrolltrigger",
    category: "animation",
    icon: "fas fa-arrows-alt",
    accent: "#469a4a",
    description: "GSAP 滚动触发 Skill，用滚动位置驱动视差、固定、进度条和章节切换。",
    tags: ["ScrollTrigger", "视差", "滚动动画"],
    tools: ["Claude Code", "Codex", "Cursor", "OpenCode"],
    repositories: [repo("viknesh20-20", "claude-code-tool-kit")],
    features: ["滚动触发配置", "Pin 固定场景", "Scrub 进度驱动动画"],
    useCases: ["长页叙事", "产品故事页", "滚动演示"],
    keywords: ["scrolltrigger", "scroll", "parallax", "pin", "滚动"],
  },
  {
    id: "gsap-react",
    name: "gsap-react",
    command: "/gsap-react",
    category: "animation",
    icon: "fab fa-react",
    accent: "#55a761",
    description: "GSAP + React 集成 Skill，处理 refs、cleanup、SSR 兼容和组件生命周期。",
    tags: ["React", "useGSAP", "Ref"],
    tools: ["Claude Code", "Codex", "Cursor", "OpenCode"],
    repositories: [repo("Nyx-abu", "awwwards-ui-skill")],
    features: ["React 生命周期内初始化动画", "避免重复绑定和内存泄漏", "组件化动画复用"],
    useCases: ["React 落地页", "组件动效", "Next.js 动画页面"],
    keywords: ["gsap", "react", "usegsap", "ref", "cleanup"],
  },
  {
    id: "minimax-docx",
    name: "minimax-docx",
    command: "/minimax-docx",
    category: "documents",
    icon: "fas fa-file-word",
    accent: "#3267a8",
    description: "Word 文档生成 Skill，创建带标题层级、表格、图片和样式的 .docx 文件。",
    tags: ["Word", "报告", "文档自动化"],
    tools: ["Claude Code", "MiniMax CLI"],
    repositories: [repo("sickn33", "antigravity-awesome-skills")],
    features: ["生成 Word 结构", "处理表格与图片", "统一页眉页脚和样式"],
    useCases: ["读书报告", "论文笔记", "项目文档"],
    keywords: ["docx", "word", "document", "报告", "文档"],
  },
  {
    id: "minimax-pdf",
    name: "minimax-pdf",
    command: "/minimax-pdf",
    category: "documents",
    icon: "fas fa-file-pdf",
    accent: "#c13a33",
    description: "PDF 生成 Skill，面向高质量页面布局、字体、图表和打印输出。",
    tags: ["PDF", "排版", "打印"],
    tools: ["Claude Code", "MiniMax CLI"],
    repositories: [repo("sickn33", "antigravity-awesome-skills")],
    features: ["设置页面尺寸和边距", "组织图文排版", "输出可打印 PDF"],
    useCases: ["作品集 PDF", "学术资料", "宣传册"],
    keywords: ["pdf", "print", "layout", "排版", "打印"],
  },
  {
    id: "minimax-xlsx",
    name: "minimax-xlsx",
    command: "/minimax-xlsx",
    category: "documents",
    icon: "fas fa-file-excel",
    accent: "#2f7e51",
    description: "Excel 表格生成 Skill，创建带公式、图表、数据验证和格式的工作簿。",
    tags: ["Excel", "数据分析", "报表"],
    tools: ["Claude Code", "MiniMax CLI"],
    repositories: [repo("sickn33", "antigravity-awesome-skills")],
    features: ["构建多表结构", "生成公式和图表", "设置数据验证和格式"],
    useCases: ["数据报表", "预算表", "实验记录表"],
    keywords: ["xlsx", "excel", "spreadsheet", "formula", "表格"],
  },
  {
    id: "pptx-generator",
    name: "pptx-generator",
    command: "/pptx-generator",
    category: "documents",
    icon: "fas fa-file-powerpoint",
    accent: "#c85b32",
    description: "PPT 生成 Skill，围绕主题、节奏、图表和视觉风格生成幻灯片。",
    tags: ["PPT", "演示", "幻灯片"],
    tools: ["Claude Code", "MiniMax CLI"],
    repositories: [repo("sickn33", "antigravity-awesome-skills")],
    features: ["拆解演示结构", "生成版式和图表", "统一主题和视觉节奏"],
    useCases: ["组会汇报", "产品路演", "课程课件"],
    keywords: ["ppt", "pptx", "presentation", "slides", "演示"],
  },
  {
    id: "minimax-music-gen",
    name: "minimax-music-gen",
    command: "/minimax-music-gen",
    category: "creative",
    icon: "fas fa-music",
    accent: "#d95858",
    description: "AI 音乐生成 Skill，根据文字描述生成不同风格、情绪和时长的音乐。",
    tags: ["AI 作曲", "多风格", "背景音乐"],
    tools: ["Claude Code", "MiniMax CLI"],
    repositories: [repo("lrzniu", "Minimax-skills-for-music-gen"), repo("HZ6112", "minimax-music-skills-v2")],
    features: ["描述音乐风格和情绪", "指定用途和长度", "生成可复用的音乐提示"],
    useCases: ["视频背景音乐", "播客片头", "短视频配乐"],
    keywords: ["music", "audio", "minimax", "song", "音乐", "作曲"],
  },
  {
    id: "web-video-presentation",
    name: "web-video-presentation",
    command: "/web-video-presentation",
    category: "creative",
    icon: "fas fa-video",
    accent: "#9356b7",
    description: "网页视频演示 Skill，把文章或口播稿做成 16:9 点击推进的网页演示。",
    tags: ["动态 PPT", "口播", "交互演示"],
    tools: ["Claude Code", "MiniMax CLI"],
    repositories: [repo("sylvial928", "interactive-slides")],
    features: ["切分口播节拍", "生成交互式演示页面", "可选合成口播音频"],
    useCases: ["B 站录屏视频", "课程讲解", "产品发布演示"],
    keywords: ["video", "presentation", "slides", "web", "口播", "演示"],
  },
  {
    id: "image-to-code-skill",
    name: "image-to-code-skill",
    command: "/image-to-code-skill",
    category: "creative",
    icon: "fas fa-exchange-alt",
    accent: "#d78a31",
    description: "图像转代码 Skill，把设计稿、截图或参考图还原为 HTML/CSS 和响应式布局。",
    tags: ["设计稿转代码", "截图还原", "响应式"],
    tools: ["Claude Code", "Codex", "Cursor"],
    repositories: [repo("voidmatcha", "ui-clone-skills")],
    features: ["识别截图布局", "生成 HTML/CSS", "补齐移动端适配"],
    useCases: ["快速复刻 UI", "设计稿落地", "竞品页面分析"],
    keywords: ["image to code", "screenshot", "html", "css", "截图", "还原"],
  },
  {
    id: "gif-sticker-maker",
    name: "gif-sticker-maker",
    command: "/gif-sticker-maker",
    category: "creative",
    icon: "fas fa-film",
    accent: "#269aad",
    description: "GIF 表情包 Skill，制作动态贴纸、循环表情和社交媒体短动画。",
    tags: ["GIF", "表情包", "动画"],
    tools: ["Claude Code", "Codex", "Cursor"],
    repositories: [repo("sickn33", "antigravity-awesome-skills")],
    features: ["规划循环动作", "控制尺寸和透明背景", "输出贴纸风格提示"],
    useCases: ["聊天表情", "社媒贴纸", "产品动效素材"],
    keywords: ["gif", "sticker", "animation", "meme", "表情包"],
  },
  {
    id: "code-review",
    name: "code-review",
    command: "/code-review",
    category: "code",
    icon: "fas fa-check-double",
    accent: "#409a4d",
    description: "代码审查 Skill，审查当前 diff，发现正确性 bug、复用机会和效率问题。",
    tags: ["Code Review", "Bug 检测", "代码质量"],
    tools: ["Claude Code", "Codex", "Cursor", "OpenCode"],
    repositories: [repo("awesome-skills", "code-review-skill")],
    features: ["按严重程度列出问题", "定位文件和行号", "可选自动修复或 PR 评论"],
    useCases: ["提交前自检", "PR 审查", "回归风险排查"],
    keywords: ["review", "diff", "bug", "quality", "审查", "代码质量"],
  },
  {
    id: "claude-api",
    name: "claude-api",
    command: "/claude-api",
    category: "code",
    icon: "fas fa-bug",
    accent: "#2c82c9",
    description: "Claude API 开发 Skill，辅助构建、调试和优化 Claude API 应用。",
    tags: ["Claude API", "SDK", "Prompt Caching"],
    tools: ["Claude Code", "Anthropic SDK"],
    repositories: [repo("anthropics", "claude-code")],
    features: ["设计 API 调用结构", "接入工具调用", "优化缓存、流式和错误处理"],
    useCases: ["AI 应用集成", "Agent 后端", "SDK 示例修复"],
    keywords: ["claude", "api", "sdk", "tool use", "prompt caching"],
  },
  {
    id: "security-review",
    name: "security-review",
    command: "/security-review",
    category: "code",
    icon: "fas fa-shield-alt",
    accent: "#c75836",
    description: "安全审查 Skill，扫描当前变更中的注入、权限、密钥和常见 Web 安全风险。",
    tags: ["安全审查", "漏洞检测", "OWASP"],
    tools: ["Claude Code", "Codex", "Cursor", "OpenCode"],
    repositories: [repo("waybarrios", "opencode-power-pack")],
    features: ["检测 OWASP 常见风险", "识别敏感信息泄露", "给出可执行修复建议"],
    useCases: ["上线前安全检查", "PR 安全门禁", "第三方代码审计"],
    keywords: ["security", "owasp", "vulnerability", "secret", "安全", "漏洞"],
  },
  {
    id: "simplify",
    name: "simplify",
    command: "/simplify",
    category: "code",
    icon: "fas fa-compress-alt",
    accent: "#64748b",
    description: "代码简化 Skill，分析当前 diff 并应用更小、更清晰、更容易维护的实现。",
    tags: ["代码简化", "自动修复", "重构"],
    tools: ["Claude Code", "Codex", "Cursor", "OpenCode"],
    repositories: [repo("waybarrios", "opencode-power-pack")],
    features: ["减少重复逻辑", "压缩复杂分支", "应用低风险重构"],
    useCases: ["提交前整理", "遗留代码瘦身", "提高可维护性"],
    keywords: ["simplify", "refactor", "cleanup", "maintainability", "简化", "重构"],
  },
];

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

async function githubFetch(url) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "modestyzht-skill-catalog",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (TOKEN) {
    headers.Authorization = `Bearer ${TOKEN}`;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${response.status} ${response.statusText}: ${body.slice(0, 180)}`);
  }
  return response.json();
}

function toRepoRecord(item) {
  return {
    id: item.full_name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: item.name,
    fullName: item.full_name,
    description: item.description || "",
    url: item.html_url,
    stars: item.stargazers_count || 0,
    forks: item.forks_count || 0,
    language: item.language || "",
    topics: item.topics || [],
    pushedAt: item.pushed_at || "",
    updatedAt: item.updated_at || "",
  };
}

async function enrichRepo(repository) {
  if (!repository.owner || !repository.name) {
    return repository;
  }

  try {
    const data = await githubFetch(`${GITHUB_API}/repos/${repository.owner}/${repository.name}`);
    return {
      ...repository,
      description: data.description || repository.description || "",
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
      language: data.language || "",
      topics: data.topics || [],
      pushedAt: data.pushed_at || "",
      updatedAt: data.updated_at || "",
    };
  } catch (error) {
    console.warn(`[WARN] Repo stats failed for ${repository.fullName}: ${error.message}`);
    return repository;
  }
}

async function enrichSkill(skill) {
  const repositories = [];
  for (const repository of skill.repositories || []) {
    repositories.push(await enrichRepo(repository));
  }

  const primaryRepo = repositories
    .slice()
    .sort((a, b) => (b.stars || 0) - (a.stars || 0))[0] || null;

  return {
    ...skill,
    repositories,
    primaryRepo,
    stars: primaryRepo?.stars || 0,
    source: "curated",
  };
}

function isRelevantRepo(item) {
  const text = [
    item.full_name,
    item.name,
    item.description,
    ...(item.topics || []),
  ].join(" ").toLowerCase();

  return text.includes("skill") && /(claude|codex|agent|ai|llm|prompt|mcp|opencode)/i.test(text);
}

async function fetchGithubLeaderboard(previousLeaderboard = []) {
  const repos = new Map();

  for (const query of GITHUB_SEARCH_QUERIES) {
    const url = `${GITHUB_API}/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=12`;
    try {
      const result = await githubFetch(url);
      for (const item of result.items || []) {
        if (!isRelevantRepo(item)) {
          continue;
        }
        const record = toRepoRecord(item);
        repos.set(record.fullName, record);
      }
    } catch (error) {
      console.warn(`[WARN] GitHub search failed for "${query}": ${error.message}`);
    }
  }

  const leaderboard = Array.from(repos.values())
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 18);

  return leaderboard.length ? leaderboard : previousLeaderboard;
}

async function main() {
  const previous = await readJson(OUTPUT_FILE, {});
  const skills = [];

  for (const skill of CURATED_SKILLS) {
    skills.push(await enrichSkill(skill));
  }

  const githubLeaderboard = await fetchGithubLeaderboard(previous.githubLeaderboard || []);
  const now = new Date().toISOString();
  const catalog = {
    schemaVersion: 1,
    generatedAt: now,
    updateCadence: "weekly",
    source: "GitHub REST Search API + curated skill metadata",
    categories: CATEGORIES,
    skills,
    githubLeaderboard,
    counts: {
      skills: skills.length,
      categories: CATEGORIES.length,
      repositories: new Set(skills.flatMap((skill) => skill.repositories.map((item) => item.fullName))).size,
      githubLeaderboard: githubLeaderboard.length,
    },
  };

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(OUTPUT_FILE, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
  console.log(`Generated ${path.relative(ROOT, OUTPUT_FILE)}`);
  console.log(`Skills: ${catalog.counts.skills}, GitHub leaderboard: ${catalog.counts.githubLeaderboard}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
