---
title: ABC468G Restricted Permutation
tags:
  - algorithm/记录
  - 动态规划/计数
  - 数学/组合计数
status: solved
categories:
  - 260_Records
  - Archive
abbrlink: a468g001
date: 2026-07-25 00:00:00
updated: 2026-08-04 00:00:00
---

# ABC468G Restricted Permutation

> [!Question]
> 给定长度为 $N$、仅由 `o` 与 `x` 构成的字符串 $S$。求有多少个 $1\sim N$ 的排列 $P$ 满足：对于每个 $1\le k\le N$，$S_k$ 为 `o` 当且仅当排列中数字 $1,2,\dots,k$ 所在的位置构成一个连续子段。答案对 $998244353$ 取模。
>
> 数据规模：$1\le N\le 2000$。

首先 $k = 1$ 时只有数字 $1$，$k = N$ 时包括整个排列，因此数字 $1 \sim k$ 所在的位置一定连续，所以如果 $S_{1} = x$ 或者 $S_{N} = x$，答案显然为 $0$。

接着我们考虑两个相邻的 `o`，设它们的小标分别为 $a, b$，即 $S_{a} = o, S_{b} = o, S[a+1, \dots, b-1] = x$。记$d = b - a$，当 $k = a$ 时，数字 $1 \sim a$ 在排列中已经构成了一个连续段，由于 $k = b$ 时，数字 $1 \sim b$ 也得构成了一个连续段，所以新加入的 $[a+1, a+2, \dots, b]$ 一共有 $d$ 个，加上原本的连续段，一共就有 $d + 1$ 个对象。

所以如果暂时不考虑中间是否重新形成连续段的话，这 $d + 1$ 个不同对象之间可以任意排列，记 $f[d] = (d + 1)!$。

接着考虑题目的限制条件，要求 $a < k < b$ 时均为 `x`，也就是说，新加入的这一段都不能提前形成连续段，只能在加入数字 $b$ 之后第一次重新连续。

由此我们引入 $dp[d]$ 表示满足这一条件的最终排列数量。

直接推公式太抽象了，我们从例子中找找规律，例如 $d = 3$ 时，目标形式为 `oxxo`，那么一共有 $f[3]$ 中排列，然后我们得减去提前重新连续的情况：

1. `ooxo`：此时前面一段方案数是 $dp[1]$，后面一段方案数是 $f[2]$，通过乘法原理可以把方案数乘起来。
2. `oxoo`：此时前面一段方案数是 $dp[2]$，后面一段方案数是 $f[1]$，通过乘法原理可以把方案数乘起来。

于是 $dp[3] = f[3] - dp[1]f[2] - dp[2]f[1]$，大胆猜测递推公式就是：

$$
\begin{aligned}
dp[d] &= f[d] - \sum_{i=1}^{d-1} dp[i]f[d-i] \\	
&= (d+1)! - \sum_{i=1}^{d-1}dp[i] \cdot (d-i+1)! 
\end{aligned}
$$

> [!note] 证明
> 一般地，对于任意一种排列，设 $i$ 是使数字 $1\sim a+i$ 第一次重新构成连续段的位置。这个 $i$ 是唯一的，因此可以按照第一次重新连续的位置分类。
> 
> 前 $i$ 个新数字满足“此前不连续、到第 $i$ 步第一次连续”，共有 $dp[i]$ 种；将这一部分压缩后，它与剩余 $d-i$ 个数字可以任意排列，共有 $f[d-i]$ 种。

最后我们统计答案即可，设 $S$ 中所有 `o` 的位置依次为 $p_{1} = 1 < p_{2} < \dots < p_{m} = N$。

对于相邻一堆 `o`，其间隔为 $d = p_{i} - p_{i-1}$，对应 $dp[d]$ 种排列方式，所以各段之间用乘法原理统计答案即可：

$$
Ans = \prod_{i=2}^{m} dp[p_{i} - p_{i-1}]
$$

```cpp title:"GGG" fold
ll fac[maxn];
ll dp[maxn];

void init( int N ) {
    fac[0] = 1;
    for( int i = 1; i <= N; ++ i ) {
        fac[i] = fac[i - 1] * i % mod;
    }
}

void solve( ) {
    int n = read( );

    for( int i = 1; i <= n; ++ i ) {
        dp[i] = fac[i+1];
        for( int j = 1; j < i; ++ j ) {
            dp[i] -= dp[j] * fac[i - j + 1] % mod;
            dp[i] = ( dp[i] + mod ) % mod;
        }
    }

    string s;
    cin >> s;

    if( s[0] == 'x' || s[n-1] == 'x' ) {
        cout << 0 << '\n';
        return ;
    }

    ll ans = 1;
    int lst = 0;
    for( int cur = 1; cur < n; ++ cur ) {
        if( s[cur] == 'o' ) {
            int dif = cur - lst;
            ans = ans * dp[dif] % mod;
            lst = cur;
        }
    }
    cout << ans << '\n';
}
```

时间复杂度为 $\mathcal{O}(N^2)$，空间复杂度为 $\mathcal{O}(N)$。

## 记录

- 来源：[[ABC468 A~G]]；
- 归属：[[组合计数 - 常见模型]]；
- 新增：按相邻连续时刻之间“第一次重新形成连续段”的唯一位置分类，得到首达事件的减法递推，并将不同间隔的方案数相乘。
- 分类：待定

