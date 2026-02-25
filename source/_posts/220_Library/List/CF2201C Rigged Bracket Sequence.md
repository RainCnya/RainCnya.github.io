---
title: '[Leaf] [CF2201C] Rigged Bracket Sequence'
tags:
  - DP/线性
  - DP/计数
  - 算法/前缀差分
  - 难度/P5
categories:
  - 220_Library
  - List
abbrlink: 4f42197e
date: 2026-02-25 13:09:55
---

# [CF2201C - Rigged Bracket Sequence](https://codeforces.com/contest/2201/problem/C)

## 1. 题面梗概

**中译中**：给定一个正则括号序列（RBS），求有多少个非空子序列，满足对其执行循环右移操作后，原序列依然是 RBS。

> $n \le 2 \cdot 10^5, \sum n \le 2 \cdot 10^5$

## 2. 逻辑推导

正则序列的充要条件是：任意前缀和 $P_i \ge 0$ 且总和 $P_n = 0$。

设选取的子序列下标为 $\{i_1, i_2, \dots, i_k\}$,循环右移后，新字符 $S'_{i_j} = S_{i_{(j-2 \bmod k) + 1}}$。 

对于任意前缀位置 $x$，设 $m$ 是满足 $i_m \le x$ 的最大索引。移位前后，前缀和 $P_x$ 的改变量 $\Delta P_x$ 为：

$$\Delta P_x = \sum_{j=1}^{m} (S'_{i_j} - S_{i_j})$$

代入移位关系 $S'_{i_1} = S_{i_k}, S'_{i_2} = S_{i_1}, \dots$ 继续化简：

$$\Delta P_x = (S_{i_k} - S_{i_1}) + (S_{i_1} - S_{i_2}) + \dots + (S_{i_{m-1}} - S_{i_m}) = S_{i_k} - S_{i_m}$$

由此可见，前缀和的改变量仅取决于 **子序列最后一位** 与 **当前前缀内最后一位** 的差值。

### 2.1 分类讨论

根据 $S_{i_k}$ 与 $S_{i_m}$ 的取值（ `(` 为 $+1$，`)` 为 $-1$），$\Delta P_x$ 有四种可能：

1. 前后均为 `(`：$1-1=0$无影响。
    
2. 前后均为 `)`：$-1 - (-1) = 0$，无影响。
    
3. 最后位是 `(`，替换了前缀内的 `)`。$1 - (-1) = 2$。前缀和增加，**安全**。
    
4. 最后位是 `)`，替换了前缀内的 `(`：$-1 - 1 = -2$。前缀和减少，**危险**。

**结论**：若子序列以 `)` 结尾，那么对于子序列中任何处于位置 $i_m$ 的 `(`，在区间 $[i_m, i_{m+1}-1]$ 及其后续受影响区间内，必须满足原前缀和 $P_x \ge 2$，以应对 $-2$。

### 2.2 统计

为了统计合法子序列，我们根据子序列结尾字符进行分类讨论。

#### 以 `(` 结尾

由于 $S_{i_k} = 1$，$\Delta P_x = 1 - S_{i_m}$ 永远 $\ge 0$，这类子序列必然合法。

对于位置 $i$，若 $S_i = ($，以它结尾的所有子序列（共 $2^{i-1}$ 个）均合法。

#### 以 `)` 结尾

设 `dp[i]` 为以位置 $i$ 结尾 的 结尾为 `)` 的合法子序列数。

$$
dp[i] = 1 + \sum_{S_j = )} dp[j] + \sum_{S_j = (, \text{safe}(j, i)} dp[j] \quad (j < i)
$$

其中 $\text{safe}(j, i)$ 的条件是：在区间 $[j, i-1]$ 之间，前缀和均 $\geq 2$。

- **预处理**：`nxt[j]` 表示从 $j$ 开始，第一个 $P_x < 2$ 的位置。
    
- **动态维护**：使用 `sumr` 维护所有结尾为 `)` 的贡献；使用 `suml` 维护所有结尾为 `(` 且目前安全（$i \le nxt[j]$）的贡献。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 3e5 + 5;
const int mod = 998244353;

ll dp[maxn];
ll sum[maxn], diff[maxn];
ll p2[maxn];
int nxt[maxn];
string s;
int n;

void init( )
{
    p2[0] = 1;
    for( int i = 1; i < maxn; ++ i ) p2[i] = ( p2[i - 1] * 2 ) % mod;
}

void solve( )
{
    cin >> n >> s;
    s = ' ' + s;

    for( int i = 0; i <= n + 2; ++ i ) dp[i] = diff[i] = 0;

    sum[0] = 0;
    for( int i = 1; i <= n; ++ i ) 
    {
        int cur = ( s[i] == '(' ? 1 : -1 );
        sum[i] = sum[i - 1] + cur;
    }

    nxt[n + 1] = n + 1;
    for( int i = n; i >= 1; -- i )
    {
        if( sum[i] <= 1 ) nxt[i] = i;
        else nxt[i] = nxt[i + 1];
    }

    ll ans = 0;
    ll suml = 0, sumr = 0;

    for( int i = 1; i <= n; ++ i )
    {
        suml = ( suml - diff[i] + mod ) % mod;
        dp[i] = ( 1 + suml + sumr ) % mod;

        if( s[i] == '(' ) 
        {
            ans = ( ans + p2[i - 1] ) % mod;
            suml = ( suml + dp[i] ) % mod;
            diff[nxt[i] + 1] = ( diff[nxt[i] + 1] + dp[i] ) % mod;
        }
        else 
        {
            ans = ( ans + dp[i] ) % mod;
            sumr = ( sumr + dp[i] ) % mod;
        }
    }

    cout << ans << '\n';
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    init( );
    int _t = 1;
    cin >> _t;
    while( _t -- ) solve( );
    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度分析**：$O(N)$。
    
- **碎碎念**：初见以为是 树上 的 区间 DP，毕竟是括号系列，但是从正则的性质分析，发现可以转化为 线性 DP 来进行求解。
    

**关联笔记**：[[线性DP]] | [[01_降维技巧#差分]]