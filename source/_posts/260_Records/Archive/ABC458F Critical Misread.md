---
title: 'ABC458F Critical Misread'
tags:
  - algorithm/记录
  - 字符串/AC自动机
  - DP
  - 矩阵快速幂
categories:
  - 260_Records
  - Archive
abbrlink: 5b277fdf
date: 2026-05-16 00:00:00
---
# [F - Critical Misread](https://atcoder.jp/contests/abc458/tasks/abc458_f)

## 题意
给定 $K$ 个禁止出现的字符串 $S_i$。求长度为 $N$ 且不包含任何禁止字符串的字母序列总数。 

> $N \le 10^9, K \le 10, |S_i| \le 10$。

## 思路
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


## 思路 1：线性递推

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

## 思路 2：矩阵快速幂优化

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
