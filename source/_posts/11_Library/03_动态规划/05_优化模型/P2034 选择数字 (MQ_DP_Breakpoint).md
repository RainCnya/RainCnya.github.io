---
title: P2034 选择数字 (MQ_DP_Breakpoint)
tags:
  - DP/优化
  - 单调性/单调队列
difficulty: 普及+/提高
date: 2025-11-7
categories:
  - 11_Library
  - 03_动态规划
  - 05_优化模型
abbrlink: dcc774
---
# [Luogu-P2034](https://www.luogu.com.cn/problem/P2034) 选择数字

## 1. 核心逻辑

- **问题本质**: 在序列中选数最大化总和，限制：不能连续选择超过 $K$ 个数。
    
- **破局转换**:
    
    1. **正向定义**: 设 $f[ i ][ 0 ]$ 为第 $i$ 位**强制不选**时的最大收益，$f[ i ][ 1 ]$ 为选时的最大收益。
        
    2. **不变量**: 若第 $i$ 位选，则上一个“不选”的位置 $j$ 必须满足 $i - j \le K$（即连续段长度不超过 $K$）。
        
    3. **转移方程**:
        
        - $f[ i ][ 0 ] = \max( f[ i - 1 ][ 0 ], f[ i - 1 ][ 1 ] )$。
            
        - $f[ i ][ 1 ] = \text{sum}[ i ] + \max_{i-K \le j < i} \{ f[ j ][ 0 ] - \text{sum}[ j ] \}$。
            
    4. **优化**: 利用单调队列维护 $f[ j ][ 0 ] - \text{sum}[ j ]$ 的最大值。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
const int maxn = 1e5 + 50;
ll a[ maxn ], s[ maxn ], f[ maxn ][ 2 ];
int n, k;

int main( ) 
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> k;
    for( int i = 1; i <= n; ++ i ) 
    {
        cin >> a[ i ];
        s[ i ] = s[ i - 1 ] + a[ i ];
    }

    deque< int > q;
    q.push_back( 0 ); // 初始断点

    for( int i = 1; i <= n; ++ i ) 
    {
        // 1. 维护滑窗范围 [i-K, i-1]
        while( ! q.empty( ) && q.front( ) < i - k ) q.pop_front( );

        // 2. 转移
        f[ i ][ 0 ] = max( f[ i - 1 ][ 0 ], f[ i - 1 ][ 1 ] );
        f[ i ][ 1 ] = s[ i ] + ( f[ q.front( ) ][ 0 ] - s[ q.front( ) ] );

        // 3. 入队: 维护 f[j][0] - s[j] 的递减队列
        ll val = f[ i ][ 0 ] - s[ i ];
        while( ! q.empty( ) && ( f[ q.back( ) ][ 0 ] - s[ q.back( ) ] ) <= val ) q.pop_back( );
        q.push_back( i );
    }

    cout << max( f[ n ][ 0 ], f[ n ][ 1 ] ) << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N)$。
    
- **关键点**: 理解“断点 $j$”的物理含义。只要确定了上一个不选的位置，当前位置到该位置之间的所有数都是必选的。