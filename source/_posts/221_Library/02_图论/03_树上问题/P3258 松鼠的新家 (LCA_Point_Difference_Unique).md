---
title: 'P3258 [JLOI2014] 松鼠的新家 (LCA_Point_Difference_Unique)'
tags:
  - 算法/前缀差分
  - 图论/树论/LCA
difficulty: 普及+/提高
categories:
  - 221_Library
  - 02_图论
  - 03_树上问题
abbrlink: 63edd0b2
date: 2025-11-02 00:00:00
---
# [Luogu-P3258](https://www.luogu.com.cn/problem/P3258) 松鼠的新家

## 1. 核心逻辑

- **问题本质**: 给定树上点的访问序列 $a_1, a_2 \dots a_n$，求每个点在所有路径访问中被经过的次数。
    
- **破局转换**:
    
    1. **差分分量**：将总旅程拆解为 $n-1$ 次路径覆盖：$(a_i, a_{i+1})$。
        
    2. **端点修正**：对于每次覆盖 $(a_i, a_{i+1})$，点 $a_{i+1}$ 作为终点被计入。然而在接下来的 $(a_{i+1}, a_{i+2})$ 中，$a_{i+1}$ 又作为起点被计入。
        
    3. **逻辑补偿**：
        
        - 所有序列中间的点 $a_2 \dots a_n$ 实际上都在作为终点的那一次被多算了一遍（最后一步不需要停留两次）。
            
        - 最终统计结果中，除 $a_1$ 外的所有点权需 $-1$。
            

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxn = 3e5 + 50;
vector< int > adj[ maxn ];
int f[ maxn ][ 20 ], dep[ maxn ], diff[ maxn ], a[ maxn ], n;

void dfs_lca( int u, int father )
{
    dep[ u ] = dep[ father ] + 1;
    f[ u ][ 0 ] = father;
    for( int i = 1; i < 20; ++ i ) f[ u ][ i ] = f[ f[ u ][ i - 1 ] ][ i - 1 ];
    for( int v : adj[ u ] ) if( v != father ) dfs_lca( v, u );
}

int get_lca( int u, int v )
{
    if( dep[ u ] < dep[ v ] ) swap( u, v );
    for( int i = 19; i >= 0; -- i ) if( dep[ f[ u ][ i ] ] >= dep[ v ] ) u = f[ u ][ i ];
    if( u == v ) return u;
    for( int i = 19; i >= 0; -- i ) if( f[ u ][ i ] != f[ v ][ i ] ) u = f[ u ][ i ], v = f[ v ][ i ];
    return f[ u ][ 0 ];
}

void dfs_sum( int u, int father )
{
    for( int v : adj[ u ] )
    {
        if( v != father )
        {
            dfs_sum( v, u );
            diff[ u ] += diff[ v ];
        }
    }
}

int main( )
{
    ios::sync_with_stdio( 0 ); cin.tie( 0 );
    cin >> n;
    for( int i = 1; i <= n; ++ i ) cin >> a[ i ];
    for( int i = 1, u, v; i < n; ++ i )
    {
        cin >> u >> v;
        adj[ u ].push_back( v ); adj[ v ].push_back( u );
    }
    dfs_lca( 1, 0 );
    for( int i = 1; i < n; ++ i )
    {
        int u = a[ i ], v = a[ i + 1 ];
        int lca = get_lca( u, v );
        ++ diff[ u ]; ++ diff[ v ]; -- diff[ lca ]; -- diff[ f[ lca ][ 0 ] ];
    }
    dfs_sum( 1, 0 );
    for( int i = 2; i <= n; ++ i ) -- diff[ a[ i ] ]; // 终点去重逻辑
    for( int i = 1; i <= n; ++ i ) cout << diff[ i ] << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N \log N)$。
    
- **关键点**: 理解“路径拼接”时的端点重复计入问题，这是该题区别于标准点差分模板的关键。