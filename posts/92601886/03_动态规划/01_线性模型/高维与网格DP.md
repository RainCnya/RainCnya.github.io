---
title: 高维与网格DP (High dimensional & grid DP)
tags:
  - 网格图
  - 多路DP
categories:
  - 00_Atlas
  - 03_动态规划
abbrlink: fbbfeb81
date: 2025-12-16 22:15:00
---

## 1. 生态位

* **定义**: 状态包含多个维度的线性 DP，常出现于网格图的路径规划问题。
* **场景**: 数字金字塔、从 $(1,1)$ 走到 $(N,M)$ 的最优路径。

## 2. 逻辑支点

* **多线程并发 (传纸条模型)**:
    * 问题: 两条路径不能重叠，求最大权值和。
    * 转化: 两个人同时从起点出发。
    * **状态**: $dp[k][x_1][x_2]$ 表示走了 $k$ 步，第一人在 $(x_1, k-x_1)$，第二人在 $(x_2, k-x_2)$。
    * **去重**: 当 $x_1 == x_2$ 时，表示两人走到同一点，权值只加一次。

## 3. 实战部署

### 3.1 传纸条 (P1006)

{% fold info @Code: Paper Passing %}

```cpp
// dp[k][i][j]: 步数 k, A在 i行, B在 j行
for( int k = 2; k <= n + m; ++ k )
    for( int i = 1; i <= n; ++ i )
        for( int j = 1; j <= n; ++ j )
        {
            int col1 = k - i, col2 = k - j;
            if( col1 < 1 || col1 > m || col2 < 1 || col2 > m ) continue;
            
            int t = max( max( dp[k-1][i][j], dp[k-1][i-1][j-1] ),
                         max( dp[k-1][i][j-1], dp[k-1][i-1][j] ) );
            
            dp[k][i][j] = t + val[i][col1];
            if( i != j ) dp[k][i][j] += val[j][col2];
        }
```

{% endfold %}

## 4. 知识粘附

- **母题索引**:
    
    - **[Luogu-P1006](https://www.luogu.com.cn/problem/P1006)**: 传纸条 (双线程 DP)。
        
    - **[Luogu-P1216](https://www.luogu.com.cn/problem/P1216)**: 数字三角形 (入门模型)。
        