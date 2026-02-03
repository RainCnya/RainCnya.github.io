---
title: P1119 灾后重建 (Floyd_Dynamic_Time)
tags:
  - 图论/最短路
difficulty:
  - 普及+/提高
categories:
  - 221_Library
  - 02_图论
  - 00_建模与综述
abbrlink: e2f4f077
date: 2025-12-01 00:00:00
---
# [Luogu-P1119](https://www.luogu.com.cn/problem/P1119) 灾后重建

## 1. 核心逻辑

- **问题本质**: 动态解锁节点的中转权限，实时查询最短路。
    
- **破局转换**:
    
    1. **Floyd 的物理意义**：`dist[i][j]` 在外层循环执行到 `k` 时，表示“仅允许经过前 $k$ 个点作为中转”的最短路。
        
    2. **时间单调性**：题目给出的节点修复时间 $t_k$ 与查询时间 $T$ 均单调不减。
        
    3. **状态同步**：无需每次重跑算法。当查询时间 $T$ 到达时，将所有修复时间 $t_k \le T$ 的节点作为中转点，对现有的 `dist` 矩阵进行一次松弛更新即可。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
// P1119 灾后重建
// Key Logic: Incremental Floyd based on node repair time

#include <bits/stdc++.h>
using namespace std;

const int maxn = 205;
const int inf = 0x3f3f3f3f;

int n, m, q;
int t[ maxn ];
int d[ maxn ][ maxn ];

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> m;
    for( int i = 0; i < n; ++ i ) cin >> t[ i ];

    // 初始化矩阵
    for( int i = 0; i < n; ++ i )
    {
        for( int j = 0; j < n; ++ j )
        {
            if( i == j ) d[ i ][ j ] = 0;
            else d[ i ][ j ] = inf;
        }
    }

    for( int i = 0; i < m; ++ i )
    {
        int u, v, w;
        cin >> u >> v >> w;
        d[ u ][ v ] = d[ v ][ u ] = w;
    }

    cin >> q;
    int k = 0; // 当前作为中转点的索引

    while( q -- )
    {
        int x, y, T;
        cin >> x >> y >> T;

        // 核心：利用 Floyd 的阶段性，动态加入可用的中转点
        while( k < n && t[ k ] <= T )
        {
            for( int i = 0; i < n; ++ i )
            {
                for( int j = 0; j < n; ++ j )
                {
                    if( d[ i ][ k ] + d[ k ][ j ] < d[ i ][ j ] )
                    {
                        d[ i ][ j ] = d[ i ][ k ] + d[ k ][ j ];
                    }
                }
            }
            ++ k;
        }

        if( t[ x ] > T || t[ y ] > T || d[ x ][ y ] == inf )
        {
            cout << -1 << "\n";
        }
        else
        {
            cout << d[ x ][ y ] << "\n";
        }
    }

    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N^3 + Q)$。每个节点只会被当作中转点 $k$ 遍历一次。
    
- **关键点**: 理解 Floyd 的三层循环中，最外层循环的“阶段”含义。