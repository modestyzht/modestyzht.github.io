---
title: 在 Windows 上安装 Linux 系统
date: 2023.7.17
description: 欢迎来到本文，如果你想在 Windows 操作系统上体验 Linux，本指南将为你提供一份关于在 Windows 上安装 Linux 系统的详细指南。

top_img: https://w.wallhaven.cc/full/zy/wallhaven-zygeko.jpg
cover: https://www.linuxprobe.com/wp-content/uploads/2018/09/20180927006.jpg
copyright_author: 驴哥
copyright_url: https://modestyzht.github.io/
copyright_info: 此文章版权为驴哥所有,如有转载,请注明来自原作者
categories: Linux的学习

---
top: 7
# 在 Windows 上安装 Linux 系统



欢迎来到本文，如果你想在 Windows 操作系统上体验 Linux，本指南将为你提供一份关于在 Windows 上安装 Linux 系统的详细指南。

![Linux on Windows](https://static.open-open.com/lib/uploadImg/20150313/20150313090037_148.jpg)
## 安装 WSL

Windows Subsystem for Linux（WSL）是 Windows 上的一个功能，允许你在 Windows 系统中运行 Linux 发行版。

1. 打开 PowerShell 或命令提示符（CMD）作为管理员。
2. 运行以下命令来启用 WSL 功能：
   ```
   dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
   ```
3. 在 PowerShell 或 CMD 中运行以下命令，以启用虚拟机平台功能：
   ```
   dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
   ```
4. 下载并安装适用于你的 Windows 版本的 WSL 2 更新包：[WSL 2 更新包](https://aka.ms/wsl2kernel)
5. 将 WSL 2 设置为默认版本：
   ```
   wsl --set-default-version 2
   ```
6. 安装适用于你的 Linux 发行版。你可以从 Microsoft Store 下载所选的 Linux 发行版（如 Ubuntu、Debian、Fedora 等）。

## 配置和启动 Linux 发行版

1. 打开已安装的 Linux 发行版。首次运行时，你需要设置用户名和密码。
2. 等待安装和初始化过程完成，这可能需要一些时间。
3. 在 PowerShell 或 CMD 中运行以下命令来启动你的 Linux 发行版：
   ```
   wsl
   ```

## 使用 Windows 和 Linux 并行工作

现在，你已经在 Windows 上成功安装了 Linux 系统，可以同时在两个操作系统中进行工作。

1. 访问 Linux 文件系统：在 Windows 文件资源管理器中，转到 `\\wsl$` 目录，你可以访问 Linux 发行版的文件系统。
2. 使用 Windows 应用程序访问 Linux：通过 WSL，你可以在 Windows 上使用诸如 Visual Studio Code、Windows Terminal 等应用程序来编辑和执行 Linux 相关的任务。

## 安装其他工具和软件

你可以使用包管理器，如 `apt`（Ubuntu、Debian）、`dnf`（Fedora）或其他适用的包管理器，在 Linux 发行版中安装其他软件和工具。

## 总结

通过 WSL，你可以在 Windows 上体验和使用 Linux 系统，以便更好地学习和开发与 Linux 相关的项目。

请注意，以上内容仅供参考，你可以根据自己的需求和经验进行修改和扩展。在发布之前，确保仔细检查和编辑文章，以确保逻辑清晰、内容真实，并包含你希望传达的信息。

祝你写作顺利，并期待你的第二篇博客文章取得成功！
```
