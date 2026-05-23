---
title: '[Solution] ABC459 C~E'
tags: ABC
categories:
  - 270_Solutions
  - ABC
abbrlink: 488abaac
date: 2026-05-23 00:00:00
---


### 前记

这场出的题好诡异啊，C 卡了好久，然后 E 卡数据规模死了 2 次，F / G 都开不出来，这是我今年写过最诡异的一场 ABC 了，有点没招，掉分了。

A / B 略，直接从 C 开始

### [C - Drop Blocks](https://atcoder.jp/contests/abc459/tasks/abc459_c)

#### 题意
有两种操作，一种是给第 $x$ 个格子 $+1$，一种是查询有多少个格子 $\ge y$，如果所有的格子都 $\ge 1$，那么所有的格子都减去 $1$。

> $N, Q \le 3e5, x \le N, y \le 3e5$

#### 思路

如果暴力模拟每次全局减一的操作，复杂度最坏是 $\mathcal{O}(NQ)$，显然不可取。

瓶颈在于，当 “所有格子都 $\ge 1$” 这个条件被触发时，我们不能真的去遍历整个数组减一。为此可以维护一个全局删除次数 `del`，记录到目前为止已经执行过多少轮全体减一。

令 $C_i$ 表示第 $i$ 个格子被 $+1$ 的总次数，那么实际上该格子当前的方块数是：$D_i = C_i - \min(C)$ 其中 $\min(C)$ 就是全局删除次数 `del`。

对于查询 $D_i \ge y$，等价于： $C_i \ge y + \min(C) = y + del$。因此，我们只需要动态维护每个 $C_i$ 值的出现情况，然后在查询时快速统计有多少个 $C_i \ge y + del$。

为了回答查询，我们需要高效的数据结构来维护每个 $C_{i}$ 值出现的频次，于是我就想到了权值树状数组，But，这是 C 题啊，怎么就树状数组上了呢？

重新回到题目设问，考虑 $C_{i}$ 变化时对答案的影响，当 $C_{x}$ 从 $v-1$ 变成 $v$ 的时候，对于所有的统计情况有什么影响呢？发现在这之前满足 $\ge 1, \ge 2, \dots, \ge v - 1$，现在依然满足，而同时产生的新贡献则是 $\ge v$ 的格子多了一个。

所以我们可以只维护一个计数数组 `cnt[v]`，表示 $C_i \ge v$ 的格子个数。然后就好操作了，只需要将该格子的累计次数 `C[x] ++`，然后 `cnt[C[x]] ++` 就行了，最后检查，如果 `cnt[del + 1] == n`，就说明所有的格子都至少为 `del + 1` 了，此时 `del ++`。

最后注意数据规模即可，这种写法数组得开两倍，因为当 `del` 很大的时候 `y + del` 会超过 $3e5$。

#### 代码部分
{% fold info @AcCode %}
```cpp
const int maxn = 6e5 + 5;
int a[maxn], cnt[maxn];

void solve( ) {
    int n, q;
    cin >> n >> q;
    cnt[0] = n;  // 初始所有格子的累计次数 >= 0
    int del = 0; // 总共减去了几次 | delete
    for( int i = 1; i <= q; ++ i ) {
        int opt, x;
        cin >> opt >> x;
        if( opt == 1 ) {
            a[x] ++;
            cnt[a[x]] ++;
            if( cnt[del + 1] == n ) del ++;
        }
        else {
            cout << cnt[x + del] << '\n';
        }
    }
}
```
{% endfold %}

### [D - Adjacent Distinct String](https://atcoder.jp/contests/abc459/tasks/abc459_d)

#### 题意
给定一个字符串 $S$，判断能否通过重排字符，使得任意两个相邻字符都不相同，若可以则输出任意一种方案。

> $T \le 3e5, |S| \le 1e6$

#### 思路
大胆猜测贪心构造，搓了搓样例，有一个贪心策略是，把所有字母出现的次数都记录下来，然后每次都拿出数量最多的字符拼在当前答案后面，然后保证相邻两个字符不同即可。

如果最后构造完发现字符串长度不够，就说明这是不可能构造的，我不会证明，但是感觉应该挺对的。最后选择使用 **优先队列** 来处理，特殊处理堆顶出队后入队还是堆顶的情况就行。

复杂度：每个测试点 $O(|S|\log 26) = O(|S|)$，总复杂度 $O(\sum |S|)$，感觉比 C 简单多了 ......

#### 代码部分
{% fold info @AcCode %}
```cpp
struct State {
    int cnt; char ch;
    // 大根堆
    bool operator < ( const State &oth ) const { return cnt < oth.cnt; }
};

void solve( ) {
    string s;
    cin >> s;
    
    vector<int> cnts( 27, 0 );
    for( char ch : s ) cnts[ch - 'a'] ++;
    
    priority_queue<State> pq;
    for( int i = 0; i < 27; ++ i ) {
        if( cnts[i] ) pq.push({ cnts[i], i + 'a' });
    }

    char pre_ch = '&';
    int pre_cnt = 0;
    
    string ans;
    while( !pq.empty() ) {
        auto [cnt, ch] = pq.top( ); pq.pop( );
        ans += ch;
        cnt --;
        if( pre_cnt ) {
            pq.push({ pre_cnt, pre_ch });
        }
        pre_ch = ch;
        pre_cnt = cnt;
    }
    
    if( ans.size( ) == s.size( ) ) cout << "Yes" << '\n' << ans << '\n';
    else cout << "No" << '\n';
}
```
{% endfold %}

### [E - Select from Subtrees](https://atcoder.jp/contests/abc459/tasks/abc459_e)

#### 题意
给定一棵以 $1$ 为根的有根树，共 $N$ 个结点。结点 $i$ 有 $C_i$ 个糖果，所有糖果互不相同。有 $N$ 只松鼠，第 $i$ 只松鼠需要从以 $i$ 为根的子树中选取 $D_i$ 个糖果，且不同松鼠不能选取同一个糖果。求所有松鼠成功选取糖果的方案数。

> $N \le 2e5, C \le 1e9, \sum D \le 1e6$

#### 思路
这种方案数的问题大概率是考察 DP，看看数据的形式 —— 是树，大概率是树上 DP，一般来说，我们的思路是从叶子节点往根节点倒推。

对于以 $u$ 为根节点的子树，设该子树的糖果总数为 $SumC$，松鼠糖果总需求 $SumD$，有一个很显然的结论，如果 $SumC < SumD$，那么一定是供不应求的。

对于 $u$ 的每一个子节点 $v$ ，其子树的松鼠挑选完糖果后，还剩下 $SumC_{v} - SumD_{v}$ 颗糖果，也就是说，$u$ 这一点的糖果总数为 $cnt_{u} = C_{u} + \sum_{v : u} (SumC_{v} - SumD_{v} ) = SumC_{u} - SumD_{u} + D_{u}$。

关键的性质在于这句话，“即使最终选择的糖果组是相同的，如果选择它们的松鼠不同，它们也会被算作不同的方式”。也就说所有的糖果对于节点 $u$ 以及它的祖先来说都是等价的，那么总方案数就是：

$$
\binom{cnt_{u}}{D_{u}} = \binom{SumC_{u} - SumD_{u} + D_{u}}{D_{u}}
$$

> 注：因为是等价的，所以只需要算组合数就行了，不需要计算排列数。

最后把答案再运用乘法法则把答案乘起来就得到了结果：

$$
\prod_{i=1}^{n} \binom{SumC_{i} - SumD_{i} + D_{i}}{D_{i}} \pmod{998244353}
$$

$SumC$ 可能非常大（可达 $10^9$ 及以上），但 $D_u \le 10^6$，所以不能使用简单的阶乘预处理解决。因此可以回归组合数公式本身：

$$
\binom{n}{r} = \frac{n \cdot (n-1) \cdots (n-r+1)}{r!}
$$

只需要计算分子，最后乘以分母的逆元，分母的逆元范围很小，可以提前预处理。最后写一个 DFS，从叶子结点开始，逐个倒推合并结果即可得到答案。

#### 代码部分

{% fold info @AcCode %}
```cpp
ll qpow( ll a, ll k, ll mod ) {
    ll res = 1;
    for( ; k; k >>= 1, a = a * a % mod )
        if( k & 1 ) res = res * a % mod;
    return res;
}

ll fac[maxfac], invfac[maxfac];
void init( int N ) {
    fac[0] = 1;
    for( int i = 1; i <= N; ++ i ) fac[i] = fac[i - 1] * i % mod;
    invfac[N] = qpow( fac[N], mod - 2, mod );
    for( int i = N - 1; i >= 0; -- i ) invfac[i] = invfac[i + 1] * ( i + 1 ) % mod;
}

ll nCr( ll n, ll r ) {
    if( n < r ) return 0;
    ll facc = 1;
    for( ll i = 0; i < r; ++ i ) facc = ( facc * ( ( n - i ) % mod ) ) % mod;
    return facc * invfac[r] % mod;
}

vector<int> adj[maxn];
int C[maxn], D[maxn];

ll ans = 1;
bool ok = 1;

struct Node { ll sumC, sumD; };

Node dfs( int u ) {
    ll sumC = C[u], sumD = D[u];
    for( int v : adj[u] ) {
        auto [CC, DD] = dfs( v );
        sumC += CC, sumD += DD;
    }
    if( sumC < sumD ) ok = 0;
    ll cnt = sumC - sumD + D[u];
    ans = ans * nCr( cnt, D[u] ) % mod;
    return { sumC, sumD };
}

void solve( ) {
    int n;
    cin >> n;

    for( int i = 2; i <= n; ++ i ) {
        int pi; cin >> pi;
        adj[pi].pb( i );
    }

    for( int i = 1; i <= n; ++ i ) cin >> C[i];
    for( int i = 1; i <= n; ++ i ) cin >> D[i];

    dfs( 1 );
    if( ok ) cout << ans << '\n';
    else cout << 0 << '\n';
}
```
{% endfold %}

### 后记

这个 F 和 G 等我补完再上传题解到群里吧，先凑合看看，我得去打 CF 了。