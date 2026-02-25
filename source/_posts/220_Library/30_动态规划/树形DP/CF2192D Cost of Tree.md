---
title: '[Leaf] [CF2192D] Cost of Tree'
tags:
  - DP/树形
  - 算法/贡献法
  - 难度/P4
categories:
  - 220_Library
  - 30_动态规划
  - 树形DP
abbrlink: fe143890
date: 2026-02-25 12:38:15
---

# [CF2192D - Cost of Tree](https://codeforces.com/contest/2192/problem/D)

## 1. 题面梗概

**中译中**：给出一棵 $n$ 个点的树，根为 1。定义子树 $S(r)$ 的代价为 $\sum_{u \in S(r)} a_u \cdot d(r, u)$。对每个 $r \in [1, n]$，允许在 $S(r)$ 内执行至多一次操作：断开某棵子树 $S(u)$（$u \neq r$），将其接到 $S(r)$ 内剩余的任意节点 $v$ 上。求操作后 $S(r)$ 的最大代价。

> $n \le 2 \cdot 10^5, a_i \le 2 \cdot 10^5, \sum n \le 2 \cdot 10^5$

## 2. 逻辑推导

设我们把子树 $S(u)$ 移动到节点 $v$，其贡献值为：

$$
\Delta(u,v) = sz\_sum[u] \cdot (d(r, v) + 1 - d(r, u))
$$

若 $p$ 是 $u$ 的父节点，将子树 $S(p)$ 移动到节点 $v$ 的总贡献值：

$$
\Delta(p, v) = sz\_sum[p] \cdot ( d(r, v) + 1 - d(r, p))
$$

因为 $sum[u] < sum[p], d(r, u) > d(r, p)$，所以 $\Delta(p,v) > \Delta(u, v)$。

结论：如果要移动以 $r$ 为根的子树，最优的移动对象 $u$ 一定是 $r$ 的直接子节点。

### 2.1 状态设计

基于上述性质，我们只需要在每个节点维护两个状态即可。

- $f[u]$：不进行任何操作时，$S(u)$ 的原始代价。
- $dp[u]$：在 $S(u)$ 内最多执行一次操作后的最大代价。

**转移**：

1. 操作在子树内：即操作在某个儿子 $c$ 的子树内完成。

$$
dp[u] = f[u] + \max( dp[c] - f[c] )
$$

2. 操作就在 $u$ 点：即选择一个儿子 $c$，将 $S(c)$ 断开接到 $S(u) \setminus S(c)$ 中最深的点上。

$$
dp[u] = \max(sz\_sum[c] \cdot ( depth - dep[c] + 1))
$$

> `depth`  为 $S(u) \setminus S(c)$ 中最大的深度

### 2.2 优化

为了快速查询 `depth`，我们维护每个节点到最深节点的路径，并区分最深路径和次深路径。

若子树在最深路径上，则 `depth` 就在次深路径上。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair<int, int>;

const int maxn = 2e5 + 5;

vector< int > adj[maxn];
ll a[maxn], sz_sum[maxn], f[maxn], dp[maxn];
int dep[maxn], mx1[maxn], mx2[maxn], son[maxn];
int n;

void dfs( int u, int p )
{
    sz_sum[u] = a[u];
    dep[u] = dep[p] + 1;
    f[u] = 0;
    mx1[u] = dep[u];
    mx2[u] = 0;
    son[u] = 0;

    for( int v : adj[u] )
    {
        if( v == p ) continue;
        dfs( v, u );
        sz_sum[u] += sz_sum[v];
        f[u] += ( f[v] + sz_sum[v] );
        if( mx1[v] > mx1[u] )
        {
            mx2[u] = mx1[u];
            mx1[u] = mx1[v];
            son[u] = v;
        }
        else if( mx1[v] > mx2[u] )
        {
            mx2[u] = mx1[v];
        }
    }
}

void dfs2( int u, int p )
{
    ll delta = 0;

    for( int v : adj[u] )
    {
        if( v == p ) continue;
        dfs2( v, u );
        delta = max( delta, dp[v] - f[v] );
    }

    dp[u] = f[u] + delta;

    for( int v : adj[u] )
    {
        if( v == p ) continue;
        ll depth = ( v == son[u] ) ? max( mx2[u], dep[u] ) : mx1[u];
        ll cur = sz_sum[v] * ( depth - dep[v] + 1 );
        dp[u] = max( dp[u], f[u] + cur );
    }
}

void solve( )
{
    cin >> n;
    for( int i = 1; i <= n; ++ i ) 
    {
        cin >> a[i];
        adj[i].clear( );
    }

    for( int i = 1; i < n; ++ i )
    {
        int u, v; cin >> u >> v;
        adj[u].push_back( v );
        adj[v].push_back( u );
    }

    dep[1] = 0;
    dfs( 1, 0 );
    dfs2( 1, 0 );

    for( int i = 1; i <= n; ++ i ) cout << dp[i] << ' ';
    cout << '\n';
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int _t = 1;
    cin >> _t;
    while( _t -- ) solve( );
    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度分析**：$O( N )$。
    
- **碎碎念**：本题的关键在于性质的分析，赛场上没注意到，在想神秘的李超线段树，最后也是没写出来。
    
- **关联笔记**：[[树形DP体系]]
