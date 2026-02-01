---
title: '[Leaf] [ABC443G] Another Mod of Linear Problem'
tags:
  - 数论/类欧几里得
  - 难度/P3/省选
categories:
  - 10_Library
  - 40_数学
  - 41_数论基础
abbrlink: cbc2f5b3
date: 2026-01-31 00:00:00
---
# [G - Another Mod of Linear Problem](https://atcoder.jp/contests/abc443/tasks/abc443_g)

## 1. 题面梗概

**中译中**: 给定序列 $X_k = (Ak + B) \bmod M$，在 $0 \leq k < N$ 的范围内，统计有多少个 $k$ 满足 $X_k > k$。

## 2. 逻辑推导

这显然是一个数学推导问题，我们从公式和限制条件入手分析。

取模定义得：$X_k = (Ak + B) \pmod M \implies X_k = (Ak + B) - M \cdot \lfloor \frac{Ak + B}{M} \rfloor$ 。

我们要统计 $X_k \leq k$ 的情况，代入不等式，整理得到：

$$
(A - 1)k + B \leq M \lfloor \frac{Ak + B}{M} \rfloor \implies \frac{(A-1)k + B}{M} \leq \lfloor \frac{Ak + B}{M} \rfloor
$$

由于 $\lfloor \frac{Ak + B}{M} \rfloor$ 是一个整数，所以不等式还可以进一步变形：

$$
\lfloor \frac{(A - 1)k + B - 1}{M} \rfloor < \lfloor \frac{Ak + B}{M} \rfloor 
$$

因为 $A - 1 < A$，所以 $\lfloor \frac{(A - 1)k + B - 1}{M} \rfloor$ 至多比 $\lfloor \frac{Ak + B}{M} \rfloor$ 小 $1$。因此，指示函数 $f(X_k \leq k)$ 就可以写成：

$$
f(X_k \leq k) = \lfloor \frac{Ak + B}{M} \rfloor - \lfloor \frac{(A - 1)k + B - 1}{M} \rfloor 
$$

结论：答案就是总数减去不符合条件的数量

$$
Ans = N - \sum_{k=0}^{N-1}(\lfloor \frac{Ak + B}{M} \rfloor - \lfloor \frac{(A - 1)k + B - 1}{M} \rfloor 
)
$$
而这种形如 $\sum_{i=0}^{N}( \lfloor \frac{ai+b}{c} \rfloor)$ 的求和，可以采用类欧几里得算法 `floor_sum( n, m, a, b)` 在 $O(\log m)$ 时间内求出。具体逻辑证明就不在这里列出了。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ull = __int128;

ull calc( ll a, ll b, ll c, ll n )
{
    ull ans = 0;
    if( a >= c )
    {
        ans += (ull)n * (n + 1) / 2 * ( a / c );
        a %= c;
    }
    if( b >= c )
    {
        ans += (ull)(n + 1) * ( b / c );
        b %= c;
    }
    ull m = ( a * n + b ) / c;
    if( m == 0 ) return ans;    
    return ans + m * n - calc( c, c - b - 1, a, m - 1 );
}

void solve( )
{
    ll n, m, a, b;
    cin >> n >> m >> a >> b;

	// 注意特殊判断 A == 0 的情况
    if( a == 0 )
    {
        cout << min( n, b ) << '\n';
        return;
    }

    ull s1 = calc( a, b, m, n - 1 );
    ull s2 = calc( a - 1, b - 1, m, n - 1 );

	// 还有特殊的 B == 0 的情况
    if( b == 0 ) s2 = calc( a - 1, m - 1, m, n - 1 ) - n;

    cout << n - (ll)(s1 - s2) << '\n';
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int _t = 1;
    cin >> _t;
    while( _t -- ) solve( );
    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度**:  $O(T \log M)$。
	
- **碎碎念**: 残念！！！就差一点特判我就AK了，这题难点有三个，第一是推导数学公式的能力，第二是类欧几里得算法的掌握，第三就是细节了，边界情况，爆 `longlong`。
    
- **关联笔记**: [[类欧几里得算法]]