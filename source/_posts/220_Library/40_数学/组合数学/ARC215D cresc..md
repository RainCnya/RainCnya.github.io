---
title: '[Leaf] [ARC215D] cresc.'
tags:
  - 数学/组合数学
  - 算法/贡献法
  - 难度/P5
categories:
  - 220_Library
  - 40_数学
  - 组合数学
abbrlink: cba0509f
date: 2026-02-24 00:00:00
---

# [D - cresc.](https://atcoder.jp/contests/arc215/tasks/arc215_d)

## 1. 题面梗概

**中译中**：构造一个长度为 $N$ 的非降序列 $S$，要求存在一个长度为 $N+1$ 的辅助序列 $A$（元素均在 $[0, M]$ 之间），满足相邻项之和等于 $S$ 的项。求满足条件的 $S$ 的数量。

> $S_i = A_i + A_{i+1}$.
> $1 \le N, M \le 10^7$, 结果对 $10^9 + 7$ 取模。

## 2. 逻辑推导

这显然是个 组合数学 推导题，在没有别的性质前，我们先从 $S$ 的定义出发分析。

### 2.1 奇偶分组

因为 $S$ 是非降的，我们试试差分能不能发现什么规律。

$$
D_{i} = S_{i+1} - S_{i} = (A_{i+1} + A_{i+2}) - (A_{i} + A_{i+1}) = A_{i+2} - A_{i} \geq 0
$$

这意味着序列 $A$ 在 **奇数下标** 和 **偶数下标** 上分别是 **非降** 的。

- **奇数**：$A_1 \xrightarrow{d_1} A_3 \xrightarrow{d_3} A_5 \dots$

- **偶数**：$A_2 \xrightarrow{d_2} A_4 \xrightarrow{d_4} A_6 \dots$

### 2.2 约束

因为 $S_{1} = A_{1} + A_{2}$，那么只需要知道 $S$ 和剩下 $N - 1$ 个 差分变量 $D_{i}$ 就可以构造出整个数列 $S$ 了。

- **奇数**：共有 $k_{x} = \left\lfloor  \frac{N}{2}  \right\rfloor$ 个变量（即 $d_{1}, d_{3}, \dots$ ），设它们总和为 $X$。

- **偶数**：共有 $k_{y} = \left\lfloor  \frac{N-1}{2}  \right\rfloor$ 个变量（即 $d_{2}, d_{4}, \dots$ ），设它们总和为 $Y$。

为了保证 $A$ 的所有元素都在 $[0, M]$，我们分析奇偶数：

- **奇数**：$0 \leq A_{1} \leq A_{k_{x}} = A_{1} + X \leq M$，也就是 $X \leq M$。
- **偶数**：$A_{2} + Y \leq M$，同理 $Y \leq M$。
- 同时因为 $A_{1} + A_{2} = S_{1}$，所以 $S_{1} + X + Y \leq 2M$。

### 2.3 计数

现在问题就转化为了，有多少组非负整数解满足上述三个约束条件。

发现这个不等式 $S_{1} + X + Y \leq 2M$ 有点麻烦，我们把它变成等式：

$$
S_{1} + X + Y + W = 2M
$$
一共有 $1 + k_{x} + k_{y} + 1 = 1 + (N - 1) + 1 = N + 1$ 个变量。

那么把 $2M$ 分给  $N + 1$ 个变量，根据隔板法公式：

$$
Total = \binom{2M + N}{N}
$$
### 2.4 容斥

由于总数只有 $2M$，而条件是 $X \leq M$ 且 $Y \leq M$，所以要么 $k_{x}$ 多了，要么 $k_{y}$ 多了。

> 因为 $X + Y \leq 2M$，所以它们不可能同时多拿。

假设 $k_{x}$ 拿多了的情况，剩下来的 统称为 $Z$，共 $m = N + 1 - k_{x}$ 个。

我们枚举 $X$ 拿了 $j$ 个的情况。（ $M + 1 \leq j \leq 2M$ ）

$$
S(k_{x}, m) = \sum_{j=M+1}^{2M} \left[ \binom{j + (k_{x} - 1)}{(k_{x} - 1)} \times \binom{(2M - j) + (m - 1)}{m - 1} \right] 
$$

$X$ 组：$k_{x}$ 分 $j$；$Z$ 组：$m$ 分 $2M - j$。

而 $k_{y}$ 多拿的情况对称，只需要把 $k_{x}$ 换成 $k_{y}$ 即可。

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

- **复杂度分析**：$O(N + M)$ 。
        
- **认知补丁**：
    
    - **差分变量的起源**：想明白 $d_i = A_{i+2} - A_i$ 这一步是解题的关键，它将序列 $S$ 唯一映射到了两根独立的 $A$ 序列锁链的增长步长上。
        
    - **垃圾桶变量 (**$W$**)**：它是解开不等式的钥匙。它让我们能够把“分苹果”从“不知道剩下多少”的模糊状态，转化成“一定分完 2M 个”的确定等式。
        
- **碎碎念**：先通过单调性差分（类似求导），然后再通过组合数学结合容斥原理求解出答案，
    
- **关联笔记**：[[810_Old_Note/组合计数]] 