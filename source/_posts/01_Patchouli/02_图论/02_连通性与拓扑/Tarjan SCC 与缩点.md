---
title: Tarjan SCC 与缩点 (Tarjan_SCC)
tags:
  - 图论/连通性
  - 算法/缩点
categories:
  - 01_Patchouli
  - 02_图论
  - 02_连通性与拓扑
abbrlink: dbe3a645
date: 2025-12-15 11:30:00
updated: 2025-12-24 19:08:07
---
# Tarjan SCC 与缩点

## 1. 生态位

- **定义**: 连通性是图的“拓扑灵魂”。强连通分量（SCC）内部所有点在可达性上是等价的。通过缩点，我们可以剥离环的冗余干扰，将复杂的有向有环图坍缩为纯净的 DAG（有向无环图）。
    
- **解决痛点**: 实现了图论问题向动态规划或拓扑递推的范式转化。用于社交网络影响力闭环分析、可达性一致性判定等。
    

## 2. 逻辑支点

- **不变量维护**:
    
    - **时间戳 (DFN)**: 节点被首次访问的物理序。
        
    - **回溯值 (LOW)**: 节点能回溯到的、且**仍在搜索栈中**的最小 DFN。
        
- **缩点准则**: 当发现 `dfn[u] == low[u]` 时，意味着 $u$ 是该强连通分量的“树根”，搜索栈中自 $u$ 以上的所有节点共同构成一个 SCC。
    
- **渗透点**: Tarjan 的核心是利用“搜索栈”暂存尚未归属的路径支路。一旦某支路无法向上回溯，其逻辑封闭性即告确立。
    

## 3. 实战部署

{% fold info @Code: Tarjan SCC Standard %}

```cpp
void tarjan( int u )
{
    dfn[ u ] = low[ u ] = ++ idx;
    stk.push( u );
    in_stk[ u ] = 1;

    for( int v : adj[ u ] )
    {
        if( !dfn[ v ] )
        {
            tarjan( v );
            low[ u ] = min( low[ u ], low[ v ] );
        }
        else if( in_stk[ v ] )
        {
            low[ u ] = min( low[ u ], dfn[ v ] );
        }
    }

    if( dfn[ u ] == low[ u ] )
    {
        ++ scc_cnt;
        int v;
        do 
        {
            v = stk.top( );
            stk.pop( );
            in_stk[ v ] = 0;
            scc_id[ v ] = scc_cnt;
        } while( v != u );
    }
}
```

{% endfold %}

## 4. 知识粘附

- **变体模型**:
    
    - **割点与桥**: 无向图中的关键连通点/边。
        
    - **2-SAT**: 利用强连通性判定布尔方程组的可满足性。
        
- **母题索引**:
    
    - [P2812 校园网络 (Tarjan_SCC_DAG)](P2812%20校园网络%20(Tarjan_SCC_DAG).md)