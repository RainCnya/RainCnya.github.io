---
title: '[Leaf] [P2882] Face The Right Way G'
tags:
  - 策略/贪心
  - 逆运算/差分
  - 难度/P1/提高-
categories:
  - 10_Library
  - 00_基础算法
  - 04_贪心与构造
abbrlink: 9b24815e
date: 2025-10-31
---
# [Luogu-P2882](https://www.luogu.com.cn/problem/P2882) Face The Right Way
## 1. 核心逻辑

- **问题本质**: 枚举翻转步长 $K$，求最少操作数使所有牛面向前方。
    
- **破局转换**:
    
    1. **强制性贪心**: 从左至右扫描，若当前牛面向后方，必须且只能以它为左端点进行长为 $K$ 的翻转。因为之前的牛已经调整好，这是唯一的纠错机会。
        
    2. **维度压缩 (Check)**: 频繁的区间翻转利用差分思想进行 $O(1)$ 打标。当前状态由原状态与翻转次数的前缀和决定。
        
    3. **枚举策略**: 题目规模允许 $O(N^2)$，故外层枚举 $K$ 即可。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
// P2882 [USACO07MAR] Face The Right Way G
// Key Logic: Greedy endpoint decision + Difference array state maintenance

#include <bits/stdc++.h>
using namespace std;

const int maxn = 5005;
int n, a[ maxn ], dif[ maxn ];

int solve( int k )
{
    memset( dif, 0, sizeof( dif ) );
    int res = 0, cur = 0;
    for( int i = 1; i <= n; ++ i )
    {
        cur += dif[ i ];
        // 如果 (原始状态 + 翻转次数) 为偶数，说明当前为 B (0)，需翻转
        if( ( a[ i ] + cur ) % 2 == 0 )
        {
            if( i + k - 1 > n ) return 1e9;
            ++ res;
            ++ cur;
            -- dif[ i + k ];
        }
    }
    return res;
}

int main( )
{
    scanf( "%d", &n );
    for( int i = 1; i <= n; ++ i )
    {
        char c; scanf( " %c", &c );
        a[ i ] = ( c == 'F' ? 1 : 0 );
    }

    int ansk = 1, minm = n;
    for( int k = 1; k <= n; ++ k )
    {
        int m = solve( k );
        if( m < minm )
        {
            minm = m; ansk = k;
        }
    }
    printf( "%d %d\n", ansk, minm );
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: Time $O(N^2)$, Space $O(N)$。
    
- **逻辑指纹**: 差分扫描线维护当前受到的“覆盖状态”，是处理频繁、固定长度区间加减/翻转的通用降维工具。

- **相关知识点**：[[贪心体系]]