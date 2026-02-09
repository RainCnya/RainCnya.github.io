---
title: '[Leaf] [CF911F] Tree Destruction'
tags:
  - 树论/直径
  - 策略/构造
  - 难度/P4
categories:
  - 220_Library
  - 20_图论
  - 22_树论专题
abbrlink: bab96266
date: 2025-12-18 00:00:00
updated: 2026-02-09 20:29:21
---

# [CF911F Tree Destruction - 洛谷](https://www.luogu.com.cn/problem/CF911F)

## 1. 题面梗概

**中译中**： 给你一棵树，每次选一个叶子节点删掉，贡献是它到当前树中另一个点的距离。怎么排删除顺序，能让总贡献最大？

## 2. 逻辑推导

既然是树上两点之间的最大距离，这显然是个直径问题。

### 2.1 构造

但我们不能随便删点，为了保证最终获得的总贡献最大，我们需要考虑让每个点都贡献它的最大值。

首先先跑一遍直径，找出两个端点 $A,B$，以及这条路径。

简单来说，我们可以把树上的节点划分为为两个集合。在直径上的集合 $D$，直径外的集合 $S$。

- 显然应该先删掉 $S$ 中的节点。对于 $u \in S$，我们计算它到 $A, B$ 的距离，谁大就和谁配对。注意从叶子节点开始删（有点类似拓扑？

- 删完了 $S$，我们就得对 $D$ 动刀了，直接从一头开始删到底就行。

### 2.2 结论

这是一个典型的利用直径排他性进行的构造。

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 2e5 + 50;

vector< int > adj[maxn];

int distA[maxn], distB[maxn];
int pre[maxn];
bool is_path[maxn];
vector< int > path;
int nodeA, nodeB;
int n;

struct Op { int u, v, rem; };
vector< Op > ops;
ll ans;

int bfs( int start, int dist[], bool flag )
{
    for( int i = 1; i <= n; ++ i ) dist[i] = -1;
    if( flag ) {
        for( int i = 1; i <= n; ++ i ) pre[i] = 0;
    }

    queue< int > q;
    q.push( start );
    dist[start] = 0;

    int root = start;
    while( !q.empty( ) )
    {
        int u = q.front( );
        q.pop( );

        if( dist[u] > dist[root] ) root = u;

        for( int v : adj[u] )
        {
            if( dist[v] == -1 )
            {
                dist[v] = dist[u] + 1;
                if( flag ) pre[v] = u;
                q.push( v );
            }
        }
    }
    return root;
}

void dfs( int u, int fa )
{
    for( int v : adj[u] )
    {
        if( v == fa || is_path[v] ) continue;
        dfs( v, u );
    }

    if( distA[u] > distB[u] )
    {
        ans += distA[u];
        ops.push_back({ nodeA, u, u });
    }
    else
    {
        ans += distB[u];
        ops.push_back({ nodeB, u, u });
    }
}

int main( )
{
    cin >> n;
    for( int i = 1; i < n; ++ i )
    {
        int u, v;
        cin >> u >> v;
        adj[u].push_back( v );
        adj[v].push_back( u );
    }

    nodeA = bfs( 1, distA, 0 );
    nodeB = bfs( nodeA, distA, 1 );
    bfs( nodeB, distB, 0 );

    int cur = nodeB;
    while( cur != 0 )
    {
        is_path[cur] = 1;
        path.push_back( cur );
        cur = pre[cur];
    }

    for( int u : path )
    {
        for( int v : adj[u] )
        {
            if( !is_path[v] )
            {
                dfs( v, u );
            }
        }
    }

    for( int i = 0; i < path.size( ) - 1; ++ i )
    {
        int u = path[i];
        ans += distA[u];
        ops.push_back( { nodeA, u, u } );
    }

    cout << ans << '\n';

    for( auto [u, v, rmv] : ops )
    {
        cout << u << " " << v << " " << rmv << '\n';
    }
    
    return 0;
}
```

{% endfold %}

## 4. 复盘

- **复杂度分析**：$O( N )$。
    
- **碎碎念**：为什么先删侧枝？因为侧枝的删除依赖于直径端点的存在，只要端点 $A, B$ 有一个被提前删了，侧枝点就拿不到真正的最大距离了。
    
- **关联笔记**：[[直径与重心]] | [[构造体系]]