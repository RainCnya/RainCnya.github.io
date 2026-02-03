---
title: '[Leaf] [ZJ2020B] Bin Packing Problem'
tags:
  - 数据结构/线段树
  - 数据结构/平衡树
  - 难度/P3
categories:
  - 220_Library
  - 10_数据结构
  - 11_树形结构
abbrlink: 28fc8d87
date: 2026-01-20 00:00:00
---
# [ZJ2020B - Bin Packing Problem](https://codeforces.com/gym/102770/problem/B)

## 1. 题面梗概

**中译中**：给定 $N$ 个物品和容量为 $C$ 的箱子，模拟两种近似算法：

1. **First Fit (FF)**：物品按顺序放，遇到第一个能塞进的箱子就塞；塞不下就开新箱子。
    
2. **Best Fit (BF)**：物品按顺序放，在所有能塞下的箱子中，找一个剩余空间最小的塞；塞不下就开新箱子。
    

## 2. 逻辑推导

这道题如果 $N$ 比较小，直接 $N^2$ 暴力就行。但 $N \leq 10^6$，显然需要采用 $O(N \log N)$ 复杂度的优化。

#### 1. First Fit：线段树
我们要找的是：**满足 $remain[i] \ge a[i]$ 的第一个索引 $i$**。这不就是线段树维护区间最大值，然后跑“线段树二分”吗？

我们可以这样维护一颗线段树：
- 节点维护 `mx`（区间最大剩余空间）。
- 查询逻辑：先看左子树的 `mx` 是否满足要求。
- 满足就递归左子树，不满足再递归右子树。

### 2. Best Fit：平衡树

我们要找的是：**所有满足** $remain[j] \ge a[i]$ **的箱子中，剩余空间最小的那一个**。这是一个类搜索问题。

我们可以用 `multiset` 模拟平衡树：
- 开一个 `std::multiset` 维护所有已经开启的箱子的剩余空间。
- 直接调用 `lower_bound`，去查询 `a[i]`。
- 如果找到了，就把那个旧箱子拿出来，更新后再塞回去。
- 如果找不到，就再加一个 $C - a[i]$ 的箱子。

## 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 1e6 + 50;

ll a[maxn];
int n;
ll C;

struct Node {
    int l, r;
    ll mx;
} tr[ maxn << 2 ];

#define ls ( u << 1 )
#define rs ( u << 1 | 1 )

void push_up( int u ) {
    tr[u].mx = max( tr[ls].mx, tr[rs].mx );
}

void build( int u, int l, int r )
{
    tr[u] = { l, r, 0 };
    if( l == r ) 
    {
        tr[u].mx = C;
        return ;
    }
    int mid = ( l + r ) >> 1;
    build( ls, l, mid );
    build( rs, mid + 1, r );
    push_up( u );
}

void update( int u, int idx, ll val )
{
    if( tr[u].l == tr[u].r )
    {
        tr[u].mx = val;
        return ;
    }
    int mid = ( tr[u].l + tr[u].r ) >> 1;
    if( idx <= mid ) update( ls, idx, val );
    else update( rs, idx, val );
    push_up( u );
}

int query( int u, ll val )
{
    if( tr[u].l == tr[u].r ) return tr[u].l;
    if( tr[ls].mx >= val ) return query( ls, val );
    else return query( rs, val );
}

ll remain[maxn];

int solve1( )
{
    build( 1, 1, n );
    for( int i = 1; i <= n; ++ i ) remain[i] = C;

    int max_idx = 0;
    for( int i = 1; i <= n; ++ i )
    {
        int idx = query( 1, a[i] );
        max_idx = max( max_idx, idx );

        remain[idx] -= a[i];
        update( 1, idx, remain[idx] );
    }
    return max_idx;
}

int solve2( )
{
    multiset< ll > s;
    for( int i = 1; i <= n; ++ i )
    {
        auto it = s.lower_bound( a[i] );
        if( it == s.end( ) )
        {
            s.insert( C - a[i] );
        }
        else
        {
            ll val = *it - a[i];
            s.erase( it );
            s.insert( val );
        }
    }
    return s.size( );
}

void solve( )
{
    cin >> n >> C;
    for( int i = 1; i <= n; ++ i ) cin >> a[i];

    int first = solve1( );
    int best = solve2( );
    cout << first << " " << best << '\n';
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int _t = 1;
    cin >> _t;
    while( _t -- )
    {
        solve( );
    }
    return 0;
}
```

{% endfold %}

## 4. 复盘

- **复杂度**: $O( N \log N )$。
    
- **碎碎念**: 线段树二分时，一定要优先判定左子树，这样才能保证找的是“第一个”。**避雷**：在`multiset`中，`erase(it)` 删的是点，`erase(val)` 删的是全家！！！这个题核心就是把“模拟策略”套了一层“高效数据结构”的外壳。
	    
- **关联笔记**:  [[线段树]] | [[平衡树]]