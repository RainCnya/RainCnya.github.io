---
title: 'P5490 [模板] 扫描线'
tags:
  - 数据结构/线段树
  - 算法/扫描线
difficulty: 提高+/省选-
categories:
  - 10_Library
  - 10_数据结构
  - 11_树形结构
abbrlink: 546db6bb
date: 2025-12-03
---
# [Luogu-P5490](https://www.luogu.com.cn/problem/P5490) 扫描线

## 1. 核心逻辑

- **问题本质**: 求 $N$ 个矩形的并集面积。
    
- **破局转换**:
    
    1. **降维**：沿 $X$ 轴切分，面积 = $\sum (\Delta X_i \times \text{当前 } Y \text{ 轴覆盖长度})$。
        
    2. **特殊线段树**：维护 $Y$ 轴区间覆盖情况。
        
        - `cnt`: 当前区间被完整覆盖的次数。
            
        - `len`: 当前区间内被覆盖的实际长度。
            
    3. **无 PushDown**：覆盖标记成对出现且查询仅限根节点，PushUp 时若 `cnt > 0` 则 `len` 直接等于区间物理长度。
        
    4. **离散化**：$Y$ 轴坐标大，需对线段树节点所代表的物理坐标进行离散化映射。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
// P5490 [模板] 扫描线
// Key Logic: Segment Tree maintaining physical coverage length (Area Union)

#include <bits/stdc++.h>
using namespace std;
using ll = long long;

#define ls ( u << 1 )
#define rs ( u << 1 | 1 )

const int maxn = 2e5 + 50;
int n;
ll raw_y[ maxn << 1 ];

struct Line
{
    ll x, y1, y2;
    int state;
    bool operator < ( const Line &other ) const
    {
        return x < other.x;
    }
} lines[ maxn << 1 ];

struct Node
{
    int l, r;
    int cnt;
    ll len;
} tr[ maxn << 3 ];

void push_up( int u )
{
    if( tr[ u ].cnt )
    {
        tr[ u ].len = raw_y[ tr[ u ].r + 1 ] - raw_y[ tr[ u ].l ];
    }
    else
    {
        tr[ u ].len = tr[ ls ].len + tr[ rs ].len;
    }
}

void build( int u, int l, int r )
{
    tr[ u ].l = l; tr[ u ].r = r;
    tr[ u ].cnt = 0; tr[ u ].len = 0;
    if( l == r ) return;
    int mid = ( l + r ) >> 1;
    build( ls, l, mid );
    build( rs, mid + 1, r );
}

void modify( int u, int l, int r, int v )
{
    if( l <= tr[ u ].l && tr[ u ].r <= r )
    {
        tr[ u ].cnt += v;
        push_up( u );
        return;
    }
    int mid = ( tr[ u ].l + tr[ u ].r ) >> 1;
    if( l <= mid ) modify( ls, l, r, v );
    if( r > mid ) modify( rs, l, r, v );
    push_up( u );
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n;
    for( int i = 1; i <= n; ++ i )
    {
        ll x1, y1, x2, y2;
        cin >> x1 >> y1 >> x2 >> y2;
        lines[ 2 * i - 1 ] = { x1, y1, y2, 1 };
        lines[ 2 * i ] = { x2, y1, y2, -1 };
        raw_y[ 2 * i - 1 ] = y1;
        raw_y[ 2 * i ] = y2;
    }

    sort( lines + 1, lines + 2 * n + 1 );
    sort( raw_y + 1, raw_y + 2 * n + 1 );
    int m = unique( raw_y + 1, raw_y + 2 * n + 1 ) - ( raw_y + 1 );

    build( 1, 1, m - 1 );

    ll ans = 0;
    for( int i = 1; i < 2 * n; ++ i )
    {
        int L = lower_bound( raw_y + 1, raw_y + m + 1, lines[ i ].y1 ) - raw_y;
        int R = lower_bound( raw_y + 1, raw_y + m + 1, lines[ i ].y2 ) - raw_y;
        modify( 1, L, R - 1, lines[ i ].state );
        ans += tr[ 1 ].len * ( lines[ i + 1 ].x - lines[ i ].x );
    }

    cout << ans << endl;

    return 0;
}
```

{% endfold %}

## 3. 归档备注

- 扫描线是线段树的一种极其特殊的变体。
    
- 重点在于：线段树的叶子节点维护的是离散化后的“一段区间”而非“一个点”。
    
- 无需 PushDown 的原因在于操作的全局性与成对性。
