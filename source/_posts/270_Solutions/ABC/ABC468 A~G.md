---
title: '[Solution] ABC468 A~G'
tags:
  - algorithm/比赛
status: reviewed
categories:
  - 270_Solutions
  - ABC
abbrlink: 1d70809e
date: 2026-07-25 00:00:00
updated: 2026-07-25 00:00:00
---

# [Solution] ABC468

## 一、比赛概要

- **时间**：2026.7.25 20:00 - 21:40
- **结果**：ABCDEFG | Rk.168
- **主要时间损耗**：解题

## 二、简要记录

### [A - Maximal Value](https://atcoder.jp/contests/abc468/tasks/abc468_a)

> [!Question]
> 给定长度为 $N$ 的整数序列 $A$，求满足 $A_i<A_{i+1}>A_{i+2}$ 的下标 $i$ 的个数。
>
> 数据规模：$3\le N\le 100$，$1\le A_i\le 100$。

简单暴力一下枚举即可。

```cpp title:"AAA" fold
int a[maxn];

void solve( ) {
    int n = read( );
    int ans = 0;
    for( int i = 1; i <= n; ++ i ) a[i] = read( );

    for( int i = 1; i <= n - 2; ++ i ) {
        if( a[i] < a[i+1] && a[i+1] > a[i+2] ) ans ++;
    }
    cout << ans << '\n';
}
```

### [B - Corridor Watch](https://atcoder.jp/contests/abc468/tasks/abc468_b)

> [!Question]
> 有 $M$ 个排成一列的格子，字符串 $S$ 中的 `G` 表示对应格子上有警卫。与任意警卫所在格子的距离不超过 $D$ 的格子会被监视，求未被监视的格子数。
>
> 数据规模：$0\le D<M\le 100$，$|S|=M$，$S$ 仅含 `G` 与 `.`。

简单暴力即可：对每个 `G` 向左右扩展，最后统计没有被记录的格子数量。

```cpp title:"BBB" fold
void solve( ) {
    int m = read( ), d = read( );
    string s;
    cin >> s;
    vector<bool> v(m);
    for( int i = 0; i < m; ++ i ) {
        if( s[i] == 'G' ) {
            for( int j = max( 0, i - d ); j <= min( m - 1, i + d ); ++ j ) {
                v[j] = true;
            }
        }
    }

    int ans = 0;
    for( int i = 0; i < m; ++ i ) {
        if( !v[i] ) ans ++;
    }
    cout << ans << '\n';
}
```

### [C - Between P and Q](https://atcoder.jp/contests/abc468/tasks/abc468_c)

> [!Question]
> 给定两个 $1\sim N$ 的排列 $P,Q$，求有多少个 $1\sim N$ 的排列在字典序上严格大于 $P$ 且严格小于 $Q$。
>
> 数据规模：$1\le N\le 10$。

这是一个排列的字典序问题，不算很难，但是考察了康托展开这个知识点，如果没了解过，写起来会比较麻烦。

话说回来，如何计算一个排列的字典序排名？对于排列 $A$，枚举位置 $i$，假设前 $i-1$ 个位置都已经和 $A$ 相同，那么第 $i$ 个位置选择一个 “尚未使用且小于 $A_{i}$” 的数字，就会得到一个字典序小于 $A$ 的排列。

因此，排列 $A$ 前面共有 $\displaystyle \sum_{i=1}^{N}cnt_i\cdot(N-i)!$ 个排列。若把字典序排名从 $0$ 开始计算，那么最后答案就是 $\max(0,\operatorname{rank}(Q)-\operatorname{rank}(P)-1)$。

```cpp title:"CCC" fold
int fac[maxn];
int p[maxn], q[maxn];
int n;

ll rnk( int a[] ) {
    ll res = 0;
    vector<bool> vis( n + 1, 0 );
    for( int i = 1; i <= n; ++ i ) {
        int cnt = 0;
        for( int x = 1; x < a[i]; ++ x ) {
            if( !vis[x] ) ++ cnt;
        }
        res += cnt * fac[n - i];
        vis[a[i]] = true;
    }
    return res;
}

void solve( ) {
    n = read( );
    for( int i = 1; i <= n; ++ i ) p[i] = read( );
    for( int i = 1; i <= n; ++ i ) q[i] = read( );
    
    fac[0] = 1;
    for( int i = 1; i <= n; ++ i ) fac[i] = i * fac[i - 1] % mod;

    cout << max( 0ll, rnk( q ) - rnk( p ) - 1 ) << '\n';
}
```

### [D - Pre-Palindrome](https://atcoder.jp/contests/abc468/tasks/abc468_d)

> [!Question]
> 若一个字符串至多修改一个字符后能变成回文串，则称其为“好字符串”。给定小写字母串 $S$，求 $S$ 的所有非空子串中好字符串的数量；位置不同的子串分别计数。
>
> 数据规模：$1\le |S|\le 10^4$。

回文串，容易想到区间 DP；记 $dp[l][r]$ 表示子串 $S[l,r]$ 变成回文串至少需要修改多少个字符。

然后转移就是 $dp[l][r] = dp[l+1][r-1] + [S_{l} \neq S_{r}]$。

最后我们只需要统计 $dp[l][r] \le 1$ 的个数，表示 0 次和 1 次操作后能得到回文串的数量。

```cpp title:"DDD1" fold
ll dp[maxn][maxn];

void solve( ) {
    string s;
    cin >> s;

    int n = s.length( );

    for( int i = 0; i < n; ++ i ) dp[i][i] = 0;
    
    for( int len = 2; len <= n; ++ len ) {
        for( int l = 0; l + len - 1 < n; ++ l ) {
            int r = l + len - 1;
            if( len == 2 ) {
                dp[l][r] = ( s[l] != s[r] );
            }
            else {
                dp[l][r] = dp[l + 1][r - 1] + ( s[l] != s[r] );
            }
        }
    }

    ll ans = 0;
    for( int i = 0; i < n; ++ i ) {
        for( int j = i; j < n; ++ j ) {
            if( dp[i][j] <= 1 ) ans ++;
        }
    }
    cout << ans << '\n';
}
```

当然在交流后发现还有一种偏暴力的做法：枚举回文中心，然后向两边扩展。如果当前不匹配的字符对数量为 $0$ 或 $1$，答案加一。

一旦出现 $2$ 对不匹配字符，就停止扩展。因为继续扩大区间后，不匹配字符对的数量只会增加，不可能重新满足题目条件。

```cpp title:"DDD2" fold
void solve( ) {
    string s;
    cin >> s;

    int n = s.length( );
    ll ans = 0;

    // 奇数长度 s[mid]
    for( int mid = 0; mid < n; ++ mid ) {
        int cnt = 0;
        for( int l = mid, r = mid; 0 <= l && r < n; -- l, ++ r ) {
            if( s[l] != s[r] ) cnt ++;
            if( cnt >= 2 ) break;
            ans ++;
        }
    }

    // 偶数长度 s[mid-1, mid]
    for( int mid = 1; mid < n; ++ mid ) {
        int cnt = 0;
        for( int l = mid - 1, r = mid; 0 <= l && r < n; -- l, ++ r ) {
            if( s[l] != s[r] ) cnt ++;
            if( cnt >= 2 ) break;
            ans ++;
        }
    }
    cout << ans << '\n';
}
```

理论上两种做法都是 $\mathcal{O}(n^2)$ 的，但是后者可能更自然一点，而且不需要额外空间；前者对于理解区间 DP 来说，则是一个比较标准的模型。

### [E - Sum of Average](https://atcoder.jp/contests/abc468/tasks/abc468_e)

> [!Question]
> 给定长度为 $N$ 的整数序列 $A$。定义 $f(l,r)$ 为子数组 $A_l,A_{l+1},\ldots,A_r$ 的算术平均数，求
> $$
> \sum_{1\le l\le r\le N}f(l,r)
> $$
> 对 $998244353$ 取模后的结果。
>
> 数据规模：$1\le N\le 5\times 10^5$，$0\le A_i<998244353$。

题目要求 $\displaystyle \sum_{1 \le l \le r \le N}\left( \frac{A_{l} + \dots + A_{r}}{r - l + 1} \right)$，这是一个比较复杂的式子，显然我们可以写出一个 $\mathcal{O}(N^{2})$ 的暴力做法，然后枚举所有区间求和就行。Anyway，回头看一眼数据规模 …… 看来我们得优化一下。

常见的计数类优化思路是找贡献值，假设我们固定 $A_{i}$ 不变，考虑每个 $A_{i}$ 对答案的贡献，对于所有满足 $l \le i \le r$ 的区间 $[l, r]$，$A_{i}$ 在该区间平均值中的贡献是：$\displaystyle \frac{A_{i}}{r-l+1}$。

不妨记 $\displaystyle c_{i} = \sum_{l \le i \le r}\left( \frac{1}{r-l+1} \right)$，那么最终答案就是 $\displaystyle \sum_{i=1}^{N}c_{i}A_{i}$，接下来问题就转化为了如何计算这个系数 $c_{i}$。

对于 $i = 1$ 来说，包含位置 $1$ 的区间只能是 $[1, 1], [1, 2], \dots, [1, N]$，所以 $c_{1} = 1 + \frac{1}{2} + \frac{1}{3} + \dots + \frac{1}{N}$。写起来好麻烦，记 $\displaystyle f_{i} = \sum_{j=1}^{i} \frac{1}{j}$，那么 $c_{1} = f_{N}$。

接着考虑如何从 $c_i$ 转移到 $c_{i+1}$。原本包含 $i$、但不包含 $i+1$ 的区间，必须以 $i$ 为右端点，即 $[1,i],[2,i],\dots,[i,i]$；新增的包含 $i+1$、但不包含 $i$ 的区间，必须以 $i+1$ 为左端点，即 $[i+1,i+1],[i+1,i+2],\dots,[i+1,N]$。

前者的系数和是 $\displaystyle 1 + \frac{1}{2} + \dots + \frac{1}{i} = f_{i}$，后者的系数和是 $\displaystyle 1 + \frac{1}{2} + \dots + \frac{1}{N-i} = f_{N-i}$。于是我们就可以得到 $c_{i+1} = c_{i} - f_{i} + f_{N-i}$。

```cpp title:"EEE1" fold
void solve( ) {
    int n = read( );
    ll p = 0;
    for( int i = 1; i <= n; ++ i ) a[i] = read( );
    
    inv[1] = 1;
    for( int i = 2; i <= n; ++ i ) {
        inv[i] = ( mod - mod / i ) * inv[mod % i] % mod;
    } // 这里用到了一个线性递推逆元的公式，也可以直接快速幂算，应该不会超时。

    f[0] = 0;
    for( int i = 1; i <= n; ++ i ) {
        f[i] = ( f[i - 1] + inv[i] ) % mod;
    }

    c[1] = f[n];
    for( int i = 1; i < n; ++ i ) {
        c[i + 1] = ( c[i] - f[i] + f[n - i] + mod ) % mod;
    }

    ll ans = 0;

    for( int i = 1; i <= n; ++ i ) {
        ans = ( ans + a[i] * c[i] ) % mod;
    }

    cout << ans << '\n';
}
```

> [!note] 线性递推逆元公式
> 设 $\displaystyle p=\left\lfloor\frac pi\right\rfloor i+(p\bmod i)$。
> 在模意义下整理，可以得到下列递推式：
> $\displaystyle inv[i] = \left(p-\left\lfloor\frac{p}{i}\right\rfloor\right)\cdot inv[p\bmod i]\pmod p$。
> 写成代码就是：`inv[i] = ( mod - mod / i ) * inv[mod % i] % mod;`  可以当做结论记下来。

这是我赛事的推导思路，但在赛后整理思路的时候，我发现了另一种做法。

按照子数组长度分类，求出所有长度为 $i$ 的子数组元素和之和，然后除以 $i$ 分组计算贡献。

设 $\displaystyle T_{i} = \sum_{l=1}^{n-i+1} \sum_{j=l}^{l+i-1} A_{j}$ 表示所有长度为 $i$ 的子数组的元素和之和，那么长度为 $i$ 的子数组平均数之和就是 $\displaystyle \frac{T_{i}}{i}$，最终答案就是 $\displaystyle \sum_{i=1}^{n} \frac{T_{i}}{i}$，问题就转化为了求出所有的 $T_{i}$。

关键是找 $T_{i}$ 和 $T_{i+1}$ 的关系，记前缀和为 $\displaystyle P_{i} = \sum_{j=1}^{i} a_{j}$。对于长度为 $k$ 的窗口 $[a_{1}, \dots a_{k}], [a_{2}, \dots, a_{k+1}], \dots, [a_{n-k+1}, \dots, a_{n}]$。当窗口长度从 $k$ 变成 $k+1$ 时，可以把前 $n-k$ 个长度为 $k$ 的窗口向右扩展一个元素。

也就是 $\displaystyle T_{k+1} = T_{k} - (a_{n-k+1} + \dots + a_{n} ) + (a_{k+1} + \dots + a_{n})$，用前缀和表示就是 $T_{k+1} = T_{k} - (P_{n} - P_{n-k}) + (P_{n} - P_{k}) = T_{k} + P_{n-k} - P_{k}$。

于是在预处理 $P$ 数组后就可以直接递推了，初始状态就很显然 $T_{1} = P_{n}$ 了。

```cpp title:"EEE2" fold
void solve( ) {
    int n = read( );

    for( int i = 1; i <= n; ++ i ) {
        a[i] = read( );
        pre[i] = ( pre[i - 1] + a[i] ) % mod;
    }

    inv[1] = 1;
    for( int i = 2; i <= n; ++ i ) {
        inv[i] = ( mod - mod / i ) * inv[mod % i] % mod;
    }

    ll T = pre[n];
    ll ans = 0;

    for( int len = 1; len <= n; ++ len ) {
        ans = ( ans + T * inv[len] ) % mod;

        if( len < n ) {
            T = ( T + pre[n - len] - pre[len] + mod ) % mod;
        }
    }

    cout << ans << '\n';
}
```

### [F - Chmax](https://atcoder.jp/contests/abc468/tasks/abc468_f)

> [!Question]
> 给定 $1\sim N$ 的排列 $P$。初始 $x=y=c=0$，按顺序处理 $P_k$；每次选择用 $P_k$ 更新 $x$ 或 $y$。若被更新的变量原本小于 $P_k$，则先令 $c$ 加一，再将该变量替换为它与 $P_k$ 的最大值。求最终 $c$ 的最大可能值。
>
> 数据规模：$1\le N\le 5\times 10^5$。

由于每次严格增大的元素会导致 $c$ 值增大，所以我首先会想到，这是否就构成了两条严格上升子序列？

但这题不能直接这么转化，因为每个数都必须执行一次操作，即分给 $x$ 或者 $y$，那些在求子序列时被跳过的元素可能抬高原本的变量，从而影响后面的得分。

举个例子 $P = (5, 2, 1, 4, 3)$，从上升子序列考虑可以选 $(2, 4)$ 和 $(1,3)$，但是实际操作中第一个 $5$ 必须被分配给 $x$，那实际上就不符合 LIS 模型了。

所以这题更像一个双状态 $DP$，两个关键的状态分别是处理完前 $i$ 个元素后 $x$ 的最大值，以及 $y$ 的最大值。由于当前前缀最大值一定被分配给了 $x$ 或 $y$，所以我们记录较小的那个值就行。

记 $dp[z]$ 表示处理完当前前缀，两个变量为 $mx, z$ 时的最大得分。

当我们把一个新元素 $v = P_{k}$ 加入时，有两种选择：把 $v$ 放入当前值为 $mx$ 的变量，以及放入当前值为 $z$ 的变量。

接下来考虑转移：

1. $v > mx$ 时，此时 $v$ 是新的前缀最大值，无论把 $v$ 放到哪，都一定能得 $1$ 分。
	- 放到值为 $mx$ 的变量上，状态从 $(mx, z) \to (v, z)$。
	- 放到值为 $z$ 的变量上，状态从 $(mx, z) \to (v, mx)$。
2. $v < mx$ 时：
	- 放到值为 $mx$ 的变量上，不得分状态不变。
	- 放到值为 $z$ 的变量上，当 $z < v$ 时得一分 $(mx, z) \to (mx, v)$，反之不得分且状态不变。

其中，当 $v<mx$ 时，真正产生的新状态只有：

$$
dp[v] = \max\left( dp[v], \max_{z<v}dp[z]+1\right )
$$

而当 $v>mx$ 时，所有原状态都会得到 $1$ 分；此外，把 $v$ 放入原本值为 $z$ 的变量后，会产生新的状态 $z=mx$，其得分为 $\max_z dp[z]+1$，随后令 $mx=v$。

于是我们就可以写出这样一版基础的朴素 $\mathcal{O}(N^{2})$ 转移。

```cpp title:"FFF1" fold
int p[maxn];
int f[maxn];
// f[z] 表示处理完当前前缀，两个变量的较大值为 mx、
// 另一个变量的值为 z 时，能够获得的最大分数

void solve( ) {
    int n = read( );
    for( int i = 1; i <= n; ++ i ) p[i] = read( );

    for( int i = 0; i <= n; ++ i ) f[i] = -inf;
    f[0] = 0;

    int mx = 0;
    for( int i = 1; i <= n; ++ i ) {
        int v = p[i];
        if( v > mx ) {
            int pre = -inf;
            for( int z = 0; z <= n; ++ z ) {
                pre = max( pre, f[z] );
            }

            for( int z = 0; z <= n; ++ z ) {
                if( f[z] > -inf ) f[z] ++;
            }
            f[mx] = max( f[mx], pre + 1 );
            mx = v;
        }
        else {
            int pre = -inf;
            for( int z = 0; z < v; ++ z ) {
                pre = max( pre, f[z] );
            }
            f[v] = max( f[v], pre + 1 );
        }
    }

    int ans = 0;
    for( int i = 0; i <= n; ++ i ) ans = max( ans, f[i] );
    cout << ans << '\n';
}
```

但本题数据规模会 T，考虑优化，这里选用数据结构优化，因为只需要查询前缀最大值，以及单点取最大值，所以可以直接用树状数组来维护，单次修改及转移均为 $\mathcal{O}(\log(n))$。

```cpp title:"FFF2" fold

struct BIT {
/* ======================================== */
ll tr[maxn];
int sz;
void init( int N ) { sz = N + 1;
    fill( tr, tr + sz + 2, -inf );
}
void upd( int idx, ll val ) {
    idx ++;
    for( int i = idx; i <= sz; i += i & -i ) tr[i] = max( tr[i], val );
}
ll ask( int idx ) {
    idx ++;
    ll res = -inf;
    for( int i = idx; i; i -= i & -i ) res = max( res, tr[i] );
    return res;
}
/* ======================================== */
} bit;

ll p[maxn];

void solve( ) {
    int n = read( );
    for( int i = 1; i <= n; ++ i ) p[i] = read( );

    bit.init( n );
    bit.upd( 0, 0 );
    
    int mx = 0;
    int offset = 0;
    for( int i = 1; i <= n; ++ i ) {
        int v = p[i];
        if( v > mx ) {
            offset ++;
            int pre = bit.ask( n );
            bit.upd( mx, pre );
            mx = v;
        }
        else {
            int pre = bit.ask( v - 1 );
            bit.upd( v, pre + 1 );
        }
    }
    cout << bit.ask( n ) + offset << '\n';
}
```

最终复杂度为 $\mathcal{O}(n \log(n))$。

### [G - Restricted Permutation](https://atcoder.jp/contests/abc468/tasks/abc468_g)

> [!Question]
> 给定长度为 $N$、仅由 `o` 与 `x` 构成的字符串 $S$。求有多少个 $1\sim N$ 的排列 $P$ 满足：对于每个 $1\le k\le N$，$S_k$ 为 `o` 当且仅当排列中数字 $1,2,\dots,k$ 所在的位置构成一个连续子段。答案对 $998244353$ 取模。
>
> 数据规模：$1\le N\le 2000$。

首先 $k = 1$ 时只有数字 $1$，$k = N$ 时包括整个排列，因此数字 $1 \sim k$ 所在的位置一定连续，所以如果 $S_{1} = x$ 或者 $S_{N} = x$，答案显然为 $0$。

接着我们考虑两个相邻的 `o`，设它们的小标分别为 $a, b$，即 $S_{a} = o, S_{b} = o, S[a+1, \dots, b-1] = x$。记$d = b - a$，当 $k = a$ 时，数字 $1 \sim a$ 在排列中已经构成了一个连续段，由于 $k = b$ 时，数字 $1 \sim b$ 也得构成了一个连续段，所以新加入的 $[a+1, a+2, \dots, b]$ 一共有 $d$ 个，加上原本的连续段，一共就有 $d + 1$ 个对象。

所以如果暂时不考虑中间是否重新形成连续段的话，这 $d + 1$ 个不同对象之间可以任意排列，记 $f[d] = (d + 1)!$。

接着考虑题目的限制条件，要求 $a < k < b$ 时均为 `x`，也就是说，新加入的这一段都不能提前形成连续段，只能在加入数字 $b$ 之后第一次重新连续。

由此我们引入 $dp[d]$ 表示满足这一条件的最终排列数量。

直接推公式太抽象了，我们从例子中找找规律，例如 $d = 3$ 时，目标形式为 `oxxo`，那么一共有 $f[3]$ 中排列，然后我们得减去提前重新连续的情况：

1. `ooxo`：此时前面一段方案数是 $dp[1]$，后面一段方案数是 $f[2]$，通过乘法原理可以把方案数乘起来。
2. `oxoo`：此时前面一段方案数是 $dp[2]$，后面一段方案数是 $f[1]$，通过乘法原理可以把方案数乘起来。

于是 $dp[3] = f[3] - dp[1]f[2] - dp[2]f[1]$，大胆猜测递推公式就是：

$$
\begin{aligned}
dp[d] &= f[d] - \sum_{i=1}^{d-1} dp[i]f[d-i] \\	
&= (d+1)! - \sum_{i=1}^{d-1}dp[i] \cdot (d-i+1)! 
\end{aligned}
$$

> [!note] 证明
> 一般地，对于任意一种排列，设 $i$ 是使数字 $1\sim a+i$ 第一次重新构成连续段的位置。这个 $i$ 是唯一的，因此可以按照第一次重新连续的位置分类。
> 
> 前 $i$ 个新数字满足“此前不连续、到第 $i$ 步第一次连续”，共有 $dp[i]$ 种；将这一部分压缩后，它与剩余 $d-i$ 个数字可以任意排列，共有 $f[d-i]$ 种。

最后我们统计答案即可，设 $S$ 中所有 `o` 的位置依次为 $p_{1} = 1 < p_{2} < \dots < p_{m} = N$。

对于相邻一堆 `o`，其间隔为 $d = p_{i} - p_{i-1}$，对应 $dp[d]$ 种排列方式，所以各段之间用乘法原理统计答案即可：

$$
Ans = \prod_{i=2}^{m} dp[p_{i} - p_{i-1}]
$$

```cpp title:"GGG" fold
ll fac[maxn];
ll dp[maxn];

void init( int N ) {
    fac[0] = 1;
    for( int i = 1; i <= N; ++ i ) {
        fac[i] = fac[i - 1] * i % mod;
    }
}

void solve( ) {
    int n = read( );

    for( int i = 1; i <= n; ++ i ) {
        dp[i] = fac[i+1];
        for( int j = 1; j < i; ++ j ) {
            dp[i] -= dp[j] * fac[i - j + 1] % mod;
            dp[i] = ( dp[i] + mod ) % mod;
        }
    }

    string s;
    cin >> s;

    if( s[0] == 'x' || s[n-1] == 'x' ) {
        cout << 0 << '\n';
        return ;
    }

    ll ans = 1;
    int lst = 0;
    for( int cur = 1; cur < n; ++ cur ) {
        if( s[cur] == 'o' ) {
            int dif = cur - lst;
            ans = ans * dp[dif] % mod;
            lst = cur;
        }
    }
    cout << ans << '\n';
}
```

时间复杂度为 $\mathcal{O}(N^2)$，空间复杂度为 $\mathcal{O}(N)$。

## 三、补题记录

无，AK。

## 四、本场留下什么

- 解题上：先写出朴素计数或 DP，再判断真正需要递推、压缩和维护的量；复杂分类可以尝试按照“第一次发生的位置”划分。
    
- 实现上：注意全局状态变化与单点转移的分离，例如 F 题的 `offset`；组合递推中继续检查初始化、取模减法和下标边界。
    
- 后续：补充贡献计算与数据结构优化 DP；将 F、G 分别保留为“状态压缩后提取可维护操作”和“按首次发生位置分类计数”的代表题。