---
title: 'P1197 [JSOI2008] 星球大战'
tags:
  - 数据结构/并查集
  - 算法/逆向思维
difficulty: 普及+/提高
categories:
  - 11_Library
  - 01_数据结构
  - 03_集合与倍增
abbrlink: 3417472e
date: 2025-11-28 00:00:00
---
# [Luogu-P1197](https://www.luogu.com.cn/problem/P1197) 星球大战

## 1. 核心逻辑

- **问题本质**: 动态删点并查询连通块个数。
    
- **破局转换**:
    
    1. **逆转思维 (Reverse)**：并查集不支持分裂，但极度擅长合并。
        
    2. **时光倒流**：记录打击序列，先计算所有星球被打击后的“最终荒芜态”。
        
    3. **倒序修复**：从打击序列末尾开始恢复星球。
        
        - 恢复星球 $i$，连通块数暂时 $+1$。
            
        - 遍历 $i$ 的邻居，若邻居已修复，执行 `merge`，每成功合并一次连通块数 $-1$。
            

## 2. 代码实现

{% fold info @AcCode %}

```cpp
// P1197 [JSOI2008] 星球大战
// Key Logic: DSU reverse processing (Time Travel)

#include <bits/stdc++.h>
using namespace std;

const int maxn = 4e5 + 50;
int n, m, k;
int fa[ maxn ], hits[ maxn ], ans[ maxn ];
bool is_broken[ maxn ];
vector< int > adj[ maxn ];

int find( int x )
{
    return fa[ x ] == x ? x : fa[ x ] = find( fa[ x ] );
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> m;
    for( int i = 0; i < n; ++ i ) fa[ i ] = i;

    for( int i = 0; i < m; ++ i )
    {
        int u, v;
        cin >> u >> v;
        adj[ u ].push_back( v );
        adj[ v ].push_back( u );
    }

    cin >> k;
    for( int i = 1; i <= k; ++ i )
    {
        cin >> hits[ i ];
        is_broken[ hits[ i ] ] = true;
    }

    int total = n - k; // 打击后的存活点数
    for( int i = 0; i < n; ++ i )
    {
        if( is_broken[ i ] ) continue;
        for( int v : adj[ i ] )
        {
            if( is_broken[ v ] ) continue;
            int root_u = find( i ), root_v = find( v );
            if( root_u != root_v )
            {
                fa[ root_u ] = root_v;
                -- total;
            }
        }
    }

    ans[ k + 1 ] = total;

    // 倒序恢复星球
    for( int i = k; i >= 1; -- i )
    {
        int u = hits[ i ];
        is_broken[ u ] = false;
        ++ total; // 暂时作为一个新连通块
        for( int v : adj[ u ] )
        {
            if( is_broken[ v ] ) continue;
            int root_u = find( u ), root_v = find( v );
            if( root_u != root_v )
            {
                fa[ root_u ] = root_v;
                -- total;
            }
        }
        ans[ i ] = total;
    }

    for( int i = 1; i <= k + 1; ++ i ) cout << ans[ i ] << "\n";

    return 0;
}
```

{% endfold %}

## 3. 归档备注

- 这是一个将动态删除转化为动态增加的经典 Trick。
    
- 初始 `total` 需只计算未被打击的星球。
