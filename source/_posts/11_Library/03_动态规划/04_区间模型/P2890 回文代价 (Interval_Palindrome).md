---
title: P2890 Cheapest Palindrome (Interval_Palindrome)
tags:
  - DP/区间
  - 算法/对称性
difficulty: 普及+/提高
categories:
  - 11_Library
  - 03_动态规划
  - 04_区间模型
abbrlink: e4f80a95
date: 2025-11-24 00:00:00
---
# [Luogu-P2890](https://www.luogu.com.cn/problem/P2890) Cheapest Palindrome

## 1. 核心逻辑

- **问题本质**: 通过最小代价的增删操作将字符串转化为回文。
    
- **破局转换**:
    
    1. **代价等价性**: 在回文构造中，“删除左侧 $s[l]$” 等价于 “在右侧添加 $s[l]$”，目标都是使两端对称。因此每个字符的综合代价 $Cost(c) = \min(Add(c), Del(c))$。
        
    2. **状态定义**: $f[l][r]$ 表示使子串 $[l, r]$ 回文的最小成本。
        
    3. **转移**:
        
        - 若 $s[l] == s[r]$: $f[l][r] = f[l+1][r-1]$。
            
        - 若不相等: $\min(f[l+1][r] + Cost(s[l]), f[l][r-1] + Cost(s[r]))$。
            

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

int n, m, cost[ 30 ], f[ 2005 ][ 2005 ];
char s[ 2005 ];

int main( ) 
{
    cin >> m >> n >> ( s + 1 );
    for( int i = 1; i <= m; ++ i ) 
    {
        char c; int a, b;
        cin >> c >> a >> b;
        cost[ c - 'a' ] = min( a, b );
    }

    // 区间长度从 2 开始
    for( int len = 2; len <= n; ++ len ) 
    {
        for( int l = 1; l + len - 1 <= n; ++ l ) 
        {
            int r = l + len - 1;
            f[ l ][ r ] = min( f[ l + 1 ][ r ] + cost[ s[ l ] - 'a' ], f[ l ][ r - 1 ] + cost[ s[ r ] - 'a' ] );
            if( s[ l ] == s[ r ] ) f[ l ][ r ] = min( f[ l ][ r ], ( len == 2 ? 0 : f[ l + 1 ][ r - 1 ] ) );
        }
    }
    cout << f[ 1 ][ n ] << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(n^2)$。
    
- **关键点**: 理解增删操作在回文修正中的逻辑对称性，合并为单一最小代价。