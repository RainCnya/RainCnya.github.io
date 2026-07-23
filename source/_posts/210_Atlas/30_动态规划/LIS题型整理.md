---
title: LIS题型整理
tags:
  - algorithm/题型
  - DP/线性
  - DP/LIS
categories:
  - 210_Atlas
  - 30_动态规划
abbrlink: ff454fea
date: 2026-07-11 00:00:00
updated: 2026-07-12 00:00:00
---

# LIS 题型整理

[[LIS模型]] 解决的是这样一个标准问题：给定一维序列，在保持原顺序的前提下，寻找最长的单调子序列。

但在实际问题中，很少会直接给出一列数并要求 LIS。更多时候，我们需要先从题意中找到一条链，再判断题目究竟需要这条链的什么信息。

因此，LIS 题型可以沿着两条主线展开：

1. **怎样找到这条链**：对象是什么，顺序在哪里，两个对象怎样连接；
2. **怎样询问这条链**：求最长长度、最少修改、最大权值，还是某种局部或带限制的答案。

算法原理与最小结尾参见 [[LIS模型]]。

## 一、怎样从原问题中找到一条链

### 1. 原顺序中的最长单调链

> [!question] [P1020 导弹拦截 · 第一问](https://www.luogu.com.cn/problem/P1020)
> 导弹依次到来，一套系统拦截的高度不能上升。求一套系统最多能拦截多少枚导弹。
> 数据规模：$N \le 10^5$


导弹到来的顺序不能改变，但可以跳过其中一部分。若系统已经拦截高度为 $a_i$ 的导弹，接下来拦截高度为 $a_j$ 的导弹，需要满足 $i < j, a_{i} \ge a_{j}$。

所以，一套系统能够拦截的导弹构成原序列的一条不上升子序列，第一问就是求最长不上升子序列。由 [[LIS模型]] 中提到的，把所有高度都取相反数，问题转化为最长不下降子序列，因此使用 `upper_bound` 套模板就行。

这个问题是一个典型的 LIS 模型，但我们需要从中找到一些更一般的线索，比如说：

1. 选择的对象是否允许跳过，而不是要求连续；
2. 相等元素能否进入同一条链，即关系是严格还是非严格。

P1020 第一问中的 “不上升” 是允许相等的。取反以后仍然是 "不下降"，不能误写成严格 LIS。

不过，P1020 中只有一种顺序：导弹的出现顺序。

如果一个方案需要同时保持两个序列中的相对顺序，还能否转化为一维 LIS？

### 2. 把另一种顺序编码为位置

> [!question] [P1439 两个排列的最长公共子序列](https://www.luogu.com.cn/problem/P1439)
> 给定两个 $1\sim N$ 的排列，求它们的最长公共子序列 (LCS)。
> 数据规模：$N \le 10^5$

一个公共子序列需要同时保持两个排列中的相对顺序。对于一般序列，我们通常定义二维状态求 LCS，详见 [[LCS模型]]，时间复杂度为 $O(N^2)$，不能通过本题的数据范围。

但本题还有一个特殊的条件 —— 两个序列都是排列。

> 排列是指 $1$ 到 $n$ 出现一次的长度为 $n$ 的序列。

若选定第一个排列作为参考顺序，定义 $pos[x]$ 表示 $x$ 在第一个排列中的位置。然后把两个排列中的每个元素 $x$ 替换为 $pos[x]$。下面结合样例说明：

```
input :
 A  : 3 1 4 2 5
 B  : 4 1 3 2 5

temp : 
idx : 1 2 3 4 5
pos : 2 4 1 3 5

change :
 A' : 1 2 3 4 5
 B' : 3 2 1 4 5
```

此时，按照第二个排列的顺序选择若干元素以后，它们仍然保持第一个排列中的顺序，当且仅当对应位置严格递增。

因此在这个转化后的序列 $B'$ 上跑一遍 LIS 模型，就能得到原序列 $A$ 和 $B$ 的 LCS。

{% fold info @P1439 %}
```cpp
int a[maxn], b[maxn];
int pos[maxn], c[maxn];

void solve( ) {
    int n = read( );
    for( int i = 1; i <= n; ++ i ) a[i] = read( ), pos[a[i]] = i;
    for( int i = 1; i <= n; ++ i ) b[i] = read( ), c[i] = pos[b[i]];
	
    vector<int> g;
    for( int i = 1; i <= n; ++ i ) {
        int x = c[i];
        auto it = lower_bound( g.begin( ), g.end( ), x );
        if( it == g.end( ) ) g.push_back( x );
        else *it = x;
    }
    cout << g.size( ) << '\n';
}
```
{% endfold %}

这一题的思路是降维，我们通过固定某一种顺序，把另一种顺序编码为位置，从而将问题转化为一维的单调问题。

比起 ”排列 LCS“ 能套 ”LIS“ 来说，更一般的结论是：当对象在参考顺序中位置唯一时，可以用位置数值来完整表示这种关系，把同时解决二维关系的问题降为一维单调关系。

> [!warning] 位置映射的前提
> 这种转化依赖对象在参考序列中的位置唯一。如果一个值对应多个位置，单个 `pos[x]` 就无法完整表示匹配选择，一般 LCS 不能直接用相同方式转化为 LIS。

如果对象本身就有两个相互独立的数值属性，又该怎样固定其中一个维度？

### 3. 通过排序固定一个维度

> [!question] [ABC439E - Kite](https://atcoder.jp/contests/abc439/tasks/abc439_e)
> 第 $i$ 个人对应一条从 $(A_i,0)$ 到 $(B_i,1)$ 的线段。求最多能选出多少条互不相交且不共享端点的线段。
> 数据规模：$N \le 2e5$。

考虑什么样的情况，两条线段是不相交的，如果两个人 $i, j$ 满足 $A_{i} < A_{j}$，那么必须有 $B_{i} < B_{j}$，否则两条线段一定会交叉。

于是问题转化为了：给出若干二元组 $(A_{i}, B_{i})$，求最多能选出多少个点，使得 $A$ 严格递增，$B$ 也严格递增。

我们可以先按 $A$ 升序排列，使第一维的大小关系由遍历顺序自动满足，再对 $B$ 求严格 LIS。

但是，若两个对象的 $A$ 相等，它们在原问题中不能同时选择。排序却一定会人为地给它们安排先后顺序。如果相同 $A$ 时仍按 $B$ 升序，第二维 LIS 就可能同时选中这些原本互不可比的对象。

> 比如 $(1, 2), (1, 3), (2, 4)$ 这种就都会被选中。

因此，需要在 $A$ 相同时让 $B$ 降序排列，再对 $B$ 求严格 LIS。

{% fold info @ABC439E %}
```cpp
struct Kite {
    int a, b;
    bool operator < ( const Kite &oth ) const {
        if( a != oth.a ) return a < oth.a;
        return b > oth.b;
    }
} A[maxn];

void solve( ) {
    int n = read( );
    for( int i = 1; i <= n; ++ i ) A[i].a = read( ), A[i].b = read( );
    sort( A + 1, A + n + 1 );
    vector<int> g;
    for( int i = 1; i <= n; ++ i ) {
        auto [a, b] = A[i];
        auto it = lower_bound( g.begin( ), g.end( ), b );
        if( it == g.end( ) ) g.push_back( b );
        else *it = b;
    }
    cout << g.size( );
}
```
{% endfold %}

我们发现这个问题跟上一题 P1439 类似，当关系的维度不止一维的时候，我们可以通过排序固定第一维，再把第二维交给 LIS，但是要注意排序后的先后关系必须要和原偏序保持一致。

那么很自然的会想到，如果问题来到三维，乃至更高维度应该怎么办？

#### 更高维的边界

对于三维偏序 $x_i < x_j, y_i < y_j, z_i < z_j$，固定第一维后，仍然需要同时处理另外两个维度。对应状态通常形如 $\displaystyle f_i = 1 + \max_{x_j < x_i,y_j < y_i,z_j<z_i}(f_j)$。

这已经不能直接退化为普通 LIS，而是二维偏序范围最值问题，通常需要使用 [[CDQ分治]]、树状数组等方法继续降维。因此，二维偏序是 LIS 通过排序降维能够直接处理的边界；三维及更高维偏序另见 [[高维偏序题型整理]]。

到目前为止，三个问题都在求一条链最多包含多少对象。但如果题目要求的不是寻找一条最长链，而是用尽可能少的合法链覆盖所有对象呢？

### 4. 从一条最长链到覆盖全部对象

> [!question] [P1020 导弹拦截 · 第二问](https://www.luogu.com.cn/problem/P1020)
> 如果一套系统能够拦截一条不上升子序列，最少需要多少套系统才能拦截全部导弹？
> 数据规模：$N \le 10^5$

第一问只要求寻找一套系统能够处理的最长序列，也就是求一条最长链。

第二问要求把所有导弹分配给不同系统，使每套系统处理的导弹仍然构成一条不上升子序列。

所以，第二问的意思是问：最少用几条链可以覆盖全部对象。

定义 $i \prec j \iff i < j, a_{i} \ge a_{j}$。一条链就是一套系统能够处理的一条不上升子序列。

由 [[Dilworth定理]] 得：最小链覆盖数 = 最长反链大小。

在这个偏序中，按照下标顺序，反链里的高度必须严格上升。

因此：最少系统数 = 严格 LIS 长度。

{% fold info @P1020 %}
```cpp
int a[maxn];
int n;

void solve( ) {
    int x;
    while( cin >> x ) a[++ n] = x;
    
    vector<int> d1;
    for( int i = 1; i <= n; ++ i ) {
        int x = -a[i];
        auto it = upper_bound( d1.begin( ), d1.end( ), x );
        if( it == d1.end( ) ) d1.push_back( x );
        else *it = x;
    }
    cout << d1.size( ) << '\n';

    vector<int> d2;
    for( int i = 1; i <= n; ++ i ) {
        int x = a[i];
        auto it = lower_bound( d2.begin( ), d2.end( ), x );
        if( it == d2.end( ) ) d2.push_back( x );
        else *it = x;
    }
    cout << d2.size( ) << '\n';
}
```
{% endfold %}

这也解释了 P1020 两问看似相近却使用不同单调关系的原因：

- 第一问直接求一条最长不上升链；
- 第二问求最小链覆盖，再转化为最长反链，反链表现为严格上升。

所以，在看到 “最少分组” 或者 “最少执行者” 这类时，不能直接套 LIS。需要先明确每一组是否构成一条链，再考虑是否套用 Dilworth 定理，判断最小链覆盖对应的反链在排序后呈现什么单调关系。

P1020 的序列连接关系直接写在下标和高度中。如果 “一条链” 隐藏在距离、时间或可达条件里，又该怎样把它找出来？

### 5. 从可达关系中构造偏序

> [!question] [ABC457G - Catch All Apples](https://atcoder.jp/contests/abc457/tasks/abc457_g)
> 苹果 $i$ 会在时间 $T_i$ 落到位置 $X_i$。可以放置任意多个速度为 $1$ 的机器人，求收集全部苹果所需的最少机器人数量。
> 数据规模：$N \le 3e5$。

先考虑一个机器人能否在收集苹果 $i$ 后继续收集苹果 $j$。它需要满足：$|X_i-X_j|\leq T_j-T_i$。

这个条件还看不出单调关系。把绝对值拆开：$T_i-X_i\leq T_j-X_j,\ T_i+X_i\leq T_j+X_j$。

定义新的坐标，记 $U = T - X, V = T + X$，那么机器人从苹果 $i$ 到达苹果 $j$ 的条件变成 $U_{i} \le U_{j}, V_{i} \le V_{j}$。

于是，一个机器人依次收集的苹果构成二维偏序中的一条链，而最少机器人数量就是最小链覆盖数。由 [[Dilworth定理]]，问题转化为求最长反链。

将所有点按 $U$ 升序、$U$ 相同时按 $V$ 升序排列后，反链中的 $V$ 必须严格下降，因此答案是 $V$ 的最长严格下降子序列长度。

{% fold info @ABC457G %}
```cpp
struct Node { int A, B; } a[maxn];
int n;

bool cmp( Node a, Node b ) {
    if( a.A != b.A ) return a.A < b.A;
    return a.B < b.B;
}

void solve( ) {
	int n = read( );
    for( int i = 1; i <= n; ++ i ) {
        int t = read( ), x = read( );
        a[i] = { t - x, t + x };
    }
    sort( a + 1, a + n + 1, cmp );
    vector<int> g;
    for( int i = 1; i <= n; ++ i ) {
        int x = -a[i].B;
        auto it = lower_bound( g.begin( ), g.end( ), x );
        if( it == g.end( ) ) g.push_back( x );
        else *it = x;
    }
    cout << g.size( ) << '\n';
}
```
{% endfold %}

整个转化过程是：时空可达 $\to$ 拆绝对值 $\to$ 坐标变换 $\to$ 二维偏序 $\to$ 最小链覆盖 $\to$ 最长反链。

这题的启发是，偏序关系可能是隐藏在题目信息中的，要提取出对象，再分析，将可达条件代数化求解。

这道题连接了坐标变换、二维偏序、Dilworth 与 LIS，对个人知识结构的增量已经超出普通题型卡，因此完整思考过程另见 [[ABC457G Catch All Apples]]。

---

## 二、已经得到单调链后，还能问什么

前面的题目不断改变对象之间的连接关系，但最终都只在求最长链或最小链覆盖。

如果连接关系仍然是普通上升关系，而题目改为询问最少修改、最大权值、指定元素或者带限制的前缀答案，基础 LIS 又会怎样变化？

### 6. 最少修改与最大保留

> [!question] [ABC006D - トランプ挿入ソート](https://atcoder.jp/contests/abc006/tasks/abc006_4)
> 每次可以从排列中取出一张牌，并插入任意位置。求把整个排列变成升序所需的最少操作次数。
> 数据规模：$N \le 3e4$。

直接考虑移动哪些牌比较麻烦，取个补集看看 —— 最多能让多少张牌保持不动？

而因为最终的序列需要升序，也就是说保持不动的牌就构成了一条 严格上升子序列。

最多可以保留的牌数就是 LIS 长度，其余牌都需要被移动，所以最小操作数 = $N - LIS(A)$。

{% fold info @ABC006D %}
```cpp
void solve( ) {
    int n = read( );
    for( int i = 1; i <= n; ++ i ) a[i] = read( );
    vector<int> g;
    for( int i = 1; i <= n; ++ i ) {
        int x = a[i];
        auto it = lower_bound( g.begin( ), g.end( ), x );
        if( it == g.end( ) ) g.push_back( x );
        else *it = x;
    }
    cout << n - (int)g.size( ) << '\n';
}
```
{% endfold %}

这道题启示我们，如果正着思考问题陷入瓶颈，不妨反过来想想。

这里从 “最少修改数” 进一步转化出了 “求最长合法结构”。

如果每个被保留的对象价值不同，目标不再是保留数量最多，又该怎样处理？

### 7. 从最长长度到最大权值

> [!question] [Educational DP Contest Q - Flowers](https://atcoder.jp/contests/dp/tasks/dp_q)
> 第 $i$ 朵花有高度 $h_i$ 和美丽值 $a_i$。选择高度严格递增的子序列，求美丽值总和的最大值。
> 数据规模：$N\leq 2\times 10^5$。

普通 LIS 最大化的是选择数量，其实也就是每个对象权值为 1 的特殊情况。现在每个对象的贡献不同，目标变为最大化权值和，我们就需要更一般的解法了。

定义 $f_{i}$ 表示以第 $i$ 朵花结尾的合法子序列的最大美丽值，那么转移为 $\displaystyle f_{i} = a_{i} + \max_{j < i, h_j < h_i}(f_{j})$。

此时，“结尾更小” 不能代表 “累计权值更大”。最小结尾数组删除的同长度状态可能具有更大的权值，因此这题不能继续使用基础 LIS 的状态支配。

不过，原转移等价于：在此前所有高度小于 $h_i$ 的状态中查询最大的 $f_j$。所以，可以按照高度维护 DP 最大值，用树状数组完成值域前缀最大值查询。

{% fold info @EDPCQ %}
```cpp
struct BIT_Max { /* 单点取 max，前缀查询 max */ } bit;

int h[maxn];
ll a[maxn];
ll f[maxn];

void solve( ) {
    int n = read( );
    for( int i = 1; i <= n; ++ i ) h[i] = read( );
    for( int i = 1; i <= n; ++ i ) a[i] = read( );

    bit.init( n );
    for( int i = 1; i <= n; ++ i ) {
        f[i] = a[i] + bit.ask( h[i] - 1 );
        bit.add( h[i], f[i] );
    }
    cout << *max_element( f + 1, f + n + 1 ) << "\n";
}
```
{% endfold %}

这道题对应 [[LIS模型]] 中另一条优化路线：用数据结构优化转移。

它启示我们 **最小结尾** 的贪心做法是有局限性的。

现在进一步考虑另一个问题：如果仍然求最长长度，但是要判断每个元素能否进入某个最优方案呢？

### 8. 指定元素能否进入某条 LIS

> [!question] [ABC354F - Useless for LIS](https://atcoder.jp/contests/abc354/tasks/abc354_f)
> 对每个位置 $i$，判断 $A_i$ 是否可能出现在原序列的某一条 LIS 中。
> 数据规模：$N \le 2e5$。

回顾最小结尾做法：如果最终只保留 `g` 数组，我们只能得到全局 LIS 长度，无法判断某个位置是否可能参与最优方案。

所以我们需要换一个角度思考问题，假设我们固定 $i$ 元素后，能否构造一条经过它的 LIS 呢？自然的会想到 $i$ 这个元素的左右两边。

定义：$ed_{i}$ 表示以 $A_{i}$ 结尾的 LIS 长度，$st_{i}$ 表示以 $A_{i}$ 开始的 LIS 长度。

那么经过 $A_{i}$ 的最长递增子序列长度就是 $ed_{i} + st_{i} - 1$。设全局 LIS 长度为 $L$，那么 $A_{i}$ 能够进入某条 LIS，当且仅当 $ed_{i} + st_{i} - 1 = L$。

值得一提的是，在依次处理 $A_i$ 时，`lower_bound` 得到的位置加一，恰好就是以 $A_i$ 结尾的 LIS 长度。因此，这题也是可以使用最小结尾数组的做法，在正向扫描时记录 $ed_i$，再反向扫描记录 $st_i$ 即可。

{% fold info @ABC354F %}
```cpp
int ed[maxn], st[maxn];
int a[maxn];

void solve( ) {
    int n = read( );
    for( int i = 1; i <= n; ++ i ) {
        a[i] = read( );
    }

    vector<int> g;
    for( int i = 1; i <= n; ++ i ) {
        int x = a[i];
        auto it = lower_bound( g.begin( ), g.end( ), x );
        ed[i] = it - g.begin( ) + 1;
        if( it == g.end( ) ) g.push_back( x );
        else *it = x;
    }
    int L = g.size( );
    
    g.clear( );
    for( int i = n; i >= 1; -- i ) {
        int x = -a[i];
        auto it = lower_bound( g.begin( ), g.end( ), x );
        st[i] = it - g.begin( ) + 1;
        if( it == g.end( ) ) g.push_back( x );
        else *it = x;
    }

    vector<int> res;
    for( int i = 1; i <= n; ++ i ) {
        if( ed[i] + st[i] - 1 == L ) res.push_back( i );
    }
    
    cout << res.size( ) << '\n';
    for( int x : res ) cout << x << " ";
    cout << '\n';
}
```
{% endfold %}


这里产生了一种新的方法：分别计算指定位置的前缀最优状态和后缀最优状态，再以该位置为公共端点进行拼接。

这一结构在 [[最短路模型]] 中也会出现，例如通过 $dis_s(i) + dis_t(i) = dis_s(t)$ 判断结点 $i$ 是否可能位于某条最短路上。更一般地，可以整理为 [[前后缀最优状态拼接]]。

如果题目不是对每个位置提问，而是给出大量带前缀和值域限制的 LIS 询问，又该怎样处理？

### 9. 带前缀和值域限制的 LIS 询问

> [!question] [ABC393F - Prefix LIS Query](https://atcoder.jp/contests/abc393/tasks/abc393_f)
> 每次询问给出 $R_i,X_i$，要求在前缀 $A_1,\dots,A_{R_i}$ 中选择一条严格上升子序列，并且所有元素不超过 $X_i$，求最大长度。
> 数据规模：$N, Q \le 2e5$。

这题有两个限制条件，其一是右端点，其二是值域。我们先忽略询问中的 $X_i$，如果只考虑右端点 $R_i$ 的话，这题其实很好处理。

直接采用离线算法，按 $R$ 从小到大排序，然后依次拓展 最小结尾数组 `g` 即可。

接着我们需要考虑值域上界 $X$，对于 $X$ 而言，存在一条长度为 $k + 1$，且所有元素都不超过 $X$ 的严格上升子序列，当且仅当 $g[k] \le X$。

而因为严格上升子序列的最后一个元素是该子序列的最大值，所以只需限制其结尾不超过 $X$。而 `g` 数组是单调递增的，所以我们在 `g`  中二分最后一个不超过 $X$ 的位置，即可得到答案。

{% fold info @ABC393F %}
```cpp
struct Query {
    int r, x, idx;
} qs[maxn];

int ans[maxn];
int a[maxn];

void solve( ) {
    int n = read( ), q = read( );
    for( int i = 1; i <= n; ++ i ) a[i] = read( );
    
    for( int i = 1; i <= q; ++ i ) {
        qs[i].r = read( ), qs[i].x = read( );
        qs[i].idx = i;
    }

    sort( qs + 1, qs + q + 1, []( const Query &a, const Query &b ) {
        return a.r < b.r;
    } );

    vector<int> g;
    int cur = 1;
    for( int i = 1; i <= q; ++ i ) {
        auto [r, x, idx] = qs[i];
        for( int j = cur; j <= r; ++ j ) {
            int val = a[j];
            auto it = lower_bound( g.begin( ), g.end( ), val );
            if( it == g.end( ) ) g.push_back( val );
            else *it = val;
        }
        cur = r + 1;
        ans[idx] = upper_bound( g.begin( ), g.end( ), x ) - g.begin( );
    }
    
    for( int i = 1; i <= q; ++ i ) cout << ans[i] << '\n';
}
```
{% endfold %}

这题考察了 LIS 中 最小结尾数组 更本质的理解，也需要理解 离线操作 的意义。

至此，我们不仅可以从不同题面中提取 LIS，还可以根据答案要求，分别转化为最大保留、最大权值、前后缀拼接和带限制查询。接下来统一整理这两个方向。

## 三、抽象 & 统一模型

前面的题目可以从两个相互独立的方向理解：一条链怎样从原问题中产生，以及题目最终需要这条链的什么信息。

### 链怎样产生

| 问题变化 | 处理方式 | 代表题 |
|---|---|---|
| 原顺序与单调关系直接给出 | 直接单调子序列 | P1020 第一问 |
| 需要同时保持另一种顺序 | 用唯一位置编码 | P1439 |
| 对象具有两个维度 | 排序固定第一维 | ABC439E |
| 求最少链覆盖 | Dilworth 转最长反链 | P1020 第二问 |
| 连接关系隐藏在可达条件中 | 代数化并进行坐标变换 | ABC457G |

统一过程是：确定对象 $\to$ 显式化顺序 $\to$ 定义连接关系 $\to$ 判断严格性 $\to$ 最长链 / 链覆盖

### 题目需要链的什么信息

| 答案要求 | 处理方式 | 代表题 |
|---|---|---|
| 最长长度 | 最小结尾 | 基础 LIS |
| 最少修改 | 总数减去最大保留结构 | ABC006D |
| 最大权值 | 值域 DP 最大值 | DP Q Flowers |
| 指定元素能否参与最优方案 | 前后缀状态拼接 | ABC354F |
| 带前缀和值域限制的询问 | 离线扫描并查询 `g` | ABC393F |

建模成 *上升子序列* 并不意味着可以立刻调用最小结尾模板。还要继续检查题目究竟需要长度、权值、方案参与情况，还是带约束的查询。

相关导航：[[DPGuide|动态规划导览]] · [[LIS模型|LIS 模型]] · [[ABC457G Catch All Apples|ABC457G]]
