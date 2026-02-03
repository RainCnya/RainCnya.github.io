---
title: '[Leaf] [2020I] Invoking the Magic'
tags:
  - 数据结构/并查集
  - 图论/连通性
  - 难度/P2
categories:
  - 220_Library
  - 10_数据结构
  - 12_连通性结构
abbrlink: 7654fe38
date: 2026-01-20 00:00:00
---
# [ZJ2020I - Invoking the Magic](https://codeforces.com/gym/102770/problem/I)

## 1. 题面梗概

**中译中**: 给定 $n$ 对 $pair$，保证这 $2n$ 个数一定由 $n$ 个不同的数各恰好出现两次组成。要求将这些 $pair$ 分成若干组，使得每组内出现的数都在该组内恰好出现两次。最小化最大组包含的 $pair$ 数。

## 2. 逻辑推导

既然要求组内出现的没一个数都必须成对，而每个数在全局也只出现了两次。

那么，如果数 $X$ 分布在 $pair_i$ 和 $pair_j$ 中，这两对 $pair$ 就必须共进退。

如果我们每一个**颜色**都看作一个**节点**，每一个 $pair$ 看作是一条**边**的话。

那么问题就转换为了，寻找图中的联通块，同时注意到，每个点都出现了两次，意味着每个点的度数恰好为 $2$。

那么这里就有两种方案来解决了，“并查集” / “DFS 找环”。

我采用并查集来维护这种连通性。对于每一组 $pair(a,b)$，就相当于连一条边 $a \to b$，同时累加该连通块中的**边数**。

**最终**：边数最多的那个连通块（环），就是答案。

> PS: 值域 $a_i,b_i \leq 2^{30}$ ，我们需要离散化一下。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair<int, int>;

const int maxn = 2e5 + 5;

int fa[maxn];
int cnt[maxn];

int find( int x )
{
    if( fa[x] == x ) return fa[x];
    else return fa[x] = find( fa[x] );
}

void solve( )
{
    int n;
    cin >> n;

    map< int, int > mp;

	// 多组数据初始化
    for( int i = 1; i <= 2 * n; ++ i )
    {
        fa[i] = i;
        cnt[i] = 0;
    }

    int idx = 0;
    for( int i = 1; i <= n; ++ i )
    {
        int a, b;
        cin >> a >> b;
        if( mp.find( a ) == mp.end() ) mp[a] = ++ idx;
        if( mp.find( b ) == mp.end() ) mp[b] = ++ idx;

        int u = mp[a], v = mp[b];
        int ru = find( u ), rv = find( v );

        if( ru != rv )
        {
            fa[ru] = rv;
            cnt[rv] += cnt[ru] + 1;
        }
        else
        {
            cnt[rv] += 1;
        }
    }

    int ans = 0;
    for( int i = 1; i <= idx; ++ i )
    {
        if( fa[i] == i ) ans = max( ans, cnt[i] );
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
- **复杂度**: $O( N \log N )$，瓶颈在于 `std::map` 的映射。

- **碎碎念**: 这种“约束捆绑”的限制条件，一般可以向**连通性**问题靠拢。**避雷**：一般并查集维护的是**节点数**，但是这题需要维护的是**边数**。

- **关联笔记**: [[并查集]] | [[图论建模]]