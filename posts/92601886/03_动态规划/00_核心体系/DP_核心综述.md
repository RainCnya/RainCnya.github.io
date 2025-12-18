---
title: 动态规划体系综述 (DP Core Synthesis)
tags:
  - DP
  - 方法论
categories:
  - 00_Atlas
  - 03_动态规划
abbrlink: 1c960464
date: 2025-12-16 22:05:00
---

## 1. 生态位

* **定义**: 将原问题分解为相对独立的子问题，并记录子问题的解以避免重复计算。
* **核心要素**:
    * **重叠子问题**: 必须有重复计算，否则不如直接爆搜。
    * **最优子结构**: 大问题的最优解可以由小问题的最优解推导而来。
    * **无后效性**: 状态一旦确定，其后的演变只与当前状态有关，与“怎么走到这一步”无关。

## 2. 逻辑支点

* **记忆化搜索 vs 递推**:
    * **记忆化 (Top-Down)**: 适合状态稀疏、状态转移复杂的情况。
    * **递推 (Bottom-Up)**: 适合状态稠密、甚至可以滚动数组优化空间的情况。
* **消除后效性**:
    * **增加维度**: 既然当前信息不够，就加一维状态记录它 (如分层图最短路)。
    * **转化问题**: 如将“环形”转化为“链式”。

## 3. 实战部署

### 3.1 记忆化搜索模板

{% fold info @Code: Memoization %}
```cpp
int memo[maxn];
int dfs( int x )
{
    if( memo[x] != -1 ) return memo[x];
    
    int res = 0;
    // Transition Logic
    for( int next : adj[x] )
    {
        res = max( res, dfs( next ) + 1 );
    }
    
    return memo[x] = res;
}
```

{% endfold %}