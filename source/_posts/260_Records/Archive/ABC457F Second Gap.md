---
title: 'ABC457F Second Gap'
tags:
  - DP
  - 数据结构/线段树
  - 算法/全局懒标记
categories:
  - 260_Records
  - Archive
abbrlink: 366be4de
date: 2026-05-09 00:00:00
---
# [F - Second Gap](https://atcoder.jp/contests/abc457/tasks/abc457_f)

## 题意
给定一个长度为 $N - 1$ 的序列 $D$，我们需要构造一个 $(1, \dots, N)$ 的排列 $P$，使得对于每一个 $1 \le i \le N-1$，在后缀 $(P_i, \dots, P_N)$ 中，最大值和次大值所在下标的差的绝对值恰好等于 $D_i$。求满足条件的排列总数。

> $N \leq 2e5, D_{i} \leq N - i$

## 思路
正着推显然是非常困难的，注意到题目条件是基于后缀定义的，不妨试试倒推，从右往左考虑，每次相当于向序列前端添加一个元素 $P_{i}$。

假设在后缀 $S_{i+1} = (P_{i+1},\dots,P_{N})$ 中，最大值的下标为 $p$，次大值的下标为 $q$，已知 $|p-q| = D_{i+1}$。现在加入 $P_{i}$，考虑 $S_{i}$ 的最大值和次大值：

1. $P_{i}$ 成为 $S_{i}$ 的最大值，此时次大值必然是原本 $S_{i+1}$ 的最大值 ( 即 $p$ )，$|i-p| =D_{i}$。
2. $P_{i}$ 成为 $S_{i}$ 的次大值，此时最大值依然是原本 $S_{i+1}$ 的最大值 ( 即 $p$ )，$|i-p| = D_{i}$。
3. $P_{i}$ 既不是最大也不是次大，此时 $S_{i}$ 的最大次大与 $S_{i+1}$ 一致。也就是 $D_{i} = D_{i+1}$，那么 $P_{i}$ 可以在剩余的 $(N - i + 1) - 2 = N - i - 1$ 个相对位置中任意选择。

既然明确是是个类递推问题，考虑动态规划 ( 其实动态规划这个名字很奇怪，既不动态也不规划 )。

**状态定义**：

由于次大值的位置在某些情况 (1, 2) 是由前一状态的最大值决定的，所以我们只需要记录**最大值**的位置。设 $f[i][p]$ 表示：在后缀 $S_{i}$ 中，最大值位于下标 $p$ 的方案数。

**状态转移**：
对于当前位置 $i$ 与上一状态的最大值位置 $p$：

1. 若 $p - i = D_{i}$：
	- $P_{i}$ 作为最大值，转移到 $f[i][i]$，增加 $f[i+1][p]$。
	- $P_{i}$ 作为次大值，转移到 $f[i][p]$，增加 $f[i+1][p]$。

2. 若 $D_{i} = D_{i+1}$：
	- $P_{i}$ 作为平方值：转移到 $f[i][p]$，增加 $f[i+1][p] \times (N - i - 1)$。

### 暴力 $O(N^{2})$

直接根据状态转移方程构造就可以得到这个，时空复杂度均为 $O(N^{2})$ 的 DP。注意到 每次转移 $i$ 都只依赖于上一层 $i-1$，所以空间上可以用 滚动数组 的技巧来压掉，就得到了下面这种写法：

{% fold info @O(N^2) %}
```cpp
ll D[maxn], n;
ll dp[2][maxn];

void solve( ) {
    cin >> n;
    for( int i = 1; i < n; ++ i ) cin >> D[i];

	// 特殊情况特判，D[n-1] 必须是 1，不然最后两个下标不满足
    if( D[n-1] != 1 ) {
        cout << 0 << '\n';
        return;
    }

    int pre = 0;
    // 边界状态（初始状态）
    dp[pre][n] = dp[pre][n-1] = 1;

    for( int i = n - 2; i >= 1; -- i ) {
        int cur = pre ^ 1; // 滚动数组
        fill( dp[cur], dp[cur] + n + 1, 0 );
        for( int p = i + 1; p <= n; ++ p ) {
            if( dp[pre][p] == 0 ) continue; // 如果状态不存在，就跳过
            if( p - i == D[i] ) { // 第一种情况
                dp[cur][p] = ( dp[cur][p] + dp[pre][p] ) % mod;
                dp[cur][i] = ( dp[cur][i] + dp[pre][p] ) % mod;
            }
            if( D[i] == D[i+1] ) { // 第二种情况
                ll cnt = n - i - 1;
                dp[cur][p] = ( dp[cur][p] + cnt * dp[pre][p] ) % mod;
            }
        }
        pre = cur;
    }

    ll ans = 0;
    for( int p = 1; p <= n; ++ p ) {
        ans = ( ans + dp[pre][p] ) % mod;
    }
    cout << ans << '\n';
}
```
{% endfold %}

观察内部转移逻辑，我们发现每一轮循环只做了三件事：

1. **单点查询**：查询 $p = i + D_{i}$ 这一点的方案数。
2. **全局更新**：当 $D_{i} = D_{i+1}$ 时，将所有状态全体乘以 $(N - i - 1)$，当 $D_{i} \neq D_{i+1}$ 的时候，将除了目标值以外的所有状态清零。
3. **单点更新**：把目标值累加到产生的新状态上。

这三个操作都是典型的数据结构应用场景，我们可以针对性优化：

### 线段树优化 $O( N \log N )$

既然操作包含 "全局乘法" 和 "单点更新 / 查询"，自然会想到用 "线段树" 来维护这个 DP 转移。

- 用 $O( \log N )$ 的时间单点查询`target = i + D[i]` 的值 `val`。
- 若 $D_{i} = D_{i+1}$，对根节点下发乘法标记 `(N - i _ 1)`；否则下发乘法标记 `0`，耗时 $O(1)$。
- 若 `val > 0`，用 $O( \log N)$ 的时间在位置 `target` 和 `i` 分别加上 `val`。

{% fold info @O(NlogN) %}
```cpp
#define ls (u << 1)
#define rs (u << 1 | 1)

struct Node {
    int l, r;
    ll sum, mul;
} tr[maxn << 2];

void push_up( int u ) {
    tr[u].sum = (tr[ls].sum + tr[rs].sum) % mod;
}

void apply( int u, ll v ) {
    tr[u].sum = (tr[u].sum * v) % mod;
    tr[u].mul = (tr[u].mul * v) % mod;
}

void push_down( int u ) {
    if( tr[u].mul == 1 ) return;
    apply( ls, tr[u].mul ); 
    apply( rs, tr[u].mul );
    tr[u].mul = 1;
}

void build( int u, int l, int r ) {
    tr[u] = { l, r, 0, 1 };
    if( l == r ) return; 
    int mid = (l + r) >> 1;
    build( ls, l, mid ); 
    build( rs, mid + 1, r );
}

void modify_mul( int u, int l, int r, ll v ) {
    if( l <= tr[u].l && tr[u].r <= r ) { apply( u, v ); return; }
    push_down( u );
    int mid = (tr[u].l + tr[u].r) >> 1;
    if( l <= mid ) modify_mul( ls, l, r, v );
    if( mid < r ) modify_mul( rs, l, r, v );
    push_up( u );
}

void modify_add( int u, int pos, ll v ) {
    if( tr[u].l == tr[u].r ) {
        tr[u].sum = (tr[u].sum + v) % mod;
        return;
    }
    push_down( u );
    int mid = (tr[u].l + tr[u].r) >> 1;
    if( pos <= mid ) modify_add( ls, pos, v );
    else modify_add( rs, pos, v );
    push_up( u );
}

ll query( int u, int pos ) {
    if( tr[u].l == tr[u].r ) return tr[u].sum;
    push_down( u );
    int mid = (tr[u].l + tr[u].r) >> 1;
    if( pos <= mid ) return query( ls, pos );
    else return query( rs, pos );
}

ll D[maxn], n;
ll dp[2][maxn];

void solve( ) {
    cin >> n;
    for( int i = 1; i < n; ++ i ) cin >> D[i];

    if( D[n-1] != 1 ) {
        cout << 0 << '\n';
        return;
    }
    
    build( 1, 1, n );

    modify_add( 1, n, 1 );
    modify_add( 1, n - 1, 1 );

    for( int i = n - 2; i >= 1; -- i ) {
        int tar = i + D[i];
        ll val = 0;
        
        if( tar <= n ) val = query( 1, tar );

        if( D[i] == D[i+1] ) modify_mul( 1, 1, n, n - i - 1 );
        else modify_mul( 1, 1, n, 0 );

        if( val > 0 ) {
            modify_add( 1, tar, val );
            modify_add( 1, i, val );
        }
    }

    cout << tr[1].sum << '\n';
}
```
{% endfold %}

### 全局懒标记 $O(N)$

再深入思考线段树的做法，我们会发现：所有的乘法操作都是 **全局** 的。既然没有“局部区间操作”，杀鸡焉用牛刀 ( 线段树 )？我们完全可以用几个变量和数组把复杂度降到 $O(N)$。

1. **优化全局乘法（乘法逆元）**：
    
	维护一个全局乘法因子 `mult`（初始为 1），以及一个真实值数组 `A`。全局乘以 $K$ 时，只需 `mult = (mult * K) % mod`。
    
	当我们要往数组里单点增加一个值 `val` 时，为了抵消未来全局 `mult` 的影响，我们实际存入的是 `val * inv(mult)`（即乘以 `mult` 的逆元）。查询时，真实值就是 `A[p] * mult`。
    
2. **优化全局清空**：
    
    当需要全局清空时，如果我们遍历数组赋 0，复杂度又退化回了 $O(N)$。但注意到，每轮循环最多只会 **新增 2 个** 非零状态。
    
    因此，我们维护一个 `active` 动态数组，专门记录当前值不为 0 的下标。需要清空时，只遍历 `active` 里的这几个点将其设为 0，然后清空 `active`。整个推导过程中，加入 `active` 的总人次不超过 $2N$，所以清空操作的总均摊复杂度严格为 $O(N)$。

{% fold info @O(N)  %}
```cpp
ll D[maxn], n;
ll A[maxn];
ll inv[maxn];

void solve( ) {
    cin >> n;
    for( int i = 1; i < n; ++ i ) cin >> D[i];

    if( D[n-1] != 1 ) {
        cout << 0 << '\n';
        return;
    }

	// 线性求 1 ~ n 的乘法逆元
    inv[1] = 1;
    for( int i = 2; i <= n; ++ i ) {
        inv[i] = (mod - mod / i) * inv[mod % i] % mod;
    }

    vector<int> active;
    A[n] = 1;
    A[n-1] = 1;
    active.push_back( n );
    active.push_back( n - 1 );

    ll mult = 1;
    ll inv_mult = 1;

    for( int i = n - 2; i >= 1; -- i ) {
        int target = i + D[i];
        ll val = 0;
        
        if( target <= n ) val = A[target] * mult % mod;

        if( D[i] == D[i+1] ) {
            ll ways = n - i - 1;
            mult = mult * ways % mod;
            inv_mult = inv_mult * inv[ways] % mod;
            if( val > 0 ) {
                A[target] = ( A[target] + val * inv_mult ) % mod;
                A[i] = val * inv_mult % mod;
                active.push_back( i );
            }
        } else {
            for( int p : active ) A[p] = 0;
            active.clear( );
            mult = 1;
            inv_mult = 1;
            if( val > 0 ) {
                A[target] = val;
                A[i] = val;
                active.push_back( target );
                active.push_back( i );
            }
        }
    }

    ll ans = 0;
    for( int p : active ) {
        ans = ( ans + A[p] * mult ) % mod;
    }
    cout << ans << '\n';
}
```
{% endfold %}
