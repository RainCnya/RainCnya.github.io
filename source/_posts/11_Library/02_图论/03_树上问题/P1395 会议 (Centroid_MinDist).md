---
title: P1395 会议 (Centroid_MinDist)
tags:
  - 树论/重心
  - 算法/贡献法
difficulty: 普及+/提高
categories:
  - 11_Library
  - 02_图论
  - 03_树上问题
abbrlink: b7868cc
date: 2025-12-18 00:00:00
---

# [Luogu-P1395](https://www.luogu.com.cn/problem/P1395) 会议

## 1. 核心逻辑

- **问题本质**: 寻找树上一个点，使得所有节点到该点的距离之和最小。
    
- **破局转换**:
    
    1. **重心性质**: 树上所有点到某点的距离和最小，该点即为**树的重心**。
        
    2. **计算优化**:
        
        - 全局距离和 = $\sum_{u \neq root} siz[u]$。
            
        - 物理含义：每一条边被经过的次数，等于其下方子树的节点个数。
            
    3. **字典序限制**: 若存在双重心，输出编号较小的一个。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxn = 50050;
vector< int > adj[ maxn ];
int siz[ maxn ], f[ maxn ], n, root_pos;

void dfs_centroid( int u, int fa )
{
    siz[ u ] = 1;
    f[ u ] = 0;
    for( int v : adj[ u ] )
    {
        if( v == fa ) continue;
        dfs_centroid( v, u );
        siz[ u ] += siz[ v ];
        f[ u ] = max( f[ u ], siz[ v ] );
    }
    f[ u ] = max( f[ u ], n - siz[ u ] );
}

void dfs_siz( int u, int fa )
{
    siz[ u ] = 1;
    for( int v : adj[ u ] )
    {
        if( v == fa ) continue;
        dfs_siz( v, u );
        siz[ u ] += siz[ v ];
    }
}

int main( )
{
    ios::sync_with_stdio( 0 ); cin.tie( 0 );
    cin >> n;
    for( int i = 1, u, v; i < n; ++ i )
    {
        cin >> u >> v;
        adj[ u ].push_back( v ); adj[ v ].push_back( u );
    }

    dfs_centroid( 1, 0 );
    int min_val = 1e9;
    for( int i = 1; i <= n; ++ i )
    {
        if( f[ i ] < min_val ) { min_val = f[ i ]; root_pos = i; }
    }

    dfs_siz( root_pos, 0 );
    long long ans = 0;
    for( int i = 1; i <= n; ++ i ) ans += siz[ i ];
    
    cout << root_pos << " " << ans - n << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N)$。
    
- **核心思路**: 理解距离总和向子树大小之和的映射转化（贡献法）。