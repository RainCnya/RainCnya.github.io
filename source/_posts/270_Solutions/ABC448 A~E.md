---
title: Solution_ABC448 A~E
tags: ABC
date: 2026-03-08
---

## [A - chmin](https://atcoder.jp/contests/abc448/tasks/abc448_a)

### 1. 题意梗概

维护当前最大值，如果输入值小于当前最大值，更新并输出 1 。

### 2. 逻辑推导

语法题吧。`Pass`

### 3. 代码实现

```cpp
void solve( )
{
    int n, x, a;
    cin >> n >> x;
    for( int i = 1; i <= n; ++ i )
    {
        cin >> a;
        if( a < x ) x = a, cout << 1 << '\n';
        else cout << 0 << '\n';
    }
}
```

---

## [B - Pepper Addiction](https://atcoder.jp/contests/abc448/tasks/abc448_b)

### 1. 题意梗概

有 $M$ 种货物，第 $j$ 种重量为 $C_j$ 克。有 $N$ 个背包，第 $i$ 个背包只能放第 $A_i$ 种货物，且该货物最多能放 $B_i$ 克。

求在货物总量和每个背包上限的限制下，最多能放多少货物。

> $N, M \leq 1000$

### 2. 逻辑推导

贪心。由于同一个货物可以随意分配给需要它的不同背包，我们可以把所有需要同一种货物的背包的上限累加起来。

统计出所有背包对每个货物的总需求量：

$$
cnt[j] = \sum_{A_{i} = j} B_{i}
$$

对于第 $j$ 个货物，最多能使用的量就是 总储备 和 总需求 的较小值，贪心即可。

### 3. 代码实现

```cpp
void solve( )
{
    cin >> n >> m;
    
    for( int j = 1; j <= m; ++ j ) cin >> c[j];
    for( int i = 1; i <= n; ++ i ) cin >> a[i] >> b[i];
    
    memset( cnt, 0, sizeof( cnt ) );
    for( int i = 1; i <= n; ++ i ) cnt[a[i]] += b[i];

    ll ans = 0;
    for( int j = 1; j <= m; ++ j ) ans += (ll)min( cnt[j], c[j] );
    cout << ans << '\n';
}
```

## [C - Except and Min](https://atcoder.jp/contests/abc448/tasks/abc448_c)

### 1. 题意梗概

袋子里有 $N$ 个球，有 $Q$ 次询问，每次询问临时拿出 $K$ 个指定的球，求袋子里剩下的球中数字的最小值。询问结束后把球放回。

> $N \leq 3 \times 10^5; Q \leq 2 \times 10^5; K \leq 5$

### 2. 逻辑推导

### 1. 切入点

这题的突破点在于 $k \leq 5$ 哈。最小值的可能性是固定的。

### 2. 思路分析

注意到 $k \leq 5$，意味着每次查询的答案数据规模是固定的，最坏的情况是拿出了五个最小的球，答案就是第六小的球，由此发现虽然 $N \leq 3e5$ 但实际能用的数据只有前 $6$ 个最小的。

那么提前把这 $6$ 个提取出来，然后每次用取出的球 和 前六小的球 进行匹配，这样就解决了这个查询问题。

### 3. 代码实现

```cpp
// 这里用结构体存储球，因为要按照值排序，但是查询的时候还需要用到初始下标，所以这里也存了
struct Ball { int val, id; } a[maxn];
int n, q, k;
int b[10];

// 这里就是简单的排序逻辑，找出前六小的球
bool cmp( Ball a, Ball b ) { 
    if( a.val != b.val ) return a.val < b.val;
    return a.id < b.id; 
}

void solve( )
{
    cin >> n >> q;
    for( int i = 1; i <= n; ++ i ) 
    {
        cin >> a[i].val;
        a[i].id = i;
    }

    sort( a + 1, a + n + 1, cmp );

	// 简易 临时存储前 6 最小，方便 pk 匹配
    vector< Ball > tmp;
    int cnt = min( 6, n );
    for( int i = 1; i <= cnt; ++ i ) tmp.push_back( a[i] );

    while( q -- )
    {
        cin >> k;
        for( int i = 1; i <= k; ++ i ) cin >> b[i];

		// 下面这个语句略微有点奇怪，我给它换个形式哈
		// for( int i = 0; i < tmp.size( ); ++ i )
		// Ball ball = tmp[i];
		// 这里是等价的
        for( const auto &ball : tmp )
        {
	        // 标记是否被移除
            bool rmv = 0;
            for( int i = 1; i <= k; ++ i )
            {
                if( ball.id == b[i] )
                {
                    rmv = 1;
                    break;
                }
            }
            // 从小到大找，第一个没被移除的就是最终答案
            if( rmv == 0 )
            {
                cout << ball.val << '\n';
                break;
            }
        }
    }
}
```

---

## [D - Integer-duplicated Path](https://atcoder.jp/contests/abc448/tasks/abc448_d)

### 1. 题意梗概

给一棵树，每个节点有一个点权，然后输出从 $1$ 到 $k$ 的路径上是否有重复的点。

输出 1 到每个点的查询，$k \in [1, n]$。

> $N \leq 2 \times 10^5, A_{i} \leq 10^9$

### 2. 逻辑推导

### 2.1 切入点

回溯型的 DFS。

### 2.2 思路分析

这个数据规模暗示我们需要采用最大 $O( N \log N )$ 的写法，毕竟 $O( N^2 )$ 就爆了。

然后我们可以想到，从根节点开始往下 DFS 搜索，同时记录当前找到了哪些数，如果新搜索到的那个点权之前有找到过，那么就把答案记录下来。

> 为什么不直接输出？因为 DFS 序不一定就是 $1, 2, \dots, n$ 的输出顺序。

然后接着分析，如何记录当前找到了哪些数？显然可以用数组存 `cnt[k] = m` 表示值为 $k$ 的节点出现了 $m$ 次。但是这样会出现一个问题，$A \leq 10^9$ 没法直接开这么大规模的数组。

发现值域大但是稀疏，**所以**我们可以考虑离散化，这里我用 `map` 偷懒了。

最后还有在 DFS 过程中记录：之前的节点中是否已经有重复的，如果有，那么即使当前值不重复，它的这条路径上也是存在重复的。

最后在理一下复杂度，DFS 一遍整个树 $O( N )$（ 每个点搜一遍 ），`map` / 离散化 $O( N \log N )$，`map` 则是插入查询均为 $O(\log N)$，离散化是排序 $O( N \log N )$，查询是 $O(1)$。

### 3. 代码实现

```cpp
vector< int > adj[maxn];
ll a[maxn];
bool ans[maxn];
int n;

map< ll, int > cnt;

// 树上 DFS 一般传两个参数，当前节点 u，以及父节点 p ( 为了防止往回搜 u -> p -> u )
void dfs( int u, int p, bool flag )
{
	// 当前路径到当前点 u 是否存在重复的情况。
    bool cur = ( flag || ( cnt[a[u]] > 0 ) );
    ans[u] = cur;
    cnt[a[u]] += 1;
    for( int v : adj[u] )
    {
        if( v == p ) continue;
        dfs( v, u, cur );
    }
    // 重点回溯
    cnt[a[u]] -= 1;
}

void solve( )
{
    cin >> n;
    for( int i = 1; i <= n; ++ i ) cin >> a[i];

	// 朴实的邻接表存图
    for( int i = 1; i <= n - 1; ++ i )
    {
        int u, v; cin >> u >> v;
        adj[u].push_back( v );
        adj[v].push_back( u );
    }

    cnt.clear( );

    dfs( 1, 0, 0 );

    for( int i = 1; i <= n; ++ i )
    {
        if( ans[i] ) cout << "Yes" << '\n';
        else cout << "No" << '\n';
    }
}
```

---

## [E - Simple Division](https://atcoder.jp/contests/abc448/tasks/abc448_e)

前置芝士：基础数论 | 矩阵快速幂

### 1. 题意梗概

给定整数 $N$ 的游程编码表示（ 由 $K$ 段组成，第 $i$ 段是连续 $l_i$ 个数字 $c_i$ ）和一个整数 $M$。 求 $\lfloor N / M \rfloor \pmod{10007}$ 的值。

> $M \leq 10^4; K \leq 10^5; l_i \leq 10^9$

### 2. 逻辑推导

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

### 2.1 切入点

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

### 2.2 思路分析

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

### 3. 代码实现

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

## 结语

本次比赛最后两题 ( F / G )，由于难度已经跳出了大部分同学的舒适区，写了参考价值不大，这里就不展开赘述了。

简单复盘一下前五题：A ~ C 是基础题；D 的话是一个树上问题，E 是一个矩阵快速幂加速递推的问题。

个人感觉都不是很困难，因为这些题我大多见过类似的。我一直觉得，刷题最大的意义不在于 “背出答案”，或者说刷题本身这个行为，而是在于 “沉淀思维”，或者说是搭建解题框架。

当你下次遇到同类型的题，也许不能秒杀，但你的脑海大概会有个大致的建模方向 —— 这种 **可写** 的底气，大概就是题海中磨练出来了，也可以说是每周 ABC 的价值吧。

### 碎碎念

下面是一些碎碎念，嫌我啰嗦的话可以不看。

从最开始的 441 到现在 448，除了 447 没写，我已经将近两个月赛后第一时间更新题解了。

最初的动力很简单：一是为了自我复盘，梳理思路；二是为了方便大家，官方题解全是英文，且逻辑跳跃，我自认为我写的中文思路还算像人话，能帮大家省下不少啃英文文档的时间。

**但到了今天，我陷入了一些思索**：

比如说，打 ABC 的人不多，看我题解的人就更少了。再比如说，ABC 的营养价值对于我来说已经不多了，但是对大家来说都是好题。

所以其实我在考虑，或者说我在思索，这个每周更新的 ABC 题解真的有人看吗？大家真的需要吗？我到底还要不要写下去呢？

如果大家想看的是手把手的推导，想知道我是怎么从零想出这个状态方程的，我可以多花点时间写。但如果大家并不打算打 ABC，或者觉得官解就够了，那么我可能会选择在近期 **停更**，把精力转而投入到我个人的提升上，比如说 F / G（当然跟大家的接受区间重合度就很低了…… ）。

我没有义务去写这个东西，之所以写了两个月，也是我觉得大家也能从中学到点东西不是吗？我或许也需要一份 “言传身教” 的坚持。但修行是相互的，学习也是，我稍微自私一点，也是为了去追求更高处的风景。

所以，关于题解报告未来的命运，就在于调研报告的反馈了。如果真的无人在意的话，就去压力我的两个队友吧，我把精力调整到更高的战场了。

祝大家新学期一帆风顺，不虚此行。

