---
title: P3605 Promotion Counting
tags:
  - 数据结构/树状数组
  - 树论/DFS序
  - 算法/离线
status: solved
categories: [260_Records, DS]
abbrlink: p3605001
date: 2026-08-12 00:00:00
updated: 2026-08-13 00:00:00
---

# P3605 Promotion Counting

> [!question] [P3605 [USACO17JAN] Promotion Counting P](https://www.luogu.com.cn/problem/P3605)
> 公司上下级关系构成一棵以总裁为根的树，需要对每头奶牛统计其严格下属中能力比它强的奶牛数量。
>
> 数据规模：$n\le 10^5$，所有能力值互不相同。

我的第一反应是“树剖后求子树逆序对”，不过询问始终是整棵子树，并没有路径操作，所以简单的 DFS 序就已经可以把每棵子树都压成一个连续的区间了。

而且题目也不是统计子树内部所有逆序对，而是分别回答每个节点有多少个更强的后代。

接着只要把奶牛按能力从大到小离线处理，树状数组中已加入的节点便恰好比当前节点更强，查询当前子树区间即可。

```cpp title:"P3605" fold
struct BIT { /* 模板代码略 */ } bit;

vector<int> adj[maxn];
int ans[maxn];
int dfn[maxn], out[maxn], timer;

void dfs( int u ) {
    dfn[u] = ++ timer;
    for( int v : adj[u] ) dfs( v );
    out[u] = timer;
}

void solve( ) {
    int n = read( );

    vector< pair<int, int> > cow;

    for( int i = 1; i <= n; ++ i ) {
        int p = read( );
        cow.push_back({ p, i });
    }

    sort( cow.rbegin( ), cow.rend( ) );

    for( int i = 2; i <= n; ++ i ) {
        int fa = read( );
        adj[fa].push_back( i );
    }

    dfs( 1 );
    bit.init( n );

    for( auto [x, u] : cow ) {
        ans[u] = bit.ask( dfn[u], out[u] );
        bit.add( dfn[u], 1 );
    }

    for( int i = 1; i <= n; ++ i ) {
        cout << ans[i] << '\n';
    }
}
```

## 记录

- 归属：DFS 序、离线二维关系。
- 新增：树上祖先限制转为 DFS 序区间，能力限制由排序后的扫描进度承担。
- 分类：待定。
