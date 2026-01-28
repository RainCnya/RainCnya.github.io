---
title: 'P1758 [NOI2009] 管道取珠 (Grid_Walking_Conversion)'
tags:
  - DP/计数
difficulty: 提高+/省选-
categories:
  - 10_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: 7c9286d9
date: 2025-11-24 00:00:00
---

# [Luogu-P1758](https://www.luogu.com.cn/problem/P1758) 管道取珠

## 1. 核心逻辑

- **问题本质**: 给定两个管道 $A, B$（各含 $n, m$ 个珠子），求所有可能的取珠序列 $S$ 出现次数的平方和 $\sum (\text{occur}_i)^2$。
    
- **破局转换**:
    
    1. **组合意义重塑**: $\sum a_i^2$ 意味着：两个**完全独立**的玩家在相同的管道状态下进行游戏，他们最终产生**完全相同的输出序列**的总方案数。
        
    2. **模型坍缩**: 将问题转化为“两路网格行走决策”。
        
        - 设玩家 1 从管道 $A$ 取了 $i_1$ 个，管道 $B$ 取了 $j_1$ 个。
            
        - 设玩家 2 从管道 $A$ 取了 $i_2$ 个，管道 $B$ 取了 $j_2$ 个。
            
        - 步数 $k = i_1 + j_1 = i_2 + j_2$ 必须同步。
            
    3. **状态定义**: $f[k][i_1][i_2]$ 表示两人各取了 $k$ 个珠子，且玩家 1 在 $A$ 管取了 $i_1$ 个，玩家 2 在 $A$ 管取了 $i_2$ 个时，路径相同的方案数。
        
    4. **转移条件**: 仅当两人当前从各自管中取出的珠子**颜色相同**时，状态才可转移。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int mod = 1024523;
const int maxn = 505;
int f[ 2 ][ maxn ][ maxn ], n, m;
char a[ maxn ], b[ maxn ];

int main( ) 
{
    scanf( "%d %d", &n, &m );
    scanf( "%s", a + 1 );
    scanf( "%s", b + 1 );
    
    // 翻转字符串以符合从 1 开始取的直觉（或者直接用，逻辑一致）
    // 此处直接按顺序模拟行走。
    
    f[ 0 ][ 0 ][ 0 ] = 1;
    int cur = 0, nxt = 1;

    for( int k = 0; k < n + m; ++ k ) 
    {
        memset( f[ nxt ], 0, sizeof( f[ nxt ] ) );
        for( int i1 = 0; i1 <= n && i1 <= k; ++ i1 ) 
        {
            for( int i2 = 0; i2 <= n && i2 <= k; ++ i2 ) 
            {
                if( ! f[ cur ][ i1 ][ i2 ] ) continue;
                
                int j1 = k - i1, j2 = k - i2;
                if( j1 > m || j2 > m ) continue;

                int val = f[ cur ][ i1 ][ i2 ];
                
                // 四种转移决策：两人各自从 (A, A), (A, B), (B, A), (B, B) 取珠
                // 情况 1: 1 取 A, 2 取 A
                if( i1 < n && i2 < n && a[ i1 + 1 ] == a[ i2 + 1 ] )
                    f[ nxt ][ i1 + 1 ][ i2 + 1 ] = ( f[ nxt ][ i1 + 1 ][ i2 + 1 ] + val ) % mod;
                
                // 情况 2: 1 取 A, 2 取 B
                if( i1 < n && j2 < m && a[ i1 + 1 ] == b[ j2 + 1 ] )
                    f[ nxt ][ i1 + 1 ][ i2 ] = ( f[ nxt ][ i1 + 1 ][ i2 ] + val ) % mod;
                
                // 情况 3: 1 取 B, 2 取 A
                if( j1 < m && i2 < n && b[ j1 + 1 ] == a[ i2 + 1 ] )
                    f[ nxt ][ i1 ][ i2 + 1 ] = ( f[ nxt ][ i1 ][ i2 + 1 ] + val ) % mod;
                
                // 情况 4: 1 取 B, 2 取 B
                if( j1 < m && j2 < m && b[ j1 + 1 ] == b[ j2 + 1 ] )
                    f[ nxt ][ i1 ][ i2 ] = ( f[ nxt ][ i1 ][ i2 ] + val ) % mod;
            }
        }
        swap( cur, nxt );
    }

    printf( "%d\n", f[ cur ][ n ][ n ] );
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O( (N+M) \cdot N^2 )$ 时间，$O( N^2 )$ 空间。
    
- **关键点**: 理解平方和到“双路相同”的转换。这是将非线性计数转化为线性递推的经典策略。