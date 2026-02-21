---
title: '[Leaf] [CF2183C] War Strategy'
tags:
  - 策略/贪心
  - 难度/P2
categories:
  - 220_Library
  - 00_基础算法
  - 04_贪心与构造
abbrlink: f471a0ac
date: 2026-01-14 00:00:00
---
# [CF2183C War Strategy](https://codeforces.com/contest/2183/problem/C)

## 1. 题面梗概

一条有 $n$ 个基地的线段，你的基地在第 $k$ 个节点，每天你的基地都会刷新一个人。

每天你可以选择一个基地，以及对应基地的任意数量的士兵，向左或者向右一个基地移动。

求 $m$ 天后，你的士兵最多覆盖多少个基地。

## 2. 逻辑推导

首先最终 $m$ 天后，驻扎士兵的基地一定是一个包含 $k$ 的区间，证明略。

那么我们假设这段区间为 $[k-a,k+b]$。 $0 \leq a \leq k-1, 0 \leq b \leq n - k$  。

所以，如果我们前 $a$ 天不动，那么第 $a$ 天大本营就有 $a$ 个士兵。
然后我们把 $a$ 个士兵移到 $k-1$， $a-1$ 个士兵移到 $k-2$。以此类推。
接着再把 $b$ 个士兵向右移动，可能要等，也可能不等。

因为我们至少需要 $a + b$ 天来获得额外的 $a + b$ 个士兵。
综上至少需要 `a + b + max( a, b ) - 1;` 天。

我们考虑**贪心**求解。如果 $k - 1 < n - k$，我们把 $k \to n - k + 1$。
我们定义两个变量`a = 0 | b = 0`，然后不断轮流增加`a | b`，统计最大值答案即可。 

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 2e5 + 5;

int n, m, k;

void solve( )
{
    cin >> n >> m >> k;

    ll l = k - 1;
    ll r = n - k;

    if( l > r ) swap( l, r );

    ll a = 0, b = 0;
    while( 1 )
    {
        bool flag = 0;
        if( b < r && a + (b + 1) + max(a, b + 1) - 1 <= m ) 
            ++ b, flag = 1;
        if( a < l && (a + 1) + b + max(a + 1, b) - 1 <= m ) 
            ++ a, flag = 1;
        if( !flag ) break;
    }

    cout << a + b + 1 << '\n';
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
- **复杂度**: $O( N )$
- **碎碎念**: 嗯……这题我最开始算了半天，我以为是数学题，算出公式来直接出答案，没想到最后还是类似暴力的求解。
- **关联笔记**: [[贪心]]