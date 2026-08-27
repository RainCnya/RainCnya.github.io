---
title: XCPC 综合题单（StudyingFather 裁剪补充版）
description: 从 XCPC / ICPC 区域赛视角裁剪并补充的综合训练题单，保留主线、可选与删除边界。
tags:
  - algorithm/题单
  - algorithm/学习方法
  - XCPC
categories:
  - 280_Study
comments: false
copyright: false
abbrlink: '60749789'
date: 2026-08-27 00:00:00
updated: 2026-08-27 00:00:00
---
# XCPC 综合题单（StudyingFather 裁剪补充版）

> 本题单以 Studying Father's「一个动态更新的洛谷综合题单」3.0.2 为底稿，从 XCPC / ICPC 区域赛视角重新裁剪，并补入原题单 2020 年后明显缺失或未独立成章的常用模块。
>
> 原题单仓库：https://github.com/SFOI-Team/luogu-problem-list
>
> 原题单采用 CC BY-SA 4.0 与 Star And Thank Author License。本衍生版保留原项目署名与来源；若公开传播或继续演绎，请同时遵守原项目许可要求。

## 使用标记

- **主线**：值得主动建设成稳定工具，专题学习时可以系统刷。
- **可选**：有实际价值，但不建议为了知识完整性主动板刷；遇到真实需求、赛题或专项训练时再进入。
- **补充**：原题单没有独立覆盖，按现代 XCPC 训练需求补入。
- **删除**：不进入主训练路线，只保留名字作为知识地图。

> 使用原则：这不是一张要求“全绿”的清单。已经稳定掌握的模板题直接跳过；同一模型连续多题没有新增约束时也可以停止，优先保留迁移价值。

---

# Part 1 基础算法

## 1.1 二分答案｜主线

- [ ] [P2678 跳石头](https://www.luogu.com.cn/problem/P2678)
- [ ] [P1824 进击的奶牛](https://www.luogu.com.cn/problem/P1824)
- [ ] [P1902 刺杀大使](https://www.luogu.com.cn/problem/P1902)
- [ ] [P1314 聪明的质监员](https://www.luogu.com.cn/problem/P1314)
- [ ] [P1083 借教室](https://www.luogu.com.cn/problem/P1083)
- [ ] [P4343 [SHOI2015] 自动刷题机](https://www.luogu.com.cn/problem/P4343)

重点不是会写二分，而是判断单调性、确定答案域、设计 `check`，并能识别“不能二分”的反例。

## 1.2 分治｜主线

- [ ] [P1908 逆序对](https://www.luogu.com.cn/problem/P1908)
- [ ] [P1429 平面最近点对（加强版）](https://www.luogu.com.cn/problem/P1429)
- [ ] [P3612 [USACO17JAN] Secret Cow Code](https://www.luogu.com.cn/problem/P3612)

普通递归不需要专题板刷，重点保留“分解—跨区间合并”这一类真正的分治结构。

## 1.3 贪心｜主线

- [ ] [P2672 推销员](https://www.luogu.com.cn/problem/P2672)
- [ ] [P1080 国王游戏](https://www.luogu.com.cn/problem/P1080)
- [ ] [P2123 皇后游戏](https://www.luogu.com.cn/problem/P2123)
- [ ] [P5521 [yLOI2019] 梅深不见冬](https://www.luogu.com.cn/problem/P5521)

贪心不以“背套路”为目标，重点训练交换论证、排序依据、局部决策为何不会破坏全局最优。

## 1.4 构造｜主线

- [ ] [P3599 Koishi Loves Construction](https://www.luogu.com.cn/problem/P3599)
- [ ] [P5441 【XR-2】伤痕](https://www.luogu.com.cn/problem/P5441)
- [ ] [P5595 【XR-4】歌唱比赛](https://www.luogu.com.cn/problem/P5595)

构造题本身不适合靠老 OI 题单覆盖完全，后续仍需要通过 Codeforces、AtCoder、ICPC 真题持续训练。

## 1.5 前缀和 / 差分｜主线

- [ ] [P3131 [USACO16JAN] Subsequences Summing to Sevens](https://www.luogu.com.cn/problem/P3131)
- [ ] [P2280 [HNOI2003] 激光炸弹](https://www.luogu.com.cn/problem/P2280)
- [ ] [P4552 [Poetize6] IncDec Sequence](https://www.luogu.com.cn/problem/P4552)

## 1.6 高精度｜可选

不再板刷手写四则运算。XCPC 中优先掌握 `boost::multiprecision::cpp_int` 的基本使用；只有题目明确要求手写大整数运算时再补。

---

# Part 2 搜索

## 2.1 DFS / BFS / 记忆化搜索｜主线但不板刷基础题

基础遍历默认应当已经稳定，不再保留八皇后、迷宫一类纯模板题。真正需要训练的是状态设计、去重、搜索边界、复杂度估计和剪枝。

## 2.2 搜索剪枝｜主线

- [ ] [P1120 小木棍](https://www.luogu.com.cn/problem/P1120)
- [ ] [P1312 Mayan 游戏](https://www.luogu.com.cn/problem/P1312)
- [ ] [P1074 靶形数独](https://www.luogu.com.cn/problem/P1074)

## 2.3 双向搜索 / Meet-in-the-Middle｜主线

- [ ] [P3067 [USACO12OPEN] Balanced Cow Subsets](https://www.luogu.com.cn/problem/P3067)
- [ ] [P4799 [CEOI2015 Day2] 世界冰球锦标赛](https://www.luogu.com.cn/problem/P4799)
- [ ] [P5195 [USACO05DEC] Knights of Ni](https://www.luogu.com.cn/problem/P5195)

这里重点保留 Meet-in-the-Middle。它在“小规模指数搜索”中仍然是非常实用的 XCPC 技巧。

---

# Part 3 动态规划

## 3.1 线性 DP｜主线

- [ ] [P1020 导弹拦截](https://www.luogu.com.cn/problem/P1020)
- [ ] [P1541 乌龟棋](https://www.luogu.com.cn/problem/P1541)
- [ ] [P1868 饥饿的奶牛](https://www.luogu.com.cn/problem/P1868)
- [ ] [P2679 子串](https://www.luogu.com.cn/problem/P2679)
- [ ] [P2501 [HAOI2006] 数字序列](https://www.luogu.com.cn/problem/P2501)
- [ ] [P3558 [POI2013] BAJ-Bytecomputer](https://www.luogu.com.cn/problem/P3558)
- [ ] [P4158 [SCOI2009] 粉刷匠](https://www.luogu.com.cn/problem/P4158)

## 3.2 背包 DP｜主线

- [ ] [P5020 货币系统](https://www.luogu.com.cn/problem/P5020)
- [ ] [P1757 通天之分组背包](https://www.luogu.com.cn/problem/P1757)
- [ ] [P1064 金明的预算方案](https://www.luogu.com.cn/problem/P1064)
- [ ] [P2946 [USACO09MAR] Cow Frisbee Team](https://www.luogu.com.cn/problem/P2946)
- [ ] [P1156 垃圾陷阱](https://www.luogu.com.cn/problem/P1156)
- [ ] [P5322 [BJOI2019] 排兵布阵](https://www.luogu.com.cn/problem/P5322)

## 3.3 区间 DP｜主线

- [ ] [P1880 [NOI1995] 石子合并](https://www.luogu.com.cn/problem/P1880)
- [ ] [P3146 [USACO16OPEN] 248](https://www.luogu.com.cn/problem/P3146)
- [ ] [P1063 能量项链](https://www.luogu.com.cn/problem/P1063)
- [ ] [P4170 [CQOI2007] 涂色](https://www.luogu.com.cn/problem/P4170)
- [ ] [P4302 [SCOI2003] 字符串折叠](https://www.luogu.com.cn/problem/P4302)
- [ ] [P2466 [SDOI2008] Sue 的小球](https://www.luogu.com.cn/problem/P2466)

## 3.4 树形 DP｜主线

- [ ] [P1352 没有上司的舞会](https://www.luogu.com.cn/problem/P1352)
- [ ] [P1273 有线电视网](https://www.luogu.com.cn/problem/P1273)
- [ ] [P2014 选课](https://www.luogu.com.cn/problem/P2014)
- [ ] [P3047 [USACO12FEB] Nearby Cows](https://www.luogu.com.cn/problem/P3047)
- [ ] [P2607 [ZJOI2008] 骑士](https://www.luogu.com.cn/problem/P2607)
- [ ] [P3177 [HAOI2015] 树上染色](https://www.luogu.com.cn/problem/P3177)
- [ ] [P4516 [JSOI2018] 潜入行动](https://www.luogu.com.cn/problem/P4516)

### 换根 DP｜补充 · 主线

- [ ] [P3478 [POI2008] STA-Station](https://www.luogu.com.cn/problem/P3478)
- [ ] [CF1092F Tree with Maximum Cost](https://www.luogu.com.cn/problem/CF1092F)
- [ ] [P2986 [USACO10MAR] Great Cow Gathering](https://www.luogu.com.cn/problem/P2986)

原题单有树形 DP，但没有把换根 DP 独立出来。XCPC 中这一模型值得单列。

## 3.5 状态压缩 DP｜主线

- [ ] [P2704 [NOI2001] 炮兵阵地](https://www.luogu.com.cn/problem/P2704)
- [ ] [P1879 [USACO06NOV] Corn Fields](https://www.luogu.com.cn/problem/P1879)
- [ ] [P1896 [SCOI2005] 互不侵犯](https://www.luogu.com.cn/problem/P1896)
- [ ] [P3092 [USACO13NOV] No Change](https://www.luogu.com.cn/problem/P3092)
- [ ] [P3694 邦邦的大合唱站队](https://www.luogu.com.cn/problem/P3694)
- [ ] [P2157 [SDOI2009] 学校食堂](https://www.luogu.com.cn/problem/P2157)
- [ ] [P4363 [九省联考2018] 一双木棋](https://www.luogu.com.cn/problem/P4363)

### SOS DP / 子集和 DP｜补充 · 主线

- [ ] [CF165E Compatible Numbers](https://www.luogu.com.cn/problem/CF165E)
- [ ] [CF449D Jzzhu and Numbers](https://www.luogu.com.cn/problem/CF449D)
- [ ] [AT_arc100_c [ARC100E] Or Plus Max](https://www.luogu.com.cn/problem/AT_arc100_c)

需要掌握子集 / 超集信息的批量传播，以及按位枚举子集的复杂度边界。

## 3.6 单调队列优化 DP｜主线

- [ ] [P1776 宝物筛选](https://www.luogu.com.cn/problem/P1776)
- [ ] [P3572 [POI2014] Little Bird](https://www.luogu.com.cn/problem/P3572)
- [ ] [P3522 [POI2011] Temperature](https://www.luogu.com.cn/problem/P3522)
- [ ] [P2569 [SCOI2010] 股票交易](https://www.luogu.com.cn/problem/P2569)

## 3.7 斜率优化 / Convex Hull Trick｜主线

- [ ] [P2900 [USACO08MAR] Land Acquisition](https://www.luogu.com.cn/problem/P2900)
- [ ] [P3195 [HNOI2008] 玩具装箱](https://www.luogu.com.cn/problem/P3195)
- [ ] [P3628 [APIO2010] 特别行动队](https://www.luogu.com.cn/problem/P3628)
- [ ] [P3648 [APIO2014] 序列分割](https://www.luogu.com.cn/problem/P3648)

## 3.8 数位 DP｜主线

- [ ] [P2602 [ZJOI2010] 数字计数](https://www.luogu.com.cn/problem/P2602)
- [ ] [P2657 [SCOI2009] windy 数](https://www.luogu.com.cn/problem/P2657)
- [ ] [P4124 [CQOI2016] 手机号码](https://www.luogu.com.cn/problem/P4124)
- [ ] [P4999 烦人的数学作业](https://www.luogu.com.cn/problem/P4999)

## 3.9 决策单调性优化｜可选

- [ ] [P3515 [POI2011] Lightning Conductor](https://www.luogu.com.cn/problem/P3515)
- [ ] [P4767 [IOI2000] 邮局](https://www.luogu.com.cn/problem/P4767)
- [ ] [P1912 [NOI2009] 诗人小 G](https://www.luogu.com.cn/problem/P1912)

建议把“分治优化 DP / Knuth 优化 / 四边形不等式”作为后续独立知识节点，而不是把原题单这一节全部板刷。

## 3.10 动态 DP｜可选

- [ ] [P4719 【模板】动态 DP](https://www.luogu.com.cn/problem/P4719)
- [ ] [P4751 动态 DP 加强版](https://www.luogu.com.cn/problem/P4751)

## 3.11 轮廓线 / 插头 DP｜可选

- [ ] [P5056 【模板】插头 DP](https://www.luogu.com.cn/problem/P5056)
- [ ] [P5347 【XR-1】俄罗斯方块](https://www.luogu.com.cn/problem/P5347)

---

# Part 4 字符串

## 4.1 字符串哈希｜主线

- [ ] [P3370 【模板】字符串哈希](https://www.luogu.com.cn/problem/P3370)
- [ ] [P5270 无论怎样神树大人都会删库跑路](https://www.luogu.com.cn/problem/P5270)
- [ ] [P5537 【XR-3】系统设计](https://www.luogu.com.cn/problem/P5537)

除了单哈希，还应掌握双哈希 / 64 位自然溢出哈希及碰撞风险意识。

## 4.2 KMP / 前缀函数｜主线

- [ ] [P3375 【模板】KMP 字符串匹配](https://www.luogu.com.cn/problem/P3375)
- [ ] [P4391 [BOI2009] Radio Transmission](https://www.luogu.com.cn/problem/P4391)
- [ ] [P3435 [POI2006] Periods of Words](https://www.luogu.com.cn/problem/P3435)
- [ ] [P4824 [USACO15FEB] Censoring (Silver)](https://www.luogu.com.cn/problem/P4824)
- [ ] [P2375 [NOI2014] 动物园](https://www.luogu.com.cn/problem/P2375)
- [ ] [P3426 [POI2005] Template](https://www.luogu.com.cn/problem/P3426)
- [ ] [P3193 [HNOI2008] GT 考试](https://www.luogu.com.cn/problem/P3193)

## 4.3 Z 函数 / 扩展 KMP｜补充 · 主线

- [ ] [P5410 【模板】扩展 KMP / exKMP（Z 函数）](https://www.luogu.com.cn/problem/P5410)
- [ ] [CF126B Password](https://www.luogu.com.cn/problem/CF126B)
- [ ] [CF432D Prefixes and Suffixes](https://www.luogu.com.cn/problem/CF432D)

Z 函数应当与前缀函数并列掌握。重点是 Z-box 的线性维护、前缀与各后缀 LCP、周期 / Border 类应用。

## 4.4 Trie / 01-Trie｜主线

- [ ] [P3879 [TJOI2010] 阅读理解](https://www.luogu.com.cn/problem/P3879)
- [ ] [P2292 [HNOI2004] L 语言](https://www.luogu.com.cn/problem/P2292)
- [ ] [P2922 [USACO08DEC] Secret Message](https://www.luogu.com.cn/problem/P2922)
- [ ] [P3065 [USACO12DEC] First!](https://www.luogu.com.cn/problem/P3065)
- [ ] [P4551 最长异或路径](https://www.luogu.com.cn/problem/P4551)

## 4.5 AC 自动机｜主线

- [ ] [P3808 【模板】AC 自动机（简单版）](https://www.luogu.com.cn/problem/P3808)
- [ ] [P3796 【模板】AC 自动机（加强版）](https://www.luogu.com.cn/problem/P3796)
- [ ] [P5357 【模板】AC 自动机（二次加强版）](https://www.luogu.com.cn/problem/P5357)
- [ ] [P3121 [USACO15FEB] Censoring (Gold)](https://www.luogu.com.cn/problem/P3121)
- [ ] [P2414 [NOI2011] 阿狸的打字机](https://www.luogu.com.cn/problem/P2414)
- [ ] [P3966 [TJOI2013] 单词](https://www.luogu.com.cn/problem/P3966)
- [ ] [P2444 [POI2000] 病毒](https://www.luogu.com.cn/problem/P2444)
- [ ] [P3311 [SDOI2014] 数数](https://www.luogu.com.cn/problem/P3311)
- [ ] [P4052 [JSOI2007] 文本生成器](https://www.luogu.com.cn/problem/P4052)

## 4.6 Manacher｜主线

- [ ] [P3805 【模板】Manacher](https://www.luogu.com.cn/problem/P3805)
- [ ] [P4555 [国家集训队] 最长双回文串](https://www.luogu.com.cn/problem/P4555)
- [ ] [P1659 [国家集训队] 拉拉队排练](https://www.luogu.com.cn/problem/P1659)

## 4.7 后缀数组 SA｜可选

- [ ] [P3809 【模板】后缀排序](https://www.luogu.com.cn/problem/P3809)
- [ ] [P2463 [SDOI2008] Sandy 的卡片](https://www.luogu.com.cn/problem/P2463)
- [ ] [P2852 [USACO06DEC] Milk Patterns](https://www.luogu.com.cn/problem/P2852)
- [ ] [P4051 [JSOI2007] 字符加密](https://www.luogu.com.cn/problem/P4051)
- [ ] [P2178 [NOI2015] 品酒大会](https://www.luogu.com.cn/problem/P2178)

## 4.8 后缀自动机 SAM｜可选

- [ ] [P3804 【模板】后缀自动机](https://www.luogu.com.cn/problem/P3804)
- [ ] [P3975 [TJOI2015] 弦论](https://www.luogu.com.cn/problem/P3975)
- [ ] [P4248 [AHOI2013] 差异](https://www.luogu.com.cn/problem/P4248)
- [ ] [P4770 [NOI2018] 你的名字](https://www.luogu.com.cn/problem/P4770)

## 4.9 回文自动机 PAM｜可选

- [ ] [P5496 【模板】回文自动机](https://www.luogu.com.cn/problem/P5496)
- [ ] [P3649 [APIO2014] 回文串](https://www.luogu.com.cn/problem/P3649)
- [ ] [P4287 [SHOI2011] 双倍回文](https://www.luogu.com.cn/problem/P4287)

---

# Part 5 数学

## 5.1 位运算 / 子集枚举｜主线

原题单的位运算题目较旧且偏杂。XCPC 更应稳定掌握：lowbit、子集枚举、超集枚举、异或性质、按位贡献，以及和状压 DP / SOS DP 的联动。

- [ ] [P5657 格雷码](https://www.luogu.com.cn/problem/P5657)
- [ ] [CF165E Compatible Numbers](https://www.luogu.com.cn/problem/CF165E)

## 5.2 素数与筛法｜主线

- [ ] [P3383 【模板】线性筛素数](https://www.luogu.com.cn/problem/P3383)
- [ ] [P1075 质因数分解](https://www.luogu.com.cn/problem/P1075)
- [ ] [P4213 【模板】杜教筛](https://www.luogu.com.cn/problem/P4213)
- [ ] [P5325 【模板】Min_25 筛](https://www.luogu.com.cn/problem/P5325) `可选`
- [ ] [P4718 【模板】Pollard-Rho](https://www.luogu.com.cn/problem/P4718) `可选`

Miller–Rabin + Pollard–Rho 更适合作为“遇到 64 位大整数分解时再启用”的工具，不需要现在板刷。

## 5.3 GCD / 欧拉函数｜主线

- [ ] [P1029 最大公约数和最小公倍数问题](https://www.luogu.com.cn/problem/P1029)
- [ ] [P1414 又是毕业季 II](https://www.luogu.com.cn/problem/P1414)
- [ ] [P1072 Hankson 的趣味题](https://www.luogu.com.cn/problem/P1072)
- [ ] [P2158 [SDOI2008] 仪仗队](https://www.luogu.com.cn/problem/P2158)
- [ ] [P2568 GCD](https://www.luogu.com.cn/problem/P2568)
- [ ] [P2398 GCD SUM](https://www.luogu.com.cn/problem/P2398)

## 5.4 同余 / 逆元 / CRT｜主线

- [ ] [P4549 【模板】裴蜀定理](https://www.luogu.com.cn/problem/P4549)
- [ ] [P3811 【模板】乘法逆元](https://www.luogu.com.cn/problem/P3811)
- [ ] [P1082 同余方程](https://www.luogu.com.cn/problem/P1082)
- [ ] [P1516 青蛙的约会](https://www.luogu.com.cn/problem/P1516)
- [ ] [P4777 【模板】扩展中国剩余定理](https://www.luogu.com.cn/problem/P4777)
- [ ] [P3868 [TJOI2009] 猜数字](https://www.luogu.com.cn/problem/P3868)

### BSGS / 二次剩余｜可选

- [ ] [P4195 【模板】exBSGS](https://www.luogu.com.cn/problem/P4195)
- [ ] [P5491 【模板】二次剩余](https://www.luogu.com.cn/problem/P5491)

## 5.5 博弈论｜主线基础

- [ ] [P2197 【模板】Nim 游戏](https://www.luogu.com.cn/problem/P2197)
- [ ] [P1288 取数游戏 II](https://www.luogu.com.cn/problem/P1288)
- [ ] [P1290 欧几里德的游戏](https://www.luogu.com.cn/problem/P1290)
- [ ] [P2252 取石子游戏](https://www.luogu.com.cn/problem/P2252)

### SG 函数｜补充 · 主线

原题单没有把 Sprague–Grundy 理论独立成节。需要掌握子游戏分解、mex、SG 异或以及常见无偏组合游戏建模。

## 5.6 概率与期望｜主线

- [ ] [P5104 红包发红包](https://www.luogu.com.cn/problem/P5104)
- [ ] [P1850 换教室](https://www.luogu.com.cn/problem/P1850)
- [ ] [P2473 [SCOI2008] 奖励关](https://www.luogu.com.cn/problem/P2473)
- [ ] [P4284 [SHOI2014] 概率充电器](https://www.luogu.com.cn/problem/P4284)
- [ ] [P3239 [HNOI2015] 亚瑟王](https://www.luogu.com.cn/problem/P3239)

## 5.7 组合数学 / 容斥｜主线

- [ ] [P3807 【模板】Lucas 定理](https://www.luogu.com.cn/problem/P3807)
- [ ] [P2822 组合数问题](https://www.luogu.com.cn/problem/P2822)
- [ ] [P3197 [HNOI2008] 越狱](https://www.luogu.com.cn/problem/P3197)
- [ ] [P1450 [HAOI2008] 硬币购物](https://www.luogu.com.cn/problem/P1450)
- [ ] [P4336 [SHOI2016] 黑暗前的幻想乡](https://www.luogu.com.cn/problem/P4336)
- [ ] [P5339 [TJOI2019] 唱、跳、rap 和篮球](https://www.luogu.com.cn/problem/P5339)

### Catalan / Stirling｜可选

- [ ] [P2532 [AHOI2012] 树屋阶梯](https://www.luogu.com.cn/problem/P2532)
- [ ] [P3200 [HNOI2009] 有趣的数列](https://www.luogu.com.cn/problem/P3200)
- [ ] [P4091 [HEOI2016/TJOI2016] 求和](https://www.luogu.com.cn/problem/P4091)

## 5.8 矩阵 / 线性递推｜主线

- [ ] [P3390 【模板】矩阵快速幂](https://www.luogu.com.cn/problem/P3390)
- [ ] [P1939 【模板】矩阵加速](https://www.luogu.com.cn/problem/P1939)
- [ ] [P3758 [TJOI2017] 可乐](https://www.luogu.com.cn/problem/P3758)
- [ ] [P5337 [TJOI2019] 甲苯先生的字符串](https://www.luogu.com.cn/problem/P5337)

## 5.9 高斯消元｜主线

- [ ] [P3389 【模板】高斯消元法](https://www.luogu.com.cn/problem/P3389)
- [ ] [P2447 [SDOI2010] 外星千足虫](https://www.luogu.com.cn/problem/P2447)
- [ ] [P4035 [JSOI2008] 球形空间产生器](https://www.luogu.com.cn/problem/P4035)

## 5.10 线性基｜主线

- [ ] [P3812 【模板】线性基](https://www.luogu.com.cn/problem/P3812)
- [ ] [P3857 [TJOI2008] 彩灯](https://www.luogu.com.cn/problem/P3857)
- [ ] [P4570 [BJWC2011] 元素](https://www.luogu.com.cn/problem/P4570)
- [ ] [P4301 [CQOI2013] 新 Nim 游戏](https://www.luogu.com.cn/problem/P4301)
- [ ] [P4151 [WC2011] 最大 XOR 和路径](https://www.luogu.com.cn/problem/P4151)

## 5.11 FFT / NTT｜主线到基础卷积

- [ ] [P3803 【模板】多项式乘法（FFT）](https://www.luogu.com.cn/problem/P3803)
- [ ] [P4245 【模板】任意模数 NTT](https://www.luogu.com.cn/problem/P4245)
- [ ] [P3338 [ZJOI2014] 力](https://www.luogu.com.cn/problem/P3338)
- [ ] [P3723 [AH2017/HNOI2017] 礼物](https://www.luogu.com.cn/problem/P3723)

### FPS / 多项式全家桶｜可选

多项式求逆、ln、exp、sqrt、多点求值、复合等全部放入可选，不作为区域赛主线板刷内容。

## 5.12 莫比乌斯反演 / 数论求和｜可选但有价值

- [ ] [P2522 [HAOI2011] Problem b](https://www.luogu.com.cn/problem/P2522)
- [ ] [P3455 [POI2007] ZAP-Queries](https://www.luogu.com.cn/problem/P3455)
- [ ] [P3327 [SDOI2015] 约数个数和](https://www.luogu.com.cn/problem/P3327)
- [ ] [P1829 Crash 的数字表格](https://www.luogu.com.cn/problem/P1829)

## 5.13 三分｜可选但应会

- [ ] [P3382 【模板】三分法](https://www.luogu.com.cn/problem/P3382)
- [ ] [P1883 函数](https://www.luogu.com.cn/problem/P1883)

## 5.14 Burnside / Pólya｜可选

- [ ] [P4980 【模板】Pólya 定理](https://www.luogu.com.cn/problem/P4980)
- [ ] [P1446 [HNOI2008] Cards](https://www.luogu.com.cn/problem/P1446)

---

# Part 6 数据结构

## 6.1 单调栈 / 单调队列｜补充 · 主线

- [ ] [P5788 【模板】单调栈](https://www.luogu.com.cn/problem/P5788)
- [ ] [P1886 滑动窗口 / 【模板】单调队列](https://www.luogu.com.cn/problem/P1886)

原题单把单调队列主要放在 DP 优化里，却没有把这两类数据结构独立作为“最近更优候选 / 边界维护”工具整理。

## 6.2 并查集｜主线

- [ ] [P3958 奶酪](https://www.luogu.com.cn/problem/P3958)
- [ ] [P1525 关押罪犯](https://www.luogu.com.cn/problem/P1525)
- [ ] [P4185 [USACO18JAN] MooTube](https://www.luogu.com.cn/problem/P4185)
- [ ] [P2024 [NOI2001] 食物链](https://www.luogu.com.cn/problem/P2024)
- [ ] [P1197 [JSOI2008] 星球大战](https://www.luogu.com.cn/problem/P1197)
- [ ] [P1196 [NOI2002] 银河英雄传说](https://www.luogu.com.cn/problem/P1196)
- [ ] [P1955 [NOI2015] 程序自动分析](https://www.luogu.com.cn/problem/P1955)

## 6.3 堆 / 优先队列｜主线

- [ ] [P3378 【模板】堆](https://www.luogu.com.cn/problem/P3378)
- [ ] [P1168 中位数](https://www.luogu.com.cn/problem/P1168)
- [ ] [P2085 最小函数值](https://www.luogu.com.cn/problem/P2085)
- [ ] [P3045 [USACO12FEB] Cow Coupons](https://www.luogu.com.cn/problem/P3045)

## 6.4 ST 表 / Sparse Table｜主线

- [ ] [P3865 【模板】ST 表](https://www.luogu.com.cn/problem/P3865)
- [ ] [P2880 [USACO07JAN] Balanced Lineup](https://www.luogu.com.cn/problem/P2880)
- [ ] [P2048 [NOI2010] 超级钢琴](https://www.luogu.com.cn/problem/P2048)

## 6.5 树状数组｜主线

- [ ] [P3374 【模板】树状数组 1](https://www.luogu.com.cn/problem/P3374)
- [ ] [P1908 逆序对](https://www.luogu.com.cn/problem/P1908)
- [ ] [P1972 [SDOI2009] HH 的项链](https://www.luogu.com.cn/problem/P1972)
- [ ] [P4113 [HEOI2012] 采花](https://www.luogu.com.cn/problem/P4113)

## 6.6 线段树｜主线

- [ ] [P3372 【模板】线段树 1](https://www.luogu.com.cn/problem/P3372)
- [ ] [P3373 【模板】线段树 2](https://www.luogu.com.cn/problem/P3373)
- [ ] [P5490 【模板】扫描线](https://www.luogu.com.cn/problem/P5490)
- [ ] [P1502 窗口的星星](https://www.luogu.com.cn/problem/P1502)
- [ ] [P2824 [HEOI2016/TJOI2016] 排序](https://www.luogu.com.cn/problem/P2824)

额外应掌握：线段树上二分、动态开点、维护复杂节点信息。它们不需要各自成为大型题单。

## 6.7 平衡树｜可选

- [ ] [P3369 【模板】普通平衡树](https://www.luogu.com.cn/problem/P3369)
- [ ] [P3391 【模板】文艺平衡树](https://www.luogu.com.cn/problem/P3391)
- [ ] [P1486 [NOI2004] 郁闷的出纳员](https://www.luogu.com.cn/problem/P1486)

XCPC 中优先熟悉 `set` / `multiset` / PBDS 等现成结构。只有需要序列翻转、分裂合并等操作时再考虑手写 Treap / Splay。

## 6.8 树链剖分｜主线

- [ ] [P3384 【模板】树链剖分](https://www.luogu.com.cn/problem/P3384)
- [ ] [P2590 [ZJOI2008] 树的统计](https://www.luogu.com.cn/problem/P2590)
- [ ] [P2486 [SDOI2011] 染色](https://www.luogu.com.cn/problem/P2486)
- [ ] [P4211 [LNOI2014] LCA](https://www.luogu.com.cn/problem/P4211)

## 6.9 主席树 / 可持久化线段树｜可选

- [ ] [P3834 【模板】可持久化线段树](https://www.luogu.com.cn/problem/P3834)
- [ ] [P2633 Count on a Tree](https://www.luogu.com.cn/problem/P2633)
- [ ] [P3168 [CQOI2015] 任务查询系统](https://www.luogu.com.cn/problem/P3168)

## 6.10 树上启发式合并 / DSU on Tree｜补充 · 可选偏重要

- [ ] [CF600E Lomsat gelral](https://www.luogu.com.cn/problem/CF600E)
- [ ] [CF570D Tree Requests](https://www.luogu.com.cn/problem/CF570D)
- [ ] [CF1009F Dominant Indices](https://www.luogu.com.cn/problem/CF1009F)
- [ ] [P9886 [ICPC 2018 Qingdao R] Kawa Exam](https://www.luogu.com.cn/problem/P9886)

同时理解普通 small-to-large 合并。树上统计题出现“为每棵子树维护一个集合 / 频次结构”时，应能想到启发式合并。

## 6.11 分块 / 莫队｜可选偏重要

- [ ] [P1494 【模板】莫队](https://www.luogu.com.cn/problem/P1494)
- [ ] [P2709 小 B 的询问](https://www.luogu.com.cn/problem/P2709)
- [ ] [P1903 带修莫队](https://www.luogu.com.cn/problem/P1903)
- [ ] [P5906 回滚莫队](https://www.luogu.com.cn/problem/P5906) `可选`

## 6.12 CDQ 分治 / 整体二分｜可选

- [ ] [P3810 【模板】三维偏序](https://www.luogu.com.cn/problem/P3810)
- [ ] [P3157 [CQOI2011] 动态逆序对](https://www.luogu.com.cn/problem/P3157)
- [ ] [P3527 [POI2011] Meteors](https://www.luogu.com.cn/problem/P3527)

---

# Part 7 图论

## 7.1 最短路｜主线

- [ ] [P4779 【模板】单源最短路径](https://www.luogu.com.cn/problem/P4779)
- [ ] [P1144 最短路计数](https://www.luogu.com.cn/problem/P1144)
- [ ] [P1462 通往奥格瑞玛的道路](https://www.luogu.com.cn/problem/P1462)
- [ ] [P4568 [JLOI2011] 飞行路线](https://www.luogu.com.cn/problem/P4568)
- [ ] [P5304 [GXOI/GZOI2019] 旅行者](https://www.luogu.com.cn/problem/P5304)

### 0-1 BFS｜补充 · 主线

原题单没有独立列出 0-1 BFS。需要掌握边权只有 0 / 1 时用双端队列维护最短路，并识别它与 Dijkstra 的关系。

### Bellman-Ford / SPFA / 负环｜主线到识别层

- [ ] [P3385 【模板】负环](https://www.luogu.com.cn/problem/P3385)

Johnson 全源最短路放入可选，不要求主动板刷。

## 7.2 树的直径 / LCA｜主线

- [ ] [P3629 [APIO2010] 巡逻](https://www.luogu.com.cn/problem/P3629)
- [ ] [P1099 树网的核](https://www.luogu.com.cn/problem/P1099)
- [ ] [P3379 【模板】LCA](https://www.luogu.com.cn/problem/P3379)
- [ ] [P4281 [AHOI2008] 紧急集合](https://www.luogu.com.cn/problem/P4281)

## 7.3 最小生成树｜主线

- [ ] [P3366 【模板】最小生成树](https://www.luogu.com.cn/problem/P3366)
- [ ] [P4180 【模板】严格次小生成树](https://www.luogu.com.cn/problem/P4180)
- [ ] [P1967 货车运输](https://www.luogu.com.cn/problem/P1967)
- [ ] [P4047 [JSOI2010] 部落划分](https://www.luogu.com.cn/problem/P4047)

## 7.4 拓扑排序 / DAG｜主线

- [ ] [P1113 杂务](https://www.luogu.com.cn/problem/P1113)
- [ ] [P1983 车站分级](https://www.luogu.com.cn/problem/P1983)
- [ ] [P1038 神经网络](https://www.luogu.com.cn/problem/P1038)

## 7.5 SCC / 割点 / 双连通｜主线

- [ ] [P3387 【模板】缩点](https://www.luogu.com.cn/problem/P3387)
- [ ] [P3388 【模板】割点](https://www.luogu.com.cn/problem/P3388)
- [ ] [P2341 [HAOI2006] 受欢迎的牛](https://www.luogu.com.cn/problem/P2341)
- [ ] [P2746 [USACO5.3] Network of Schools](https://www.luogu.com.cn/problem/P2746)
- [ ] [P3225 [HNOI2012] 矿场搭建](https://www.luogu.com.cn/problem/P3225)

### 边双 / 点双 / 圆方树｜补充 · 主线

- [ ] [P8436 【模板】边双连通分量](https://www.luogu.com.cn/problem/P8436)
- [ ] [P8435 【模板】点双连通分量](https://www.luogu.com.cn/problem/P8435)

应同时掌握桥、割点、e-DCC、v-DCC，以及需要时构造圆方树 / block-cut tree。

## 7.6 欧拉路径 / 欧拉回路｜补充 · 主线

- [ ] [P7771 【模板】欧拉路径](https://www.luogu.com.cn/problem/P7771)

掌握存在性判定与 Hierholzer 算法。它在路径构造、字符串拼接、边恰好使用一次等题型中比 A* / DLX 更值得提前建设。

## 7.7 二分图｜主线

- [ ] [P3386 【模板】二分图最大匹配](https://www.luogu.com.cn/problem/P3386)
- [ ] [P2756 飞行员配对方案问题](https://www.luogu.com.cn/problem/P2756)
- [ ] [P1129 [ZJOI2007] 矩阵游戏](https://www.luogu.com.cn/problem/P1129)
- [ ] [P2764 最小路径覆盖问题](https://www.luogu.com.cn/problem/P2764)
- [ ] [P4014 分配问题](https://www.luogu.com.cn/problem/P4014)

理论上同时掌握 Hall 定理、Kőnig 定理、最小点覆盖、最大独立集与路径覆盖之间的关系。

## 7.8 最大流 / 最小割｜主线

- [ ] [P3376 【模板】网络最大流](https://www.luogu.com.cn/problem/P3376)
- [ ] [P2763 试题库问题](https://www.luogu.com.cn/problem/P2763)
- [ ] [P2472 [SCOI2007] 蜥蜴](https://www.luogu.com.cn/problem/P2472)
- [ ] [P2765 魔术球问题](https://www.luogu.com.cn/problem/P2765)
- [ ] [P2766 最长不下降子序列问题](https://www.luogu.com.cn/problem/P2766)
- [ ] [P1345 [USACO5.4] 奶牛的电信 Telecowmunication](https://www.luogu.com.cn/problem/P1345)

预流推进 / HLPP 不作为主线模板，Dinic 足以覆盖绝大多数区域赛需求。

## 7.9 最小割建模｜主线

- [ ] [P2774 方格取数问题](https://www.luogu.com.cn/problem/P2774)
- [ ] [P1646 [国家集训队] happiness](https://www.luogu.com.cn/problem/P1646)
- [ ] [P4174 [NOI2006] 最大获利](https://www.luogu.com.cn/problem/P4174)

如果某些旧题链接失效，以“最大权闭合子图 / 二者选一 / 点边代价割”三类模型为主，不必拘泥于原题号。

## 7.10 费用流｜主线

- [ ] [P3381 【模板】最小费用最大流](https://www.luogu.com.cn/problem/P3381)
- [ ] [P1251 餐巾计划问题](https://www.luogu.com.cn/problem/P1251)
- [ ] [P4014 分配问题](https://www.luogu.com.cn/problem/P4014)
- [ ] [P4015 运输问题](https://www.luogu.com.cn/problem/P4015)
- [ ] [P3358 最长 k 可重区间集问题](https://www.luogu.com.cn/problem/P3358)

## 7.11 上下界网络流｜可选

- [ ] [P3980 [NOI2008] 志愿者招募](https://www.luogu.com.cn/problem/P3980)
- [ ] [P4843 清理雪道](https://www.luogu.com.cn/problem/P4843)

## 7.12 2-SAT｜主线

- [ ] [P4782 【模板】2-SAT](https://www.luogu.com.cn/problem/P4782)
- [ ] [P4171 [JSOI2010] 满汉全席](https://www.luogu.com.cn/problem/P4171)
- [ ] [P3825 [NOI2017] 游戏](https://www.luogu.com.cn/problem/P3825)

## 7.13 点分治｜可选偏重要

- [ ] [P3806 【模板】点分治](https://www.luogu.com.cn/problem/P3806)
- [ ] [P2634 聪聪可可](https://www.luogu.com.cn/problem/P2634)
- [ ] [P4149 [IOI2011] Race](https://www.luogu.com.cn/problem/P4149)

## 7.14 虚树｜可选偏重要

- [ ] [P2495 [SDOI2011] 消耗战](https://www.luogu.com.cn/problem/P2495)
- [ ] [P3233 [HNOI2014] 世界树](https://www.luogu.com.cn/problem/P3233)

## 7.15 矩阵树定理｜可选

- [ ] [P4111 [HEOI2015] 小 Z 的房间](https://www.luogu.com.cn/problem/P4111)
- [ ] [P4208 [JSOI2008] 最小生成树计数](https://www.luogu.com.cn/problem/P4208)

---

# Part 8 计算几何

原题单只从凸包开始，缺少 XCPC 更基础、更常用的几何原语，因此这里重排。

## 8.1 几何基础｜补充 · 主线

需要稳定掌握：

- 点 / 向量表示；
- 点积、叉积、方向判断；
- 点在线段上；
- 线段相交；
- 点到直线 / 线段距离；
- 多边形有向面积；
- 点在多边形内；
- EPS 与整数几何的边界。

这一层比半平面交更重要，应优先通过 ICPC / CF 几何基础题训练。

## 8.2 凸包｜主线

- [ ] [P2742 【模板】二维凸包](https://www.luogu.com.cn/problem/P2742)
- [ ] [P3829 [SHOI2012] 信用卡凸包](https://www.luogu.com.cn/problem/P3829)
- [ ] [P4557 [JSOI2018] 战争](https://www.luogu.com.cn/problem/P4557)

## 8.3 旋转卡壳｜可选偏重要

- [ ] [P1452 Beauty Contest](https://www.luogu.com.cn/problem/P1452)
- [ ] [P3187 [HNOI2007] 最小矩形覆盖](https://www.luogu.com.cn/problem/P3187)

## 8.4 半平面交｜可选

- [ ] [P4196 [CQOI2006] 凸多边形](https://www.luogu.com.cn/problem/P4196)
- [ ] [P3256 [JLOI2013] 赛车](https://www.luogu.com.cn/problem/P3256)

---

# Part 9 离线与杂项

## 9.1 0/1 分数规划｜可选

- [ ] [P4377 [USACO18OPEN] Talent Show](https://www.luogu.com.cn/problem/P4377)
- [ ] [P3199 [HNOI2009] 最小圈](https://www.luogu.com.cn/problem/P3199)

## 9.2 Bitset 优化｜补充 · 主线技巧

原题单没有独立整理 `bitset`。需要掌握：

- 用位集并行处理布尔状态；
- 图可达性 / 传递闭包；
- 集合交并与匹配；
- 背包 / 子集可达性位移优化。

它更像一个跨专题优化工具，不需要专门刷十几道题。

## 9.3 随机化｜补充 · 可选

需要知道随机打乱、随机哈希、随机增量、Monte Carlo / Las Vegas 的基本区别。模拟退火不作为主线，但“随机化降低最坏情况”仍然值得保留。

---

# Part 10 基本删除的专题

以下内容不进入当前 XCPC 主训练路线。知道它存在、能解决什么问题即可；真正遇题时再学。

- **A\***：删除，不主动刷。
- **IDA\***：删除，不主动刷。
- **DLX / Dancing Links**：删除，不主动刷。
- **自适应辛普森积分**：删除。
- **线性规划 / 单纯形法**：删除。
- **珂朵莉树 ODT**：删除。
- **K-D Tree**：删除，除非后续专项需要动态高维几何查询。
- **可并堆 / 左偏树**：可视作删除或极低优先级。
- **树套树**：不主动板刷；出现多维顺序统计需求时再补。
- **动态树 / Link-Cut Tree**：不进入当前主线，真遇动态森林再学。
- **完整 FPS 多项式全家桶**：不主动板刷，只保留 FFT / NTT 基础卷积。
- **提交答案题**：删除。
- **OI 特殊“奇怪题 / 骗分题”专题**：删除。
- **手写高精度四则运算专题**：删除。
- **模拟退火**：不作为正式专题，只保留随机化思想。
- **复杂置换群算法**：不主动板刷；Burnside / Pólya 可选保留。
- **通信题**：不进入区域赛主线。
- **交互题**：ICPC 区域赛主线不要求；若转向 Codeforces 等平台，可单独补。

---

# Part 11 推荐的 XCPC 主干地图

如果只看“需要逐步建设成稳定能力”的节点，可以压缩成下面这张地图。

1. **基础方法**：二分、贪心、构造、前缀和 / 差分、分治、Meet-in-the-Middle。
2. **DP**：线性、背包、区间、树形、换根、状压、SOS、数位、单调队列、斜率优化。
3. **字符串**：Hash、KMP / 前缀函数、Z 函数、Trie、AC 自动机、Manacher；SA / SAM 后置。
4. **数学**：数论基础、组合计数、概率期望、矩阵、高斯、线性基、FFT / NTT、博弈论。
5. **数据结构**：并查集、堆、ST、BIT、线段树、单调栈 / 队列、树链剖分；主席树、DSU on Tree、莫队按需深化。
6. **图论**：最短路、MST、SCC、桥 / 点双 / 边双、欧拉路径、二分图、网络流、费用流、2-SAT。
7. **树上进阶**：LCA、树 DP、换根、树剖；点分治、虚树、树上启发式合并后置。
8. **几何**：几何原语、凸包；旋转卡壳后置，半平面交更后置。
9. **跨专题技巧**：bitset、离线、随机化、small-to-large、状态压缩与改变表示。

---

# Part 12 刷题方式

- 一个专题先确认模板 / 核心机制，再做 2～4 道不同约束的变式。
- 如果连续两三题只是同套路换皮，可以直接停止，不为全绿继续。
- 高难综合题只有在它引入新模型、新边界或新组合方式时才值得补。
- 已经稳定掌握的基础题直接跳过；题单负责提供训练池，不负责证明“我刷完了多少题”。
- 真正的调用检验仍然放在混合题、VP 与正式比赛，而不是专题内连续刷题。


