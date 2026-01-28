---
title: P5304 旅行者 (MultiSource_Dijkstra_Coloring)
tags:
  - 图论/最短路
  - 算法/染色法
difficulty:
  - 提高+/省选-
categories:
  - 11_Library
  - 02_图论
  - 01_最短路及其应用
abbrlink: a87389cd
date: 2025-12-01 00:00:00
---
# [Luogu-P5304](https://www.luogu.com.cn/problem/P5304) 旅行者

## 1. 核心逻辑

- **问题本质**: 给定 $K$ 个关键点，寻找这 $K$ 个点中任意两点间的最短路径长度。
    
- **核心切入点**:
    
    1. **暴力局限**: 运行 $K$ 次 Dijkstra 会超时。
        
    2. **染色/势力范围模型**:
        
        - 运行一次多源 Dijkstra，求出每个点 $u$ 距离最近的关键点 `col1[u]` 及距离 `d1[u]`。
            
        - 建立反图，运行一次多源反向 Dijkstra，求出距离每个点 $u$ 最近的关键点 `col2[u]` 及距离 `d2[u]`。
            
    3. **跨域判定**: 遍历原图中的每一条边 $(u, v, w)$。如果 `col1[u]` 和 `col2[v]` 不同（意味着这条边连接了两个不同关键点的势力范围），则可能构成最短路：
        
        $$ans = \min(ans, d1[u] + w + d2[v])$$
    4. **算法优势**: 仅需 2 次 Dijkstra，复杂度稳定。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
// P5304 旅行者
// Key Logic: Multi-source Dijkstra coloring + Reversed graph coloring

#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
typedef pair< ll, int > pli;

const int maxn = 1e5 + 50;
const ll inf = 1e18;

struct Edge { int to, w; };
vector< Edge > adj[ maxn ], radj[ maxn ];
ll d[ 2 ][ maxn ];
int col[ 2 ][ maxn ];
int n, m, k_num;
int k_pts[ maxn ];

void dijkstra( int id, vector< Edge > *g )
{
    for( int i = 1; i <= n; ++ i ) d[ id ][ i ] = inf, col[ id ][ i ] = 0;
    priority_queue< pli, vector< pli >, greater< pli > > pq;

    for( int i = 1; i <= k_num; ++ i )
    {
        int u = k_pts[ i ];
        d[ id ][ u ] = 0;
        col[ id ][ u ] = u;
        pq.push( { 0, u } );
    }

    while( ! pq.empty( ) )
    {
        auto [ cur_d, u ] = pq.top( );
        pq.pop( );

        if( cur_d > d[ id ][ u ] ) continue;

        for( auto &e : g[ u ] )
        {
            if( d[ id ][ u ] + e.w < d[ id ][ e.to ] )
            {
                d[ id ][ e.to ] = d[ id ][ u ] + e.w;
                col[ id ][ e.to ] = col[ id ][ u ];
                pq.push( { d[ id ][ e.to ], e.to } );
            }
        }
    }
}

void solve( )
{
    cin >> n >> m >> k_num;
    for( int i = 1; i <= n; ++ i ) adj[ i ].clear( ), radj[ i ].clear( );
    for( int i = 1; i <= m; ++ i )
    {
        int u, v, w;
        cin >> u >> v >> w;
        if( u != v )
        {
            adj[ u ].push_back( { v, w } );
            radj[ v ].push_back( { u, w } );
        }
    }
    for( int i = 1; i <= k_num; ++ i ) cin >> k_pts[ i ];

    dijkstra( 0, adj );
    dijkstra( 1, radj );

    ll ans = inf;
    for( int u = 1; u <= n; ++ u )
    {
        for( auto &e : adj[ u ] )
        {
            int v = e.to;
            if( col[ 0 ][ u ] && col[ 1 ][ v ] && col[ 0 ][ u ] != col[ 1 ][ v ] )
            {
                ans = min( ans, d[ 0 ][ u ] + e.w + d[ 1 ][ v ] );
            }
        }
    }
    cout << ans << "\n";
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );
    int T;
    cin >> T;
    while( T -- ) solve( );
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **时间复杂度**: $O(T \cdot M \log N)$。
    
- **核心思路**: 通过正反两次多源 Dijkstra 确定每个点属于哪个关键点的“势力范围”。任何跨越不同势力范围的边都是潜在的最短路组成部分。