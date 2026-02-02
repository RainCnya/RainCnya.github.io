---
title: 'P1880 [NOI1995] 石子合并 (Interval_Ring_Basic)'
tags:
  - DP/区间
  - 算法/环形处理
difficulty: 普及+/提高
categories:
  - 10_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: dd76d016
date: 2025-11-24 00:00:00
---
# [Luogu-P1880](https://www.luogu.com.cn/problem/P1880) 石子合并

## 1. 核心逻辑

- **问题本质**: 环形序列上相邻两堆合并，合并代价为两堆重量之和。求合并为一堆的最大与最小总代价。
    
- **破局转换**:
    
    1. **破环成链**: 环形结构的通用策略是“倍增路径”。将长度为 $N$ 的序列复制一份接在末尾，形成长度为 $2N$ 的链。
        
    2. **投影映射**: 环上任意一个合并方案，都唯一对应新链上一个长度为 $N$ 的子区间 $[i, i+N-1]$。
        
    3. **转移**: 标准区间合并模型。
        
        $$f[i][j] = \max/\min_{k=i}^{j-1} \{ f[i][k] + f[k+1][j] \} + \text{PrefixSum}(i, j)$$

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxn = 205, inf = 0x3f3f3f3f;
int a[ maxn ], s[ maxn ], f1[ maxn ][ maxn ], f2[ maxn ][ maxn ], n;

int main( ) 
{
    cin >> n;
    for( int i = 1; i <= n; ++ i ) 
    {
        cin >> a[ i ];
        a[ i + n ] = a[ i ];
    }
    for( int i = 1; i <= 2 * n; ++ i ) s[ i ] = s[ i - 1 ] + a[ i ];

    memset( f1, 0x3f, sizeof( f1 ) );
    memset( f2, -0x3f, sizeof( f2 ) );
    for( int i = 1; i <= 2 * n; ++ i ) f1[ i ][ i ] = f2[ i ][ i ] = 0;

    for( int len = 2; len <= n; ++ len ) 
    {
        for( int l = 1; l + len - 1 <= 2 * n; ++ l ) 
        {
            int r = l + len - 1;
            for( int k = l; k < r; ++ k ) 
            {
                f1[ l ][ r ] = min( f1[ l ][ r ], f1[ l ][ k ] + f1[ k + 1 ][ r ] + s[ r ] - s[ l - 1 ] );
                f2[ l ][ r ] = max( f2[ l ][ r ], f2[ l ][ k ] + f2[ k + 1 ][ r ] + s[ r ] - s[ l - 1 ] );
            }
        }
    }

    int min_ans = inf, max_ans = 0;
    for( int i = 1; i <= n; ++ i ) 
    {
        min_ans = min( min_ans, f1[ i ][ i + n - 1 ] );
        max_ans = max( max_ans, f2[ i ][ i + n - 1 ] );
    }
    cout << min_ans << "\n" << max_ans << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N^3)$。
    
- **关键点**: 初始化时对角线（单点代价）为 0，且最小值数组 `f1` 需设为无穷大。