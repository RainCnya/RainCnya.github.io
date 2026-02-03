---
title: P1993 小K的农场 (Difference_Constraints)
tags:
  - 图论/最短路
  - 图论/最短路/差分约束
difficulty: 普及+/提高
categories:
  - 221_Library
  - 02_图论
  - 01_最短路及其应用
abbrlink: '73e92509'
date: 2025-12-01 00:00:00
---
# [Luogu-P1993](https://www.luogu.com.cn/problem/P1993) 小K的农场

## 1. 核心逻辑

- **问题本质**: 给定一系列变量间的差值约束，判定是否有解。
    
- **破局转换**:
    
    1. **代数转几何**：将 $x_a - x_b \le w$ 映射为图论中的边 $b \xrightarrow{w} a$。
        
    2. **标准转化**：
        
        - $x_a - x_b \ge c \implies x_b - x_a \le -c \implies b \xleftarrow{-c} a$。
            
        - $x_a - x_b \le c \implies b \xrightarrow{c} a$。
            
        - $x_a = x_b \implies b \xrightarrow{0} a$ 且 $a \xrightarrow{0} b$。
            
    3. **冲突判定**：如果图中存在**负环**，则意味着约束条件存在逻辑坍缩，即无解。
        
    4. **超级源点**：建立 0 号点向所有点连边权为 0 的边，确保判负环过程能覆盖所有联通分量。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
// P1993 小K的农场
// Key Logic: Difference Constraints system with SPFA Negative Cycle detection

#include <bits/stdc++.h>
using namespace std;

const int maxn = 5005;
const int inf = 0x3f3f3f3f;

struct Edge
{
    int v, w;
};

vector< Edge > adj[ maxn ];
int dist[ maxn ], cnt[ maxn ];
bool vis[ maxn ];
int n, m;

bool spfa( )
{
    queue< int > q;
    for( int i = 1; i <= n; ++ i )
    {
        dist[ i ] = 0;
        vis[ i ] = 1;
        q.push( i );
    }

    while( ! q.empty( ) )
    {
        int u = q.front( );
        q.pop( );
        vis[ u ] = 0;

        for( auto &e : adj[ u ] )
        {
            if( dist[ u ] + e.w < dist[ e.v ] )
            {
                dist[ e.v ] = dist[ u ] + e.w;
                cnt[ e.v ] = cnt[ u ] + 1;
                if( cnt[ e.v ] > n ) return true; // 存在负环
                if( ! vis[ e.v ] )
                {
                    q.push( e.v );
                    vis[ e.v ] = 1;
                }
            }
        }
    }
    return false;
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> m;
    for( int i = 1; i <= m; ++ i )
    {
        int op, a, b, c;
        cin >> op >> a >> b;
        if( op == 1 )
        {
            cin >> c;
            adj[ a ].push_back( { b, -c } );
        }
        else if( op == 2 )
        {
            cin >> c;
            adj[ b ].push_back( { a, c } );
        }
        else
        {
            adj[ a ].push_back( { b, 0 } );
            adj[ b ].push_back( { a, 0 } );
        }
    }

    if( spfa( ) ) cout << "No\n";
    else cout << "Yes\n";

    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: SPFA 判负环，最坏 $O(NM)$。
    
- **关键点**: 严格遵守 $dist[v] \le dist[u] + w$ 对应 $u \xrightarrow{w} v$ 的映射方向。