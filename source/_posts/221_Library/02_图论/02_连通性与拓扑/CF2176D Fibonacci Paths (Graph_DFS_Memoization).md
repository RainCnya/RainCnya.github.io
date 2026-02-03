---
title: CF2176D Fibonacci Paths (Graph_DFS_Memoization)
tags:
  - DP/计数
  - 搜索/DFS
  - 策略/逆向思维
difficulty:
  - Div.2 D
categories:
  - 221_Library
  - 02_图论
  - 02_连通性与拓扑
abbrlink: be70b0c3
date: 2025-12-18 00:00:00
---
# [CF2176D](https://codeforces.com/problemset/problem/2176/D) Fibonacci Paths

## 1. 核心逻辑

- **问题本质**: 在带权有向图中，统计所有满足权值构成斐波那契序列 $x_i = x_{i-1} + x_{i-2}$ 的路径总数。
    
- **破局转换**:
    
    1. **逆向推导**: 直接正向寻找 $x_{i-1} + x_{i-2}$ 的状态分支过多。若已知当前项 $x_i$ 与前一项 $x_{i-1}$，则前前项**唯一确定**为 $x_{i-2} = x_i - x_{i-1}$。
        
    2. **状态压缩与记忆化**:
        
        - 定义 `dfs(u, need)`：当前在节点 $u$，且要求前一个节点的值必须为 `need` 的合法路径数。
            
        - 使用 `map` 维护反向邻接表 `radj[v][val]`，即指向节点 $v$ 且自身权值为 `val` 的节点集。
            
    3. **关键点**: $need$ 必须大于 0。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
const int maxn = 2e5 + 5;
const int mod = 998244353;

ll a[ maxn ];
map< ll, vector< int > > radj[ maxn ]; 
map< ll, int > memo[ maxn ];
int n, m;

int dfs( int u, ll diff )
{
    if( diff <= 0 ) return 0;
    if( memo[ u ].count( diff ) ) return memo[ u ][ diff ];
    
    ll cnt = 0;
    if( radj[ u ].count( diff ) )
    {
        for( int w : radj[ u ][ diff ] )
        {
            cnt = ( cnt + 1 ) % mod; // 当前边 w->u 自身作为末尾
            cnt = ( cnt + dfs( w, a[ u ] - diff ) ) % mod; // 继续向前追溯
        }
    }
    return memo[ u ][ diff ] = ( int )cnt;
}

void solve( )
{  
    cin >> n >> m;
    for( int i = 1; i <= n; ++ i )
    {
        radj[ i ].clear( );
        memo[ i ].clear( );
    }
    for( int i = 1; i <= n; ++ i ) cin >> a[ i ];

    vector< pair< int, int > > edges;
    for( int i = 0; i < m; ++ i )
    {
        int u, v;
        cin >> u >> v;
        edges.push_back( { u, v } );
        radj[ v ][ a[ u ] ].push_back( u );
    }

    ll ans = 0;
    for( auto &e : edges )
    {
        ans = ( ans + 1 ) % mod; // 长度为 2 的边
        ans = ( ans + dfs( e.first, a[ e.second ] - a[ e.first ] ) ) % mod;
    }
    cout << ans << "\n";
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );
    int t;
    cin >> t;
    while( t -- ) solve( );
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O( (N+M) \log (\text{Val}) )$。受限于 `map` 的查询效率。
    
- **关键点**: 利用斐波那契序列的确定性进行逆向推导，大大缩小了搜索空间。