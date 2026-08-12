---
title: ABC469G K-nacci Operations
tags:
  - 数学/线代/矩阵快速幂
  - 数学/仿射变换
  - 方法/状态压缩
status: solved
categories:
  - 260_Records
  - Archive
abbrlink: a469g001
date: 2026-08-01 00:00:00
updated: 2026-08-04 00:00:00
---

# ABC469G K-nacci Operations

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

## 记录

- 来源：[[ABC469 A~G]]；
- 归属：[[线性代数 - 矩阵快速幂相关]]；
- 新增：把巨大操作串压成位置上的仿射变换，利用复合与逆元把 K 项非交换递推化为周期系数的低维线性递推，再按周期做矩阵快速幂；赛时完成主要推导但未调通，当前实现为赛后闭环。
- 分类：待定

