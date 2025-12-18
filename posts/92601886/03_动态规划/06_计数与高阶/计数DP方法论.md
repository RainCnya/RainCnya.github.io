---
title: 计数DP方法论 (Counting Methodology)
tags:
  - 计数DP
  - 容斥原理
  - 组合数学
categories:
  - 00_Atlas
  - 03_动态规划
abbrlink: 95fc4668
date: 2025-12-16 22:40:00
---

## 1. 生态位

* **定义**: 求解满足特定约束的**方案总数** (Answer is Number of Ways)。
* **解决痛点**:
    * **组合爆炸**: 直接搜索无法处理指数级方案。
    * **复杂约束**: "至少一个"、"至多一半" 等限制条件 (P5664 Emiya)。

## 2. 逻辑支点

* **核心直觉 1: 循环序决定排列/组合**。
    * **组合 (Combination)**: 物品无序 $\implies$ **先枚举物品，再枚举容量**。
    * **排列 (Permutation)**: 物品有序 $\implies$ **先枚举容量，再枚举物品**。
* **核心直觉 2: 正难则反 (Inclusion-Exclusion)**。
    * 当限制条件是 "Globally Constraint" (如所有食材不超过总数的一半) 时，直接构造很难。
    * **转化**: $Total - Illegal$。
    * **非法判定**: 只需要枚举**哪一个**成分超过了一半，就可以将全局约束转化为局部约束。

## 3. 实战部署

### 3.1 整数划分 (P1025)

{% fold info @Code: Integer Partition %}

```cpp
// dp[i][j]: 将 i 划分为 j 份的方案数
// 策略: 
// 1. j 份中至少有 1 份是 1 -> dp[i-1][j-1] (拿掉这个 1)
// 2. j 份都大于 1 -> 每份减去 1 -> dp[i-j][j]
dp[i][j] = dp[i-1][j-1] + dp[i-j][j];
```

{% endfold %}

### 3.2 容斥原理 (P5664 Emiya 家今天的饭)

- **问题**: 选 $K$ 道菜，每行最多 1 个，每列最多 $\lfloor K/2 \rfloor$ 个。
    
- **策略**:
    
    1. 计算总方案数 $Total$ (只考虑行限制，不考虑列限制)。
        
    2. 枚举**非法列** $c$ (即该列选了超过一半)。
        
    3. $dp[i][j]$ 表示前 $i$ 行，列 $c$ 比其他列**多选**了 $j$ 个。
        

{% fold info @Code: Inclusion-Exclusion DP %}

```cpp
// Total Ways: Product(sum[i] + 1) - 1 (减去全空的情况)

long long illegal = 0;
for( int c = 1; c <= m; ++ c ) // 枚举非法列
{
    memset( dp, 0, sizeof(dp) );
    dp[0][n] = 1; // Offset n (用 n 代表 0 差值，防止负下标)
    
    for( int i = 1; i <= n; ++ i )
    {
        for( int j = n - i; j <= n + i; ++ j )
        {
            // 1. 不选这行
            dp[i][j] = dp[i-1][j];
            // 2. 选非法列 c (+1 diff)
            if( j > 0 )
                dp[i][j] = (dp[i][j] + dp[i-1][j-1] * a[i][c]) % MOD;
            // 3. 选其他列 (-1 diff)
            // others = row_sum[i] - a[i][c]
            if( j < 2*n )
                dp[i][j] = (dp[i][j] + dp[i-1][j+1] * (sum[i] - a[i][c])) % MOD;
        }
    }
    // 统计 diff > 0 的情况 (即 j > n)
    for( int j = n + 1; j <= 2*n; ++ j ) 
        illegal = (illegal + dp[n][j]) % MOD;
}
// Ans = (Total - illegal + MOD) % MOD
```

{% endfold %}

## 4. 知识粘附

- **母题索引**:
    
    - **[Luogu-P1025](https://www.luogu.com.cn/problem/P1025)**: 数的划分。
        
    - **[Luogu-P5664](https://www.luogu.com.cn/problem/P5664)**: Emiya 家今天的饭 (容斥 DP 经典)。