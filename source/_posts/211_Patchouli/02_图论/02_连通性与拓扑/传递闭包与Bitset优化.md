---
title: 传递闭包与Bitset优化 (Transitive_Closure_Bitset)
tags:
  - 图论/连通性
  - 数学/位运算
categories:
  - 211_Patchouli
  - 02_图论
  - 02_连通性与拓扑
abbrlink: d4dd66e8
date: 2025-12-16 15:30:00
updated: 2025-12-24 19:06:14
---
# 传递闭包与 Bitset 优化

## 1. 生态位

- **定义**: 传递闭包是研究图中点对间可达性的全局状态矩阵。在稠密图或小规模图中，通过位运算（Bitset）对 Floyd 算法或拓扑序列进行指令级并行化优化，能将可达性判定的效率提升一个字长（通常为 64 倍）。
    
- **解决痛点**: 解决了 $O(N^3)$ 传递闭包在大规模点数（$N \le 5000$）下的时效性问题。
    

## 2. 逻辑支点

- **逻辑压缩**: 状态 $dist[i][j]$ 简化为布尔值。对于固定起点 $i$，其到全图的可达性可以用一个长度为 $N$ 的二进制序列表示。
    
- **并行化状态转移**:
    
    - **Floyd 风格**: `if( dist[i][k] ) dist[i] |= dist[k]`。
        
    - **拓扑序风格（针对 DAG）**: `dist[u] |= dist[v]`。
        
- **渗透点**: Bitset 优化的本质是利用 CPU 寄存器的并行加法。它将原本需要循环 $N$ 次的逻辑判断，合并为一次宽位的“或”运算。
    

## 3. 实战部署

### 3.1 基于 Bitset 的传递闭包 (Floyd 变体)

{% fold info @Code: Bitset Transitive Closure %}

```cpp
#include <bitset>
using namespace std;

bitset< maxn > reach[ maxn ];

void solve_closure( int n )
{
    // 初始化自环可达性
    for( int i = 1; i <= n; ++ i )
    {
        reach[ i ][ i ] = 1;
    }

    // 核心松弛过程
    for( int k = 1; k <= n; ++ k )
    {
        for( int i = 1; i <= n; ++ i )
        {
            // 如果 i 能到 k，那么 i 就能到 k 能到的所有点
            if( reach[ i ][ k ] )
            {
                reach[ i ] |= reach[ k ];
            }
        }
    }
}
```

{% endfold %}

## 4. 知识粘附

- **变体应用**:
    
    - **连通数统计**: 统计每行 Bitset 中 `1` 的个数（`count()` 函数）。
        
    - **有向图三元环计数**: 结合 Bitset 的按位与操作。
        
- **母题索引**:
    
    - [P4306 [JSOI2010] 连通数](https://www.luogu.com.cn/problem/P4306 "null") —— 典型的 Bitset 优化传递闭包应用。