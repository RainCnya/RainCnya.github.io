---
title: '[Leaf] [CF2193E] Product Queries'
tags:
  - 图论/最短路
  - DP/线性
  - 搜索/BFS
  - 难度/P2/提高
categories:
  - 10_Library
  - 20_图论
  - 21_最短路与建模
abbrlink: 14c5b012
date: 2026-01-26 00:00:00
---
# [CF2193E - Product Queries](https://codeforces.com/contest/2193/problem/E)

## 1. 题面梗概

给定一个长度为 $n$ 的数组 $a$。你要回答 $n$ 个问题：对于每个 $i \in [1, n]$，最少从 $a$ 中选多少个数（可重复），使得它们的乘积恰好等于 $i$？
    
## 2. 逻辑推导

这个题有两种切入方式：一是最短路，二是 DP。

这里我介绍一下两种思路：

### 2.1 最短路

- **建模**：把 $1 \dots n$ 看作是图的节点。如果数组中有 $x$，那么就存在 $u \to u \times x$ 的边。
- **转移**：$dist[u \times x] = dist[u] + 1$。
- **本质**：由因子出发的扩散。

由于每条边的边权为 $1$，所以采用 BFS 能搜到的第一种情况就是答案。

### 2.2 DP

- **建模**：$dp[x]$ 表示凑出乘积为 $x$ 的最小个数。
- **转移**：$dp[x] = \min(dp[x],dp[y]+dp[x/y])$，其中 $y$ 是 $x$ 的因子。
- **本质**：由结果出发的回归拆解。

### 2.3 总结

两种算法的复杂度都是符合调和级数 $\sum n/i = O(n \log n)$。

这里从理论上分析一下两种算法，其实本质都是一样的，而 DP 算法本质上就是在 DAG 上跑的最短路/最长路算法。

## 3. 代码实现

{% fold info @AcCode BFS %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 3e5 + 5;

ll a[maxn];
int d[maxn];
int n;

void solve( )
{
    cin >> n;
    for( int i = 1; i <= n; ++ i ) 
    {
        cin >> a[i];
    }

    sort( a + 1, a + n + 1 );
    int m = unique( a + 1, a + n + 1 ) - (a + 1);

    for( int i = 1; i <= n; ++ i ) d[i] = -1;

    queue< ll > q;
    for( int i = 1; i <= m; ++ i )
    {
        if( d[ a[i] ] == -1 )
        {
            d[ a[i] ] = 1;
            q.push( a[i] );
        }
    }

    while( !q.empty( ) )
    {
        int u = q.front( );
        q.pop( );

        for( int j = 1; j <= m; ++ j )
        {
            if( a[j] == 1 ) continue;

            ll v = u * a[j];
            if( v > n ) break;

            if( d[v] == -1 )
            {
                d[v] = d[u] + 1;
                q.push( v );
            }
        }
    }

    for( int i = 1; i <= n; ++ i )
    {
        cout << d[i] << " ";
    }
    cout << '\n';
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

{% fold info @AcCode DP %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair<int, int>;

const int maxn = 2e5 + 5;
const int inf = 1e9;

int a[maxn], dp[maxn];
int n, q;

void solve( )
{
    cin >> n;

    for( int i = 1; i <= n; ++ i ) dp[i] = inf;

    for( int i = 1; i <= n; ++ i )
    {
        cin >> a[i];
        dp[a[i]] = 1;
    }

    for( int i = 1; i <= n; ++ i )
    {
        for( int j = i; j <= n; j += i )
        {
            dp[j] = min( dp[j], dp[i] + dp[j / i] );
        }
    }

    for( int i = 1; i <= n; ++ i )
    {
        if( dp[i] == inf ) dp[i] = -1;
        cout << dp[i] << " ";
    }
    cout << '\n';
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

- **复杂度**: $O( \sum n \log n )$。
    
- **碎碎念**:
    
    - **关于 1 的处理**: 如果 $1$ 在数组中，它能一步到位（$dist[1]=1$），但它不能作为后续扩散的因子（否则会死循环）。
        
    - **多组数据**: 注意 `dist` 数组的清理开销。由于 $\sum n$ 不大，直接循环清理是安全的。
        
- **关联笔记**: [[最短路]] | [[线性DP]]