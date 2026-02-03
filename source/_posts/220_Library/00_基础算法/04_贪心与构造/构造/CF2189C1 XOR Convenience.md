---
title: '[Leaf] [CF2189C1] XOR Convenience'
tags:
  - 策略/构造
  - 算法/位运算
  - 难度/P2
categories:
  - 220_Library
  - 00_基础算法
  - 04_贪心与构造
abbrlink: '90896309'
date: 2026-01-24 15:04:35
---
# [CF2189C1 - XOR Convenience](https://codeforces.com/contest/2189/problem/C1)

## 1. 题面梗概

**中译中**: 构造一个 $1, \dots, n$ 的排列 $p$，使得每个 $i \in [2, n-1]$，都存在一个 $j \in [i,n]$，满足 $p_i = p_j \oplus i$。

## 2. 逻辑推导

这个条件 $p_i = p_j \oplus i \iff p_i \oplus p_j = i$，我们要对每个 $i$ 找一对 $(p_i, p_j)$。

而因为只需要存在一个 $j$  满足条件，再注意到 $i \in [2,n-1], j \in [i,n]$，发现我们可以令 $j \to n \iff p_j = p_n$。

那么条件就变成了：对于所有的 $i \in [2, n-1]$，都有 $p_i \oplus p_n = i \iff p_i = i \oplus p_n$。

那么问题来了，$p_n$ 取什么值好呢？显然，对于异或这种位运算，只有一位的 `0` 和 `1` 绝对是首选，在本题条件下，就是设 $p_n = 1$ 了，完美符合条件。

那么对于 $i \in [2,n-1]$，直接令 $p_i = i \oplus 1$ ，最后找出没有被使用的数，放到 $p_1$ 即可。

## 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void solve( )
{
    int n;
    cin >> n;
    vector< int > ans( n + 1 );
    vector< bool > vis( n + 1, 0 );

    ans[n] = 1;
    vis[1] = 1;
    for( int i = 2; i <= n - 1; ++ i )
    {
        ans[i] = i ^ 1;
        vis[ans[i]] = 1;
    }

    int pos = 1;
    while( vis[pos] ) pos ++;
    ans[1] = pos;

    for( int i = 1; i <= n; ++ i )
    {
        cout << ans[i] << " ";
    }
    cout << '\n';
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

- **复杂度**: $O( n )$。
    
- **碎碎念**: 这个构造题，通常解法在于**减少变量**。通过观察，发现可以把 $p_j$ 固定为 $1$，这也是这个题的突破口。
        
- **关联笔记**: [[构造体系]]