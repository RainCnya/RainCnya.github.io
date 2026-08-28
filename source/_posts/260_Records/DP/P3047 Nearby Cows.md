---
title: P3047 Nearby Cows
tags:
  - 动态规划/树形DP
  - 动态规划/换根DP
  - 图论/树上距离
status: solved
categories:
  - 260_Records
  - DP
abbrlink: p3047001
date: 2026-08-28 00:00:00
updated: 2026-08-28 00:00:00
---

# 半径很小的树上距离球可以压成距离前缀状态

> [!question] [P3047 Nearby Cows](https://www.luogu.com.cn/problem/P3047)
> 一棵树的每个点都有若干头奶牛。对每个点 $u$，求与 $u$ 距离不超过 $K$ 的所有点上奶牛数量之和。
>
> 数据规模：$1\le N\le10^5$，$1\le K\le20$，$0\le C_i\le1000$。

最开始的想法是，按照 DFS 顺序维护一个距离堆，然后用类似滑动窗口的做法把过远的点弹出。

但是树上距离在 DFS 序中并不连续，从父亲走向某个儿子时，不同方向的旧点距离还会分别增加或减少，如果只是使用普通优先队列，没法统一更新这些值。

$K \le 20$ 时可以为每个点保存一小段距离状态。定义 `dp[u][d]` 表示在 $u$ 的子树中，与 $u$ 距离不超过 $d$ 的奶牛数；第一次 DFS 将儿子的 `dp[v][d-1]` 加入当前节点。

然后发现两个相邻的点之间状态是可以很方便转移的，所以再来一次 DFS 用于换根 DP：把父亲方向的信息传给儿子。

儿子距离不超过 $d$ 的外部点，先由父亲的 `dp[u][d-1]` 提供，不过其中重复包含儿子子树内距离不超过 $d-2$ 的部分，因此需要减去旧的 `dp[v][d-2]`。

换根更新必须让 $d$ 从大到小。这样读取 `dp[v][d-2]` 时，它仍然是第一次 DFS 得到的子树信息。

```cpp title:"P3047" fold
int n, k;
vector<int> adj[maxn];
int C[maxn];
ll dp[maxn][maxk];

void dfs1( int u, int p ) {
    for( int d = 0; d <= k; ++ d ) {
        dp[u][d] = C[u];
    }
    for( int v : adj[u] ) {
        if( v == p ) continue;
        dfs1( v, u );
        for( int d = 1; d <= k; ++ d ) {
            dp[u][d] += dp[v][d - 1];
        }
    }
}

void dfs2( int u, int p ) {
    for( int v : adj[u] ) {
        if( v == p ) continue;
        for( int d = k; d >= 1; -- d ) {
            dp[v][d] += dp[u][d - 1];
            if( d >= 2 ) dp[v][d] -= dp[v][d - 2];
            // 容斥原理
        }
        dfs2( v, u );
    }
}

void solve( ) {
    n = read( ), k = read( );

    for( int i = 1; i < n; ++ i ) {
        int u = read( ), v = read( );
        adj[u].push_back( v );
        adj[v].push_back( u );
    }

    for( int i = 1; i <= n; ++ i ) {
        C[i] = read( );
    }

    dfs1( 1, 0 );
    dfs2( 1, 0 );

    for( int i = 1; i <= n; ++ i ) {
        cout << dp[i][k] << '\n';
    }
}
```
