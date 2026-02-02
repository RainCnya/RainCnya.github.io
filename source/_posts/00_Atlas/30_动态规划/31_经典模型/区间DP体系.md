---
title: 区间DP体系 (Interval System)
tags:
  - DP/区间
  - 算法/环形处理
categories:
  - 00_Atlas
  - 30_动态规划
  - 31_经典模型
abbrlink: a75f3b7c
date: 2025-12-16 22:25:00
---
# 区间与环形体系

## 1. 生态位

- **定义**: 状态定义在序列的**连续闭区间** $[i, j]$ 上，通过枚举**分割点** $k$ 或处理**端点关系**，由小区间收益推导大区间最值的模型。
    
- **解决痛点**: 解决了**全局最优解不具备局部线性增长特性**，但具备局部合并特性的场景。
    
## 2. 逻辑支点

- **核心不变量**: **拓扑序由区间长度决定**。
    
    - 状态转移必须遵循 $len = 1 \to N$ 的物理演化。
        
- **断环成链 (The Broken Ring)**:
    
    - 环形结构的通用解法：将序列复制一倍接在末尾，使得环上任意长度为 $N$ 的路径都对应长链上的一个子区间。
        
- **渗透点 (Penetration)**:
    
    > 区间 DP 是在试图寻找“最后一次操作”发生在哪里。 不管是石子合并的最后一捏，还是括号匹配的最后一次闭合，端点或分割点就是那个决定全局权值的逻辑锚点。
    

## 3. 实战部署

### 3.1 标准区间合并模板

{% fold info @Code: Interval Merge %}

```cpp
// 核心：三层循环。len -> left -> split
for( int len = 2; len <= n; ++ len )
{
    for( int l = 1; l + len - 1 <= n; ++ l )
    {
        int r = l + len - 1;
        for( int k = l; k < r; ++ k )
        {
            f[ l ][ r ] = max( f[ l ][ r ], f[ l ][ k ] + f[ k + 1 ][ r ] + cost( l, r ) );
        }
    }
}
```

{% endfold %}

### 3.2 递归结构 (括号/树序)

{% fold info @Code: Recursive Structure %}

```cpp
// 针对 CF149D 等题型，通过 DFS + 记忆化处理匹配逻辑
int solve( int l, int r, int state )
{
    if( l >= r ) return base_case;
    if( memo[ l ][ r ][ state ] != -1 ) return memo[ l ][ r ][ state ];

    if( match[ l ] == r ) // 嵌套型
    {
        // 递归处理子区间 [l+1, r-1]
    }
    else // 拼接型
    {
        // 裂解为 [l, match[l]] 和 [match[l]+1, r]
    }
}
```

{% endfold %}

## 4. 知识粘附

- **变体模型**:
    
    - [树形DP体系](../树形DP体系.md): 当区间 DP 的状态映射至树的 DFS 序时，产生交叉。
        
    - [单调性优化体系](单调性优化体系.md): 四边形不等式对区间 DP $O(N^3) \to O(N^2)$ 的降维优化。
        
- **母题索引**:
    
    - [P4170 涂色 (Interval_Coloring)](P4170%20涂色%20(Interval_Coloring).md) —— 边界贪心与分裂合并的入门。
        
    - [P3205 合唱队 (Interval_Queue_Insert)](P3205%20合唱队%20(Interval_Queue_Insert).md) —— 逆向生长视角下的状态定义。
        
    - [P5851 Greedy Pie Eaters P](P5851%20Greedy%20Pie%20Eaters%20P.md) —— 辅助数组对区间最后一次跨越的捕捉。
        