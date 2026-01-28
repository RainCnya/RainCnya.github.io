---
title: 计数DP方法论 (Counting System)
tags:
  - DP/计数
  - 数学/容斥原理
categories:
  - 01_Patchouli
  - 03_动态规划
  - 02_高级模型
abbrlink: 95fc4668
date: 2025-12-16 22:40:00
---
# 计数DP体系

## 1. 生态位

- **定义**: 专注于求解满足特定复杂约束的“方案总数”而非“最优值”的模型。
    
- **解决痛点**: 解决了全局性约束（如：某列不得超过总数一半）导致的合法状态定义困难。
    
## 2. 逻辑支点

- **正难则反 (Inclusion-Exclusion)**:
    
    - **渗透点**: 当正面构造状态需要记录太多历史信息时，转而计算“非法方案数”。
        
    - **逻辑归约**: 全局非法往往可以坍缩为某个局部特征的极端表现（如 P5664 中只需枚举哪一个单列非法）。
        
- **状态机模型**:
    
    - 将计数过程视为在有限自动机（DFA）上的行走，每个字符或决策是一次状态转移。
        
- **核心不变量**: **循环序决定对称性**。
    
    - 先物品后容量 $\implies$ 组合（不计顺序）。
        
    - 先容量后物品 $\implies$ 排列（计算顺序）。
        

## 3. 实战部署

### 3.1 容斥差值 DP (以 Emiya 家今天的饭为例)

{% fold info @Code: Exclusion DP Pattern %}

```cpp
// 核心：f[ i ][ j ] 记录 (非法列选择数 - 其余列选择数) 的差值
f[ 0 ][ n ] = 1; // 偏移量 n 防止负下标
for( int i = 1; i <= n; ++ i )
{
    for( int j = n - i; j <= n + i; ++ j )
    {
        // 1. 不选：继承方案数
        f[ i ][ j ] = f[ i - 1 ][ j ];
        // 2. 选非法列 c：差值 +1
        f[ i ][ j ] = ( f[ i ][ j ] + f[ i - 1 ][ j - 1 ] * a[ i ][ c ] ) % mod;
        // 3. 选其他列：差值 -1
        f[ i ][ j ] = ( f[ i ][ j ] + f[ i - 1 ][ j + 1 ] * others[ i ] ) % mod;
    }
}
```

{% endfold %}

## 4. 知识粘附

- **变体模型**:
    
    - [状压DP体系](../状压DP体系.md): 针对小规模集合的精确计数。
        
    - [线性DP体系](线性DP体系.md): 波动序列与排列对称性的结合。
        
- **母题索引**:
    
    - [P5664 Emiya 家今天的饭 (Inclusion_Exclusion_Grid)](P5664%20Emiya%20家今天的饭%20(Inclusion_Exclusion_Grid).md) —— 全局约束向局部非法的容斥映射。
        
    - [P2467 地精部落 (Seq_Wiggle_Permutation)](P2467%20地精部落%20(Seq_Wiggle_Permutation).md) —— 补集对称性在排列计数中的应用。
        
    - [P1758 管道取珠 (Grid_Walking_Conversion)](P1758%20管道取珠%20(Grid_Walking_Conversion).md) —— 平方和方案数的同步博弈转化。