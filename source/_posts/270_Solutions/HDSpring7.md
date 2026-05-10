---
title: HDSpring7
tags: HDSpring
categories:
  - 270_Solutions
date: 2026-05-10 00:00:00
---

## Very Easy
### 1002 Bingo

#### 题意
给定一个 $n \times n$ 的矩阵，问有哪些数同时出现在了矩阵的每一行和每一列。

#### 思路
简单模拟，分别统计它出现在了多少个 不同的行 和 不同的列，最后判断 行计数 和 列计数 是否都 $= n$ 即可。

#### 代码部分
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
3. A 的等级小于 B，必败，此时 B 的马等级 $>i$，共有 $\sum_{j+1}^{n}$ 匹，概率是 $0$。

算完了概率，接着算期望，由于 A 一共有 $a_{i}$ 匹等级为 $i$ 的马，所以：

$$
\begin{align}
E_{i} = a_{i} \cdot \frac{\sum_{j=1}^{i-1}b_{j} + 0.5 \cdot b_{i}}{S} \\
E = \sum_{i=1}^{n} a_{i} \cdot \frac{\sum_{j=1}^{i-1}b_{j} + 0.5 \cdot b_{i}}{S} \\
E = \sum_{i=1}^{n} a_{i} \frac{2 \sum_{j=1}^{i-1}b_{j} + b_{i}}{2S} 
\end{align}
$$

然后就推完公式了，接着计算就好了，注意 **模意义下的除法**，等于乘上对应的乘法逆元，此处分子为 $P$，分母为 $Q = 2S \pmod{P}$，答案为 $(P \cdot Q^{-1}) \pmod{P}$。

最后看一眼 std，很好，是封装完后只有自己看得懂的模板了 ( 只能说不愧是 Oi爷了 )，还是看看我的吧。

#### 代码部分
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
> 假设跳了 $x$ 次回到起点 $i$，即 $i + x \cdot k \equiv i \pmod{n}$，也就是 $x \cdot j \equiv 0 \pmod{n}$，这个同余方程眼熟吗？化为不定方程就是 $x \cdot k = L \cdot n$ ( L 为一个常数 )。
>
> 为了让 $x$ 最小，我们要找 $k$ 和 $n$ 的最小公倍数 $\operatorname{lcm}(n, k) = \frac{n \cdot k}{\gcd(n, k)}$，接着解出 $x = \frac{n}{\gcd(n, k)}$。
>
> 那么一个环上有 $x$ 个点，总共就有 $n / x$ 个环，也就是 $\gcd(n, k)$，证毕。

{% endfold %}


话说回来，假设一个环上有 $(A, A, A)$ 三个值，每次操作翻转两个相邻的值，可能的情况也就是 $(B, B, A), (A, B, B), (B, A, B)$，扩展搓一下五个值的环，发现经过若干次操作后，这个环的性质只与 $A$ 和 $B$ 的个数有关，与它们所在的位置无关。

那么这就和每个环上 1 和 0 的数量相关了，由于每次翻转两个值，奇偶性是不变了，那么思路就很明确了，从奇偶性入手分析。

还有一个限制条件是回文串，相互对称的两个环，它们的奇偶性必须完全相同。若是自己和自己对称的中心环，若 $n$ 为偶数，则环的奇偶性也必须为偶，若 $n$ 为奇数，则无限制，中心元素可以缓冲。

#### 代码部分
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

---
## Medium
### 1006 Galgame

#### 题意
有一棵有根树剧情游戏（1 为根），叶子为结局，有部分节点为存档点。打完结局可回到任意已过的存档点。每条边有无聊值，重复走会累加。求游玩所有结局且至少经过所有存档点一次的最小总无聊值。

#### 思路

#### 代码部分
```cpp

```

### 1005 Rain

#### 题意

#### 思路

#### 代码部分
```cpp

```

### 1004 Trade

#### 题意

#### 思路

#### 代码部分
```cpp

```


---
## Hard
### 1001 Card

#### 题意

#### 思路

#### 代码部分
```cpp

```

### 1003 Livehouse

#### 题意

#### 思路

#### 代码部分
```cpp

```


---
## Very Hard
### 1008 Sand

#### 题意

#### 思路

#### 代码部分
```cpp

```

### 1009 Shift

#### 题意

#### 思路

#### 代码部分
```cpp

```
