---
title: 状压DP体系
tags:
  - 状压DP
  - TSP
categories:
  - 00_Atlas
  - 03_动态规划
abbrlink: 8b130bbd
date: 2025-12-16 22:35:00
---

## 1. 生态位

* **定义**: 将集合状态 ($S \subseteq \{1 \dots N\}$) 压缩为二进制整数，利用位运算进行转移。
* **适用范围**: 数据规模极小 ($N \le 20$)。

## 2. 逻辑支点

* **集合操作**:
    * $i \in S$: `(S >> i) & 1`
    * $S \cup \{i\}$: `S | (1 << i)`
    * $S \setminus \{i\}$: `S ^ (1 << i)`
* **棋盘模型 (按行转移)**:
    * 状态: $dp[i][mask]$ 表示第 $i$ 行状态为 $mask$ 时的方案数/最优值。
    * 转移: 枚举上一行状态 $prev\_mask$，若 $mask$ 与 $prev\_mask$ **兼容** (不冲突)，则转移。

## 3. 实战部署

### 3.1 互不侵犯 (P1896)

* **问题**: $N \times N$ 棋盘放 $K$ 个国王，互不攻击。
* **状态**: $dp[i][mask][cnt]$ 表示第 $i$ 行，状态 $mask$，已放 $cnt$ 个国王。

{% fold info @Code: King Problem %}
```cpp
// 预处理合法状态 valid_states
// 转移: i 行状态 s, i-1 行状态 prev_s
// 兼容判定: 
// 1. (s & prev_s) == 0 (垂直不冲突)
// 2. (s & (prev_s << 1)) == 0 (左上不冲突)
// 3. (s & (prev_s >> 1)) == 0 (右上不冲突)

for( int i = 1; i <= n; ++ i )
    for( int s : valid_states )
        for( int ps : valid_states )
        {
            if( check(s, ps) ) // 兼容性检查
                for( int c = count[s]; c <= k; ++ c )
                    dp[i][s][c] += dp[i-1][ps][c - count[s]];
        }
```

{% endfold %}

## 4. 知识粘附

- **母题索引**:
    
    - **[Luogu-P1896](https://www.luogu.com.cn/problem/P1896)**: 互不侵犯 (棋盘状压)。
        
    - **[Luogu-P2915](https://www.google.com/search?q=https://www.luogu.com.cn/problem/P2915)**: 奶牛混合起来 (序列状压/TSP变体)。
        