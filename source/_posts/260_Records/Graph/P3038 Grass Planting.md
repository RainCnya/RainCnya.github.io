---
title: P3038 Grass Planting
tags:
  - 图论/LCA
  - 图论/树上差分
  - 数据结构/树状数组
status: solved
categories:
  - 260_Records
  - Graph
abbrlink: p3038001
date: 2026-08-17 00:00:00
updated: 2026-08-18 00:00:00
---

# 在线维护树上路径经过次数

> [!question] [P3038 [USACO11DEC] Grass Planting G](https://www.luogu.com.cn/problem/P3038)
> 给定一棵初始边权全为零的树。操作 `P u v` 会把 $u$ 到 $v$ 简单路径上的每条边加一，操作 `Q u v` 查询相邻节点 $u,v$ 之间那条边的当前权值；所有操作必须在线完成。
>
> 数据规模：$2\le n\le10^5$，$1\le m\le10^5$。

路径边加，单点边查，不难想到用差分来处理。

一次路径 $(u,v)$ 对点差分数组做 `d[u] ++, d[v] ++, d[lca] -= 2`。由于是边差分，在树上可以把边的权值下放到儿子点上，这样就巧妙的把难处理的边差分，转化为点差分了。

不过题目要求动态修改，于是我们想到用 树状数组 来维护 动态差分。最开始我想的是直接上树剖，不过本题的查询只需要考虑子树范围，可以直接用 DFS 序来维护子树区间。

不用上麻烦难写的树剖。

```cpp title:"P3038" fold
struct BIT { /* 模板代码略 */ } bit;

vector<int> adj[maxn];
int up[maxn][maxlg], dep[maxn];
int dfn[maxn], siz[maxn], timer;

void dfs( int u, int p ) {
    dep[u] = dep[p] + 1, up[u][0] = p;
    for( int i = 1; i < maxlg; ++ i ) {
        int mid = up[u][i-1];
        up[u][i] = up[mid][i-1];
    }
    dfn[u] = ++ timer;
    siz[u] = 1;
    for( int v : adj[u] ) {
        if( v == p ) continue;
        dfs( v, u );
        siz[u] += siz[v];
    }
}

int get_lca( int u, int v ) {
    if( dep[u] < dep[v] ) swap( u, v );
    int diff = dep[u] - dep[v];
    for( int i = maxlg - 1; i >= 0; -- i ) {
        if( ( diff >> i ) & 1 ) u = up[u][i];
    }
    if( u == v ) return u;
    for( int i = maxlg - 1; i >= 0; -- i ) {
        if( up[u][i] == up[v][i] ) continue;
        u = up[u][i], v = up[v][i];
    }
    return up[u][0];
}

void add_path( int u, int v ) {
    int lca = get_lca( u, v );
    bit.add( dfn[u], 1 );
    bit.add( dfn[v], 1 );
    bit.add( dfn[lca], -2 );
}

ll ask_edge( int u, int v ) {
    if( dep[u] < dep[v] ) swap( u, v );
    return bit.ask( dfn[u], dfn[u] + siz[u] - 1 );
}

void solve( ) {
    int n = read( ), m = read( );

    for( int i = 1; i < n; ++ i ) {
        int u = read( ), v = read( );
        adj[u].push_back( v );
        adj[v].push_back( u );
    }

    dfs( 1, 0 );
    bit.init( n );

    for( int i = 1; i <= m; ++ i ) {
        char opt;
        cin >> opt;
        int u = read( ), v = read( );
        if( opt == 'P' ) {
            add_path( u, v );
        } else {
            cout << ask_edge( u, v ) << '\n';
        }
    }
}
```
