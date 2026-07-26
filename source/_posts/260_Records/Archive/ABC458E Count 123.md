---
title: 'ABC458E Count 123'
tags:
  - algorithm/记录
  - 组合数学
  - 范德蒙恒等式
categories:
  - 260_Records
  - Archive
abbrlink: 8a0fb101
date: 2026-05-16 00:00:00
---
# [E - Count 123](https://atcoder.jp/contests/abc458/tasks/abc458_e)

## 题意
给定 $X_{1}, X_{2}, X_{3}$，求有多少个序列满足要求，序列中有 $X_{1}$ 个 1，$X_{2}$ 个 2，$X_{3}$ 个 3，每两个元素之间差值 $\leq 1$。

> $X_{1}, X_{2}, X_{3} \leq 1e6$

## 思路
计数问题，难道是 DP，定义 $DP[i][j][k][lst]$ 表示使用了 $i$ 个 1，$j$ 个 2，$k$ 个 3，最后一个是 $last$ 的方案数。但是一看数据规模 ...... 好吧，还是想想别的方法吧。

观察到一个很重要的限制条件 “每两个元素之间差值 $\leq 1$”，这就意味着 1 和 3 是无法直接相邻的，也就是说 1 和 3 之间必须有一个 2 过渡，那就可以用插空法了，把 $X_{2}$ 个 2 之间隔出来的 $X_{2} + 1$ 个空位分给 1 和 3。

每一个空位中，我们可以放入若干个 1，或者若干个 3，或者不放，那么问题就转化为了在 $X_{2} + 1$ 个空位中，将 $X_{1}$ 个 1 和 $X_{3}$ 个 3 放入不同的空位中，使得没有一个空位同时存在 1 和 3。

从 $X_{2} + 1$ 个空位中选择 $c_{1}$ 个放 1 的方案是 $\binom{ X_{2}+1 }{ c_{1} }$。从剩下的 $X_{2} + 1 - c_{1}$ 个空位中选择 $c_{3}$ 个放 3 的方案是 $\binom{ X_{2} + 1 - c_{1} }{ c_{3} }$。

接着考虑分配元素，把 $X_{1}$ 个 1 放入这 $c_{1}$ 个空位中，每个位置至少放一个，方案数是 $\binom{ X_{1} - 1 }{ c_{1} - 1 }$。同理 $X_{3}$ 个 3 放入这 $c_{3}$ 个空位中，每个位置至少放一个，方案数是 $\binom{ X_{3}-1 }{ c_{3}-1 }$，然后枚举所有的 $c_{1}$ 和 $c_{3}$ 情况就可以得到答案了，如下：

$$
\sum_{c_{1}=1}^{X_{1}} \sum_{c_{3}=1}^{X_{3}} \binom{ X_{2}+1 }{ c_{1} } \times \binom{ X_{2} + 1 - c_{1} }{ c_{3} } \times \binom{ X_{1} - 1 }{ c_{1} - 1 } \times \binom{ X_{3}-1 }{ c_{3}-1 }
$$

接着我们就可以写出下面这种代码：

{% fold info @AcCode %}
```cpp
ll ans = 0;
for( int c1 = 0; c1 <= x1; ++ c1 ) {
	for( int c3 = 0; c3 <= x3; ++ c3 ) {
		ll t1 = nCr( x2 + 1, c1 );
		ll t2 = nCr( x2 + 1 - c1, c3 );
		ll t3 = nCr( x1 - 1, c1 - 1 );
		ll t4 = nCr( x3 - 1, c3 - 1 );
		ll tmp = ( ( t1 * t2 ) % mod * ( t3 * t4 ) % mod );
		ans = ( ans + tmp ) % mod;
	}
}
```
{% endfold %}

然后就发现 $N^{2}$ 死了，考虑优化，显然公式已经化到最简了，考虑能否合并，注意 2 和 4 两项：

$$ 
\sum_{c_3} \text{t2} \times \text{t4} = \sum_{c_3} \binom{X_2 + 1 - c_1}{c_3} \times \binom{X_3 - 1}{c_3 - 1} 
$$

由于组合数的对称性 $\binom{ n }{ r } = \binom{ n }{ n-r }$，可以把后半部分改写成 $\binom{ X_{3}-1 }{ X_{3}-c_{3} }$，接着根据**范德蒙恒等式**，就可以把两个柿子合并了：

$$ 
\binom{(X_2 + 1 - c_1) + (X_3 - 1)}{X_3} = \binom{X_2 + X_3 - c_1}{X_3} 
$$

然后我们只需要枚举 $c_{1}$，就可以实现 $O(N)$ 计算了，至此AC。

> 范德蒙恒等式是什么？简单来说就是下面这种形式：证明不在此展开

$$
\sum_{i} \binom{a}{i} \binom{b}{n-i} = \binom{a+b}{n}
$$

## 代码部分
{% fold info @AcCode %}
```cpp
ll qpow( ll a, ll k, ll mod ) {
    ll res = 1; a %= mod;
    for( ; k; k >>= 1, a = a * a % mod ) 
        if( k & 1 ) res = res * a % mod;
    return res;
}

ll fac[maxn], invfac[maxn];
void init( int N ) {
    fac[0] = 1;
    for( int i = 1; i <= N; i ++ ) fac[i] = fac[i - 1] * i % mod;
    invfac[N] = qpow( fac[N], mod - 2, mod );
    for( int i = N - 1; i >= 0; i -- ) invfac[i] = invfac[i + 1] * ( i + 1 ) % mod;
}

ll nCr( int n, int r ) {
    if( n < r ) return 0;
    return fac[n] * invfac[n - r] % mod * invfac[r] % mod;
}
// 略去前面预处理 nCr 相关的模板。最后的调用 nCr(n, r) 就是 n 个里面选 r 个。
// 最后想了想还是加上吧，我也不知道为什么

void solve( ) {
    ll x1, x2, x3;
    cin >> x1 >> x2 >> x3;
    ll len = x1 + x2 + x3;
	
    ll ans = 0;
    for( int c1 = 1; c1 <= x1; ++ c1 ) {
        ll t1 = nCr( x2 + 1, c1 );
        ll t3 = nCr( x1 - 1, c1 - 1 );
        ll t24 = nCr( x2 + x3 - c1, x3 );
        ll tmp = ( ( t1 * t3 ) % mod * t24 % mod );
        ans = ( ans + tmp ) % mod;
    }
    cout << ans << '\n';
}
```
{% endfold %}
