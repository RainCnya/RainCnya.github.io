---
title: P4552 IncDec Sequence
tags:
  - 基础算法/差分
  - 方法/区间操作
status: solved
categories:
  - 260_Records
  - Misc
abbrlink: p4552001
date: 2026-08-28 00:00:00
updated: 2026-08-28 00:00:00
---

# 区间加减在差分中是两个单位的搬运

> [!question] [P4552 IncDec Sequence](https://www.luogu.com.cn/problem/P4552)
> 每次选择一个区间，让其中所有数同时加 $1$ 或减 $1$。求把整个序列变成同一个数的最少操作次数，以及最少操作下可能得到多少种最终常数序列。
>
> 数据规模：$n\le10^5$，$0\le a_i\le2^{31}$。

区间加 区间减，不难想到使用差分。于是我最开始的做法就是统计最大的差分值，以及它出现了几次。

但这种做法忽略了一次区间操作会同时改变两个差分位置，因此单点极值无法表示操作次数。

```cpp title:"WA：只看最大差分" fold
ll a[maxn];
ll dif[maxn];

void solve( ) {
    int n = read( );

    ll mx = 0;
    for( int i = 1; i <= n; ++ i ) {
        a[i] = read( );
        dif[i] = a[i] - a[i - 1];
        mx = max( mx, dif[i] );
    }

    int cnt = 0;
    for( int i = 1; i <= n; ++ i ) {
        if( dif[i] == mx ) ++ cnt;
    }
    cout << mx << "\n" << cnt << '\n';

}
```

真正需要消掉的是内部差分 $d_2,d_3,\ldots,d_n$。一次区间加减会让一个差分增加 $1$、另一个差分减少 $1$，因此一个正差分单位和一个负差分单位可以在一次操作中配对消除。

记正差分总量为 $P$，负差分绝对值总量为 $Q$。配对部分需要 $\min(P,Q)$ 次，剩余部分只能借助左右边界消除，所以最少操作数是 $\max(P,Q)$。

剩下的 $|P-Q|$ 个单位可以在左右边界之间分配。只要决定其中有多少个单位从左侧处理，就确定了最终常数值，因此结果共有 $|P-Q|+1$ 种。

```cpp title:"P4552" fold
ll a[maxn];
ll dif[maxn];

void solve( ) {
    int n = read( );

    ll pos = 0, neg= 0;
    for( int i = 1; i <= n; ++ i ) {
        a[i] = read( );
    }
    for( int i = 2; i <= n; ++ i ) {
        dif[i] = a[i] - a[i - 1];
        if( dif[i] > 0 ) pos += dif[i];
        else neg -= dif[i];
    }

    cout << max( pos, neg ) << '\n';
    cout << abs( pos - neg ) + 1 << '\n';
}
```