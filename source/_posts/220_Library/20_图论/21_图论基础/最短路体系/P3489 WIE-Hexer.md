---
title: '[Leaf] [P3489] WIE-Hexer'
tags:
  - 图论/最短路
  - DP/状压
  - 难度/P3
categories:
  - 220_Library
  - 20_图论
  - 21_图论基础
abbrlink: 7af08415
date: 2026-02-03 21:52:46
---
# [P3489 [POI 2009] WIE-Hexer - 洛谷](https://www.luogu.com.cn/problem/P3489)

## 1. 题面梗概

**中译中**: 猎魔人要从 1 号镇去 $n$ 号镇。某些路有特定的怪物，某些小镇有铁匠，可以获得针对某些怪物的特定武器。求到终点的最短时间。

## 2. 逻辑推导

**第一反应**：典型的最短路问题，但是这题有武器和怪物的限制。如果每次经过一个小镇都要判断之后能不能过某条路，会很繁琐，时间复杂度呵呵。

### 2.1 状态压缩

给定剑的种类 $p \leq 13$，这个数量级的数字暗示了我们可以状态压缩。那么我们就可以用一个 $13$ 位的二进制数 `mask` 来表示猎魔人当前的武器库。

这样我们就可以用 **状压DP** 的思路来求解这道最短路。

**状态定义**：$(u, mask)$，到了第 $u$ 个节点，武器库为 $mask$。

**状态转移**：对于边 $(u, v)$ 来说，只有当 `(cur_mask & need) == need$` 时才能转移。

**状态更新**：到达新城镇 $v$ 时，状态转化为 `cur_mask | sword[v]`。

### 2.2 最短路

提前读取铁匠信息，然后预处理每个小镇的武器库。

然后我们就可以跑一遍 DIjkstra 来解决了。

## 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 200 + 50;
const int maxp = 13;
const int inf = 1e9;

struct Edge { int to, time, need; };
struct Node { 
    int d, u, mask;
    bool operator < ( const Node &a ) const { return d > a.d; }
};

int dist[maxn][ 1 << maxp ];
int sword[maxn];
vector< Edge > adj[maxn];
int n, m, p, k;

void dijkstra( )
{
    memset( dist, 127, sizeof( dist ) );
    priority_queue< Node > pq;

    int start_mask = sword[1];
    dist[1][start_mask] = 0;
    pq.push({ 0, 1, start_mask });
    
    while( !pq.empty( ) )
    {
        auto [d, u, mask] = pq.top( );
        pq.pop( );

        if( d > dist[u][mask] ) continue;

        for( auto [v, t, need] : adj[u] )
        {
            if( ( mask & need ) != need ) continue;
            int next_mask = mask | sword[v];
            if( dist[v][next_mask] > d + t )
            {
                dist[v][next_mask] = d + t;
                pq.push({ dist[v][next_mask], v, next_mask });
            }
        }
    }
}

void solve( )
{
    cin >> n >> m >> p >> k;

    for( int i = 1; i <= k; ++ i )
    {
        int w, q, r, mask = 0;
        cin >> w >> q;
        while( q -- )
        {
            cin >> r;
            mask |= ( 1 << (r - 1) );
        }
        sword[w] |= mask;
    }

    for( int i = 1; i <= m; ++ i )
    {
        int v, w, t, s, u, mask = 0;
        cin >> v >> w >> t >> s;
        while( s -- )
        {
            cin >> u;
            mask |= ( 1 << (u - 1) );
        }
        adj[v].push_back({ w, t, mask });
        adj[w].push_back({ v, t, mask });
    }

    dijkstra( );

    int ans = inf;

    for( int mask = 0; mask < (1 << p); ++ mask )
        ans = min( ans, dist[n][mask] );

    if( ans == inf ) cout << -1 << '\n';
    else cout << ans << '\n';
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    solve( );
    return 0;
}
```

{% endfold %}

## 4. 复盘

- **复杂度分析**：$O( M \cdot 2^P \cdot \log( N \cdot 2^P ) )$。
    
- **碎碎念**：这题属于状压 + 最短路的梦幻联动。这题给我的启发是：如果题目中存在某种 **可以携带且数量极少** 的物品影响决策，那么就可以把这些物品的状态压缩进 Dijkstra 的维里。
    
- **关联笔记**：[[最短路体系]]
