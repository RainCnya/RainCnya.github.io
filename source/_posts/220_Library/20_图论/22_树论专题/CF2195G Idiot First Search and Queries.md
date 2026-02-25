---
title: '[Leaf] [CF2195G] Idiot First Search and Queries'
tags:
  - DP/树形
  - 树论/欧拉序
  - 策略/倍增
  - 难度/P5
categories:
  - 220_Library
  - 20_图论
  - 22_树论专题
abbrlink: 966fb3c8
date: 2026-02-16 15:03:54
---

# [CF2195G - Idiot First Search and Queries](https://codeforces.com/contest/2195/problem/G)

## 1. 题面梗概

**中译中**：背景同 E 题，[[CF2195E Idiot First Search]]。有 $q$ 次询问，每次询问给定起点 $v$ 和步数 $k$，求 Bob 移动 $k$ 步后所处的节点。

## 2. 逻辑推导

简单回顾上一题的思路：$dp1[u]$ 为遍历 $u$ 的子树并移动到父节点 $p$ 的时间。

然后我们记 $dp2[u]$ 为从 $u$ 点回到 $0$ 的路径时间总和。

### 2.1 路径

其实这个 $dp2$ 也可以用于计算路径的结构。

假设 $w$ 是 $v$ 的祖先，那么从 $v$ 点到 $w$ 点的时间就是：$dp2[v] - dp2[w]$。

那么我们其实就是在树上寻找最低的 $u$ 点，使得 $dp2[v] - dp2[u] \leq k$。

这个意思就是最终的路径是在 $u$ 的子树中（包括 u 点）。

那么最终到了哪个节点呢？首先它在 $u$  的子树，我们结合遍历顺序查询即可。

### 2.2 类欧拉序

现在问题转化为了 $u$ 点移动 $rem = k - (dp2[v] - dp2[u])$ 步到了哪个节点。

我们可以通过一次 DFS 构造出这个 全局时间轴 数组 `order`：

1. **进入节点** $u$：记录当前时间为 $pos[u]$。
    
2. **左子树**：递归处理 $l_u$。处理完后，Bob 会回到 $u$。
    
3. **右子树**：递归处理 $r_u$。处理完后，Bob 会回到 $u$。
    
4. **移向父节点**：最后一步离开 $u$。

这个 `order` 数组的大小约为 $2N$，记录了每一秒 Bob 所在的节点编号。

接着就可以直接 $O(1)$ 查表 $order[ pos[u] + rem ]$。

### 2.3 结论

通过将树上游走过程降维为一个线性的数组，我们将复杂的 树上倍增定位 简化为了 数组 $O(1)$ 查表。

> 类似树链剖分，理论上这题也能 HLD，但是复杂度有点难说。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 3e5 + 5;
const int maxlg = 20;

struct Node { int l, r, p; } tr[maxn];
ll dp1[maxn], dp2[maxn];
int up[maxn][maxlg];
int pos[maxn];
vector< int > order;
int n, q;

void dfs1( int u, int p )
{
    if( u == 0 ) return ;
    tr[u].p = p;
    if( tr[u].l == 0 )
    {
        dp1[u] = 1;
        return ;
    }
    dfs1( tr[u].l, u );
    dfs1( tr[u].r, u );
    dp1[u] = dp1[tr[u].l] + dp1[tr[u].r] + 3;
}

void dfs2( int u, ll sum )
{
    if( u == 0 ) return ;
    dp2[u] = dp1[u] + sum;
    
    up[u][0] = tr[u].p;
    for( int i = 1; i < maxlg; ++ i ) up[u][i] = up[ up[u][i - 1] ][i - 1];

    if( tr[u].l == 0 ) return ;
    dfs2( tr[u].l, dp2[u] );
    dfs2( tr[u].r, dp2[u] );
}

void dfs3( int u )
{
    pos[u] = order.size( ) - 1;
    if( tr[u].l == 0 ) 
    {
        order.push_back( tr[u].p );
        return ;
    }
    order.push_back( tr[u].l );
    dfs3( tr[u].l );
    order.push_back( tr[u].r );
    dfs3( tr[u].r );
    order.push_back( tr[u].p );
}

void solve( )
{
    cin >> n >> q;

    order.clear( );
    for( int i = 1; i <= n; ++ i )
    {
        tr[i].l = tr[i].r = 0;
        dp1[i] = dp2[i] = pos[i] = 0;
        for( int j = 0; j < maxlg; ++ j ) up[i][j] = 0;
    }

    for( int i = 1; i <= n; ++ i ) cin >> tr[i].l >> tr[i].r;

    dfs1( 1, 0 );
    dfs2( 1, 0 );
    order.push_back( 1 );
    dfs3( 1 );

    while( q -- )
    {
        ll v, k;
        cin >> v >> k;

        ll u = v;
        for( int i = maxlg - 1; i >= 0; -- i )
        {
            if( up[u][i] == 0 ) continue;
            if( dp2[v] - dp2[ up[u][i] ] <= k ) u = up[u][i];
        }
        ll rem = k - ( dp2[v] - dp2[u] );
        cout << order[ pos[u] + rem ] << " ";
    }
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

- **复杂度分析**：$O( (n + q) \log n )$。
    
- **碎碎念**：关键还是在于理解 Bob 的这个神秘遍历顺序，把时间轴压扁成一个一维的数组，然后通过倍增快速查询即可。
    
- **关联笔记**：[[树形DP体系]] | [[倍增策略]] | [[欧拉序]]
