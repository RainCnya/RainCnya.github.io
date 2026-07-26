---
title: '[Leaf] ABC441D Paid Walk'
tags:
  - 搜索/DFS
abbrlink: 7b70f3b7
categories:
  - 260_Records
  - Archive
date: 2026-07-10 00:00:00
updated: 2026-07-10 00:00:00
---

# [ABC441D - Paid Walk](https://atcoder.jp/contests/abc441/tasks/abc441_d "null")

## 1. 题面梗概

给定一个 $N$ 点 $M$ 边的有向图，每个点的出度不超过 4。求所有顶点 $v$，使得存在一条从点 1 到点 $v$ 且长度恰好为 $L$ 的路径，其边权总和 $Cost \in [S, T]$。

> $N, M \le 2e5, L \le 10$。

## 2. 逻辑推导

这显然是一道图论题，而且是路径相关，显然会想到 `Dijkstra` 算法，但是发现跟本题的限制条件相性较差，限制长度刚刚好为 $L$，不方便约束。

于是我们继续观察数据范围，发现 $L \le 10$ 同时每个点的出度最多为 $4$，那么不难想到总的状态数最多也就是 $4^{10}$，这是一个很健康的数量级，不难想到 DFS 暴力搜索。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
ll read( ) { /* 模板代码略 */ }

struct Edge { int v; ll w; };
vector<Edge> adj[maxn];

int n, m, l;
ll s, t;
bool vis[maxn];

void dfs( int u, int cnt, ll sum ) {
    if( cnt == l ) {
        if( s <= sum && sum <= t ) vis[u] = 1;
        return;
    }
    for( auto [v, w] : adj[u] ) {
        dfs( v, cnt + 1, sum + w );
    }
}

void solve( ) {
    n = read( ), m = read( ), l = read( );
    s = read( ), t = read( );
    for( int i = 1; i <= m; ++ i ) {
        int u = read( ), v = read( ); ll w = read( );
        adj[u].push_back({ v, w });
    }
    dfs( 1, 0, 0 );
    for( int i = 1; i <= n; ++ i ) {
        if( vis[i] ) cout << i << " ";
    }
}
```
{% endfold %}

## 4. 复盘

- **复杂度**: $O( D^L + N )$。。
    
- **碎碎念**: 本题的关键在于发现状态少直接暴力搜索解决问题，不用多想。
    
- **关联笔记**: [[搜索]]