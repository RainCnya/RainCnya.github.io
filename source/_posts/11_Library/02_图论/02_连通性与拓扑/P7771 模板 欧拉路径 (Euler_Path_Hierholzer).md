---
title: P7771 【模板】欧拉路径 (Euler_Path_Hierholzer)
tags:
  - 图论/连通性
  - 算法/欧拉路径
difficulty: 普及+/提高
categories:
  - 11_Library
  - 02_图论
  - 02_连通性与拓扑
abbrlink: '12512919'
date: 2025-12-15 00:00:00
---

# [Luogu-P7771](https://www.luogu.com.cn/problem/P7771) 【模板】欧拉路径

## 1. 核心逻辑

- **问题本质**: 寻找有向图中经过每条边恰好一次且字典序最小的路径。
    
- **核心切入点**:
    
    1. **度数判定**:
        
        - 起点：$out = in + 1$（若无，则为任意 $in=out$ 且编号最小的点）。
            
        - 终点：$in = out + 1$。
            
    2. **Hierholzer 算法**: 核心在于「死胡同必须最后记录」。在 DFS 的**回溯阶段**将节点入栈，最后逆序输出。
        
    3. **当前弧优化**: 必须记录 `cur[u]` 指向当前未访问的第一条边。若直接遍历 `adj[u]` 而不更新起始索引，复杂度将退化为 $O(M^2)$。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxn = 1e5 + 50;

vector< int > adj[ maxn ];
int cur[ maxn ], ind[ maxn ], outd[ maxn ];
stack< int > ans;
int n, m;

void dfs( int u )
{
    // &i 引用是关键：确保持久更新该点的起始扫描位置
    for( int &i = cur[ u ]; i < adj[ u ].size( ); )
    {
        int v = adj[ u ][ i ];
        ++ i; // 逻辑删边
        dfs( v );
    }
    ans.push( u ); // 回溯入栈
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> m;
    for( int i = 1; i <= m; ++ i )
    {
        int u, v;
        cin >> u >> v;
        adj[ u ].push_back( v );
        ++ outd[ u ];
        ++ ind[ v ];
    }

    for( int i = 1; i <= n; ++ i )
    {
        sort( adj[ i ].begin( ), adj[ i ].end( ) ); // 字典序保证
    }

    int start = 1, cnt_st = 0, cnt_ed = 0;
    bool ok = true;

    for( int i = 1; i <= n; ++ i )
    {
        if( ind[ i ] == outd[ i ] ) continue;
        if( outd[ i ] == ind[ i ] + 1 ) 
        {
            start = i;
            ++ cnt_st;
        }
        else if( ind[ i ] == outd[ i ] + 1 ) 
        {
            ++ cnt_ed;
        }
        else 
        {
            ok = false;
        }
    }

    if( ! ok || ! ( ( cnt_st == 0 && cnt_ed == 0 ) || ( cnt_st == 1 && cnt_ed == 1 ) ) )
    {
        cout << "No\n";
        return 0;
    }

    dfs( start );

    if( ans.size( ) < m + 1 ) // 孤立边连通性检查
    {
        cout << "No\n";
        return 0;
    }

    while( ! ans.empty( ) )
    {
        cout << ans.top( ) << ( ans.size( ) == 1 ? "" : " " );
        ans.pop( );
    }
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(M \log M + N)$。排序占主导，遍历为线性。
    
- **关键点**: 理解后序遍历在处理「回路回归」与「路径末梢」时的拓扑正确性。