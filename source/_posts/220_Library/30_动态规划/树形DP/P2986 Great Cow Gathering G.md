---
title: "[Leaf] [P2986] Great Cow Gathering G"
tags:
  - DP/树形
  - 树论/重心
  - 难度/P3
date: 2026-2-26 16:45:11
---

# [P2986 [USACO10MAR] Great Cow Gathering G - 洛谷](https://www.luogu.com.cn/problem/P2986)

## 1. 题面梗概

**中译中**：给出一棵 $n$ 个点的树，每个点上有 $c_i$ 只奶牛，边有长度。要求选出一个点作为集会点，使得所有奶牛到该点的“距离 $\times$ 数量”之和最小。

> $1 \le n \le 10^5, 0 \le c_i, L_i \le 10^3$

## 2. 逻辑推导

这个描述其实挺像 **树上重心** 的，不过我们这里用 DP 的角度分析。

如果对每个点都跑一遍全树遍历，复杂度为 $O( N^2 )$，`TLE`。

### 2.1 递推

观察发现，当我们把选定的集会点从父节点 $u$ 移动到相邻的子节点 $v$ 时，整棵树的变化是有规律的。

- 对于 $v$ 子树内的所有奶牛，它们到集会点的距离都 **减少** 了 $w(u, v)$。

- 对于 $v$ 子树外的所有奶牛，它们到集会点的距离都 **增加** 了 $w(u, v)$。

### 2.2 换根DP

**预处理**：

- 定义 $sz[u]$ 为以 $u$ 为根的子树内奶牛的总数；

$$sz[u] = c_u + \sum_{v \in son(u)} sz[v]$$
- $f[u]$ 为所有子树内奶牛到达 $u$ 的代价和。

$$f[u] = \sum_{v \in son(u)} (f[v] + sz[v] \cdot w)$$


**换根DP**：

- 定义 $ans[u]$ 为以 $u$ 为全树集会点时的总代价。 

- 当我们从 $u$ 移动到 $v$ 时：$sz[v]$ 只奶牛近了 $w$， $(Total - sz[v])$ 只奶牛远了 $w$。

$$ans[v] = ans[u] + (Total - sz[v]) \cdot w - sz[v] \cdot w$$

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 1e5 + 5;
const ll inf = 1e18;

struct Edge { int v, w; };

vector< Edge > adj[maxn];
ll f[maxn];
// f 子树贡献
ll ans[maxn];
ll sz[maxn];
ll val[maxn];
int total = 0;
int n;

// 自底向上预处理子树贡献
void dfs1( int u, int p )
{
    sz[u] = val[u];
    f[u] = 0;
    for( auto [v, w] : adj[u] )
    {
        if( v == p ) continue;
        dfs1( v, u );
        sz[u] += sz[v];
        f[u] += f[v] + sz[v] * w;
    }
}

// 自顶向下换根DP 
void dfs2( int u, int p )
{
    for( auto [v, w] : adj[u] )
    {
        if( v == p ) continue;
        ans[v] = ans[u] + ( total - sz[v] ) * w - sz[v] * w;
        dfs2( v, u );
    }
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    
    cin >> n;
    for( int i = 1; i <= n; ++ i )
    {
        cin >> val[i];
        total += val[i];
    }

    for( int i = 1; i < n; ++ i )
    {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    }

    dfs1( 1, 0 );
    ans[1] = f[1];
    dfs2( 1, 0 );

    ll res = inf;
    for( int i = 1; i <= n; ++ i ) res = min( res, ans[i] );
    cout << res << '\n';

    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度分析**：$O( N )$。
    
- **碎碎念**：两次 DFS 实现树上换根DP，关键在于找出状态的转移。
    
- **关联笔记**：[[树图DP#换根DP]] | [[直径与重心]]
