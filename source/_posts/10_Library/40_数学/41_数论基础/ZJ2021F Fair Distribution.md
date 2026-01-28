---
title: '[Leaf] [ZJ2021F] Fair Distribution'
tags:
  - 数论/整除
  - 策略/分块
  - 难度/P2/提高
categories:
  - 10_Library
  - 40_数学
  - 41_数论基础
abbrlink: f34a1508
date: 2026-01-22 00:00:00
---
# [ZJ2021F - Fair Distribution](https://codeforces.com/gym/103055/problem/F)

## 1. 题面梗概

**中译中**: 有两个数 $n, m$，目标是让 $m$ 是 $n$ 的倍数，求最小操作次数。

操作：使 $n \to n-1$，或  $m \to m + 1$，但是 $n \neq 0$。

## 2. 逻辑推导

注意到 $n$ 只能减小，而 $m$ 只能增大。

> 不妨设 $1 \leq n' \leq n$ 为满足条件的一组解，那么 $m' = \lceil \frac{m}{n'} \rceil \times n'$。

那么函数为 $f(n') = (n - n') + (m' - m) = n - m + ( \lceil \frac{m}{n'} \rceil - 1) n'$。 

> 继续推导，由于**上取整**的性质 $\lceil \frac{m}{n'} \rceil = \lfloor \frac{m-1}{n'} \rfloor + 1$。

那么函数为 $f(n') = n - m + \lfloor \frac{m-1}{n'} \rfloor \times n'$。

> 设 $m1 = m + 1, val = \lceil \frac{m1}{m'} \rceil$，

那么函数为 $f(n') = n - m + val \times n'$。

那这就是一个经典的**整除分块**模型了。 

当然，观察 $n, m \leq 1e8$，其实就是在暗示使用 $\sqrt(N)$ 的算法？

在 $n' \in [l,r]$ 且 $\lfloor \frac{m1}{n'} \rfloor$ 恒为 $val$ 的区间内，

若 $val \geq 0$，则 $f(n')$ 随 $n'$ 单调不减，

所以我们只需要区每个区间最小的 $n'$ 检验即可。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair<int, int>;

const int maxn = 2e5 + 5;
const ll inf = 1e18;

ll n, m;

void solve( )
{
    cin >> n >> m;

    if( m % n == 0 )
    {
        cout << 0 << '\n';
        return ;
    }
    if( m == 1 )
    {
        cout << n - 1 << '\n';
        return ;
    }

    ll ans = inf;
    ll m1 = m - 1;
    for( ll l = 1, r; l <= n; l = r + 1 )
    {
        ll val = m1 / l;
        if( val == 0 ) r = n;
        else r = min( n, m1 / val );
		
        // 代价函数：n - m + val * n'
        ll cost = n - m + val * l;
        ans = min( ans, cost );
        
        if( val == 0 ) break;
    }

    cout << ans << '\n';
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
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

- **复杂度**: $O( T \sqrt{M} )$。
    
- **碎碎念**: 将 $\lceil m/n' \rceil$ 转化为 $\lfloor (m-1)/n' \rfloor + 1$ 是处理上取整分块的 小 Trick 。
        
- **关联笔记**: [[41_数论基础]]