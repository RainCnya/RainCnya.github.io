---
title: '[Leaf] [CF2195F] Parabola Independence'
tags:
  - DP/线性
  - 图论/建模
  - 图论/拓扑排序
  - 难度/P4
categories:
  - 220_Library
  - 20_图论
  - 21_图论基础
abbrlink: 466bb72
date: 2026-02-16 14:06:02
---

# [CF2195F - Parabola Independence](https://codeforces.com/contest/2195/problem/F)

## 1. 题面梗概

**中译中**：给定 $n$ 个二次函数。如果两个函数在所有实数域上都不相交，则称其独立。求包含函数 $f_i$ 的最大独立集合的大小。

## 2. 逻辑推导

如果函数 $f$ 在 $g$ 上方，且 $g$ 在 $h$ 上方，则 $f$ 一定也在 $h$ 上方，那么这题就转化为了一个偏序问题。

如果我们把 $f \to g$, $g \to h$ 的关系建一个图，那就是在 DAG 上求最长路。

### 2.1 偏序关系

记 $f(x) = a_{1}x^2 + b_{1}x + c_{1}$，$g(x) = a_{2}x^2 + b_{2}x + c_{2}$。

若两个二次函数不相交，那就是 $(a_{1} - a_{2})x^2 + (b_{1} - b_{2})x + (c_{1} - c_{2})$ 这个方程无实数解。

若我们要判断 $f$ 是否严格在 $g$ 上方，则需要判断 $(a_{1} - a_{2})x^2 + (b_{1} - b_{2})x + (c_{1} - c_{2}) > 0$ 是否对全体 $x$ 都满足。

- 二次方程 $a_1 \neq a_2$：则判别式 $\Delta < 0$，$a_{1} > a_{2}$。

- 一次方程 $a_1 = a_2$：则需 $b_1 = b_2$ 且 $c_1 > c_2$。

### 2.2 DAG 最长路

题目要包含函数 $f_i$ 的最大独立集合的大小，在这个偏序关系的图上，等价于求经过 $i$ 点的 DAG 最长路。

而这个问题可以用 DP 来解决，$DP_{pre}[u]$ 表示以 $u$ 点为终点的最长路， $DP_{suf}[u]$ 表示以 $u$ 为起点的最长路。

> 这个最长路类似于 LIS 问题，我这里采用记忆化搜索解决，或者也可以用拓扑排序，或者拓扑序进行DP，原理都是一样的。

包含点 $i$ 的最长路就是 $DP_{pre}[u] + DP_{suf}[u] - 1$，这样在 $O(n^2)$ 时间内就能解决了。

### 2.3 结论

函数 + 偏序 + DP 问题。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 3000 + 5;

struct Function { ll a, b, c; } f[maxn];
vector< int > adj[maxn], radj[maxn];
ll pre[maxn], suf[maxn];
int n;

bool delta( Function f1, Function f2 )
{
    Function diff = { f1.a - f2.a, f1.b - f2.b, f1.c - f2.c };
    if( diff.a == 0 )
    {
        if( diff.b == 0 ) return diff.c > 0;
        return 0;
    }
    else
    {
        if( diff.b * diff.b - 4 * diff.a * diff.c < 0 ) return diff.a > 0;
        return 0;
    }
}

int calc1( int u )
{
    if( pre[u] != -1 ) return pre[u];
    int res = 1;
    for( int v : radj[u] ) res = max( res, calc1( v ) + 1 );
    return pre[u] = res;
}

int calc2( int u )
{
    if( suf[u] != -1 ) return suf[u];
    int res = 1;
    for( int v : adj[u] ) res = max( res, calc2( v ) + 1 );
    return suf[u] = res;
}

void solve( )
{
    cin >> n;
    for( int i = 1; i <= n; ++ i )
    {
        cin >> f[i].a >> f[i].b >> f[i].c;
        adj[i].clear( );
        radj[i].clear( );
        pre[i] = suf[i] = -1;
    }

    for( int i = 1; i <= n; ++ i )
    {
        for( int j = 1; j <= n; ++ j )
        {
            if( i == j ) continue;
            if( delta( f[i], f[j] ) )
            {
                adj[i].push_back( j );
                radj[j].push_back( i );
            }
        }
    }
    
    for( int i = 1; i <= n; ++ i )
    {
        cout << calc1( i ) + calc2( i ) - 1 << " ";
    }
    cout << '\n';
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

- **复杂度分析**： $O(N^2)$。
    
- **碎碎念**：这道题的关键在于将 **函数独立性** 这种 **连续** 概念，通过 **代数判别式** 转化为了 **离散** 的上下 **偏序关系**。
    
- **关联笔记**：[[线性DP]] | [[拓扑排序]] 
