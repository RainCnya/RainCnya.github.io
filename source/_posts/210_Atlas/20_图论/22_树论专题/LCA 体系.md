---
title: '[Note] LCA 体系'
tags:
  - 图论/树论
  - 难度/P3
categories:
  - 210_Atlas
  - 20_图论
  - 22_树论专题
abbrlink: 56fdb705
date: 2026-02-05 22:03:33
---
# [L4] LCA 体系

## 1. 生态位

- **识别**:
    
    1. **汇合点**: 两个点 $u, v$ 在树上往上走，第一次相遇的地方。
        
    2. **树上距离**: 求两点间距离公式 $dist(u, v) = dep[u] + dep[v] - 2 \cdot dep[lca(u, v)]$。
        
    3. **路径操作**: 树上差分、树链剖分修改路径权值的基础锚点。
        
- **地位**: 树论专题的基础工具。它是求树上两点间距离的必备工具。
    
- **用途**: 解决树上路径的统计、差分约束以及树形结构的降维。

> Lowest Common Ancestor 最近公共祖先

## 2. 逻辑支点

### 2.1 倍增法

- **核心原理**: **二进制拆分**。 任意一个整数距离 $k$ 都可以被分解为 $2$ 的幂次之和。 我们可以预处理出每个点向上跳 $2^0, 2^1, \dots, 2^{20}$ 步到达的祖先。
    
- **状态转移**:

$$
up[u][i] = up[ \ up[u][i-1] \ ][i-1]
$$

- 说人话：$u$ 的 $2^i$ 祖先 $iff$ $u$ 的 $2^{i-1}$ 祖先的 $2^{i-1}$ 祖先。 

### 2.2 树链剖分

- **核心原理**: **轻重边划分**。为了让跳跃更快，我们将树剖分为“重链”和“轻边”。
    
    - **重儿子**: 子树最大的那个儿子（最“重”的方向）。
        
    - **重链**: 由一系列重儿子连成的路径（树上的“高速公路”）。
        
    - **Top**: 每条链的顶端节点。
        
- **跳跃逻辑**: 如果 $u$ 和 $v$ 不在同一条链上，谁的链顶（$top$）深度大，谁就往上跳，而且是一步跳到链顶的父亲（切换到上一条链）。这比倍增的 $\log N$ 更快，常数极小。

## 3. 实战部署

### 3.1 倍增 LCA (在线算法)

适用于只求 LCA，不涉及修改树结构的情况。

{% fold info @Binary Lifting LCA %}

```cpp
const int maxn = 500010;
const int maxlg = 20; // 2^20 > 5e5

vector< int > adj[maxn];
int up[maxn][maxlg];
int dep[maxn];
int n, m, root;

// 1. 预处理 DFS
void dfs( int u, int p )
{
    dep[u] = dep[p] + 1;
    up[u][0] = p;
    
    // 倍增递推
    for( int i = 1; i < maxlg; ++ i )
    {
        up[u][i] = up[ up[u][i - 1] ][i - 1];
    }
    
    for( int v : adj[u] )
    {
        if( v == p ) continue;
        dfs( v, u );
    }
}

// 2. 查询 LCA
int get_lca( int u, int v )
{
    // 确保 u 是深度较深的那个
    if( dep[u] < dep[v] ) swap( u, v );
    
    int diff = dep[u] - dep[v];
    
    // u 向上跳，直到和 v 同层
    for( int i = maxlg - 1; i >= 0; -- i )
    {
        // 如果跳 2^i 步还在 v 下面(或同层)，就跳
        if( ( diff >> i ) & 1 ) u = up[u][i];
    }
    
    if( u == v ) return u;
    
    // u 和 v 一起倍增向上跳
    for( int i = maxlg - 1; i >= 0; -- i )
    {
        if( up[u][i] != up[v][i] )
        {
            u = up[u][i], v = up[v][i];
        }
    }
    
    return up[u][0];
}
```

{% endfold %}

### 3.2 树链剖分 LCA (高速 / 路径修改前置)

常数比倍增小，且是学习线段树维护树上路径的前置。

{% fold info @HLD LCA %}

```cpp
const int maxn = 500010;

vector< int > adj[maxn];
int fa[maxn], dep[maxn], siz[maxn], son[maxn]; // DFS1 维护信息
int top[maxn]; // DFS2 维护链顶
int n, m, root;

// DFS 1: 计算子树大小、深度、父节点、重儿子
void dfs1( int u, int p )
{
    fa[u] = p;
    dep[u] = dep[p] + 1;
    siz[u] = 1;
    son[u] = 0; // 初始化重儿子
    
    int max_siz = -1;
    
    for( int v : adj[u] )
    {
        if( v == p ) continue;
        dfs1( v, u );
        siz[u] += siz[v];
        
        // 更新重儿子：谁的子树大，谁就是重儿子
        if( siz[v] > max_siz )
        {
            max_siz = siz[v];
            son[u] = v;
        }
    }
}

// DFS 2: 建立重链，记录 top
// u: 当前节点, t: 当前链的顶端
void dfs2( int u, int t )
{
    top[u] = t;
    
    // 优先处理重儿子，延续重链
    if( son[u] ) dfs2( son[u], t );
    
    // 处理轻儿子，轻儿子是新链的开端
    for( int v : adj[u] )
    {
        if( v == fa[u] || v == son[u] ) continue;
        dfs2( v, v ); // 轻儿子自己就是新链的 top
    }
}

// HLD 查询 LCA: 类似“跳链”
int get_lca( int u, int v )
{
    // 如果 u 和 v 不在同一条链上，就往上跳
    while( top[u] != top[v] )
    {
        // 谁的链顶深度大，谁往上跳
        if( dep[top[u]] < dep[top[v]] ) swap( u, v );
        
        // u 跳到链顶的父亲 (切换到上一条链)
        u = fa[top[u]];
    }
    
    // 在同一条链上了，深度小的就是 LCA
    return dep[u] < dep[v] ? u : v;
}

// 初始化调用
// dfs1(root, 0);
// dfs2(root, root);
```

{% endfold %}

## 4. 知识关联

- **母题**: [[Leaf] [P3379] 最近公共祖先]
    
- **关联笔记**:
    
    - [[树链剖分]]: 本文仅使用了 HLD 求 LCA，HLD 的完全体结合线段树可维护路径权值。
        
    - [[虚树]]: 利用 LCA 压缩关键点，构建辅助树。