---
title: '[Solution] ABC456 A~F'
tags: ABC
categories:
  - 270_Solutions
  - ABC
abbrlink: 90bd9ef3
date: 2026-05-04 00:00:00
---

本次赛时写到 F，G 题惨败生成函数，有趣的是这次的题目都有关联， AB 都是骰子， CD 都是串相关计数，EFG 都是放假（雾。

### [A - Dice](https://atcoder.jp/contests/abc456/tasks/abc456_a)

#### 题意
投掷三个骰子，给定一个 x，问三个骰子的点数总和能否为 x。
> $1 \leq x \leq 20$

#### 思路
简单猜一下发现 3 个骰子的范围就是 $3\to18$，范围以外都是无法得到的。

#### 代码部分
```cpp
void solve( ) {
    int x;
    cin >> x;
    if( x < 3 || x > 18 ) {
        cout << "No" << '\n';
    } else {
        cout << "Yes" << '\n';
    }
}
```

### [B - 456](https://atcoder.jp/contests/abc456/tasks/abc456_b)

#### 题意
同样给定三个骰子，同时给定三个骰子的六面，问三个骰子恰好是 4 5 6 的概率。

#### 思路
考虑用概率计算，对三个骰子的 4 | 5 | 6 分别判断即可，因为三个骰子的点数是独立事件，所以可以直接把概率乘起来。
> (4,5,6) | (4,6,5) | (5,4,6) | (5,6,4) | (6,4,5) | (6,5,4)

#### 代码部分
```cpp
void solve( ) {
    for( int i = 1; i <= 3; ++ i ) {
        for( int j = 1; j <= 6; ++ j ) {
            cin >> a[i][j];
            if( a[i][j] == 4 ) cnt[i][4] ++;
            if( a[i][j] == 5 ) cnt[i][5] ++;
            if( a[i][j] == 6 ) cnt[i][6] ++;
        }
    }

    double ans = 0;

	// 216 = 6 * 6 * 6
    ans += cnt[1][4] * cnt[2][5] * cnt[3][6] / 216.0;
    ans += cnt[1][4] * cnt[2][6] * cnt[3][5] / 216.0;

    ans += cnt[1][5] * cnt[2][6] * cnt[3][4] / 216.0;
    ans += cnt[1][5] * cnt[2][4] * cnt[3][6] / 216.0;
    
    ans += cnt[1][6] * cnt[2][4] * cnt[3][5] / 216.0;
    ans += cnt[1][6] * cnt[2][5] * cnt[3][4] / 216.0;

    cout << fixed << setprecision( 10 ) << ans << '\n';
}
```

### [C - Not Adjacent](https://atcoder.jp/contests/abc456/tasks/abc456_c)

#### 题意
给定一个包含 a b c 的字符串，问，存在多少**子串**满足相邻两个字符不同。

#### 思路
注意到是子串，因此必定是连续的，假设在某一个区间 $[l,r]$ 中 $S_{i} \neq S_{i+1}$，那么所有子串都满足条件，个数也就是 $len = r - l + 1, cnt = \frac{(len)*(len+1)}{2}$。

如果 $S_{i} == S_{i+1}$ 呢？根据子串的定义，它必须是连续的，因此 i 和 i+1 必定是不能连在一起的，所以分开计算两段的子串个数即可。

#### 代码部分
```cpp
void solve( ) {
    string s;
    cin >> s;
    int n = s.length( );
    ll len = 1, ans = 0;
    for( int i = 1; i < n; i ++ ) {
        if( s[i] != s[i-1] ) {
            len ++;
        } else {
            ans = ( ans + len * (len + 1)  / 2 ) % mod;
            len = 1;
        }
    }
    ans = ( ans + len * (len + 1)  / 2 ) % mod;
    cout << ans << '\n';
}
```

### [D - Not Adjacent 2](https://atcoder.jp/contests/abc456/tasks/abc456_d)

#### 题意
给定一个包含 a b c 的字符串，问，存在多少**子序列**满足相邻两个字符不同。

#### 思路
注意到是子序列，这个条件比子串松一点，它允许中间空，但是不允许顺序颠倒。这是一道典型的计数类 DP。为什么会想到 DP，为什么要用 DP？

- **子序列性质**：我们按顺序扫描字符串，对于当前位置 $s[i]$，它是否能加入某个已有的子序列，只取决于该子序列的 **最后一个字符**。    
- **无后效性**：一旦确定了以某种字符结尾的子序列数量，我们不需要关心这些子序列内部的具体构成。

定义 $fa$：当前以 'a' 结尾的合法子序列总数， $fb, fc$ 同理。

由于子序列不要求连续，因此转移也不要求连续，所以当前 $S[i]$ 可以接到任何一个结尾不为 $S[i]$ 的子序列后面。

也就是 $fa = (fb + fc + 1)$，这个 1 是因为它本身也是一个子序列。

#### 代码部分
```cpp
void solve( ) {
    string s;
    cin >> s;
    int n = s.length( );

    ll fa = 0, fb = 0, fc = 0;
    for( int i = 0; i < n; i ++ ) {
        if( s[i] == 'a' ) {
            ll cnt = (fb + fc + 1) % mod;
            fa = (fa + cnt) % mod;
        } else if( s[i] == 'b' ) {
            ll cnt = (fa + fc + 1) % mod;
            fb = (fb + cnt) % mod;
        } else {
            ll cnt = (fa + fb + 1) % mod;
            fc = (fc + cnt) % mod;
        }
    }
    cout << (fa + fb + fc) % mod << '\n';
}
```

### [E - Endless Holidays](https://atcoder.jp/contests/abc456/tasks/abc456_e)

#### 题意
有 $N$ 个城市，$M$ 条双向道路。一个星期有 $W$ 天。 每个城市都有自己的假期安排。高桥每天可以选择 **留在该城市** 或者 **相邻的城市**。 问：高桥能否从第 $1$ 天，找到一种策略，使得他永远在放假。（羡慕了）

> $N \leq 10^5, M \leq 10^5, W \leq 10$。

#### 思路
这也是一道典题，典型的分层图建模 + 判环。

**为什么是分层图**？在一般的图论中，节点就是 “城市”，而在这题中，除了空间上的限制，还有时间上的限制（同一个城市不同天放假情况可能不同）。所以，不能只用单纯的 “城市” 来作为节点，要扩展时间这一维度。

接着我们通过数据规模验证，发现 $W\leq10$，完美满足条件。所以就用一个二维状态来表示一个节点 $(u, d)$，在城市 $u$，今天是第 $d$ 天。由于有 $N$ 个城市，$W$ 天，所以整个图就有 $N \times W$ 个节点，也就是把图分成了 $W$ 层，这就是所谓的分层图。

说完分层图的节点之后，考虑如何连边。由于每天可以不移动或者去相邻的城市，而且我们要找的路线是每天都是放假，所以，如果当前城市的下一天还有放假，就连，如果相邻城市的下一天有假，也连，否则就不连，注意，这里连的是有向边，因为时间不可逆。

建模之后，回归问题本身，我们只需要在这个有向图上找到一个环就可以满足条件了，简单的使用 DFS 搜环即可，给每个到达的点都打上一个标记，如果在搜的过程中，找到了有标记的点，就说明有环。

> 这里用鸽巢原理简单证明一下，在有限的图里走无限步，就意味着必定走入了一个环。

当然也可以用 BFS，或者拓扑排序（因为这是个有向图），如果拓完还有多余的点，那就说明有环，具体证明不展开了。

#### 代码部分
```cpp
vector< int > adj[maxn];
string s[maxn];
// 0 not visited | 1 visiting | 2 visited
// 我这里没开二维数组，用一维压缩了状态 (u, d) -> u * w + d
int vis[maxn * 10];
int n, m, w;

bool dfs( int uid ) {
    vis[uid] = 1;

    int u = uid / w;
    int d = uid % w;
    int nxt = (d + 1) % w;

    // 停留原地
    if( s[u][nxt] == 'o' ) {
        int vid = u * w + nxt;
        if( vis[vid] == 1 ) return 1;
        if( vis[vid] == 0 ) if( dfs( vid ) ) return 1;
    }

    // 去相邻城市
    for( int v : adj[u] ) {
        if( s[v][nxt] == 'o' ) {
            int vid = v * w + nxt;
            if( vis[vid] == 1 ) return 1;
            if( vis[vid] == 0 ) if( dfs( vid ) ) return 1;
        }
    }
    vis[uid] = 2;
    return 0;
}

void solve( ) {
    cin >> n >> m;

    for( int i = 0; i < n; ++ i ) adj[i].clear( );

    for( int i = 0; i < m; ++ i ) {
        int u, v; cin >> u >> v;
        // 这里用 0 - index 是为了方便压缩成一维状态
        u --, v --;
        adj[u].push_back( v );
        adj[v].push_back( u );
    }

    cin >> w;
    for( int i = 0; i < n; ++ i ) cin >> s[i];

    int tot = n * w;
    fill( vis, vis + tot, 0 );

    for( int i = 0; i < n; ++ i ) {
	    // 从每个第一天就放假的城市出发
        if( s[i][0] == 'o' ) {
            int stid = i * w + 0;
            if( vis[stid] == 0 ) {
                if( dfs( stid ) ) {
                    cout << "Yes" << '\n';
                    return;
                }
            }
        }
    }
    cout << "No" << '\n';
    return;
}
```

### [F - Plan Holidays](https://atcoder.jp/contests/abc456/tasks/abc456_f)

#### 题意
高桥想安排 $N$ 天的假期。最开始都不是假期。操作1：花 $A_i$ 的代价让第 $i$ 天变成假期。 操作2：如果第 $i-1$ 天和第 $i+1$ 天都是假期，那么可以免费让第 $i$ 天变成假期。问：要制造一个长度至少为 $K$ 的连续假期，最少需要多少代价？

> $N, K \leq 2e5$

#### 思路
看了看题，看了看数据，这题好像只能用 $N \log N$ 或者 $N \log K$ 带 Log 的写法了。分析，如果要构造一段连续的假期，这段区间有什么特殊的性质吗？手搓几个小样例发现有以下两个性质：1. 端点必须买；2. 不能有连续的不买；3. 只需要考虑区间长度为 $K$ 和 $K + 1$ 即可。

第三个性质的观察是源于第一个样例：
```
5 2
3 1 4 1 5
res = 2
```
发现可以买 $[2,4]$ 两天，然后 $[3]$ 免费也就凑出了长度为 $3$ 的区间，再往后推导，长度为 $K+2$ 有意义吗？并没有，可以无损转换到 $K$ 和 $K + 1$ 的两种情况。

接下来开始正式推导了

##### 解法零 DP $O(NK)$ - TLE

由于每个点只有 买 和 不买 两种状态，且 当前状态只与上一个点的状态 有关，性质 2，这显然是个动态规划。

记 $dp[0]$ 为当前点不买（前一个点必须买），$dp[1]$ 为当前点必须买。那么很显然就能推导出这个状态转移方程（递推式）：

$$
\begin{align}
dp[i][0] &= dp[i-1][1] \\
dp[i][1] &= \min( dp[i-1][0], dp[i-1][1] ) + a[i]
\end{align}
$$

基于上述逻辑，我们很容易写出一个枚举起点的 $O(NK)$ 暴力 DP，但由于状态数过多，自然就 TLE 了。那么，如何优化呢？

{% fold info @AcCode %}
```cpp
void solve( ) {
    cin >> n >> k;
    for( int i = 1; i <= n; ++ i ) cin >> a[i];
    ll ans = inf;

    for( int l = 1; l <= n - k + 1; ++ l ) {
        // k days
        ll dp0 = inf, dp1 = a[l];
        for( int i = l + 1; i <= l + k - 1; ++ i ) {
            ll nxtdp0 = dp1;
            ll nxtdp1 = min( dp0, dp1 ) + a[i];
            dp0 = nxtdp0;
            dp1 = nxtdp1;
        }
        ans = min( ans, dp1 );

        // k + 1 days
        if( l + k <= n ) {
            int i = l + k;
            ll nxtdp0 = dp1;
            ll nxtdp1 = min( dp0, dp1 ) + a[i];
            dp0 = nxtdp0;
            dp1 = nxtdp1;
        }
        ans = min( ans, dp1 );
    }

    cout << ans << '\n';
}
```
{% endfold %}

##### 解法一：DDP（矩阵线段树） $O(N \log N)$

为什么会想到 DDP？ -- 矩阵加速 -- 观察上面的 DP 转移，我们发现，对于同一个数组 $a$，我们反复在执行完全相同的一组转移方程，就像斐波那契数列那样，这种反复的带有递推关系的方程，我们就会想到，能不能用矩阵来加速递推呢？

接着引入广义矩阵乘法，常规的矩阵乘法是 $C_{i,j} = \sum(A_{i,k} \times B_{k,j})$，但是在我们的转移方程中，操作是取 `min` 和 加法 `+`，我们可以把常规乘法里的 `+` 用 `min` 替代，常规乘法里的 `*` 用 `+` 替代，即 $C_{i,j} = \min_{k} (A_{i,k} + B_{k,j})$。

数学上可以证明这样定义的矩阵乘法是满足 **结合律** 的，而说到结合律，你会想到什么数据结构来维护呢？答案是 线段树。

然后构建状态矩阵，我们将状态写成列向量 $\begin{bmatrix} dp[i][0] \\ dp[i][1] \end{bmatrix}$。 尝试构造一个 $2 \times 2$ 的转移矩阵 $M_i$，使得：

$$\begin{bmatrix} dp[i][0] \\ dp[i][1] \end{bmatrix} = M_i \otimes \begin{bmatrix} dp[i-1][0] \\ dp[i-1][1] \end{bmatrix}$$

根据原方程： 
$$
\begin{align}
dp[i][0] = \min(\infty + dp[i-1][0], 0 + dp[i-1][1]) \\
dp[i][1] = \min(a[i] + dp[i-1][0], a[i] + dp[i-1][1])
\end{align}$$

可以通过待定系数法求解这个转移矩阵 $M_{i}$。

$$M_i = \begin{bmatrix} \infty & 0 \\ a[i] & a[i] \end{bmatrix}$$

既然有了状态转移矩阵，要求某一段区间 $[L+1, R-1]$ 的 DP 结果，其实就是求这段区间对应的矩阵连乘积！由于矩阵乘法满足结合律，我们可以建一棵**线段树**，每个节点维护对应区间的 $M_i$ 连乘积。

枚举左端点 $L$（强制买 $A_L$），右端点 $R$（强制买 $A_R$），中间部分的转移代价只需要 $O(\log N)$ 的时间在线段树上查询矩阵乘积，就可以将复杂度从 $O(NK)$ 降维到 $O(N \log N)$ 了。

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 2e5 + 5;
const ll inf = 1e18;

ll a[maxn], n, k;

struct Mat {
    ll m[2][2];
    Mat( ) { m[0][0] = m[0][1] = m[1][0] = m[1][1] = inf; }
} tr[maxn << 2];

Mat merge( const Mat &a, const Mat &b ) {
    Mat res;
    for( int i = 0; i < 2; ++ i ) {
        for( int j = 0; j < 2; ++ j )
            for( int k = 0; k < 2; ++ k ) {
                if( a.m[i][k] == inf || b.m[k][j] == inf ) continue;
                res.m[i][j] = min( res.m[i][j], a.m[i][k] + b.m[k][j] );
            }
    }
    return res;
}

#define ls u << 1
#define rs u << 1 | 1

void build( int u, int l, int r ) {
    if( l == r ) {
        tr[u].m[0][0] = inf;
        tr[u].m[0][1] = 0;
        tr[u].m[1][0] = a[l];
        tr[u].m[1][1] = a[l];
        return;
    }
    int mid = ( l + r ) >> 1;
    build( ls, l, mid );
    build( rs, mid + 1, r );
    tr[u] = merge( tr[ls], tr[rs] );
}

Mat query( int u, int l, int r, int ql, int qr ) {
    if( ql <= l && r <= qr ) return tr[u];
    int mid = ( l + r ) >> 1;
    if( qr <= mid ) return query( ls, l, mid, ql, qr );
    if( ql > mid ) return query( rs, mid + 1, r, ql, qr );
    return merge( query( ls, l, mid, ql, qr ), query( rs, mid + 1, r, ql, qr ) );
}

void solve( ) {
    cin >> n >> k;
    for( int i = 1; i <= n; ++ i ) cin >> a[i];
    
    build( 1, 1, n );
    ll ans = inf;
    
    int len = k;
    for( int l = 1; l <= n - len + 1; ++ l ) {
        int r = l + len - 1;
        if( r == l ) {
            ans = min( ans, a[l] );
            continue;
        }
        if( r - l <= 1 ) {
            ans = min( ans, a[l] + a[r] );
            continue;
        }
        Mat T = query( 1, 1, n, l + 1, r - 1 );
        ll res = min( T.m[1][1], T.m[0][1] ) + a[l] + a[r];
        ans = min( ans, res );
    }

    len = k + 1;
    for( int l = 1; l <= n - len + 1; ++ l ) {
        int r = l + len - 1;
        if( r == l ) {
            ans = min( ans, a[l] );
            continue;
        }
        if( r - l <= 1 ) {
            ans = min( ans, a[l] + a[r] );
            continue;
        }
        Mat T = query( 1, 1, n, l + 1, r - 1 );
        ll res = min( T.m[1][1], T.m[0][1] ) + a[l] + a[r];
        ans = min( ans, res );
    }

    cout << ans << '\n';
}

int main( ) {
    cin.tie( 0 )->sync_with_stdio( 0 );
    int _t = 1; cin >> _t;
    while( _t -- ) solve( );
    return 0;
}
```
{% endfold %}


##### 解法二：双栈模拟队列 —— 复杂度 $O(N)$

> 该做法理论可行，题解中也有提到，但受限于本人理解水平有限，不能详细展开讲解，见谅。理论就是用滑动窗口的思想，然后用前缀积来处理区间。

既然我们是在做一个 “定长滑动窗口” 的矩阵连乘，我们可以把线段树的 $O(\log N)$ 优化掉。 这里有一个很经典的 Trick：**使用两个栈来模拟一个滑动窗口**。

1. 我们维护两个栈 $S_1$ 和 $S_2$。$S_1$ 用于在队尾压入元素，$S_2$ 用于从队头弹出元素。
2. 栈内不仅存元素本身，还**顺便存下该栈底到当前元素的矩阵前缀积**。
3. 当窗口滑动需要弹出队头时，如果 $S_2$ 有元素，直接弹出；如果 $S_2$ 为空，就把 $S_1$ 的元素全部倒腾到 $S_2$ 中，并在倒入的过程中重新计算 $S_2$ 的矩阵前缀积。
4. 窗口的整体矩阵乘积 = $S_2$ 的栈顶前缀积 $\otimes$ $S_1$ 的栈顶前缀积。

由于每个矩阵最多入栈 2 次、出栈 2 次，均摊后矩阵乘法的次数是 $O(1)$ 的，这样就能把复杂度优化成 $O(N)$。