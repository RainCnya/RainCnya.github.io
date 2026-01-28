---
title: '[Leaf] [ZJ2022L] Candy Machine'
tags:
  - 策略/贪心
  - 单调性/双指针
  - 难度/P1/提高-
categories:
  - 10_Library
  - 00_基础算法
  - 01_降维技巧
abbrlink: 3cde2f28
date: 2026-01-24 21:19:19
---
# [ZJ2022L - Candy Machine](https://codeforces.com/gym/103687/problem/L)

## 1. 题面梗概

给定 $N$ 个糖果，第 $i$ 个糖果甜度为 $a_i$，可以取任意子集的糖果。限制条件是，选取完某个糖果子集 $S$ 后，设平均甜度为 $X$，所有甜度 **严格大于** $X$ 的糖果可以得到。问：最多可以获得多少糖果。

## 2. 逻辑推导

### 2.1 切入点

切入点是这个：“平均甜度 $X$”，如果我们想取得更多的糖果，那么最简单的想法就是降低平均值 $X$。接着分析，如果想要平均值小，那么子集中不属于我的“糖果”的甜度应该越小越好。

那么对于一个固定大小为 $r$ 的子集，如果要让满足条件的糖最多，显然就是取甜度最小的 $r$ 颗糖。

为什么？如果把其中某颗糖换成一个更甜的糖果，子集的平均值 $X$ 只会变大，对于原本这个子集来说，满足条件的糖数量显然不会增加。

### 2.2 建模

我们按照贪心将甜度从小到大排序：$a_1 \leq a_2 \leq \cdots \leq a_n$，枚举每一个前缀子集，然后统计更新答案即可。

这样的复杂度肯定不正常，会 TLE，接着观察，我们发现满足条件的永远是，当前前缀子集的后一部分。

那么不妨用双指针维护这个区间计数，随着 $r$ 的增加，$Avg_r$ 肯定是单调递增的，那么第一个满足 $a_l > Avg_r$ 的下标 $l$ 也会随之向右移动，因此维护这个 $l$ 指针即可。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair<int, int>;

const int maxn = 1e6 + 5;

ll a[maxn];
ll s[maxn];
int n;

void solve( )
{
    cin >> n;
    for( int i = 1; i <= n; ++ i ) 
    {
        cin >> a[i];
    }

    sort( a + 1, a + n + 1 );

    for( int i = 1; i <= n; ++ i )
    {
        s[i] = s[i - 1] + a[i];
    }

    ll ans = 0;
    ll l = 1;
    for( ll r = 1; r <= n; ++ r )
    {
        while( l < r && a[l] * r <= s[r] ) l ++;
        ans = max( ans, r - l + 1 );
    }
    cout << ans << '\n';
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int _t = 1;
    // cin >> _t;
    while( _t -- )
    {
        solve( );
    }
    return 0;
}
```
{% endfold %}

## 4. 复盘
- **复杂度**: $O( n \log n )$

- **碎碎念**: 注意到数据规模 $N \leq 1e6$，所以线性的双指针优化是必然的。当然这里还有一个小trick，在移动指针的时候，把浮点运算转换为整数运算，可以避免精度问题。

- **关联笔记**: [[双指针]] | [[前缀和与差分]] | [[贪心体系]]