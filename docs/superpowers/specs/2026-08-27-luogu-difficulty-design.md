# 洛谷难度染色设计

## 目标

为 Hexo + Fluid 博客提供离线缓存、构建期静态渲染的洛谷难度染色。浏览器不会向洛谷请求难度数据，Markdown 不保存难度或展示 class。

## 边界

- 只识别 `luogu.com.cn` 与 `www.luogu.com.cn` 的 `/problem/<id>` 链接；`Pxxxx`、`CFxxxx`、`AT_xxx` 等 ID 一律按洛谷 `difficulty` 处理。
- 缓存只保存题目 ID、原始整数 `difficulty` 和该题最近一次成功同步的 ISO 时间。`0` 是已确认的“暂无评级”；缺失或非法数据是异常。
- 同步器扫描正式文章引用，默认补齐未缓存题目；`--refresh` 才刷新已有条目。失败不会删除或覆盖旧条目。
- 构建期根据缓存给整条链接写入 class 和状态；文章 Front Matter 的 `difficulty: false` 禁用本篇处理。
- `source/_posts/260_Records/Temp/**` 是本地草稿：不得提交、不得部署、不得进入同步器或站点检查。

## 组件

`lib/luogu_difficulty.js` 提供 URL/ID 识别、缓存条目判定、HTML 染色和 Markdown 扫描的纯函数。`scripts/luogu_difficulty_render.js` 将其注册为 Hexo 的 `after_post_render` 过滤器；`tools/sync_luogu_difficulties.js` 独立联网同步 `data/luogu_difficulties.json`。

`source/css/luogu_difficulty.css` 定义九档洛谷语义色、暂无评级灰色及独立异常警示色，并覆盖普通链接 hover 的颜色。缓存读取失败或网络失败不会阻断静态构建。

## 验证

Node 内置测试覆盖普通题、RemoteJudge、暂无评级、缓存缺失、文章关闭、非洛谷链接和同步失败保留旧缓存。最终以离线缓存构建、站点检查、生成页面 class 检查及 CSS 亮暗模式检查验证。
