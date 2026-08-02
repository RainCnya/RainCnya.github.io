---
title: '[Solution] ABC469 A~G'
tags:
  - algorithm/比赛
status: reviewed
categories:
  - 270_Solutions
  - ABC
abbrlink: 2010a92e
date: 2026-08-01 00:00:00
updated: 2026-08-02 00:00:00
---

# [Solution] ABC469

## 一、比赛概况

- **时间**：2026.8.1 20:00 - 21:40
- **结果**：ABCDEF / G | Rk. 54
- **主要时间损耗**：解题

## 二、简要记录

### [A - Train Car](https://atcoder.jp/contests/abc469/tasks/abc469_a)

> [!Question]
> 一列火车共有 $N$ 节车厢，求从前往后第 $K$ 节车厢是从后往前第几节。
>
> 数据规模：$1\le K\le N\le 100$。

它后面有 $N-K$ 节，所以从后往前的位置就是 $N-K+1$。

```cpp title:"AAA" fold
void solve( ) {
    int n = read( ), k = read( );
    cout << n - k + 1 << '\n';
}
```

### [B - Isolated Seats](https://atcoder.jp/contests/abc469/tasks/abc469_b)

> [!Question]
> 给定一个由 `o` 和 `x` 组成的字符串。统计有多少个空座位 `x`，其左右相邻位置若存在也都是空座位。
>
> 数据规模：$1\le N\le 100$。

直接枚举每个位置，同时判断自身与存在的左右邻居即可。

```cpp title:"BBB" fold
void solve( ) {
    int n = read( );
    string s;
    cin >> s;

    int cnt = 0;
    for( int i = 0; i < n; ++ i ) {
        if( s[i] == 'x' ) {
            if( i == 0 || s[i - 1] == 'x' ) {
                if( i == n - 1 || s[i + 1] == 'x' ) ++ cnt;
            }
        }
    }
    cout << cnt << '\n';
}
```

### [C - Cantrip](https://atcoder.jp/contests/abc469/tasks/abc469_c)

> [!Question]
> 有 $N$ 个依次排列的袋子，每个袋子标记为 `o` 或 `x`。对于每个 $k$，先取走前 $k$ 个袋子；此后每持有一个 `o` 袋子，就可以丢掉它并继续取走队首的一个袋子。求最多能取走多少个袋子。
>
> 数据规模：$1\le N\le 8\times 10^5$。

可以理解为换掉一个 `o` 拿新袋子是不亏数量的，而 `x` 会亏损一个袋子，也就是说把前 $k$ 个袋子全部败光，只需要找到第 $k$ 个 `x` 出现的位置就好了。

我这里对 `x` 做了一个前缀和，然后二分查找第一个 $sum_{i} \ge k$ 的位置，复杂度 $\mathcal{O}(N \log(N))$。

赛后注意到还有一种实现方式，可以记录所有 `x` 的位置，然后跑一遍就行，复杂度 $\mathcal{O}(N)$。

```cpp title:"CCC" fold
int sum[maxn];

void solve( ) {
    int n = read( );
    string s;
    cin >> s;

    for( int i = 1; i <= n; ++ i ) {
        sum[i] = sum[i - 1] + ( s[i - 1] == 'x' );
    }

    for( int k = 1; k <= n; ++ k ) {
        int pos = lower_bound( sum + 1, sum + n + 1, k ) - sum;
        if( pos > n ) cout << n << '\n';
        else cout << pos << '\n';
    }
}
```

### [D - The Big Two](https://atcoder.jp/contests/abc469/tasks/abc469_d)

> [!Question]
> $M$ 场比赛的决赛选手分别为 $(A_i,B_i)$。统计有多少对玩家 $(x,y)$ 满足：每场决赛中至少有一人是 $x$ 或 $y$。
>
> 数据规模：$2\le N,M\le 2\times 10^5$。

或许可以把这个问题看作一张图，每名选手都是图上的一个节点，每场比赛就是图上的一条边。所以题目的问题就转化为了，有多少对点可以覆盖所有的边？

由于所有边都得被选中，所以我们可以任取一条边，任意合法的点对都至少包含它的两个端点中的一个，否则就无法覆盖这条边，是不合法的。

假设边为 $(x, y)$，我们只需要检查 $(x, i)$ 以及 $(y, i)$ 相应的点对，记 $cnt0[x]$ 为点 $x$ 关联的边数，$cnt(x, y)$ 为端点恰好是 $x, y$ 的边数。

对于点对 $(x, y)$ 来说，它能覆盖的不同边数量为：$cnt0[x] + cnt0[y] - cnt(x, y)$，若它等于 $M$，就说明能覆盖所有的边，于是跑一遍统计一下就好了，注意去重。

> 注：这里也能用 `map` 存边，令小的点靠前就能避免重复计数，不详细展开了。

```cpp title:"DDD" fold
struct Edge { int u, v; } a[maxn];
int cnt0[maxn], cntx[maxn], cnty[maxn];

void solve( ) {
    int n = read( ), m = read( );
    for( int i = 1; i <= m; ++ i ) {
        int u = read( ), v = read( );
        a[i] = {u, v};
        cnt0[u] ++, cnt0[v] ++;
    }

    auto [x, y] = a[1];
    for( int i = 1; i <= m; ++ i ) {
        auto [u, v] = a[i];
        if( u == x ) cntx[v] ++;
        if( v == x ) cntx[u] ++;
        if( u == y ) cnty[v] ++;
        if( v == y ) cnty[u] ++;
    }

    ll ans = 0;
    for( int i = 1; i <= n; ++ i ) {
        if( i == x ) continue;
        if( cnt0[x] + cnt0[i] - cntx[i] == m ) ans ++;
    }

    for( int i = 1; i <= n; ++ i ) {
        if( i == x || i == y ) continue;
        if( cnt0[y] + cnt0[i] - cnty[i] == m ) ans ++;
    }
    cout << ans << '\n';
}
```

### [E - Pro Exam Eligibility](https://atcoder.jp/contests/abc469/tasks/abc469_e)

> [!Question]
> 给定一个由胜利 `o` 和失败 `x` 组成的字符串。在至少包含 $K$ 场胜利的连续区间中，求最大的胜率。
>
> 数据规模：$1\le K\le N\le 10^6$，答案允许 $10^{-6}$ 的误差。

最大的胜率？也就是说我想让区间里的 `x` 失败尽可能的少，那恰好包含 $K$ 场胜利不就是最少得情况吗？于是我立马打了个滑动窗口求最值。

但是，一定是恰好 $K$ 场胜利就是胜率最高的吗？不一定吧，比如 `ooxoo (k=3)`，此时胜利 $3$ 场对应 $3 / 4$，而整个区间为 $4 / 5$。

所以我们得从别的性质入手，记 $sum_i$ 为胜场数前缀和，对于某一段区间 $[l, r]$ 来说，它的胜率就是 $\displaystyle \frac{sum_{r} - sum_{l - 1}}{r - l + 1}$，也就是说我们要求这个柿子的最大值。

这题其实在 Week1 出现过。由于答案具有单调性，所以可以考虑二分答案，区间 $(l,r]$ 的胜率至少为 $mid$： $\displaystyle \frac{sum_r-sum_l}{r-l}\ge mid \iff (sum_r-mid\cdot r)\ge(sum_l-mid\cdot l)$。

记 $f_{i} = sum_{i} - mid \cdot i$，因为还需要满足区间胜场数不少于 $K$，即 $sum_{r} - sum_{l} \ge K$，随着右端点 $r$ 向右移动，合法的左端点构成一个递增的前缀，所以只需要维护其中最小的 $f_{l}$，判断是否存在 $f_{r} \ge \min(f_{l})$ 即可。

```cpp title:"EEE" fold
int n, k;
int sum[maxn];
double f[maxn];

bool check( double mid ) {
    for( int i = 0; i <= n; ++ i ) {
        f[i] = sum[i] - mid * i;
    }

    double mn = inf;
    int l = 0;
    for( int r = 1; r <= n; ++ r ) {
        while( l < r && k <= sum[r] - sum[l] ) {
            mn = min( mn, f[l] );
            l ++;
        }
        if( f[r] >= mn ) return true;
    }
    return false;
}

void solve( ) {
    n = read( ), k = read( );
    string s;
    cin >> s;

    for( int i = 1; i <= n; ++ i ) {
        sum[i] = sum[i - 1] + ( s[i - 1] == 'o' );
    }

    double l = 0, r = 1;
    for( int t = 1; t <= 100; ++ t ) {
        double mid = ( l + r ) / 2.0;
        if( check( mid ) ) l = mid;
        else r = mid;
    }
    cout << fixed << setprecision( 6 ) << l << '\n';
}
```

### [F - GCD Maximum Spanning Tree](https://atcoder.jp/contests/abc469/tasks/abc469_f)

> [!Question]
> 给定互不相同的正整数 $A_1<A_2<\dots<A_N$。构造一张完全图，点 $i,j$ 之间边权为 $\gcd(A_i,A_j)$，求最大生成树的边权和。
>
> 数据规模：$2\le N\le 2\times 10^5$，$A_N\le 10^6$。

> 这题其实我在南昌邀请赛见过类似的。

最自然的思路就是建图，然后跑一遍 Kruskal 最大生成树，从大到小处理边权即可。但是发现点数太多了，我们没法直接构建完全图，更何况每个点对算 $\gcd$ 的开销呢？

于是发现，其实很多边是根本用不上的；对于一个整数 $d$，所有值为 $d$ 的倍数的点之间，都存在权值至少为 $d$ 的边。

所以我们从最大值开始倒序枚举 $d$，然后收集所有 $d$ 的倍数在序列中对应的点，尝试用并查集合并，当然我们不需要把树完整建出来，所以每次合并，相当于选择了一条当前权值为 $d$ 的边，统计答案即可。

由于枚举到 $d$ 时，所有权值大于 $d$ 的边都已经处理完毕。若两个当前不连通的点的 $gcd$ 大于 $d$，那么它在枚举到该 $gcd$ 时就已经被合并了，所以每次成功的合并都可以看作选择了一条权值为 $d$ 的边。

```cpp title:"FFF" fold
struct DSU {
/* ======================================== */
int fa[maxn], siz[maxn];
void init( int N ) { for( int i = 1; i <= N; ++ i ) fa[i] = i, siz[i] = 1; }
int find( int x ) { return fa[x] == x ? x : fa[x] = find( fa[x] ); }
bool merge( int x, int y ) {
    int rx = find( x ), ry = find( y );
    if( rx == ry ) return 0;
    if( siz[rx] > siz[ry] ) swap( rx, ry );
    fa[rx] = ry, siz[ry] += siz[rx];
    return 1;
}
bool same( int x, int y ) { return find( x ) == find( y ); }
int size( int x ) { return siz[find( x )]; }
/* ======================================== */
} dsu;

int a[maxn];
int pos[maxv];

void solve( ) {
    int n = read( );
    int mx = -1;
    for( int i = 1; i <= n; ++ i ) {
        int x = read( );
        pos[x] = i;
        mx = max( mx, x );
    }

    dsu.init( n );
    
    ll ans = 0;
    for( int d = mx; d >= 1; -- d ) {
        int cur = 0;
        for( int val = d; val <= mx; val += d ) {
            int nxt = pos[val];
            if( !nxt ) continue;
            if( !cur ) cur = nxt;
            else if( dsu.merge( cur, nxt ) ) {
                ans += d;
            }
        }
    }
    cout << ans << '\n';
}
```

枚举倍数的总次数为  $\displaystyle \sum_{d=1}^{V}\left\lfloor\frac Vd\right\rfloor=\mathcal O(V\log V)$，其中 $V=\max A_i$，这是一个调和级数，复杂度还是能接受的。

### [G - K-nacci Operations](https://atcoder.jp/contests/abc469/tasks/abc469_g)

> [!Question]
> 给定 $K$ 个由 `a`,`b` 构成的字符串。对于 $i>K$，定义 $S_i=S_{i-1}S_{i-2}\dots S_{i-K}$。按照 $S_N$ 的字符依次操作字符串 $T$：遇到 `a` 将首字符移到末尾，遇到 `b` 将整个字符串翻转。求最终的 $T$。
>
> 数据规模：$2\le K\le100$，$N\le10^{18}$，初始字符串总长与 $|T|$ 均不超过 $2\times10^5$。

> 写完前面 6 题，到这里我还有 1h，我寻思这把 ABC 总有机会能 AK 了吧，区区 G，我来会会你（划掉）。

注意到 $N = 1e18$，结合这个形似斐波那契数列的 $S$，大胆猜测思考方向是矩阵快速幂，那就是线性代数的角度了。

显然不可能真正构造 $S_N$，所以先考虑一段操作真正对 $T$ 做了什么。发现两种操作其实都只是在改变原字符串中每个字符最终所在的位置。设 $L=|T|$，记录原位置 $p$ 最后移动到哪里：

$$
\begin{aligned}
\texttt a &: p\mapsto p-1,\\
\texttt b &: p\mapsto -p-1,
\end{aligned}
\pmod L
$$

于是任意操作串都可以表示成仿射变换：$F(p) = kp + b \pmod L$，其中 $k \in \{ -1, 1 \}$。也就是说，无论 $S_i$ 有多长，我们都只需要记录两个数 $(k_i,b_i)$，表示整个 $S_i$ 对位置产生的变换。

其中 $\texttt a=(1,-1), \texttt b=(-1,-1)$。

定义 $F_x*F_y$ 表示先执行 $F_x$，再执行 $F_y$，那么两个变换的复合满足：$(k_x,b_x)*(k_y,b_y) = (k_xk_y,\ k_yb_x+b_y)$。

因此对于输入给出的前 $K$ 个字符串，可以直接扫描每个字符，将一整个字符串压成一个仿射变换，复杂度为 $O(\sum |S_i|)$。

对于 $i>K$，有 $F_i=F_{i-1} * F_{i-2} * \cdots * F_{i-K}$，不过这个乘法不满足交换律，所以我们需要化简这一长串复合。

令 $P=K+1$，以及 $G=F_{i-2}*F_{i-3}*\dots*F_{i-K}$，
那么 $F_i=F_{i-1}*G$，且 $F_{i-1}=G*F_{i-P}$。

于是 $G=F_{i-1}*F_{i-P}^{-1}$，代回可以得到 $F_i=F_{i-1}^2*F_{i-P}^{-1}$。
注意这里复合不满足交换律，乘法顺序不能改变。

接着计算仿射变换的逆元与平方。由于 $k\in \{ -1,1 \}$，所以 $k^{-1}=k$，从而：$(k, b)^{-1} = (k, -kb)$，并且 $(k, b)^{2} = (1, (k + 1)b)$。

代入前面的递推式：$\displaystyle F_{i} = \left( 1,\ (k_{i-1}+1)b_{i-1} \right) * \left( k_{i-P}, -k_{i-P}b_{i-P} \right)$。

分别可以得到 $k_{i} = k_{i-P}$，以及 $b_{i} = k_i \left((k_{i-1}+1)b_{i-1}-b_{i-P}\right) \pmod L$。

前者说明 $k_i$ 以 $P=K+1$ 为周期，因此 $b_i$ 递推中的两个系数：$-k_{i}, k_{i}(k_{i-1} + 1)$ 也都以 $P$ 为周期。

至此终于可以开始构造矩阵了。由于新的递推从 $i = P + 1$ 开始，定义状态：

$$  
V_P=  
\begin{pmatrix}  
b_{1} \\
b_{2} \\
\vdots \\
b_{P} \\
\end{pmatrix}
$$

从 $V_{i-1}$ 转移到 $V_i$ 时，前 $P-1$ 项直接向前移动一位，最后一项根据 $b_i=-k_ib_{i-P}+k_i(k_{i-1}+1)b_{i-1}$ 得到。

因此单步转移矩阵为：

$$
M_i=  
\begin{pmatrix}  
0&1&0&\cdots&0\\ 
0&0&1&\cdots&0\\
\vdots &&&\ddots&\vdots\\
0&0&0&\cdots&1\\  
-k_i&0&0&\cdots&k_i(k_{i-1}+1)  
\end{pmatrix}
$$

由于转移矩阵以 $P$ 为周期，可以先求出完整一个周期的转移矩阵，然后对周期数量做矩阵快速幂，最后再单独处理剩余的几步。

```cpp title:"GGG" fold
struct Matrix {
/* ======================================== */
ll m[maxn][maxn];
int sz;
Matrix( int _sz = 0 ) : sz( _sz ) { memset( m, 0, sizeof( m ) ); }
void init( ) { for( int i = 1; i <= sz; ++ i ) m[i][i] = 1; }
friend Matrix operator * ( const Matrix &a, const Matrix &b ) {
    Matrix res( a.sz );
    for ( int i = 1; i <= res.sz; i++ ) {
        for( int K = 1; K <= res.sz; ++ K ) {
            if( a.m[i][K] == 0 ) continue;
            for( int j = 1; j <= res.sz; ++ j )
                res.m[i][j] = ( res.m[i][j] + a.m[i][K] * b.m[K][j] ) % mod;
        }
    }
    return res;
}
/* ======================================== */
} A;

Matrix mqpow( Matrix a, ll K ) {
    Matrix res( a.sz ); res.init( );
    for( ; K; K >>= 1, a = a * a )
        if( K & 1 ) res = res * a;
    return res;
}

struct F { 
/* ======================================== */
ll k, b;
F( ll _k = 1, ll _b = 0 ) : k( _k ), b( _b ) { };
friend F operator * ( F x, F y ) {
    F res;
    res.k = y.k * x.k;
    res.b = norm( 1ll * y.k * x.b + y.b );
    return res;
}
ll apply( ll p ) {
    return norm( 1ll * k * p + b );
}
/* ======================================== */
};

int P, K;
ll n;

F f[maxn];
string s[maxn];
string T;

ll getk( ll i ) {
    int pos = ( i - 1 ) % P + 1;
    return f[pos].k;
}

Matrix getM( ll i ) {
    Matrix res( P );
    for( int j = 1; j < P; ++ j ) {
        res.m[j][j+1] = 1 % mod;
    }
    ll k = getk( i );
    ll k1 = getk( i - 1 );
    
    res.m[P][1] = norm( -1ll * k );
    res.m[P][P] = norm( 1ll * k * ( k1 + 1 ) );
    return res;
}

F calc( string s ) {
    F res = F( 1, 0 );
    for( char ch : s ) {
        F cur;
        if( ch == 'a' ) cur = F( 1, norm( -1ll ) );
        else cur = F( -1, norm( -1ll ) );
        res = res * cur;
    }
    return res;
}


void solve( ) {
    K = read( );
    P = K + 1;
    for( int i = 1; i <= K; ++ i ) cin >> s[i];
    
    n = read( );
    cin >> T;
    mod = T.size( );

    for( int i = 1; i <= K; ++ i ) {
        f[i] = calc( s[i] );
    }

    f[P] = {1, 0};
    for( int i = K; i >= 1; -- i ) {
        f[P] = f[P] * f[i];
    }
    
    ll ansk, ansb;

    if( n <= P ) {
        ansk = f[n].k;
        ansb = f[n].b;
    }
    else {
        Matrix circle( P );
        circle.init( );

        for( int i = P + 1; i <= 2 * P; ++ i ) {
            circle = getM( i ) * circle;
        }

        ll step = n - P;
        ll cnt = step / P;
        ll rem = step % P;

        Matrix trans = mqpow( circle, cnt );

        for( int i = P + 1; i <= P + rem; ++ i ) {
            trans = getM( i ) * trans;
        }

        ansb = 0;
        for( int j = 1; j <= P; ++ j ) {
            ansb = ( ansb + trans.m[P][j] * f[j].b ) % mod;
        }
        ansk = getk( n );
    }

    F anst( ansk, ansb );

    string ans = T;

    for( int pos = 0; pos < mod; ++ pos ) {
        ans[anst.apply( pos )] = T[pos];
    }
    cout << ans << '\n';
}
```

矩阵规模为 $K+1\le101$，总复杂度为 $\mathcal O\left(\sum_{i=1}^{K}|S_i|+K^3\log N+|T|\right)$ 空间复杂度为 $\mathcal O(K^2+|T|)$。

> 赛后了解到，这些由旋转和翻转组成的仿射变换在复合下构成二面体群；不过本题并不需要预先掌握群论，只需要用到复合封闭和逆元。

## 三、补题记录

G 赛时思路通了，但是没调试出来；所以无补题。

## 四、本场留下什么

- 解题上：先把过程压缩成真正会被消耗的资源或必须覆盖的对象。C 题把 `x` 看成初始名额的消耗，D 题用第一条边把候选点对压到两类。

- 优化上：比例最值可以二分后转化为前缀差；隐式完全图则可以按边权阈值执行 Kruskal，避免显式建边。

- 模型上：巨大字符串不一定要维护字符本身。G 题把操作序列压成 $kp+b$ 的仿射变换，再从 K-nacci 拼接中提取低维线性递推。
