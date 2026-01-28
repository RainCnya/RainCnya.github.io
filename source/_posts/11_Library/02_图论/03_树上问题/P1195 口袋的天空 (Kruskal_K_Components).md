---
title: P1195 口袋的天空 (Kruskal_K_Components)
tags:
  - 树论/MST
  - 数据结构/并查集
difficulty: 普及/提高-
categories:
  - 11_Library
  - 02_图论
  - 03_树上问题
abbrlink: f848758c
date: 2025-12-08 08:58:10
---
# [Luogu-P1195](https://www.luogu.com.cn/problem/P1195) 口袋的天空

## 1. 核心逻辑

- **问题本质**: 将 $N$ 个离散点通过代价最小的边连成恰好 $K$ 个连通块。
    
- **核心切入点**:
    
    1. **不变量推导**：初始有 $N$ 个连通块。每次有效的合并（选取一条 MST 边）会使块数 $-1$。
        
    2. **目标转换**：要使块数变为 $K$，需要执行 $N - K$ 次合并。
        
    3. **策略选择**：Kruskal 算法天生支持按权值排序，只需在完成第 $N - K$ 条边时停止即可。
        
- **坑点**: 若图中原本的连通分量数就多于 $K$，或者边不足以将点合并至 $K$ 块，需输出 `No Answer`。
    

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

struct Edge 
{
    int u, v, w;
    bool operator < ( const Edge &other ) const 
    {
        return w < other.w;
    }
} edges[ 10005 ];

int fa[ 1005 ], n, m, k;

int find( int x )
{
    return x == fa[ x ] ? x : fa[ x ] = find( fa[ x ] );
}

int main( )
{
    ios::sync_with_stdio( 0 ); cin.tie( 0 );
    cin >> n >> m >> k;
    for( int i = 0; i < m; ++ i ) cin >> edges[ i ].u >> edges[ i ].v >> edges[ i ].w;

    sort( edges, edges + m );
    iota( fa + 1, fa + n + 1, 1 );

    int cnt = 0, ans = 0;
    for( int i = 0; i < m; ++ i )
    {
        if( cnt == n - k ) break;
        int fu = find( edges[ i ].u ), fv = find( edges[ i ].v );
        if( fu != fv )
        {
            fa[ fu ] = fv;
            ans += edges[ i ].w;
            ++ cnt;
        }
    }

    if( cnt == n - k ) cout << ans << "\n";
    else cout << "No Answer\n";

    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(M \log M)$。
    
- **核心思路**: 理解最小生成树合并过程与连通块数量的线性相关性。