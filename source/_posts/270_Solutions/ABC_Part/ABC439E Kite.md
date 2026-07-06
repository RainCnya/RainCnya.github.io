---
title: "[Leaf] ABC439E Kite"
tags: DP/LIS
date: 2026-07-06
updated: 2026-07-06
---

# [E - Kite](https://atcoder.jp/contests/abc439/tasks/abc439_e)

## 1. 题意

有 $N$ 个人，第 $i$ 个人站在 $(A_i,0)$，想把风筝放到 $(B_i,1)$。

每个人对应一条线段：$(A_i,0)\to(B_i,1)$。

求最多能选出多少个人，使得任意两条对应线段都不相交。

> 如果两个人对应的线段相交，包括端点相接，那么这两个人不能同时放风筝。

> $N \le 2e5, A, B \le 1e9$。

## 2. 思路

考虑什么样的情况，两条线段是不相交的，如果两个人 $i, j$ 满足 $A_{i} < A_{j}$，那么必须有 $B_{i} < B_{j}$，否则两条线段一定会交叉。

于是问题转化为了：给出若干二元组 $(A_{i}, B_{i})$，求最多能选出多少个点，使得 $A$ 严格递增，$B$ 也严格递增。

这就是一个典型的二维偏序问题了，我们可以转化为 LIS 模型来求解，注意到数据范围，我们需要采用 $\mathcal{O}(N \log(N))$ 的贪心解法。

先按照 $A$ 升序排序，然后对 $B$ 求严格 LIS。但是这里还有一个细节要注意，当 $A$ 相同的时候，$B$ 必须降序排序。

为什么？因为如果按 $A$ 升序 $B$ 也升序的排法，像 $(1, 2)$ 和 $(1, 3)$ 这样的点会被 LIS 同时选中，但它们的 $A$ 相同，不能同时选择。

## 3. 代码部分

{% fold info @AcCode %}
```cpp
ll read( ) { /* 模板代码略 */ }

struct Kite {
    int a, b;
    bool operator < ( const Kite &oth ) const {
        if( a != oth.a ) return a < oth.a;
        return b > oth.b;
    }
} A[maxn];

void solve( ) {
    int n = read( );
    for( int i = 1; i <= n; ++ i ) A[i].a = read( ), A[i].b = read( );
    sort( A + 1, A + n + 1 );
    vector<int> g;
    for( int i = 1; i <= n; ++ i ) {
        auto [a, b] = A[i];
        auto it = lower_bound( g.begin( ), g.end( ), b );
        if( it == g.end( ) ) g.push_back( b );
        else *it = b;
    }
    cout << g.size( );
}
```
{% endfold %}

## 4. 复盘

- **复杂度分析**：$\mathcal{O}(N \log(N))$。

- **易错点**：对二维偏序的理解偏差。

- **关联笔记**：[[210_Algorithm/30_动态规划/线性DP#LIS 模型|线性DP]] | [[02_关系#13 偏序关系|偏序关系]]
