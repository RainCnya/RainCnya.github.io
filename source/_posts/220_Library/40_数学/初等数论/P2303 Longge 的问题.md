---
title: "[Leaf] [P2303] Longge 的问题"
tags:
  - 数论/欧拉函数
  - 算法/贡献法
  - 难度/P4
date: 2026-2-27 22:04:37
---

# [P2303 [SDOI2012] Longge 的问题 - 洛谷](https://www.luogu.com.cn/problem/P2303)

## 1. 题面梗概

**中译中**：给定 $n$，求 $\sum_{i=1}^n \gcd(i, n)$。

> $1 \le n < 2^{32}$

## 2. 逻辑推导

直接枚举 $i$ 的复杂度是 $O(n)$，这个数据规模大概率会 TLE。

观察发现，$gcd(i, n)$ 的取值一定且仅能是 $n$ 的因数，比起枚举每一个 $i$，不如枚举 $n$ 的每一个因数 $d$，统计有多少个 $i$ 使得 $gcd(i, n) = d$。

### 2.1 欧拉函数

设 $d$ 是 $n$ 的一个因数，满足 $gcd(i, n) = d$ 的条件可以转化为：

$$
gcd( \frac{i}{d}, \frac{n}{d} ) = 1
$$

其中 $1 \leq \frac{i}{d} \leq \frac{n}{d}$，这不就是求 $1 \to n / d$ 范围内，有多少数与 $n / d$ 互质吗？

每一个因数的贡献为 $d \cdot \phi(n / d)$，因此：

$$
\sum_{i=1}^{n} gcd(i, n) = \sum_{d \mid n} d \cdot \phi(\frac{n}{d})
$$

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 2e5 + 5;

ll n;

ll get_phi( ll n )
{
    ll res = n;
    for( ll i = 2; i * i <= n; ++ i )
    {
        if( n % i == 0 ) 
        {
            res = res / i * (i - 1);
            while( n % i == 0 ) n /= i;
        }
    }
    if( n > 1 ) res = res / n * (n - 1);
    return res;
}

int main( )
{
    ios::sync_with_stdio(0); cin.tie(0);
    
    cin >> n;
    ll ans = 0;
    for( ll i = 1; i * i <= n; ++ i )
    {
        if( n % i != 0 ) continue;
        ans += get_phi( n / i ) * i;
        if( i * i != n ) ans += get_phi( i ) * (n / i);
    }
    cout << ans << '\n';
    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度分析**：$O( \sqrt{ n } \cdot D )$，其中 $D$ 为因数个数。
    
- **碎碎念**：贡献法，把要求什么转化为这个数贡献了多少。
    
- **关联笔记**：[[初等数论]] | [[贡献法]]
