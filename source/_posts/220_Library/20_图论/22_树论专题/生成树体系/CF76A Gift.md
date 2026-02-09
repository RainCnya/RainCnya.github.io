---
title: '[Leaf] [CF76A] Gift'
tags:
  - 图论/生成树
  - 图论/建模
  - 难度/P3
categories:
  - 220_Library
  - 20_图论
  - 22_树论专题
abbrlink: f55ae898
date: 2026-02-05 21:56:59
---

# [CF76A Gift - 洛谷](https://www.luogu.com.cn/problem/CF76A)

## 1. 题面梗概

**中译中**: 每条边有两个代价：金币 $g_i$ 和银币 $s_i$。你需要选出 $n-1$ 条边构成生成树。总代价 = $G \cdot \max(g_{tree}) + S \cdot \max(s_{tree})$。求最小总代价。

## 2. 逻辑推导

这一看就知道是个 MST 问题，但问题是——它是个双变量问题，这就很麻烦了。

### 2.1 突破点

如果我们固定其中一个变量，比如 $g \leq limit$，那么问题就转化为了在 $g$ 符合要求的边集里找到一个 $s$ 的最小生成树。

我们将所有的边按照 $g$ 升序排序，随着我们依次加入边，允许的 $g_{max}$ 也在逐步增加，可以使用的边也在增多。

如果每次加入一条新边，就推倒重来跑一遍 $Kruskal$，这个复杂度完全就不能接受了。

### 2.2 动态更新

我们可以维护一个 $cur$ 集合，按照 $s$ 升序排序，存放满足 $g$ 条件下的边。

然后每次加入一条边后，跑一遍以 $s$ 为基准的 $Kruskal$。

这样的优化关键在于：那些没被选中生成树的边，对于未来更大的 $g$ 来说依然没有贡献，所以我们就筛掉了一批没有用的冗余边，从而降低了复杂度。

### 2.3 结论

比较麻烦的 $Kruskal$ 优化问题，题目的 $N \leq 200$ 暗示我们，可以接受多次跑生成树，但如果数据范围进一步扩大，可能需要 LCT 来解决这个问题。

## 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 200 + 50;
const int maxm = 5e4 + 50;

struct Edge { 
    int u, v; 
    ll g, s;
    bool operator < ( const Edge &oth ) const { return g < oth.g; }
} edges[maxm];

int fa[maxn];
ll G, S;
int n, m;

int find( int x ) { return fa[x] == x ? x : fa[x] = find( fa[x] ); }

void solve( )
{
    cin >> n >> m;
    cin >> G >> S;

    for( int i = 1; i <= m; ++ i )
    {
        cin >> edges[i].u >> edges[i].v >> edges[i].g >> edges[i].s;
    }

    sort( edges + 1, edges + m + 1 );
    ll ans = -1;

    vector< Edge > cur;
    for( int i = 1; i <= m; ++ i )
    {
        Edge now = edges[i];        

        auto it = cur.begin( );
        while( it != cur.end( ) && it -> s <= now.s ) it ++;
        cur.insert( it, now );

        for( int j = 1; j <= n; ++ j ) fa[j] = j;

        ll max_s = 0;
        int cnt = 0;
        
        vector< Edge > nxt;
        for( auto &e : cur )
        {
            int fu = find( e.u ), fv = find( e.v );
            if( fu != fv ) 
            {
                fa[fu] = fv;
                nxt.push_back( e );
                max_s = max( max_s, e.s );
                cnt ++;
            }
        }
        
        cur = nxt;
        if( cnt == n - 1 )
        {
            ll res = now.g * G + max_s * S;
            if( ans == - 1 || res < ans ) ans = res;
        }
    }
    cout << ans << '\n';
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

- **复杂度分析**：$O( M \cdot (M + N \log N) )$ 是理论上限，但由于动态剪枝，实际复杂度接近 $O( M \cdot N )$。
    
- **碎碎念**：中间的插入部分在代码实现上还挺麻烦的，虽然说可以用优先队列来实现，但是这样的话复杂度不占优势，而且也挺麻烦的。
    
- **关联笔记**：[[生成树体系]]
