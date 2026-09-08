---
title: P9630 Interested in Skiing
tags:
  - 图论/瓶颈路
  - 计算几何/线段
  - 方法/对偶
status: solved
categories:
  - 260_Records
  - Graph
abbrlink: 484826b5
date: 2026-09-07 00:00:00
updated: 2026-09-08 00:00:00
---

# 从可通行路线改看障碍封锁链

> [!question] [P9630 [ICPC 2020 Nanjing R] Interested in Skiing](https://www.luogu.com.cn/problem/P9630)
> 滑雪场是无限向上的竖直带状区域 $-m\le x\le m$，其中有 $n$ 条互不相交的线段障碍。滑雪者竖直速度恒为 $v_y$，水平速度可以随时在 $[-v_x,v_x]$ 内改变。求临界值 $v_x^*$，使任意 $v_x>v_x^*$ 都能从负无穷滑到正无穷；若无论多快都无法通过，输出 `-1`。
>
> 数据规模：$1\le n\le100$，$1\le m\le10^4$，$1\le v_y\le10$；障碍端点满足 $-m\le x\le m$、$|y|\le10^4$，且任意两条障碍不相交。

最开始我的想法是，枚举每两个端点之间的转移，因为临界值一定是刚好蹭着边的情况达到的，当然如果端点已经在地图边缘了另说。

如此只需要把可以抵达的路线图建出来，然后边权记录最小需要多少速度，再求最小瓶颈路就可以了，当然这个写法实现起来非常麻烦。要考虑路线之间的交叉，端点特判，还有边界情况。

于是在看了题解之后，我发现了另一种视角，不看 “人能走出的路”，反过来看 “障碍能组成的封锁链”。把左边界、每条障碍和右边界看成节点，两个障碍之间的边权表示它们组成封锁连接的**强度**：当水平速度不超过这个值时，这个缺口就无法被穿过。

一条从左边界连到右边界的障碍链，其整体封锁强度取决于最弱的一条连接，所以路径价值是边权最小值；所有封锁链中再取最大值。因此最后求的是一条 **最大瓶颈路**，这里可以用 Dijkstra 来实现。

若两条障碍在共同的高度区间已经左右重叠，它们之间不存在可穿过的缺口，对应边权为无穷大；否则临界值只需从两条线段的端点对计算。若左、右边界最终由一条全为无穷强度的链连接，说明无论水平速度多大都无法通过，输出 `-1`。

图只有 $n+2$ 个点，代码按需枚举完整图上的边，时间复杂度为 $O(n^2\log n)$，空间复杂度为 $O(n)$。


```cpp title:"P9630" fold
using namespace std;
using ld = long double;
using ll = long long;

const int maxn = 3e5 + 5;
const ll inf = 4e18;


struct Point { 
    ll x, y; 
    friend Point operator - ( const Point A, const Point B ) { 
        return { A.x - B.x, A.y - B.y }; 
    }
};

int n, m;
ld vy;
pair<Point, Point> seg[maxn];

ld getx( auto s, ld y, bool right ) {
    auto [A, B] = s;
    if( A.y == B.y ) {
        if( right ) return max( A.x, B.x );
        else return min( A.x, B.x );
    }
    return A.x + (ld)( B.x - A.x ) * ( y - A.y ) / ( B.y - A.y );
}

ld get( int i, int j ) {
    auto [A1, A2] = seg[i];
    auto [B1, B2] = seg[j];
    ll l = max( min( A1.y, A2.y ), min( B1.y, B2.y ) );
    ll r = min( max( A1.y, A2.y ), max( B1.y, B2.y ) );
    if( l <= r ) {
        ld y = ( l + r ) / 2.0;
        ld xr = getx( seg[i], y, 1 );
        ld xl = getx( seg[j], y, 0 );
        if( xr >= xl ) return inf;
    }

    Point a[2] = { A1, A2 };
    Point b[2] = { B1, B2 };

    ld res = 0;    
    for( int x = 0; x < 2; ++ x ) {
        for( int y = 0; y < 2; ++ y ) {
            if( a[x].y == b[y].y ) continue;
            ll dx = max( 0ll, a[x].x - b[y].x );
            ll dy = abs( a[x].y - b[y].y );
            res = max( res, (ld)vy * dx / dy );
        }
    }
    return res;
}

ld getw( int u, int v ) {
    if( u == 0 && v == n + 1 ) return 0;
    if( u == 0 ) {
        ll lx = min( seg[v].first.x, seg[v].second.x );
        return lx == -m ? inf : 0;
    }
    if( v == n + 1 ) {
        ll rx = max( seg[u].first.x, seg[u].second.x );
        return rx == m ? inf : 0;
    }
    return get( u, v );
}

struct State {
    int u; ld d;
    bool operator < ( const State &a ) const { return d < a.d; }
};
ld dis[maxn << 1];

void dijkstra( int S, int T ) {
    fill( dis + 1, dis + T + 1, -1 );
    dis[S] = inf;
    priority_queue<State> pq;
    pq.push({ S, inf });
    while( !pq.empty( ) ) {
        auto [u, d] = pq.top( ); pq.pop( );
        if( dis[u] != d ) continue;
        if( u == T ) break;
        for( int v = 1; v <= T; ++ v ) {
            if( u == v ) continue;
            ld w = getw( u, v );
            ld nd = min( dis[u], w );
            if( nd > dis[v] ) {
                dis[v] = nd;
                pq.push({ v, nd });
            }
        }
    }
}

void solve( ) {
    n = read( ), m = read( );
    int _vy = read( );
    vy = 1.0 * _vy;

    for( int i = 1; i <= n; ++ i ) {
        int x1 = read( ), y1 = read( );
        int x2 = read( ), y2 = read( );
        seg[i] = { { x1, y1 }, { x2, y2 } };
    }

    int S = 0, T = n + 1;
    dijkstra( S, T );
    
    if( dis[T] == inf ) {
        cout << -1 << '\n';
    } else {
        cout << fixed << setprecision( 15 ) << dis[T] << '\n';
    }
}
```

