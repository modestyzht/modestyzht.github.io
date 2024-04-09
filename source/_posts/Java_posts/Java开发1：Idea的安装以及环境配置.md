title: Java开发1：Idea的安装以及环境配置
date: 2023-7-24
description: 在这篇博客文章中，我们将开始Java的学习😁😁。
top_img: https://w.wallhaven.cc/full/m3/wallhaven-m3oq1k.jpg
cover: https://w.wallhaven.cc/full/ex/wallhaven-exrqrr.jpg
copyright_author: 驴哥
copyright_url: https://modestyzht.github.io/
copyright_info: 此文章版权为驴哥所有,如有转载,请注明来自原作者
categories: Java开发入门
sticky: 1
---
# Java 开发平台搭建与环境配置

本文介绍了在 Windows、Linux 和 macOS 操作系统上搭建和配置 Java 开发环境的步骤。Java 是一种跨平台的编程语言，因此这些步骤适用于各种操作系统。

## 1. 下载 JDK (Java Development Kit)

首先，你需要下载适用于你所使用操作系统的 JDK。JDK 是 Java 开发工具包，包括了编译器和其他工具。以下是下载 JDK 的官方地址：

- [Oracle JDK 下载页面](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)

请注意，Oracle JDK 可能需要注册和登录才能下载，但也存在一些其他可选的 OpenJDK 发行版可供选择，例如 AdoptOpenJDK 和 Amazon Corretto。

## 2. 安装 JDK

下载完 JDK 安装程序后，按照操作系统的指导安装 JDK。

- 在 Windows 中，双击安装程序并按照向导进行安装。
- 在 Linux 和 macOS 中，打开终端并执行安装程序，或者按照操作系统的软件包管理器（如 APT、yum 或 Homebrew）进行安装。

安装完成后，JDK 将被安装在默认的位置，可以在后续的步骤中配置环境变量。

## 3. 配置环境变量

配置环境变量将允许你在命令行中执行 Java 相关的命令和工具。以下是在不同操作系统中配置环境变量的步骤：

### Windows

1. 打开“控制面板” > “系统与安全” > “系统”。
2. 点击“高级系统设置”。
3. 在弹出的对话框中，点击“环境变量”按钮。
4. 在“用户变量”或“系统变量”区域，找到名为 "Path" 的变量，双击它。
5. 在“编辑环境变量”对话框中，点击“新建”按钮，并输入 JDK 的安装路径（例如：`C:\Program Files\Java\jdk11`)，点击“确定”。
6. 点击“确定”关闭对话框。

### Linux 和 macOS

1. 打开终端。
2. 编辑 `~/.bashrc` 或 `~/.bash_profile` 文件（根据你的系统设置）。
3. 在文件的末尾添加以下行：
   ```
   export JAVA_HOME=/usr/lib/jvm/jdk11   # JDK 的安装路径
   export PATH=$JAVA_HOME/bin:$PATH
   ```
   请将 `JAVA_HOME` 的路径替换为你的 JDK 安装路径。
4. 保存文件并退出。

## 4. 验证安装

完成前面的步骤后，可以通过以下方式验证 Java 是否正确安装和配置：

1. 打开命令提示符（Windows）或终端（Linux 和 macOS）。
2. 执行以下命令检查 Java 版本：
   ```
   java -version
   ```
   如果你看到相关的 Java 版本信息，说明 Java 已经成功安装并配置。

# Java 开发平台搭建与环境配置（续）

在上一部分，我们介绍了在 Windows、Linux 和 macOS 操作系统上搭建和配置 Java 开发环境的基本步骤。在本文的后续部分，我们将详细介绍一些特定操作系统的相关配置。

## Windows

### 设置 JAVA_HOME 环境变量

除了设置 PATH 环境变量之外，还可以设置 JAVA_HOME 环境变量，这将对很多 Java 应用程序和工具非常有用：

1. 打开“控制面板” > "系统与安全" > "系统"。
2. 点击“高级系统设置”。
3. 在弹出的对话框中，点击“环境变量”按钮。
4. 在“用户变量”或“系统变量”区域，点击“新建”按钮。
5. 输入变量名为`JAVA_HOME`，变量值为 JDK 的安装路径（例如：`C:\Program Files\Java\jdk11`)，点击“确定”。
6. 点击“确定”关闭对话框。

### 设置默认 Java 版本

如果系统上同时安装了多个 JDK 版本，你可能希望设置默认的 Java 版本：

1. 打开“控制面板” > "程序" > "默认程序" > "关联文件类型"。
2. 在列表中选择 `.class` 文件类型。
3. 点击“更改程序”。
4. 选择你要使用的 Java 版本，并点击“确定”。

## Linux 和 macOS

### 设置 JAVA_HOME 环境变量

1. 打开终端。
2. 编辑 `~/.bashrc` 或 `~/.bash_profile` 文件（根据你的系统设置）。
3. 在文件的末尾添加以下行：
   ```bash
   export JAVA_HOME=/usr/lib/jvm/jdk11   # JDK 的安装路径
   export PATH=$JAVA_HOME/bin:$PATH
   ```
   请将 `JAVA_HOME` 的路径替换为你的 JDK 安装路径。
4. 保存文件并退出。
5. 在终端中执行以下命令刷新环境变量：
   ```bash
   source ~/.bashrc
   ```
   或
   ```bash
   source ~/.bash_profile
   ```

注意，对于 macOS 用户，如果你使用的是真实名称而不是符号链接的 JDK 路径，则需要在配置 `JAVA_HOME` 时使用该路径。

## 结论

通过本文的步骤，你已经成功搭建了 Java 开发平台并配置了环境变量。这将允许你在 Windows、Linux 和 macOS 上使用 Java 开发工具，并构建各种类型的应用程序。还要记得在你的开发过程中随时更新和升级 JDK 版本以保持最新的功能和安全性。祝你在 Java 开发的旅程中取得成功！








感谢你阅读我的博客文章！如果你有任何问题或想了解更多关于这个项目的内容，请随时与我联系。
QQ邮箱：2855935354@qq.com
---