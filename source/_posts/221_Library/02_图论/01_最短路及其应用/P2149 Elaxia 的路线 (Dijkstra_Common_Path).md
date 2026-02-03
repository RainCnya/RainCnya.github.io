---
title: P2149 Elaxia 的路线 (Dijkstra_Common_Path)
tags:
  - 图论/最短路
  - 图论/建模
categories:
  - 221_Library
  - 02_图论
  - 01_最短路及其应用
abbrlink: e4145a20
difficulty: 提高+/省选-
date: 2025-12-08 08:54:29
---
# [Luogu-P1195](https://www.luogu.com.cn/problem/P2149) Elaxia 的路线

## 1. 核心逻辑

- **问题本质**: 求解两对点 $(x_1, y_1)$ 和 $(x_2, y_2)$ 的最短路径中最长公共部分的长度。
    
- **破局转换**:
    
    1. **最短路判定**：边 $(u, v)$ 在 $S \to T$ 的最短路上的充要条件是 $dist[S][u] + w + dist[v][T] = dist[S][T]$。
        
    2. **图层过滤**：运行 4 次 Dijkstra（以 $x_1, y_1, x_2, y_2$ 为起点），提取出所有同时属于两对最短路径的边。
        
    3. **方向性处理**：公共路径在两条路线上可能是同向的，也可能是反向的。分别处理这两种情况下的重合边集。
        
    4. **最长路转化**：重合边构成的图必定是 DAG。在 DAG 上运行拓扑排序或记忆化搜索求解最长链。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
// P2149 Elaxia 的路线
// Key Logic: Shortest Path Subgraph (DAG) + Longest Path on DAG

#include <bits/stdc++.h>
using namespace std;

typedef pair< int, int > pii;
const int maxn = 1505;
const int inf = 0x3f3f3f3f;

struct Edge { int u, v, w; };
vector< pii > adj[ maxn ];
vector< pii > dag[ maxn ];
int d[ 5 ][ maxn ], ind[ maxn ], f[ maxn ];
int n, m, x1, y1, x2, y2;

void dijkstra( int st, int *dist )
{
    for( int i = 1; i <= n; ++ i ) dist[ i ] = inf;
    dist[ st ] = 0;
    priority_queue< pii, vector< pii >, greater< pii > > pq;
    pq.push( { 0, st } );

    while( ! pq.empty( ) )
    {
        auto [ cur_d, u ] = pq.top( );
        pq.pop( );
        if( cur_d > dist[ u ] ) continue;
        for( auto &e : adj[ u ] )
        {
            if( dist[ u ] + e.second < dist[ e.first ] )
            {
                dist[ e.first ] = dist[ u ] + e.second;
                pq.push( { dist[ e.first ], e.first } );
            }
        }
    }
}

int solve( bool rev )
{
    for( int i = 1; i <= n; ++ i ) dag[ i ].clear( ), ind[ i ] = 0, f[ i ] = 0;
    for( int u = 1; u <= n; ++ u )
    {
        for( auto &e : adj[ u ] )
        {
            int v = e.first, w = e.second;
            // 判定是否在第一对最短路上
            if( d[ 1 ][ u ] + w + d[ 2 ][ v ] == d[ 1 ][ y1 ] )
            {
                // 判定是否在第二对最短路上 (同向或反向)
                if( ! rev )
                {
                    if( d[ 3 ][ u ] + w + d[ 4 ][ v ] == d[ 3 ][ y2 ] ) 
                        dag[ u ].push_back( { v, w } ), ind[ v ] ++;
                }
                else
                {
                    if( d[ 4 ][ u ] + w + d[ 3 ][ v ] == d[ 4 ][ x2 ] )
                        dag[ u ].push_back( { v, w } ), ind[ v ] ++;
                }
            }
        }
    }

    queue< int > q;
    for( int i = 1; i <= n; ++ i ) if( ! ind[ i ] ) q.push( i );
    int res = 0;
    while( ! q.empty( ) )
    {
        int u = q.front( ); q.pop( );
        res = max( res, f[ u ] );
        for( auto &e : dag[ u ] )
        {
            f[ e.first ] = max( f[ e.first ], f[ u ] + e.second );
            if( -- ind[ e.first ] == 0 ) q.push( e.first );
        }
    }
    return res;
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> m >> x1 >> y1 >> x2 >> y2;
    for( int i = 1; i <= m; ++ i )
    {
        int u, v, w;
        cin >> u >> v >> w;
        adj[ u ].push_back( { v, w } );
        adj[ v ].push_back( { u, w } );
    }

    dijkstra( x1, d[ 1 ] ); dijkstra( y1, d[ 2 ] );
    dijkstra( x2, d[ 3 ] ); dijkstra( y2, d[ 4 ] );

    cout << max( solve( 0 ), solve( 1 ) ) << "\n";

    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(M \log N + N + M)$。
    
- **关键点**: 必须考虑两对最短路径在公共边上的方向重合问题。