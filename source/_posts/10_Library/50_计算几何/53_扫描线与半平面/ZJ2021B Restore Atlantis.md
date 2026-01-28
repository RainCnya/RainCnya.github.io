---
title: '[Leaf] [ZJ2021B] Restore Atlantis'
tags:
  - 计算几何/扫描线
  - 数据结构/线段树
  - 数据结构/树状数组
  - 策略/离线查询
  - 难度/P3/省选
categories:
  - 10_Library
  - 50_计算几何
  - 53_扫描线与半平面
abbrlink: 402e289a
date: 2026-01-22 00:00:00
---
# [ZJ2021B - Restore Atlantis](https://codeforces.com/gym/103055/problem/B)

## 1. 题面梗概

**中译中**: 有 $n$ 个矩形，编号为 $1, 2,\cdots, n$。有 $q$ 次查询，每次删除编号在 $[s_i,t_i]$ 范围内的矩形。求剩下的矩形总面积。

**约束条件**：$n,q \leq 10^5$， $x,y \leq 2 000$

## 2. 逻辑推导

### 2.1 第一步推理

这题从各种意义上都不好切入啊。

我们尝试从 $x,y$ 的范围切入，因为最大只有 $2000$，所以不用考虑复杂的矩形切割，我们只需要从 $1*1$ 的格子出发即可。

那么对于一次询问，这个格子满足什么条件才计入统计呢？

对于一个格子 $S_{x,y}$，设覆盖它的矩形集合为 $R_{x,y}$。

在去除 $[s_i,t_i]$ 区间的矩形后，若 $s \leq min(R_{x,y})$ 且 $max(R_{x,y}) \leq t$，这个格子就是我们要从总面积中删除的部分。

### 2.2 第二步推理

由上述推导得知：我们只需要算出每个格子的 `minid` 和 `maxid`。

**处理阶段**：

- 采用扫描线思维，按 $x$ 轴扫描，线段树维护 $y$ 轴这一列的 `min/max`。
- **线段树节点**：这里挂两个优先队列，大根堆和小根堆，分别处理 `min/max`。
- 每一列处理完后，DFS 跑一遍线段树，把这一列的 `min/max` 记录下来。

**统计阶段**：

- 现在我们有 $2000 \times 2000$ 个点，每个点有两个属性 $(minid, maxid)$。 
- 接着查询 $[s,t]$ 就转化为：有多少点满足 $s \leq minid \leq n$ 且 $1 \leq maxid \leq t$。
- 这就是一个典型的“二维偏序”问题。

### 2.3 第三步推理

**计算阶段**：

- 如果我们要在线查询，那么复杂度 $O( Q \times G^2)$，这个复杂度是我们不能接受的。
- 所以我们考虑借助**树状数组离线**处理。

**离线处理**：

- 既然 $maxid \leq t$，那么我们就按 $t$ 升序排序所有询问。
- 凡是 $maxid \leq t$ 的那些格子，都已经被删掉了，我们把这些格子的 $minid$ 投入树状数组。
- 那么树状数组里的，就都是那些“上限已经被 $t$ 封死了的格子”。
- 我们只需要查询，还有多少格子 $minid \geq s$？
- 这就是个简单的后缀和查询：`cnt = query(n) - query(s - 1);`。

最后，通过总面积减去每次查询完的删除面积，统计答案，按顺序输出。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair<int, int>;

const int maxm = 2e3 + 5;
const int maxn = 1e5 + 5;
const int inf = 1e9;


struct Line {
    int x, y1, y2, id ,type;
    bool operator < ( const Line &oth ) const {
        return x < oth.x;
    }
} lines[maxn << 1];

struct Node {
    int l, r;
    priority_queue< int > maxq;
    priority_queue< int, vector< int >, greater< int > > minq;
} tr[maxn << 2];

struct Query {
    int s, t, id;
    bool operator < ( const Query &oth ) const {
        return t < oth.t;
    }
} qs[maxn];
ll ans[maxn];

vector< PII > points[maxn];
bool vis[maxn];
ll Bit[maxn];
int n, q;
ll sum;

void update( int idx, int val )
{
    for( int i = idx; i <= n; i += i & -i )
        Bit[i] += val;
}

ll query( int idx )
{
    ll res = 0;
    for( int i = idx; i > 0; i -= i & -i )
        res += Bit[i];
    return res;
}

#define ls ( u << 1 )
#define rs ( u << 1 | 1 )

void build( int u, int l, int r )
{
    tr[u] = { l, r };
    while( !tr[u].maxq.empty( ) ) tr[u].maxq.pop( );
    while( !tr[u].minq.empty( ) ) tr[u].minq.pop( );

    if( l == r ) return;
    int mid = ( l + r ) >> 1;
    build( ls, l, mid );
    build( rs, mid + 1, r );
}

void modify( int u, int l, int r, int id )
{
    if( l <= tr[u].l && tr[u].r <= r )
    {
        tr[u].maxq.push( id );
        tr[u].minq.push( id );
        return ;
    }
    int mid = ( tr[u].l + tr[u].r ) >> 1;
    if( l <= mid ) modify( ls, l, r, id );
    if( mid < r ) modify( rs, l, r, id );
}

void dfs( int u, int minid, int maxid, int &cnt ) 
{
    while( !tr[u].maxq.empty( ) && vis[tr[u].maxq.top( )] ) tr[u].maxq.pop( );
    while( !tr[u].minq.empty( ) && vis[tr[u].minq.top( )] ) tr[u].minq.pop( );
    
    if( !tr[u].maxq.empty( ) )
    {
        minid = min( minid, tr[u].minq.top( ) );
        maxid = max( maxid, tr[u].maxq.top( ) );
    }

    if( tr[u].l == tr[u].r )
    {
        if( minid <= n )
        {
            cnt ++;
            points[maxid].push_back({ minid, 1 });
        }
        return;
    }

    dfs( ls, minid, maxid, cnt );
    dfs( rs, minid, maxid, cnt );
}

void solve( )
{
    cin >> n >> q;

    int len = 0;
    for( int i = 1; i <= n; ++ i )
    {
        int x1, y1, x2, y2;
        cin >> x1 >> y1 >> x2 >> y2;
        lines[++ len] = { x1, y1, y2, i, 1 };
        lines[++ len] = { x2, y1, y2, i, -1 };
    }
    sort( lines + 1, lines + 1 + len );

    build( 1, 0, 2000 );

    int cur = 1;
    for( int x = 0; x <= 2000; ++ x )
    {
        while( cur <= len && lines[cur].x == x )
        {
            if( lines[cur].type == 1 ) 
                modify( 1, lines[cur].y1, lines[cur].y2 - 1, lines[cur].id );
            else 
                vis[lines[cur].id] = 1;
            cur ++;
        }
        int xcnt = 0;
        dfs( 1, inf, -inf, xcnt );
        sum += xcnt;
    }

    for( int i = 1; i <= q; ++ i )
    {
        cin >> qs[i].s >> qs[i].t;
        qs[i].id = i;
    }

    sort( qs + 1, qs + 1 + q );

    int r = 1;
    for( int i = 1; i <= q; ++ i )
    {
        while( r <= qs[i].t ) 
        {
            for( auto [l, cnt] : points[r] )
            {
                update( l, cnt );
            }
            r ++;
        }
        ll res = query( n ) - query( qs[i].s - 1 );
        ans[qs[i].id] = sum - res;
    }

    for( int i = 1; i <= q; ++ i )
    {
        cout << ans[i] << '\n';
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

- **复杂度**:
    
    - 预处理网格：$O(G^2 + N \log N)$。
    - 离线查询：$O(G^2 + Q \log N)$。
        
- **碎碎念**:
		
	- 由于直接统计面积太复杂了，所以我们采用**补集法**，删去不满足条件的格子。
	    
    - 离线查询的**精髓**在于：通过排序把一个限制维度变成**时间线**，然后再处理另一个维度，这里我们借助树状数组维护。

- **关联笔记**: [[扫描线与面积并]] | [[线段树]] | [[离线查询]]