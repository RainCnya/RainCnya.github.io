---
title: '[Leaf] [CF2183B] Yet Another MEX Problem'
tags:
  - 策略/贪心
  - 策略/构造
  - 难度/P2
categories:
  - 220_Library
  - 00_基础算法
  - 04_贪心与构造
abbrlink: 1e1a52f3
date: 2026-01-14 00:00:00
---
# [CF2183B Yet Another MEX Problem](https://codeforces.com/contest/2183/problem/B)

## 1. 题面梗概（翻译）

给了一个长度为 $n$ 的数组 $a$，以及 $k$。

需要进行 $n - k + 1$ 次操作，计算出剩余 $k - 1$ 个序列的最大 $MEX$。

操作为：找到大小为 $k$ 的窗口，使得该窗口的 $MEX$ 最大，然后删去其中一个数。

\* MEX (minimum excluded)，最小排除数。在集合 $C$，$c_1,c_2,\dots,c_k$ 中不出现的非负整数 $x$。

> 举个例子 `C = [0, 1, 3, 5]` $MEX(C) = 2$。

## 2. 逻辑推导

注意到最后只剩下 $k - 1$ 个数字，那么一个长度为 $k$ 的窗口中，哪些数字是无效的呢？

答案是 $\geq k-1$ 或者 重复 的数字是无效的。

由于最后只剩下了 $k - 1$ 个数，因此在每个区间内都能找到一个数删除。

结论：答案为 `ans = min( mex(a), k - 1);`

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 2e5 + 50;

int cnt[maxn];
int a[maxn];
int n, k;

void solve( )
{
    cin >> n >> k;

    for( int i = 0; i <= n + 1; ++ i )
    {
        cnt[i] = 0;
    }
    
    for( int i = 1; i <= n; ++ i )
    {
        cin >> a[i];
        cnt[ a[i] ] ++;
    }

    int ans = 0;

    while( cnt[ans] > 0 ) ans ++;

    cout << min( ans, k - 1 ) << '\n';
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
- **复杂度**： $O( \sum(n) )$
- **碎碎念**：怎么说呢？这题我最开始用树状数组，打算模拟算每一步，结果写了半天 WA 了，没招，只能另想构造大法力。
- **关联笔记**： [[贪心体系]] | [[构造体系]]