---
title: '[Note] SCC 缩点'
tags:
  - 图论/连通性/强连通
  - 难度/P3
categories:
  - 210_Atlas
  - 20_图论
  - 23_连通性专题
abbrlink: dbe3a645
date: 2025-12-15 11:30:00
updated: 2025-12-24 19:08:07
updated2: 2026-02-07 00:34:08
---
# [L4] SCC 缩点

## 1. 生态位

- **识别**:
    
    1. **有向图**且存在**环**（或者题目允许重复经过点/边）。
        
    2. **依赖关系**：$A$ 依赖 $B$，$B$ 依赖 $A$ $\implies$ $A, B$ 必须同时选/同时不选。
        
    3. **传递性**：题目问“谁能到达所有点”或“谁能被所有点到达”。
        
    4. **动态规划**：想跑 DP 或 最长路，但图中有环导致无法确立拓扑序。
        
- **地位**: 连通性专题的核心。它是处理 **有向有环路** 问题的必备降维工具。
    
- **用途**: 将任意 **有向有环图** 转化为 **DAG（有向无环图）**，使图满足**拓扑序**，从而能够使用 DAG 上的算法（如 DP、最长路、差分约束）。

> Strong Connected Components 强连通分量

## 2. 逻辑支点

### 2.1 核心原理：回溯

Tarjan 算法的本质是在 DFS 生成树上寻找 **返祖边**。

**DFN (时间戳)**: 也就是 ID，代表节点被 DFS 首次访问的物理顺序。
    
**LOW (追溯值)**: 也就是能力上限。代表该节点（及其子树）如果不通过父节点，能够回溯到的最小（最早）的 DFN。
    
- 如果 `low[u] == dfn[u]`：说明 $u$ 无法回溯到更早的祖先了。它自己就是一个强连通分量的根。它栈里的所有后代都归它管。

### 2.2 模型

缩点只是手段，**缩完后的 DAG 怎么用** 才是核心。

1. **拓扑统计模型**:
    
    - 关注新图的 **入度 (Indeg)** 和 **出度 (Outdeg)**。
        
    - **极小集**: 入度为 0 的 SCC 数量（源点）。
        
    - **连通补全**: $\max(\sum [indeg=0], \sum [outdeg=0])$。
        
2. **路径/最值模型**:
    
    - 将 SCC 视为“超级点”，其权值为内部点权之和/最值。
        
    - 在 DAG 上跑 **最长路** 或 **路径计数**。
        
    - _注意_: 需处理**重边**（两个 SCC 之间多条边视为一条），否则影响计数。
        
3. **结构转化模型**:
    
    - 处理“基环树”或“仙人掌”结构的依赖。
        
    - 缩点后，复杂的依赖图往往会退化为 **树** 或 **森林**，从而适用树形 DP。

## 3. 实战部署

{% fold info @Tarjan & Build DAG %}

```cpp
const int maxn = 1e5 + 50;

// 原图与新图
vector<int> adj[maxn];
vector<int> dag[maxn];

// Tarjan 变量
int dfn[maxn], low[maxn], timer;
stack<int> st;
bool in_stack[maxn];

// SCC 变量
int scc[maxn], scc_cnt; // scc[u]: u 所属的 SCC 编号
int scc_sz[maxn];       // SCC 大小
ll scc_val[maxn];       // SCC 权值 (抽象权值)
ll val[maxn];           // 原点权

void tarjan( int u )
{
    dfn[u] = low[u] = ++timer;
    st.push( u );
    in_stack[u] = true;

    for( int v : adj[u] )
    {
        if( !dfn[v] )
        {
            tarjan( v );
            low[u] = min( low[u], low[v] );
        }
        else if( in_stack[v] )
        {
            // 找到返祖边
            low[u] = min( low[u], dfn[v] );
        }
    }

    // 发现 SCC 根
    if( low[u] == dfn[u] )
    {
        scc_cnt++;
        int v;
        do {
            v = st.top(); st.pop();
            in_stack[v] = false;
            scc[v] = scc_cnt;
            
            // [抽象模型]: 信息合并
            scc_sz[scc_cnt]++;
            scc_val[scc_cnt] += val[v]; 
            
        } while( u != v );
    }
}

// 核心：构建缩点后的 DAG
void build_dag( int n )
{
    for( int u = 1; u <= n; ++u )
    {
        for( int v : adj[u] )
        {
            // 跨越 SCC 的边保留，在新图连边
            if( scc[u] != scc[v] )
            {
                dag[scc[u]].push_back( scc[v] );
                // 统计入度，用于拓扑统计模型
                // indeg[scc[v]]++; 
            }
        }
    }
    
    // [可选]: 路径计数模型需去重边
    for( int i = 1; i <= scc_cnt; ++i ) {
        sort( dag[i].begin(), dag[i].end() );
        dag[i].erase( unique( dag[i].begin(), dag[i].end() ), dag[i].end() );
    }
}
```

{% endfold %}

## 4. 知识关联

- **关联笔记**:
    
    - [[拓扑排序]]: 缩点后 DAG 处理的下一步标准操作。
        
    - [[树形DP]]: 结构转化模型后的处理手段。
        
- **实战案例 (拓扑统计模型)**:
    
    - **性质分析**: [[P2812 校园网络]] (入度/出度统计，最纯粹的模型)。
        
    - **逻辑闭环**: [[P1407 稳定婚姻]] (利用 SCC 判断二分图匹配中的环)。
        
- **实战案例 (路径/最值模型)**:
    
    - **DAG 最长路**: [[P3627 抢掠计划]] (点权缩点 + DAG 上最长路)。
        
    - **DAG 计数**: [[P2272 最大半连通子图]] (最长链长度 + 方案计数 + 去重边)。
        
- **实战案例 (结构转化模型)**:
    
    - **泛化树形 DP**: [[P2515 软件安装]] (缩点后形成森林，建立虚根转化为树上背包)。