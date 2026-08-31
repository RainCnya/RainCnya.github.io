---
title: XCPC 进阶题单
description: 保存主综合题单之外仍值得专项回收的高价值、偏深或偏专门训练题。
long_page: true
tags:
  - algorithm/题单
categories:
  - 280_Study
comments: false
copyright: false
abbrlink: 12accf1d
date: 2026-08-31 00:00:00
updated: 2026-08-31 00:00:00
---

# XCPC 进阶题单

> [!info] 题单导航
> **主综合题单**：[[XCPC_综合题单]]　·　**进阶题单**：[[XCPC_进阶题单]]　·　**补充题单**：[[XCPC_补充题单]]

> [!note]
> 本表保存**题目本身质量较高、能够深化专题或形成专项训练，但当前不适合占据主导航层**的题目。
>
> 这里的题不构成当前待办。只有当对应主线已经稳定、需要继续拔高或专题回收时，再从本表抽取。
>
> 与主表相同，题目按对应 Part 组织；具体知识入口优先回到 [[XCPC_综合题单]]。
>
> 当前共有 **165 道进阶题**；它们不构成必须清空的待办。

## Part 2 搜索

### IDA*

- [ ] [P2534 [AHOI2012] 铁盘整理](https://www.luogu.com.cn/problem/P2534) `进阶`：经典估价函数设计与前缀翻转状态搜索

### DLX

- [ ] [P4205 [NOI2005] 智慧珠游戏](https://www.luogu.com.cn/problem/P4205) `进阶`：精确覆盖建模与复杂方案恢复

## Part 3 动态规划

### Part 3.1 基础状态模型

#### 线性 DP / 序列模型

- [ ] [P3336 [ZJOI2013] 话旧](https://www.luogu.com.cn/problem/P3336) `进阶`：高阶线性状态设计与结构递推
- [ ] [P5301 [GXOI/GZOI2019] 宝牌一大堆](https://www.luogu.com.cn/problem/P5301) `进阶`：高维局部状态与复杂规则实现
- [ ] [P5464 缩小社交圈](https://www.luogu.com.cn/problem/P5464) `进阶`：重叠结构与有限历史状态

#### 背包 DP

- [ ] [P3188 梦幻岛宝珠](https://www.luogu.com.cn/problem/P3188) `进阶`：特殊重量结构与大容量背包
- [ ] [P4138 挂饰](https://www.luogu.com.cn/problem/P4138) `进阶`：动态资源约束与背包建模
- [ ] [CF1111D Destroy the Colony](https://www.luogu.com.cn/problem/CF1111D) `进阶`：组合计数与背包交叉
- [ ] [P5289 皮配](https://www.luogu.com.cn/problem/P5289) `进阶`：多重限制与高阶计数背包
- [ ] [P1441 砝码称重](https://www.luogu.com.cn/problem/P1441) `进阶`：组合枚举、0/1 背包与 bitset 综合

#### 网格 / 路径 / 多维状态 DP

- [ ] [P5307 [GXOI/GZOI2019] Mobitel](https://www.luogu.com.cn/problem/P5307) `进阶`：网格路径、乘积约束与状态压缩

### Part 3.2 结构型 DP

#### 区间 DP

- [x] [P4302 [SCOI2003] 字符串折叠](https://www.luogu.com.cn/problem/P4302) `进阶`：字符串区间压缩
- [x] [CF149D Coloring Brackets](https://www.luogu.com.cn/problem/CF149D) `进阶`：括号结构上的高阶区间计数
- [ ] [P2466 [SDOI2008] Sue 的小球](https://www.luogu.com.cn/problem/P2466) `进阶`：高阶端点扩展与代价
- [ ] [P5336 成绩单](https://www.luogu.com.cn/problem/P5336) `进阶`：高维区间状态与极值代价
- [ ] [P3592 [POI2015] MYJ-洗车](https://www.luogu.com.cn/problem/P3592) `进阶`：高维区间状态与构造

#### 树形 DP / 树上背包

- [ ] [P4438 [HNOI/AHOI2018] 道路](https://www.luogu.com.cn/problem/P4438) `进阶`：高维路径状态树形 DP
- [ ] [P4099 [HEOI2013] SAO](https://www.luogu.com.cn/problem/P4099) `进阶`：树形 DP 与拓扑序计数

### Part 3.3 状态压缩与计数 DP

#### 状态压缩 DP

- [ ] [P2167 [SDOI2009] Bill 的挑战](https://www.luogu.com.cn/problem/P2167) `进阶`：字符串匹配集合与状压计数
- [ ] [P2150 [NOI2015] 寿司晚宴](https://www.luogu.com.cn/problem/P2150) `进阶`：数论结构与多集合状态
- [ ] [P4484 [BJWC2018] 最长上升子序列](https://www.luogu.com.cn/problem/P4484) `进阶`：DP 状态再压缩与高阶计数
- [ ] [P5369 [PKUSC2018] 最大前缀和](https://www.luogu.com.cn/problem/P5369) `进阶`：子集排列计数与期望
- [ ] [P5492 [PKUWC2018] 随机算法](https://www.luogu.com.cn/problem/P5492) `进阶`：随机过程与多状态状压
- [ ] [AT_agc012_e [AGC012E] Camel and Oases](https://www.luogu.com.cn/problem/AT_agc012_e) `进阶`：区间结构与高阶子集状态

#### 计数 DP

- [ ] [P6189 跑步](https://www.luogu.com.cn/problem/P6189) `进阶`：整数划分与根号级优化

#### 概率 / 期望 DP

- [ ] [P3824 [NOI2014] 泳池](https://www.luogu.com.cn/problem/P3824) `进阶`：高阶概率 DP 与结构分解

#### 数位 DP

- [ ] [P2518 [HAOI2010] 计数](https://www.luogu.com.cn/problem/P2518) `进阶`：可重集排列排名型计数
- [ ] [P3286 [SCOI2014] 方伯伯的商场之旅](https://www.luogu.com.cn/problem/P3286) `进阶`：高阶数位统计与代价

### Part 3.4 DP 优化

#### 单调队列优化 DP

- [ ] [P4544 [USACO10NOV] Buying Feed](https://www.luogu.com.cn/problem/P4544) `进阶`：高阶容量 DP 与窗口优化
- [ ] [P1973 [NOI2011] Noi嘉年华](https://www.luogu.com.cn/problem/P1973) `进阶`：复杂状态与决策优化综合
- [ ] [P4852 yyf hates choukapai](https://www.luogu.com.cn/problem/P4852) `进阶`：降维与单调结构优化

#### 斜率优化 DP

- [ ] [P2305 [NOI2014] 购票](https://www.luogu.com.cn/problem/P2305) `进阶`：树上祖先转移与凸包优化
- [ ] [AT_arc066_d [ARC066F] Contest with Drinks Hard](https://www.luogu.com.cn/problem/AT_arc066_d) `进阶`：凸包 DP 与修改询问

#### 决策单调性 / 分治优化 DP

- [ ] [P3724 [AH2017/HNOI2017] 大佬](https://www.luogu.com.cn/problem/P3724) `进阶`：综合状态与决策优化

### Part 3.5 高阶 DP 与综合

#### 动态 DP

- [ ] [P4751 动态 DP（加强版）](https://www.luogu.com.cn/problem/P4751) `进阶`：动态 DP 的加强维护结构

#### 插头 DP / 连通性状态压缩

- [ ] [P5347 【XR-1】俄罗斯方块](https://www.luogu.com.cn/problem/P5347) `进阶`：高复杂度插头 DP 与连通状态设计

## Part 4 字符串

### 字符串哈希

- [ ] [P5537 【XR-3】系统设计](https://www.luogu.com.cn/problem/P5537) `进阶`：路径哈希与动态区间哈希

### Trie

- [ ] [P3783 [SDOI2017] 天才黑客](https://www.luogu.com.cn/problem/P3783) `进阶`：Trie、LCP/LCA 与图结构综合

### AC 自动机

- [ ] [P3311 [SDOI2014] 数数](https://www.luogu.com.cn/problem/P3311) `进阶`：AC 自动机与数位计数 DP
- [ ] [P5599 【XR-4】文本编辑器](https://www.luogu.com.cn/problem/P5599) `进阶`：多模式匹配与动态字符串结构

### 后缀数组 SA

- [ ] [P2336 [SCOI2012] 喵星球上的点名](https://www.luogu.com.cn/problem/P2336) `进阶`：多串后缀结构与离线统计
- [ ] [P1117 [NOI2016] 优秀的拆分](https://www.luogu.com.cn/problem/P1117) `进阶`：LCP / LCS 与复杂计数
- [ ] [P5346 【XR-1】柯南家族](https://www.luogu.com.cn/problem/P5346) `进阶`：高阶后缀结构与动态维护
- [ ] [P5576 [CmdOI2019] 口头禅](https://www.luogu.com.cn/problem/P5576) `进阶`：后缀结构与复杂区间综合

### 后缀自动机 SAM

- [ ] [P4770 [NOI2018] 你的名字](https://www.luogu.com.cn/problem/P4770) `进阶`：SAM 与多串 / 区间限制综合
- [ ] [P5284 [十二省联考2019] 字符串问题](https://www.luogu.com.cn/problem/P5284) `进阶`：后缀结构、图论与 DAG 综合
- [ ] [P5319 [BJOI2019] 奥术神杖](https://www.luogu.com.cn/problem/P5319) `进阶`：字符串自动机与最优值综合

## Part 5 数学

### Part 5.1 整数与基础数论

#### 位运算 / 二进制技巧

- [ ] [P5523 [yLOI2019] 珍珠](https://www.luogu.com.cn/problem/P5523) `进阶`：非结合 NAND 与特殊序列结构
- [ ] [P5538 【XR-3】Namid[A]me](https://www.luogu.com.cn/problem/P5538) `进阶`：树路径按位与与离散对数综合

#### 素数 / 筛法基础 / 因数分解

- [ ] [P5535 【XR-3】小道消息](https://www.luogu.com.cn/problem/P5535) `进阶`：Bertrand–Chebyshev 定理专项

#### 中国剩余定理 CRT

- [ ] [P2480 [SDOI2010] 古代猪文](https://www.luogu.com.cn/problem/P2480) `进阶`：Lucas、CRT 与欧拉定理综合

#### 高次同余 / BSGS / 二次剩余

- [ ] [P5345 【XR-1】快乐肥宅](https://www.luogu.com.cn/problem/P5345) `进阶`：exBSGS、阶与 exCRT 综合

### Part 5.2 数论求和与高阶筛法

#### 莫比乌斯反演

- [x] [P3704 [SDOI2017] 数字表格](https://www.luogu.com.cn/problem/P3704) `进阶`：乘积结构中的 Möbius 反演与数论分块
- [x] [P4619 [SDOI2018] 旧试题](https://www.luogu.com.cn/problem/P4619) `进阶`：高阶 Möbius 反演与复杂求和
- [x] [P5518 [MtOI2019] 幽灵乐团](https://www.luogu.com.cn/problem/P5518) `进阶`：多重 gcd / lcm 结构与 Möbius 综合
- [ ] [P5438 【XR-2】记忆](https://www.luogu.com.cn/problem/P5438) `进阶`：平方自由结构、Möbius 与整除分块

### Part 5.3 博弈论

#### Sprague–Grundy

- [ ] [P3179 [HAOI2015] 数组游戏](https://www.luogu.com.cn/problem/P3179) `进阶`：复杂 SG 函数结构与数论性质

### Part 5.4 概率与期望

- [ ] [P3239 [HNOI2015] 亚瑟王](https://www.luogu.com.cn/problem/P3239) `进阶`：期望线性性与概率 DP
- [ ] [P2081 [NOI2012] 迷失游乐园](https://www.luogu.com.cn/problem/P2081) `进阶`：树与基环树上的期望递推
- [ ] [P3343 [ZJOI2015] 地震后的幻想乡](https://www.luogu.com.cn/problem/P3343) `进阶`：随机结构、连通性与高阶期望
- [ ] [P3600 随机数生成器](https://www.luogu.com.cn/problem/P3600) `进阶`：最大值期望与计数 DP
- [ ] [P4564 [CTSC2018] 假面](https://www.luogu.com.cn/problem/P4564) `进阶`：动态概率过程与条件状态维护
- [ ] [P5326 [ZJOI2019] 开关](https://www.luogu.com.cn/problem/P5326) `进阶`：随机过程、生成函数与异或代数综合

### Part 5.5 组合计数

#### Catalan / Stirling 等特殊组合数

- [ ] [P4091 [HEOI2016/TJOI2016] 求和](https://www.luogu.com.cn/problem/P4091) `进阶`：Stirling 数与幂和综合

#### 容斥原理

- [ ] [P4448 [AHOI2018初中组] 球球的排列](https://www.luogu.com.cn/problem/P4448) `进阶`：容斥、背包与组合数综合
- [ ] [P5400 [CTS2019] 随机立方体](https://www.luogu.com.cn/problem/P5400) `进阶`：高维结构与二项式反演 / 容斥

#### 组合恒等式 / 综合计数

- [ ] [P4931 情侣？给我烧了！（加强版）](https://www.luogu.com.cn/problem/P4931) `进阶`：特殊错排递推与组合计数
- [ ] [P5598 【XR-4】混乱度](https://www.luogu.com.cn/problem/P5598) `进阶`：多重集排列与小质数模组合

#### Burnside / Pólya / 置换群

- [ ] [P4128 [SHOI2006] 有色图](https://www.luogu.com.cn/problem/P4128) `进阶`：循环类型与 Burnside 深化

### Part 5.6 线性代数

#### 矩阵快速幂 / 线性递推

- [ ] [P4000 斐波那契数列](https://www.luogu.com.cn/problem/P4000) `进阶`：Fibonacci 循环节与超大指数
- [ ] [P4967 黑暗打击](https://www.luogu.com.cn/problem/P4967) `进阶`：矩阵递推、巨大指数与循环节综合

#### 高斯消元 / 行列式

- [ ] [P5516 [MtOI2019] 小铃的烦恼](https://www.luogu.com.cn/problem/P5516) `进阶`：稀疏 / 带状线性系统的定制消元
- [ ] [P4457 [BJOI2018] 治疗之雨](https://www.luogu.com.cn/problem/P4457) `进阶`：概率期望与特殊带状高斯消元

### Part 5.7 多项式 / FFT / NTT / FPS

#### 多项式综合应用

- [ ] [P5432 A/B Problem（加强版）](https://www.luogu.com.cn/problem/P5432) `进阶`：高精度快速除法、Newton 迭代与多项式求逆
- [ ] [P5472 [NOI2019] 斗主地](https://www.luogu.com.cn/problem/P5472) `进阶`：随机过程中的低次多项式结构与插值

## Part 6 数据结构

### Part 6.1 基础维护结构

#### 堆 / 优先队列

- [ ] [P3045 [USACO12FEB] Cow Coupons G](https://www.luogu.com.cn/problem/P3045) `进阶`：贪心与多优先队列综合

#### ST 表 / RMQ

- [x] [P5012 水の数列](https://www.luogu.com.cn/problem/P5012) `进阶`：并查集、预处理与 RMQ 综合

#### 树状数组

- [x] [P5677 [GZOI2017] 配对统计](https://www.luogu.com.cn/problem/P5677) `进阶`：稀疏配对关系与离线贡献统计

### Part 6.2 线段树家族

#### 高级线段树 / 特殊区间信息

- [x] [P5522 [yLOI2019] 棠梨煎雪](https://www.luogu.com.cn/problem/P5522) `进阶`：线段树维护字符串 / 集合信息
- [ ] [P7706 文文的摄影布置](https://www.luogu.com.cn/problem/P7706) `进阶`：复杂节点信息与区间修改综合
- [ ] [P7447 rgxsxrs](https://www.luogu.com.cn/problem/P7447) `进阶`：高阶区间维护综合

#### 李超线段树 / 直线维护

- [ ] [P5416 时空旅行](https://www.luogu.com.cn/problem/P5416) `进阶`：时间维与直线维护综合

#### 线段树分裂 / 合并

- [ ] [P3722 [AH2017/HNOI2017] 影魔](https://www.luogu.com.cn/problem/P3722) `进阶`：贡献拆分与区间维护综合

### Part 6.3 根号与离线算法

#### 分块 / 根号算法

- [ ] [P3863 序列](https://www.luogu.com.cn/problem/P3863) `进阶`：离线扫描、时间维操作与分块
- [ ] [P3710 方方方的数据结构](https://www.luogu.com.cn/problem/P3710) `进阶`：时间轴分块与撤销操作
- [ ] [P3992 [BJOI2017] 开车](https://www.luogu.com.cn/problem/P3992) `进阶`：加权绝对值和与复杂分块维护
- [ ] [P4119 [Ynoi2018] 未来日记](https://www.luogu.com.cn/problem/P4119) `进阶`：点分块、值域分块与并查集综合

#### 莫队

- [ ] [CF940F Machine Learning](https://www.luogu.com.cn/problem/CF940F) `进阶`：带修改莫队与 mex 信息维护
- [ ] [P4074 [WC2013] 糖果公园](https://www.luogu.com.cn/problem/P4074) `进阶`：树上带修改莫队
- [ ] [P5501 [LnOI2019] 来者不拒，去者不追](https://www.luogu.com.cn/problem/P5501) `进阶`：高阶莫队与特殊区间信息维护

#### CDQ 分治

- [ ] [P4849 寻找宝藏](https://www.luogu.com.cn/problem/P4849) `进阶`：高维偏序、DP 与方案计数
- [ ] [P4690 [Ynoi2016] 镜中的昆虫](https://www.luogu.com.cn/problem/P4690) `进阶`：区间变化、离线数点与 CDQ 综合

### Part 6.4 可合并与可持久化结构

#### 可并堆 / 左偏树

- [ ] [P3273 [SCOI2011] 棘手的操作](https://www.luogu.com.cn/problem/P3273) `进阶`：集合合并与多层级修改查询的复杂可并堆

#### 主席树 / 区间顺序统计

- [ ] [P3302 [SDOI2013] 森林](https://www.luogu.com.cn/problem/P3302) `进阶`：动态森林、路径第 k 小与启发式合并
- [ ] [P2468 [SDOI2010] 粟粟的书架](https://www.luogu.com.cn/problem/P2468) `进阶`：多数据范围下的二维统计与主席树综合
- [ ] [P4559 [JSOI2018] 列队](https://www.luogu.com.cn/problem/P4559) `进阶`：可持久化权值结构与绝对值贡献统计
- [ ] [P4618 [SDOI2018] 原题识别](https://www.luogu.com.cn/problem/P4618) `进阶`：特殊树结构、离线统计与主席树综合

### Part 6.5 平衡树与动态序列

#### 平衡树 / 有序集合

- [ ] [P3224 [HNOI2012] 永无乡](https://www.luogu.com.cn/problem/P3224) `进阶`：动态连通块合并与块内顺序统计

#### 动态序列 / 可分裂平衡树

- [ ] [P2710 数列](https://www.luogu.com.cn/problem/P2710) `进阶`：重型动态序列与多种区间操作
- [ ] [P3285 [SCOI2014] 方伯伯的 OJ](https://www.luogu.com.cn/problem/P3285) `进阶`：隐式编号、排名变化与复杂平衡树建模
- [ ] [P5321 [BJOI2019] 送别](https://www.luogu.com.cn/problem/P5321) `进阶`：可分裂平衡树维护动态环拆分与合并

### Part 6.6 树上数据结构

#### 树链剖分 / 树上路径数据结构

- [ ] [P3313 [SDOI2014] 旅行](https://www.luogu.com.cn/problem/P3313) `进阶`：颜色限制下的路径权值维护
- [ ] [P4216 [SCOI2015] 情报传递](https://www.luogu.com.cn/problem/P4216) `进阶`：树链剖分与时间维统计结合
- [ ] [P4069 [SDOI2016] 游戏](https://www.luogu.com.cn/problem/P4069) `进阶`：树链剖分与直线维护综合
- [ ] [P5354 [Ynoi2017] 由乃的 OJ](https://www.luogu.com.cn/problem/P5354) `进阶`：高阶树上路径数据结构综合
- [ ] [P5499 [LnOI2019] Abbi 并不想研学](https://www.luogu.com.cn/problem/P5499) `进阶`：高阶树上区间维护综合

#### DSU on Tree / 树上启发式合并

- [ ] [CF1009F Dominant Indices](https://www.luogu.com.cn/problem/CF1009F) `进阶`：长链剖分方向的树上深度统计
- [ ] [P7124 stcm](https://www.luogu.com.cn/problem/P7124) `进阶`：树结构与区间分治构造综合
- [ ] [P6071 Treequery](https://www.luogu.com.cn/problem/P6071) `进阶`：LCA、主席树与前驱后继综合

#### 动态树 / Link-Cut Tree

- [ ] [P4172 [WC2006] 水管局长](https://www.luogu.com.cn/problem/P4172) `进阶`：动态 MST 与 LCT
- [ ] [P3348 [ZJOI2016] 大森林](https://www.luogu.com.cn/problem/P3348) `进阶`：虚点、离线与 LCT 综合
- [ ] [P4312 [COCI2009] OTCI](https://www.luogu.com.cn/problem/P4312) `进阶`：LCT 深化应用
- [ ] [P4338 [ZJOI2018] 历史](https://www.luogu.com.cn/problem/P4338) `进阶`：高阶 LCT 建模
- [ ] [P5489 EntropyIncreaser 与 动态图](https://www.luogu.com.cn/problem/P5489) `进阶`：LCT 与动态图结构综合

### Part 6.7 高维与专用数据结构

#### 树套树

- [ ] [P4278 带插入区间 K 小值](https://www.luogu.com.cn/problem/P4278) `进阶`：动态序列与区间顺序统计综合
- [ ] [P3759 [TJOI2017] 不勤劳的图书管理员](https://www.luogu.com.cn/problem/P3759) `进阶`：动态带权逆序对与多层数据结构
- [ ] [P5445 [APIO2019] 路灯](https://www.luogu.com.cn/problem/P5445) `进阶`：时间维、二维统计与动态连通区间

#### 01-Trie / XOR 维护

- [ ] [P5795 [THUSC2015] 异或运算](https://www.luogu.com.cn/problem/P5795) `进阶`：多版本 Trie 与多询问异或选择
- [ ] [P6072 [MdOI2020] Path](https://www.luogu.com.cn/problem/P6072) `进阶`：01-Trie、树上路径与回滚结构综合

#### 珂朵莉树 ODT

- [ ] [P5251 [LnOI2019] 第二代图灵机](https://www.luogu.com.cn/problem/P5251) `进阶`：ODT 与其他区间统计结构综合

### Part 6.8 数据结构综合（已取消）

原综合节拆空，不再保留主表入口；以下高阶综合题进入缓存。

- [ ] [P3644 [APIO2015] 八邻旁之桥](https://www.luogu.com.cn/problem/P3644) `进阶`：贪心、中位数与动态维护综合
- [ ] [P5324 [BJOI2019] 删数](https://www.luogu.com.cn/problem/P5324) `进阶`：值域转化与高级线段树综合
- [ ] [P5044 [IOI2018] meetings 会议](https://www.luogu.com.cn/problem/P5044) `进阶`：笛卡尔树、函数维护与高阶数据结构综合

## Part 7 图论与树论

### Part 7.4 生成树

#### 最小生成树及其扩展

- [x] [P2498 [SDOI2012] 拯救小云公主](https://www.luogu.com.cn/problem/P2498) `进阶`：几何瓶颈连通与生成树综合
- [x] [CF76A Gift](https://www.luogu.com.cn/problem/CF76A) `进阶`：双权指标与生成树变式

### Part 7.1 图遍历与最短路

#### 最短路

- [ ] [P1266 速度限制](https://www.luogu.com.cn/problem/P1266) `进阶`：状态扩展型最短路深化
- [x] [CF1076D Edge Deletion](https://www.luogu.com.cn/problem/CF1076D) `进阶`：最短路树上的结构应用
- [ ] [P4745 Gambling Guide](https://www.luogu.com.cn/problem/P4745) `进阶`：期望与 Dijkstra 式确定顺序结合

#### 0-1 BFS

- [ ] [CF173B Chamber of Secrets](https://www.luogu.com.cn/problem/CF173B) `进阶`：状态建图与 0-1 BFS 综合

#### 差分约束

- [ ] [P5590 赛车游戏](https://www.luogu.com.cn/problem/P5590) `进阶`：差分约束的构造型应用

### Part 7.2 树论基础

#### LCA / 树上差分 / 路径关系

- [ ] [P3938 斐波那契](https://www.luogu.com.cn/problem/P3938) `进阶`：特殊隐式树上的祖先与路径结构
- [x] [P4211 [LNOI2014] LCA](https://www.luogu.com.cn/problem/P4211) `进阶`：离线扫描与根路径信息维护

### Part 7.3 函数图与倍增跳转

#### 倍增 / 二进制跳转

- [ ] [P7562 [JOISC 2021] Event Hopping 2](https://www.luogu.com.cn/problem/P7562) `进阶`：高阶倍增与离线跳转

### Part 7.6 无向图连通与欧拉结构

#### 离线动态连通性

- [ ] [P3206 [HNOI2010] 城市建设](https://www.luogu.com.cn/problem/P3206) `进阶`：动态改边权 MST 与时间分治综合

### Part 7.7 二分图

#### 二染色与冲突图

- [ ] [P1477 假面舞会](https://www.luogu.com.cn/problem/P1477) `进阶`：图上势能、环约束与 gcd 综合

#### 最大匹配 / 覆盖 / 匹配结构

- [ ] [P2423 [HEOI2012] 朋友圈](https://www.luogu.com.cn/problem/P2423) `进阶`：补图、最大独立集与匹配综合

### Part 7.8 网络流

#### 最小割 / 最大权闭合子图

- [ ] [P5039 [SHOI2010] 最小生成树](https://www.luogu.com.cn/problem/P5039) `进阶`：MST 与最小割专项交叉

#### 费用流

- [ ] [P2770 航空路线问题](https://www.luogu.com.cn/problem/P2770) `进阶`：点容量、双路径与最大费用流综合
- [ ] [P3159 [CQOI2012] 交换棋子](https://www.luogu.com.cn/problem/P3159) `进阶`：复杂拆点与交换次数约束

#### 上下界网络流

- [ ] [P4553 80人环游世界](https://www.luogu.com.cn/problem/P4553) `进阶`：点拆分、固定人数与最小费用可行流综合

### Part 7.9 树上高级技巧

#### 点分治 / 点分树

- [ ] [P2664 树上游戏](https://www.luogu.com.cn/problem/P2664) `进阶`：点分治与其他扫描 / 数据结构路线交叉
- [ ] [P4075 [SDOI2016] 模式字符串](https://www.luogu.com.cn/problem/P4075) `进阶`：点分治与字符串匹配综合
- [ ] [P4183 [USACO18JAN] Cow at Large P](https://www.luogu.com.cn/problem/P4183) `进阶`：树结构分析与点分治方向
- [ ] [P4292 [WC2010] 重建计划](https://www.luogu.com.cn/problem/P4292) `进阶`：分数规划、长度区间与点分治
- [ ] [P5306 [COCI2019] Transport](https://www.luogu.com.cn/problem/P5306) `进阶`：点分治、双指针与路径可行性

#### 动态关键点 / 极小连通子树维护

- [ ] [CF696E ...Wait for it...](https://www.luogu.com.cn/problem/CF696E) `进阶`：树链剖分与路径数据结构综合

#### 虚树

- [ ] [P5439 永恒](https://www.luogu.com.cn/problem/P5439) `进阶`：树、Trie/LCP 与虚树 / 分治综合
- [ ] [P5360 [SDOI2019] 世界地图](https://www.luogu.com.cn/problem/P5360) `进阶`：MST / Kruskal 重构树与虚树综合

#### 原 7.9.4 树论综合（已取消）

- [ ] [P5021 [NOIP2018 提高组] 赛道修建](https://www.luogu.com.cn/problem/P5021) `进阶`：树上二分答案与路径贪心配对
- [ ] [P5049 旅行 加强版](https://www.luogu.com.cn/problem/P5049) `进阶`：基环结构与字典序遍历深化
- [ ] [P5659 [CSP-S2019] 树上的数](https://www.luogu.com.cn/problem/P5659) `进阶`：树上删边顺序约束与复杂贪心
- [ ] [P6074 最小路径](https://www.luogu.com.cn/problem/P6074) `进阶`：0/1 分数规划与定长树路径
- [ ] [CF536E Tavas on the Path](https://www.luogu.com.cn/problem/CF536E) `进阶`：树链剖分与非交换路径信息
- [ ] [CF1344E Train Tracks](https://www.luogu.com.cn/problem/CF1344E) `进阶`：复杂树上过程与调度综合
- [ ] [CF983E NN country](https://www.luogu.com.cn/problem/CF983E) `进阶`：路径覆盖关系与倍增跳转
- [ ] [CF1140G Double Tree](https://www.luogu.com.cn/problem/CF1140G) `进阶`：双树状态与倍增 / min-plus 合并
- [ ] [CF486D Valid Sets](https://www.luogu.com.cn/problem/CF486D) `进阶`：连通点集计数与树形 DP
- [ ] [P3248 [HNOI2016] 树](https://www.luogu.com.cn/problem/P3248) `进阶`：隐式巨树压缩与 LCA / 倍增

## Part 8 计算几何

### Part 8.2 凸性结构

#### 凸包

- [ ] [P2287 [HNOI2004] 最佳包裹](https://www.luogu.com.cn/problem/P2287) `进阶`：三维凸包表面积
- [ ] [P5403 [CTS2019] 田野](https://www.luogu.com.cn/problem/P5403) `进阶`：高阶凸性几何综合

#### 旋转卡壳

- [ ] [P6247 [SDOI2012] 最近最远点对](https://www.luogu.com.cn/problem/P6247) `进阶`：最近点对分治与最远点旋转卡壳综合

#### 半平面交

- [ ] [P2600 [ZJOI2008] 瞭望塔](https://www.luogu.com.cn/problem/P2600) `进阶`：半平面交与凸函数方向的交叉模型
- [ ] [P5328 [ZJOI2019] 浙江省选](https://www.luogu.com.cn/problem/P5328) `进阶`：半平面交与扫描覆盖综合

## Part 9 跨专题工具

### Part 9.1 0/1 分数规划

- [ ] [P3288 [SCOI2014] 方伯伯运椰子](https://www.luogu.com.cn/problem/P3288) `进阶`：残量网络建模与平均权环综合

### Part 9.2 Bitset / 字级并行优化

- [ ] [P4465 [国家集训队] JZPSTR](https://www.luogu.com.cn/problem/P4465) `进阶`：字符串位集运算的高阶应用
