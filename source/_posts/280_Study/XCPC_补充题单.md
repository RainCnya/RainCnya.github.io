---
title: XCPC 补充题单
description: 保存从主表移出的同模型复盘、实现熟练度与低成本专项补充题。
long_page: true
tags:
  - algorithm/题单
categories:
  - 280_Study
comments: false
copyright: false
abbrlink: 17fa7a
date: 2026-08-31 00:00:00
updated: 2026-08-31 00:00:00
---

# XCPC 补充题单

> [!info] 题单导航
> **主综合题单**：[[XCPC_综合题单]]　·　**进阶题单**：[[XCPC_进阶题单]]　·　**补充题单**：[[XCPC_补充题单]]

> [!note]
> 本表保存已经从主综合题单中移出的**同模型复盘、实现熟练度、补手感与低成本专项练习**。
>
> 它们不是长期待办，也不承担新的知识入口。若某题连“补熟练度”的价值都很低、与现有题高度机械重复或过于裸模板，则可以在二次审计后直接删除。
>
> 对应专题的学习顺序与知识定位优先参考 [[XCPC_综合题单]]；需要更高阶专项时转到 [[XCPC_进阶题单]]。
>
> 当前共有 **106 道补充题**；只在需要复盘、板刷或恢复手感时抽取。

## Part 1 基础算法

### 二分答案

- [x] [P1824 进击的奶牛](https://www.luogu.com.cn/problem/P1824) `补充`：最大化最小值同型复盘
- [ ] [P4343 [SHOI2015] 自动刷题机](https://www.luogu.com.cn/problem/P4343) `补充`：边界与答案二分复盘

### 前缀和 / 差分 / 扫描

- [x] [P1904 天际线](https://www.luogu.com.cn/problem/P1904) `补充`：事件扫描与轮廓维护

### 双指针 / 滑动窗口

- [ ] [P1381 单词背诵](https://www.luogu.com.cn/problem/P1381) `补充`：最短覆盖窗口复盘

## Part 2 搜索

### 基础搜索

- [ ] [P5440 【XR-2】奇迹](https://www.luogu.com.cn/problem/P5440) `补充`：DFS 状态枚举
- [ ] [P3956 棋盘](https://www.luogu.com.cn/problem/P3956) `补充`：网格状态搜索
- [ ] [P1535 游荡的奶牛](https://www.luogu.com.cn/problem/P1535) `补充`：固定步数路径状态

## Part 3 动态规划

### Part 3.1 基础状态模型

#### 线性 DP / 序列模型

- [x] [P1095 守望者的逃离](https://www.luogu.com.cn/problem/P1095) `补充`：基础状态与决策
- [x] [P1091 合唱队形](https://www.luogu.com.cn/problem/P1091) `补充`：双向 LIS
- [x] [P1233 木棍加工](https://www.luogu.com.cn/problem/P1233) `补充`：排序与 LIS
- [x] [P1868 饥饿的奶牛](https://www.luogu.com.cn/problem/P1868) `补充`：线性区间选择
- [x] [P2285 [HNOI2004] 打鼹鼠](https://www.luogu.com.cn/problem/P2285) `补充`：顺序转移与偏序条件

#### 背包 DP

- [ ] [P1855 榨取kkksc03](https://www.luogu.com.cn/problem/P1855) `补充`：二维容量背包
- [x] [P2946 [USACO09MAR] Cow Frisbee Team](https://www.luogu.com.cn/problem/P2946) `补充`：计数背包
- [x] [P1757 通天之分组背包](https://www.luogu.com.cn/problem/P1757) `补充`：分组背包
- [ ] [CF106C Buns](https://www.luogu.com.cn/problem/CF106C) `补充`：混合背包
- [ ] [P1537 弹珠](https://www.luogu.com.cn/problem/P1537) `补充`：多重背包可行性
- [ ] [P1174 打砖块](https://www.luogu.com.cn/problem/P1174) `补充`：资源分配背包

#### 网格 / 路径 / 多维状态 DP

- [x] [P1006 传纸条](https://www.luogu.com.cn/problem/P1006) `补充`：双路径同步状态

### Part 3.2 结构型 DP

#### 区间 DP

- [x] [P1005 矩阵取数游戏](https://www.luogu.com.cn/problem/P1005) `补充`：两端取数
- [x] [P1063 能量项链](https://www.luogu.com.cn/problem/P1063) `补充`：环形区间 DP
- [x] [P1040 加分二叉树](https://www.luogu.com.cn/problem/P1040) `补充`：区间 DP 与方案恢复
- [x] [P1435 [IOI2000] 回文字串](https://www.luogu.com.cn/problem/P1435) `补充`：回文区间状态
- [x] [P2890 Cheapest Palindrome G](https://www.luogu.com.cn/problem/P2890) `补充`：回文修改代价
- [x] [CF607B Zuma](https://www.luogu.com.cn/problem/CF607B) `补充`：区间合并
- [ ] [CF245H Queries for Number of Palindromes](https://www.luogu.com.cn/problem/CF245H) `补充`：回文区间统计
- [x] [P3147 [USACO16OPEN] 262144 P](https://www.luogu.com.cn/problem/P3147) `补充`：区间合并与倍增
- [x] [P4342 [IOI1998] Polygon](https://www.luogu.com.cn/problem/P4342) `补充`：环形区间与 min/max

#### 树形 DP / 树上背包

- [x] [P2585 三色二叉树](https://www.luogu.com.cn/problem/P2585) `补充`：树形分类状态
- [x] [P2016 [SEERC2000] 战略游戏](https://www.luogu.com.cn/problem/P2016) `补充`：树上点覆盖状态
- [ ] [P4395 [BOI2003] Gem](https://www.luogu.com.cn/problem/P4395) `补充`：树上染色状态
- [x] [P2015 二叉苹果树](https://www.luogu.com.cn/problem/P2015) `补充`：基础树上背包
- [x] [P1273 有线电视网](https://www.luogu.com.cn/problem/P1273) `补充`：收益型树上背包

#### 换根 DP

- [ ] [CF1092F Tree with Maximum Cost](https://www.luogu.com.cn/problem/CF1092F) `补充`：距离贡献换根

#### DAG / 图上 DP

- [x] [P2656 采蘑菇](https://www.luogu.com.cn/problem/P2656) `补充`：SCC 与 DAG 最优路径

### Part 3.3 状态压缩与计数 DP

#### 状态压缩 DP

- [x] [P2622 关灯问题 II](https://www.luogu.com.cn/problem/P2622) `补充`：基础状态图
- [ ] [P3694 邦邦的大合唱站队](https://www.luogu.com.cn/problem/P3694) `补充`：子集排列 DP
- [ ] [P2396 yyy loves Maths VII](https://www.luogu.com.cn/problem/P2396) `补充`：子集可达与限制
- [ ] [P1879 [USACO06NOV] Corn Fields G](https://www.luogu.com.cn/problem/P1879) `补充`：行状态 DP
- [ ] [P5005 中国象棋 - 摆上马](https://www.luogu.com.cn/problem/P5005) `补充`：棋盘局部状压

#### 概率 / 期望 DP

- [ ] [P1654 OSU!](https://www.luogu.com.cn/problem/P1654) `补充`：连续段期望 DP

#### 数位 DP

- [ ] [P4999 烦人的数学作业](https://www.luogu.com.cn/problem/P4999) `补充`：数位贡献统计

### Part 3.4 DP 优化

#### 单调队列优化 DP

- [x] [P1714 切蛋糕](https://www.luogu.com.cn/problem/P1714) `补充`：前缀信息与窗口最值
- [x] [P2627 [USACO11OPEN] Mowing the Lawn G](https://www.luogu.com.cn/problem/P2627) `补充`：连续选择限制复盘
- [ ] [P3572 [POI2011] PTA-Little Bird](https://www.luogu.com.cn/problem/P3572) `补充`：多组窗口参数
- [x] [P3800 Power 收集](https://www.luogu.com.cn/problem/P3800) `补充`：分层窗口 DP
- [ ] [P3089 [USACO13NOV] Pogo-Cow](https://www.luogu.com.cn/problem/P3089) `补充`：有序候选与区间最值

#### 斜率优化 DP

- [ ] [P5785 [SDOI2012] 任务安排](https://www.luogu.com.cn/problem/P5785) `补充`：经典斜率优化复盘
- [ ] [P4360 [CEOI2004] 锯木厂选址](https://www.luogu.com.cn/problem/P4360) `补充`：分段型斜率优化

## Part 4 字符串

### KMP / 前缀函数

- [ ] [CF25E Test](https://www.luogu.com.cn/problem/CF25E) `补充`：字符串重叠关系与 KMP 复盘

### Z 函数 / 扩展 KMP

- [ ] [CF126B Password](https://www.luogu.com.cn/problem/CF126B) `补充`：前缀、后缀与内部出现关系

### AC 自动机

- [ ] [P3966 [TJOI2013] 单词](https://www.luogu.com.cn/problem/P3966) `补充`：fail 关系与模式串包含统计

### 回文自动机 PAM

- [ ] [P4287 [SHOI2011] 双倍回文](https://www.luogu.com.cn/problem/P4287) `补充`：回文结构关系与 PAM 应用

### 后缀数组 SA

- [ ] [P2463 [SDOI2008] Sandy 的卡片](https://www.luogu.com.cn/problem/P2463) `补充`：差分与最长公共子串

## Part 5 数学

### Part 5.1 整数与基础数论

#### 素数 / 筛法基础 / 因数分解

- [ ] [P2441 角色属性树](https://www.luogu.com.cn/problem/P2441) `补充`：gcd 与公共质因子应用

#### GCD / exGCD / 裴蜀

- [ ] [P3951 [NOIP2017 提高组] 小凯的疑惑](https://www.luogu.com.cn/problem/P3951) `补充`：两数 Frobenius 结论
- [ ] [P5436 【XR-2】缘分](https://www.luogu.com.cn/problem/P5436) `补充`：gcd / lcm 性质分类

#### 欧拉函数 / 欧拉定理

- [ ] [P2303 [SDOI2012] Longge 的问题](https://www.luogu.com.cn/problem/P2303) `补充`：gcd 分类与欧拉函数复盘

### Part 5.2 数论求和与高阶筛法

#### 莫比乌斯反演

- [x] [P3455 [POI2007] ZAP-Queries](https://www.luogu.com.cn/problem/P3455) `补充`：二维 gcd 计数与 Möbius 分块复盘

### Part 5.5 组合计数

#### 排列组合 / 基础计数

- [ ] [P4981 父子](https://www.luogu.com.cn/problem/P4981) `补充`：Cayley / Prüfer 结论应用

#### Catalan / Stirling 等特殊组合数

- [ ] [P3200 [HNOI2009] 有趣的数列](https://www.luogu.com.cn/problem/P3200) `补充`：Catalan 数复盘
- [ ] [P3978 [TJOI2015] 概率论](https://www.luogu.com.cn/problem/P3978) `补充`：Catalan 与组合结构复盘

#### Burnside / Pólya / 置换群

- [ ] [P1446 [HNOI2008] Cards](https://www.luogu.com.cn/problem/P1446) `补充`：Burnside / Pólya 标准应用

### Part 5.1 整数与基础数论

#### 数论杂题 / 因子结构

- [ ] [P5596 【XR-4】题](https://www.luogu.com.cn/problem/P5596) `补充`：因式分解、因子枚举与整除条件

### Part 5.6 线性代数

#### 矩阵快速幂 / 线性递推

- [ ] [P1349 广义斐波那契数列](https://www.luogu.com.cn/problem/P1349) `补充`：一般二阶线性递推
- [ ] [P5337 [TJOI2019] 甲苯先生的字符串](https://www.luogu.com.cn/problem/P5337) `补充`：有限状态邻接矩阵幂

## Part 6 数据结构

### Part 6.1 基础维护结构

#### 单调栈 / 单调队列

- [x] [P3467 [POI2008] PLA-Postering](https://www.luogu.com.cn/problem/P3467) `补充`：单调栈维护轮廓
- [x] [P2866 [USACO06NOV] Bad Hair Day S](https://www.luogu.com.cn/problem/P2866) `补充`：基础单调栈计数

#### 并查集

- [x] [P3958 [NOIP2017 提高组] 奶酪](https://www.luogu.com.cn/problem/P3958) `补充`：几何建图与普通并查集
- [x] [P1955 [NOI2015] 程序自动分析](https://www.luogu.com.cn/problem/P1955) `补充`：离散化与等价关系维护

#### 堆 / 优先队列

- [x] [P2827 [NOIP2016 提高组] 蚯蚓](https://www.luogu.com.cn/problem/P2827) `补充`：多队列优化与大规模模拟
- [ ] [P1801 黑匣子](https://www.luogu.com.cn/problem/P1801) `补充`：双堆与顺序统计

#### 树状数组

- [x] [P1966 [NOIP2013 提高组] 火柴排队](https://www.luogu.com.cn/problem/P1966) `补充`：排名映射后的逆序对
- [x] [P1637 三元上升子序列](https://www.luogu.com.cn/problem/P1637) `补充`：多层树状数组计数
- [x] [P4113 [HEOI2012] 采花](https://www.luogu.com.cn/problem/P4113) `补充`：离线出现次数统计
- [ ] [P3253 [JLOI2013] 删除物品](https://www.luogu.com.cn/problem/P3253) `补充`：动态删除后的相对位置统计

#### 栈 / 括号结构复盘

- [x] [P1944 最长括号匹配](https://www.luogu.com.cn/problem/P1944) `补充`：括号结构的线性处理

### Part 6.2 线段树家族

#### 线段树

- [x] [P1198 [JSOI2008] 最大数](https://www.luogu.com.cn/problem/P1198) `补充`：在线追加与区间最值
- [x] [P2574 XOR的艺术](https://www.luogu.com.cn/problem/P2574) `补充`：区间翻转与区间统计
- [x] [P1558 色板游戏](https://www.luogu.com.cn/problem/P1558) `补充`：区间赋值与集合信息

### Part 6.3 根号与离线算法

#### 分块 / 根号算法

- [ ] [P4135 作诗](https://www.luogu.com.cn/problem/P4135) `补充`：在线频率统计与预处理分块

#### 莫队

- [ ] [P3709 大爷的字符串题](https://www.luogu.com.cn/problem/P3709) `补充`：普通莫队上的频率信息维护

### Part 6.4 可合并与可持久化结构

#### 可并堆 / 左偏树

- [ ] [P1456 Monkey King](https://www.luogu.com.cn/problem/P1456) `补充`：堆顶修改后重新合并

### Part 6.5 平衡树与动态序列

#### 平衡树 / 有序集合

- [ ] [P5338 [TJOI2019] 甲苯先生的滚榜](https://www.luogu.com.cn/problem/P5338) `补充`：复合键修改与在线排名

### Part 6.6 树上数据结构

#### 树链剖分 / 树上路径数据结构

- [ ] [P4092 [HEOI2016/TJOI2016] 树](https://www.luogu.com.cn/problem/P4092) `补充`：树上标记与最近祖先查询

### Part 6.7 高维与专用数据结构

#### K-D Tree

- [ ] [P4357 [CQOI2016] K 远点对](https://www.luogu.com.cn/problem/P4357) `补充`：远点搜索与 K-D Tree 剪枝
- [ ] [P2479 [SDOI2010] 捉迷藏](https://www.luogu.com.cn/problem/P2479) `补充`：最近 / 最远邻点查询

### Part 6.8 数据结构综合（已取消）

- [ ] [P2161 [SHOI2009] 会场预约](https://www.luogu.com.cn/problem/P2161) `补充`：动态区间集合与有序结构维护

## Part 7 图论与树论

### Part 7.4 生成树

#### 最小生成树及其扩展

- [x] [P1194 买礼物](https://www.luogu.com.cn/problem/P1194) `补充`：虚拟源点 MST 基础建模
- [ ] [P2872 [USACO07DEC] Building Roads](https://www.luogu.com.cn/problem/P2872) `补充`：预连通与几何 MST

#### 矩阵树定理

- [ ] [P2144 [FJOI2007] 轮状病毒](https://www.luogu.com.cn/problem/P2144) `补充`：特殊图生成树计数与递推

### Part 7.1 图遍历与最短路

#### 最短路

- [ ] [P1522 [USACO2.4] Cow Tours](https://www.luogu.com.cn/problem/P1522) `补充`：Floyd、连通块与直径综合

### Part 7.2 树论基础

#### 二叉树 / 递归树结构基础

- [ ] [P1229 遍历问题](https://www.luogu.com.cn/problem/P1229) `补充`：遍历序列关系复盘

#### LCA / 树上差分 / 路径关系

- [x] [P3258 [JLOI2014] 松鼠的新家](https://www.luogu.com.cn/problem/P3258) `补充`：路径访问次数统计
- [ ] [P4427 [BJOI2018] 求和](https://www.luogu.com.cn/problem/P4427) `补充`：LCA 与静态路径前缀统计
- [x] [P3038 [USACO11DEC] Grass Planting G](https://www.luogu.com.cn/problem/P3038) `补充`：路径增量维护

### Part 7.5 有向图结构

#### 拓扑排序 / DAG

- [x] [P1038 [NOIP2003 提高组] 神经网络](https://www.luogu.com.cn/problem/P1038) `补充`：拓扑传播与 DAG 状态累积

#### SCC / 缩点 DAG

- [x] [P3627 [APIO2009] 抢掠计划](https://www.luogu.com.cn/problem/P3627) `补充`：SCC 缩点与 DAG 最优路径

### Part 7.6 无向图连通与欧拉结构

#### 割点 / 点双连通 / 圆方树

- [ ] [P5058 [ZJOI2004] 嗅探器](https://www.luogu.com.cn/problem/P5058) `补充`：指定点对断连与割点判定

### Part 7.7 二分图

#### 最大匹配 / 覆盖 / 匹配结构

- [ ] [P1129 [ZJOI2007] 矩阵游戏](https://www.luogu.com.cn/problem/P1129) `补充`：行列完美匹配可行性

### Part 7.8 网络流

#### 最小割 / 最大权闭合子图

- [ ] [P2598 [ZJOI2009] 狼和羊的故事](https://www.luogu.com.cn/problem/P2598) `补充`：网格二元标号与最小割

#### 费用流

- [ ] [P4016 负载平衡问题](https://www.luogu.com.cn/problem/P4016) `补充`：环形供需费用流
- [ ] [P3356 火星探险问题](https://www.luogu.com.cn/problem/P3356) `补充`：网格多路径费用流
- [ ] [P4013 数字梯形问题](https://www.luogu.com.cn/problem/P4013) `补充`：多组容量条件下的网格费用流

### Part 7.9 树上高级技巧

#### 原 7.9.4 树论综合（已取消）

- [ ] [P5022 [NOIP2018 提高组] 旅行](https://www.luogu.com.cn/problem/P5022) `补充`：DFS 与基环树遍历综合

## Part 8 计算几何

### Part 8.1 计算几何基础

- [ ] [P1578 [WC2002] 奶牛浴场](https://www.luogu.com.cn/problem/P1578) `补充`：二维空矩形与边界枚举综合
