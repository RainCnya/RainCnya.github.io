---
title: 'MST体系与瓶颈路 (MST, LCA & Bottleneck)'
tags:
  - 树论/MST
  - 树论/LCA
categories:
  - 01_Patchouli
  - 02_图论
  - 03_树上问题
abbrlink: cd7fb2f0
date: 2025-12-16 17:30:17
updated: 2025-12-24 19:07:57
---
# MST体系与瓶颈路

## 1. 生态位

- **定义**: 最小生成树（MST）是原图的“精简骨架”，旨在保持连通性的同时，锁定点对间的最优成本路径。它将复杂的图路径问题坍缩为稳定的树上路径问题。
    
- **解决痛点**:
    
    - **瓶颈路问题**: 任意两点间路径的“最大边权最小值”即等于 MST 上对应路径的最大边权。
        
    - **网络鲁棒性**: 以最低代价维持全局连通。
        

## 2. 逻辑支点

- **切边定理 (Cut Property)**: 对于图的任何一个切分，横跨切分的边中权值最小的一条必然属于某棵 MST。
    
- **重构树映射**: 通过 Kruskal 合并过程构造重构树，将“路径最值”转化为“LCA 点权”，实现维度的转换。
    
- **渗透点**: MST 的贪心选择（Kruskal）本质上是按边权从小到大进行的“连通块缝合”，每一次缝合都消除了当前全局最小的隔离壁垒。
    

## 3. 实战部署

### 3.1 Kruskal 标准实现

{% fold info @Code: Kruskal %}

```cpp
struct Edge { int u, v, w; };
bool operator < ( const Edge &a, const Edge &b )
{
    return a.w < b.w;
}

void solve_mst( )
{
    sort( edges + 1, edges + m + 1 );
    for( int i = 1; i <= n; ++ i )
    {
        fa[ i ] = i;
    }
    int cnt = 0;
    for( int i = 1; i <= m; ++ i )
    {
        int fu = find( edges[ i ].u ), fv = find( edges[ i ].v );
        if( fu != fv )
        {
            fa[ fu ] = fv;
            mst_weight += edges[ i ].w;
            if( ++ cnt == n - 1 )
            {
                break;
            }
        }
    }
}
```

{% endfold %}

## 4. 知识粘附

- **高阶模型**:
    
    - **Kruskal 重构树**: 合并 $u, v$ 时新建虚点 $P$ 作为父节点，点权为边权 $w$。
        
    - **次小生成树**: 枚举非树边替换树路径上的最大边。
        
- **母题索引**:
    
    - [P1967 货车运输 (MaxST_LCA_Bottleneck)](P1967%20货车运输%20(MaxST_LCA_Bottleneck).md)
        
    - [P1195 口袋的天空 (Kruskal_K_Components)](P1195%20口袋的天空%20(Kruskal_K_Components).md)