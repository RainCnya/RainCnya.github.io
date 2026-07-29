---
title: '[Solution] NKSummer4'
status: reviewed
categories:
  - 270_Solutions
abbrlink: cf59853
date: 2026-07-29 00:00:00
updated: 2026-07-29 00:00:00
---

# [Solution] NKSummer4

## 一、比赛概况

- **时间**：2026.7.29 12:00 - 17:00
- **结果**：4 / 11 | Rk.290
- **做题顺序**：ICDB
- **主要时间损耗**：循环移位计数去重、C 的转移代价预处理，以及 D 的奇数构造反复修正

## 二、简要记录

### [I-Rounddog II](https://ac.nowcoder.com/acm/contest/133879/I)

> [!question] [I. Rounddog II](https://ac.nowcoder.com/acm/contest/133879/I)  
> 定义 $T_1=\texttt{Rounddog}$，并令 $T_i=T_{i-1}+\texttt{g}$。给定字符串 $S$ 和整数 $k$，求 $S$ 的多少个循环移位包含 $T_k$ 作为连续子串。
>
> 数据规模：$t\le 10^5$，所有测试用例的 $|S|$ 之和不超过 $10^5$，$1\le k\le 100$。

循环移位，那我直接把 $S$ 复制一遍，然后在 $S+S$ 中寻找 $T_{k}$ 出现的位置不就好了吗？

于是我直接构造 $T_{k} = Rounddo + k \cdot g$，然后直接用 KMP 匹配一下出现位置。 

我最开始的计数方式是，每次找到一个出现位置，就累积 $\mid S \mid - \mid T_{k} \mid + 1$，因为对于这一段子串来说，其他不属于它的位置都可以循环移动一下。

但是提交之后 WA 了两发，于是我开始反思我到底哪里错了。最后想到可能不同出现位置对应的循环移位可能重合，直接相加会重复计数！

所以我改了一版用差分统计区间并集，这次过了。不过这个题反映了我对 循环移位 和 字符串 还有 计数 的理解不够到位。

#### 题解思路

由于 $T_{k}$ 不存在非空 border，它只有开头出现大写字母 `R` 结尾一定是 `g` 所以任意两个循环出现都不可能重叠。

设圆环上共有 $x$ 个不同出现位置，如果 $x = 0$ 就说明没有循环移位合法，答案为 $0$；如果 $x = 1$ 就说明只有一个位置，答案就是 $n - m + 1$；如果 $x \ge 2$ 就说明无论怎么移动都成立，因为循环移位最多只能破坏一个子串。

```cpp title:"I" fold
int pi[maxn]; // 前缀函数

void build( const string &p ) {
    int m = (int)p.size( );
    pi[0] = 0;
    for( int i = 1, j = 0; i < m; ++ i ) {
        while( j && p[i] != p[j] ) j = pi[j-1];
        if( p[i] == p[j] ) ++ j;
        pi[i] = j;
    }
}

vector<int> kmp( const string &s, const string &p ) {
    int n = (int)s.size( ), m = (int)p.size( );
    vector<int> pos;
    build( p );
    for( int i = 0, j = 0; i < n; ++ i ) {
        while( j && s[i] != p[j] ) j = pi[j - 1];
        if( s[i] == p[j] ) ++ j;
        if( j == m ) {
            pos.push_back( i - m + 1 );
            j = pi[j - 1];
        }
    }
    return pos;
}

int dif[maxn];

void solve( ) {
    string s;
    int k;
    cin >> s >> k;
    int lens = s.length( );
    s = s + s;

    string Tk = "Rounddo";
    for( int i = 1; i <= k; ++ i ) Tk += 'g';
    int lentk = 7 + k;

    if( lentk > lens ) {
        cout << 0 << '\n';
        return ;
    }

    for( int i = 0; i < lens; ++ i ) dif[i] = 0;

    build( Tk );
    vector<int> res = kmp( s, Tk );
    
    ll ans = 0;

    for( int x : res ) {
        int l = max( 0, x + lentk - lens );
        int r = min( lens - 1, x );
        if( l <= r ) dif[l] ++, dif[r + 1] --;
    }

    int cur = 0;
    for( int i = 0; i < lens; ++ i ) {
        cur += dif[i];
        if( cur > 0 ) ans ++;
    }

    cout << ans << '\n';
}
```

### [C-重测队列](https://ac.nowcoder.com/acm/contest/133879/C)

> [!question] [C. 重测队列](https://ac.nowcoder.com/acm/contest/133879/C)  
> 有 $n$ 个程序使用同一个测试点顺序。程序会依次运行测试点，遇到第一个拒绝结果后停止；每个程序在每个测试点上的运行时间与结果均已知。可以任意重排 $m$ 个测试点，求评测全部程序的最小总时间。
>
> 数据规模：$1\le n\le 2\times 10^4$，$1\le m\le 20$，$1\le d_{i,j}\le 10^9$。

学长说这题要贪心，对于每行统计正贡献，对每列统计负贡献。

但我写完 I 回来看这题的时候，注意到 $m \le 20$，结合题目考察，我的直觉是状态压缩，而且很适合直接转移。

> 为什么感觉每一场牛客都有状压DP 啊……

于是记 $f[S]$ 表示已经完成集合 $S$ 中所有测试点时，能够得到的最小总耗时，由于状态与内部顺序无关，所以可以只保留到达同一集合的最小耗时。

接着考虑转移，若接下来运行测试点 $j\notin S$，真正会运行到 $j$ 的程序，是那些在集合 $S$ 中没有拒绝任何测试点的程序：

$$
f[S\cup\{j\}]
=\min\left(f[S\cup\{j\}],
 f[S]+\sum_{i:\,R_i\cap S=\varnothing}d_{i,j}\right)
$$

其中 $R_i$ 表示程序 $i$ 会拒绝的测试点集合。

难点在这个转移，我最开始直接对所有的子集作枚举，但这个复杂度是 $\mathcal{O}(3^m)$，是无法通过的。

```cpp
for( int sub = cur; sub; sub = ( sub - 1 ) & cur ) {
    if( __builtin_popcount( cur ) - __builtin_popcount( sub ) != 1 ) continue;
}
```

但是我发现每次转移只新增一个测试点，所以直接枚举 `cur` 中最后加入的那个测试点不就行了吗，这样的复杂度为 $\mathcal{O}(m \cdot 2^m)$。

```cpp
while( rem ) {
	int bit = rem & -rem;
	int j = __builtin_ctz( bit );
	f[mask | bit] = min( f[mask | bit], f[mask] + h[j][all ^ mask] );
	rem ^= bit;
} // lowbit 枚举二进制的每一位

for( int x = rem; x; x &= x - 1 ) {
	int bit = x & -x;
	int j = __builtin_ctz( bit );
	f[mask | bit] = min( f[mask | bit], f[mask] + h[j][all ^ mask] );
} // 这还有一种 for 的等价写法
```

但是即便这样枚举还是会 TLE，因为我最开始的写法是：

```cpp
set<int> used;
for( int j = 0; j < m; ++ j ) {
    if( sub & ( 1 << j ) ) {
        for( int i = 0; i < n; ++ i ) {
            if( s[i][j] == 'R' ) used.insert( i );
        }
    }
}
```

还需要再暴力找一遍，每次转移都得重新扫描 $\mathcal{O}(nm)$ 个字符，这显然就是这题的瓶颈了，下面考虑如何优化这一步的转移代价。

由于重点只在某些测试点为 `R` 的格子上，我们可以记录 $Rmask[i]$，表示第 $i$ 个程序会在哪些测试点上返回 `R`，对每个程序求出它的拒绝集合 $R_i$。

然后再开一个 $h[j][mask]$ 数组，表示所有拒绝集合恰好为 `mask` 的程序，在测试点 $j$ 上的耗时总和，然后跑一遍 [[SOSDP]] 把每个测试点 $j$ 都求一个子集和。

于是固定状态 $S$ 和下一个测试点 $j$ 后，转移代价可以在 $\mathcal O(1)$ 内得到。

```cpp title:"C" fold
int a[maxn][maxm];
ll h[maxm][(1 << 20)];
ll f[(1 << 20)];

void solve( ) {
    int n = read( ), m = read( );
    int M = 1 << m;
    int all = M - 1;

    for( int i = 0; i < n; ++ i ) {
        for( int j = 0; j < m; ++ j )  {
            a[i][j] = read( );
        }
        int Rmask = 0;
        for( int j = 0; j < m; ++ j ) {
            char ch = getchar( );
            if( ch == 'R' ) Rmask |= (1 << j);
        }
        for( int j = 0; j < m; ++ j ) {
            h[j][Rmask] += a[i][j];
        }
    }

	// SOS DP
    for( int j = 0; j < m; ++ j ) {
        for( int bit = 0; bit < m; ++ bit ) {
            for( int mask = 0; mask < M; ++ mask ) {
                if( mask & ( 1 << bit ) ) {
                    h[j][mask] += h[j][mask ^ ( 1 << bit )];
                }
            }
        }
    }

    for( int i = 0; i < M; ++ i ) f[i] = inf;
    f[0] = 0;

    for( int mask = 0; mask < M; ++ mask ) {
        int rem = all ^ mask;
        for( int x = rem; x; x &= x - 1 ) {
            int bit = x & -x;
            int j = __builtin_ctz( bit );
            f[mask | bit] = min( f[mask | bit], f[mask] + h[j][all ^ mask] );
        }
    }
    cout << f[all] << '\n';
}
```

时间复杂度为 $O(nm+m^2 2^m)$，空间复杂度为 $O(m2^m)$。

### [D-The Game](https://ac.nowcoder.com/acm/contest/133879/D)

> [!question] [D. The Game](https://ac.nowcoder.com/acm/contest/133879/D)  
> Alice 与 Bob 轮流选择尚未出现的整数，构造一个 $1\sim n$ 的排列 $p$。令 $f(p)$ 为 $p$ 的所有循环移位中字典序最小的一个。Alice 希望最小化 $f(p)$，Bob 希望最大化 $f(p)$，求双方最优时的最终排列。
>
> 数据规模：$T\le 10^5$，所有测试用例的 $n$ 之和不超过 $5\times 10^5$。

我们的最开始的判断是：关键一定与数字 $1$ 在什么时候被放下有关，并且奇偶性会影响最后是谁行动。然后发现 Alice 不一定刚开始就放 $1$。

由于 $1$ 是最小值，$f(p)$ 一定从 $1$ 开始。一旦写下 $1$，之后的每一步都会依次确定 $f(p)$ 当前靠前的未确定位置，因此 Alice 会选择剩余最小值，Bob 会选择剩余最大值。

反之同理，在 $1$ 出现之前，Alice 会倾向于消耗大的数字，使 Bob 接在 $1$ 后面的数尽可能小；Bob 会倾向于消耗小的数字，使 Alice 接在 $1$ 后面的数尽可能大。

若 $n$ 为奇数，落子顺序为 `ABA...ABA`。在环上 Alice 前后有两次连着的。如果 Bob 在自己的最后一回合仍不放 $1$，Alice 就可以首手放 $2$、末手放 $1$，使结果以 $1,2$ 开头。所以最优策略下，Bob 会在倒数第二步放下 $1$，Alice 再选择最后一个数。

若 $n$ 为偶数，落子顺序为 `ABA...BAB`。Alice 一旦放下 $1$，紧接着的数字便由 Bob 决定，Bob 会选择当前最大值，因此在最优策略下， Alice 不会提前主动放下 $1$。最优策略下，Bob 会将 $1$ 留到最后一步。

> 继续比较 $f(p)$ 的第二位，可以得到：若 $n=2m$，双方最优时这一位恰为 $m+1$；若 $n=2m+1$，这一位恰为 $m+2$。

按照上述规律构造实际落子顺序，再循环移动到 $1$ 开头即可。

```cpp title:"D" fold
void solve( ) {
    int n = read( );
    
    if( n == 1 ) {
        cout << 1 << '\n';
        return ;
    }

    vector<int> ans;
    if( n & 1 ) {
        ans.push_back( 2 );
        int k = n / 2 + 2;
        int a = k - 1, b = k + 1;
        for( int i = 1; i <= n / 2 - 1; ++ i ) {
            ans.push_back( a );
            ans.push_back( b );
            a --, b ++;
        }
        ans.push_back( 1 );
        ans.push_back( k );
    } else {
        int a = n / 2 + 1, b = n / 2;
        for( int i = 1; i <= n / 2; ++ i ) {
            ans.push_back( a );
            ans.push_back( b );
            a ++, b --;
        }
    }

    bool flag = 0;
    for( int x : ans ) {
        if( x == 1 ) flag = 1;
        if( flag ) cout << x << ' ';
    }
    for( int x : ans ) {
        if( x == 1 ) break;
        cout << x << ' ';
    }
    cout << '\n';

}
```

### [B-Quadratic Residue](https://ac.nowcoder.com/acm/contest/133879/B)

> [!question] [B. Quadratic Residue](https://ac.nowcoder.com/acm/contest/133879/B)  
> 给定正整数 $p$，构造正整数 $x_1,x_2,q$，满足 $1\le x_1<q$，$1\le x_2<p$，以及
> $$x_1^2\equiv p\pmod q,\qquad x_2^2\equiv q\pmod p.$$
>
> 数据规模：$T\le 10^4$，$2\le p\le 10^9$，$q\le 10^{12}$。

这题是我开的第一题，我一看这个二次剩余好眼熟，是不是直接套 `Cipolla` 算法呢？终于写到一道数论构造计算题了。

然后开始拿出草稿纸推柿子了，推了半天没有头绪，但是边上一个队暴力过了，我接受到了这个信号，开始思考。（又玩题意文字误导）

由于 $p$ 已经给定了，所以 $x_{1}^{2} \equiv p \pmod{q} \iff x_{1}^{2} - p = kq$，由于只需要构造一组特解，所以我们可以令 $k = 1$，然后就可以得到 $q = x_{1}^{2} - p$。

然后代入第二个同余式得到 $x_{2}^{2} \equiv q \pmod{p} \iff x_{2}^{2} \equiv x_{1}^{2} - p \pmod{p} \iff x_{2}^{2} \equiv x_{1}^{2} \pmod{p}$。

于是可以直接取 $x_{2} = x_{1} \bmod p$，由于 $q$ 值域过大，所以我们枚举 $x_{1}$，然后算出 $q$ 然后再算 $x_{2}$，直接暴力就行，因为值域小，能找到一个就行，所以就混过去了。

```cpp title:"B" fold
void solve( ) {
    ll p = read( );
    for( ll x1 = 1; ; ++ x1 ) {
        ll q = x1 * x1 - p;
        if( q <= x1 ) continue;
        ll x2 = x1 % p;
        if( x2 != 0 ) {
            cout << x1 << " " << x2 << " " << q << '\n';
            return;    
        }
    }
}
```

> 注：最多只会枚举到 $\mathcal{O}(\sqrt{p})$，所以可以大胆暴力。

## 三、补题记录

### [F-23 子序列](https://ac.nowcoder.com/acm/contest/133879/F)

> [!question] [F. 23 子序列](https://ac.nowcoder.com/acm/contest/133879/F)  
> 定义序列 $b$ 合法，当且仅当相邻元素满足 $2b_{i-1}\le b_i\le 3b_{i-1}$。给定序列 $a$，每次询问区间 $[l,r]$ 中最长合法子序列的长度。
>
> 数据规模：$n,q\le 2\times 10^5$，$1\le a_i\le 10^{18}$。

> 这题最后在封榜阶段尝试思路，赛后继续把代码修完。

其实我第一眼看到感觉非常像 [[LIS题型整理#9. 带前缀和值域限制的 LIS 询问]] 这一题。

但这题多了左端点的限制条件，当然我们还是尝试离线的做法，按照 $r$ 排序，然后逐渐扩展区间。

发现合法序列每往后走一步值至少翻一倍，而所有元素最大是 $1e18$，所以理论上合法子序列最长只有 $60$，因此可以将子序列长度作为一个较小的状态维度。

由于询问存在左端点限制，而按右端点 $r$ 离线处理后，子序列的终点位置自然不会超过 $r$，所以我们希望在状态中记录子序列能够达到的最大起点位置。

定义：$dp[len][v]$ 表示当前已处理前缀 $[1, r]$ 中，所有长度为 $len$、结尾值为 $v$ 的合法子序列，其起点位置的最大值。

> [!note] 状态支配
> 对于相同的长度与结尾值，后续能够进行的转移完全相同，而起点越靠后，能够满足的左端点询问越多，因此其他状态都会被它支配。

设当前值为 $x=a_i$，若它接在值为 $v$ 的元素之后，则必须满足 $\displaystyle 2v\le x\le 3v \iff \left\lceil\frac{x}{3}\right\rceil\le v\le \left\lfloor\frac{x}{2}\right\rfloor$。

因此转移为：$\displaystyle dp[len+1][x] = \max_{\left\lceil x/3 \right\rceil\le v\le\left\lfloor x/2\right\rfloor}  dp[len][v]$。

由于 $a_i$ 的值域达到 $10^{18}$，先对所有 $a_i$ 离散化。随后在线段树的值域轴上维护状态：每个节点的 $mx[len]$ 表示该节点对应的结尾值范围内，长度为 $len$ 的合法子序列的最大起点。

这样，对当前元素 $x$ 的一次转移就是：在线段树对应的值域区间中查询长度为 $len$ 的最大起点；接着将结果更新到结尾值 $x$、长度 $len+1$ 的状态中。

处理完前缀 $[1,r]$ 后，线段树根节点的：$mx[len]$ 表示所有结尾位置不超过 $r$ 的长度为 $len$ 的合法子序列中，最大的起点位置。

因此，询问区间 $[l,r]$ 中存在长度为 $len$ 的合法子序列，当且仅当 $mx[len] \ge l$，从大到小枚举 $len$，找到第一个满足条件的长度即可。

```cpp title:"F" fold
struct Disc {
/* ======================================== */
vector<ll> v;
void clear( ) { v.clear( ); }
void add( ll x ) { v.push_back( x ); }
void init( ) {
    sort( v.begin( ), v.end( ) );
    v.erase( unique( v.begin( ), v.end( ) ), v.end( ) );
}
int size( ) { return v.size( ); }
int low_idx( ll x ) { return lower_bound( v.begin( ), v.end( ), x ) - v.begin( ) + 1; }
int high_idx( ll x ) { return upper_bound( v.begin( ), v.end( ), x ) - v.begin( ); }
ll get_val( int idx ) { return v[idx - 1]; }
/* ======================================== */
} disc;

#define ls ( u << 1 )
#define rs ( u << 1 | 1 )

struct SegTree {
/* ======================================== */
struct Node {
    int l, r;
    int mx[MAXL + 1];
} tr[maxn << 2];

void push_up( int u, int len ) {
    tr[u].mx[len] = max( tr[ls].mx[len], tr[rs].mx[len] );
}

void build( int u, int l, int r ) {
    tr[u].l = l, tr[u].r = r;
    fill( tr[u].mx, tr[u].mx + MAXL + 1, 0 );
    if( l == r ) return;
    int mid = ( l + r ) >> 1;
    build( ls, l, mid );
    build( rs, mid + 1, r );
}

void modify( int u, int len, int pos, int val ) {
    if( tr[u].l == tr[u].r ) {
        tr[u].mx[len] = max( tr[u].mx[len], val );
        return;
    }
    int mid = ( tr[u].l + tr[u].r ) >> 1;
    if( pos <= mid ) modify( ls, len, pos, val );
    else modify( rs, len, pos, val );
    push_up( u, len );
}

int query( int u, int len, int l, int r ) {
    if( l > r ) return 0;
    if( l <= tr[u].l && tr[u].r <= r ) return tr[u].mx[len];
    int mid = ( tr[u].l + tr[u].r ) >> 1;
    int res = 0;
    if( l <= mid ) res = max( res, query( ls, len, l, r ) );
    if( mid < r ) res = max( res, query( rs, len, l, r ) );
    return res;
}
int ask( int len ) { return tr[1].mx[len]; }
/* ======================================== */
} seg;

struct Query {
    int l, r, idx;
    bool operator < ( const Query &oth ) const { return r < oth.r; }
};

ll a[maxn];
int pos[maxn], ql[maxn], qr[maxn];
int ans[maxn];

void solve( ) {
    int n = read( ), q = read( );
    
    disc.clear( );
    for( int i = 1; i <= n; ++ i ){
        a[i] = read( );
        disc.add( a[i] );
    }
    disc.init( );

    for( int i = 1; i <= n; ++ i ) {
        pos[i] = disc.low_idx( a[i] );
        ql[i] = disc.low_idx( ( a[i] + 2 ) / 3 );
        qr[i] = disc.high_idx( a[i] / 2 );
    }
    
    vector<Query> qs( q );
    for( int i = 0; i < q; ++ i ) {
        qs[i].l = read( ), qs[i].r = read( );
        qs[i].idx = i;
    }
    
    sort( qs.begin( ), qs.end( ) );
    
    seg.build( 1, 1, disc.size( ) );

    int cur = 0;
    int mxlen = 0;

    for( auto [l, r, idx] : qs ) {
        while( cur < r ) {
            ++ cur;
            int lstlen = mxlen;

            for( int len = 1; len <= lstlen && len < MAXL; ++ len ) {
                int st = seg.query( 1, len, ql[cur], qr[cur] );
                if( st == 0 ) break;
                seg.modify( 1, len + 1, pos[cur], st );
                mxlen = max( mxlen, len + 1 );
            }

            seg.modify( 1, 1, pos[cur], cur );
            mxlen = max( mxlen, 1 );
        }
        for( int len = mxlen; len >= 1; -- len ) {
            if( seg.ask( len ) >= l ) {
                ans[idx] = len;
                break;
            }
        }
    }
    
    for( int i = 0; i < q; ++ i ) {
        cout << ans[i] << '\n';
    }
}
```

## 四、本场留下什么

- 解题上：循环移位计数不能直接按匹配次数累加，要先明确每个匹配对应哪些合法切分点；状态压缩 DP 中应将状态转移与转移代价分开处理；构造规律补不上证明时，要尽早打表找反例。

- 实现上：继续注意 `long long`、差分区间的边界，以及 `all ^ mask` 与 SOS DP 子集和含义的对应；构造题写完后应先用小规模数据核对奇偶情况和循环移位结果。

- 后续：回炉循环移位、border 与匹配计数；整理 SOS DP 预处理状态转移代价；将 F 补入 [[LIS题型整理]]，并重新完整推导一次 D 的字典序博弈构造。
