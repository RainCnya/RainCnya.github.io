---
title: '[Leaf] [CF2183A] Binary Array Game'
tags:
  - 策略/构造
  - 数学/博弈
  - 难度/P1
categories:
  - 220_Library
  - 70_博弈论
  - 71_公平博弈
abbrlink: 69ee8cc
date: 2026-01-14 00:00:00
---

# [CF2183A Binary Array Game](https://codeforces.com/contest/2183/problem/A)

## 1. 题面梗概

给定一个 $n$ 个数的 $0/1$ 数组 $a$。

每次操作可以修改一个区间 $[l,r]$，若全是 $1$，则全删了改 $0$，改成 $1$。

如果最后一个数为 $0$，则 `Alice` 获胜，反之则 `Bob` 获胜。

## 2. 逻辑推导

反过来思考，如果最后一次修改完为 `0`，那么修改前为 `1...1`。

所以如果序列里全是 $1$，`Alice` 只要操作 $[1,n]$ 即可获胜。

注意到最后一次操作的区间一定包含 $a_1, a_n$ 中的至少一个数。

我们分类讨论一下这几种情况：

- 若 $a_1 = 1$，则 `Alice` 直接操作 $[2,n]$ 即可，因为 $a_{2 \to n}$ 中包含至少一个 $0$。 
- 若 $a_n = 1$，则 `Alice` 直接操作 $[1,n-1]$ 即可，同理。
- 若 $a_1 = 0, a_n = 0$，则 `Alice` 没办法同时对 $a_1,a_n$ 处理，所以这种情况 `Bob` 获胜。

**总结**：若 $a_1 = 1 \lor a_n = 1$，则 `Alice` 获胜，反正 `Bob` 获胜。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 100 + 10;
int a[maxn];
int n;

void solve( )
{
    cin >> n;

    for( int i = 1; i <= n; ++ i )
    {
        cin >> a[i];
    }

    if( a[1] == 1 || a[n] == 1 ) cout << "Alice" << '\n';
    else cout << "Bob" << '\n';
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
- **碎碎念**：最开始看着`Alice Bob` 想了半天博弈论，最开始准备用 `SG 函数`异或和的。最后发现是很简单的构造性博弈问题。
- **关联笔记**： [[71_公平博弈]]]
