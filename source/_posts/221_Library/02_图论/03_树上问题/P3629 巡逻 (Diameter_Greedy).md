---
title: 'P3629 [APIO2010] 巡逻 (Diameter_Greedy)'
tags:
  - 图论/树论/直径
  - 策略/贪心
difficulty:
  - 省选
categories:
  - 221_Library
  - 02_图论
  - 03_树上问题
abbrlink: ea96a98
date: 2025-12-18 00:00:00
---
# [Luogu-P3629](https://www.luogu.com.cn/problem/P3629) [APIO2010] 巡逻

## 1. 核心逻辑

- **问题本质**: 在树上添加 $K \in \{1, 2\}$ 条边，使得遍历所有边（包含新边）并回到起点的总代价最小。
    
- **破局转换**:
    
    1. **初始状态**: 不加边时，每条边必走两次，总和 $2(N-1)$。
        
    2. $K=1$ **策略**: 添加直径 $L_1$ 的两端，形成一个大环。环内边只需走一次。收益为 $L_1 - 1$（多了一条新边）。
        
    3. $K=2$ **策略**: 在 $K=1$ 基础上再找一条“收益最大”的路径 $L_2$。
        
        - **重叠惩罚**: 若 $L_2$ 与 $L_1$ 重叠，原本节省的一次行走又变回了两次。
            
        - **权值变换**: 将第一次直径 $L_1$ 经过的边权全部改为 **-1**，再求一次树的直径 $L_2$。
            
- **关键点**: 第二轮求直径由于存在负权边，不能使用 BFS，必须使用 **树形 DP**。
    

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxn = 1e5 + 50;
struct Edge { int v, w, nxt; } e[ maxn << 1 ];
int head[ maxn ], tot = 1, d[ maxn ], pre[ maxn ], ed[ maxn ], n, k, L1, L2;

void add( int u, int v ) 
{
    e[ ++ tot ] = { v, 1, head[ u ] }; head[ u ] = tot;
    e[ ++ tot ] = { u, 1, head[ v ] }; head[ v ] = tot;
}

int bfs( int s )
{
    memset( d, -1, sizeof( d ) );
    queue< int > q; q.push( s ); d[ s ] = 0; pre[ s ] = 0;
    int far = s;
    while( ! q.empty( ) )
    {
        int u = q.front( ); q.pop( );
        if( d[ u ] > d[ far ] ) far = u;
        for( int i = head[ u ]; i; i = e[ i ].nxt )
        {
            if( d[ e[ i ].v ] == -1 )
            {
                d[ e[ i ].v ] = d[ u ] + e[ i ].w;
                pre[ e[ i ].v ] = u; ed[ e[ i ].v ] = i;
                q.push( e[ i ].v );
            }
        }
    }
    return far;
}

int dp[ maxn ], diam2;
void dfs_dp( int u, int fa )
{
    for( int i = head[ u ]; i; i = e[ i ].nxt )
    {
        int v = e[ i ].v; if( v == fa ) continue;
        dfs_dp( v, u );
        diam2 = max( diam2, dp[ u ] + dp[ v ] + e[ i ].w );
        dp[ u ] = max( dp[ u ], dp[ v ] + e[ i ].w );
    }
}

int main( )
{
    ios::sync_with_stdio( 0 ); cin.tie( 0 );
    cin >> n >> k;
    for( int i = 1, u, v; i < n; ++ i ) { cin >> u >> v; add( u, v ); }

    int p1 = bfs( 1 ), p2 = bfs( p1 ); L1 = d[ p2 ];
    if( k == 1 ) { cout << 2 * ( n - 1 ) - L1 + 1 << "\n"; return 0; }

    for( int i = p2; i != p1; i = pre[ i ] )
    {
        e[ ed[ i ] ].w = -1; e[ ed[ i ] ^ 1 ].w = -1;
    }
    dfs_dp( 1, 0 );
    cout << 2 * n - L1 - diam2 << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N)$。
    
- **关键点**: 理解通过边权反转（1 $\to$ -1）实现对重叠路径的逻辑扣除。