---
title: '[Leaf] [CF2157C] Meximum Array 2'
tags:
  - 策略/构造
  - 数学/MEX
  - 难度/P1/提高-
categories:
  - 10_Library
  - 00_基础算法
  - 04_贪心与构造
abbrlink: d48bd7b3
date: 2025-12-19
---
# [CF2157C - Meximum Array 2](https://codeforces.com/problemset/problem/2157/C) 
## 1. 核心逻辑

- **问题本质**: 根据 Min 与 MEX 的双重约束构造合法序列。
    
- **破局转换**:
    
    1. **约束解析**:
        
        - $\min = k$ 要求所有元素 $\ge k$。
            
        - $\text{MEX} = k$ 要求包含 $[0, k-1]$ 且剔除 $k$。
            
    2. **冲突消解**: 若一个点同时受两种约束，填入 `inf`（满足 $\ge k$ 且不属于 $[0, k]$ 闭包）。
        
    3. **策略**: 利用差分数组统计覆盖层数，分类填充 `inf`, `k` 或循环序列 $0 \dots k-1$ 以补全 MEX 需求。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
// CF2157C Meximum Array 2
// Key Logic: Difference array for constraint counting + State machine construction

#include <bits/stdc++.h>
using namespace std;

const int maxn = 105;
const int inf = 1e9;
int d1[ maxn ], d2[ maxn ];

void solve( )
{
    int n, k, q;
    cin >> n >> k >> q;
    memset( d1, 0, sizeof( d1 ) );
    memset( d2, 0, sizeof( d2 ) );

    while( q -- )
    {
        int c, l, r;
        cin >> c >> l >> r;
        if( c == 1 ) { d1[ l ] ++; d1[ r + 1 ] --; }
        else { d2[ l ] ++; d2[ r + 1 ] --; }
    }

    int s1 = 0, s2 = 0, cur = 0;
    for( int i = 1; i <= n; ++ i )
    {
        s1 += d1[ i ];
        s2 += d2[ i ];

        // 状态判定
        if( s1 && s2 ) cout << inf;
        else if( s1 ) cout << k;
        else 
        {
            cout << cur;
            cur = ( cur + 1 ) % k;
        }
        cout << ( i == n ? "" : " " );
    }
    cout << "\n";
}

int main( )
{
    ios::sync_with_stdio( 0 ); cin.tie( 0 );
    int t; cin >> t;
    while( t -- ) solve( );
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: Time $O(N + Q)$, Space $O(N)$。
    
- **渗透点**: 典型的“以空间换逻辑”构造。`inf` 的引入是打破 Min 与 MEX 表面矛盾的关键，而循环填充序列则是满足 MEX 存在性的最稳健策略。

- **相关知识点**：[[构造体系]]