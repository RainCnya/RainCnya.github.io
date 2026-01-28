---
title: 'P1099 [NOIP2007] 树网的核 (Diameter_Core)'
tags:
  - 树论/直径
  - 单调性/双指针
difficulty:
  - 普及+/提高
categories:
  - 11_Library
  - 02_图论
  - 03_树上问题
abbrlink: b9909e14
date: 2025-12-18 00:00:00
---
# [Luogu-P1099](https://www.luogu.com.cn/problem/P1099) 树网的核

## 1. 核心逻辑

- **问题本质**: 在树的直径上截取一段长度不超过 $s$ 的路径 $F$，最小化全树所有点到 $F$ 的距离的最大值（偏心距）。
    
- **破局转换**:
    
    1. **偏心距分解**: 对于选定的核 $F=[i, j]$，最大距离来源于三部分：
        
        - 直径外：直径上所有点向外延伸的“枝条”长度的最大值。
            
        - 直径内左侧：端点 $A$ 到 $F$ 左端点 $i$ 的距离。
            
        - 直径内右侧：端点 $B$ 到 $F$ 右端点 $j$ 的距离。
            
    2. **公式**: $ECC(F) = \max( \max_{k \in path} branch[k], dist(A, i), dist(B, j) )$。
        
    3. **算法优化**: 直径上的点满足单调性，使用**双指针**在直径序列上维护长度限制，实时更新答案。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxn = 5e5 + 50;
struct Edge { int v, w; };
vector< Edge > adj[ maxn ];
int d[ maxn ], pre[ maxn ], br[ maxn ], n, s, nodeA, nodeB;
bool on_path[ maxn ];

void bfs( int start, int* dist, bool record )
{
    fill( dist + 1, dist + n + 1, -1 );
    queue< int > q; q.push( start ); dist[ start ] = 0;
    while( ! q.empty( ) )
    {
        int u = q.front( ); q.pop( );
        for( auto &e : adj[ u ] )
        {
            if( dist[ e.v ] == -1 )
            {
                dist[ e.v ] = dist[ u ] + e.w;
                if( record ) pre[ e.v ] = u;
                q.push( e.v );
            }
        }
    }
}

int dfs_branch( int u, int fa )
{
    int res = 0;
    for( auto &e : adj[ u ] )
    {
        if( e.v == fa || on_path[ e.v ] ) continue;
        res = max( res, dfs_branch( e.v, u ) + e.w );
    }
    return res;
}

int main( )
{
    ios::sync_with_stdio( 0 ); cin.tie( 0 );
    cin >> n >> s;
    for( int i = 1, u, v, w; i < n; ++ i )
    {
        cin >> u >> v >> w;
        adj[ u ].push_back( { v, w } ); adj[ v ].push_back( { u, w } );
    }

    bfs( 1, d, 0 );
    nodeA = max_element( d + 1, d + n + 1 ) - d;
    bfs( nodeA, d, 1 );
    nodeB = max_element( d + 1, d + n + 1 ) - d;

    vector< int > p;
    for( int i = nodeB; i; i = pre[ i ] ) { on_path[ i ] = 1; p.push_back( i ); }
    reverse( p.begin( ), p.end( ) );

    int max_br = 0;
    for( int u : p ) max_br = max( max_br, dfs_branch( u, 0 ) );

    int ans = 1e9, r = 0;
    for( int l = 0; l < p.size( ); ++ l )
    {
        while( r + 1 < p.size( ) && d[ p[ r + 1 ] ] - d[ p[ l ] ] <= s ) ++ r;
        ans = min( ans, max( { max_br, d[ p[ l ] ], d[ nodeB ] - d[ p[ r ] ] } ) );
    }

    cout << ans << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N)$。双指针遍历直径序列。
    
- **关键点**: 理解偏心距的三个组成维度：内部溢出（端点距离）与外部溢出（侧枝深度）。