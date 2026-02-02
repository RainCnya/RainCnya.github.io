---
title: 'P3205 [HNOI2010] 合唱队 (Interval_Queue_Insert)'
tags:
  - DP/区间
  - 算法/逆向思维
difficulty: 普及+/提高
categories:
  - 10_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: 73486b1b
date: 2025-11-24 00:00:00
---
# [Luogu-P3205](https://www.luogu.com.cn/problem/P3205) 合唱队

## 1. 核心逻辑

- **问题本质**: 给定排好的队列，求有多少种入队顺序（每次从左或从右进入）能生成此队列，需满足入队时比前一人高或矮。
    
- **破局转换**:
    
    1. **逆向视角**: 考察区间 $[l, r]$ 是如何形成的。最后入队的一定是 $l$ 或 $r$。
        
    2. **状态定义**: $f[l][r][0/1]$ 表示形成区间 $[l, r]$ 且最后一人是左侧 $l$ 或右侧 $r$ 的方案数。
        
    3. **转移条件**:
        
        - $f[l][r][0]$ 可由 $f[l+1][r][0]$ (前一人是 $l+1$) 或 $f[l+1][r][1]$ (前一人是 $r$) 转移而来，前提是 $a[l]$ 与前一人满足身高约束。
            

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int mod = 19650827;
int a[ 1005 ], f[ 1005 ][ 1005 ][ 2 ], n;

int main( ) 
{
    cin >> n;
    for( int i = 1; i <= n; ++ i ) cin >> a[ i ];

    for( int i = 1; i <= n; ++ i ) f[ i ][ i ][ 0 ] = 1;

    for( int len = 2; len <= n; ++ len ) 
    {
        for( int l = 1; l + len - 1 <= n; ++ l ) 
        {
            int r = l + len - 1;
            // 最后一人是左侧 l
            if( a[ l ] < a[ l + 1 ] ) f[ l ][ r ][ 0 ] = ( f[ l ][ r ][ 0 ] + f[ l + 1 ][ r ][ 0 ] ) % mod;
            if( a[ l ] < a[ r ] && len > 1 ) f[ l ][ r ][ 0 ] = ( f[ l ][ r ][ 0 ] + f[ l + 1 ][ r ][ 1 ] ) % mod;
            
            // 最后一人是右侧 r
            if( a[ r ] > a[ r - 1 ] ) f[ l ][ r ][ 1 ] = ( f[ l ][ r ][ 1 ] + f[ l ][ r - 1 ][ 1 ] ) % mod;
            if( a[ r ] > a[ l ] && len > 1 ) f[ l ][ r ][ 1 ] = ( f[ l ][ r ][ 1 ] + f[ l ][ r - 1 ][ 0 ] ) % mod;
        }
    }
    cout << ( f[ 1 ][ n ][ 0 ] + f[ 1 ][ n ][ 1 ] ) % mod << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(n^2)$。
    
- **关键点**: 入队顺序的“最后一人”决定了区间端点。状态定义需包含端点属性以检查身高单调性。