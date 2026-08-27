---
title: CF1000E We Need More Bosses
tags:
  - 图论/桥
  - 图论/边双连通分量
  - 树论/直径
status: solved
categories:
  - 260_Records
  - Graph
abbrlink: cf1000e001
date: 2026-08-27 00:00:00
updated: 2026-08-28 00:00:00
---

# 把必经边的问题还原成桥树直径

> [!question] [CF1000E We Need More Bosses](https://codeforces.com/problemset/problem/1000/E)
> 给定一张连通无向图。可以任意选择起点 $s$ 与终点 $t$，并在所有从 $s$ 到 $t$ 的路径上都必须经过的边上放置 Boss；求最多能放多少个 Boss。
>
> 数据规模：$2\le n\le3\times10^5$，$n-1\le m\le3\times10^5$，图连通且无重边。

连通无向图，必须经过的边，不难想到割边（桥）。接着用 Tarjan 缩点成桥树，每个边双连通块中的点都至少有两条路径，所以没有必须经过的边。

而桥树中两个缩点之间，唯一路径上的每一条边都是原图中无法绕开的桥。于是发现，答案就是这棵桥树上的直径，使用两次 DFS 即可解决。

```cpp title:"CF1000E" fold
struct Edge { int id, v; };
vector<Edge> adj[maxn], tree[maxn];

int dfn[maxn], low[maxn], timer;
int stk[maxn], top;

bool bridge[maxm];
int bcnt;

int ebcc[maxn], ecnt;

void tarjan( int u, int in_edge ) {
    dfn[u] = low[u] = ++ timer;
    stk[++ top] = u;
    for( auto [id, v] : adj[u] ) {
        if( !dfn[v] ) {
            tarjan( v, id );
            low[u] = min( low[u], low[v] );
            if( low[v] > dfn[u] ) {
                bridge[id] = 1;
                ++ bcnt;
            }
        } else if( id != in_edge ) {
            low[u] = min( low[u], dfn[v] );
        }
    }
    if( low[u] == dfn[u] ) {
        ++ ecnt; int v;
        do {
            v = stk[top -- ];
            ebcc[v] = ecnt;
        } while( v != u );
    }
}

int dep[maxn], up[maxn], ed;

void dfs( int u, int p ) {
    up[u] = p, dep[u] = dep[p] + 1;
    if( ed == 0 || dep[u] > dep[ed] ) ed = u;
    for( auto [id, v] : tree[u] ) {
        if( v == p ) continue;
        dfs( v, u );
    }
}

ll diam( int S, int &s, int &t ) {
    ed = 0; dfs( S, 0 ); s = ed;
    ed = 0; dfs( s, 0 ); t = ed;
    return dep[t] - 1;
}

void solve( ) {
    int n = read( ), m = read( );
    for( int i = 1; i <= m; ++ i ) {
        int x = read( ), y = read( );
        adj[x].push_back({ i, y });
        adj[y].push_back({ i, x });
    }

    for( int i = 1; i <= n; ++ i ) {
        if( !dfn[i] ) tarjan( i, 0 );
    }

    for( int u = 1; u <= n; ++ u ) {
        for( auto [id, v] : adj[u] ) {
            if( !bridge[id] ) continue;
            int x = ebcc[u], y = ebcc[v];
            tree[x].push_back({ id, y });
        }
    }

    int s = 0, t = 0;
    cout << diam( 1, s, t ) << '\n';
}
```
