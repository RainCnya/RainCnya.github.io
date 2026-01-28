---
title: 树形DP体系 (Tree DP System)
tags:
  - DP/树形
  - DP/背包
categories:
  - 01_Patchouli
  - 03_动态规划
  - 01_基础模型
abbrlink: b6a340a7
date: 2025-12-16 22:30:00
---
# 树形DP体系

## 1. 生态位

- **定义**: 在树形拓扑结构上执行决策。状态通常定义为以 $u$ 为根的子树的最优解，转移方向由叶节点向根节点回传。
    
- **解决痛点**: 解决了具备层级依赖关系、连通性约束（如最大独立集）以及路径统计类的组合优化问题。
    
## 2. 逻辑支点

- **核心不变量**: **子树独立性**。在不考虑换根的情况下，根节点的决策仅受子树状态约束，不受其父节点或兄弟节点影响。
    
- **状态转移范式**:
    
    - **选择模型**: $f[ u ][ 0/1 ]$ 表示 $u$ 点选或不选。
        
    - **背包模型**: $f[ u ][ j ]$ 表示以 $u$ 为根的子树分配 $j$ 个资源。
        
- **渗透点 (Penetration)**:
    
    > **树形背包的** $O(N^2)$ **律令**: 在树上做背包时，若通过限制 `j` 的范围为当前子树大小 `sz[ u ]`，则合并两个子树的复杂度本质上是枚举两两点对。根据组合逻辑，全局总复杂度坍缩为 $O(N^2)$ 而非 $O(N \cdot V)$。
    

## 3. 实战部署

### 3.1 树上最大权独立集 (以 P1352 为例)

{% fold info @Code: Max Independent Set %}

```cpp
void dfs( int u, int fa )
{
    f[ u ][ 1 ] = val[ u ]; // 选 u，初始权值为自身
    f[ u ][ 0 ] = 0;        // 不选 u

    for( int v : adj[ u ] )
    {
        if( v == fa ) continue;
        dfs( v, u );
        
        // 1. 若选 u，则子节点 v 必不能选
        f[ u ][ 1 ] += f[ v ][ 0 ];
        
        // 2. 若不选 u，则子节点 v 选或不选均可，取最优
        f[ u ][ 0 ] += max( f[ v ][ 0 ], f[ v ][ 1 ] );
    }
}
```

{% endfold %}

### 3.2 树上背包 (Size 优化范式)

{% fold info @Code: Tree Knapsack Optimization %}

```cpp
// 核心：利用 sz[u] 限制循环范围，实现 O(N^2) 降维
void dfs( int u, int fa )
{
    sz[ u ] = 1;
    f[ u ][ 1 ] = val[ u ];

    for( int v : adj[ u ] )
    {
        if( v == fa ) continue;
        dfs( v, u );
        
        // 倒序循环防止同一子树物品复用
        for( int j = min( m, sz[ u ] + sz[ v ] ); j >= 1; -- j )
        {
            // 限制 k 的范围在子树 v 内
            for( int k = 1; k <= min( j - 1, sz[ v ] ); ++ k )
            {
                f[ u ][ j ] = max( f[ u ][ j ], f[ u ][ j - k ] + f[ v ][ k ] );
            }
        }
        sz[ u ] += sz[ v ];
    }
}
```

{% endfold %}

## 4. 知识粘附

- **进阶模型**:
    
    - [单调性优化体系](单调性优化体系.md): 换根 DP (二次扫描法) —— 解决“根节点不确定”时的全局统计。
        
    - [复合模型与逆向思维](复合模型与逆向思维.md): 虚树 (Virtual Tree) —— 处理仅有少量关键点的树上 DP。
        
- **母题索引**:
    
    - [P1064 金明的预算](P1064%20金明的预算.md) —— 依赖关系在树形结构上的背包表现。
        
    - [P1040 加分二叉树 (Interval_Tree_Order)](P1040%20加分二叉树%20(Interval_Tree_Order).md) —— 中序遍历与子树区间的同构映射。
        
    - [P1352 没有上司的舞会](https://www.luogu.com.cn/problem/P1352 "null") —— 树形独立集母题。
        
    - [P2014 选课](https://www.luogu.com.cn/problem/P2014 "null") —— 树上背包标准范式。