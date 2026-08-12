---
title: 'ABC457E Crossing Table Cloth'
tags:
  - 杂项/区间问题
  - 策略/预处理
  - 数据结构/map
categories:
  - 260_Records
  - Archive
abbrlink: 1ab05322
date: 2026-05-09 00:00:00
---
# [E - Crossing Table Cloth](https://atcoder.jp/contests/abc457/tasks/abc457_e)

## 题意
有 $N$ 个格子，$M$ 块布，每一块布覆盖 $[L_{i}, R_{i}]$，有 $Q$ 次询问，每次询问 $[S_{q}, T_{q}]$ 区间是否能被恰好两块布覆盖，且区间外的格子不能被覆盖。

> $N, M, Q \leq 2e5$

## 思路
要找两块布恰好覆盖 $[S,T]$ 这个区间，那么一定是下面这种情况：第一块布的左端点在 $S$，第二块布的右端点在 $T$。

为了让两块布相交 / 重叠，我们尽可能找到最长的那块布，对于左端点在 $S$ 的这块布，找到最大的 $R \leq T$；对于右端点在 $T$ 的这块布，找到最小的 $L \geq S$。

如何判定两块布是否能接上呢？只需要满足这个条件即可：$R \geq L - 1$。

但是考虑特殊情况 $R = T, l = S$ 呢？那它可能就是同一块布了。

如何再凑一块布出来呢？分类所有情况，发现只要满足下面四条的任意一条，就能凑出第二块。

1. **重合**：有两块及以上的布本身就是 $[S, T]$ 。
2. **左边**：存在左端点是 $S$，但右端点 $< T$ 的布。
3. **中间**：存在左端点 $> S$，右端点 $< T$ 的布。
4. **右边**：存在左端点 $> S$，右端点是 $T$ 的布。

第一种情况直接用一个 map 存数量就可以判断了，第二和第四种情况都好判断。

第三种情况最特殊，一般的想法是枚举 $[S+1, T-1]$ 区间每个位置作为起点，然后判断是否存在右端点 $< T$，但是这样的复杂度是 $O(n)$，累积就是 $O(n^{2})$，T 了。

考虑优化，发现这种枚举本质上是对每个点做了很多次重复判定的，是否可以用预处理来减少这部分重复判定呢？设 $right[i]$ 为左端点从 $i$ 开始的最小右端点位置，这样一来，只需要判定 `right[s + 1] < t` 是否满足即可。

## 代码部分
{% fold info @AcCode %}
```cpp
vector<ll> maxr[maxn], minl[maxn];
map<pair<ll,ll>, int> mp;
ll right[maxn];

void solve( ) {
    cin >> n >> m;

    for( int i = 1; i <= m; ++ i ) {
        ll l, r;
        cin >> l >> r;
        maxr[l].push_back( r );
        minl[r].push_back( l );
        mp[{ l, r }] ++;
    }

    for( int i = 1; i <= n; ++ i ) {
        if( !maxr[i].empty( ) ) sort( maxr[i].begin( ), maxr[i].end( ) );
        if( !minl[i].empty( ) ) sort( minl[i].begin( ), minl[i].end( ) );
    }

    // 从 i 开始最小的右端点
    right[n + 1] = inf;
    for( int i = n; i >= 1; -- i ) {
        right[i] = right[i + 1];
        // 如果 i 有右端点，更新 right[i] 为最小的右端点
        if( !maxr[i].empty( ) ) right[i] = min( right[i], maxr[i].front( ) );
    }


    cin >> q;
    for( int i = 1; i <= q; ++ i ) {
        ll s, t;
        cin >> s >> t;

        bool ok = 0;
        ll l = inf, r = -1;

        // 右端点 <= t 的最大值
        auto it1 = upper_bound( maxr[s].begin( ), maxr[s].end( ), t );
        if( it1 != maxr[s].begin( ) ) r = *prev( it1 );
        // 此处这个 prev 是 it1 的前一个位置，跟 upper_bound 有关
        // upper_bound 是查询 > t 的最小下标，所以要 -1。

        // 左端点 >= s 的最小值
        auto it2 = lower_bound( minl[t].begin( ), minl[t].end( ), s );
        if( it2 != minl[t].end( ) ) l = *it2;

        // 区间合法
        if( l != inf && r != -1 && r >= l - 1 ) {
            if( l == s && r == t ) {
                if( mp[{ s, t }] >= 2 ) ok = 1;
                else if( !maxr[s].empty( ) && maxr[s].front( ) < t ) ok = 1;
                else if( right[s + 1] < t ) ok = 1;
                else if( !minl[t].empty( ) && minl[t].back( ) > s ) ok = 1;
            }
            else ok = 1;
        }
        if( ok ) cout << "Yes" << '\n';
        else cout << "No" << '\n';
    }
}
```
{% endfold %}
