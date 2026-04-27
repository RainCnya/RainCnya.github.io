---
title: Solution_ABC441 A~F
tags: ABC
date: 2026-01-18
---

## [A - Black Square](https://atcoder.jp/contests/abc441/tasks/abc441_a)

### 1. 题意梗概（翻译）

判断 $x,y$ 是否在 $[p,p+100),[q,q+100)$ 中。

### 2. 逻辑推导

语法题，`Pass`。

## [B - Two Languages](https://atcoder.jp/contests/abc441/tasks/abc441_b)

### 1. 题意梗概（翻译）

给定 $s1, s2$ 两个字符串，长度分别为 $n, m$。给定 $Q$ 次询问，问 $w_i$ 是哪种语言。
判断条件：对于每个单词，若全部字母在某字符串中出现，则属于该语言。

### 2. 逻辑推导

最简单的想法，就是对于每个 $w_i$ 进行两次匹配，分别对 $s1,s2$ 匹配，若满足，则输出答案。

这里采取个人优化方案，开两个 `Vis[26]` 数组存储 $s1,s2$ 中出现的字母情况。

然后再对 $w_i$ 直接对桶匹配即可。

### 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair<int, int>;

const int maxn = 1e5 + 50;

bool vis1[26];
bool vis2[26];

int n, m, q;
string s1, s2;

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    
    cin >> n >> m;
    cin >> s1 >> s2;

    for( int i = 0; i < n; ++ i )
    {
        vis1[ s1[i] - 'a' ] = 1;
    }

    for( int i = 0; i < m; ++ i )
    {
        vis2[ s2[i] - 'a' ] = 1;
    }


    cin >> q;

    while( q -- )
    {
        string w;
        cin >> w;

        bool ok1 = 1, ok2 = 1;
        for( char c : w )
        {
            if( !vis1[ c - 'a' ] ) ok1 = 0;
            if( !vis2[ c - 'a' ] ) ok2 = 0;
        }

        if( ok1 && ok2 ) cout << "Unknown" << '\n';
        else if( ok1 ) cout << "Takahashi" << '\n';
        else cout << "Aoki" << '\n';

    }

    return 0;
}
```

{% endfold %}


## [C - Sake or Water](https://atcoder.jp/contests/abc441/tasks/abc441_c)

### 1. 题意梗概（翻译）

给 $N$ 杯水，其中有 $K$ 杯有酒。 求至少喝掉 $X$ 的酒，至少需要选择多少个杯子。 

-   $1 \leq K \leq N \leq 3\times 10^5,1 \leq A_i \leq 10^9$
-   $1 \leq X \leq 3\times 10^{14}$

### 2. 逻辑推导

这题的关键在构造**最坏情况**，即贪心思想的应用。

为了保证在最坏情况也能喝到 $X$ 毫升的酒，我们就需要让我们选出的杯子中，酒的最少可能总量 “大于等于” $X$。

假设我们选了 $m$ 个杯子，在所有 $N$ 个杯子中，有 $K$ 杯是酒，$N-K$ 杯是水。为了让我们喝到的酒最少，那 $N - K$ 杯水就需要占据我们选出的杯子中容量较大的那部分。

- 若 $m \leq N - K$ ，就说明此时喝不到酒，$k = 0$。
- 若 $m \geq N - K$ ，此时酒的杯子数： $k = m - (N - K)$。
- 为了让这 $k$ 杯酒的容量尽可能少，所以贪心选择这 $m$ 被中容量最小的即可。

明确了这些之后，我们先进行一次排序，将 $A$ 降序（从大到小）排序。

如果我们选前 $m$ 大的杯子。那么这 $m$ 个杯子中，容量最小的 $k$ 个分别为：$A'_{m-k+1}, A'_{m-k+2},\dots,A'_{m}$。

代入 $k = m - (N - K)$ ，得到酒的初始下标为 $m - (m - (N - K)) + 1  = N - K + 1$，即把问题转换为，从 $N - K + 1$ 开始，一直加到第 $m$ 大的杯子的总和。

### 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair<int, int>;

const int maxn = 3e5 + 50;

int k, n;
ll a[maxn];
ll x;


int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    
    cin >> n >> k >> x;
    for( int i = 1; i <= n; ++ i )
    {
        cin >> a[i];
    }

	// 从大到小排序，greater<ll>() 就是一个 cmp 函数。
    sort( a + 1, a + n + 1, greater<ll>() );

    ll sum = 0;
    int st = n - k + 1;
    if( st < 0 ) st = 0;

    for( int m = st; m <= n; ++ m )
    {
        sum += a[m];
        if( sum >= x )
        {
            cout << m << '\n';
            return 0;
        }
    }
    cout << -1 << '\n';
    return 0;
}
```

{% endfold %}

## [D - Paid Walk](https://atcoder.jp/contests/abc441/tasks/abc441_d)

### 1. 题意梗概（翻译）

给一个有向图： $N \leq 2e5$ 个点，$M \leq 2e5$ 条边，每个顶点的出度最多为 $4$。

找出所有满足条件的点——存在一条路径 $1 \to v$，恰好遍历了 $L$ 条边，遍历 $Cost$ 总和 $S \le Cost \le T$。

- $1 \leq L \leq 10,1 \leq S ≤ T \leq 1e9,1 \leq C_i \leq 1e8$

### 2. 逻辑推导

好像有点无从下手，我最开始想能不能先跑 `Dijkstra`，但是发现跟这题相性很差。再接着看题发现，$L \leq 10$，每个点的出度最多为 $4$，也就是说，每个点的后续情况最多只有 $4$ 种。

这意味着，如果直接`dfs` 的话，时间复杂度为 $4^L \leq 4^{10}$，绰绰有余！！！

OK，那题目就变得很简单了，我们只需要把所有路线都搜出来，最终满足条件的点记录，最后输出即可。

### 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair< ll, int >;

const int maxn = 2e5 + 50;
vector< PII > adj[maxn];
bool vis[maxn];
int n, m, l;
ll s, t;

void dfs( int u, int step, ll sum )
{
    if( step == l )
    {
        if( s <= sum && sum <= t )
        {
            vis[u] = 1;
        }
        return ;
    }
    for( auto [cost, v] : adj[u] )
    {
        dfs( v, step + 1, sum + cost );
    }
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);

    cin >> n >> m >> l >> s >> t;

    for( int i = 1; i <= m; ++ i )
    {
        int u, v; ll c;
        cin >> u >> v >> c;
        adj[u].push_back({ c, v });
    }
    
    dfs( 1, 0, 0 );

    for( int i = 1; i <= n; ++ i )
    {
        if( vis[i] ) cout << i << " ";
    }

    return 0;
}
```

{% endfold %}

## [E - A > B substring](https://atcoder.jp/contests/abc441/tasks/abc441_e)

### 1. 题目梗概

给定一个长度为 $N \leq 5e5$ 的字符串 $S$，它由 `A,B,C` 组成，求所有子串中 `A` 的数量大于 `B` 的个数。

### 2. 逻辑推导

问有多少个区间内 `A` 的数量大于 `B`，那我们不妨令 `A=1,B=-1`。若某一段区间和大于$0$，不就说明 `A` 的数量大于 `B` 了吗？

既然要用区间和，不妨用前缀和优化。

那么问题就转化为了，找到 $i < j$ 使得 $s[j] - s[i-1] > 0 \iff s[i-1] < s[j]$，咦，看起来这就是 "顺序对" 啊。

那么这里有两种方案了。"树状数组" / "归并排序"。

我才用树状数组来统计答案，应该是比较经典的写法。

### 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 5e5 + 50;

// 树状数组
int BIT[maxn << 1];
string s;
// 考虑到负数，这里要添加偏移量
int offset = maxn;
int n;

// 标准的 BIT 三幻神 lowbit add query

int lowbit( int x )
{
    return x & -x;
}

void add( int idx, int val )
{
    for( ; idx <= maxn << 1; idx += lowbit( idx ) )
        BIT[idx] += val;
}

ll query( int idx )
{
    ll res = 0;
    for( ; idx; idx -= lowbit( idx ) )
        res += BIT[idx];
    return res;
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);

    cin >> n >> s;
    s = ' ' + s;       // 个人习惯，转为 1-Base 计算

    ll ans = 0;        // 统计答案
    int cnt = 0;       // 前缀和
    add( offset, 1 );  // offset 表示 0 (偏移量)

    for( int i = 1; i <= n; ++ i )
    {
        if( s[i] == 'A' ) cnt ++;
        else if( s[i] == 'B' ) cnt --;

		// 答案统计，注意是统计到 cnt - 1，cnt 不算
        ans += query( cnt + offset - 1 );
        add( cnt + offset, 1 );
    }

    cout << ans << '\n';
    return 0;
}
```

{% endfold %}



## [F - Must Buy](https://atcoder.jp/contests/abc441/tasks/abc441_f)

### 1. 题面梗概（翻译）

给定 $N \leq 1000$ 个物品，第 $i$ 个物品的价格为 $P_i$，价值为 $V_i$，每个物品只有一个。同时给定 $M \leq 5e4$ 的预算，处理每个物品的类别。

分类要求，为了让所选问题的总价值最大化：必选 `A`，必不选 `C`，其他 `B`。

- $1 \leq P_i \leq M, 1 \leq V_i \leq 1e9$

### 2. 逻辑推导

乍一看，这不背包问题吗？只有一个？直接 0/1 背包启动！！！

仔细品了品，发现问题不简单，简单的跑一遍背包只能算出结果，不能算出每个物品的分类。

既然如此，我们就需要通过别的方式来完成分类。注意到我们只需要考虑 "必选" 和 "必不选" 两种情况即可，不妨用前后缀 DP 来解决。

令 `Pre[i][j]` 表示 $1 \to i$ 中总价格为 $j$ 的最大价值。`Post[i][j]` 表示从 $n \to i$ 中总价格为 $j$ 的最大价值。

那么我们就只需要讨论当前这个物品 "选或不选" 会不会影响最终决策，当然最终的最大值方案就是 `Pre[n][m]`。

假设当前在考虑第 $i$ 个物品，那么不选它的最大价值为：

$$
Without = max_{1}^{m}(pre[i-1][j] + post[i-1][m-j])
$$

若 $Without < Pre[n][m]$ 则说明这个物品不能不选，反之就是必选。

同理，如果这个物品必选，那么它的最大价值为：

$$
With = max_{1}^{m-p[i]}(pre[i-1][j] + post[i-1][m-p[i]-j]) + v[i]
$$

若 $With < Pre[n][m]$ 则说明这个物品不能必选，反之就是必不选。

别的细节就看代码吧。

### 3. 代码实现 

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair<int, int>;

const int maxm = 5e4 + 50;
const int maxn = 1e3 + 50;

int n, m;
ll p[maxn], v[maxn];
ll pre[maxn][maxm];
ll post[maxn][maxm];

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    
    cin >> n >> m;

    for( int i = 1; i <= n; ++ i )
    {
        cin >> p[i] >> v[i];
    }

    for( int i = 1; i <= n; ++ i )
    {
        for( int j = 0; j <= m; ++ j )
        {
	        // 不选这个物品
            pre[i][j] = pre[i - 1][j];
            // 选这个物品
            if( j >= p[i] ) pre[i][j] = max( pre[i][j], pre[i - 1][j - p[i]] + v[i] );
        }
    }

    for( int i = n; i >= 1; -- i )
    {
        for( int j = 0; j <= m; ++ j )
        {
	        // 不选这个物品
            post[i][j] = post[i + 1][j];
            // 选这个物品
            if( j >= p[i] ) post[i][j] = max( post[i][j], post[i + 1][j - p[i]] + v[i] );
        }
    }

    ll val = pre[n][m];
    string ans = "";

    for( int i = 1; i <= n; ++ i )
    {
        ll CateA = 0;   // 必选的情况 With
        for( int j = 0; j <= m - p[i]; ++ j )
        {
            CateA = max( CateA, pre[i - 1][j] + post[i + 1][m - p[i] - j] );
        }
        CateA += v[i];

        ll CateC = 0;   // 必不选的情况 Without
        for( int j = 0; j <= m; ++ j )
        {
            CateC = max( CateC, pre[i - 1][j] + post[i + 1][m - j] );
        }

        if( CateA < val ) ans += 'C';
        else if( CateC < val ) ans += 'A';
        else ans += 'B';
    }

    cout << ans;
    return 0;
}
```

{% endfold %}
