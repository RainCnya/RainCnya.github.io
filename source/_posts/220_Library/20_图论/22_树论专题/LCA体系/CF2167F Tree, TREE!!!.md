---
title: '[Leaf] [CF2167F] Tree, TREE!!!'
tags:
  - 树论/LCA
  - 组合/贡献法
  - 难度/P3
categories:
  - 220_Library
  - 20_图论
  - 22_树论专题
abbrlink: '51752414'
date: 2026-01-06 00:00:00
---
    
# [CF2167F - Tree, TREE!!!](https://codeforces.com/contest/2167/problem/F)

## 1. 核心逻辑

- **模型抽象**: 求所有可能的根 $r$ 下，LCA 集合大小的总和。

	- 通过贡献法转化为：每个节点 $u$ 在多少种根的选择下能成为 LCA。
    
- **逻辑支点 (不变量推导)**:
    
    1. **判定准则**: 在 $k \ge 2$ 的树中，节点 $u$ 是 LCA 的充要条件是 $sz(u, r) \ge k$。
        
    2. **连通块分割**: 移除 $u$ 后，树分裂为若干个连通分支 $C_1, C_2, \dots, C_m$。
        
    3. **规模演化**: 若根 $r \in C_j$，则 $sz(u, r) = n - |C_j|$。
        
- **降维路径**:
    
    - $O(N^2)$：枚举 $r$，DFS 统计。
        
    - $O(N)$：枚举 $u$，遍历其邻居分支，统计满足 $n - |C_j| \ge k$ 的分支大小之和。
        

## 2. 代码实现

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
    
    int t;
    cin >> t;
    while( t -- )
    {
        solve( );
    }
    return 0;
}
```

{% endfold %}

## 3. 复盘

- **复杂度**: $O(N)$。利用树的分裂性质规避了重复的子树计算。
    
- **关键直觉**: 子树规模的本质是“不包含根的那一侧的节点总数”。
    
- **关联母题**: [[贡献法]], [[树的重心与连通块分解]]