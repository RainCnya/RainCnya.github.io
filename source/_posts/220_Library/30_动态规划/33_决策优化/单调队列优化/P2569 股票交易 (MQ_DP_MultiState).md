---
title: 'P2569 [SCOI2010] 股票交易 (MQ_DP_MultiState)'
tags:
  - DP/优化
  - 算法/单调队列
difficulty: 提高+/省选-
date: 2025-11-8
categories:
  - 220_Library
  - 30_动态规划
  - 33_决策优化
abbrlink: b8c79668
---
# [Luogu-P2569](https://www.luogu.com.cn/problem/P2569) 股票交易

## ## 1. 核心逻辑

- **问题本质**: 含有买入/卖出数量限制及 $W$ 天冷却期的财富最大化问题。
    
- **破局转换**:
    
    1. **状态定义**: $f[ i ][ j ]$ 为第 $i$ 天持有 $j$ 股时的最大收益。
        
    2. **四种决策**:
        
        - **凭空买入**: $f[ i ][ j ] = -AP_i \cdot j$ (对于 $j \in [0, AS_i]$)。
            
        - **不交易**: $f[ i ][ j ] = f[ i-1 ][ j ]$。
            
        - **买入 (Buy)**: 由 $f[ i-W-1 ][ k ]$ 转移 ($k < j$)，限制买入量 $j-k \le AS_i$。
            
        - **卖出 (Sell)**: 由 $f[ i-W-1 ][ k ]$ 转移 ($k > j$)，限制卖出量 $k-j \le BS_i$。
            
    3. **方程提取**: $f[ i ][ j ] = \max \{ f[ \text{prev} ][ k ] + k \cdot P \} - j \cdot P$。
        
    4. **优化**: 括号内仅与 $k$ 有关，通过单调队列维护 $k$ 范围内的最优 $f + kP$。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
const int maxp = 2005;
ll f[ maxp ][ maxp ];
int T, max_stock, w;

int main( ) 
{
    cin >> T >> max_stock >> w;

    memset( f, 128, sizeof( f ) );
    for( int i = 0; i <= T; ++ i ) f[ i ][ 0 ] = 0;

    for( int i = 1; i <= T; ++ i ) 
    {
        int ap, bp, as, bs;
        cin >> ap >> bp >> as >> bs;

        // 1. 凭空买
        for( int j = 0; j <= as; ++ j ) f[ i ][ j ] = -1LL * ap * j;

        // 2. 继承前一日
        for( int j = 0; j <= max_stock; ++ j ) f[ i ][ j ] = max( f[ i ][ j ], f[ i - 1 ][ j ] );

        int prev = i - w - 1;
        if( prev < 0 ) continue;

        // 3. 单调队列优化买入 (k < j)
        deque< int > q1;
        for( int j = 0; j <= max_stock; ++ j ) 
        {
            while( ! q1.empty( ) && q1.front( ) < j - as ) q1.pop_front( );
            while( ! q1.empty( ) && f[ prev ][ q1.back( ) ] + 1LL * q1.back( ) * ap <= f[ prev ][ j ] + 1LL * j * ap ) q1.pop_back( );
            q1.push_back( j );
            f[ i ][ j ] = max( f[ i ][ j ], f[ prev ][ q1.front( ) ] - 1LL * ( j - q1.front( ) ) * ap );
        }

        // 4. 单调队列优化卖出 (k > j)
        deque< int > q2;
        for( int j = max_stock; j >= 0; -- j ) 
        {
            while( ! q2.empty( ) && q2.front( ) > j + bs ) q2.pop_front( );
            while( ! q2.empty( ) && f[ prev ][ q2.back( ) ] + 1LL * q2.back( ) * bp <= f[ prev ][ j ] + 1LL * j * bp ) q2.pop_back( );
            q2.push_back( j );
            f[ i ][ j ] = max( f[ i ][ j ], f[ prev ][ q2.front( ) ] + 1LL * ( q2.front( ) - j ) * bp );
        }
    }

    ll ans = 0;
    for( int j = 0; j <= max_stock; ++ j ) ans = max( ans, f[ T ][ j ] );
    cout << ans << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(T \cdot \text{MaxStock})$。
    
- **关键点**: 买入时 $j$ 正向循环，卖出时 $j$ 逆向循环，以确保滑窗覆盖的是正确的前驱集合。