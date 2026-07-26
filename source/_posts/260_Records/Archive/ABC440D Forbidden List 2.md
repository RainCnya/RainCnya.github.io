---
title: 'ABC440D Forbidden List 2'
tags:
  - algorithm/记录
  - 策略/二分
categories:
  - 260_Records
  - Archive
abbrlink: 7f795164
date: 2026-07-06 00:00:00
updated: 2026-07-06 00:00:00
---

# [ABC440D - Forbidden List 2](https://atcoder.jp/contests/abc440/tasks/abc440_d)

## 1. 题意

给定一个长度为 $N$ 的整数列表 $A$，其中所有 $A_i$ 互不相同。

对于每个询问 $(X,Y)$，要求在所有大于等于 $X$ 且不在列表 $A$ 中的整数里，找到第 $Y$ 小的数。

> $N,Q \le 3\times 10^5$，$1\le A_i,X,Y\le 10^9$。

## 2. 思路

这个数据规模，直接从 $X$ 开始枚举肯定会 TLE，所以我的第一反应是二分答案。

对于一个整数 $v$ 来说，设 $f(v) = v - |\{ a_{i} \mid a_{i} \le v \}|$ 表示不超过 $v$ 的正整数中，有多少个整数不在 $A$ 数组中。

如果直接二分答案 $ans$，那么对于询问 $(X, Y)$，需要找到最小的 $ans$，满足区间 $[X, ans]$ 中至少有 $Y$ 个缺失数，也就是 $f(ans) - f(X - 1) \ge Y$。

这个做法是可行的，但还可以继续优化。继续观察这个式子可以发现，每次询问真正需要的并不是区间本身，而是缺失数在全体正整数中的排名。

设小于 $X$ 的缺失数的个数为 $miss$，那么大于等于 $X$ 的第 $Y$ 个缺失数，就等价于全体正整数中的第 $miss + Y$ 个正整数。

因此对于询问 $(X, Y)$，先计算 $k = miss + Y$，然后就把问题变成了：求全体正整数中第 $k$ 个缺失数。

将 $A$ 排序后，考虑第 $i$ 个已有数字 $a_i$。

在 $1$ 到 $a_i$ 之间，一共有 $a_i$ 个正整数，其中有 $i$ 个数出现在列表 $A$ 中，所以不超过 $a_{i}$ 的缺失数数量为：$a_i-i$，我们将其记为 $b$ 数组：$b_{i} = a_{i} - i$。

由于 $a_i$ 严格递增，有：

$$  
b_{i+1}-b_i=(a_{i+1}-(i+1))-(a_i-i)=a_{i+1}-a_i-1\ge 0  
$$

所以数组 $b$ 是单调不降的，可以对它进行二分。

对于一次询问 $(X,Y)$，先在 $A$ 中找到第一个满足 $a_{posx}\ge X$ 的位置，记为 posx。

由于我的数组采用 $1$ 下标，所以小于 $X$ 的已有数字个数为 $posx-1$，小于 $X$ 的正整数总数为 $X-1$。

因此小于 $X$ 的缺失数个数为：$miss = (X - 1) - (posx - 1) = X - posx$。

目标就是全体正整数中的第：$k = miss + Y$ 个缺失数。

接下来在 $b$ 中找到第一个满足 $b_{pos}\ge k$ 的位置，记为 pos：

因为 $b_{pos}$ 表示不超过 $a_{pos}$ 的缺失数数量，所以第 $k$ 个缺失数一定在 $a_{pos-1}$ 到 $a_{pos}$ 之间。

设答案为 $ans$，在 $1$ 到 $ans$ 中，一共有：$k$ 个缺失数；$pos-1$ 个出现在列表 $A$ 中的数。

所以：$ans = k + (pos - 1)$

最终复杂度为：$\mathcal{O}(N \log(N) + Q \log(N))$。

## 3. 代码部分

{% fold info @AcCode %}

```cpp
ll read( ) { /* 模板代码略 */ }

ll a[maxn], b[maxn];

void solve( ) {
    int n = read( ), q = read( );
    for( int i = 1; i <= n; ++ i ) a[i] = read( );
    sort( a + 1, a + n + 1 );
    for( int i = 1; i <= n; ++ i ) b[i] = a[i] - i;

    for( int i = 1; i <= q; ++ i ) {
        ll x = read( ), y = read( );

        // posx 是第一个 >= x 的位置
        int posx = lower_bound( a + 1, a + n + 1, x ) - a;
        
        ll miss = x - posx; // 小于 x 的缺失数字个数：
        ll k = y + miss;

        // 找第一个使得缺失数量达到 k 的 a[pos]
        int pos = lower_bound( b + 1, b + n + 1, k ) - b;

        // 第 k 个缺失数之前有 pos - 1 个已有数字
        ll ans = k + ( pos - 1 );

        cout << ans << '\n';
    }
}
```

{% endfold %}

## 4. 复盘

- **复杂度分析**：排序 $O(N\log N)$，每次询问 $O(\log N)$，总复杂度 $O(N\log N+Q\log N)$。
    
- **关键转化**：将“大于等于 $X$ 的第 $Y$ 个缺失数”转化为“全体正整数中的第 $k$ 个缺失数”。

- **关联笔记**：[[二分体系]] 