---
title: '[Leaf] [CF2176C] Odd Process'
tags:
  - 策略/构造
  - 策略/贪心
  - 数学/奇偶性
  - 难度/P3
categories:
  - 220_Library
  - 00_基础算法
  - 04_贪心与构造
abbrlink: d244f6a5
date: 2025-12-18 00:00:00
---
# [CF2176C - Odd Process](https://codeforces.com/problemset/problem/2176/C) 
## 1. 核心逻辑

- **问题本质**: 最大化保留在背包中的硬币面值和，硬币总和必须维持在奇数状态（若为偶数则被清空）。
    
- **破局转换**:
    
    1. **不变量控制**: 只有**奇数**能改变当前和的奇偶性。偶数仅贡献价值，不改变 Parity 状态。
        
    2. **贪心支点**: 对奇数和偶数分别降序排列。优先摄入面值最大的奇数作为基底。
        
    3. **状态依赖**:
        
        - 背包容量 $k$ 中，若偶数全部取完，剩余的名额必须用于成对摄入奇数，以维持“奇 + 偶 = 奇”的状态。
            

## 2. 代码实现

{% fold info @AcCode %}

```cpp
// CF2176C Odd Process
// Key Logic: Sorting + Parity Invariant Maintenance

#include <bits/stdc++.h>
using namespace std;

using ll = long long;
const int maxn = 2e5 + 50;
ll odds[ maxn ], evens[ maxn ], sum_e[ maxn ];

void solve( )
{
    int n; cin >> n;
    int co = 0, ce = 0;
    for( int i = 1; i <= n; ++ i )
    {
        ll x; cin >> x;
        if( x & 1 ) odds[ ++ co ] = x;
        else evens[ ++ ce ] = x;
    }

    sort( odds + 1, odds + co + 1, greater< ll >( ) );
    sort( evens + 1, evens + ce + 1, greater< ll >( ) );

    if( ! co ) 
    {
        for( int i = 1; i <= n; ++ i ) cout << "0 ";
        cout << "\n"; return;
    }

    for( int i = 1; i <= ce; ++ i ) sum_e[ i ] = sum_e[ i - 1 ] + evens[ i ];

    for( int k = 1; k <= n; ++ k )
    {
        int remain = 1; // 至少需要 1 个奇数开启状态
        if( ce <= k ) remain = k - ce;
        if( remain % 2 == 0 ) ++ remain; // 维持奇数总数，必须是奇数个奇数

        if( remain > co || remain > k ) cout << "0 ";
        else cout << odds[ 1 ] + sum_e[ k - remain ] << " "; 
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

- **复杂度**: $O(N \log N)$ (排序瓶颈)。
    
- **坑点**: 题目要求总和不能为偶数。注意初始状态 0 是偶数，意味着第一个硬币必须是奇数。
    
- **逻辑指纹**: 本题展示了贪心与 Parity 状态机耦合时的处理方式——寻找那个能够“锁定”目标状态的核心算子（奇数）。

- **相关知识点**：[[构造体系]]