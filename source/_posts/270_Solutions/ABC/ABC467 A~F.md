---
title: '[Solution] ABC467 A~F'
tags:
  - algorithm/比赛
status: reviewed
categories:
  - 270_Solutions
  - ABC
abbrlink: e82727d9
date: 2026-07-19 00:00:00
updated: 2026-07-19 00:00:00
---

# [Solution] ABC467

## 一、比赛概况

- **时间**：2026.7.18 20.00 - 21:40
- **结果**：ABCDEF / G | Rk.88
- **主要时间损耗**：解题

## 二、简要记录

### [A - Obesity](https://atcoder.jp/contests/abc467/tasks/abc467_a)

> [!Question]
> 给定一个人的身高 $H$（厘米）和体重 $W$（千克）。按照公式 $\mathrm{BMI}=\frac{W}{(H/100)^2}$ 计算 BMI。若 BMI 不小于 $25$，输出 `Yes`，否则输出 `No`。
> 数据规模：$1 \le H,W \le 300$

这是一道非常简单的模拟题，But anyway，这题还有很坑的精度问题，但是我写的时候没感觉。

OK 话说回来，这题本质考察式子的化简，避免浮点数计算，以转化为整数的计算来判断。首先给出两种不同的做法：

```cpp title:"AAA" fold
void solve1( ) {
    int h = read( ), w = read( );
    double bmi = (double)w * 10000 / h / h;
    if( bmi >= 25.0 ) cout << "Yes" << '\n';
    else cout << "No" << '\n';
}

void solve2( ) {
    int h = read( ), w = read( );
    double hh = (double)h / 100.0;
    double bmi = (double)w / hh / hh;
    if( bmi >= 25.0 ) cout << "Yes" << '\n';
    else cout << "No" << '\n';
}
```

前者是我的 AC 代码，后者存在浮点误差导致 WA 的风险。两种做法在实数运算中没有本质区别，但浮点数的运算路径不同，产生的舍入误差也会不同。下文尝试解释这个误差，并给出正解思路。

给出一组特殊的样例 `H = 220, W = 121`，我们发现它的 BMI 恰好等于 `25`，但在 `solve2` 的做法中，`hh = (double)h / 100.0`，由于十进制小数 $2.2$ 无法用有限位二进制小数精确表示，所以它在 `double` 中实际存储的值大约是 `2.2000000000000001776`，也就是比 $2.2$ 稍微大一点。

但这个稍微大一点，就会导致 BMI 计算中，分母偏大，导致的结果偏小，于是就 WA 了，是不是梦回高中化学误差分析了。

但为什么 `solve1` 在这组数据上就没问题呢？这其实也是很凑巧的，因为在 BMI 的计算中，`121 * 10000 = 1210000, 1210000 / 220 = 5500, 5500 / 220 = 25`，这三个中间结果都恰好是能被 `double` 精确表示的整数，所以没有误差。

但这就表明上述做法一定成立吗？并非，这只能解释当前这组数据为什么没有出错，不能作为一般的浮点正确性证明。我们考虑更稳妥的做法：

$$
\begin{aligned}
\frac{10000W}{H^{2}} &\ge 25 \\
400W &\ge H^{2}
\end{aligned}
$$

所以直接比较 `400 * W >= h * h` 之间的关系就可以避免掉浮点数的误差了，这才是这题想考察的知识点。

```cpp title:"AAA" fold
void solve( ) {
    ll h = read( ), w = read( );
    if( 400 * w >= h * h ) cout << "Yes" << '\n';
    else cout << "No" << '\n';
}
```

### [B - Keep the Change](https://atcoder.jp/contests/abc467/tasks/abc467_b)

> [!Question] B - Keep the Change  
> 高桥依次在 $N$ 家商店购物，第 $i$ 件商品价格为 $A_i$，支付金额为 $B_i$。若字符串 $S_i$ 为 `keep`，则高桥不要找零；若为 `take`，则正常收取找零。求与每次都正常收取找零相比，高桥一共损失了多少钱。  
> 数据规模：$1 \le N \le 100$，$1 \le A_i \le B_i \le 100$，$S_i\in{\texttt{keep},\texttt{take}}$

问一共损失了多少钱？我们考虑什么时候会损失，显然是不找零的时候咯。

那么直接判断，如果不找零，也就是 $S_{i} = keep$，累积损失的钱 $B_{i} - A_{i}$ 即可。

```cpp title:"BBB" fold
void solve( ) {
    int n = read( );
    ll x = 0;
    for( int i = 1; i <= n; ++ i ) {
        a[i] = read( );
        b[i] = read( );
        string ss;
        cin >> ss;
        if( ss == "keep" ) s[i] = 1;
        else s[i] = 0;
    }

    for( int i = 1; i <= n; ++ i ) {
        if( s[i] ) x += b[i] - a[i];
    }
    cout << x << '\n';
}
```

### [C - Adjacent Sums (easy)](https://atcoder.jp/contests/abc467/tasks/abc467_c)

> [!Question] C - Adjacent Sums (easy)  
> 给定长度为 $N$ 的数组 $A$ 和长度为 $N-1$ 的数组 $B$，其中所有元素均为 $0$ 或 $1$。每次操作可以选择一个位置 $i$，令 $A_i$ 增加 $1$。求最少操作次数，使得对所有 $1\le i<N$，均满足 $(A_i+A_{i+1})\bmod 2=B_i$。  
> 数据规模：$2 \le N \le 2\times 10^5$，$A_i,B_i\in{0,1}$

紧接着我们就来到了这场比赛中最阴的一道题，如果你直接想 Hard 的话，这题就会非常之麻烦，我们这题先探讨 $M = 2$ 的特例做法。

由于第 $i$ 个位置最终的余数会影响到第 $i+1$ 个位置最终的余数，所以我们发现，理论上只要确定了第一个位置最终的余数，整个余数序列都会固定下来。每个位置的余数只有 $0,1$ 两种，所以直接枚举两种情况特判就行了。

为什么用异或？题目不是加法取模吗？简单来说，在模 $2$ 的意义下，加法与异或是等价的。

```cpp title:"CCC" fold
void solve( ) {
    int n = read( ), m = read( );
    for( int i = 1; i <= n; ++ i ) a[i] = read( );
    for( int i = 1; i < n; ++ i ) b[i] = read( );

    int res1 = 0;
    int cur = 0; // 当前元素应该取的值
    for( int i = 1; i <= n; ++ i ) {
        if( cur != a[i] ) res1 ++;
        cur ^= b[i];
    }

    int res2 = 0;
    cur = 1;
    for( int i = 1; i <= n; ++ i ) {
        if( cur != a[i] ) res2 ++;
        if( i < n ) cur ^= b[i];
    }

    cout << min( res1, res2 ) << '\n';
}
```

### [D - Concentric Circles](https://atcoder.jp/contests/abc467/tasks/abc467_d)

> [!Question] D - Concentric Circles  
> 每组询问给出四个点 $P,Q,R,S$。判断是否存在两个圆心相同的圆，使得 $P,Q$ 位于其中一个圆上，$R,S$ 位于另一个圆上。两个圆的半径可以相同。  
> 数据规模：$1 \le T \le 5\times 10^4$，坐标绝对值不超过 $10^9$，且 $P\ne Q$、$R\ne S$

接着是一道几何水题，考察向量知识。

首先，我们回忆一下初中知识，给出圆上两点，如何确定圆心；我们发现这是无法确定的，因为我们只能确定圆心在这两点的垂直平分线上。现在有两组点 $P,Q$ 和 $R,S$，公共圆心必须同时位于这两条线段的垂直平分线上。如果这两条垂直平分线有交点，是否就意味着存在圆心呢？

于是原问题就等价为：两条垂直平分线是否相交或重合。

首先我想到用斜率来判断，但是呢？在 A 题上吃过亏的你们，还敢在 D 上写 double 吗？而且竖直线的斜率不存在。竞赛中一般使用叉积判断两个方向是否平行。

设：

$$
\begin{aligned}
\vec{a} = Q - P = ( Q_{x} - P_{x}, Q_{y} - P_{y} ) \\
\vec{b} = S - R = ( S_{x} - R_{x}, S_{y} - R_{y} ) \\
\end{aligned}
$$

那么二者平行当且仅当 $\vec{a} \times \vec{b} = 0$，代入上述公式即可判断，这就就避免了小数的误差。

说完了判平行，那么还有一种重合的情况，如何判断呢？设两条线段的中点分别为 $M_1 = \frac{P+Q}{2}$，$M_{2} = \frac{R+S}{2}$。如果两条垂直平分线重合，$M_{1}M_{2}$ 一定在这条垂直平分线上，那么只需要判断 $M_{1}M_{2}$ 是否与 $\vec{a}$ 垂直即可，也就是：

$$
\begin{aligned}
\vec{a} \cdot ( M_{2} - M_{1}) &= 0 \\
\vec{a} \cdot \left(\frac{R + S}{2} - \frac{P + Q}{2}\right) &= 0 \\
\vec{a} \cdot ( (R + S) - (P + Q) ) &= 0
\end{aligned}
$$

统一用 `longlong` 判断就行。

```cpp title:"DDD" fold
struct Point {
    ll x, y;
} P, Q, R, S;

void solve( ) { 
    P.x = read( ); P.y = read( );
    Q.x = read( ); Q.y = read( );

    R.x = read( ); R.y = read( );
    S.x = read( ); S.y = read( );

    ll ux = Q.x - P.x, uy = Q.y - P.y;
    ll vx = S.x - R.x, vy = S.y - R.y;

    ll cross = ux * vy - uy * vx;

    if( cross != 0 ) {
        cout << "Yes" << '\n';
        return;
    }

    // 平行
    ll dx = R.x + S.x - P.x - Q.x;
    ll dy = R.y + S.y - P.y - Q.y;

    ll dot = dx * ux + dy * uy;

    if( dot == 0 ) cout << "Yes" << '\n';
    else cout << "No" << '\n';
}

```

### [E - Adjacent Sums (hard)](https://atcoder.jp/contests/abc467/tasks/abc467_e)

> [!Question] E - Adjacent Sums (hard)  
> 给定长度为 $N$ 的数组 $A$ 和长度为 $N-1$ 的数组 $B$，其中所有元素均在 $[0,M-1]$ 内。每次操作可以选择一个位置 $i$，令 $A_i$ 增加 $1$。求最少操作次数，使得对所有 $1\le i<N$，均满足 $(A_i+A_{i+1})\bmod M=B_i$。  
> 数据规模：$2 \le N \le 2\times 10^5$，$3 \le M \le 10^9$，$0 \le A_i,B_i<M$

由于我们不知道每个位置最终执行了几次操作，不妨设第 $i$ 个位置执行了 $x_{i}$ 次操作，于是最终需要满足：$(A_{i} + x_{i} ) + (A_{i+1} + x_{i+1} ) \equiv B_{i} \pmod{ M }$，接下来我们把已知量和未知量分开，得到：

$$
x_{i} + x_{i + 1} \equiv B_{i} - A_{i} - A_{i+1} \pmod{M}
$$

不妨记 $C_i = B_{i} - A_{i} - A_{i+1}$，于是问题转化为：

> 满足 $x_{i} + x_{i+1} \equiv C_{i} \pmod{M}$ 条件，最小化 $\displaystyle \sum_{i=1}^{N} x_{i}$。
> 注：$x_i\in[0,M-1]$。如果某个 $x_i\ge M$，将它减去 $M$ 不会改变任何模 $M$ 的约束，却能让操作次数减少，所以最优解一定可以限制在这个范围内。  

由 $x_i+x_{i+1}\equiv C_i\pmod M$ 可以得到 $x_{i+1}\equiv C_i-x_i\pmod M$。因此，只要固定 $x_1=t$，后面的 $x_2,x_3,\dots,x_N$ 都可以依次唯一确定。

至此，原问题已经被转换为：枚举 $t\in[0,M-1]$，计算对应的 $\displaystyle F(t)=\sum_{i=1}^N x_i(t)$ 并求其最小值。

如果直接枚举每个 $t$，再递推整个序列，复杂度为 $O(N \cdot M)$，$M \le 1e9$，还是想想怎么优化吧。

既然我们要研究 $F$ 函数与 $t$ 之间的关系，不妨把 $x_{i}(t)$ 展开试试呢。

$$
\begin{aligned}
x_{1} &= t \\
x_{2} &= (C_{1} - t) \pmod{M} \\
x_{3} &= (C_{2} - x_{2}) = (C_{2} - C_{1} + t) \pmod{M} \\
\end{aligned}
$$

我们发现 $t$ 的符号是在不停发生变化的，所以 $x_{i}$ 可以写成：$x_{i}(t) = (s_{i} t + p_{i} ) \pmod{M}$，其中 $s_i \in \{ -1, 1 \}$，并且符号正负交替。令 $p_1 = 0$，则有 $p_{i+1} \equiv C_i - p_i \pmod M$。

于是目标函数就变为：$\displaystyle F(t) = \sum_{i=1}^{N}\left((s_{i} t + p_{i}) \bmod M\right)$。注意这里是每一项分别取模，最后的总和不取模。

为了求最值，我们考虑 “求导” 寻找单调性，但这是离散的对象，所以我们采用差分：$D(t) = F(t) - F(t-1)$，也就是观察 $t-1 \to t$ 时函数值发生了什么变化。

首先观察*正号项*：$x_{i}(t) = (t + p_{i} ) \pmod{M}$，理论上 $t$ 增加 $1$，这一项也增加 $1$，但当它从 $M - 1$ 变为 $M$ 时，模 $M$ 变成了 $0$，此时实际变化量为 $1-M$。也就是说，对于 $t = M - p_{i}$ 的位置来说，除了原本的 $+1$ 之外，还会额外减少 $M$。

接着我们观察*负号项*：$x_{i}(t) = (-t + p_{i}) \pmod{M}$，类似的，它的转折点在 $0$ 变成 $-1$，模 $M$ 变成了 $M - 1$，实际增大了 $M - 1$，也就是说，对于 $t = p_{i} + 1$ 的位置来说，它再减 $1$，还会额外增加 $M$。

现在我们抛开所有取模不谈，只考虑 $t-1 \to t$ 时的基础变化量。由于这是一个正负交替的序列，首项为正，所以当 $N$ 为偶数，正负号数量相同，基础变化量为 $0$；当 $N$ 为奇数，正号多一个，基础变化量为 $1$。

完整的 $F(t)$ 并不一定单调，因为取模时还会发生额外的跳变。所以我们记录下所有会突变的事件：对于正号项来说，它就是 $\{M - p_{i}, -M\}$；对于负号项来说，它就是 $\{p_{i} + 1, M\}$。

然后我们把所有事件按前一个元素升序排序，逐步枚举每个突变的 $t$，对整体函数的影响，找到最小值即可。

```cpp title:"EEE" fold
ll a[maxn], b[maxn], c[maxn];

void solve( ) {
    int n = read( ); ll m = read( );
    for( int i = 1; i <= n; ++ i ) a[i] = read( );
    for( int i = 1; i < n; ++ i ) b[i] = read( );

    for( int i = 1; i < n; ++ i ) {
        c[i] = ( ( b[i] - a[i] - a[i + 1] ) % m + m ) % m;
    }

    vector< pair<ll, ll> > vec;

    ll pi = 0;
    int si = 1;
    ll res = 0;

    for( int i = 1; i <= n; ++ i ) {
        res += pi;
        if( si == 1 ) {
            if( m - pi <= m - 1 ) vec.push_back({ m - pi, -m });
        } else {
            if( pi + 1 <= m - 1 ) vec.push_back({ pi + 1, m });
        }
        if( i < n ) {
	        pi = ( c[i] - pi + m ) % m;
	        si = -si;
        }
    }

    sort( vec.begin( ), vec.end( ) );

    ll ans = res;
    int k = n % 2;
    ll pre = 0;

    int t = 0;
    while( t < (int)vec.size( ) ) {
        ll cur = vec[t].first;
        ll delta = 0;
        while( t < (int)vec.size( ) && vec[t].first == cur ) {
            delta += vec[t].second;
            ++ t;
        }
        if( k == 1 ) res += k * ( cur - pre );
        res += delta;
        ans = min( ans, res );
        pre = cur;
    }
    cout << ans << '\n';
}
```

### [F - Email Scheduling Optimization](https://atcoder.jp/contests/abc467/tasks/abc467_f)

> [!Question] F - Email Scheduling Optimization  
> 有 $N$ 封邮件，第 $i$ 封邮件需要 $A_i$ 分钟编写，发送后再经过 $B_i$ 分钟收到回复。同一时间只能编写一封邮件，但可以任意安排编写顺序。求最早收到全部回复的时间。随后有 $Q$ 次单点修改，每次修改某个 $A_i$ 或 $B_i$，并重新求答案。  
> 数据规模：$1 \le N,Q \le 10^5$，$1 \le A_i,B_i,x \le 10^9$

这是个动态修改的问题，显然是考察了某种数据结构，观察后大胆猜测线段树。

我们先解决静态问题，邮件按照什么顺序写？假设发送顺序为 $p_{1}, p_{2}, \dots, p_{N}$，第 $k$ 封邮件发送完成的时间为 $\displaystyle \sum_{t=1}^{k}A_{p_{t}}$，因此收到回复的时间为：$\displaystyle \sum_{t=1}^{k}A_{p_{t}} + B_{p_{k}}$，总时间就是：
$$
\max_{1 \le k \le N}\left( \sum_{t=1}^{k} A_{p_{t}} + B_{p_{k}} \right)
$$

观察这个柿子，我们可以发现，最优的策略是贪心的按照 $B_{i}$ 从大到小发送邮件，下面简要证明这个贪心的正确性。

假设现在已经花了 $T$ 分钟，接着要发送两条邮件 $x, y$，并且 $B_{x} < B_{y}$。

1. 假设按照 $x \to y$ 的顺序：回复时间分别为 $T + A_{x} + B_{x}$，$T + A_{x} + A_{y} + B_{y}$，由于 $A_{y} > 0$ 且 $B_{x} < B_{y}$，所以后者更大，最终时间为 $T + A_{x} + A_{y} + B_{y}$。
2. 假设按照 $y \to x$ 的顺序：回复时间分别为 $T + A_{y} + B_{y}$，$T + A_{y} + A_{x} + B_{x}$。

接着比较发现，$y \to x$ 这两种顺序的回复时间，均小于 $x \to y$ 的 $T + A_{x} + A_{y} + B_{y}$，证毕。

按照 $B$ 从大到小排序后，答案就是 $\displaystyle \max_k\left(\sum_{t=1}^{k}A_{p_t}+B_{p_k}\right)$，所以我们需要动态维护这个排序下的前缀和与最大值。

考虑用线段树维护，这里我们考虑按 $B$ 的值开一个权值线段树，每个节点维护两个信息 $sum$ 和 $max$，分别表示区间内所有 $A$ 的总和，以及从时间 0 开始处理该区间，最晚的回复时间。

考虑线段树的合并，假设左儿子的 $B$ 更大，那么先处理左儿子，再处理右儿子。

左区间的信息为 $(S_{L}, M_{L})$，右区间的信息为 $(S_{R},M_{R})$，合并后 $S = S_{L} + S_{R}$，但 $M$ 等于什么呢？最大完成时间有两种情况，第一种是在左区间产生：$M_{L}$，第二种是在右区间产生：$S_{L} + M_{R}$，所以 $M = \max(M_{L}, S_{L} + M_{R} )$。

那么叶子节点应该怎么初始化呢？对于某个确定的 $B = b$，假设所有满足 $B_{i} = b$，其 $A_{i}$ 的总和为 $s$，若 $s > 0$，则 $(S, M) = (s, s + b)$，若是 $s = 0$，那么这个位置应该被忽略，也就是 $(S, M) = (0, -\infty)$。

如何处理修改呢？若是修改 $A_{i}$，我们在当前 $B_{i}$ 对应的叶子上增加 $x - A_{i}$ 即可；若是修改 $B_{i}$，我们把邮件从旧的 $B_{i}$ 移动到新的 $x$ 上，即旧位置 $- A_{i}$，新位置 $+A_{i}$，更新 $B_{i} = x$。

最后答案就是线段树根节点的 $M$。

每次修改只会改变一到两个叶子，复杂度为 $O(\log (N+Q))$；加上离散化，总复杂度为 $O((N+Q)\log(N+Q))$。

> 注：本题值域很大，需要对 $B$ 进行离散化处理。

```cpp title:"FFF" fold
ll read( ) { /* 模板代码略 */ }

struct Query { int opt, idx; ll val; };

ll a[maxn], b[maxn];
ll Bsum[maxn], Bval[maxn];

struct Disc {
/* ======================================== */
vector<ll> val;
void clear( ) { val.clear( ); }
void add( int x ) { val.push_back( x ); }
void init( ) {
    sort( val.begin( ), val.end( ), greater<ll>( ) );
    val.erase( unique( val.begin( ), val.end( ) ), val.end( ) );
}
int size( ) { return val.size( ); }
int get_idx( ll x ) { return lower_bound( val.begin( ), val.end( ), x, greater<ll>( ) ) - val.begin( ) + 1; }
ll get_val( int idx ) { return val[idx - 1]; }
/* ======================================== */
} disc;

#define ls ( u << 1 )
#define rs ( u << 1 | 1 )

struct SegTree {
/* ======================================== */
struct Node { 
    int l, r; 
    ll sum, mx; 
} tr[maxn << 2];

void push_up( int u ) {
    tr[u].sum = tr[ls].sum + tr[rs].sum;
    tr[u].mx = max( tr[ls].mx, tr[ls].sum + tr[rs].mx );
}

void build( int u, int l, int r, ll val[] ) {
    tr[u].l = l, tr[u].r = r;
    if( l == r ) { 
        tr[u].sum = val[l];
        if( tr[u].sum == 0 ) tr[u].mx = -inf;
        else tr[u].mx = tr[u].sum + Bval[l];
        return;
    }
    int mid = ( l + r ) >> 1;
    build( ls, l, mid, val );
    build( rs, mid + 1, r, val );
    push_up( u );
}

void modify( int u, int pos, ll val ) {
    if( tr[u].l == tr[u].r ) { 
        tr[u].sum += val;
        if( tr[u].sum == 0 ) tr[u].mx = -inf;
        else tr[u].mx = tr[u].sum + Bval[tr[u].l];
        return;
    }
    int mid = ( tr[u].l + tr[u].r ) >> 1;
    if( pos <= mid ) modify( ls, pos, val );
    else modify( rs, pos, val );
    push_up( u );
}
/* ======================================== */
} seg;

void solve( ) {
    int n = read( ), Q = read( );
    for( int i = 1; i <= n; ++ i ) a[i] = read( );
    for( int i = 1; i <= n; ++ i ) b[i] = read( ), disc.add( b[i] );

    vector<Query> qry( Q );
    for( int k = 0; k < Q; ++ k ) {
        int opt = read( ), idx = read( );
        ll val = read( );
        qry[k] = { opt, idx, val };
        if( opt == 2 ) disc.add( val );
    }
    
    disc.init( );
    int m = disc.size( );
    for( int pos = 1; pos <= m; ++ pos ) {
        Bval[pos] = disc.get_val( pos );
    }

    for( int i = 1; i <= n; ++ i ) {
        int pos = disc.get_idx( b[i] );
        Bsum[pos] += a[i];
    }

    seg.build( 1, 1, m, Bsum );

    for( auto [opt, idx, val] : qry ) {
        if( opt == 1 ) {
            int pos = disc.get_idx( b[idx] );
            seg.modify( 1, pos, val - a[idx] );
            a[idx] = val;
        } else {
            int pre = disc.get_idx( b[idx] );
            int cur = disc.get_idx( val );
            seg.modify( 1, pre, -a[idx] );
            seg.modify( 1, cur, a[idx] );
            b[idx] = val;
        }
        cout << seg.tr[1].mx << '\n';
    }
}
```

## 三、补题记录

### [G - Many Sweets Problem](https://atcoder.jp/contests/abc467/tasks/abc467_g)

本题被知识锁了，等补充 动态二维数据结构 后再补该题。

## 四、本场留下什么

- 动态数据结构方向仍需加强：
  - 线段树维护复杂状态；
  - 权值线段树；
  - 动态二维查询结构。
- 对于复杂问题，需要进一步提升从暴力模型到可维护结构的转换能力。