---
title: '[Note] Dilworth定理'
tags:
  - 数学/Dilworth定理
categories:
  - 220_Library
  - 40_数学
abbrlink: 6f3f9d20
date: 2026-04-23 00:00:00
---

# Dilworth定理

即：对于任意有限偏序集，其最大反链中的元素数目 等于 最小链划分中链的数目。

### 前置知识

#### 1. 偏序集

一个集合 $S$ 和其上的二元关系 $\le$ 构成一个**偏序集** $(S, \le)$，如果该关系满足以下三个性质：

1. **自反性**：$\forall a \in S, a \le a$。
    
2. **反对称性**：$\forall a, b \in S$，若 $a \le b$ 且 $b \le a$，则 $a = b$。
    
3. **传递性**：$\forall a, b, c \in S$，若 $a \le b$ 且 $b \le c$，则 $a \le c$。
    

**注意**：在偏序集中，并不是任意两个元素都能比较大小。如果 $a \not\le b$ 且 $b \not\le a$，我们称 $a$ 和 $b$ **不可比**。