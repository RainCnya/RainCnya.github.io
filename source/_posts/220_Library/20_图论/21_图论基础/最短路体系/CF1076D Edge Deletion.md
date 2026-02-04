---
title: '[Leaf] [CF1076D] Edge Deletion'
tags:
  - 图论/最短路
  - 图论/最短路树
  - 难度/P3
categories:
  - 220_Library
  - 20_图论
  - 21_图论基础
abbrlink: 2e445cc0
date: 2025-11-25 00:00:00
updated: 2026-02-04 14:21:06
---
# [CF1076D Edge Deletion - 洛谷](https://www.luogu.com.cn/problem/CF1076D)

## 1. 题意梗概

**中译中**：给定一个无向有权图，要删掉一些边，最多保留 $k$ 条边。要求在删边后，依然保持从 $1$ 号点出发的最短路长度不变的点数尽可能多，输出保留哪些边。

## 2. 逻辑推导

**直观上分析**：保留的边是为了保留最短路。如果我们要让尽可能多的点到源点的距离不变，那么每个点只需要保留一条通往源点的最短路径上的边。

### 2.1 最短路树

从 Dijkstra 切入，我们发现当 $u$ 点通过 $e$ 点松弛了 $v$ 点时，$e$ 点就是 $v$ 的必要前驱点。如果我们将所有点的前驱边记录下来，整个图就收缩为了一个以源点为根的树。

**这就是最短路树**。因此为了达到题目的要求，我们只需要尽可能多的维护这棵树上的边即可。

### 2.2 贪心

假如一棵树有 $n$ 个节点，那么它一定有 $n-1$ 条边。如果 $k \geq n-1$，我们就应该全部留下。

反之如果 $k < n - 1$，我们就需要考虑删掉一些边了，从树的结构出发，很显然就是删掉某些叶子节点所在的边。

### 2.3 结论

这题是个很典型的 SPT 模型。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair<int, int>;
using PLI = pair<ll, int>;

const int maxn = 3e5 + 50;
const ll inf = 1e18;

struct Edge {
    int to, id;
    ll w;
};

vector<Edge> adj[maxn];
vector<PII> tadj[maxn];
PII pre[maxn];

ll dis[maxn];
bool vis[maxn];
int n, m, k;

void dijkstra( )
{
    for( int i = 1; i <= n; ++ i )
    {
        dis[i] = inf, vis[i] = 0;
    }
    dis[1] = 0;

    priority_queue< PLI, vector<PLI>, greater<PLI> > pq;
    pq.push({ 0, 1 });

    while( !pq.empty( ) )
    {
        auto [d, u] = pq.top( );
        pq.pop( );

        if( vis[u] ) continue;
        vis[u] = 1;

        for( auto& [v, id, w] : adj[u] )
        {
            if( dis[u] + w < dis[v] )
            {
                dis[v] = dis[u] + w;
                pre[v] = { u, id };
                pq.push({ dis[v], v });
            }
        }
    }
}

void build( )
{
    for( int i = 2; i <= n; ++ i )
    {
        auto [u, id] = pre[i];
        tadj[u].push_back({ i, id });
    }
}

void bfs( )
{
    vector<int> ans;
    queue<int> q;
    q.push( 1 );

    while( !q.empty( ) )
    {
        if( ans.size( ) >= k ) break;

        int u = q.front( );
        q.pop( );

        for( auto& [v, id] : tadj[u] )
        {
            ans.push_back( id );
            if( ans.size( ) >= k ) break;
            q.push( v );
        }
    }

    cout << ans.size( ) << '\n';
    for( int x : ans )
        cout << x << " ";
    cout << '\n';
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);

    cin >> n >> m >> k;
    for( int i = 1; i <= m; ++ i )
    {
        int u, v;
        ll w;
        cin >> u >> v >> w;
        adj[u].push_back({ v, i, w });
        adj[v].push_back({ u, i, w });
    }

    dijkstra( );
    build( );
    bfs( );

    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度分析**：$O(M \log M + N)$。瓶颈在于 Dijkstra 的开销。
    
- **碎碎念**：最短路树 (SPT) 是一个最短路的模型。很多“删边保持最短路”或者“限边数求最短路覆盖”的问题，都可以从 SPT 的角度切入。这道题最坑的地方是 $k$ 的限制，必须通过 BFS 保证保留的边是连通的，否则你保留了叶子的边但没留祖先的边，叶子到根的距离还是会变。
    
- **关联笔记**：[[最短路体系]]