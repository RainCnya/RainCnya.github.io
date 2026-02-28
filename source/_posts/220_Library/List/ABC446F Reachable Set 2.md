---
title: '[Leaf] [ABC446F] Reachable Set 2'
tags:
  - 图论/最短路
  - 算法/前缀差分
  - 难度/P3
categories:
  - 220_Library
  - List
abbrlink: 40c12491
date: 2026-02-21 22:19:29
---

# [F - Reachable Set 2](https://atcoder.jp/contests/abc446/tasks/abc446_f)

## 1. 题面梗概

**中译中**：给一个有向图。对于每一个 $k \in [1, N]$，问最少删掉多少个点，能保证从 $1$ 号点出发，无论怎么走都走不出 $\{1, \dots, k\}$ 。

> $N, M \leq 3 \times 10^5$

## 2. 逻辑推导

给定 $N$ 次查询，总不能每次都鲨鲨去搜一遍吧，那样复杂度肯定爆。

### 2.1 预处理

为了快速判断一个点 $v$ 能否在 “仅经过编号 $\leq k$ 的点” 的情况下被 $1$ 号点到达，我们定义 $f[v]$：

- 从节点 $1$ 到节点 $v$ 的所有路径中，路径上最大节点的编号的最小值。

如果 $f[v] \leq k$，意味着从 $1\to v$ 上存在一条全部节点 $\leq k$ 的路径。
    
如果 $f[v] > k$，则意味着要到达 $v$，必须经过至少一个编号大于 $k$ 的点。

### 2.2 类Dijkstra

计算 $f[v]$ 本质上是一个变体的最短路问题：

- **初始化**：$f[1] = 1$（起点的瓶颈值设为 1），其余 $f[v] = \infty$。
    
- **转移**：对于边 $u \to v$，新的潜在可能值为 $\max(f[u], u)$。
    
- **松弛**：$f[v] = \min( f[v], \max( f[u], u ) )$。

我们利用 `priority_queue` 维护 $f$ 值，即可在 $O(M \log N)$ 内完成预处理。

### 2.3 判定

**合法性判定**：对于一个确定的 $k$，怎么判断能不能只留下 $1 \dots k$ ？很简单，只需要满足以下条件即可。

$$
\max_{1 \leq i \leq k}\{f[i]\} \leq k
$$

**删除点数量**：接着下一个问题，如果 $k$ 合法，我们需要删掉多少个点。

我们必须删掉 $v > k$ 且 $f[v] \leq k$ 的点，也就是 $f[v] \leq k < v$。

这就意味着，对于每个顶点 $v$，它会对 $k \in [f[v], v-1]$ 这个区间上都贡献一次删除。

那么这种区间修改就可以用差分来快速解决了。

### 2.4 结论

Dijkstra 变体 + 差分思想。


## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 3e5 + 5;
const int inf = 0x3f3f3f3f;

vector< int > adj[maxn];
int f[maxn];
int dif[maxn];
int n, m;

struct State {
    int u, d;
    bool operator < ( const State &oth ) const { return d > oth.d; }
};

void dijkstra( )
{    
    for( int i = 1; i <= n; ++ i ) f[i] = inf;

    priority_queue< State > pq;
    pq.push({ 1, 1 });
    f[1] = 1;

    while( !pq.empty( ) )
    {
        auto [u, d] = pq.top( ); pq.pop( );
        if( d > f[u] ) continue;
        
        for( int v : adj[u] )
        {
            int nf = max( d, u );
            if( nf < f[v] )
            {
                f[v] = nf;
                pq.push({ v, f[v] });
            }
        }
    }
}

void solve( )
{
    cin >> n >> m;
    for( int i = 1; i <= m; ++ i )
    {
        int u, v; cin >> u >> v;
        adj[u].push_back( v );
    }

    dijkstra( );

    for( int i = 1; i <= n; ++ i )
    {
        if( f[i] < i && f[i] != inf )
        {
            dif[f[i]] ++;
            dif[i] --;
        }
    }

    int sum = 0;
    int max_f = 0;
    for( int k = 1; k <= n; ++ k )
    {
        sum += dif[k];
        max_f = max( max_f, f[k] );
        if( max_f <= k ) cout << sum << '\n';
        else cout << -1 << '\n';
    }
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

- **复杂度分析**：Dijkstra $O(M \log N)$ + 差分 $O( N )$。
        
- **碎碎念**：注意到 $k$ 是连续增长的，且我们只关心下标的大小关系，通过对题目可达性的分析简化问题。
    
- **关联笔记**：[[最短路体系]] | [[降维技巧#前缀和与差分]]]
