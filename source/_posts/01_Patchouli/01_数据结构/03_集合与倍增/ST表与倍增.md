---
title: ST表与倍增 (Sparse Table & Binary Lifting)
tags:
  - 数据结构/倍增
  - 数据结构/RMQ
categories:
  - 01_Patchouli
  - 01_数据结构
  - 03_集合与倍增
abbrlink: e6c1b327
date: 2025-12-12 00:21:02
---
# ST表与倍增 (Sparse Table & Binary Lifting)
## 1. 生态位

- **定义**: 利用二进制拆分思想，通过预处理 $2^k$ 长度的信息，实现对静态区间最值（RMQ）或树上路径（LCA）的极速响应。
    
- **解决痛点**:
    
    - 解决了静态区间查询下，线段树 $O(\log N)$ 响应仍嫌慢的问题。
        
    - 提供了 $O(1)$ 的 RMQ 响应和 $O(\log N)$ 的路径跳转。
        
- **本质**: **幂次拼合** —— 任何长度都能拆分为若干个 $2^k$。
    

## 2. 核心思路

### 2.1 状态定义

设 $f[i][j]$ 为以 $i$ 为起点，长度为 $2^j$ 的区间内的最值。

- **转移**: $f[i][j] = \max(f[i][j-1], f[i + 2^{j-1}][j-1])$。
    
- **范围**: $j$ 的上限约为 $\log_2 N$。
    

### 2.2 区间重叠性质 (Idempotence)

RMQ 问题（如 Max, Min, GCD）满足：$\max(A, A) = A$。

- $O(1)$ **查询**: 对于区间 $[L, R]$，取 $k = \lfloor \log_2(R - L + 1) \rfloor$。
    
- **覆盖**: 用两个长度为 $2^k$ 的区间（一个从 $L$ 开始，一个在 $R$ 结束）即可完全覆盖 $[L, R]$ 且不遗漏。
    

### 2.3 树上倍增

将数组的下标跳转扩展至树的深度跳转（$2^k$ 级祖先）。
## 3. 实战部署

{% fold info @Code: ST Table for RMQ (O(1)) %}

```cpp
// 核心思路：预处理 f[i][j] 实现静态区间最值查询
const int maxn = 1e5 + 50;
const int maxlog = 20;

int f[ maxn ][ maxlog ], lg[ maxn ];

void build( int n, int a[] ) 
{
    // 1. 预处理 log 数组 (递推优化)
    lg[ 1 ] = 0;
    for( int i = 2; i <= n; ++ i ) lg[ i ] = lg[ i / 2 ] + 1;

    // 2. 初始状态
    for( int i = 1; i <= n; ++ i ) f[ i ][ 0 ] = a[ i ];

    // 3. 倍增递推
    for( int j = 1; j < maxlog; ++ j ) 
    {
        for( int i = 1; i + ( 1 << j ) - 1 <= n; ++ i ) 
        {
            f[ i ][ j ] = max( f[ i ][ j - 1 ], f[ i + ( 1 << ( j - 1 ) ) ][ j - 1 ] );
        }
    }
}

int query( int L, int R ) 
{
    int k = lg[ R - L + 1 ];
    return max( f[ L ][ k ], f[ R - ( 1 << k ) + 1 ][ k ] );
}
```

{% endfold %}

## 4. 知识粘附

- **局限性**: 仅适用于静态数组。若涉及修改，请移步 [线段树体系](线段树体系.md)。
    
- **母题索引**:
    
    - [P1886 滑动窗口](P1886%20滑动窗口.md) (RMQ 的另一种解法)