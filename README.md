# MiQiu Hexo Blog

这是 MiQiu 的个人数字花园源码仓库，内容以算法竞赛、数学体系、题解、学习笔记和文字作品为主。

- 站点域名：<https://raincnya.space>
- 生成器：Hexo 8
- 主题：Fluid 1.9
- 部署：GitHub Pages
- 默认分支：`main`
- 运行环境：Node.js 22（与 GitHub Actions 保持一致）

本文档同时作为后续维护任务的快速上下文。修改仓库前，建议先阅读“站点结构”“关键约定”和“验证与发布”。

## 快速开始

```powershell
npm ci
npm.cmd run build
npm.cmd run check:site
npm.cmd run server
```

Windows PowerShell 可能禁止执行 `npm.ps1`。遇到执行策略错误时使用 `npm.cmd`，不需要修改系统策略。

常用命令：

| 命令 | 用途 |
| --- | --- |
| `npm.cmd run build` | 生成站点到 `public/` |
| `npm.cmd run clean` | 清除 Hexo 数据库和生成结果 |
| `npm.cmd run check:site` | 检查源码、链接、图片和生成页面 |
| `npm.cmd run check` | 清理、生成并执行完整检查 |
| `npm.cmd run server` | 在本地启动预览服务器 |

## 站点结构

```text
Hexo_Blog/
├─ _config.yml                 # Hexo 核心配置
├─ _config.fluid.yml           # Fluid 主题、导航、配色、友链等配置
├─ source/
│  ├─ _posts/                  # 全部文章
│  ├─ about/                   # 关于页
│  ├─ categories/              # 分类页入口
│  ├─ links/                   # 友链页入口
│  ├─ works/                   # 独立作品集，跳过 Hexo 渲染
│  ├─ css/                     # 自定义主题样式
│  └─ img/                     # 站点公共图片
├─ scripts/                    # Hexo 构建期脚本
├─ tools/                      # 检查和作品生成工具
├─ .github/workflows/          # GitHub Pages 自动部署
└─ public/                     # 生成结果，不提交 Git
```

### 文章目录

`source/_posts/` 的一级目录用于组织内容，并由构建脚本映射为公开分类：

| 源目录 | 公开分类 |
| --- | --- |
| `210_Atlas` | 算法图谱 |
| `220_Library` | 题型书库 |
| `230_Notes` | 专题笔记 |
| `240_Math` | 数学体系 |
| `270_Solutions` | 比赛题解 |
| `280_Study` | 学习档案 |
| `290_Writings` | 文字作品 |

子目录名称可以带数字排序前缀，例如 `03_数论`；公开页面会去掉前缀，显示为“数论”。映射逻辑位于 `scripts/public_categories.js`。新增或重命名一级目录时，应同步更新其中的 `ROOT_CATEGORY_MAP`。

## 页面与导航

当前页眉保持五个主要入口：

1. 首页 `/`
2. 分类 `/categories/`
3. 作品 `/works/`
4. 关于 `/about/`
5. 友链 `/links/`

辅助页面不占用页眉：

- 最近更新：`/recent/`
- 全部标签：`/tags/`
- 时间归档：`/archives/`

首页并不是默认文章列表。`source/_posts/HomePage.md` 通过 `permalink: /` 提供数字花园导览；Hexo 的文章列表被配置到 `/recent/`。

`scripts/auxiliary_navigation.js` 会在分类页增加“全部标签”入口，并在最近更新页增加“时间归档”入口。页脚也保留分类、标签、归档和最近更新链接。

## 主题与配色

主题配置集中在 `_config.fluid.yml`，自定义样式集中在 `source/css/`。

亮色模式采用暖米白与灰紫配色：

- 页面背景：`#F3EFE7`
- 内容板：`#FFFCF6`
- 正文：`#35313F`
- 主链接：`#7863A3`

主要样式文件：

| 文件 | 职责 |
| --- | --- |
| `custom_v1.css` | 全局变量、字体、背景、主板、导航、滚动条 |
| `banner_v1.css` | Banner 标题和文章元信息 |
| `article_v1.css` | 正文溢出、图片、公式和表格 |
| `callout_v1.css` | Obsidian Callout 样式 |
| `home_v1.css` | 首页数字花园组件 |
| `taxonomy.css` | 分类、标签和归档页面样式 |

调整颜色时应同时检查页面背景、`#board`、首页卡片、链接、边框和暗色模式，避免只修改主题配置而遗漏自定义 CSS。

## Markdown 与 Obsidian 支持

仓库支持以下写作能力：

- KaTeX 数学公式
- Obsidian WikiLink / 标题链接
- Obsidian Callout
- Codeblock Customizer 代码块标题与折叠
- Markdown 文件相对链接解析
- 文章永久链接 `posts/:abbrlink/`

相关构建脚本：

- `scripts/obsidian_links.js`：解析指向 Markdown 文件的链接。
- `scripts/obsidian_callout.js`：将 Obsidian Callout 转换为 HTML。
- `scripts/codeblock_fold.js`：将 Codeblock Customizer 围栏参数转换为 Fluid 原生折叠块。
- `hexo-filter-titlebased-link`：解析基于标题的 WikiLink。

完整代码推荐使用下面的统一写法：

````markdown
```cpp title:"参考代码" fold
#include <bits/stdc++.h>
using namespace std;
```
````

在 Obsidian 中由 Codeblock Customizer 显示标题并折叠；Hexo 构建时会自动转换为 Fluid 原生 `fold`。短代码仍使用普通代码围栏。`title:` 也可以写成 `file:`；省略标题但保留 `fold` 时，博客端标题默认为“代码”。旧文章中的 `{% fold %}` 语法仍然兼容，可以按需逐步迁移。

文章通常需要包含 `title`、`date` 和 `abbrlink`。`abbrlink.writeback` 已启用，新文章首次构建时可能被自动写入永久链接字段。

## 独立作品集

`source/works/` 是独立设计的静态作品集，目前包含《风迹》。该目录在 `_config.yml` 的 `skip_render` 中，Hexo 会原样复制其中的 HTML 和 CSS，而不会套用 Fluid 页面模板。

修改作品集后，需要单独检查：

- 相对路径是否正确；
- 返回链接是否仍指向 `/works/`；
- 桌面端和移动端排版；
- 静态资源是否位于 `source/works/` 或公共资源目录。

## 验证与发布

提交前至少执行：

```powershell
npm.cmd run build
npm.cmd run check:site
git status --short
```

完整检查可使用：

```powershell
npm.cmd run check
```

`tools/site_check.js` 会检查 Front Matter、重复永久链接、本地图片、残留 Wiki 嵌入、`.md` 链接和生成页面。

推送 `main` 后，`.github/workflows/deploy.yml` 会自动执行：

1. `npm ci`
2. `npm run check`
3. 上传 `public/`
4. 发布到 GitHub Pages

因此不要提交 `public/`、`db.json` 或 `node_modules/`。仓库根目录的 `auto_push.bat` 会执行 `git add -A`，把工作区中的所有修改一起提交并推送；使用前务必检查 `git status --short`，避免把未完成的文章或目录迁移一并发布。

## 关键维护约定

- 不直接修改 `node_modules/hexo-theme-fluid`，主题更新会覆盖这些修改。
- 优先修改 `_config.fluid.yml` 和 `source/css/`。
- 不随意改变已有文章的 `abbrlink`，否则公开 URL 会变化。
- 移动文章目录时确认公开分类、WikiLink 和首页导航文章仍然正确。
- `public/` 是生成产物；问题应在源码、配置或构建脚本中修复。
- 工作区可能包含尚未提交的文章修改，执行批量格式化、移动或提交前先检查差异。
- 首页、作品页和分类体系经过定制，不要按默认 Hexo 结构推断其行为。

## 后续任务快速检查清单

开始维护任务时，依次查看：

1. `git status --short`：确认现有未提交修改。
2. `_config.yml`：确认 Hexo 路由、插件与生成设置。
3. `_config.fluid.yml`：确认导航、主题、配色和友链。
4. `scripts/`：确认构建期转换是否影响目标页面。
5. 对应的 `source/` 文件：只修改任务范围内的源码。
6. 生成后运行 `npm.cmd run check:site`。

如果任务涉及页面视觉效果，应至少检查亮色、暗色以及移动端宽度；如果涉及文章目录，应同时检查分类映射和永久链接。
