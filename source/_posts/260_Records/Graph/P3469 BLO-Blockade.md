---
title: P3469 BLO-Blockade
tags:
  - 图论/割点
  - 图论/点双连通分量
  - 图论/圆方树
  - 方法/贡献统计
status: solved
categories:
  - 260_Records
  - Graph
abbrlink: p3469001
date: 2026-08-10 00:00:00
updated: 2026-08-10 00:00:00
---

# P3469 BLO-Blockade

> [!question] [P3469 [POI 2008] BLO-Blockade](https://www.luogu.com.cn/problem/P3469)
> B 城有若干城镇和双向道路，原本所有城镇互相连通。对于每个城镇 \(u\)，假设封锁所有与它相连的道路但仍保留这个城镇，需要统计此时有多少个有序城镇对 \((x,y)\) 无法互相到达，其中 \((x,y)\) 与 \((y,x)\) 分别计数。
>
> 数据规模：\(n\le 10^5\)，\(m\le 5\times 10^5\)。

本题本质上是在统计删去节点 \(u\) 的所有关联边后，不同连通块之间产生了多少个不连通有序点对。它与割点密切相关，但只判断一个节点是否为割点还不够，还需要知道删除它以后形成的各个连通块大小。

### Method 1 Tarjan + DFS 子树贡献统计

在 Tarjan 过程中同时维护 DFS 子树大小 `siz`。对于 DFS 树边 \(u\to v\)，若满足 \(\operatorname{low}[v]\ge \operatorname{dfn}[u]\)，那么删除 \(u\) 后，\(v\) 的整棵 DFS 子树无法绕过 \(u\) 到达其祖先，因此会成为一个独立连通块。

设除 \(u\) 外共有 \(N=n-1\) 个节点，若该连通块大小为 \(s=\operatorname{siz}[v]\)，那么从该块中的节点出发，到其他非 \(u\) 节点中的不连通有序点对数量为 \(s(N-s)\)。

由于统计的是有序点对，每个连通块都作为起点统计一次。若两个不同连通块分别为 \(A,B\)，那么 \(A\) 的贡献会统计所有 \(A\to B\)，而 \(B\) 的贡献会统计所有 \(B\to A\)，因此直接累加每个连通块的 \(s(N-s)\) 即可。

除了满足分割条件的儿子子树，其余节点在删除 \(u\) 后仍属于同一个连通块。设所有已经独立分割出去的子树大小之和为 \(\mathrm{sum}\)，那么剩余连通块大小为 \(\mathrm{rem}=N-\mathrm{sum}\)，还需要补上 \(\mathrm{rem}(N-\mathrm{rem})\) 的贡献。

节点 \(u\) 自己因为所有关联边都被删除而成为孤立点，因此涉及 \(u\) 的两个方向共有 \(2N\) 个有序点对，即 \((u,x)\) 与 \((x,u)\)。这个公式对非割点同样成立。此时除 \(u\) 外只有一个大小为 \(N\) 的连通块，其块间贡献为 \(0\)，最终只剩涉及 \(u\) 的 \(2N\)，因此不需要单独判断非割点。

每条边只在 Tarjan 中处理常数次，因此时间复杂度为 \(O(n+m)\)，空间复杂度为 \(O(n+m)\)。答案规模可以达到平方级，所以乘法和答案均使用 `long long`。

```cpp title:"P3469 BLO-Blockade-DFS" fold
struct Edge { int id, v; ll w; };
vector<Edge> adj[maxn];

int dfn[maxn], low[maxn], timer;

int siz[maxn];
ll ans[maxn];
int n;

void add_edge( int u, int v, ll w, int id ) {
    adj[u].push_back({ id, v, w });
    adj[v].push_back({ id, u, w });
}

void tarjan( int u, int in_edge ) {
    dfn[u] = low[u] = ++ timer;
    siz[u] = 1;
    ll sum = 0;
    ll N = n - 1;
    for( auto [id, v, w] : adj[u] ) {
        if( !dfn[v] ) {
            tarjan( v, id );
            siz[u] += siz[v];
            low[u] = min( low[u], low[v] );
            if( low[v] >= dfn[u] ) {
                ans[u] += siz[v] * ( N - siz[v] );
                sum += siz[v];
            }
        } else if( id != in_edge ) {
            low[u] = min( low[u], dfn[v] );
        }    
    }
    ll rem = N - sum;
    ans[u] += rem * ( N - rem );
    ans[u] += 2 * N;
}

void solve( ) {
    n = read( );
    int m = read( );
    for( int i = 1; i <= m; ++ i ) {
        int u = read( ), v = read( );
        add_edge( u, v, 0, i );
    }
    for( int i = 1; i <= n; ++ i ) {
        if( !dfn[i] ) tarjan( i, 0 );
    }
    for( int i = 1; i <= n; ++ i ) {
        printf( "%lld\n", ans[i] );
    }
}
```

### Method 2 点双连通分量 + 圆方树

另一种做法是先求出所有点双连通分量，再建立圆方树。原图节点作为圆点，每个点双连通分量作为方点；若原图节点属于某个点双，就连接对应圆点与方点。

删除原图中的圆点 \(u\) 后，圆方树中与 \(u\) 相连的每个方向都对应原图删除 \(u\) 后的一个连通块。因此问题转化为：统计圆方树中删除圆点 \(u\) 后，每个方向包含多少个原图节点。

需要注意，不能只根据单个 VBCC 的大小统计贡献。一个与割点 \(u\) 相邻的点双后面还可能通过其他割点连接更多点双，而这些部分在删除 \(u\) 后仍属于同一个连通块，因此只有圆方树某个方向中所有圆点的数量才是真正需要的。

在圆方树上做树形 DP 时，将圆点权值设为 \(1\)，方点权值设为 \(0\)。这样 `siz[u]` 表示对应子树中包含多少个原图节点，而不是圆方树节点总数。

若圆方树邻居 \(v\) 是 \(u\) 的儿子，那么该方向对应的连通块大小就是 `siz[v]`；若 \(v\) 是 \(u\) 的父亲，那么该方向大小就是 `n - siz[u]`。得到某个方向的原图节点数 \(s\) 后，其贡献仍然是 \(s(n-1-s)\)，最后统一加上涉及孤立节点 \(u\) 的 \(2(n-1)\)。

```cpp title:"P3469 BLO-Blockade-圆方树" fold
struct Edge { int id, v; ll w; };
vector<Edge> adj[maxn];
vector<int> comp[maxn];

int dfn[maxn], low[maxn], timer;
int stk[maxn], top;

bool cut[maxn];
int vcnt;

int n;
vector<int> tree[maxn << 1];
int fa[maxn << 1];
int siz[maxn << 1];
ll ans[maxn << 1];

void add_edge( int u, int v, ll w, int id ) {
    adj[u].push_back({ id, v, w });
    adj[v].push_back({ id, u, w });
}

void tarjan( int u, int in_edge ) {
    dfn[u] = low[u] = ++ timer;
    stk[++ top] = u;
    int child = 0;
    for( auto [id, v, w] : adj[u] ) {
        if( !dfn[v] ) {
            ++ child;
            tarjan( v, id );
            low[u] = min( low[u], low[v] );
            if( low[v] >= dfn[u] ) {
                if( in_edge || child >= 2 ) {
                    cut[u] = true;
                }
                ++ vcnt;
                comp[vcnt].push_back( u );
                int x;
                do {
                    x = stk[top --];
                    comp[vcnt].push_back( x );
                } while( x != v );
            }
        } else if( id != in_edge ) {
            low[u] = min( low[u], dfn[v] );
        }
    }

    if( !in_edge && child == 0 ) {
        comp[++ vcnt].push_back( u );
        -- top;
    }
}

void dfs_tree( int u, int p ) {
    fa[u] = p, siz[u] = ( u <= n );
    // 圆点 1 | 方点 0
    for( int v : tree[u] ) {
        if( v == p ) continue;
        dfs_tree( v, u );
        siz[u] += siz[v];
    }
}

void calc( int u ) {
    ans[u] = 2ll * ( n - 1 );
    for( int v : tree[u] ) {
        ll s = 0;
        if( fa[v] == u ) s = siz[v];
        else s = n - siz[u];
        ans[u] += s * ( n - 1 - s );
    }
}

void solve( ) {
    n = read( );
    int m = read( );
    for( int i = 1; i <= m; ++ i ) {
        int u = read( ), v = read( );
        add_edge( u, v, 0, i );
    }

    for( int i = 1; i <= n; ++ i ) {
        if( !dfn[i] ) top = 0, tarjan( i, 0 );
    }
    
    for( int id = 1; id <= vcnt; ++ id ) {
        int block = n + id;
        for( int u : comp[id] ) {
            tree[block].push_back( u );
            tree[u].push_back( block );
        }
    }

    dfs_tree( 1, 0 );
    for( int u = 1; u <= n; ++ u ) {
        calc( u );
        cout << ans[u] << '\n';
    }
}
```

### 两种做法的关系

两种做法本质上处理的是同一组“删除节点后产生的连通块”。

Tarjan 直接统计的方法利用 \(\operatorname{low}[v]\ge\operatorname{dfn}[u]\)，在原图 DFS 树中直接识别删除 \(u\) 后独立出来的连通块，其大小就是 `siz[v]`。这种做法不显式保存点双结构，因此代码更短、常数也更小。

圆方树方法则先把点双与割点之间的连接关系显式转化为一棵树，再把删除节点后的连通块表示为圆点各个方向上的子树。它的结构更清晰，也更能体现圆方树保存的全局连通关系。

因此，第一种做法可以看作在 Tarjan DFS 树上直接完成贡献统计；第二种做法则先把这些结构显式建成圆方树，再进行普通的树上统计。

## 记录

- 归属：割点、Tarjan 应用、贡献统计；
    
- 核心：利用 \(\operatorname{low}[v]\ge\operatorname{dfn}[u]\) 得到删点后的独立连通块大小，再统计不同连通块之间的有序点对；
    
- 延伸：可建立圆方树，将“删点后的连通块”转化为删除圆点后的各个树上方向；
    
- 新增：单个 VBCC 的大小不足以表示割点某一侧的完整连通块，圆方树中需要统计整个方向上的圆点总权值。

- 分类：待定。
