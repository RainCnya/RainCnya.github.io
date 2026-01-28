---
title: 背包DP体系 (Knapsack System)
tags:
  - DP/背包
categories:
  - 01_Patchouli
  - 03_动态规划
  - 01_基础模型
abbrlink: 8be0e5f9
date: 2025-12-16 22:20:00
---
# 背包模型体系

## 1. 生态位

- **定义**: 在有限容量/重量资源限制下，通过对离散物品进行最优组合选择，实现价值最大化的模型。
    
- **解决痛点**: 解决了子集选择问题、资源分配及“恰好凑成”类的可达性判定问题。
    
- **本质**: **维度限制下的路径规划**。
    

## 2. 逻辑支点

- **核心不变量**: **循环方向决定复用性**。
    
    - **倒序 (**$V \to w$**)**: 隔离当前层的决策影响，确保每个物品仅选 **1次** (01 背包、分组背包)。
        
    - **正序 (**$w \to V$**)**: 利用当前层刚更新的状态，实现物品 $\infty$ **次** 复用 (完全背包)。
        
- **渗透点 (Penetration)**:
    
    > “容量”是状态网格中的一层物理屏障。所有的变体（多重、依赖、分组）本质上都是通过**二进制拆分**或**策略互斥**，将复杂的拓扑选择支坍缩回基础的线性转移。
    

## 3. 实战部署

### 3.1 基础背包范式 (1D 优化)

{% fold info @Code: 01 & Complete Knapsack %}

```cpp
// 1. 0/1 背包: 倒序循环防止复用
for( int i = 1; i <= n; ++ i )
{
    for( int j = V; j >= w[ i ]; -- j )
    {
        f[ j ] = max( f[ j ], f[ j - w[ i ] ] + v[ i ] );
    }
}

// 2. 完全背包: 正序循环允许复用
for( int i = 1; i <= n; ++ i )
{
    for( int j = w[ i ]; j <= V; ++ j )
    {
        f[ j ] = max( f[ j ], f[ j - w[ i ] ] + v[ i ] );
    }
}
```

{% endfold %}

### 3.2 分组背包 (互斥策略)

{% fold info @Code: Group Knapsack %}

```cpp
// 容量循环在外，组内物品在内，确保每组仅出一个物品
for( int k = 1; k <= group_cnt; ++ k )
{
    for( int j = V; j >= 0; -- j )
    {
        for( auto &item : group[ k ] )
        {
            if( j >= item.w ) f[ j ] = max( f[ j ], f[ j - item.w ] + item.v );
        }
    }
}
```

{% endfold %}

### 3.3 多重背包 (二进制拆分)

{% fold info @Code: Binary Splitting %}

```cpp
// 将 count 个物品拆分为 log(count) 个 0/1 物品
void add( int w, int v, int count )
{
    for( int k = 1; k <= count; k <<= 1 )
    {
        real_items.push_back( { w * k, v * k } );
        count -= k;
    }
    if( count > 0 ) real_items.push_back( { w * count, v * count } );
}
```

{% endfold %}

## 4. 知识粘附

- **变体模型**:
    
    - [单调性优化体系](单调性优化体系.md): 利用单调队列将多重背包优化至 $O(V)$。
        
    - [复合模型与逆向思维](复合模型与逆向思维.md): 背包与状态机（飞扬的小鸟）的融合分析。
        
- **母题索引**:
    
    - [P5020 货币系统](P5020%20货币系统.md) —— 完全背包用于基底筛选。
        
    - [P1064 金明的预算](P1064%20金明的预算.md) —— 树形依赖转分组策略。
        
    - [P5322 排兵布阵](P5322%20排兵布阵.md) —— 分组背包实战。
        