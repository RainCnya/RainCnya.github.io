---
title: '[Leaf] [CF2195D] Absolute Cinema'
tags:
  - 算法/前缀差分
  - 数学/推公式
  - 难度/P3
categories:
  - 220_Library
  - 00_基础算法
  - 01_降维技巧
abbrlink: '49403141'
date: 2026-02-16 13:37:50
---

# [CF2195D - Absolute Cinema](https://codeforces.com/contest/2195/problem/D)

## 1. 题面梗概

**中译中**：给定 $n$ 个位置的函数值，其中 $a_i$ 是隐藏的整数序列。已知所有的 $f(1 \dots n)$，求原序列 $a$。
$$
f(x) = \sum_{i=1}^n a_i |i - x|
$$

-   $2 \leq n \leq 3 \cdot 10^5$
-   $-10^{14} \leq f(i) \leq 10^{14}$

### 2. 逻辑推导

这个题看起来就不是很友善，但绝对值的核心在于 分段线性。我们可以先把柿子展开看看：

$$
f(x) = \sum_{i=1}^{x}(a_{i}(x - i)) + \sum_{i=x + 1}^{n}(a_{i}(i - x)) 
$$

既然是 **线性** 的，我们可以先差分看看性质。

$$
df(x) = f(x + 1) - f(x) = \sum_{i=1}^{x}(a_{i}(x + 1 - i)) + \sum_{i=x+1}^{n}(a_{i}(i - x - 1)) - \sum_{i=1}^{x}(a_{i}(x - i)) + \sum_{i=x+1}^{n}(a_{i}(i - x)) 
$$

化简后得到柿子如下：记 $S_{x} = \sum_{i=1}^{x}a_{i}$。

$$
df(x) = \sum_{i=1}^{x}a_{i} - \sum_{i=x+1}^{n}a_{i} = S_{x} - (S_{n} - S_{x}) = 2S_{x} - S_{n}
$$
这里我们再差分一次（因为我们得到了 $2S_{x} - S_{n}$ 这个前缀和关系，差分可以还原回正常序列）

$$
ddf(x) = df(x) - df(x - 1) = (2S_{x} - S_{n}) - (2S_{x-1} - S_{n}) = 2(S_{x} - S_{x-1}) = 2a_{x}
$$

然后我们就得到了$a_{x}$ 和 $ddf$ 函数的关系了，至于两端的 $a_{1}$ 和 $a_{n}$ 怎么求呢？我们可以从 $df$ 函数的端点出发。

$$
df(1) = 2S_{1} - S_{n} = 2a_{1} - S_{n} 
$$
$$
df(n - 1) = 2S_{n - 1} - S_{n} = 2(S_{n} - a_{n}) - S_{n} =  S_{n} - 2a_{n}
$$

至于这个 $S_{n}$ 怎么求？我们可以从 $f$ 函数的端点出发。

$$
f(1) = \sum_{i=1}^n a_i (i - 1) \quad
f(n) = \sum_{i=1}^n a_i (n - i) \quad
$$
那么就可以得到这个柿子了：
$$
f(1) + f(n) = \sum_{i=1}^{n}( a_{i} \cdot ( n - 1 ) ) = S_{n} \cdot ( n - 1 )
$$

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 3e5 + 5;

ll f[maxn];
ll df[maxn];
ll ddf[maxn];
ll a[maxn];
int n;

void solve( )
{
    cin >> n;
    for( int i = 1; i <= n; ++ i ) cin >> f[i];

    ll Sn = ( f[1] + f[n] ) / ( n - 1 );

    for( int i = 1; i <= n; ++ i ) df[i] = f[i + 1] - f[i];

    for( int i = 1; i <= n; ++ i ) ddf[i] = df[i] - df[i - 1];

    a[1] = ( Sn + df[1] ) / 2;

    for( int i = 2; i <= n - 1; ++ i ) a[i] = ddf[i] / 2;

    a[n] = ( Sn - df[n - 1] ) / 2;
    
    for( int i = 1; i <= n; ++ i ) cout << a[i] << " ";
    cout << '\n';
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

- **复杂度分析**：$O(n)$。
    
- **碎碎念**：这就是道数学题，差分在连续数学上就是求导。
	
- **关联知识点**：[[01_降维技巧#前缀和与差分]]]