---
title: 'ABC444D Many Repunit Sum'
tags:
  - 模拟/高精度
  - 方法/前缀和
categories:
  - 260_Records
  - Archive
abbrlink: cc33cdb5
date: 2026-02-07 00:00:00
---
# [D - Many Repunit Sum](https://atcoder.jp/contests/abc444/tasks/abc444_d)

## 1. 题意梗概

给定 $N$ 个整数 $A_i$，对于每个 $A_i$，定义 $B_i$ 为由 $A_i$ 个 `1` 组成的整数（例如 $A_i=3 \to B_i=111$）。求 $\sum_{i=1}^{N} B_i$ 的值。

## 2. 逻辑推导

最直接的想法就是直接加起来，然后输出答案。但是这题麻烦就麻烦在 $A_i \leq 2 \times 10^5$，这个长度的数字 `__int128` 都存不下，高精度启动。

注意到 $A_i$ 表示前 $A_i$ 位都是 `1`，那我们就可以先统计每个长度出现的次数 `cnt[i]`。再跑一遍后缀和 `sum[i]` 表示长度 $\geq i$ 的数字个数。

接着模拟高精度加法模拟处理进位即可。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 2e5 + 50;

int A[maxn];
int cnt[maxn];
int sum[maxn];
int n;

void solve( )
{
    cin >> n;
    
    int maxa = -1;
    for( int i = 1; i <= n; ++ i )
    {
        int a;
        cin >> a;
        maxa = max( maxa, a );
        cnt[a] ++;
    }

    for( int i = maxa; i >= 1; -- i )
    {
        sum[i] = sum[i+1] + cnt[i];
    }

    int len = maxa;
    int carry = 0;
    for( int i = 1; i <= len; ++ i )
    {
        ll cur = sum[i] + carry;
        A[i] = cur % 10;
        carry = cur / 10;
        if( i == len && carry > 0 ) len ++;
    }

    for( int i = len; i >= 1; -- i )
    {
        cout << A[i];
    }

}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    solve( );
    return 0;
}
```
{% endfold %}
