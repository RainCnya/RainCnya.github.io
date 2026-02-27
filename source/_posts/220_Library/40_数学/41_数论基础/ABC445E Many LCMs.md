---
title: '[Leaf] [ABC445E] Many LCMs'
tags:
  - 数论/LCM
  - 数论/逆元
  - 难度/P4
categories:
  - 220_Library
  - 40_数学
  - 41_数论基础
abbrlink: 8c170c6a
date: 2026-02-15 13:34:36
---

# [E - Many LCMs](https://atcoder.jp/contests/abc445/tasks/abc445_e)

## . 题面梗概

**中译中**：给一个序列 $A$，对于每一个位置 $k$，求出除去 $A_k$ 之外剩下所有元素的最小公倍数（LCM）对 $998244353$ 取模的结果。

## 2. 逻辑推导

直接暴力求 $N-1$ 个数的 LCM 是 $O(N^2 \log A)$，显然会炸。我们需要对 LCM 的本质切入分析。

### 2.1 LCM

根据算术基本定理，若 $LCM(A_{1},\dots,A_{n}) = \prod p_{i}^{e_{i}}$，则 

$$
e_{i} = \max_{1 \leq j \leq n}(v_{pi}(A_{j}))
$$

其中 $v_{p}(x)$ 表示 $x$ 的质因子 $p$ 的最高次幂。

那么其实 LCM 本质上就是在收集所有数中每个质因子的最高次幂。

随便举个例子 $8, 9, 15$。

$8 = 2^3, 9 = 3^2, 15 = 3^1 \times 5^1$，所以 $LCM(8, 9, 15) = 2^3 \times 3^2 \times 5^1$。

### 2.2 最大值和次大值

如果我们删掉这个 $A_{k}$，LCM 什么情况下会发生改变呢？我们发现对于某个质因子 $p$ 来说，其在 LCM 的幂次中只有一种情况会改变：

- $A_{k}$ 贡献了这个质因子 $p$ 的最高次幂，而且全序列中只有它贡献了。

此时删掉这个 $A_{k}$ 之后，$p$ 的幂次就会下降到次大高次幂，其他情况保持不变。

### 2.3 逆元

这里还有一点细节，如果 $A_{k}$ 确实影响了全局 LCM，那么我们只需要：

$$
\frac{LCM}{p^{max1}} \times p^{max2} = \frac{LCM}{p^{max1 - max2}}
$$

但是这里涉及到模意义下的除法了，我们需要求 $p^{max1 - max2}$ 在模 $998244353$ 的逆元，由于这个模数本身就是质数，根据费马小定理，我们直接对 $p^{max1 - max2}$ 求 $mod - 2$ 次幂即可。

### 2.4 结论

这是个数论问题，考察对 LCM 本质的理解以及维护最大和次大的技巧。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxA = 1e7 + 5;
const int maxn = 2e5 + 5;
const int mod = 998244353;

ll p[maxA];
ll max1[maxA], max2[maxA], cnt1[maxA];

vector< pair< ll, ll > > fac[maxn];
vector< ll > primes;
ll a[maxn];
int n;

ll qpow( ll a, ll b ) 
{
    ll res = 1;
    while( b ) 
    {
        if( b & 1 ) res = (res * a) % mod;
        a = (a * a) % mod;
        b >>= 1;
    }
    return res;
}

// 这里是线性筛预处理最小质因子，加速分解质因数
void init( int n )
{
    for( int i = 2; i <= n; ++ i )
    {
        if( p[i] ) continue;
        for( int j = i; j <= n; j += i ) 
            if( !p[j] ) p[j] = i;
    }
}

// 质因数分解
void get_factor( int id, int val )
{
    fac[id].clear( );
    while( val > 1 )
    {
        int prime = p[val];
        int cnt = 0;
        while( val % prime == 0 ) val /= prime, cnt ++;
        fac[id].push_back({ prime, cnt });
        
        // 这里就是维护最大值和次大值。
        if( cnt > max1[prime] ) 
        {
            max2[prime] = max1[prime];
            max1[prime] = cnt;
            cnt1[prime] = 1;
            primes.push_back( prime );
        }
        else if( cnt == max1[prime] ) cnt1[prime] ++;
        else if( cnt > max2[prime] ) max2[prime] = cnt;
    }
}

void solve( )
{
    cin >> n;
    primes.clear( );
    for( int i = 1; i <= n; ++ i )
    {
        cin >> a[i];
        get_factor( i, a[i] );
    }

    sort( primes.begin( ), primes.end( ) );
    primes.erase( unique( primes.begin( ), primes.end( ) ), primes.end( ) );

    ll LCM = 1;
    for( int p : primes )
    {
        LCM = ( LCM * qpow( p, max1[p] ) ) % mod;
    }

    for( int i = 1; i <= n; ++ i )
    {
        ll res = LCM;
        for( auto [p, c] : fac[i] )
        {
            if( c == max1[p] && cnt1[p] == 1 )
            {
	            // 注意除法逆元处理
                ll inv = qpow( p, max1[p] - max2[p] ) % mod;
                res = res * qpow( inv, mod - 2 ) % mod;
            }
        }
        cout << res << " ";
    }
    cout << "\n";

	// 多测删除冗余数据，防止污染
    for( int p : primes )
    {
        max1[p] = max2[p] = cnt1[p] = 0;
    }
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    // 别忘了初始化哦
    init( maxA - 1 );
    int _t = 1;
    cin >> _t;
    while( _t -- ) solve( );
    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度分析**：预处理：$O(A)$。质因数分解：$O(N \log A)$。
        
- **碎碎念**：在处理 **删去一个元素** 的问题时，维护最大值和次大值是比较通用的技巧。
		
- **关联笔记**：[[41_数论基础]]