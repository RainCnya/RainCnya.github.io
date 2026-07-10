---
title: '[Leaf] ABC439F Beautiful Kadomatsu'
tags:
  - 组合
  - 数据结构/树状数组
categories:
  - 270_Solutions
  - ABC_Part
abbrlink: eb0401c4
date: 2026-07-06 00:00:00
updated: 2026-07-06 00:00:00
---
# [F - Beautiful Kadomatsu](https://atcoder.jp/contests/abc439/tasks/abc439_f)

## 1. 题意

给定一个 $1 \sim N$ 的排列 $P$，求有多少个非空子序列是 kadomatsu-like。

对于一个序列 $a=(a_1,a_2,\dots,a_k)$：

若 $a_{i-1}<a_i>a_{i+1}$，则 $a_i$ 是一个峰；若 $a_{i-1}>a_i<a_{i+1}$，则 $a_i$ 是一个谷。

设峰的数量为 $x$，谷的数量为 $y$，如果 $x>y$，则称这个序列是 kadomatsu-like。

要求统计满足条件的子序列数量，对 $998244353$ 取模。

> $N \le 3e5$，$P$ 是一个排列。

## 2. 思路

从题目已知的条件入手，注意到 $P$ 是一个排列，所以任意两个元素都不相同。

因此对于一个子序列来说，相邻两项之间只有两种关系：上升：$a_i<a_{i+1}$；下降：$a_i>a_{i+1}$。


如果把峰谷和相邻关系对应起来，那么峰对应：上升 $\to$ 下降；谷对应：下降 $\to$ 上升。

也就是说，峰谷都只出现在相邻关系发生变化的位置。

因此，原问题的关键就是刻画这些变化对 $x-y$ 的贡献。

不妨记：

$$
s_i = \begin{cases}
+1 & a_i<a_{i+1} \\
-1 & a_i>a_{i+1}
\end{cases}
$$

若 $a_{i-1},a_i,a_{i+1}$ 是一个峰，那么：$s_{i-1}=+1,\quad s_i=-1$

若 $a_{i-1},a_i,a_{i+1}$ 是一个谷，那么：$s_{i-1}=-1,\quad s_i=+1$

接着令：$t_i=\frac{s_{i-1}-s_i}{2}$

那么：$t_i=1$，说明当前位置是一个峰； $t_i=-1$，说明当前位置是一个谷；

所以 $x-y$ 就可以表示成 $t_i$ 的和：$x-y=\sum_{i=2}^{k-1}t_i$

把式子展开化简：

$$
\sum_{i=2}^{k-1}t_i
= \frac{(s_1-s_2)+(s_2-s_3)+\dots+(s_{k-2}-s_{k-1})}{2}
= \frac{s_1-s_{k-1}}{2}
$$

于是 $x>y$ 等价于：$\frac{s_1-s_{k-1}}{2}>0$

因为 $s_i$ 只可能是 $+1$ 或 $-1$，所以这等价于：$s_1>0,\quad s_{k-1}<0$

也就是：$a_1<a_2,\quad a_{k-1}>a_k$

所以原问题就从统计峰谷数量，转化成了统计满足“开头上升，结尾下降”的子序列。

考虑一个满足条件的子序列。真正决定它是否合法的，其实只有四个关键位置：

$$
a < b \le c < d
$$

这里的 $a,b,c,d$ 都是原排列中的下标。其中：

- $P_a$ 是子序列的第一个元素；
- $P_b$ 是子序列的第二个元素；
- $P_c$ 是子序列的倒数第二个元素；
- $P_d$ 是子序列的最后一个元素。

当子序列长度为 $3$ 时，第二个元素和倒数第二个元素是同一个元素，因此 $b=c$。

因为我们前面推出了：$P_a < P_b,\quad P_c > P_d$

于是可以固定中间两个关键位置 $b,c$，分别统计左边和右边的选择数量。

为了满足开头上升，需要在 $b$ 左边选一个比 $P_b$ 小的元素作为第一个元素。

- 设：$L_i=|\{j\mid j<i,\ P_j<P_i\}|$

为了满足结尾下降，需要在 $c$ 右边选一个比 $P_c$ 小的元素作为最后一个元素。

- 设：$R_i=|\{j\mid j>i,\ P_j<P_i\}|$

接下来分类讨论贡献情况。

- 如果 $b=c$，也就是子序列长度为 $3$，那么贡献为：$L_b\times R_b$。

- 如果 $b<c$，那么 $b$ 和 $c$ 中间的位置可以任意选或不选，因此贡献为：$L_b\times R_c\times 2^{c-b-1}$。

所以总答案可以写成：

$$
Ans = \sum_{c=1}^{N} R_c \left( L_c+\sum_{b<c}L_b\cdot 2^{c-b-1} \right)
$$

这里外层枚举的是倒数第二个关键位置 $c$。其中：

如果每次都重新计算内层求和，本质上还是在枚举所有 $(b,c)$，复杂度为 $\mathcal{O}(N^2)$，需要继续优化。

记：$\displaystyle S_c=\sum_{b<c}L_b\cdot 2^{c-b-1}$。

再展开下一项：$\displaystyle S_{c+1} = \sum_{b<c+1}L_b\cdot 2^{c-b} = 2\sum_{b<c}L_b\cdot 2^{c-b-1}+L_c = 2S_c+L_c$。

因此可以线性递推维护 $S_c$，总答案变成：$\displaystyle Ans = \sum_{c=1}^{N}R_c(L_c+S_c)$

最后，$L$ 和 $R$ 数组可以用权值树状数组进行预处理统计。

最终复杂度为 $\mathcal{O}(N\log N)$。

## 3. 代码部分

{% fold info @AcCode %}

```cpp
ll read( ) { /* 模板代码略 */ }

struct BIT { /* 模板代码略 */ } bit;

int p[maxn], L[maxn], R[maxn];

void solve( ) {
    int n = read( );

    for( int i = 1; i <= n; ++ i ) {
        p[i] = read( );
    }

    bit.init( n );
    for( int i = 1; i <= n; ++ i ) {
        L[i] = bit.ask( p[i] - 1 );
        bit.add( p[i], 1 );
    }

    bit.init( n );
    for( int i = n; i >= 1; -- i ) {
        R[i] = bit.ask( p[i] - 1 );
        bit.add( p[i], 1 );
    }

    ll ans = 0;
    ll Si = 0;

    for( int r = 1; r <= n; ++ r ) {
        ans = ( ans + R[r] * ( L[r] + Si ) % mod ) % mod;
        Si = ( Si * 2 + L[r] ) % mod;
    }

    cout << ans << '\n';
}
```

{% endfold %}

## 4. 复盘

- **复杂度分析**：$\mathcal{O}(N \log(N))$。

- **关键转化**：将峰和谷通过相邻关系，转化为代数问题。

- **关联笔记**：[[组合计数]] | [[树状数组]]