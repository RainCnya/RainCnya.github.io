---
title: 'ABC448E Simple Division'
tags:
  - 数学/数论
  - 数学/线代/矩阵快速幂
  - 字符串/游程编码
categories:
  - 260_Records
  - Archive
abbrlink: 86aa6cea
date: 2026-03-08 00:00:00
---
# [E - Simple Division](https://atcoder.jp/contests/abc448/tasks/abc448_e)

前置芝士：基础数论 | 矩阵快速幂

## 1. 题意梗概

给定整数 $N$ 的游程编码表示（ 由 $K$ 段组成，第 $i$ 段是连续 $l_i$ 个数字 $c_i$ ）和一个整数 $M$。 求 $\lfloor N / M \rfloor \pmod{10007}$ 的值。

> $M \leq 10^4; K \leq 10^5; l_i \leq 10^9$

## 2. 逻辑推导

看不懂题面，看一下样例：

```txt
6 7
3 1
1 1
6 1
2 2
7 2
6 2
```

所以 $N = 316227766$，对比一下应该是能看得懂的吧。

这里插一道类似的题：[P3216 [HNOI2011] 数学作业 - 洛谷](https://www.luogu.com.cn/problem/P3216) 大体思路差不多。

## 2.1 切入点

这里我简单推一下公式，因为这个公式比较抽象：

$$
\left\lfloor  \frac{N}{M}  \right\rfloor = \frac{N - N \bmod M}{M}
$$

然后我们要求：

$$
\left\lfloor  \frac{N}{M}  \right\rfloor \pmod P = \frac{N - N \bmod M}{M} \pmod P
$$

因为模意义下的除法很麻烦，而且这里如果 $M$ 和 $P$ 不互质的话，就没法求逆元。

所以这里我采用一个类似换元法的方法接着推：设 $R = N \pmod{PM}$，那么 $N = k(PM) + R$，代入式子得：

$$
\left\lfloor  \frac{N}{M}  \right\rfloor = \left\lfloor  \frac{k(PM)+R}{M}  \right\rfloor = \left\lfloor kP + \frac{R}{M}  \right\rfloor  
$$

最后对其取模 $P$，可得：

$$
\left\lfloor  kP + \frac{R}{M}  \right\rfloor \pmod P = \left\lfloor  \frac{R}{M}  \right\rfloor \pmod P 
$$

好，至此，我们得到了一个能用的算子，问题就转化为了求出大数 $N$ 在模 $(PM)$ 意义下的值，然后除以 $M$ 即可。

> C 语言中的除法自然向下取整哈

## 2.2 思路分析

接着我们捋一捋这个大数 $N$ 怎么推，很简单的思路就是 $X = X \cdot 10 + c_{0}$，简单的递推就行。

但是！！！ $l_{i} \leq 10^9$，如果线性递推的话，直接就 TLE 了，接着考虑优化。

首先这是个递推关系，然后复杂度太高了，所以我们可以考虑矩阵快速幂加速。

下面简要写一下这个矩阵是怎么构造的，具体线代的知识咱不在这里展开了:

根据递推式 $X = X \cdot 10 + 1 \cdot c$，我们发现我们其实需要维护两个状态 $X$ 和 $1$，因此答案矩阵为：

$$
\begin{bmatrix}
X \\
1 \\
\end{bmatrix}
$$

> 答案矩阵一般都是单列的，需要什么放什么，注意是必要的状态。

然后构造转移矩阵：

$$
\begin{bmatrix}
10 & c_{0} \\
0 & 1 \\
\end{bmatrix}
$$

怎么来的？我可以待定系数法解一遍：

$$
\begin{bmatrix}
a & b \\
c & d \\
\end{bmatrix}
\times \begin{bmatrix}
X \\
1 \\
\end{bmatrix}
= \begin{bmatrix}
aX + b \\
cX + d \\
\end{bmatrix}
$$

然后对照递推式，解得 $a = 10, b = c_{0}, c = 0, d = 1$，是这么来的。

这块内容也没有涉及到很高深的线性代数，它的使用只需要了解基本的矩阵乘法概念，然后就可以很简单地写出转移了，作用就是把 $O(N)$ 的线性**递推**，用快速幂思想加速。

这样就很轻松能在 $O( \log N )$ 的时间内求出这个大数 $N$ 了，这个代码前半部分不写注释了，你完全可以当做是一个模板，只需要你掌握待定系数法，你就能写。

## 3. 代码实现

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxsz = 3;

ll mod = 10007;
int k, m;

// 矩阵快速幂模板
// 这里简单说一下怎么用，矩阵的具体大小用 const int maxsz 来定义，比如说这题的矩阵是 2 * 2
// 但是下标是从 0 开始，所以 maxsz = 3；然后如何创建一个矩阵？比如说 Matrix T( 2 )；
// 就是新建一个矩阵，数据类型为矩阵结构体，变量名为 T，参数，也就是大小为 2
// 如果你想来了解这些语句具体的含义，可以查 AI，因为篇幅原因就不在这里展开了。
// ----------
struct Matrix {
    ll m[maxsz][maxsz];
    int sz;
    Matrix( int s = 0 ) : sz( s ) { memset( m, 0, sizeof( m ) ); }
    void init( ) { for( int i = 1; i <= sz; ++ i ) m[i][i] = 1; }

    friend Matrix operator * ( const Matrix &a, const Matrix &b ) {
        Matrix res( a.sz );
        for( int i = 1; i <= res.sz; ++ i ) {
            for( int k = 1; k <= res.sz; ++ k ) {
                if( a.m[i][k] == 0 ) continue;
                for( int j = 1; j <= res.sz; ++ j )
                    res.m[i][j] = ( res.m[i][j] + a.m[i][k] * b.m[k][j] ) % mod;
            }
        }
        return res;
    }
};

// 快速幂 - 矩阵版本
Matrix mqpow( Matrix a, ll k ) 
{
    Matrix res( a.sz ); res.init( );
    for( ; k; k >>= 1, a = a * a )
        if( k & 1 ) res = res * a;
    return res;
}
// ----------

void solve( )
{
    cin >> k >> m;
	
	// 这里就是我们通过数论推导的大模数
    mod = mod * m;
	
    ll res = 0;
    for( int i = 1; i <= k; ++ i )
    {
        ll c, l;
        cin >> c >> l;
        
        // 这里是转移矩阵构建
        Matrix T( 2 );
        T.m[1][1] = 10, T.m[1][2] = c;
        T.m[2][1] = 0, T.m[2][2] = 1;
		// 矩阵快速幂完成递推
        T = mqpow( T, l );
		// 更新答案矩阵，因为第二个值是固定的 1，所以我这里就偷懒直接更新这个 X 了
        res = ( T.m[1][1] * res + T.m[1][2] * 1 ) % mod;
    }   
    cout << res / m << '\n';
}

int main( )
{
    ios::sync_with_stdio( 0 ); cin.tie( 0 );
    solve( );
    return 0;
}
```
