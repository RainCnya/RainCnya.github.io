---
title: 'P5664 [CSP-S 2019] Emiya 家今天的饭 (Inclusion_Exclusion_Grid)'
tags:
  - DP/计数
  - 数学/容斥原理
difficulty: 提高+/省选-
categories:
  - 11_Library
  - 03_动态规划
  - 06_计数与期望
abbrlink: 1fc9d42
date: 2025-11-24 00:00:00
---
# [Luogu-P5664](https://www.luogu.com.cn/problem/P5664) Emiya 家今天的饭

## 1. 核心逻辑

- **问题本质**: 矩阵选数，每行最多选一个。限制：总数非空且任意一列选数不超过总数的一半。
    
- **破局转换**:
    
    1. **正难则反**: 合法方案 = 总方案 - 非法方案（某列超过一半）。
        
    2. **局部化约束**: 由于每行只能选一个，不可能有两列同时超过一半。因此只需枚举“非法列” $c$。
        
    3. **差值 DP**: 定义 $f[ i ][ j ]$ 为前 $i$ 行中，非法列 $c$ 选数次数与“其他列选数总次数”之差为 $j$ 的方案数。
        
        - 选列 $c$: $j \leftarrow j+1$。
            
        - 选其他列: $j \leftarrow j-1$。
            
        - 不选: $j$ 不变。
            
    4. **偏移处理**: 状态 $j$ 加偏移量 $N$ 以防止负下标。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
const int mod = 998244353;
ll a[ 105 ][ 2005 ], s[ 105 ], f[ 105 ][ 210 ];
int n, m;

int main( ) 
{
    cin >> n >> m;
    for( int i = 1; i <= n; ++ i ) 
    {
        for( int j = 1; j <= m; ++ j ) 
        {
            cin >> a[ i ][ j ];
            s[ i ] = ( s[ i ] + a[ i ][ j ] ) % mod;
        }
    }

    // 1. 总方案 (每行选一个或不选，最后减去全不选)
    ll total = 1;
    for( int i = 1; i <= n; ++ i ) total = total * ( s[ i ] + 1 ) % mod;
    total = ( total - 1 + mod ) % mod;

    // 2. 减去非法方案 (枚举非法列 c)
    ll illegal = 0;
    for( int c = 1; c <= m; ++ c ) 
    {
        memset( f, 0, sizeof( f ) );
        f[ 0 ][ n ] = 1; // 偏移量 n
        for( int i = 1; i <= n; ++ i ) 
        {
            ll others = ( s[ i ] - a[ i ][ c ] + mod ) % mod;
            for( int j = n - i; j <= n + i; ++ j ) 
            {
                f[ i ][ j ] = ( f[ i - 1 ][ j ] + // 不选
                                f[ i - 1 ][ j - 1 ] * a[ i ][ c ] + // 选 c
                                f[ i - 1 ][ j + 1 ] * others ) % mod; // 选其他
            }
        }
        for( int j = n + 1; j <= 2 * n; ++ j ) illegal = ( illegal + f[ n ][ j ] ) % mod;
    }

    cout << ( total - illegal + mod ) % mod << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(M \cdot N^2)$。
    
- **关键点**: 理解为什么“最多一列非法”。这使得全局容斥简化为简单的单列枚举。