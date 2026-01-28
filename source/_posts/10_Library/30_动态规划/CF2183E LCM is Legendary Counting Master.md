---
title: '[Leaf] [CF2183E] LCM is Legendary Counting Master'
tags:
  - DP/计数
  - 数论
  - 难度/P3/省选
categories:
  - 10_Library
  - 30_动态规划
abbrlink: 2d519ade
date: 2026-01-14
---
# [CF2183E LCM is Legendary Counting Master](https://codeforces.com/contest/2183/problem/E)

## 1. 题面梗概

给定一个长度为 $n$ 的数组 $a$，以及 $m$，$a$ 中所有的元素都在 $[0,m]$ 范围内。

然后用 $[1,m]$ 的整数替换 $a$ 中的所有 $0$，答案对 $998,244,353$ 取模。

限制条件：$a_1 < a_2 < \dots < a_n$ 
同时 $\frac{1}{lcm(a_1,a_2)} + \frac{1}{lcm(a_2,a_3)} + \dots + \frac{1}{lcm(a_n,a_1)} \geq 1$。  

## 2. 逻辑推导

### 数学推导

题目给了 `lcm`，同时又是一个计算方案数的问题，所以我打算从计数 DP 入手。

先考虑拆这个 $\frac{1}{lcm(a_i,a_i+1)}$，由 $lcm(a,b) = \frac{a \times b}{gcd(a, b)}$ ，而 $gcd(a,b) \leq b - a$。

$$
\frac{1}{lcm(a_i,a_i+1)} = \frac{gcd(a_i, a_{i+1})}{a_i \cdot a_{i+1}} \leq \frac{a_{i+1}-a_{i}}{a_i \cdot a_{i+1}} = \frac{1}{a_i} - \frac{1}{a_{i+1}}
$$

似乎好像发现了什么规律，我们再把整个柿子代入呢？

$$
sum = (\frac{1}{a_1} - \frac{1}{a_2}) + (\frac{1}{a_2} - \frac{1}{a_3}) + \dots + (\frac{1}{a_n-1} - \frac{1}{a_n}) + (\frac{gcd(a_1,a_n)}{a_1 \times a_n})
$$

接下来是最关键的一步。$gcd(a,b) \leq a$，所以把最后一项换成 $\frac{a_1}{a_1 \times a_n}$
然后就可以愉快的化简啦。

$$
sum = \frac{1}{a_1} \leq 1
$$
上柿取等的充要条件是：对于 $1 \leq i < n$，满足 $gcd(a_i,a_{i+1}) = a_{i+1} - a_i$,且 $a_1 = 1$。那么题目就转化为了求满足条件的数列个数。

继续分析：$gcd(x,y) = y - x$ 相当于 $y - x$ 是 $x$ 的因数，即$\exists d | x ,\ y = x + d$。

### DP 设计

如果已经有思路了，这下面的 DP 就不用看了。

**状态定义**：`dp[i][j]` 表示填好前 $i$ 个位置，且第 $i$ 个位置数值为 $j$ 的方案数。

**初始化**：若 $a_1 > 0$ 则答案为 $0$，反之 $dp[1][1] = 1$。

**转移方程**：$k$ 是上一个位置的值，$d$ 是 $k$ 的约数。
$$
dp[i][j] = \sum_{d|x,p=j-d}(dp[i-1][p])
$$

但是因为存在多组样例测试，所以需要用**滚动数组**优化，不然每次都得初始化，复杂度会爆炸！！！

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxm = 3000 + 5;
const int mod = 998244353;

vector< int > divs[maxm];
int dp[2][maxm];
int a[maxm];
int n, m;


void init( )
{
    for( int i = 1; i < maxm; ++ i )
    {
        for( int j = i * 2; j < maxm; j += i )
        {
            divs[j].push_back(i);
        }
    }
}


void solve( )
{
    cin >> n >> m;

    for( int i = 1; i <= n; ++ i )
    {
        cin >> a[i];
    }

    if( a[1] > 1 )
    {
        cout << 0 << '\n';
        return;
    } 

    for( int j = 0; j <= m; ++ j )
    {
        dp[0][j] = dp[1][j] = 0;
    }

    dp[1][1] = 1;

    for( int i = 2; i <= n; ++ i )
    {
        int curr = i % 2;
        int prev = ( i - 1 ) % 2;

        for( int j = 0; j <= m; ++ j ) dp[curr][j] = 0;
        
        int st = i, ed = m;
        if( a[i] != 0 ) st = ed = a[i];

        for( int j = st; j <= ed; ++ j )
        {
            for( int d : divs[j] )
            {
                int p = j - d;
                if( dp[prev][p] == 0 ) continue;
                dp[curr][j] = ( dp[curr][j] + dp[prev][p] ) % mod;
            } 
        }
    }
    
    int ans = 0;
    int idx = n % 2;
    for( int j = 1; j <= m; ++ j )
    {
        ans = ( ans + dp[idx][j] ) % mod;
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
    while( _t -- )
    {
        solve( );
    }
    return 0;
}
```
{% endfold %}

## 4. 复盘
- **复杂度**： $O( N \times M \log M)$
- **碎碎念**：又是我熟悉的计数 DP 环节！这题当时卡在最后10min才推出来公式，然后就是比较常规的 DP 处理了，注意一些细节即可。
- **关联笔记**: [[]