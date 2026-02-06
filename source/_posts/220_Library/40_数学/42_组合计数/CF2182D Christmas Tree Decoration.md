---
title: '[Leaf] [CF2182D] Christmas Tree Decoration'
tags:
  - 组合/计数
  - 难度/P3
categories:
  - 220_Library
  - 40_数学
  - 42_组合计数
abbrlink: 84cedf52
date: 2026-01-05 00:00:00
---

# [CF2182D - Christmas Tree Decoration](https://codeforces.com/contest/2182/problem/D "null")

## 1. 核心逻辑

- **模型抽象**: 给定总和 $S$，将其分配给 $N$ 个位置，要求任意两位置之差 $\le 1$。
    
- **逻辑不变量**:
    
    1. 在“极差 $\le 1$”的强约束下，分配方案是**唯一确定**的：
        
        - 每个位置的基础值为 $q = S / N$。
            
        - 共有 $r = S \% N$ 个位置的值为 $q + 1$，其余 $N - r$ 个位置的值为 $q$。
            
    2. **判定准则**: 移除 $a[i]$ 后，剩余序列必须能由 $r$ 个 $q+1$ 和 $N-r$ 个 $q$ 组成。
        
- **方案计数**:
    
    - 统计原序列（移除 $a[i]$ 后）中 $q+1$ 的个数 $cnt$。
        
    - 此时问题转化为：在 $N$ 个位置中，将现有的 $cnt$ 个 $(q+1)$ 放置到理论要求的 $r$ 个位置上的排列方案。
        
    - 公式：$A_{r}^{cnt} \times (N-cnt)!$。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 1e6 + 50;
const int mod = 998244353;

int n;
int a[maxn];
ll fac[maxn];
ll inv[maxn];

ll qpow( ll base, ll k )
{
    ll res = 1;
    base %= mod;
    while( k )
    {
        if( k & 1 ) res = ( res * base ) % mod;
        base = ( base * base ) % mod;
        k >>= 1;
    }
    return res;
}

void init( )
{
    fac[0] = 1;
    for( int i = 1; i < maxn; ++ i ) 
        fac[i] = ( fac[i-1] * i ) % mod;
    inv[maxn - 1] = qpow( fac[maxn - 1], mod - 2 );
    for( int i = maxn - 2; i >= 0; -- i ) 
        inv[i] = ( inv[i + 1] * ( i + 1 ) ) % mod;
}

ll per( int n, int r )
{
    return ( fac[n] * inv[n - r] ) % mod;
}

void solve( )
{
    cin >> n;
    ll sum = 0;
    for( int i = 0; i <= n; ++ i )
    {
        cin >> a[i];
        sum += a[i];
    }
    ll q = sum / n;
    int r = sum % n;

    int cnt = 0;
    for( int i = 1; i <= n; ++ i )
    {
        if( a[i] > q + 1 )
        {
            cout << 0 << '\n';
            return;
        }
        if( a[i] == q + 1 ) cnt ++;
    }

    ll res = per( r, cnt );
    res = ( res * fac[n - cnt] ) % mod;
    cout << res << '\n';
}

int main( )
{
    init( );
    int _t = 1;
    cin >> _t;
    while( _t -- )
    {
        solve( );
    }
    return 0;
}

```

{% endfold %}

## 3. 复盘

- **复杂度**: $O(N)$。
    
- **灵感反思**: 该模型推翻了“分配方案多样性”的假象。只要满足极差 $\le 1$，所有数的取值集合就是唯一的。
    
- **关联母题**: [[Note] 平均分布不变量]