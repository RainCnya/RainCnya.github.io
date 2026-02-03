---
title: '[Leaf] [ZJ2021J] Grammy and Jewelry'
tags:
  - DP/背包
  - 图论/最短路
  - 难度/P3
categories:
  - 220_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: 289904fa
date: 2026-01-22 00:00:00
---
# [ZJ2021J - Grammy and Jewelry](https://codeforces.com/gym/103055/problem/J)

## 1. 题面梗概

**中译中**: 图上有 $n$ 个点，你在 1 号点，第 $i$ 有无限个价值为 $a_i$ 的珠宝。你每次只能搬一个，搬运过程：$1 \to i \to 1$。每条边走 1 分钟。问在 $1 \dots T$ 分钟内，每个时间点能拿到的最大总价值是多少。

## 2. 逻辑推导

第一反应是背包问题，同时还是完全背包，无限物品，价值，成本，都在暗示。

既然每条边的边权相等，那么我们可以直接用 $BFS$ 预处理最短路（也就是成本）。

然后完全背包 DP，即可算出答案。

**定义**：$dp[j]$ 表示 $j$ 时间内能获得的最高价值。

**转移**：$dp[j] = \max(dp[j], dp[j - 2d_i] + a_i)$。 

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair<int, int>;

const int maxn = 3e3 + 5;

vector< int > adj[maxn];
int dist[maxn];
int a[maxn];
ll dp[maxn];
int n, m, T;

void bfs( int start )
{
    queue< int > q;
    q.push( start );
    dist[1] = 0;

    while( !q.empty( ) )
    {
        int u = q.front( );
        q.pop( );

        for( int v : adj[u] )
        {
            if( dist[v] == -1 )
            {
                dist[v] = dist[u] + 1;
                q.push( v );
            }
        }
    }
}

void solve( )
{
    cin >> n >> m >> T;
    for( int i = 2; i <= n; ++ i )
    {
        cin >> a[i];
    }

    for( int i = 1; i <= m; ++ i )
    {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    memset( dist, -1, sizeof( dist ) );

    bfs( 1 );

    for( int i = 2; i <= n; ++ i )
    {
        if( dist[i] == -1 ) continue;
        for( int j = 2 * dist[i]; j <= T; ++ j )
        {
            dp[j] = max( dp[j], dp[j - 2 * dist[i]] + a[i] );
        }
    }

    for( int k = 1; k <= T; ++ k )
    {
        cout << dp[k] << " ";
    }
    cout << '\n';
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int _t = 1;
//  cin >> _t;
    while( _t -- )
    {
        solve( );
    }
    return 0;
}
```
{% endfold %}

## 4. 复盘
- **复杂度**: $O( N + M + N \times T )$

- **碎碎念**: 其实不难，只要能理解广义背包的概念，选与不选，这题就简单地化解为完全背包模型，只需要跑一遍 BFS 即可。

- **关联笔记**: [[背包DP]]