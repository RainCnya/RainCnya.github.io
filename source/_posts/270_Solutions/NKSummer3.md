---
title: "[Solution] NKSummer3"
status: reviewed
categories:
  - 270_Solutions
abbrlink: 92910df0
date: 2026-07-24 00:00:00
updated: 2026-07-24 00:00:00
---

# [Solution] NKSummer3

## 一、比赛概况

- **时间**：2026.7.24 12:00 - 17:00
- **结果**：5 / 13 | Rk.291
- **做题顺序**：KLBAF
- **主要时间损耗**：解题 + 实现(被骗)

## 二、简要记录

### [K-转向导航](https://ac.nowcoder.com/acm/contest/133878/K)

> [!question] [K. 转向导航](https://ac.nowcoder.com/acm/contest/133878/K)  
> 给定平面上的一条折线路径，汽车依次经过 $n$ 个航点。对于每个中间航点，根据进入方向与离开方向的关系，判断汽车是向左转、向右转还是继续直行，并依次输出 `LEFT`、`RIGHT` 或 `STRAIGHT`。题目保证汽车不会掉头。
> 
> 数据规模：$T \le 500$，$3 \le n \le 10^5$，坐标绝对值不超过 $10^9$；所有测试用例的 $n$ 之和不超过 $2\times 10^5$。

简单的模拟题，学长秒了，我补充了一下方向的判定。

简单来说就是用两个向量的叉积：$\vec{u} \times \vec{v} = \mid \vec{u} \mid \mid \vec{v} \mid \sin\theta$，其中 $\theta$ 是从 $\vec{u}$ 转向 $\vec{v}$ 的有向角。由于两个向量的长度均为正，叉积的正负只取决于 $\sin\theta$：若 $\theta \in (0,180^\circ)$，说明逆时针旋转，叉积为正，对应向左转；若 $\theta \in (-180^\circ,0)$，叉积为负，对应向右转；叉积为 $0$ 时两个方向共线，而题目保证不会掉头，因此此时只能是继续直行。

> 我最开始尝试的是点积，但点积对应 $\cos\theta$，只能反映夹角大小，无法区分 $\theta$ 与 $-\theta$，因此不能判断左转还是右转。

```cpp title:"K" fold
struct Point { ll x, y; } a[maxn];

void solve( ) {
    int n = read( );

    for( int i = 1; i <= n; ++i ) {
        a[i].x = read( ), a[i].y = read( );
    }

    for( int i = 2; i <= n - 1; ++ i ) {
        ll x1 = a[i].x - a[i-1].x;
        ll y1 = a[i].y - a[i-1].y;
        ll x2 = a[i+1].x - a[i].x;
        ll y2 = a[i+1].y - a[i].y;

        ll cross = x1 * y2 - x2 * y1;
        if( cross > 0 ) cout << "LEFT" << ' ';
        else if( cross == 0 ) cout << "STRAIGHT" << ' ';
        else cout << "RIGHT" << ' ';
    }
    cout << '\n';
}
```

### [L-登山对决](https://ac.nowcoder.com/acm/contest/133878/L)

> [!question] [L. 登山对决](https://ac.nowcoder.com/acm/contest/133878/L)  
> 在一个高度互不相同的网格上进行博弈。双方轮流将旗帜移动到四相邻且高度严格更高的格子，无法移动者失败。给定若干个相互独立的起点询问，判断双方均采取最优策略时先手还是后手获胜。
> 
> 数据规模：$T \le 500$，单组 $n\times m \le 10^5$，$q \le 10^5$；所有测试用例的格子数之和与询问数之和均不超过 $10^5$。

这是个博弈问题，我最开始想着从局部最高点，也就是不存在更高相邻格子的点，往外跑 BFS 最短路，然后直接判断距离的奇偶性。看了样例没问题，交了后 WA 了一发，开始反思错误性。

这种做法的问题在于，博弈过程并不一定沿最短路径进行。一个点可能存在多个后继，当前玩家会主动选择对自己最有利的方向，因此胜负不能只由“到某个终止点的最短距离奇偶性”决定。

学长给了我一组反例：

```
3 3
9 3 7
2 1 5
6 4 8
```

跑了之后发现确实有问题，所以我们从博弈论的必胜态和必败态重新切入这题。首先，无法移动的点应当是**必败态**，因为轮到当前玩家时已经无路可走。若一个点存在某个方向能够走向必败态，那么当前玩家可以把必败局面留给对手，因此该点是必胜态；反之，若它的所有合法后继都是必胜态，那么无论怎么走都会把必胜局面交给对手，因此当前点是必败态。

又因为每次移动后高度都会严格上升，所有转移天然构成一个 DAG，不可能出现环。于是跑一遍记忆化搜索即可，最后 A 了。具体的博弈论证明留给 [[浅谈博弈论]] 专题，这里只做简要解释。

```cpp title:"L" fold
int dx[] = { 0, 1, 0, -1 };
int dy[] = { 1, 0, -1, 0 };

int n, m;

bool check( int x, int y ) {
    return 1 <= x && x <= n && 1 <= y && y <= m;
}

void solve( ) {
    n = read( ), m = read( );
    vector< vector<int> > a( n + 1, vector<int>( m + 1 ) );
    vector< vector<int> > dp( n + 1, vector<int>( m + 1, -1 ) );
    // 1 必胜 0 必败

    vector< pair<int,int> > end;
    for( int i = 1; i <= n; ++ i ) {
        for( int j = 1; j <= m; ++ j ) {
            a[i][j] = read( );
        }
    }

    for( int x = 1; x <= n; ++ x ) {
        for( int y = 1; y <= m; ++ y ) {
            bool ok = 0;
            for( int dir = 0; dir < 4; ++ dir ) {
                int nx = x + dx[dir], ny = y + dy[dir];
                if( !check( nx, ny ) ) continue;
                if( a[nx][ny] > a[x][y] ) ok = 1;
            }
            if( ok == 0 ) dp[x][y] = 0;
        }
    }

    auto dfs = [&]( auto dfs, int x, int y )->int {
        if( !check( x, y ) ) return 0;
        if( dp[x][y] != -1 ) return dp[x][y];
        int res = 0;
        int lose = 0;
        for( int dir = 0; dir < 4; ++ dir ) {
            int nx = x + dx[dir], ny = y + dy[dir];
            if( check( nx, ny ) && a[nx][ny] > a[x][y] ) {
                lose += dfs( dfs, nx, ny ) ^ 1;
            }
        }
        if( lose ) return dp[x][y] = 1;
        else return dp[x][y] = 0;
    };
    
    int Q = read( );
    for( int i = 1; i <= Q; ++ i ) {
        int xx = read( ), yy = read( );
        dp[xx][yy] = dfs( dfs, xx, yy );
        if( dp[xx][yy] == 1 ) cout << "First" << '\n';
        else cout << "Second" << '\n';
    }

}
```

### [B-再买一瓶](https://ac.nowcoder.com/acm/contest/133878/B)

> [!question] [B. 再买一瓶](https://ac.nowcoder.com/acm/contest/133878/B)  
> 一瓶饮料售价 $1$ 元。每喝完一瓶，以 $\dfrac{a}{b}$ 的概率获得 $c$ 元奖励，所得奖金可以继续购买饮料。小明初始有 $n$ 元，求他恰好喝完 $m$ 瓶饮料后花光所有钱的概率，对 $998244353$ 取模。
> 
> 数据规模：$T \le 2\times 10^5$，$1 \le n,m,c \le 2\times 10^6$，$0 \le a<b<998244353$。

这是一道数学题，我看了看，好像不是很难（有一点思路），于是尝试写写看。

假设中奖 $A$ 次，没中奖 $B$ 次，那么 $Ac + n = m$，$A + B = m$，由于 $m, n, c$ 都是已知的，所以可以直接算出来 $A$ 和 $B$。

于是我最开始的答案就写成了 $\displaystyle \left(  \frac{a}{b} \right)^A \cdot \left( 1 - \frac{a}{b} \right)^B$，然后我就直接交了，返回了一个非常诡异的错误 TLE，这就让我反思我的代码是不是又写 Dirty 了，但只有常数次的带 $\log$ 的快速幂，不应该是复杂度问题啊。

最后想到了一种可能性，如果我提前把钱花完了呢？显然我是不能贷款的，只能在最后第 $m$ 瓶的时候刚好花完，可是这又该怎么计算呢？

发现喝完 $m$ 瓶且中奖 $A$ 次的结果序列共有 $\binom{m}{A}$ 种，但并非每种排列都合法：如果中途资金提前变为 $0$，就是非法的了。设中奖时资金净变化为 $c-1$，未中奖时净变化为 $-1$。设各步变化为 $x_i$，则 $\displaystyle \sum_{i=1}^{m} x_{i} = -n$。原过程合法，当且仅当对于所有 $k<m$，都有 $\displaystyle n + \sum_{i=1}^{k}x_i > 0$。

将变化序列反转并取相反数，得到 $y_i=-x_{m-i+1}$。此时每个 $y_i\le 1$，总和为 $n$，且原过程合法等价于 $y$ 的所有前缀和都严格为正。对于任意固定的 $y$，它的 $m$ 个循环移位中恰好有 $n$ 个满足所有前缀和为正。

具体地，设前缀和最小值为 $M$，对每个高度 $M, M + 1, \dots, M + n - 1$，从该高度最后一次出现的位置之后开始循环，都能得到一个合法序列。因此合法序列占全部序列的比例为 $\dfrac{n}{m}$，合法方案数为 $\displaystyle \frac{n}{m} \binom{m}{A}$。

所以最后的答案是：$\displaystyle \frac{n}{m} \binom{m}{A} \left(  \frac{a}{b} \right)^A \cdot \left( 1 - \frac{a}{b} \right)^B$，多次查询直接预处理阶乘，然后 $\mathcal{O}(1)$ 查询组合数就行，重点关注分数的模运算。

```cpp title:"B" fold
ll qpow( ll a, ll k, ll mod ) { /* 模版代码略 */ }

ll nCr( ll n, ll r, ll p ) { /* 模版代码略 */ }

void solve( ) {
    ll n, m, c, a, b;
    cin >> n >> m >> c >> a >> b;

    if( (m - n) % c != 0 ) {
        cout << 0 << '\n';
        return ;
    }
    
    ll A = (m - n) / c;
    ll B = m - A;

    if( A < 0 || A > m ) {
        cout << 0 << '\n';
        return ;
    }

    ll cnt = ( n * qpow( m, mod - 2, mod ) ) % mod;
    cnt = ( cnt * nCr( m, A, mod ) ) % mod;

    ll ans = cnt * qpow( a, A, mod ) % mod;
    ans = ans * qpow( b - a, B, mod ) % mod;
    ans = ans * qpow( qpow( b, m, mod ), mod - 2, mod ) % mod;
    cout << ans << '\n';
}
```

### [A-比特掩码](https://ac.nowcoder.com/acm/contest/133878/A)

> [!question] [A. 比特掩码](https://ac.nowcoder.com/acm/contest/133878/A)  
> 定义 $f(x)$ 为 $x$ 的二进制表示中极长连续全一段的数量。维护 $n$ 个非负整数，每次将所有数统一与给定的 $x$ 做按位与、按位或或按位异或操作，并在每次操作后输出 $\sum_{i=1}^{n} f(a_i)$。
> 
> 数据规模：$n,m \le 3\times 10^5$，$0 \le a_i,x<2^{30}$。

这是一道位运算题，林学长从开赛就开始思考的问题，不过实际求解已经是 2 个多小时我写完别的题回来了，主要是我没什么头绪。

然后林学长发现了一个性质：在二进制最高位前补一个 $0$，从高位到低位枚举所有相邻二进制位。每出现一次 `01`，就意味着进入了一段新的 "极长连续全一段"，因此 `01` 的数量恰好等于 $f(x)$。

在此基础上，我直接想到了状态转移。对于每一对相邻位，只需要记录所有 $a_i$ 在 `00、01、10、11` 四种状态下分别有多少个。由于位运算操作都会独立作用于每个二进制位，所以一次整体操作也会把每个二位状态确定地转移到另一个二位状态，不需要分开维护每个元素的完整数值。

于是对每次操作把 $x$ 的对应两位拆出来，枚举四种旧状态完成转移即可，详见代码。

```cpp title:"A" fold
const int bit = 30;

int a[maxn];
int cnt1[70][4];
int cnt2[70][4];

int calc( int x, int i ) {
    return ( x & ( 1 << i ) ? 1 : 0 ) | ( x & ( 1 << (i + 1) ) ? 2 : 0 );
}

void solve( ) {
    int n;
    cin >> n;

    for( int i = 1; i <= n; ++ i ) {
        cin >> a[i];
        for( int j = 0; j < bit; ++ j ) {
            int msk = calc( a[i], j );
            cnt1[j][msk] ++;
        }
    }

    int m;
    cin >> m;
    for( int i = 1; i <= m; ++ i ) {
        memset( cnt2, 0, sizeof cnt2 );
        int opt, x;
        cin >> opt >> x;
        if( opt == 1 ) {
            for( int i = 0; i < bit; ++ i ) {
                int cur = calc( x, i );
                for( int pre = 0; pre < 4; ++ pre ) {
                    int nxt = cur & pre;
                    cnt2[i][nxt] += cnt1[i][pre];
                }
            }
        }
        else if( opt == 2 ) {
            for( int i = 0; i < bit; ++ i ) {
                int cur = calc( x, i );
                for( int pre = 0; pre < 4; ++ pre ) {
                    int nxt = cur | pre;
                    cnt2[i][nxt] += cnt1[i][pre];
                }
            }
        }
        else if( opt == 3 ) {
            for( int i = 0; i < bit; ++ i ) {
                int cur = calc( x, i );
                for( int pre = 0; pre < 4; ++ pre ) {
                    int nxt = cur ^ pre;
                    cnt2[i][nxt] += cnt1[i][pre];
                }
            }
        }
        int res = 0;
        for( int i = 0; i < bit; ++ i ) {
            res += cnt2[i][1];
        }
        cout << res << '\n';

        for( int i = 0; i < bit; ++ i ) {
            for( int j = 0; j < 4; ++ j ) {
                cnt1[i][j] = cnt2[i][j];
            }
        }
    }
}
```

### [F-Not Aqre 2](https://ac.nowcoder.com/acm/contest/133878/F)

> [!question] [F. Not Aqre 2](https://ac.nowcoder.com/acm/contest/133878/F)  
> 在一个 $n\times m$ 的网格中填入 $0,1,2$，要求任意两个共享边的格子所填数字不同。求合法填法数量，对 $998244353$ 取模。
> 
> 数据规模：$1 \le n<10$，$1 \le m<998244353$。

观察数据规模和题目要求，发现这非常像状压 DP。由于 $n<10$ 而 $m$ 极大，显然应该把一整列的 $n$ 个格子压成一个三进制状态，再从左到右按列转移；线性递推 $m$ 次不可行，而每一列之间使用同一个转移，因此自然想到矩阵快速幂。

然后由于这是一个 $3$ 进制的状压，写起来有点小破防，最后还是摸索出来了。不过枚举完发现每一列的合法状态一共有 $768$ 个 ( $n = 9$ 时 )，而矩阵快速幂的复杂度为 $S^{3} \log(m)$，这显然会超时吧。

于是我陷入了沉思，这真的不能用矩阵快速幂吗？可是我越看越像啊，经过打表之后发现，其实很多情况是等价的，比如 `2012` 和 `1201` 和 `0120`，它们只是把数字按某种规则映射了，但实际的转移是等价的。

于是我将三个数的全排列，把能够互相映射得到的状态归入同一个等价类，并保留字典序最小的状态作为代表元。在最坏的 $n = 9$ 情况下，压缩完状态数只有 $768 / (3!) = 128$，然后就是套矩阵快速幂，把状态转移的矩阵写好即可。

```cpp title:"F" fold
struct Matrix { /* 模版代码略 */ } A;
Matrix mqpow( Matrix a, ll k ) { /* 模版代码略 */ }

int pw3[12];
int n, m;

int get( int mask, int pos ) {
    return mask / pw3[pos] % 3;
}

bool check1( int mask ) {
    for( int j = 1; j < n; ++ j ) {
        if( get( mask, j ) == get( mask, j - 1 ) ) return 0;
    }
    return 1;
}

bool check( int msk1, int msk2 ) {
    for( int j = 0; j < n; ++ j ) {
        if( get( msk1, j ) == get( msk2, j ) ) return 0;
    }
    return 1;
}

int change( int mask ) {
    int p[3] = { 0, 1, 2 };
    int ans = 1e9;
    do {
        int cur = 0;
        for( int j = 0; j < n; ++ j ) {
            int x = get( mask, j );
            cur += p[x] * pw3[j];
        }
        ans = min( ans, cur );
    } while( next_permutation( p, p + 3 ) );
    return ans;
}

struct State { int mask, cnt; };

void solve( ) {
    cin >> n >> m;

    pw3[0] = 1;
    for( int i = 1; i <= n; ++ i ) pw3[i] = pw3[i - 1] * 3;
    int N = pw3[n];

    vector<int> valid;
    for( int mask = 0; mask < N; ++ mask ) {
        if( check1( mask ) ) valid.push_back( mask );
    }
    // cout << valid.size( ) << '\n';

    map<int, int> id;
    vector<State> state;

    for( int mask : valid ) {
        int cur = change( mask );
        if( !id.count( cur ) ) {
            id[cur] = state.size( );
            state.push_back({ cur, 0 });
        }
        state[id[cur]].cnt ++;
    }

    int S = state.size( );
    A = Matrix( S );

    for( int i = 0; i < S; ++ i ) {
        int pre = state[i].mask;
        for( int cur : valid ) {
            if( check( pre, cur ) ) {
                int j = id[change( cur )];
                A.m[i][j] ++;
            }
        }
    }

    Matrix B = mqpow( A, m - 1 );

    ll ans = 0;
    for( int i = 0; i < S; ++ i ) {
        for( int j = 0; j < S; ++ j ) {
            ans = ( ans + 1ll * state[i].cnt * B.m[i][j] ) % mod;
        }
    }
    cout << ans << '\n';
}
```

> 注：本题由于漏开 `long long` 痛吃一发 WA。

## 三、补题记录


### [G-矩阵标记](https://ac.nowcoder.com/acm/contest/133878/G)

> [!question] [G. 矩阵标记](https://ac.nowcoder.com/acm/contest/133878/G)  
> 给定一个 $n\times m$ 的数字网格。若两个值相同的格子 $(r_1,c_1)$ 与 $(r_2,c_2)$ 满足 $r_1<r_2$ 且 $c_1<c_2$，则将它们作为左上角和右下角所确定的整个矩形标记。求所有矩形的并集，即最终每个格子是否被标记。
>
> 数据规模：$n\times m\le 10^6$，$1\le a_{i,j}\le n\times m$。

这个题难点在哪？我直接对所有数排个序，然后暴力枚举所有可能的点对，做二维差分不就好了吗？我一开始还在想要不要用二维树状数组维护差分，但最后发现所有修改完成后只需要统一查询一次，所以直接使用静态二维差分即可。

但是考虑最坏情况，如果所有元素都相同，那么可能的点对数量可以达到 $O((nm)^2)$，显然无法暴力枚举。于是问题转化为：如何用更少的矩形表示同一个数产生的所有标记。

对于固定的数 $x$，将所有出现 $x$ 的位置按照行压缩。设不同的出现行为 $r_0<r_1<\dots<r_{k-1}$。

并记录 $mn_i$、$mx_i$ 分别表示第 $r_i$ 行中 $x$ 出现的最小列和最大列。进一步维护前缀最小值和后缀最大值即可，$\displaystyle pre_{i} = \min_{0 \le j \le i}(mn_{j})$，$\displaystyle suf_{i} = \max_{i \le j < k}(mx_{j})$。

考虑相邻出现行 $r_i,r_{i+1}$ 形成的分界。上方所有点中最靠左的列是 $pre_i$，下方所有点中最靠右的列是 $suf_{i+1}$。如果 $pre_i<suf_{i+1}$，那么这两个实际存在的点可以形成合法矩形，因此对 $[r_{i}, r_{i+1}] \times [pre_{i}, suf_{i+1}]$ 这个矩形进行一次二维差分。

因为 $r$ 数组里存的是所有出现 $x$ 的行，所以枚举每对相邻出现行形成的分界，就可以覆盖所有合法点对产生的矩形。

总复杂度为 $O(nm\log(nm))$。

```cpp title:"G" fold
struct Node {
    ll val;
    int r, c;
};

bool cmp( const Node& a, const Node& b ) {
    if( a.val != b.val ) return a.val < b.val;
    if( a.r != b.r ) return a.r < b.r;
    return a.c < b.c;
}

struct State {
    int row, mn, mx;
};

void solve( ) {
    int n = read( ), m = read( );
    int N = n * m;

    vector<Node> a;
    a.reserve( N );
    for( int i = 1; i <= n; ++ i ) {
        for( int j = 1; j <= m; ++ j ) {
            ll val = read( );
            a.push_back({ val, i, j });
        }
    }
    sort( a.begin( ), a.end( ), cmp );

    vector< vector<int> > dif( n + 2, vector< int >( m + 2 ) );
    auto modify = [&]( int x1, int y1, int x2, int y2 ) {
        if( x1 > x2 || y1 > y2 ) return;
        dif[x1][y1] ++, dif[x1][y2+1] --, dif[x2+1][y1] --, dif[x2+1][y2+1] ++;
    };

    vector<State> states;
    vector<int> pre, suf;

    for( int L = 0; L < N; ) {
        int R = L;
        while( R < N && a[R].val == a[L].val ) ++ R;

        states.clear( );
        for( int i = L; i < R; ) {
            int row = a[i].r;
            int mn = inf, mx = -inf;
            while( i < R && a[i].r == row ) {
                int col = a[i].c;
                mn = min( mn, col );
                mx = max( mx, col );
                ++ i;
            }
            states.push_back({ row, mn, mx });
        }

        int sz = states.size( );
        if( sz >= 2 ) {
            pre.resize( sz ), suf.resize( sz );

            pre[0] = states[0].mn;
            for( int i = 1; i < sz; ++ i ) {
                pre[i] = min( pre[i-1], states[i].mn );
            }

            suf[sz-1] = states[sz-1].mx;
            for( int i = sz - 2; i >= 0; -- i ) {
                suf[i] = max( suf[i+1], states[i].mx );
            }

            for( int i = 0; i + 1 < sz; ++ i ) {
                int x1 = states[i].row;
                int x2 = states[i+1].row;
                int y1 = pre[i];
                int y2 = suf[i+1];
                if( y1 < y2 ) modify( x1, y1, x2, y2 );
            }
        }
        L = R;
    }

    string ans( m, '0' );
    for( int i = 1; i <= n; ++ i ) {
        for( int j = 1; j <= m; ++ j ) {
            dif[i][j] += dif[i-1][j] + dif[i][j-1] - dif[i-1][j-1];
            if( dif[i][j] > 0 ) ans[j-1] = '1';
            else ans[j-1] = '0';
        }
        cout << ans << '\n';
    }
}
```

### [J-树.zip](https://ac.nowcoder.com/acm/contest/133878/J)

> [!question] [J. 树.zip](https://ac.nowcoder.com/acm/contest/133878/J)  
> 给定一棵以 $1$ 为根的树，需要在相同点集上构造一棵新树。每个非根节点在新树中的父亲必须是它在原树中的祖先；同时给出若干约束 $(u,v)$，要求新树中 $v$ 是 $u$ 的祖先。求新树所有节点深度之和的最小值。
>
> 数据规模：$2\le n\le 5\times 10^5$，$0\le q\le 5\times 10^5$；原树满足 $p_i<i$，且每个约束中的 $v$ 都是 $u$ 在原树中的祖先。

最开始的思路是对于每个点，只记录它最深的限制位置；如果没有限制，就令它的限制为根节点，然后考虑转移不就好了吗？

但这样无法传递中间的祖先关系。例如原树为 $1 \leftarrow 2 \leftarrow 3 \leftarrow 4$，有两个限制条件 $(4,2), (4,3)$，如果只记录 $lim_{4} = 3$，点 $3$ 没有限制条件，于是令 $lim_{3} = 1$，然后 $2$ 这一点就偏移了，这么做无法保证 $2$ 一定在 $2 \leftarrow 3 \leftarrow 4$ 上。

所以对于这些限制，我们需要进行二次压缩。对于每个点 $u$，最好将它涉及的所有祖先约束真正串成一条链： $u \to lim_{u} \to lim_{lim_{u}} \to \dots \to 1$。

接着考虑转移。假设某个点 $u$ 的限制按照原树深度排列为 $u \to v_{1} \to v_{2} \to \dots \to v_{k}$，其中 $v_{1}$ 最深，$v_{k}$ 最浅；显然最优的新树中，应当令 $fa[u] = v_{1}, fa[v_{1}] = v_{2}, \dots$。

也就是说，需要从较深的约束开始，逐渐向较浅的祖先连接。题目满足 $p_i<i$，所以祖先编号一定更小，按照约束中的 $v$ 从大到小处理，就等价于按照深度从深到浅处理。

这里用并查集维护已经形成的强制祖先链。`find(u)` 表示当前包含 $u$ 的链中，尚未继续向上连接的最上端。

处理约束条件 $(u, v)$ 时，令 `x = find( u )`。处理约束 $(u,v)$ 时，令 `x = find(u)`。若 $x=v$，说明 $v$ 已经在这条链上；否则当前结构为 $u \to \dots \to x$，而约束要求 $v$ 也是 $u$ 的祖先，因此 $v$ 必须位于 $x$ 上方。

直接令 $fa[x]=v$ 只增加一层祖先关系，因此是最优的；连接后令 `dsu[x]=v`，表示这条强制祖先链继续向上延伸到了 $v$。

所有约束处理完后，对于仍未确定父亲的节点，直接将其接到根节点 $1$ 上即可。

```cpp title:"J" fold
int dsu[maxn];
int fa[maxn];
int dep[maxn];
int p[maxn];

vector<int> need[maxn];

int find( int x ) {
    int rt = x;
    while( dsu[rt] != rt ) rt = dsu[rt];

    while( dsu[x] != x ) {
        int nxt = dsu[x];
        dsu[x] = rt;
        x = nxt;
    }
    return rt;
}

void solve( ) {
    int n = read( ), q = read( );

    for( int i = 2; i <= n; ++ i ) p[i] = read( );

    for( int i = 1; i <= n; ++ i ) dsu[i] = i;

    for( int i = 1; i <= q; ++ i ) {
        int u = read( ), v = read( );
        need[v].push_back( u );
    }

    for( int v = n; v >= 1; -- v ) {
        for( int u : need[v] ) {
            int x = find( u );
            if( x == v ) continue;
            fa[x] = v;
            dsu[x] = v;
        }
    }

    for( int i = 2; i <= n; ++ i ) {
        if( fa[i] == 0 ) fa[i] = 1;
    }

    ll ans = 0;
    for( int i = 2; i <= n; ++ i ) {
        dep[i] = dep[fa[i]] + 1;
        ans += dep[i];
    }
    cout << ans << '\n';
}
```

## 四、本场留下什么

- 解题上：不能只根据终态或最短路径判断整个过程是否合法；当暴力枚举点对或状态数过大时，应继续寻找答案真正依赖的信息，例如行极值、颜色对称性和强制祖先链。

- 实现上：继续注意 `long long`、递归深度与多测清空；遇到异常的 TLE / WA 时，先区分是复杂度、模型遗漏还是代码实现问题，不要只盯着表面。

- 后续：回炉基础博弈与循环移位计数；整理等价类状态压缩、二维差分覆盖矩形，以及并查集维护强制关系链这几种方法。