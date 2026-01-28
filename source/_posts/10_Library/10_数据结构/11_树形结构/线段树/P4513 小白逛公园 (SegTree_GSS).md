---
title: P4513 小白逛公园
tags:
  - 数据结构/线段树
  - 策略/分治
difficulty: 提高+/省选-
categories:
  - 10_Library
  - 10_数据结构
  - 11_树形结构
abbrlink: 500cfb67
date: 2025-12-03
---
# [Luogu-P4513](https://www.luogu.com.cn/problem/P4513) 小白逛公园

## 1. 核心逻辑

- **问题本质**: 单点修改，区间查询最大子段和。
    
- **破局转换**:
    
    1. **信息合并局限**：单纯维护区间最大值无法处理跨越中点的子段。
        
    2. **不变量维护**：
        
        - `sum`: 区间和。
            
        - `lmax`: 最大前缀。
            
        - `rmax`: 最大后缀。
            
        - `dat`: 区间最大子段和。
            
    3. **合并逻辑 (PushUp)**：
        
        - `dat = max({L.dat, R.dat, L.rmax + R.lmax})`。
            
    4. **查询陷阱**：查询区间不一定完整覆盖线段树节点，必须在查询函数中实时执行 `merge` 操作。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
// P4513 小白逛公园
// Key Logic: Segment Tree with GSS PushUp logic

#include <bits/stdc++.h>
using namespace std;

#define ls ( u << 1 )
#define rs ( u << 1 | 1 )

const int maxn = 5e5 + 50;
int n, m;
int a[ maxn ];

struct Node
{
    int l, r;
    int sum, lmax, rmax, dat;
} tr[ maxn << 2 ];

Node merge( Node L, Node R )
{
    Node res;
    res.l = L.l; res.r = R.r;
    res.sum = L.sum + R.sum;
    res.lmax = max( L.lmax, L.sum + R.lmax );
    res.rmax = max( R.rmax, R.sum + L.rmax );
    res.dat = max( { L.dat, R.dat, L.rmax + R.lmax } );
    return res;
}

void push_up( int u )
{
    tr[ u ] = merge( tr[ ls ], tr[ rs ] );
}

void build( int u, int l, int r )
{
    tr[ u ].l = l; tr[ u ].r = r;
    if( l == r )
    {
        tr[ u ].sum = tr[ u ].lmax = tr[ u ].rmax = tr[ u ].dat = a[ l ];
        return;
    }
    int mid = ( l + r ) >> 1;
    build( ls, l, mid );
    build( rs, mid + 1, r );
    push_up( u );
}

void modify( int u, int x, int v )
{
    if( tr[ u ].l == tr[ u ].r )
    {
        tr[ u ].sum = tr[ u ].lmax = tr[ u ].rmax = tr[ u ].dat = v;
        return;
    }
    int mid = ( tr[ u ].l + tr[ u ].r ) >> 1;
    if( x <= mid ) modify( ls, x, v );
    else modify( rs, x, v );
    push_up( u );
}

Node query( int u, int l, int r )
{
    if( l <= tr[ u ].l && tr[ u ].r <= r ) return tr[ u ];
    int mid = ( tr[ u ].l + tr[ u ].r ) >> 1;
    if( r <= mid ) return query( ls, l, r );
    if( l > mid ) return query( rs, l, r );
    return merge( query( ls, l, r ), query( rs, l, r ) );
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> m;
    for( int i = 1; i <= n; ++ i ) cin >> a[ i ];

    build( 1, 1, n );

    for( int i = 1; i <= m; ++ i )
    {
        int op, x, y;
        cin >> op >> x >> y;
        if( op == 1 )
        {
            if( x > y ) swap( x, y );
            cout << query( 1, x, y ).dat << "\n";
        }
        else
        {
            modify( 1, x, y );
        }
    }

    return 0;
}
```

{% endfold %}

## 3. 归档备注

- 线段树维护非简单可加信息的代表题。
    
- 重点在于 `query` 过程中的临时节点合并。