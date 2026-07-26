---
title: 'ABC444C AtCoder Riko'
tags:
  - algorithm/记录
  - 策略/构造
  - 策略/双指针
categories:
  - 260_Records
  - Archive
abbrlink: f53b0091
date: 2026-02-07 00:00:00
---
# [C - AtCoder Riko](https://atcoder.jp/contests/abc444/tasks/abc444_c)

## 1. 题意梗概

给定一个包含 $N$ 个正整数的序列 $A$。这些数字是由若干根长度为 $L$ 的零食经过摇晃后产生的。每根原始长度为 $L$ 的零食要么保持完整，要么断成两截（长度和为 $L$）。

求所有可能的原始长度 $L$。

## 2. 逻辑推导

这其实是一个构造问题，注意到每个零食只有两种情况，所以我们可以把目光转移到最大值上。

- **情况一**：$A_{max}$ 是一根完整的零食。那么 $L = A_{max}$。此时需要验证剩下的所有元素能否两两配对成 $A_{max}$。
    
- **情况二**：$A_{max}$ 也是断裂后的碎片之一。这意味着没有任何一根零食是完整的。此时，$A_{max}$ 必须与序列中最小的元素 $A_{min}$ 配对。即 $L = A_{min} + A_{max}$。    

因此，可能的 $L$ 只有两个可能得情况。我们只需对这两个值分别进行 $O(N)$ 的双指针配对检验即可。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 3e5 + 50;

set< ll > res;

ll a[maxn];
int n;

bool check( int x )
{
    vector< int > tmp;
    for( int i = 1; i <= n; ++ i )
    {
        if( a[i] < x ) tmp.push_back( a[i] );
    }

    if( tmp.size( ) % 2 == 1 ) return 0;

    int l = 0, r = tmp.size( ) - 1;
    while( l < r )
    {
        if( tmp[l] + tmp[r] != x ) return 0;
        l ++, r --;
    }

    res.insert( x );
    return 1;
}

void solve( )
{
    cin >> n;
    ll sum = 0;
    for( int i = 1; i <= n; ++ i ) cin >> a[i], sum += a[i];
    sort( a + 1, a + n + 1 );

    int minv = a[1], maxv = a[n];

    check( maxv );

    check( minv + maxv );

    for( int ans : res ) cout << ans << ' ';

}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    solve( );
    return 0;
}
```

{% endfold %}
