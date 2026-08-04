---
title: ABC469E Pro Exam Eligibility
tags:
  - algorithm/记录
  - 策略/二分答案
  - 方法/前缀变换
status: solved
categories:
  - 260_Records
  - Archive
abbrlink: a469e001
date: 2026-08-01 00:00:00
updated: 2026-08-04 00:00:00
---

# ABC469E Pro Exam Eligibility

> [!Question]
> 给定一个由胜利 `o` 和失败 `x` 组成的字符串。在至少包含 $K$ 场胜利的连续区间中，求最大的胜率。
>
> 数据规模：$1\le K\le N\le 10^6$，答案允许 $10^{-6}$ 的误差。

最大的胜率？也就是说我想让区间里的 `x` 失败尽可能的少，那恰好包含 $K$ 场胜利不就是最少得情况吗？于是我立马打了个滑动窗口求最值。

但是，一定是恰好 $K$ 场胜利就是胜率最高的吗？不一定吧，比如 `ooxoo (k=3)`，此时胜利 $3$ 场对应 $3 / 4$，而整个区间为 $4 / 5$。

所以我们得从别的性质入手，记 $sum_i$ 为胜场数前缀和，对于某一段区间 $[l, r]$ 来说，它的胜率就是 $\displaystyle \frac{sum_{r} - sum_{l - 1}}{r - l + 1}$，也就是说我们要求这个柿子的最大值。

这题其实在 Week1 出现过。由于答案具有单调性，所以可以考虑二分答案，区间 $(l,r]$ 的胜率至少为 $mid$： $\displaystyle \frac{sum_r-sum_l}{r-l}\ge mid \iff (sum_r-mid\cdot r)\ge(sum_l-mid\cdot l)$。

记 $f_{i} = sum_{i} - mid \cdot i$，因为还需要满足区间胜场数不少于 $K$，即 $sum_{r} - sum_{l} \ge K$，随着右端点 $r$ 向右移动，合法的左端点构成一个递增的前缀，所以只需要维护其中最小的 $f_{l}$，判断是否存在 $f_{r} \ge \min(f_{l})$ 即可。

```cpp title:"EEE" fold
int n, k;
int sum[maxn];
double f[maxn];

bool check( double mid ) {
    for( int i = 0; i <= n; ++ i ) {
        f[i] = sum[i] - mid * i;
    }

    double mn = inf;
    int l = 0;
    for( int r = 1; r <= n; ++ r ) {
        while( l < r && k <= sum[r] - sum[l] ) {
            mn = min( mn, f[l] );
            l ++;
        }
        if( f[r] >= mn ) return true;
    }
    return false;
}

void solve( ) {
    n = read( ), k = read( );
    string s;
    cin >> s;

    for( int i = 1; i <= n; ++ i ) {
        sum[i] = sum[i - 1] + ( s[i - 1] == 'o' );
    }

    double l = 0, r = 1;
    for( int t = 1; t <= 100; ++ t ) {
        double mid = ( l + r ) / 2.0;
        if( check( mid ) ) l = mid;
        else r = mid;
    }
    cout << fixed << setprecision( 6 ) << l << '\n';
}
```

## 记录

- 来源：[[ABC469 A~G]]；
- 归属：[[二分体系]]；
- 新增：“恰好 K 场胜利最优”被反例否定后，将比例下界改写为变换前缀的大小关系；胜场约束使合法左端点单调扩张，可以在线维护最小前缀。
- 分类：待定

