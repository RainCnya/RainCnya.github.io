---
title: Tarjan SCC 与缩点 (Tarjan_SCC)
tags:
  - Tarjan
  - 强连通分量
  - 缩点
categories:
  - 00_Atlas
  - 02_图论
abbrlink: dbe3a645
date: 2025-12-15 11:30:00
---

## 1. 生态位

* **定义**: 在有向图中，找到最大子图，使得子图中任意两点 $u, v$ 互相可达。
* **解决痛点**:
    * **化环为链**: 将有向有环图转化为 **DAG**。
    * **传递性分析**: 强连通分量内部的所有点在可达性上是等价的。

## 2. 逻辑支点

* **dfn (物理时间)**: 节点被 DFS 首次访问的时间戳。
* **low (回溯能力)**: 节点通过有向边能回溯到的、且**仍在栈中**的最小 `dfn`。
* **SCC 根判定**: `dfn[u] == low[u]`。说明 $u$ 无法回到更早的祖先，栈中 $u$ 及其上方节点构成一个 SCC。
* **DAG 补全定理**:
    * 覆盖全图最少源点 = 入度为 0 的 SCC 数量。
    * 强连通最少加边 = $\max( \text{in\_zero}, \text{out\_zero} )$。

## 3. 实战部署

{% fold info @Code: Tarjan SCC %}
```cpp
void tarjan( int u )
{
    dfn[u] = low[u] = ++ idx;
    stk.push( u );
    in_stk[u] = true;

    for( int v : adj[u] )
    {
        if( ! dfn[v] )
        {
            tarjan( v );
            low[u] = min( low[u], low[v] );
        }
        else if( in_stk[v] )
        {
            // 返祖边: 只能用 dfn 更新
            low[u] = min( low[u], dfn[v] );
        }
    }

    if( dfn[u] == low[u] )
    {
        ++ scc_cnt;
        int v;
        do
        {
            v = stk.top( );
            stk.pop( );
            in_stk[v] = false;
            scc_id[v] = scc_cnt;
        } while( v != u );
    }
}
```

{% endfold %}

## 4. 知识粘附

- **变体**:
    
    - **割点/桥**: 逻辑相似但无栈，判定条件为 `low[v] >= dfn[u]`。
        
- **母题索引**:
    
    - **[Luogu P2812](https://www.luogu.com.cn/problem/P28121)**: 校园网络 (DAG 补边)。
        
    - **[Luogu P2341](https://www.luogu.com.cn/problem/P23411)**: 受欢迎的牛 (缩点)。
        