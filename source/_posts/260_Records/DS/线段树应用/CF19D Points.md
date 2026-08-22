---
title: CF19D Points
tags:
  - 数据结构/线段树
  - 数据结构/有序集合
  - 方法/离散化
status: solved
categories:
  - 260_Records
  - DS
  - 线段树应用
abbrlink: cf19d001
date: 2026-08-17 00:00:00
updated: 2026-08-18 00:00:00
---

# 先定位最小横坐标，再在列内定位纵坐标

> [!question] [CF19D Points](https://www.luogu.com.cn/problem/CF19D)
> 维护一个动态点集，支持加入和删除坐标不超过 $10^9$ 的点。每次询问 $(x,y)$ 时，要在所有满足 $x'>x$ 且 $y'>y$ 的点中，先选择横坐标最小的点；若这一列存在多个候选，再选择纵坐标最小的点，不存在则输出 $-1$。
>
> 数据规模：操作数 $1\le n\le2\times10^5$，所有坐标位于 $[0,10^9]$。

动态加点和动态删点，而且是一个二维的问题。

所以我们可以对两个维度分开处理，比如线段树维护 $x$ 轴上对应的 $y$ 轴最大值。接着对于每一个横坐标 $x$ 都开一个 `set` 来维护这个坐标内部的点。

那么添加操作就可以直接加入，判断一下是否能更新最大值。

删除操作就是先把旧点删除，然后把当前的 `set` 中的最大值覆盖进线段树中。

查询操作就是在线段树上二分了，找到第一个 $x' > x, y' > y$ 的点。这也是为什么线段树要维护最大值的原因。

最后需要注意值域很大，所以考虑先离散化预处理。

```cpp title:"CF 19D" fold
struct Disc { /* 模板代码略 */ } disc;

set<int> st[maxn];

#define ls ( u << 1 )
#define rs ( u << 1 | 1 )

struct SegTree {
/* ================================================== */
struct Node {
    int l, r;
    int mx;
} tr[maxn << 2];

void push_up( int u ) {
    tr[u].mx = max( tr[ls].mx, tr[rs].mx );
}

void build( int u, int l, int r ) {
    tr[u] = { l, r, 0 };
    if( l == r ) return ;
    int mid = ( l + r ) >> 1;
    build( ls, l, mid );
    build( rs, mid + 1, r );
}

void upd( int u, int pos, int val ) {
    if( tr[u].l == tr[u].r ) {
        tr[u].mx = val;
        return ;
    }
    int mid = ( tr[u].l + tr[u].r ) >> 1;
    if( pos <= mid ) upd( ls, pos, val );
    else upd( rs, pos, val );
    push_up( u );
}

int find_first( int u, int l, int r, ll val ) {
    if( r < tr[u].l || tr[u].r < l || tr[u].mx < val ) return 0;
    if( tr[u].l == tr[u].r ) return tr[u].l;
    int pos = find_first( ls, l, r, val );
    if( pos ) return pos;
    return find_first( rs, l, r, val );
}
/* ================================================== */
} seg;

struct Query { int opt, x, y; } qs[maxn];

void solve( ) {
    int n = read( );
    for( int i = 1; i <= n; ++ i ) {
        string opt;
        cin >> opt;
        int x = read( ), y = read( );
        if( opt == "add" ) qs[i] = { 1, x, y };
        else if( opt == "remove") qs[i] = { 2, x, y };
        else qs[i] = { 3, x, y };
        disc.add( x ), disc.add( y );
    }

    disc.init( );
    int m = disc.size( );
    seg.build( 1, 1, m );

    for( int i = 1; i <= n; ++ i ) {
        qs[i].x = disc.get_idx( qs[i].x );
        qs[i].y = disc.get_idx( qs[i].y );
    }

    for( int i = 1; i <= n; ++ i ) {
        auto [opt, x, y] = qs[i];
        if( opt == 1 ) {
            st[x].insert( y );
            seg.upd( 1, x, *st[x].rbegin( ) );
        }
        else if( opt == 2 ) {
            auto it = st[x].find( y );
            st[x].erase( it );
            if( st[x].empty( ) ) seg.upd( 1, x, 0 );
            else seg.upd( 1, x, *st[x].rbegin( ) );
        }
        else {
            int pos = seg.find_first( 1, x + 1, m, y + 1 );
            if( pos == 0 ) {
                cout << "-1" << '\n';
                continue;
            }
            auto it = st[pos].upper_bound( y );
            cout << disc.get_val( pos ) << " ";
            cout << disc.get_val( *it ) << '\n';
        }
    }
}
```
