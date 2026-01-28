---
title: '[Leaf] [CF2163B] Siga ta Kymata'
tags:
  - 策略/构造
  - 字符串/基础
  - 难度/P2/提高
categories:
  - 10_Library
  - 00_基础算法
  - 04_贪心与构造
abbrlink: 17d02d16
date: 2026-01-19
---
# [CF2163B - Siga ta Kymata](https://codeforces.com/problemset/problem/2163/B)

## 1. 题面梗概

给定一个**排列** $p$。你可以进行最多 5 次操作：选定 $l,r$，将索引在 $(l,r)$ 之间且其值在 $(P_l,P_r)$ 之间的所有位置染色。现在给定一个目标染色需求串，要求写出一个合法的 $5$ 步以内的构造方案。

## 2. 逻辑推导

观察公式 $l < i < r$ 且 $min(p_l,p_r) < p_i < max(p_l,p_r)$。这意味着：
- 索引为 $1,n$ 的点无法作为中间 $i$ 被染色。
- 值为 $1,n$ 的点无法在值域开区间内被染色。

设 $P_{pos_1} = 1, P_{pos_n} = n$，我们把索引范围 $(1, n)$ 拆分为三段 $(1, pos_1),(pos_1, pos_n), (pos_n, n)$。

1. **中间区间** $(pos_1,pos_n)$ ：

	- **操作**：$pos_1, pos_n$。
	- **覆盖**：由于 $P_{pos_1} = 1, P_{pos_n} = n$，值域区间为 $(1,n)$ ，那就是 $100\%$ 覆盖了。
	
2. **左边区间** $(1,pos_1)$：

	- **策略**: 利用索引 $1$ 和值域 $1$ 两个端点进行分层。
    - **操作 A**: $(1, pos_1)$。覆盖 $p_i \in (1, p_1)$ 的点。
    - **操作 B**: $(1, pos_n)$。覆盖 $p_i \in (p_1, n)$ 的点。
        
3. **右侧区间** $(pos_n, n)$:
    
	- **策略**: 同理，利用索引 $n$ 和值域 $n$。
    - **操作 C**: $(pos_n, n)$。覆盖满足 $p_i \in (p_n, n)$ 的点。
    - **操作 D**: $(pos_1, n)$。覆盖满足 $p_i \in (1, p_n)$ 的点。

综上所述，对于任何情况都可以通过五次操作完成染色，除了这几个点本身不能染。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair<int, int>;

const int maxn = 2e5 + 5;

int a[maxn];
int n;

void solve( )
{
    cin >> n;
    int pos1 = 0, posn = 0;
    for( int i = 1; i <= n; ++ i )
    {
        cin >> a[i];
        if( a[i] == 1 ) pos1 = i;
        if( a[i] == n ) posn = i;
    }

    string s;
    cin >> s;
    s = ' ' + s;

    if( s[1] == '1' || s[n] == '1' || s[pos1] == '1' || s[posn] == '1' )
    {
        cout << "-1" << '\n';
        return;
    }

    cout << 5 << '\n';
    cout << 1 << " " << pos1 << '\n';
    cout << 1 << " " << posn << '\n';
    cout << pos1 << " " << n << '\n';
    cout << posn << " " << n << '\n';
    cout << min( pos1, posn ) << " " << max( pos1, posn ) << '\n';
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
- **碎碎念**: 果然关于构造题，还得是得多发挥发挥思维去构造啊。想到 $pos_1$ 和 $pos_n$。这题就差不多解决了，还有一个切入点是**排列**。
- **关联笔记**: [[构造体系]]