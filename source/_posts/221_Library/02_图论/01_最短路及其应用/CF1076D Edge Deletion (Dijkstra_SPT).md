---
title: CF1076D Edge Deletion (Dijkstra_SPT)
tags:
  - 图论/最短路/最短路树
difficulty:
  - 提高+/省选-
categories:
  - 221_Library
  - 02_图论
  - 01_最短路及其应用
abbrlink: 2e445cc0
date: 2025-11-25 00:00:00
---
# [Luogu-CF1076D](https://www.luogu.com.cn/problem/CF1076D) Edge Deletion

## 1. 核心逻辑

- **问题本质**: 在保留最多 $K$ 条边的前提下，最大化“到源点距离不变”的点数。
    
- **破局转换**:
    
    1. **结构提取**：只要保留最短路树（SPT）上的边，对应点的最短路长度就不会改变。
        
    2. **贪心策略**：SPT 是一棵树，节点数 $N$，边数 $N-1$。如果 $K < N-1$，为了让尽可能多的点到源点的距离保持不变，我们需要优先保留离源点“近”的节点及其连边。
        
    3. **算法流程**：
        
        - 运行 Dijkstra，同时记录每个点的最短路前驱边 `pre_edge[v]`。
            
        - 所有的前驱边构成 SPT。
            
        - 在 SPT 上运行 BFS，按层序保留前 $K$ 条边即可。
            

## 2. 代码实现

{% fold info @AcCode_Complete %}

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
const int maxn = 3e5 + 50;

struct Edge { int to, w, id; };
vector< Edge > adj[ maxn ];
ll d[ maxn ];
int pre_e[ maxn ], pre_u[ maxn ];
bool vis[ maxn ];
vector< pair< int, int > > tree[ maxn ];

int main( )
{
    int n, m, k;
    scanf( "%d%d%d", &n, &m, &k );
    for( int i = 1; i <= m; ++ i )
    {
        int u, v, w;
        scanf( "%d%d%d", &u, &v, &w );
        adj[ u ].push_back( { v, w, i } );
        adj[ v ].push_back( { u, w, i } );
    }

    fill( d + 1, d + n + 1, 2e18 );
    d[ 1 ] = 0;
    priority_queue< pair< ll, int >, vector< pair< ll, int > >, greater< pair< ll, int > > > pq;
    pq.push( { 0, 1 } );

    while( ! pq.empty( ) )
    {
        int u = pq.top( ).second; pq.pop( );
        if( vis[ u ] ) continue;
        vis[ u ] = 1;
        for( auto &e : adj[ u ] )
        {
            if( d[ u ] + e.w < d[ e.to ] )
            {
                d[ e.to ] = d[ u ] + e.w;
                pre_e[ e.to ] = e.id;
                pre_u[ e.to ] = u;
                pq.push( { d[ e.to ], e.to } );
            }
        }
    }

    for( int i = 2; i <= n; ++ i ) tree[ pre_u[ i ] ].push_back( { i, pre_e[ i ] } );

    vector< int > ans;
    queue< int > q;
    q.push( 1 );
    while( ! q.empty( ) )
    {
        int u = q.front( ); q.pop( );
        for( auto &p : tree[ u ] )
        {
            if( ans.size( ) < k )
            {
                ans.push_back( p.second );
                q.push( p.first );
            }
        }
    }

    printf( "%d\n", ( int )ans.size( ) );
    for( int i = 0; i < ans.size( ); ++ i ) printf( "%d%c", ans[ i ], i == ans.size( ) - 1 ? '\n' : ' ' );

    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: Dijkstra $O(M \log N)$ + BFS $O(N)$。
    
- **关键点**: 最短路树上的前 $K$ 条边（靠近根节点）能保留最多的“距离不变”点。