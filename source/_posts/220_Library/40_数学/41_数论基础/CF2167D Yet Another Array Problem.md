---
title: '[Leaf] [CF2167D] Yet Another Array Problem'
tags:
  - 数论/整除/GCD
  - 难度/P1
categories:
  - 220_Library
  - 40_数学
  - 41_数论基础
abbrlink: 631bd66a
date: 2026-01-06 00:00:00
---
    
# [CF2167D - Yet Another Array Problem](https://codeforces.com/contest/2167/problem/D "null")

## 1. 核心逻辑

- **模型抽象**: 寻找最小质数 $p$，使得 $p \nmid \gcd(a_1, a_2, \dots, a_n)$。
    
- **破局路径 (最优演化)**:
    
    1. **全局特征提取**: 利用 $\gcd$ 结合律，计算序列全局最大公约数 $G$。
        
    2. **存在性转化**: 题目要求 $\exists i, \gcd(a_i, x) = 1$，这等价于 $x$ 不是所有 $a_i$ 的公因子。
        
    3. **质数分布约束**: 由于 $x$ 取合数无意义（其质因子必先满足条件），且 $10^{18}$ 以内的数质因子极少，故答案必在极小的质数序列（2, 3, 5...）中。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 1e5 + 50;
ll a[maxn];
int n;

const int primes[] = { 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61 };

void solve( )
{
    cin >> n;
    
    ll g = 0;
    for( int i = 1; i <= n; ++ i )
    {
        cin >> a[i];
        if( i == 1 ) g = a[i];
        else g = __gcd( g, a[i] );
    }

    for( int p : primes )
    {
        if( g % p != 0 )
        {
            cout << p << '\n';
            return;
        }
    }
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );
    
    int t;
    cin >> t;
    while( t -- )
    {
        solve( );
    }
    return 0;
}
```

{% endfold %}

## 3. 复盘

- **复杂度**: $O(T \cdot (N + \log A))$。
    
- **灵感反思**: 提取全局公因子 $G$ 是处理局部互质问题的降维。
    
- **关联母题**: [[Note] 最大公约数与素数分布]