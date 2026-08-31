---
title: XCPC 综合题单
description: 面向 XCPC 长期训练的导航型综合题单；进阶专项与补充复盘分表维护。
long_page: true
tags:
  - algorithm/题单
categories:
  - 280_Study
comments: false
copyright: false
abbrlink: '60749789'
date: 2026-08-28
updated: 2026-08-31
---

# XCPC 综合题单

> [!info] 题单导航
> **主综合题单**：[[XCPC_综合题单]]　·　**进阶题单**：[[XCPC_进阶题单]]　·　**补充题单**：[[XCPC_补充题单]]

> [!note]
> 以 StudyingFather「一个动态更新的洛谷综合题单」3.0.2 为经典题库底稿，并按当前 XCPC 学习体系重新筛选、迁移与交叉挂载。
>
> 本表只承担**知识导航与主动选题**：只保留足以建立、检验和扩展一个知识节点的最小有效训练集。高价值但偏深、偏专项的题进入 [[XCPC_进阶题单]]；同模型复盘、补手感与低成本熟练题进入 [[XCPC_补充题单]]。
>
> 原题单：https://studyingfather.com/archives/841
>
> 原仓库：https://github.com/SFOI-Team/luogu-problem-list
>
> 原项目采用 CC BY-SA 4.0 与 Star And Thank Author License。本版保留来源与署名；公开传播或继续演绎时请遵守原项目许可。

## 使用规则

- **主线**：值得主动建设到理解、实现与迁移层；优先沿题目顺序推进。
- **进阶主线**：基础主线稳定后再系统学习；代表更高复杂度或更强迁移价值。
- **地图保留**：知道用途、触发线索和模板入口即可，不自动生成近期待办。
- **模板题默认保留**：即使与应用题模型重合，仍承担标准实现恢复与检查职责。
- **允许一题多归属，但必须有不同知识责任**：第二归属用于表达真实交叉关系，不用于机械重复。
- **原子专题通常保留约 4～6 个核心训练节点，但不机械限额**：专题过短可以完整保留，模型差异明显时可以自然扩展。

### 训练标记

- `模板`：标准实现与实现边界检查。
- `衔接`：模板之后的第一层，适合进入专题。
- `主练`：代表模型，优先完整思考。
- `挑战`：完成前置后再做，用于迁移与综合。
- `复盘`：跨专题回看，不作为新知识入口。
- `地图`：保留知识锚点，不要求主动刷。

> **三表分工**：综合题单决定“现在学什么”；进阶题单保存“以后值得专项回收什么”；补充题单保存“需要熟练度或手感时还能刷什么”。
>
> 当前主表共有 **683 个题目条目、680 个不同题目**；少量条目重复仅用于表达稳定的知识交叉关系。

## Part 1 基础算法

### Part 1.1 模拟 / 实现｜主线

重点训练复杂规则下的状态一致性、信息组织与边界处理。

- [ ] [P3952 时间复杂度](https://www.luogu.com.cn/problem/P3952) `衔接`：嵌套解析与作用域维护
- [ ] [P10821 [EC Final 2020] Rooks](https://www.luogu.com.cn/problem/P10821) `主练`：局部关系与信息组织
- [ ] [P10826 [EC Final 2020] Allin](https://www.luogu.com.cn/problem/P10826) `主练`：复杂分类与状态判定
- [ ] [P2482 [SDOI2010] 猪国杀](https://www.luogu.com.cn/problem/P2482) `挑战`：长流程多角色状态维护
- [ ] [P5380 [THUPC2019] 鸭棋](https://www.luogu.com.cn/problem/P5380) `挑战`：复杂规则与合法性维护

### Part 1.2 二分答案｜主线

重点训练单调性识别、答案域处理与不同判定结构。

- [x] [P1024 一元三次方程求解](https://www.luogu.com.cn/problem/P1024) `衔接`：连续值域定位
- [x] [P2678 跳石头](https://www.luogu.com.cn/problem/P2678) `主练`：最优化转可行性
- [ ] [P1902 刺杀大使](https://www.luogu.com.cn/problem/P1902) `主练`：复杂判定结构
- [x] [P1314 聪明的质监员](https://www.luogu.com.cn/problem/P1314) `主练`：阈值与整体统计
- [x] [P1083 借教室](https://www.luogu.com.cn/problem/P1083) `主练`：首次失效定位

### Part 1.3 分治｜主线

保留几种不同形态的递归拆分、规模压缩与跨区处理。

- [x] [P1226 【模板】快速幂 / 取余运算](https://www.luogu.com.cn/problem/P1226) `衔接`：重复结构与规模折半
- [x] [P1010 幂次方](https://www.luogu.com.cn/problem/P1010) `衔接`：递归表示与恢复
- [ ] [P1429 平面最近点对（加强版）](https://www.luogu.com.cn/problem/P1429) `主练`：跨区候选限制
- [x] [P3612 [USACO17JAN] Secret Cow Code](https://www.luogu.com.cn/problem/P3612) `主练`：大结构反向定位

### Part 1.4 贪心｜主线

重点训练局部选择、排序依据、交换证明与约束下决策。

- [x] [P4995 跳跳！](https://www.luogu.com.cn/problem/P4995) `衔接`：极端元素选择
- [x] [P1094 纪念品分组](https://www.luogu.com.cn/problem/P1094) `衔接`：局部配对
- [ ] [P1199 三国游戏](https://www.luogu.com.cn/problem/P1199) `主练`：对手行为与决策压缩
- [ ] [P2672 推销员](https://www.luogu.com.cn/problem/P2672) `主练`：局部收益与全局代价
- [x] [P1080 国王游戏](https://www.luogu.com.cn/problem/P1080) `主练`：交换证明与排序
- [ ] [P2123 皇后游戏](https://www.luogu.com.cn/problem/P2123) `挑战`：复杂排序依据
- [ ] [P5521 [yLOI2019] 梅深不见冬](https://www.luogu.com.cn/problem/P5521) `挑战`：非模板化贪心迁移
- [x] [P6902 Surveillance](https://www.luogu.com.cn/problem/P6902) `挑战`：环形覆盖与贪心结构
- [ ] [P1325 雷达安装](https://www.luogu.com.cn/problem/P1325) `主练`：几何约束转区间后的覆盖贪心；交叉：[[XCPC_综合题单#Part 8.1 计算几何基础｜主线|8.1 几何建模]]

### Part 1.5 构造｜主线

重点训练从必要条件、不变量与目标性质反推整体结构。

- [ ] [P3599 Koishi Loves Construction](https://www.luogu.com.cn/problem/P3599) `主练`：性质反推构造
- [ ] [P5441 【XR-2】伤痕](https://www.luogu.com.cn/problem/P5441) `主练`：全局限制局部化
- [ ] [P5595 【XR-4】歌唱比赛](https://www.luogu.com.cn/problem/P5595) `挑战`：局部合法与整体连接

### Part 1.6 高精度｜地图保留

XCPC 中优先使用 `boost::multiprecision::cpp_int`，仅保留工具入口。

- [ ] [P1009 阶乘之和](https://www.luogu.com.cn/problem/P1009)：大整数工具入口

### Part 1.7 前缀和 / 差分 / 离散化｜主线

重点训练信息重表示、区间统计、范围影响与结构降维。

- [x] [P3131 [USACO16JAN] Subsequences Summing to Sevens](https://www.luogu.com.cn/problem/P3131) `衔接`：边界状态统计
- [x] [P3397 地毯](https://www.luogu.com.cn/problem/P3397) `衔接`：二维范围修改
- [x] [P2280 [HNOI2003] 激光炸弹](https://www.luogu.com.cn/problem/P2280) `主练`：二维区域统计
- [x] [P4552 [Poetize6] IncDec Sequence](https://www.luogu.com.cn/problem/P4552) `主练`：差分表示重构
- [x] [P1719 最大加权矩形](https://www.luogu.com.cn/problem/P1719) `主练`：二维结构降维
- [x] [P2882 [USACO07MAR] Face The Right Way G](https://www.luogu.com.cn/problem/P2882) `主练`：历史影响压缩

### Part 1.8 双指针 / 滑动窗口｜主线

重点训练端点单调移动、窗口信息维护与局部结果组合。

- [x] [UVA11572 唯一的雪花 Unique Snowflakes](https://www.luogu.com.cn/problem/UVA11572) `衔接`：窗口合法性恢复
- [ ] [P1147 连续正整数和](https://www.luogu.com.cn/problem/P1147) `衔接`：区间和与端点移动
- [x] [P1638 逛画展](https://www.luogu.com.cn/problem/P1638) `主练`：最短覆盖窗口
- [x] [P3143 [USACO16OPEN] Diamond Collector S](https://www.luogu.com.cn/problem/P3143) `挑战`：局部最优组合
- [ ] [P3522 [POI2011] TEM-Temperature](https://www.luogu.com.cn/problem/P3522) `挑战`：多约束窗口合法性

### Part 1.9 三分 / 单峰函数｜地图保留

重点训练单峰 / 单谷结构的连续域搜索，并保留从裸模板到复合凸函数判定的最小训练集。

- [x] [P3382 【模板】三分法](https://www.luogu.com.cn/problem/P3382) `模板`：单峰函数三分
- [ ] [P1883 函数](https://www.luogu.com.cn/problem/P1883) `主练`：多函数最大值的凸性与三分

---

## Part 2 搜索

### Part 2.1 基础搜索｜主线

#### Part 2.1.1 深度优先搜索｜主线

重点训练状态枚举、回溯恢复，以及递归搜索中的状态组织。

- [x] [P1219 八皇后](https://www.luogu.com.cn/problem/P1219) `衔接`：经典回溯与冲突维护
- [x] [P1019 单词接龙](https://www.luogu.com.cn/problem/P1019) `主练`：路径状态与使用限制
- [ ] [P1514 引水入城](https://www.luogu.com.cn/problem/P1514) `主练`：搜索结果与区间结构
- [ ] [P1378 油滴扩展](https://www.luogu.com.cn/problem/P1378) `挑战`：排列搜索与连续状态

#### Part 2.1.2 广度优先搜索｜主线

重点训练最短层次扩展、状态建模，以及多个搜索结果之间的组合。

- [x] [P1162 填涂颜色](https://www.luogu.com.cn/problem/P1162) `衔接`：连通区域扩展
- [x] [P1443 马的遍历](https://www.luogu.com.cn/problem/P1443) `衔接`：无权最短距离
- [x] [P1032 字串变换](https://www.luogu.com.cn/problem/P1032) `主练`：隐式状态图搜索
- [ ] [P1126 机器人搬重物](https://www.luogu.com.cn/problem/P1126) `主练`：方向与位置联合状态
- [ ] [P5195 [USACO05DEC] Knights of Ni](https://www.luogu.com.cn/problem/P5195) `主练`：多端距离组合

#### Part 2.1.3 记忆化搜索｜主线

重点理解搜索状态的重复子问题，以及缓存状态结果带来的复杂度下降。

- [ ] [P1434 [SHOI2002] 滑雪](https://www.luogu.com.cn/problem/P1434) `主练`：经典记忆化搜索

#### Part 2.1.4 搜索剪枝与状态搜索｜主线

重点训练搜索顺序、等效状态排除、可行性剪枝与复杂状态表示。

- [ ] [P5194 [USACO05DEC] Scales](https://www.luogu.com.cn/problem/P5194) `衔接`：搜索顺序与上界剪枝
- [ ] [P1120 小木棍](https://www.luogu.com.cn/problem/P1120) `主练`：等效状态与强剪枝
- [ ] [P1074 靶形数独](https://www.luogu.com.cn/problem/P1074) `主练`：约束传播与搜索顺序
- [ ] [P1312 Mayan 游戏](https://www.luogu.com.cn/problem/P1312) `挑战`：复杂操作与状态恢复

### Part 2.2 Meet-in-the-Middle｜主线

重点训练把指数搜索拆成两个较小状态空间，并设计两侧结果的匹配方式。

- [ ] [P4799 [CEOI2015 Day2] 世界冰球锦标赛](https://www.luogu.com.cn/problem/P4799) `衔接`：折半枚举与结果匹配
- [ ] [P3067 [USACO12OPEN] Balanced Cow Subsets](https://www.luogu.com.cn/problem/P3067) `主练`：多选择状态与去重
- [ ] [CF525E Anya and Cubes](https://www.luogu.com.cn/problem/CF525E) `主练`：多分支选择与计数
- [ ] [CF912E Prime Gift](https://www.luogu.com.cn/problem/CF912E) `挑战`：折半结果与第 k 小

### Part 2.3 启发式搜索｜地图保留

仅保留能够建立估价函数与搜索边界概念的代表题，不作为当前主动训练主线。

#### Part 2.3.1 A\*｜地图保留

- [ ] [P1379 八数码难题](https://www.luogu.com.cn/problem/P1379)：经典启发函数入口
- [ ] [P5507 机关](https://www.luogu.com.cn/problem/P5507) `挑战`：大状态空间与启发估价

#### Part 2.3.2 IDA\*｜地图保留

- [ ] [P2324 [SCOI2005] 骑士精神](https://www.luogu.com.cn/problem/P2324)：迭代加深与估价剪枝

### Part 2.4 DLX｜地图保留

仅保留精确覆盖模型与 Dancing Links 实现入口，高阶应用进入专题题库。

- [ ] [P4929 【模板】舞蹈链（DLX）](https://www.luogu.com.cn/problem/P4929)：精确覆盖与 DLX 模板

---

## Part 3 动态规划

> 本 Part 按“状态模型 → 结构型 DP → 状态压缩与计数 → 优化型 DP → 高阶与综合”组织。基础题保留但折叠；同一道题允许因知识交叉在其它 Part 再出现。
### Part 3.1 基础状态模型｜主线

#### Part 3.1.1 线性 DP / 序列模型｜主线

重点训练沿线性顺序组织状态、压缩前驱信息，以及从题意中提取可递推结构。

- [x] [P1280 尼克的任务](https://www.luogu.com.cn/problem/P1280) `衔接`：时间轴阶段递推
- [x] [P1020 导弹拦截](https://www.luogu.com.cn/problem/P1020) `衔接`：LIS 基本模型
- [x] [P1439 两个排列的最长公共子序列](https://www.luogu.com.cn/problem/P1439) `主练`：模型转化与序列映射
- [x] [P4310 绝世好题](https://www.luogu.com.cn/problem/P4310) `主练`：特征压缩与前驱维护
- [x] [P4933 大师](https://www.luogu.com.cn/problem/P4933) `主练`：差值维度状态
- [ ] [P1799 数列](https://www.luogu.com.cn/problem/P1799) `主练`：删除影响与位置状态
- [ ] [P3558 [POI2013] BAJ-Bytecomputer](https://www.luogu.com.cn/problem/P3558) `主练`：有限状态与完备转移
- [x] [P2519 problem a](https://www.luogu.com.cn/problem/P2519) `主练`：区间重构与线性选择
- [ ] [P2501 [HAOI2006] 数字序列](https://www.luogu.com.cn/problem/P2501) `挑战`：序列变换与代价优化
- [x] [P5017 摆渡车](https://www.luogu.com.cn/problem/P5017) `挑战`：时间轴分段决策

#### Part 3.1.2 序列匹配 / 字符串 DP｜主线

重点训练两个序列之间的匹配关系、保序选择，以及由匹配状态扩展出的计数与恢复。

- [x] [P2758 编辑距离](https://www.luogu.com.cn/problem/P2758) `衔接`：双序列基本状态
- [x] [P2516 最长公共子序列](https://www.luogu.com.cn/problem/P2516) `主练`：最优值与方案计数
- [x] [P1854 [IOI1999] 花店橱窗布置](https://www.luogu.com.cn/problem/P1854) `主练`：保序匹配与方案恢复
- [x] [P2679 子串](https://www.luogu.com.cn/problem/P2679) `挑战`：多维字符串计数状态

#### Part 3.1.3 背包 DP｜主线

重点训练容量、收益与选择限制之间的状态建模，并保留几类具有独立建模价值的背包变形。

- [x] [P1048 采药](https://www.luogu.com.cn/problem/P1048) `衔接`：0/1 背包入口
- [x] [P1616 疯狂的采药](https://www.luogu.com.cn/problem/P1616) `衔接`：完全背包入口
- [x] [P5020 货币系统](https://www.luogu.com.cn/problem/P5020) `主练`：可表示性建模
- [x] [P1776 宝物筛选](https://www.luogu.com.cn/problem/P1776) `主练`：多重背包
- [x] [P5322 排兵布阵](https://www.luogu.com.cn/problem/P5322) `主练`：分组选择与收益重构
- [x] [P1064 金明的预算方案](https://www.luogu.com.cn/problem/P1064) `主练`：依赖关系
- [x] [P1450 [HAOI2008] 硬币购物](https://www.luogu.com.cn/problem/P1450) `主练`：限制查询与容斥交叉
- [x] [P2340 [USACO03FALL] Cow Exhibition G](https://www.luogu.com.cn/problem/P2340) `主练`：负权值域与状态范围
- [x] [P1156 垃圾陷阱](https://www.luogu.com.cn/problem/P1156) `挑战`：状态维度选择
- [ ] [P4158 [SCOI2009] 粉刷匠](https://www.luogu.com.cn/problem/P4158) `挑战`：局部 DP 与全局资源合并

#### Part 3.1.4 网格 / 路径 / 多维状态 DP｜主线

重点训练路径型状态、多过程同步，以及从多个变量中选择真正需要进入状态的维度。

- [x] [P1216 数字三角形](https://www.luogu.com.cn/problem/P1216) `衔接`：基础路径状态
- [x] [P1004 方格取数](https://www.luogu.com.cn/problem/P1004) `主练`：双路径同步状态
- [x] [P1941 飞扬的小鸟](https://www.luogu.com.cn/problem/P1941) `主练`：动作限制与高度状态
- [x] [P1541 乌龟棋](https://www.luogu.com.cn/problem/P1541) `主练`：多资源计数状态
- [x] [P1758 管道取珠](https://www.luogu.com.cn/problem/P1758) `挑战`：多过程同步与状态降维

### Part 3.2 结构型 DP｜主线

#### Part 3.2.1 区间 DP｜主线

重点训练按区间结构拆分子问题，并覆盖划分、扩展、合并、文法与区间贡献等不同状态形态。

- [x] [P1880 石子合并](https://www.luogu.com.cn/problem/P1880) `衔接`：区间划分与环形处理
- [x] [P1220 关路灯](https://www.luogu.com.cn/problem/P1220) `主练`：区间扩展与端点状态
- [x] [P3205 合唱队](https://www.luogu.com.cn/problem/P3205) `主练`：两端构造与计数
- [x] [P4170 涂色](https://www.luogu.com.cn/problem/P4170) `主练`：字符串区间消去与合并
- [x] [P4290 [HAOI2008] 玩具取名](https://www.luogu.com.cn/problem/P4290) `主练`：文法型区间状态
- [x] [P3146 [USACO16OPEN] 248](https://www.luogu.com.cn/problem/P3146) `主练`：区间合并状态
- [ ] [P1622 释放囚犯](https://www.luogu.com.cn/problem/P1622) `主练`：操作顺序转区间划分
- [x] [P5851 Greedy Pie Eaters P](https://www.luogu.com.cn/problem/P5851) `挑战`：区间贡献与分割点设计

#### Part 3.2.2 树形 DP / 树上背包｜主线

重点训练树结构上的局部状态合并，并保留普通树形 DP 与树上背包两条主要训练链。

**普通树形 DP**

- [x] [P1352 没有上司的舞会](https://www.luogu.com.cn/problem/P1352) `衔接`：基础父子状态
- [x] [P1122 最大子树和](https://www.luogu.com.cn/problem/P1122) `主练`：连通子树贡献
- [ ] [P1131 时态同步](https://www.luogu.com.cn/problem/P1131) `主练`：子树代价平衡
- [ ] [P3574 [POI2014] FAR-FarmCraft](https://www.luogu.com.cn/problem/P3574) `主练`：子树处理顺序
- [x] [P2607 [ZJOI2008] 骑士](https://www.luogu.com.cn/problem/P2607) `主练`：基环树 DP
- [ ] [P4516 [JSOI2018] 潜入行动](https://www.luogu.com.cn/problem/P4516) `挑战`：多状态树形 DP
- [ ] [P5658 [CSP-S2019] 括号树](https://www.luogu.com.cn/problem/P5658) `挑战`：根路径括号状态与 DFS 回溯递推

**树上背包**

- [x] [P2014 选课](https://www.luogu.com.cn/problem/P2014) `衔接`：树上背包入口
- [x] [P3698 [CQOI2017] 小Q的棋盘](https://www.luogu.com.cn/problem/P3698) `主练`：访问状态设计
- [x] [P3177 [HAOI2015] 树上染色](https://www.luogu.com.cn/problem/P3177) `主练`：边贡献建模
- [x] [P2515 [HAOI2010] 软件安装](https://www.luogu.com.cn/problem/P2515) `挑战`：SCC 缩点与树上背包；交叉：[[XCPC_综合题单#Part 7.5.2 强连通分量 / 缩点 DAG｜主线|7.5.2 SCC / 缩点]]

#### Part 3.2.3 换根 DP｜主线

重点训练先固定根求局部信息，再沿边转移整树答案，并逐步扩展到带权与多层状态。

- [x] [P3478 [POI2008] STA-Station](https://www.luogu.com.cn/problem/P3478) `衔接`：换根基本模型
- [ ] [P2986 [USACO10MAR] Great Cow Gathering](https://www.luogu.com.cn/problem/P2986) `主练`：点权距离贡献
- [ ] [P3047 [USACO12FEB] Nearby Cows](https://www.luogu.com.cn/problem/P3047) `挑战`：多层距离状态换根

#### Part 3.2.4 DAG / 图上 DP / 拓扑递推｜主线

重点训练把图结构压缩成可递推顺序，并在 DAG、最短路结构或有向边序上组织状态传播。

- [x] [P3387 【模板】缩点](https://www.luogu.com.cn/problem/P3387) `衔接`：SCC 缩点与 DAG 递推
- [x] [P4316 绿豆蛙的归宿](https://www.luogu.com.cn/problem/P4316) `主练`：DAG 上期望递推
- [x] [P7077 [CSP-S2020] 函数调用](https://www.luogu.com.cn/problem/P7077) `主练`：调用图上的贡献传播
- [x] [P3953 [NOIP2017 提高组] 逛公园](https://www.luogu.com.cn/problem/P3953) `主练`：最短路结构上的计数
- [ ] [CF960F Pathwalks](https://www.luogu.com.cn/problem/CF960F) `挑战`：边序状态与数据维护
- [x] [P6772 [NOI2020] 美食家](https://www.luogu.com.cn/problem/P6772) `挑战`：时间维度下的图上转移

### Part 3.3 状态压缩与计数 DP｜主线

#### Part 3.3.1 状态压缩 DP｜主线

重点训练识别真正影响未来的有限信息，并用子集、局部窗口或多值状态压缩原问题。

**子集状态 / 状态图**

- [ ] [P2761 软件补丁问题](https://www.luogu.com.cn/problem/P2761) `衔接`：状态图与带权转移；交叉：[[XCPC_综合题单#Part 7.1.2 最短路｜主线|7.1.2 状态图最短路]]
- [ ] [P3092 [USACO13NOV] No Change](https://www.luogu.com.cn/problem/P3092) `主练`：子集状态与资源进度
- [x] [CF11D A Simple Task](https://www.luogu.com.cn/problem/CF11D) `主练`：子集路径与环计数
- [ ] [P2831 [NOIP2016 提高组] 愤怒的小鸟](https://www.luogu.com.cn/problem/P2831) `主练`：集合覆盖型状态
- [x] [P3959 [NOIP2017 提高组] 宝藏](https://www.luogu.com.cn/problem/P3959) `挑战`：分层扩展与子集划分
- [x] [P4363 [九省联考2018] 一双木棋 chess](https://www.luogu.com.cn/problem/P4363) `挑战`：隐式局面压缩
- [ ] [P10865 [HBCPC2024] Genshin Impact Startup Forbidden III](https://www.luogu.com.cn/problem/P10865) `主练`：多值状态压缩

**行状态 / 局部轮廓**

- [x] [P1896 [SCOI2005] 互不侵犯](https://www.luogu.com.cn/problem/P1896) `衔接`：行状态入口
- [ ] [P2704 [NOI2001] 炮兵阵地](https://www.luogu.com.cn/problem/P2704) `主练`：多行关联状态
- [ ] [P2157 [SDOI2009] 学校食堂](https://www.luogu.com.cn/problem/P2157) `主练`：有限窗口状态
- [ ] [CF1209E2 Rotate Columns (hard version)](https://www.luogu.com.cn/problem/CF1209E2) `挑战`：局部子集与整体合并

#### Part 3.3.2 SOS DP / 子集和 DP｜主线

重点训练子集与超集之间的信息聚合，并掌握 SOS 转移在计数与最值问题中的应用。

- [ ] [CF165E Compatible Numbers](https://www.luogu.com.cn/problem/CF165E) `衔接`：子集与超集关系
- [ ] [AT_arc100_c [ARC100E] Or Plus Max](https://www.luogu.com.cn/problem/AT_arc100_c) `主练`：子集信息聚合
- [ ] [CF449D Jzzhu and Numbers](https://www.luogu.com.cn/problem/CF449D) `挑战`：SOS 与容斥计数

#### Part 3.3.3 计数 DP｜主线

重点训练把排列、划分与选择过程转化为可递推的计数状态，并处理结构限制与重复计数。

- [ ] [P1025 数的划分](https://www.luogu.com.cn/problem/P1025) `衔接`：整数划分递推
- [ ] [P2051 [AHOI2009] 中国象棋](https://www.luogu.com.cn/problem/P2051) `主练`：按列占用次数压缩状态的棋盘计数
- [ ] [CF1061C Multiplicity](https://www.luogu.com.cn/problem/CF1061C) `主练`：因数关系与子序列计数
- [ ] [P2513 [HAOI2009] 逆序对数列](https://www.luogu.com.cn/problem/P2513) `主练`：排列统计状态
- [ ] [P2467 [SDOI2010] 地精部落](https://www.luogu.com.cn/problem/P2467) `主练`：相对大小与排列计数
- [ ] [P5664 [CSP-S2019] Emiya 家今天的饭](https://www.luogu.com.cn/problem/P5664) `挑战`：非法结构反计与状态压缩
- [ ] [P4798 [CEOI2015 Day1] 卡尔文球锦标赛](https://www.luogu.com.cn/problem/P4798) `挑战`：受限增长序列计数

#### Part 3.3.4 概率 / 期望 DP｜进阶主线

重点训练随机过程中的状态递推，并区分直接线性期望与真正需要状态转移的期望模型。

- [ ] [P1365 WJMZBMR 打 osu! / Easy](https://www.luogu.com.cn/problem/P1365) `衔接`：连续段贡献期望
- [ ] [P1850 [NOIP2016 提高组] 换教室](https://www.luogu.com.cn/problem/P1850) `主练`：决策与随机状态
- [ ] [P2473 [SCOI2008] 奖励关](https://www.luogu.com.cn/problem/P2473) `主练`：状压期望 DP
- [ ] [P6835 [Cnoi2020] 线形生物](https://www.luogu.com.cn/problem/P6835) `主练`：期望方程与顺序递推
- [ ] [CF708E Student's Camp](https://www.luogu.com.cn/problem/CF708E) `挑战`：结构概率状态 DP

#### Part 3.3.5 数位 DP｜主线

重点训练上界约束下的逐位状态设计，并覆盖限制计数、数位贡献与更复杂的跨位统计。

- [ ] [P2657 [SCOI2009] windy 数](https://www.luogu.com.cn/problem/P2657) `衔接`：标准限制型数位 DP
- [ ] [P2602 [ZJOI2010] 数字计数](https://www.luogu.com.cn/problem/P2602) `主练`：数位贡献统计
- [ ] [P4124 [CQOI2016] 手机号码](https://www.luogu.com.cn/problem/P4124) `主练`：多条件数位状态
- [ ] [P3281 [SCOI2013] 数数](https://www.luogu.com.cn/problem/P3281) `挑战`：子串贡献与数位统计

### Part 3.4 DP 优化｜进阶主线

#### Part 3.4.1 单调队列优化 DP｜主线

重点训练从朴素转移中识别连续候选区间，并用单调队列维护窗口内的最优决策。

- [x] [P1725 琪露诺](https://www.luogu.com.cn/problem/P1725) `衔接`：标准窗口转移
- [x] [P2034 选择数字](https://www.luogu.com.cn/problem/P2034) `主练`：朴素 DP 到窗口优化
- [x] [P3957 跳房子](https://www.luogu.com.cn/problem/P3957) `主练`：参数判定与窗口优化
- [x] [P1776 宝物筛选](https://www.luogu.com.cn/problem/P1776) `主练`：多重背包中的单调队列
- [x] [P1070 道路游戏](https://www.luogu.com.cn/problem/P1070) `主练`：环形阶段 DP 与窗口优化
- [x] [P2569 股票交易](https://www.luogu.com.cn/problem/P2569) `挑战`：多状态交易限制
- [ ] [P2254 瑰丽华尔兹](https://www.luogu.com.cn/problem/P2254) `挑战`：二维分阶段窗口转移
- [ ] [P5665 划分](https://www.luogu.com.cn/problem/P5665) `挑战`：决策阈值与单调候选

#### Part 3.4.2 斜率优化 DP｜主线

重点训练把二次型或分段型转移整理成直线最值，并逐步扩展到动态凸包与复杂事件顺序。

- [ ] [P3195 [HNOI2008] 玩具装箱](https://www.luogu.com.cn/problem/P3195) `衔接`：斜率优化经典入口
- [ ] [P2900 [USACO08MAR] Land Acquisition](https://www.luogu.com.cn/problem/P2900) `主练`：无效状态预处理与凸包
- [ ] [P3628 [APIO2010] 特别行动队](https://www.luogu.com.cn/problem/P3628) `主练`：二次式转移
- [ ] [P4027 [NOI2007] 货币兑换](https://www.luogu.com.cn/problem/P4027) `挑战`：几何化决策与动态凸包
- [ ] [P3648 [APIO2014] 序列分割](https://www.luogu.com.cn/problem/P3648) `挑战`：多阶段凸包优化
- [ ] [P5468 [NOI2019] 回家路线](https://www.luogu.com.cn/problem/P5468) `挑战`：事件顺序与多组凸包

#### Part 3.4.3 决策单调性 / 分治优化 DP｜进阶主线

重点训练最优决策位置的单调结构，并掌握分治优化、决策区间维护与相关代价结构。

- [ ] [P4767 [IOI2000] 邮局](https://www.luogu.com.cn/problem/P4767) `衔接`：区间划分与分治优化
- [ ] [P3515 [POI2011] Lightning Conductor](https://www.luogu.com.cn/problem/P3515) `主练`：决策单调性的直接识别
- [ ] [P1912 [NOI2009] 诗人小G](https://www.luogu.com.cn/problem/P1912) `主练`：决策区间维护
- [ ] [P5504 [JSOI2011] 柠檬](https://www.luogu.com.cn/problem/P5504) `挑战`：分组决策与单调结构
- [ ] [P5574 [CmdOI2019] 任务分配问题](https://www.luogu.com.cn/problem/P5574) `挑战`：分治优化与动态代价维护

#### Part 3.4.4 数据结构优化 DP｜进阶主线

重点训练把 DP 的历史决策集合交给数据结构维护，并覆盖值域、区间、偏序与离线分治等不同形态。

- [ ] [P3287 [SCOI2014] 方伯伯的玉米田](https://www.luogu.com.cn/problem/P3287) `衔接`：值域维护优化转移
- [ ] [P2605 [ZJOI2010] 基站选址](https://www.luogu.com.cn/problem/P2605) `主练`：区间贡献与线段树优化
- [ ] [CF833B The Bakery](https://www.luogu.com.cn/problem/CF833B) `主练`：分段 DP 与区间贡献维护
- [ ] [P4093 [HEOI2016/TJOI2016] 序列](https://www.luogu.com.cn/problem/P4093) `挑战`：CDQ 与偏序 DP
- [ ] [P2487 [SDOI2011] 拦截导弹](https://www.luogu.com.cn/problem/P2487) `挑战`：偏序 DP 与方案统计
- [ ] [P6647 [CCC2019] Tourism](https://www.luogu.com.cn/problem/P6647) `挑战`：复杂转移与结构维护

### Part 3.5 高阶 DP 与综合｜地图保留

#### Part 3.5.1 动态 DP｜地图保留

重点建立动态维护树形 DP 状态的基本框架，并保留强制状态与复杂修改两类代表应用。

- [ ] [P4719 【模板】动态 DP](https://www.luogu.com.cn/problem/P4719) `衔接`：动态树形 DP 标准入口
- [ ] [P5024 [NOIP2018 提高组] 保卫王国](https://www.luogu.com.cn/problem/P5024) `主练`：强制状态询问下的树形 DP
- [ ] [P6021 [USACO17JAN] Promotion Counting P](https://www.luogu.com.cn/problem/P6021) `挑战`：动态状态维护与子树查询

#### Part 3.5.2 插头 DP / 连通性状态压缩｜地图保留

重点建立轮廓连通状态的表示方式，并从模板逐步迁移到带额外局部信息的复杂网格模型。

- [ ] [P5056 【模板】插头 DP](https://www.luogu.com.cn/problem/P5056) `衔接`：哈密顿回路与括号表示
- [ ] [P2289 [HNOI2004] 邮递员](https://www.luogu.com.cn/problem/P2289) `主练`：标准插头模型迁移
- [ ] [P2337 [SCOI2012] 喵星人的入侵](https://www.luogu.com.cn/problem/P2337) `挑战`：连通状态与附加局部信息

#### Part 3.5.3 DP 综合 / 交叉｜进阶主线

只保留真正需要多种技术协同完成、且不适合归入单一 DP 模型的小规模综合题。

- [ ] [P7097 [yLOI2020] 牵丝戏](https://www.luogu.com.cn/problem/P7097) `主练`：背包预处理与极小极大 DP
- [ ] [P6764 粉刷墙壁](https://www.luogu.com.cn/problem/P6764) `挑战`：合法区间预处理与贪心覆盖

---

## Part 4 字符串

### Part 4.1 字符串匹配与前缀结构｜主线

#### Part 4.1.1 字符串哈希｜主线

重点建立字符串映射、子串比较与哈希维护的基本视角，并保留一题结构化应用。

- [ ] [P3370 【模板】字符串哈希](https://www.luogu.com.cn/problem/P3370) `衔接`：字符串哈希标准入口
- [ ] [P5270 无论怎样神树大人都会删库跑路](https://www.luogu.com.cn/problem/P5270) `主练`：滑动维护与字符串结构判断

#### Part 4.1.2 KMP / 前缀函数｜主线

重点训练前缀函数、border、周期、fail 链统计，以及在线匹配中的状态维护。

- [x] [P3375 【模板】KMP 字符串匹配](https://www.luogu.com.cn/problem/P3375) `衔接`：前缀函数与模式匹配模板
- [x] [P4391 [BOI2009] Radio Transmission](https://www.luogu.com.cn/problem/P4391) `主练`：最短周期
- [x] [P3435 [POI2006] Periods of Words](https://www.luogu.com.cn/problem/P3435) `主练`：border 与周期结构
- [x] [P4824 [USACO15FEB] Censoring (Silver)](https://www.luogu.com.cn/problem/P4824) `主练`：在线匹配与删除
- [x] [P2375 [NOI2014] 动物园](https://www.luogu.com.cn/problem/P2375) `主练`：fail 链计数与约束
- [x] [P3426 [POI2005] Template](https://www.luogu.com.cn/problem/P3426) `挑战`：前缀覆盖结构

#### Part 4.1.3 Z 函数 / 扩展 KMP｜地图保留

重点建立 Z / exKMP 的标准实现，并通过 border 统计理解其与前缀结构的联系。

- [ ] [P5410 【模板】扩展 KMP / exKMP（Z 函数）](https://www.luogu.com.cn/problem/P5410) `衔接`：Z / exKMP 模板
- [ ] [CF432D Prefixes and Suffixes](https://www.luogu.com.cn/problem/CF432D) `主练`：border 与出现次数统计

### Part 4.2 Trie 与多模式匹配｜主线

#### Part 4.2.1 Trie｜主线

重点训练前缀树上的插入查询、前缀关系、结构遍历，以及把字符串限制转成树上约束。

- [ ] [P2580 于是他错误的点名开始了](https://www.luogu.com.cn/problem/P2580) `衔接`：插入、查询与访问状态
- [ ] [P2922 [USACO08DEC] Secret Message](https://www.luogu.com.cn/problem/P2922) `主练`：双向前缀关系计数
- [ ] [P3879 [TJOI2010] 阅读理解](https://www.luogu.com.cn/problem/P3879) `主练`：字符串集合索引
- [ ] [P1470 [IOI1996 / USACO2.3] Longest Prefix](https://www.luogu.com.cn/problem/P1470) `主练`：Trie 与前缀可达 DP
- [ ] [P4407 [JSOI2009] 电子字典](https://www.luogu.com.cn/problem/P4407) `主练`：编辑关系与 Trie 查询
- [ ] [P4683 [IOI2008] Type Printer](https://www.luogu.com.cn/problem/P4683) `主练`：Trie 遍历与操作序列
- [ ] [P3065 [USACO12DEC] First!](https://www.luogu.com.cn/problem/P3065) `挑战`：Trie 与字母序约束
- [ ] [P3294 [SCOI2016] 背单词](https://www.luogu.com.cn/problem/P3294) `挑战`：反串 Trie 与顺序优化

#### Part 4.2.2 AC 自动机｜主线

重点训练 fail 指针、fail 树、自动机状态图，以及 AC 自动机与 DP、数据结构的典型结合。

- [x] [P3808 【模板】AC 自动机（简单版）](https://www.luogu.com.cn/problem/P3808) `衔接`：Trie 到 fail 的标准入口
- [x] [P5357 【模板】AC 自动机（二次加强版）](https://www.luogu.com.cn/problem/P5357) `主练`：fail 树上传贡献
- [x] [P3796 【模板】AC 自动机（加强版）](https://www.luogu.com.cn/problem/P3796) `复盘`：不同统计口径下的标准实现
- [ ] [P3121 [USACO15FEB] Censoring (Gold)](https://www.luogu.com.cn/problem/P3121) `主练`：多模式在线删除
- [ ] [P2444 [POI2000] 病毒](https://www.luogu.com.cn/problem/P2444) `主练`：自动机状态图判环
- [ ] [P2292 [HNOI2004] L语言](https://www.luogu.com.cn/problem/P2292) `主练`：AC 自动机优化前缀 DP
- [ ] [P4052 [JSOI2007] 文本生成器](https://www.luogu.com.cn/problem/P4052) `主练`：AC 自动机与计数 DP
- [ ] [P2414 [NOI2011] 阿狸的打字机](https://www.luogu.com.cn/problem/P2414) `挑战`：fail 树、DFS 序与树状数组
- [ ] [P4045 [JSOI2009] 密码](https://www.luogu.com.cn/problem/P4045) `挑战`：自动机与状压计数 DP

### Part 4.3 回文结构｜主线

#### Part 4.3.1 Manacher｜主线

重点训练线性维护回文半径，并将回文信息用于计数与多个回文结构的组合。

- [ ] [P3805 【模板】Manacher](https://www.luogu.com.cn/problem/P3805) `衔接`：线性回文半径模板
- [ ] [P1659 [国家集训队] 拉拉队排练](https://www.luogu.com.cn/problem/P1659) `主练`：回文半径统计
- [ ] [P4555 [国家集训队] 最长双回文串](https://www.luogu.com.cn/problem/P4555) `挑战`：多个回文结构组合

#### Part 4.3.2 回文自动机 PAM｜地图保留

重点建立回文节点、fail 关系与出现次数语义，并保留一题高阶状态迁移。

- [ ] [P5496 【模板】回文自动机（PAM）](https://www.luogu.com.cn/problem/P5496) `衔接`：PAM 模板入口
- [ ] [P3649 [APIO2014] 回文串](https://www.luogu.com.cn/problem/P3649) `主练`：回文节点贡献统计
- [ ] [P4762 [CERC2014] Virus synthesis](https://www.luogu.com.cn/problem/P4762) `挑战`：PAM 与状态转移综合

### Part 4.4 后缀结构｜进阶主线

#### Part 4.4.1 后缀数组 SA｜地图保留

重点建立 SA、rank、height 与 LCP 的基本结构，并保留重复子串、循环串和贡献统计三类代表应用。

- [ ] [P3809 【模板】后缀排序](https://www.luogu.com.cn/problem/P3809) `衔接`：SA / rank / height 模板
- [ ] [P5353 【模板】树上后缀排序](https://www.luogu.com.cn/problem/P5353) `模板`：从字符串后缀扩展到树上后缀排序
- [ ] [P2852 [USACO06DEC] Milk Patterns](https://www.luogu.com.cn/problem/P2852) `主练`：LCP 与重复子串
- [ ] [P4051 [JSOI2007] 字符加密](https://www.luogu.com.cn/problem/P4051) `主练`：循环字符串与后缀排序
- [ ] [P2178 [NOI2015] 品酒大会](https://www.luogu.com.cn/problem/P2178) `挑战`：LCP 分组与贡献统计

#### Part 4.4.2 后缀自动机 SAM｜地图保留

重点建立 SAM 状态、endpos 与子串计数语义，并保留第 k 小与出现次数统计两类核心应用。

- [ ] [P3804 【模板】后缀自动机](https://www.luogu.com.cn/problem/P3804) `衔接`：SAM 状态、endpos 与出现次数
- [ ] [P3975 [TJOI2015] 弦论](https://www.luogu.com.cn/problem/P3975) `主练`：SAM 上第 k 小子串
- [ ] [P4248 [AHOI2013] 差异](https://www.luogu.com.cn/problem/P4248) `主练`：后缀关系与贡献统计
- [ ] [P5341 [TJOI2019] 甲苯先生和大中锋的字符串](https://www.luogu.com.cn/problem/P5341) `挑战`：按出现次数统计子串结构

---

## Part 5 数学

### Part 5.1 整数与基础数论｜主线

#### Part 5.1.1 位运算 / 二进制技巧｜主线

重点训练二进制表示、异或性质与基础按位思维，不把 bitset 优化和高阶综合题混入基础导航。

- [ ] [P5657 [CSP-S2019] 格雷码](https://www.luogu.com.cn/problem/P5657) `衔接`：二进制表示与 Gray Code
- [ ] [P5514 [MtOI2019] 永夜的报应](https://www.luogu.com.cn/problem/P5514) `主练`：XOR 的按位性质

#### Part 5.1.2 素数 / 筛法基础 / 因数分解｜主线

重点训练基础质因数分解、素数筛法及其建模应用，并保留大整数分解模板入口。

- [x] [P1075 [NOIP2012 普及组] 质因数分解](https://www.luogu.com.cn/problem/P1075) `衔接`：基础质因数分解
- [x] [P3383 【模板】线性筛素数](https://www.luogu.com.cn/problem/P3383) `模板`：线性筛标准实现
- [x] [P1621 集合](https://www.luogu.com.cn/problem/P1621) `主练`：筛法与公共质因子建模
- [x] [P4718 【模板】Pollard-Rho 算法](https://www.luogu.com.cn/problem/P4718) `挑战`：大整数质因数分解模板

#### Part 5.1.3 GCD / exGCD / 裴蜀｜主线

重点训练 gcd 结构、约数计数与裴蜀定理，并保留标准与高性能实现入口。

- [x] [P1072 [NOIP2009 提高组] Hankson 的趣味题](https://www.luogu.com.cn/problem/P1072) `主练`：gcd / lcm 条件计数
- [x] [P1414 又是毕业季 II](https://www.luogu.com.cn/problem/P1414) `主练`：约数频次与 gcd 结构
- [x] [P4549 【模板】裴蜀定理](https://www.luogu.com.cn/problem/P4549) `模板`：多元 gcd 与裴蜀
- [x] [P5435 【模板】快速 GCD](https://www.luogu.com.cn/problem/P5435) `模板`：高性能 gcd 实现

#### Part 5.1.4 乘法逆元 / 线性同余｜主线

重点训练模意义除法、线性同余建模与批量逆元，并完整保留各类标准模板入口。

- [x] [P3811 【模板】乘法逆元](https://www.luogu.com.cn/problem/P3811) `模板`：乘法逆元标准实现
- [x] [P1082 [NOIP2012 提高组] 同余方程](https://www.luogu.com.cn/problem/P1082) `衔接`：exGCD 解线性同余
- [x] [P1516 青蛙的约会](https://www.luogu.com.cn/problem/P1516) `主练`：线性同余方程建模
- [x] [P5431 【模板】乘法逆元 2](https://www.luogu.com.cn/problem/P5431) `模板`：批量逆元与前后缀积
- [x] [P2613 【模板】有理数取余](https://www.luogu.com.cn/problem/P2613) `模板`：分式模意义

#### Part 5.1.5 中国剩余定理 CRT｜主线

重点训练同余方程组的合并、一般模数处理与从题意构造同余约束。

- [x] [P4777 【模板】扩展中国剩余定理（EXCRT）](https://www.luogu.com.cn/problem/P4777) `模板`：一般同余方程组合并
- [x] [P3868 [TJOI2009] 猜数字](https://www.luogu.com.cn/problem/P3868) `主练`：CRT 建模
- [x] [P4774 [NOI2018] 屠龙勇士](https://www.luogu.com.cn/problem/P4774) `挑战`：线性同余方程组与 exCRT

#### Part 5.1.6 欧拉函数 / 欧拉定理｜主线

重点训练欧拉函数的计数意义、gcd 计数与大指数降幂，并保留递归降幂的代表应用。

- [x] [P2158 [SDOI2008] 仪仗队](https://www.luogu.com.cn/problem/P2158) `衔接`：欧拉函数的计数意义
- [x] [P2568 GCD](https://www.luogu.com.cn/problem/P2568) `主练`：欧拉函数与 gcd 计数
- [x] [P5091 【模板】扩展欧拉定理](https://www.luogu.com.cn/problem/P5091) `模板`：大指数降幂
- [x] [P4139 上帝与集合的正确用法](https://www.luogu.com.cn/problem/P4139) `挑战`：欧拉降幂递归

#### Part 5.1.7 高次同余 / BSGS / 二次剩余｜进阶主线

重点训练离散对数、二次剩余以及从递推或幂同余关系中抽取可求解结构。

- [x] [P4195 【模板】exBSGS](https://www.luogu.com.cn/problem/P4195) `模板`：离散对数标准入口
- [x] [P5491 【模板】二次剩余](https://www.luogu.com.cn/problem/P5491) `模板`：二次剩余标准入口
- [x] [P2485 [SDOI2011] 计算器](https://www.luogu.com.cn/problem/P2485) `主练`：幂、线性同余与 BSGS 综合
- [x] [P3306 [SDOI2013] 随机数生成器](https://www.luogu.com.cn/problem/P3306) `挑战`：递推式与离散对数

### Part 5.2 数论求和与高阶筛法｜进阶主线

#### Part 5.2.1 整除分块 / 数论求和基础｜主线

重点训练按商值分段处理求和，并把整除分块嵌入 gcd 与算术函数求和模型。

- [x] [P2261 [CQOI2007] 余数求和](https://www.luogu.com.cn/problem/P2261) `衔接`：整除分块标准入口
- [x] [P2398 GCD SUM](https://www.luogu.com.cn/problem/P2398) `主练`：gcd 求和与欧拉函数分组

#### Part 5.2.2 莫比乌斯反演｜进阶主线

重点训练把 gcd 条件转成约数关系，并逐步扩展到二维计数、卷积结构与复杂数论求和。

- [x] [P3172 [CQOI2015] 选数](https://www.luogu.com.cn/problem/P3172) `衔接`：gcd 条件与 Möbius 反演
- [x] [P2522 [HAOI2011] Problem b](https://www.luogu.com.cn/problem/P2522) `主练`：二维 gcd 计数与整除分块
- [x] [P3327 [SDOI2015] 约数个数和](https://www.luogu.com.cn/problem/P3327) `主练`：卷积结构与 Möbius 变换
- [x] [P1829 [国家集训队] Crash 的数字表格 / JZPTAB](https://www.luogu.com.cn/problem/P1829) `挑战`：复杂 gcd / lcm 求和与反演

#### Part 5.2.3 数论函数前缀和 / 高阶筛法｜进阶主线

重点保留高阶筛法的标准模板，并训练数论函数前缀和与整除分块的综合应用。

- [x] [P4213 【模板】杜教筛](https://www.luogu.com.cn/problem/P4213) `模板`：数论函数前缀和标准入口
- [ ] [P5325 【模板】Min_25 筛](https://www.luogu.com.cn/problem/P5325) `模板`：Min_25 筛标准入口
- [x] [P3768 简单的数学题](https://www.luogu.com.cn/problem/P3768) `挑战`：数论函数前缀和与整除分块综合

### Part 5.3 博弈论｜主线

#### Part 5.3.1 经典博弈｜主线

重点训练 Nim、必胜策略构造与几类经典特殊博弈，建立从异或判定到结构分析的基本框架。

- [x] [P2197 【模板】Nim 游戏](https://www.luogu.com.cn/problem/P2197) `模板`：Nim 与异或和
- [x] [P1247 取火柴游戏](https://www.luogu.com.cn/problem/P1247) `主练`：构造一步进入必败态
- [x] [P1288 取数游戏 II](https://www.luogu.com.cn/problem/P1288) `主练`：特殊结构博弈分析
- [x] [P1290 欧几里德的游戏](https://www.luogu.com.cn/problem/P1290) `主练`：Euclid Game
- [ ] [P2252 取石子游戏](https://www.luogu.com.cn/problem/P2252) `挑战`：Wythoff Game

#### Part 5.3.2 Sprague–Grundy｜主线

重点训练 mex、子游戏分解与 SG 异或，并从递推计算逐步进入区间和结构化博弈建模。

- [x] [P2575 高手过招](https://www.luogu.com.cn/problem/P2575) `衔接`：子游戏分解与 SG 异或
- [ ] [P10501 Cutting Game](https://www.luogu.com.cn/problem/P10501) `主练`：mex 与递归 SG
- [x] [P8369 [POI 2000 R1] 条纹](https://www.luogu.com.cn/problem/P8369) `主练`：区间放置模型与 SG 建模

### Part 5.4 概率与期望｜主线

重点训练概率模型、期望线性性、条件概率、贡献法与期望方程；纯概率 DP 继续由 Part 3 负责。

- [ ] [P5104 红包发红包](https://www.luogu.com.cn/problem/P5104) `衔接`：期望基本性质
- [ ] [P1297 [国家集训队] 单选错位](https://www.luogu.com.cn/problem/P1297) `主练`：线性期望
- [ ] [UVA11181 Probability|Given](https://www.luogu.com.cn/problem/UVA11181) `主练`：条件概率
- [ ] [CF280C Game on Tree](https://www.luogu.com.cn/problem/CF280C) `主练`：指示变量与贡献
- [ ] [P2111 考场奇遇](https://www.luogu.com.cn/problem/P2111) `主练`：组合计数求离散概率
- [ ] [P3830 [SHOI2012] 随机树](https://www.luogu.com.cn/problem/P3830) `主练`：随机变量分布与期望
- [ ] [P3750 [六省联考2017] 分手是祝愿](https://www.luogu.com.cn/problem/P3750) `主练`：期望方程与随机过程
- [ ] [P5249 [LnOI2019] 加特林轮盘赌](https://www.luogu.com.cn/problem/P5249) `挑战`：循环概率过程
- [ ] [P4284 [SHOI2014] 概率充电器](https://www.luogu.com.cn/problem/P4284) `挑战`：线性期望与树上概率传播
- [ ] [P4492 [HAOI2018] 苹果树](https://www.luogu.com.cn/problem/P4492) `挑战`：随机结构与组合贡献

### Part 5.5 组合计数｜主线

#### Part 5.5.1 排列组合 / 基础计数｜主线

重点训练组合数、补集、位置选择与 Prüfer 序列，并保留一题局部限制下的直接计数。

- [x] [P2822 [NOIP2016 提高组] 组合数问题](https://www.luogu.com.cn/problem/P2822) `衔接`：组合数预处理与基本性质
- [x] [P3807 【模板】卢卡斯定理](https://www.luogu.com.cn/problem/P3807) `模板`：大组合数模质数
- [x] [P3197 [HNOI2008] 越狱](https://www.luogu.com.cn/problem/P3197) `主练`：补集思想与基础计数
- [ ] [P5520 [yLOI2019] 青原樱](https://www.luogu.com.cn/problem/P5520) `主练`：不相邻选择的组合建模
- [ ] [P2290 [HNOI2004] 树的计数](https://www.luogu.com.cn/problem/P2290) `主练`：Prüfer 序列与给定度数树计数
- [ ] [P4925 Scarlet 的字符串不可能这么可爱](https://www.luogu.com.cn/problem/P4925) `挑战`：局部限制与直接组合计数

#### Part 5.5.2 Catalan / Stirling 等特殊组合数｜进阶主线

重点建立 Catalan 与两类 Stirling 数的基本结构，并保留行列快速求法与树上距离幂的代表应用。

- [ ] [P2532 [AHOI2012] 树屋阶梯](https://www.luogu.com.cn/problem/P2532) `衔接`：Catalan 结构
- [ ] [P1655 小朋友的球](https://www.luogu.com.cn/problem/P1655) `衔接`：第二类 Stirling 数基础递推
- [ ] [P5395 第二类斯特林数·行](https://www.luogu.com.cn/problem/P5395) `主练`：第二类 Stirling 数整行
- [ ] [P5396 第二类斯特林数·列](https://www.luogu.com.cn/problem/P5396) `主练`：第二类 Stirling 数整列
- [ ] [P5408 第一类斯特林数·行](https://www.luogu.com.cn/problem/P5408) `主练`：第一类 Stirling 数整行
- [ ] [P5409 第一类斯特林数·列](https://www.luogu.com.cn/problem/P5409) `主练`：第一类 Stirling 数整列
- [ ] [P4827 [国家集训队] Crash 的文明世界](https://www.luogu.com.cn/problem/P4827) `挑战`：Stirling 展开与树上距离幂

#### Part 5.5.3 容斥原理｜主线

重点训练从“至少 / 恰好 / 禁止”条件之间转换，并逐步扩展到多类限制与生成结构计数。

- [ ] [P3214 [HNOI2011] 卡农](https://www.luogu.com.cn/problem/P3214) `衔接`：组合递推与容斥
- [ ] [P3270 [JLOI2016] 成绩比较](https://www.luogu.com.cn/problem/P3270) `主练`：多限制组合计数
- [ ] [P4491 [HAOI2018] 染色](https://www.luogu.com.cn/problem/P4491) `主练`：恰好条件与容斥转换
- [ ] [P5339 [TJOI2019] 唱、跳、rap和篮球](https://www.luogu.com.cn/problem/P5339) `主练`：多类位置限制容斥
- [ ] [P4336 [SHOI2016] 黑暗前的幻想乡](https://www.luogu.com.cn/problem/P4336) `挑战`：容斥与 Matrix-Tree 综合；交叉：[[XCPC_综合题单#Part 7.4.3 矩阵树定理｜地图保留|7.4.3 Matrix-Tree]]

#### Part 5.5.4 组合恒等式 / 综合计数｜进阶主线

重点训练错排、隔板、Stirling 展开与排列结构计数，处理不能归入单一组合模型的综合题。

- [ ] [P4071 [SDOI2016] 排列计数](https://www.luogu.com.cn/problem/P4071) `衔接`：错排与组合计数
- [ ] [P5505 [JSOI2011] 分特产](https://www.luogu.com.cn/problem/P5505) `主练`：隔板法与容斥
- [ ] [CF1278F Cards](https://www.luogu.com.cn/problem/CF1278F) `主练`：概率矩与 Stirling 展开
- [ ] [CF961G Partitions](https://www.luogu.com.cn/problem/CF961G) `挑战`：Stirling 与组合贡献
- [ ] [P4769 [NOI2018] 冒泡排序](https://www.luogu.com.cn/problem/P4769) `挑战`：排列结构的非平凡计数

#### Part 5.5.5 Burnside / Pólya / 置换群｜地图保留

重点建立群作用下的等价类计数，并从 Pólya 模板扩展到有限对称群与无标号图计数。

- [ ] [P4980 【模板】Pólya 定理](https://www.luogu.com.cn/problem/P4980) `模板`：Pólya 定理标准入口
- [ ] [P2561 [AHOI2002] 黑白瓷砖](https://www.luogu.com.cn/problem/P2561) `主练`：有限对称群下的染色计数
- [ ] [P4727 [HNOI2009] 图的同构记数](https://www.luogu.com.cn/problem/P4727) `挑战`：循环分解与无标号图计数

### Part 5.6 线性代数｜主线

#### Part 5.6.1 矩阵快速幂 / 线性递推｜主线

重点训练把固定线性转移写成矩阵，并从数列递推逐步扩展到有限状态、辅助状态与自动机转移。

- [x] [P3390 【模板】矩阵快速幂](https://www.luogu.com.cn/problem/P3390) `模板`：矩阵乘法与快速幂标准实现
- [x] [P1939 【模板】矩阵加速（数列）](https://www.luogu.com.cn/problem/P1939) `模板`：线性递推矩阵化
- [ ] [P3758 [TJOI2017] 可乐](https://www.luogu.com.cn/problem/P3758) `衔接`：邻接矩阵幂与固定步数状态转移
- [ ] [P2151 [SDOI2009] HH去散步](https://www.luogu.com.cn/problem/P2151) `主练`：固定步数路径计数与邻接矩阵幂；交叉：[[XCPC_综合题单#Part 7.1.5 最短路结构与特殊路径模型｜进阶主线|7.1.5 图上固定步数]]
- [ ] [P3216 [HNOI2011] 数学作业](https://www.luogu.com.cn/problem/P3216) `主练`：分段状态与数位拼接过程矩阵化
- [ ] [P5303 [GXOI/GZOI2019] 逼死强迫症](https://www.luogu.com.cn/problem/P5303) `主练`：补充辅助状态构造闭合递推
- [ ] [P5343 【XR-1】分块](https://www.luogu.com.cn/problem/P5343) `主练`：组合递推与高阶转移矩阵
- [ ] [P1357 花园](https://www.luogu.com.cn/problem/P1357) `挑战`：状压有限状态与矩阵快速幂；交叉：[[XCPC_综合题单#Part 3.3.1 状态压缩 DP｜主线|3.3.1 状压 DP]]
- [x] [P3193 [HNOI2008] GT考试](https://www.luogu.com.cn/problem/P3193) `挑战`：KMP 自动机状态与矩阵转移；交叉：[[XCPC_综合题单#Part 4.1.2 KMP / 前缀函数｜主线|4.1.2 KMP]]

#### Part 5.6.2 高斯消元 / 行列式｜主线

重点训练线性方程组、Gauss-Jordan、行列式与 GF(2) 消元，并保留几何和概率建模中的代表应用。

- [x] [P3389 【模板】高斯消元法](https://www.luogu.com.cn/problem/P3389) `模板`：实数域高斯消元标准实现
- [ ] [P2455 [SDOI2006] 线性方程组](https://www.luogu.com.cn/problem/P2455) `主练`：无解、多解与唯一解分类
- [ ] [P4783 【模板】矩阵求逆](https://www.luogu.com.cn/problem/P4783) `模板`：Gauss-Jordan 求逆
- [ ] [P7112 【模板】行列式求值](https://www.luogu.com.cn/problem/P7112) `模板`：行列式消元
- [x] [P2447 [SDOI2010] 外星千足虫](https://www.luogu.com.cn/problem/P2447) `主练`：GF(2) 方程组与 bitset 高斯；交叉：[[XCPC_综合题单#Part 9.2 Bitset / 字级并行优化｜主线|9.2 Bitset]]
- [x] [P4035 [JSOI2008] 球形空间产生器](https://www.luogu.com.cn/problem/P4035) `主练`：几何条件转线性方程组
- [ ] [P2973 [USACO10HOL] Driving Out the Piggies G](https://www.luogu.com.cn/problem/P2973) `挑战`：概率期望方程组与高斯消元

#### Part 5.6.3 线性基 / 异或空间｜主线

重点训练 GF(2) 向量空间、线性独立与异或最值，并扩展到带权选择、图上环空间和树上路径。

- [x] [P3812 【模板】线性基](https://www.luogu.com.cn/problem/P3812) `模板`：插入、判相关与最大异或
- [ ] [P3857 [TJOI2008] 彩灯](https://www.luogu.com.cn/problem/P3857) `衔接`：异或空间维数与方案数
- [ ] [P4570 [BJWC2011] 元素](https://www.luogu.com.cn/problem/P4570) `主练`：带权线性独立集
- [ ] [P4301 [CQOI2013] 新 Nim 游戏](https://www.luogu.com.cn/problem/P4301) `主练`：贪心与线性基交叉
- [ ] [P4151 [WC2011] 最大 XOR 和路径](https://www.luogu.com.cn/problem/P4151) `主练`：图上环空间与线性基
- [ ] [P3292 [SCOI2016] 幸运数字](https://www.luogu.com.cn/problem/P3292) `挑战`：树上路径线性基；交叉：[[XCPC_综合题单#Part 7.2.5 LCA / 树上差分 / 路径关系｜主线|7.2.5 树上路径]]

### Part 5.7 多项式 / FFT / NTT / FPS｜进阶主线

#### Part 5.7.1 基础卷积｜主线

重点训练快速卷积的标准实现，并从裸多项式乘法扩展到普通卷积与循环相关建模。

- [x] [P3803 【模板】多项式乘法（FFT）](https://www.luogu.com.cn/problem/P3803) `模板`：FFT 多项式乘法标准实现
- [ ] [P4245 【模板】任意模数多项式乘法](https://www.luogu.com.cn/problem/P4245) `模板`：任意模数卷积
- [ ] [P3338 [ZJOI2014] 力](https://www.luogu.com.cn/problem/P3338) `主练`：公式变形与卷积识别
- [ ] [P3723 [AH2017/HNOI2017] 礼物](https://www.luogu.com.cn/problem/P3723) `主练`：循环相关与卷积

#### Part 5.7.2 FPS 核心操作｜模板主线

保留形式幂级数核心操作的完整模板链，作为后续推导与综合题的实现索引。

- [x] [P4238 【模板】多项式乘法逆](https://www.luogu.com.cn/problem/P4238) `模板`：多项式求逆
- [ ] [P4512 【模板】多项式除法](https://www.luogu.com.cn/problem/P4512) `模板`：多项式除法与取模
- [ ] [P4725 【模板】多项式对数函数](https://www.luogu.com.cn/problem/P4725) `模板`：形式幂级数对数
- [ ] [P4726 【模板】多项式指数函数](https://www.luogu.com.cn/problem/P4726) `模板`：形式幂级数指数
- [ ] [P5205 【模板】多项式开根](https://www.luogu.com.cn/problem/P5205) `模板`：形式幂级数平方根
- [ ] [P5245 【模板】多项式快速幂](https://www.luogu.com.cn/problem/P5245) `模板`：形式幂级数快速幂
- [ ] [P5273 【模板】多项式幂函数（加强版）](https://www.luogu.com.cn/problem/P5273) `模板`：一般形式幂级数幂函数

#### Part 5.7.3 插值 / 多点求值｜主线

重点训练从点值恢复多项式、批量求值与快速插值，并保留一题幂和多项式的实际建模应用。

- [x] [P4781 【模板】拉格朗日插值](https://www.luogu.com.cn/problem/P4781) `模板`：拉格朗日插值标准实现
- [ ] [P5050 【模板】多项式多点求值](https://www.luogu.com.cn/problem/P5050) `模板`：多点求值
- [ ] [P5158 【模板】多项式快速插值](https://www.luogu.com.cn/problem/P5158) `模板`：快速插值
- [ ] [P5437 【XR-2】约定](https://www.luogu.com.cn/problem/P5437) `主练`：幂和多项式与拉格朗日插值

#### Part 5.7.4 高级变换与模板｜地图保留

保留高级卷积、分治 FFT 与若干特殊多项式变换模板，作为未来专项学习和实现查询入口。

- [x] [P4717 【模板】快速莫比乌斯 / 沃尔什变换（FMT/FWT）](https://www.luogu.com.cn/problem/P4717) `模板`：FWT / FMT 标准实现
- [ ] [P4721 【模板】分治 FFT](https://www.luogu.com.cn/problem/P4721) `模板`：分治卷积递推
- [ ] [P5282 【模板】快速阶乘算法](https://www.luogu.com.cn/problem/P5282) `模板`：快速阶乘
- [ ] [P5373 【模板】多项式复合函数](https://www.luogu.com.cn/problem/P5373) `模板`：多项式复合
- [ ] [P5394 【模板】下降幂多项式乘法](https://www.luogu.com.cn/problem/P5394) `模板`：下降幂基底下的多项式乘法

#### Part 5.7.5 多项式综合应用｜挑战

保留能够体现多种多项式工具协同工作的代表题，不再把所有高阶综合题堆入主导航。

- [ ] [P5293 [HNOI2019] 白兔之舞](https://www.luogu.com.cn/problem/P5293) `挑战`：单位根反演、CZT 与矩阵转移综合
- [ ] [P5577 [CmdOI2019] 算力训练](https://www.luogu.com.cn/problem/P5577) `挑战`：高维有限群变换与卷积

### Part 5.8 其他数学工具｜地图保留

#### Part 5.8.1 线性规划｜地图保留

仅保留一个真正以线性规划为核心的竞赛入口；可自然转化为费用流的题目主归图论。

- [ ] [P4232 无意识之外的捉迷藏](https://www.luogu.com.cn/problem/P4232) `地图`：博弈最优混合策略与线性规划

#### Part 5.8.2 自适应 Simpson｜地图保留

保留两道数值积分模板与一题实际应用，用于快速恢复自适应 Simpson 的实现和使用边界。

- [ ] [P4525 【模板】自适应辛普森法 1](https://www.luogu.com.cn/problem/P4525) `模板`：自适应 Simpson 标准实现
- [ ] [P4526 【模板】自适应辛普森法 2](https://www.luogu.com.cn/problem/P4526) `模板`：无穷区间 / 特殊函数积分模板
- [ ] [P3779 [SDOI2017] 龙与地下城](https://www.luogu.com.cn/problem/P3779) `挑战`：概率模型与数值积分综合

---

## Part 6 数据结构

### Part 6.1 基础维护结构｜主线

#### Part 6.1.1 单调栈 / 单调队列｜主线

重点训练单调结构维护最近关系、窗口最值与二维矩形，并保留一题复杂条件向最大矩形模型的转化。

- [x] [P5788 【模板】单调栈](https://www.luogu.com.cn/problem/P5788) `模板`：单调栈标准实现
- [x] [P1886 滑动窗口 / 【模板】单调队列](https://www.luogu.com.cn/problem/P1886) `模板`：单调队列标准实现
- [x] [P1823 [COI2007] Patrik 音乐会的等待](https://www.luogu.com.cn/problem/P1823) `主练`：相等元素与可见关系
- [ ] [P4147 玉蟾宫](https://www.luogu.com.cn/problem/P4147) `主练`：二维最大矩形
- [x] [P1950 长方形](https://www.luogu.com.cn/problem/P1950) `主练`：二维矩形计数
- [x] [P2216 [HAOI2007] 理想的正方形](https://www.luogu.com.cn/problem/P2216) `主练`：二维滑动窗口最值
- [ ] [AT_arc081_d [ARC081F] Flip and Rectangles](https://www.luogu.com.cn/problem/AT_arc081_d) `挑战`：条件转化与最大矩形

#### Part 6.1.2 并查集｜主线

重点训练集合合并、关系维护与离线连通，并扩展到带权、扩展域、逆序操作和几何连通。

- [x] [P3367 【模板】并查集](https://www.luogu.com.cn/problem/P3367) `模板`：并查集标准实现
- [x] [P1525 [NOIP2010 提高组] 关押罪犯](https://www.luogu.com.cn/problem/P1525) `主练`：扩展域 / 种类并查集
- [x] [P2024 [NOI2001] 食物链](https://www.luogu.com.cn/problem/P2024) `主练`：循环关系与带权并查集
- [x] [P1196 [NOI2002] 银河英雄传说](https://www.luogu.com.cn/problem/P1196) `主练`：距离型带权并查集
- [x] [P4185 [USACO18JAN] MooTube G](https://www.luogu.com.cn/problem/P4185) `主练`：排序询问与离线并查集
- [x] [P1197 [JSOI2008] 星球大战](https://www.luogu.com.cn/problem/P1197) `主练`：逆序加点处理删除连通性
- [x] [P1783 海滩防御](https://www.luogu.com.cn/problem/P1783) `挑战`：二分答案、几何连通与并查集

#### Part 6.1.3 堆 / 优先队列｜主线

重点训练动态最值、多路候选与可撤销贪心，并保留 Huffman、动态邻接和区间候选拆分等代表模型。

- [x] [P3378 【模板】堆](https://www.luogu.com.cn/problem/P3378) `模板`：堆 / 优先队列标准实现
- [x] [P1168 中位数](https://www.luogu.com.cn/problem/P1168) `衔接`：双堆维护动态中位数
- [x] [P1631 序列合并](https://www.luogu.com.cn/problem/P1631) `主练`：多路候选最小值
- [x] [P2168 [NOI2015] 荷马史诗](https://www.luogu.com.cn/problem/P2168) `主练`：k 叉 Huffman
- [ ] [P4053 [JSOI2007] 建筑抢修](https://www.luogu.com.cn/problem/P4053) `主练`：贪心与堆维护可撤销选择
- [ ] [P1878 舞蹈课](https://www.luogu.com.cn/problem/P1878) `主练`：动态邻接候选维护
- [ ] [P2048 [NOI2010] 超级钢琴](https://www.luogu.com.cn/problem/P2048) `挑战`：堆、RMQ 与区间候选拆分

#### Part 6.1.4 ST 表 / RMQ｜主线

静态 RMQ 本身只保留标准模板与一题真正需要 RMQ 参与分类判断的综合应用。

- [x] [P3865 【模板】ST 表](https://www.luogu.com.cn/problem/P3865) `模板`：静态 RMQ 标准实现
- [x] [P2471 [SCOI2007] 降雨量](https://www.luogu.com.cn/problem/P2471) `主练`：RMQ、二分查找与分类判断

#### Part 6.1.5 树状数组｜主线

重点训练前缀统计、值域计数、离线扫描与 DFS 序，并扩展到二维维护和计数与权值和联合查询。

- [x] [P3374 【模板】树状数组 1](https://www.luogu.com.cn/problem/P3374) `模板`：单点修改与区间查询
- [x] [P3368 【模板】树状数组 2](https://www.luogu.com.cn/problem/P3368) `模板`：区间修改与单点查询
- [x] [P1908 逆序对](https://www.luogu.com.cn/problem/P1908) `衔接`：权值统计与逆序对
- [x] [P2345 [USACO04OPEN] MooFest G](https://www.luogu.com.cn/problem/P2345) `主练`：排序后的带权贡献统计
- [x] [P3605 [USACO17JAN] Promotion Counting P](https://www.luogu.com.cn/problem/P3605) `主练`：DFS 序与子树统计
- [x] [P1972 [SDOI2009] HH的项链](https://www.luogu.com.cn/problem/P1972) `主练`：离线扫描与 last occurrence
- [x] [P4054 [JSOI2009] 计数问题](https://www.luogu.com.cn/problem/P4054) `主练`：二维与多类别树状数组
- [ ] [P3586 [POI2015] LOG-Logistics](https://www.luogu.com.cn/problem/P3586) `挑战`：值域计数与权值和联合维护

### Part 6.2 线段树家族｜主线

#### Part 6.2.1 线段树｜主线

重点训练节点信息设计、懒标记作用与复杂区间信息合并，不再为每一种基础 lazy tag 单独保留同型题。

- [x] [P3372 【模板】线段树 1](https://www.luogu.com.cn/problem/P3372) `模板`：区间加与区间和
- [x] [P3373 【模板】线段树 2](https://www.luogu.com.cn/problem/P3373) `模板`：多懒标记组合
- [x] [P4588 [TJOI2018] 数学计算](https://www.luogu.com.cn/problem/P4588) `衔接`：维护非加法型可合并信息
- [x] [P1438 无聊的数列](https://www.luogu.com.cn/problem/P1438) `主练`：差分变换后维护区间信息
- [x] [P1253 扶苏的问题](https://www.luogu.com.cn/problem/P1253) `主练`：赋值与加法等多类懒标记
- [x] [P1471 方差](https://www.luogu.com.cn/problem/P1471) `主练`：联合维护多种相关统计量
- [x] [P6492 [COCI 2010/2011 #6] STEP](https://www.luogu.com.cn/problem/P6492) `主练`：连续段信息设计与合并
- [x] [P4513 小白逛公园](https://www.luogu.com.cn/problem/P4513) `主练`：前缀、后缀与区间最优信息合并
- [x] [P2824 [HEOI2016/TJOI2016] 排序](https://www.luogu.com.cn/problem/P2824) `挑战`：参数判定与 01 区间维护

#### Part 6.2.2 扫描线与线段树｜主线

重点训练几何事件离散化后的区间覆盖维护，并覆盖面积并、周长与加权窗口三类典型模型。

- [x] [P5490 【模板】扫描线 / 矩形面积并](https://www.luogu.com.cn/problem/P5490) `模板`：扫描线与区间覆盖标准入口
- [ ] [P1856 [IOI 1998 / USACO5.5] Picture](https://www.luogu.com.cn/problem/P1856) `主练`：矩形并周长
- [x] [P1502 窗口的星星](https://www.luogu.com.cn/problem/P1502) `挑战`：扫描线与区间最值综合

#### Part 6.2.3 高级线段树 / 特殊区间信息｜进阶主线

重点训练非标准区间修改、稳定性剪枝与特殊节点信息设计，关注“为什么能剪”和“信息怎样闭合”。

- [x] [P4145 上帝造题的七分钟 2](https://www.luogu.com.cn/problem/P4145) `衔接`：稳定性判断与势能剪枝入口
- [ ] [CF438D The Child and Sequence](https://www.luogu.com.cn/problem/CF438D) `主练`：非线性区间修改与剪枝
- [ ] [P4198 楼房重建](https://www.luogu.com.cn/problem/P4198) `主练`：非标准节点信息与区间合并
- [ ] [P5278 算术天才⑨与等差数列](https://www.luogu.com.cn/problem/P5278) `主练`：维护复杂区间性质判定
- [ ] [P6327 区间加区间 sin 和](https://www.luogu.com.cn/problem/P6327) `主练`：相关统计量联合维护
- [x] [P2572 [SCOI2010] 序列操作](https://www.luogu.com.cn/problem/P2572) `挑战`：复杂懒标记与连续段信息
- [ ] [P2221 [HAOI2012] 高速公路](https://www.luogu.com.cn/problem/P2221) `挑战`：位置加权的区间贡献维护

#### Part 6.2.4 李超线段树 / 直线维护｜进阶主线

重点训练直线集合上的最值查询，并从在线插线扩展到带时间维的动态加入与删除。

- [ ] [P4097 [HEOI2013] Segment](https://www.luogu.com.cn/problem/P4097) `主练`：李超线段树标准入口
- [ ] [CF678F Lena and Queries](https://www.luogu.com.cn/problem/CF678F) `挑战`：动态加入、删除直线与在线询问

#### Part 6.2.5 线段树分裂 / 合并｜进阶主线

重点训练动态权值结构的 split / merge，并通过树上统计理解线段树合并的实际应用。

- [ ] [P5494 【模板】线段树分裂](https://www.luogu.com.cn/problem/P5494) `模板`：线段树分裂与合并标准入口
- [ ] [P4556 [Vani有约会] 雨天的尾巴 /【模板】线段树合并](https://www.luogu.com.cn/problem/P4556) `主练`：线段树合并与树上统计

### Part 6.3 根号与离线算法｜进阶主线

#### Part 6.3.1 分块 / 根号算法｜进阶主线

重点训练序列分块、参数根号分治、块内跳转与不可合并信息维护，并保留动态顺序统计作为高阶出口。

- [ ] [P2801 教主的魔法](https://www.luogu.com.cn/problem/P2801) `衔接`：散块暴力、整块排序与 lazy 的标准序列分块
- [ ] [P3396 哈希冲突](https://www.luogu.com.cn/problem/P3396) `主练`：小参数预处理、大参数暴力的根号分治
- [ ] [P3203 [HNOI2010] 弹飞绵羊](https://www.luogu.com.cn/problem/P3203) `主练`：块内跳转预处理与局部重构
- [ ] [P4168 [Violet] 蒲公英](https://www.luogu.com.cn/problem/P4168) `主练`：不可合并区间信息的预处理分块
- [ ] [P1975 [国家集训队] 排队](https://www.luogu.com.cn/problem/P1975) `挑战`：动态逆序对与块内顺序统计

#### Part 6.3.2 莫队｜进阶主线

按普通、带修改、回滚、树上与二次离线逐步扩展，保留能体现不同状态维护边界的代表题。

- [x] [P1494 [国家集训队] 小Z的袜子](https://www.luogu.com.cn/problem/P1494) `衔接`：普通莫队标准入口
- [ ] [CF617E XOR and Favorite Number](https://www.luogu.com.cn/problem/CF617E) `主练`：前缀异或与莫队结合
- [ ] [P1903 [国家集训队] 数颜色 / 维护队列](https://www.luogu.com.cn/problem/P1903) `主练`：带修改莫队
- [ ] [P5906 【模板】回滚莫队 & 不删除莫队](https://www.luogu.com.cn/problem/P5906) `主练`：删除困难信息的 rollback 维护
- [ ] [SP10707 COT2 - Count on a tree II](https://www.luogu.com.cn/problem/SP10707) `主练`：树上莫队入口
- [ ] [P4887 【模板】莫队二次离线](https://www.luogu.com.cn/problem/P4887) `挑战`：二次离线莫队

#### Part 6.3.3 CDQ 分治｜进阶主线

重点训练偏序计数、时间维事件与 CDQ 优化 DP，并以高维偏序作为技术上限入口。

- [ ] [P3810 【模板】三维偏序（陌上花开）](https://www.luogu.com.cn/problem/P3810) `模板`：CDQ 与树状数组标准入口
- [ ] [P3157 [CQOI2011] 动态逆序对](https://www.luogu.com.cn/problem/P3157) `主练`：时间维与逆序对统计
- [ ] [P4390 [BOI2007] Mokia 摩基亚](https://www.luogu.com.cn/problem/P4390) `主练`：修改与查询转事件后的二维统计
- [ ] [P4093 [HEOI2016/TJOI2016] 序列](https://www.luogu.com.cn/problem/P4093) `主练`：CDQ 优化 DP
- [ ] [P3769 [CH弱省胡策R2] TATT](https://www.luogu.com.cn/problem/P3769) `挑战`：高维偏序与嵌套 CDQ

#### Part 6.3.4 整体二分 / 并行二分｜进阶主线

重点训练共享答案值域下的批量判定，并扩展到区间修改和复杂权值判定。

- [ ] [P1527 [国家集训队] 矩阵乘法](https://www.luogu.com.cn/problem/P1527) `衔接`：整体二分标准代表
- [ ] [P3527 [POI2011] MET-Meteors](https://www.luogu.com.cn/problem/P3527) `主练`：整体二分与区间修改结合
- [ ] [P4602 [CTSC2018] 混合果汁](https://www.luogu.com.cn/problem/P4602) `挑战`：整体二分与权值结构联合判定

#### Part 6.3.5 时间线段树 / 可撤销数据结构｜进阶主线

重点训练将边或操作挂到有效时间区间，并用 rollback 数据结构维护递归过程中的动态状态。

- [ ] [P5787 二分图 /【模板】线段树分治](https://www.luogu.com.cn/problem/P5787) `衔接`：时间线段树与可撤销并查集入口；交叉：[[XCPC_综合题单#Part 7.6.4 离线动态连通性｜进阶主线|7.6.4 动态连通]]
- [ ] [CF576E Painting Edges](https://www.luogu.com.cn/problem/CF576E) `挑战`：动态二分图判定与 rollback DSU；交叉：[[XCPC_综合题单#Part 7.6.4 离线动态连通性｜进阶主线|7.6.4 动态连通]]

### Part 6.4 可合并与可持久化结构｜进阶主线

#### Part 6.4.1 可并堆 / 左偏树｜地图保留

重点训练可并堆的 merge / pop，并通过树上合并、懒标记与中位数结构理解它在复杂模型中的使用方式。

- [ ] [P3377 【模板】左偏树 / 可并堆](https://www.luogu.com.cn/problem/P3377) `模板`：可并堆标准实现
- [ ] [P1552 [APIO2012] 派遣](https://www.luogu.com.cn/problem/P1552) `主练`：树上自底向上合并与贪心删除
- [ ] [P3261 [JLOI2015] 城池攻占](https://www.luogu.com.cn/problem/P3261) `主练`：可并堆与整体乘加懒标记
- [ ] [P4331 [BOI2004] Sequence](https://www.luogu.com.cn/problem/P4331) `挑战`：可并堆维护中位数与单调回归

#### Part 6.4.2 主席树 / 区间顺序统计｜进阶主线

重点训练历史版本上的值域统计，并从静态区间第 k 小扩展到树路径、时间版本、动态顺序统计与复杂值域判定。

- [ ] [P3834 【模板】可持久化线段树 2](https://www.luogu.com.cn/problem/P3834) `模板`：静态区间第 k 小
- [ ] [P4587 [FJOI2016] 神秘数](https://www.luogu.com.cn/problem/P4587) `主练`：主席树维护值域权值和
- [ ] [P2633 Count on a tree](https://www.luogu.com.cn/problem/P2633) `主练`：树上路径版本的可持久化权值结构
- [ ] [P3168 [CQOI2015] 任务查询系统](https://www.luogu.com.cn/problem/P3168) `主练`：时间轴版本与任务增删事件
- [ ] [P2617 Dynamic Rankings](https://www.luogu.com.cn/problem/P2617) `主练`：动态区间顺序统计
- [ ] [P3293 [SCOI2016] 美味](https://www.luogu.com.cn/problem/P3293) `挑战`：值域存在性与异或贪心
- [ ] [P2839 [国家集训队] middle](https://www.luogu.com.cn/problem/P2839) `挑战`：按答案权值建版本与复杂节点信息

#### Part 6.4.3 其他可持久化结构｜进阶主线

保留不同基础结构的持久化模板，作为“版本化数据结构”这一通用技术的实现索引。

- [ ] [P3919 【模板】可持久化数组（可持久化线段树 / 平衡树）](https://www.luogu.com.cn/problem/P3919) `模板`：可持久化数组
- [ ] [P3402 【模板】可持久化并查集](https://www.luogu.com.cn/problem/P3402) `模板`：可持久化并查集
- [ ] [P3835 【模板】可持久化平衡树](https://www.luogu.com.cn/problem/P3835) `模板`：可持久化有序集合
- [ ] [P5055 【模板】可持久化文艺平衡树](https://www.luogu.com.cn/problem/P5055) `模板`：可持久化动态序列

### Part 6.5 平衡树与动态序列｜进阶主线

#### Part 6.5.1 平衡树 / 有序集合｜进阶主线

重点训练按权值维护有序集合、顺序统计与前驱后继，并扩展到全局偏移和多集合信息联动。

- [ ] [P3369 【模板】普通平衡树](https://www.luogu.com.cn/problem/P3369) `模板`：排名、前驱后继与插入删除
- [ ] [P6136 【模板】普通平衡树（数据加强版）](https://www.luogu.com.cn/problem/P6136) `主练`：强制在线下的完整顺序统计
- [ ] [P2286 [HNOI2004] 宠物收养场](https://www.luogu.com.cn/problem/P2286) `主练`：前驱后继与最近匹配
- [ ] [P1486 [NOI2004] 郁闷的出纳员](https://www.luogu.com.cn/problem/P1486) `主练`：全局偏移与顺序统计
- [ ] [P1110 [ZJOI2007] 报表统计](https://www.luogu.com.cn/problem/P1110) `挑战`：动态维护相邻差值与全局有序差值

#### Part 6.5.2 动态序列 / 可分裂平衡树｜进阶主线

重点训练按位置 split / merge、动态插删与区间懒标记，并扩展到大型隐式序列上的稀疏动态操作。

- [ ] [P3391 【模板】文艺平衡树](https://www.luogu.com.cn/problem/P3391) `模板`：按排名 split / merge 与区间翻转
- [ ] [P4008 [NOI2003] 文本编辑器](https://www.luogu.com.cn/problem/P4008) `主练`：批量插入、删除与位置维护
- [ ] [P2042 [NOI2005] 维护数列](https://www.luogu.com.cn/problem/P2042) `挑战`：动态插删、翻转、赋值与复杂区间信息
- [ ] [P3960 [NOIP2017 提高组] 列队](https://www.luogu.com.cn/problem/P3960) `挑战`：巨大隐式序列中的删除与末尾追加

### Part 6.6 树上数据结构｜进阶主线

#### Part 6.6.1 树链剖分 / 树上路径数据结构｜主线

重点训练路径拆分后的区间维护，并保留真正增加路径方向、重链变化或特殊状态设计的代表题。

- [x] [P3384 【模板】树链剖分](https://www.luogu.com.cn/problem/P3384) `模板`：树链剖分与路径 / 子树维护
- [ ] [P3178 [HAOI2015] 树上操作](https://www.luogu.com.cn/problem/P3178) `衔接`：路径与子树修改查询结合
- [ ] [P1505 [国家集训队] 旅游](https://www.luogu.com.cn/problem/P1505) `主练`：边权转点权、路径取反与多信息维护
- [ ] [P2486 [SDOI2011] 染色](https://www.luogu.com.cn/problem/P2486) `主练`：有方向的路径信息与颜色段合并
- [ ] [P5305 [GXOI/GZOI2019] 旧词](https://www.luogu.com.cn/problem/P5305) `主练`：根路径加权贡献与复杂区间信息
- [ ] [P4116 Qtree3](https://www.luogu.com.cn/problem/P4116) `主练`：动态标记下查询根路径首个合法点
- [ ] [P5773 [JSOI2016] 轻重路径](https://www.luogu.com.cn/problem/P5773) `挑战`：动态维护重链结构本身
- [ ] [CF1017G The Tree](https://www.luogu.com.cn/problem/CF1017G) `挑战`：复杂路径 / 子树状态与特殊线段树

#### Part 6.6.2 Small-to-Large / 集合启发式合并｜进阶主线

重点训练集合对象本身的小并大，并通过树上分层集合维护理解其与 DSU on Tree 的区别。

- [ ] [P3201 [HNOI2009] 梦幻布丁](https://www.luogu.com.cn/problem/P3201) `衔接`：通用 Small-to-Large
- [ ] [CF246E Blood Cousins Return](https://www.luogu.com.cn/problem/CF246E) `挑战`：按深度维护集合与 set / map 合并

#### Part 6.6.3 树上启发式合并 / DSU on Tree｜进阶主线

重点训练保留重儿子贡献的子树统计框架，并扩展到深度分层、频率分布与异或状态。

- [ ] [CF600E Lomsat gelral](https://www.luogu.com.cn/problem/CF600E) `模板`：DSU on Tree 标准入口
- [ ] [CF570D Tree Requests](https://www.luogu.com.cn/problem/CF570D) `主练`：深度分层与 parity 状态维护
- [ ] [CF375D Tree and Queries](https://www.luogu.com.cn/problem/CF375D) `主练`：颜色频率及频率分布
- [ ] [CF741D Arpa’s letter-marked tree and Mehrdad’s Dokhtar-kosh paths](https://www.luogu.com.cn/problem/CF741D) `挑战`：异或状态与跨子树路径
- [ ] [P9886 [ICPC 2018 Qingdao R] Kawa Exam](https://www.luogu.com.cn/problem/P9886) `挑战`：缩点建树与子树 / 补集信息维护

#### Part 6.6.4 动态树 / Link-Cut Tree｜地图保留

重点训练动态森林上的 link / cut 与路径信息，并保留虚子树和 preferred path 语义两类深化应用。

- [ ] [P3690 【模板】动态树（Link-Cut Tree）](https://www.luogu.com.cn/problem/P3690) `模板`：LCT 标准实现
- [ ] [P1501 [国家集训队] Tree II](https://www.luogu.com.cn/problem/P1501) `主练`：动态换边与路径乘加 / 求和
- [ ] [P2387 [NOI2014] 魔法森林](https://www.luogu.com.cn/problem/P2387) `主练`：动态图加边、判环与路径最大边替换
- [ ] [P4219 [BJOI2014] 大融合](https://www.luogu.com.cn/problem/P4219) `主练`：LCT 虚子树信息维护
- [ ] [P3703 [SDOI2017] 树点涂色](https://www.luogu.com.cn/problem/P3703) `挑战`：利用 access / preferred path 语义建模

### Part 6.7 高维与专用数据结构｜地图保留

#### Part 6.7.1 树套树｜地图保留

只保留真正体现多层数据结构嵌套价值的代表题，避免把所有动态顺序统计都重复挂入本节。

- [ ] [P3380 【模板】二逼平衡树（树套树）](https://www.luogu.com.cn/problem/P3380) `模板`：区间排名、第 k 小、前驱后继与单点修改
- [ ] [CF19D Points](https://www.luogu.com.cn/problem/CF19D) `主练`：动态二维点集与二维后继查询
- [ ] [P3332 [ZJOI2013] K 大数查询](https://www.luogu.com.cn/problem/P3332) `主练`：二维限制下的树套树与值域查询
- [ ] [P3242 [HNOI2015] 接水果](https://www.luogu.com.cn/problem/P3242) `挑战`：树路径关系转二维区域后的高阶顺序统计

#### Part 6.7.2 01-Trie / XOR 维护｜进阶主线

重点训练按位贪心、持久化版本与树上路径差分，并扩展到前若干大异或候选的整体维护。

- [ ] [P4551 最长异或路径](https://www.luogu.com.cn/problem/P4551) `衔接`：树上前缀异或与基础 01-Trie
- [ ] [P6824 「EZEC-4」可乐](https://www.luogu.com.cn/problem/P6824) `主练`：按位限制与 Trie 子树贡献
- [ ] [P4735 最大异或和](https://www.luogu.com.cn/problem/P4735) `主练`：可持久化 01-Trie 标准应用
- [ ] [P4592 [TJOI2018] 异或](https://www.luogu.com.cn/problem/P4592) `主练`：树上子树 / 路径的持久化 Trie
- [ ] [P5283 [十二省联考 2019] 异或粽子](https://www.luogu.com.cn/problem/P5283) `挑战`：区间异或候选与前若干大维护
- [ ] [CF241B Friends](https://www.luogu.com.cn/problem/CF241B) `挑战`：异或点对的前若干大统计

#### Part 6.7.3 特殊整数数据结构｜地图保留

仅作为知识地图锚点，保留 word-RAM 模型下亚对数整数集合结构的标准入口。

- [ ] [P6105 [Ynoi2010] y-fast trie](https://www.luogu.com.cn/problem/P6105) `地图`：整数前驱后继的亚对数结构
- [ ] [P6018 [Ynoi2010] Fusion tree](https://www.luogu.com.cn/problem/P6018) `地图`：融合树与 word-RAM 整数集合操作

#### Part 6.7.4 K-D Tree｜地图保留

重点训练二维点集的包围盒剪枝，从矩形统计扩展到最近、最远与半平面查询。

- [ ] [P4148 简单题](https://www.luogu.com.cn/problem/P4148) `衔接`：动态二维点与矩形权值和
- [ ] [P4169 [Violet] 天使玩偶 / SJY 摆棋子](https://www.luogu.com.cn/problem/P4169) `主练`：动态插入与最近曼哈顿距离
- [ ] [P2093 [国家集训队] JZPFAR](https://www.luogu.com.cn/problem/P2093) `主练`：第 k 远点与包围盒距离剪枝
- [ ] [P4475 巧克力王国](https://www.luogu.com.cn/problem/P4475) `挑战`：半平面查询与包围盒整体判定

#### Part 6.7.5 珂朵莉树 ODT｜地图保留

只保留一个能够完整体现 split、区间推平与随机数据假设的 ODT 锚点。

- [ ] [P5350 序列](https://www.luogu.com.cn/problem/P5350) `地图`：ODT 的 split、区间赋值与复杂段操作

## Part 7 图论与树论

### Part 7.1 图遍历与最短路｜主线

#### Part 7.1.1 图的存储与遍历｜主线

保留图论最低入口，训练邻接表、DFS / BFS 与反图上的可达信息传播。

- [ ] [P5318 【深基18.例3】查找文献](https://www.luogu.com.cn/problem/P5318) `衔接`：邻接表组织与 DFS / BFS 遍历顺序
- [ ] [P3916 图的遍历](https://www.luogu.com.cn/problem/P3916) `主练`：反图遍历与可达信息传播

#### Part 7.1.2 最短路｜主线

按模板性质、状态建图与复杂路径约束展开，保留真正增加最短路状态或结构变量的代表题。

- [x] [P4779 【模板】单源最短路径（标准版）](https://www.luogu.com.cn/problem/P4779) `模板`：堆优化 Dijkstra
- [x] [P1144 最短路计数](https://www.luogu.com.cn/problem/P1144) `主练`：在最短距离之外维护方案数量
- [x] [P3385 【模板】负环](https://www.luogu.com.cn/problem/P3385) `模板`：负权边与负环判定
- [x] [P1119 灾后重建](https://www.luogu.com.cn/problem/P1119) `主练`：Floyd 的阶段含义与动态开放点
- [x] [P5905 【模板】Johnson 全源最短路](https://www.luogu.com.cn/problem/P5905) `模板`：稀疏图全源最短路与负权边
- [x] [P4568 [JLOI2011] 飞行路线](https://www.luogu.com.cn/problem/P4568) `主练`：有限资源进入分层图状态
- [x] [P1073 [NOIP2009] 最优贸易](https://www.luogu.com.cn/problem/P1073) `主练`：状态拆分与图上最优值传播
- [x] [P2865 [USACO06NOV] Roadblocks G](https://www.luogu.com.cn/problem/P2865) `主练`：严格次短路
- [x] [P5304 旅行者](https://www.luogu.com.cn/problem/P5304) `主练`：点集之间的多源最短路
- [x] [P1462 通往奥格瑞玛的道路](https://www.luogu.com.cn/problem/P1462) `主练`：二分答案与最短路判定
- [ ] [CF827F Dirty Arkady's Kitchen](https://www.luogu.com.cn/problem/CF827F) `挑战`：时间窗口限制下的最短路
- [x] [P6833 雷雨](https://www.luogu.com.cn/problem/P6833) `挑战`：多端点路径并的最短路建模
- [x] [P2047 [NOI2007] 社交网络](https://www.luogu.com.cn/problem/P2047) `挑战`：Floyd 与最短路贡献统计

#### Part 7.1.3 0-1 BFS｜主线

边权只有 0/1 时用双端队列维护最短路，并扩展到网格建图、代价重定义和二分判定。

- [ ] [P4554 小明的游戏](https://www.luogu.com.cn/problem/P4554) `衔接`：0-1 BFS 标准入口
- [ ] [P4667 [BalticOI 2011 Day1] Switch the Lamp On](https://www.luogu.com.cn/problem/P4667) `主练`：网格转图与 0/1 边权建模
- [ ] [CF1063B Labyrinth](https://www.luogu.com.cn/problem/CF1063B) `主练`：重新定义左右移动代价
- [ ] [P1948 [USACO08JAN] Telephone Lines S](https://www.luogu.com.cn/problem/P1948) `挑战`：二分答案与 0-1 BFS 交叉

#### Part 7.1.4 同余最短路｜主线

把整数状态按模数压成有限余数类，在余数图上求最小可达值，再统计原问题中的可达整数。

- [x] [P3403 跳楼机](https://www.luogu.com.cn/problem/P3403) `衔接`：同余最短路经典入口
- [x] [P2371 墨墨的等式](https://www.luogu.com.cn/problem/P2371) `主练`：同余类建图与区间可达数统计

#### Part 7.1.5 最短路结构与特殊路径模型｜进阶主线

收纳仍以最短路结构或优化建图为核心、但不适合继续放入普通模板链的特殊模型。

- [x] [P6175 无向图的最小环问题](https://www.luogu.com.cn/problem/P6175) `主练`：无向图最小环
- [x] [P2149 [SDOI2009] Elaxia 的路线](https://www.luogu.com.cn/problem/P2149) `主练`：两组最短路结构的公共部分
- [x] [P5837 [USACO19DEC] Milk Pumping G](https://www.luogu.com.cn/problem/P5837) `主练`：瓶颈收益与路径代价共同出现
- [x] [P3489 [POI2009] WIE-Hexer](https://www.luogu.com.cn/problem/P3489) `主练`：最短路状态携带额外通行能力
- [ ] [P5344 [TJOI2019] 逛森林](https://www.luogu.com.cn/problem/P5344) `挑战`：树上批量关系的优化建图与最短路
- [ ] [P5471 [NOI2019] 弹跳](https://www.luogu.com.cn/problem/P5471) `挑战`：二维批量连边的优化建图与最短路

#### Part 7.1.6 差分约束｜主线

重点训练不等式与差值关系向约束图的转化，并扩展到严格关系、二维条件与复杂判定。

- [x] [P5960 【模板】差分约束算法](https://www.luogu.com.cn/problem/P5960) `模板`：差分约束标准实现
- [x] [P2294 [HNOI2005] 狡猾的商人](https://www.luogu.com.cn/problem/P2294) `衔接`：差值关系与带权并查集形成对照；交叉：[[XCPC_综合题单#Part 6.1.2 并查集｜主线|6.1.2 带权并查集]]
- [x] [P3275 [SCOI2011] 糖果](https://www.luogu.com.cn/problem/P3275) `主练`：严格 / 非严格约束与强连通结构
- [ ] [P7515 [省选联考 2021 A/B 卷] 矩阵游戏](https://www.luogu.com.cn/problem/P7515) `主练`：二维条件转势能约束
- [ ] [P4926 [1007] 倍杀测量者](https://www.luogu.com.cn/problem/P4926) `挑战`：复杂约束关系与判定

### Part 7.2 树论基础｜主线

#### Part 7.2.1 二叉树 / 递归树结构基础｜地图保留

保留树遍历恢复、结构比较与表达式树等代表模型，基础递归实现不再大量重复挂题。

- [ ] [P1030 求先序排列](https://www.luogu.com.cn/problem/P1030) `衔接`：由遍历序列恢复树结构
- [ ] [P5018 [NOIP2018 普及组] 对称二叉树](https://www.luogu.com.cn/problem/P5018) `主练`：子树结构比较
- [ ] [P7073 [CSP-J2020] 表达式](https://www.luogu.com.cn/problem/P7073) `主练`：表达式树求值与修改影响
- [ ] [P5597 【XR-4】复读](https://www.luogu.com.cn/problem/P5597) `挑战`：递归二叉树结构与周期遍历

#### Part 7.2.2 树的直径 / 中心 / 核｜主线

从树直径出发，训练动态直径、路径收益与沿直径寻找中心或核心区域的结构分析。

- [ ] [P4408 [NOI2003] 逃学的小孩](https://www.luogu.com.cn/problem/P4408) `衔接`：树直径的直接应用
- [ ] [P2195 HXY 造公园](https://www.luogu.com.cn/problem/P2195) `主练`：动态连通块直径维护
- [x] [P3629 [APIO2010] 巡逻](https://www.luogu.com.cn/problem/P3629) `主练`：直径与路径收益结合
- [x] [P1099 [NOIP2007 提高组] 树网的核](https://www.luogu.com.cn/problem/P1099) `主练`：直径上的核心区间与最大距离
- [x] [P5536 【XR-3】核心城市](https://www.luogu.com.cn/problem/P5536) `挑战`：从叶层向内分析树的核心区域

#### Part 7.2.3 树的重心 / 距离和最优点｜主线

重点训练树重心及删除后的结构变化，并扩展到多中心下的树上距离和最优化。

- [x] [P1395 会议](https://www.luogu.com.cn/problem/P1395) `衔接`：树重心经典入口
- [x] [P5666 [CSP-S2019] 树的重心](https://www.luogu.com.cn/problem/P5666) `主练`：删除点后的重心与连通块分析
- [x] [P2726 [SHOI2005] 树的双中心](https://www.luogu.com.cn/problem/P2726) `挑战`：双中心与树上距离和最优化

#### Part 7.2.4 树上贡献统计｜主线

保留点对局部贡献与删边后两侧规模统计两类代表模型。

- [ ] [P1351 [NOIP2014 提高组] 联合权值](https://www.luogu.com.cn/problem/P1351) `主练`：距离为二的点对贡献统计
- [ ] [P2052 [NOI2011] 道路修建](https://www.luogu.com.cn/problem/P2052) `主练`：按树边拆分两侧规模统计贡献

#### Part 7.2.5 LCA / 树上差分 / 路径关系｜主线

围绕静态祖先关系、路径差分与路径几何关系展开；在线路径数据结构仍由 Part 6 负责。

- [x] [P3379 【模板】最近公共祖先（LCA）](https://www.luogu.com.cn/problem/P3379) `模板`：LCA 标准实现
- [ ] [P4281 [AHOI2008] 紧急集合 / 聚会](https://www.luogu.com.cn/problem/P4281) `主练`：多点之间的 LCA 与树上中位位置
- [x] [P3128 [USACO15DEC] Max Flow P](https://www.luogu.com.cn/problem/P3128) `衔接`：点路径差分标准练习
- [x] [P5836 [USACO19DEC] Milk Visits S](https://www.luogu.com.cn/problem/P5836) `主练`：静态路径类别信息
- [ ] [P3398 仓鼠找 sugar](https://www.luogu.com.cn/problem/P3398) `主练`：LCA 与路径相交判定
- [x] [P2680 [NOIP2015 提高组] 运输计划](https://www.luogu.com.cn/problem/P2680) `主练`：路径差分与二分答案
- [x] [P1600 [NOIP2016 提高组] 天天爱跑步](https://www.luogu.com.cn/problem/P1600) `挑战`：路径、深度与时间条件联合统计

### Part 7.3 函数图与倍增跳转｜主线

#### Part 7.3.1 函数图 / 基环结构｜主线

先识别每点唯一后继形成的基环内向树结构，再处理入环前长度、环长与整体可达范围。

- [ ] [P2661 [NOIP2015 提高组] 信息传递](https://www.luogu.com.cn/problem/P2661) `衔接`：函数图中的环与首次重复
- [ ] [P2921 [USACO08DEC] Trick or Treat on the Farm](https://www.luogu.com.cn/problem/P2921) `主练`：函数图上的入环前后可达长度

#### Part 7.3.2 倍增 / 二进制跳转｜主线

重点训练二进制拆分后的快速跳转，并扩展到树上资源分配、可达关系与环形区间覆盖。

- [ ] [P1081 [NOIP2012 提高组] 开车旅行](https://www.luogu.com.cn/problem/P1081) `主练`：倍增维护非标准跳转信息
- [ ] [P1084 [NOIP2012 提高组] 疫情控制](https://www.luogu.com.cn/problem/P1084) `挑战`：树上倍增、二分与资源分配
- [ ] [P1613 跑路](https://www.luogu.com.cn/problem/P1613) `主练`：倍增维护固定长度可达关系
- [ ] [P7167 [eJOI 2020] Fountain (Day1)](https://www.luogu.com.cn/problem/P7167) `主练`：构造确定性跳转关系后倍增
- [ ] [P3509 [POI2010] ZAB-Frog](https://www.luogu.com.cn/problem/P3509) `主练`：确定性后继上的大步跳转
- [ ] [P4155 [SCOI2015] 国旗计划](https://www.luogu.com.cn/problem/P4155) `挑战`：环形区间覆盖与倍增

### Part 7.4 生成树｜主线

#### Part 7.4.1 最小生成树及其扩展｜主线

重点训练 MST 基础性质、瓶颈路、约束生成树与次优结构，并保留能够代表不同约束类型的变式。

- [x] [P3366 【模板】最小生成树](https://www.luogu.com.cn/problem/P3366) `模板`：Kruskal / Prim 标准实现
- [ ] [P1991 无线通讯网](https://www.luogu.com.cn/problem/P1991) `衔接`：MST 与指定连通块数量 / 聚类阈值
- [x] [P1396 营救](https://www.luogu.com.cn/problem/P1396) `衔接`：最小瓶颈路
- [x] [CF1245D Shichikuji and Power Grid](https://www.luogu.com.cn/problem/CF1245D) `主练`：虚拟源点与 MST 建模
- [x] [P2700 逐个击破](https://www.luogu.com.cn/problem/P2700) `主练`：关键点限制下的生成森林
- [x] [P3623 免费道路](https://www.luogu.com.cn/problem/P3623) `主练`：指定类型边数量的生成树构造
- [x] [P4180 严格次小生成树](https://www.luogu.com.cn/problem/P4180) `主练`：基本环替换与严格次优
- [x] [CF609E Minimum spanning tree for each edge](https://www.luogu.com.cn/problem/CF609E) `主练`：强制选边后的最优生成树
- [x] [P5633 最小度限制生成树](https://www.luogu.com.cn/problem/P5633) `挑战`：指定点度数约束下的最优生成树
- [ ] [CF1120D Power Tree](https://www.luogu.com.cn/problem/CF1120D) `挑战`：非显然模型向 MST 的结构转化

#### Part 7.4.2 Kruskal 重构树 / 权值阈值连通｜进阶主线

重点训练把 Kruskal 的合并历史树化，并利用祖先与子树表达权值阈值下的连通块结构。

- [x] [P1967 [NOIP2013 提高组] 货车运输](https://www.luogu.com.cn/problem/P1967) `衔接`：LCA 表示瓶颈阈值
- [ ] [P4197 Peaks](https://www.luogu.com.cn/problem/P4197) `主练`：祖先子树表示阈值连通块
- [ ] [P4899 [IOI2018] werewolf 狼人](https://www.luogu.com.cn/problem/P4899) `挑战`：双重构树与两类阈值连通结构相交

#### Part 7.4.3 矩阵树定理｜地图保留

保留 Matrix-Tree 的标准模板与典型加权 / 分层计数应用；行列式实现交叉参考 [[XCPC_综合题单#Part 5.6.2 高斯消元 / 行列式｜主线|5.6.2 高斯消元 / 行列式]]。

- [ ] [P6178 【模板】Matrix-Tree 定理](https://www.luogu.com.cn/problem/P6178) `模板`：Kirchhoff 矩阵与生成树权值和
- [ ] [P4111 [HEOI2015] 小Z的房间](https://www.luogu.com.cn/problem/P4111) `衔接`：实际建图与生成树计数
- [ ] [P3317 [SDOI2014] 重建](https://www.luogu.com.cn/problem/P3317) `主练`：概率 / 权值转带权生成树权值和
- [ ] [P4208 [JSOI2008] 最小生成树计数](https://www.luogu.com.cn/problem/P4208) `挑战`：Kruskal 权值分组与生成树计数

### Part 7.5 有向图结构｜主线

#### Part 7.5.1 拓扑排序 / DAG 结构 / 传递闭包｜主线

保留拓扑序、可达关系与 DAG 结构本身；复杂 DAG DP 仍由 Part 3 负责。

- [x] [P1113 杂务](https://www.luogu.com.cn/problem/P1113) `衔接`：拓扑序与 DAG 最长完成时间
- [x] [P1983 [NOIP2013 普及组] 车站分级](https://www.luogu.com.cn/problem/P1983) `主练`：约束建 DAG 与拓扑层次
- [x] [P3243 [HNOI2015] 菜肴制作](https://www.luogu.com.cn/problem/P3243) `主练`：字典序要求下的拓扑排序
- [x] [P2419 [USACO08JAN] Cow Contest S](https://www.luogu.com.cn/problem/P2419) `主练`：可达关系与传递闭包统计
- [ ] [P3573 [POI2014] RAJ-Rally](https://www.luogu.com.cn/problem/P3573) `挑战`：删除一个点后的 DAG 最长路
- [ ] [P7516 [省选联考 2021 A/B 卷] 图函数](https://www.luogu.com.cn/problem/P7516) `挑战`：Floyd / 传递闭包结构应用

#### Part 7.5.2 强连通分量 / 缩点 DAG｜主线

从 SCC 模板出发，训练源汇结构、缩点后的链与路径，以及优化建图后的强连通分析。

- [x] [P3387 【模板】缩点 / 强连通分量](https://www.luogu.com.cn/problem/P3387) `模板`：SCC 与缩点 DAG
- [x] [P2341 [USACO03FALL] 受欢迎的牛 G](https://www.luogu.com.cn/problem/P2341) `衔接`：唯一汇 SCC
- [x] [P2746 [USACO5.3] Network of Schools](https://www.luogu.com.cn/problem/P2746) `主练`：源 SCC / 汇 SCC 与补边
- [x] [P1407 [国家集训队] 稳定婚姻](https://www.luogu.com.cn/problem/P1407) `主练`：关系建图后用 SCC 判定
- [ ] [P1262 [POI1996 R3] 间谍网络](https://www.luogu.com.cn/problem/P1262) `主练`：可达性、源 SCC 与最小控制代价
- [x] [P5008 [yLOI2018] 锦鲤抄](https://www.luogu.com.cn/problem/P5008) `主练`：SCC 内删除性质与源 SCC 贪心
- [x] [P2272 [ZJOI2007] 最大半连通子图](https://www.luogu.com.cn/problem/P2272) `主练`：缩点 DAG 上最长链与方案数
- [ ] [P5025 [SNOI2017] 炸弹](https://www.luogu.com.cn/problem/P5025) `挑战`：区间优化建图与 SCC
- [ ] [P4819 [中山市选] 杀人游戏](https://www.luogu.com.cn/problem/P4819) `挑战`：SCC 与概率 / 信息覆盖
- [ ] [P7737 [NOI2021] 庆典](https://www.luogu.com.cn/problem/P7737) `挑战`：特殊缩点 DAG 与高阶结构

#### Part 7.5.3 2-SAT｜主线

重点训练二选一约束向蕴含图转化，并扩展到特殊状态枚举与复杂时序逻辑关系。

- [x] [P4782 【模板】2-SAT 问题](https://www.luogu.com.cn/problem/P4782) `模板`：蕴含图与 SCC 判定
- [ ] [P4171 [JSOI2010] 满汉全席](https://www.luogu.com.cn/problem/P4171) `主练`：二选一冲突转蕴含关系
- [ ] [P3825 [NOI2017] 游戏](https://www.luogu.com.cn/problem/P3825) `挑战`：少量特殊状态枚举与 2-SAT
- [ ] [P5332 [JSOI2019] 精准预测](https://www.luogu.com.cn/problem/P5332) `挑战`：时间状态压缩、蕴含关系与可达性

### Part 7.6 无向图连通与欧拉结构｜主线

#### Part 7.6.1 桥 / 边双连通 / 桥树｜主线

沿 low-link 的边侧结构展开，从桥与边双模板过渡到桥树上的直径与补边问题。

- [ ] [P1656 炸铁路](https://www.luogu.com.cn/problem/P1656) `衔接`：桥的直接应用
- [x] [P8436 【模板】边双连通分量](https://www.luogu.com.cn/problem/P8436) `模板`：边双连通分量
- [ ] [CF1000E We Need More Bosses](https://www.luogu.com.cn/problem/CF1000E) `主练`：边双缩点与桥树直径
- [ ] [P2860 [USACO06JAN] Redundant Paths G](https://www.luogu.com.cn/problem/P2860) `主练`：桥树叶子与最少补边

#### Part 7.6.2 割点 / 点双连通 / 圆方树｜主线

从割点与点双模板出发，进一步训练点双结构计数和圆方树上的贡献与动态维护。

- [x] [P3388 【模板】割点（割顶）](https://www.luogu.com.cn/problem/P3388) `模板`：割点与 low 值
- [x] [P8435 【模板】点双连通分量](https://www.luogu.com.cn/problem/P8435) `模板`：点双连通分量
- [ ] [P3469 [POI2008] BLO-Blockade](https://www.luogu.com.cn/problem/P3469) `主练`：割点造成的点对贡献
- [ ] [P3225 [HNOI2012] 矿场搭建](https://www.luogu.com.cn/problem/P3225) `主练`：点双结构与方案计数
- [ ] [P4630 [APIO2018] 铁人两项](https://www.luogu.com.cn/problem/P4630) `挑战`：圆方树上的贡献统计
- [ ] [CF487E Tourists](https://www.luogu.com.cn/problem/CF487E) `挑战`：圆方树与动态数据结构

#### Part 7.6.3 欧拉路径 / 欧拉回路｜主线

保留标准欧拉路径构造、字典序控制与欧拉图进一步分解三类代表问题。

- [ ] [P7771 【模板】欧拉路径](https://www.luogu.com.cn/problem/P7771) `模板`：Hierholzer 标准实现
- [ ] [P1341 无序字母对](https://www.luogu.com.cn/problem/P1341) `主练`：字典序最小欧拉路径构造
- [ ] [P3520 [POI2011] SMI-Garbage](https://www.luogu.com.cn/problem/P3520) `挑战`：欧拉图的简单环分解

#### Part 7.6.4 离线动态连通性｜进阶主线

图论语义以这里为主；时间线段树与 rollback 技术入口仍由 Part 6.3.5 负责。

- [ ] [SP9576 DYNACON1 - Dynamic Graph Connectivity](https://www.luogu.com.cn/problem/SP9576) `主练`：离线动态图连通性标准模型
- [ ] [CF938G Shortest Path Queries](https://www.luogu.com.cn/problem/CF938G) `挑战`：动态连通、异或路径与可撤销线性基

### Part 7.7 二分图｜主线

#### Part 7.7.1 二染色与冲突图｜主线

从直接二染色过渡到自行构造冲突图，并扩展到多颜色集合之间的二分性判定。

- [ ] [P3430 [POI2005] DWU-Double-row](https://www.luogu.com.cn/problem/P3430) `衔接`：二染色入口
- [ ] [CF741C Arpa’s overnight party](https://www.luogu.com.cn/problem/CF741C) `主练`：构造冲突边后做二染色
- [ ] [P1155 [NOIP2008 提高组] 双栈排序](https://www.luogu.com.cn/problem/P1155) `主练`：冲突图与可行性判定
- [ ] [CF1444C Team-Building](https://www.luogu.com.cn/problem/CF1444C) `挑战`：多颜色点集之间的二分图判定

#### Part 7.7.2 最大匹配 / 覆盖 / 匹配结构｜主线

从最大匹配模板出发，训练方案恢复、路径覆盖、König 定理与最大匹配的结构性质。

- [x] [P3386 【模板】二分图最大匹配](https://www.luogu.com.cn/problem/P3386) `模板`：匈牙利算法标准实现
- [x] [P2756 飞行员配对方案问题](https://www.luogu.com.cn/problem/P2756) `主练`：匹配方案恢复
- [x] [P2764 最小路径覆盖问题](https://www.luogu.com.cn/problem/P2764) `主练`：DAG 最小路径覆盖与最大匹配
- [ ] [P2825 [HEOI2016/TJOI2016] 游戏](https://www.luogu.com.cn/problem/P2825) `主练`：棋盘分段后转行段 / 列段匹配
- [ ] [P3033 [USACO11NOV] Cow Steeplechase](https://www.luogu.com.cn/problem/P3033) `主练`：最小点覆盖与最大独立集
- [ ] [P3731 [HAOI2017] 新型城市化](https://www.luogu.com.cn/problem/P3731) `挑战`：最大匹配的必经边
- [ ] [P4617 [COCI2017-2018#5] Planinarenje](https://www.luogu.com.cn/problem/P4617) `挑战`：所有最大匹配中的必匹配点

#### Part 7.7.3 带权匹配 / KM / 指派问题｜地图保留

单独保留最大权完美匹配模板与 assignment 标准模型；另参考 [[XCPC_综合题单#Part 7.8.3 费用流｜主线|7.8.3 费用流]]。

- [ ] [P6577 【模板】二分图最大权完美匹配](https://www.luogu.com.cn/problem/P6577) `模板`：KM / 最大权完美匹配
- [x] [P4014 分配问题](https://www.luogu.com.cn/problem/P4014) `主练`：经典指派模型与费用流交叉；交叉：[[XCPC_综合题单#Part 7.8.3 费用流｜主线|7.8.3 费用流]]

### Part 7.8 网络流｜主线

#### Part 7.8.1 最大流｜主线

从 Dinic 标准实现出发，训练拆点、配额、时间扩展与路径覆盖式容量网络。

- [x] [P3376 【模板】网络最大流](https://www.luogu.com.cn/problem/P3376) `模板`：Dinic 标准实现
- [ ] [P4722 【模板】最大流 加强版 / 预流推进](https://www.luogu.com.cn/problem/P4722) `地图`：HLPP / 预流推进
- [x] [P2763 试题库问题](https://www.luogu.com.cn/problem/P2763) `主练`：类别配额与方案恢复
- [ ] [P2472 [SCOI2007] 蜥蜴](https://www.luogu.com.cn/problem/P2472) `主练`：拆点与点容量
- [ ] [P2754 [CTSC1999] 家园](https://www.luogu.com.cn/problem/P2754) `挑战`：时间扩展网络
- [ ] [P2765 魔术球问题](https://www.luogu.com.cn/problem/P2765) `主练`：增量建图与路径覆盖式最大流
- [ ] [P2766 最长不下降子序列问题](https://www.luogu.com.cn/problem/P2766) `挑战`：DP 结构转容量网络

#### Part 7.8.2 最小割 / 最大权闭合子图｜主线

重点训练边割、点割、二元选择、独立集、闭合子图与平面图对偶等稳定最小割模型。

- [ ] [P1344 [USACO4.4] Pollutant Control](https://www.luogu.com.cn/problem/P1344) `衔接`：最小割上的多目标编码
- [x] [P1345 [USACO5.4] Telecowmunication](https://www.luogu.com.cn/problem/P1345) `衔接`：点割拆点
- [x] [P2057 [SHOI2007] 善意的投票](https://www.luogu.com.cn/problem/P2057) `主练`：二元选择与割模型
- [x] [P2774 方格取数问题](https://www.luogu.com.cn/problem/P2774) `主练`：二分图最大权独立集与最小割
- [ ] [P4126 [AHOI2009] 最小割](https://www.luogu.com.cn/problem/P4126) `主练`：残量网络与最小割边结构
- [ ] [P2805 [NOI2009] 植物大战僵尸](https://www.luogu.com.cn/problem/P2805) `主练`：最大权闭合子图
- [ ] [P3749 [六省联考2017] 寿司餐厅](https://www.luogu.com.cn/problem/P3749) `挑战`：复杂依赖关系的最大权闭合
- [ ] [P4001 [ICPC-Beijing 2006] 狼抓兔子](https://www.luogu.com.cn/problem/P4001) `挑战`：平面图最小割与对偶最短路；交叉：[[XCPC_综合题单#Part 7.1.5 最短路结构与特殊路径模型｜进阶主线|7.1.5 平面图对偶最短路]]

#### Part 7.8.3 费用流｜主线

从标准供需网络出发，训练时间链、次序代价、多路径收益、额外流量付费与优化建图。

- [x] [P3381 【模板】最小费用最大流](https://www.luogu.com.cn/problem/P3381) `模板`：最小费用最大流
- [x] [P4015 运输问题](https://www.luogu.com.cn/problem/P4015) `衔接`：标准供需网络
- [x] [P1251 餐巾计划问题](https://www.luogu.com.cn/problem/P1251) `主练`：时间链上的库存、清洗与购买
- [ ] [P2053 [SCOI2007] 修车](https://www.luogu.com.cn/problem/P2053) `主练`：位置次序代价展开
- [ ] [P2050 [NOI2012] 美食节](https://www.luogu.com.cn/problem/P2050) `挑战`：动态增点优化费用流
- [ ] [P2045 方格取数加强版](https://www.luogu.com.cn/problem/P2045) `主练`：多路径共享与重复贡献控制
- [ ] [P2604 [ZJOI2010] 网络扩容](https://www.luogu.com.cn/problem/P2604) `主练`：先最大流，再为额外流量付费
- [ ] [P3358 最长 k 可重区间集问题](https://www.luogu.com.cn/problem/P3358) `主练`：坐标链容量与区间选择
- [ ] [P4452 [国家集训队] 航班安排](https://www.luogu.com.cn/problem/P4452) `挑战`：时间兼容关系与有限资源调度
- [ ] [P5331 [SNOI2019] 通信](https://www.luogu.com.cn/problem/P5331) `挑战`：费用流与优化建图

#### Part 7.8.4 上下界网络流｜进阶主线

先区分可行流、最大流与最小流三个标准问题，再训练带费用下界与路径覆盖式建模。

- [ ] [P14578 【模板】无源汇上下界可行流](https://www.luogu.com.cn/problem/P14578) `模板`：无源汇上下界可行流
- [ ] [P14579 【模板】有源汇上下界最大流](https://www.luogu.com.cn/problem/P14579) `模板`：有源汇上下界最大流
- [ ] [P14580 【模板】有源汇上下界最小流](https://www.luogu.com.cn/problem/P14580) `模板`：有源汇上下界最小流
- [ ] [P3980 [NOI2008] 志愿者招募](https://www.luogu.com.cn/problem/P3980) `主练`：需求下界与最小费用可行流
- [ ] [P4043 [AHOI2014/JSOI2014] 支线剧情](https://www.luogu.com.cn/problem/P4043) `主练`：每条边至少覆盖一次的最小费用可行流
- [ ] [P4843 清理雪道](https://www.luogu.com.cn/problem/P4843) `挑战`：DAG 边覆盖转有源汇上下界最小流

### Part 7.9 树上高级技巧｜进阶主线

#### Part 7.9.1 点分治 / 点分树｜进阶主线

从静态点分治的路径统计出发，扩展到长度区间、复杂贡献与动态点分树。

- [ ] [P3806 【模板】点分治1](https://www.luogu.com.cn/problem/P3806) `模板`：静态点分治入口
- [ ] [P2634 [国家集训队] 聪聪可可](https://www.luogu.com.cn/problem/P2634) `主练`：路径余数统计
- [ ] [P4149 [IOI2011] Race](https://www.luogu.com.cn/problem/P4149) `主练`：定长路径与最少边数
- [ ] [CF150E Freezing with Style](https://www.luogu.com.cn/problem/CF150E) `挑战`：二分中位数、长度区间与点分治
- [ ] [P3714 [BJOI2017] 树的难题](https://www.luogu.com.cn/problem/P3714) `挑战`：长度区间与复杂路径贡献合并
- [ ] [P6329 【模板】点分树 / 震波](https://www.luogu.com.cn/problem/P6329) `模板`：动态点分树与距离范围询问
- [ ] [P3241 [HNOI2015] 开店](https://www.luogu.com.cn/problem/P3241) `挑战`：点分树上的动态距离信息

#### Part 7.9.2 动态关键点 / 极小连通子树维护｜进阶主线

利用 DFS 序环维护动态关键点集合，并把相邻点距离和转成极小连通子树的边权和。

- [ ] [P3320 [SDOI2015] 寻宝游戏](https://www.luogu.com.cn/problem/P3320) `衔接`：DFS 序环与动态关键点
- [ ] [CF176E Archaeology](https://www.luogu.com.cn/problem/CF176E) `主练`：动态增删关键点与距离量维护

#### Part 7.9.3 虚树｜进阶主线

从虚树构造入口出发，训练多关键点压缩、贡献统计，并扩展到圆方树与多路径并结构。

- [ ] [P2495 [SDOI2011] 消耗战](https://www.luogu.com.cn/problem/P2495) `模板`：虚树标准入口
- [ ] [P3233 [HNOI2014] 世界树](https://www.luogu.com.cn/problem/P3233) `主练`：虚树上的多源归属与贡献统计
- [ ] [P4606 [SDOI2018] 战略游戏](https://www.luogu.com.cn/problem/P4606) `挑战`：圆方树与虚树；交叉：[[XCPC_综合题单#Part 7.6.2 割点 / 点双连通 / 圆方树｜主线|7.6.2 圆方树]]
- [ ] [P5327 [ZJOI2019] 语言](https://www.luogu.com.cn/problem/P5327) `挑战`：多路径并与虚树 / DFS 序结构

## Part 8 计算几何

### Part 8.1 计算几何基础｜主线

用少量基础题保持叉积、距离、共线与基本位置关系的实现手感；更完整的几何原语由模板与笔记承担。

- [ ] [P1355 神秘大三角](https://www.luogu.com.cn/problem/P1355) `衔接`：叉积、方向判断与点在三角形内
- [ ] [P1652 圆](https://www.luogu.com.cn/problem/P1652) `衔接`：点圆位置关系与距离平方判断
- [ ] [P1142 轰炸](https://www.luogu.com.cn/problem/P1142) `主练`：共线判定与整数几何实现

### Part 8.2 凸性结构｜进阶主线

#### Part 8.2.1 凸包｜主线

重点训练二维凸包构造，并扩展到几何对象转化与凸多边形之间的代数关系。

- [ ] [P2742 【模板】二维凸包](https://www.luogu.com.cn/problem/P2742) `模板`：二维凸包标准实现
- [ ] [P3829 [SHOI2012] 信用卡凸包](https://www.luogu.com.cn/problem/P3829) `主练`：几何对象转化后求凸包周长
- [ ] [P4557 [JSOI2018] 战争](https://www.luogu.com.cn/problem/P4557) `挑战`：Minkowski 和与凸多边形关系

#### Part 8.2.2 旋转卡壳｜进阶主线

重点训练凸包上的对踵点维护，从直径问题扩展到多支撑方向的最小包围矩形。

- [ ] [P1452 Beauty Contest](https://www.luogu.com.cn/problem/P1452) `衔接`：凸包直径与旋转卡壳入口
- [ ] [P3187 [HNOI2007] 最小矩形覆盖](https://www.luogu.com.cn/problem/P3187) `主练`：多组支撑点与最小包围矩形

#### Part 8.2.3 半平面交｜地图保留

重点训练线性几何约束向半平面的转化，并从模板构造扩展到可行域面积与区域关系。

- [ ] [P4196 [CQOI2006] 凸多边形](https://www.luogu.com.cn/problem/P4196) `模板`：半平面交标准实现
- [ ] [P3256 [JLOI2013] 赛车](https://www.luogu.com.cn/problem/P3256) `衔接`：直线竞争与上包络转半平面交
- [ ] [P4250 [SCOI2015] 小凸想跑步](https://www.luogu.com.cn/problem/P4250) `主练`：面积不等式转半平面约束
- [ ] [P3297 [SDOI2013] 逃考](https://www.luogu.com.cn/problem/P3297) `挑战`：半平面区域构造与区域邻接

## Part 9 跨专题工具

### Part 9.1 0/1 分数规划｜地图保留

重点训练将分数目标参数化为判定问题，并观察不同模型中 DP、图算法与匹配如何充当 check。

- [ ] [P4377 [USACO18OPEN] Talent Show](https://www.luogu.com.cn/problem/P4377) `衔接`：分数规划与背包判定
- [x] [P3199 [HNOI2009] 最小圈](https://www.luogu.com.cn/problem/P3199) `主练`：分数规划与负环 / 图判定；交叉：[[XCPC_综合题单#Part 7.1.5 最短路结构与特殊路径模型｜进阶主线|7.1.5 最小环 / 图判定]]
- [ ] [P3705 [SDOI2017] 新生舞会](https://www.luogu.com.cn/problem/P3705) `主练`：分数规划与二分图匹配 / 费用流；交叉：[[XCPC_综合题单#Part 7.7.3 带权匹配 / KM / 指派问题｜地图保留|7.7.3 带权匹配]]
- [ ] [P4322 [JSOI2016] 最佳团体](https://www.luogu.com.cn/problem/P4322) `挑战`：分数规划与树形背包；交叉：[[XCPC_综合题单#Part 3.2.2 树形 DP / 树上背包｜主线|3.2.2 树上背包]]

### Part 9.2 Bitset / 字级并行优化｜主线

作为跨专题优化工具，训练将布尔状态或集合按机器字打包，并用于可达性、消元、字符串与值域关系维护。

- [ ] [B3611 【模板】传递闭包](https://www.luogu.com.cn/problem/B3611) `衔接`：bitset 加速布尔可达性传播；交叉：[[XCPC_综合题单#Part 7.5.1 拓扑排序 / DAG 结构 / 传递闭包｜主线|7.5.1 传递闭包]]
- [ ] [P5539 Unknown Mother-Goose](https://www.luogu.com.cn/problem/P5539) `主练`：手写字级位集与批量布尔运算
- [ ] [CF914F Substrings in a String](https://www.luogu.com.cn/problem/CF914F) `主练`：位移与交集完成动态字符串匹配
- [ ] [P3674 小清新人渣的本愿](https://www.luogu.com.cn/problem/P3674) `主练`：莫队状态与 bitset 值域关系；交叉：[[XCPC_综合题单#Part 6.3.2 莫队｜进阶主线|6.3.2 莫队]]
- [ ] [P5355 [Ynoi2017] 由乃的玉米田](https://www.luogu.com.cn/problem/P5355) `挑战`：莫队、值域关系与 bitset 综合

### Part 9.3 交互题｜地图保留

保留不同交互协议与信息获取模型的代表题，用于建立询问预算、在线决策与恢复隐藏结构的基本认知。

- [ ] [P1733 猜数（IO交互版）](https://www.luogu.com.cn/problem/P1733) `入口`：标准输入输出交互与 flush
- [ ] [P1947 猜数](https://www.luogu.com.cn/problem/P1947) `入口`：grader / 函数式交互
- [ ] [P5208 [WC2019] I 君的商店](https://www.luogu.com.cn/problem/P5208) `主练`：集合询问与信息设计
- [ ] [P5473 [NOI2019] I 君的探险](https://www.luogu.com.cn/problem/P5473) `挑战`：有限查询下恢复隐藏图结构
- [ ] [P6541 [WC2018] 即时战略](https://www.luogu.com.cn/problem/P6541) `挑战`：路径 oracle 与隐藏树恢复

## 专题结构索引

为便于回看，下面只列当前主表已经显式整理出的稳定训练链：

- **基础与搜索**：模拟、二分、分治、贪心、双指针，以及 DFS / BFS、Meet-in-the-Middle、启发式搜索与 DLX；
- **动态规划**：线性 / 背包 / 区间 / 树形 / DAG / 状压 / 计数与概率，以及单调队列、斜率、决策单调性、数据结构优化与动态 DP；
- **字符串**：KMP / Z、Trie → AC、Manacher → PAM，以及 SA / SAM 两条后缀结构链；
- **数学**：基础数论、数论求和、博弈、概率期望、组合计数、线性代数、线性基与多项式；
- **数据结构**：基础维护结构、线段树家族、根号与离线算法、可持久化结构、平衡树、树上数据结构与高维专用结构；
- **图论与树论**：最短路 / 0-1 BFS / 同余最短路 / 差分约束、树论基础、函数图 / 倍增、MST / Kruskal 重构树 / Matrix-Tree、有向图结构、桥 / 边双 / 点双 / 圆方树 / 欧拉、离线动态连通、二分图 / KM、最大流 / 最小割 / 费用流 / 上下界流、点分治 / 点分树与虚树；
- **计算几何**：基础几何、凸包、旋转卡壳与半平面交；
- **跨专题工具**：0/1 分数规划、Bitset / 字级并行优化与交互题。

> **组织原则**：正文统一按“Part → 专题族 → 子模型 → 训练题”组织。主表优先最小有效训练集；高阶专项移入 [[XCPC_进阶题单]]，重复模型与熟练度题移入 [[XCPC_补充题单]]。同题只有在第二位置承担独立知识责任时才重复挂载。

## 使用建议

1. 进入一个新专题时，先沿主表完成模板 / 衔接 / 主练，确认能够无标签识别、独立实现并解释边界。
2. 主线稳定后，如果需要继续拔高，再从 [[XCPC_进阶题单]] 回收该专题的高质量专项题；不要求一次清空。
3. 需要恢复实现手感、集中板刷或补某一模型熟练度时，再从 [[XCPC_补充题单]] 抽题；补充题不构成长期待办。
4. 真正判断是否掌握，仍看无标签识别、独立实现、变式迁移和比赛调用，而不是题目勾选数量。

## 参考与许可

{% fold info @参考题单与许可说明 %}

本题库建设过程中参考了 StudyingFather「一个动态更新的洛谷综合题单」、洛谷官方题单及个人训练题单，并进行了重新分类、补充与交叉挂载。

StudyingFather 原项目采用 CC BY-SA 4.0 与 The Star And Thank Author License；如公开传播本衍生整理，请保留必要署名并遵守原项目许可要求。

{% endfold %}
