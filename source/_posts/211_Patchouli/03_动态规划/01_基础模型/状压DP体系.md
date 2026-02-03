---
title: 状压DP体系 (State Compression System)
tags:
  - DP/状压
categories:
  - 211_Patchouli
  - 03_动态规划
  - 01_基础模型
abbrlink: 8b130bbd
date: 2025-12-16 22:35:00
---
# 状压体系

## 1. 生态位

- **定义**: 将集合状态（Subset）或小型拓扑结构通过二进制位映射为一个整数。利用位运算的并行特性，在 $O(1)$ 时间内执行集合的交、并、补及归属判定。
    
- **解决痛点**: 解决了 $N \le 20$ 级规模下，指数级子集选择、TSP 路径规划以及棋盘覆盖等无法线性扫描的难题。
    
## 2. 逻辑支点

- **核心不变量**: **位权独立性**。每一个二进制位代表一个独立的物理元素（如：第 $i$ 个城市是否访问，第 $j$ 列是否放炮）。
    
- **算子映射**:
    
    - 判定包含: `( mask >> i ) & 1`
        
    - 加入元素: `mask | ( 1 << i )`
        
    - 移除元素: `mask ^ ( 1 << i )`
        
    - 子集遍历: `for( int sub = mask; sub; sub = ( sub - 1 ) & mask )`
        
- **渗透点 (Penetration)**:
    
    > 状压是逻辑上的“降维打击”。 它将高维的逻辑空间（由 $N$ 个 bool 变量构成的空间）强行挤压进一个 32 位或 64 位的物理整型中。所有的状态转移本质上是在对这个整数进行位模式的改写。
    

## 3. 实战部署

### 3.1 集合子集遍历 (以最优解合并为例)

{% fold info @Code: Subset Traversal %}

```cpp
// 核心：利用 ( sub - 1 ) & mask 技巧跳过无效状态
for( int mask = 1; mask < ( 1 << n ); ++ mask )
{
    // 遍历 mask 的所有非空子集 sub
    for( int sub = mask; sub; sub = ( sub - 1 ) & mask )
    {
        f[ mask ] = max( f[ mask ], f[ mask ^ sub ] + val[ sub ] );
    }
}
```

{% endfold %}

### 3.2 棋盘相邻约束判定 (以 P1896 互不侵犯为例)

{% fold info @Code: Mask Compatibility %}

```cpp
// 判定当前行 mask 是否合法
bool check( int mask )
{
    // 不能有相邻的 1
    return !( mask & ( mask << 1 ) );
}

// 判定两行 mask1, mask2 是否冲突
bool conflict( int m1, int m2 )
{
    // 垂直冲突、左对角线冲突、右对角线冲突
    if( m1 & m2 ) return true;
    if( m1 & ( m2 << 1 ) ) return true;
    if( m1 & ( m2 >> 1 ) ) return true;
    return false;
}
```

{% endfold %}

## 4. 知识粘附

- **变体模型**:
    
    - [单调性优化体系](单调性优化体系.md): SOS DP (Sum Over Subsets) —— 高维前缀和在子集统计中的应用。
        
    - [网格DP体系](网格DP体系.md): 轮廓线 DP (Profile DP) —— 状压在网格边缘的动态滑动。
        
- **母题索引**:
    
    - [P4310 绝世好题](P4310%20绝世好题.md) —— 位运算在值域 DP 中的渗透。
        
    - [ARC100C Or Plus Max](ARC100C%20Or%20Plus%20Max.md) —— 子集和优化的高阶范式。
        
    - [P2051 中国象棋](P2051%20中国象棋.md) —— 状态抽象对状压维度的二次压缩。
        