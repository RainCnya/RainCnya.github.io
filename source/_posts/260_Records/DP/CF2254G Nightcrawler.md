---
title: CF2254G Nightcrawler
tags:
  - 图论/树形DP
  - 贪心/合并
  - 数据结构/优先队列
status: solved
categories:
  - 260_Records
  - DP
abbrlink: c32c8152
date: 2026-09-07 00:00:00
updated: 2026-09-08 00:00:00
---

# 根到叶链划分中的活跃链

> [!question] [CF2254G Nightcrawler](https://codeforces.com/problemset/problem/2254/G)
> 给定一棵根为 $1$ 的树和点权 $a_i$。要把所有点划分为恰好 $k$ 个集合，每个集合中的点两两具有祖先关系，集合得分为其中最大点权。对每个 $k=1,\dots,n$ 求最大总得分。
>
> 数据规模：$n\le2\times10^5$，父亲满足 $p_i<i$，所有测试中 $\sum n\le2\times10^5$。

假设叶子节点有 $L$ 个，注意到只有 $k \ge L$ 时存在答案，因为不同的叶子不可能在同一条祖先链中。

接着从叶子往根节点处理，尝试把每一个内部点合并进链上好像就可以了。

考虑如何合并，对于内部点 $u$ 来说，它可以加入任意一条后代链。设某条链当前最大值为 $x$，把权值 $a_u$ 的点并进去后，链分数变成 $\max(x,a_u)$，增加量为 $\max(0,a_u-x)$，因此应当选择当前 $x$ 最小的链，可以得到的增量是最大的。

于是乎，就可以对每个子树采用一个小根堆来维护，合并的时候使用启发式合并即可。

如果不把 $u$ 并进这条链，二者可以分别贡献 $a_u+x$；合并后只剩 $\max(a_u,x)$，因此会损失 $\min(a_u,x)$。代码把这个较小值记录到 `extra` 中；当允许的集合数从 $L$ 逐渐增加时，就按从大到小把这些值补回答案，证明略。

时间复杂度为 $O(n\log^2 n)$，空间复杂度为 $O(n)$。

```cpp title:"CF2254G" fold
using ll = long long;
using Heap = priority_queue<ll, vector<ll>, greater<ll>>;

void solve( ) {
    int n;
    cin >> n;

    vector<ll> a( n + 1 );
    vector<int> p( n + 1 );
    for( int i = 1; i <= n; ++ i ) cin >> a[i];
    for( int i = 2; i <= n; ++ i ) cin >> p[i];

    vector<Heap> pq( n + 1 );
    vector<ll> extra;

    for( int u = n; u >= 1; -- u ) {
        if( pq[u].empty( ) ) {
            pq[u].push( a[u] );
        } else {
            ll x = pq[u].top( );
            pq[u].pop( );
            pq[u].push( max( x, a[u] ) );
            extra.push_back( min( x, a[u] ) );
        }

        if( u != 1 ) {
            int fa = p[u];
            if( pq[fa].size( ) < pq[u].size( ) ) {
                swap( pq[fa], pq[u] );
            }
            while( !pq[u].empty( ) ) {
                pq[fa].push( pq[u].top( ) );
                pq[u].pop( );
            }
        }
    }

    int L = pq[1].size( );
    vector<ll> ans( n + 1, -1 );

    ll sum = 0;
    while( !pq[1].empty( ) ) {
        sum += pq[1].top( );
        pq[1].pop( );
    }
    ans[L] = sum;

    sort( extra.rbegin( ), extra.rend( ) );
    for( int i = 0; i < (int)extra.size( ); ++ i ) {
        sum += extra[i];
        ans[L + i + 1] = sum;
    }

    for( int k = 1; k <= n; ++ k ) {
        cout << ans[k] << " \n"[k == n];
    }
}
```
