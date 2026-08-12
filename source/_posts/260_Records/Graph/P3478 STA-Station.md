---
title: P3478 STA-Station
tags:
  - 图论/树
  - DP/树形
status: solved
categories:
  - 260_Records
  - Graph
abbrlink: p3478001
date: 2026-08-10 00:00:00
updated: 2026-08-10 00:00:00
---

# P3478 STA-Station

> [!question] [P3478 [POI 2008] STA-Station](https://www.luogu.com.cn/problem/P3478)
> 给定一棵由 \(n\) 个节点组成的树，需要选择其中一个节点作为根。每个节点的深度等于它到根的简单路径长度，要求让所有节点的深度之和尽可能大，并输出任意一个能够达到最大值的根。
>
> 数据规模：\(1\le n\le 10^6\)。

> 这是一个典型的树形换根 DP 问题，核心是研究根沿一条边移动时答案如何变化。

朴素的想法是枚举每个节点作为根，再遍历整棵树计算深度和，但这样总复杂度为 \(\mathcal{O}(n^2)\)，无法通过本题。

定义 \(f[u]\) 表示以节点 \(u\) 为根时，所有节点的深度之和。不妨先以节点 \(1\) 为根，通过第一次 DFS 求出每个节点的子树大小 `siz[u]`，同时按根深度为 \(0\) 计算初始状态 \(f[1]\)。

接下来考虑把根从节点 \(u\) 移到它的儿子 \(v\)。此时 \(v\) 子树内共有 \(\operatorname{siz}[v]\) 个节点，它们到新根的距离都减少 \(1\)；其余 \(n-\operatorname{siz}[v]\) 个节点到新根的距离都增加 \(1\)。

因此可以得到换根转移 \(f[v]=f[u]-\operatorname{siz}[v]+n-\operatorname{siz}[v]\)，也就是 \(f[v]=f[u]+n-2\operatorname{siz}[v]\)，于是相邻两个根之间的答案可以在 \(\mathcal{O}(1)\) 时间内完成转移。

第二次 DFS 从节点 \(1\) 出发，沿父子关系递推出所有 \(f[u]\)，最后取其中最大的节点即可。两次 DFS 都只遍历整棵树一次，因此总时间复杂度为 \(\mathcal{O}(n)\)，空间复杂度为 \(\mathcal{O}(n)\)。

本题允许 \(n\) 达到 \(10^6\)，链状树会产生同阶递归深度。当前实现保留原递归写法；若运行环境栈空间较小，应改为显式栈完成两次遍历。

```cpp title:"P3478 STA-Station" fold
int n;
vector<int> adj[maxn];
int dep[maxn], siz[maxn];
ll f[maxn];

void dfs1( int u, int p ) {
    siz[u] = 1, dep[u] = p ? dep[p] + 1 : 0;
    f[1] += dep[u];
    for( int v : adj[u] ) {
        if( v == p ) continue;
        dfs1( v, u );
        siz[u] += siz[v];
    }
}

void dfs2( int u, int p ) {
    for( int v : adj[u] ) {
        if( v == p ) continue;
        f[v] = f[u] - siz[v] + n - siz[v];
        dfs2( v, u );
    }
}

void solve( ) {
    n = read( );
    for( int i = 1; i < n; ++ i ) {
        int u = read( ), v = read( );
        adj[u].push_back( v );
        adj[v].push_back( u );
    }
    dfs1( 1, 0 );
    dfs2( 1, 0 );

    int rt = 1;
    for( int i = 2; i <= n; ++ i ) {
        if( f[i] > f[rt] ) rt = i;
    }
    printf( "%d\n", rt );
}
```

## 记录

- 归属：换根 DP；

- 新增：相邻根之间的距离和差值只由儿子子树大小决定，因此一次子树统计加一次换根遍历就能求出所有根的答案。

- 分类：待定
