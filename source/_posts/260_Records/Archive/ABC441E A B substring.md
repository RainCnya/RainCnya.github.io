---
title: '[Leaf] ABC441E A > B substring'
tags:
  - 字符串
  - 数据结构/树状数组
categories:
  - 260_Records
  - Archive
abbrlink: 97a015b8
date: 2026-07-10 00:00:00
updated: 2026-07-10 00:00:00
---

# [ABC441E - A > B substring](https://atcoder.jp/contests/abc441/tasks/abc441_e)

## 1. 题意

给定一个由 $A, B, C$ 组成的字符串，问有多少 $A$ 的数量多于 $B$ 的数量的子串。

> $N \le 5e5$

## 2. 思路

首先由一个显然的结论，一个长度为 $N$ 的字符串一共有 $\frac{N(N+1)}{2}$ 个子串。

我们考虑 A B C 三个字母对答案的贡献，要求 A > B 的子串，那么 C 无影响。不妨设 `A : +1, B : -1, C : 0`，由于子串一定是连续的区间，所以 A 的数量大于 B 的数量的子串，也就转化为了 —— 区间和大于 0 的子区间个数。

既然要求区间和，不难想到用前缀和来优化，对于区间 $[l, r]$ 来说，区间和为：$S_{r} - S_{l-1} > 0 \iff S_{r} > S_{l-1}$，也就是说对于每个 $l$ 来说，我们都去查询有多少个 $r$ 满足这个要求。

注意到这是一个类似 “顺序对” 的关系，和逆序对恰好相反，于是我们就可以用权值树状数组或者归并排序来求和。我这里采用树状数组来解决。

## 3. 代码部分

{% fold info @AcCode %}
```cpp
ll read( ) { /* 模板代码略 */ }

struct BIT { /* 模板代码略 */ } bit;

int offset = maxn;

void solve( ) {
    int n = read( );
    string s;
    cin >> s;
    s = " " + s;
    bit.init( 2 * offset );
    ll ans = 0;
    int cnt = 0;
    bit.add( offset, 1 );

    for( int i = 1; i <= n; ++ i ) {
        if( s[i] == 'A' ) cnt ++;
        else if( s[i] == 'B' ) cnt --;
        ans += bit.ask( cnt + offset - 1 );
        bit.add( cnt + offset, 1 );
    }
    cout << ans << '\n';
}
```
{% endfold %}

## 4. 复盘

- **复杂度分析**：$O( N \log( N ) )$，瓶颈在于树状数组的单点修改与区间查询。

- **转化点**：将 "A 比 B 多" 的这种相对关系的区间统计，转化为 +1 和 -1，从而用数值求和简化判断。 

- **易错点**：树状数组无法直接处理负数索引，所以需要开一个 `offset` 偏移量，防止下标越界。

- **关联笔记**：[[树状数组]]
