---
title: 'P1004 [NOIP2000] 方格取数 (Grid_Concurrent_Pickup)'
tags:
  - DP/线性
  - 算法/多路并发
difficulty: 普及+/提高
categories:
  - 10_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: '93509590'
date: 2025-11-19 00:00:00
---
# [Luogu-P1004](https://www.luogu.com.cn/problem/P1004) 方格取数

## 1. 核心逻辑

- **问题本质**: 求走两次方格，路径可重叠但数只能取一次时的最大权值总和。
    
- **破局转换**:
    
    1. **多路并发**: 将“先后走两次”映射为“两人同时从 $(1,1)$ 出发”。
        
    2. **步数降维**: 设两人走的步数为 $k$。由于每次只能向右或向下，第一人的位置 $(r_1, c_1)$ 满足 $r_1 + c_1 = k+2$。因此只需记录两人的行号 $r_1, r_2$，列号可由 $k$ 算出。
        
    3. **状态定义**: $f[k][r_1][r_2]$ 表示两人走了 $k$ 步，分别位于第 $r_1$ 行和 $r_2$ 行时的最大收益。
        
    4. **去重不变量**: 若 $r_1 == r_2$，则两人当前处于同一格子。此时收益只累加一次；否则累加 $a[r_1][c_1] + a[r_2][c_2]$。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

int a[ 15 ][ 15 ], f[ 30 ][ 15 ][ 15 ], n;

int main( ) 
{
    cin >> n;
    int r, c, v;
    while( cin >> r >> c >> v && ( r || c || v ) ) a[ r ][ c ] = v;

    // k 表示步数 (从起点 0 步开始)
    for( int k = 0; k <= 2 * n - 2; ++ k ) 
    {
        for( int r1 = 1; r1 <= n; ++ r1 ) 
        {
            for( int r2 = 1; r2 <= n; ++ r2 ) 
            {
                int c1 = k + 2 - r1, c2 = k + 2 - r2;
                if( c1 < 1 || c1 > n || c2 < 1 || c2 > n ) continue;

                int current_val = ( r1 == r2 ) ? a[ r1 ][ c1 ] : a[ r1 ][ c1 ] + a[ r2 ][ c2 ];
                
                // 四种转移来源：(右, 右), (右, 下), (下, 右), (下, 下)
                int &res = f[ k + 1 ][ r1 ][ r2 ];
                res = max( { f[ k ][ r1 ][ r2 ], f[ k ][ r1 - 1 ][ r2 ], f[ k ][ r1 ][ r2 - 1 ], f[ k ][ r1 - 1 ][ r2 - 1 ] } );
                res += current_val;
            }
        }
    }

    cout << f[ 2 * n - 2 ][ n ][ n ] << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N^3)$ 时间（步数 $2N \times$ 行号 $N \times$ 行号 $N$）。
    
- **关键点**: 步数 $k$ 作为阶段，确保了两人的决策步调一致，从而简化了重合判定。