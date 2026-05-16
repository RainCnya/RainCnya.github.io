---
title: '[Solution] ABC458 A~F'
tags: ABC
categories:
  - 270_Solutions
  - ABC
abbrlink: ece3c2a6
date: 2026-05-16 00:00:00
---

### 前记

本次赛时到 F，G 大概推导了一下，发现是很奇怪的斜率问题，基于知识树深度广度不足，战略性放弃。

### [A - Chompers](https://atcoder.jp/contests/abc458/tasks/abc458_a)

#### 题意
给定一个字符串 $S$，一个数 $N$，问删去前 $N$ 个和后 $N$ 个元素的子串是什么。

#### 思路
substr 糊一下就好了。

### [B - Count Adjacent Cells](https://atcoder.jp/contests/abc458/tasks/abc458_b)

#### 题意
给定一个二维数组，问每个格子周围有几个格子，超出范围的不算。

#### 思路
发现数据规模很小，直接暴力枚举即可。

#### 代码部分
{% fold info @AcCode %}
```cpp
int f( int x, int y ) {
    return 1 <= x && x <= n && 1 <= y && y <= m;
}

void solve( ) {
    cin >> n >> m;
    vector<vector<int>> a( n + 1, vector<int>( m + 1 ) );

    for( int i = 1; i <= n; ++ i ) {
        for( int j = 1; j <= m; ++ j ) {
            a[i][j] += f(i-1,j) + f(i,j-1) + f(i+1,j) + f(i,j+1);
        }
    }

    for( int i = 1; i <= n; ++ i ) {
        for( int j = 1; j <= m; ++ j ) {
            cout << a[i][j] << ' ';
        }
        cout << '\n';
    }
}
```
{% endfold %}
### [C - C Stands for Center](https://atcoder.jp/contests/abc458/tasks/abc458_c)

#### 题意
给定一个字符串 $S$，问有多少个子串的中心元素是 $'C'$。

> $|S| \leq 1e5$

#### 思路
发现子串必须是奇数长度，不然没有中间元素，其次子串是连续的子序列，所以对于每个 `C` 字符都左右扩展找到最长的子串个数就好了。 

#### 代码部分
{% fold info @AcCode %}
```cpp
void solve( ) {
    string s;
    cin >> s;
    ll ans = 0;
    int n = s.size( );
    for( int i = 0; i < n; ++ i ) {
        if( s[i] == 'C' ) {
            ll cnt = min( i, n - i - 1 ); // 左边 i | 右边 n - 1 - i
            ans += cnt + 1; // 0->cnt
        }
    }
    cout << ans << '\n';
}
```
{% endfold %}

### [D - Chalkboard Median](https://atcoder.jp/contests/abc458/tasks/abc458_d)

#### 题意
刚开始有一个数 $X$，有 $Q$ 次查询，每次查询加入两个数 $A_{i}, B_{i}$，问当前 $2i + 1$ 个数的中位数。 

> $X, A_{i}, B_{i} \leq 1e9, Q \leq 2e5$

#### 思路
动态维护中位数的问题，由于是动态的不好维护，我最开始想的是权值树状数组维护，二分查询，但是值域很大，但实际的值并不多，可以离散化处理，不过还是很麻烦（理论可行）。

想了想，还是祭出 `multiset` 这个基于平衡树的数据结构，由于插入元素之后，已有的迭代器不会失效，而每次最多加入两个元素，发现中位数只有三种情况，不变，左移一位，右移一位，最后分类讨论维护中位数迭代器即可。

> 注：赛后我注意到了 **对顶堆** 也可以实现这个维护。不过我这里就不展开了，不是因为我不会用。

#### 代码部分
{% fold info @AcCode %}
```cpp
void solve( ) {
    int x, q;
    cin >> x >> q;

    multiset<int> s;
    auto mid = s.insert( x );

    for( int i = 1; i <= q; ++ i ) {
        int a, b;
        cin >> a >> b;
        int cur = *mid;
        s.insert( a ), s.insert( b );
        if( a < cur && b < cur ) mid --;
        else if( a >= cur && b >= cur ) mid ++;
        cout << *mid << '\n';
    }
}
```
{% endfold %}

### [E - Crossing Table Cloth](https://atcoder.jp/contests/abc457/tasks/abc457_e)

#### 题意
给定 $X_{1}, X_{2}, X_{3}$，求有多少个序列满足要求，序列中有 $X_{1}$ 个 1，$X_{2}$ 个 2，$X_{3}$ 个 3，每两个元素之间差值 $\leq 1$。

> $X_{1}, X_{2}, X_{3} \leq 1e6$

#### 思路
计数问题，难道是 DP，定义 $DP[i][j][k][lst]$ 表示使用了 $i$ 个 1，$j$ 个 2，$k$ 个 3，最后一个是 $last$ 的方案数。但是一看数据规模 ...... 好吧，还是想想别的方法吧。

观察到一个很重要的限制条件 “每两个元素之间差值 $\leq 1$”，这就意味着 1 和 3 是无法直接相邻的，也就是说 1 和 3 之间必须有一个 2 过渡，那就可以用插空法了，把 $X_{2}$ 个 2 之间隔出来的 $X_{2} + 1$ 个空位分给 1 和 3。

每一个空位中，我们可以放入若干个 1，或者若干个 3，或者不放，那么问题就转化为了在 $X_{2} + 1$ 个空位中，将 $X_{1}$ 个 1 和 $X_{3}$ 个 3 放入不同的空位中，使得没有一个空位同时存在 1 和 3。

从 $X_{2} + 1$ 个空位中选择 $c_{1}$ 个放 1 的方案是 $\binom{ X_{2}+1 }{ c_{1} }$。从剩下的 $X_{2} + 1 - c_{1}$ 个空位中选择 $c_{3}$ 个放 3 的方案是 $\binom{ X_{2} + 1 - c_{1} }{ c_{3} }$。

接着考虑分配元素，把 $X_{1}$ 个 1 放入这 $c_{1}$ 个空位中，每个位置至少放一个，方案数是 $\binom{ X_{1} - 1 }{ c_{1} - 1 }$。同理 $X_{3}$ 个 3 放入这 $c_{3}$ 个空位中，每个位置至少放一个，方案数是 $\binom{ X_{3}-1 }{ c_{3}-1 }$，然后枚举所有的 $c_{1}$ 和 $c_{3}$ 情况就可以得到答案了，如下：

$$
\sum_{c_{1}=1}^{X_{1}} \sum_{c_{3}=1}^{X_{3}} \binom{ X_{2}+1 }{ c_{1} } \times \binom{ X_{2} + 1 - c_{1} }{ c_{3} } \times \binom{ X_{1} - 1 }{ c_{1} - 1 } \times \binom{ X_{3}-1 }{ c_{3}-1 }
$$

接着我们就可以写出下面这种代码：

{% fold info @AcCode %}
```cpp
ll ans = 0;
for( int c1 = 0; c1 <= x1; ++ c1 ) {
	for( int c3 = 0; c3 <= x3; ++ c3 ) {
		ll t1 = nCr( x2 + 1, c1 );
		ll t2 = nCr( x2 + 1 - c1, c3 );
		ll t3 = nCr( x1 - 1, c1 - 1 );
		ll t4 = nCr( x3 - 1, c3 - 1 );
		ll tmp = ( ( t1 * t2 ) % mod * ( t3 * t4 ) % mod );
		ans = ( ans + tmp ) % mod;
	}
}
```
{% endfold %}

然后就发现 $N^{2}$ 死了，考虑优化，显然公式已经化到最简了，考虑能否合并，注意 2 和 4 两项：

$$ 
\sum_{c_3} \text{t2} \times \text{t4} = \sum_{c_3} \binom{X_2 + 1 - c_1}{c_3} \times \binom{X_3 - 1}{c_3 - 1} 
$$

由于组合数的对称性 $\binom{ n }{ r } = \binom{ n }{ n-r }$，可以把后半部分改写成 $\binom{ X_{3}-1 }{ X_{3}-c_{3} }$，接着根据**范德蒙恒等式**，就可以把两个柿子合并了：

$$ 
\binom{(X_2 + 1 - c_1) + (X_3 - 1)}{X_3} = \binom{X_2 + X_3 - c_1}{X_3} 
$$

然后我们只需要枚举 $c_{1}$，就可以实现 $O(N)$ 计算了，至此AC。

> 范德蒙恒等式是什么？简单来说就是下面这种形式：证明不在此展开

$$
\sum_{i} \binom{a}{i} \binom{b}{n-i} = \binom{a+b}{n}
$$

#### 代码部分
{% fold info @AcCode %}
```cpp
ll qpow( ll a, ll k, ll mod ) {
    ll res = 1; a %= mod;
    for( ; k; k >>= 1, a = a * a % mod ) 
        if( k & 1 ) res = res * a % mod;
    return res;
}

ll fac[maxn], invfac[maxn];
void init( int N ) {
    fac[0] = 1;
    for( int i = 1; i <= N; i ++ ) fac[i] = fac[i - 1] * i % mod;
    invfac[N] = qpow( fac[N], mod - 2, mod );
    for( int i = N - 1; i >= 0; i -- ) invfac[i] = invfac[i + 1] * ( i + 1 ) % mod;
}

ll nCr( int n, int r ) {
    if( n < r ) return 0;
    return fac[n] * invfac[n - r] % mod * invfac[r] % mod;
}
// 略去前面预处理 nCr 相关的模板。最后的调用 nCr(n, r) 就是 n 个里面选 r 个。
// 最后想了想还是加上吧，我也不知道为什么

void solve( ) {
    ll x1, x2, x3;
    cin >> x1 >> x2 >> x3;
    ll len = x1 + x2 + x3;
	
    ll ans = 0;
    for( int c1 = 1; c1 <= x1; ++ c1 ) {
        ll t1 = nCr( x2 + 1, c1 );
        ll t3 = nCr( x1 - 1, c1 - 1 );
        ll t24 = nCr( x2 + x3 - c1, x3 );
        ll tmp = ( ( t1 * t3 ) % mod * t24 % mod );
        ans = ( ans + tmp ) % mod;
    }
    cout << ans << '\n';
}
```
{% endfold %}

### [F - Critical Misread](https://atcoder.jp/contests/abc458/tasks/abc458_f)

#### 题意
给定 $K$ 个禁止出现的字符串 $S_i$。求长度为 $N$ 且不包含任何禁止字符串的字母序列总数。 

> $N \le 10^9, K \le 10, |S_i| \le 10$。

#### 思路
怎么又是数数问题啊，虽然我很喜欢数数，但是连着两道是认真的吗？不扯了，开始分析：

首先是给了很多个模式串，首选考虑 AC自动机，从而实现对禁止字符串的识别。我们在自动机上走一步，就相当于在字符串末尾追加一个字母。（注：这里在构建 `fail` 指针时，如果一个节点 `u` 的 `fail` 指针指向了非法节点，就意味着当前前缀的某个后缀是非法的，那么当前 `u` 这一点也必须设置成非法的），如下：

{% fold info @Ac自动机 %}
```cpp
struct ACtree {
    int ch[maxn][26];
    int fail[maxn];
    bool bad[maxn];
    int tot;
    int get( char ch ) { return ch - 'a'; }

    void init( ) {
        for( int i = 0; i <= tot; ++ i ) {
            for( int j = 0; j < 26; ++ j ) ch[i][j] = 0;
            fail[i] = 0;
            bad[i] = 0;
        }
        tot = 0;
    }

    void insert( string s ) {
        int u = 0;
        for( char c : s ) {
            int v = get( c );
            if( !ch[u][v] ) ch[u][v] = ++ tot;
            u = ch[u][v];
        }
        bad[u] = 1;
    }

    void build( ) {
        queue<int> q;
        for( int i = 0; i < 26; ++ i ) {
            if( ch[0][i] ) {
                fail[ch[0][i]] = 0;
                q.push( ch[0][i] );
            }
        }
        while( !q.empty( ) ) {
            int u = q.front( );
            q.pop( );
            bad[u] |= bad[fail[u]];
            for( int i = 0; i < 26; ++ i ) {
                if( ch[u][i] ) {
                    fail[ch[u][i]] = ch[fail[u]][i];
                    q.push( ch[u][i] );
                } else {
                    ch[u][i] = ch[fail[u]][i];
                }
            }
        }
    }
} actree;
```
{% endfold %}


#### 思路 1：线性递推

在此基础上，我们可以写出一个标准的 $O(N)$ 递推 DP，定义 $DP[i][u]$ 为已经构建了长度为 $i$ 的字符串，并且停留在 AC 自动机的节点 $u$ 的方案数，那么它的转移方程是很直观的：

$$
DP[i][v] = \sum_{u \xrightarrow{c} v} DP[i-1][u]
$$
> 注：长度为 $i$ 时走到 $v$ 的方案数，等于所有能在加了一个字符 $c$ 后走到 $v$ 的前置节点 $u$ 的方案数之和。

于是我们可以写出下面这段代码：

{% fold info @O(N) %}
```cpp
dp[0][0] = 1;
for( int i = 1; i <= n; ++ i ) {
	for( int u = 0; u <= actree.tot; ++ u ) {
		if( actree.bad[u] || dp[i-1][u] == 0 ) continue;
		for( int ch = 0; ch < 26; ++ ch ) {
			int v = actree.ch[u][ch];
			if( !actree.bad[v] ) dp[i][v] = ( dp[i][v] + dp[i-1][u] ) % mod;
		}
	}
}
ll ans = 0;
for( int u = 0; u <= actree.tot; ++ u ) {
	ans = ( ans + dp[n][u] ) % mod;
}
cout << ans << '\n';
```
{% endfold %}

#### 思路 2：矩阵快速幂优化

我们发现 $O(N)$ 做法不能满足这个数据规模，考虑优化，继续观察题目条件，发现每个字符串最长只有 10，最大的字符串个数也是 10，那么总禁止串的长度也就是 $100$，这是个很小的状态数，考虑到 $O(N)$ 的递推失败，或许我们可以用矩阵快速幂加速递推？

注意到无论 $i$ 是 1 或是 $1e18$，从节点 $u$ 能否走到 $v$ 的规则是固定的，也就是说递推的系数是固定的，这就是一个常系数递推方程（注：斐波那契数列也是一个常系数递推方程，所以可以用矩阵快速幂优化，当然非常系数也可以，不过不在此展开）。

如果我们把所有的 $DP[i]$ 看作一个长度为 $M$ 的**列向量** $\vec{DP}_i$，那么状态转移方程可以写为：

$$\vec{DP}_i = A \times \vec{DP}_{i-1}$$

这里的 $A$ 就是一个 $M \times M$ 的**转移矩阵**。

**如何构建** A？对于列向量乘法，矩阵的第 $v$ 行第 $u$ 列元素 $A[v][u]$，代表着从节点 $u$ 走一步能到达节点 $v$ 的路径数（有几条边就能走几次）。如果 $u$ 到 $v$ 走不通或者目标是非法节点，$A[v][u]$ 就是 0。

在此图论概念的抽象上，我们只需要将递推式展开：

- $\vec{DP}_1 = A \times \vec{DP}_0$
- $\vec{DP}_2 = A \times \vec{DP}_1 = A^2 \times \vec{DP}_0$
- ...
- $\vec{DP}_N = A^N \times \vec{DP}_0$

就可以对 **转移矩阵** 进行 $O(\log N)$ 的计算，然后去乘上初始状态的列向量，最终，把所有答案列向量中合法节点的值累加起来就是答案了。

> 注：在代码实现中，由于我的矩阵乘法模板是 1-index，AC 自动机的板子是 0-index 的，所以在某些地方需要进行一些下标变换，我应该标记出来了。

{% fold info @O(M^3 log N) %}
```cpp
struct Matrix {
    ll m[maxsz][maxsz];
    int sz;
    Matrix( int _sz = 0 ) : sz( _sz ) { memset( m, 0, sizeof m ); }
    void init( ) { for( int i = 1; i <= sz; ++ i ) m[i][i] = 1; }
    friend Matrix operator *( Matrix a, Matrix b ) {
        Matrix res( a.sz );
        for( int i = 1; i <= a.sz; ++ i ) {
            for( int j = 1; j <= b.sz; ++ j ) {
                for( int k = 1; k <= a.sz; ++ k ) {
                    res.m[i][j] = ( res.m[i][j] + a.m[i][k] * b.m[k][j] % mod ) % mod;
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
// 上面是我的矩阵快速幂板子，为什么要贴出来呢？我也不知道

void solve( ) {
    ll n, k;
    actree.init( ); // 0-index

    cin >> n >> k;
    for( int i = 1; i <= k; ++ i ) {
        cin >> s[i];
        actree.insert( s[i] );
    }
    actree.build( );
    int sz = actree.tot + 1;
    
    Matrix A( sz ); // 1-index
    for( int u = 0; u <= actree.tot; ++ u ) {
        if( actree.bad[u] ) continue;
        for( int ch = 0; ch < 26; ++ ch ) {
            int v = actree.ch[u][ch];
            if( !actree.bad[v] ) A.m[v+1][u+1] ++; // 0->1
        }
    }
    
    Matrix res = mqpow( A, n );
    ll ans = 0;
    for( int i = 0; i <= actree.tot; ++ i ) {
        if( actree.bad[i] ) continue;
        ans = ( ans + res.m[i+1][1] ) % mod; // 0->1
    }
    cout << ans << '\n';
}
```
{% endfold %}

### 后记

写完回过头来看官方题解，发现怎么全是日文...... 好吧，那还是看看我这篇中文题解吧，应该也许能更好理解一点。

明天就是邀请赛了，希望自己加油。每次打 ABC 都能学到很多东西，而我写题解的初衷，就是想把这些学到的知识和自己的理解传达出去。

当然，这也不完全是无私的。毕竟在硬着头皮把推导过程写成文字的时候，我自己对这些逻辑的理解也变得更深刻了，这大概就是 “输出倒逼输入” 的费曼学习法吧。

最后，祝我，也祝看到这里的你，都能在各自的路上砥砺前行。非常感谢你的支持！