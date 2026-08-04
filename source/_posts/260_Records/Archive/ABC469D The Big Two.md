---
title: ABC469D The Big Two
tags:
  - algorithm/记录
  - 图论/建模
  - 方法/候选压缩
status: solved
categories:
  - 260_Records
  - Archive
abbrlink: a469d001
date: 2026-08-01 00:00:00
updated: 2026-08-04 00:00:00
---

# ABC469D The Big Two

> [!Question]
> $M$ 场比赛的决赛选手分别为 $(A_i,B_i)$。统计有多少对玩家 $(x,y)$ 满足：每场决赛中至少有一人是 $x$ 或 $y$。
>
> 数据规模：$2\le N,M\le 2\times 10^5$。

或许可以把这个问题看作一张图，每名选手都是图上的一个节点，每场比赛就是图上的一条边。所以题目的问题就转化为了，有多少对点可以覆盖所有的边？

由于所有边都得被选中，所以我们可以任取一条边，任意合法的点对都至少包含它的两个端点中的一个，否则就无法覆盖这条边，是不合法的。

假设边为 $(x, y)$，我们只需要检查 $(x, i)$ 以及 $(y, i)$ 相应的点对，记 $cnt0[x]$ 为点 $x$ 关联的边数，$cnt(x, y)$ 为端点恰好是 $x, y$ 的边数。

对于点对 $(x, y)$ 来说，它能覆盖的不同边数量为：$cnt0[x] + cnt0[y] - cnt(x, y)$，若它等于 $M$，就说明能覆盖所有的边，于是跑一遍统计一下就好了，注意去重。

> 注：这里也能用 `map` 存边，令小的点靠前就能避免重复计数，不详细展开了。

```cpp title:"DDD" fold
struct Edge { int u, v; } a[maxn];
int cnt0[maxn], cntx[maxn], cnty[maxn];

void solve( ) {
    int n = read( ), m = read( );
    for( int i = 1; i <= m; ++ i ) {
        int u = read( ), v = read( );
        a[i] = {u, v};
        cnt0[u] ++, cnt0[v] ++;
    }

    auto [x, y] = a[1];
    for( int i = 1; i <= m; ++ i ) {
        auto [u, v] = a[i];
        if( u == x ) cntx[v] ++;
        if( v == x ) cntx[u] ++;
        if( u == y ) cnty[v] ++;
        if( v == y ) cnty[u] ++;
    }

    ll ans = 0;
    for( int i = 1; i <= n; ++ i ) {
        if( i == x ) continue;
        if( cnt0[x] + cnt0[i] - cntx[i] == m ) ans ++;
    }

    for( int i = 1; i <= n; ++ i ) {
        if( i == x || i == y ) continue;
        if( cnt0[y] + cnt0[i] - cnty[i] == m ) ans ++;
    }
    cout << ans << '\n';
}
```

## 记录

- 来源：[[ABC469 A~G]]；
- 归属：[[20_图论]]；
- 新增：任选一条必须被覆盖的边后，任意合法点对必含它的某个端点，从而把二次方候选压成两组线性检查；再用度数减重复边数验证覆盖。
- 分类：待定

