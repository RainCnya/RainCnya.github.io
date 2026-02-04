---
title: '[Leaf] [ZJ2022G] Easy Glide'
tags:
  - 图论/最短路
  - 难度/P2
categories:
  - 220_Library
  - 20_图论
  - 21_图论基础
abbrlink: f91efdc6
date: 2026-01-24 17:31:55
---
# [ZJ2022G - Easy Glide](https://codeforces.com/gym/103687/problem/G)

## 1. 题面梗概

在一个二维平面上，给定一个起点 $s$，终点 $t$， $n$ 个中间点。平时速度为 $V_1$，从中间点出发，可以滑行 3s，速度为 $V_2$，求最快到达终点的时间。

## 2. 逻辑推导

乍一看，像是一道几何题，但是仔细分析移动规则后，发现这其实是一个**隐式图最短路**。

最简单的方案就是直接从 $S$ 奔赴 $T$，但地图上有这么多加速点，或许我们应该利用起来。那么我们就可以把图建模出来了，边权就是时间，然后跑一遍 `Dijkstra` 最短路即可。

考虑到 $N + 2$ 个节点，每两个节点间要建一条边，所以这是个稠密图，我们可以使用朴素板 `Dijkstra`，同时也不用完全显式建图。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair<int, int>;

const int maxn = 2e5 + 5;
const double inf = 1e18;

struct Point {
    ll x, y;
} p[maxn];

double dist[maxn];
bool vis[maxn];
int n;
ll v1, v2;

double distcalc( Point a, Point b )
{
    return sqrt( ( a.x - b.x ) * ( a.x - b.x ) + ( a.y - b.y ) * ( a.y - b.y ) );
}

double timecalc( int u, int v )
{
    double d = distcalc( p[u], p[v] );
    if( u == 0 ) return d / v1;
    if( d <= 3 * v2 ) return d / v2;
    return 3 + ( d - 3 * v2 ) / v1;
}

void dijkstra( )
{
    for( int i = 0; i <= n + 1; ++ i )
    {
        dist[i] = inf;
        vis[i] = 0;
    }

    dist[0] = 0;
    for( int i = 0; i <= n; ++ i )
    {
        int u = -1;
        for( int j = 0; j <= n + 1; ++ j )
        {
            if( !vis[j] && ( u == -1 || dist[j] < dist[u] ) )
            {
                u = j;
            }
        }
        
        if( u == -1 || dist[u] == inf ) break;
        vis[u] = 1;
        if( u == n + 1 ) break;

        for( int v = 0; v <= n + 1; ++ v )
        {
            if( vis[v] ) continue;
            double time = timecalc( u, v );
            dist[v] = min( dist[v], dist[u] + time );
        }
    }
}

void solve( )
{
    cin >> n;
    for( int i = 1; i <= n; ++ i ) cin >> p[i].x >> p[i].y;

    cin >> p[0].x >> p[0].y >> p[n + 1].x >> p[n + 1].y;
    cin >> v1 >> v2;

    dijkstra( );

    cout << fixed << setprecision( 12 ) << dist[n + 1] << '\n';
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int _t = 1;
    // cin >> _t;
    while( _t -- )
    {
        solve( );
    }
    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度**: $O( N^2 )$。朴素 Dijkstra。

- **碎碎念**: 看似计算几何，但实际上是图论建模问题，不过要注意，起点开始不能加速！在全连通的稠密图里，不要迷信堆优化，朴素 $O(N^2)$ 的常数优势非常明显。

- **关联笔记**: [[最短路体系]]