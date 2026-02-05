---
title: 'P3128 [USACO15DEC] Max Flow P (LCA_Point_Difference)'
tags:
  - 算法/前缀差分
  - 图论/树论/LCA
difficulty: 普及+/提高
categories:
  - 221_Library
  - 02_图论
  - 03_树上问题
abbrlink: 73d3a184
date: 2025-11-02 00:00:00
---
# [Luogu-P3128](https://www.luogu.com.cn/problem/P3128) Max Flow P

## 1. 核心逻辑

- **问题本质**: 给定 $K$ 条路径，每条路径覆盖的点权 $+1$，求全树点权的最大值。
    
- **破局转换**:
    
    1. **差分降维**：直接覆盖路径复杂度为 $O(N)$。利用**树上点差分**将路径修改坍缩为端点标记，复杂度降至 $O(1)$。
        
    2. **差分协议**：对于路径 $(u, v)$，标记逻辑如下：
        
        - `diff[u]++`, `diff[v]++`
            
        - `diff[LCA(u, v)]--`, `diff[fa[LCA(u, v)]]--`
            
    3. **贡献回收**：利用 DFS 进行自底向上的前缀和汇总。节点 $u$ 的真实点权等于其子树内所有差分标记之和。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxn = 50005;
const int maxlg = 20;

vector< int > adj[ maxn ];
int f[ maxn ][ maxlg ], dep[ maxn ], diff[ maxn ];
int n, k, ans = 0;

void dfs_lca( int u, int father )
{
    dep[ u ] = dep[ father ] + 1;
    f[ u ][ 0 ] = father;
    for( int i = 1; i < maxlg; ++ i )
    {
        f[ u ][ i ] = f[ f[ u ][ i - 1 ] ][ i - 1 ];
    }
    for( int v : adj[ u ] )
    {
        if( v != father ) dfs_lca( v, u );
    }
}

int get_lca( int u, int v )
{
    if( dep[ u ] < dep[ v ] ) swap( u, v );
    for( int i = maxlg - 1; i >= 0; -- i )
    {
        if( dep[ f[ u ][ i ] ] >= dep[ v ] ) u = f[ u ][ i ];
    }
    if( u == v ) return u;
    for( int i = maxlg - 1; i >= 0; -- i )
    {
        if( f[ u ][ i ] != f[ v ][ i ] )
        {
            u = f[ u ][ i ];
            v = f[ v ][ i ];
        }
    }
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
    ans = max( ans, diff[ u ] );
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> k;
    for( int i = 1; i < n; ++ i )
    {
        int u, v;
        cin >> u >> v;
        adj[ u ].push_back( v );
        adj[ v ].push_back( u );
    }

    dfs_lca( 1, 0 );

    while( k -- )
    {
        int u, v;
        cin >> u >> v;
        int lca = get_lca( u, v );
        ++ diff[ u ];
        ++ diff[ v ];
        -- diff[ lca ];
        -- diff[ f[ lca ][ 0 ] ];
    }

    dfs_sum( 1, 0 );
    cout << ans << "\n";

    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O((N+K) \log N)$。主要开销在于 LCA 初始化与 $K$ 次查询。
    
- **关键点**: 理解点差分中 `fa[lca]` 的减法逻辑。它确保了路径贡献仅止步于 $LCA$ 节点，而不会向其父辈祖先渗透，从而实现精确的链式覆盖。