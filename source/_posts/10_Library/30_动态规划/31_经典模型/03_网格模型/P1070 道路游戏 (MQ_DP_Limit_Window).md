---
title: 'P1070 [NOIP 2009] 道路游戏 (MQ_DP_Limit_Window)'
tags:
  - DP/优化
  - 单调性/单调队列
difficulty: 提高+/省选-
categories:
  - 10_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: da930cd8
date: 2025-11-23 00:00:00
---
# [Luogu-P1070](https://www.luogu.com.cn/problem/P1070) 道路游戏 (单调队列优化版)

## 1. 核心逻辑

- **问题本质**: 周期性网格上的斜向移动决策。机器人购买后可走 $1 \sim P$ 步。
    
- **破局转换**:
    
    1. **维度分解**: 路径 $(i, j) \to (i+1, j+1)$ 遵循规律 $(i - j) \pmod N = \text{const}$。
        
    2. **对角线分组**: 将所有格子按对角线编号 $id = (i - j) \pmod N$ 分组。
        
    3. **状态变形**: $f[ j ] = \text{sum\_斜}[ i ][ j ] + \max_{k \in [1, P]} \{ f[ j - k ] - \text{sum\_斜}[ i - k ][ j - k ] - \text{cost}[ i - k ] \}$。
        
    4. **优化**: 为每条对角线 $id$ 维护一个单调队列，存储最优的决策前缀。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
const int maxn = 1005;
const ll inf = 1e18;
int v[ maxn ][ maxn ], w[ maxn ], n, m, p;
ll f[ maxn ], s[ maxn ][ maxn ];
deque< pair< ll, int > > q[ maxn ]; // 每个对角线一个队列

int main( ) 
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> m >> p;
    for( int i = 1; i <= n; ++ i )
        for( int j = 1; j <= m; ++ j ) cin >> v[ i ][ j ];
    for( int i = 1; i <= n; ++ i ) cin >> w[ i ];

    // 斜向前缀和: s[i][j] 表示在 (i,j) 结束的斜向累计价值
    for( int j = 1; j <= m; ++ j ) 
    {
        for( int i = 1; i <= n; ++ i ) 
        {
            int last_i = ( i == 1 ? n : i - 1 );
            s[ i ][ j ] = s[ last_i ][ j - 1 ] + v[ last_i ][ j ];
        }
    }

    fill( f + 1, f + m + 1, -inf );
    f[ 0 ] = 0;

    for( int j = 1; j <= m; ++ j ) 
    {
        for( int i = 1; i <= n; ++ i ) 
        {
            int id = ( ( i - j ) % n + n ) % n;
            int last_i = ( i == 1 ? n : i - 1 );

            // 将上一时刻的最优解作为决策点入队
            ll val = f[ j - 1 ] - s[ last_i ][ j - 1 ] - w[ last_i ];
            while( ! q[ id ].empty( ) && q[ id ].back( ).first <= val ) q[ id ].pop_back( );
            q[ id ].push_back( { val, j - 1 } );

            // 维护窗口步数 P
            while( ! q[ id ].empty( ) && q[ id ].front( ).second < j - p ) q[ id ].pop_front( );

            f[ j ] = max( f[ j ], q[ id ].front( ).first + s[ i ][ j ] );
        }
    }

    cout << f[ m ] << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N \cdot M)$。
    
- **关键点**: 理解对角线 $id$ 的不变量。将斜向移动转化为同一条队列上的线性滑窗问题是降维打击的关键。