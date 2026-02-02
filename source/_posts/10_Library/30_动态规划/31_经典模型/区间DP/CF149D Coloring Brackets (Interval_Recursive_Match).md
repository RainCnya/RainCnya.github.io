---
title: CF149D Coloring Brackets (Interval_Recursive_Match)
tags:
  - DP/区间
  - 算法/递归
difficulty: 提高+/省选-
categories:
  - 10_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: a3e9be80
date: 2025-11-25 00:00:00
---
# [Luogu-CF149D](https://www.luogu.com.cn/problem/CF149D) Coloring Brackets

## 1. 核心逻辑

- **问题本质**: 为合法括号序列染色（红/蓝/无），满足配对括号中恰好有一个有色，且相邻不同色。
    
- **破局转换**:
    
    1. **结构特性**: 合法括号序列要么是嵌套 `(A)`，要么是拼接 `AB`。
        
    2. **状态定义**: $f[l][r][cl][cr]$ 表示区间 $[l, r]$ 左右端点颜色分别为 $cl, cr$ 时的方案数（$c \in \{0:\text{无}, 1:\text{红}, 2:\text{蓝}\}$）。
        
    3. **递归转移**:
        
        - 若 $l$ 与 $r$ 匹配：内层方案累加，需满足边界颜色约束。
            
        - 若 $l$ 与 $k < r$ 匹配：分裂为 $[l, k]$ 和 $[k+1, r]$，在接口处进行状态合并。
            

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
const int mod = 1e9 + 7;
int p[ 705 ], n;
ll f[ 705 ][ 705 ][ 3 ][ 3 ];
char s[ 705 ];

void dfs( int l, int r ) 
{
    if( l + 1 == r ) 
    {
        f[ l ][ r ][ 0 ][ 1 ] = f[ l ][ r ][ 0 ][ 2 ] = 1;
        f[ l ][ r ][ 1 ][ 0 ] = f[ l ][ r ][ 2 ][ 0 ] = 1;
        return;
    }
    if( p[ l ] == r ) 
    {
        dfs( l + 1, r - 1 );
        for( int cl = 0; cl < 3; ++ cl )
            for( int cr = 0; cr < 3; ++ cr )
                for( int nl = 0; nl < 3; ++ nl )
                    for( int nr = 0; nr < 3; ++ nr ) 
                    {
                        if( ( !cl && !cr ) || ( cl && cr ) ) continue; // 恰有一个有色
                        if( ( cl && cl == nl ) || ( cr && cr == nr ) ) continue; // 相邻不同色
                        f[ l ][ r ][ cl ][ cr ] = ( f[ l ][ r ][ cl ][ cr ] + f[ l + 1 ][ r - 1 ][ nl ][ nr ] ) % mod;
                    }
    }
    else 
    {
        int mid = p[ l ];
        dfs( l, mid ); dfs( mid + 1, r );
        for( int cl = 0; cl < 3; ++ cl )
            for( int cr = 0; cr < 3; ++ cr )
                for( int ml = 0; ml < 3; ++ ml )
                    for( int mr = 0; mr < 3; ++ mr ) 
                    {
                        if( ml && ml == mr ) continue; // 接口处不能同色
                        f[ l ][ r ][ cl ][ cr ] = ( f[ l ][ r ][ cl ][ cr ] + f[ l ][ mid ][ cl ][ ml ] * f[ mid + 1 ][ r ][ mr ][ cr ] ) % mod;
                    }
    }
}

int main( ) 
{
    scanf( "%s", s + 1 );
    n = strlen( s + 1 );
    stack< int > stk;
    for( int i = 1; i <= n; ++ i ) 
    {
        if( s[ i ] == '(' ) stk.push( i );
        else p[ stk.top( ) ] = i, stk.pop( );
    }

    dfs( 1, n );
    ll ans = 0;
    for( int i = 0; i < 3; ++ i )
        for( int j = 0; j < 3; ++ j ) ans = ( ans + f[ 1 ][ n ][ i ][ j ] ) % mod;
    cout << ans << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(n \cdot 3^4)$。
    
- **关键点**: 利用栈预处理匹配位置。DFS 过程中通过四重循环处理边界颜色约束。