---
title: '[Solution] 2025_CCPC_Chongqing'
tags:
  - 2025
  - CCPC/Chongqing
  - 难度/P5
categories:
  - 270_Solutions
abbrlink: e02d7750
date: 2026-04-20 00:00:00
---

## A. New Gomoku

### 1. 题意
A 和 B 轮流下五子棋，问双方连成五子的数量。

### 2. 思路
观察到棋盘不大，所以直接对每个新落下的棋子暴力扩展就行，然后累加贡献值，注意多组数据的清空。

### 3. 代码部分
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair<int,int>;

const int maxn = 1000 + 5;
int a[maxn][maxn], b[maxn][maxn], n;

int check1( int x, int y, int c[][maxn] ) {
    int cnt = 0, res = 0;
    for( int i = x-1; i >= max( x-4, 1 ); -- i ) {
        if( c[i][y] == 1 ) cnt ++;
        else break;
    }
    for( int i = x+1; i <= min( x+4, 1000 ); ++ i ) {
        if( c[i][y] == 1 ) cnt ++;
        else break;
    }
    if( cnt >= 4 ) res += cnt - 3;
    cnt = 0;
    for( int i = y-1; i >= max( y-4, 1 ); -- i ) {
        if( c[x][i] == 1 ) cnt ++;
        else break;
    }
    for( int i = y+1; i <= min( y+4, 1000 ); ++ i ) {
        if( c[x][i] == 1 ) cnt ++;
        else break;
    }
    if( cnt >= 4 ) res += cnt - 3;
    return res;
}

int check2( int x, int y, int c[][maxn] ) {
    int cnt = 0, res = 0;
    for( int i = 1; i <= 4; ++ i ) {
        if( x+i > 1000 || y+i > 1000 ) break;
        if( c[x+i][y+i] == 1 ) cnt ++;
        else break;
    }
    for( int i = 1; i <= 4; ++ i ) {
        if( x-i < 1 || y-i < 1 ) break;
        if( c[x-i][y-i] == 1 ) cnt ++;
        else break;
    }
    if( cnt >= 4 ) res += cnt - 3;
    cnt = 0;
    for( int i = 1; i <= 4; ++ i ) {
        if( x-i < 1 || y+i > 1000 ) break;
        if( c[x-i][y+i] == 1 ) cnt ++;
        else break;
    }
    for( int i = 1; i <= 4; ++ i ) {
        if( x+i > 1000 || y-i < 1 ) break;
        if( c[x+i][y-i] == 1 ) cnt ++;
        else break;
    }
    if( cnt >= 4 ) res += cnt - 3;
    return res;
}

void solve( ) {
    cin >> n;
    int cnt1 = 0, cnt2 = 0;
    vector< PII > p1, p2;

    for( int i = 1; i <= n; ++ i ) {
        int x, y; cin >> x >> y;
        if( i & 1 ) {
            p1.push_back({ x, y });
            a[x][y] = 1;
            cnt1 += check1( x, y, a );
            cnt1 += check2( x, y, a );
            cout << cnt1 << ' ';
        } else {
            p2.push_back({ x, y });
            b[x][y] = 1;
            cnt2 += check1( x, y, b );
            cnt2 += check2( x, y, b );
            cout << cnt2 << ' ';
        }
    }
    for ( auto [x, y] : p1 ) a[x][y] = 0;
    for ( auto [x, y] : p2 ) b[x][y] = 0;
    cout << '\n';
}

int main( ) {
    cin.tie( 0 )->sync_with_stdio( 0 );
    int _t = 1; cin >> _t;
    while( _t -- ) solve( );
    return 0;
}
```

## E. Dinner Invitation

### 1. 题意
每个人有一个想吃的菜，价格为 $w$，预算为 $r$，问从 $n$ 个人中选出最多多少人，满足所有菜的平均值小于所有被选中的人的预算。

### 2. 思路
考虑贪心，优先按照价格升序排序，如果价格相同，按照预算升序排序。因为这样排序后，加入新的人只会导致菜品的平均值单调不减。所以同时维护被选中的人，如果新加入的菜品导致平均值增加，使得有一部分人的预算不够，那么就弹出他们。

这里可以用优先队列来动态维护，注意维护全局的人数最大值，不能只跑完后记录最大值，会漏掉一些最优解。

### 3. 代码

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 2e5 + 5;

struct Node {
    int w, r;
    bool operator < (const Node t) const {
        if( r != t.r ) return r > t.r;
        return w < t.w;
    }
} a[maxn];

int n;

bool cmp( Node A, Node B ) { return A.w < B.w; }

void solve( ) {
    cin >> n;
    for( int i = 1; i <= n; ++ i ) cin >> a[i].w;
    for( int i = 1; i <= n; ++ i ) cin >> a[i].r;
    sort( a + 1, a + n + 1, cmp );
    
    ll sum = 0, cnt = 0;
    ll res = 0;
    
    priority_queue<Node> pq;
    for( int i = 1; i <= n; ++ i ) {
        ll ts = sum + a[i].w;
        double avg = 1.0 * ts / (cnt + 1);
        if( a[i].r * 1.0 >= avg ) {
            pq.push( a[i] );
            cnt ++, sum = ts;
            while( 1 ) {
                auto t = pq.top( );
                if( t.r * 1.0 < avg ){
                    pq.pop( );
                    sum -= t.w;
                    cnt--;
                    avg = 1.0 * sum / cnt;
                } else break;
            }
            res = max(res, cnt);
        }
    }
    cout << res << '\n';
}

int main( ) {
    cin.tie( 0 )->sync_with_stdio( 0 );
    int _t = 1; cin >> _t;
    while( _t -- ) solve( );
    return 0;
}
```
{% endfold %}

## H. Hot Pot

### 1. 题意
有 吃辣的 x，不吃辣的 y 和 都能吃的 z，然后 辣锅 a 元，鸳鸯锅 b 元，清汤锅 c 元，每个锅可以吃两个人， 问最少需要多少钱。

> $T \leq 2025, x,y,z,a,b,c \leq 2025$。

### 2. 思路
注意到数据规模不大，一时间推不出数学公式，考虑暴力枚举。因为有三个锅，所以我第一次想法是枚举辣锅和清汤锅的数量，然后判断鸳鸯锅，配合剪枝。

但是发现实际代码实现起来很麻烦，所以第二版的写法直接考虑枚举鸳鸯锅的数量，然后优先考虑 x 和 y 的搭配，再通过 z 来补上缺口。最后如果锅的位置不够，再用最便宜的锅补上就行，因为此时的 z 等于一个万能“人”，可以随时补位。

#### 2.1 证明

这里用 Hall 定理证明：通俗来说，*如果你想让一组人都有座位，那么这组人中任何一个子集，他们能坐的所有座位总数，必须大于等于这个子集的人数*。在本题中，就是如下几种情况，记辣锅 $i$ 个，鸳鸯锅 $j$ 个，清汤锅 $k$ 个。

1. 只能吃辣的学生，他们能坐的位置只有辣锅，即：$2i + j \geq x$。
2. 不能吃辣的学生，他们能坐的位置只有清汤锅，即：$2k + j \geq y$。
3. 所有人，他们能坐所有的位置，即：$2i +2j +2k \geq x + y + z$。
4. 辣 + 杂食，他们能坐的位置总数为 $2i + 2j + 2z$，（因为 z 能坐清汤位），这里就被 子集3 的条件所包含了。
5. 略

接着枚举所有可能的子集，发现最关键的三个限制条件就是 1 2 3。那么维护 $j$ 的数量就可以算出来了，因为每一个 $j$ 都有与之对应的 “最优解” $i, k$。

### 3. 代码

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 2e5 + 5;
const ll inf = 1e18;

void solve( ){
    ll x, y, z, a, b, c;
    cin >> x >> y >> z >> a >> b >> c;
    ll sum = x + y + z;
    ll res = inf;

    for( int cntb = 0; cntb <= sum + 1; ++ cntb ) {
        ll rx = max( 0ll, x - cntb ), ry = max( 0ll, y - cntb );
        ll cnta = (rx + 1) / 2, cntc = (ry + 1) / 2;

        ll curr = cnta * a + cntc * c + cntb * b;
        ll total = 2 * (cnta + cntc + cntb);

        // 坐不下，补充最便宜的锅
        if( total < sum ) {
            curr += (sum - total + 1) / 2 * min({ a, b, c });
        }
        res = min( res, curr );
    }
    cout << res << '\n';
}

int main( ) {
    cin.tie( 0 )->sync_with_stdio( 0 );
    int _t = 1; cin >> _t;
    while( _t -- ) solve( );
    return 0;
}


```
{% endfold %}

## M. Tree Path Reduction

### 1. 题意

给定一个初始只有节点 $1$（权值为 $c_1$）的树。进行 $n-1$ 次增长操作：
1. 给出 $a_i, u_i, v_i$。
2. 对变量 $a_i$ 沿着路径 $(u_i, v_i)$ 依次执行约减操作 $D(a, b) = a / \gcd(a, b)$。
3. 将 $a_i$ 最终的值作为新节点 $i+1$ 的权值 $c_{i+1}$，并连接到 $v_i$。
最后输出所有节点的权值 $c_1, c_2, \dots, c_n$。  

### 2. 思路

这题的难点在于 $a$ 的值会非常大，我的第一种思路是维护树上前缀积，然后用 LCA 差分得出答案，但是问题是这样的值会非常大，`__int128` 也存不下，这就很麻烦。

第二种思路是我把这个极大的数分解质因数，在每个点上只记录分解质因数后的底数和指数，However 这样的空间复杂度是假的，再考虑优化。

发现题目给定的算子其实本质上是在质因子 $p$ 的指数上进行相减，所以对于整条路径来说，最终 $a$ 中 $p$ 的幂次等于 $a$ 原有的幂次减去路径上所有节点权值中 $p$ 的**幂次总和**。

然后问题就转化到了树上路径和的维护，这里可以采用 $DFS$ 序的性质，来简单的维护区间性质，更复杂的情况就要考虑用树链剖分了。

简单来说，就是记录每个节点 $u$ 在 DFS 过程中进入的时间戳 $tin$，以及搜索完子树后返回的时间戳 $tout$。那么对于根节点为 $u$ 的子树来说，它在序列上的区间就是 $[tin[u], tout[u]]$。

然后路径 $(u, v)$ 的查询就可以快速利用公式得出：$Sum(u, v) = S(u) + S(v) - 2S(Lca) + val(Lca)$ 得到。 最后注意动态区间和的维护 + 动态单点修改，可以采用简单的树状数组来维护，那么现在的问题就是如何维护不同的质数。

这里我采用离线的处理方式，因为树的整体结构是固定的，所以可以离线建树，然后预处理 LCA，接着对每个出现的质数都跑一遍树状数组，按照建树顺序处理，由于不同质因子之间是相互独立的，所以理论上是没有问题的，接下来就是代码实现了。

当然如果要采用强制在线的写法可能需要用到动态开点的线段树，那就很麻烦了，理论可行，我就不展开了。

### 3. 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 2e5 + 5;
const int maxv = 1e6 + 5;
const int maxlg = 20;

struct Bit {
    int tr[maxn];
    int sz;
    void init( int _sz ) { sz = _sz; fill(tr, tr + sz + 1, 0); }
    void add(int idx, int val) {
        for( int i = idx; i <= sz; i += i & -i ) tr[i] += val;
    }
    void add_range( int l, int r, int v ) {
        add( l, v ); add( r + 1, -v );
    }
    int ask(int idx) {
        int res = 0;
        for( int i = idx; i; i -= i & -i ) res += tr[i];
        return res;
    }
} bit;

vector< int > adj[maxn], nodes[maxv];
int tin[maxn], tout[maxn], timer;
int up[maxn][maxlg];

void dfs_lca( int u, int p ) {
    tin[u] = ++ timer;
    up[u][0] = p;
    for( int i = 1; i < maxlg; ++ i ) up[u][i] = up[up[u][i - 1]][i - 1];
    for( int v : adj[u] ) if( v != p ) dfs_lca( v, u );
    tout[u] = timer;
}

// 判断 u 是否是 v 的祖先
bool is_anc( int u, int v ) { 
    if( u == 0 ) return 1;
    return tin[u] <= tin[v] && tout[v] <= tout[u];
}

int get_lca( int u, int v ) {
    if( is_anc( u, v ) ) return u;
    if( is_anc( v, u ) ) return v;
    for( int i = maxlg - 1; i >= 0; -- i )
        if( !is_anc( up[u][i], v ) ) u = up[u][i];
    return up[u][0];
}

int minp[maxv];
void sieve( ) {
    for( int i = 2; i < maxv; ++ i ) {
        if( minp[i] ) continue;
        for( int j = i; j < maxv; j += i ) if( !minp[j] ) minp[j] = i;
    }
}

int a[maxn], u[maxn], v[maxn], c[maxn];
int vcnt[maxn], n, c1;

void solve( ) {
    cin >> n >> c1;

    for( int x = c1; x > 1; ) {
        int p = minp[x]; 
        nodes[p].push_back( 1 );
        while( x % p == 0 ) x /= p;
    }

    for( int i = 1; i < n; ++ i ) {
        cin >> a[i] >> u[i] >> v[i];
        adj[v[i]].push_back( i + 1 );
        for( int x = a[i]; x > 1; ) {
            int p = minp[x]; 
            nodes[p].push_back( i + 1 );
            while( x % p == 0 ) x /= p;
        }
    }

    dfs_lca( 1, 0 );
    for( int i = 1; i <= n; ++ i ) c[i] = 1;

    bit.init( n );
    
    for( int p = 2; p < maxv; ++ p ) {
        if( nodes[p].empty( ) ) continue;

        for( int cur : nodes[p] ) {
            int cnt = 0; // p 的指数
            if( cur == 1 ) {
                int x = c1;
                while( x % p == 0 ) x /= p, cnt ++;
            } else {
                int id = cur - 1; 
                int lca = get_lca( u[id], v[id] );
                int su = bit.ask( tin[u[id]] );
                int sv = bit.ask( tin[v[id]] );
                int slca = bit.ask( tin[lca] );
                
                int path = su + sv - 2 * slca + vcnt[lca];
                
                int x = a[id];
                while( x % p == 0 ) x /= p, cnt ++;
                cnt = max( 0, cnt - path );
            }
            vcnt[cur] = cnt;
            if( cnt ) bit.add_range( tin[cur], tout[cur], cnt );
        }
        for( int cur : nodes[p] ) {
            for( int k = 0; k < vcnt[cur]; ++ k ) c[cur] *= p;
            if( vcnt[cur] ) bit.add_range( tin[cur], tout[cur], -vcnt[cur] );
            vcnt[cur] = 0;
        }
    }
    
    for( int i = 1; i <= n; ++ i ) cout << c[i] << ' ';
}

int main( ) {
    cin.tie( 0 )->sync_with_stdio( 0 );
    sieve( ); solve( );
    return 0;
}
```

---

## B. Abstract Portal

### 1. 题意
有 $0$ 到 $n$ 共 $n+1$ 个节点，问玩家从 $0$ 到 $n$ 点需要多少次传送，传送的机制如下：
1. 每个点都有一个计数器 $cnt[p]$，如果 $cnt[p] = k$，则传送到 $p+1$。
2. 否则，如果 $p - t_{cnt[p]} \geq 0$，传送到 $p - t_{cnt[p]}$。 
3. 否则，无事发生，回到步骤一再次计数。

### 2. 思路
首先分析移动的逻辑，发现每次最多往后走一个格子，也就是先到 $1$，再到 $2$，再到 ……，最后到 $n$ 这个点，不可能出现跨越式的前进( 比如直接从 $1$ 到 $3$ )。

基于这种线性的递进关系，我们定义 $dp[i]$ 为从节点 $i$ 第一次成功抵达 节点 $i + 1$ 所需要的总传送次数。

也就是说，如果我被向前传送到了 $i - t_{j}$ 这一点，我需要从 $i - t_{j}$，走回来到节点 $i$ 所需要的传送次数，刚好就是这一段区间和，即：

$$
Cost = \sum_{m = i - t_{j}}^{i-1}dp[m]
$$

考虑到这是一个区间求和问题，我们可以采用前缀和来进行维护，记 $S[i]$ 为从起点 $0$ 第一次成功抵达节点 $i$ 的总传送次数，即：

$$
S[i] = \sum_{m=0}^{i-1}dp[m] \quad Cost = S[i] - S[i-t_{j}]
$$
然后下面我们推导 $dp[i] =$ 什么，也就是状态的转移，为了走到 $i+1$，我们需要按 $k$ 次按钮，接下来拆解这 $k$ 次按键产生的传送代价：

1. 前 $k-1$ 次按钮，设当前按键后 $c_{i} = j \in [1, k-1]$。第一种情况：如果 $i - t_{j} \geq 0$，按照规则，先被传送一次，然后再从 $i - t_{j}$ 这一点走回来，总代价就是 $1 + S[i] - S[i-t_{j}]$。第二种情况：如果 $i - t_{j} < 0$，那就是原地不动，代价为 $0$。
2. 第 $k$ 次按钮，按照规则传送到 $i + 1$ 这一点，此时代价为 $1$。

$$
dp[i] = 1 + \sum_{j=1}^{k-1} \begin{cases}
1 + S[i] - S[i-t_j] & \text{if } i \ge t_j \\
0 & \text{if } i < t_j \end{cases}
$$

这样就得到了节点 $i$ 与节点 $i+1$ 之间的转移，但是我们需要求的是 $S[n]$ 而不是 $dp[n]$，接着把 $S[i+1] = S[i] + dp[i]$ 代入上式可以得到：

$$
S[i+1] = S[i] + 1 + \sum_{j=1}^{k-1} \begin{cases}
1 + S[i] - S[i-t_j] & \text{if } i \ge t_j \\
0 & \text{if } i < t_j
\end{cases}
$$

由于 $t_{j} \leq 100$，这就意味着，只要当前的节点位置 $i \geq 100$，那么对于所有的 $j$，条件 $i \geq t_{j}$ 都绝对成立，那么我们就可以按照上式进行代数展开：

$$
\begin{cases} 
S[i+1] = S[i] + 1 + \sum_{j=1}^{k-1} (1 + S[i] - S[i-t_j]) \\
S[i+1] = S[i] + 1 + (k - 1) + (k - 1)S[i] - \sum_{j=1}^{k-1} S[i-t_j] \\
S[i+1] = k \cdot S[i] - \sum_{j=1}^{k-1} S[i-t_j] + k \\
\end{cases}
$$

最后得到 $S[i+1]$ 严格是一个关于过去 100 个状态的常系数线性递推方程，然后朴素递推的复杂度是 $O(n)$，在本题 $n \leq 10^9$ 的这个数据规模下，配上 $t \leq 100$，就在暗示采用 矩阵快速幂 的技巧进行优化。 

接下来就是构造矩阵和列向量来推导了，这里是列向量：

$$V_i = \begin{bmatrix} S[i] \\ S[i-1] \\ \vdots \\ S[i-100] \\ 1 \end{bmatrix}$$

然后是转移矩阵 $M$ 的构造：我们需要构造一个 $102 \times 102$ 的矩阵 $M$，使得 $V_{i+1} = M \times V_i$。

- 第 1 行（计算 $S[i+1]$）：
    我们要映射公式 $S[i+1] = k \cdot S[i] - \sum S[i-t_j] + k \cdot 1$。
    - 第 $1$ 列的系数填 $k$ （对应 $S[i]$）。
    - 对于每个给定的 $t_j$，第 $t_j + 1$ 列的系数减 $1$ （对应 $S[i-t_j]$）。
    - 第 $102$ 列（常数项位置）填 $k$ （对应常数 $k$）。
        
- 第 2 到 101 行（实现滑动窗口）：
    向量中的 $S[i]$ 要在下一步变成 $S[i-1]$ 的位置，只需将主对角线下方的元素设为 $1$。即 $M_{r, r-1} = 1$。
    
- 第 102 行（常数守恒）：
    为了让最后的常数 $1$ 永远保持为 $1$，$M_{102, 102} = 1$。

最后就是如果 $n$ 比较小，就采用简单的模拟递推解决，如果 $n$ 大的情况下，就先算出前 100 项，然后凑成转移矩阵，接着用快速幂计算：

$$V_n = M^{n-100} \times V_{100}$$

最终 $V_{n}$​ 的第一个元素，就是我们要找的答案 $S[n]$。

### 3. 代码

{% fold info @暴力版 %}
```cpp
void solve( ) {
    cin >> n >> k;
    for( int i = 1; i <= k; ++ i ) cin >> t[i];

    for( int i = 0; i < n; ++ i ) {
        ll cur = 1;
        for( int j = 1; j < k; ++ j ) {
            if( i - t[j] >= 0 ) {
                ll back = ( 1 + sum[i] - sum[i - t[j]] + mod ) % mod;
                cur = ( cur + back ) % mod;
            }
        }
        dp[i] = cur;
        sum[i + 1] = ( sum[i] + dp[i] ) % mod;
    }
    cout << sum[n] << '\n';
}
```
{% endfold %}

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxsz = 100 + 5;
const int mod = 1e9 + 7;

struct Matrix {
    ll m[maxsz][maxsz];
    int sz;
    Matrix( int _sz = 0 ) : sz( _sz) { memset( m, 0, sizeof( m ) ); }
    void init( ) { for( int i = 1; i <= sz; ++ i ) m[i][i] = 1; }

    friend Matrix operator * ( const Matrix &a, const Matrix &b ) {
        Matrix res( a.sz );
        for( int k = 1; k <= res.sz; ++ k ) {
            for( int i = 1; i <= res.sz; ++ i ) {
                if( a.m[i][k] == 0 ) continue;
                for( int j = 1; j <= res.sz; ++ j ) {
                    res.m[i][j] = ( res.m[i][j] + a.m[i][k] * b.m[k][j] ) % mod;
                }
            }
        }
        return res;
    }
};

Matrix mqpow( Matrix a, ll k ) {
    Matrix res( a.sz ); res.init( );
    for( ; k; k >>= 1, a = a * a )
        if( k & 1 ) res = res * a;
    return res;
}

ll n, k, t[1005], sum[110];

void solve( ) {
    cin >> n >> k;
    for( int i = 1; i < k; ++ i ) cin >> t[i];

    sum[0] = 0;
    for( int i = 0; i < 100 && i < n; ++ i ) {
        ll dpi = 1;
        for( int j = 1; j < k; ++ j ) {
            if( i - t[j] >= 0 ) {
                dpi = ( dpi + 1 + sum[i] - sum[i - t[j]] + mod ) % mod;
            }
        }
        sum[i + 1] = ( sum[i] + dpi ) % mod;
    }
    
    if( n <= 100 ) {
        cout << sum[n] << '\n';
        return;
    }

    int sz = 102;
    Matrix A( sz );

    A.m[1][1] = k;
    for( int j = 1; j < k; ++ j ) {
        int pos = t[j] + 1;
        A.m[1][pos] = ( A.m[1][pos] - 1 + mod ) % mod;
    }
    A.m[1][sz] = k;

    for( int i = 2; i <= 101; ++ i ) {
        A.m[i][i - 1] = 1;
    }
    A.m[sz][sz] = 1;

    Matrix res = mqpow( A, n - 100 );

    ll ans = 0;
    for( int j = 1; j <= 101; ++ j ) {
        ans = ( ans + res.m[1][j] * sum[101 - j] ) % mod;
    }
    ans = ( ans + res.m[1][sz] * 1 ) % mod;

    cout << ans << '\n';
}

int main( ) {
    cin.tie( 0 )->sync_with_stdio( 0 );
    int _t = 1; 
    // cin >> _t;
    while( _t -- ) solve( );
    return 0;
}
```
{% endfold %}

## K. Reverse KMP

### 1. 题意

给定一个长度为 $n$ 的数组 $A[1 \dots n]$，其中 $A[i]$ 表示某未知字符串 $S$ 的 KMP `next` 数组，已知字符集大小为 $m$。要求计算：能产生与数组 $A$ 完全一致的 `next` 数组的不同字符串 $S$ 的数量。答案对 $998244353$ 取模。

> $\sum n \le 5 \times 10^5, m \le 10^6$。若无法构造出这样的字符串，输出 $0$。

### 2. 思路

我们需要从左到右依次确定字符串 $S[i]$ 可以填入的字符种类数，然后通过乘法原理把答案推出来就行。

在 KMP 数组中，如果 $A[i] > 0$，就说明子串 $S[1 \dots i]$ 存在长度为 $A[i]$ 的相等前后缀，既然前后缀相同，那么它们的最后一个字符必然相同，即：$S[i] = S[A[i]]$。

也就是说，当 $A[i] > 0$ 时，$S[i]$ 的字符选择被前面的字符强制唯一确定了，它就不能产生新的选择（方案数 $\times 1$）。所以这里可以采用并查集的思路来维护字符之间的等价关系。

如果 $A[i] > 0$，那么 `root[i] = root[ A[i] ]`，如果 $A[i] = 0$，则说明它可能产生一个新的字符，记作：`root[i] = i`。分析到这，已经可以开始做题了，但是观察到样例 3 的输入是假的，所以考虑不可能构造的情况。

不妨按着 KMP 倒着跳看看，KMP 算法求 $A[i]$ 的过程，本质上是在一个 “候选长度集合” 中从大到小寻找第一个匹配的字符。候选集合：$P = \{A[i-1]+1, A[A[i-1]]+1, \dots, 1\}$。

由于 $A[i]$ 代表 “最长” 的匹配长度，这意味着所有试图建立比 $A[i]$ 更长匹配的尝试，都会失配，而且对于任意 $p \in P$ 且 $p > A[i]$ 都必须满足 $S[i] \neq S[p]$。

由此，我们得到了第二个等价类，这些 $S[p]$ 相关的都是位置 $i$ 的不可行状态。由此我们就可以判断当前数组能否成为合法的 `next` 数组：如果在倒着跳转过程中，跳链最后没能正好落在 $A[i]$ 上，就说明 $A[i]$ 违反了 KMP 的跳转逻辑。同时，如果 $A[i] > 0$，但是 $S[A[i]]$ 处于位置 $i$ 的不可行状态中，同样也是矛盾的。

最后根据每个位置的可选字符数量，采用乘法原理计算即可。

> 注：由于多组测试数据 $\sum n \le 5 \times 10^5$，每次清空 `vis` 数组统计 `diff` 时间开销很大，可能会导致 TLE。可以采用使用全局单调递增的 `timer` 作为时间戳来实现 $O(1)$ 的状态重置。

### 3. 代码

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 5e5 + 5; 
const int mod = 998244353;

int nxt[maxn], root[maxn], vis[maxn];
int timer = 0; // 全局时间戳，避免多组数据带来的 memset 开销

void solve() {
    int n; ll m;
    cin >> n >> m;
    for (int i = 1; i <= n; ++i) cin >> nxt[i];

    ll ans = m % mod;
    root[1] = 1; // 1号位置是一个独立的自由字符
    
    for (int i = 2; i <= n; ++i) {
        timer++; // 推进时间戳，充当本轮的唯一标识
        
        int j = nxt[i - 1]; // 继承 KMP 的前置状态
        int diff = 0;       // 记录当前位置的“禁止字符”种类数
        
        // 1. 模拟 KMP 失配跳跃：提取“禁止名单”
        // 凡是比 nxt[i] 长的尝试，都是必定失败的
        while (j + 1 > nxt[i]) {
            int f = root[j + 1]; // 失配意味着 S[i] 绝对不能等于 S[j+1]
            if (vis[f] != timer) {
                vis[f] = timer;
                diff++;
            }
            if (j == 0) break;   // 退无可退，结束跳跃
            j = nxt[j];
        } 

        // 2. 跃升断层校验：跳跃结束后，理应正好停在 nxt[i] 的前置状态
        if (nxt[i] > 0 && j + 1 != nxt[i]) {
            cout << 0 << '\n'; return; 
        }

        // 3. 结算当前位置
        if (nxt[i] > 0) {
            // 约束冲突校验：被迫相等的字符是否恰好在禁止名单里？
            if (vis[root[nxt[i]]] == timer) {
                cout << 0 << '\n'; return; 
            }
            root[i] = root[nxt[i]]; // 继承字符等价类
        } else {
            // 自由位：总字符数 m 减去禁止字符种类数
            ll ways = m - diff;
            if (ways <= 0) {
                cout << 0 << '\n'; return;
            }
            ans = ans * ways % mod;
            root[i] = i; // 诞生一个新的字符等价类
        }
    }
    cout << ans << '\n';
}

int main() {
    cin.tie(0)->sync_with_stdio(0);
    int _t = 1; cin >> _t;
    while (_t--) solve();
    return 0;
}
```

{% endfold %}