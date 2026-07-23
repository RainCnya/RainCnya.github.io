---
title: '[Solution] NKSummer2'
status: reviewed
categories:
  - 270_Solutions
abbrlink: e5963d66
date: 2026-07-22 00:00:00
updated: 2026-07-22 00:00:00
---

# [Solution] NKSummer2

## 一、比赛概况

- **时间**：2026.7.22 12:00 - 17:00
- **结果**：4 / 13 | Rk.576
- **做题顺序**：MNBG
- **主要时间损耗**：解题

## 二、简要记录

### [M-Maybe Connected](https://ac.nowcoder.com/acm/contest/133877/M)

> [!question] [M. 可能连通罢](https://ac.nowcoder.com/acm/contest/133877/M)  
> 在一个初始没有边的 $n$ 个结点的无向图中加入恰好 $m$ 条边，要求图中不存在自环和重边。最大化满足“两个结点连通，但二者之间没有直接连边”的无序点对数量。
> 
> 数据规模：$T \le 10^4$，$n \le 10^5$，$0 \le m \le \min\left(\dfrac{n(n-1)}2,10^9\right)$。

看到这个 T 组数据和这个 $n$  的规模，不难想本题思路在 $\mathcal{O}(1)$ 出公式。

最开始考虑的是 $m=n-1$ 的情况，并尝试按照图的形态进行分类。这里一开始认为最优情况是一条链，但实际上只要 $n-1$ 条边能够连通全部 $n$ 个点，得到的就是一棵树。

此时所有点对都互相连通，而直接相连的点对数量固定为 $n-1$，所以无论这棵树具体长什么样，答案都是：$\displaystyle \binom{n}{2} - (n - 1)$。于是我发现图的具体结构不重要，重要的是最多有多少个点在同一个连通块内。

本题的连通块中最多的点数量就是 $V = \min(n, m + 1)$，那么用所有的无序点对 $\binom{V}{2} - m$ 就可以算出来 “互相连通，但没有直接相连” 的点对数量。

> 这里 WA 了一发，因为没开 `long long`，又吃一堑（恼）。

```cpp title:"M" fold
void solve( ) {
    ll n, m;
    cin >> n >> m;
    n = min( n, m + 1 );
    ll ans = n * (n - 1) / 2 - m;
    cout << ans << '\n';
}
```

### [N-Narrow to Median](https://ac.nowcoder.com/acm/contest/133877/N)

> [!question] [N. 收拢至中位数](https://ac.nowcoder.com/acm/contest/133877/N)  
> 给定一个数组，恰好选择其中 $k$ 个元素，并将它们全部替换为这 $k$ 个元素的中位数，求操作后整个数组元素之和的最大值。
> 
> 数据规模：$T \le 10^4$，$1 \le k \le n \le 2\times 10^5$，$a_i \le 10^9$；所有测试用例的 $n$ 之和不超过 $2\times 10^5$。

> 这题不难，卡了初始化，属于实现问题。

假设我们选中了 ${a_1,a_2,a_3}$，其中 $a_1\le a_2\le a_3$，那么中位数为 $a_2$，操作后数组总和的变化量为：

$$  
(a_2-a_1)+(a_2-a_2)+(a_2-a_3).  
$$

由于 $a_2$ 是中位数，它左侧和右侧的元素数量相同。将这个观察推广到一般情况，先考虑 $k$ 为奇数。令 $cnt = \frac{k - 1}{2}$，我们先将原数组从小到大排序，然后枚举中位数的位置 $i$。

对于固定的中位数 $a_i$，左侧需要选择 $cnt$ 个不大于它的元素。由于这些元素替换成 $a_i$ 后会产生正贡献，所以显然应该尽可能小，直接选择排序后最前面的 $cnt$ 个元素。

于是，固定 $a_{i}$ 为中位数时，选择的元素是 $a[1,\dots,cnt],a_{i},a[i+1,\dots,i+cnt]$，用前缀和 $\mathcal{O}(1)$ 计算每个位置的贡献。

上面考虑的是 $k$ 为奇数的情况，接下来考虑 $k$ 为偶数的情况。此时选中元素排序后有两个位于中间的数，设它们的位置分别为 $p,q$，其中 $p<q$。按照题目对偶数个元素中位数的定义，最终替换成的数为：$\frac{a_{p} + a_{q}}{2}$。令 $cnt = \frac{k - 2}{2}$。

除去 $a_p,a_q$ 这两个中间位置后，它们左边和右边还各自需要选择 $cnt$ 个元素。与奇数情况相同，左侧仍然直接选择整个数组最前面的 $cnt$ 个元素；固定右侧中间位置 $q$ 后，右侧则选择 $a_q$ 后面紧接着的 $cnt$ 个元素。

也就是 $a[1,\dots,a_{cnt}], a_{p}, a_{q}, a[q+1, q + cnt]$。前一部分与 $p$ 有关，后一部分与 $q$ 有关。所以问题就转化为了找到一对满足 $p < q$ 的位置，使左右两边贡献和最大。

最后预处理左侧贡献的前缀最大值，以及右侧贡献的后缀最大值，枚举 $p, q$ 之间的分界位置即可。

```cpp title:"N" fold
ll a[maxn], sum[maxn];

void solve( ) {
    int n, k;
    cin >> n >> k;
    
    for( int i = 1; i <= n; ++ i ) cin >> a[i];
    sort( a + 1, a + n + 1 );

	sum[0] = 0;
    for( int i = 1; i <= n; ++ i ) {
        sum[i] = sum[i - 1] + a[i];
    }

    ll mx = -inf;
    if( k & 1 ) { // 奇数 
        int cnt = ( k - 1 ) / 2;
        for( int i = cnt + 1; i <= n - cnt; ++ i ) {
            ll left = sum[cnt];
            ll right = sum[i + cnt] - sum[i];
            ll res = sum[n] + k * a[i] - a[i] - left - right;
            mx = max( mx, res );
        }
    }
    else { // 偶数
        int cnt = ( k - 2 ) / 2;
        vector<ll> premax( n + 2, -inf );
        vector<ll> sufmax( n + 2, -inf );
        
        for( int i = cnt + 1; i <= n - cnt; ++ i ) {
	        ll left = cnt * a[i] - sum[cnt];
            premax[i] = max( premax[i-1], left );
        }
        for( int i = n - cnt; i >= cnt + 1; -- i ) {
	        ll right =  cnt * a[i] - ( sum[i+cnt] - sum[i] );
            sufmax[i] = max( sufmax[i+1], right );
        }
        for( int i = cnt + 1; i <= n - cnt - 1; ++ i ) {
            ll res = sum[n] + premax[i] + sufmax[i+1];
            mx = max( mx, res );
        }
    }
    cout << mx << '\n';
}
```

### [B-Bitwise Maximization](https://ac.nowcoder.com/acm/contest/133877/B)

> [!question] [B. 按位最大化](https://ac.nowcoder.com/acm/contest/133877/B)  
> 将给定序列中的每个数分配到两个多重集合之一，分别计算两个集合中所有元素的异或和，求这两个异或和之和的最大值。空集合的异或和视为 $0$。
> 
> 数据规模：$T \le 10^4$，$n \le 5\times 10^5$，$0 \le a_i < 2^{30}$；所有测试用例的 $n$ 之和不超过 $5\times 10^5$。

这题是学长开的，他最开始的思路是贪心，后来改了DP，但是都过不了。

于是我在写完 N 之后回来尝试介入。设两个集合的异或和分别为 $A,B$，要求最大化：$A + B$，利用异或恒等式 $A + B = A \oplus B + 2(A \& B)$。

由于每个元素都恰好被分到两个集合之一，因此 $A \oplus B$ 始终等于原数组所有元素的总异或和，记 $S = a_1 \oplus a_2 \oplus \cdots \oplus a_n$。

那么 $S$ 对于每组数据都是固定的，问题就转化为最大化：$A \& B$，这一步卡了很久。

考虑 $S$ 与 $A \& B$ 每一位之间的关系。由于 $B = A \oplus S$，发现若 $S$ 的第 $j$ 位为 $1$，A 与 B 的第 $j$ 位一定不同，因此 $(A \& B)_{j} = 0$。

换句话说 $S_{j} = 1$ 的位置不可能对 $A \& B$ 产生贡献，我们只需要考虑所有 $S_{j} = 0$ 的二进制位。一开始我们尝试逐位处理，对于每个满足 $S_{j} = 0$ 的位置，将所有满足 $a_{i, j} = 1$ 的位置加入线性基，但这样会 WA，反例如下：

```
17 = 10001
 9 = 01001
 5 = 00101
 3 = 00011
```

问题在于，各个二进制位并不能独立选择。我们最终选择的是同一个子集，这个子集的异或结果会同时影响多个二进制位，因此不能把每一位拆开分别最大化。

于是想了很久，最后灵机一动，把 $a_{i} \& \sim S$ 全部加进去，这样就直接考虑所有 $S_{j} = 0$ 的情况的 $a_{i}$  的贡献，此时线性基里算出来的就直接是 $A \& B$ 的最大值了。

下面对这种做法进行正确推导：

1. 对于一个任意的二进制位 $j$，若 $S_{j} = 0$，那么 $A_{j} = B_{j}$，此时这一位 $A_{j} \& B_{j} = 1$。反之若 $S_{j} = 1$，那么这一位的 $A_{j} \& B_{j} = 0$。所以 $A \& B = A \& (\sim S)$。

2. 假设分到第一个集合中的元素下标集合为 $P$，那么 $\displaystyle A = \bigoplus_{i\in P}a_i$。
3. 对于一个固定的掩码 $M$ 有分配律，即 $(x \oplus y) \& M = (x \& M) \oplus (y \& M)$。

于是代入柿子进行推导：

$$
\left(  \bigoplus_{i \in P} a_{i} \right) \& (\sim S) = \bigoplus_{i \in P}\left( a_{i} \& ( \sim S) \right)
$$

记 $b_{i} = a_{i} \& (\sim S)$，那么 $\displaystyle A \& B = \bigoplus_{i \in P} b_{i}$。也就是说，我们只需要从所有 $b_i$ 中选择一个子集，使其异或和最大。这正是线性基求最大子集异或和的标准问题。


```cpp title:"B" fold
struct LinearBasis {
/* ============================== */
static const int LOG = 63; // long long
// static const int LOG = 30; // ai < 2^30
ll d[LOG];

void init( ) { memset( d, 0, sizeof( d ) ); }

bool insert( ll x ) {
    for( int i = LOG - 1; i >= 0; -- i ) {
        if( !( x >> i & 1 ) ) continue;
        if( !d[i] ) {
            d[i] = x;
            return 1;
        }
        x ^= d[i];
    }
    return 0;
}

ll ask_max( ) {
    ll res = 0;
    for( int i = LOG - 1; i >= 0; -- i ) {
        res = max( res, res ^ d[i] );
    }
    return res;
}
/* ============================== */
} lb;

ll a[maxn];

void solve( ) {
    int n;
    cin >> n;

    lb.init( );
    ll Sum = 0;
    for( int i = 1; i <= n; ++ i ) {
        cin >> a[i];
        Sum ^= a[i];
    }

    for( int i = 1; i <= n; ++ i ) {
        lb.insert( a[i] & ~Sum );
    }

    cout << Sum + 2 * lb.ask_max( ) << '\n';
}
```

### [G-GCD Graph](https://ac.nowcoder.com/acm/contest/133877/G)

> [!question] [G. 最大公约数图](https://ac.nowcoder.com/acm/contest/133877/G)  
> 在一个以所有正整数为顶点的有向图中，对于任意 $i<j$，存在一条从 $i$ 到 $j$、边权为 $\gcd(i,j)$ 的边。定义 $\operatorname{cost}(u,v)$ 为从 $u$ 到 $v$ 的最短路，求 $\sum_{i=l}^{r}\operatorname{cost}(i,n)$。
> 
> 数据规模：$T \le 100$，$1 \le l \le r<n\le 10^7$；各测试用例的 $n$ 之和没有限制。

考虑什么情况两点之间距离最短，显然是 $\gcd(u, v) = 1$ 即 $u, v$ 互质的情况。也就是说，我从任意一点 $i$ 出发，只要途径一个与 $i$ 和 $n$ 都互质的中继点，就能以 $2$ 的代价走到终点。

最开始忽略了中继点必须比 $i$ 大这一限制，想当然地认为只要 $\gcd(i,n)>1$，就一定可以找一个中继点将答案降到 $2$。

于是问题就转化为了在 $[l, r]$ 中找有多少个元素与 $n$ 互质，一种显然的写法是类埃式筛，找出 $n$ 因子，然后筛一遍 $[l,r]$  这个区间，但这样做复杂度是假的。

为了统计与 $n$ 不互质的数，可以先分解出 $n$ 的所有不同质因子，再使用容斥原理。例如，区间 $[l,r]$ 中 $d$ 的倍数个数为：$\displaystyle \left\lfloor  \frac{r}{d} \right\rfloor - \left\lfloor \frac{l - 1}{d}  \right\rfloor$。

分别统计各个质因子的倍数，但 $2$ 和 $3$ 会重复统计 $6$ 的倍数，因此需要减去交集；更多质因子的情况同理。于是就有了下面这一版代码：

```cpp title:"G-Fake" fold
void solve( ) {
    ll l, r, n;
    cin >> l >> r >> n;

    vector<ll> primes;
    ll x = n;
    for( ll i = 2; i * i <= x; ++ i ) {
        if( x % i == 0 ){
            while( x % i == 0 ) x /= i;
            primes.push_back( i );
        }
    }
    if( x > 1 ) primes.push_back( x );

    int len = primes.size( );
    int N = (1 << len);

    ll cnt = 0;
    for( int mask = 1; mask < N; ++ mask ) {
        ll mul = 1;
        for( int j = 0; j < len; ++ j ) {
            if( mask & (1 << j) ) mul *= primes[j];
        }
        ll tmp = r / mul - ( l - 1 ) / mul;
        if( __builtin_popcount( mask ) & 1 ) cnt += tmp;
        else cnt -= tmp;
    }

    ll ans = ( r - l + 1 - cnt ) + cnt * 2;
}
```

这份代码中，`cnt` 表示 $[l,r]$ 内与 $n$ 不互质的数的数量。它实际上默认：

$$
\operatorname{cost}(i,n)= \begin{cases}
1,& \gcd(i,n) = 1 \\
2,& \gcd(i,n) > 1
\end{cases}
$$

但这个结论并不总是成立。

百思不得其解，为什么会 WA 呢？我在检查我的代码是不是写 Dirty 了，然后学长在打表找反例。最后真的找到了，$[2184 - 2200]$ 这一段区间里，所有的 $cost$ 都是 $3$。

这说明前面的推导过于想当然。即使存在一个同时与 $i,n$ 互质的数，如果这个数不处于 $(i,n)$ 之间，它也不能作为合法的中继点。

我的依据是 **伯特兰猜想**：对于任意整数 $m > 1$，区间 $(m, 2m)$ 之间至少存在一个质数。而质数与任意非它本身的倍数之间都是互质的。但题目要求每次只能往大的走，所以正确的思考方向应该是，对于 $n$ 来说，可以找到一个质数 $\left\lfloor  \frac{n}{2}  \right\rfloor < p < 2 \left\lfloor  \frac{n}{2}  \right\rfloor \le n$。

记 $p$ 为小于 $n$ 的最大素数。前面的容斥原理在 $< p$ 这一段是正确的，真正可能出现问题的只有 $i > p$ 的部分，因为此时不能通过质数 $p$ 作为中继点。

而在 $1e7$ 范围内的素数分布比较密集，所以只要在 $[p + 1, n]$ 这一段上跑一遍最小值 DP 即可，复杂度去决定素数密度，可以接受。

```cpp title:"G-True" fold
int pri[maxn], pcnt;
bool isp[maxn];

void sieve( int N ) { /* 素数筛 */ }

void solve( ) {
    ll l, r, n;
    cin >> l >> r >> n;

    vector<ll> primes;
    ll x = n;
    for( ll i = 2; i * i <= x; ++ i ) {
        if( x % i == 0 ){
            while( x % i == 0 ) x /= i;
            primes.push_back( i );
        }
    }
    if( x > 1 ) primes.push_back( x );

    int len = primes.size( );
    int N = (1 << len);

    ll cnt = 0;
    for( int mask = 1; mask < N; ++ mask ) {
        ll mul = 1;
        for( int j = 0; j < len; ++ j ) {
            if( mask & (1 << j) ) mul *= primes[j];
        }
        ll tmp = r / mul - ( l - 1 ) / mul;
        if( __builtin_popcount( mask ) & 1 ) cnt += tmp;
        else cnt -= tmp;
    }

    ll ans = ( r - l + 1 - cnt ) + cnt * 2;

    ll p = n - 1;
    while( !isp[p] ) -- p;
    ll L = p + 1;

    vector<ll> f( n - L + 1, inf );

    f[n - L] = 0;
    for( ll i = n - 1; i >= L; -- i ) {
        for( ll j = i + 1; j <= n; ++ j ) {
            f[i - L] = min( f[i - L], (ll)gcd( i, j ) + f[j - L] );
        }
    }

    for( ll i = max( l, L ); i <= min( r, n - 1 ); ++ i ) {
        ll cost = gcd( i, n ) == 1 ? 1 : 2;
        ans += f[i - L] - cost;
    }

    cout << ans << '\n'; 
}
```

## 三、补题记录

有空再补吧

### {题号 题名}

{只展开真正值得补的题。可以直接采用单题笔记的写法：题意、真实思路、赛后修正、代码。}

## 四、本场留下什么

- 解题上：先找真正需要优化的量；自然结论补不上证明时，要尽早打表找反例。
- 实现上：注意 `long long`、前后缀最大值初始化，以及区间计数公式的边界。
- 后续：回炉线性基、容斥原理；将 G 题保留为“错误猜想 + 反例修正”的代表题。

相关导航：[[AlgorithmGuide|算法与竞赛]] · [[NKSummer1|牛客暑期多校 1]] · [[HomePage|花园首页]]
