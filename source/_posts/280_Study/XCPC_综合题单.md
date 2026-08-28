---
title: XCPC 综合题单
description: 面向 XCPC 长期训练，按专题与题型统一组织；允许一题多归属。
tags:
  - algorithm/题单
categories:
  - 280_Study
comments: false
copyright: false
abbrlink: '60749789'
date: 2026-08-28
updated: 2026-08-28
---

# XCPC 综合题单

> 以 StudyingFather「一个动态更新的洛谷综合题单」3.0.2 为经典题库底稿。与前两版不同，本版不再用优先级删减主线题目，而是尽量恢复原题单的专题内梯度；低优先级专题通过折叠降低视觉权重。
>
> 原题单：https://studyingfather.com/archives/841
>
> 原仓库：https://github.com/SFOI-Team/luogu-problem-list
>
> 原项目采用 CC BY-SA 4.0 与 Star And Thank Author License。本版保留来源与署名；公开传播或继续演绎时请遵守原项目许可。


> 这是一份面向 XCPC 长期训练的综合题库。正文只按专题、题型和训练定位组织；题目允许多归属，用于表达真实的知识交叉关系。

## 使用规则

- **主线**：值得主动建设到理解、实现与迁移层；题目保持展开。
- **进阶主线**：基础主线稳定后值得系统学习；题目通常保持展开。
- **地图保留**：知道用途和触发线索即可；完整题目保留，但默认折叠。
- **近似忽略**：当前 XCPC 路线不安排主动学习；为保持原题单完整性仍保留题目，并默认折叠。

> 题单完整不等于必须全绿。完整题库负责提供足够训练梯度；真正刷到哪里，由当前专题、迁移价值和赛场需求决定。

### 训练标记

- `衔接`：模板之后的第一层，适合进入专题。
- `主练`：代表模型，优先完整思考。
- `挑战`：完成前置后再做，用于迁移与综合。
- `复盘`：跨专题回看，不作为新知识入口。
- `暂存`：保留在题库中，但不进入近期训练。

> **允许一题多归属。** 同一道题如果同时训练多个稳定模型，可以在多个专题下重复出现；这表示知识关系，而不是题库冗余。只避免同一小节内机械重复。
>
> 当前题库共有 **1298 个题目条目、1027 个不同题目**；条目数大于题目数是因为允许一题多归属。

## Part 1 入门阶段｜近似忽略

## Part 2 基础算法

### Part 2.1 模拟｜主线

模拟在 XCPC 中仍然重要，尤其训练代码组织、状态一致性和边界处理，因此完整保留。

- [ ] [P1003 铺地毯](https://www.luogu.com.cn/problem/P1003)
- [ ] [P1067 多项式输出](https://www.luogu.com.cn/problem/P1067)
- [ ] [P1328 生活大爆炸版石头剪刀布](https://www.luogu.com.cn/problem/P1328)
- [ ] [P1563 玩具谜题](https://www.luogu.com.cn/problem/P1563)
- [ ] [P1042 乒乓球](https://www.luogu.com.cn/problem/P1042)
- [ ] [P1179 数字统计](https://www.luogu.com.cn/problem/P1179)
- [ ] [P2615 神奇的幻方](https://www.luogu.com.cn/problem/P2615)
- [ ] [P3952 时间复杂度](https://www.luogu.com.cn/problem/P3952)
- [ ] [P2482 [SDOI2010] 猪国杀](https://www.luogu.com.cn/problem/P2482)
- [ ] [P5380 [THUPC2019] 鸭棋](https://www.luogu.com.cn/problem/P5380)

### Part 2.2 排序与顺序结构｜地图保留

{% fold info @排序算法 题单 %}
- [ ] [P1177 【模板】快速排序](https://www.luogu.com.cn/problem/P1177)
- [ ] [P1059 明明的随机数](https://www.luogu.com.cn/problem/P1059)
- [ ] [P1068 分数线划定](https://www.luogu.com.cn/problem/P1068)
- [ ] [P1051 谁拿了最多奖学金](https://www.luogu.com.cn/problem/P1051)
- [ ] [P1309 瑞士轮](https://www.luogu.com.cn/problem/P1309)
- [x] [P1908 逆序对](https://www.luogu.com.cn/problem/P1908)
{% endfold %}

- [ ] [P4375 [USACO18OPEN] Out of Sorts G](https://www.luogu.com.cn/problem/P4375) `挑战`：排序后位移与前缀统计。

### Part 2.3 二分答案｜主线

- [ ] [P1024 一元三次方程求解](https://www.luogu.com.cn/problem/P1024)
- [x] [P2678 跳石头](https://www.luogu.com.cn/problem/P2678)
- [x] [P1824 进击的奶牛](https://www.luogu.com.cn/problem/P1824)
- [ ] [P1902 刺杀大使](https://www.luogu.com.cn/problem/P1902)
- [x] [P1314 聪明的质监员](https://www.luogu.com.cn/problem/P1314)
- [x] [P1083 借教室](https://www.luogu.com.cn/problem/P1083)
- [ ] [P4343 [SHOI2015] 自动刷题机](https://www.luogu.com.cn/problem/P4343)

### Part 2.4 分治｜主线

- [ ] [P1226 【模板】快速幂 / 取余运算](https://www.luogu.com.cn/problem/P1226)
- [ ] [P1010 幂次方](https://www.luogu.com.cn/problem/P1010)
- [ ] [P1429 平面最近点对（加强版）](https://www.luogu.com.cn/problem/P1429)
- [x] [P3612 [USACO17JAN] Secret Cow Code](https://www.luogu.com.cn/problem/P3612)

### Part 2.5 贪心｜主线

- [ ] [P1208 [USACO1.3] Mixing Milk](https://www.luogu.com.cn/problem/P1208)
- [ ] [P4995 跳跳！](https://www.luogu.com.cn/problem/P4995)
- [ ] [P1094 纪念品分组](https://www.luogu.com.cn/problem/P1094)
- [ ] [P1199 三国游戏](https://www.luogu.com.cn/problem/P1199)
- [ ] [P2672 推销员](https://www.luogu.com.cn/problem/P2672)
- [x] [P1080 国王游戏](https://www.luogu.com.cn/problem/P1080)
- [ ] [P2123 皇后游戏](https://www.luogu.com.cn/problem/P2123)
- [ ] [P5521 [yLOI2019] 梅深不见冬](https://www.luogu.com.cn/problem/P5521)

### Part 2.6 构造｜主线

- [ ] [P3599 Koishi Loves Construction](https://www.luogu.com.cn/problem/P3599)
- [ ] [P5441 【XR-2】伤痕](https://www.luogu.com.cn/problem/P5441)
- [ ] [P5595 【XR-4】歌唱比赛](https://www.luogu.com.cn/problem/P5595)

### Part 2.7 高精度｜地图保留

XCPC 中优先使用 `boost::multiprecision::cpp_int`；原手写题保留但不主动板刷。

{% fold info @高精度 题单 %}
- [ ] [P1601 A+B Problem（高精）](https://www.luogu.com.cn/problem/P1601)
- [ ] [P2142 高精度减法](https://www.luogu.com.cn/problem/P2142)
- [ ] [P1303 A*B Problem](https://www.luogu.com.cn/problem/P1303)
- [ ] [P1480 A/B Problem](https://www.luogu.com.cn/problem/P1480)
- [ ] [P1009 阶乘之和](https://www.luogu.com.cn/problem/P1009)
{% endfold %}

### Part 2.8 前缀和 / 差分 / 离散化｜主线

- [x] [P3131 [USACO16JAN] Subsequences Summing to Sevens](https://www.luogu.com.cn/problem/P3131)
- [ ] [P1387 最大正方形](https://www.luogu.com.cn/problem/P1387)
- [ ] [P3397 地毯](https://www.luogu.com.cn/problem/P3397)
- [x] [P2280 [HNOI2003] 激光炸弹](https://www.luogu.com.cn/problem/P2280)
- [x] [P4552 [Poetize6] IncDec Sequence](https://www.luogu.com.cn/problem/P4552)

- [ ] [P1719 最大加权矩形](https://www.luogu.com.cn/problem/P1719) `主练`：二维前缀和 / 最大子矩形的经典训练。
- [ ] [P2882 [USACO07MAR] Face The Right Way G](https://www.luogu.com.cn/problem/P2882) `主练`：差分思想与枚举翻转长度。
- [ ] [P1904 天际线](https://www.luogu.com.cn/problem/P1904) `主练`：扫描 / 事件思想与轮廓维护。

### Part 2.9 双指针 / 滑动窗口｜主线

- [ ] [UVA11572 唯一的雪花 Unique Snowflakes](https://www.luogu.com.cn/problem/UVA11572) `衔接`：双指针 / 滑动窗口去重。

## Part 3 搜索

### Part 3.1 深度优先搜索｜主线

基础 DFS 本身无需反复板刷，但完整保留用于搜索状态与剪枝训练。

{% fold info @深度优先搜索 题单 %}
- [ ] [P1219 八皇后](https://www.luogu.com.cn/problem/P1219)
- [ ] [P1019 单词接龙](https://www.luogu.com.cn/problem/P1019)
- [ ] [P5194 [USACO05DEC] Scales](https://www.luogu.com.cn/problem/P5194)
- [ ] [P5440 【XR-2】奇迹](https://www.luogu.com.cn/problem/P5440)
- [ ] [P1378 油滴扩展](https://www.luogu.com.cn/problem/P1378)
{% endfold %}

### Part 3.2 广度优先搜索｜主线

{% fold info @广度优先搜索 题单 %}
- [ ] [P1162 填涂颜色](https://www.luogu.com.cn/problem/P1162)
- [ ] [P1443 马的遍历](https://www.luogu.com.cn/problem/P1443)
- [ ] [P3956 棋盘](https://www.luogu.com.cn/problem/P3956)
- [ ] [P1032 字串变换](https://www.luogu.com.cn/problem/P1032)
- [ ] [P1126 机器人搬重物](https://www.luogu.com.cn/problem/P1126)
{% endfold %}

### Part 3.3 记忆化搜索｜主线

- [ ] [P1514 引水入城](https://www.luogu.com.cn/problem/P1514)
- [ ] [P1535 游荡的奶牛](https://www.luogu.com.cn/problem/P1535)
- [ ] [P1434 [SHOI2002] 滑雪](https://www.luogu.com.cn/problem/P1434)
- [ ] [P3953 逛公园](https://www.luogu.com.cn/problem/P3953)

### Part 3.4 搜索剪枝与状态搜索｜主线

- [ ] [P1120 小木棍](https://www.luogu.com.cn/problem/P1120)
- [ ] [P1312 Mayan 游戏](https://www.luogu.com.cn/problem/P1312)
- [ ] [P1074 靶形数独](https://www.luogu.com.cn/problem/P1074)

- [ ] [P5507 机关](https://www.luogu.com.cn/problem/P5507) `挑战`：状态搜索与剪枝。

### Part 3.5 双向搜索 / Meet-in-the-Middle｜主线

- [ ] [P3067 [USACO12OPEN] Balanced Cow Subsets](https://www.luogu.com.cn/problem/P3067)
- [ ] [P4799 [CEOI2015 Day2] 世界冰球锦标赛](https://www.luogu.com.cn/problem/P4799)
- [ ] [P5195 [USACO05DEC] Knights of Ni](https://www.luogu.com.cn/problem/P5195)

- [ ] [CF525E Anya and Cubes](https://www.luogu.com.cn/problem/CF525E) `主练`：Meet-in-the-Middle 经典题。
- [ ] [CF912E Prime Gift](https://www.luogu.com.cn/problem/CF912E) `挑战`：折半搜索 + 第 k 小计数。

### Part 3.6 A*｜地图保留

{% fold info @A* 题单 %}
- [ ] [P1379 八数码难题](https://www.luogu.com.cn/problem/P1379)
{% endfold %}

### Part 3.7 IDA*｜近似忽略

{% fold info @IDA* 题单 %}
- [ ] [P2324 [SCOI2005] 骑士精神](https://www.luogu.com.cn/problem/P2324)
- [ ] [P2534 [AHOI2012] 铁盘整理](https://www.luogu.com.cn/problem/P2534)
{% endfold %}

### Part 3.8 DLX｜近似忽略

{% fold info @DLX 题单 %}
- [ ] [P4929 【模板】舞蹈链（DLX）](https://www.luogu.com.cn/problem/P4929)
- [ ] [P4205 [NOI2005] 智慧珠游戏](https://www.luogu.com.cn/problem/P4205)
{% endfold %}

## Part 4 动态规划

### Part 4.1 线性 DP 与序列模型｜主线

- [ ] [P1216 数字三角形](https://www.luogu.com.cn/problem/P1216)
- [x] [P1020 导弹拦截](https://www.luogu.com.cn/problem/P1020)
- [ ] [P1091 合唱队形](https://www.luogu.com.cn/problem/P1091)
- [ ] [P1095 守望者的逃离](https://www.luogu.com.cn/problem/P1095)
- [x] [P1541 乌龟棋](https://www.luogu.com.cn/problem/P1541)
- [x] [P1868 饥饿的奶牛](https://www.luogu.com.cn/problem/P1868)
- [x] [P2679 子串](https://www.luogu.com.cn/problem/P2679)
- [ ] [P2501 [HAOI2006] 数字序列](https://www.luogu.com.cn/problem/P2501)
- [ ] [P3336 [ZJOI2013] 话旧](https://www.luogu.com.cn/problem/P3336)
- [ ] [P3558 [POI2013] BAJ-Bytecomputer](https://www.luogu.com.cn/problem/P3558)
- [ ] [P4158 [SCOI2009] 粉刷匠](https://www.luogu.com.cn/problem/P4158)
- [ ] [P5301 [GXOI/GZOI2019] 宝牌一大堆](https://www.luogu.com.cn/problem/P5301)

- [ ] [P1192 台阶问题](https://www.luogu.com.cn/problem/P1192) `衔接`：基础递推题。
- [ ] [P1280 尼克的任务](https://www.luogu.com.cn/problem/P1280) `衔接`：带时间轴的线性 DP。
- [x] [P1020 导弹拦截](https://www.luogu.com.cn/problem/P1020) `主练`：LIS 系列经典题。
- [ ] [P1091 合唱队形](https://www.luogu.com.cn/problem/P1091) `主练`：双向序列 DP。
- [ ] [P1439 两个排列的最长公共子序列](https://www.luogu.com.cn/problem/P1439) `主练`：排列条件下的 LCS 变形。
- [ ] [P1233 木棍加工](https://www.luogu.com.cn/problem/P1233) `主练`：排序与 LIS 模型结合。
- [ ] [P4310 绝世好题](https://www.luogu.com.cn/problem/P4310) `主练`：带位运算条件的子序列 DP。
- [ ] [P1799 数列](https://www.luogu.com.cn/problem/P1799) `主练`：位置随删除变化的序列 DP。
- [ ] [P1944 最长括号匹配](https://www.luogu.com.cn/problem/P1944) `主练`：括号串上的线性 DP。
- [ ] [P2519 problem a](https://www.luogu.com.cn/problem/P2519) `挑战`：先把陈述转成若干合法区段。
- [ ] [P6902 Surveillance](https://www.luogu.com.cn/problem/P6902) `挑战`：环形覆盖综合题。
- [ ] [P2285 [HNOI2004] 打鼹鼠](https://www.luogu.com.cn/problem/P2285) `衔接`：二维时空条件的线性 DP。
- [ ] [P4933 大师](https://www.luogu.com.cn/problem/P4933) `主练`：按差值分类的序列 DP。

### Part 4.2 字符串与子序列 DP｜主线

- [ ] [P1140 相似基因](https://www.luogu.com.cn/problem/P1140) `衔接`：序列匹配 DP 的标准练习。
- [ ] [P2516 最长公共子序列](https://www.luogu.com.cn/problem/P2516) `主练`：在经典 LCS 上增加计数。
- [ ] [CF245H Queries for Number of Palindromes](https://www.luogu.com.cn/problem/CF245H) `主练`：回文区间预处理与二维计数结合。
- [ ] [P2890 Cheapest Palindrome G](https://www.luogu.com.cn/problem/P2890) `主练`：回文目标下的字符串 DP。
- [ ] [P4170 涂色](https://www.luogu.com.cn/problem/P4170) `主练`：字符串区间 DP 代表题。
- [x] [P2679 子串](https://www.luogu.com.cn/problem/P2679) `主练`：多维字符串计数 DP。
- [ ] [CF149D Coloring Brackets](https://www.luogu.com.cn/problem/CF149D) `挑战`：括号结构与区间计数综合题。
- [ ] [P1385 密令](https://www.luogu.com.cn/problem/P1385) `挑战`：字符串计数问题。
- [ ] [P4045 密码](https://www.luogu.com.cn/problem/P4045) `挑战`：字符串自动机与状态压缩 DP 的交叉题。
- [ ] [P2758 编辑距离](https://www.luogu.com.cn/problem/P2758) `衔接`：经典序列对齐 DP。
- [ ] [P1854 [IOI1999] 花店橱窗布置](https://www.luogu.com.cn/problem/P1854) `主练`：序列匹配与方案恢复。

### Part 4.3 网格 / 路径 / 多维 DP｜主线

- [ ] [P1216 数字三角形](https://www.luogu.com.cn/problem/P1216) `衔接`：路径 DP 入门。
- [ ] [P1002 过河卒](https://www.luogu.com.cn/problem/P1002) `衔接`：带禁用位置的网格计数。
- [ ] [P1004 方格取数](https://www.luogu.com.cn/problem/P1004) `主练`：双路径同步 DP 的经典入口。
- [ ] [P1006 传纸条](https://www.luogu.com.cn/problem/P1006) `主练`：与 P1004 同模型。
- [ ] [P1941 飞扬的小鸟](https://www.luogu.com.cn/problem/P1941) `主练`：多种动作与高度限制结合。
- [ ] [P1070 道路游戏](https://www.luogu.com.cn/problem/P1070) `主练`：环形时间与阶段决策结合。
- [ ] [P2051 中国象棋](https://www.luogu.com.cn/problem/P2051) `主练`：棋盘逐行计数 DP。
- [ ] [P5017 摆渡车](https://www.luogu.com.cn/problem/P5017) `主练`：时间轴上的分组决策。
- [ ] [P1758 管道取珠](https://www.luogu.com.cn/problem/P1758) `挑战`：多序列取元素的计数与平方贡献问题。
- [ ] [P5307 Mobitel](https://www.luogu.com.cn/problem/P5307) `挑战`：网格路径计数与乘积条件结合。
- [ ] [P6764 粉刷墙壁](https://www.luogu.com.cn/problem/P6764) `挑战`：合法区间预处理与最少段覆盖结合。

### Part 4.4 背包 DP｜主线

- [ ] [P1048 采药](https://www.luogu.com.cn/problem/P1048)
- [ ] [P1060 开心的金明](https://www.luogu.com.cn/problem/P1060)
- [ ] [P1855 榨取kkksc03](https://www.luogu.com.cn/problem/P1855)
- [x] [P5020 货币系统](https://www.luogu.com.cn/problem/P5020)
- [x] [P1757 通天之分组背包](https://www.luogu.com.cn/problem/P1757)
- [x] [P1064 金明的预算方案](https://www.luogu.com.cn/problem/P1064)
- [x] [P2946 [USACO09MAR] Cow Frisbee Team](https://www.luogu.com.cn/problem/P2946)
- [x] [P1156 垃圾陷阱](https://www.luogu.com.cn/problem/P1156)
- [x] [P5322 [BJOI2019] 排兵布阵](https://www.luogu.com.cn/problem/P5322)
- [ ] [P5289 [十二省联考2019] 皮配](https://www.luogu.com.cn/problem/P5289)

- [ ] [P1048 采药](https://www.luogu.com.cn/problem/P1048) `衔接`：0/1 背包基础题。
- [ ] [P1616 疯狂的采药](https://www.luogu.com.cn/problem/P1616) `衔接`：完全背包基础题。
- [x] [P1064 金明的预算方案](https://www.luogu.com.cn/problem/P1064) `主练`：带依赖关系的背包入门。
- [ ] [P1776 宝物筛选](https://www.luogu.com.cn/problem/P1776) `主练`：多重背包代表题。
- [ ] [CF106C Buns](https://www.luogu.com.cn/problem/CF106C) `主练`：混合背包题。
- [x] [P5020 货币系统](https://www.luogu.com.cn/problem/P5020) `主练`：完全背包的可表示性应用。
- [ ] [P5322 排兵布阵](https://www.luogu.com.cn/problem/P5322) `主练`：分组选择与收益函数结合。
- [ ] [P1537 弹珠](https://www.luogu.com.cn/problem/P1537) `主练`：多重背包可行性问题。
- [ ] [P1450 硬币购物](https://www.luogu.com.cn/problem/P1450) `主练`：完全背包、查询限制与容斥结合。
- [ ] [P1174 打砖块](https://www.luogu.com.cn/problem/P1174) `挑战`：多列前缀选择与资源限制结合。
- [ ] [P3188 梦幻岛宝珠](https://www.luogu.com.cn/problem/P3188) `挑战`：容量极大但重量结构特殊。
- [ ] [P4138 挂饰](https://www.luogu.com.cn/problem/P4138) `挑战`：约束会随选择变化的背包。
- [ ] [CF1111D Destroy the Colony](https://www.luogu.com.cn/problem/CF1111D) `挑战`：计数背包与组合数学结合。
- [ ] [P5289 皮配](https://www.luogu.com.cn/problem/P5289) `挑战`：多重容量限制与分组规则综合。
- [ ] [P2340 [USACO03FALL] Cow Exhibition G](https://www.luogu.com.cn/problem/P2340) `主练`：正负权双维 DP。

### Part 4.5 区间 DP｜主线

- [x] [P1880 [NOI1995] 石子合并](https://www.luogu.com.cn/problem/P1880)
- [x] [P3146 [USACO16OPEN] 248](https://www.luogu.com.cn/problem/P3146)
- [x] [P1063 能量项链](https://www.luogu.com.cn/problem/P1063)
- [ ] [P1005 矩阵取数游戏](https://www.luogu.com.cn/problem/P1005)
- [x] [P4170 [CQOI2007] 涂色](https://www.luogu.com.cn/problem/P4170)
- [x] [P4302 [SCOI2003] 字符串折叠](https://www.luogu.com.cn/problem/P4302)
- [ ] [P2466 [SDOI2008] Sue 的小球](https://www.luogu.com.cn/problem/P2466)

- [ ] [P1775 石子合并（弱化版）](https://www.luogu.com.cn/problem/P1775) `衔接`：作为 P1880 前置。
- [ ] [P1880 石子合并](https://www.luogu.com.cn/problem/P1880) `主练`：环形区间 DP 代表题。
- [x] [P1063 能量项链](https://www.luogu.com.cn/problem/P1063) `主练`：环形区间 DP。
- [ ] [P1040 加分二叉树](https://www.luogu.com.cn/problem/P1040) `主练`：区间 DP 与方案恢复结合。
- [ ] [P1018 乘积最大](https://www.luogu.com.cn/problem/P1018) `主练`：划分型区间 DP。
- [ ] [P1220 关路灯](https://www.luogu.com.cn/problem/P1220) `主练`：区间扩展 DP。
- [ ] [P3205 合唱队](https://www.luogu.com.cn/problem/P3205) `主练`：从两端构造序列的计数 DP。
- [ ] [P1622 释放囚犯](https://www.luogu.com.cn/problem/P1622) `主练`：操作顺序转区间划分的经典题。
- [ ] [P5851 Greedy Pie Eaters P](https://www.luogu.com.cn/problem/P5851) `挑战`：区间贡献与最优划分综合。
- [ ] [P5336 成绩单](https://www.luogu.com.cn/problem/P5336) `挑战`：区间批次划分与内部极值代价结合。
- [ ] [P3592 洗车](https://www.luogu.com.cn/problem/P3592) `挑战`：带构造要求的区间 DP。
- [ ] [P3147 [USACO16OPEN] 262144 P](https://www.luogu.com.cn/problem/P3147) `挑战`：区间合并式 DP / 倍增状态。
- [ ] [P1435 [IOI2000] 回文字串](https://www.luogu.com.cn/problem/P1435) `衔接`：回文目标的区间 DP。
- [ ] [CF607B Zuma](https://www.luogu.com.cn/problem/CF607B) `主练`：区间合并 DP。
- [ ] [P4290 [HAOI2008] 玩具取名](https://www.luogu.com.cn/problem/P4290) `主练`：区间文法 DP。
- [ ] [P4342 [IOI1998] Polygon](https://www.luogu.com.cn/problem/P4342) `挑战`：环形区间 DP + min/max。

### Part 4.6 树形 DP / 树上背包｜主线

- [x] [P1352 没有上司的舞会](https://www.luogu.com.cn/problem/P1352)
- [ ] [P1040 加分二叉树](https://www.luogu.com.cn/problem/P1040)
- [ ] [P1122 最大子树和](https://www.luogu.com.cn/problem/P1122)
- [x] [P1273 有线电视网](https://www.luogu.com.cn/problem/P1273)
- [x] [P2014 选课](https://www.luogu.com.cn/problem/P2014)
- [ ] [P2585 [ZJOI2006] 三色二叉树](https://www.luogu.com.cn/problem/P2585)
- [ ] [P3047 [USACO12FEB] Nearby Cows](https://www.luogu.com.cn/problem/P3047)
- [ ] [P3698 [CQOI2017] 小Q的棋盘](https://www.luogu.com.cn/problem/P3698)
- [ ] [P5658 括号树](https://www.luogu.com.cn/problem/P5658)
- [x] [P2607 [ZJOI2008] 骑士](https://www.luogu.com.cn/problem/P2607)
- [x] [P3177 [HAOI2015] 树上染色](https://www.luogu.com.cn/problem/P3177)
- [ ] [P4395 [BOI2003] Gem](https://www.luogu.com.cn/problem/P4395)
- [ ] [P4516 [JSOI2018] 潜入行动](https://www.luogu.com.cn/problem/P4516)

- [x] [P1352 没有上司的舞会](https://www.luogu.com.cn/problem/P1352) `衔接`：树形 DP 入门。
- [ ] [P1122 最大子树和](https://www.luogu.com.cn/problem/P1122) `衔接`：树上连通块最优值。
- [ ] [P2015 二叉苹果树](https://www.luogu.com.cn/problem/P2015) `主练`：树上背包经典题。
- [x] [P2014 选课](https://www.luogu.com.cn/problem/P2014) `主练`：依赖型树上背包。
- [x] [P1273 有线电视网](https://www.luogu.com.cn/problem/P1273) `衔接`：树上背包的收益版本。
- [ ] [P2585 三色二叉树](https://www.luogu.com.cn/problem/P2585) `主练`：树形状态分类题。
- [ ] [P1131 时态同步](https://www.luogu.com.cn/problem/P1131) `主练`：树上代价平衡问题。
- [ ] [P5658 括号树](https://www.luogu.com.cn/problem/P5658) `主练`：根路径括号信息与树形统计结合。
- [ ] [P3574 FAR-FarmCraft](https://www.luogu.com.cn/problem/P3574) `主练`：树形 DP 与子树访问顺序结合。
- [ ] [P4438 道路](https://www.luogu.com.cn/problem/P4438) `挑战`：多层树形决策题。
- [ ] [P2515 软件安装](https://www.luogu.com.cn/problem/P2515) `挑战`：强连通缩点后进行依赖背包。
- [ ] [P2305 购票](https://www.luogu.com.cn/problem/P2305) `挑战`：树上祖先转移与优化结构结合。
- [ ] [P5666 树的重心](https://www.luogu.com.cn/problem/P5666) `衔接`：重心性质与删除点后的连通块大小。
- [ ] [P5536 核心城市](https://www.luogu.com.cn/problem/P5536) `主练`：围绕树的核心部分进行选择。
- [ ] [P2726 树的双中心](https://www.luogu.com.cn/problem/P2726) `主练`：从单中心扩展到双中心。
- [ ] [P1351 联合权值](https://www.luogu.com.cn/problem/P1351) `主练`：距离为二的点对统计。
- [ ] [P7073 表达式](https://www.luogu.com.cn/problem/P7073) `衔接`：表达式树求值与修改影响。
- [ ] [P3478 STA-Station](https://www.luogu.com.cn/problem/P3478) `主练`：换根 DP 经典题。
- [ ] [P2607 骑士](https://www.luogu.com.cn/problem/P2607) `主练`：基环树 DP。
- [ ] [P5024 保卫王国](https://www.luogu.com.cn/problem/P5024) `挑战`：树形 DP 与多次强制选择询问。
- [ ] [P2016 [SEERC2000] 战略游戏](https://www.luogu.com.cn/problem/P2016) `主练`：树上最小点覆盖 DP。
- [ ] [P4099 [HEOI2013] SAO](https://www.luogu.com.cn/problem/P4099) `挑战`：树 / 图上的计数 DP。

### Part 4.7 换根 DP｜主线

原题单没有独立成章。重点训练“先算一个根，再沿边转移整树答案”。

- [x] [P3478 [POI2008] STA-Station](https://www.luogu.com.cn/problem/P3478)
- [ ] [CF1092F Tree with Maximum Cost](https://www.luogu.com.cn/problem/CF1092F)
- [ ] [P2986 [USACO10MAR] Great Cow Gathering](https://www.luogu.com.cn/problem/P2986)

### Part 4.8 DAG / 图上 DP / 拓扑递推｜主线

- [x] [P3387 缩点](https://www.luogu.com.cn/problem/P3387) `衔接`：作为 SCC + DAG DP 的标准入口。
- [ ] [P4316 绿豆蛙的归宿](https://www.luogu.com.cn/problem/P4316) `衔接`：DAG 上期望 DP 入门。
- [ ] [P2656 采蘑菇](https://www.luogu.com.cn/problem/P2656) `主练`：强连通分量与 DAG 最优路径结合。
- [ ] [P1613 跑路](https://www.luogu.com.cn/problem/P1613) `主练`：路径长度状态与图最短路结合。
- [ ] [P3953 逛公园](https://www.luogu.com.cn/problem/P3953) `主练`：最短路、有限冗余路径计数与环判定综合题。
- [ ] [P7077 函数调用](https://www.luogu.com.cn/problem/P7077) `主练`：调用图上的贡献传播。
- [ ] [P6772 美食家](https://www.luogu.com.cn/problem/P6772) `挑战`：时间限制下的图上最优路径。
- [ ] [P7516 图函数](https://www.luogu.com.cn/problem/P7516) `挑战`：有向图可达关系与删边过程综合。
- [ ] [CF960F Pathwalks](https://www.luogu.com.cn/problem/CF960F) `挑战`：动态权值 DP + 数据结构。

### Part 4.9 状态压缩 DP｜主线

- [ ] [P2704 [NOI2001] 炮兵阵地](https://www.luogu.com.cn/problem/P2704)
- [ ] [P1879 [USACO06NOV] Corn Fields](https://www.luogu.com.cn/problem/P1879)
- [x] [P1896 [SCOI2005] 互不侵犯](https://www.luogu.com.cn/problem/P1896)
- [ ] [P3092 [USACO13NOV] No Change](https://www.luogu.com.cn/problem/P3092)
- [ ] [P3694 邦邦的大合唱站队](https://www.luogu.com.cn/problem/P3694)
- [ ] [P4925 [1007] Scarlet的字符串不可能这么可爱](https://www.luogu.com.cn/problem/P4925)
- [ ] [P2157 [SDOI2009] 学校食堂](https://www.luogu.com.cn/problem/P2157)
- [ ] [P2167 [SDOI2009] Bill 的挑战](https://www.luogu.com.cn/problem/P2167)
- [ ] [P2396 yyy loves Maths VII](https://www.luogu.com.cn/problem/P2396)
- [x] [P4363 [九省联考2018] 一双木棋](https://www.luogu.com.cn/problem/P4363)
- [ ] [P5005 中国象棋 - 摆上马](https://www.luogu.com.cn/problem/P5005)
- [ ] [P2150 [NOI2015] 寿司晚宴](https://www.luogu.com.cn/problem/P2150)

- [ ] [P1441 砝码称重](https://www.luogu.com.cn/problem/P1441) `衔接`：子集枚举与可达重量 DP 结合。
- [ ] [P2622 关灯问题 II](https://www.luogu.com.cn/problem/P2622) `衔接`：最短操作次数的状态 DP。
- [ ] [P1896 互不侵犯](https://www.luogu.com.cn/problem/P1896) `主练`：棋盘轮廓 DP 入门。
- [ ] [P1879 Corn Fields G](https://www.luogu.com.cn/problem/P1879) `主练`：与 P1896 同类。
- [ ] [P2704 炮兵阵地](https://www.luogu.com.cn/problem/P2704) `主练`：多行相关的轮廓 DP。
- [ ] [CF11D A Simple Task](https://www.luogu.com.cn/problem/CF11D) `主练`：子集 DP 计数简单环。
- [ ] [P2831 愤怒的小鸟](https://www.luogu.com.cn/problem/P2831) `主练`：集合覆盖型状压 DP。
- [ ] [P3959 宝藏](https://www.luogu.com.cn/problem/P3959) `主练`：分层扩展的子集 DP。
- [ ] [P3694 邦邦的大合唱站队](https://www.luogu.com.cn/problem/P3694) `主练`：类别顺序的子集 DP。
- [ ] [P4363 一双木棋 chess](https://www.luogu.com.cn/problem/P4363) `主练`：轮流决策与局面压缩结合。
- [ ] [P1357 花园](https://www.luogu.com.cn/problem/P1357) `主练`：循环轮廓 DP 与矩阵加速结合。
- [ ] [P4484 最长上升子序列](https://www.luogu.com.cn/problem/P4484) `挑战`：围绕 LIS 结构进行高阶计数。
- [ ] [P5369 最大前缀和](https://www.luogu.com.cn/problem/P5369) `挑战`：随机排列目标与子集状态结合。
- [ ] [P5492 随机算法](https://www.luogu.com.cn/problem/P5492) `挑战`：随机过程与子集 DP 综合。
- [ ] [AT_agc012_e [AGC012E] Camel and Oases](https://www.luogu.com.cn/problem/AT_agc012_e) `挑战`：高阶状态压缩 / 区间结构。
- [ ] [CF1209E2 Rotate Columns (hard version)](https://www.luogu.com.cn/problem/CF1209E2) `挑战`：列压缩 + 状压 DP。
- [ ] [P2761 软件补丁问题](https://www.luogu.com.cn/problem/P2761) `主练`：状态图最短路 / 状压。
- [ ] [P10865 [HBCPC2024] Genshin Impact Startup Forbidden III](https://www.luogu.com.cn/problem/P10865) `挑战`：较新的状态压缩训练。

### Part 4.10 SOS DP / 子集和 DP｜主线

- [ ] [CF165E Compatible Numbers](https://www.luogu.com.cn/problem/CF165E)
- [ ] [CF449D Jzzhu and Numbers](https://www.luogu.com.cn/problem/CF449D)
- [ ] [AT_arc100_c [ARC100E] Or Plus Max](https://www.luogu.com.cn/problem/AT_arc100_c)

### Part 4.11 计数 DP / 概率与期望 DP｜进阶主线

- [ ] [P1297 单选错位](https://www.luogu.com.cn/problem/P1297) `衔接`：线性期望入门。
- [ ] [P1365 WJMZBMR 打 osu! / Easy](https://www.luogu.com.cn/problem/P1365) `衔接`：作为连续成功类期望 DP 的前置。
- [ ] [P1654 OSU!](https://www.luogu.com.cn/problem/P1654) `主练`：连续段贡献的期望 DP。
- [ ] [P1850 换教室](https://www.luogu.com.cn/problem/P1850) `主练`：决策与随机位置结合。
- [ ] [P2473 奖励关](https://www.luogu.com.cn/problem/P2473) `主练`：状态压缩期望 DP。
- [ ] [P1025 数的划分](https://www.luogu.com.cn/problem/P1025) `衔接`：整数划分计数入门。
- [ ] [CF1061C Multiplicity](https://www.luogu.com.cn/problem/CF1061C) `主练`：子序列计数与因数关系结合。
- [ ] [P2513 逆序对数列](https://www.luogu.com.cn/problem/P2513) `主练`：排列统计 DP。
- [ ] [P2467 地精部落](https://www.luogu.com.cn/problem/P2467) `主练`：排列结构计数。
- [ ] [P5664 Emiya 家今天的饭](https://www.luogu.com.cn/problem/P5664) `主练`：多类别选择计数。
- [ ] [P6835 线形生物](https://www.luogu.com.cn/problem/P6835) `主练`：返祖边上的期望递推。
- [ ] [P4492 苹果树](https://www.luogu.com.cn/problem/P4492) `挑战`：随机生长树的距离和期望。
- [ ] [CF708E Student's Camp](https://www.luogu.com.cn/problem/CF708E) `挑战`：多日随机变化的概率 DP。
- [ ] [P3824 泳池](https://www.luogu.com.cn/problem/P3824) `挑战`：最大矩形面积的概率分布。
- [ ] [P7097 牵丝戏](https://www.luogu.com.cn/problem/P7097) `挑战`：博弈、资源选择与回合状态结合。

### Part 4.12 倍增优化 DP｜进阶主线

- [ ] [P1613 跑路](https://www.luogu.com.cn/problem/P1613)
- [ ] [P1081 开车旅行](https://www.luogu.com.cn/problem/P1081)
- [ ] [P5024 保卫王国](https://www.luogu.com.cn/problem/P5024)

- [ ] [P7167 [eJOI 2020] Fountain (Day1)](https://www.luogu.com.cn/problem/P7167) `主练`：倍增维护跳转。
- [ ] [P3509 [POI2010] ZAB-Frog](https://www.luogu.com.cn/problem/P3509) `主练`：倍增处理函数式跳转。
- [ ] [P4155 [SCOI2015] 国旗计划](https://www.luogu.com.cn/problem/P4155) `挑战`：环形区间覆盖 + 倍增。
- [ ] [P7562 [JOISC 2021] Event Hopping 2](https://www.luogu.com.cn/problem/P7562) `挑战`：高阶倍增 / 离线跳转。

### Part 4.13 数据结构优化 DP｜进阶主线

- [ ] [P4719 【模板】动态 DP](https://www.luogu.com.cn/problem/P4719)
- [ ] [P4751 动态 DP（加强版）](https://www.luogu.com.cn/problem/P4751)
- [ ] [P3287 [SCOI2014] 方伯伯的玉米田](https://www.luogu.com.cn/problem/P3287)
- [ ] [P2605 [ZJOI2010] 基站选址](https://www.luogu.com.cn/problem/P2605)

### Part 4.14 单调队列优化 DP｜主线

- [ ] [P1776 宝物筛选](https://www.luogu.com.cn/problem/P1776)
- [ ] [P3089 [USACO13NOV] Pogo-Cow](https://www.luogu.com.cn/problem/P3089)
- [ ] [P3572 [POI2014] Little Bird](https://www.luogu.com.cn/problem/P3572)
- [ ] [P3522 [POI2011] Temperature](https://www.luogu.com.cn/problem/P3522)
- [ ] [P4544 [USACO10NOV] Buying Feed](https://www.luogu.com.cn/problem/P4544)
- [ ] [P5665 划分](https://www.luogu.com.cn/problem/P5665)
- [ ] [P1973 [NOI2011] Noi嘉年华](https://www.luogu.com.cn/problem/P1973)
- [ ] [P2569 [SCOI2010] 股票交易](https://www.luogu.com.cn/problem/P2569)
- [ ] [P4852 yyf hates choukapai](https://www.luogu.com.cn/problem/P4852)

- [ ] [P1714 切蛋糕](https://www.luogu.com.cn/problem/P1714) `衔接`：前缀信息与单调队列的经典结合。
- [ ] [P2034 选择数字](https://www.luogu.com.cn/problem/P2034) `主练`：练习从朴素 DP 过渡到窗口优化。
- [ ] [P2627 Mowing the Lawn G](https://www.luogu.com.cn/problem/P2627) `主练`：与 P2034 模型接近。
- [ ] [P3800 Power 收集](https://www.luogu.com.cn/problem/P3800) `主练`：分层 DP 与单调队列结合。
- [ ] [P3957 跳房子](https://www.luogu.com.cn/problem/P3957) `主练`：参数判定、DP 与单调队列的综合应用。
- [ ] [P2254 瑰丽华尔兹](https://www.luogu.com.cn/problem/P2254) `挑战`：多阶段、多方向转移。
- [ ] [P2569 股票交易](https://www.luogu.com.cn/problem/P2569) `挑战`：状态和限制较多。

### Part 4.15 斜率优化 DP / 直线维护｜主线

- [ ] [P2900 [USACO08MAR] Land Acquisition](https://www.luogu.com.cn/problem/P2900)
- [ ] [P3195 [HNOI2008] 玩具装箱](https://www.luogu.com.cn/problem/P3195)
- [ ] [P3628 [APIO2010] 特别行动队](https://www.luogu.com.cn/problem/P3628)
- [ ] [P3648 [APIO2014] 序列分割](https://www.luogu.com.cn/problem/P3648)
- [ ] [P4027 [NOI2007] 货币兑换](https://www.luogu.com.cn/problem/P4027)
- [ ] [P4360 [CEOI2004] 锯木厂选址](https://www.luogu.com.cn/problem/P4360)
- [ ] [P5468 [NOI2019] 回家路线](https://www.luogu.com.cn/problem/P5468)
- [ ] [P2305 [NOI2014] 购票](https://www.luogu.com.cn/problem/P2305)

- [ ] [P4097 Segment](https://www.luogu.com.cn/problem/P4097) `主练`：李超线段树代表题。
- [ ] [CF678F Lena and Queries](https://www.luogu.com.cn/problem/CF678F) `挑战`：动态加入、删除直线与在线询问综合。
- [ ] [P4027 货币兑换](https://www.luogu.com.cn/problem/P4027) `复盘`：从斜率优化或凸包维护角度复盘。
- [ ] [P5416 时空旅行](https://www.luogu.com.cn/problem/P5416) `暂存`：时间维与直线维护综合。
- [ ] [P5785 [SDOI2012] 任务安排](https://www.luogu.com.cn/problem/P5785) `主练`：斜率优化经典题。
- [ ] [P5504 [JSOI2011] 柠檬](https://www.luogu.com.cn/problem/P5504) `挑战`：分段 DP + 凸优化。

### Part 4.16 决策单调性优化 DP｜进阶主线

- [ ] [P3515 [POI2011] Lightning Conductor](https://www.luogu.com.cn/problem/P3515)
- [ ] [P4767 [IOI2000] 邮局](https://www.luogu.com.cn/problem/P4767)
- [ ] [P1912 [NOI2009] 诗人小G](https://www.luogu.com.cn/problem/P1912)
- [ ] [P1973 [NOI2011] Noi嘉年华](https://www.luogu.com.cn/problem/P1973)
- [ ] [P3724 [AH2017/HNOI2017] 大佬](https://www.luogu.com.cn/problem/P3724)
- [ ] [P5574 [CmdOI2019] 任务分配问题](https://www.luogu.com.cn/problem/P5574)

### Part 4.17 DP 优化综合｜进阶主线

- [ ] [P1725 琪露诺](https://www.luogu.com.cn/problem/P1725) `衔接`：单调队列优化 DP 的标准入口。
- [ ] [P3800 Power 收集](https://www.luogu.com.cn/problem/P3800) `主练`：分层 DP 与滑动窗口最值结合。
- [ ] [P3572 PTA-Little Bird](https://www.luogu.com.cn/problem/P3572) `主练`：多组窗口范围下的 DP 优化。
- [ ] [P6647 Tourism](https://www.luogu.com.cn/problem/P6647) `主练`：分组型线性 DP 的优化题。
- [ ] [CF833B The Bakery](https://www.luogu.com.cn/problem/CF833B) `主练`：分段 DP 与区间贡献维护结合。
- [ ] [P6189 跑步](https://www.luogu.com.cn/problem/P6189) `主练`：整数划分计数的高范围版本。
- [ ] [AT_arc081_d [ARC081F] Flip and Rectangles](https://www.luogu.com.cn/problem/AT_arc081_d) `挑战`：DP + 单调结构。
- [ ] [P5464 缩小社交圈](https://www.luogu.com.cn/problem/P5464) `挑战`：DP 状态设计 / 优化。
- [ ] [AT_arc066_d [ARC066F] Contest with Drinks Hard](https://www.luogu.com.cn/problem/AT_arc066_d) `挑战`：高阶 DP 优化。

### Part 4.18 动态 DP｜地图保留

{% fold info @动态 DP %}
- [ ] [P4751 动态 DP（加强版）](https://www.luogu.com.cn/problem/P4751) `衔接`：动态 DP 模板入口。
- [ ] [P5024 保卫王国](https://www.luogu.com.cn/problem/P5024) `主练`：树形 DP 与多次强制选择询问。
- [ ] [P6021 洪水](https://www.luogu.com.cn/problem/P6021) `挑战`：动态树形状态维护综合。
{% endfold %}

### Part 4.19 数位 DP｜主线

- [ ] [P2602 [ZJOI2010] 数字计数](https://www.luogu.com.cn/problem/P2602)
- [ ] [P3281 [SCOI2013] 数数](https://www.luogu.com.cn/problem/P3281)
- [ ] [P2518 [HAOI2010] 计数](https://www.luogu.com.cn/problem/P2518)
- [ ] [P2657 [SCOI2009] windy 数](https://www.luogu.com.cn/problem/P2657)
- [ ] [P3286 [SCOI2014] 方伯伯的商场之旅](https://www.luogu.com.cn/problem/P3286)
- [ ] [P4124 [CQOI2016] 手机号码](https://www.luogu.com.cn/problem/P4124)
- [ ] [P4999 烦人的数学作业](https://www.luogu.com.cn/problem/P4999)
- [ ] [P2606 [ZJOI2010] 排列计数](https://www.luogu.com.cn/problem/P2606)
- [ ] [P4798 [CEOI2015 Day1] 卡尔文球锦标赛](https://www.luogu.com.cn/problem/P4798)

### Part 4.20 轮廓线 / 插头 DP｜地图保留

{% fold info @轮廓线动态规划 题单 %}
- [ ] [P5056 【模板】插头 DP](https://www.luogu.com.cn/problem/P5056)
- [ ] [P2289 [HNOI2004] 邮递员](https://www.luogu.com.cn/problem/P2289)
- [ ] [P2337 [SCOI2012] 喵星人的入侵](https://www.luogu.com.cn/problem/P2337)
- [ ] [P5347 【XR-1】俄罗斯方块](https://www.luogu.com.cn/problem/P5347)
{% endfold %}

## Part 5 字符串

### Part 5.1 字符串哈希｜主线

- [ ] [P3370 【模板】字符串哈希](https://www.luogu.com.cn/problem/P3370)
- [ ] [P5270 无论怎样神树大人都会删库跑路](https://www.luogu.com.cn/problem/P5270)
- [ ] [P5537 【XR-3】系统设计](https://www.luogu.com.cn/problem/P5537)

### Part 5.2 KMP / 前缀函数｜主线

- [x] [P3375 【模板】KMP 字符串匹配](https://www.luogu.com.cn/problem/P3375)
- [x] [P4391 [BOI2009] Radio Transmission](https://www.luogu.com.cn/problem/P4391)
- [x] [P3435 [POI2006] Periods of Words](https://www.luogu.com.cn/problem/P3435)
- [x] [P4824 [USACO15FEB] Censoring (Silver)](https://www.luogu.com.cn/problem/P4824)
- [x] [P2375 [NOI2014] 动物园](https://www.luogu.com.cn/problem/P2375)
- [x] [P3426 [POI2005] Template](https://www.luogu.com.cn/problem/P3426)
- [x] [P3193 [HNOI2008] GT考试](https://www.luogu.com.cn/problem/P3193)

- [ ] [CF25E Test](https://www.luogu.com.cn/problem/CF25E) `挑战`：KMP / 字符串重叠关系。

### Part 5.3 Z 函数 / 扩展 KMP｜主线

- [ ] [P5410 【模板】扩展 KMP / exKMP（Z 函数）](https://www.luogu.com.cn/problem/P5410)
- [ ] [CF126B Password](https://www.luogu.com.cn/problem/CF126B)
- [ ] [CF432D Prefixes and Suffixes](https://www.luogu.com.cn/problem/CF432D)

### Part 5.4 Manacher｜主线

- [ ] [P3805 【模板】Manacher](https://www.luogu.com.cn/problem/P3805)
- [ ] [P4555 [国家集训队] 最长双回文串](https://www.luogu.com.cn/problem/P4555)
- [ ] [P1659 [国家集训队] 拉拉队排练](https://www.luogu.com.cn/problem/P1659)

### Part 5.5 Trie / 01-Trie｜主线

- [ ] [P3879 [TJOI2010] 阅读理解](https://www.luogu.com.cn/problem/P3879)
- [ ] [P2292 [HNOI2004] L语言](https://www.luogu.com.cn/problem/P2292)
- [ ] [P2922 [USACO08DEC] Secret Message](https://www.luogu.com.cn/problem/P2922)
- [ ] [P3065 [USACO12DEC] First!](https://www.luogu.com.cn/problem/P3065)
- [ ] [P3294 [SCOI2016] 背单词](https://www.luogu.com.cn/problem/P3294)
- [ ] [P4407 [JSOI2009] 电子字典](https://www.luogu.com.cn/problem/P4407)
- [ ] [P4551 最长异或路径](https://www.luogu.com.cn/problem/P4551)
- [ ] [P4683 [IOI2008] Type Printer](https://www.luogu.com.cn/problem/P4683)
- [ ] [P3783 [SDOI2017] 天才黑客](https://www.luogu.com.cn/problem/P3783)

- [ ] [P4551 最长异或路径](https://www.luogu.com.cn/problem/P4551) `主练`：树上异或与 01 Trie 的经典衔接题。
- [ ] [P4735 最大异或和](https://www.luogu.com.cn/problem/P4735) `主练`：可持久化 01 Trie 的标准应用。
- [ ] [P5283 异或粽子](https://www.luogu.com.cn/problem/P5283) `挑战`：区间异或候选与多路最优维护结合。
- [ ] [CF241B Friends](https://www.luogu.com.cn/problem/CF241B) `挑战`：异或点对的前若干大统计。
- [ ] [P5795 异或运算](https://www.luogu.com.cn/problem/P5795) `挑战`：多询问下的异或选择问题。
- [ ] [P1470 [IOI 1996 / USACO2.3] Longest Prefix](https://www.luogu.com.cn/problem/P1470) `主练`：Trie / DP / 前缀可达性。
- [ ] [P1481 魔族密码](https://www.luogu.com.cn/problem/P1481) `衔接`：Trie 前缀关系。
- [ ] [P2580 于是他错误的点名开始了](https://www.luogu.com.cn/problem/P2580) `衔接`：Trie 基础应用。
- [ ] [P6824 「EZEC-4」可乐](https://www.luogu.com.cn/problem/P6824) `挑战`：字符串 / 数据结构综合。

### Part 5.6 AC 自动机｜主线

- [x] [P3808 【模板】AC 自动机（简单版）](https://www.luogu.com.cn/problem/P3808)
- [x] [P3796 【模板】AC 自动机（加强版）](https://www.luogu.com.cn/problem/P3796)
- [x] [P5357 【模板】AC 自动机（二次加强版）](https://www.luogu.com.cn/problem/P5357)
- [ ] [P3121 [USACO15FEB] Censoring (Gold)](https://www.luogu.com.cn/problem/P3121)
- [ ] [P2414 [NOI2011] 阿狸的打字机](https://www.luogu.com.cn/problem/P2414)
- [ ] [P3966 [TJOI2013] 单词](https://www.luogu.com.cn/problem/P3966)
- [ ] [P2444 [POI2000] 病毒](https://www.luogu.com.cn/problem/P2444)
- [ ] [P3311 [SDOI2014] 数数](https://www.luogu.com.cn/problem/P3311)
- [ ] [P4052 [JSOI2007] 文本生成器](https://www.luogu.com.cn/problem/P4052)
- [ ] [P5599 【XR-4】文本编辑器](https://www.luogu.com.cn/problem/P5599)

### Part 5.7 回文自动机 PAM｜地图保留

{% fold info @回文自动机 PAM 题单 %}
- [ ] [P5496 【模板】回文自动机（PAM）](https://www.luogu.com.cn/problem/P5496)
- [ ] [P3649 [APIO2014] 回文串](https://www.luogu.com.cn/problem/P3649)
- [ ] [P4287 [SHOI2011] 双倍回文](https://www.luogu.com.cn/problem/P4287)
- [ ] [P4762 [CERC2014] Virus synthesis](https://www.luogu.com.cn/problem/P4762)
{% endfold %}

### Part 5.8 后缀数组 SA｜进阶主线

- [ ] [P3809 【模板】后缀排序](https://www.luogu.com.cn/problem/P3809)
- [ ] [P5353 【模板】树上后缀排序](https://www.luogu.com.cn/problem/P5353)
- [ ] [P2336 [SCOI2012] 喵星球上的点名](https://www.luogu.com.cn/problem/P2336)
- [ ] [P2463 [SDOI2008] Sandy 的卡片](https://www.luogu.com.cn/problem/P2463)
- [ ] [P2852 [USACO06DEC] Milk Patterns](https://www.luogu.com.cn/problem/P2852)
- [ ] [P4051 [JSOI2007] 字符加密](https://www.luogu.com.cn/problem/P4051)
- [ ] [P1117 [NOI2016] 优秀的拆分](https://www.luogu.com.cn/problem/P1117)
- [ ] [P2178 [NOI2015] 品酒大会](https://www.luogu.com.cn/problem/P2178)
- [ ] [P5346 【XR-1】柯南家族](https://www.luogu.com.cn/problem/P5346)
- [ ] [P5576 [CmdOI2019] 口头禅](https://www.luogu.com.cn/problem/P5576)

### Part 5.9 后缀自动机 SAM｜进阶主线

- [ ] [P3804 【模板】后缀自动机](https://www.luogu.com.cn/problem/P3804)
- [ ] [P3649 [APIO2014] 回文串](https://www.luogu.com.cn/problem/P3649)
- [ ] [P3975 [TJOI2015] 弦论](https://www.luogu.com.cn/problem/P3975)
- [ ] [P4248 [AHOI2013] 差异](https://www.luogu.com.cn/problem/P4248)
- [ ] [P5341 [TJOI2019] 甲苯先生和大中锋的字符串](https://www.luogu.com.cn/problem/P5341)
- [ ] [P4770 [NOI2018] 你的名字](https://www.luogu.com.cn/problem/P4770)
- [ ] [P5284 [十二省联考2019] 字符串问题](https://www.luogu.com.cn/problem/P5284)
- [ ] [P5319 [BJOI2019] 奥术神杖](https://www.luogu.com.cn/problem/P5319)

## Part 6 数学

### Part 6.1 位运算｜主线

- [ ] [P5657 格雷码](https://www.luogu.com.cn/problem/P5657)
- [ ] [P5514 [MtOI2019] 永夜的报应](https://www.luogu.com.cn/problem/P5514)
- [ ] [P5538 【XR-3】Namid[A]me](https://www.luogu.com.cn/problem/P5538)
- [ ] [P5539 【XR-3】Unknown Mother-Goose](https://www.luogu.com.cn/problem/P5539)
- [ ] [P5523 [yLOI2019] 珍珠](https://www.luogu.com.cn/problem/P5523)

### Part 6.2 SOS DP / 子集枚举工具｜主线

- [ ] [CF165E Compatible Numbers](https://www.luogu.com.cn/problem/CF165E)
- [ ] [CF449D Jzzhu and Numbers](https://www.luogu.com.cn/problem/CF449D)

### Part 6.3 素数与因数分解｜进阶主线

- [x] [P4718 【模板】Pollard-Rho 算法](https://www.luogu.com.cn/problem/P4718)
- [x] [P1075 质因数分解](https://www.luogu.com.cn/problem/P1075)
- [ ] [P2441 角色属性树](https://www.luogu.com.cn/problem/P2441)
- [ ] [P5535 【XR-3】小道消息](https://www.luogu.com.cn/problem/P5535)

### Part 6.4 最大公约数｜主线

- [ ] [P5435 【模板】快速 GCD](https://www.luogu.com.cn/problem/P5435)
- [ ] [P5436 【XR-2】缘分](https://www.luogu.com.cn/problem/P5436)
- [x] [P1029 最大公约数和最小公倍数问题](https://www.luogu.com.cn/problem/P1029)
- [x] [P1414 又是毕业季 II](https://www.luogu.com.cn/problem/P1414)
- [ ] [P2152 [SDOI2009] SuperGCD](https://www.luogu.com.cn/problem/P2152)
- [x] [P1072 Hankson 的趣味题](https://www.luogu.com.cn/problem/P1072)

### Part 6.5 欧拉函数与整除分块｜主线

- [x] [P2158 [SDOI2008] 仪仗队](https://www.luogu.com.cn/problem/P2158)
- [x] [P2568 GCD](https://www.luogu.com.cn/problem/P2568)
- [x] [P2398 GCD SUM](https://www.luogu.com.cn/problem/P2398)
- [ ] [P4139 上帝与集合的正确用法](https://www.luogu.com.cn/problem/P4139)

- [ ] [P5091 【模板】扩展欧拉定理](https://www.luogu.com.cn/problem/P5091) `主练`：大指数模幂。
- [ ] [P2303 [SDOI2012] Longge 的问题](https://www.luogu.com.cn/problem/P2303) `主练`：欧拉函数与 gcd 分类。
- [ ] [P2261 [CQOI2007] 余数求和](https://www.luogu.com.cn/problem/P2261) `主练`：整除分块。
- [ ] [P4139 上帝与集合的正确用法](https://www.luogu.com.cn/problem/P4139) `挑战`：欧拉降幂递归。

### Part 6.6 线性同余方程 / 乘法逆元｜主线

- [x] [P4549 【模板】裴蜀定理](https://www.luogu.com.cn/problem/P4549)
- [ ] [P2613 【模板】有理数取余](https://www.luogu.com.cn/problem/P2613)
- [x] [P3811 【模板】乘法逆元](https://www.luogu.com.cn/problem/P3811)
- [ ] [P5431 【模板】乘法逆元2](https://www.luogu.com.cn/problem/P5431)
- [x] [P1082 同余方程](https://www.luogu.com.cn/problem/P1082)
- [ ] [P3951 小凯的疑惑](https://www.luogu.com.cn/problem/P3951)
- [x] [P1516 青蛙的约会](https://www.luogu.com.cn/problem/P1516)

### Part 6.7 中国剩余定理 CRT｜主线

- [x] [P4777 【模板】扩展中国剩余定理（EXCRT）](https://www.luogu.com.cn/problem/P4777)
- [x] [P3868 [TJOI2009] 猜数字](https://www.luogu.com.cn/problem/P3868)
- [ ] [P2480 [SDOI2010] 古代猪文](https://www.luogu.com.cn/problem/P2480)
- [ ] [P4774 [NOI2018] 屠龙勇士](https://www.luogu.com.cn/problem/P4774)
- [ ] [P5345 【XR-1】快乐肥宅](https://www.luogu.com.cn/problem/P5345)

### Part 6.8 高次同余 / BSGS / 二次剩余｜进阶主线

- [x] [P4195 【模板】exBSGS](https://www.luogu.com.cn/problem/P4195)
- [x] [P5491 【模板】二次剩余](https://www.luogu.com.cn/problem/P5491)
- [ ] [P3306 [SDOI2013] 随机数生成器](https://www.luogu.com.cn/problem/P3306)
- [ ] [P2485 [SDOI2011] 计算器](https://www.luogu.com.cn/problem/P2485)

### Part 6.9 博弈论｜主线

- [x] [P2197 【模板】Nim 游戏](https://www.luogu.com.cn/problem/P2197)
- [x] [P1288 取数游戏 II](https://www.luogu.com.cn/problem/P1288)
- [x] [P1290 欧几里德的游戏](https://www.luogu.com.cn/problem/P1290)
- [ ] [P1247 取火柴游戏](https://www.luogu.com.cn/problem/P1247)
- [ ] [P2252 取石子游戏](https://www.luogu.com.cn/problem/P2252)

### Part 6.10 Sprague–Grundy｜主线

原题单没有把 SG 理论独立成节。学习时补 mex、子游戏分解和 SG 异或，不需要额外把 Nim 题重复刷一遍。

- [x] [P2197 【模板】Nim 游戏](https://www.luogu.com.cn/problem/P2197)

### Part 6.11 概率与期望｜主线

- [ ] [P5104 红包发红包](https://www.luogu.com.cn/problem/P5104)
- [ ] [P1850 换教室](https://www.luogu.com.cn/problem/P1850)
- [ ] [P3830 [SHOI2012] 随机树](https://www.luogu.com.cn/problem/P3830)
- [ ] [P4564 [CTSC2018] 假面](https://www.luogu.com.cn/problem/P4564)
- [ ] [P2473 [SCOI2008] 奖励关](https://www.luogu.com.cn/problem/P2473)
- [ ] [P2221 [HAOI2012] 高速公路](https://www.luogu.com.cn/problem/P2221)
- [ ] [P3239 [HNOI2015] 亚瑟王](https://www.luogu.com.cn/problem/P3239)
- [ ] [P3750 [六省联考2017] 分手是祝愿](https://www.luogu.com.cn/problem/P3750)
- [ ] [P4284 [SHOI2014] 概率充电器](https://www.luogu.com.cn/problem/P4284)
- [ ] [P5249 [LnOI2019] 加特林轮盘赌](https://www.luogu.com.cn/problem/P5249)
- [ ] [P2081 [NOI2012] 迷失游乐园](https://www.luogu.com.cn/problem/P2081)
- [ ] [P3343 [ZJOI2015] 地震后的幻想乡](https://www.luogu.com.cn/problem/P3343)
- [ ] [P3600 随机数生成器](https://www.luogu.com.cn/problem/P3600)
- [ ] [P5326 [ZJOI2019] 开关](https://www.luogu.com.cn/problem/P5326)

- [ ] [CF280C Game on Tree](https://www.luogu.com.cn/problem/CF280C) `主练`：线性期望在树上的应用。
- [ ] [UVA11181 Probability|Given](https://www.luogu.com.cn/problem/UVA11181) `主练`：条件概率。
- [ ] [P2111 考场奇遇](https://www.luogu.com.cn/problem/P2111) `主练`：概率 DP / 组合。

### Part 6.12 排列组合｜主线

- [x] [P3807 【模板】卢卡斯定理](https://www.luogu.com.cn/problem/P3807)
- [x] [P2822 组合数问题](https://www.luogu.com.cn/problem/P2822)
- [ ] [P5520 [yLOI2019] 青原樱](https://www.luogu.com.cn/problem/P5520)
- [x] [P3197 [HNOI2008] 越狱](https://www.luogu.com.cn/problem/P3197)
- [ ] [P2290 [HNOI2004] 树的计数](https://www.luogu.com.cn/problem/P2290)
- [ ] [P4981 父子](https://www.luogu.com.cn/problem/P4981)
- [ ] [P4769 [NOI2018] 冒泡排序](https://www.luogu.com.cn/problem/P4769)
- [ ] [P4931 情侣？给我烧了！（加强版）](https://www.luogu.com.cn/problem/P4931)
- [ ] [P5596 【XR-4】题](https://www.luogu.com.cn/problem/P5596)
- [ ] [P5598 【XR-4】混乱度](https://www.luogu.com.cn/problem/P5598)

### Part 6.13 卡特兰数 / 斯特林数｜进阶主线

- [ ] [P5395 第二类斯特林数·行](https://www.luogu.com.cn/problem/P5395)
- [ ] [P5396 第二类斯特林数·列](https://www.luogu.com.cn/problem/P5396)
- [ ] [P5408 第一类斯特林数·行](https://www.luogu.com.cn/problem/P5408)
- [ ] [P5409 第一类斯特林数·列](https://www.luogu.com.cn/problem/P5409)
- [ ] [P1655 小朋友的球](https://www.luogu.com.cn/problem/P1655)
- [ ] [P2532 [AHOI2012] 树屋阶梯](https://www.luogu.com.cn/problem/P2532)
- [ ] [P3200 [HNOI2009] 有趣的数列](https://www.luogu.com.cn/problem/P3200)
- [ ] [P3978 [TJOI2015] 概率论](https://www.luogu.com.cn/problem/P3978)
- [ ] [P4091 [HEOI2016/TJOI2016] 求和](https://www.luogu.com.cn/problem/P4091)
- [ ] [P4827 [国家集训队] Crash 的文明世界](https://www.luogu.com.cn/problem/P4827)

### Part 6.14 容斥原理｜主线

- [ ] [P5664 Emiya 家今天的饭](https://www.luogu.com.cn/problem/P5664)
- [x] [P1450 [HAOI2008] 硬币购物](https://www.luogu.com.cn/problem/P1450)
- [ ] [P3214 [HNOI2011] 卡农](https://www.luogu.com.cn/problem/P3214)
- [ ] [P3270 [JLOI2016] 成绩比较](https://www.luogu.com.cn/problem/P3270)
- [ ] [P4336 [SHOI2016] 黑暗前的幻想乡](https://www.luogu.com.cn/problem/P4336)
- [ ] [P4448 [AHOI2018初中组] 球球的排列](https://www.luogu.com.cn/problem/P4448)
- [ ] [P4491 [HAOI2018] 染色](https://www.luogu.com.cn/problem/P4491)
- [ ] [P5339 [TJOI2019] 唱、跳、rap和篮球](https://www.luogu.com.cn/problem/P5339)
- [ ] [P5400 [CTS2019] 随机立方体](https://www.luogu.com.cn/problem/P5400)

### Part 6.15 组合计数综合｜进阶主线

- [ ] [P5664 [CSP-S2019] Emiya 家今天的饭](https://www.luogu.com.cn/problem/P5664) `主练`：组合计数 DP。
- [ ] [P4071 [SDOI2016] 排列计数](https://www.luogu.com.cn/problem/P4071) `主练`：错排 / 组合计数。
- [ ] [P5505 [JSOI2011] 分特产](https://www.luogu.com.cn/problem/P5505) `主练`：容斥 + 组合数。
- [ ] [P3214 [HNOI2011] 卡农](https://www.luogu.com.cn/problem/P3214) `挑战`：组合计数递推。
- [ ] [CF1278F Cards](https://www.luogu.com.cn/problem/CF1278F) `挑战`：组合恒等式 / 概率计数。
- [ ] [CF961G Partitions](https://www.luogu.com.cn/problem/CF961G) `挑战`：Stirling / 组合贡献。

### Part 6.16 矩阵｜主线

- [x] [P3390 【模板】矩阵快速幂](https://www.luogu.com.cn/problem/P3390)
- [x] [P1939 【模板】矩阵加速（数列）](https://www.luogu.com.cn/problem/P1939)
- [ ] [P4783 【模板】矩阵求逆](https://www.luogu.com.cn/problem/P4783)
- [ ] [P1962 斐波那契数列](https://www.luogu.com.cn/problem/P1962)
- [ ] [P1349 广义斐波那契数列](https://www.luogu.com.cn/problem/P1349)
- [ ] [P4000 斐波那契数列](https://www.luogu.com.cn/problem/P4000)
- [ ] [P3758 [TJOI2017] 可乐](https://www.luogu.com.cn/problem/P3758)
- [ ] [P4967 黑暗打击](https://www.luogu.com.cn/problem/P4967)
- [ ] [P5343 【XR-1】分块](https://www.luogu.com.cn/problem/P5343)
- [ ] [P5337 [TJOI2019] 甲苯先生的字符串](https://www.luogu.com.cn/problem/P5337)
- [ ] [P5303 [GXOI/GZOI2019] 逼死强迫症](https://www.luogu.com.cn/problem/P5303)

### Part 6.17 线性代数综合｜进阶主线

- [ ] [P2455 [SDOI2006] 线性方程组](https://www.luogu.com.cn/problem/P2455) `主练`：高斯消元完整分类。
- [ ] [P7112 【模板】行列式求值](https://www.luogu.com.cn/problem/P7112) `进阶`：行列式消元。
- [ ] [P3216 [HNOI2011] 数学作业](https://www.luogu.com.cn/problem/P3216) `主练`：矩阵快速幂建模。
- [ ] [P2973 [USACO10HOL] Driving Out the Piggies G](https://www.luogu.com.cn/problem/P2973) `挑战`：概率 + 高斯消元。

### Part 6.18 高斯消元｜主线

- [x] [P3389 【模板】高斯消元法](https://www.luogu.com.cn/problem/P3389)
- [x] [P2447 [SDOI2010] 外星千足虫](https://www.luogu.com.cn/problem/P2447)
- [x] [P4035 [JSOI2008] 球形空间产生器](https://www.luogu.com.cn/problem/P4035)
- [ ] [P5516 [MtOI2019] 小铃的烦恼](https://www.luogu.com.cn/problem/P5516)
- [ ] [P4111 [HEOI2015] 小Z的房间](https://www.luogu.com.cn/problem/P4111)
- [ ] [P4457 [BJOI2018] 治疗之雨](https://www.luogu.com.cn/problem/P4457)

### Part 6.19 线性基 / 异或空间｜主线

- [x] [P3812 【模板】线性基](https://www.luogu.com.cn/problem/P3812)
- [ ] [P3857 [TJOI2008] 彩灯](https://www.luogu.com.cn/problem/P3857)
- [ ] [P4570 [BJWC2011] 元素](https://www.luogu.com.cn/problem/P4570)
- [ ] [P4301 [CQOI2013] 新 Nim 游戏](https://www.luogu.com.cn/problem/P4301)
- [ ] [P3292 [SCOI2016] 幸运数字](https://www.luogu.com.cn/problem/P3292)
- [ ] [P4151 [WC2011] 最大 XOR 和路径](https://www.luogu.com.cn/problem/P4151)

- [x] [P3812 线性基](https://www.luogu.com.cn/problem/P3812) `衔接`：整理插入、判相关与最大异或模板。
- [ ] [P4151 最大 XOR 和路径](https://www.luogu.com.cn/problem/P4151) `主练`：图上环空间与线性基结合。
- [ ] [P4570 元素](https://www.luogu.com.cn/problem/P4570) `主练`：带权选择与线性独立性结合。
- [ ] [P3292 幸运数字](https://www.luogu.com.cn/problem/P3292) `挑战`：树上路径线性基。

### Part 6.20 多项式 / FFT / NTT / FPS｜进阶主线

完整恢复原多项式题单。实际训练可先做到 FFT / NTT 与基础卷积，FPS 全家桶按需求继续下钻。

- [ ] [P3803 【模板】多项式乘法（FFT）](https://www.luogu.com.cn/problem/P3803)
- [ ] [P4238 【模板】多项式求逆](https://www.luogu.com.cn/problem/P4238)
- [ ] [P4245 【模板】任意模数 NTT](https://www.luogu.com.cn/problem/P4245)
- [ ] [P4512 【模板】多项式除法](https://www.luogu.com.cn/problem/P4512)
- [ ] [P4717 【模板】快速沃尔什变换](https://www.luogu.com.cn/problem/P4717)
- [ ] [P4721 【模板】分治 FFT](https://www.luogu.com.cn/problem/P4721)
- [ ] [P4725 【模板】多项式对数函数](https://www.luogu.com.cn/problem/P4725)
- [ ] [P4726 【模板】多项式指数函数](https://www.luogu.com.cn/problem/P4726)
- [ ] [P4781 【模板】拉格朗日插值](https://www.luogu.com.cn/problem/P4781)
- [ ] [P5050 【模板】多项式多点求值](https://www.luogu.com.cn/problem/P5050)
- [ ] [P5158 【模板】多项式快速插值](https://www.luogu.com.cn/problem/P5158)
- [ ] [P5205 【模板】多项式开根](https://www.luogu.com.cn/problem/P5205)
- [ ] [P5245 【模板】多项式快速幂](https://www.luogu.com.cn/problem/P5245)
- [ ] [P5273 【模板】多项式幂函数（加强版）](https://www.luogu.com.cn/problem/P5273)
- [ ] [P5282 【模板】快速阶乘算法](https://www.luogu.com.cn/problem/P5282)
- [ ] [P5373 【模板】多项式复合函数](https://www.luogu.com.cn/problem/P5373)
- [ ] [P5394 【模板】下降幂多项式乘法](https://www.luogu.com.cn/problem/P5394)
- [ ] [P3338 [ZJOI2014] 力](https://www.luogu.com.cn/problem/P3338)
- [ ] [P3723 [AH2017/HNOI2017] 礼物](https://www.luogu.com.cn/problem/P3723)
- [ ] [P5437 【XR-2】约定](https://www.luogu.com.cn/problem/P5437)
- [ ] [P5293 [HNOI2019] 白兔之舞](https://www.luogu.com.cn/problem/P5293)
- [ ] [P5432 A/B Problem（加强版）](https://www.luogu.com.cn/problem/P5432)
- [ ] [P5472 [NOI2019] 斗主地](https://www.luogu.com.cn/problem/P5472)
- [ ] [P5577 [CmdOI2019] 算力训练](https://www.luogu.com.cn/problem/P5577)

### Part 6.21 莫比乌斯反演｜进阶主线

- [ ] [P3172 [CQOI2015] 选数](https://www.luogu.com.cn/problem/P3172)
- [x] [P2522 [HAOI2011] Problem b](https://www.luogu.com.cn/problem/P2522)
- [x] [P3455 [POI2007] ZAP-Queries](https://www.luogu.com.cn/problem/P3455)
- [x] [P3327 [SDOI2015] 约数个数和](https://www.luogu.com.cn/problem/P3327)
- [x] [P1829 Crash 的数字表格 / JZPTAB](https://www.luogu.com.cn/problem/P1829)
- [ ] [P4619 [SDOI2018] 旧试题](https://www.luogu.com.cn/problem/P4619)
- [ ] [P3704 [SDOI2017] 数字表格](https://www.luogu.com.cn/problem/P3704)
- [ ] [P5518 [MtOI2019] 幽灵乐团](https://www.luogu.com.cn/problem/P5518)

### Part 6.22 筛法｜进阶主线

- [x] [P3383 【模板】线性筛素数](https://www.luogu.com.cn/problem/P3383)
- [x] [P4213 【模板】杜教筛](https://www.luogu.com.cn/problem/P4213)
- [ ] [P5325 【模板】Min_25 筛](https://www.luogu.com.cn/problem/P5325)
- [ ] [P1865 A % B Problem](https://www.luogu.com.cn/problem/P1865)
- [ ] [P1621 集合](https://www.luogu.com.cn/problem/P1621)
- [ ] [P3768 简单的数学题](https://www.luogu.com.cn/problem/P3768)
- [ ] [P5438 【XR-2】记忆](https://www.luogu.com.cn/problem/P5438)

### Part 6.23 线性规划｜近似忽略

注意 P3980 也可从费用流/差分约束等角度理解；这里保留原题单归类。

{% fold info @线性规划 题单 %}
- [ ] [P3980 [NOI2008] 志愿者招募](https://www.luogu.com.cn/problem/P3980)
- [ ] [P4232 无意识之外的捉迷藏](https://www.luogu.com.cn/problem/P4232)
{% endfold %}

### Part 6.24 三分法｜主线

- [x] [P3382 【模板】三分法](https://www.luogu.com.cn/problem/P3382)
- [ ] [P1883 函数](https://www.luogu.com.cn/problem/P1883)

### Part 6.25 自适应辛普森法｜近似忽略

{% fold info @自适应辛普森法 题单 %}
- [ ] [P4525 【模板】自适应辛普森法1](https://www.luogu.com.cn/problem/P4525)
- [ ] [P4526 【模板】自适应辛普森法2](https://www.luogu.com.cn/problem/P4526)
- [ ] [P3779 [SDOI2017] 龙与地下城](https://www.luogu.com.cn/problem/P3779)
{% endfold %}

### Part 6.26 Burnside / Pólya / 置换群｜地图保留

{% fold info @置换群 题单 %}
- [ ] [P4980 【模板】Pólya 定理](https://www.luogu.com.cn/problem/P4980)
- [ ] [P1446 [HNOI2008] Cards](https://www.luogu.com.cn/problem/P1446)
- [ ] [P2561 [AHOI2002] 黑白瓷砖](https://www.luogu.com.cn/problem/P2561)
- [ ] [P4128 [SHOI2006] 有色图](https://www.luogu.com.cn/problem/P4128)
- [ ] [P4727 [HNOI2009] 图的同构记数](https://www.luogu.com.cn/problem/P4727)
{% endfold %}

## Part 7 数据结构

### Part 7.1 链表｜地图保留

{% fold info @链表 题单 %}
- [ ] [P1996 约瑟夫问题](https://www.luogu.com.cn/problem/P1996)
- [ ] [P1160 队列安排](https://www.luogu.com.cn/problem/P1160)
{% endfold %}

### Part 7.2 栈｜地图保留

{% fold info @栈 题单 %}
- [ ] [P1449 后缀表达式](https://www.luogu.com.cn/problem/P1449)
- [ ] [P1739 表达式括号匹配](https://www.luogu.com.cn/problem/P1739)
- [ ] [P1981 表达式求值](https://www.luogu.com.cn/problem/P1981)
- [ ] [P1175 表达式的转换](https://www.luogu.com.cn/problem/P1175)
{% endfold %}

### Part 7.3 队列｜地图保留

{% fold info @队列 题单 %}
- [ ] [P1540 机器翻译](https://www.luogu.com.cn/problem/P1540)
{% endfold %}

### Part 7.4 单调栈 / 单调队列｜主线

- [x] [P5788 【模板】单调栈](https://www.luogu.com.cn/problem/P5788)
- [x] [P1886 滑动窗口 / 【模板】单调队列](https://www.luogu.com.cn/problem/P1886)

- [ ] [P3467 PLA-Postering](https://www.luogu.com.cn/problem/P3467) `衔接`：单调栈维护轮廓。
- [ ] [P1823 Patrik 音乐会的等待](https://www.luogu.com.cn/problem/P1823) `主练`：单调栈计数题。
- [ ] [P1714 切蛋糕](https://www.luogu.com.cn/problem/P1714) `衔接`：前缀信息与单调队列的经典结合。
- [ ] [P2034 选择数字](https://www.luogu.com.cn/problem/P2034) `主练`：练习从朴素 DP 过渡到窗口优化。
- [ ] [P2627 Mowing the Lawn G](https://www.luogu.com.cn/problem/P2627) `主练`：与 P2034 模型接近。
- [ ] [P3800 Power 收集](https://www.luogu.com.cn/problem/P3800) `主练`：分层 DP 与单调队列结合。
- [ ] [P3957 跳房子](https://www.luogu.com.cn/problem/P3957) `主练`：参数判定、DP 与单调队列的综合应用。
- [ ] [P2254 瑰丽华尔兹](https://www.luogu.com.cn/problem/P2254) `挑战`：多阶段、多方向转移。
- [ ] [P2569 股票交易](https://www.luogu.com.cn/problem/P2569) `挑战`：状态和限制较多。
- [ ] [P4147 玉蟾宫](https://www.luogu.com.cn/problem/P4147) `主练`：单调栈处理二维最大矩形。
- [ ] [P2866 [USACO06NOV] Bad Hair Day S](https://www.luogu.com.cn/problem/P2866) `衔接`：单调栈计数经典题。
- [ ] [P1950 长方形](https://www.luogu.com.cn/problem/P1950) `主练`：单调栈与矩形计数。
- [ ] [P2216 [HAOI2007] 理想的正方形](https://www.luogu.com.cn/problem/P2216) `主练`：二维滑动窗口最值。

### Part 7.5 并查集｜主线

- [ ] [P1111 修复公路](https://www.luogu.com.cn/problem/P1111)
- [x] [P3958 奶酪](https://www.luogu.com.cn/problem/P3958)
- [x] [P1525 关押罪犯](https://www.luogu.com.cn/problem/P1525)
- [x] [P4185 [USACO18JAN] MooTube G](https://www.luogu.com.cn/problem/P4185)
- [x] [P2024 [NOI2001] 食物链](https://www.luogu.com.cn/problem/P2024)
- [x] [P1197 [JSOI2008] 星球大战](https://www.luogu.com.cn/problem/P1197)
- [x] [P1196 [NOI2002] 银河英雄传说](https://www.luogu.com.cn/problem/P1196)
- [x] [P1955 [NOI2015] 程序自动分析](https://www.luogu.com.cn/problem/P1955)

- [x] [P1525 关押罪犯](https://www.luogu.com.cn/problem/P1525) `主练`：种类并查集代表题。
- [ ] [P1196 银河英雄传说](https://www.luogu.com.cn/problem/P1196) `主练`：带权并查集代表题。
- [ ] [P2024 食物链](https://www.luogu.com.cn/problem/P2024) `主练`：多类循环关系问题。
- [ ] [P2294 狡猾的商人](https://www.luogu.com.cn/problem/P2294) `衔接`：差值关系与带权并查集的衔接题。
- [ ] [P1783 海滩防御](https://www.luogu.com.cn/problem/P1783) `挑战`：几何关系与集合连通性的综合建模题。

### Part 7.6 堆 / 优先队列｜主线

- [x] [P3378 【模板】堆](https://www.luogu.com.cn/problem/P3378)
- [ ] [P1090 合并果子](https://www.luogu.com.cn/problem/P1090)
- [x] [P1168 中位数](https://www.luogu.com.cn/problem/P1168)
- [ ] [P2085 最小函数值](https://www.luogu.com.cn/problem/P2085)
- [ ] [P2827 蚯蚓](https://www.luogu.com.cn/problem/P2827)
- [ ] [P3045 [USACO12FEB] Cow Coupons](https://www.luogu.com.cn/problem/P3045)

- [ ] [P2085 最小函数值](https://www.luogu.com.cn/problem/P2085) `衔接`：多路候选最值维护。
- [ ] [P6033 合并果子 加强版](https://www.luogu.com.cn/problem/P6033) `主练`：从普通小根堆继续思考大数据范围下的优化。
- [ ] [P2827 蚯蚓](https://www.luogu.com.cn/problem/P2827) `主练`：模拟与多队列维护综合题。
- [ ] [P3045 Cow Coupons G](https://www.luogu.com.cn/problem/P3045) `挑战`：贪心与优先队列综合题。
- [ ] [P2048 超级钢琴](https://www.luogu.com.cn/problem/P2048) `挑战`：RMQ、堆与区间拆分综合题。
- [ ] [P1801 黑匣子](https://www.luogu.com.cn/problem/P1801) `衔接`：双堆 / 顺序统计经典题。
- [ ] [P2168 [NOI2015] 荷马史诗](https://www.luogu.com.cn/problem/P2168) `主练`：k 叉 Huffman 与堆。
- [ ] [P1631 序列合并](https://www.luogu.com.cn/problem/P1631) `主练`：多路候选最小值。
- [ ] [P4053 [JSOI2007] 建筑抢修](https://www.luogu.com.cn/problem/P4053) `主练`：贪心 + 堆维护可撤销选择。
- [ ] [P1878 舞蹈课](https://www.luogu.com.cn/problem/P1878) `主练`：邻接关系 + 堆动态维护。

### Part 7.7 ST 表 / RMQ｜主线

- [x] [P3865 【模板】ST 表](https://www.luogu.com.cn/problem/P3865)
- [ ] [P2251 质量检测](https://www.luogu.com.cn/problem/P2251)
- [ ] [P1816 忠诚](https://www.luogu.com.cn/problem/P1816)
- [ ] [P1198 [JSOI2008] 最大数](https://www.luogu.com.cn/problem/P1198)
- [x] [P2880 [USACO07JAN] Balanced Lineup](https://www.luogu.com.cn/problem/P2880)
- [ ] [P5012 水の数列](https://www.luogu.com.cn/problem/P5012)
- [ ] [P5344 【XR-1】逛森林](https://www.luogu.com.cn/problem/P5344)
- [ ] [P2048 [NOI2010] 超级钢琴](https://www.luogu.com.cn/problem/P2048)

- [ ] [P2471 降雨量](https://www.luogu.com.cn/problem/P2471) `主练`：RMQ、查找与分类判断综合题。
- [ ] [P5012 水の数列](https://www.luogu.com.cn/problem/P5012) `挑战`：多种预处理与区间信息综合。
- [ ] [P2251 质量检测](https://www.luogu.com.cn/problem/P2251) `衔接`：静态 / 滑窗区间最值。

### Part 7.8 树状数组｜主线

- [x] [P3374 【模板】树状数组 1](https://www.luogu.com.cn/problem/P3374)
- [ ] [P3368 【模板】树状数组 2](https://www.luogu.com.cn/problem/P3368)
- [x] [P1908 逆序对](https://www.luogu.com.cn/problem/P1908)
- [ ] [P1966 火柴排队](https://www.luogu.com.cn/problem/P1966)
- [ ] [P3605 [USACO17JAN] Promotion Counting](https://www.luogu.com.cn/problem/P3605)
- [x] [P1972 [SDOI2009] HH 的项链](https://www.luogu.com.cn/problem/P1972)
- [ ] [P3586 [POI2015] LOG](https://www.luogu.com.cn/problem/P3586)
- [ ] [P4054 [JSOI2009] 计数问题](https://www.luogu.com.cn/problem/P4054)
- [x] [P4113 [HEOI2012] 采花](https://www.luogu.com.cn/problem/P4113)
- [ ] [P3960 列队](https://www.luogu.com.cn/problem/P3960)

- [ ] [P1966 火柴排队](https://www.luogu.com.cn/problem/P1966) `衔接`：排名映射与逆序对。
- [ ] [P1972 HH 的项链](https://www.luogu.com.cn/problem/P1972) `主练`：离线询问代表题。
- [ ] [P4113 采花](https://www.luogu.com.cn/problem/P4113) `主练`：与 P1972 同属离线统计。
- [ ] [P3605 Promotion Counting P](https://www.luogu.com.cn/problem/P3605) `主练`：DFS 序与树状数组结合。
- [ ] [P4054 计数问题](https://www.luogu.com.cn/problem/P4054) `主练`：二维与多类别维护。
- [ ] [P3253 删除物品](https://www.luogu.com.cn/problem/P3253) `挑战`：动态删除后的相对位置统计。
- [ ] [P3586 物流 Logistics](https://www.luogu.com.cn/problem/P3586) `挑战`：权值数量与权值和的联合维护。
- [ ] [P5677 配对统计](https://www.luogu.com.cn/problem/P5677) `挑战`：预处理贡献关系后转为离线区间统计。
- [ ] [P2345 [USACO04OPEN] MooFest G](https://www.luogu.com.cn/problem/P2345) `主练`：排序 + 树状数组 / 贡献统计。
- [ ] [P3368 【模板】树状数组 2](https://www.luogu.com.cn/problem/P3368) `衔接`：区间修改 + 单点查询。
- [ ] [P1637 三元上升子序列](https://www.luogu.com.cn/problem/P1637) `主练`：多层树状数组 / 贡献统计。

### Part 7.9 线段树｜主线

- [x] [P3372 【模板】线段树 1](https://www.luogu.com.cn/problem/P3372)
- [x] [P3373 【模板】线段树 2](https://www.luogu.com.cn/problem/P3373)
- [x] [P5490 【模板】扫描线](https://www.luogu.com.cn/problem/P5490)
- [ ] [P4588 [TJOI2018] 数学计算](https://www.luogu.com.cn/problem/P4588)
- [x] [P1502 窗口的星星](https://www.luogu.com.cn/problem/P1502)
- [ ] [P2471 [SCOI2007] 降雨量](https://www.luogu.com.cn/problem/P2471)
- [x] [P2824 [HEOI2016/TJOI2016] 排序](https://www.luogu.com.cn/problem/P2824)
- [ ] [P3722 [AH2017/HNOI2017] 影魔](https://www.luogu.com.cn/problem/P3722)
- [ ] [P4097 [HEOI2013] Segment](https://www.luogu.com.cn/problem/P4097)
- [ ] [P4198 楼房重建](https://www.luogu.com.cn/problem/P4198)
- [ ] [P4513 小白逛公园](https://www.luogu.com.cn/problem/P4513)
- [ ] [P4556 [Vani有约会] 雨天的尾巴](https://www.luogu.com.cn/problem/P4556)
- [ ] [P5324 [BJOI2019] 删数](https://www.luogu.com.cn/problem/P5324)
- [ ] [P5327 [ZJOI2019] 语言](https://www.luogu.com.cn/problem/P5327)

- [ ] [P1198 最大数](https://www.luogu.com.cn/problem/P1198) `衔接`：在线追加与区间最值。
- [ ] [P4588 数学计算](https://www.luogu.com.cn/problem/P4588) `衔接`：线段树维护非加和型信息。
- [ ] [P2574 XOR 的艺术](https://www.luogu.com.cn/problem/P2574) `主练`：区间翻转与区间统计。
- [ ] [P1471 方差](https://www.luogu.com.cn/problem/P1471) `主练`：同时维护多种区间信息。
- [ ] [P4513 小白逛公园](https://www.luogu.com.cn/problem/P4513) `主练`：复杂区间信息合并代表题。
- [ ] [P2824 排序](https://www.luogu.com.cn/problem/P2824) `挑战`：参数判定与 01 区间维护综合题。
- [ ] [P2161 [SHOI2009] 会场预约](https://www.luogu.com.cn/problem/P2161) `主练`：动态区间集合维护。
- [ ] [P1438 无聊的数列](https://www.luogu.com.cn/problem/P1438) `主练`：差分 + 线段树。
- [ ] [P1253 扶苏的问题](https://www.luogu.com.cn/problem/P1253) `主练`：多种懒标记组合。
- [ ] [P6492 [COCI 2010/2011 #6] STEP](https://www.luogu.com.cn/problem/P6492) `主练`：线段树维护连续段。
- [ ] [P1558 色板游戏](https://www.luogu.com.cn/problem/P1558) `主练`：区间赋值 + 颜色集合。

### Part 7.10 扫描线与线段树｜主线

- [x] [P5490 扫描线 & 矩形面积并](https://www.luogu.com.cn/problem/P5490) `主练`：扫描线与线段树的标准入口题。
- [x] [P1502 窗口的星星](https://www.luogu.com.cn/problem/P1502) `挑战`：扫描线与区间最值综合。

### Part 7.11 高级线段树 / 特殊区间信息｜进阶主线

- [ ] [CF438D The Child and Sequence](https://www.luogu.com.cn/problem/CF438D) `主练`：区间特殊修改代表题。
- [ ] [P6327 区间加区间 sin 和](https://www.luogu.com.cn/problem/P6327) `主练`：多个相关区间信息与懒标记共同维护。
- [ ] [P5278 算术天才⑨与等差数列](https://www.luogu.com.cn/problem/P5278) `主练`：非标准区间性质的设计与合并。
- [ ] [P4198 楼房重建](https://www.luogu.com.cn/problem/P4198) `主练`：特殊区间信息合并题。
- [ ] [P7706 文文的摄影布置](https://www.luogu.com.cn/problem/P7706) `挑战`：复杂节点信息与区间修改综合。
- [ ] [P7447 rgxsxrs](https://www.luogu.com.cn/problem/P7447) `暂存`：高阶区间维护题。
- [ ] [P4145 上帝造题的七分钟 2](https://www.luogu.com.cn/problem/P4145) `主练`：势能分析与区间特殊修改。
- [ ] [P2572 [SCOI2010] 序列操作](https://www.luogu.com.cn/problem/P2572) `挑战`：复杂懒标记与连续段信息。
- [ ] [P5522 [yLOI2019] 棠梨煎雪](https://www.luogu.com.cn/problem/P5522) `挑战`：线段树维护字符串 / 集合信息。
- [ ] [CF19D Points](https://www.luogu.com.cn/problem/CF19D) `挑战`：二维有序结构 / 线段树。

### Part 7.12 李超线段树 / 直线维护｜进阶主线

- [ ] [P4097 Segment](https://www.luogu.com.cn/problem/P4097) `主练`：李超线段树代表题。
- [ ] [CF678F Lena and Queries](https://www.luogu.com.cn/problem/CF678F) `挑战`：动态加入、删除直线与在线询问综合。
- [ ] [P4027 货币兑换](https://www.luogu.com.cn/problem/P4027) `复盘`：从斜率优化或凸包维护角度复盘。
- [ ] [P5416 时空旅行](https://www.luogu.com.cn/problem/P5416) `暂存`：时间维与直线维护综合。

### Part 7.13 线段树分裂 / 合并｜进阶主线

- [ ] [P5494 线段树分裂](https://www.luogu.com.cn/problem/P5494) `主练`：线段树分裂与合并的标准入口。
- [ ] [P4556 雨天的尾巴](https://www.luogu.com.cn/problem/P4556) `主练`：线段树合并与树上统计的代表题。
- [ ] [P3722 影魔](https://www.luogu.com.cn/problem/P3722) `挑战`：贡献拆分与区间维护综合题。

### Part 7.14 分块 / 根号算法｜进阶主线

- [ ] [P3870 [TJOI2009] 开关](https://www.luogu.com.cn/problem/P3870)
- [ ] [P3396 哈希冲突](https://www.luogu.com.cn/problem/P3396)
- [ ] [P3863 序列](https://www.luogu.com.cn/problem/P3863)
- [ ] [P1975 [国家集训队] 排队](https://www.luogu.com.cn/problem/P1975)
- [ ] [P3710 方方方的数据结构](https://www.luogu.com.cn/problem/P3710)
- [ ] [P3992 [BJOI2017] 开车](https://www.luogu.com.cn/problem/P3992)
- [ ] [P4168 [Violet] 蒲公英](https://www.luogu.com.cn/problem/P4168)
- [ ] [P4119 [Ynoi2018] 未来日记](https://www.luogu.com.cn/problem/P4119)

- [ ] [P2801 教主的魔法](https://www.luogu.com.cn/problem/P2801) `衔接`：序列分块入口。
- [ ] [P3203 弹飞绵羊](https://www.luogu.com.cn/problem/P3203) `主练`：根号分治维护跳跃信息。
- [ ] [P4168 蒲公英](https://www.luogu.com.cn/problem/P4168) `主练`：静态区间众数问题。
- [ ] [P4135 作诗](https://www.luogu.com.cn/problem/P4135) `挑战`：分块与区间频率统计综合。

### Part 7.15 莫队｜进阶主线

- [ ] [SP3267 DQUERY](https://www.luogu.com.cn/problem/SP3267) `衔接`：普通莫队的静态区间不同数入口。
- [ ] [P1494 小 Z 的袜子](https://www.luogu.com.cn/problem/P1494) `主练`：普通莫队代表题。
- [ ] [CF617E XOR and Favorite Number](https://www.luogu.com.cn/problem/CF617E) `主练`：前缀异或与莫队结合。
- [ ] [P1903 数颜色](https://www.luogu.com.cn/problem/P1903) `主练`：带修改莫队模板题。
- [ ] [CF940F Machine Learning](https://www.luogu.com.cn/problem/CF940F) `挑战`：带修改莫队与 mex 信息维护。
- [ ] [P5906 回滚莫队](https://www.luogu.com.cn/problem/P5906) `主练`：维护难以删除的信息。
- [ ] [SP10707 COT2](https://www.luogu.com.cn/problem/SP10707) `主练`：树上莫队入口。
- [ ] [P4074 糖果公园](https://www.luogu.com.cn/problem/P4074) `挑战`：树上带修改莫队。
- [ ] [P4887 莫队二次离线](https://www.luogu.com.cn/problem/P4887) `挑战`：二次离线代表题。

### Part 7.16 可并堆 / 左偏树｜地图保留

{% fold info @可并堆 题单 %}
- [ ] [P3377 【模板】左偏树（可并堆）](https://www.luogu.com.cn/problem/P3377)
- [ ] [P2713 罗马游戏](https://www.luogu.com.cn/problem/P2713)
- [ ] [P1456 Monkey King](https://www.luogu.com.cn/problem/P1456)
- [ ] [P1552 [APIO2012] 派遣](https://www.luogu.com.cn/problem/P1552)
- [ ] [P3261 [JLOI2015] 城池攻占](https://www.luogu.com.cn/problem/P3261)
- [ ] [P3273 [SCOI2011] 棘手的操作](https://www.luogu.com.cn/problem/P3273)
- [ ] [P4331 [BOI2004] Sequence](https://www.luogu.com.cn/problem/P4331)
{% endfold %}

{% fold info @可并堆与左偏树扩展 %}
- [ ] [P3377 左偏树](https://www.luogu.com.cn/problem/P3377) `衔接`：可并堆模板入口。
- [ ] [P2713 罗马游戏](https://www.luogu.com.cn/problem/P2713) `主练`：可并堆基础应用。
- [ ] [P1552 派遣](https://www.luogu.com.cn/problem/P1552) `挑战`：树上 DFS、贪心与可并堆综合题。
- [ ] [P3261 城池攻占](https://www.luogu.com.cn/problem/P3261) `挑战`：树上过程与可并堆结合。
{% endfold %}

### Part 7.17 主席树 / 区间顺序统计｜进阶主线

- [ ] [P2468 [SDOI2010] 粟粟的书架](https://www.luogu.com.cn/problem/P2468)
- [ ] [P3302 [SDOI2013] 森林](https://www.luogu.com.cn/problem/P3302)
- [ ] [P3168 [CQOI2015] 任务查询系统](https://www.luogu.com.cn/problem/P3168)
- [ ] [P4559 [JSOI2018] 列队](https://www.luogu.com.cn/problem/P4559)
- [ ] [P2633 Count on a tree](https://www.luogu.com.cn/problem/P2633)
- [ ] [P3293 [SCOI2016] 美味](https://www.luogu.com.cn/problem/P3293)
- [ ] [P4618 [SDOI2018] 原题识别](https://www.luogu.com.cn/problem/P4618)

- [ ] [P3834 可持久化线段树 2](https://www.luogu.com.cn/problem/P3834) `衔接`：静态区间第 $k$ 小的标准入口。
- [ ] [P2617 Dynamic Rankings](https://www.luogu.com.cn/problem/P2617) `主练`：从静态主席树进入带修改区间顺序统计。
- [ ] [P2633 Count on a tree](https://www.luogu.com.cn/problem/P2633) `主练`：树上路径版本的可持久化权值结构。
- [ ] [P2839 middle](https://www.luogu.com.cn/problem/P2839) `挑战`：可持久化权值结构与判定问题综合。
- [ ] [P4197 Peaks](https://www.luogu.com.cn/problem/P4197) `挑战`：重构树与可持久化结构结合。
- [ ] [P3293 美味](https://www.luogu.com.cn/problem/P3293) `挑战`：权值维护与异或选择综合。
- [ ] [P3960 列队](https://www.luogu.com.cn/problem/P3960) `挑战`：动态序列维护综合题。
- [ ] [P4587 [FJOI2016] 神秘数](https://www.luogu.com.cn/problem/P4587) `主练`：主席树 / 可持久化权值统计。
- [ ] [P4602 [CTSC2018] 混合果汁](https://www.luogu.com.cn/problem/P4602) `挑战`：主席树 + 二分答案。

### Part 7.18 平衡树 / 动态序列｜进阶主线

- [ ] [P3369 【模板】普通平衡树](https://www.luogu.com.cn/problem/P3369)
- [ ] [P3391 【模板】文艺平衡树（Splay）](https://www.luogu.com.cn/problem/P3391)
- [ ] [P3850 [TJOI2007] 书架](https://www.luogu.com.cn/problem/P3850)
- [ ] [P4008 [NOI2003] 文本编辑器](https://www.luogu.com.cn/problem/P4008)
- [ ] [P5338 [TJOI2019] 甲苯先生的滚榜](https://www.luogu.com.cn/problem/P5338)
- [ ] [P2042 [NOI2005] 维护数列](https://www.luogu.com.cn/problem/P2042)
- [ ] [P1110 [ZJOI2007] 报表统计](https://www.luogu.com.cn/problem/P1110)
- [ ] [P3644 [APIO2015] 八邻旁之桥](https://www.luogu.com.cn/problem/P3644)
- [ ] [P1486 [NOI2004] 郁闷的出纳员](https://www.luogu.com.cn/problem/P1486)
- [ ] [P2710 数列](https://www.luogu.com.cn/problem/P2710)
- [ ] [P3224 [HNOI2012] 永无乡](https://www.luogu.com.cn/problem/P3224)
- [ ] [P3285 [SCOI2014] 方伯伯的 OJ](https://www.luogu.com.cn/problem/P3285)
- [ ] [P5321 [BJOI2019] 送别](https://www.luogu.com.cn/problem/P5321)

- [ ] [P3369 普通平衡树](https://www.luogu.com.cn/problem/P3369) `衔接`：六类基本操作入口。
- [ ] [P6136 普通平衡树（数据加强版）](https://www.luogu.com.cn/problem/P6136) `主练`：强制在线版本。
- [ ] [P2286 宠物收养场](https://www.luogu.com.cn/problem/P2286) `主练`：前驱、后继与最近匹配的典型应用。
- [ ] [P1486 郁闷的出纳员](https://www.luogu.com.cn/problem/P1486) `主练`：全局偏移与顺序统计结合。
- [ ] [P3391 文艺平衡树](https://www.luogu.com.cn/problem/P3391) `主练`：按位置维护动态序列。

### Part 7.19 树链剖分 / 树上路径数据结构｜主线

- [x] [P3384 【模板】树链剖分](https://www.luogu.com.cn/problem/P3384)
- [ ] [P3313 [SDOI2014] 旅行](https://www.luogu.com.cn/problem/P3313)
- [ ] [P2590 [ZJOI2008] 树的统计](https://www.luogu.com.cn/problem/P2590)
- [ ] [P1505 [国家集训队] 旅游](https://www.luogu.com.cn/problem/P1505)
- [ ] [P2486 [SDOI2011] 染色](https://www.luogu.com.cn/problem/P2486)
- [ ] [P3258 [JLOI2014] 松鼠的新家](https://www.luogu.com.cn/problem/P3258)
- [ ] [P4069 [SDOI2016] 游戏](https://www.luogu.com.cn/problem/P4069)
- [ ] [P4211 [LNOI2014] LCA](https://www.luogu.com.cn/problem/P4211)
- [ ] [P4592 [TJOI2018] 异或](https://www.luogu.com.cn/problem/P4592)
- [ ] [P5305 [GXOI/GZOI2019] 旧词](https://www.luogu.com.cn/problem/P5305)
- [ ] [P5354 [Ynoi2017] 由乃的 OJ](https://www.luogu.com.cn/problem/P5354)
- [ ] [P5499 [LnOI2019] Abbi 并不想研学](https://www.luogu.com.cn/problem/P5499)

- [ ] [P3178 树上操作](https://www.luogu.com.cn/problem/P3178) `主练`：树上修改与查询的入门综合题。
- [ ] [P3128 Max Flow P](https://www.luogu.com.cn/problem/P3128) `衔接`：点路径差分的标准练习。
- [ ] [P3258 松鼠的新家](https://www.luogu.com.cn/problem/P3258) `衔接`：路径访问次数统计。
- [ ] [P2680 运输计划](https://www.luogu.com.cn/problem/P2680) `主练`：路径差分与二分答案综合。
- [ ] [P1600 天天爱跑步](https://www.luogu.com.cn/problem/P1600) `主练`：路径、深度与时间条件共同参与统计。
- [ ] [P4211 LCA](https://www.luogu.com.cn/problem/P4211) `主练`：离线询问与树上前缀信息结合。
- [ ] [P5836 Milk Visits S](https://www.luogu.com.cn/problem/P5836) `衔接`：路径上类别存在性查询。
- [ ] [P1084 疫情控制](https://www.luogu.com.cn/problem/P1084) `挑战`：倍增、二分与树上资源分配。
- [ ] [P1081 开车旅行](https://www.luogu.com.cn/problem/P1081) `挑战`：倍增维护非标准跳转信息。
- [ ] [P4427 求和](https://www.luogu.com.cn/problem/P4427) `主练`：路径统计与深度幂和预处理。
- [ ] [P5021 赛道修建](https://www.luogu.com.cn/problem/P5021) `挑战`：树上二分答案与路径配对。
- [ ] [P5022 旅行](https://www.luogu.com.cn/problem/P5022) `主练`：基环树上求字典序遍历。
- [ ] [P5049 旅行 加强版](https://www.luogu.com.cn/problem/P5049) `挑战`：继续处理更复杂的环结构。
- [ ] [P4219 大融合](https://www.luogu.com.cn/problem/P4219) `主练`：动态加边与路径信息。
- [ ] [P4216 情报传递](https://www.luogu.com.cn/problem/P4216) `主练`：树链剖分与时间维询问结合。
- [ ] [P5773 轻重路径](https://www.luogu.com.cn/problem/P5773) `主练`：路径修改与全局结构统计。
- [ ] [P5659 树上的数](https://www.luogu.com.cn/problem/P5659) `挑战`：树上排列调整与局部操作综合。
- [ ] [P6074 最小路径](https://www.luogu.com.cn/problem/P6074) `挑战`：树上路径选择与整体最优结构。
- [ ] [CF536E Tavas on the Path](https://www.luogu.com.cn/problem/CF536E) `挑战`：复杂路径询问与树上数据结构。
- [ ] [CF1344E Train Tracks](https://www.luogu.com.cn/problem/CF1344E) `挑战`：多层树结构上的路径约束。
- [ ] [CF983E NN country](https://www.luogu.com.cn/problem/CF983E) `挑战`：路径跳跃与离线、倍增结构综合。
- [ ] [CF1140G Double Tree](https://www.luogu.com.cn/problem/CF1140G) `挑战`：双树结构之间的距离关系。
- [ ] [CF1017G The Tree](https://www.luogu.com.cn/problem/CF1017G) `挑战`：在线树上修改与查询。
- [ ] [CF487E Tourists](https://www.luogu.com.cn/problem/CF487E) `挑战`：圆方树 + 数据结构。

### Part 7.20 树上启发式合并 / DSU on Tree｜进阶主线

- [ ] [CF600E Lomsat gelral](https://www.luogu.com.cn/problem/CF600E)
- [ ] [CF570D Tree Requests](https://www.luogu.com.cn/problem/CF570D)
- [ ] [CF1009F Dominant Indices](https://www.luogu.com.cn/problem/CF1009F)
- [ ] [P9886 [ICPC 2018 Qingdao R] Kawa Exam](https://www.luogu.com.cn/problem/P9886)

- [ ] [CF600E Lomsat gelral](https://www.luogu.com.cn/problem/CF600E) `衔接`：DSU on Tree 标准入口。
- [ ] [CF741D Arpa’s letter-marked tree](https://www.luogu.com.cn/problem/CF741D) `主练`：子树路径与异或状态结合的启发式合并。
- [ ] [P7124 stcm](https://www.luogu.com.cn/problem/P7124) `挑战`：Ynoi 树上综合题。
- [ ] [P6072 Path](https://www.luogu.com.cn/problem/P6072) `挑战`：树上路径贡献统计。
- [ ] [P6071 Treequery](https://www.luogu.com.cn/problem/P6071) `挑战`：复杂树上询问。
- [ ] [CF150E Freezing with Style](https://www.luogu.com.cn/problem/CF150E) `主练`：点分治与路径长度限制。
- [ ] [P5439 永恒](https://www.luogu.com.cn/problem/P5439) `挑战`：树上距离与路径结构综合。
- [ ] [CF486D Valid Sets](https://www.luogu.com.cn/problem/CF486D) `主练`：以某个点为约束中心统计合法连通集合。
- [ ] [CF176E Archaeology](https://www.luogu.com.cn/problem/CF176E) `主练`：动态维护标记点集合及其距离量。
- [ ] [CF696E ...Wait for it...](https://www.luogu.com.cn/problem/CF696E) `挑战`：动态点集与树上距离结构综合。
- [ ] [P3320 寻宝游戏](https://www.luogu.com.cn/problem/P3320) `主练`：动态点集的虚树周长思想。

### Part 7.21 树套树｜地图保留

{% fold info @树套树 题单 %}
- [ ] [P3380 【模板】二逼平衡树（树套树）](https://www.luogu.com.cn/problem/P3380)
- [ ] [P1975 [国家集训队] 排队](https://www.luogu.com.cn/problem/P1975)
- [ ] [P3332 [ZJOI2013] K 大数查询](https://www.luogu.com.cn/problem/P3332)
- [ ] [P4278 带插入区间 K 小值](https://www.luogu.com.cn/problem/P4278)
- [ ] [P1903 [国家集训队] 数颜色 / 维护队列](https://www.luogu.com.cn/problem/P1903)
- [ ] [P3759 [TJOI2017] 不勤劳的图书管理员](https://www.luogu.com.cn/problem/P3759)
- [ ] [P3242 [HNOI2015] 接水果](https://www.luogu.com.cn/problem/P3242)
- [ ] [P3248 [HNOI2016] 树](https://www.luogu.com.cn/problem/P3248)
- [ ] [P5445 [APIO2019] 路灯](https://www.luogu.com.cn/problem/P5445)
{% endfold %}

### Part 7.22 01-Trie / 异或维护｜进阶主线

- [ ] [P4551 最长异或路径](https://www.luogu.com.cn/problem/P4551) `主练`：树上异或与 01 Trie 的经典衔接题。
- [ ] [P4735 最大异或和](https://www.luogu.com.cn/problem/P4735) `主练`：可持久化 01 Trie 的标准应用。
- [ ] [P5283 异或粽子](https://www.luogu.com.cn/problem/P5283) `挑战`：区间异或候选与多路最优维护结合。
- [ ] [CF241B Friends](https://www.luogu.com.cn/problem/CF241B) `挑战`：异或点对的前若干大统计。
- [ ] [P5795 异或运算](https://www.luogu.com.cn/problem/P5795) `挑战`：多询问下的异或选择问题。

### Part 7.23 异或数据结构综合｜进阶主线

- [x] [P3812 线性基](https://www.luogu.com.cn/problem/P3812) `衔接`：整理插入、判相关与最大异或模板。
- [ ] [P4151 最大 XOR 和路径](https://www.luogu.com.cn/problem/P4151) `主练`：图上环空间与线性基结合。
- [ ] [P4570 元素](https://www.luogu.com.cn/problem/P4570) `主练`：带权选择与线性独立性结合。
- [ ] [P3292 幸运数字](https://www.luogu.com.cn/problem/P3292) `挑战`：树上路径线性基。

### Part 7.24 CDQ 分治 / 整体二分｜进阶主线

- [ ] [P3810 三维偏序 / 陌上花开](https://www.luogu.com.cn/problem/P3810) `衔接`：CDQ 分治与树状数组的经典入口。
- [ ] [P4390 Mokia 摩基亚](https://www.luogu.com.cn/problem/P4390) `主练`：带时间维的二维统计。
- [ ] [P1527 矩阵乘法](https://www.luogu.com.cn/problem/P1527) `主练`：整体二分代表题。
- [ ] [P3527 MET-Meteors](https://www.luogu.com.cn/problem/P3527) `主练`：整体二分与区间修改结合。
- [ ] [P3769 TATT](https://www.luogu.com.cn/problem/P3769) `挑战`：更高维偏序与 DP 统计综合。
- [ ] [P4849 寻找宝藏](https://www.luogu.com.cn/problem/P4849) `挑战`：高维离线统计综合。
- [ ] [P4093 [HEOI2016/TJOI2016] 序列](https://www.luogu.com.cn/problem/P4093) `挑战`：CDQ + DP / 数据结构综合。
- [ ] [CF960F Pathwalks](https://www.luogu.com.cn/problem/CF960F) `挑战`：动态权值 DP + 数据结构。

### Part 7.25 时间线段树 / 可撤销并查集 / 动态连通性｜进阶主线

- [ ] [P5787 线段树分治 / 二分图](https://www.luogu.com.cn/problem/P5787) `衔接`：时间线段树与可撤销并查集入口。
- [ ] [SP9576 Dynamic Graph Connectivity](https://www.luogu.com.cn/problem/SP9576) `主练`：离线动态连通性的标准模型。
- [ ] [CF576E Painting Edges](https://www.luogu.com.cn/problem/CF576E) `挑战`：动态二分图判定。
- [ ] [CF938G Shortest Path Queries](https://www.luogu.com.cn/problem/CF938G) `挑战`：动态连通与异或路径综合。
- [ ] [P3206 城市建设](https://www.luogu.com.cn/problem/P3206) `暂存`：动态生成树问题。

### Part 7.26 动态树 / Link-Cut Tree｜地图保留

{% fold info @动态树 / Link-Cut Tree 题单 %}
- [ ] [P3690 【模板】Link Cut Tree](https://www.luogu.com.cn/problem/P3690)
- [ ] [P3203 [HNOI2010] 弹飞绵羊](https://www.luogu.com.cn/problem/P3203)
- [ ] [P4338 [ZJOI2018] 历史](https://www.luogu.com.cn/problem/P4338)
- [ ] [P4312 [COCI2009] OTCI](https://www.luogu.com.cn/problem/P4312)
- [ ] [P1501 [国家集训队] Tree II](https://www.luogu.com.cn/problem/P1501)
- [ ] [P2387 [NOI2014] 魔法森林](https://www.luogu.com.cn/problem/P2387)
- [ ] [P3348 [ZJOI2016] 大森林](https://www.luogu.com.cn/problem/P3348)
- [ ] [P3703 [SDOI2017] 树点涂色](https://www.luogu.com.cn/problem/P3703)
- [ ] [P4172 [WC2006] 水管局长](https://www.luogu.com.cn/problem/P4172)
- [ ] [P4219 [BJOI2014] 大融合](https://www.luogu.com.cn/problem/P4219)
- [ ] [P5489 EntropyIncreaser 与 动态图](https://www.luogu.com.cn/problem/P5489)
{% endfold %}

{% fold info @LCT 扩展训练 %}
- [ ] [P3690 动态树](https://www.luogu.com.cn/problem/P3690) `衔接`：LCT 模板入口。
- [ ] [P1501 Tree II](https://www.luogu.com.cn/problem/P1501) `主练`：路径修改与路径查询的标准应用。
- [ ] [P2387 魔法森林](https://www.luogu.com.cn/problem/P2387) `主练`：动态图与路径信息维护综合。
- [ ] [P4219 大融合](https://www.luogu.com.cn/problem/P4219) `复盘`：已在树论题单出现。
- [ ] [P4216 情报传递](https://www.luogu.com.cn/problem/P4216) `主练`：树链剖分与时间维询问结合。
- [ ] [P5773 轻重路径](https://www.luogu.com.cn/problem/P5773) `主练`：路径修改与全局结构统计。
- [ ] [P5659 树上的数](https://www.luogu.com.cn/problem/P5659) `挑战`：树上排列调整与局部操作综合。
- [ ] [P6074 最小路径](https://www.luogu.com.cn/problem/P6074) `挑战`：树上路径选择与整体最优结构。
- [ ] [CF536E Tavas on the Path](https://www.luogu.com.cn/problem/CF536E) `挑战`：复杂路径询问与树上数据结构。
- [ ] [CF1344E Train Tracks](https://www.luogu.com.cn/problem/CF1344E) `挑战`：多层树结构上的路径约束。
- [ ] [CF983E NN country](https://www.luogu.com.cn/problem/CF983E) `挑战`：路径跳跃与离线、倍增结构综合。
- [ ] [CF1140G Double Tree](https://www.luogu.com.cn/problem/CF1140G) `挑战`：双树结构之间的距离关系。
- [ ] [CF1017G The Tree](https://www.luogu.com.cn/problem/CF1017G) `挑战`：在线树上修改与查询。
{% endfold %}

### Part 7.27 可持久化数据结构｜进阶主线

- [ ] [P3919 【模板】可持久化数组](https://www.luogu.com.cn/problem/P3919)
- [ ] [P3834 【模板】可持久化线段树 1（主席树）](https://www.luogu.com.cn/problem/P3834)
- [ ] [P3402 【模板】可持久化并查集](https://www.luogu.com.cn/problem/P3402)
- [ ] [P3835 【模板】可持久化平衡树](https://www.luogu.com.cn/problem/P3835)
- [ ] [P5055 【模板】可持久化文艺平衡树](https://www.luogu.com.cn/problem/P5055)
- [ ] [P5283 [十二省联考2019] 异或粽子](https://www.luogu.com.cn/problem/P5283)

### Part 7.28 动态 DP 的数据结构视角｜地图保留

{% fold info @动态 DP 的数据结构视角 %}
- [ ] [P4751 动态 DP（加强版）](https://www.luogu.com.cn/problem/P4751) `衔接`：动态 DP 模板入口。
- [ ] [P5024 保卫王国](https://www.luogu.com.cn/problem/P5024) `主练`：树形 DP 与多次强制选择询问。
- [ ] [P6021 洪水](https://www.luogu.com.cn/problem/P6021) `挑战`：动态树形状态维护综合。
{% endfold %}

### Part 7.29 特殊整数数据结构｜近似忽略

{% fold info @特殊整数数据结构 %}
- [ ] [P6105 y-fast trie](https://www.luogu.com.cn/problem/P6105) `暂存`：整数前驱后继的亚对数结构。
- [ ] [P6018 Fusion tree](https://www.luogu.com.cn/problem/P6018) `暂存`：融合树属于特殊整数数据结构。
{% endfold %}

### Part 7.30 K-D Tree｜地图保留

{% fold info @K-D Tree 题单 %}
- [ ] [P4357 [CQOI2016] K 远点对](https://www.luogu.com.cn/problem/P4357)
- [ ] [P4148 简单题](https://www.luogu.com.cn/problem/P4148)
- [ ] [P2479 [SDOI2010] 捉迷藏](https://www.luogu.com.cn/problem/P2479)
- [ ] [P3769 TATT](https://www.luogu.com.cn/problem/P3769)
- [ ] [P4169 [Violet] 天使玩偶 / SJY 摆棋子](https://www.luogu.com.cn/problem/P4169)
- [ ] [P4390 [BOI2007] Mokia](https://www.luogu.com.cn/problem/P4390)
- [ ] [P4475 巧克力王国](https://www.luogu.com.cn/problem/P4475)
- [ ] [P2093 [国家集训队] JZPFAR](https://www.luogu.com.cn/problem/P2093)
- [ ] [P5471 [NOI2019] 弹跳](https://www.luogu.com.cn/problem/P5471)
{% endfold %}

### Part 7.31 珂朵莉树 ODT｜近似忽略

{% fold info @珂朵莉树 ODT 题单 %}
- [ ] [P5251 [LnOI2019] 第二代图灵机](https://www.luogu.com.cn/problem/P5251)
- [ ] [P5350 序列](https://www.luogu.com.cn/problem/P5350)
{% endfold %}

### Part 7.32 数据结构综合｜地图保留

{% fold info @数据结构综合题 %}
- [ ] [P5324 删数](https://www.luogu.com.cn/problem/P5324) `暂存`：值域维护与整体变化结合。
- [ ] [P5327 语言](https://www.luogu.com.cn/problem/P5327) `暂存`：树上路径关系与数据结构综合。
- [ ] [P5344 逛森林](https://www.luogu.com.cn/problem/P5344) `暂存`：图论、树上结构与数据结构综合。
- [ ] [P5445 路灯](https://www.luogu.com.cn/problem/P5445) `暂存`：时间维与动态连通结构综合。
- [ ] [P5044 meetings 会议](https://www.luogu.com.cn/problem/P5044) `暂存`：IOI 级区间结构题。
- [ ] [P4899 werewolf 狼人](https://www.luogu.com.cn/problem/P4899) `暂存`：重构树、可达关系与离线询问综合。
{% endfold %}

## Part 8 图论与树论

### Part 8.1 图的存储与遍历｜主线

{% fold info @图的存储与遍历 题单 %}
- [ ] [P2661 信息传递](https://www.luogu.com.cn/problem/P2661)
- [ ] [P2921 [USACO08DEC] Trick or Treat on the Farm](https://www.luogu.com.cn/problem/P2921)
{% endfold %}

### Part 8.2 最短路｜主线

- [ ] [P3371 【模板】单源最短路径（弱化版）](https://www.luogu.com.cn/problem/P3371)
- [x] [P4779 【模板】单源最短路径（标准版）](https://www.luogu.com.cn/problem/P4779)
- [ ] [P5905 【模板】Johnson 全源最短路](https://www.luogu.com.cn/problem/P5905)
- [x] [P1144 最短路计数](https://www.luogu.com.cn/problem/P1144)
- [x] [P1462 通往奥格瑞玛的道路](https://www.luogu.com.cn/problem/P1462)
- [ ] [P1522 Cow Tours](https://www.luogu.com.cn/problem/P1522)
- [ ] [P1266 速度限制](https://www.luogu.com.cn/problem/P1266)
- [ ] [P4001 [ICPC-Beijing 2006] 狼抓兔子](https://www.luogu.com.cn/problem/P4001)
- [x] [P4568 [JLOI2011] 飞行路线](https://www.luogu.com.cn/problem/P4568)
- [ ] [P3238 [HNOI2014] 道路堵塞](https://www.luogu.com.cn/problem/P3238)
- [ ] [P5304 [GXOI/GZOI2019] 旅行者](https://www.luogu.com.cn/problem/P5304)

- [x] [P3385 【模板】负环](https://www.luogu.com.cn/problem/P3385)

- [ ] [P3371 单源最短路径（弱化版）](https://www.luogu.com.cn/problem/P3371) `衔接`：统一最短路状态与松弛过程。
- [x] [P4779 单源最短路径（标准版）](https://www.luogu.com.cn/problem/P4779) `衔接`：整理堆优化 Dijkstra。
- [ ] [P1346 电车](https://www.luogu.com.cn/problem/P1346) `主练`：训练把操作代价准确映射为边权。
- [x] [P1144 最短路计数](https://www.luogu.com.cn/problem/P1144) `主练`：在最短距离之外继续维护方案数量。
- [ ] [P1119 灾后重建](https://www.luogu.com.cn/problem/P1119) `主练`：理解 Floyd 的阶段含义。
- [ ] [P4822 冻结](https://www.luogu.com.cn/problem/P4822) `主练`：额外资源次数进入最短路状态。
- [ ] [CF1076D Edge Deletion](https://www.luogu.com.cn/problem/CF1076D) `主练`：从最短路结构中保留有限数量的关键边。
- [ ] [P5304 旅行者](https://www.luogu.com.cn/problem/P5304) `主练`：多源最短路与点集间距离。
- [ ] [P2829 大逃离](https://www.luogu.com.cn/problem/P2829) `挑战`：带限制的路径建模。
- [ ] [P4745 Gambling Guide](https://www.luogu.com.cn/problem/P4745) `挑战`：随机过程与最短路思想结合。
- [ ] [CF827F Dirty Arkady's Kitchen](https://www.luogu.com.cn/problem/CF827F) `挑战`：时间窗口限制下的最短路。
- [ ] [P6833 雷雨](https://www.luogu.com.cn/problem/P6833) `挑战`：网格与图模型综合。
- [ ] [P2865 [USACO06NOV] Roadblocks G](https://www.luogu.com.cn/problem/P2865) `主练`：次短路。
- [ ] [P1073 [NOIP2009] 最优贸易](https://www.luogu.com.cn/problem/P1073) `主练`：分层图 / 最短路式 DP。
- [ ] [P3403 跳楼机](https://www.luogu.com.cn/problem/P3403) `主练`：同余类最短路。
- [ ] [P2047 [NOI2007] 社交网络](https://www.luogu.com.cn/problem/P2047) `挑战`：Floyd + 最短路计数贡献。

### Part 8.3 0-1 BFS｜主线

原题单没有独立列出。核心是边权只含 0/1 时用双端队列维护最短路。

- [ ] [P4667 [BalticOI 2011 Day1] Switch the Lamp On](https://www.luogu.com.cn/problem/P4667)

### Part 8.4 路径结构 / 环 / 固定步数｜进阶主线

- [ ] [P2149 Elaxia 的路线](https://www.luogu.com.cn/problem/P2149) `主练`：分析两组最短路结构能够共同经过的部分。
- [ ] [P2151 HH 去散步](https://www.luogu.com.cn/problem/P2151) `主练`：固定步数路径计数。
- [ ] [P6175 无向图的最小环问题](https://www.luogu.com.cn/problem/P6175) `主练`：比较不同最小环求法及适用条件。
- [ ] [P5837 Milk Pumping G](https://www.luogu.com.cn/problem/P5837) `主练`：路径收益与代价共同出现。
- [ ] [P3489 WIE-Hexer](https://www.luogu.com.cn/problem/P3489) `挑战`：最短路状态中带有通行能力。
- [ ] [P3573 RAJ-Rally](https://www.luogu.com.cn/problem/P3573) `挑战`：DAG 上删除一个点后的最长路径。
- [ ] [P2761 软件补丁问题](https://www.luogu.com.cn/problem/P2761) `主练`：状态图最短路 / 状压。

### Part 8.5 二叉树基础｜地图保留

{% fold info @二叉树 题单 %}
- [ ] [P1087 FBI 树](https://www.luogu.com.cn/problem/P1087)
- [ ] [P1030 求先序排列](https://www.luogu.com.cn/problem/P1030)
- [ ] [P1305 新二叉树](https://www.luogu.com.cn/problem/P1305)
- [ ] [P1229 遍历问题](https://www.luogu.com.cn/problem/P1229)
- [ ] [P5018 对称二叉树](https://www.luogu.com.cn/problem/P5018)
- [ ] [P5597 【XR-4】复读](https://www.luogu.com.cn/problem/P5597)
{% endfold %}

### Part 8.6 树的直径｜主线

- [ ] [P2195 HXY 造公园](https://www.luogu.com.cn/problem/P2195)
- [x] [P3629 [APIO2010] 巡逻](https://www.luogu.com.cn/problem/P3629)
- [ ] [P5536 【XR-3】核心城市](https://www.luogu.com.cn/problem/P5536)
- [x] [P1099 树网的核](https://www.luogu.com.cn/problem/P1099)
- [ ] [P4408 [NOI2003] 逃学的小孩](https://www.luogu.com.cn/problem/P4408)

### Part 8.7 LCA / 倍增 / 树上差分｜主线

- [x] [P3379 【模板】最近公共祖先（LCA）](https://www.luogu.com.cn/problem/P3379)
- [ ] [P3938 斐波那契](https://www.luogu.com.cn/problem/P3938)
- [ ] [P4281 [AHOI2008] 紧急集合 / 聚会](https://www.luogu.com.cn/problem/P4281)

- [ ] [P3128 Max Flow P](https://www.luogu.com.cn/problem/P3128) `衔接`：点路径差分的标准练习。
- [ ] [P3258 松鼠的新家](https://www.luogu.com.cn/problem/P3258) `衔接`：路径访问次数统计。
- [ ] [P2680 运输计划](https://www.luogu.com.cn/problem/P2680) `主练`：路径差分与二分答案综合。
- [ ] [P1600 天天爱跑步](https://www.luogu.com.cn/problem/P1600) `主练`：路径、深度与时间条件共同参与统计。
- [ ] [P4211 LCA](https://www.luogu.com.cn/problem/P4211) `主练`：离线询问与树上前缀信息结合。
- [ ] [P5836 Milk Visits S](https://www.luogu.com.cn/problem/P5836) `衔接`：路径上类别存在性查询。
- [ ] [P1084 疫情控制](https://www.luogu.com.cn/problem/P1084) `挑战`：倍增、二分与树上资源分配。
- [ ] [P1081 开车旅行](https://www.luogu.com.cn/problem/P1081) `挑战`：倍增维护非标准跳转信息。
- [ ] [P4427 求和](https://www.luogu.com.cn/problem/P4427) `主练`：路径统计与深度幂和预处理。
- [ ] [P5021 赛道修建](https://www.luogu.com.cn/problem/P5021) `挑战`：树上二分答案与路径配对。
- [ ] [P5022 旅行](https://www.luogu.com.cn/problem/P5022) `主练`：基环树上求字典序遍历。
- [ ] [P5049 旅行 加强版](https://www.luogu.com.cn/problem/P5049) `挑战`：继续处理更复杂的环结构。
- [ ] [P3038 [USACO11DEC] Grass Planting G](https://www.luogu.com.cn/problem/P3038) `主练`：树上差分 / 树链维护。
- [ ] [P3398 仓鼠找 sugar](https://www.luogu.com.cn/problem/P3398) `主练`：LCA 与路径相交判定。
- [ ] [P4092 [HEOI2016/TJOI2016] 树](https://www.luogu.com.cn/problem/P4092) `主练`：树上查询与标记。
- [ ] [P4116 Qtree3](https://www.luogu.com.cn/problem/P4116) `主练`：树链剖分上的最近标记点。

### Part 8.8 树的基础结构与树形递推｜主线

- [x] [P1352 没有上司的舞会](https://www.luogu.com.cn/problem/P1352) `衔接`：树形 DP 入门。
- [ ] [P1122 最大子树和](https://www.luogu.com.cn/problem/P1122) `衔接`：树上连通块最优值。
- [ ] [P2015 二叉苹果树](https://www.luogu.com.cn/problem/P2015) `主练`：树上背包经典题。
- [x] [P2014 选课](https://www.luogu.com.cn/problem/P2014) `主练`：依赖型树上背包。
- [x] [P1273 有线电视网](https://www.luogu.com.cn/problem/P1273) `衔接`：树上背包的收益版本。
- [ ] [P2585 三色二叉树](https://www.luogu.com.cn/problem/P2585) `主练`：树形状态分类题。
- [ ] [P1131 时态同步](https://www.luogu.com.cn/problem/P1131) `主练`：树上代价平衡问题。
- [ ] [P5658 括号树](https://www.luogu.com.cn/problem/P5658) `主练`：根路径括号信息与树形统计结合。
- [ ] [P3574 FAR-FarmCraft](https://www.luogu.com.cn/problem/P3574) `主练`：树形 DP 与子树访问顺序结合。
- [ ] [P4438 道路](https://www.luogu.com.cn/problem/P4438) `挑战`：多层树形决策题。
- [ ] [P2515 软件安装](https://www.luogu.com.cn/problem/P2515) `挑战`：强连通缩点后进行依赖背包。
- [ ] [P2305 购票](https://www.luogu.com.cn/problem/P2305) `挑战`：树上祖先转移与优化结构结合。
- [ ] [P5666 树的重心](https://www.luogu.com.cn/problem/P5666) `衔接`：重心性质与删除点后的连通块大小。
- [ ] [P5536 核心城市](https://www.luogu.com.cn/problem/P5536) `主练`：围绕树的核心部分进行选择。
- [ ] [P2726 树的双中心](https://www.luogu.com.cn/problem/P2726) `主练`：从单中心扩展到双中心。
- [ ] [P1351 联合权值](https://www.luogu.com.cn/problem/P1351) `主练`：距离为二的点对统计。
- [ ] [P7073 表达式](https://www.luogu.com.cn/problem/P7073) `衔接`：表达式树求值与修改影响。
- [ ] [P3478 STA-Station](https://www.luogu.com.cn/problem/P3478) `主练`：换根 DP 经典题。
- [ ] [P2607 骑士](https://www.luogu.com.cn/problem/P2607) `主练`：基环树 DP。
- [ ] [P5024 保卫王国](https://www.luogu.com.cn/problem/P5024) `挑战`：树形 DP 与多次强制选择询问。
- [ ] [P1395 会议](https://www.luogu.com.cn/problem/P1395) `衔接`：树重心经典题。
- [ ] [P2052 [NOI2011] 道路修建](https://www.luogu.com.cn/problem/P2052) `主练`：树边贡献统计。

### Part 8.9 最小生成树及其扩展｜主线

- [x] [P3366 【模板】最小生成树](https://www.luogu.com.cn/problem/P3366)
- [x] [P4180 【模板】严格次小生成树](https://www.luogu.com.cn/problem/P4180)
- [ ] [P2872 [USACO07DEC] Building Roads](https://www.luogu.com.cn/problem/P2872)
- [ ] [P1991 无线通讯网](https://www.luogu.com.cn/problem/P1991)
- [x] [P1967 货车运输](https://www.luogu.com.cn/problem/P1967)
- [ ] [P4047 [JSOI2010] 部落划分](https://www.luogu.com.cn/problem/P4047)

- [x] [P3366 最小生成树](https://www.luogu.com.cn/problem/P3366) `衔接`：整理 Kruskal 与 Prim 的适用场景。
- [ ] [P1195 口袋的天空](https://www.luogu.com.cn/problem/P1195) `衔接`：从完整生成树过渡到指定连通块数量。
- [ ] [P1550 Watering Hole G](https://www.luogu.com.cn/problem/P1550) `主练`：虚拟源点与生成树建模。
- [ ] [P2498 拯救小云公主](https://www.luogu.com.cn/problem/P2498) `主练`：几何距离与连通阈值结合。
- [ ] [P2700 逐个击破](https://www.luogu.com.cn/problem/P2700) `主练`：带关键点限制的生成结构。
- [x] [P4180 严格次小生成树](https://www.luogu.com.cn/problem/P4180) `主练`：生成树替换边与路径最大边查询。
- [ ] [P3623 免费道路](https://www.luogu.com.cn/problem/P3623) `主练`：带指定类型边数量的生成树。
- [ ] [CF76A Gift](https://www.luogu.com.cn/problem/CF76A) `挑战`：两类边权共同决定代价。
- [ ] [CF609E Minimum spanning tree for each edge](https://www.luogu.com.cn/problem/CF609E) `挑战`：计算每条边强制选入后的最优生成树。
- [x] [P1967 货车运输](https://www.luogu.com.cn/problem/P1967) `主练`：最大瓶颈路。
- [ ] [P5633 最小度限制生成树](https://www.luogu.com.cn/problem/P5633) `挑战`：带点度数限制的生成树构造。
- [x] [P3958 奶酪](https://www.luogu.com.cn/problem/P3958) `复盘`：已在并查集题单中训练。
- [ ] [P1194 买礼物](https://www.luogu.com.cn/problem/P1194) `衔接`：MST 建模。
- [ ] [P1396 营救](https://www.luogu.com.cn/problem/P1396) `衔接`：最小瓶颈路。
- [ ] [CF1245D Shichikuji and Power Grid](https://www.luogu.com.cn/problem/CF1245D) `主练`：虚拟源点 + MST。
- [ ] [CF1120D Power Tree](https://www.luogu.com.cn/problem/CF1120D) `挑战`：生成树 / 贪心结构综合。

### Part 8.10 拓扑排序 / DAG 递推｜主线

- [x] [P1113 杂务](https://www.luogu.com.cn/problem/P1113)
- [x] [P1983 车站分级](https://www.luogu.com.cn/problem/P1983)
- [x] [P1038 神经网络](https://www.luogu.com.cn/problem/P1038)

- [x] [P3387 缩点](https://www.luogu.com.cn/problem/P3387) `衔接`：作为 SCC + DAG DP 的标准入口。
- [ ] [P4316 绿豆蛙的归宿](https://www.luogu.com.cn/problem/P4316) `衔接`：DAG 上期望 DP 入门。
- [ ] [P2656 采蘑菇](https://www.luogu.com.cn/problem/P2656) `主练`：强连通分量与 DAG 最优路径结合。
- [ ] [P1613 跑路](https://www.luogu.com.cn/problem/P1613) `主练`：路径长度状态与图最短路结合。
- [ ] [P3953 逛公园](https://www.luogu.com.cn/problem/P3953) `主练`：最短路、有限冗余路径计数与环判定综合题。
- [ ] [P7077 函数调用](https://www.luogu.com.cn/problem/P7077) `主练`：调用图上的贡献传播。
- [ ] [P6772 美食家](https://www.luogu.com.cn/problem/P6772) `挑战`：时间限制下的图上最优路径。
- [ ] [P7516 图函数](https://www.luogu.com.cn/problem/P7516) `挑战`：有向图可达关系与删边过程综合。
- [ ] [P2341 受欢迎的牛 G](https://www.luogu.com.cn/problem/P2341) `主练`：从缩点后的出度结构判断唯一候选。
- [ ] [P2002 消息扩散](https://www.luogu.com.cn/problem/P2002) `主练`：缩点后统计需要独立启动的部分。
- [ ] [P3627 抢掠计划](https://www.luogu.com.cn/problem/P3627) `主练`：缩点后在 DAG 上做最优路径。
- [ ] [P2812 校园网络](https://www.luogu.com.cn/problem/P2812) `主练`：综合处理缩点 DAG 的入度与出度。
- [ ] [P5008 锦鲤抄](https://www.luogu.com.cn/problem/P5008) `主练`：从强连通结构中识别必须保留的代价。
- [ ] [P2419 Cow Contest S](https://www.luogu.com.cn/problem/P2419) `主练`：传递闭包与可比较关系统计。
- [x] [P1113 杂务](https://www.luogu.com.cn/problem/P1113) `衔接`：拓扑序上的最长完成时间。
- [ ] [P3243 菜肴制作](https://www.luogu.com.cn/problem/P3243) `主练`：字典序要求下的拓扑排序。
- [ ] [B3611 【模板】传递闭包](https://www.luogu.com.cn/problem/B3611) `衔接`：Floyd / bitset 可达性。

### Part 8.11 差分约束 / 特殊最短路｜主线

- [ ] [P5960 【模板】差分约束算法](https://www.luogu.com.cn/problem/P5960)
- [ ] [P3275 [SCOI2011] 糖果](https://www.luogu.com.cn/problem/P3275)
- [ ] [P2294 [HNOI2005] 狡猾的商人](https://www.luogu.com.cn/problem/P2294)
- [ ] [P4926 [1007] 倍杀测量者](https://www.luogu.com.cn/problem/P4926)
- [ ] [P5590 赛车游戏](https://www.luogu.com.cn/problem/P5590)

- [ ] [P1993 小 K 的农场](https://www.luogu.com.cn/problem/P1993) `衔接`：差分约束标准入口。
- [ ] [P3275 糖果](https://www.luogu.com.cn/problem/P3275) `主练`：差分约束与强连通结构结合。
- [ ] [P7515 矩阵游戏](https://www.luogu.com.cn/problem/P7515) `主练`：矩阵条件转约束图。
- [ ] [P3199 最小圈](https://www.luogu.com.cn/problem/P3199) `主练`：最小平均环代表题。
- [ ] [P2371 墨墨的等式](https://www.luogu.com.cn/problem/P2371) `主练`：同余类上的最短路。

### Part 8.12 强连通分量 / 缩点 DAG｜主线

- [x] [P3387 【模板】缩点](https://www.luogu.com.cn/problem/P3387)
- [x] [P3388 【模板】割点](https://www.luogu.com.cn/problem/P3388)
- [x] [P2341 [HAOI2006] 受欢迎的牛](https://www.luogu.com.cn/problem/P2341)
- [ ] [P2863 [USACO06JAN] The Cow Prom](https://www.luogu.com.cn/problem/P2863)
- [x] [P2746 [USACO5.3] Network of Schools](https://www.luogu.com.cn/problem/P2746)
- [ ] [P1407 [国家集训队] 稳定婚姻](https://www.luogu.com.cn/problem/P1407)
- [ ] [P2272 [ZJOI2007] 最大半连通子图](https://www.luogu.com.cn/problem/P2272)
- [x] [P3225 [HNOI2012] 矿场搭建](https://www.luogu.com.cn/problem/P3225)
- [ ] [P5058 [ZJOI2004] 嗅探器](https://www.luogu.com.cn/problem/P5058)
- [ ] [P2515 [HAOI2010] 软件安装](https://www.luogu.com.cn/problem/P2515)

- [x] [P3387 缩点 / 强连通分量](https://www.luogu.com.cn/problem/P3387) `衔接`：SCC 与缩点 DAG 的标准入口。
- [ ] [P2341 受欢迎的牛 G](https://www.luogu.com.cn/problem/P2341) `主练`：从缩点后的出度结构判断唯一候选。
- [ ] [P2002 消息扩散](https://www.luogu.com.cn/problem/P2002) `主练`：缩点后统计需要独立启动的部分。
- [ ] [P3627 抢掠计划](https://www.luogu.com.cn/problem/P3627) `主练`：缩点后在 DAG 上做最优路径。
- [ ] [P2812 校园网络](https://www.luogu.com.cn/problem/P2812) `主练`：综合处理缩点 DAG 的入度与出度。
- [ ] [P5008 锦鲤抄](https://www.luogu.com.cn/problem/P5008) `主练`：从强连通结构中识别必须保留的代价。
- [ ] [P2419 Cow Contest S](https://www.luogu.com.cn/problem/P2419) `主练`：传递闭包与可比较关系统计。
- [x] [P1113 杂务](https://www.luogu.com.cn/problem/P1113) `衔接`：拓扑序上的最长完成时间。
- [ ] [P3243 菜肴制作](https://www.luogu.com.cn/problem/P3243) `主练`：字典序要求下的拓扑排序。
- [ ] [P1262 [POI1996 R3] 间谍网络](https://www.luogu.com.cn/problem/P1262) `主练`：SCC 与可达性判定。
- [ ] [P5025 [SNOI2017] 炸弹](https://www.luogu.com.cn/problem/P5025) `挑战`：区间连边 + SCC。
- [ ] [P4819 [中山市选] 杀人游戏](https://www.luogu.com.cn/problem/P4819) `挑战`：SCC + 概率 / 计数。
- [ ] [P7737 [NOI2021] 庆典](https://www.luogu.com.cn/problem/P7737) `挑战`：高阶 DAG / 支配结构相关。

### Part 8.13 割点 / 桥 / 双连通 / 圆方树｜主线

- [x] [P8436 【模板】边双连通分量](https://www.luogu.com.cn/problem/P8436)
- [x] [P8435 【模板】点双连通分量](https://www.luogu.com.cn/problem/P8435)
- [ ] [CF1000E We Need More Bosses](https://www.luogu.com.cn/problem/CF1000E)

- [x] [P3388 割点（割顶）](https://www.luogu.com.cn/problem/P3388) `衔接`：整理时间戳与 low 值的含义。
- [ ] [P3469 BLO-Blockade](https://www.luogu.com.cn/problem/P3469) `主练`：割点造成的点对贡献统计。
- [ ] [P3225 矿场搭建](https://www.luogu.com.cn/problem/P3225) `主练`：点双连通分量与方案计数。
- [ ] [P7771 欧拉路径](https://www.luogu.com.cn/problem/P7771) `衔接`：整理有向图欧拉路径的存在条件与构造。
- [ ] [P1656 炸铁路](https://www.luogu.com.cn/problem/P1656) `衔接`：桥的直接应用。
- [ ] [P2860 [USACO06JAN] Redundant Paths G](https://www.luogu.com.cn/problem/P2860) `主练`：边双缩点后补边。
- [ ] [P4630 [APIO2018] 铁人两项](https://www.luogu.com.cn/problem/P4630) `挑战`：圆方树 / 点双贡献统计。
- [ ] [P4606 [SDOI2018] 战略游戏](https://www.luogu.com.cn/problem/P4606) `挑战`：虚树 + 圆方树。
- [ ] [CF487E Tourists](https://www.luogu.com.cn/problem/CF487E) `挑战`：圆方树 + 数据结构。

### Part 8.14 欧拉路径 / 欧拉回路｜主线

- [ ] [P7771 【模板】欧拉路径](https://www.luogu.com.cn/problem/P7771)

### Part 8.15 二分图 / 染色 / 匹配｜主线

- [x] [P3386 【模板】二分图匹配](https://www.luogu.com.cn/problem/P3386)
- [x] [P2756 飞行员配对方案问题](https://www.luogu.com.cn/problem/P2756)
- [ ] [P1129 [ZJOI2007] 矩阵游戏](https://www.luogu.com.cn/problem/P1129)
- [ ] [P1559 运动员最佳匹配问题](https://www.luogu.com.cn/problem/P1559)
- [ ] [P2423 [HEOI2012] 朋友圈](https://www.luogu.com.cn/problem/P2423)
- [x] [P2764 最小路径覆盖问题](https://www.luogu.com.cn/problem/P2764)
- [ ] [P2825 [HEOI2016/TJOI2016] 游戏](https://www.luogu.com.cn/problem/P2825)
- [ ] [P3033 [USACO11NOV] Cow Steeplechase](https://www.luogu.com.cn/problem/P3033)
- [ ] [P3731 [HAOI2017] 新型城市化](https://www.luogu.com.cn/problem/P3731)
- [x] [P4014 分配问题](https://www.luogu.com.cn/problem/P4014)
- [ ] [P4617 [COCI2017-2018#5] Planinarenje](https://www.luogu.com.cn/problem/P4617)

- [ ] [P3430 DWU-Double-row](https://www.luogu.com.cn/problem/P3430) `衔接`：二染色入门。
- [ ] [CF741C Arpa’s overnight party](https://www.luogu.com.cn/problem/CF741C) `衔接`：限制条件转二分图染色。
- [ ] [P1155 双栈排序](https://www.luogu.com.cn/problem/P1155) `主练`：冲突图与可行性判定结合。
- [ ] [CF1444C Team-Building](https://www.luogu.com.cn/problem/CF1444C) `主练`：多颜色点集的二分图判定。
- [x] [P3386 二分图最大匹配](https://www.luogu.com.cn/problem/P3386) `衔接`：整理增广路模型与复杂度。
- [ ] [P1477 假面舞会](https://www.luogu.com.cn/problem/P1477) `挑战`：图上关系一致性与环约束综合。

### Part 8.16 最大流｜主线

- [x] [P3376 【模板】网络最大流](https://www.luogu.com.cn/problem/P3376)
- [ ] [P4722 【模板】最大流加强版 / 预流推进](https://www.luogu.com.cn/problem/P4722)
- [ ] [P2065 [TJOI2011] 卡片](https://www.luogu.com.cn/problem/P2065)
- [x] [P2763 试题库问题](https://www.luogu.com.cn/problem/P2763)
- [ ] [P2472 [SCOI2007] 蜥蜴](https://www.luogu.com.cn/problem/P2472)
- [ ] [P2754 [CTSC1999] 家园](https://www.luogu.com.cn/problem/P2754)
- [ ] [P2765 魔术球问题](https://www.luogu.com.cn/problem/P2765)
- [ ] [P2766 最长不下降子序列问题](https://www.luogu.com.cn/problem/P2766)
- [ ] [P2805 [NOI2009] 植物大战僵尸](https://www.luogu.com.cn/problem/P2805)
- [ ] [P3749 [六省联考2017] 寿司餐厅](https://www.luogu.com.cn/problem/P3749)

### Part 8.17 最小割｜主线

- [ ] [P1344 [USACO4.4] Pollutant Control](https://www.luogu.com.cn/problem/P1344)
- [x] [P1345 [USACO5.4] Telecowmunication](https://www.luogu.com.cn/problem/P1345)
- [ ] [P2057 [SHOI2007] 善意的投票](https://www.luogu.com.cn/problem/P2057)
- [ ] [P2598 [ZJOI2009] 狼和羊的故事](https://www.luogu.com.cn/problem/P2598)
- [x] [P2774 方格取数问题](https://www.luogu.com.cn/problem/P2774)
- [ ] [P4126 [AHOI2009] 最小割](https://www.luogu.com.cn/problem/P4126)
- [ ] [P5039 [SHOI2010] 最小生成树](https://www.luogu.com.cn/problem/P5039)

### Part 8.18 费用流｜主线

- [x] [P3381 【模板】最小费用最大流](https://www.luogu.com.cn/problem/P3381)
- [ ] [P4016 负载平衡问题](https://www.luogu.com.cn/problem/P4016)
- [ ] [P4452 [国家集训队] 航班安排](https://www.luogu.com.cn/problem/P4452)
- [ ] [P2045 方格取数加强版](https://www.luogu.com.cn/problem/P2045)
- [ ] [P2050 [NOI2012] 美食节](https://www.luogu.com.cn/problem/P2050)
- [ ] [P2053 [SCOI2007] 修车](https://www.luogu.com.cn/problem/P2053)
- [ ] [P2604 [ZJOI2010] 网络扩容](https://www.luogu.com.cn/problem/P2604)
- [ ] [P2770 航空路线问题](https://www.luogu.com.cn/problem/P2770)
- [ ] [P3159 [CQOI2012] 交换棋子](https://www.luogu.com.cn/problem/P3159)
- [ ] [P3356 火星探险问题](https://www.luogu.com.cn/problem/P3356)
- [ ] [P3358 最长 k 可重区间集问题](https://www.luogu.com.cn/problem/P3358)
- [ ] [P4013 数字梯形问题](https://www.luogu.com.cn/problem/P4013)
- [x] [P4015 运输问题](https://www.luogu.com.cn/problem/P4015)
- [ ] [P5331 [SNOI2019] 通信](https://www.luogu.com.cn/problem/P5331)

- [x] [P1251 餐巾计划问题](https://www.luogu.com.cn/problem/P1251)

### Part 8.19 上下界网络流｜进阶主线

- [ ] [P3980 [NOI2008] 志愿者招募](https://www.luogu.com.cn/problem/P3980)
- [ ] [P4043 [AHOI2014/JSOI2014] 支线剧情](https://www.luogu.com.cn/problem/P4043)
- [ ] [P4553 80人环游世界](https://www.luogu.com.cn/problem/P4553)
- [ ] [P4843 清理雪道](https://www.luogu.com.cn/problem/P4843)

### Part 8.20 2-SAT｜主线

- [x] [P4782 【模板】2-SAT 问题](https://www.luogu.com.cn/problem/P4782)
- [ ] [P4171 [JSOI2010] 满汉全席](https://www.luogu.com.cn/problem/P4171)
- [ ] [P3825 [NOI2017] 游戏](https://www.luogu.com.cn/problem/P3825)
- [ ] [P5332 [JSOI2019] 精准预测](https://www.luogu.com.cn/problem/P5332)

### Part 8.21 树链剖分 / 动态树 / 复杂路径查询｜进阶主线

- [ ] [P4219 大融合](https://www.luogu.com.cn/problem/P4219) `主练`：动态加边与路径信息。
- [ ] [P4216 情报传递](https://www.luogu.com.cn/problem/P4216) `主练`：树链剖分与时间维询问结合。
- [ ] [P5773 轻重路径](https://www.luogu.com.cn/problem/P5773) `主练`：路径修改与全局结构统计。
- [ ] [P5659 树上的数](https://www.luogu.com.cn/problem/P5659) `挑战`：树上排列调整与局部操作综合。
- [ ] [P6074 最小路径](https://www.luogu.com.cn/problem/P6074) `挑战`：树上路径选择与整体最优结构。
- [ ] [CF536E Tavas on the Path](https://www.luogu.com.cn/problem/CF536E) `挑战`：复杂路径询问与树上数据结构。
- [ ] [CF1344E Train Tracks](https://www.luogu.com.cn/problem/CF1344E) `挑战`：多层树结构上的路径约束。
- [ ] [CF983E NN country](https://www.luogu.com.cn/problem/CF983E) `挑战`：路径跳跃与离线、倍增结构综合。
- [ ] [CF1140G Double Tree](https://www.luogu.com.cn/problem/CF1140G) `挑战`：双树结构之间的距离关系。
- [ ] [CF1017G The Tree](https://www.luogu.com.cn/problem/CF1017G) `挑战`：在线树上修改与查询。

{% fold info @动态图 / 动态树 %}
- [ ] [P3690 动态树](https://www.luogu.com.cn/problem/P3690) `衔接`：LCT 模板入口。
- [ ] [P1501 Tree II](https://www.luogu.com.cn/problem/P1501) `主练`：路径修改与路径查询的标准应用。
- [ ] [P2387 魔法森林](https://www.luogu.com.cn/problem/P2387) `主练`：动态图与路径信息维护综合。
- [ ] [P4219 大融合](https://www.luogu.com.cn/problem/P4219) `复盘`：已在树论题单出现。
{% endfold %}

### Part 8.22 离线动态连通性｜进阶主线

- [ ] [P5787 线段树分治 / 二分图](https://www.luogu.com.cn/problem/P5787) `衔接`：时间线段树与可撤销并查集入口。
- [ ] [SP9576 Dynamic Graph Connectivity](https://www.luogu.com.cn/problem/SP9576) `主练`：离线动态连通性的标准模型。
- [ ] [CF576E Painting Edges](https://www.luogu.com.cn/problem/CF576E) `挑战`：动态二分图判定。
- [ ] [CF938G Shortest Path Queries](https://www.luogu.com.cn/problem/CF938G) `挑战`：动态连通与异或路径综合。
- [ ] [P3206 城市建设](https://www.luogu.com.cn/problem/P3206) `暂存`：动态生成树问题。

### Part 8.23 点分治｜进阶主线

- [ ] [P3806 【模板】点分治1](https://www.luogu.com.cn/problem/P3806)
- [ ] [P2634 [国家集训队] 聪聪可可](https://www.luogu.com.cn/problem/P2634)
- [ ] [P2664 树上游戏](https://www.luogu.com.cn/problem/P2664)
- [ ] [P3714 [BJOI2017] 树的难题](https://www.luogu.com.cn/problem/P3714)
- [ ] [P4149 [IOI2011] Race](https://www.luogu.com.cn/problem/P4149)
- [ ] [P3241 [HNOI2015] 开店](https://www.luogu.com.cn/problem/P3241)
- [ ] [P4075 [SDOI2016] 模式字符串](https://www.luogu.com.cn/problem/P4075)
- [ ] [P4183 [USACO18JAN] Cow at Large P](https://www.luogu.com.cn/problem/P4183)
- [ ] [P4292 [WC2010] 重建计划](https://www.luogu.com.cn/problem/P4292)
- [ ] [P5306 [COCI2019] Transport](https://www.luogu.com.cn/problem/P5306)

### Part 8.24 树上启发式合并 / 动态点集｜进阶主线

- [ ] [CF600E Lomsat gelral](https://www.luogu.com.cn/problem/CF600E) `衔接`：DSU on Tree 标准入口。
- [ ] [CF741D Arpa’s letter-marked tree](https://www.luogu.com.cn/problem/CF741D) `主练`：子树路径与异或状态结合的启发式合并。
- [ ] [P7124 stcm](https://www.luogu.com.cn/problem/P7124) `挑战`：Ynoi 树上综合题。
- [ ] [P6072 Path](https://www.luogu.com.cn/problem/P6072) `挑战`：树上路径贡献统计。
- [ ] [P6071 Treequery](https://www.luogu.com.cn/problem/P6071) `挑战`：复杂树上询问。
- [ ] [CF150E Freezing with Style](https://www.luogu.com.cn/problem/CF150E) `主练`：点分治与路径长度限制。
- [ ] [P5439 永恒](https://www.luogu.com.cn/problem/P5439) `挑战`：树上距离与路径结构综合。
- [ ] [CF486D Valid Sets](https://www.luogu.com.cn/problem/CF486D) `主练`：以某个点为约束中心统计合法连通集合。
- [ ] [CF176E Archaeology](https://www.luogu.com.cn/problem/CF176E) `主练`：动态维护标记点集合及其距离量。
- [ ] [CF696E ...Wait for it...](https://www.luogu.com.cn/problem/CF696E) `挑战`：动态点集与树上距离结构综合。
- [ ] [P3320 寻宝游戏](https://www.luogu.com.cn/problem/P3320) `主练`：动态点集的虚树周长思想。

### Part 8.25 虚树｜进阶主线

- [ ] [P2495 [SDOI2011] 消耗战](https://www.luogu.com.cn/problem/P2495)
- [ ] [P3233 [HNOI2014] 世界树](https://www.luogu.com.cn/problem/P3233)
- [ ] [P5360 [SDOI2019] 世界地图](https://www.luogu.com.cn/problem/P5360)
- [ ] [P5439 【XR-2】永恒](https://www.luogu.com.cn/problem/P5439)

- [ ] [P4606 [SDOI2018] 战略游戏](https://www.luogu.com.cn/problem/P4606) `挑战`：虚树 + 圆方树。

### Part 8.26 矩阵树定理｜地图保留

{% fold info @矩阵树定理 题单 %}
- [ ] [P4111 [HEOI2015] 小Z的房间](https://www.luogu.com.cn/problem/P4111)
- [ ] [P2144 [FJOI2007] 轮状病毒](https://www.luogu.com.cn/problem/P2144)
- [ ] [P3317 [SDOI2014] 重建](https://www.luogu.com.cn/problem/P3317)
- [ ] [P4208 [JSOI2008] 最小生成树计数](https://www.luogu.com.cn/problem/P4208)
{% endfold %}

## Part 9 计算几何

### Part 9.1 计算几何基础｜主线

需要稳定掌握点 / 向量、点积、叉积、方向判断、线段相交、距离、多边形面积、点在多边形内，以及 EPS 与整数几何的边界。此处不强行补大量洛谷题，后续更适合结合 ICPC / CF 几何题训练。

### Part 9.2 凸包｜主线

- [ ] [P2742 【模板】二维凸包](https://www.luogu.com.cn/problem/P2742)
- [ ] [P2287 [HNOI2004] 最佳包裹](https://www.luogu.com.cn/problem/P2287)
- [ ] [P3829 [SHOI2012] 信用卡凸包](https://www.luogu.com.cn/problem/P3829)
- [ ] [P4680 [Ynoi2018] 末日时在做什么?有没有空?可以来拯救吗?](https://www.luogu.com.cn/problem/P4680)
- [ ] [P4557 [JSOI2018] 战争](https://www.luogu.com.cn/problem/P4557)
- [ ] [P5403 [CTS2019] 田野](https://www.luogu.com.cn/problem/P5403)

### Part 9.3 旋转卡壳｜进阶主线

- [ ] [P1452 Beauty Contest](https://www.luogu.com.cn/problem/P1452)
- [ ] [P3187 [HNOI2007] 最小矩形覆盖](https://www.luogu.com.cn/problem/P3187)

### Part 9.4 半平面交｜地图保留

{% fold info @半平面交 题单 %}
- [ ] [P3256 [JLOI2013] 赛车](https://www.luogu.com.cn/problem/P3256)
- [ ] [P2600 [ZJOI2008] 瞭望塔](https://www.luogu.com.cn/problem/P2600)
- [ ] [P4196 [CQOI2006] 凸多边形](https://www.luogu.com.cn/problem/P4196)
- [ ] [P3297 [SDOI2013] 逃考](https://www.luogu.com.cn/problem/P3297)
- [ ] [P4250 [SCOI2015] 小凸想跑步](https://www.luogu.com.cn/problem/P4250)
- [ ] [P5328 [ZJOI2019] 浙江省选](https://www.luogu.com.cn/problem/P5328)
{% endfold %}

### Part 9.5 计算几何综合｜进阶主线

- [ ] [P1578 [WC2002] 奶牛浴场](https://www.luogu.com.cn/problem/P1578) `挑战`：二维空矩形与边界枚举。

## Part 10 杂项

### Part 10.1 模拟退火｜地图保留

{% fold info @模拟退火 题单 %}
- [ ] [P1337 [JSOI2004] 平衡点](https://www.luogu.com.cn/problem/P1337)
- [ ] [P2503 [HAOI2006] 均分数据](https://www.luogu.com.cn/problem/P2503)
- [ ] [P3878 [TJOI2010] 分金币](https://www.luogu.com.cn/problem/P3878)
{% endfold %}

### Part 10.2 0/1 分数规划｜地图保留

{% fold info @0/1 分数规划 题单 %}
- [ ] [P4377 [USACO18OPEN] Talent Show](https://www.luogu.com.cn/problem/P4377)
- [x] [P3199 [HNOI2009] 最小圈](https://www.luogu.com.cn/problem/P3199)
- [ ] [P3288 [SCOI2014] 方伯伯运椰子](https://www.luogu.com.cn/problem/P3288)
- [ ] [P3705 [SDOI2017] 新生舞会](https://www.luogu.com.cn/problem/P3705)
- [ ] [P4322 [JSOI2016] 最佳团体](https://www.luogu.com.cn/problem/P4322)
{% endfold %}

### Part 10.3 CDQ 分治｜进阶主线

- [ ] [P3810 【模板】三维偏序（陌上花开）](https://www.luogu.com.cn/problem/P3810)
- [ ] [P3157 [CQOI2011] 动态逆序对](https://www.luogu.com.cn/problem/P3157)
- [ ] [P2487 [SDOI2011] 拦截导弹](https://www.luogu.com.cn/problem/P2487)
- [ ] [P4690 [Ynoi2016] 镜中的昆虫](https://www.luogu.com.cn/problem/P4690)
- [ ] [P3206 [HNOI2010] 城市建设](https://www.luogu.com.cn/problem/P3206)

### Part 10.4 整体二分｜进阶主线

- [ ] [P1527 [国家集训队] 矩阵乘法](https://www.luogu.com.cn/problem/P1527)
- [ ] [P2617 Dynamic Rankings](https://www.luogu.com.cn/problem/P2617)
- [ ] [P3527 [POI2011] Meteors](https://www.luogu.com.cn/problem/P3527)
- [ ] [P4602 [CTSC2018] 混合果汁](https://www.luogu.com.cn/problem/P4602)

### Part 10.5 莫队｜进阶主线

- [ ] [P1494 [国家集训队] 小Z的袜子 / 【模板】莫队](https://www.luogu.com.cn/problem/P1494)
- [ ] [P1903 【模板】带修莫队](https://www.luogu.com.cn/problem/P1903)
- [ ] [P5906 【模板】回滚莫队](https://www.luogu.com.cn/problem/P5906)
- [ ] [P4887 【模板】莫队二次离线](https://www.luogu.com.cn/problem/P4887)
- [ ] [P2709 小B的询问](https://www.luogu.com.cn/problem/P2709)
- [ ] [P3674 小清新人渣的本愿](https://www.luogu.com.cn/problem/P3674)
- [ ] [P3709 大爷的字符串题](https://www.luogu.com.cn/problem/P3709)
- [ ] [P4074 [WC2013] 糖果公园](https://www.luogu.com.cn/problem/P4074)
- [ ] [P5501 [LnOI2019] 来者不拒，去者不追](https://www.luogu.com.cn/problem/P5501)

### Part 10.6 Bitset 优化｜主线

作为跨专题优化工具保留：图可达性、传递闭包、集合交并、布尔 DP、背包位移等。

### Part 10.7 Small-to-Large｜主线

理解“总把小集合并入大集合”的复杂度分析，并与 DSU on Tree、map/set 合并建立联系。

### Part 10.8 离线算法综合｜进阶主线

- [ ] [P3810 三维偏序 / 陌上花开](https://www.luogu.com.cn/problem/P3810) `衔接`：CDQ 分治与树状数组的经典入口。
- [ ] [P4390 Mokia 摩基亚](https://www.luogu.com.cn/problem/P4390) `主练`：带时间维的二维统计。
- [ ] [P1527 矩阵乘法](https://www.luogu.com.cn/problem/P1527) `主练`：整体二分代表题。
- [ ] [P3527 MET-Meteors](https://www.luogu.com.cn/problem/P3527) `主练`：整体二分与区间修改结合。
- [ ] [P3769 TATT](https://www.luogu.com.cn/problem/P3769) `挑战`：更高维偏序与 DP 统计综合。
- [ ] [P4849 寻找宝藏](https://www.luogu.com.cn/problem/P4849) `挑战`：高维离线统计综合。

### Part 10.9 奇怪的题目｜近似忽略

{% fold info @奇怪的题目 题单 %}
- [ ] [P4920 [WC2015] 未来程序](https://www.luogu.com.cn/problem/P4920)
- [ ] [P5042 [国家集训队] 丢失的题面](https://www.luogu.com.cn/problem/P5042)
- [ ] [P5285 [十二省联考2019] 骗分过样例](https://www.luogu.com.cn/problem/P5285)
- [ ] [P5246 [集训队互测2016] 消失的源代码](https://www.luogu.com.cn/problem/P5246)
{% endfold %}

### Part 10.10 非传统题｜近似忽略

{% fold info @非传统题完整题单 %}

#### Part 10.10.1 提交答案题

- [ ] [P1335 [NOI2013] 小Q的修炼](https://www.luogu.com.cn/problem/P1335)
- [ ] [P1737 [NOI2016] 旷野大计算](https://www.luogu.com.cn/problem/P1737)
- [ ] [P3614 yyy棋 II](https://www.luogu.com.cn/problem/P3614)
- [ ] [P3640 [APIO2013] 出题人](https://www.luogu.com.cn/problem/P3640)
- [ ] [P3782 [WC2017] 排序](https://www.luogu.com.cn/problem/P3782)
- [ ] [P3836 Nowruz](https://www.luogu.com.cn/problem/P3836)
- [ ] [P4920 [WC2015] 未来程序](https://www.luogu.com.cn/problem/P4920)
- [ ] [P5402 [CTS2019] 无处安放](https://www.luogu.com.cn/problem/P5402)
- [ ] [P5418 [CTSC2016] NOIP十合一](https://www.luogu.com.cn/problem/P5418)
- [ ] [P5600 【XR-4】尺规作图](https://www.luogu.com.cn/problem/P5600)

#### Part 10.10.2 交互题

- [ ] [P1733 猜数（IO交互版）](https://www.luogu.com.cn/problem/P1733)
- [ ] [P1947 猜数](https://www.luogu.com.cn/problem/P1947)
- [ ] [P5208 [WC2019] I 君的商店](https://www.luogu.com.cn/problem/P5208)
- [ ] [P5473 [NOI2019] I 君的探险](https://www.luogu.com.cn/problem/P5473)
- [ ] [P6541 [WC2018] 即时战略](https://www.luogu.com.cn/problem/P6541)
- [ ] [P6558 [APIO2017] 考拉的游戏](https://www.luogu.com.cn/problem/P6558)
{% endfold %}

## 专题结构索引

为便于回看，下面列出题库中已经显式整理的几类重要训练链：

- **基础与搜索**：双指针 / 滑动窗口、Meet-in-the-Middle、复杂剪枝与状态搜索；
- **动态规划**：字符串与子序列 DP、网格 / 路径 DP、DAG DP、计数 / 概率 DP、SOS DP、倍增优化、动态 DP、各类 DP 优化综合；
- **字符串**：Z 函数 / exKMP、01 Trie 与字符串结构交叉；
- **数学**：进阶数论、组合计数、概率期望、线性代数与异或空间；
- **数据结构**：高级线段树、扫描线、李超线段树、线段树分裂合并、可持久化顺序统计、莫队体系、CDQ / 整体二分、时间线段树、可撤销并查集、动态连通性；
- **图论与树论**：0-1 BFS、差分约束扩展、生成树变式、桥 / 边双 / 点双 / 圆方树、欧拉结构、树上差分、复杂路径、动态点集、点分治与虚树交叉；
- **跨专题工具**：Bitset、Small-to-Large、离线算法与随机化。

> **组织原则**：正文统一按“Part → 专题题型 → 训练题”组织。同题可以出现在多个专题；低优先级、高阶专项通过折叠降低视觉权重，但不从题库删除。

## 使用建议

1. 主线专题进入学习周期时，优先沿原题单顺序刷；模板之后保留足够多的中高阶变式，不再预先替自己裁成 3～5 题。
2. 进阶主线在基础稳定后选择性开启，一次只推进一条；题单完整保留，但实际不要求全刷。
3. 地图保留和近似忽略专题默认折叠。它们存在于知识地图中，却不自动生成“必须补完”的待办。
4. 真正判断是否掌握，仍看无标签识别、独立实现、变式迁移和比赛调用，而不是勾选数量。

## 参考与许可

{% fold info @参考题单与许可说明 %}

本题库建设过程中参考了 StudyingFather「一个动态更新的洛谷综合题单」、洛谷官方题单及个人训练题单，并进行了重新分类、补充与交叉挂载。

StudyingFather 原项目采用 CC BY-SA 4.0 与 The Star And Thank Author License；如公开传播本衍生整理，请保留必要署名并遵守原项目许可要求。

{% endfold %}
