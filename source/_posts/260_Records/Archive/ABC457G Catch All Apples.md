---
title: 'ABC457G Catch All Apples'
categories:
  - 260_Records
  - Archive
abbrlink: eaf5f5bc
date: 2026-05-09 00:00:00
tags:
  - 数学/偏序
  - DP/LIS
  - 数学/Dilworth定理
---

### [G - Catch All Apples](https://atcoder.jp/contests/abc457/tasks/abc457_g)

#### 题意
在数轴上有 $N$ 个苹果，第 $i$ 个苹果会在时间 $T_{i}$ 掉落在 $X_{i}$ 处，你可以在任意位置放置任意机器人，机器人从 0 时刻开始以速度 1 移动，每个机器人同一时刻只能吃一个苹果，求最少需要放置多少个机器人，才能吃完苹果。

> $N \leq 3e5$

#### 思路
先考虑这样一种情况，假设一个机器人在时间 $T_{i}$ 吃了位于 $X_{i}$ 的苹果，接着要去吃时间 $T_{j}$ 位于 $X_{j}$ 的苹果（ 假设 $T_{j} \geq T_{i}$ ），由于机器人的速度为 1，它能移动的距离 $\leq$ 时间差，即：

$$
|X_{i} - X_{j}| \leq T_{j} - T_{i}
$$

如果把绝对值拆开的话，就能得到下面两个不等式：

1. $X_{i} - X_{j} \leq T_{j} - T_{i} \implies T_{i} + X_{i} \leq T_{j} + X_{j}$
2. $-(X_{i} - X_{j}) \leq T_{j} - T_{i} \implies  T_{i} - X_{i} \leq T_{j} - X_{j}$

观察两个柿子，发现形式上是对称的，不妨令 $A = T - X, B = T + X$。

可以得到：$A_{i} \leq A_{j}$ 且 $B_{i} \leq B_{j}$ 时，机器人能从苹果 $i$ 跑到苹果 $j$。

然后在这个 $(A, B)$ 的坐标系中，机器人只能向着右上方前进，这是不是就有点类似 LIS 问题了。

问最少需要几个机器人，这就让我们想到 [P1020 导弹拦截 - 洛谷](https://www.luogu.com.cn/problem/P1020) 这一题，如果每个机器人吃苹果的路线都是一条不断向右上方延长的链。

那么问题就转化为：**求解覆盖所有点的最小链数**。根据离散数学中的 Dilworth 定理：

> 最小链覆盖数 = 最长反链的长度。

**反链** 在本题语境下指的是一组苹果，其中任意两个苹果都无法被同一个机器人吃到（互相不可达），也就是两个苹果 $i, j$，既不满足 $i$ 到 $j$ 的偏序，也不满足 $j$ 到 $i$ 的偏序。

> **不可达**：就是保证 $A_{i} \leq A_{j}$ 的前提下，不能满足 $B_{i} \leq B_{j}$，也就是 $B_{i} > B_{j}$，反之先对 $B$ 排序后，对 $A$ 的处理同理。

因此，如果我们把所有的苹果都先按照 A 从小到大排序 ( 保证了 A 是不下降的 )，接着为了让他们互相不可达，它们的 B 坐标必须是 **严格递减** 的，这样就把一个 二维偏序问题，转化为了一个一维偏序问题。

接着就变成了一个 LDS ( 最长严格递减子序列 ) 长度的求解问题，由于规模限制，这里需要采用 $O(N \log N)$ 的求法处理。

#### 代码部分
{% fold info @AcCode %}
```cpp
struct Node { int A, B; } a[maxn];
int n;

bool cmp( Node a, Node b ) {
    if( a.A != b.A ) return a.A < b.A;
    return a.B < b.B;
}

int LDS( ) {
    vector<int> g;
    for( int i = 1; i <= n; ++ i ) {
	    // 小 Trick: 求 B 的严格递减子序列 <=> 求 -B 的严格递增子序列
        int x = -a[i].B;
        auto it = lower_bound( g.begin( ), g.end( ), x );
        if( it == g.end( ) ) g.push_back( x );
        else *it = x;
    }
    return g.size( );
}

void solve( ) {
    cin >> n;
    for( int i = 1; i <= n; ++ i ) {
        int t, x;
        cin >> t >> x;
        a[i] = { t - x, t + x };
    }
    sort( a + 1, a + n + 1, cmp );
    int res = LDS( );
    cout << res << '\n';
}
```
{% endfold %}