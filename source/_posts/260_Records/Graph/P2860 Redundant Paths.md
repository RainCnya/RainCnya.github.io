---
title: P2860 Redundant Paths
tags:
  - 图论/边双连通分量
  - 图论/桥
status: solved
categories:
  - 260_Records
  - Graph
abbrlink: p2860001
date: 2026-08-17 00:00:00
updated: 2026-08-18 00:00:00
---

# 缩点后给桥树的叶子配对

> [!question] [P2860 [USACO06JAN] Redundant Paths G](https://www.luogu.com.cn/problem/P2860)
> 牧场由一张连通无向图连接，允许继续修建连接任意两个不同牧场的新道路。要求添加尽量少的边，使任意两个牧场之间都能找到至少两条不共用道路的路线；路线可以经过相同牧场，原图也可能存在重边。
>
> 数据规模：$1\le F\le5000$，$F-1\le R\le10000$。

条件是任意两点之间都有至少两条路径，而且是无向图，要求加边，所以本题的重点在于边上，也就会想到边双连通分量。

而桥的定义是，删掉这条边之后连通块数量 $+1$，每个连通块内部都是两两至少存在两条路径，最大的问题在于两个连通块之间。

要让缩点后形成的桥树不再有桥，关键在于叶子分量，发现添加一条边，连接两个叶子节点所在分量，就能形成一个环，从而解决掉两个叶子分量的限制。

所以最优做法所需的边数就是 $\lceil leaf / 2 \rceil$，于是只需统计桥树中度数为一的分量数即可。

> 本题是边双连通分量的典型应用。

```cpp title:"P2860" fold
struct Edge { int id, v; };
vector<Edge> adj[maxn];
vector<int> comp[maxn];
vector<Edge> tree[maxn];

int dfn[maxn], low[maxn], timer;
bool bridge[maxm];
int bcnt;

int ebcc[maxn], ecnt;

void add_edge( int u, int v, int id ) {
    adj[u].push_back({ id, v });
    adj[v].push_back({ id, u });
}

void tarjan( int u, int in_edge ) {
    dfn[u] = low[u] = ++ timer;
    for( auto [id, v] : adj[u] ) {
        if( !dfn[v] ) {
            tarjan( v, id );
            low[u] = min( low[u], low[v] );
            if( low[v] > dfn[u] ) {
                bridge[id] = true;
                ++ bcnt;
            }
        } else if( id != in_edge ) {
            low[u] = min( low[u], dfn[v] );
        }
    }
}

int deg[maxn];

void dfs_ebcc( int u, int id ) {
    ebcc[u] = id;
    for( auto [eid, v] : adj[u] ) {
        if( bridge[eid] || ebcc[v] ) continue;
        dfs_ebcc( v, id );
    }
}

void solve( ) {
    int n = read( ), m = read( );
    for( int i = 1; i <= m; ++ i ) {
        int u = read( ), v = read( );
        add_edge( u, v, i );
    }
    for( int i = 1; i <= n; ++ i ) {
        if( !dfn[i] ) tarjan( i, 0 );
    }
    for( int i = 1; i <= n; ++ i ) {
        if( !ebcc[i] ) dfs_ebcc( i, ++ ecnt );
    }

    for( int u = 1; u <= n; ++ u ) {
        for( auto [id, v] : adj[u] ) {
            if( bridge[id] ) deg[ebcc[v]] ++;
        }
    }

    int cnt = 0;
    for( int i = 1; i <= ecnt; ++ i ) {
        if( deg[i] == 1 ) ++ cnt;
    }
    cout << ( cnt + 1 ) / 2 << '\n';
}
```
