---
title: P2812 校园网络 (Tarjan_SCC_DAG)
tags:
  - 图论/连通性
  - 算法/缩点
difficulty:
  - 提高+/省选-
categories:
  - 11_Library
  - 02_图论
  - 02_连通性与拓扑
abbrlink: ad8e1953
date: 2025-12-15 00:00:00
---

# [Luogu-P2812](https://www.luogu.com.cn/problem/P2812) 校园网络 / [USACO] Network of Schools

## 1. 核心逻辑

- **问题本质**: 将含有环的有向图通过缩点转化为 DAG，并利用入度/出度特征求解全局覆盖与强连通补全代价。
    
- **破局转换**:
    
    1. **逻辑简化**: 强连通分量 (SCC) 内部所有点地位等价，共享连通性贡献。
        
    2. **第一问 (最小起点数)**: 对应缩点后 DAG 中入度为 0 的节点数量。
        
    3. **第二问 (补全边数)**: 对应将 DAG 缝合为 SCC 的代价，公式为 $\max( \text{in\_zero}, \text{out\_zero} )$。
        
    4. **坑点**: 当原图缩点后仅有一个 SCC 时，该点入度和出度虽为 0，但补全代价为 0 而非 1。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxn = 1e4 + 50;
vector< int > adj[ maxn ];
int dfn[ maxn ], low[ maxn ], idx;
int scc_id[ maxn ], scc_cnt;
bool in_stk[ maxn ];
stack< int > stk;
int ind[ maxn ], outd[ maxn ], n;

void tarjan( int u )
{
    dfn[ u ] = low[ u ] = ++ idx;
    stk.push( u );
    in_stk[ u ] = 1;

    for( int v : adj[ u ] )
    {
        if( ! dfn[ v ] )
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

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n;
    for( int i = 1; i <= n; ++ i )
    {
        int v;
        while( cin >> v && v != 0 ) adj[ i ].push_back( v );
    }

    for( int i = 1; i <= n; ++ i )
    {
        if( ! dfn[ i ] ) tarjan( i );
    }

    for( int u = 1; u <= n; ++ u )
    {
        for( int v : adj[ u ] )
        {
            if( scc_id[ u ] != scc_id[ v ] )
            {
                ++ ind[ scc_id[ v ] ];
                ++ outd[ scc_id[ u ] ];
            }
        }
    }

    int ins = 0, outs = 0;
    for( int i = 1; i <= scc_cnt; ++ i )
    {
        if( ind[ i ] == 0 ) ++ ins;
        if( outd[ i ] == 0 ) ++ outs;
    }

    cout << ins << "\n";
    if( scc_cnt == 1 ) cout << 0 << "\n";
    else cout << max( ins, outs ) << "\n";

    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N + M)$。Tarjan 缩点是处理有向图连通性最有效的降维工具。
    
- **核心思路**: 理解 DAG 补全定理：将 $N$ 个入度为 0 和 $M$ 个出度为 0 的点互连，最少需要 $\max(N, M)$ 条边即可闭合为强连通。