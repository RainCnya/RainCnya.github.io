---
title: 'P2680 [NOIP2015] 运输计划 (LCA_Difference_BinarySearch)'
tags:
  - 算法/前缀差分
  - 策略/二分答案
difficulty: 提高+/省选-
categories:
  - 221_Library
  - 02_图论
  - 03_树上问题
abbrlink: 248b3a56
date: 2025-11-02 00:00:00
---
# [Luogu-P2680](https://www.luogu.com.cn/problem/P2680) 运输计划

## 1. 核心逻辑

- **问题本质**: 移除树上的一条边使其权值归零，使得 $M$ 条预设路径的最长用时最小。
    
- **核心切入点**:
    
    1. **单调性判定**：最长路径的最小值具有单调性，优先考虑**二分答案** $mid$。
        
    2. **判定函数 (Check)**：
        
        - 找出所有长度超过 $mid$ 的“超标路径”。
            
        - 我们需要找到一条边，它必须被**所有**超标路径覆盖（覆盖次数等于超标路径总数）。
            
        - 且满足：`最长路径长度 - 该边权值 <= mid`。
            
    3. **高效覆盖统计**：使用**树上边差分**。路径 $(u, v)$ 边覆盖：`diff[u]++`, `diff[v]++`, `diff[LCA(u, v)] -= 2`。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxn = 3e5 + 50;
vector< pair< int, int > > adj[ maxn ];
int f[ maxn ][ 20 ], dep[ maxn ], dist[ maxn ], diff[ maxn ], edge_w[ maxn ], n, m;
struct Path { int u, v, lca, len; } paths[ maxn ];

void dfs_lca( int u, int father, int w )
{
    dep[ u ] = dep[ father ] + 1;
    dist[ u ] = dist[ father ] + w;
    edge_w[ u ] = w;
    f[ u ][ 0 ] = father;
    for( int i = 1; i < 20; ++ i ) f[ u ][ i ] = f[ f[ u ][ i - 1 ] ][ i - 1 ];
    for( auto &e : adj[ u ] ) if( e.first != father ) dfs_lca( e.first, u, e.second );
}

int get_lca( int u, int v )
{
    if( dep[ u ] < dep[ v ] ) swap( u, v );
    for( int i = 19; i >= 0; -- i ) if( dep[ f[ u ][ i ] ] >= dep[ v ] ) u = f[ u ][ i ];
    if( u == v ) return u;
    for( int i = 19; i >= 0; -- i ) if( f[ u ][ i ] != f[ v ][ i ] ) u = f[ u ][ i ], v = f[ v ][ i ];
    return f[ u ][ 0 ];
}

int max_e, total_bad;
void dfs_check( int u, int father )
{
    for( auto &e : adj[ u ] )
    {
        if( e.first != father )
        {
            dfs_check( e.first, u );
            diff[ u ] += diff[ e.first ];
        }
    }
    if( diff[ u ] == total_bad ) max_e = max( max_e, edge_w[ u ] );
}

bool check( int mid )
{
    memset( diff, 0, sizeof( diff ) );
    total_bad = 0; int max_p = 0;
    for( int i = 1; i <= m; ++ i )
    {
        if( paths[ i ].len > mid )
        {
            ++ total_bad;
            max_p = max( max_p, paths[ i ].len );
            ++ diff[ paths[ i ].u ]; ++ diff[ paths[ i ].v ];
            diff[ paths[ i ].lca ] -= 2;
        }
    }
    if( total_bad == 0 ) return true;
    max_e = 0;
    dfs_check( 1, 0 );
    return max_p - max_e <= mid;
}

int main( )
{
    ios::sync_with_stdio( 0 ); cin.tie( 0 );
    cin >> n >> m;
    for( int i = 1, u, v, w; i < n; ++ i )
    {
        cin >> u >> v >> w;
        adj[ u ].push_back( { v, w } ); adj[ v ].push_back( { u, w } );
    }
    dfs_lca( 1, 0, 0 );
    int l = 0, r = 0;
    for( int i = 1; i <= m; ++ i )
    {
        cin >> paths[ i ].u >> paths[ i ].v;
        paths[ i ].lca = get_lca( paths[ i ].u, paths[ i ].v );
        paths[ i ].len = dist[ paths[ i ].u ] + dist[ paths[ i ].v ] - 2 * dist[ paths[ i ].lca ];
        r = max( r, paths[ i ].len );
    }
    int ans = r;
    while( l <= r )
    {
        int mid = ( l + r ) >> 1;
        if( check( mid ) ) ans = mid, r = mid - 1;
        else l = mid + 1;
    }
    cout << ans << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(M \log N + \log(\text{max\_dist}) \cdot N)$。
    
- **关键点**: 边差分统计时，权值挂在深节点上，且差分公式与点差分不同，LCA 处需减 2。