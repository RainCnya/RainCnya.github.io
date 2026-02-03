---
title: P6175 无向图的最小环 (Floyd_Min_Cycle)
tags:
  - 图论/最短路
  - 图论/最小环
difficulty: 普及+/提高
categories:
  - 221_Library
  - 02_图论
  - 01_最短路及其应用
abbrlink: 417ca395
date: 2025-12-01 00:00:00
---
# [Luogu-P6175](https://www.luogu.com.cn/problem/P6175) 无向图的最小环

## 1. 核心逻辑

- **问题本质**: 在无向加权图中寻找一个权值和最小的简单环。
    
- **核心切入点**:
    
    1. **Floyd 阶段性**: Floyd 算法在外层循环到 $k$ 时，`d[i][j]` 存储的是仅通过节点 $1 \dots k-1$ 的最短路。
        
    2. **环的构造**: 一个经过 $k$ 且由 $1 \dots k$ 点组成的最小环，可以由 $i \leftrightarrow j$ 的最短路（仅通过 $1 \dots k-1$）加上两条边 $(i, k)$ 和 $(k, j)$ 构成。
        
    3. **更新逻辑**:
        
        - 在使用 $k$ 更新 `d[i][j]` 之前，先枚举 $i, j < k$，计算 `d[i][j] + w[i][k] + w[k][j]`。
            
        - 这样保证了 $i, j, k$ 三点互不相同，且路径不包含 $k$。
            
    4. **约束**: 适用于点数较小（$N \le 100$）的场景。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
// P6175 无向图的最小环
// Key Logic: Using Floyd's DP stages to construct cycles

#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
const ll inf = 0x3f3f3f3f;

int n, m;
ll d[ 105 ][ 105 ];
ll w[ 105 ][ 105 ];

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> m;
    for( int i = 1; i <= n; ++ i )
    {
        for( int j = 1; j <= n; ++ j )
        {
            if( i == j ) d[ i ][ j ] = 0;
            else d[ i ][ j ] = inf;
            w[ i ][ j ] = inf;
        }
    }

    for( int i = 1; i <= m; ++ i )
    {
        int u, v;
        ll weight;
        cin >> u >> v >> weight;
        d[ u ][ v ] = d[ v ][ u ] = min( d[ u ][ v ], weight );
        w[ u ][ v ] = w[ v ][ u ] = min( w[ u ][ v ], weight );
    }

    ll ans = inf;
    for( int k = 1; k <= n; ++ k )
    {
        // 先计算经过 k 的最小环
        for( int i = 1; i < k; ++ i )
        {
            for( int j = i + 1; j < k; ++ j )
            {
                ans = min( ans, d[ i ][ j ] + w[ i ][ k ] + w[ k ][ j ] );
            }
        }

        // 再更新最短路
        for( int i = 1; i <= n; ++ i )
        {
            for( int j = 1; j <= n; ++ j )
            {
                if( d[ i ][ k ] + d[ k ][ j ] < d[ i ][ j ] )
                {
                    d[ i ][ j ] = d[ i ][ k ] + d[ k ][ j ];
                }
            }
        }
    }

    if( ans >= inf ) cout << "No solution.\n";
    else cout << ans << "\n";

    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **时间复杂度**: $O(N^3)$。
    
- **核心思路**: 利用 Floyd 的外层循环作为“当前考虑的最大节点编号”，在此限制下寻找包含该节点的环。