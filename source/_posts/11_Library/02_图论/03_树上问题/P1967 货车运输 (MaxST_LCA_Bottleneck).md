---
title: P1967 货车运输 (MaxST_LCA_Bottleneck)
tags:
  - 树论/MST
  - 树论/LCA
difficulty: 提高+/省选-
categories:
  - 11_Library
  - 02_图论
  - 03_树上问题
abbrlink: 7fb577ad
date: 2025-12-18 00:00:00
---

# [Luogu-P1967](https://www.luogu.com.cn/problem/P1967) 货车运输

## 1. 核心逻辑

- **问题本质**: 在带权无向图中，寻找两点间路径，使得路径上的**最小边权最大**（瓶颈路问题）。
    
- **破局转换**:
    
    1. **结构坍缩**：根据 Kruskal 原理，原图的瓶颈路必然落在其**最大生成树 (MaxST)** 上。
        
    2. **模型映射**：将图转化为最大生成森林，问题转化为求树上两点路径间的边权最小值。
        
    3. **状态维护**：利用 LCA 倍增法。定义 $f[u][i]$ 为 $u$ 点向上跳 $2^i$ 步的祖先，$min\_w[u][i]$ 为该段路径的权值最小值。
        
- **关键点**: 图可能不连通，需处理为最大生成森林（循环调用 DFS 覆盖全点集）。
    

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxn = 1e4 + 50;
const int maxm = 5e4 + 50;
const int inf = 0x3f3f3f3f;

struct Edge 
{
    int u, v, w;
    bool operator < ( const Edge &other ) const 
    {
        return w > other.w; 
    }
} edges[ maxm ];

int fa[ maxn ], f[ maxn ][ 20 ], min_w[ maxn ][ 20 ], dep[ maxn ];
bool vis[ maxn ];
vector< pair< int, int > > adj[ maxn ];
int n, m, q;

int find( int x )
{
    return x == fa[ x ] ? x : fa[ x ] = find( fa[ x ] );
}

void dfs( int u, int father, int w )
{
    vis[ u ] = 1;
    dep[ u ] = dep[ father ] + 1;
    f[ u ][ 0 ] = father;
    min_w[ u ][ 0 ] = w;

    for( int i = 1; i < 20; ++ i )
    {
        f[ u ][ i ] = f[ f[ u ][ i - 1 ] ][ i - 1 ];
        min_w[ u ][ i ] = min( min_w[ u ][ i - 1 ], min_w[ f[ u ][ i - 1 ] ][ i - 1 ] );
    }
    
    for( auto &e : adj[ u ] )
    {
        if( e.first != father ) dfs( e.first, u, e.second );
    }
}

int query( int x, int y )
{
    int ans = inf;
    if( dep[ x ] < dep[ y ] ) swap( x, y );
    
    for( int i = 19; i >= 0; -- i )
    {
        if( dep[ f[ x ][ i ] ] >= dep[ y ] )
        {
            ans = min( ans, min_w[ x ][ i ] );
            x = f[ x ][ i ];
        }
    }
    if( x == y ) return ans;

    for( int i = 19; i >= 0; -- i )
    {
        if( f[ x ][ i ] != f[ y ][ i ] )
        {
            ans = min( { ans, min_w[ x ][ i ], min_w[ y ][ i ] } );
            x = f[ x ][ i ];
            y = f[ y ][ i ];
        }
    }
    return min( { ans, min_w[ x ][ 0 ], min_w[ y ][ 0 ] } );
}

int main( )
{
    ios::sync_with_stdio( 0 ); cin.tie( 0 );
    cin >> n >> m;
    for( int i = 1; i <= m; ++ i ) cin >> edges[ i ].u >> edges[ i ].v >> edges[ i ].w;

    iota( fa + 1, fa + n + 1, 1 );
    sort( edges + 1, edges + m + 1 );

    for( int i = 1; i <= m; ++ i )
    {
        int fu = find( edges[ i ].u ), fv = find( edges[ i ].v );
        if( fu != fv )
        {
            fa[ fu ] = fv;
            adj[ edges[ i ].u ].push_back( { edges[ i ].v, edges[ i ].w } );
            adj[ edges[ i ].v ].push_back( { edges[ i ].u, edges[ i ].w } );
        }
    }

    memset( min_w, 0x3f, sizeof( min_w ) );
    for( int i = 1; i <= n; ++ i )
    {
        if( ! vis[ i ] ) dfs( i, 0, inf );
    }

    cin >> q;
    while( q -- )
    {
        int x, y; cin >> x >> y;
        if( find( x ) != find( y ) ) cout << "-1\n";
        else cout << query( x, y ) << "\n";
    }
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(M \log M + Q \log N)$。
    
- **核心思路**: 利用最大生成树保留所有潜在的“瓶颈最优路径”，结合倍增极速检索。注意森林环境下的 DFS 初始化。