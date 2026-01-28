---
title: 'P6833 [Cnoi2020] 雷雨 (Steiner_Tree_Subset)'
tags:
  - 图论/最短路
  - 图论/建模
difficulty: 普及+/提高
categories:
  - 11_Library
  - 02_图论
  - 01_最短路及其应用
abbrlink: 2e31c9e8
date: 2025-12-01 00:00:00
---
# [Luogu-P6833](https://www.luogu.com.cn/problem/P6833) 雷雨

## 1. 核心逻辑

- **问题本质**: 在带权网格图中，寻找连接给定三点 $A, B, C$ 的最小权值连通子图。
    
- **核心切入点**:
    
    1. **斯坦纳树简化**: 这是一个三点斯坦纳树问题。由于只有三个点，最优解必然是一个“汇合点” $u$ 到这三个点的三条最短路径之和。
        
    2. **公式推导**:
        
        $$\text{Cost}(u) = dist(A, u) + dist(B, u) + dist(C, u) - 2 \cdot W(u)$$
        
        其中减去 $2 \cdot W(u)$ 是因为点 $u$ 的权值在三条路径计算中重复被计算了两次。
        
    3. **算法流程**:
        
        - 运行 3 次单源最短路（Dijkstra），分别以三点作为起点，计算全图所有点到这三点的距离。
            
        - 遍历网格图中的所有点，计算 $\text{Cost}(u)$，取全局最小值。
            

## 2. 代码实现

{% fold info @AcCode %}

```cpp
// P6833 雷雨
// Key Logic: Simplified Steiner Tree (Three-point shortest path junction)

#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
typedef pair< ll, int > pli;

const int maxn = 1005;
const ll inf = 1e18;

int n, m, a, b, c;
int mat[ maxn ][ maxn ];
ll d[ 3 ][ maxn * maxn ];
int dx[ ] = { 0, 0, 1, -1 };
int dy[ ] = { 1, -1, 0, 0 };

int get_id( int r, int c )
{
    return ( r - 1 ) * m + ( c - 1 );
}

void dijkstra( int k, int sr, int sc )
{
    int start_node = get_id( sr, sc );
    for( int i = 0; i < n * m; ++ i ) d[ k ][ i ] = inf;
    d[ k ][ start_node ] = mat[ sr ][ sc ];

    priority_queue< pli, vector< pli >, greater< pli > > pq;
    pq.push( { d[ k ][ start_node ], start_node } );

    while( ! pq.empty( ) )
    {
        auto [ cur_d, u ] = pq.top( );
        pq.pop( );

        if( cur_d > d[ k ][ u ] ) continue;

        int r = u / m + 1;
        int c = u % m + 1;

        for( int i = 0; i < 4; ++ i )
        {
            int nr = r + dx[ i ];
            int nc = c + dy[ i ];
            if( nr < 1 || nr > n || nc < 1 || nc > m ) continue;

            int v = get_id( nr, nc );
            if( d[ k ][ u ] + mat[ nr ][ nc ] < d[ k ][ v ] )
            {
                d[ k ][ v ] = d[ k ][ u ] + mat[ nr ][ nc ];
                pq.push( { d[ k ][ v ], v } );
            }
        }
    }
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> m >> a >> b >> c;
    for( int i = 1; i <= n; ++ i )
    {
        for( int j = 1; j <= m; ++ j )
        {
            cin >> mat[ i ][ j ];
        }
    }

    dijkstra( 0, n, a );
    dijkstra( 1, 1, b );
    dijkstra( 2, 1, c );

    ll ans = inf;
    for( int i = 1; i <= n; ++ i )
    {
        for( int j = 1; j <= m; ++ j )
        {
            int u = get_id( i, j );
            if( d[ 0 ][ u ] == inf || d[ 1 ][ u ] == inf || d[ 2 ][ u ] == inf ) continue;
            ans = min( ans, d[ 0 ][ u ] + d[ 1 ][ u ] + d[ 2 ][ u ] - 2LL * mat[ i ][ j ] );
        }
    }

    cout << ans << "\n";

    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **时间复杂度**: $O(NM \log(NM))$。
    
- **核心思路**: 将连通子图问题转化为枚举汇合点的问题。注意网格图点权转边权时，起点权值必须包含在最短路内。