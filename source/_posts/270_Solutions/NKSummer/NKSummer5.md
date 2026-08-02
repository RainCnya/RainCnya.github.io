---
title: '[Solution] NKSummer5'
status: reviewed
categories:
  - 270_Solutions
  - NKSummer
abbrlink: 7bf2a8c5
date: 2026-07-31 00:00:00
updated: 2026-08-01 00:00:00
---

# [Solution] NKSummer5

## 一、比赛概况

- **时间**：2026.7.31 12:00 - 17:00
- **结果**：5 / 14 | Rk.325 | 罚时 702
- **做题顺序**：NKELI | C
- **主要时间损耗**：E 的重复枚举导致 TLE，L 的单行 / 单列分支漏 `return`，I 的数组上界开小；最后在 C 的进位构造上没有补完整体顺序

## 二、简要记录

### [N-欢迎来到哈尔滨工业大学](https://ac.nowcoder.com/acm/contest/133880/N)

签到题。

### [K-序列变换（mex version）](https://ac.nowcoder.com/acm/contest/133880/K)

> [!question] [K. 序列变换（mex version）](https://ac.nowcoder.com/acm/contest/133880/K)  
> 对环形序列反复进行变换：每个位置变成自身及左右相邻三个数的 mex，求第 $k$ 次变换后的序列。
>
> 数据规模：$1\le n,k\le 10^6$，$0\le a_i\le 10^9$。

观察发现，虽然值域很大，但是每次 $\operatorname{mex}$ 最多取到三个数，于是我发现最后只用考虑 $0, 1, 2, 3$ 四个值。

但是这还不足以 AC，于是我在手搓了几个样例之后，发现，几乎所有的情况都会陷入周期为 2 的循环中。然后发现本题的 $k \sim 1e6$ 非常小，可以直接模拟，直到找到周期，然后 $\mathcal{O}(1)$ 算出来最终的序列。

```cpp title:"K" fold
void solve( ) {
    int n = read( ), k = read( );

    vector<int> cur(n);
    for( int &x : cur ) x = read( );

    set< vector<int> > mp;
    mp.insert( cur );

    vector<int> lst(n);
    for( int i = 1; i <= k; ++ i ) {
        vector<int> nxt(n);
        for( int j = 0; j < n; ++ j ) {
            set<int> vis;
            vis.insert( cur[j%n] );
            vis.insert( cur[(j+1)%n] );
            vis.insert( cur[(j+n-1)%n] );
            int mex = 0;
            while( vis.count( mex ) ) mex ++; 
            nxt[j] = mex;
        }
        if( mp.count( nxt ) ) {
            if( (k - i) & 1 ) {
                for( int x : cur ) cout << x << " ";
                cout << '\n';
                return;
            }
            else {
                for( int x : lst ) cout << x << " ";
                cout << '\n';
                return;
            }
        }
        mp.insert( nxt );
        lst = cur;
        cur = nxt;
    }

    for( int x : cur ) cout << x << " ";
    cout << '\n';
}
```

> 证明略，因为我看不懂题解的原理，我也感觉这类题目没法严格证明，除非我是高斯转世好吧。

### [E-古明地恋与非积辈](https://ac.nowcoder.com/acm/contest/133880/E)

> [!question] [E. 古明地恋与非积辈](https://ac.nowcoder.com/acm/contest/133880/E)  
> 按所有非平凡乘法分解的函数值乘积取 mex，递归定义 $g(n)$，求 $\displaystyle \sum_{i=1}^N g(i)c^i$。
>
> 数据规模：$1\le N\le 10^7$，$1\le c<998244353$。


完全积性函数满足：$f(ab)$ = $f(a) \cdot f(b)$，不要求互质。假设有 $n = w_{1}w_{2}\dots w_{k}$，那么一定满足 $f(n)=f(w_{1}) f(w_{2}) \dots f(w_{k})$。反过来就是题目定义的 **完全非积性函数**： $g(n) \neq g(w_{1}) g(w_{2}) \dots g(w_{k})$。

例如 $12 = 2 \cdot 6 = 3 \cdot 4 = 2 \cdot 2 \cdot 3$，那么希望同时满足 $g(12) \neq g(2)g(6)$, $g(12) \neq g(3)g(4)$, $g(12) \neq g(2)^{2}g(3)$。我们希望对 $n$ 的每一种非平凡分解都不相等，所以这个 $\operatorname{mex}$ 其实就是取到所有不相等的值中最小的那一个。

打了个表，发现可能和质因数的个数有关：$g(n) = \Omega(n)$，但是在第二个样例 WA 了。开始反思为什么不对，发现 $16 = 2^4$，而 $\Omega(16)=4$，$g(16)=5$。

发现虽然 $g(n) \neq \Omega(n)$，但是 $\Omega(i)$ 相同的值，$g(i)$ 也相同；$n \le 1e7$，所以 $\Omega(n) \le \log_{2}(n) \le 23$，于是我们可以给这个映射关系打个表，记作 $g(n) = f(\Omega(n))$。

由于这个范围很小，我们可以直接写一个 dfs 把 $f$ 的映射算出来，接着用线性筛把 $\Omega$ 预处理出来，就可以回答了。

然后我 $T$ 了一发，因为 DFS 没剪枝，而且又写了一个类似 $\mathcal{O}(nloglogn)$ 的埃氏筛，导致复杂度有点大。

```cpp title:"E" fold
int f[30];
set<int> mex;

void dfs( int cur, int sum, int k, int lst ) {
    if( cur == 0 ) {
        mex.insert( sum );
        return;
    }
    for( int i = lst; i <= cur && i < k; ++ i ) {
        dfs( cur - i, sum * f[i], k, i );
    }
}

void init2( ) {
    f[1] = 1;
    for( int i = 2; i <= 23; ++ i ) {
        mex.clear( );
        mex.insert( 0 );
        dfs( i, 1, i, 1 );
        f[i] = 0; // mex
        while( mex.count( f[i] ) ) ++ f[i];
    }
}

int pri[maxn], pcnt;
bool isp[maxn];
int g[maxn];

void init( ll N ) {
    pcnt = 0;
    fill( isp + 2, isp + N + 1, 1 );
    for( ll i = 2; i <= N; ++ i ) {
        if( isp[i] ) pri[++ pcnt] = i, g[i] = 1;
        for( ll j = 1; j <= pcnt && i * pri[j] <= N; ++ j ) {
            ll p = pri[j];
            isp[i * p] = 0;
            g[i * p] = g[i] + 1;
            if( i % p == 0 ) break;
        }
    }
}

void solve( ) {
    int n = read( );
    ll c = read( );
    init( n + 1 );
    init2( );
    g[1] = 1;

    ll res = 0;
    ll ci = 1;
    for( int i = 1; i <= n; ++ i ) {
        ci = ( ci * c ) % mod;
        res = ( res + f[g[i]] * ci ) % mod;
        // cout << i << ' ' << g[i] << '\n';
    }
    cout << res << '\n';
}
```

### [L-又一个矩阵问题](https://ac.nowcoder.com/acm/contest/133880/L)

> [!question] [L. 又一个矩阵问题](https://ac.nowcoder.com/acm/contest/133880/L)  
> 每次选择一条从左上角到右下角、只向右或向下的路径，将路径上所有格子加一，求把矩阵变成全相等所需的最少操作次数。
>
> 数据规模：$T\le 5000$，$\sum n,\sum m\le 5000$，$|a_{i,j}|\le 10^9$。

最开始我的想法是用 DP 写，然后学长说用二分答案，这个数据规模也挺像的。

我说好像有道理，于是考虑如何二分答案，我的理解是把所有的格子划分成两块区域，从中间的分界线向两个端点汇聚，然后判断合不合法就好了。

但是写着写着发现不对劲了，好像答案跟反对角线相关，每一层得到的增量总量都是相同的。于是我发现第一条反对角线和第二条反对角线之间有一些微妙的规律。

因为每一条路径一定经过 $(1, 1)$，而且一定会经过 $(1, 2)$ 或者 $(2, 1)$ 这两个点，假设操作次数为 $k$ 之后三个点都变成了 $X$，那么 $a_{1,1} + k = X$，且 $k = (X - a_{1, 2}) + (X - a_{2,1})$。

于是消元 $X$ 后，我们就得到了操作次数 $k = a_{1,2} + a_{2,1} - 2a_{1,1}$，发现实际上给出的初始格子就能推出所谓的操作总次数，所以根本不需要二分答案。

然后我们对于这个修改后的格子情况做一个 `check` 就可以了，我这里按照反对角线逐渐往下流，如果某一步需要的右流量为负，或者超过当前流量，或者甚至有流量没有流到下一层，就是不合法的。

最后特判一下 $n = 1$ 和 $m = 1$ 的情况即可。

```cpp title:"L" fold
int n, m;
ll a[maxn][maxn];

bool valid( int y ) { return y >= 1 && y <= m; }

bool check( ll all ) {
    ll val = a[1][1] + all;

    for( int i = 1; i <= n; ++ i ) {
        for( int j = 1; j <= m; ++ j ) {
            a[i][j] = val - a[i][j];
            if( a[i][j] < 0 ) return 0;
        }
    }
    if( a[1][1] != all || a[n][m] != all ) return 0;

    for( int k = 2; k < n + m; ++ k ) {
        ll down = 0; // 下
        for( int i = 1; i <= n; ++ i ) {
            int j1 = k - i, j2 = k + 1 - i;
            ll cur = valid( j1 ) ? a[i][j1] : 0;
            ll nxt = valid( j2 ) ? a[i][j2] : 0;
            
            ll right = nxt - down;
            if( right < 0 || right > cur ) return 0;
            // 流量不够 或者 超了
            down = cur - right; // 剩余只能向下流
        }
        if( down != 0 ) return 0;
        // 流量不刚好
    }
    return 1;
}

void fail( ) { cout << -1 << '\n'; }

void solve( ) {
    n = read( ), m = read( );
    for( int i = 1; i <= n; ++ i ) {
        for( int j = 1; j <= m; ++ j ) {
            a[i][j] = read( );
        }
    }

    if( a[1][1] != a[n][m] ) return fail( );

    if( n == 1 ) {
        bool ok = 1;
        for( int j = 1; j <= m; ++ j ) {
            if( a[1][j] != a[1][1] ) ok = 0;
        }
        if( !ok ) return fail( );
        else cout << 0 << '\n';
        return ;
    }

    if( m == 1 ) {
        bool ok = 1;
        for( int i = 1; i <= n; ++ i ) {
            if( a[i][1] != a[1][1] ) ok = 0;
        }
        if( !ok ) return fail( );
        else cout << 0 << '\n';
        return ;
    }

    ll all = a[1][2] + a[2][1] - 2 * a[1][1];

    if( all < 0 ) return fail( );

    if( check( all ) ) cout << all << '\n';
    else fail( );
}
```

### [I-题列序 2](https://ac.nowcoder.com/acm/contest/133880/I)

> [!question] [I. 题列序 2](https://ac.nowcoder.com/acm/contest/133880/I)  
> 长度为 $N=2^n-1$ 的 01 串依次进行编号为 $x$ 的操作；执行操作时选择 $y,z$ 满足 $x=y\oplus z$，同时翻转 $x,y,z$，构造方案使最终至多剩一个 $1$。
>
> 数据规模：$T\le 1000$，$n\le 20$，所有测试的 $\sum N\le 2\times 10^6$。

我最开始的观察方向是 $1$ 和 $y$ 异或，它会得到一个跟 $y$ 相差 $1$ 的值 $z$；$2$ 和 $y$ 异或，就会得到一个差值为 $2$ 的值 $z$，于是考虑对于所有的 $1$ 处理他们之间的距离。

但是这样写只会陷入无尽的模拟中，而且不能保证正确性。那怎么办？接着一阵思考后，回顾题目条件，发现构造方案允许至多剩余一个 $1$，为什么是一个 $1$ 呢？

注意到 $x = y \oplus z$，所以 $x \oplus y \oplus z = 0$，一次操作翻转的位置编号异或和为 $0$。也就是说所有值为 $1$ 的位置编号异或和始终不变。

不妨令 $S$ 为原数组中所有值为 $1$ 的位置编号异或和。若 $S=0$，最终状态可以是全 $0$；反之若 $S \ne 0$，最后留下来的那个 $1$，不就就位于 $S$ 这个位置吗？

那问题就转化为了：清空一个所有 $1$ 的位置编号异或和为 $0$ 的 01 串，接下来考虑如何消元。

由于本题不同的操作之间彼此可以交换，所以我们可以尝试从高位到低位翻转位置。而我们希望每次操作都只会影响到比它小的两个位置，于是考虑取 $x$ 的最高位的 $1$，因为异或掉这个 $y$，得到的 $z$ 一定更小。

> 当然也可以取 $lowbit(x)$，也是可以实现的，只要能让得到的 $z$ 变小就行。

消元结束后，只可能剩下编号为 $1, 2, 4, 8, \dots$ 的位置，而又因为整个过程中所有值为 $1$ 的位置编号异或和始终为 $0$，所以这些二次幂位置只能全部为 $0$。

WA 了一发是因为数组开小了 $2^{20}-1=1048575>10^6+5$，扩到 `2e6 + 5` 就 AC 了。

```cpp title:"I" fold
int a[maxn];
int ans[maxn];

void solve( ) {
    int n = read( );
    int N = (1 << n) - 1;

    for( int i = 1; i <= N; ++ i ) ans[i] = 0;

    ll xorsum = 0;

    string s;
    cin >> s;
    
    for( int i = 1; i <= N; ++ i ) {
        a[i] = ( s[i-1] == '1' ? 1 : 0 );
        if( a[i] == 1 ) xorsum ^= i;
    }
    a[xorsum] ^= 1;

    for( int i = N; i >= 1; -- i ) {
        if( ( i & ( i - 1 ) ) == 0 ) continue; // 2^k
        if( a[i] == 0 ) continue;
        int pos = 1;
        while( ( pos << 1 ) < i ) pos <<= 1;
        ans[i] = pos;
        a[i] ^= 1, a[pos] ^= 1, a[i ^ pos] ^= 1;
    }

    for( int i = 1; i <= N; ++ i ) {
        cout << ans[i] << " ";
    }
    cout << '\n';
}
```

## 三、补题记录

### [C-数字游戏](https://ac.nowcoder.com/acm/contest/133880/C)

> [!question] [C. 数字游戏](https://ac.nowcoder.com/acm/contest/133880/C)  
> 在 $B$ 进制下构造三个由 $0\sim B-1$ 组成的排列 $P,Q,R$，满足 $[P]_B+[Q]_B=[R]_B$，并且每一列的三个数字两两不同。
>
> 数据规模：$2\le B\le 10^6$。

从竖式加法的进位入手，设第 $i$ 位产生的进位为 $c_{i}$，那么就有 $p_{i} + q_{i} + c_{i+1} = r_{i} + Bc_{i}$。由于每个数位都在 $[0, B-1]$ 所以进位 $c_{i} \in [0,1]$。

而 $P, Q, R$ 都是 $0, 1, \dots, B-1$ 的排列，所以它们的数位和 $S = B \cdot (B - 1) / 2$，然后我们把等式相加，可以得到：$2S + C = S + BC$。

整理得 $C = B / 2$，因此一个合法构造中必须恰好有一半位置发生进位。$B$ 必须为偶数；$B=2$ 时不可能，所以只有偶数 $B\ge 4$ 可能有解。

大胆尝试令 $P = 012345$，假设我让所有奇数位被进位呢？也就是 $Q = 251403$，$R = 304152$，于是我就交了，WA 了一发。

赛后发现这样构造可能存在某一位 $p_{i} = q_{i}$，而这是不满足题意的，那应该如何修改呢？设 $B = 2k$，令 $R_{i} = B - 1 - P_{i}$，使得它们对称，然后根据 $P_{i}$ 位于高半区还是低半区考虑进位。

已知 $P, R$ 和进位后，就可以反推出 $Q$ 了。正常情况下让 $P$ 的低半区和高半区交替出现即可：$P = (0, k, 1, k +1, \dots)$。

但是当 $k \equiv 1 \pmod{3}$ 时，设 $k = 3h + 1$，发现冲突出现在 $h, 2h, h + k, 2h + k$ 这几个数字上。于是我们人为修改一下高低交替 $L,L,L,H,H,H,L,H,L,H$，就可以修补原本的逻辑了，大体代码长下面这样：

```cpp title:"C1" fold
void solve( ) {
    int n = read( );
    if( n & 1 || n == 2 ) {
        cout << -1 << '\n';
        return ;
    }

    vector<int> a, b(n), c(n);
    int k = n / 2;

    if( k % 3 != 1 ) {
        for( int x = 0; x < k; ++ x ) {
            a.push_back( x );
            a.push_back( x + k );
        }
    }
    else {
        int h = (k - 1) / 3;
        a.push_back( 2 * h );
        a.push_back( h );
        a.push_back( 0 );
        a.push_back( 2 * h + k );
        a.push_back( h + k );
        a.push_back( k );

        for( int x = 1; x < k; ++ x ) {
            if( x == h || x == 2 * h ) continue;
            a.push_back( x );
            a.push_back( x + k );
        }
    }

    for( int i = 0; i < n; ++ i ) {
        c[i] = n - 1 - a[i];
        b[i] = c[i] - a[i];
        if( i + 1 < n && a[i + 1] >= k ) b[i] -= 1;
        if( a[i] >= k ) b[i] += n;
    }

    for( int x : a ) cout << x << ' ';
    cout << '\n';

    for( int x : b ) cout << x << ' ';
    cout << '\n';

    for( int x : c ) cout << x << ' ';
    cout << '\n';
}
```

官方题解给出了另一种思路。首先通过求和发现恰好有 $B / 2$ 次进位，假设 $P$ 是一个排列，如果想要 $Q$ 是一个排列，最简单的方式就是让它成为 $P$ 的循环平移，即 $q_{p} = (p - t) \bmod B$。

这样问题似乎就变成了选择一个合适的偏移量 $t$，但在考虑 $t$ 之前，我们还需要保证得到的 $R$ 是一个排列。

设这一列收到的进位是 $c_{p} \in \{0, 1\}$，那么 $r_{p} \equiv p + q_{p} + c_{p} \equiv 2p - t + c_{p} \pmod{B}$。令 $B = 2n$，由于$2(p + n) \equiv 2p \pmod{B}$，所以 $p$ 与 $p+n$ 在 $2p\bmod B$ 意义下会得到相同的结果，仅靠一个常数 $t$ 无法让 $R$ 成为完整的排列。

但正好 $c_p\in \{0,1\}$，可以用它来区分这一对相同的结果。自然地，我们会想到把 $p$ 和 $p+n$ 配对，并令这一对的进位互补：$c_{p+n} = 1 - a_{p}$，那么这一对生成的两个结果 $r_{p}, r_{p+n}$ 就是两个相邻的数 $2p-t, 2p-t+1 \pmod{B}$。

当 $p = 0, \dots n - 1$ 时，这些相邻数对刚好可以覆盖 $0, \dots , B - 1$，于是 $R$ 也是个排列。

接着我们尝试 $t = 1$，发现不成立，对于 $p = 0$ 这一列，若 $c_{0} = 0$，会有 $q_{0} = r_{0}$；若 $c_{0} =1$，会有 $p = r_{0}$。于是尝试 $t = 2$，此时 $r_{p} \equiv 2p - 2 + a_{p} \pmod{B}$，只有几个特殊的位置会对进位值有特殊要求：$c_{0} = 1, c_{1} = 0, c_{2} = 1, c_{B-1} = 0$。

所以为了满足 $c_{p+n} = 1 - c_{p}$，我们构造 $\displaystyle c_{p} = \begin{cases} 1, p < n \\ 0, p \ge n \end{cases}$，但是对于 $c_{1}$ 来说，它是不满足的，所以为了不破坏互补关系，我们人为将 $c_{1}$ 和 $c_{n+1}$ 交换一下。

至此，我们已经构造了 $B$ 个合法的列 $(p,q_p,r_p)$，而且每一列还有收到的进位 $c_p$ 和产生的进位 $d_p$。不过，我们目前只构造出了每一列的内容，还不知道这些列在最终数字中应该按照什么顺序排列。

所以我们尝试把它复原，假设某一列放在右边，产生了进位 $d_{p}$，那么它左边的列一定收到相同的进位，于是我们连一条边 $c_{p} \to d_{p}$，由于图中只有两个点，每一条边对应一列，所以我们把所有列首尾相连即可。这刚好就是欧拉回路的定义。

```cpp title:"C2" fold
void solve( ) {
    int B = read( );
    if( B & 1 || B == 2 ) {
        cout << -1 << '\n';
        return ;
    }

    if( B == 4 ) {
        cout << "0 1 2 3" << '\n';
        cout << "1 3 0 2" << '\n';
        cout << "2 0 3 1" << '\n';
        return ;
    }

    int n = B / 2;

    vector<int> q(B), r(B), c(B), d(B);

    for( int p = 0; p < B; ++ p ) {
        q[p] = (p - 2 + B) % B;
        c[p] = (p < n);
    }
    swap( c[1], c[n+1] );

    vector<int> adj[2];

    for( int p = 0; p < B; ++ p ) {
        int sum = p + q[p] + c[p];
        r[p] = sum % B;
        d[p] = sum / B;
        adj[c[p]].push_back( p );
    }

    vector<int> cur( 2 );
    vector<int> order;

    vector<pair<int, int>> stk;
    stk.push_back({ 0, -1 });

    while( !stk.empty( ) ) {
        int u = stk.back( ).first;

        if( cur[u] < (int)adj[u].size( ) ) {
            int p = adj[u][cur[u] ++];
            stk.push_back({ d[p], p });
        }
        else {
            int p = stk.back( ).second;
            stk.pop_back( );
            if( p != -1 ) order.push_back( p );
        }
    }

    for( int i = 0; i < B; ++ i ) {
        cout << order[i] << ' ';
    }
    cout << '\n';

    for( int i = 0; i < B; ++ i ) {
        cout << q[order[i]] << ' ';
    }
    cout << '\n';

    for( int i = 0; i < B; ++ i ) {
        cout << r[order[i]] << ' ';
    }
    cout << '\n';
}
```

## 四、本场留下什么

- 解题上：面对递归定义、路径操作和异或构造时，先寻找能压缩原问题的分类量、不变量或守恒关系。E 将整数压缩为质因子总数 $\Omega(n)$，L 将路径操作转成反对角线之间的流量传递，I 则用位置编号异或和确定最终剩余状态；构造题还要区分“局部元素合法”和“全局状态能够衔接”，C 最后缺少的正是进位状态之间的整体顺序。

- 实现上：本场三次罚时分别暴露了复杂度、分支控制和数组上界三个基础问题。整数拆分必须去重，不能只看状态范围很小就忽略重复枚举；特殊分支输出后必须立即结束；涉及 $2^n-1$ 时应按真实最大值开数组，而不是用十进制量级近似估计。

- 后续：回炉整数拆分枚举、线性筛递推 $\Omega$ 与有限状态周期；保留 I 作为“异或不变量 + 从高位向低位消元”的代表题，保留 L 作为“反对角线分层流量”的代表题；将 C 的“局部列构造—进位状态图—欧拉回路恢复顺序”整理进构造题方法记录。