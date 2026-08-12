---
title: 'ABC458D Chalkboard Median'
tags:
  - 数据结构/平衡树
  - 数据结构/动态中位数
categories:
  - 260_Records
  - Archive
abbrlink: 826ab114
date: 2026-05-16 00:00:00
---
# [D - Chalkboard Median](https://atcoder.jp/contests/abc458/tasks/abc458_d)

## 题意
刚开始有一个数 $X$，有 $Q$ 次查询，每次查询加入两个数 $A_{i}, B_{i}$，问当前 $2i + 1$ 个数的中位数。 

> $X, A_{i}, B_{i} \leq 1e9, Q \leq 2e5$

## 思路
动态维护中位数的问题，由于是动态的不好维护，我最开始想的是权值树状数组维护，二分查询，但是值域很大，但实际的值并不多，可以离散化处理，不过还是很麻烦（理论可行）。

想了想，还是祭出 `multiset` 这个基于平衡树的数据结构，由于插入元素之后，已有的迭代器不会失效，而每次最多加入两个元素，发现中位数只有三种情况，不变，左移一位，右移一位，最后分类讨论维护中位数迭代器即可。

> 注：赛后我注意到了 **对顶堆** 也可以实现这个维护。不过我这里就不展开了，不是因为我不会用。

## 代码部分
{% fold info @AcCode %}
```cpp
void solve( ) {
    int x, q;
    cin >> x >> q;

    multiset<int> s;
    auto mid = s.insert( x );

    for( int i = 1; i <= q; ++ i ) {
        int a, b;
        cin >> a >> b;
        int cur = *mid;
        s.insert( a ), s.insert( b );
        if( a < cur && b < cur ) mid --;
        else if( a >= cur && b >= cur ) mid ++;
        cout << *mid << '\n';
    }
}
```
{% endfold %}
