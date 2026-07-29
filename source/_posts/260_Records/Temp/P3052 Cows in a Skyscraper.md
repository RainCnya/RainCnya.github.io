---
title: P3052 Cows in a Skyscraper
tags:
  - algorithm/记录
  - DP/状态压缩
status: solved
categories:
  - 260_Records
  - Temp
abbrlink: a3052001
date: 2026-07-29 00:00:00
updated: 2026-07-29 00:00:00
---

# Cows in a Skyscraper：从枚举一趟到最小充分状态

> [!question] [P3052 Cows in a Skyscraper G - 洛谷](https://www.luogu.com.cn/problem/P3052)
> 有 $n\le18$ 头奶牛，每趟电梯承重不超过 $W$，求运完所有奶牛所需的最少趟数。

这题的两个 AC 实现对应了一条很清楚的优化路径：先枚举“下一趟装哪些牛”，再把整趟选择改写成“逐头加入当前最后一趟”。

## 第一版：枚举下一趟的集合

预处理每个子集的重量和。设：

$$
f[S]=\text{已经运走集合 }S\text{ 时的最少趟数}。
$$

枚举剩余集合的子集 $T$，只要 $sum[T]\le W$，就可以把 $T$ 作为新的一趟：

```cpp title:"P3052-1" fold
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

int c[maxn];
int sum[maxn];
int f[maxn];

void solve( ) {
    int n = read( ); ll W = read( );
    int N = (1 << n);

    for( int i = 0; i < n; ++ i ) c[i] = read( );

    for( int i = 0; i < N; ++ i ) f[i] = inf;
    f[0] = 0;
    
    for( int mask = 0; mask < N; ++ mask ) {
        for( int j = 0; j < n; ++ j ) {
            if( (mask >> j) & 1 ) sum[mask] += c[j];
        }
    }

    int all = (1 << n) - 1;
    for( int mask = 0; mask < N; ++ mask ) {
        int rem = all ^ mask;
        for( int sub = rem; sub; sub = (sub - 1) & rem ) {
            if( sum[sub] > W ) continue;
            f[mask | sub] = min( f[mask | sub], f[mask] + 1 );
        }
    }
    cout << f[all] << '\n';
}
```

所有“状态—子集”组合的总量为 $O(3^n)$。在 $n=18$ 时可能通过，但它重复枚举了很多装载顺序等价的方案。

## 第二版：记录最后一趟的载重

更紧的状态是：

$$
f[S]=(rides,last),
$$

其中 `rides` 是运走 $S$ 所用的趟数，`last` 是最后一趟当前已经装入的重量。状态按字典序比较：

1. 趟数越少越优；
2. 趟数相同时，最后一趟越轻越优。

第二条能够成立，是因为在已经选择同一个集合 $S$ 的前提下，更轻的最后一趟拥有更多剩余容量，对未来绝不会更差。

```cpp title:"P3052" fold
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

int c[20];
pair<int, ll> f[(1 << 18)];
// 最少电梯数 | 最后一趟电梯重量和

void solve( ) {
    int n = read( ); ll W = read( );
    for( int i = 0; i < n; ++ i ) c[i] = read( );

    int N = (1 << n);
    for( int mask = 0; mask < N; ++ mask ) f[mask] = { n + 1, 0 };
    
    f[0] = { 1, 0 };
    for( int mask = 0; mask < N; ++ mask ) {
        for( int i = 0; i < n; ++ i ) {
            if( (mask >> i) & 1 ) continue;
            auto nxt = f[mask];
            if( nxt.second + c[i] <= W ) {
                nxt.second += c[i];
            } else {
                nxt.first ++;
                nxt.second = c[i];
            }
            int nmask = mask | ( 1 << i );
            f[nmask] = min( f[nmask], nxt );
        }
    }
    cout << f[N - 1].first << '\n';
}
```

初始化 `f[0]={1,0}`，可以理解为当前有一趟尚未装入奶牛的空电梯。最终答案是 `f[(1<<n)-1].first`。

## 两版实现的关系

第一版把一趟电梯看成一个整体决策，因此每次转移要枚举一个子集。第二版发现，对于同一个已选集合，过去各趟具体如何分组并不重要；只需留下“用了几趟”和“最后一趟还剩多少空间”这两个会影响未来的信息。

- 第一版：$O(3^n)$；
- 第二版：$O(n2^n)$；
- 两版空间均可控制在 $O(2^n)$。

## 记录

这题保留为 **C 类记录**。价值不只在状态压缩，而在于展示如何从一个正确但较慢的“枚举整组决策”，压缩成只保存未来真正关心的信息。

> [!todo] 人工修改
> 两份 AC 代码已经能证明这条优化路径。可以再补充自己写第一版后，是从哪里意识到“同趟数下只需保留最轻的最后一趟”。
