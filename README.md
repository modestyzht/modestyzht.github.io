# 西北驴哥的个人博客

> 基于 [Hexo](https://hexo.io) 框架和 [Butterfly](https://butterfly.js.org) 主题构建的个人技术博客

[在线访问](https://modestyzht.github.io) | [GitHub](https://github.com/modestyzht/modestyzht.github.io)

## 特性

- **主题**: Butterfly - 功能丰富、设计优雅的 Hexo 主题
- **样式**: 毛玻璃效果 + 明暗主题切换
- **排版**: 中英文自动空格 (pangu 插件)
- **代码**: 自定义语法高亮配色
- **功能**: 网站运行时间显示、本地搜索、社交链接

## 文章内容

博客包含 21 篇技术文章，涵盖:

- **Java 开发**: IDEA 配置、Maven、Spring Boot、MyBatis Plus、RESTful API
- **Linux 基础**: 系统安装、命令指南、Shell 脚本
- **前端开发**: 微信小程序、Vibe Coding 入门
- **项目实践**: 单词记忆工具、模块化 PRD 方法

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run server

# 构建静态文件
npm run build
```

## 部署

项目使用 GitHub Actions 自动部署:

1. 推送代码到 `main` 分支
2. GitHub Actions 自动构建并部署到 `gh-pages` 分支
3. 通过 GitHub Pages 访问: https://modestyzht.github.io

## 技术栈

- [Hexo](https://hexo.io) v8.1.2
- [Butterfly Theme](https://butterfly.js.org) v5.0.0
- [GitHub Actions](https://github.com/features/actions) - CI/CD
- [GitHub Pages](https://pages.github.com) - 托管

## 许可证

[MIT License](LICENSE)