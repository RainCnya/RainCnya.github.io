---
title: '[Leaf] [CF2196C2] Interactive Graph (Hard Version)'
tags:
  - 交互
  - 图论/基础
  - DP/记忆化搜索
  - 难度/P5
categories:
  - 220_Library
  - 70_杂项专题
  - 73_交互专题
abbrlink: eb83cf7a
date: 2026-02-12 00:00:00
---

# [CF2196C2 - Interactive Graph (Hard Version)](https://codeforces.com/contest/2196/problem/C2)

## 1. 题面梗概 

**中译中**：交互题，给定有一个 DAG，你可以询问 **所有路径按字典序排序后**，第 $k$ 条路径是什么。

目标是在有限次数内通过询问把所有的边都还原出来。

> 限制条件 $n + m$ 次询问，$n \leq 30$。

## 2. 逻辑推导

限制条件不允许我们采用二分了，它要求我们的每一次询问都得至少找到一条边或者一个新的顶点。

### 2.1 递归

由 [[CF2196C1 Interactive Graph (Simple Version)]]，可以得到字典序的规律。

如果顶点 $u$ 在排序列表中的位次是 $rnk$，且它的邻居为 $v_{1},v_{2}, \dots$，那么：

- $(u)$ 位于 $rnk$。
- $(u, v_{1})$ 的第一条路径必然位于 $rnk + 1$。
- $(u,v_{2})$ 的第一条路径必然位于 $rnk + 1 + dp[v_{1}]$。
- $\dots$

### 2.2 DFS

那么问题就转化为了：询问邻居 $\to$ 算子树大小 $\to$ 跳步找下一个，这就引导我们采用一个 DFS 的记忆化搜索。

`dfs( u, rnk, dep );` 表示搜索以 $u$ 为起点的所有路径，且当前搜索到了路径的第 $dep$ 位。

这个 DFS 的任务就是返回以 $u$ 为起点的路径总共有多少条。

### 2.3 结论

交互 + 字典序 + 记忆化搜素 + 分治。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 30 + 5;
const int maxm = maxn * maxn;

struct Edge { int u, v; } edges[maxm];

int cache[maxn];
ll dp[maxn];
int n, m;

int ask( ll k )
{
    cout << "? " << k << endl;
    int len = 0;
    cin >> len;
    if( len == 0 ) return 0;
    for( int i = 0; i < len; ++ i ) cin >> cache[i];
    return len;
}

ll dfs( int u, ll rnk, int dep )
{
    if( dp[u] != -1 ) return dp[u];
    ll cnt = 1;
    while( 1 )
    {
        int len = ask( rnk + cnt );
        if( len <= dep || cache[dep] != u ) break;
        int v = cache[dep + 1];
        edges[m ++] = { u, v };
        cnt += dfs( v, rnk + cnt, dep + 1 );
    }
    return dp[u] = cnt;
}

void solve( )
{
    cin >> n;
    memset( dp, -1, sizeof( dp ) );
    m = 0;
    ll rnk = 1;
    for( int i = 1; i <= n; ++ i )
    {
        if( dp[i] == -1 ) dfs( i, rnk, 0 );
        rnk += dp[i];
    }
    
    cout << "! " << m << endl;
    for( int i = 0; i < m; ++ i ) cout << edges[i].u << " " << edges[i].v << endl;
}

int main( )
{
    int _t = 1;
    cin >> _t;
    while( _t -- ) solve( );
    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度分析**：$O(N + M)$ 询问。
    
- **碎碎念**：这题的 DFS 函数要加入 `dep` 这个参数，不然在递归的过程中，如果只记录 `cache[1]` 的话，会 WA，特别是递归到第三层之后。
     
- **关联笔记**：[[交互专题]]
