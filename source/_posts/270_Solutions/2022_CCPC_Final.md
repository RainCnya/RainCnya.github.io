---
title: "[Solution] 2022_CCPC_Final"
tags:
  - 2022
  - CCPC/Final
  - 难度/P5
date: 2026-04-17
---

## E. CCPC String

### 1. 题意

给定一个字符串，含有 `C | P | ?`，问最多能组成多少个 `CCPC`，也可以是 `CCCCPCC`，等。

### 2. 思路

发现核心限制条件其实是 `P` 的位置，所以重点在判断两个 `P` 之间的距离。在字符串前后各加一个 `P` 作为哨兵，然后二分查询每个不是 `C` 的前后继 `P` 即可。总贡献值为 $min( left / 2, right )$。

### 3. 代码

{% fold info @AcCode %}
```cpp
const int maxn = 2e5 + 5;

void solve( ) {
    string s;
    cin >> s;
    s = 'p' + s + 'p';
    int n = s.length( );

    vector< int > pos ;
    for( int i = 0; i < n; ++ i ) if( s[i] == 'p' ) pos.push_back( i );

    ll ans = 0;
    for( int i = 1; i < n - 1; ++ i ) {
        if( s[i] == 'c' ) continue;
        int p1 = lower_bound( pos.begin( ), pos.end( ), i ) - pos.begin( ) - 1;
        int p2 = upper_bound( pos.begin( ), pos.end( ), i ) - pos.begin( );
        int left = abs( i - pos[p1] ) - 1, right = abs( i - pos[p2] ) - 1;
        ans += min( left / 2, right );
    }
    cout << ans << '\n';
}
```
{% endfold %}


## F. Chase Game 3

### 1. 题意

在一个 $n$ 个点的图上，有两条链：$L_1$ 是标准的 $1 \leftrightarrow 2 \leftrightarrow \dots \leftrightarrow n$；$L_2$ 是按排列顺序连接的 $p_1 \leftrightarrow p_2 \leftrightarrow \dots \leftrightarrow p_n$。 Q 在 $L_1$ 上走，C 在 $L_2$ 上走。两人轮流移动（或原地不动）。
**问：** 是否对于**任意**的初始位置，C 都存在必胜策略能在有限步内与 Q 相遇？

### 2. 思路

把样例的图画出来，然后计算两个相邻下标点之间，L1 和 L2 两条链的距离。注意到，L1 的距离为 1，然后如果存在 L2 的距离为 3 及以上的，都是不可能的情况。大胆猜测这就是正解，考虑验证，的确可行，如果距离大于 2，Q 就可以在两个点之间来回横跳，而 C 需要更多的时间去追赶。

### 3. 代码

{% fold info @AcCode %}
```cpp
const int maxn = 4e5 + 5;
int p[maxn], n;

void solve( ) {
    cin >> n;
    map<int, int> mp;

    for( int i = 1; i <= n; ++ i ) {
        cin >> p[i];
        mp[p[i]]=i;
    }

    for( int i = 1; i <= n-1; ++ i ) {
        if( abs( mp[i] - mp[i+1] ) > 2 ) {
            cout << "No" << '\n';
            return ;
        }
    }
    cout << "Yes" << '\n';
}
```
{% endfold %}

## L. Completely Multiplicative Function

### 1. 题意

要求构造一个长度为 $n$ 的 $(1, -1)$ 序列，满足下列要求：
1. $f(x) = \{-1, 1\}$。
2. $f(x)f(y) = f(xy)$。
3. $f(1) + f(2) + \cdots + f(n) = k$。

### 2. 思路

这个 $f(x)f(y) = f(xy)$，下意识联想到数论中的积性函数，然后我就想到欧拉函数，然后就跑偏了。大胆猜测贪心，$-1$ 的位置大概率和质数有关，假设我修改 $k$ 为 $-1$，那么 $k^3, k^5, \dots$ 都是 $-1$，同时所有包括质因数 $k$ 的奇数次幂的数也会被反转。

然后分析题意，什么情况下是不可行的，假设有 $a$ 个 1，$b$ 个 $-1$，就可以得到下列方程，$a - b = k, a + b = n$，求解得到 $a = \frac{n+k}{2}, b = \frac{n-k}{2}$，发现如果 $n$ 和 $k$ 的奇偶性不同，无法得到整数的 $a$ 和 $b$，此时不可能构造。

接着考虑如何贪心反转，从小到大反转，还是从大到小反转。注意到 $> \frac{n}{2}$ 的质数的贡献值一定为 1，因为最小的质数是 2，乘起来会超过 $n$；而 $\leq \frac{n}{2}$ 的质数，数字越小，贡献值越大。答案呼之欲出，从小到大贪心，然后用 $> \frac{n}{2}$ 的质数补充剩余空隙。

注意特判最后 $-1$ 的数量是不是等于 $b$，如果不等于，也是不可以构造的。

### 3. 代码

{% fold info @AcCode %}
```cpp
const int maxn = 1e6 + 5;
int minp[maxn];
vector<ll> primes;

void sieve( ) {
    for( ll i = 2; i < maxn; ++ i ) {
        if( minp[i] == 0 ) {
            minp[i] = i;
            primes.push_back( i );
        }
        for( ll p : primes ) {
            if( p > minp[i] || i * p >= maxn ) break;
            minp[i * p] = p;
        }
    }
}

int ans[maxn], n, k;

void solve( ) {

    cin >> n >> k;

    if( n % 2 != k % 2 || k > n ) {
        cout << -1 << '\n';
        return;
    }

    int need = ( n - k ) / 2; // -1
    for( int i = 1; i <= n; ++ i ) ans[i] = 1;
    int cnt = 0;

    int sz = primes.size( );

    for( int p : primes ) {
        if( p > n / 2 || p > n ) break;
        if( cnt == need ) break;

        int delta = 0;
        for( ll pp = p; pp <= n; ) {
            for( ll i = pp; i <= n; i += pp ) {
                if( (i / pp) % p != 0 ) {
                    if( ans[i] == 1 ) delta ++;
                    else delta --;
                }
            }
            if( n / p / p < pp ) break;
            pp *= (p * p);
        }

        if( delta > 0 && cnt + delta <= need ) {
            cnt += delta;
            for( ll pp = p; pp <= n; ) {
                for( ll i = pp; i <= n; i += pp ) {
                    if( (i / pp) % p != 0 ) ans[i] *= -1;
                }
                if( n / p / p < pp ) break;
                pp *= (p * p);
            }
        }
    }

    if( cnt < need ) {
        for( ll p : primes ) {
            if( p <= n / 2 ) continue;
            if( p > n ) break;
            if( cnt == need ) break;
            ans[p] = -1;
            cnt ++;
        } 
    }

    if( cnt != need ) {
        cout << -1 << '\n';
    } else {
        for( int i = 1; i <= n; ++ i ) cout << ans[i] << " ";
        cout << '\n';
    }
}
```
{% endfold %}

## J. Best Carry Player 3

### 1. 题意

给定 $X, Y, K$，每次可以进行下列三种操作，问至少几次可以把 $X$ 转化为 $Y$。$X$ 加一；$X$ 减一；$X$ 异或 $[0,k]$ 中的一个数。

### 2. 思路

题目问最小操作次数，首选 BFS 暴力，显然不会这么简单，那就需要研究异或（位运算）的性质了。然后发现，关键点在于这个异或上，也就是说，在 $k$ 最高位及其以下的比特位，都是可以通过异或来进行修改的，但是更高位的就只能通过 $+1$ 来处理了。

接着就可以把给定的 $X$ 划分为两块，记 $L$ 是大于 $k$ 的最小 2 的幂，也就是 $2^{m+1}$，（$m$ 是 $k$ 的最高位数）那么任何数字 $N$ 都可以写成 $N = H \cdot L + R$，$H$ 是高位的部分，而 $R$ 是低位的部分。

接着处理低位的情况，在一个块的内部，从 $a$ 到 $b$ 的最少步数 $dist(a, b)$ 为以下三种情况：0 步：$a = b$；1 步：$|a - b| = 1$ 或者 $(a \oplus b) \leq k$；2 步：剩余情况。

然后贪心，如果 $X, Y$ 不在同一块内，就需要先让 $X$ 的地位变成 $L-1$，然后再通过 $+1$ 的操作来进行进位。如果中间隔着很多完整的块，每个块的代价都是固定的。需要从 $0$ 走到 $L-1$，再 $+1$，单块代价：$w = dist(0, L-1) + 1$，总代价就是 $(H_{y} - H_{x} - 1) \cdot w$。最后补齐 $X$ 的低位即可：$dist(0, Y \% L)$。

### 3. 代码

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 2e5 + 5;

int dist( ll x, ll y, ll k ) {
    if( x == y ) return 0;
    if( abs(x - y) <= 1 || (x ^ y) <= k ) return 1;
    else return 2;
}

void solve( ) {
    ll x, y, k;
    cin >> x >> y >> k;
    if( x > y ) swap( x, y );
    if( x == y ) { cout << 0 << '\n'; return; }
    if( k <= 1 ) { cout << abs( x - y ) << '\n'; return; }

    int msb = (int)log2( k ); // k - MSB
    ll L = 1ll << ( msb + 1 );

    ll Hx = x / L, Rx = x % L;
    ll Hy = y / L, Ry = y % L;

    if( Hx == Hy ) {
        // 同一个块内，直接计算
        cout << dist( Rx, Ry, k ) << '\n';
        return;
    }
    else {
        ll ans = 0;
        // 1. 从当前位置 Rx 走到 L-1, 然后 +1 进位
        ans += dist( Rx, L-1, k ) + 1;
        // 2. 中间跨越完整的块
        if( Hy > Hx + 1 ) {
            // 每过一个块，都需要从 0 -> L-1, 再 +1 进位
            ll w = dist( 0, L-1, k ) + 1;
            ans += (Hy - Hx - 1) * w;
        }
        // 3. 在目标块中从 0 走到 Ry
        ans += dist(0, Ry, k);
        cout << ans << '\n';
    }
}

int main( ) {
    cin.tie( 0 )->sync_with_stdio( 0 );
    int _t = 1; cin >> _t;
    while( _t -- ) solve( );
    return 0;
}
```
{% endfold %}

## C. DFS Order 3

### 1. 题意

给定一棵 $n$ 个节点的树，分别从 $1 \to n$ 点开始的 DFS 序，要求构造出原树。 

### 2. 思路

本题需要用到两个 DFS 的定理（当然我赛前不知道，没写出来）。
1. DFS 序中最后一个点一定是叶子节点。
2. DFS 序中第二个点一定与第一个点直接相连。

因为保证存在一颗满足条件的树，不妨假设 1 为根节点，然后枚举叶子节点，从 1 出发的 DFS 序中，从后往前删点，同时添加边即可。

注意细节，既然 $v$ 是叶子节点，那么根据引理1 它在整棵树中只有一个邻居，接着根据 引理2 以 $v$ 为根节点的 DFS，`D[v][2]` 一定就是它的相邻点。

### 3. 代码

{% fold info @AcCode %}
```cpp

const int maxn = 1000 + 5;
int D[maxn][maxn], n;
int ptr[maxn];
bool del[maxn];

void solve( ) {
    cin >> n;

    for( int i = 1; i <= n; ++ i ) del[i] = 0, ptr[i] = 2;

    for( int i = 1; i <= n; ++ i ) {
        for( int j = 1; j <= n; ++ j ) {
            cin >> D[i][j];
        }
    }

    int rt = 1, lf = n;
    vector< pair<int, int> > edges;
    
    for( int k = 0; k < n - 1; ++ k ) {
        while( del[ D[rt][lf] ] ) lf --;
        int v = D[rt][lf];
        while( del[ D[v][ptr[v]] ] ) ptr[v] ++;
        int u = D[v][ptr[v]];
        edges.push_back({ u, v });
        del[v] = 1;
    }

    for( auto [u, v] : edges ) cout << u << " " << v << '\n';
}
```
{% endfold %}