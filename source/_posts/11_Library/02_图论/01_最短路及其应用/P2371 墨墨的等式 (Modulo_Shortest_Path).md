---
title: P2371 墨墨的等式 (Modulo_Shortest_Path)
tags:
  - 图论/最短路
  - 数论/同余系
difficulty:
  - 提高+/省选-
categories:
  - 11_Library
  - 02_图论
  - 01_最短路及其应用
abbrlink: 6c8a9ff1
date: 2025-12-01 00:00:00
---
# [Luogu-P2371](https://www.luogu.com.cn/problem/P2371) 墨墨的等式

## 1. 核心逻辑

- **问题本质**: 求解 $\sum a_i x_i = B$ 在区间 $[L, R]$ 内有多少个 $B$ 存在非负整数解。
    
- **破局转换**:
    
    1. **状态坍缩**：直接求解组合数不可行。考虑模 $mn = \min\{a_i\}$ 的余数类。
        
    2. **建模映射**：令 $dist[i]$ 表示模 $mn$ 余 $i$ 的数中，能被凑出的**最小值**。
        
    3. **转移逻辑**：对于每个系数 $a_k$，存在连边 $u \to (u + a_k) \pmod{mn}$，边权为 $a_k$。
        
    4. **结果统计**：若 $dist[i] \le X$，则在 $[0, X]$ 范围内，模 $mn$ 余 $i$ 的合法数值个数为 $\lfloor (X - dist[i]) / mn \rfloor + 1$。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
// P2371 墨墨的等式
// Key Logic: Modulo Shortest Path (Shortest Path on Congruence Class)

#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
typedef pair< ll, int > pli;

const int maxn = 5e5 + 50;
const ll inf = 1e18;

int n;
ll L, R;
int a[ 15 ];
ll dist[ maxn ];
bool vis[ maxn ];

void dijkstra( int mn )
{
    for( int i = 0; i < mn; ++ i ) dist[ i ] = inf;
    dist[ 0 ] = 0;
    priority_queue< pli, vector< pli >, greater< pli > > pq;
    pq.push( { 0, 0 } );

    while( ! pq.empty( ) )
    {
        auto [ d, u ] = pq.top( );
        pq.pop( );

        if( vis[ u ] ) continue;
        vis[ u ] = 1;

        for( int i = 1; i <= n; ++ i )
        {
            int v = ( u + a[ i ] ) % mn;
            if( dist[ u ] + a[ i ] < dist[ v ] )
            {
                dist[ v ] = dist[ u ] + a[ i ];
                pq.push( { dist[ v ], v } );
            }
        }
    }
}

ll calc( ll X, int mn )
{
    if( X < 0 ) return 0;
    ll res = 0;
    for( int i = 0; i < mn; ++ i )
    {
        if( dist[ i ] <= X )
        {
            res += ( X - dist[ i ] ) / mn + 1;
        }
    }
    return res;
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> L >> R;
    int mn = 1e9;
    for( int i = 1; i <= n; ++ i )
    {
        cin >> a[ i ];
        if( a[ i ] > 0 ) mn = min( mn, a[ i ] );
    }

    dijkstra( mn );

    cout << calc( R, mn ) - calc( L - 1, mn ) << "\n";

    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(mn \log mn)$。选择系数中最小值作为模数可使点数最少。
    
- **关键点**: 理解同余最短路如何处理“无限”的凑数可能。