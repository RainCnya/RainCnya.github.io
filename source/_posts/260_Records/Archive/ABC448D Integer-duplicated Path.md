---
title: 'ABC448D Integer-duplicated Path'
tags:
  - algorithm/记录
  - 图论/树
  - 搜索/DFS
  - 算法/离散化
categories:
  - 260_Records
  - Archive
abbrlink: 5a8a5b59
date: 2026-03-08 00:00:00
---
# [D - Integer-duplicated Path](https://atcoder.jp/contests/abc448/tasks/abc448_d)

## 1. 题意梗概

给一棵树，每个节点有一个点权，然后输出从 $1$ 到 $k$ 的路径上是否有重复的点。

输出 1 到每个点的查询，$k \in [1, n]$。

> $N \leq 2 \times 10^5, A_{i} \leq 10^9$

## 2. 逻辑推导

## 2.1 切入点

回溯型的 DFS。

## 2.2 思路分析

这个数据规模暗示我们需要采用最大 $O( N \log N )$ 的写法，毕竟 $O( N^2 )$ 就爆了。

然后我们可以想到，从根节点开始往下 DFS 搜索，同时记录当前找到了哪些数，如果新搜索到的那个点权之前有找到过，那么就把答案记录下来。

> 为什么不直接输出？因为 DFS 序不一定就是 $1, 2, \dots, n$ 的输出顺序。

然后接着分析，如何记录当前找到了哪些数？显然可以用数组存 `cnt[k] = m` 表示值为 $k$ 的节点出现了 $m$ 次。但是这样会出现一个问题，$A \leq 10^9$ 没法直接开这么大规模的数组。

发现值域大但是稀疏，**所以**我们可以考虑离散化，这里我用 `map` 偷懒了。

最后还有在 DFS 过程中记录：之前的节点中是否已经有重复的，如果有，那么即使当前值不重复，它的这条路径上也是存在重复的。

最后在理一下复杂度，DFS 一遍整个树 $O( N )$（ 每个点搜一遍 ），`map` / 离散化 $O( N \log N )$，`map` 则是插入查询均为 $O(\log N)$，离散化是排序 $O( N \log N )$，查询是 $O(1)$。

## 3. 代码实现

```cpp
vector< int > adj[maxn];
ll a[maxn];
bool ans[maxn];
int n;

map< ll, int > cnt;

// 树上 DFS 一般传两个参数，当前节点 u，以及父节点 p ( 为了防止往回搜 u -> p -> u )
void dfs( int u, int p, bool flag )
{
	// 当前路径到当前点 u 是否存在重复的情况。
    bool cur = ( flag || ( cnt[a[u]] > 0 ) );
    ans[u] = cur;
    cnt[a[u]] += 1;
    for( int v : adj[u] )
    {
        if( v == p ) continue;
        dfs( v, u, cur );
    }
    // 重点回溯
    cnt[a[u]] -= 1;
}

void solve( )
{
    cin >> n;
    for( int i = 1; i <= n; ++ i ) cin >> a[i];

	// 朴实的邻接表存图
    for( int i = 1; i <= n - 1; ++ i )
    {
        int u, v; cin >> u >> v;
        adj[u].push_back( v );
        adj[v].push_back( u );
    }

    cnt.clear( );

    dfs( 1, 0, 0 );

    for( int i = 1; i <= n; ++ i )
    {
        if( ans[i] ) cout << "Yes" << '\n';
        else cout << "No" << '\n';
    }
}
```

---
