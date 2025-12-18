---
title: 树形DP体系 (Tree DP)
tags:
  - 树形DP
  - 树上背包
categories:
  - 00_Atlas
  - 03_动态规划
abbrlink: b6a340a7
date: 2025-12-16 22:30:00
---

## 1. 生态位

* **定义**: 在树形结构上，由子树的状态 ($v \in son(u)$) 推导父节点状态 ($u$)。
* **遍历顺序**: 通常采用 **DFS 后序遍历** (先子树，后根节点)。

## 2. 逻辑支点

* **选择模型 (没有上司的舞会)**:
    * $dp[u][0]$: $u$ 不选，子节点可选可不选 $\to \sum \max(dp[v][0], dp[v][1])$。
    * $dp[u][1]$: $u$ 选，子节点必不选 $\to \sum dp[v][0]$。
* **直径模型 (最长链)**:
    * 维护子树中以 $u$ 为起点的最长链 $d_1$ 和次长链 $d_2$。
    * 经过 $u$ 的最长路径 = $d_1 + d_2$。

## 3. 实战部署

### 3.1 没有上司的舞会 (P1352)

{% fold info @Code: Max Independent Set %}

```cpp
void dfs( int u ) 
{
    dp[u][0] = 0;
    dp[u][1] = r[u]; // r[u] 为快乐指数
    
    for( int v : adj[u] ) 
    {
        dfs( v );
        dp[u][0] += max( dp[v][0], dp[v][1] );
        dp[u][1] += dp[v][0];
    }
}
```

{% endfold %}

## 4. 知识粘附

- **母题索引**:
    
    - **[Luogu-P1352](https://www.luogu.com.cn/problem/P1352)**: 没有上司的舞会 (最大权独立集)。
        
    - **[Luogu-P2015](https://www.luogu.com.cn/problem/P2015)**: 二叉苹果树 (树上背包)。
        