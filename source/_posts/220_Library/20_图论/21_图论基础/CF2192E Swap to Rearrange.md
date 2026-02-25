---
title: '[Leaf] [CF2192E] Swap to Rearrange'
tags:
  - 图论/欧拉回路
  - 策略/转化
  - 难度/P4
categories:
  - 220_Library
  - 20_图论
  - 21_图论基础
abbrlink: 1d7be858
date: 2026-02-25 11:57:26
---

# [CF2192E - Swap to Rearrange](https://codeforces.com/contest/2192/problem/E)

## 1. 题面梗概

**中译中**：给定长度为 $n$ 的数组 $a, b$，对每个位置 $i$ 可选交换 $a_i, b_i$。目标是使得最终 $a, b$ 的多重集相等。

> $1 \le n \le 10^6, \sum n \le 10^6$

## 2. 逻辑推导

多重集相等意味着每个数值 $v$ 在 $a$ 数组出现的次数必须恰好等于其在 $a, b$ 总频次的一半。

由此推导：所有数值总频次必须为偶数。

### 2.1 模型转换

我们将 $a_{i}, b_{i}$ 视作连接数值 $a_{i}$ 和 $b_{i}$ 的一条无向边。

- **不交换**：边定向为 $a_{i} \to b_{i}$。
- **交换**：边定向为 $b_{i} \to a_{i}$。

若要满足频次平分，则每个点的 **入度必须等于出度**，这不是就是个 **欧拉回路** 的问题吗？

### 2.2 结论

在所有点度数均为偶数的情况下，该图必然可以分解为若干个欧拉回路。我们只需遍历回路，根据遍历时的起点是否为原数组 $b$ 中的元素来决定是否记录交换操作。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 1e6 + 5;

struct Edge { int to, id; };

vector< Edge > adj[maxn];
bool used[maxn];
int cur[maxn];
int cnt[maxn], a[maxn], b[maxn];
int n;
vector< int > ans;

// Hierholzer 递归算法
void dfs( int u )
{
	// 当前弧优化
    for( int &i = cur[u]; i < adj[u].size( ); ++ i )
    {
        auto [to, id] = adj[u][i ++];
        if( used[id] ) continue;
        used[id] = 1;
        if( u == b[id] ) ans.push_back( id );
        dfs( to );
    }
}

void solve( )
{
    cin >> n;
    for( int i = 1; i <= n; ++ i ) 
    {
        adj[i].clear( );
        cnt[i] = 0;
        used[i] = 0;
        cur[i] = 0;
    }

    for( int i = 1; i <= n; ++ i )
    {
        cin >> a[i];
        cnt[ a[i] ] ++;
    }
    for( int i = 1; i <= n; ++ i )
    {
        cin >> b[i];
        cnt[ b[i] ] ++;
    }

    for( int i = 1; i <= n; ++ i )
    {
        if( cnt[i] % 2 != 0 )
        {
            cout << -1 << '\n';
            return ;
        }
    }

    for( int i = 1; i <= n; ++ i )
    {
        adj[ a[i] ].push_back({ b[i], i });
        adj[ b[i] ].push_back({ a[i], i });
    }

    for( int i = 1; i <= n; ++ i )
    {
        if( cur[i] < adj[i].size( ) ) dfs( i );
    }

    cout << ans.size( ) << '\n';
    for( auto i : ans ) cout << i << ' ';
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

- **复杂度分析**：$O( N )$。
    
- **碎碎念**：只要保证每个连通分量形成欧拉闭环，定向结果就能保证入度=出度。难点在于把问题转化为欧拉回路问题。
    
- **关联笔记**：[[欧拉回路与路径]]
