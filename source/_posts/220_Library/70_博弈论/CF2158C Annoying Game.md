---
title: '[Leaf] [CF2158C] Annoying Game'
tags:
  - 数学/博弈
  - DP/线性
  - 难度/P3
categories:
  - 220_Library
  - 70_博弈论
abbrlink: 1d4e98a6
date: 2025-12-19 00:00:00
---

# [CF2158C](https://codeforces.com/problemset/problem/2158/C) Annoying Game

## 1. 核心逻辑

- **问题本质**: Alice 与 Bob 轮流操作 $k$ 次。Alice 增加元素 $a_i \leftarrow a_i + b_i$，Bob 减去。求在两人最优策略下，最终数组的最大子段和。
    
- **破局转换**:
    
    1. **博弈不变量 (Invariant)**:
        
        - **偶数轮 (**$k$ **是偶数)**: Bob 作为后手，总是可以执行 Alice 的“镜像逆操作”（或者直接抵消 Alice 的增益），使得 Alice 无法改变最大子段和。因此结果等于**原数组的最大子段和**。
            
        - **奇数轮 (**$k$ **是奇数)**: Alice 多出一次净胜操作。她会选择一个位置 $i$，将其权值增加 $b_i$，并希望修改后的 $a[i] + b[i]$ 能与周边的最大前后缀和拼接。
            
    2. **局部贡献计算**:
        
        - 修改 $a[i]$ 后的全局最大值，要么是原有的最大子段和，要么是**包含** $a[i] + b[i]$ **的新子段**。
            
        - 新子段价值 = $(a[i] + b[i]) + \max(0, \text{Lmax}[i-1]) + \max(0, \text{Rmax}[i+1])$。
            
        - 其中 `Lmax[i]` 表示以 $i$ 结尾的最大子段和，`Rmax[i]` 同理。
            

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
const int maxn = 2e5 + 50;
ll a[ maxn ], b[ maxn ], f[ maxn ], g[ maxn ];

void solve( ) 
{
    int n; ll k;
    cin >> n >> k;
    for( int i = 1; i <= n; ++ i ) cin >> a[ i ];
    for( int i = 1; i <= n; ++ i ) cin >> b[ i ];

    // 原数组最大子段和 (Kadane)
    ll base_max = -2e18, sum = 0;
    for( int i = 1; i <= n; ++ i ) 
    {
        sum += a[ i ];
        base_max = max( base_max, sum );
        if( sum < 0 ) sum = 0;
    }

    if( k % 2 == 0 ) 
    {
        cout << base_max << "\n";
        return;
    }

    // 预处理以 i 结尾/开头的最大子段和
    f[ 0 ] = g[ n + 1 ] = -2e18;
    ll current = 0;
    for( int i = 1; i <= n; ++ i ) 
    {
        current += a[ i ];
        f[ i ] = current;
        if( current < 0 ) current = 0;
    }
    current = 0;
    for( int i = n; i >= 1; -- i ) 
    {
        current += a[ i ];
        g[ i ] = current;
        if( current < 0 ) current = 0;
    }

    ll ans = base_max;
    for( int i = 1; i <= n; ++ i ) 
    {
        ll left = max( 0LL, f[ i - 1 ] );
        ll right = max( 0LL, g[ i + 1 ] );
        ans = max( ans, a[ i ] + b[ i ] + left + right );
    }
    cout << ans << "\n";
}

int main( ) 
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );
    int t; cin >> t;
    while( t -- ) solve( );
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N)$。
    
- **关键点**: 理解博弈中的抵消原理。Alice 只有在拥有“奇数次操作”时，才能在 Bob 的镜像防守下建立绝对优势。