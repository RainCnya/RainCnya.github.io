---
title: P1144 最短路计数 (Shortest_Path_Counting)
tags:
  - 图论/最短路
  - 数学/计数
difficulty: 普及/提高-
categories:
  - 11_Library
  - 02_图论
  - 01_最短路及其应用
abbrlink: 8b78c35a
date: 2025-12-01 00:00:00
---
# [Luogu-P1144](https://www.luogu.com.cn/problem/P1144) 最短路计数

## 1. 核心逻辑

- **问题本质**: 求解无权图（边权均为 1）中起点到各点的最短路径方案数。
    
- **破局转换**:
    
    1. **最短路性质**：最短路构成的结构满足拓扑序。在搜索过程中，如果发现更短路径，则方案数被重置；如果发现等长路径，则方案数累加。
        
    2. **转移方程**：
        
        - 若 $dist[u] + 1 < dist[v]$：则 $dist[v] = dist[u] + 1$，$count[v] = count[u]$。
            
        - 若 $dist[u] + 1 = dist[v]$：则 $count[v] = (count[v] + count[u]) \pmod{mod}$。
            
    3. **实现选择**：由于边权为 1，使用 BFS 即可保证最短性。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
// P1144 最短路计数
// Key Logic: Shortest Path DAG Counting using BFS

#include <bits/stdc++.h>
using namespace std;

const int maxn = 1e6 + 5;
const int mod = 100003;

vector< int > adj[ maxn ];
int d[ maxn ], cnt[ maxn ];
bool vis[ maxn ];
int n, m;

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> m;
    for( int i = 1; i <= m; ++ i )
    {
        int u, v;
        cin >> u >> v;
        adj[ u ].push_back( v );
        adj[ v ].push_back( u );
    }

    memset( d, 0x3f, sizeof d );
    d[ 1 ] = 0;
    cnt[ 1 ] = 1;
    queue< int > q;
    q.push( 1 );
    vis[ 1 ] = 1;

    while( ! q.empty( ) )
    {
        int u = q.front( );
        q.pop( );

        for( int v : adj[ u ] )
        {
            if( d[ u ] + 1 < d[ v ] )
            {
                d[ v ] = d[ u ] + 1;
                cnt[ v ] = cnt[ u ];
                if( ! vis[ v ] )
                {
                    q.push( v );
                    vis[ v ] = 1;
                }
            }
            else if( d[ u ] + 1 == d[ v ] )
            {
                cnt[ v ] = ( cnt[ v ] + cnt[ u ] ) % mod;
            }
        }
    }

    for( int i = 1; i <= n; ++ i ) cout << cnt[ i ] << "\n";

    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N + M)$。
    
- **关键点**: 仅在无负权边（且本题边权恒为 1）时满足拓扑性。