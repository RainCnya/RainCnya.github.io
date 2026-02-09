---
title: '[Leaf] [P1550] Watering Hole G'
tags:
  - 图论/生成树
  - 图论/建模
  - 难度/P2
categories:
  - 220_Library
  - 20_图论
  - 22_树论专题
abbrlink: 667c1029
date: 2026-02-05 21:15:32
---

# [P1550 [USACO08OCT] Watering Hole G - 洛谷](https://www.luogu.com.cn/problem/P1550)
## 1. 题面梗概

**中译中**: 有 $n$ 块农田需要供水。供水有两种方式：一是直接在农田上打井（成本 $W_i$），二是从已经有水的农田引水（连通成本 $P_{i,j}$）。求让所有农田都有水的最小总代价。

## 2. 逻辑推导

这看起来就像 MST 问题，但是多了一个 “点权”，这个就很麻烦了，因为常规的 $Kruskal$ 算法只能处理边权。

### 2.1 源点

我们考虑一个田什么情况下会有供水：要么自己打了井；要么引了水流。

既然如此，我们可以建立一个超级源点（地下水库），记作 $0$ 号源点。

那么，在 $i$ 号井打井的成本 $W_i$，等价于从 $0$ 号源点向 $i$ 号田连一条权值 $W_i$ 的边。

### 2.2 MST问题

这样就把这个麻烦的 “点权” 转化为了 “边权”，接下来就可以愉快的跑一遍 $Kruskal$ 解决问题了。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 300 + 50;

struct Edge { 
    int u, v; ll w;
    bool operator < ( const Edge &oth ) const { return w < oth.w; }
} edges[maxn * maxn];
int edge_cnt;

int fa[maxn];
ll ws[maxn];
ll mst_weight;
int n;

int find( int x )
{
    if( fa[x] == x ) return fa[x];
    else return fa[x] = find( fa[x] );
}

void kruskal( )
{
    for( int i = 1; i <= n; ++ i ) fa[i] = i;
    sort( edges + 1, edges + edge_cnt + 1 );

    for( int i = 1; i <= edge_cnt; ++ i )
    {
        auto [u, v, w] = edges[i];
        
        int fu = find( u ), fv = find( v );
        if( fu != fv )
        {
            fa[fu] = fv;
            mst_weight += w;
        }
    }
}

void solve( )
{
    cin >> n;
    for( int i = 1; i <= n; ++ i ) 
    {
        ll w;
        cin >> w;
        edges[++ edge_cnt] = { 0, i, w };
    }

    for( int i = 1; i <= n; ++ i )
    {
        for( int j = 1; j <= n; ++ j )
        {
            ll w;
            cin >> w;
            if( w == 0 ) continue;
            edges[++ edge_cnt] = { i, j, w };
        }
    }

    kruskal( );
    cout << mst_weight << endl;
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    solve( );
    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度分析**：$O(N^2 \log(N^2))$。

- **碎碎念**：本题的关键在于图的建模，通过虚拟源点对 “点权” 进行二次处理，就可以愉快的解决 “边权” 问题了。
    
- **关联笔记**：[[生成树体系]]