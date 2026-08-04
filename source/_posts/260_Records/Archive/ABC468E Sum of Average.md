---
title: ABC468E Sum of Average
tags:
  - algorithm/记录
  - 数学/贡献
  - 数学/模逆元
status: solved
categories:
  - 260_Records
  - Archive
abbrlink: a468e001
date: 2026-07-25 00:00:00
updated: 2026-08-04 00:00:00
---

# ABC468E Sum of Average

> [!Question]
> 给定长度为 $N$ 的整数序列 $A$。定义 $f(l,r)$ 为子数组 $A_l,A_{l+1},\ldots,A_r$ 的算术平均数，求
> $$
> \sum_{1\le l\le r\le N}f(l,r)
> $$
> 对 $998244353$ 取模后的结果。
>
> 数据规模：$1\le N\le 5\times 10^5$，$0\le A_i<998244353$。

题目要求 $\displaystyle \sum_{1 \le l \le r \le N}\left( \frac{A_{l} + \dots + A_{r}}{r - l + 1} \right)$，这是一个比较复杂的式子，显然我们可以写出一个 $\mathcal{O}(N^{2})$ 的暴力做法，然后枚举所有区间求和就行。Anyway，回头看一眼数据规模 …… 看来我们得优化一下。

常见的计数类优化思路是找贡献值，假设我们固定 $A_{i}$ 不变，考虑每个 $A_{i}$ 对答案的贡献，对于所有满足 $l \le i \le r$ 的区间 $[l, r]$，$A_{i}$ 在该区间平均值中的贡献是：$\displaystyle \frac{A_{i}}{r-l+1}$。

不妨记 $\displaystyle c_{i} = \sum_{l \le i \le r}\left( \frac{1}{r-l+1} \right)$，那么最终答案就是 $\displaystyle \sum_{i=1}^{N}c_{i}A_{i}$，接下来问题就转化为了如何计算这个系数 $c_{i}$。

对于 $i = 1$ 来说，包含位置 $1$ 的区间只能是 $[1, 1], [1, 2], \dots, [1, N]$，所以 $c_{1} = 1 + \frac{1}{2} + \frac{1}{3} + \dots + \frac{1}{N}$。写起来好麻烦，记 $\displaystyle f_{i} = \sum_{j=1}^{i} \frac{1}{j}$，那么 $c_{1} = f_{N}$。

接着考虑如何从 $c_i$ 转移到 $c_{i+1}$。原本包含 $i$、但不包含 $i+1$ 的区间，必须以 $i$ 为右端点，即 $[1,i],[2,i],\dots,[i,i]$；新增的包含 $i+1$、但不包含 $i$ 的区间，必须以 $i+1$ 为左端点，即 $[i+1,i+1],[i+1,i+2],\dots,[i+1,N]$。

前者的系数和是 $\displaystyle 1 + \frac{1}{2} + \dots + \frac{1}{i} = f_{i}$，后者的系数和是 $\displaystyle 1 + \frac{1}{2} + \dots + \frac{1}{N-i} = f_{N-i}$。于是我们就可以得到 $c_{i+1} = c_{i} - f_{i} + f_{N-i}$。

```cpp title:"EEE1" fold
void solve( ) {
    int n = read( );
    ll p = 0;
    for( int i = 1; i <= n; ++ i ) a[i] = read( );
    
    inv[1] = 1;
    for( int i = 2; i <= n; ++ i ) {
        inv[i] = ( mod - mod / i ) * inv[mod % i] % mod;
    } // 这里用到了一个线性递推逆元的公式，也可以直接快速幂算，应该不会超时。

    f[0] = 0;
    for( int i = 1; i <= n; ++ i ) {
        f[i] = ( f[i - 1] + inv[i] ) % mod;
    }

    c[1] = f[n];
    for( int i = 1; i < n; ++ i ) {
        c[i + 1] = ( c[i] - f[i] + f[n - i] + mod ) % mod;
    }

    ll ans = 0;

    for( int i = 1; i <= n; ++ i ) {
        ans = ( ans + a[i] * c[i] ) % mod;
    }

    cout << ans << '\n';
}
```

> [!note] 线性递推逆元公式
> 设 $\displaystyle p=\left\lfloor\frac pi\right\rfloor i+(p\bmod i)$。
> 在模意义下整理，可以得到下列递推式：
> $\displaystyle inv[i] = \left(p-\left\lfloor\frac{p}{i}\right\rfloor\right)\cdot inv[p\bmod i]\pmod p$。
> 写成代码就是：`inv[i] = ( mod - mod / i ) * inv[mod % i] % mod;`  可以当做结论记下来。

这是我赛事的推导思路，但在赛后整理思路的时候，我发现了另一种做法。

按照子数组长度分类，求出所有长度为 $i$ 的子数组元素和之和，然后除以 $i$ 分组计算贡献。

设 $\displaystyle T_{i} = \sum_{l=1}^{n-i+1} \sum_{j=l}^{l+i-1} A_{j}$ 表示所有长度为 $i$ 的子数组的元素和之和，那么长度为 $i$ 的子数组平均数之和就是 $\displaystyle \frac{T_{i}}{i}$，最终答案就是 $\displaystyle \sum_{i=1}^{n} \frac{T_{i}}{i}$，问题就转化为了求出所有的 $T_{i}$。

关键是找 $T_{i}$ 和 $T_{i+1}$ 的关系，记前缀和为 $\displaystyle P_{i} = \sum_{j=1}^{i} a_{j}$。对于长度为 $k$ 的窗口 $[a_{1}, \dots a_{k}], [a_{2}, \dots, a_{k+1}], \dots, [a_{n-k+1}, \dots, a_{n}]$。当窗口长度从 $k$ 变成 $k+1$ 时，可以把前 $n-k$ 个长度为 $k$ 的窗口向右扩展一个元素。

也就是 $\displaystyle T_{k+1} = T_{k} - (a_{n-k+1} + \dots + a_{n} ) + (a_{k+1} + \dots + a_{n})$，用前缀和表示就是 $T_{k+1} = T_{k} - (P_{n} - P_{n-k}) + (P_{n} - P_{k}) = T_{k} + P_{n-k} - P_{k}$。

于是在预处理 $P$ 数组后就可以直接递推了，初始状态就很显然 $T_{1} = P_{n}$ 了。

```cpp title:"EEE2" fold
void solve( ) {
    int n = read( );

    for( int i = 1; i <= n; ++ i ) {
        a[i] = read( );
        pre[i] = ( pre[i - 1] + a[i] ) % mod;
    }

    inv[1] = 1;
    for( int i = 2; i <= n; ++ i ) {
        inv[i] = ( mod - mod / i ) * inv[mod % i] % mod;
    }

    ll T = pre[n];
    ll ans = 0;

    for( int len = 1; len <= n; ++ len ) {
        ans = ( ans + T * inv[len] ) % mod;

        if( len < n ) {
            T = ( T + pre[n - len] - pre[len] + mod ) % mod;
        }
    }

    cout << ans << '\n';
}
```

## 记录

- 来源：[[ABC468 A~G]]；
- 归属：[[降维技巧]]；
- 新增：把区间平均值总和按单点贡献拆开，推导相邻位置系数递推；赛后又从固定长度窗口总和得到另一条等价递推。
- 分类：待定

