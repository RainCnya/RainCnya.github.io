---
title: P3080 The Cow Run
tags:
  - DP/区间
status: solved
categories:
  - 260_Records
  - DP
abbrlink: a3080001
date: 2026-07-29 00:00:00
updated: 2026-07-30 00:00:00
---

# The Cow Run：剩余对象共同产生的移动代价

> [!question] [P3080 The Cow Run G/S - 洛谷](https://www.luogu.com.cn/problem/P3080)
> 奶牛分布在数轴上，起点为 $0$。每头尚未被找到的奶牛会随时间持续产生代价，求找完所有奶牛的最小总代价。
> 
> 数据规模：$N \le 1000$。

这题不能把移动距离简单累加，因为同样的一段路，在早期经过时会让更多奶牛等待，代价更大。

于是我们把所有奶牛的位置与起点 $0$ 一起排序，此时我们会发现，已经被找到的奶牛就形成了一个包含 $0$ 的连续区间 $[l, r]$。

然后下一步只可能去找 $l-1$ 或者 $r + 1$，所以我们可以采用区间 DP 的定义，然后发现当前区间最后还需要包括结束站在左端点还是右端点：$f[l][r][0/1]$ 表示处理完 $[l,r]$，停在左/右端时的最小代价。

接着考虑转移就好了，由于每次移动会导致剩下来的 $cnt$ 头奶牛都多等待 $d$ 这段移动距离，所以本次移动的代价为 $d \times cnt$。 

注：这里的 `cnt = N - ( (len - 1) - 1 ) = n - 1 - len + 2 = n - len + 1`。因为当前 $len$ 是从 $len - 1$ 转移过来的，而当前这头牛也得算进去，所以已经找到的牛的数量是 $len - 2$，由于数组额外加入了一个 $0$ 点，所以 $N = n - 1$。

```cpp title:"P3080" fold
ll f[maxn][maxn][2];
int p[maxn];

void solve( ) {
    int n = read( );
    for( int i = 1; i <= n; ++ i ) p[i] = read( );
    n ++;
    p[n] = 0;
    sort( p + 1, p + n + 1 );
    int st = lower_bound( p + 1, p + n + 1, 0 ) - p;

    memset( f, 127, sizeof f );
    f[st][st][0] = f[st][st][1] = 0;

    for( int len = 2; len <= n; ++ len ) {
        for( int l = 1; l + len - 1 <= n; ++ l ) {
            int r = l + len - 1;
            ll cnt = n - len + 1;
            f[l][r][0] = min( f[l+1][r][0] + cnt * ( p[l+1] - p[l] ), 
                              f[l+1][r][1] + cnt * ( p[r] - p[l] ) );
            f[l][r][1] = min( f[l][r-1][0] + cnt * ( p[r] - p[l] ), 
                              f[l][r-1][1] + cnt * ( p[r] - p[r-1] ) );
        }
    }
    cout << min( f[1][n][0], f[1][n][1] ) << '\n';
}
```

## 记录

这题保留为 **C 类记录**。它的迁移点是：当总成本是所有对象等待时间之和时，可以按每段移动对“当前仍未完成的对象”统一贡献，得到“距离乘剩余数量”的区间 DP。
