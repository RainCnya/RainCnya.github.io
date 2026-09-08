---
title: P2210 Haywire B
tags:
  - 动态规划/状压DP
  - 图论/割
status: solved
categories:
  - 260_Records
  - DP
abbrlink: 9ceed44a
date: 2026-09-07 00:00:00
updated: 2026-09-08 00:00:00
---

# 把排列距离拆成前缀割边

> [!question] [P2210 [USACO13OPEN] Haywire B](https://www.luogu.com.cn/problem/P2210)
> 给定 $N$ 头奶牛及其朋友关系，每头奶牛恰有 $3$ 个朋友。要把奶牛排成一列，使所有朋友边的端点位置差之和最小；
> 
> 数据规模：$N$ 为偶数且 $4\le N\le12$。

## 随机化暴力

$N$ 很小，最直接的想法是枚举排列，但 $N!$ 仍然太大。一个暴力的做法是不断随机打乱所有奶牛的位置，在时间限制内尽量找到更优排列。

代码中 `a[i]` 表示第 $i$ 头奶牛当前被随机分配到的位置。每次打乱后，直接枚举每头奶牛的三个朋友，累计两端位置差。

由于朋友关系是无向的，而输入中每条朋友边会分别从两个端点统计一次，所以最终要把累计结果除以 $2$。

```cpp title:"随机化暴力" fold
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ull = unsigned long long;
using i128 = __int128_t;

const int maxn = 3e5 + 5;
const int mod = 998244353;
const ll inf = 4e18;

ll read( ) {
    ll x = 0, f = 1;
    char ch = getchar( );
    for( ; !isdigit( ch ); ch = getchar( ) ) if( ch == '-' ) f = -1;
    for( ; isdigit( ch ); ch = getchar( ) ) x = x * 10 + ch - '0';
    return x * f;
}

struct Relation {
    int a, b, c;
} p[20];

int a[20];

void solve( ) {
    int t = clock( );
    srand( time( 0 ) );
    int n = read( );
    for( int i = 1; i <= n; ++ i ) a[i] = i;
    for( int i = 1; i <= n; ++ i ) {
        p[i].a = read( ), p[i].b = read( ), p[i].c = read( );
    }

    ll mn = inf;
    while( clock( ) - t <= 0.9 * CLOCKS_PER_SEC ) {
        random_shuffle( a + 1, a + n + 1 );
        ll res = 0;
        for( int i = 1; i <= n; ++ i ) {
            res += abs( a[i] - a[p[i].a] );
            res += abs( a[i] - a[p[i].b] );
            res += abs( a[i] - a[p[i].c] );
        }
        mn = min( mn, res / 2 );
    }
    cout << mn << '\n';
}

int main( ) {
    int T = 1;
    // int T = read( );
    while( T -- ) solve( );
    return 0;
}
```

不过它没有遍历全部排列，无法保证得到最优解，因此还需要寻找确定性做法。

## 状压 DP

随机化说明排列本身很难直接枚举，而 $N\le12$ 又明显提示可以考虑 $2^N$ 级别的状态。

这就暗示了状压DP 的做法，于是自然维护一个前缀集合 $S$，表示哪些奶牛已经被放在排列的前 $|S|$ 个位置。

问题要求所有朋友边端点位置差之和最小，那么难点就在于如何处理这个位置差。

接着考虑下一个加入的奶牛如何影响答案。对于最终排列中的一条朋友边，设它两个端点的位置分别为 $l<r$，那么这条边的长度是 $r-l$。

在排列中每两个相邻位置之间放一条分界线。这条边恰好会跨过从第 $l$ 个位置之后到第 $r-1$ 个位置之后的所有分界线，总共跨过 $r-l$ 条，因此它的距离贡献可以等价地拆成每条被跨越分界线各贡献 $1$。

对某个前缀集合 $S$，对应的分界线正好位于前 $|S|$ 个位置之后。一条朋友边跨过这条分界线，当且仅当它恰有一个端点属于 $S$，所以定义 `cut[S]` 为恰好有一个端点在 $S$ 中的朋友边数。

这样，对一个完整排列依次形成的所有前缀 $S_1,S_2,\dots,S_N$，所有 `cut` 的总和就等于所有朋友边的端点距离之和。最后的全集对应 `cut[All] = 0`，所以是否把它计入没有影响。

于是设 `f[S]` 表示把集合 $S$ 中的奶牛放在前 $|S|$ 个位置时，已经形成的这些分界线贡献的最小总和。若从 $S$ 选择一头未放奶牛得到新集合 $T$，新增的位置分界贡献就是 `cut[T]`，因此转移为 $f[T] = \min( f[T], f[S] + cut[T])$。

而 `cut` 只与集合相关，和顺序无关，不依赖最后加入的牛，所以将原来需要保存整个排列历史的问题，压缩成了一个集合状态。

预处理 `cut` 的复杂度为 $O(N^2 2^N)$，DP 为 $O(N2^N)$，对 $N\le12$ 足够。

## AC 代码

```cpp title:"P2210" fold
int cut[1 << 12];
int f[1 << 12];
int g[20][20];
int a[20];

void solve( ) {
    int n = read( );
    for( int i = 0; i < n; ++ i ) {
        int a = read( ) - 1;
        int b = read( ) - 1;
        int c = read( ) - 1;
        g[i][a] = 1, g[i][b] = 1, g[i][c] = 1;
    }

    int all = 1 << n;
    for( int mask = 0; mask < all; ++ mask ) {
        for( int u = 0; u < n; ++ u ) {
            for( int v = u + 1; v < n; ++ v ) {
                if( g[u][v] == 0 ) continue;
                if( ( ( mask >> u ) & 1 ) == ( ( mask >> v ) & 1 ) ) continue;
                cut[mask] ++;
            }
        }
    }

    memset( f, 127, sizeof f );
    f[0] = 0;
    for( int mask = 0; mask < all; ++ mask ) {
        for( int v = 0; v < n; ++ v ) {
            if( mask & ( 1 << v ) ) continue;
            int nxt = mask | ( 1 << v );
            f[nxt] = min( f[nxt], f[mask] + cut[nxt] );
        }
    }
    cout << f[all - 1] << '\n';
}
```