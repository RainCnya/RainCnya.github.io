---
title: '[Leaf] [ABC441D] Paid Walk'
tags:
  - 搜索/DFS
  - 难度/P1/提高-
categories:
  - 10_Library
  - 00_基础算法
  - 03_搜索战术
abbrlink: 7b70f3b7
date: 2026-01-18
---
# [ABC441D - Paid Walk](https://atcoder.jp/contests/abc441/tasks/abc441_d "null")

## 1. 题面梗概

- 给定一个 $N$ 点 $M$ 边的有向图，每个点的出度不超过 4。求所有顶点 $v$，使得存在一条从点 1 到点 $v$ 且长度恰好为 $L$ 的路径，其边权总和 $Cost \in [S, T]$。
    

## 2. 逻辑推导

好像有点无从下手，我最开始想能不能先跑 `Dijkstra`，但是发现跟这题相性很差。再接着看题发现，$L \leq 10$，每个点的出度最多为 $4$，也就是说，每个点的后续情况最多只有 $4$ 种。

这意味着，如果直接`dfs` 的话，时间复杂度为 $4^L \leq 4^{10}$，绰绰有余！！！

OK，那题目就变得很简单了，我们只需要把所有路线都搜出来，最终满足条件的点记录，最后输出即可。
        

## 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair< ll, int >;

const int maxn = 2e5 + 50;
vector< PII > adj[maxn];
bool vis[maxn];
int n, m, l;
ll s, t;

void dfs( int u, int step, ll sum )
{
    if( step == l )
    {
        if( s <= sum && sum <= t )
        {
            vis[u] = 1;
        }
        return ;
    }
    for( auto [cost, v] : adj[u] )
    {
        dfs( v, step + 1, sum + cost );
    }
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);

    cin >> n >> m >> l >> s >> t;

    for( int i = 1; i <= m; ++ i )
    {
        int u, v; ll c;
        cin >> u >> v >> c;
        adj[u].push_back({ c, v });
    }
    
    dfs( 1, 0, 0 );

    for( int i = 1; i <= n; ++ i )
    {
        if( vis[i] ) cout << i << " ";
    }

    return 0;
}
```

{% endfold %}

## 4. 复盘

- **复杂度**: $O( D^L + N )$，其中 $D_{out} = 4, L = 10$。
    
- **碎碎念**: 看到 $10^9$ 的权值范围时可能会往 DP 跑，但 $L$ 极小且出度有限是典型的暴力搜索信号。
    
- **关联笔记**: [[搜索]]