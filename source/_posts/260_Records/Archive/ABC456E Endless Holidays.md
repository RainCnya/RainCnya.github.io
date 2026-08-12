---
title: 'ABC456E Endless Holidays'
tags:
  - 图论/分层图
  - 图论/判环
  - 搜索/DFS
categories:
  - 260_Records
  - Archive
abbrlink: cc27f62e
date: 2026-05-04 00:00:00
---
# [E - Endless Holidays](https://atcoder.jp/contests/abc456/tasks/abc456_e)

## 题意
有 $N$ 个城市，$M$ 条双向道路。一个星期有 $W$ 天。 每个城市都有自己的假期安排。高桥每天可以选择 **留在该城市** 或者 **相邻的城市**。 问：高桥能否从第 $1$ 天，找到一种策略，使得他永远在放假。（羡慕了）

> $N \leq 10^5, M \leq 10^5, W \leq 10$。

## 思路
这也是一道典题，典型的分层图建模 + 判环。

**为什么是分层图**？在一般的图论中，节点就是纯粹的“城市”。而在这道题中，限制高桥行动的不仅有“空间”（他在哪个城市），还有“时间”（今天是星期几，不同城市的放假情况不同）。所以，不能单纯只用“城市”来作为图的节点，必须把“时间”维度也扩展进去。

接着我们通过数据规模验证，发现 $W\leq10$，完美满足条件。所以我们就用一个二维状态来表示一个节点 $(u, d)$，在城市 $u$，今天是第 $d$ 天。由于有 $N$ 个城市，$W$ 天，所以整个图就有 $N \times W$ 个节点，也就是把图分成了 $W$ 层，这就是所谓的分层图。

说完分层图的节点之后，考虑**如何连边**。由于每天可以不移动或者去相邻的城市，而且我们要找的路线是*每天都是放假*，如果当前城市明天的状态是放假，就可以连一条指向明天该城市的有向边；如果相邻城市的明天是放假，也连一条有向边。注意边一定是**有向边**，因为时间不可逆。

建模完成后，回归问题本质。题目要求能“永远”放假，在一个只有 $N \times W$ 个有限节点的有向图里走无限步，根据鸽巢原理，意味着路径必定走入了一个**环**！ 所以我们只需要在建好的图上做一遍 DFS 搜环即可。给每个到达的点打上访问标记（正在访问 / 已访问完毕），如果在搜索过程中碰到“正在访问”的节点，就说明成功找到了环。

当然也可以用 BFS，或者拓扑排序（因为这是个有向图），如果拓完还有多余的点，那就说明有环，具体证明不展开了。

## 代码部分
```cpp
vector< int > adj[maxn];
string s[maxn];
// 0 not visited | 1 visiting | 2 visited
// 我这里没开二维数组，用一维压缩了状态 (u, d) -> u * w + d
int vis[maxn * 10];
int n, m, w;

bool dfs( int uid ) {
    vis[uid] = 1;

	// 解码出一维状态里对应的 u, d
    int u = uid / w;
    int d = uid % w;
    int nxt = (d + 1) % w;

    // 停留原地
    if( s[u][nxt] == 'o' ) {
        int vid = u * w + nxt;
        if( vis[vid] == 1 ) return 1;
        if( vis[vid] == 0 ) if( dfs( vid ) ) return 1;
    }

    // 去相邻城市
    for( int v : adj[u] ) {
        if( s[v][nxt] == 'o' ) {
            int vid = v * w + nxt;
            if( vis[vid] == 1 ) return 1;
            if( vis[vid] == 0 ) if( dfs( vid ) ) return 1;
        }
    }
    vis[uid] = 2;
    return 0;
}

void solve( ) {
    cin >> n >> m;

    for( int i = 0; i < n; ++ i ) adj[i].clear( );

    for( int i = 0; i < m; ++ i ) {
        int u, v; cin >> u >> v;
	    // 使用 0-index 是为了方便后续压缩成一维状态时的除法和取模运算
        u --, v --;
        adj[u].push_back( v );
        adj[v].push_back( u );
    }

    cin >> w;
    for( int i = 0; i < n; ++ i ) cin >> s[i];

    int tot = n * w;
    fill( vis, vis + tot, 0 );

    for( int i = 0; i < n; ++ i ) {
	    // 从每个第一天就放假的城市出发
        if( s[i][0] == 'o' ) {
            int stid = i * w + 0;
            if( vis[stid] == 0 ) {
                if( dfs( stid ) ) {
                    cout << "Yes" << '\n';
                    return;
                }
            }
        }
    }
    cout << "No" << '\n';
    return;
}
```
