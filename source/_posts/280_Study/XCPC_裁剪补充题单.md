---
title: XCPC 综合题单（裁剪补充版）
description: 从 XCPC / ICPC 区域赛视角裁剪并补充的综合训练题单，保留主线、可选与删除边界。
tags:
  - algorithm/学习方法方法
categories:
  - 280_Study
comments: false
copyright: false
abbrlink: '60749789'
date: 2026-08-27 00:00:00
updated: 2026-08-27 00:00:00
---
# XCPC 综合题单（StudyingFather 裁剪补充版）

> 本题单以 Studying Father's「一个动态更新的洛谷综合题单」3.0.2 为底稿，从 XCPC / ICPC 区域赛视角重新裁剪，并补入原题单年代上缺失或未独立成章的常用模块。
>
> 原题单：https://studyingfather.com/archives/841
>
> 原题单仓库：https://github.com/SFOI-Team/luogu-problem-list
>
> 原项目采用 CC BY-SA 4.0 与 Star And Thank Author License。本衍生版保留原项目署名与来源；若公开传播或继续演绎，请同时遵守原项目许可要求。

## 一、优先级标记

这里把“知识地图”和“当前训练计划”分开。一个知识点没有进入主线，不代表它被否定，只代表当前不值得主动投入训练时间。

- **主线**：值得主动建设到“理解—实现—迁移”层，专题学习时可以系统训练。
- **进阶主线**：基础主线稳定后，长期 XCPC 能力建设中值得主动学习；当前不必并行开启。
- **地图保留**：知道它解决什么问题、典型触发条件和相邻知识即可，不主动板刷。
- **近似忽略**：当前 XCPC 路线不安排学习；知道名字即可，真遇到再现学。
- **补充**：只表示原 StudyingFather 题单没有独立覆盖或年代上缺失，与优先级无关。

> 这不是“全绿题单”。已经稳定掌握的模板题直接跳过；同一模型连续多题没有新增约束时也可以停止，优先保留迁移价值。

---

# Part 1 基础方法

## 1.1 二分答案｜主线

- [x] [P2678 跳石头](https://www.luogu.com.cn/problem/P2678)
- [x] [P1824 进击的奶牛](https://www.luogu.com.cn/problem/P1824)
- [ ] [P1902 刺杀大使](https://www.luogu.com.cn/problem/P1902)
- [x] [P1314 聪明的质监员](https://www.luogu.com.cn/problem/P1314)
- [x] [P1083 借教室](https://www.luogu.com.cn/problem/P1083)
- [ ] [P4343 [SHOI2015] 自动刷题机](https://www.luogu.com.cn/problem/P4343)

重点不是“会写二分”，而是判断是否真的存在单调性，确定答案域，并设计正确的 `check`。

## 1.2 分治｜主线

- [x] [P1908 逆序对](https://www.luogu.com.cn/problem/P1908)
- [ ] [P1429 平面最近点对（加强版）](https://www.luogu.com.cn/problem/P1429)
- [x] [P3612 [USACO17JAN] Secret Cow Code](https://www.luogu.com.cn/problem/P3612)

普通递归不需要专题板刷。重点是识别“分解后如何处理跨区间贡献”。

## 1.3 贪心｜主线

- [ ] [P2672 推销员](https://www.luogu.com.cn/problem/P2672)
- [x] [P1080 国王游戏](https://www.luogu.com.cn/problem/P1080)
- [ ] [P2123 皇后游戏](https://www.luogu.com.cn/problem/P2123)
- [ ] [P5521 [yLOI2019] 梅深不见冬](https://www.luogu.com.cn/problem/P5521)

训练重点是交换论证、排序依据、必要条件和反例，而不是记忆固定贪心套路。

## 1.4 构造｜主线

- [ ] [P3599 Koishi Loves Construction](https://www.luogu.com.cn/problem/P3599)
- [ ] [P5441 【XR-2】伤痕](https://www.luogu.com.cn/problem/P5441)
- [ ] [P5595 【XR-4】歌唱比赛](https://www.luogu.com.cn/problem/P5595)

洛谷旧 OI 题单不能完整覆盖现代 XCPC 构造。后续仍应通过 Codeforces、AtCoder、ICPC 真题持续训练不变量、局部到整体和构造验证。

## 1.5 前缀和 / 差分｜主线

- [x] [P3131 [USACO16JAN] Subsequences Summing to Sevens](https://www.luogu.com.cn/problem/P3131)
- [x] [P2280 [HNOI2003] 激光炸弹](https://www.luogu.com.cn/problem/P2280)
- [x] [P4552 [Poetize6] IncDec Sequence](https://www.luogu.com.cn/problem/P4552)

## 1.6 Meet-in-the-Middle｜主线

- [ ] [P3067 [USACO12OPEN] Balanced Cow Subsets](https://www.luogu.com.cn/problem/P3067)
- [ ] [P4799 [CEOI2015 Day2] 世界冰球锦标赛](https://www.luogu.com.cn/problem/P4799)
- [ ] [P5195 [USACO05DEC] Knights of Ni S](https://www.luogu.com.cn/problem/P5195)

“小规模指数搜索拆成两半”是 XCPC 中非常实用的复杂度压缩方式，不应和 A*、IDA* 一起删掉。

## 1.7 高精度｜地图保留

不再板刷手写大整数四则运算。掌握 `boost::multiprecision::cpp_int` 的基本使用即可，题目明确要求特殊大整数运算时再补。

---

# Part 2 搜索

## 2.1 DFS / BFS / 记忆化搜索｜主线

基础遍历默认应当稳定，不再安排八皇后、迷宫一类纯模板板刷。真正需要训练的是状态设计、判重、边界、剪枝、复杂度和搜索与 DP 的转换。

## 2.2 搜索剪枝｜主线

- [ ] [P1120 小木棍](https://www.luogu.com.cn/problem/P1120)
- [ ] [P1312 Mayan 游戏](https://www.luogu.com.cn/problem/P1312)
- [ ] [P1074 靶形数独](https://www.luogu.com.cn/problem/P1074)

## 2.3 A*｜地图保留

知道它是带启发函数的最短路搜索，并知道合法启发函数不能高估真实剩余代价即可。不安排专题板刷，真遇到状态图巨大但有强下界估计时再回来看。

## 2.4 IDA*｜近似忽略

只保留“迭代加深 + 启发式下界剪枝”的地图印象，不安排训练。

## 2.5 DLX / Dancing Links｜近似忽略

知道它用于精确覆盖 / 重复覆盖类搜索即可，不安排模板和专题题。

---

# Part 3 动态规划

## 3.1 线性 DP｜主线

- [x] [P1020 导弹拦截](https://www.luogu.com.cn/problem/P1020)
- [x] [P1541 乌龟棋](https://www.luogu.com.cn/problem/P1541)
- [x] [P1868 饥饿的奶牛](https://www.luogu.com.cn/problem/P1868)
- [x] [P2679 子串](https://www.luogu.com.cn/problem/P2679)
- [ ] [P2501 [HAOI2006] 数字序列](https://www.luogu.com.cn/problem/P2501)
- [ ] [P3558 [POI2013] BAJ-Bytecomputer](https://www.luogu.com.cn/problem/P3558)
- [ ] [P4158 [SCOI2009] 粉刷匠](https://www.luogu.com.cn/problem/P4158)

## 3.2 背包 DP｜主线

- [x] [P5020 货币系统](https://www.luogu.com.cn/problem/P5020)
- [x] [P1757 通天之分组背包](https://www.luogu.com.cn/problem/P1757)
- [x] [P1064 金明的预算方案](https://www.luogu.com.cn/problem/P1064)
- [x] [P2946 [USACO09MAR] Cow Frisbee Team](https://www.luogu.com.cn/problem/P2946)
- [x] [P1156 垃圾陷阱](https://www.luogu.com.cn/problem/P1156)
- [x] [P5322 [BJOI2019] 排兵布阵](https://www.luogu.com.cn/problem/P5322)

## 3.3 区间 DP｜主线

- [x] [P1880 [NOI1995] 石子合并](https://www.luogu.com.cn/problem/P1880)
- [x] [P3146 [USACO16OPEN] 248](https://www.luogu.com.cn/problem/P3146)
- [x] [P1063 能量项链](https://www.luogu.com.cn/problem/P1063)
- [x] [P4170 [CQOI2007] 涂色](https://www.luogu.com.cn/problem/P4170)
- [x] [P4302 [SCOI2003] 字符串折叠](https://www.luogu.com.cn/problem/P4302)
- [ ] [P2466 [SDOI2008] Sue 的小球](https://www.luogu.com.cn/problem/P2466)

## 3.4 树形 DP｜主线

- [x] [P1352 没有上司的舞会](https://www.luogu.com.cn/problem/P1352)
- [x] [P1273 有线电视网](https://www.luogu.com.cn/problem/P1273)
- [x] [P2014 选课](https://www.luogu.com.cn/problem/P2014)
- [x] [P2607 [ZJOI2008] 骑士](https://www.luogu.com.cn/problem/P2607)
- [x] [P3177 [HAOI2015] 树上染色](https://www.luogu.com.cn/problem/P3177)
- [ ] [P4516 [JSOI2018] 潜入行动](https://www.luogu.com.cn/problem/P4516)

### 换根 DP｜补充 · 主线

- [x] [P3478 [POI2008] STA-Station](https://www.luogu.com.cn/problem/P3478)
- [ ] [P3047 [USACO12FEB] Nearby Cows](https://www.luogu.com.cn/problem/P3047)
- [ ] [CF1092F Tree with Maximum Cost](https://www.luogu.com.cn/problem/CF1092F)
- [ ] [P2986 [USACO10MAR] Great Cow Gathering](https://www.luogu.com.cn/problem/P2986)

原题单有树形 DP，但没有把换根单独作为稳定模型。XCPC 中应能够识别“先算一个根，再沿边转移答案”的结构。

## 3.5 状态压缩 DP｜主线

- [ ] [P2704 [NOI2001] 炮兵阵地](https://www.luogu.com.cn/problem/P2704)
- [ ] [P1879 [USACO06NOV] Corn Fields](https://www.luogu.com.cn/problem/P1879)
- [x] [P1896 [SCOI2005] 互不侵犯](https://www.luogu.com.cn/problem/P1896)
- [ ] [P3092 [USACO13NOV] No Change](https://www.luogu.com.cn/problem/P3092)
- [ ] [P3694 邦邦的大合唱站队](https://www.luogu.com.cn/problem/P3694)
- [ ] [P2157 [SDOI2009] 学校食堂](https://www.luogu.com.cn/problem/P2157)
- [x] [P4363 [九省联考2018] 一双木棋](https://www.luogu.com.cn/problem/P4363)

### SOS DP / 子集和 DP｜补充 · 主线

- [ ] [CF165E Compatible Numbers](https://www.luogu.com.cn/problem/CF165E)
- [ ] [CF449D Jzzhu and Numbers](https://www.luogu.com.cn/problem/CF449D)
- [ ] [AT_arc100_c [ARC100E] Or Plus Max](https://www.luogu.com.cn/problem/AT_arc100_c)

重点是按位维度进行子集 / 超集信息传播，以及理解它与枚举子集、FWT 等工具的边界。

## 3.6 单调队列优化 DP｜主线

- [ ] [P1776 宝物筛选](https://www.luogu.com.cn/problem/P1776)
- [ ] [P3572 [POI2014] Little Bird](https://www.luogu.com.cn/problem/P3572)
- [ ] [P3522 [POI 2011] TEM-Temperature](https://www.luogu.com.cn/problem/P3522)
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

## 3.9 决策单调性 / 分治优化 DP｜进阶主线

- [ ] [P3515 [POI2011] Lightning Conductor](https://www.luogu.com.cn/problem/P3515)
- [ ] [P4767 [IOI2000] 邮局](https://www.luogu.com.cn/problem/P4767)
- [ ] [P1912 [NOI2009] 诗人小 G](https://www.luogu.com.cn/problem/P1912)

不要求现在系统板刷，但长期应认识分治优化、四边形不等式、Knuth 优化等“转移决策具有单调性”的框架。

## 3.10 动态 DP｜地图保留

- [ ] [P4719 【模板】动态 DP](https://www.luogu.com.cn/problem/P4719)
- [ ] [P4751 【模板】动态 DP（加强版）](https://www.luogu.com.cn/problem/P4751)

知道它通常把树 DP 转移压成矩阵 / 广义矩阵并借助树剖维护即可。除非后续遇到动态修改树 DP，不主动建设模板。

## 3.11 轮廓线 / 插头 DP｜地图保留

- [ ] [P5056 【模板】插头 DP](https://www.luogu.com.cn/problem/P5056)
- [ ] [P5347 【XR-1】俄罗斯方块](https://www.luogu.com.cn/problem/P5347)

知道它用于小宽度网格上的连通性状态压缩即可。区域赛中属于明显专项，不主动板刷。

---

# Part 4 字符串

## 4.1 字符串哈希｜主线

- [ ] [P3370 【模板】字符串哈希](https://www.luogu.com.cn/problem/P3370)
- [ ] [P5270 无论怎样神树大人都会删库跑路](https://www.luogu.com.cn/problem/P5270)
- [ ] [P5537 【XR-3】系统设计](https://www.luogu.com.cn/problem/P5537)

同时掌握双哈希、64 位自然溢出哈希和碰撞风险意识。

## 4.2 KMP / 前缀函数｜主线

- [x] [P3375 【模板】KMP 字符串匹配](https://www.luogu.com.cn/problem/P3375)
- [x] [P4391 [BOI2009] Radio Transmission](https://www.luogu.com.cn/problem/P4391)
- [x] [P3435 [POI2006] Periods of Words](https://www.luogu.com.cn/problem/P3435)
- [x] [P4824 [USACO15FEB] Censoring (Silver)](https://www.luogu.com.cn/problem/P4824)
- [x] [P2375 [NOI2014] 动物园](https://www.luogu.com.cn/problem/P2375)
- [x] [P3426 [POI2005] Template](https://www.luogu.com.cn/problem/P3426)
- [x] [P3193 [HNOI2008] GT 考试](https://www.luogu.com.cn/problem/P3193)

## 4.3 Z 函数 / 扩展 KMP｜补充 · 主线

- [ ] [P5410 【模板】扩展 KMP / exKMP（Z 函数）](https://www.luogu.com.cn/problem/P5410)
- [ ] [CF126B Password](https://www.luogu.com.cn/problem/CF126B)
- [ ] [CF432D Prefixes and Suffixes](https://www.luogu.com.cn/problem/CF432D)

Z 函数应与前缀函数并列掌握。重点是 Z-box 的线性维护，以及“某后缀和整个字符串前缀的 LCP”这一信息视角。

## 4.4 Trie / 01-Trie｜主线

- [ ] [P3879 [TJOI2010] 阅读理解](https://www.luogu.com.cn/problem/P3879)
- [ ] [P2292 [HNOI2004] L 语言](https://www.luogu.com.cn/problem/P2292)
- [ ] [P2922 [USACO08DEC] Secret Message](https://www.luogu.com.cn/problem/P2922)
- [ ] [P4551 最长异或路径](https://www.luogu.com.cn/problem/P4551)

## 4.5 AC 自动机｜主线

- [x] [P3808 【模板】AC 自动机（简单版）](https://www.luogu.com.cn/problem/P3808)
- [x] [P3796 【模板】AC 自动机（加强版）](https://www.luogu.com.cn/problem/P3796)
- [x] [P5357 【模板】AC 自动机（二次加强版）](https://www.luogu.com.cn/problem/P5357)
- [ ] [P3121 [USACO15FEB] Censoring (Gold)](https://www.luogu.com.cn/problem/P3121)
- [ ] [P2414 [NOI2011] 阿狸的打字机](https://www.luogu.com.cn/problem/P2414)
- [ ] [P3966 [TJOI2013] 单词](https://www.luogu.com.cn/problem/P3966)
- [ ] [P2444 [POI2000] 病毒](https://www.luogu.com.cn/problem/P2444)
- [ ] [P4052 [JSOI2007] 文本生成器](https://www.luogu.com.cn/problem/P4052)

## 4.6 Manacher｜主线

- [ ] [P3805 【模板】Manacher](https://www.luogu.com.cn/problem/P3805)
- [ ] [P4555 [国家集训队] 最长双回文串](https://www.luogu.com.cn/problem/P4555)
- [ ] [P1659 [国家集训队] 拉拉队排练](https://www.luogu.com.cn/problem/P1659)

## 4.7 后缀数组 SA｜进阶主线

- [ ] [P3809 【模板】后缀排序](https://www.luogu.com.cn/problem/P3809)
- [ ] [P2463 [SDOI2008] Sandy 的卡片](https://www.luogu.com.cn/problem/P2463)
- [ ] [P2852 [USACO06DEC] Milk Patterns](https://www.luogu.com.cn/problem/P2852)
- [ ] [P4051 [JSOI2007] 字符加密](https://www.luogu.com.cn/problem/P4051)
- [ ] [P2178 [NOI2015] 品酒大会](https://www.luogu.com.cn/problem/P2178)

长期至少应理解 `sa`、`rank`、`height/LCP` 的含义，并能把“所有后缀排序后，相邻后缀 LCP”用于重复子串、公共子串等问题。

## 4.8 后缀自动机 SAM｜进阶主线

- [ ] [P3804 【模板】后缀自动机](https://www.luogu.com.cn/problem/P3804)
- [ ] [P3975 [TJOI2015] 弦论](https://www.luogu.com.cn/problem/P3975)
- [ ] [P4248 [AHOI2013] 差异](https://www.luogu.com.cn/problem/P4248)
- [ ] [P4770 [NOI2018] 你的名字](https://www.luogu.com.cn/problem/P4770)

长期应理解状态代表的 endpos 等价类、`len` / `link` 的含义，以及不同子串计数等基础应用。SA 与 SAM 不要求同时高强度展开，但不再视作普通“可选”。

## 4.9 回文自动机 PAM｜地图保留

- [ ] [P5496 【模板】回文自动机](https://www.luogu.com.cn/problem/P5496)
- [ ] [P3649 [APIO2014] 回文串](https://www.luogu.com.cn/problem/P3649)
- [ ] [P4287 [SHOI2011] 双倍回文](https://www.luogu.com.cn/problem/P4287)

知道它把所有不同回文子串组织成自动机，并能在线扩展即可。除非后续集中训练回文结构，不主动板刷。

---

# Part 5 数学

## 5.1 位运算 / 子集枚举｜主线

稳定掌握 lowbit、子集枚举、超集枚举、异或性质、按位贡献，以及与状压 DP / SOS DP 的联动。

- [ ] [P5657 格雷码](https://www.luogu.com.cn/problem/P5657)
- [ ] [CF165E Compatible Numbers](https://www.luogu.com.cn/problem/CF165E)

## 5.2 素数、筛法与因数分解｜主线 + 地图扩展

- [x] [P3383 【模板】线性筛素数](https://www.luogu.com.cn/problem/P3383)
- [x] [P1075 质因数分解](https://www.luogu.com.cn/problem/P1075)

### Miller–Rabin / Pollard–Rho｜地图保留

- [x] [P4718 【模板】Pollard-Rho](https://www.luogu.com.cn/problem/P4718)

知道它们分别处理 64 位整数素性测试和大整数因数分解即可。遇到真实大整数分解题时再升级到实现层。

### 杜教筛 / Min_25 筛｜地图保留

- [x] [P4213 【模板】杜教筛](https://www.luogu.com.cn/problem/P4213)
- [ ] [P5325 【模板】Min_25 筛](https://www.luogu.com.cn/problem/P5325)

它们是高阶数论求和工具，不进入常规区域赛主动训练。

## 5.3 GCD / 欧拉函数｜主线

- [x] [P1029 最大公约数和最小公倍数问题](https://www.luogu.com.cn/problem/P1029)
- [x] [P1414 又是毕业季 II](https://www.luogu.com.cn/problem/P1414)
- [x] [P1072 Hankson 的趣味题](https://www.luogu.com.cn/problem/P1072)
- [x] [P2158 [SDOI2008] 仪仗队](https://www.luogu.com.cn/problem/P2158)
- [x] [P2568 GCD](https://www.luogu.com.cn/problem/P2568)
- [x] [P2398 GCD SUM](https://www.luogu.com.cn/problem/P2398)

## 5.4 同余 / 逆元 / CRT｜主线

- [x] [P4549 【模板】裴蜀定理](https://www.luogu.com.cn/problem/P4549)
- [x] [P3811 【模板】乘法逆元](https://www.luogu.com.cn/problem/P3811)
- [x] [P1082 同余方程](https://www.luogu.com.cn/problem/P1082)
- [x] [P1516 青蛙的约会](https://www.luogu.com.cn/problem/P1516)
- [x] [P4777 【模板】扩展中国剩余定理](https://www.luogu.com.cn/problem/P4777)
- [x] [P3868 [TJOI2009] 猜数字](https://www.luogu.com.cn/problem/P3868)

### BSGS / exBSGS｜进阶主线

- [x] [P4195 【模板】exBSGS](https://www.luogu.com.cn/problem/P4195)

离散对数并非高频，但属于明确的数论工具门槛。长期建议掌握 BSGS 的建模和复杂度，不要求现在专项板刷。

### 二次剩余｜地图保留

- [x] [P5491 【模板】二次剩余](https://www.luogu.com.cn/problem/P5491)

## 5.5 博弈论 / SG｜主线

- [x] [P2197 【模板】Nim 游戏](https://www.luogu.com.cn/problem/P2197)
- [x] [P1288 取数游戏 II](https://www.luogu.com.cn/problem/P1288)
- [x] [P1290 欧几里德的游戏](https://www.luogu.com.cn/problem/P1290)
- [ ] [P2252 【模板】威佐夫博弈 / [SHOI2002] 取石子游戏](https://www.luogu.com.cn/problem/P2252)

### Sprague–Grundy｜补充 · 主线

掌握子游戏分解、mex、SG 异或，以及无偏组合游戏的建模。不要只停留在 Nim 的结论层。

## 5.6 概率与期望｜主线

- [ ] [P5104 红包发红包](https://www.luogu.com.cn/problem/P5104)
- [ ] [P1850 换教室](https://www.luogu.com.cn/problem/P1850)
- [ ] [P2473 [SCOI2008] 奖励关](https://www.luogu.com.cn/problem/P2473)
- [ ] [P4284 [SHOI2014] 概率充电器](https://www.luogu.com.cn/problem/P4284)
- [ ] [P3239 [HNOI2015] 亚瑟王](https://www.luogu.com.cn/problem/P3239)

## 5.7 组合数学 / 容斥｜主线

- [x] [P3807 【模板】Lucas 定理](https://www.luogu.com.cn/problem/P3807)
- [x] [P2822 组合数问题](https://www.luogu.com.cn/problem/P2822)
- [x] [P3197 [HNOI2008] 越狱](https://www.luogu.com.cn/problem/P3197)
- [x] [P1450 [HAOI2008] 硬币购物](https://www.luogu.com.cn/problem/P1450)
- [ ] [P4336 [SHOI2016] 黑暗前的幻想乡](https://www.luogu.com.cn/problem/P4336)
- [ ] [P5339 [TJOI2019] 唱、跳、rap和篮球](https://www.luogu.com.cn/problem/P5339)

### Catalan / Stirling｜进阶主线

- [ ] [P2532 [AHOI2012] 树屋阶梯](https://www.luogu.com.cn/problem/P2532)
- [ ] [P3200 [HNOI2009] 有趣的数列](https://www.luogu.com.cn/problem/P3200)
- [ ] [P4091 [HEOI2016/TJOI2016] 求和](https://www.luogu.com.cn/problem/P4091)

不要求现在大量刷公式题，但长期应认识常见组合数列及其递推、生成函数和计数解释。

## 5.8 矩阵 / 线性递推｜主线

- [x] [P3390 【模板】矩阵快速幂](https://www.luogu.com.cn/problem/P3390)
- [x] [P1939 【模板】矩阵加速](https://www.luogu.com.cn/problem/P1939)
- [ ] [P3758 [TJOI2017] 可乐](https://www.luogu.com.cn/problem/P3758)
- [ ] [P5337 [TJOI2019] 甲苯先生的字符串](https://www.luogu.com.cn/problem/P5337)

## 5.9 高斯消元｜主线

- [x] [P3389 【模板】高斯消元法](https://www.luogu.com.cn/problem/P3389)
- [x] [P2447 [SDOI2010] 外星千足虫](https://www.luogu.com.cn/problem/P2447)
- [x] [P4035 [JSOI2008] 球形空间产生器](https://www.luogu.com.cn/problem/P4035)

## 5.10 线性基｜主线

- [x] [P3812 【模板】线性基](https://www.luogu.com.cn/problem/P3812)
- [ ] [P3857 [TJOI2008] 彩灯](https://www.luogu.com.cn/problem/P3857)
- [ ] [P4570 [BJWC2011] 元素](https://www.luogu.com.cn/problem/P4570)
- [ ] [P4301 [CQOI2013] 新 Nim 游戏](https://www.luogu.com.cn/problem/P4301)
- [ ] [P4151 [WC2011] 最大 XOR 和路径](https://www.luogu.com.cn/problem/P4151)

## 5.11 FFT / NTT｜进阶主线

- [ ] [P3803 【模板】多项式乘法（FFT）](https://www.luogu.com.cn/problem/P3803)
- [ ] [P4245 【模板】任意模数 NTT](https://www.luogu.com.cn/problem/P4245)
- [ ] [P3338 [ZJOI2014] 力](https://www.luogu.com.cn/problem/P3338)
- [ ] [P3723 [AH2017/HNOI2017] 礼物](https://www.luogu.com.cn/problem/P3723)

基础卷积长期值得掌握，但不要求当前和图论、字符串主线并行开启。

### FPS / 多项式全家桶｜地图保留

多项式求逆、ln、exp、sqrt、多点求值、复合等知道其属于形式幂级数工具链即可。除非比赛方向明显要求，不主动板刷。

## 5.12 Möbius 反演 / 数论求和｜进阶主线

- [x] [P2522 [HAOI2011] Problem b](https://www.luogu.com.cn/problem/P2522)
- [x] [P3455 [POI2007] ZAP-Queries](https://www.luogu.com.cn/problem/P3455)
- [x] [P3327 [SDOI2015] 约数个数和](https://www.luogu.com.cn/problem/P3327)
- [x] [P1829 [集训队互测 2010] Crash的数字表格 / JZPTAB](https://www.luogu.com.cn/problem/P1829)

长期应掌握 Möbius 函数、反演的典型使用方式和整除分块。更复杂的积性函数求和继续放地图层。

## 5.13 三分｜主线到工具层

- [x] [P3382 【模板】三分法](https://www.luogu.com.cn/problem/P3382)
- [ ] [P1883 函数](https://www.luogu.com.cn/problem/P1883)

不需要专题板刷很多题，但应稳定识别单峰 / 单谷优化。

## 5.14 Burnside / Pólya｜地图保留

- [ ] [P4980 【模板】Pólya 定理](https://www.luogu.com.cn/problem/P4980)
- [ ] [P1446 [HNOI2008] Cards](https://www.luogu.com.cn/problem/P1446)

知道它解决群作用下本质不同染色计数即可，遇到旋转 / 置换对称计数时再深入。

## 5.15 线性规划 / 单纯形｜近似忽略

知道“线性约束 + 线性目标”的一般优化模型即可，不安排模板。

---

# Part 6 数据结构

## 6.1 单调栈 / 单调队列｜补充 · 主线

- [x] [P5788 【模板】单调栈](https://www.luogu.com.cn/problem/P5788)
- [x] [P1886 滑动窗口 / 【模板】单调队列](https://www.luogu.com.cn/problem/P1886)

## 6.2 并查集｜主线

- [x] [P3958 奶酪](https://www.luogu.com.cn/problem/P3958)
- [x] [P1525 关押罪犯](https://www.luogu.com.cn/problem/P1525)
- [x] [P4185 [USACO18JAN] MooTube](https://www.luogu.com.cn/problem/P4185)
- [x] [P2024 [NOI2001] 食物链](https://www.luogu.com.cn/problem/P2024)
- [x] [P1197 [JSOI2008] 星球大战](https://www.luogu.com.cn/problem/P1197)
- [x] [P1196 [NOI2002] 银河英雄传说](https://www.luogu.com.cn/problem/P1196)
- [x] [P1955 [NOI2015] 程序自动分析](https://www.luogu.com.cn/problem/P1955)

## 6.3 堆 / 优先队列｜主线

- [x] [P3378 【模板】堆](https://www.luogu.com.cn/problem/P3378)
- [x] [P1168 中位数](https://www.luogu.com.cn/problem/P1168)
- [ ] [P2085 最小函数值](https://www.luogu.com.cn/problem/P2085)
- [ ] [P3045 [USACO12FEB] Cow Coupons G](https://www.luogu.com.cn/problem/P3045)

## 6.4 ST 表 / Sparse Table｜主线

- [x] [P3865 【模板】ST 表](https://www.luogu.com.cn/problem/P3865)
- [x] [P2880 [USACO07JAN] Balanced Lineup](https://www.luogu.com.cn/problem/P2880)
- [ ] [P2048 [NOI2010] 超级钢琴](https://www.luogu.com.cn/problem/P2048)

## 6.5 树状数组｜主线

- [x] [P3374 【模板】树状数组 1](https://www.luogu.com.cn/problem/P3374)
- [x] [P1908 逆序对](https://www.luogu.com.cn/problem/P1908)
- [x] [P1972 [SDOI2009] HH 的项链](https://www.luogu.com.cn/problem/P1972)
- [x] [P4113 [HEOI2012] 采花](https://www.luogu.com.cn/problem/P4113)

## 6.6 线段树｜主线

- [x] [P3372 【模板】线段树 1](https://www.luogu.com.cn/problem/P3372)
- [x] [P3373 【模板】线段树 2](https://www.luogu.com.cn/problem/P3373)
- [x] [P5490 【模板】扫描线](https://www.luogu.com.cn/problem/P5490)
- [x] [P1502 窗口的星星](https://www.luogu.com.cn/problem/P1502)
- [x] [P2824 [HEOI2016/TJOI2016] 排序](https://www.luogu.com.cn/problem/P2824)

额外掌握线段树上二分、动态开点和复杂节点信息合并即可，不为每个变种单独建大题单。

## 6.7 平衡树｜进阶主线

- [ ] [P3369 【模板】普通平衡树](https://www.luogu.com.cn/problem/P3369)
- [ ] [P3391 【模板】文艺平衡树](https://www.luogu.com.cn/problem/P3391)
- [ ] [P1486 [NOI2004] 郁闷的出纳员](https://www.luogu.com.cn/problem/P1486)

XCPC 中优先熟悉 `set` / `multiset` / PBDS。手写 Treap / Splay 的价值主要在需要序列翻转、分裂合并等 STL 无法直接支持的操作。

## 6.8 树链剖分｜主线

- [x] [P3384 【模板】树链剖分](https://www.luogu.com.cn/problem/P3384)
- [ ] [P2590 [ZJOI2008] 树的统计](https://www.luogu.com.cn/problem/P2590)
- [ ] [P2486 [SDOI2011] 染色](https://www.luogu.com.cn/problem/P2486)
- [ ] [P4211 [LNOI2014] LCA](https://www.luogu.com.cn/problem/P4211)

## 6.9 主席树 / 可持久化线段树｜进阶主线

- [ ] [P3834 【模板】可持久化线段树](https://www.luogu.com.cn/problem/P3834)
- [ ] [P2633 Count on a Tree](https://www.luogu.com.cn/problem/P2633)
- [ ] [P3168 [CQOI2015] 任务查询系统](https://www.luogu.com.cn/problem/P3168)

它不是区域赛基础门槛，但“历史版本 + 前缀差分 + 第 k 小”的结构值得长期拥有。

## 6.10 树上启发式合并 / DSU on Tree｜补充 · 进阶主线

- [ ] [CF600E Lomsat gelral](https://www.luogu.com.cn/problem/CF600E)
- [ ] [CF570D Tree Requests](https://www.luogu.com.cn/problem/CF570D)
- [ ] [CF1009F Dominant Indices](https://www.luogu.com.cn/problem/CF1009F)
- [ ] [P9886 [ICPC 2018 Qingdao R] Kawa Exam](https://www.luogu.com.cn/problem/P9886)

同时理解普通 small-to-large 合并。树上统计题出现“为每棵子树维护一个频次结构”时，应能想到启发式合并。

## 6.11 分块 / 莫队｜进阶主线

- [ ] [P2709 【模板】莫队 / 小 B 的询问](https://www.luogu.com.cn/problem/P2709)
- [ ] [P1494 [国家集训队] 小 Z 的袜子](https://www.luogu.com.cn/problem/P1494)
- [ ] [P1903 【模板】带修莫队 / [国家集训队] 数颜色 / 维护队列](https://www.luogu.com.cn/problem/P1903)
- [ ] [P5906 【模板】回滚莫队&不删除莫队](https://www.luogu.com.cn/problem/P5906) `地图扩展`

普通静态莫队值得掌握；带修、回滚、树上莫队可以按需要继续下钻。

## 6.12 CDQ 分治 / 整体二分｜进阶主线

- [ ] [P3810 【模板】三维偏序](https://www.luogu.com.cn/problem/P3810)
- [ ] [P3157 [CQOI2011] 动态逆序对](https://www.luogu.com.cn/problem/P3157)
- [ ] [P3527 [POI2011] Meteors](https://www.luogu.com.cn/problem/P3527)

## 6.13 树套树｜地图保留

知道它用于多维顺序统计和“一个维度的数据结构里再维护另一个维度”即可。没有真实二维动态查询需求时，不主动板刷。

## 6.14 可并堆 / 左偏树｜地图保留

知道它用于支持堆的快速合并即可。STL `priority_queue` 无法满足“频繁 merge 两个堆”时，再回来补实现。

## 6.15 Link-Cut Tree｜地图保留

知道它用于动态森林的 `link`、`cut` 和路径信息维护即可。遇到动态连边删边、动态路径查询时再升级到实现层。

## 6.16 K-D Tree｜地图保留

知道它用于低维空间点集的最近点、矩形统计等查询即可。动态二维 / 三维点集问题真正出现时再补。

## 6.17 珂朵莉树 ODT｜近似忽略

不作为稳定通用算法建设。不要因为少数特殊数据题能用而投入专题训练时间。

---

# Part 7 图论

## 7.1 最短路｜主线

- [x] [P4779 【模板】单源最短路径](https://www.luogu.com.cn/problem/P4779)
- [x] [P1144 最短路计数](https://www.luogu.com.cn/problem/P1144)
- [x] [P1462 通往奥格瑞玛的道路](https://www.luogu.com.cn/problem/P1462)
- [x] [P4568 [JLOI2011] 飞行路线](https://www.luogu.com.cn/problem/P4568)
- [ ] [P5304 [GXOI/GZOI2019] 旅行者](https://www.luogu.com.cn/problem/P5304)

### 0-1 BFS｜补充 · 主线

边权只有 0 / 1 时，用双端队列维护距离。需要理解它为什么可以视作 Dijkstra 在特殊边权下的退化。

### Bellman-Ford / SPFA / 负环｜主线到识别层

- [x] [P3385 【模板】负环](https://www.luogu.com.cn/problem/P3385)

### Johnson 全源最短路｜地图保留

知道它通过势能重标边，把含负边但无负环的图转化为可重复跑 Dijkstra 的形式即可。

## 7.2 树的直径 / LCA｜主线

- [x] [P3629 [APIO2010] 巡逻](https://www.luogu.com.cn/problem/P3629)
- [x] [P1099 树网的核](https://www.luogu.com.cn/problem/P1099)
- [x] [P3379 【模板】LCA](https://www.luogu.com.cn/problem/P3379)
- [ ] [P4281 [AHOI2008] 紧急集合](https://www.luogu.com.cn/problem/P4281)

## 7.3 最小生成树｜主线

- [x] [P3366 【模板】最小生成树](https://www.luogu.com.cn/problem/P3366)
- [x] [P4180 【模板】严格次小生成树](https://www.luogu.com.cn/problem/P4180)
- [x] [P1967 货车运输](https://www.luogu.com.cn/problem/P1967)
- [ ] [P4047 [JSOI2010] 部落划分](https://www.luogu.com.cn/problem/P4047)

## 7.4 拓扑排序 / DAG｜主线

- [x] [P1113 杂务](https://www.luogu.com.cn/problem/P1113)
- [x] [P1983 车站分级](https://www.luogu.com.cn/problem/P1983)
- [x] [P1038 神经网络](https://www.luogu.com.cn/problem/P1038)

## 7.5 SCC / 割点 / 双连通｜主线

- [x] [P3387 【模板】缩点](https://www.luogu.com.cn/problem/P3387)
- [x] [P3388 【模板】割点](https://www.luogu.com.cn/problem/P3388)
- [x] [P2341 [HAOI2006] 受欢迎的牛](https://www.luogu.com.cn/problem/P2341)
- [x] [P2746 [USACO5.3] Network of Schools](https://www.luogu.com.cn/problem/P2746)
- [x] [P3225 [HNOI2012] 矿场搭建](https://www.luogu.com.cn/problem/P3225)

### 边双 / 点双 / 圆方树｜补充 · 主线

- [x] [P8436 【模板】边双连通分量](https://www.luogu.com.cn/problem/P8436)
- [x] [P8435 【模板】点双连通分量](https://www.luogu.com.cn/problem/P8435)

掌握桥、割点、e-DCC、v-DCC，并知道何时把点双结构压成圆方树 / block-cut tree。

## 7.6 欧拉路径 / 欧拉回路｜补充 · 主线

- [ ] [P7771 【模板】欧拉路径](https://www.luogu.com.cn/problem/P7771)

掌握存在性判定与 Hierholzer 算法。它在路径构造、字符串拼接、边恰好使用一次等问题里是明确的通用工具。

## 7.7 二分图｜主线

- [x] [P3386 【模板】二分图最大匹配](https://www.luogu.com.cn/problem/P3386)
- [x] [P2756 飞行员配对方案问题](https://www.luogu.com.cn/problem/P2756)
- [ ] [P1129 [ZJOI2007] 矩阵游戏](https://www.luogu.com.cn/problem/P1129)
- [x] [P2764 最小路径覆盖问题](https://www.luogu.com.cn/problem/P2764)
- [x] [P4014 分配问题](https://www.luogu.com.cn/problem/P4014)

理论上同时掌握 Hall 定理、Kőnig 定理、最小点覆盖、最大独立集与路径覆盖的关系。

## 7.8 最大流 / 最小割｜主线

- [x] [P3376 【模板】网络最大流](https://www.luogu.com.cn/problem/P3376)
- [x] [P2763 试题库问题](https://www.luogu.com.cn/problem/P2763)
- [ ] [P2472 [SCOI2007] 蜥蜴](https://www.luogu.com.cn/problem/P2472)
- [ ] [P2765 魔术球问题](https://www.luogu.com.cn/problem/P2765)
- [ ] [P2766 最长不下降子序列问题](https://www.luogu.com.cn/problem/P2766)
- [x] [P1345 [USACO5.4] 奶牛的电信 Telecowmunication](https://www.luogu.com.cn/problem/P1345)

预流推进 / HLPP 放入地图层。常规区域赛优先把 Dinic 的建模和稳定实现练扎实。

## 7.9 最小割建模｜主线

- [x] [P2774 方格取数问题](https://www.luogu.com.cn/problem/P2774)
- [ ] [P1646 [国家集训队] happiness](https://www.luogu.com.cn/problem/P1646)
- [ ] [P4174 [NOI2006] 最大获利](https://www.luogu.com.cn/problem/P4174)

重点掌握最大权闭合子图、二者选一、点边代价割等经典建模。

## 7.10 费用流｜主线

- [x] [P3381 【模板】最小费用最大流](https://www.luogu.com.cn/problem/P3381)
- [x] [P1251 餐巾计划问题](https://www.luogu.com.cn/problem/P1251)
- [x] [P4014 分配问题](https://www.luogu.com.cn/problem/P4014)
- [x] [P4015 运输问题](https://www.luogu.com.cn/problem/P4015)
- [ ] [P3358 最长 k 可重区间集问题](https://www.luogu.com.cn/problem/P3358)

## 7.11 上下界网络流｜进阶主线

- [ ] [P3980 [NOI2008] 志愿者招募](https://www.luogu.com.cn/problem/P3980)
- [ ] [P4843 清理雪道](https://www.luogu.com.cn/problem/P4843)

不是日常高频，但属于网络流体系里值得长期补齐的一层。

## 7.12 2-SAT｜主线

- [x] [P4782 【模板】2-SAT](https://www.luogu.com.cn/problem/P4782)
- [ ] [P4171 [JSOI2010] 满汉全席](https://www.luogu.com.cn/problem/P4171)
- [ ] [P3825 [NOI2017] 游戏](https://www.luogu.com.cn/problem/P3825)

## 7.13 点分治｜进阶主线

- [ ] [P3806 【模板】点分治](https://www.luogu.com.cn/problem/P3806)
- [ ] [P2634 聪聪可可](https://www.luogu.com.cn/problem/P2634)
- [ ] [P4149 [IOI2011] Race](https://www.luogu.com.cn/problem/P4149)

长期值得拥有“把树上路径问题按重心递归分治”的能力，但不必和当前图论基础同时展开。

## 7.14 虚树｜进阶主线

- [ ] [P2495 [SDOI2011] 消耗战](https://www.luogu.com.cn/problem/P2495)
- [ ] [P3233 [HNOI2014] 世界树](https://www.luogu.com.cn/problem/P3233)

当一次询问只关心树上少数关键点时，应能想到用 DFS 序 + LCA 压出关键点诱导的最小树结构。

## 7.15 矩阵树定理｜地图保留

- [ ] [P4111 [HEOI2015] 小 Z 的房间](https://www.luogu.com.cn/problem/P4111)
- [ ] [P4208 [JSOI2008] 最小生成树计数](https://www.luogu.com.cn/problem/P4208)

知道它把生成树计数转为 Laplacian 的行列式即可。遇到“计数生成树”再升级。

---

# Part 8 计算几何

## 8.1 几何基础｜补充 · 主线

原题单从凸包开始，缺少 XCPC 更常用的几何原语。需要稳定掌握点 / 向量、点积、叉积、方向判断、线段相交、距离、多边形面积、点在多边形内，以及 EPS 与整数几何的边界。

## 8.2 凸包｜主线

- [ ] [P2742 【模板】二维凸包](https://www.luogu.com.cn/problem/P2742)
- [ ] [P3829 [SHOI2012] 信用卡凸包](https://www.luogu.com.cn/problem/P3829)
- [ ] [P4557 [JSOI2018] 战争](https://www.luogu.com.cn/problem/P4557)

## 8.3 旋转卡壳｜进阶主线

- [ ] [P1452 Beauty Contest](https://www.luogu.com.cn/problem/P1452)
- [ ] [P3187 [HNOI2007] 最小矩形覆盖](https://www.luogu.com.cn/problem/P3187)

## 8.4 半平面交｜地图保留

- [ ] [P4196 [CQOI2006] 凸多边形](https://www.luogu.com.cn/problem/P4196)
- [ ] [P3256 [JLOI2013] 赛车](https://www.luogu.com.cn/problem/P3256)

知道它维护一组有向直线对应半平面的公共交即可，不进入当前几何基础训练。

---

# Part 9 跨专题技巧与杂项

## 9.1 Bitset 优化｜补充 · 主线技巧

原题单没有独立整理 `bitset`。需要掌握位集并行处理布尔状态、图可达性 / 传递闭包、集合交并、背包或子集可达性位移优化。

它更像跨专题优化工具，不需要专门刷十几道模板题。

## 9.2 Small-to-Large｜补充 · 主线技巧

理解“总把小集合合并到大集合”为什么能把多次元素迁移的总复杂度压低。它既连接 DSU on Tree，也会出现在普通 map / set 合并、树 DP、图上集合维护中。

## 9.3 随机化｜补充 · 主线到认识层

稳定会用随机打乱、随机哈希和随机采样，并知道 Monte Carlo 与 Las Vegas 的区别。随机化本身值得保留，但模拟退火不作为核心模板。

## 9.4 模拟退火｜地图保留

知道它是随机化局部搜索框架即可。只有连续优化、近似求解或特殊构造题真正需要时再考虑。

## 9.5 自适应辛普森积分｜近似忽略

连续数值积分在 XCPC 中过于专项，不安排学习。

## 9.6 0/1 分数规划｜地图保留

- [ ] [P4377 [USACO18OPEN] Talent Show](https://www.luogu.com.cn/problem/P4377)
- [x] [P3199 [HNOI2009] 最小圈](https://www.luogu.com.cn/problem/P3199)

知道“最大化比值”常能二分答案并把比值约束改写成加和判定即可。

---

# Part 10 地图保留区

这一部分不是“以后一定要学”，而是保证知识地图没有被裁空。只需要知道问题类型和触发线索，真实题目出现后再决定是否下钻。

| 知识节点 | 地图层需要知道什么 |
| --- | --- |
| A* | 状态图最短路 + 启发函数 |
| 动态 DP | 动态修改下维护树 DP / 序列 DP |
| 插头 DP | 小宽度网格中的连通性状态压缩 |
| PAM | 在线组织所有不同回文子串 |
| Miller–Rabin / Pollard–Rho | 64 位素性测试与大整数分解 |
| 杜教筛 / Min_25 | 大范围积性函数前缀和 |
| 二次剩余 | 模意义下求平方根 |
| FPS 全家桶 | 多项式求逆、ln、exp、sqrt、多点求值等 |
| Burnside / Pólya | 对称群作用下的本质不同方案计数 |
| 树套树 | 多维动态顺序统计 |
| 可并堆 | 需要频繁合并两个堆 |
| LCT | 动态森林 link / cut / 路径维护 |
| K-D Tree | 低维点集的空间查询 |
| Johnson | 含负边、无负环的全源最短路 |
| 矩阵树定理 | 生成树计数 |
| 半平面交 | 多个线性几何约束的公共区域 |
| 分数规划 | 最优化目标是两个量的比值 |

---

# Part 11 近似忽略区

这些内容当前不进入 XCPC 训练计划，也不需要为了“知识体系完整”补模板。它们仍可能偶尔出现，但现学成本通常低于提前建设成本。

- **IDA\***：不主动学。
- **DLX / Dancing Links**：不主动学。
- **线性规划 / 单纯形法**：不主动学模板。
- **珂朵莉树 ODT**：不作为通用能力。
- **自适应辛普森积分**：不主动学。
- **提交答案题**：移出路线。
- **通信题**：移出区域赛主线。
- **手写高精度四则运算专题**：移出路线。
- **OI 特殊骗分 / 奇怪题专题**：移出路线。

A*、KD-Tree、LCT、树套树等不再放在这里，因为它们仍有清晰的问题域和触发条件，应保留在地图层。

---

# Part 12 XCPC 主干地图

如果只看长期要建设成稳定能力的节点，可以压成下面八条主线。

1. **基础方法**：二分、贪心、构造、前缀和 / 差分、分治、Meet-in-the-Middle。
2. **DP**：线性、背包、区间、树形、换根、状压、SOS、数位、单调队列、斜率优化；决策单调性后置。
3. **字符串**：Hash、KMP / 前缀函数、Z 函数、Trie、AC 自动机、Manacher；SA / SAM 作为进阶主线。
4. **数学**：基础数论、同余、组合计数、概率期望、矩阵、高斯、线性基、博弈论；FFT/NTT、Möbius 等后续进入。
5. **数据结构**：并查集、堆、ST、BIT、线段树、单调结构、树链剖分；主席树、DSU on Tree、莫队、CDQ 后续进入。
6. **图论**：最短路、MST、SCC、桥 / 点双 / 边双、欧拉路径、二分图、网络流、费用流、2-SAT；点分治、虚树后续进入。
7. **几何**：几何原语、凸包；旋转卡壳作为进阶，半平面交保留地图。
8. **跨专题技巧**：bitset、small-to-large、离线、随机化、状态压缩、改变表示。

---

# Part 13 推荐执行方式

## 13.1 主线专题

进入主线专题时，先确认核心机制和模板，再做 2～4 道限制不同的变式。能在无标签问题中识别并独立实现后，就不需要为了题单全绿继续刷同质题。

## 13.2 进阶主线

不要同时展开多个进阶专题。基础主线稳定或比赛真实暴露缺口后，再从 SA / SAM、点分治、虚树、DSU on Tree、FFT / NTT、Möbius 等节点中选择一条推进。

## 13.3 地图保留

地图节点只回答三个问题：它解决什么问题，什么题面线索可能触发它，它和哪些已知工具相邻。不要求写模板、不要求刷题，更不把“知道名字”误认为已经掌握。

## 13.4 近似忽略

近似忽略区不进入计划，也不需要产生“还没学”的待办压力。真遇到赛题时，再根据题目价值和学习成本决定临时补还是直接止损。

---

# Part 14 与原 StudyingFather 题单的关系

这份版本不是试图替代原题单，而是给原题单增加一层 XCPC 过滤器。

- 原题单仍然适合作为**经典题库**，需要某专题更多练习时可以回原文继续取题。
- 本题单负责**学习优先级和精选入口**，不保存所有原题。
- 原题单中被裁掉的 OI 专项知识，若仍具有稳定问题域，则保留在“地图保留区”。
- 真正几乎不值得提前投入的内容，才进入“近似忽略区”。
- Z 函数、0-1 BFS、换根 DP、SOS DP、欧拉路径、双连通、单调结构、DSU on Tree、Bitset、几何基础等现代训练中应显式出现的节点，由本版补入。

最终目标不是刷完整张表，而是让题单同时承担两件事：**主线部分提供可执行训练池，地图部分保证未来搜索方向不丢失。**