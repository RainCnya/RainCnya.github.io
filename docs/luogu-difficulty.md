# 洛谷难度缓存

运行 `npm run sync:luogu` 会扫描已发布文章中的洛谷题目链接，并只补齐缓存中尚未存在的数据。运行 `npm run sync:luogu -- --refresh` 会重新同步所有已引用题目。

缓存位于 `data/luogu_difficulties.json`，每题仅保存洛谷原始 `difficulty` 与实际成功同步时间。同步中的单题失败不会覆盖旧记录；命令会报告失败并返回非零状态，博客构建仍可直接使用已有缓存。

Hexo 构建只读取本地缓存，不访问洛谷。文章 Front Matter 写入 `difficulty: false` 时，该篇文章不执行自动染色。

`source/_posts/260_Records/Temp/` 是未发布草稿目录，因此不会被 Git、Hexo、难度同步或站点检查纳入。
