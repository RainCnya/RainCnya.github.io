---
title: ST表与倍增 (Sparse Table & Binary Lifting)
tags:
  - ST表
  - 倍增
  - RMQ
categories:
  - 00_Atlas
  - 01_数据结构
abbrlink: e6c1b327
date: 2025-12-12 00:21:02
---

## 1. 生态位

* **定义**: 利用 **二进制拆分** 思想，通过 $O(N \log N)$ 预处理，实现 $O(1)$ 或 $O(\log N)$ 快速跳跃的技术。
* **解决痛点**:
    * **ST表**: **静态**区间最值查询 (RMQ)。在查询量巨大时，优于线段树的 $O(\log N)$ 查询。
    * **LCA (树上倍增)**: 树上任意两点的最近公共祖先，避免 $O(N)$ 暴力上跳。
* **局限性**: ST表不支持**修改**（修改需重构，代价巨大）。

## 2. 逻辑支点

* **倍增原理**: 任何整数 $K$ 均可被分解为二进制幂的组合 ($2^0, 2^1, \dots$)。
* **状态转移 (DP)**:
    * **步长倍增 (LCA)**: 跳 $2^i$ 步 = 先跳 $2^{i-1}$ 步，再从新位置跳 $2^{i-1}$ 步。
        $$F[u][i] = F[ F[u][i-1] ][ i-1 ]$$
    * **区间拼合 (ST表)**: 长度 $2^i$ 的最值 = 左半 $2^{i-1}$ 与右半 $2^{i-1}$ 的最值（允许重叠）。
        $$ST[j][i] = \max( ST[j][i-1], ST[j + 2^{i-1}][i-1] )$$

## 3. 实战部署

### 3.1 ST 表 (静态 RMQ)

{% fold info @Code: ST Table %}
```cpp
// st[i][j] 表示从 i 开始，长度为 2^j 的区间最大值
int st[maxn][21]; 
int lg[maxn]; // 预处理 log 值

void init( ) 
{
    // 1. 预处理 log (常数优化)
    lg[1] = 0;
    for( int i = 2; i <= n; ++ i ) lg[i] = lg[i >> 1] + 1;
        
    // 2. Base Case (j=0)
    for( int i = 1; i <= n; ++ i ) st[i][0] = a[i];
        
    // 3. DP 递推 (外层枚举 j)
    for( int j = 1; j <= 20; ++ j ) 
    {
        for( int i = 1; i + ( 1 << j ) - 1 <= n; ++ i ) 
        {
            st[i][j] = max( st[i][j - 1], 
                            st[i + ( 1 << ( j - 1 ) )][j - 1] );
        }
    }
}

int query( int l, int r ) 
{
    int k = lg[r - l + 1];
    // 重叠覆盖：取左端长 2^k 和右端长 2^k
    return max( st[l][k], st[r - ( 1 << k ) + 1][k] );
}
```

{% endfold %}

### 3.2 倍增 LCA (Tree Binary Lifting)

- **策略**: 先将深度深的节点跳到同一深度，再同步上跳。
    

{% fold info @Code: Binary Lifting LCA %}

```C++
// fa[u][i] 表示 u 的 2^i 级祖先
int fa[maxn][21], dep[maxn];

// 1. DFS 预处理 fa[u][0] 和深度
void dfs( int u, int father ) 
{
    dep[u] = dep[father] + 1;
    fa[u][0] = father;
    
    // 倍增预处理
    for( int i = 1; i <= 20; ++ i ) 
        fa[u][i] = fa[ fa[u][i - 1] ][i - 1];
        
    for( int v : adj[u] ) 
    {
        if( v != father ) dfs( v, u );
    }
}

// 2. 查询 LCA
int lca( int u, int v ) 
{
    if( dep[u] < dep[v] ) swap( u, v );
    
    // Step 1: 让 u 跳到和 v 同一层
    for( int i = 20; i >= 0; -- i ) 
    {
        if( dep[ fa[u][i] ] >= dep[v] ) u = fa[u][i];
    }
    
    if( u == v ) return u;
    
    // Step 2: u 和 v 一起往上跳，直到 LCA 的下一层
    for( int i = 20; i >= 0; -- i ) 
    {
        if( fa[u][i] != fa[v][i] ) 
        {
            u = fa[u][i];
            v = fa[v][i];
        }
    }
    
    // Step 3: 返回父节点
    return fa[u][0];
}
```

{% endfold %}

## 4. 知识粘附

- **母题索引**:
    
    - **[Luogu P3865](https://www.luogu.com.cn/problem/P3865) ST 表模板**
        
    - **[Luogu P3379](https://www.luogu.com.cn/problem/P3379) LCA 模板**
        