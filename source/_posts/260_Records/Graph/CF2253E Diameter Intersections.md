---
title: CF2253E Diameter Intersections
tags:
  - 图论/树的直径
  - 图论/树形DP
  - 技巧/树形结构压缩
status: solved
categories:
  - 260_Records
  - Graph
abbrlink: 2cd4643a
date: 2026-09-07 00:00:00
updated: 2026-09-08 00:00:00
---

# 把直径交集拆到中心边两侧

> [!question] [CF2253E Diameter Intersections](https://codeforces.com/problemset/problem/2253/E)
> 给定一棵直径长度为奇数的树。选择两条直径，允许完全相同，求它们公共边数的所有可能值。
>
> 数据规模：$n\le10^6$，所有测试中 $\sum n\le10^6$。

树上关于直径有个性质，奇数的直径存在唯一的中心边，即任意直径都经过它。

那不妨找到这一条边，然后把树分割成两部分，分别处理，然后交集就是左侧公共前缀，中心边，右侧公共前缀了。

那么一侧的公共前缀长度，就是两个最深节点的 LCA 深度。最开始打算直接暴力枚举所有最深端点对求 LCA，但这样的复杂度是 $\mathcal{O}(n^{2})$，容易爆炸。

于是换个角度分析，有哪些节点本身能成为两个最深端点的 LCA？

以一侧中心点为根，先求最大深度。随后 DFS 统计一个节点有多少个儿子方向能够通向最深端点，记为 `cnt`：

- `cnt == 0` 时，若当前点本身就是最深端点，可以两次选择它；
- `cnt == 1` 时，所有最深端点都沿同一个方向继续，当前点是中介；
- `cnt >= 2` 时，可以从两个不同方向各选一个最深端点，当前点就是它们的 LCA。

所以最后只需要统计 `cnt != 1` 的有效深度即可。左右两侧分别得到集合 $A,B$ 后，答案就是所有 $x+y+1$。

本题的关键在于，树上直径的性质，以及从枚举端点对到直接找可能的分叉点。

```cpp title:"CF2253E" fold
const int maxn = 1e6 + 5;

vector<int> adj[maxn];
int dep[maxn], fa[maxn], ed;

void dfs1( int u, int p ) {
    fa[u] = p;
    dep[u] = dep[p] + 1;
    if( ed == 0 || dep[u] > dep[ed] ) ed = u;

    for( int v : adj[u] ) {
        if( v != p ) dfs1( v, u );
    }
}

int mxdep;

void dfs2( int u, int p, int d ) {
    dep[u] = d;
    mxdep = max( mxdep, d );

    for( int v : adj[u] ) {
        if( v != p ) dfs2( v, u, d + 1 );
    }
}

bool dfs3( int u, int p, vector<int> &vec ) {
    int cnt = 0;
    for( int v : adj[u] ) {
        if( v == p ) continue;
        if( dfs3( v, u, vec ) ) ++ cnt;
    }

    bool ok = ( dep[u] == mxdep || cnt > 0 );
    if( ok && cnt != 1 ) vec.push_back( dep[u] );
    return ok;
}

vector<int> calc( int rt, int ban ) {
    vector<int> res;

    mxdep = 0;
    dfs2( rt, ban, 0 );
    dfs3( rt, ban, res );

    sort( res.begin( ), res.end( ) );
    res.erase( unique( res.begin( ), res.end( ) ), res.end( ) );
    return res;
}

void solve( ) {
    int n;
    cin >> n;

    for( int i = 1; i <= n; ++ i ) adj[i].clear( );

    for( int i = 1; i < n; ++ i ) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back( v );
        adj[v].push_back( u );
    }

    ed = 0; dfs1( 1, 0 ); int s = ed;
    ed = 0; dfs1( s, 0 ); int t = ed;

    vector<int> path;
    for( int x = t; ; x = fa[x] ) {
        path.push_back( x );
        if( x == s ) break;
    }
    reverse( path.begin( ), path.end( ) );

    int d = ( (int)path.size( ) - 1 ) / 2;
    int a = path[d], b = path[d + 1];

    vector<int> A = calc( a, b );
    vector<int> B = calc( b, a );

    set<int> ans;
    for( int x : A ) {
        for( int y : B ) ans.insert( x + y + 1 );
    }

    cout << ans.size( );
    for( int x : ans ) cout << ' ' << x;
    cout << '\n';
}
```
