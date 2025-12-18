---
title: MST体系与瓶颈路 (MST, LCA & Bottleneck)
tags:
  - MST
  - 瓶颈路
  - Kruskal重构树
categories:
  - 00_Atlas
  - 02_图论
abbrlink: cd7fb2f0
date: 2025-12-16 17:30:17
---

## 1. 生态位

* **MST (最小生成树)**: 图的**稀疏化**骨架。保留了图的连通性与瓶颈性质。
* **生态位细分**:
    * **Kruskal**: 稀疏图首选，易于编写，天然支持“重构树”。
    * **Prim ($O(N^2)$)**: **稠密图** ($M \approx N^2$) 首选。
* **LCA (最近公共祖先)**: 树上路径信息的聚合点。
* **联合应用**: **瓶颈路问题** —— 在多条路径中寻找“最大边最小”或“最小边最大”的路径。

## 2. 逻辑支点

* **MST 的贪心本质**:
    * **Kruskal (边优先)**: 自下而上的合并。每选一条边，就是合并两个集合。
    * **Prim (点优先)**: 类似 Dijkstra。维护集合 $S$ 到外部 $V-S$ 的最短边 $dist$。
* **瓶颈路定理**:
    * 图中任意两点 $u, v$ 间路径的**最大边权最小值**，一定等于 MST 上 $u, v$ 路径的最大边权。
    * *转化*: 原图的最优路径问题 $\to$ MST 上的 LCA 路径最值查询。

## 3. 实战部署

### 3.1 Kruskal (稀疏图/标准)

{% fold info @Code: Kruskal %}
```cpp
// 适用于 M ~ N log N 或 M << N^2
struct Edge { int u, v, w; };
bool operator < ( const Edge& a, const Edge& b ) { return a.w < b.w; }

void kruskal( ) 
{
    sort( edges + 1, edges + m + 1 );
    for( int i = 1; i <= n; ++ i ) fa[i] = i;
    
    int cnt = 0;
    for( int i = 1; i <= m; ++ i ) 
    {
        auto [u, v, w] = edges[i];
        int ru = find( u ), rv = find( v );
        if( ru != rv ) 
        {
            fa[ru] = rv;
            mst_weight += w;
            // add_tree_edge(u, v, w); // 建树用于 LCA
            if( ++ cnt == n - 1 ) break;
        }
    }
}
```

{% endfold %}

### 3.2 Prim (稠密图/邻接矩阵)

> **关键**: 使用 `vis` 数组和 `min_dist` 数组，不使用堆，严格 $O(N^2)$。

{% fold info @Code: Prim Dense %}

```C++
// 适用于 N <= 3000, M 极大
int g[maxn][maxn]; // 邻接矩阵
int min_dist[maxn]; // 点到当前生成树集合的最短距离
bool vis[maxn];

void prim( ) 
{
    memset( min_dist, 0x3f, sizeof min_dist );
    memset( vis, 0, sizeof vis );
    
    min_dist[1] = 0;
    int tot_weight = 0;
    
    for( int i = 0; i < n; ++ i ) // 循环 n 次，每次加入一个点
    {
        int u = -1;
        // 1. 寻找距离集合最近的未访问点
        for( int j = 1; j <= n; ++ j )
        {
            if( ! vis[j] && ( u == -1 || min_dist[j] < min_dist[u] ) )
                u = j;
        }
        
        if( u == -1 || min_dist[u] == INF ) break; // 图不连通
        
        vis[u] = 1;
        tot_weight += min_dist[u];
        
        // 2. 用新加入的点 u 更新其他点
        for( int v = 1; v <= n; ++ v )
        {
            if( ! vis[v] && g[u][v] < min_dist[v] )
                min_dist[v] = g[u][v];
        }
    }
}
```

{% endfold %}

### 3.3 瓶颈路应用 (MST + LCA)

> 场景: 求两点间“最大边最小”的路径。
> 
> 流程: 建 MST $\to$ DFS 预处理倍增数组 max_w[u][i] $\to$ LCA 查询。

{% fold info @Code: Bottleneck Query %}

```C++
// DFS 预处理: f[u][i] 祖先, max_w[u][i] 路径最大边
void dfs( int u, int father, int w ) 
{
    dep[u] = dep[father] + 1;
    f[u][0] = father;
    max_w[u][0] = w; 

    for( int i = 1; i < 20; ++ i ) 
    {
        f[u][i] = f[ f[u][i-1] ][ i-1 ];
        max_w[u][i] = max( max_w[u][i-1], max_w[ f[u][i-1] ][ i-1 ] );
    }
    // ... 遍历子节点
}

// 查询 u, v 路径上的最大边
int query_max( int u, int v ) 
{
    if( dep[u] < dep[v] ) swap( u, v );
    int ans = 0;
    
    // 1. 上跳对齐
    for( int i = 19; i >= 0; -- i )
    {
        if( dep[ f[u][i] ] >= dep[v] ) 
        {
            ans = max( ans, max_w[u][i] );
            u = f[u][i];
        }
    }
    if( u == v ) return ans;
    
    // 2. 同步上跳
    for( int i = 19; i >= 0; -- i )
    {
        if( f[u][i] != f[v][i] ) 
        {
            ans = max( ans, max( max_w[u][i], max_w[v][i] ) );
            u = f[u][i];
            v = f[v][i];
        }
    }
    // 最后还需要合并连接 LCA 的两条边
    ans = max( ans, max( max_w[u][0], max_w[v][0] ) );
    return ans;
}
```

{% endfold %}

## 4. 高阶建模

### 4.1 Kruskal 重构树

- **原理**: 在 Kruskal 合并 $u, v$ 时，不直接连边，而是新建虚点 $P$ (点权为边权 $w$)，令 $P$ 为 $u, v$ 所在集合根节点的父节点。
    
- **性质**:
    
    - 原图变为一棵有 $2N-1$ 个节点的树（叶子为原图节点）。
        
    - 原图 $u, v$ 所有路径瓶颈的最大值 $\iff$ 重构树上 `LCA(u, v)` 的点权。
        
    - 这是一个**大顶堆**（父节点权值 $\ge$ 子节点）。
        

## 5. 知识粘附

- **关联算法**:
    
    - **DSU (并查集)**: Kruskal 的基石。
        
    - **次小生成树**: 在 MST 基础上，枚举非树边 $(u, v)$，替换 MST 上 $u \to v$ 路径的最大边。

    - **树链剖分**: 支持带修改的路径查询（见 **[重链剖分](重链剖分.md)**）。

- **母题索引**:
    
    - **[Luogu P1967](https://www.luogu.com.cn/problem/P1967) 货车运输** (最大生成树 + LCA 瓶颈路)
        
    - **[POJ 1797](http://poj.org/problem?id=1797) Heavy Transportation** (Prim 变体/瓶颈路)