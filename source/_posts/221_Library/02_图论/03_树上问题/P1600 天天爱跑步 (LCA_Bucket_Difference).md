---
title: 'P1600 [NOIP2016] 天天爱跑步 (LCA_Bucket_Difference)'
tags:
  - 算法/前缀差分
  - 图论/树论/LCA
  - 组合/贡献法
difficulty: 省选
categories:
  - 221_Library
  - 02_图论
  - 03_树上问题
abbrlink: 7dd0a134
date: 2025-11-03 00:00:00
---
# [Luogu-P1600](https://www.luogu.com.cn/problem/P1600) 天天爱跑步

## 1. 核心逻辑

### 问题本质
在一棵树上，有 $M$ 个玩家从 $S_i$ 跑到 $T_i$（每秒走一步）。求对于每个节点 $u$，有多少个玩家在第 $w_u$ 秒恰好经过它。

### 破局思路
1.  **路径拆解**:
    路径 $S \to T$ 并非单纯向上或向下，需拆解为 $S \to LCA$ (上行段) 和 $LCA \to T$ (下行段)。

2.  **公式推导**:
    * **上行段 ($S \to LCA$)**:
        玩家 $S$ 能被 $u$ 观测到 $\iff dep[s] - dep[u] = w[u]$。
        移项得：$dep[s] = dep[u] + w[u]$。
    * **下行段 ($LCA \to T$)**:
        玩家 $S$ 能被 $u$ 观测到 $\iff dep[s] + dep[u] - 2 \cdot dep[LCA] = w[u]$。
        移项得：$dep[s] - 2 \cdot dep[LCA] = w[u] - dep[u]$。

3.  **算法形态**:
    * 问题转化为：在 $u$ 的子树中，有多少个起点的特定属性 ($Val$) 等于 $u$ 的特征值。
    * **全局桶 + 树上差分**:
        利用 DFS 序进出栈的差值 (`cnt[val] - last_cnt[val]`) 来统计子树内的贡献。
        为了消除非子树路径的影响，需在 $S$ 处 $+1$，在 $fa[LCA]$ (上行) 或 $LCA$ (下行) 处 $-1$。

## 2. 代码实现

{% fold info @AcCode %}
```cpp
#include<bits/stdc++.h>
using namespace std;
using PII = pair<int, int>;

const int maxn = 3e5 + 50;
const int maxlg = 20;

vector<int> adj[maxn];
int fa[maxn][maxlg];
int dep[maxn];

int n, m;
int w[maxn];
int ans[maxn];

vector<PII> add[maxn];
vector<PII> del[maxn];
int c1[maxn << 1]; // 桶1：处理上行
int c2[maxn << 1]; // 桶2：处理下行

void dfs( int u, int father )
{
    fa[u][0] = father;
    dep[u] = dep[father] + 1;
    for( int v : adj[u] )
        if( v != father )
            dfs( v, u );
}

void lcaInit( )
{
    dfs( 1, 0 );
    for( int j = 1; j < maxlg; ++ j )
        for( int i = 1; i <= n; ++ i )
            fa[i][j] = fa[ fa[i][j-1] ][j-1];
}

int getlca( int u, int v )
{
    if( dep[u] < dep[v] ) swap( u, v );
    int diff = dep[u] - dep[v];
    for( int i = 0; ( 1 << i ) <= diff; ++ i )
    {
        if( ( 1 << i ) & diff )
            u = fa[u][i];
    }
    if( u == v ) return u;
    for( int i = maxlg - 1; i >= 0; -- i )
    {
        if( fa[u][i] != fa[v][i] )
        {
            u = fa[u][i];
            v = fa[v][i];
        }
    }
    return fa[u][0];
}

void dfsSolve( int u )
{
    int upVal = w[u] + dep[u];
    int dnVal = w[u] - dep[u] + maxn; // 偏移量防止负数

    int pre1 = 0;
    if( 0 <= upVal && upVal < maxn << 1 ) pre1 = c1[upVal];

    int pre2 = 0;
    if( 0 <= dnVal && dnVal < maxn << 1 ) pre2 = c2[dnVal];

    // 处理当前节点的修改
    for( auto p : add[u] )
    {
        if( p.first == 0 ) c1[p.second] ++;
        else c2[p.second + maxn] ++;
    }
    for( auto p : del[u] )
    {
        if( p.first == 0 ) c1[p.second] --;
        else c2[p.second + maxn] --;
    }

    for( int v : adj[u] )
    {
        if( v != fa[u][0] )
            dfsSolve( v );
    }

    int res1 = 0;
    if( 0 <= upVal && upVal < maxn << 1 ) res1 = c1[upVal];

    int res2 = 0;
    if( 0 <= dnVal && dnVal < maxn << 1 ) res2 = c2[dnVal];

    // 差分统计子树贡献
    ans[u] = ( res1 - pre1 ) + ( res2 - pre2 );
}

int main( )
{
    ios::sync_with_stdio(0); cin.tie(0);

    cin >> n >> m;

    for( int i = 1; i <= n - 1; ++ i )
    {
        int u, v;
        cin >> u >> v;
        adj[u].push_back( v );
        adj[v].push_back( u );
    }

    for( int i = 1; i <= n; ++ i ) cin >> w[i];

    lcaInit( );

    for( int i = 1; i <= m; ++ i )
    {
        int s, t;
        cin >> s >> t;
        int lca = getlca( s, t );

        // 上行路径处理
        int upVal = dep[s];
        add[s].push_back({ 0, upVal });
        int pa = fa[lca][0];
        if( pa != 0 )
            del[pa].push_back({ 0, upVal });

        // 下行路径处理
        int dnVal = dep[s] - 2 * dep[lca];
        add[t].push_back({ 1, dnVal });
        del[lca].push_back({ 1, dnVal });
    }

    dfsSolve( 1 );

    for( int i = 1; i <= n; ++ i )
    {
        cout << ans[i] << (i == n ? "" : " ");
    }
    cout << '\n';

    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: Time: $O(N + M \log N)$ | Space: $O(N)$.
    
- **易错点**:
    
    - **负数下标**: 下行公式中 $w[u] - dep[u]$ 可能为负，必须加偏移量 `maxn`。
        
    - **差分位置**: 上行是在 `fa[lca]` 处消除影响，而下行是在 `lca` 处消除影响（因为 $S \to LCA$ 包含 LCA，而 $LCA \to T$ 也包含 LCA，需避免重复统计或漏算，本题拆解方式保证 LCA 归属下行处理）。
        