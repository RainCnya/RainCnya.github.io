---
title: ABC469F GCD Maximum Spanning Tree
tags:
  - 图论/生成树
  - 数据结构/并查集
  - 数学/整除
status: solved
categories:
  - 260_Records
  - Archive
abbrlink: a469f001
date: 2026-08-01 00:00:00
updated: 2026-08-04 00:00:00
---

# ABC469F GCD Maximum Spanning Tree

> [!Question]
> 给定互不相同的正整数 $A_1<A_2<\dots<A_N$。构造一张完全图，点 $i,j$ 之间边权为 $\gcd(A_i,A_j)$，求最大生成树的边权和。
>
> 数据规模：$2\le N\le 2\times 10^5$，$A_N\le 10^6$。

> 这题其实我在南昌邀请赛见过类似的。

最自然的思路就是建图，然后跑一遍 Kruskal 最大生成树，从大到小处理边权即可。但是发现点数太多了，我们没法直接构建完全图，更何况每个点对算 $\gcd$ 的开销呢？

于是发现，其实很多边是根本用不上的；对于一个整数 $d$，所有值为 $d$ 的倍数的点之间，都存在权值至少为 $d$ 的边。

所以我们从最大值开始倒序枚举 $d$，然后收集所有 $d$ 的倍数在序列中对应的点，尝试用并查集合并，当然我们不需要把树完整建出来，所以每次合并，相当于选择了一条当前权值为 $d$ 的边，统计答案即可。

由于枚举到 $d$ 时，所有权值大于 $d$ 的边都已经处理完毕。若两个当前不连通的点的 $gcd$ 大于 $d$，那么它在枚举到该 $gcd$ 时就已经被合并了，所以每次成功的合并都可以看作选择了一条权值为 $d$ 的边。

```cpp title:"FFF" fold
struct DSU {
/* ======================================== */
int fa[maxn], siz[maxn];
void init( int N ) { for( int i = 1; i <= N; ++ i ) fa[i] = i, siz[i] = 1; }
int find( int x ) { return fa[x] == x ? x : fa[x] = find( fa[x] ); }
bool merge( int x, int y ) {
    int rx = find( x ), ry = find( y );
    if( rx == ry ) return 0;
    if( siz[rx] > siz[ry] ) swap( rx, ry );
    fa[rx] = ry, siz[ry] += siz[rx];
    return 1;
}
bool same( int x, int y ) { return find( x ) == find( y ); }
int size( int x ) { return siz[find( x )]; }
/* ======================================== */
} dsu;

int a[maxn];
int pos[maxv];

void solve( ) {
    int n = read( );
    int mx = -1;
    for( int i = 1; i <= n; ++ i ) {
        int x = read( );
        pos[x] = i;
        mx = max( mx, x );
    }

    dsu.init( n );
    
    ll ans = 0;
    for( int d = mx; d >= 1; -- d ) {
        int cur = 0;
        for( int val = d; val <= mx; val += d ) {
            int nxt = pos[val];
            if( !nxt ) continue;
            if( !cur ) cur = nxt;
            else if( dsu.merge( cur, nxt ) ) {
                ans += d;
            }
        }
    }
    cout << ans << '\n';
}
```

枚举倍数的总次数为  $\displaystyle \sum_{d=1}^{V}\left\lfloor\frac Vd\right\rfloor=\mathcal O(V\log V)$，其中 $V=\max A_i$，这是一个调和级数，复杂度还是能接受的。

## 记录

- 来源：[[ABC469 A~G]]；
- 归属：[[生成树体系]]；
- 新增：无需显式建立 GCD 完全图；按约数阈值从大到小枚举其倍数集合，并用并查集执行隐式 Kruskal，成功合并时计入当前阈值。
- 分类：待定

