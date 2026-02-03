---
title: '[Leaf] [ZJ2020E] Easy DP Problem'
tags:
  - 数据结构/可持久化
  - DP/线性
  - 难度/P4
categories:
  - 220_Library
  - 10_数据结构
  - 11_树形结构
abbrlink: c1cb10d6
date: 2026-01-20 00:00:00
---
# [ZJ2020E - Easy DP Problem](https://codeforces.com/gym/102770/problem/E)

## 1. 题面梗概

**中译中**: 给定一个长度为 $n$ 的序列 $a$。定义一个 DP 过程：
$$
dp[i][j] = \begin{cases} 
0 & (i = 0) \\
i^2 + dp[i - 1][j] & (i > 0, j = 0) \\
i^2 + \max(dp[i - 1][j], dp[i - 1][j - 1] + b[i]) & (i > 0, j > 0)
\end{cases}
$$

有 $q$ 次询问，每次询问截取 $a$ 的一段区间 $[l, r]$ 作为序列 $b$，求在这个 $b$ 下计算出的 $dp[m][k]$ 值（其中 $m = r - l + 1$）。

## 2. 逻辑推导

问 $dp[m][k]$ 的值是多少。

我们先观察这个转移方程：$dp[i][j] = i^2 + \max(dp[i-1][j], dp[i-1][j-1] + b[i])$。

令 $dp[m][k] = \sum_{i=1}^{m}(i^2) + f(m,k), \\ f(m,k) = \max(f(m-1,k), f(m-1,k-1)+b[i])$ 

只要我们把 $i^2$ 拆出来的话，那么问题就转化为了：在这个常数项的基础上，如何从长度为 $m$ 的序列中选出 $k$ 个数，使得它们的和最大？

这不就是从区间 $[l, r]$ 中选出最大的 $k$ 个数吗 —— 那么方案就很明确了，主席树。

我这里采用主席树来维护区间数值分布。在查询时，利用前缀根的差值定位到 $[l, r]$ 对应的数值树，然后优先递归右子树（大值区）即可在 $O(\log V)$ 内凑出前 $k$ 大的和。

## 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair<int, int>;

const int maxn = 1e5 + 5;
const int maxV = 1e6 + 5;

int n, q, idx;
int root[maxn];

struct Node {
    int l, r, cnt;
    ll sum;
} tr[maxn << 5];

void modify( int &u, int v, int l, int r, int val )
{
    u = ++ idx;
    tr[u] = tr[v];
    tr[u].cnt ++, tr[u].sum += val;
    if( l == r ) return ;

    int mid = ( l + r ) >> 1;
    if( val <= mid ) modify( tr[u].l, tr[v].l, l, mid, val );
    else modify( tr[u].r, tr[v].r, mid + 1, r, val );
}

ll query( int u, int v, int l, int r, int k )
{
    if( l == r ) return l * k;

    int mid = ( l + r ) >> 1;
    int rcnt = tr[tr[v].r].cnt - tr[tr[u].r].cnt;
    
    if( k <= rcnt ) return query( tr[u].r, tr[v].r, mid + 1, r, k );
    else {
        ll rsum = tr[tr[v].r].sum - tr[tr[u].r].sum;
        return query( tr[u].l, tr[v].l, l, mid, k - rcnt ) + rsum;
    }
}

ll calc( ll m )
{
    return m * ( m + 1 ) * ( 2 * m + 1 ) / 6;
}

void solve( )
{
    cin >> n;

    idx = 0, root[0] = 0;
    tr[0] = { 0, 0, 0, 0 };

    for( int i = 1; i <= n; ++ i )
    {
        int x;
        cin >> x;
        modify( root[i], root[i - 1], 1, maxV, x );
    }

    cin >> q;
    for( int i = 1; i <= q; ++ i )
    {
        int l, r, k;
        cin >> l >> r >> k;
        int m = r - l + 1;
        // 常数项平方和 + 区间前 k 大和
        ll ans = calc( m ) + query( root[l - 1], root[r], 1, maxV, k );
        cout << ans << '\n';
    }
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int _t = 1;
    cin >> _t;
    while( _t -- )
    {
        solve( );
    }
    return 0;
}
```

{% endfold %}

## 4. 复盘

- **复杂度**: $O( (N+Q) \log V )$。
    
- **碎碎念**: 看到复杂的转移方程不要慌，尝试把与决策无关的项（如 $i^2$）剥离出来，往往能化简得到模型本质。

- **避雷**：主席树的空间开销较大（$N \log V$），`maxn << 5 | maxn * 32` 是常用写法。
        
- **关联笔记**: [[主席树体系]] 