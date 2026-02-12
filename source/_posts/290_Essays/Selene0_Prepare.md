---
title: Week0_Prepare
tags: Meta/Selene
categories:
  - 290_Essays
archive: true
abbrlink: 57d9ba9e
date: 2026-01-16 00:00:00
---

## 0. 预备工作

- 工欲善其事，必先利其器。在开始训练前，我们需要提前准备好工具。
- 大致分为以下三个部分。 1. IDE 2. 笔记软件 3. 浏览器插件。

## 1. IDE 集成开发环境.

`| DevC++ | VsCode | Trae | Cursor | ... | `  
我们这里采用 `VsCode` 作为主要训练 `IDE`。其他的 `IDE` 配置可以参考。

1. 先安装 `VSCodeUserSetup.exe`，默认配置即可，一路点下一步安装即可。
2. 接着下载 `mingw64`，这是编译器的主体，下载解压即可，注意找个合适的地方，记住它放在哪了。
3. 然后下载 `vscch.exe`，这是 `VsCode` 配置的简易小工具。

	- 第一步下一步即可；
	- 第二步是 `VsCode` 的目录；
	- 第三步是 `mingw64` 的目录；
	- 第四步是工作区文件夹，同样找一个合适的地方即可。
	- 第五步是配置选项，这里一般默认即可，有需要可以自行修改。 

4. 完成配置后会自动打开 `VsCode` 以及你的工作区。其他部分和 `DevC++` 都差不多了。
5. 如果有问题可以发群里 @我。

## 2. 笔记

`| Notion | Obsidian | Typora | ... |`

我们这里采用 `Obsidian` 作为主要笔记软件，笔记用 `Markdown` 语言编写，当然刚开始会不适应，但是对于已经学会 `C语言` 的你来说，肯定不是问题。

1. 安装 `Obsidian.exe`，同上一路下一步即可。
2. 打开后同样需要选择一个仓库(工作区)，同样是选择一个合适的位置即可。
3. 使用同理，也是新建文件夹和文件编辑。
4. 使用可以参考 B站 视频，有问题可以发群里 @我。

## 3. 设置

刚接触的时候，会发现有很多设置要改，不知道应该怎么修改很正常。先开始用，随着你慢慢使用过程中，你会不断了解自己需要什么，自然而然的就会配置出一份适合自己的个性化工作流。

下面我给出一些我的个人设置，可以参考。

### 物理文件树

```
MiQiu
  - 00_Workbench   // 主代码区 VsCode 工作区
  - 20_Publish     // 博客区 记录渗透笔记和题解报告
  - 30_Prosonal    // 个人笔记 记录散落的其他笔记
  - 80_Repository  // 资产区 写完处理后的代码文件都往这备份
  - 98_Template    // Obsidian 笔记的模板文件
  - 99_Cache       // 中转区 或者说 缓存区
```

### 工作流

代码在 `00_Workbench` 中完成，然后丢到 `99_Cache`，有意义的题目复盘写题解，然后把题解扔到 `20_Publish` 发博客上，接着就把题目扔到 `80_Respository`，最后通过 `Git` 丢到 `Github` 仓库里。

## 4. 相关插件

### CPH 插件

1. 先下载 `cph-ng-0.2.0.vsix`，然后直接拖到 `VsCode` 中安装。
2. 这里如果 `VsCode` 没汉化，`Ctrl + Shift + X` 打开扩展安装，搜索中文，安装对应的扩展即可。
3. 接着打开浏览器安装配套插件，[Competitive Companion - Chrome 应用商店](https://chromewebstore.google.com/detail/competitive-companion/cjnmckjndlpiamhfimnnjmnckgghkjbl) 可以直接参考链接打开安装。
4. 浏览器和 IDE 都装上之后，你可以打开一个 OJ，然后在题目页面，按一下浏览器的插件，它就会自动把题目数据同步到你的 IDE 中。
5. PS：TZOJ 暂时还不支持这个功能，或许在未来的某一天，我会把这个适配做好，当然，这个功能更多体现在刷 CF，ATC，洛谷，牛客等 OJ 上。

### Better CF/ATC

1. [篡改猴 - Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/%E7%AF%A1%E6%94%B9%E7%8C%B4/iikmkjmpaadaobahmlepeloendndfphd) 先安装篡改猴，这个浏览器扩展插件。
2. [用户脚本](https://greasyfork.org/zh-CN/scripts?q=better) 打开这个网页，安装 `Codeforces Better` 和 `Atcoder Better` 两个插件，主要用途为查看两个网站上英文题目的**翻译**。
3. 其他脚本按需自行下载。
