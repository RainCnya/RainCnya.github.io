---
title: '[Leaf] [CF2162E] Beautiful Palindromes'
tags:
  - 策略/构造
  - 难度/P2/提高
categories:
  - 10_Library
  - 00_基础算法
  - 04_贪心与构造
abbrlink: d212ef75
date: 2026-01-19
---
# [CF2162E - Beautiful Palindromes](https://codeforces.com/problemset/problem/2162/E)

## 1. 题面梗概

**中译中**: 给定一个长度为 $n$ 的数组 $a$，你需要向其末尾追加 $k$ 个范围在 $[1,n]$ 的数。目标是使得最终数组中的**回文子数组**的数量最少。

## 2. 逻辑推导

从**回文串**的性质入手：
- 长度为 $1$ ：`x` | 长度为 $2$ ：`xx`  | 长度为 $3$ ：`xxx, xyx` | 长度为 $4$ ：`xxxx,xyyx`

所以我们只需要构造任意连续三个数都不同，那么就不会产生任意一个长度 $> 1$ 的回文。

题目限定 $n \geq 3$，我们一定能找到三个互不相同的数 ${x,y,z}$ 形成循环。

- **Case 1： $a$ 是排列**。直接取末尾三个数即可 ${a_n,a_{n-1},a_{n-2}}$。
- **Case 2：$a$ 不是排列**。那就意味着有一个数从未出现过，令其为 $x$，同时令 $z = a_n$，那么我们只需要再找出一个 $y \neq x,z$ 即可。 

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair<int, int>;

const int maxn = 2e5 + 5;
int cnt[maxn];
int a[maxn];
int n, k;

void solve( )
{
    cin >> n >> k;

    for( int i = 1; i <= n; ++ i )
    {
        cnt[i] = 0;
    }

    for( int i = 1; i <= n; ++ i )
    {
        cin >> a[i];
        cnt[a[i]] ++;
    } 

    int x = -1;
    for( int i = 1; i <= n; ++ i )
    {
        if( cnt[i] != 0 ) continue;
        x = i;
        break;
    }

    vector< int > res;

    if( x == -1 )
    {
	    // Case 1 排列
        int tmp[3] = {a[n - 2], a[n - 1], a[n]};
        for( int i = 0; i < k; ++ i )
        {
            res.push_back( tmp[i % 3] );
        }
    }
    else
    {
	    // Case 2 非排列
        int z = a[n];
        int y = -1;

        for( int i = 1; i <= n; ++ i )
        {
            if( i == x || i == z ) continue;
            y = i;
            break;
        }

        int tmp[3] = {x, y, z};
        for( int i = 0; i < k; ++ i )
        {
            res.push_back( tmp[i % 3] );
        }
    }

    for( int x : res )
    {
        cout << x << " ";
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
- **复杂度**: $O( N + K )$
- **碎碎念**: 构造题~怎么又是构造题？本题考察了回文串的构造，不算很难，想到了就会写，题目给的 $n \geq 3$ 也很诱人。
- **关联笔记**: [[构造体系]]