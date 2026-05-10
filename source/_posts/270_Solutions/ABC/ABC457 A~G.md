---
title: '[Solution] ABC457 A~G'
tags: ABC
categories:
  - 270_Solutions
  - ABC
abbrlink: 24d44c51
date: 2026-05-09 00:00:00
---

本次赛时顺利 AK，没想到 G 题居然是后三题里最简单的一道，我在 E 的讨论上卡了好久，我感觉实现上 E 最难。

### [A - Array](https://atcoder.jp/contests/abc457/tasks/abc457_a)

#### 题意
给定一个序列 $A$，问第 $x$ 个元素是多少。

#### 思路
略略略。

### [B - Arrays](https://atcoder.jp/contests/abc457/tasks/abc457_b)

#### 题意
给定一个二维数组，问第 $x$ 行第 $y$ 个元素是多少。

> $N \leq 2e5, \sum L \leq 2e5$

#### 思路
这题考察对空间复杂度的理解，发现总共只有 $2e5$ 个元素，而且无法直接开 $N \times N$ 大小的静态数组，所以采用 `vector` 开动态数组不就好了吗。

#### 代码部分
```cpp
void solve( ) {
    int n;
    cin >> n;
    vector< vector<int> > a(n + 1);
    for( int i = 1; i <= n; ++ i ) {
        int l; cin >> l;
        a[i].resize( l + 1 );
        for( int j = 1; j <= l; ++ j ) cin >> a[i][j];
    }
    int x, y;
    cin >> x >> y;
    cout << a[x][y] << '\n';
}
```

### [C - Long Sequence](https://atcoder.jp/contests/abc457/tasks/abc457_c)

#### 题意
给定一个二维数组 $A$，以及一个一维数组 $C$，然后从 0 开始构造一个数组 $B$，对于每个 $i$ 都放入 $C_{i}$ 个 $A_{i}$，注 $L_{i}$ 为 $A_{i}$ 的长度。

> $\sum L_{i} \leq 2e5, C_{i} \leq 1e9$

#### 思路
第一眼直接模拟不就行了吗？但是一看数据规模，发现直接模拟会 T，而且会死的很难看，因此考虑优化。

对于每个序列 $A_{i}$  ( 长度为 $L_{i}$ )，它的循环长度是固定的 $C_{i} \times L_{i}$，所以我们可以直接枚举第 $k$ 个元素在哪一行，然后再找到它在这一行的具体位置。

同样是和上一题一样的空间问题，记的开 `long long`，防止溢出即可，由于下标取模不好算，最后选择了 0-index。

#### 代码部分
```cpp
void solve( ) {
    ll n, k;
    cin >> n >> k;

    vector< vector<int> > a( n );
    vector<ll> l( n );

    for( int i = 0; i < n; ++ i ) {
        cin >> l[i];
        a[i].resize( l[i] );
        for( int j = 0; j < l[i]; ++ j ) cin >> a[i][j];
    }
    
    vector<ll> c( n );
    for( int i = 0; i < n; ++ i ) cin >> c[i];

    for( int i = 0; i < n; ++ i ) {
        ll cnt = c[i] * l[i];
        if( k <= cnt ) {
            int idx = ( k - 1 ) % l[i];
            cout << a[i][idx] << '\n';
            return;
        } else k -= cnt;
    }
}
```

### [D - Raise Minimum](https://atcoder.jp/contests/abc457/tasks/abc457_d)

#### 题意
给定一个序列 $A$，一次操作可以给第 $i$ 个元素增加 $i$，问 $k$ 次操作后序列 $A$ 中最小的元素最大是多少。

> $N \leq 2e5, A_{i} \leq 1e18, k \leq 1e18$

#### 思路
最大化最小值？这不是明摆着二分答案吗？回头看一眼数据规模 $1e18$，好吧，二分没得跑了。

这里再补充一个观察点，直接求最大值很难，但是判断某个值能不能达成很简单，这个时候就可以用二分答案把最值问题，转化为判定问题来解决。

接着考虑构造 check 函数，对每个数都算一遍至少需要进行多少次操作，如果操作总和加起来 $\leq k$，那么就是可以满足的，答案在右边的区间。

如果 $A_{i} \geq mid$，则操作次数为 $0$，反之，操作次数为 $\left\lceil \frac{mid-A_{i}}{i} \right\rceil$。

#### 代码部分
```cpp
ll a[maxn], n, k;
bool check( ll mid ) {
    ll cnt = 0;
    for( int i = 1; i <= n; ++ i ) {
        if( a[i] < mid ) {
            ll delta = mid - a[i];
            ll tmp = ( delta + i - 1 ) / i;
            if( tmp > k || cnt > k - tmp ) return 0;
            cnt += tmp;
        }
        if( cnt > k ) return 0;
    }
    return 1;
}

void solve( ) {
    cin >> n >> k;
    ll minn = inf;
    for( int i = 1; i <= n; ++ i ) cin >> a[i], minn = min( minn, a[i] );

    ll l = minn, r = inf, ans = minn;
    while( l <= r ) {
        ll mid = ( l + r ) >> 1;
        if( check( mid ) ) ans = mid, l = mid + 1;
        else r = mid - 1;
    }
    cout << ans << '\n';
}
```

### [E - Crossing Table Cloth](https://atcoder.jp/contests/abc457/tasks/abc457_e)

#### 题意
有 $N$ 个格子，$M$ 块布，每一块布覆盖 $[L_{i}, R_{i}]$，有 $Q$ 次询问，每次询问 $[S_{q}, T_{q}]$ 区间是否能被恰好两块布覆盖，且区间外的格子不能被覆盖。

> $N, M, Q \leq 2e5$

#### 思路
要找两块布恰好覆盖 $[S,T]$ 这个区间，那么一定是下面这种情况：第一块布的左端点在 $S$，第二块布的右端点在 $T$。

为了让两块布相交 / 重叠，我们尽可能找到最长的那块布，对于左端点在 $S$ 的这块布，找到最大的 $R \leq T$；对于右端点在 $T$ 的这块布，找到最小的 $L \geq S$。

如何判定两块布是否能接上呢？只需要满足这个条件即可：$R \geq L - 1$。

但是考虑特殊情况 $R = T, l = S$ 呢？那它可能就是同一块布了。

如何再凑一块布出来呢？分类所有情况，发现只要满足下面四条的任意一条，就能凑出第二块。

1. **重合**：有两块及以上的布本身就是 $[S, T]$ 。
2. **左边**：存在左端点是 $S$，但右端点 $< T$ 的布。
3. **中间**：存在左端点 $> S$，右端点 $< T$ 的布。
4. **右边**：存在左端点 $> S$，右端点是 $T$ 的布。

第一种情况直接用一个 map 存数量就可以判断了，第二和第四种情况都好判断。

第三种情况最特殊，一般的想法是枚举 $[S+1, T-1]$ 区间每个位置作为起点，然后判断是否存在右端点 $< T$，但是这样的复杂度是 $O(n)$，累积就是 $O(n^{2})$，T 了。

考虑优化，发现这种枚举本质上是对每个点做了很多次重复判定的，是否可以用预处理来减少这部分重复判定呢？设 $right[i]$ 为左端点从 $i$ 开始的最小右端点位置，这样一来，只需要判定 `right[s + 1] < t` 是否满足即可。

#### 代码部分
```cpp
vector<ll> maxr[maxn], minl[maxn];
map<pair<ll,ll>, int> mp;
ll right[maxn];

void solve( ) {
    cin >> n >> m;

    for( int i = 1; i <= m; ++ i ) {
        ll l, r;
        cin >> l >> r;
        maxr[l].push_back( r );
        minl[r].push_back( l );
        mp[{ l, r }] ++;
    }

    for( int i = 1; i <= n; ++ i ) {
        if( !maxr[i].empty( ) ) sort( maxr[i].begin( ), maxr[i].end( ) );
        if( !minl[i].empty( ) ) sort( minl[i].begin( ), minl[i].end( ) );
    }

    // 从 i 开始最小的右端点
    right[n + 1] = inf;
    for( int i = n; i >= 1; -- i ) {
        right[i] = right[i + 1];
        // 如果 i 有右端点，更新 right[i] 为最小的右端点
        if( !maxr[i].empty( ) ) right[i] = min( right[i], maxr[i].front( ) );
    }


    cin >> q;
    for( int i = 1; i <= q; ++ i ) {
        ll s, t;
        cin >> s >> t;

        bool ok = 0;
        ll l = inf, r = -1;

        // 右端点 <= t 的最大值
        auto it1 = upper_bound( maxr[s].begin( ), maxr[s].end( ), t );
        if( it1 != maxr[s].begin( ) ) r = *prev( it1 );
        // 此处这个 prev 是 it1 的前一个位置，跟 upper_bound 有关
        // upper_bound 是查询 > t 的最小下标，所以要 -1。

        // 左端点 >= s 的最小值
        auto it2 = lower_bound( minl[t].begin( ), minl[t].end( ), s );
        if( it2 != minl[t].end( ) ) l = *it2;

        // 区间合法
        if( l != inf && r != -1 && r >= l - 1 ) {
            if( l == s && r == t ) {
                if( mp[{ s, t }] >= 2 ) ok = 1;
                else if( !maxr[s].empty( ) && maxr[s].front( ) < t ) ok = 1;
                else if( right[s + 1] < t ) ok = 1;
                else if( !minl[t].empty( ) && minl[t].back( ) > s ) ok = 1;
            }
            else ok = 1;
        }
        if( ok ) cout << "Yes" << '\n';
        else cout << "No" << '\n';
    }
}
```

### [F - Second Gap](https://atcoder.jp/contests/abc457/tasks/abc457_f)

#### 题意
给定一个长度为 $N - 1$ 的序列 $D$，我们需要构造一个 $(1, \dots, N)$ 的排列 $P$，使得对于每一个 $1 \le i \le N-1$，在后缀 $(P_i, \dots, P_N)$ 中，最大值和次大值所在下标的差的绝对值恰好等于 $D_i$。求满足条件的排列总数。

> $N \leq 2e5, D_{i} \leq N - i$

#### 思路
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

##### 暴力 $O(N^{2})$

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

##### 线段树优化 $O( N \log N )$

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

##### 全局懒标记 $O(N)$

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

### [G - Catch All Apples](https://atcoder.jp/contests/abc457/tasks/abc457_g)

#### 题意
在数轴上有 $N$ 个苹果，第 $i$ 个苹果会在时间 $T_{i}$ 掉落在 $X_{i}$ 处，你可以在任意位置放置任意机器人，机器人从 0 时刻开始以速度 1 移动，每个机器人同一时刻只能吃一个苹果，求最少需要放置多少个机器人，才能吃完苹果。

> $N \leq 3e5$

#### 思路
先考虑这样一种情况，假设一个机器人在时间 $T_{i}$ 吃了位于 $X_{i}$ 的苹果，接着要去吃时间 $T_{j}$ 位于 $X_{j}$ 的苹果（ 假设 $T_{j} \geq T_{i}$ ），由于机器人的速度为 1，它能移动的距离 $\leq$ 时间差，即：

$$
|X_{i} - X_{j}| \leq T_{j} - T_{i}
$$

如果把绝对值拆开的话，就能得到下面两个不等式：

1. $X_{i} - X_{j} \leq T_{j} - T_{i} \implies T_{i} + X_{i} \leq T_{j} + X_{j}$
2. $-(X_{i} - X_{j}) \leq T_{j} - T_{i} \implies  T_{i} - X_{i} \leq T_{j} - X_{j}$

观察两个柿子，发现形式上是对称的，不妨令 $A = T - X, B = T + X$。

可以得到：$A_{i} \leq A_{j}$ 且 $B_{i} \leq B_{j}$ 时，机器人能从苹果 $i$ 跑到苹果 $j$。

然后在这个 $(A, B)$ 的坐标系中，机器人只能向着右上方前进，这是不是就有点类似 LIS 问题了。

问最少需要几个机器人，这就让我们想到 [P1020 导弹拦截 - 洛谷](https://www.luogu.com.cn/problem/P1020) 这一题，如果每个机器人吃苹果的路线都是一条不断向右上方延长的链。

那么问题就转化为：**求解覆盖所有点的最小链数**。根据离散数学中的 Dilworth 定理：

> 最小链覆盖数 = 最长反链的长度。

**反链** 在本题语境下指的是一组苹果，其中任意两个苹果都无法被同一个机器人吃到（互相不可达），也就是两个苹果 $i, j$，既不满足 $i$ 到 $j$ 的偏序，也不满足 $j$ 到 $i$ 的偏序。

> **不可达**：就是保证 $A_{i} \leq A_{j}$ 的前提下，不能满足 $B_{i} \leq B_{j}$，也就是 $B_{i} > B_{j}$，反之先对 $B$ 排序后，对 $A$ 的处理同理。

因此，如果我们把所有的苹果都先按照 A 从小到大排序 ( 保证了 A 是不下降的 )，接着为了让他们互相不可达，它们的 B 坐标必须是 **严格递减** 的，这样就把一个 二维偏序问题，转化为了一个一维偏序问题。

接着就变成了一个 LDS ( 最长严格递减子序列 ) 长度的求解问题，由于规模限制，这里需要采用 $O(N \log N)$ 的求法处理。

#### 代码部分
```cpp
struct Node { int A, B; } a[maxn];
int n;

bool cmp( Node a, Node b ) {
    if( a.A != b.A ) return a.A < b.A;
    return a.B < b.B;
}

int LDS( ) {
    vector<int> g;
    for( int i = 1; i <= n; ++ i ) {
	    // 小 Trick: 求 B 的严格递减子序列 <=> 求 -B 的严格递增子序列
        int x = -a[i].B;
        auto it = lower_bound( g.begin( ), g.end( ), x );
        if( it == g.end( ) ) g.push_back( x );
        else *it = x;
    }
    return g.size( );
}

void solve( ) {
    cin >> n;
    for( int i = 1; i <= n; ++ i ) {
        int t, x;
        cin >> t >> x;
        a[i] = { t - x, t + x };
    }
    sort( a + 1, a + n + 1, cmp );
    int res = LDS( );
    cout << res << '\n';
}
```
