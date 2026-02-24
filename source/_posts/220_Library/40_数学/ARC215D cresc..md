---
title: "[Leaf] [ARC215D] cresc."
tags:
  - 数学/组合数学
  - 算法/贡献法
  - 难度/P5
date: 2026-02-24
---

# [D - cresc.](https://atcoder.jp/contests/arc215/tasks/arc215_d)

## 1. 题面梗概

**中译中**：构造一个长度为 $N$ 的非降序列 $S$，要求存在一个长度为 $N+1$ 的辅助序列 $A$（元素均在 $[0, M]$ 之间），满足相邻项之和等于 $S$ 的项。求满足条件的 $S$ 的数量。

> $S_i = A_i + A_{i+1}$.
> $1 \le N, M \le 10^7$, 结果对 $10^9 + 7$ 取模。

## 2. 逻辑推导

这显然是个组合数学推导题，在没有别的性质前，我们先从 $S$ 的定义出发分析。

### 2.1 {核心思路/切入点}

观察 $S$ 的生成方式与单调性要求：

$$S_{i+1} \ge S_i \implies A_{i+1} + A_{i+2} \ge A_i + A_{i+1} \implies A_{i+2} \ge A_i$$

这意味着序列 $A$ 在 **奇数下标** 和 **偶数下标** 上分别是 **非降** 的。 序列 $S$ 可以由首项 $S_1$ 和差分序列 $d_i = S_{i+1} - S_i \ge 0$ 唯一确定。

### 2.2 {进阶转化/算法结合}

{描述如何解决核心难点。例如：利用 LCA 倍增维护路径最值、或者 WQS 二分优化。}

### 2.3 结论

{一句话总结题型。例如：这是个 MST + 并查集 + 逆向思维的结合。}

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 3e7 + 5;
const int mod = 1e9 + 7;

ll N, M;

ll fac[maxn], inv[maxn];

ll qpow( ll a, ll b )
{
    ll res = 1;
    while( b )
    {
        if( b & 1 ) res = res * a % mod;
        a = a * a % mod;
        b >>= 1;
    }
    return res;
}

ll C( ll n, ll k )
{
    if( n < k ) return 0;
    return ( fac[n] * inv[k] % mod ) * inv[n - k] % mod;
}

void init( )
{
    fac[0] = inv[0] = 1;
    for( int i = 1; i < maxn; ++ i ) fac[i] = ( fac[i - 1] * i ) % mod;
    inv[maxn - 1] = qpow( fac[maxn - 1], mod - 2 );
    for( int i = maxn - 2; i >= 1; -- i ) inv[i] = ( inv[i + 1] * (i + 1) ) % mod;
}

ll calc( ll x, ll y )
{
    ll res = 0;
    for( int i = M + 1; i <= 2 * M; ++ i )
    {
        ll t1 = C( i + (x - 1), (x - 1) );
        ll t2 = C( (2 * M - i) + (y + 1), (y + 1) );
        res = ( res + t1 * t2 ) % mod;
    }
    return res;
}

void solve( )
{
    cin >> N >> M;

    int cnt1 = N / 2, cnt2 = ( N + 1 ) / 2 - 1;

    ll ans = C( 2 * M + N, N );

    ans = ( ans - calc( cnt1, cnt2 ) + mod ) % mod;
    ans = ( ans - calc( cnt2, cnt1 ) + mod ) % mod;

    cout << ans << '\n';
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    init( );
    solve( );
    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度分析**：$O( \dots )$。
    
- **认知补丁**：{可选，记录特殊的性质或坑点。例如：瓶颈路性质、严格次小需要维护次大值等。}
    
- **碎碎念**：{记录调试过程中的痛点、心情或对题目设计的吐槽。}
    
- **关联笔记**：[[知识点体系]] | [[相似题目]]
