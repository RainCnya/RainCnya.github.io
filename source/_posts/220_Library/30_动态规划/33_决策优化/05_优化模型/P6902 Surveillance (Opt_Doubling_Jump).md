---
title: 'P6902 [ICPC 2014 WF] Surveillance (Opt_Doubling_Jump)'
tags:
  - DP/线性
  - 策略/倍增
difficulty: 提高+/省选-
categories:
  - 220_Library
  - 30_动态规划
  - 33_决策优化
abbrlink: 401ab780
date: 2025-11-15 00:00:00
---
# [Luogu-P6902](https://www.luogu.com.cn/problem/P6902) Surveillance

## 1. 核心逻辑

- **问题本质**: 环形序列上选取最少的区间实现全覆盖。
    
- **破局转换**:
    
    1. **破环成链**: 序列倍增至 $2N$，环形区间转化为链上区间。
        
    2. **贪心预处理**: $f[ i ][ 0 ]$ 表示从位置 $i$ 出发，使用 1 个区间能到达的最远右边界。
        
    3. **倍增跳跃**: $f[ i ][ j ] = f[ f[ i ][ j - 1 ] ][ j - 1 ]$ 表示跳跃 $2^j$ 步能到达的最远点。
        
    4. **全局检索**: 枚举每个可能的起点 $i \in [1, N]$，利用倍增计算跳跃多少步能覆盖长度 $N$。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxn = 2e6 + 50;
const int logn = 21;
int f[ maxn ][ logn ], n, k;
pair< int, int > a[ maxn ];

int main( ) 
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> k;
    for( int i = 1; i <= k; ++ i ) 
    {
        cin >> a[ i ].first >> a[ i ].second;
        if( a[ i ].first > a[ i ].second ) a[ i ].second += n;
    }
    sort( a + 1, a + k + 1 );

    // 贪心预处理 f[i][0]
    int cur = 1, max_r = 0;
    for( int i = 1; i <= 2 * n; ++ i ) 
    {
        while( cur <= k && a[ cur ].first <= i ) 
        {
            max_r = max( max_r, a[ cur ].second + 1 );
            cur ++;
        }
        f[ i ][ 0 ] = max( i, max_r );
    }

    // 倍增建表
    for( int j = 1; j < logn; ++ j )
        for( int i = 1; i <= 2 * n; ++ i )
            f[ i ][ j ] = f[ f[ i ][ j - 1 ] ][ j - 1 ];

    int ans = 1e9;
    for( int i = 1; i <= n; ++ i ) 
    {
        int pos = i, steps = 0;
        for( int j = logn - 1; j >= 0; -- j ) 
        {
            if( f[ pos ][ j ] < i + n ) 
            {
                pos = f[ pos ][ j ];
                steps += ( 1 << j );
            }
        }
        if( f[ pos ][ 0 ] >= i + n ) ans = min( ans, steps + 1 );
    }

    if( ans > k ) cout << "impossible\n";
    else cout << ans << "\n";

    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O( (N+K) \log N )$。
    
- **关键点**: $f[ i ][ 0 ]$ 的含义是“覆盖到 $i$ 后能跳到的下一个起点”。注意 $a[ i ].second + 1$ 的物理偏置。