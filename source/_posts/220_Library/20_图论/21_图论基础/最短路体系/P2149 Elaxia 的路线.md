---
title: '[Leaf] [P2149] Elaxia 的路线'
tags:
  - 图论/最短路
  - 图论/建模
  - 难度/P3
categories:
  - 220_Library
  - 20_图论
  - 21_图论基础
abbrlink: e4145a20
date: 2025-12-08 08:54:29
updated: 2026-02-04 14:46:00
---
# [P2149 [SDOI2009] Elaxia的路线 - 洛谷](https://www.luogu.com.cn/problem/P2149)

## 1. 题面梗概

 **中译中**: 给两个起点终点对 $(x_1, y_1)$ 和 $(x_2, y_2)$ 和一个无向图。求这两对点各自的最短路径集合中，最长公共路径的长度。
    
## 2. 逻辑推导

从最短路出发，我们知道两个点之间的最短路往往不止一条，而最长公共路径很明显就是一条链。我们考虑先找出那些边有资格出现在最短路径上。

### 2.1 最短路

对于一对源汇点 $(S,T)$，边 $(u,v)$ 权值为 $w$ 在其最短路上的充要条件是：

$$
dist(S,u) + w + dist(v, T) = dist(S,T)
$$
只要满足这个条件，就说明这条边一定在 $S \to T$  的最短路上。

### 2.2 DIjkstra

那么我们有 $4$ 个源汇点，分别以 $4$ 个点为起点跑一遍 $dijkstra$，得到所有点到这 $4$ 个点的距离。

接着我们遍历所有的边 $(u, v)$，判断它们是否属于两对点的最短路。

而因为这是一个无向图，所以我们需要正反跑两次建图。

### 2.3 DAG最长路

重合边构成的图必然是一个 DAG。那么问题就转化为在 $DAG$ 上求**带权最长路**，我们用拓扑排序就可以轻松解决。

## 3. 代码实现

{% fold info @AcCode %}

```cpp
#include<bits/stdc++.h>
using namespace std;
using PII = pair<int, int>;
using ll = long long;

const int maxn = 1e5 + 50;
const int inf = 0x3f3f3f3f;

vector<PII> adj[maxn];
int d1[maxn], d2[maxn], d3[maxn], d4[maxn];
int memo[maxn], n, m;
int X1, X2, Y1, Y2;

void dijkstra( int st, int dist[] )
{
    for( int i = 1; i <= n; ++ i ) dist[i] = inf;
    dist[st] = 0;

    priority_queue< PII, vector<PII>, greater<PII> > pq;
    pq.push({ 0, st });

    while( !pq.empty( ) )
    {
        auto [d, u] = pq.top( );
        pq.pop( );
        if( d > dist[u] ) continue;
        for( auto [v, w] : adj[u] )
        {
            if( dist[u] + w < dist[v] )
            {
                dist[v] = dist[u] + w;
                pq.push({ dist[v], v });
            }
        }
    }
}

int dfs( int u, bool dir )
{
    if( memo[u] != -1 ) return memo[u];
    int len = 0;
    for( auto& [v, w] : adj[u] )
    {
        if( d1[u] + w + d2[v] != d1[Y1] ) continue;

        bool ok = 0;
        if( dir ) ok = ( d3[u] + w + d4[v] == d3[Y2] );
        else ok = ( d3[v] + w + d4[u] == d3[Y2] );

        if( ok ) len = max( len, w + dfs( v, dir ) );
    }
    return memo[u] = len;
}

int main( )
{
    cin >> n >> m;
    cin >> X1 >> Y1 >> X2 >> Y2;

    for( int i = 1; i <= m; ++ i )
    {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({ v, w });
        adj[v].push_back({ u, w });
    }

    dijkstra( X1, d1 );
    dijkstra( Y1, d2 );
    dijkstra( X2, d3 );
    dijkstra( Y2, d4 );

    int ans = 0;

    memset( memo, -1, sizeof( memo ) );
    for( int i = 1; i <= n; ++ i )
        ans = max( ans, dfs( i , 0 ) );

    memset( memo, -1, sizeof( memo ) );
    for( int i = 1; i <= n; ++ i )
        ans = max( ans, dfs( i , 1 ) );

    cout << ans << '\n';
    return 0;
}
```

{% endfold %}

## 4. 复盘

- **复杂度分析**：$O( 4 \cdot M \log M + N + M )$。4 次 Dijkstra 是大头。
    
- **碎碎念**：从这题出发我们可以注意到：**最短路集合是一个图，而这个图在权值非负时一定是 DAG**。
	
- **关联笔记**：[[最短路体系]] | [[拓扑排序]]