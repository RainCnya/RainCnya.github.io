---
title: P3080 The Cow Run
tags:
  - algorithm/记录
  - DP/区间
status: solved
categories:
  - 260_Records
  - Temp
abbrlink: a3080001
date: 2026-07-29 00:00:00
updated: 2026-07-29 00:00:00
---

# The Cow Run：剩余对象共同产生的移动代价

> [!question] [P3080 The Cow Run G/S - 洛谷](https://www.luogu.com.cn/problem/P3080)
> 奶牛分布在数轴上，起点为 $0$。每头尚未被找到的奶牛会随时间持续产生代价，求找完所有奶牛的最小总代价。

这题不能把移动距离简单累加，因为同样的一段路，在早期经过时会让更多奶牛等待，代价更大。

## 为什么是区间状态

把所有奶牛的位置与起点 $0$ 一起排序。移动经过某个位置时，该位置上的奶牛会立即被找到。因此已经处理过的位置一定构成一个包含 $0$ 的连续区间 $[l,r]$。

下一步只可能去找：

- 左侧最近的未处理位置 $l-1$；
- 右侧最近的未处理位置 $r+1$。

但后续移动距离取决于当前站在区间左端还是右端，因此定义：

$$
f[l][r][0/1]=\text{处理完 }[l,r]\text{，停在左/右端时的最小代价}。
$$

## 路程如何转化为代价

若当前还有 $cnt$ 头奶牛未找到，移动距离 $d$ 会让这 $cnt$ 头奶牛都多等待 $d$，所以本段移动产生的代价为：

$$
d\times cnt.
$$

这是整道题最关键的换算。区间扩大到长度 `len` 时，代码中的：

```cpp
cnt = n - len + 1;
```

表示完成这次扩展前仍在等待的奶牛数量，其中排序数组额外包含起点 $0$。

```cpp title:"P3080" fold
using namespace std;
using ll = long long;
using ull = unsigned long long;
using i128 = __int128_t;

const int maxn = 1000 + 5;
const int mod = 998244353;
const ll inf = 4e18;

ll read( ) {
    ll x = 0, f = 1;
    char ch = getchar( );
    for( ; !isdigit( ch ); ch = getchar( ) ) if( ch == '-' ) f = -1;
    for( ; isdigit( ch ); ch = getchar( ) ) x = x * 10 + ch - '0';
    return x * f;
}

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

初始状态是只包含起点的位置 `st`：

```cpp
f[st][st][0] = f[st][st][1] = 0;
```

最终答案为 `min(f[1][n][0], f[1][n][1])`。

## 记录

这题保留为 **C 类记录**。它的迁移点是：当总成本是所有对象等待时间之和时，可以按每段移动对“当前仍未完成的对象”统一贡献，得到“距离乘剩余数量”的区间 DP。

> [!todo] 人工修改
> 可以补充当时如何确认“已找到的奶牛一定形成连续区间”，以及 `cnt` 的下标换算是否曾经出现边界错误。
