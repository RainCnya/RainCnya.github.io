---
title: P2829 大逃离 (Strict_Second_Shortest_Path)
tags:
  - 图论/最短路
  - 图论/最短路/次短路
difficulty: 提高+/省选-
categories:
  - 220_Library
  - 20_图论
  - 21_图论基础
abbrlink: 148132d
date: 2025-11-29 00:00:00
---
# [Luogu-P2829](https://www.luogu.com.cn/problem/P2829) 大逃离 (次短路)

## 1. 核心逻辑

- **问题本质**: 求无向图中从起点到终点的**严格次短路**（且满足某些特定点的度数约束）。
    
- **核心切入点**:
    
    1. **状态扩展**: 在 Dijkstra 中维护两个状态：`d1[u]`（最短路）和 `d2[u]`（次短路）。
        
    2. **转移逻辑**: 对于边 $(u, v, w)$，计算新路径 $len = d + w$：
        
        - 若 $len < d1[v]$：更新最短路，原最短路退化为次短路。
            
        - 若 $d1[v] < len < d2[v]$：更新次短路。
            
        - 若 $len = d1[v]$：不更新（题目要求严格次短路）。
            
    3. **条件约束**: 题目要求除 1 和 $n$ 外，经过的点度数必须 $\ge k$。在遍历边时预先过滤即可。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
// P2829 大逃离
// Key Logic: Strict Second Shortest Path using Dijkstra expansion

#include <bits/stdc++.h>
using namespace std;

const int maxn = 5005;
const int inf = 0x3f3f3f3f;

struct Edge
{
    int to, w;
};

vector< Edge > adj[ maxn ];
int d1[ maxn ], d2[ maxn ];
int deg[ maxn ];
int n, m, K;

void dijkstra( )
{
    memset( d1, 0x3f, sizeof d1 );
    memset( d2, 0x3f, sizeof d2 );
    d1[ 1 ] = 0;

    priority_queue< pair< int, int >, vector< pair< int, int > >, greater< pair< int, int > > > pq;
    pq.push( { 0, 1 } );

    while( ! pq.empty( ) )
    {
        auto [ d, u ] = pq.top( );
        pq.pop( );

        if( d > d2[ u ] ) continue;

        for( auto &e : adj[ u ] )
        {
            // 题目特定度数约束
            if( e.to != 1 && e.to != n && deg[ e.to ] < K ) continue;

            int len = d + e.w;
            if( len < d1[ e.to ] )
            {
                d2[ e.to ] = d1[ e.to ];
                d1[ e.to ] = len;
                pq.push( { d1[ e.to ], e.to } );
                pq.push( { d2[ e.to ], e.to } );
            }
            else if( len > d1[ e.to ] && len < d2[ e.to ] )
            {
                d2[ e.to ] = len;
                pq.push( { d2[ e.to ], e.to } );
            }
        }
    }
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> m >> K;
    for( int i = 1; i <= m; ++ i )
    {
        int u, v, w;
        cin >> u >> v >> w;
        adj[ u ].push_back( { v, w } );
        adj[ v ].push_back( { u, w } );
        deg[ u ] ++;
        deg[ v ] ++;
    }

    dijkstra( );

    if( d2[ n ] == inf ) cout << "-1\n";
    else cout << d2[ n ] << "\n";

    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **时间复杂度**: $O(M \log N)$。
    
- **核心思路**: 在最短路确定的贪心基础上，允许每个点有二次松弛的机会。注意严格次短路与非严格次短路的判定差异