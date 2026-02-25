---
title: '[Leaf] [CF2195E] Idiot First Search'
tags:
  - DP/树形
  - 树论/欧拉序
  - 搜索/DFS
  - 难度/P3
categories:
  - 220_Library
  - 20_图论
  - 22_树论专题
abbrlink: 683084fa
date: 2026-02-16 14:30:44
---

# [CF2195E - Idiot First Search](https://codeforces.com/contest/2195/problem/E)

## 1. 题面梗概

**中译中**：Bob 在一棵二叉树上漫游。

**规则**：如果是叶子就回父节点；如果是非叶子，按 “无标记 $\to$ 走左子树、标记 L $\to$ 走右子树、标记 R $\to$ 回父节点” 的顺序循环。

求从每个节点 $k$ 出发到达根节点 $0$ 所需的总步数。

## 2. 逻辑推导

虽然规则看起来很绕，但其物理意义非常明确：Bob 必须**清空当前节点的整棵子树**后，才能移动到父节点。

### 2.1 树上DP

我们定义 $dp[u]$ 为遍历 $u$ 的子树并移动到父节点 $p$ 的时间。

**转移**：$dp[u] = dp[l_{u}] + dp[r_{u}] + 3$。

**边界**：若 $u$ 是叶子节点，则 $dp[u] = 1$。

### 2.2 前缀和

从节点 $k$ 出发到达根节点 $0$ 的总时间，等于路径上所有节点 $u$ 的 $dp[u]$ 总和，那么就可以用一种类似 DP 前缀和的思路计算出最终答案。

### 2.3 结论

这是个典型的树上路径问题，关键在于梳理明白它的这个树上遍历顺序，然后用 树上DP 就能轻松求解了。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 3e5 + 5;
const int mod = 1e9 + 7;

struct Node { int l, r; } tr[maxn];
ll dp[maxn], ans[maxn];
int n;

void dfs1( int u )
{
    if( u == 0 ) return ;
    if( tr[u].l == 0 )
    {
        dp[u] = 1;
        return ;
    }
    dfs1( tr[u].l );
    dfs1( tr[u].r );
    dp[u] = ( dp[tr[u].l] + dp[tr[u].r] + 3 ) % mod;
}

void dfs2( int u, ll sum )
{
    if( u == 0 ) return ;
    ans[u] = ( dp[u] + sum ) % mod;
    if( tr[u].l == 0 ) return ;
    dfs2( tr[u].l, ans[u] );
    dfs2( tr[u].r, ans[u] );
}

void solve( )
{
    cin >> n;

    for( int i = 1; i <= n; ++ i )
    {
        tr[i].l = tr[i].r = 0;
        dp[i] = ans[i] = 0;
    }

    for( int i = 1; i <= n; ++ i ) cin >> tr[i].l >> tr[i].r;

    dfs1( 1 );
    dfs2( 1, 0 );

    for( int i = 1; i <= n; ++ i ) cout << ans[i] << " ";
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

- **复杂度分析**：$O( n )$。
    
- **碎碎念**：这个傻瓜优先遍历挺扯的，换成类后序遍历就好理解了。
    
- **关联笔记**：[[树形DP体系]] | 
