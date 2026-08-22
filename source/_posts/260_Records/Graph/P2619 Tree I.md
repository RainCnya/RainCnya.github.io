---
title: P2619 Tree I
tags:
  - 图论/生成树
  - 方法/WQS二分
status: solved
categories:
  - 260_Records
  - Graph
abbrlink: p2619001
date: 2026-08-17 00:00:00
updated: 2026-08-18 00:00:00
---

# 用边权惩罚把白边数量带入 Kruskal

> [!question] [P2619 [国家集训队] Tree I](https://www.luogu.com.cn/problem/P2619)
> 给定一张连通无向带权图，每条边为白色或黑色。需要在所有生成树中找到一棵恰好包含 `need` 条白边的生成树，并使原边权总和最小；题目保证存在合法方案。
>
> 数据规模：$V\le5\times10^4$，$E\le10^5$，边权位于 $[1,100]$，节点从 $0$ 开始编号。

回顾 Kruskal 生成树的做法，将所有边从小到大排序，然后逐一加入到图中，如果我们先加入 `need` 个白边，再从剩下的边中选择足够的黑边呢？

答案是显然不对的，比如说 `need = 1`，有四个点：黑 `0-1:1 | 1-2:1 | 2-3:100` 白 `0-2:1 | 0-3:5`，这个时候最优解是选择 `0-3:5` 的这条白边。

所以为了限制白边的数量，我们尝试修改白边在排序后的 `edges` 里出现的位置。也就是说，我们可以给每条白边统一增加惩罚值 $x$，再按修改后的边权跑 Kruskal。

随着 $x$ 增大，白边相对更昂贵，最优生成树能够包含的白边数只会不变或者减少，也就是关于惩罚值单调不增，于是可以二分这个惩罚值。

注：同修改后权值相等时，必须优先选择白边，这样 Kruskal 才会返回尽可能多的白边数。

找到临界惩罚值 $x$ 后，处理生成树权值中多计算了 `need` 条白边的惩罚值，因此原答案为 $mst_x-need\times x$。

每次 Kruskal 为 $O(m\log m)$，二分复杂度为常数。

```cpp title:"P2619" fold
struct DSU { /* 模板代码略 */ } dsu;

struct Edge { int u, v, col; ll w; };
vector<Edge> edge;
int n, m, need;
ll mst;

bool cmp( const Edge &a, const Edge &b ) {
    if( a.w != b.w ) return a.w < b.w;
    return a.col < b.col;
}

ll kruskal( int N ) {
    dsu.init( N );
    sort( edge.begin( ), edge.end( ), cmp );
    mst = 0;
    int white = 0;
    int cnt = 0; // 已选边数
    for( auto [u, v, col, w] : edge ) {
        if( dsu.merge( u, v ) ) {
            mst += w;
            ++ cnt;
            if( col == 0 ) ++ white;
            if( cnt == N - 1 ) break;
        }
    }
    return white;
}

bool check( int mid ) {
    for( int i = 0; i < m; ++ i ) {
        if( edge[i].col == 0 ) edge[i].w += mid;
    }
    bool ok = ( kruskal( n ) >= need );
    for( int i = 0; i < m; ++ i ) {
        if( edge[i].col == 0 ) edge[i].w -= mid;
    }
    return ok;
}

void solve( ) {
    n = read( ), m = read( ), need = read( );

    for( int i = 1; i <= m; ++ i ) {
        int u = read( ) + 1, v = read( ) + 1;
        int w = read( ), c = read( );
        edge.push_back({ u, v, c, w });
    }

    int l = -101, r = 101, ans = 0;
    while( l <= r ) {
        int mid = ( l + r ) >> 1;
        if( check( mid ) ) ans = mid, l = mid + 1;
        else r = mid - 1;
    }
    check( ans );
    cout << mst - need * ans << '\n';
}
```
