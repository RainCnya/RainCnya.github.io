---
title: '[Leaf] [CF1406C] Link Cut Centroids'
tags:
  - 树论/重心
  - 策略/构造
  - 难度/P3
categories:
  - 220_Library
  - 20_图论
  - 22_树论专题
abbrlink: cc4bf061
date: 2025-12-18 00:00:00
upddated: 2026-02-09 10:31:19
---

# [CF1406C Link Cut Centroids - 洛谷](https://www.luogu.com.cn/problem/CF1406C)

## 1. 题面梗概

**中译中**： 给你一棵树，让你删掉一条边再加回一条边，使得这棵树变成“单重心”的。

## 2. 逻辑推导

理论上，一棵树只有两种可能，单重心和双重心。

如果只有一个重心，那么随便搞，走个形式即可。如果有两个重心呢？

### 2.1 重心

重心的定义是，该点的最大子树大小 $\leq N / 2$。如果是双重心，那就是两个点的最大子树都是 $N / 2$。

如此，我们很容易就能想到，只需要把某一个重心的叶子节点连接到另一个重心，就可以转移重心了。

### 2.2 结论

这是一个重心性质的简单应用。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 1e5 + 5;

vector< int > adj[maxn];
int sz[maxn], f[maxn];
int r1, r2;
int n;

int leaf, leaf_p;

void find_leaf( int u, int p )
{
    if( adj[u].size( ) == 1 ) 
    {
        leaf = u;
        leaf_p = p;
        return;
    }
    for( int v : adj[u] )
    {
        if( v == p ) continue;
        find_leaf( v, u );
        if( leaf != -1 ) return;
    }
}

void get_root( int u, int p )
{
    sz[u] = 1;
    f[u] = 0;

    for( int v : adj[u] )
    {
        if( v == p ) continue;
        get_root( v, u );
        sz[u] += sz[v];
        f[u] = max( f[u], sz[v] );
    }
    
    f[u] = max( f[u], n - sz[u] );
    if( f[u] < f[r1] ) r1 = u, r2 = 0;
    else if( f[u] == f[r1] ) r2 = u;
}

void solve( )
{
    cin >> n;

    for( int i = 1; i <= n; ++ i ) adj[i].clear( );
    r1 = r2 = 0;
    f[0] = n + 1;

    for( int i = 1; i < n; ++ i )
    {
        int u, v;
        cin >> u >> v;
        adj[u].push_back( v );
        adj[v].push_back( u );
    }

    get_root( 1, 0 );

    if( r2 == 0 ) 
    {
        cout << adj[r1][0] << ' ' << r1 << '\n';
        cout << adj[r1][0] << ' ' << r1 << '\n';
    }
    else
    {
        leaf = -1;
        find_leaf( r1, r2 );

        cout << leaf << ' ' << leaf_p << '\n';
        cout << leaf << ' ' << r2 << '\n';
    }
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int _t = 1;
    cin >> _t;
    while( _t -- ) solve( );
    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度分析**：$O( N )$。
    
- **碎碎念**：找叶子时，一定要传入 `r2` 作为 `find_leaf` 的禁止方向，否则你可能会搜到 $r_2$ 那边的子树去，那就破坏不了平衡了。
        
- **关联笔记**：[[直径与重心]] | [[构造体系]]