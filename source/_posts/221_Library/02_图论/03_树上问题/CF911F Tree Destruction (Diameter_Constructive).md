---
title: CF911F Tree Destruction (Diameter_Constructive)
tags:
  - 图论/树论/直径
  - 策略/构造
difficulty: 提高+/省选-
categories:
  - 221_Library
  - 02_图论
  - 03_树上问题
abbrlink: bab96266
date: 2025-12-18 00:00:00
---

# [CF911F](https://www.luogu.com.cn/problem/CF911F) Tree Destruction

## 1. 核心逻辑

- **问题本质**: 构造一个删点序列，使得每次删除节点时，该节点与树中剩余某点的距离之和最大。
    
- **破局转换**:
    
    1. **距离极限**: 树上任意点的最远点必然是直径的端点 $A$ 或 $B$ 之一。
        
    2. **两阶段贪心**:
        
        - **第一阶段 (挂载点)**: 优先删除不在直径上的点。对于点 $u$，选择距离更远的直径端点进行配对，贡献为 $\max(dist(u, A), dist(u, B))$。
            
        - **第二阶段 (直径链)**: 当树坍缩为一条链 $A \dots B$ 时，从链的一端（如 $B$）开始向另一端逐个删除，每次都与固定的端点 $A$ 配对。
            
    3. **顺序控制**: 必须先删掉直径上的所有分支，最后处理直径本体，否则分支的最远路径会被提前切断。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
const int maxn = 2e5 + 50;
vector< int > adj[ maxn ];
int dA[ maxn ], dB[ maxn ], pre[ maxn ], n, nodeA, nodeB;
bool on_path[ maxn ];
struct Op { int u, v, rem; };
vector< Op > ans_ops;

void bfs( int start, int* dist, bool record )
{
    fill( dist + 1, dist + n + 1, -1 );
    queue< int > q;
    q.push( start ); dist[ start ] = 0;
    while( ! q.empty( ) )
    {
        int u = q.front( ); q.pop( );
        for( int v : adj[ u ] )
        {
            if( dist[ v ] == -1 )
            {
                dist[ v ] = dist[ u ] + 1;
                if( record ) pre[ v ] = u;
                q.push( v );
            }
        }
    }
}

void dfs_branch( int u, int fa )
{
    for( int v : adj[ u ] )
    {
        if( v == fa || on_path[ v ] ) continue;
        dfs_branch( v, u );
    }
    if( ! on_path[ u ] )
    {
        if( dA[ u ] > dB[ u ] ) ans_ops.push_back( { nodeA, u, u } );
        else ans_ops.push_back( { nodeB, u, u } );
    }
}

int main( )
{
    ios::sync_with_stdio( 0 ); cin.tie( 0 );
    cin >> n;
    for( int i = 1, u, v; i < n; ++ i )
    {
        cin >> u >> v; adj[ u ].push_back( v ); adj[ v ].push_back( u );
    }

    // 寻找直径
    bfs( 1, dA, 0 );
    nodeA = max_element( dA + 1, dA + n + 1 ) - dA;
    bfs( nodeA, dA, 1 );
    nodeB = max_element( dA + 1, dA + n + 1 ) - dA;
    bfs( nodeB, dB, 0 );

    vector< int > path;
    for( int i = nodeB; i; i = pre[ i ] ) { on_path[ i ] = 1; path.push_back( i ); }

    ll total = 0;
    for( int i = 1; i <= n; ++ i )
    {
        if( ! on_path[ i ] ) total += max( dA[ i ], dB[ i ] );
    }
    for( int i = 1; i < path.size( ); ++ i ) total += ( ll )i;
    
    // 构造操作
    for( int u : path ) dfs_branch( u, 0 );
    for( int i = 0; i < ( int )path.size( ) - 1; ++ i ) 
    {
        ans_ops.push_back( { nodeA, path[ i ], path[ i ] } );
    }

    cout << total << "\n";
    for( auto &o : ans_ops ) cout << o.u << " " << o.v << " " << o.rem << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N)$。
    
- **关键点**: 理解“非直径点”依附于直径端点的贪心单调性。