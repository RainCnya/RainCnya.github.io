---
title: 'P4170 [CQOI2007] 涂色 (Interval_Coloring)'
tags:
  - DP/区间
  - 策略/贪心
difficulty: 提高+/省选-
categories:
  - 11_Library
  - 03_动态规划
  - 04_区间模型
abbrlink: 5af5b988
date: 2025-11-24 00:00:00
---
# [Luogu-P4170](https://www.luogu.com.cn/problem/P4170) 涂色

## ## 1. 核心逻辑

- **问题本质**: 求刷出目标颜色序列的最少涂色次数。
    
- **破局转换**:
    
    1. **状态定义**: $f[l][r]$ 表示完成区间 $[l, r]$ 涂色的最小次数。
        
    2. **边界策略**:
        
        - 若 $s[l] == s[r]$，则在涂 $l$ 的那次动作中可以顺带将 $r$ 也涂成相同底色，无额外代价。$f[l][r] = \min(f[l+1][r], f[l][r-1])$。
            
        - 若 $s[l] \neq s[r]$，则两端必须独立处理。枚举分割点执行区间合并。
            
    3. **转移**: $f[l][r] = \min_{k=l}^{r-1}(f[l][k] + f[k+1][r])$。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

int f[ 55 ][ 55 ];
char s[ 55 ];

int main( ) 
{
    scanf( "%s", s + 1 );
    int n = strlen( s + 1 );

    memset( f, 0x3f, sizeof( f ) );
    for( int i = 1; i <= n; ++ i ) f[ i ][ i ] = 1;

    for( int len = 2; len <= n; ++ len ) 
    {
        for( int l = 1; l + len - 1 <= n; ++ l ) 
        {
            int r = l + len - 1;
            if( s[ l ] == s[ r ] ) 
            {
                f[ l ][ r ] = min( f[ l + 1 ][ r ], f[ l ][ r - 1 ] );
            }
            else 
            {
                for( int k = l; k < r; ++ k ) 
                {
                    f[ l ][ r ] = min( f[ l ][ r ], f[ l ][ k ] + f[ k + 1 ][ r ] );
                }
            }
        }
    }
    cout << f[ 1 ][ n ] << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(n^3)$。
    
- **关键点**: 理解 $s[l]==s[r]$ 时的“免费”覆盖。这是由区间涂色的物理叠加性决定的。