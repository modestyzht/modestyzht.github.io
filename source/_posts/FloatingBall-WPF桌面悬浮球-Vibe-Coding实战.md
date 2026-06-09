---
title: 用 Vibe Coding 做一个 WPF 桌面悬浮球：FloatingBall 完整开发复盘
date: 2026-06-09
categories: [技术, Vibe Coding]
tags: [vibe-coding, Vibecoding, WPF, .NET, Codex, Claude-Code, AI编程, 桌面工具]
top_img: /img/posts/floatingball-vibecoding-cover.png
cover: /img/posts/floatingball-vibecoding-cover.png
copyright_author: 驴哥
copyright_url: https://modestyzht.github.io/
copyright_info: 此文章版权为驴哥所有，如有转载，请注明来自原作者
---

# 用 Vibe Coding 做一个 WPF 桌面悬浮球：FloatingBall 完整开发复盘

> 这篇文章记录一个 Windows 桌面小工具 FloatingBall 的完整开发过程：从最初的 48px 悬浮球，到菜单动画、贴边回收、设置窗口、托盘、热重载，再到最后推送 GitHub。
> 项目地址：[https://github.com/modestyzht/FloatingBall](https://github.com/modestyzht/FloatingBall)

![FloatingBall Vibe Coding 封面](/img/posts/floatingball-vibecoding-cover.png)

<!-- more -->

## 一、为什么要做 FloatingBall

我平时会频繁在几类工具之间切换：命令行、AI 编程工具、网页工具、桌面小应用。它们都不难打开，但每次都要去开始菜单、任务栏、浏览器收藏夹里找，动作很碎，也很容易打断当前思路。

所以最初的需求很简单：

**我想要一个始终在桌面边缘待命的小球，点一下就展开常用工具，用完以后自己收回去。**

最后做出来的 FloatingBall 是一个 Windows 原生桌面悬浮球启动器。它不是 Electron，也不是网页套壳，而是用 C# / .NET 8 / WPF 做的轻量工具。

## 二、最终效果

现在这个版本已经可以日常使用：

- 桌面常驻一个 48px 悬浮球
- 平时自动贴到左右屏幕边缘，只露出一部分
- 鼠标移入或点击后弹出
- 单击中心球展开菜单，最多支持 8 个选项
- 前 4 个菜单项水平展开，后 4 个菜单项向上排列
- 拖着球向左移动，菜单优先向左展开；拖着球向右移动，菜单优先向右展开
- 靠近屏幕边缘时自动兜底，避免菜单跑出屏幕或贴得太近
- 菜单项有逐个淡入、逐个收起动画
- 黑色图标也能看清，因为给图标加了柔和的白色光晕
- 设置窗口支持增删改、路径选择、图标预览、拖拽排序
- 托盘支持找回悬浮球、设置、重新加载配置、退出
- 配置文件支持热重载
- 支持 PerMonitorV2 DPI、多显示器和位置持久化

这些功能拆开看都不大，但桌面工具真正难的地方不在“能不能做出来”，而在“用起来会不会烦”。FloatingBall 的开发过程，基本就是不断把“能用”打磨成“愿意常驻桌面使用”。

## 三、技术选型和项目结构

项目技术栈比较克制：

```text
C# / .NET 8
WPF / MVVM
Microsoft.Extensions.DependencyInjection
System.Drawing.Common
Windows Forms NotifyIcon
少量 Win32 interop
```

为什么选 WPF？因为这个工具强依赖 Windows 桌面窗口行为：无边框、透明、置顶、非激活、拖拽、多屏、DPI、托盘、系统启动等。WPF 在这些场景里依然成熟，和 Win32 互操作也足够直接。

项目结构大概是这样：

```text
src/FloatingBall/
├── Models/
│   ├── AppState.cs
│   ├── MenuItemConfig.cs
│   └── PositionInfo.cs
├── ViewModels/
│   └── MainViewModel.cs
├── Views/
│   ├── MainWindow.xaml/.cs
│   └── SettingsWindow.xaml/.cs
├── Services/
│   ├── ConfigService.cs
│   ├── ToolLauncherService.cs
│   ├── WindowBehaviorService.cs
│   ├── IconService.cs
│   ├── LoggerService.cs
│   └── NativeMethods.cs
├── Icons/
├── app.ico
├── app.manifest
└── config.json
```

这里有一个很重要的工程约束：

**所有 Win32 P/Invoke 声明只放在 `NativeMethods.cs`，并且只允许由 `WindowBehaviorService` 和 `IconService` 调用。**

桌面应用一旦开始到处写 Win32 调用，后期排查窗口行为会非常痛苦。提前把边界定好，后面每次优化都会轻松很多。

## 四、第一版：先让球出现

第一个 MVP 很简单：

1. 创建一个无边框、透明、置顶的 WPF 窗口
2. 窗口大小固定为 48x48
3. 中间显示一张球形图标
4. 单击后通过 Popup 展开几个菜单按钮
5. 点击菜单项后启动对应工具

菜单项配置使用 JSON：

```json
[
  {
    "name": "CMD",
    "type": "cli",
    "target": "cmd.exe",
    "args": null,
    "icon": null,
    "workDir": null
  },
  {
    "name": "DeepSeek",
    "type": "web",
    "target": "https://chat.deepseek.com/",
    "args": null,
    "icon": "Icons/deepseek-color.png",
    "workDir": null
  }
]
```

启动类型支持四种：

| 类型 | 用途 | 示例 |
| --- | --- | --- |
| `app` | 启动桌面应用 | VS Code、记事本 |
| `web` | 打开网页 | DeepSeek、GitHub |
| `cli` | 打开命令行 | CMD、Claude Code |
| `uri` | 调用系统 URI | `ms-settings:`、`mailto:` |

`ToolLauncherService` 的原则也很明确：每次 `Process.Start` 都必须包 try/catch，并写入日志；CLI 用 `cmd.exe /k` 打开，不能在 UI 线程里等待进程退出。

这个阶段的目标不是优雅，而是快速验证：这个小球放在桌面上，我会不会真的想点它？

答案是会。于是后面才值得继续打磨。

## 五、状态机：别用几个 bool 硬撑动画

只要菜单开始有展开和收起动画，就不能再靠一个 `IsExpanded` 到处切。

用户可能会连续点击：菜单正在展开时又点了一下，菜单正在收起时又点了一下，或者拖拽开始前菜单还没完全收完。如果只是几个 bool，很容易出现菜单状态和 UI 显示不同步。

所以项目里用了四状态枚举：

```text
Collapsed -> Expanding -> Expanded -> Collapsing -> Collapsed
```

核心切换都走 `MainViewModel.Toggle()`，再用 `switch` 明确处理每个状态。

动画只做 Opacity，不改变窗口尺寸。这个限制看起来保守，但收益很大：

- 不触发复杂布局变化
- 不容易闪烁
- 不影响 Popup 定位
- 动画可以被取消和反向打断

后面菜单项逐个淡入、逐个收起，也是沿着这个思路做的。

## 六、图标：黑色图标看不清，不能只靠背景硬补

这个项目里有些菜单图标本身是黑色的，在深色桌面背景或者透明菜单上很容易看不清。

之前试过给每个图标加背景，但背景块和中心球没办法自然对齐，看起来会有一点“贴片感”。

最后采用的是更轻的方案：

- 按钮背景保持透明
- hover 时只给一点淡淡的白色底
- 图标本身加白色 `DropShadowEffect`
- Tooltip 显示菜单名称

这样黑色图标不会消失，彩色图标也不会被背景抢走注意力。

图标加载也做了三层兜底：

1. 如果配置里显式写了图标路径，就优先加载
2. 如果是 `app` 类型且目标是 exe，就尝试提取程序图标
3. 如果都失败，就用几何绘制一个兜底图标

还有一个很实际的坑：相对路径不能只按当前工作目录解析。程序从源码运行、从发布目录运行、从开机自启运行时，当前目录可能完全不同。最后图标路径统一先从 `AppContext.BaseDirectory` 解析，再回退到当前目录。

## 七、设置窗口：先能编辑，再让编辑不费劲

最初可以手动改 JSON，但这显然不适合日常用。于是加入了独立设置窗口，用 DataGrid 编辑菜单项：

- 添加、删除菜单项
- 修改名称、类型、路径、参数、图标、工作目录
- 选择目标程序
- 选择图标文件
- 选择工作目录
- 预览当前图标
- 拖拽排序
- 限制最多 8 项

这里也经历了几轮体验修正。

比如排序列最开始左边有一条窄窄的空白，看起来像多出来的格子。后来把 DataGrid 的 RowHeader 宽度设为 0，并把排序列做成一个清晰的拖拽手柄。

再比如“最多 8 个”这个限制，不只是配置服务里截断，还要在设置窗口里给用户明确反馈。否则用户在设置里加了第 9 个，保存后又不见了，会以为程序出 bug。

Vibe Coding 做工具时，这类地方很适合让 AI 帮你改 UI 细节，但最终一定要自己打开窗口看一眼。因为“能拖拽”和“用户知道这里可以拖拽”，中间差了一个可见的交互暗示。

## 八、贴边、方向和菜单距离：桌面工具的细节都在边缘

FloatingBall 最开始的菜单是固定向右展开的。

问题很快出现：当球靠近屏幕右侧时，菜单会和中心球靠得太近，甚至显得有点挤；但在左侧时没有这个问题。

后来改成两层判断：

1. 根据拖拽方向记录用户意图。向左拖，菜单优先在左侧展开；向右拖，菜单优先在右侧展开。
2. 根据当前屏幕工作区做边缘兜底。如果右侧空间不够，就自动换到左侧；如果左侧空间不够，就自动换到右侧。

还有一个小细节：向左展开时不能简单把 `Placement` 改成 Left，还要给水平偏移一个反向 gap，否则菜单会贴着中心球。

这就是“右边还是有点近”反复出现的原因。视觉上差几个像素，代码里往往是一个 offset 的方向或距离。

现在的行为是：

- 水平菜单和球之间保留稳定间距
- 靠近右侧时不挤压中心球
- 拖动方向会影响下一次展开方向
- 屏幕空间不足时自动纠正

这类优化很难一次写对，必须边用边调。

## 九、自动回收：不能抢焦点，也不能太急

贴边回收看起来简单：不用的时候自动吸到屏幕边缘。

但实际踩了两个坑。

第一个坑是闪烁。WPF 的 Topmost 窗口如果频繁激活/失活，可能会让桌面上已经打开的应用闪一下。这个体验很糟，因为悬浮球本来应该安静地待着，不应该打扰别的窗口。

解决方案是把主窗口设置成非激活工具窗：

```text
WS_EX_NOACTIVATE + WS_EX_TOOLWINDOW
```

同时用 `SetWindowPos(..., SWP_NOACTIVATE, ...)` 保持置顶但不抢焦点。

第二个坑是回收时机。窗口不激活以后，依赖 `Deactivated` 自动收回就不可靠了。于是改成由鼠标状态和计时器驱动：

- 鼠标离开球且菜单未打开，延迟后贴边
- 菜单打开时，鼠标离开菜单和球，延迟后自动关闭菜单
- 从贴边状态弹出时，给一段 grace time，避免还没来得及点中心球就又收回去
- 右键菜单打开时暂停自动回收

这里有一个真实 bug：当中心球在屏幕中间，从侧边点击呼出后，还没来得及移动到中间点球，它就又收回去了。

这个 bug 的本质不是代码错误，而是交互节奏不合理。最后加了弹出后的宽限时间，让用户有足够时间把鼠标移动到球上。

桌面工具的体验经常不是“功能有没有”，而是“时机是不是像人一样有耐心”。

## 十、配置热重载和开发重启

配置文件放在：

```text
%APPDATA%\FloatingBall\config.json
```

`ConfigService` 用 `FileSystemWatcher` 监听这个文件，变更后做 250ms debounce，再重新加载配置。

这里有两个必要处理：

- 读取文件要 retry，因为编辑器保存文件时可能短暂占用
- 如果菜单当前展开，要先立即收起，再重建菜单项

开发过程中还遇到一个问题：右键菜单里的“重启应用”只是重新启动当前 exe，如果源码刚改完但还没重新 build，当然看不到新效果。

所以又加了一个开发专用项：

```text
构建并重启(开发)
```

它会启动一个 PowerShell，等待当前进程退出，然后执行 `dotnet build`，构建成功后再启动当前 Debug 程序。

这不是给普通用户用的功能，但对开发迭代很有用。尤其是桌面应用，很多效果必须真的跑起来试，不像纯函数改完跑单测就结束。

## 十一、单实例、托盘和“找回悬浮球”

悬浮球这种常驻工具必须考虑异常情况：

- 用户重复启动怎么办？
- 球跑到屏幕外怎么办？
- 主窗口透明且不在任务栏里，怎么退出？
- 关闭窗口后是否还有托盘？

项目里用了 Named Mutex 保证单实例。重复启动时，通过 NamedPipe 通知已有实例，然后闪烁悬浮球并显示托盘提示。

托盘提供几个兜底入口：

- 找回悬浮球
- 设置
- 重新加载配置
- 退出

“找回悬浮球”看起来像小功能，但它很关键。因为只要是可拖拽、多屏、DPI、贴边的桌面工具，就一定会遇到位置异常的情况。给用户一个明确的救援入口，会让整个工具可信很多。

## 十二、用 Vibe Coding 的实际技巧

这个项目很适合用 Vibe Coding 做，但不适合“一句话让 AI 写完整个软件”。

更好的方式是：人负责方向、验收和体验判断，AI 负责实现、排查和整理。

### 1. 先写硬约束

比如这个项目里非常适合提前写下这些规则：

```text
Win32 P/Invoke 只能放在 NativeMethods.cs
状态机必须使用 AppState 枚举，不要多个 bool
动画只能用 Opacity，不改变窗口尺寸
每个 Process.Start 必须 try/catch + 日志
禁止 UI 线程 WaitForExit
菜单最多 8 项
```

如果你用的是 Codex、Claude Code 这类 coding agent，可以把这些内容放到 `AGENTS.md`、`CLAUDE.md` 或项目说明里。不要只在聊天里说一遍，因为上下文一长，临时口头规则很容易被冲淡。

### 2. 每次只让 AI 修一个明确问题

好的需求不是：

```text
帮我优化一下这个项目。
```

更好的说法是：

```text
当中心球靠近屏幕右边时，水平菜单最右边的选项和中心球太近；
左边没有这个问题。请先分析当前 Popup 定位逻辑，再只修复这个间距问题。
```

问题越具体，AI 越容易给出可验证的修改。

### 3. 把 bug 变成规则

遇到“重启应用后改动不生效”，就不要只修按钮，而是区分：

- 普通重启：重启当前 exe
- 开发重启：先 build，再重启 Debug exe

遇到“其他应用闪一下”，就把规则沉淀成：

- 主窗口要非激活
- 不因为悬浮球交互抢其他窗口焦点

遇到“图标黑色看不到”，就把规则沉淀成：

- 菜单项保持透明
- 图标层加光晕
- 不用大背景块破坏整体对齐

Vibe Coding 最大的收益不是一次生成很多代码，而是把每次踩坑都整理成下一次不会再犯的工程约束。

### 4. 人要亲自判断“手感”

AI 能判断代码是否合理，但很难替你判断这些东西：

- 菜单收得是不是太快
- 球贴边以后露出的宽度是否刚好
- 图标是否够清楚
- 拖动方向和展开方向是否符合直觉
- 设置窗口的排序按钮是否一眼能看懂

比如“方向反了”“右侧还是太近”“从侧边弹出后太快收回”，这些都是只有真正把程序跑在桌面上才会发现的问题。

### 5. 小步提交

FloatingBall 的开发很适合按阶段提交：

```text
MVP 悬浮球
设置窗口
拖拽排序
双 Popup 菜单
贴边隐藏 + 开机自启
交互和动画优化
README 和 GitHub 发布
```

小步提交的好处是，每次体验变差时都知道是哪一段改动引入的。这对 AI 辅助开发尤其重要，因为 AI 有时会顺手改动无关代码。提交粒度小，回看和修正成本就低。

## 十三、几个最值得记住的坑

### 1. `UseWindowsForms=true` 会带来类型歧义

项目用了 Windows Forms 的 `NotifyIcon` 做托盘，所以开启了 `UseWindowsForms=true`。

这会让一些类型变得容易冲突，比如 `Application`、`Point`、`Brushes`、`MessageBox`。

解决方式是显式 using 别名：

```csharp
using Application = System.Windows.Application;
using MessageBox = System.Windows.MessageBox;
using Point = System.Windows.Point;
```

### 2. 运行中的 exe 可能锁住 build 输出

桌面应用正在运行时，直接 `dotnet build` 有时会因为 exe 被占用而失败。开发重启功能的思路是：让新 PowerShell 等当前进程退出，再执行 build，然后启动新程序。

### 3. 相对路径不能相信当前目录

图标、中心球图片、配置里的资源路径，都要优先按程序输出目录解析：

```text
AppContext.BaseDirectory
```

否则一旦从开机自启、托盘重启或发布目录启动，资源就可能找不到。

### 4. 非激活窗口会改变事件假设

加上 `WS_EX_NOACTIVATE` 以后，窗口不再像普通窗口那样获得焦点。这会让一些基于 Activated / Deactivated 的逻辑失效。解决方式不是硬把焦点抢回来，而是重写交互判断：用鼠标进入、离开、菜单状态和延迟任务控制回收。

### 5. GitHub 推送也可能是环境问题

项目推送 GitHub 时遇到过连接 `github.com:443` 超时，最后通过 Git 代理解决：

```powershell
git config --global http.proxy http://127.0.0.1:7897
git config --global https.proxy http://127.0.0.1:7897
```

这不属于代码问题，但属于真实交付的一部分。项目没有推到远程，就还没有完全结束。

## 十四、构建和运行

本地构建：

```powershell
dotnet build
```

开发运行：

```powershell
dotnet run --project src/FloatingBall
```

发布单文件版本：

```powershell
dotnet publish src/FloatingBall -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true
```

源码仓库：

[https://github.com/modestyzht/FloatingBall](https://github.com/modestyzht/FloatingBall)

## 十五、写在最后

FloatingBall 是一个很小的项目，但它很适合用来理解 Vibe Coding。

因为它不是那种“生成一个页面就结束”的项目，而是一个需要不断试用、不断反馈、不断修正手感的桌面工具。

这也让我更确定一件事：

**Vibecoding 不是把代码全部甩给 AI，而是把人的体验判断和 AI 的执行能力组合起来。**

人负责发现不舒服的地方，描述清楚问题，定规则，验收结果；AI 负责读代码、找路径、实现修改、跑构建、整理文档。

当这两个角色配合得好，小工具也能越做越顺手。

FloatingBall 现在已经可以作为日常桌面启动器使用。后面还可以继续优化的方向包括：全屏应用自动隐藏、更细的菜单布局策略、更多启动模板、配置导入导出，以及更完整的发布安装流程。

但到这个版本为止，它已经完成了最初的目标：

**安静地待在桌面边缘，需要时出现，用完后退回去。**
