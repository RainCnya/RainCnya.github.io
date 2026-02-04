---
title: '[Leaf] [CF2183D1] Tree Coloring'
tags:
  - 图论/树论
  - 策略/贪心
  - 难度/P3
categories:
  - 220_Library
  - 20_图论
  - 22_树论专题
abbrlink: 46822ad0
date: 2026-01-14 00:00:00
---
# [CF2183D1 Tree Coloring  (Easy Version)](https://codeforces.com/contest/2183/problem/D1)

## 1. 题面梗概（翻译）

给定一棵 $n$ 个节点的树，求让所有节点染色的最小操作数。

操作限制：每次染色中，不能有两个节点连接，或者深度相同。

## 2. 逻辑推导

由于题目要求**最小操作数**，不妨从答案的**下界**入手。

什么节点不能同时染色呢？

- 深度相同 或者 父子节点。

所以一种下界显然就是 $\max(cnt_i)$，`cnt[i]` 表示深度为 $i$ 的节点数量。

然后我们考虑第二个限制条件，父亲和儿子不能同时染色。

那么这种情况的下界就是 $max(son_i + 1)$，`son[i]` 表示第 $i$ 个节点的儿子数量。

结论：答案就是 $\max( \max^{maxdepth}_1(cnt_i), \max^{n}_{1}(son_i + 1) )$ 。

那么思路就很清晰了，先从根节点开始搜一遍，预处理出需要的数据。

`dep[i] | cnt[i] | son[i]` 然后根据公式计算答案即可。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair<int, int>;

const int maxn = 2e5 + 5;
 
vector<int> adj[maxn]; // graph
int cnt[maxn]; // level
int dep[maxn]; // depth
int son[maxn]; // son_cnt
int n;

int bfs( int root )
{
    int lim = 0; // max_depth

    queue< int > q;
    q.push( root );
    dep[root] = 0;

    while( !q.empty( ) )
    {
        int u = q.front( );
        q.pop( );
        cnt[dep[u]] ++;
        lim = max( lim, dep[u] );

        for( int v : adj[u] )
        {
            if( dep[v] != -1 ) continue;
            dep[v] = dep[u] + 1;
            son[u] ++;
            q.push( v );
        }
    }
    return lim;
}

void solve( )
{
    cin >> n;

    for( int i = 0; i <= n; ++ i )
    {
        adj[i].clear( );
        dep[i] = -1;
        son[i] = cnt[i] = 0;
    }

    for( int i = 1; i <= n - 1; ++ i )
    {
        int u, v;
        cin >> u >> v;
        adj[u].push_back( v );
        adj[v].push_back( u );
    }

    int lim = bfs( 1 );

    int ans = 0;
    
    for( int i = 0; i <= lim; ++ i )
    {
        ans = max( ans, cnt[i] );
    }

    for( int i = 1; i <= n; ++ i )
    {
        ans = max( ans, son[i] + 1 ); // son + father
    }

    cout << ans << '\n';
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
- **复杂度**：$O( N )$
- **碎碎念**：当时看到这题的时候是想着按要求每一步都贪心，然后跑一遍算出答案。不过实际分析之后，发现题目不要求输出中间步骤，然后对比`hard`问题后，发现应该是可以直接算出来的。
- **关联笔记**: [[Note] 知识点名称]