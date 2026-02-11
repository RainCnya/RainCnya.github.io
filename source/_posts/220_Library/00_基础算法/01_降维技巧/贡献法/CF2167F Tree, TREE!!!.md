---
title: '[Leaf] [CF2167F] Tree, TREE!!!'
tags:
  - 树论/LCA
  - 组合/贡献法
  - 难度/P3
categories:
  - 220_Library
  - 00_基础算法
  - 01_降维技巧
abbrlink: '51752414'
date: 2026-01-06 00:00:00
updated: 2026-02-10 23:11:53
---
    
# [CF2167F - Tree, TREE!!!](https://codeforces.com/contest/2167/problem/F)

## 1. 题面梗概

**中译中**：定义 $f(r)$ 为：以 $r$ 为根时，树中所有能作为 “某 $k$ 个节点的 LCA” 的节点 $u$ 的数量。

求 $\sum_{r=1}^{n} f(r)$。

## 2. 逻辑推导

最简单的思路就是直接枚举 $r$ 跑 $n$ 次 DFS，复杂度是 $O(N^2)$ 肯定不行。

### 2.1 转化

在一个固定的根 $r$ 下，节点 $u$ 能成为某 $k$ 个节点的 LCA 的充要条件是什么？

- **直觉**：$u$ 的子树里至少得有 $k$ 个点。
    
- **证明**：只要 $u$ 的子树大小 $sz(u, r) \ge k$，我们总能选出 $k$ 个点（比如选 $u$ 自己加上子树内任意 $k-1$ 个点，或者分布在不同子树的 $k$ 个点），使得它们的 LCA 恰好是 $u$。

所以，问题转化为：**计算有多少对** $(r, u)$**，使得以** $r$ **为根时，**$u$ **的子树大小** $\ge k$**。**

### 2.2 贡献法

我们统计每个节点 $u$ 在多少个 $r$ 的选择下能满足条件。当节点 $u$ 被选中时，如果我们把 $u$ 从树中移除，整棵树会分裂成若干个连通块 $\{C_1, C_2, \dots, C_m\}$：

1. $r = u$：此时子树大小为 $n$，由于 $n \ge k$（ 题目条件 ），$u$ 必然计入贡献。
    
2. $r \in C_i$：此时以 $r$ 为根，$u$ 的子树就是 “除了 $C_i$ 之外的所有点”。
    
    - 子树大小 $sz(u, r) = n - |C_i|$。
        
    - 只要 $n - |C_i| \ge k$，即 $|C_i| \le n - k$，则该连通块内的所有点 $r$ 都能让 $u$ 成为贡献点。

### 2.3 结论

这是一个典型的**贡献法 + 连通块拆分**问题。

## 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 2e5 + 50;
vector<int> adj[maxn];
int sz[maxn];
int n, k;

// 初始采样：建立静态父子关系以确定各分支大小
void dfs( int u, int fa )
{
    sz[u] = 1;
    for( int v : adj[u] )
    {
        if( v == fa ) continue;
        dfs_pre( v, u );
        sz[u] += sz[v];
    }
}

void solve( )
{
    cin >> n >> k;
    for( int i = 1; i <= n; ++ i ) adj[i].clear( );

    for( int i = 1; i < n; ++ i )
    {
        int u, v;
        cin >> u >> v;
        adj[u].push_back( v );
        adj[v].push_back( u );
    }

    dfs( 1, 0 );

    ll ans = 0;
    for( int u = 1; u <= n; ++ u )
    {
        // 1. 根 r = u 的情况，sz(u, r) = n >= k 恒成立
        ans += 1;

        // 2. 遍历邻居，每个邻居代表一个连通分支
        for( int v : adj[u] )
        {
            int s; // 分支大小
            if( sz[v] < sz[u] ) s = sz[v]; // v 在 u 的下方
            else s = n - sz[u]; // v 在 u 的上方

            // 若根落在该分支内，u 的有效子树规模为 n - s
            if( n - s >= k ) ans += s;
        }
    }
    
    cout << ans << '\n';
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );
    int t; cin >> t;
    while( t -- ) solve( );
    return 0;
}
```

{% endfold %}

## 4. 复盘

- **复杂度分析**：整体复杂度 $O(N)$。
        
- **碎碎念**：这题看起来像是个复杂的动态 LCA 问题，但通过“贡献法”拆解后，变成了简单的子树规模统计。
    
- **关联笔记**：[[贡献法]]