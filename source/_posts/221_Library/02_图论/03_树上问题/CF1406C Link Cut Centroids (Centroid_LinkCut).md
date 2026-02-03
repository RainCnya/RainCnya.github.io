---
title: CF1406C Link Cut Centroids (Centroid_LinkCut)
tags:
  - 图论/树论/重心
  - 策略/构造
difficulty:
  - 普及+/提高
categories:
  - 221_Library
  - 02_图论
  - 03_树上问题
abbrlink: cc4bf061
date: 2025-12-18 00:00:00
---

# [CF1406C](https://www.luogu.com.cn/problem/CF1406C) Link Cut Centroids

## 1. 核心逻辑

- **问题本质**: 仅通过删除一条边并添加一条边，使给定的树拥有唯一的重心。
    
- **破局转换**:
    
    1. **重心性质**: 树的重心至多有两个。若只有一个，随便删一条叶子边再连回去即可。
        
    2. **双重心模型**: 两个重心 $R_1, R_2$ 必然相邻。此时整棵树被分为两个大小相等的连通块（各 $N/2$）。
        
    3. **破坏平衡**: 从 $R_1$ 的子树中（避开 $R_2$ 方向）切下一个叶子节点 $L$，将其连接到 $R_2$ 上。
        
    4. **结果**: 这样 $R_2$ 方向的节点数会超过 $N/2$，导致 $R_1$ 失去重心资格，$R_2$ 成为唯一重心。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxn = 1e5 + 50;
const int inf = 0x3f3f3f3f;

vector< int > adj[ maxn ];
int siz[ maxn ], f[ maxn ], n;

void get_centroid( int u, int fa )
{
    siz[ u ] = 1;
    f[ u ] = 0;
    for( int v : adj[ u ] )
    {
        if( v == fa ) continue;
        get_centroid( v, u );
        siz[ u ] += siz[ v ];
        f[ u ] = max( f[ u ], siz[ v ] );
    }
    f[ u ] = max( f[ u ], n - siz[ u ] );
}

void find_leaf( int u, int fa, int &leaf, int &leaf_fa )
{
    bool is_leaf = 1;
    for( int v : adj[ u ] )
    {
        if( v == fa ) continue;
        is_leaf = 0;
        find_leaf( v, u, leaf, leaf_fa );
    }
    if( is_leaf )
    {
        leaf = u;
        leaf_fa = fa;
    }
}

void solve( )
{
    cin >> n;
    for( int i = 1; i <= n; ++ i ) adj[ i ].clear( );
    for( int i = 1, u, v; i < n; ++ i )
    {
        cin >> u >> v;
        adj[ u ].push_back( v ); adj[ v ].push_back( u );
    }

    get_centroid( 1, 0 );
    int min_val = inf;
    vector< int > roots;
    for( int i = 1; i <= n; ++ i )
    {
        if( f[ i ] < min_val ) { min_val = f[ i ]; roots.clear( ); }
        if( f[ i ] == min_val ) roots.push_back( i );
    }

    if( roots.size( ) == 1 )
    {
        int u = 1, v = adj[ 1 ][ 0 ];
        cout << u << " " << v << "\n" << u << " " << v << "\n";
    }
    else
    {
        int r1 = roots[ 0 ], r2 = roots[ 1 ];
        int leaf, leaf_fa;
        find_leaf( r1, r2, leaf, leaf_fa ); // 避开 r2 找叶子
        cout << leaf << " " << leaf_fa << "\n" << leaf << " " << r2 << "\n";
    }
}

int main( )
{
    ios::sync_with_stdio( 0 ); cin.tie( 0 );
    int t; cin >> t;
    while( t -- ) solve( );
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N)$。两次 DFS。
    
- **关键点**: 利用 `find_leaf(r1, r2, ...)` 传参技巧，将邻接的另一个重心视为父亲，从而封锁在该方向的搜索。