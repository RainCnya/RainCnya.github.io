---
title: HDSpring7
tags: HDSpring
categories:
  - 270_Solutions
abbrlink: 22ff322e
date: 2026-05-11 00:00:00
---

## Very Easy
### 1002 Bingo

#### 题意
给定一个 $n \times n$ 的矩阵，问有哪些数同时出现在了矩阵的每一行和每一列。

#### 思路
简单模拟，分别统计它出现在了多少个 不同的行 和 不同的列，最后判断 行计数 和 列计数 是否都 $= n$ 即可。

#### 代码部分

{% fold info @AcCode %}
```cpp
void solve( ) {
    int n;
    cin >> n;

    vector< vector<bool> > row( n * n + 1, vector<bool>( n * n + 1, false ) );
    vector< vector<bool> > col( n * n + 1, vector<bool>( n * n + 1, false ) );

    vector< int > rcnt( n * n + 1, 0 );
    vector< int > ccnt( n * n + 1, 0 );
    
    for( int i = 1; i <= n; ++ i ) {
        for( int j = 1; j <= n; ++ j ) {
            int x;
            cin >> x;
            if( !row[x][i] ) row[x][i] = true, rcnt[x] ++;
            if( !col[x][j] ) col[x][j] = true, ccnt[x] ++;
        }
    }

    vector< int > res;
    for( int i = 1; i <= n * n; ++ i ) {
        if( rcnt[i] == n && ccnt[i] == n ) res.push_back( i );
    }

    cout << res.size( ) << '\n';
    for( int i = 0; i < res.size( ); ++ i ) {
        cout << res[i] << " ";
    }
}
```
{% endfold %}


---
## Easy
### 1007 Bridge

#### 题意
给定 $n$ 个点，每个点都有点权 $a_{i}$，任意两个点 $(i, j)$ 都可以连边，其代价是中间位置的权值，若中点是整数则 $a_{(i+j) / 2}$，否则取两点平均值 $(a_{(i+j) / 2} + a_{(i + j + 1) / 2}) / 2$，求所有点连通的最小总代价的 2 倍。

> $N \leq 3000$

#### 思路
求所有点连通的最小代价，好眼熟，这不是 MST 最小生成树吗？

考虑 Kruskal，复杂度为 $O(E \log E)$，$E$ 为边数，因为任意两点之间都可以连边，那这就是个稠密图了，$E = N^{2}$，也就是 $O(N^{2} \log N^{2})$，感觉有点极限了。

果断祭出法宝 Prim 算法，用朴素的 $O(N^{2})$ 水过去了。

> 从来没觉得 Prim 好用过，还好压箱底找到了模板，只能说平时被 Kruskal 养的太好了。

写到这我以为已经结束了，但是我打开 Std ( Standard 标准程序 一般指题解 )，怎么是 Kruskal ？回头看一眼时间限制，怎么是 $2s$，好吧 Kruskal 赢了，Prim 到底在干什么？

不会只有我一个笨蛋写了 Prim 吧，而且还是找了半天模板 ......

#### 代码部分
{% fold info @Prim - 赛时 %}
```cpp
ll a[maxn], n;
ll dist[maxn];
bool vis[maxn];

void solve( ) {
    cin >> n;
    for( int i = 1; i <= n; ++ i ) cin >> a[i];

    fill( dist + 1, dist + n + 1, inf );
    fill( vis + 1, vis + n + 1, 0 );

    dist[1] = 0;
    ll ans = 0;

    for( int i = 1; i <= n; ++ i ) {
        int u = -1;
        for( int j = 1; j <= n; ++ j ) {
            if( vis[j] ) continue;
            if( u == -1 || dist[j] < dist[u] ) u = j;
        }
        if( u == -1 || dist[u] == inf ) break;
        vis[u] = 1;
        ans += dist[u];
        for( int v = 1; v <= n; ++ v ) {
            if( vis[v] ) continue;
            ll cost = a[(u + v) / 2] + a[(u + v + 1) / 2];
            dist[v] = min( dist[v], cost );
        }
    }
    cout << ans << '\n';
}

int main( ) {
    cin.tie( 0 )->sync_with_stdio( 0 );
    int _t = 1; cin >> _t;
    while( _t -- ) solve( );
    return 0;
}
```
{% endfold %}

{% fold info @Kruskal - 赛后 %}
```cpp
#define ALL(x) (x).begin( ), (x).end( )
#define SZ(x) (int)(x).size( )
#define pb push_back

struct Edge {
    ll u, v, w;
    bool operator < ( const Edge& o ) const { return w < o.w; }
};

vector<Edge> edges;
ll a[maxn], n;
int fa[maxn];

int find( int x ) { 
    if( x == fa[x] ) return x;
    return fa[x] = find( fa[x] );
}

void merge( int x, int y ) {
    int rx = find( x ), ry = find( y );
    if( rx != ry ) fa[rx] = ry;
}

ll calc( ll i, ll j ) {
    if( ( i + j ) % 2 == 0 ) return a[(i + j) / 2] * 2;
    return a[(i + j) / 2] + a[(i + j + 1) / 2];
}

void solve( ) {
    cin >> n;
    for( int i = 1; i <= n; ++ i ) cin >> a[i];

    edges.clear( );
    for( int i = 1; i <= n; ++ i ) {
        for( int j = i; j <= n; ++ j ) {
            edges.pb({ i, j, calc( i, j ) });
        }
    }
    
    sort( ALL(edges) );
    for( int i = 1; i <= n; ++ i ) fa[i] = i;

    ll ans = 0;
    for( auto [u, v, w] : edges ) {
        if( find( u ) != find( v ) ) {
            merge( u, v );
            ans += w;
        }
    }
    cout << ans << '\n';
}
```
{% endfold %}

### 1008 Horse Racing

#### 题意
A 和 B 各有 $n$ 个等级的马，高级马必胜低级马，同级马双方各有 50% 胜率。双方都采用完全随机出战策略。计算 A 最终期望赢下的场数，并对 998244353 取模。

> $n \leq 3e5, a_{i},b_{i} \leq 1e6$

#### 思路
显然是一道期望问题，基于期望的线性性质，A 的总胜场期望等于每一匹马获胜概率的期望和。而 A 的马战胜 B 的马的概率只与 B 中等级严格小于它的马的数量相关。

> 期望的线性性质：简单来说就是 $E(aX + bY) = aE(x) + bE(y)$。

那么我们简单推导一下式子：

$$
P_{i} = \frac{1.0 \cdot \sum_{j=1}^{i-1}b_{j} + 0.5 \cdot b_{i} + 0 \cdot \sum_{j=i+1}^{n}b_{j}}{S}
$$
这里 $P_{i}$ 表示 A 派出等级为 $i$ 的马的获胜概率，$S$ 表示总马匹数量，根据下面三种情况统计：

1. A 的等级大于 B，必胜，此时 B 的马等级 $< i$，共有 $\sum_{j=1}^{i-1} b_{j}$ 匹，概率是 $1$。
2. A 的等级等于 B，五五开，此时 B 的马等级 $=i$，共有 $b_{i}$ 匹，概率是 $0.5$。
3. A 的等级小于 B，必败，此时 B 的马等级 $>i$，共有 $\sum_{j=i+1}^{n}$ 匹，概率是 $0$。

算完了概率，接着算期望，由于 A 一共有 $a_{i}$ 匹等级为 $i$ 的马，所以：

$$
\begin{align}
E_{i} = a_{i} \cdot \frac{\sum_{j=1}^{i-1}b_{j} + 0.5 \cdot b_{i}}{S} \\
E = \sum_{i=1}^{n} a_{i} \cdot \frac{\sum_{j=1}^{i-1}b_{j} + 0.5 \cdot b_{i}}{S} \\
E = \sum_{i=1}^{n} a_{i} \frac{2 \sum_{j=1}^{i-1}b_{j} + b_{i}}{2S} 
\end{align}
$$

然后就推完公式了，接着计算就好了，注意 **模意义下的除法**，等于乘上对应的乘法逆元，此处分子为 $P$，分母为 $Q = 2S \pmod{P}$，答案为 $(P \cdot Q^{-1}) \pmod{P}$。

最后看一眼 std，很好，是封装完后只有自己看得懂的模板了 ( 只能说不愧是 Oi 爷了 )，还是看看我的吧。

#### 代码部分
{% fold info @AcCode %}
```cpp
int a[maxn], b[maxn], n;

ll qpow( ll a, ll k, ll mod ) {
    ll res = 1; a %= mod;
    for( ; k; k >>= 1, a = a * a % mod )
        if( k & 1 ) res = res * a % mod;
    return res;
}

void solve( ) {
    cin >> n;
    ll sum = 0;
    for( int i = 1; i <= n; ++ i ) cin >> a[i], sum += a[i];
    for( int i = 1; i <= n; ++ i ) cin >> b[i];
	
	// 0 不能作除数
    if( sum == 0 ) {
        cout << 0 << '\n';
        return;
    }
	
    ll p = 0, cnt = 0; 
    // p 是分子，cnt 是 < i 的 B 的马的数量
    for( int i = 1; i <= n; ++ i ) {
        ll cur = 2 * cnt + b[i] % mod;
        p = ( p + a[i] * cur % mod ) % mod;
        cnt = ( cnt + b[i] ) % mod;
    }

    ll q = 2 * sum % mod; // 分母
    q = qpow( q, mod - 2, mod ); // 分母的乘法逆元
    cout << p * q % mod << '\n';
}
```
{% endfold %}

### 1011 01

#### 题意
给定一个 01 串 $s$ 和一个整数 $k$，每次操作可以指定 $i$，然后将 $i$ 和 $(i+k) \pmod n$ 两个位置的值反转（$0 \to 1, 1 \to 0$）。询问是否能通过若干次操作使得这个串变成一个回文串。

> $\sum n \leq 1e6, 1 \leq k \leq n$。

#### 思路
每次翻转 $i$ 和 $(i + k) \pmod{n}$，我最开始以为所有的字符都在一个环上，但搓完样例之后发现并不是这样的。事实上，整个字符串被划分为了 $\gcd(n, k)$ 个独立的环。

{% fold info @独立环数量推导 %}

> [!Example]
> 这个环的数量我简单推导一下吧 ( 虽然对解这道题没啥影响应该 )，假设有 $n$ 个位置，编号为 $0,1, \dots, n-1$，从 $i$ 出发，每次跳 $k$，跳多少次会回到 $i$。
>
> 假设跳了 $x$ 次回到起点 $i$，即 $i + x \cdot k \equiv i \pmod{n}$，也就是 $x \cdot k \equiv 0 \pmod{n}$，这个同余方程眼熟吗？化为不定方程就是 $x \cdot k = L \cdot n$ ( L 为一个常数 )。
>
> 为了让 $x$ 最小，我们要找 $k$ 和 $n$ 的最小公倍数 $\operatorname{lcm}(n, k) = \frac{n \cdot k}{\gcd(n, k)}$，接着解出 $x = \frac{n}{\gcd(n, k)}$。
>
> 那么一个环上有 $x$ 个点，总共就有 $n / x$ 个环，也就是 $\gcd(n, k)$，证毕。

{% endfold %}


话说回来，假设一个环上有 $(A, A, A)$ 三个值，每次操作翻转两个相邻的值，可能的情况也就是 $(B, B, A), (A, B, B), (B, A, B)$，扩展搓一下五个值的环，发现经过若干次操作后，这个环的性质只与 $A$ 和 $B$ 的个数有关，与它们所在的位置无关。

那么这就和每个环上 1 和 0 的数量相关了，由于每次翻转两个值，奇偶性是不变了，那么思路就很明确了，从奇偶性入手分析。

还有一个限制条件是回文串，相互对称的两个环，它们的奇偶性必须完全相同。若是自己和自己对称的中心环，若 $n$ 为偶数，则环的奇偶性也必须为偶，若 $n$ 为奇数，则无限制，中心元素可以缓冲。

#### 代码部分
{% fold info @AcCode %}
```cpp
int cnt[maxn];

void solve( ) {
    int n, k;
    cin >> n >> k;

	// 多组数据记的清空啊！！！别问
    for( int i = 0; i < n; ++ i ) cnt[i] = 0;

    string s;
    cin >> s;

    int g = gcd( n, k ); // 独立环的个数

    for( int i = 0; i < n; ++ i ) {
        if( s[i] == '1' ) cnt[i % g] ++; // 每个环的奇偶性
    }

	bool ok = 1;
    for( int a = 0; a < g; ++ a ) {
        int b = ( n - 1 - a ) % g; // 对称的那个环编号
        if( a == b ) {
	        if( n % 2 == 0 ) if( cnt[a] % 2 != 0 ) ok = 0;
        } else {
	        if( cnt[a] % 2 != cnt[b] % 2 ) ok = 0;
        }
    }
    
    if( ok ) cout << "YES" << '\n';
    else cout << "NO" << '\n';
}
```
{% endfold %}

---
## Medium
### 1006 Galgame

#### 题意
有一棵有根树 ( 根为 1 )，有部分节点为存档点。走到叶子节点可回到任意已经经过的存档点。每条边有无聊值，重复走会累加。求访问所有叶子节点的最小总无聊值。

> $n, m \leq 3e5$

#### 思路
手搓一下样例，发现每条边经过的次数是等于它下面这个子树的叶子节点的数量。然后再特殊考虑存档点的性质，参考下面这个图：

![1006 样例解析.png](1006.png)

每一条边上标注的是这条边经过了几次，我们惊奇的发现，存档点跟叶子节点对边的贡献居然是等价的。

也就是说，我们只需要从根节点开始 DFS 遍历一遍树，然后统计每条边需要经过的次数，最后统计有多少条边的次数是 $> 1$ 的，它对于答案的贡献就是 $(cnt[i]-1) \times w$。

代码实现上，由于直接存边的数据比较麻烦，所以我把边经过了多少次下方到了边下方的那个节点上，由于树的性质，每个点只有一个父亲，所以不会冲突。

#### 代码部分
{% fold info @AcCode %}
```cpp
struct Edge { ll v, w; };
vector<Edge> adj[maxn];

ll a[maxn], n, m;
bool save[maxn];
ll cnt[maxn];
ll ans;

void dfs( int u, int p, ll pw ) {
    bool leaf = 1; // 标记是否为叶子节点
    ll sum = 0;
    for( auto [v, w] : adj[u] ) {
        if( v == p ) continue;
        leaf = 0; // 如果还有子节点，就不是叶子节点
        dfs( v, u, w );
        sum += cnt[v]; // 累计子节点的次数
    }

    if( leaf || save[u] ) cnt[u] = 1;
    else cnt[u] = sum;
    if( u == 1 ) return; // 根节点不算！
    if( cnt[u] > 1 ) ans += ( cnt[u] - 1 ) * pw; 
    // 统计答案，注意乘往父亲方向的边权
}

void solve( ) {
    cin >> n >> m;
    for( int i = 1; i <= n; ++ i ) {
        cnt[i] = 0;
        save[i] = 0;
        adj[i].clear( );
    }

    for( int i = 1; i < n; ++ i ) {
        ll u, v, w; cin >> u >> v >> w;
        adj[u].push_back({ v, w });
        adj[v].push_back({ u, w });
    }
    
    ans = 0;
    for( int i = 1; i <= m; ++ i ) cin >> a[i], save[a[i]] = 1;
    dfs( 1, 0, 0 );
    cout << ans << '\n';
}
```
{% endfold %}

### 1005 Rain

#### 题意
有 $n$ 个储水罐，初始有 $a_{i}$ 单位水，有两辆收集车，每天所有储水罐增加 1 单位水，收集车可以收集当前位置的储水罐里的水。收集车每天可以移动到相邻位置或不动，计算最多可以收集多少水。

> $n \leq 2e5, k \leq 1e9$

#### 思路
正着求最多可以收集多少水有点麻烦，不如倒过来想，最少 **错过** 多少水没被收集，接着考虑收集车的行动路线，手搓了几个方案，分别是一个区间来回移动，左右不断扩展，从一端走到另一端。

最后发现题目有一个很特别的条件，收集车可以选择不移动，加上这个条件之后，发现一直不动，然后刚刚好从某一端走到另一端的总是最赚的。

而收集车在这样一个长度为 $k$ 的区间单向走，错过的水呈等差数列，求和就是 $\frac{k(k-1)}{2}$。由于有两辆车，所以自然想到分成两段 / 两个区间来处理。

1. 若 $2k \geq n$，也就是两辆车能全覆盖所有位置，那么直接平分两个区间就行了。
2. 反之，如果不能覆盖全位置，那么问题就转化为了 求两个不重叠的长度为 $k$ 的最大子区间。

到这里这题就推完了，由于这个 **最大不重叠子区间和** 是一个典型的问题，所以就放到折叠块里。

{% fold info @最大不重叠子区间和 %}

> [!example]
> 这里我们需要在 $O(n)$ 的时间内解决它，核心思想和单个子区间和是同样的，都是 动态规划 ( 或者滑动窗口 )。不过这里要加上 **预处理**。
> 1. 首先我们需要预处理每个长度为 $k$ 的区间的权值和，$S[i] = \sum_{j=i}^{i+k-1} a[j]$，这一步可以用滑动窗口解决。
> 2. 为了让两个区间不重叠，如果第二个区间的起点是 $j$，那么第一个区间的起点 $i$ 必须满足 $i \leq j - k$。于是再定义一个 $Lmax$ 数组，表示从 $1 \sim i$ 范围内，长度为 $k$ 的区间的 **最大权值和**。
> 3. 推一下递推公式，由于 $Lmax[i] = \max(S[1], S[2], \dots, S[i])$，那么 $Lmax[i] = \max( Lmax[i-1], S[i])$，这一步同样可以 $O(n)$ 预处理。
> 4. 接着枚举第二个区间并求和，遍历所有可能的第二个区间的起点，然后找到其左边不重叠区域中最大的区间和，也就是 $Lmax[j-k]$。

{% endfold %}


#### 代码部分
{% fold info @AcCode %}
```cpp
ll a[maxn], n, k;
ll sum[maxn], pre[maxn];

// 计算长度 w 的区间，在 k 天最多得到的额外水量
ll calc( ll w, ll k ) {
    ll del = w * ( w - 1 ) / 2;
    return w * k - del;
}

void solve( ) {
    cin >> n >> k;
    
    ll sum0 = 0;
    for( int i = 1; i <= n; ++ i ) cin >> a[i], sum0 += a[i];

    ll cnt = k * 2;
    ll ans = inf;
    
    if( cnt >= n ) {
        ll w1 = n / 2, w2 = n - w1;
        ans = sum0 + calc( w1, k ) + calc( w2, k );
    } else {
        vector<ll> s( n + 1, 0 );
        for( int i = 1; i <= n; ++ i ) s[i] = s[i-1] + a[i];
        vector<ll> lmax( n + 1, 0 );
        lmax[k] = s[k] - s[0];
        for( int i = k + 1; i <= n; ++ i ) {
            lmax[i] = max( lmax[i - 1], s[i] - s[i - k] );
        }
        ans = -inf;
        for( int j = 2 * k; j <= n; ++ j ) {
            ll cur = s[j] - s[j - k];
            ans = max( ans, lmax[j - k] + cur );
        }
        ans += calc( k, k ) * 2;
    }
    cout << ans << '\n';
}
```
{% endfold %}

### 1004 Trade

#### 题意
给定 $n+1$ 天的股票价格。每天小 A 只能进行一次操作 ( 买入 1 股或卖出 1 股 )。持股数不能为负，卖出前手中至少持有 1 股。特殊条件：若连续两天购买且价格不降，则第三天必须强制购买。最后一天无条件清仓，求最大净收益。

> $n \leq 500, \sum n \leq 2000$

#### 思路
这个题一看就是考察动态规划，多阶段决策，股票买入卖出。

于是我们考虑定义状态，设 $dp[i][j]$ 表示第 $i$ 天，持有 $j$ 股的最大净收益。( 这是最朴素的想法 )。

由于每次股票修改数不超过 1，因此最多持有股票为 $n$，不会爆 ( 我还以为跟 $A_{i}$ 取值有关，不敢开二维数组当时 ... )。

接着我们考虑特殊条件，由于当天是否强制购买与前两天的买入状态有关，我们可以再给状态加两个维度 $dp[i][j][d1][d2]$，$d1$ 表示今天，$d2$ 表示昨天 ( 1 买 / 0 卖 )。

> 注：在状态转移过程中，枚举的 $d1$ 是昨天，$d2$ 是前天的状态。

这样就可以简单地写出转移条件：若 `d1 == 1 && d2 == 1 && a[i-1] >= a[i-2]` 则必须买入。

最后考虑起始条件，由于跟前两天的状态有关，所以我们需要提前处理第一天和第二天的边界情况。

#### 代码部分
{% fold info @AcCode %}
```cpp
ll a[maxn], n;
ll dp[maxn][maxn][2][2];
// dp[i][j][d1][d2] 表示第 i 天有 j 股，第 d1 天和第 d2 天的交易情况

void solve( ) {
    cin >> n;
    for( int i = 1; i <= n + 1; ++ i ) cin >> a[i];

    for( int i = 0; i <= n; ++ i ) {
        for( int j = 0; j <= n; ++ j ) {
            for( int d1 = 0; d1 <= 1; ++ d1 ) {
                for( int d2 = 0; d2 <= 1; ++ d2 ) {
                    dp[i][j][d1][d2] = -inf;
                }
            }
        }
    }

    dp[1][1][1][0] = -a[1]; // 第一天必买
    dp[2][2][1][1] = dp[1][1][1][0] - a[2]; // 第二天也买
    dp[2][0][0][1] = dp[1][1][1][0] + a[2]; // 第二天卖了

    for( int i = 3; i <= n; ++ i ) {
        for( int j = 0; j <= i; ++ j ) {
            for( int d1 = 0; d1 <= 1; ++ d1 ) { // 昨天 i-1 的购买情况
                for( int d2 = 0; d2 <= 1; ++ d2 ) { // 前天 i-2 的购买情况
                    ll dpi = dp[i-1][j][d1][d2];
                    if( dpi == -inf ) continue;
                    bool buy = ( d1 == 1 ) && ( d2 == 1 ) && ( a[i-1] >= a[i-2] );
                    
                    // sell 可以卖的情况
                    if( buy == 0 && j - 1 >= 0 ) {
                        dp[i][j-1][0][d1] = max( dp[i][j-1][0][d1], dpi + a[i] );
                    }
                    // buy
                    if( j + 1 <= n ) { 
                        dp[i][j+1][1][d1] = max( dp[i][j+1][1][d1], dpi - a[i] );
                    } 
                }
            }
        }
    }

    ll ans = -inf;
    for( int j = 0; j <= n; ++ j ) {
        for( int d1 = 0; d1 <= 1; ++ d1 ) {
            for( int d2 = 0; d2 <= 1; ++ d2 ) {
                if( dp[n][j][d1][d2] == -inf ) continue;
                ans = max( ans, dp[n][j][d1][d2] + j * a[n+1] );
            }
        }
    }
    cout << ans << '\n';
}
```
{% endfold %}

---
## Hard
### 1001 Card

#### 题意
给定一个 $n$ 点 $m$ 边的图，每条边有耗费时间。每个点上有一种魔力药水，喝下可使魔力值增加或减少 $a_i$（无限喝，不耗时）。初始在 1 号点，魔力为 0。求移动和喝药水使得魔力值恰好为 $V$ 的最少时间。

> $n,m \leq 1e4, V \leq 1e9$

#### 思路
最开始我的想法是转化为背包判定可达性，但是想复杂了，而且数据规模很大不支持我这么开。

接着我们考虑找到了这么一条路径 $Path = \{ u_{1}, u_{2}, \dots \}$，它满足的条件是什么？由于每个药水可以无限喝，而且可加可减，我们可以得到下面这个式子：

$$
u_{1} x_{1} + u_{2} x_{2} + \dots = V
$$

不知道有没有唤起什么特别的记忆？可以想一想，再往后看。

这个式子的判定可以用到裴蜀定理：也就是说 $\gcd(u_{1}, u_{2}, \dots) \mid V$，满足这个条件，方程有解，也就是这条路径是合法的。

那么我们就可以考虑把 $\gcd$ 这一状态加入到图中 ( 所谓状态扩展 )，然后再这个扩展图上跑最短路，别忘了最初的问题是求最短的时间。( 这也可以理解为分层图，不过我觉得分层图和状态扩展图是一样的 )

#### 代码部分
{% fold info @AcCode %}
```cpp
struct Edge { ll v, w; };
vector<Edge> adj[maxn];

ll a[maxn], n, m, V;
// 由于还要存 gcd 的信息，而且值域比较大，所以直接开了一个 map 存
map<ll, ll> dist[maxn];

// Dijkstra 的状态结构体
struct State {
    ll u, g, t; // u 当前位置 | g 当前 GCD | t 当前时间
    bool operator < ( const State &oth ) const { return t > oth.t; }
    // 优先队列默认大根堆，反着写，这样就是小根堆了
};

void solve( ) {
    cin >> n >> m >> V;
    
    // 多测清空数据
    for( int i = 1; i <= n; ++ i ) {
        adj[i].clear( );
        dist[i].clear( );
    } 
    
    for( int i = 1; i <= n; ++ i ) cin >> a[i];

    for( int i = 1; i <= m; ++ i ) {
        ll u, v, w; cin >> u >> v >> w;
        adj[u].push_back({ v, w });
        adj[v].push_back({ u, w });
    }

    priority_queue<State> pq;
    pq.push({ 1, a[1], 0 });
    dist[1][a[1]] = 0;

    while( !pq.empty( ) ) {
        auto [u, g, t] = pq.top( ); pq.pop( );
        if( t > dist[u][g] ) continue;

        for( auto [v, w] : adj[u] ) {
            ll ng = gcd( g, a[v] );
            ll nt = t + w;
            // 如果存在一条更短的路径就更新
            // 注意这里不能直接写 dist[v][ng]，因为如果这个点不存在
            // dist[v][ng] 会默认给它分配一个值 0，这样就会出问题 (别问我怎么知道的)
            if( !dist[v].count( ng ) || nt < dist[v][ng] ) {
                dist[v][ng] = nt;
                pq.push({ v, ng, nt });
            }
        }
    }
	
	// 最后统计答案就行了
    ll ans = inf;
    for( int i = 1; i <= n; ++ i ) {
        for( auto [g, t] : dist[i] ) {
            if( V % g == 0 ) ans = min( ans, t );
        }
    }

    if( ans == inf ) cout << -1 << '\n';
    else cout << ans << '\n';
}
```
{% endfold %}

### 1003 Livehouse

#### 题意
给定 $n$ 天，安排 $m$ 场演唱会，任意两场在区间天数上要求不能相互包含。求在所有的非空合法的区间集合中，需要的乐队数目不超过 $k$ 的集合总数。

> $n \leq 500, \sum n \leq 2000$

#### 思路
这题 ...... 我乍一眼看完没思路，原题的题面更难理解，这看似是一个区间覆盖问题，但关键在于这个 “两两没有包含关系” 的约束中。

不包含意味着什么？假设现在有两个区间 $[l_{i}, r_{i}]$ 和 $[l_{j},r_{j}]$，如果满足不包含关系，且固定 $l_{i} < l_{j}$，那么一定有 $r_{i} < r_{j}$。这意味着，如果把所有区间按左端点 $l$ 排序，它的右端点 $r$ 也一定是 **严格单调递增** 的。

由此我们得到了两个性质：1. 先开始的区间必须先结束 ( 类队列 )。2. 覆盖某一点的最大区间数就是所需的最小乐队数。

既然区间是按顺序开始，按顺序结束的，不妨按照时间顺序来遍历，每天只有下面四种操作：

1. 开始一个新区间 ( 左端点 $l$ 定在今天 )。
2. 结束一个旧区间 ( 右端点 $r$ 定在今天 )。
3. 开始并结束 ( 今天产生了一个 $[i, i]$ 的长度为 1 的区间 )。
4. 摆烂，什么都不做。

计数类问题，多阶段，自然想到用 DP 来计数。

定义状态 $dp[i][j]$ 表示当前处理到第 $i$ 天，有 $j$ 个已经开始但未结束的区间数量。

由于第二个性质，$j$ 的最大值就是所需的乐队数，题目要求乐队数 $\leq k$，所以在转移过程中，只要保证 $j \leq k$ 即可。

#### 代码部分
{% fold info @AcCode %}
```cpp
ll dp[maxn][maxn], n;
// 第 i 天，有 j 个乐队
ll ans[maxn];

void solve( ) {
    cin >> n;
    for( int k = 1; k <= n; ++ k ) {
        for( int i = 0; i <= n; ++ i ) {
            fill( dp[i], dp[i] + n + 1, 0 );
        }
        dp[0][0] = 1;
        for( int i = 1; i <= n; ++ i ) {
            for( int j = 0; j <= k; ++ j ) {
	            // 不操作
                dp[i][j] = dp[i-1][j];
                // 开启新区间，并立即结束
                // 条件是 j+1 <= k 存在
                if( j + 1 <= k ) dp[i][j] = ( dp[i][j] + dp[i-1][j] ) % mod;
                // 开启新区间 从 j-1 转移到 j (区间数 + 1)
                // 条件是昨天 j-1 >= 0 存在
                if( j - 1 >= 0 ) dp[i][j] = ( dp[i][j] + dp[i-1][j-1] ) % mod;
                // 结束旧区间 从 j+1 转移到 j (区间数 – 1)
                // 条件是昨天 j+1 <= k 存在
                if( j + 1 <= k ) dp[i][j] = ( dp[i][j] + dp[i-1][j+1] ) % mod;
            }
        }
        ans[k] = dp[n][0];
    }
    
    for( int k = 1; k <= n; ++ k ) cout << ans[k] << ' ';
    cout << '\n';
}
```
{% endfold %}

### 1010 Shift

#### 题意
给定一个 $n$ 行 $m$ 列的表格。初始时，每一行有一个字符串，并给定了其起始列位置。保证字符串始终在表格边界 $[1, m]$ 内。你需要进行 $q$ 次操作，分为两种：

1. `1 x d`：将第 $x$ 行的字符串平移 $d$ 个单位（ $d < 0$ 左移，$d > 0$ 右移 ），保证移动后不越界。
2. `2 x`：查询第 x 行与 **其他任意一行** 的 **最长匹配连续子串** 的长度。

> 匹配的要求是：不仅仅是字符串内容相同，它们在表格中的 **绝对列位置也必须完全对齐**。
> $n, q ≤ 1e4$，$m \leq 20$。

#### 思路
其实这题不难 ...... 只是我被字符串吓到了，而且也被题目骗了。

这题看起来像是一个 动态二维字符串匹配的问题，加上 $n, q = 1e4$ 的规模，很容易会想到用 KMP，AC 自动机，甚至更复杂的数据结构上考虑，于是赛场上的我想到这，投降了喵。

但是，但是 $m \leq 20$，也就是说每一行的字符串长度最大只有 20，那它的子串最多有多少个呢？答案是 $(20 \times 21) / 2 = 210$ 个，既然子串可能性就这么多，为什么不直接暴力枚举呢？

于是就想到了用字符串哈希表来维护这个匹配问题。接着考虑哈希表映射构造，对于一个绝对对齐的两个串，它们的 **内容** 和 **列位置** 一定是一样的，所以我们还需要把 **位置** 也一起写到哈希表里面。

这里用 `unordered_map<ull, int> cnt` 来存，unordered_map 本身就是基于哈希表，ull 是 64 位无符号，这里用作自然溢出。( 如果看不懂，移步字符串哈希 )

然后是算法的具体实现步骤，首先我们需要预处理每一行的子串，然后都存起来。

接着是操作 1 修改：由于子串很少，所以我们暴力把移动前的至多 210 个子串都删掉，更新这一行移动之后，再把至多 210 个子串加进去。

最后是操作 2 查询：枚举当前第 $x$ 行的所有子串，如果某个子串的 Key 在 `cnt` 中出现的次数 $\geq 2$，就说明存在一个与之对应，说明匹配成功。

#### 代码部分
{% fold info @AcCode %}
```cpp
using ll = long long;
using ull = unsigned long long;

const int maxn = 1e4 + 5;
const ull base1 = 131;
const ull base2 = 1e9 + 7;

int n, m, q;
int p[maxn]; // 记录第 i 行当前的起始列
string s[maxn]; // 记录第 i 行的字符串

unordered_map<ull, int> cnt; // 频率统计 哈希表

// 映射：将 子串内容 和 列位置 混合成一个唯一的 Key
ull get( int col, ull hash ) {
    return hash ^ ( 1ull * col * base2 );
}

// 修改第 idx 行内所有连续子串
// delta = 1 表示加入，delta = -1 表示 删除
void update( int idx, int delta ) {
    int stc = p[idx];
    int len = s[idx].length( );
    for( int i = 0; i < len; ++ i ) {
        ull res = 0;
        for( int j = i; j < len; ++ j ) {
            res = res * base1 + s[idx][j];
            ull key = get( stc + i, res );
            cnt[key] += delta;
        }
    }
}

void solve( ) {
    cin >> n >> m >> q;
    
    // 多测记的初始化
    cnt.clear( );

    for( int i = 1; i <= n; ++ i ) {
        cin >> p[i] >> s[i];
        update( i, 1 ); // 预处理
    }

    for( int i = 1; i <= q; ++ i ) {
        int op, x, d;
        cin >> op;
        if( op == 1 ) {
            cin >> x >> d;
            update( x, -1 ); // 删除移动前的子串
            p[x] += d;
            update( x, 1 ); // 添加移动后的子串
        } else {
            cin >> x;
            int stc = p[x];
            int len = s[x].length( );
            int ans = 0;
			
			// 扫描当前行的子串，
            for( int i = 0; i < len; ++ i ) {
                ull res = 0;
                for( int j = i; j < len; ++ j ) {
                    res = res * base1 + s[x][j];
                    ull key = get( stc + i, res );
                    // 看看有没有能匹配得上的
                    if( cnt[key] >= 2 ) ans = max( ans, j - i + 1 );
                }
            }
            cout << ans << '\n';
        }
    }
}
```
{% endfold %}

---
## Very Hard

### 1009 Sand

在经过 2h 的写代码和写题解后，发现这是一道我无法掌握的数据结构问题 ( 至少目前为止 )，所以题解略了。