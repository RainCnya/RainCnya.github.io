---
title: P3052 Cows in a Skyscraper
tags:
  - algorithm/记录
  - DP/状压
status: solved
categories:
  - 260_Records
  - DP
abbrlink: a3052001
date: 2026-07-29 00:00:00
updated: 2026-07-30 00:00:00
---

# Cows in a Skyscraper：从枚举一趟到最小充分状态

> [!question] [P3052 Cows in a Skyscraper G - 洛谷](https://www.luogu.com.cn/problem/P3052)
> 有 $n\le18$ 头奶牛，每趟电梯承重不超过 $W$，求运完所有奶牛所需的最少趟数。

观察数据规模之后发现这题很适合状态压缩，于是我直接写了一个简单的状压：$f[S]$ 表示已经运走了集合 $S$ 时的最小趟数。

然后每次枚举剩余集合的子集 $T$，只要 $sum[T] \le W$，就可以把 $T$ 作为新的一趟加进来，然后瓶颈在于每次枚举新子集时还需要重新计算重量。

所以这里我们预处理每个子集的重量和即可，转移可以做到 $\mathcal{O}(1)$，但枚举子集复杂度为 $\mathcal{O}(3^{n})$，有点小危险但还是 AC 了。

```cpp title:"P3052-1" fold
int c[maxn];
int sum[maxn];
int f[maxn];

void solve( ) {
    int n = read( ); 
    ll W = read( );
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

---

然后我尝试寻找更优的做法，题解中给出了一种优化思路。我们发现直接枚举所有子集的时候其实重复枚举了很多运载顺序等价的方案。

加入我们只记录最后一趟的载重呢？记 $f[S] = (rides, last)$，`rides` 表示运走 $S$ 所用的趟数，而 `last` 表示当前最后一趟已经装入的重量。

状态按字典序比较：趟数越少越优，若趟数相同，最后一趟载重越少越优。

初始化 `f[0]={1,0}`，可以理解为当前有一趟尚未装入奶牛的空电梯。最终答案是 `f[(1<<n)-1].first`。

```cpp title:"P3052" fold
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

## 两版实现的关系

第一版把一趟电梯看成一个整体决策，因此每次转移要枚举一个子集。

第二版发现，对于同一个已选集合，过去各趟具体如何分组并不重要；只有“用了几趟”和“最后一趟还剩多少空间”这两个状态会影响未来的信息。

- 第一版：$O(3^n)$；
- 第二版：$O(n2^n)$；
- 两版空间均可控制在 $O(2^n)$。

## 记录

这题保留为 **C 类记录**。价值不只在状态压缩，而在于展示如何从一个正确但较慢的“枚举整组决策”，压缩成只保存未来真正关心的信息。

