---
title: 'P2051 [AHOI2009] 中国象棋 (Opt_Contour_State)'
tags:
  - DP/计数
  - 算法/贡献法
difficulty: 提高+/省选-
categories:
  - 10_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: 2eb10488
date: 2025-11-23 00:00:00
---
# [Luogu-P2051](https://www.luogu.com.cn/problem/P2051) 中国象棋

## 1. 核心逻辑

- **问题本质**: 在 $N \times M$ 棋盘放炮，每行每列最多 2 个，求合法方案总数。
    
- **破局转换**:
    
    1. **特征提取**: 一行一行决策。对于下一行，它不关心具体哪一列放了炮，只关心“还有多少列可以放”。
        
    2. **对称抽象**: 状态定义为 $f[i][j][k]$，表示前 $i$ 行，有 $j$ 列放了 1 个炮，有 $k$ 列放了 2 个炮。则放 0 个炮的列数为 $M-j-k$。
        
    3. **转移逻辑**: 在当前行放 0/1/2 个炮，分别落在 0 炮列或 1 炮列上，利用组合数 $C(x, 1)$ 或 $C(x, 2)$ 统计贡献。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
const int mod = 9999973;
ll f[ 105 ][ 105 ][ 105 ];
int n, m;

ll C2( ll n ) { return n * ( n - 1 ) / 2 % mod; }

int main( ) 
{
    cin >> n >> m;
    f[ 0 ][ 0 ][ 0 ] = 1;

    for( int i = 0; i < n; ++ i ) 
    {
        for( int j = 0; j <= m; ++ j ) 
        {
            for( int k = 0; j + k <= m; ++ k ) 
            {
                if( ! f[ i ][ j ][ k ] ) continue;
                ll cur = f[ i ][ j ][ k ];
                int z = m - j - k; // 0 炮列
                
                // 1. 不放
                f[ i + 1 ][ j ][ k ] = ( f[ i + 1 ][ j ][ k ] + cur ) % mod;

                // 2. 放一个
                if( z >= 1 ) f[ i + 1 ][ j + 1 ][ k ] = ( f[ i + 1 ][ j + 1 ][ k ] + cur * z ) % mod;
                if( j >= 1 ) f[ i + 1 ][ j - 1 ][ k + 1 ] = ( f[ i + 1 ][ j - 1 ][ k + 1 ] + cur * j ) % mod;

                // 3. 放两个
                if( z >= 2 ) f[ i + 1 ][ j + 2 ][ k ] = ( f[ i + 1 ][ j + 2 ][ k ] + cur * C2( z ) ) % mod;
                if( j >= 2 ) f[ i + 1 ][ j - 2 ][ k + 2 ] = ( f[ i + 1 ][ j - 2 ][ k + 2 ] + cur * C2( j ) ) % mod;
                if( z >= 1 && j >= 1 ) f[ i + 1 ][ j ][ k + 1 ] = ( f[ i + 1 ][ j ][ k + 1 ] + cur * z * j ) % mod;
            }
        }
    }

    ll ans = 0;
    for( int j = 0; j <= m; ++ j )
        for( int k = 0; j + k <= m; ++ k ) ans = ( ans + f[ n ][ j ][ k ] ) % mod;
    cout << ans << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N \cdot M^2)$。
    
- **关键点**: 状态定义的精简是降维的核心。注意组合数计算及取模安全。