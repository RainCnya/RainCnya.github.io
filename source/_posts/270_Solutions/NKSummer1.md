---
title: "[Solution] NKSummer1"
status: reviewed
categories:
  - 270_Solutions
abbrlink: 3c8bbb2b
date: 2026-07-17 00:00:00
updated: 2026-07-17 00:00:00
---

# [Solution] NKSummer1

## 一、比赛概况

- **时间**：2026.7.17 12:00 - 17:00
- **结果**：4 / 13 | Rk.463
- **做题顺序**：AEFG
- **主要时间损耗**：解题

## 二、简要记录

### [A-2090 Virus](https://ac.nowcoder.com/acm/contest/133876/A)

这是道签到题，交给学长秒了。

### [E-Permutation Evaluation](https://ac.nowcoder.com/acm/contest/133876/E)

也是道签到题，推了一下公式就秒了，我写的。

### [F-Permutation Generation](https://ac.nowcoder.com/acm/contest/133876/F)

E 的扩展题。

题意梗概：给定一个排列 $A$，定义排列的值为 $\displaystyle f(A) = \sum_{i=0}^{n-1}(2i-(n-1))a_{i}$。

固定第 $k$ 个元素为 $x$，问能否构造出一个排列 $A'$ 使得 $a_{k}'=x$ 且 $f(A') \equiv f(A) \pmod{n}$。

由于 $A$ 和 $A'$ 都是 $0 \sim n-1$ 的排列，因此 $\displaystyle \sum_{i=0}^{n-1} a_{i} = \sum_{i=0}^{n-1} a_{i}' = \frac{n(n-1)}{2}$。所以 $f(A) \equiv f(A') \pmod{n}$ 等价于 $\displaystyle \sum_{i=0}^{n-1}(2i \cdot a_{i}) \equiv \sum_{i=0}^{n-1}(2i \cdot a_{i}')$。

赛场上我的推导就止步于此了，下面展开赛后的细节：令 $\displaystyle S(A) = \sum_{i=0}^{n-1}2ia_{i}$，假设 $a_{t} = x$，我们现在需要把 $x$ 从 $t$ 移动到 $k$，于是令 $d = (t-k+n) \pmod{n}$，并构造 $a_{i}' = a_{i+d \pmod{n}}$，显然 $a_{k}' = a_{t} = x$，对于原来位于 $j$ 的元素 $a_{j}$，循环左移 $d$ 位后，它的新位置 $i$ 满足 $i \equiv j - d \pmod{n}$，代入原式可以得到：

$$
\begin{aligned}
S(A') &= \sum_{i=0}^{n-1}(2i \cdot a_{i}') \\
&= \sum_{i=0}^{n-1}(2(j-d)a_{i}') \pmod{n} \\
&= S(A) - 2d \sum_{j=0}^{n-1}a_{j} \\
&= S(A) - dn(n-1)
\equiv S(A) \pmod{n}
\end{aligned}
$$

所以我们发现循环左移任意位置答案都是成立的。

> 这一点其实我打表找规律看出来了，但是没仔细想，想到别的方面去了。

下面展示我们赛事的另一个思路：

```cpp
int d = x - a[k];
for (int i = 0; i < n; i++) {
    a[i] = (a[i] % n + d + n) % n;
}
```

先猜后验，现在是赛后，我来重新证明一下这个柿子的正确性。

令 $d = (x - a_{k} + n) \bmod{n}$，$a_{i}' = (a_{i} + d) \bmod{n}$，首先 $a_{k}' = (a_{k} + d) \bmod{n} = x$，其次，映射 $v \mapsto (v + d) \bmod{n}$ 是 $0,1,\dots,n-1$ 上的双射，所以 $A'$ 仍然是个排列。

对于任意 $i < j$，有 $a_{j}' - a_{i}' \equiv (a_{j} + d) - (a_{i} + d) \equiv a_{j} - a_{i} \pmod{n}$，于是：

$$
\begin{aligned}  
f(A') &= \sum_{0\le i<j<n}(a'_j-a'_i) \\
&\equiv \sum_{0\le i<j<n}(a_j-a_i) \\
&= f(A) \pmod n
\end{aligned}
$$
因此构造成立，不存在不可能构造的情况。

#### 卡点

$\sum 2ia_i\equiv\sum 2ia'_i\pmod n$ 我得到这个式子后卡住，原因如下：我此时仍然把 $A'$ 当做是一个任意排列，所以我在尝试求解一个自由度很高的同余方程。

所以正确的思路应该是：通过寻找一种对排列进行整体变换的操作，使它天然保持 $f$ 的模 $n$ 值，同时把指定元素送到对应的位置。

而这题恰好有这两种整体操作：

1. 循环移动位置：把值为 $x$ 的元素移动到位置 $k$ 上。
2. 循环平动数值：把位置 $k$ 上的元素变成 $x$。

前者改变位置，不改变元素的值；后者改变值，但不改变元素的位置，而它们都保持 $f(A) \bmod n$。

### [G-Precision Error?!](https://ac.nowcoder.com/acm/contest/133876/G)

题意梗概：给定一个 $n$，构造一个三维点集，最多 $2n + 2$ 个点，要求满足每个点都有 $n$ 个点和它的距离为 $dis(i,j) = 1$，$dis$ 表示欧几里得距离。

为了容忍误差，设 $\epsilon = 0.01$，要求任意两点之间距离 $dis(i,j) > \epsilon$，且对于每个 $i$ 都有 $n$ 个 $j$ 满足 $1 - \epsilon < dis(i,j) < 1 + \epsilon$。

下面是我真实的思路；首先 $n = 1$ 可以考虑构造一条直线，$n = 2$ 可以构造一个三角形，$n = 3$ 可以构造一个正四面体，$n = 4$ 可以构造一个正八面体，$n = 5$ 可以构造一个正二十面体。

这些构造都在寻找精确的正多面体或单位距离图，虽然能解释小规模情况，却没有显然的方式推广到 $n = 100$。于是我陷入了沉思，好像跟正四面体关系很紧密啊，难道就是不断地迭代构造无数个正四面体？我开始疑惑了。

接着，我注意到这个 “容忍误差”，以及这个题目 “精度误差？！”，十分有九分地怀疑，难道要利用这个误差来写吗？假设我构造两条线，一条 $x = 0, z = 0$，一条 $x = 0, z = 1$ 呢？我能否借助这个误差，使得两条线中无数个点之间的距离符合要求呢？

OK，于是我们写了第一版程序 WA 了，原因是我们忽略了第一个条件 “任意两点之间距离 $> \epsilon$”。那么密集的在一条线上赛无数个点的方法就失效了，于是，大胆的猜想，我们在一个二维平面上塞下 $n$ 个点，经过一阵计算，我们发现刚刚好，因为 $n \le 100$，所以非常合适。

#### 代码

```cpp title:"G" fold
const double eps = 0.01;
const double d = eps + 1e-8;

void solve( ) {
    int n = read( );
    cout << fixed << setprecision( 9 );
    cout << n * 2 << '\n';

    for( int i = 0; i < n; ++ i ) {
        double x = (i % 10) * d;
        double y = (i / 10) * d;
        cout << x << ' ' << y << ' ' << 0.0 << '\n';
    }

    for( int i = 0; i < n; ++ i ) {
        double x = (i % 10) * d;
        double y = (i / 10) * d;
        cout << x << ' ' << y << ' ' << 1.0 << '\n';
    }
}
```

## 三、补题记录

### [C-Fish Eating](https://ac.nowcoder.com/acm/contest/133876/C)

这是道挺有意思的题目。

题意梗概：强制在线，给定一个 $n \times m$ 的网格，每次可以进行两种操作。

> 注1：能吃周围四格不小于它大小的鱼。
> 注2：吃掉一条鱼，大小增加 $1$。
> 注3：每次放进来的新鱼 $v$ 不小于之前放进来的所有鱼的大小。

1. 在 $(x, y)$ 初放一条大小为 $v$ 的鱼，问这条鱼最多能吃几条鱼？
2. 问如果要让 $(x,y)$ 这条鱼吃掉所有能吃的鱼，最少需要提升多少大小?

数据规模：$n \times m \le 2e5, q \le 5e5$。

#### 思路

首先我写了一个类似暴力搜索的做法，也注意到这题可能跟连通块有关。对于操作二，我尝试直接用并查集维护连通块，并记录连通块内最大的鱼，再用最大值和当前鱼大小的差作为答案。

但这样显然有问题。鱼在遇到那条最大的鱼之前，可能已经吃掉了许多更小的鱼，自身大小也会不断增加。因此，答案并不是简单的 $\max(a_{i}) - a_{x}$。

而且，重复的搜索也导致复杂度非常高，我大概知道要维护一个 “障碍的大小 $-$ 到达障碍前的成长部分”。

而普通并查集只能维护当前有哪些点连在一起，没法直接维护“这个连通块是怎样一步步形成的”，所以我当时没找到合适的数据结构继续处理，最后止步于此。

> 题解里提到了 Kruskal 重构树。我赛场上虽然想到了并查集，却没有继续往“保留连通块合并历史”这个方向想。

#### 赛后回顾

这题最关键的条件其实是：新加入的鱼大小单调不减。

假设当前加入一条大小为 $v$ 的鱼，那么此前加入的所有鱼大小都不超过 $v$。因此，只要旧鱼与它连通，它就一定能把整个旧连通块吃完。吃鱼以后大小还会继续增加，所以中途不会卡住。

于是操作一就显然易见了，$ans =$ 新连通块大小 $-1$。接着我们重点考虑如何保留连通块的合并历史，每次加入一条新鱼 $u$ 时，把它相邻的所有旧连通块都挂到 $u$ 下面，并强制令 $u$ 为新的根。

这样，每次加入新的鱼都会把若干棵旧树合并起来，最终形成一棵 “并查集合并树”。这里我们维护两个信息： `siz[u]` 表示以 $u$ 为根的子树有多少条鱼，`val[u]` 表示从 $u$ 这棵子树吃到父亲，最开始的大小至少为多少。

假设旧连通块根为 $rt$，现在把它放到新的鱼 $u$ 下，如果它的原始大小为 $S$，那么在它尝试吃掉 $u$ 以前，可以完整吃掉整颗 $rt$ 的子树，先增长 $siz[rt] - 1$ 个大小，此时为了吃掉父亲 $u$，需要满足 $S + siz[rt] - 1 \ge a_{u}$。

所以 $S \ge a_{u} - siz[rt] + 1$，于是可以令 $val[rt] = a_{u} - siz[rt] + 1$，这就是从 $rt$ 向父亲继续吃的最低初始大小。如果一直吃，吃到祖先位置呢？那就是要维护这一段距离中的所有 `val` 的最大值。 

所以操作二的答案就是：$\max(0, \max(val) - a_{x})$。

由于我们只需要查询 “某个节点到当前根” 的路径最大值，因此可以直接在并查集路径压缩时维护。

原本 `val[u]` 表示从 $u$ 到父亲这一条边的门槛：路径压缩后，就让它表示从 $u$ 到新父亲这一整段路径上的最大门槛。

```cpp
val[u] = max(val[u], val[fa[u]]);
fa[u] = find(fa[u]);
```

经典 Kruskal 重构树通常是按边权从小到大合并连通块，并用新节点记录一次合并。

这道题则是按鱼的大小依次加入节点，再由新加入的鱼把若干旧连通块合并起来。

> 普通并查集只保存当前连通关系；重构树保留连通块形成的历史。

这里的查询恰好依赖这段历史，所以只维护普通连通块是不够的。

#### 代码

```cpp title:"C" fold
ll a[maxn], val[maxn];
int fa[maxn], siz[maxn];

int find( int x ) {
    if( fa[x] == x ) return fa[x];
    int pre = fa[x];
    int rt = find( pre );
    val[x] = max( val[x], val[pre] );
    return fa[x] = rt;
}

// rt -- v -> u
void merge( int rt, int u, ll v ) {
    fa[rt] = u;
    val[rt] = v - siz[rt] + 1;
    siz[u] += siz[rt];
}

int dx[4] = {0, 1, 0, -1};
int dy[4] = {1, 0, -1, 0};

void solve( ) {
    int n = read( ), m = read( ), q = read( );

    for( int i = 1; i <= n * m; ++ i ) {
        fa[i] = i;
        siz[i] = val[i] = 0;
    }
    
    auto calc = [&]( int x, int y ) {
        return (x - 1) * m + y;
    };

    int l = 0;
    for( int i = 1; i <= q; ++ i ) {
        int opt = read( ), x = read( ) ^ l, y = read( ) ^ l;

        int u = calc( x, y );

        if( opt == 1 ) {
            ll v = read( );
            fa[u] = u, siz[u] = 1;
            a[u] = v, val[u] = 0;
            
            vector<int> tmp;
            for( int dir = 0; dir < 4; ++ dir ) {
                int nx = x + dx[dir], ny = y + dy[dir];
                if( nx < 1 || nx > n || ny < 1 || ny > m ) continue;
                int nxt = calc( nx, ny );
                if( a[nxt] == 0 ) continue;
                tmp.push_back( find( nxt ) );
            }
            sort( tmp.begin( ), tmp.end( ) );
            tmp.erase( unique( tmp.begin( ), tmp.end( ) ), tmp.end( ) );
            
            for( int rt : tmp ) merge( rt, u, v );
            l = siz[u] - 1;
            cout << l << '\n';
        }
        else {
            find( u );
            l = max( 0ll, val[u] - a[u] );
            cout << l << '\n';
        }
    }
}
```


### [J-Show Hand](https://ac.nowcoder.com/acm/contest/133876/J)

惊天大模拟，写死了……其实不难。

题意：双方各有四张明牌。法国赌神先从未出现的牌中选择一张作为暗牌；在知道他的选择以后，我再从剩余牌中选择一张作为暗牌。

问双方谁拥有必胜策略；如果任何一方都不能保证获胜，则输出平局。

#### 思路

理论上对方有 44 种牌可以选，我在他选择后有 43 种可以选，那么其实可以直接对 $44 \times 43$ 种情况进行枚举。

设对方选的牌为 $i$，我选的为 $j$，若存在一行 $val[i]$ 全是我输，那么对方就有必胜的变法。若所有的 $val[i]$ 种都存在一个我能胜利的方案，那么我有必胜的变法。其他情况就是平局。

#### 代码

```cpp title:"J" fold
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ull = unsigned long long;
using i128 = __int128_t;
using pii = pair<int, int>;
using pll = pair<ll, ll>;

const int maxn = 3e5 + 5;
const int mod = 998244353;
const ll inf = 4e18;

map<char, int> ranks, suits;

int getid( string s ) {
    int rank = ranks[s[0]];
    int suit = suits[s[1]];
    return suit * 13 + rank - 2;
}

bool vis[55];

struct Hand {
    int type;
    int val[5];
};

/*
0：Highcard
1：Pair
2：Two pairs
3：Three of a kind
4：Straight
5：Flush
6：Full house
7：Four of a kind
8：Straight flush
*/

Hand calc( vector<int> a ) {
    int cnt[15] = { };
    int suitcnt[4] = { };
    for( int id : a ) {
        int rank = id % 13 + 2;
        int suit = id / 13;
        cnt[rank] ++;
        suitcnt[suit] ++;
    }
    bool flush = 0;
    for( int i = 0; i < 4; ++ i ) {
        if( suitcnt[i] == 5 ) flush = 1;
    }

    int straight = 0;
    vector<int> dif;
    for( int i = 2; i <= 14; ++ i ) {
        if( cnt[i] ) dif.push_back( i );
    }

    if( dif.size( ) == 5 ) {
        bool ok = 1;
        for( int i = 1; i < 5; ++ i ) {
            if( dif[i] != dif[i-1] + 1 ) ok = 0;
        }
        if( ok ) straight = dif.back( );
        if( dif[0] == 2 && dif[1] == 3 && dif[2] == 4 && dif[3] == 5 && dif[4] == 14 ) straight = 5;
    }

    // 同花顺
    if( flush && straight ) return { 8, { straight } };

    int four = 0, three = 0;
    vector<int> pair;

    for( int i = 14; i >= 2; -- i ) {
        if( cnt[i] == 4 ) four = i;
        else if( cnt[i] == 3 ) three = i;
        else if( cnt[i] == 2 ) pair.push_back( i );
    }

    // 四条
    if( four ) {
        int single = 0;
        for( int i = 14; i >= 2; -- i ) {
            if( cnt[i] == 1 ) single = i;
        }
        return { 7, { four, single } };
    }

    // 葫芦
    if( three && pair.size( ) == 1 ) {
        return { 6, { three, pair[0] } };
    }

    // 同花
    if( flush ) {
        Hand res = { 5, { } };
        int pos = 0;
        for( int i = 14; i >= 2; -- i ) {
            for( int j = 0; j < cnt[i]; ++ j ) {
                res.val[pos ++] = i;
            }
        }
        return res;
    }

    // 顺子
    if( straight ) return { 4, { straight } };

    // 三条
    if( three ) {
        Hand res = { 3, { } };
        res.val[0] = three;
        int pos = 1;
        for( int i = 14; i >= 2; -- i ) {
            if( cnt[i] == 1 ) res.val[pos ++] = i;
        }
        return res;
    }

    // 两对
    if( pair.size( ) == 2 ) {
        int single = 0;
        for( int i = 14; i >= 2; -- i ) {
            if( cnt[i] == 1 ) single = i;
        }
        return { 2, { pair[0], pair[1], single } };
    }

    // 一对
    if( pair.size( ) == 1 ) {
        Hand res = { 1, { } };
        res.val[0] = pair[0];
        int pos = 1;
        for( int i = 14; i >= 2; -- i ) {
            if( cnt[i] == 1 ) res.val[pos ++] = i;
        }
        return res;
    }

    // 高牌
    Hand res = { 0, { } };
    int pos = 0;
    for( int i = 14; i >= 2; -- i ) {
        if( cnt[i] == 1 ) res.val[pos ++] = i;
    }
    return res;
}

int check( const Hand &a, const Hand &b ) {
    if( a.type != b.type ) return a.type > b.type ? 1 : -1;
    for( int i = 0; i < 5; ++ i ) {
        if( a.val[i] != b.val[i] ) return a.val[i] > b.val[i] ? 1 : -1;
    }
    return 0;
}

void solve( ) {
    memset( vis, 0, sizeof vis );
    string s;
    vector<int> c, p;
    for( int i = 0; i < 4; ++ i ) {
        cin >> s;
        int id = getid( s );
        vis[id] = 1;
        c.push_back( id );
    }
    for( int i = 0; i < 4; ++ i ) {
        cin >> s;
        int id = getid( s );
        vis[id] = 1;
        p.push_back( id );
    }

    vector<int> rem;
    for( int i = 0; i < 52; ++ i ) {
        if( !vis[i] ) rem.push_back( i );
    }

    Hand handc[52];
    Hand handp[52];

    for( int x : rem ) {
        vector<int> nc = c;
        vector<int> np = p;
        nc.push_back( x );
        np.push_back( x );
        handc[x] = calc( nc );
        handp[x] = calc( np );
    }

    // 法国赢: 存在一个 x, 使得所有 y 都能获胜
    // 我赢：所有 x，都存在一个 y 能获胜

    int cnt = 0; // 我赢的次数
    int all = rem.size( );
    for( int x : rem ) {
        int winc = 0, winp = 0, draw = 0; // x 我，y 法国，z 平局，
        for( int y : rem ) {
            if( x == y ) continue;
            int res = check( handc[y], handp[x] );
            if( res == 1 ) winc ++;
            if( res == 0 ) draw ++;
            if( res == -1 ) winp ++;
        }

        if( winp == all - 1 ) { // 法国赢
            cout << "GeiWoCaPiXie" << '\n';
            return ;
        }
        if( winc > 0 ) cnt ++;
    }
    if( cnt == all ) cout << "WoYaoYanPai" << '\n';
    else cout << "PaiMeiYouWenTi" << '\n';
}

int main( ) {
    ranks['2'] = 2; ranks['3'] = 3; ranks['4'] = 4; ranks['5'] = 5;
    ranks['6'] = 6; ranks['7'] = 7; ranks['8'] = 8; ranks['9'] = 9;
    ranks['T'] = 10; ranks['J'] = 11; ranks['Q'] = 12; ranks['K'] = 13; ranks['A'] = 14;
    suits['S'] = 0; suits['H'] = 1; suits['D'] = 2; suits['C'] = 3;
    int _t = 1;
    cin >> _t;
    while( _t -- ) solve( );
    return 0;
}
```

### [L-Substrings of Substrings](https://ac.nowcoder.com/acm/contest/133876/L)

题意梗概：给定一个字符串 $S$，以及对应的权值序列 $a_{1}, a_{2}, \dots, a_{n}$。

有 $q$ 次查询，每次给一个字符串 $t$，若 $t$ 是 $S[l \dots r]$ 的子串，则称区间 $[l,r]$ 是好区间。每次询问求所有好区间权值和的最大值，以及所有的好区间权值之和。

数据规模：$n \le 1e5, \sum |t| \le 3e5$。

本题我在赛场上看到了，并且想过了，但是我的直觉告诉我可能是 AC自动机 + 线段树处理。水平不够，就没尝试写了。

#### 思路

首先，这是一个多模式串在同一个主串中做匹配，所以会想到 [[AC自动机]] 来处理这个匹配，然后这题的问题其实分为两个步骤：

1. 得到每个询问串在 $s$ 中的所有出现的位置。
2. 已知这些出现位置后，如何统计好区间的最大值和总和。

#### Part 1 位置查询

首先把所有的询问串插入 AC 自动机。

对于第 $id$ 个询问串，记录 `ed[id]`表示该询问串对应的 Trie 终点节点。

对于每个 Trie 节点 $u$，记录 `len[u]`。若节点 $u$ 是某个询问串的终点，则 `len[u]` 记为该询问串的长度；否则 `len[u] = 0`。因此，`len[u]` 同时承担了模式串终点标记的作用。

> 注：相同的询问串会落在同一个 Trie 终点，因此可以直接以终点节点作为字符串的唯一标识，重复询问共用同一份答案。

接下来的问题是 “当 AC 自动机扫描主串时，如何枚举当前位置匹配的所有询问串？”。

最朴素的想法是沿着 `fail` 链枚举，但这样会经过大量不是模式串终点的节点，产生许多冗余跳转。为了解决这个问题，我们额外维护一个 `up` 数组，使其直接跳转到最近的模式串终点，它的转移如下：

```cpp
if( len[fail[u]] ) up[u] = fail[u];
else up[u] = up[fail[u]];
```

也就是说，若 `fail[u]` 是某个模式串的终点，则令 `up[u] = fail[u]`；否则继续跳到 `fail[u]` 最近的终点祖先。

不过，`up` 只能跳过非终点节点，实际匹配次数仍可能很多。朴素估计下，总匹配次数似乎可能达到 $\mathcal O(nq)$，因此还需要结合 $\sum |t|$ 的限制进一步分析。

对于固定长度 $l$，主串的每个起点至多对应一个长度为 $l$ 的询问串，因此所有长度为 $l$ 的不同询问串，其出现次数之和不超过 $n$。

设询问串共有 $d$ 种不同长度，总长度为 $T = \sum |t|$，则：$1 + 2 + \dots + d \le T$

所以：$d = \mathcal{O}(\sqrt{T})$，每种长度的总匹配次数为 $\mathcal O(n)$，不同长度只有 $\mathcal O(\sqrt T)$ 种，所以所有询问串的总出现次数为：$\mathcal{O}(n \sqrt{T})$。

沿着 `up`链的每次跳转都对应一次真实的匹配，所以位置查询部分的复杂度为：$\mathcal{O}\left( T \mid \Sigma \mid + n \sqrt{T} \right)$。

#### Part 2 好区间统计

假设我们在 Part 1 中找到了某个询问串在主串中的所有出现起点：：$p_{1} < p_{2} < \dots < p_{k}$。

设询问串长度为 $m$，第 $i$ 次出现覆盖区间：$[p_{i}, p_{i} + m - 1]$。为了快速计算区间和，我们可以对原数组求一次前缀和。

我们先解决 最大的好区间权值和，若好区间包含从 $p$ 开始一次出现，则必须满足 $l \le p, r \ge p + m - 1$，因此最大的权值和应该为 $\displaystyle \max_{r \ge p + m - 1}P_{r+1} - \min_{i \le p}P_{l}$。

对前缀和数组 $P$ 预处理前缀最小值和后缀最大值，那么一次出现位置 $p$ 对应的候选答案就是：$\displaystyle sufmax[p+m] - premin[p]$。枚举所有出现位置取最大值即可。

接着我们考虑第二问，所有好区间权值之和，这一问的难点在于如何避免同一个好区间被多个重复出现统计。

对于任意一个好区间 $[l,r]$，取满足 $p_i\ge l$ 的第一次出现。此时有：$p_{i-1} < l \le p_{i}$，并且 $p_{i} + m - 1 \le r$。

因此，可以将第 $i$ 次出现负责的区间划分为：$l \in [lst + 1, p], r \in [p + m - 1, n - 1]$。设当期出现起点为 $p$，上一次出现起点为 $lst$，那么左右端点的可选数量分别为：$cnt_{L} = p - lst$， $cnt_{R} - n - (p - m + 1)$。当前部分的权值和为：

$$
\begin{aligned}
\sum_{l=lst+1}^{p} \sum_{r=p+m-1}^{n-1} (P_{r+1} - P_{l}) \\
cnt_{L} \sum_{x=p+m}^{n} P_{x} - cnt_{R} \sum_{x=lst+1}^{p}  P_{x}
\end{aligned}
$$

瓶颈在于需要多次查询前缀和数组 $P$ 的区间和，因此再对 $P$ 求一次前缀和。这样就可以在 $\mathcal O(1)$ 时间内计算每次出现的贡献。枚举所有出现位置后，即可得到所有好区间的权值之和。

至此，这道题的两个部分均已解决。

#### 代码

```cpp title:"L" fold
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ull = unsigned long long;
using i128 = __int128_t;

const int maxn = 3e5 + 5;
const int sigma = 26;
const int mod = 998244353;
const ll inf = 4e18;

ll read( ) {
    ll x = 0, f = 1;
    char ch = getchar( );
    for( ; !isdigit( ch ); ch = getchar( ) ) if( ch == '-' ) f = -1;
    for( ; isdigit( ch ); ch = getchar( ) ) x = x * 10 + ch - '0';
    return x * f;
}

struct ACAM {
/* ============================== */
int nxt[maxn][sigma], fail[maxn];
int up[maxn], ed[maxn], len[maxn];
int tot;

int getid( char ch ) { return ch - 'a'; }

void init( ) {
    for( int i = 0; i <= tot; ++ i ) {
        for( int c = 0; c < sigma; ++ c ) {
            nxt[i][c] = 0;
        }
        fail[i] = 0;
        up[i] = 0;
        len[i] = 0;
    }
    tot = 0;
}

void insert( string s, int id ) {
    int u = 0;
    for( char ch : s ) {
        int v = getid( ch );
        if( !nxt[u][v] ) nxt[u][v] = ++ tot;
        u = nxt[u][v];
    }
    ed[id] = u;
    len[u] = s.size( );
}

void build( ) {
    queue<int> q;
    for( int c = 0; c < sigma; ++ c ) {
        int v = nxt[0][c];
        if( v ) {
            fail[v] = 0;
            q.push( v );
        }
    }
    while( !q.empty( ) ) {
        int u = q.front( );
        q.pop( );
        if( len[fail[u]] ) up[u] = fail[u];
        else up[u] = up[fail[u]];
        for( int c = 0; c < sigma; ++ c ) {
            int v = nxt[u][c];
            if( v ) {
                fail[v] = nxt[fail[u]][c];
                q.push( v );
            }
            else nxt[u][c] = nxt[fail[u]][c];
        }
    }
}
/* ============================== */
} acam;

ll a[maxn], sum1[maxn], sum2[maxn];
ll premin[maxn], sufmax[maxn];

vector<int> pos[maxn];

bool vis[maxn];
ll ansmax[maxn], anssum[maxn];

ll ask( int l, int r ) {
    if( l > r ) return 0;
    ll res = sum2[r];
    if( l ) res -= sum2[l - 1];
    if( res < 0 ) res += mod;
    return res;
}

void solve( ) {
    int n = read( ), q = read( );
    string s;
    cin >> s;
    for( int i = 1; i <= n; ++ i ) {
        a[i] = read( );
        sum1[i] = sum1[i-1] + a[i];
    }

    premin[0] = sum1[0];
    for( int i = 1; i <= n; ++ i ) {
        premin[i] = min( premin[i-1], sum1[i] );
    }

    sufmax[n] = sum1[n];
    for( int i = n - 1; i >= 0; -- i ) {
        sufmax[i] = max( sufmax[i+1], sum1[i] );
    }

    for( int i = 1; i <= n; ++ i ) {
        sum2[i] = ( sum2[i-1] + sum1[i] ) % mod;
        if( sum2[i] < 0 ) sum2[i] += mod;
    }

    acam.init( );
    for( int i = 1; i <= q; ++ i ) {
        string t;
        cin >> t;
        acam.insert( t, i );
    }
    acam.build( );

    int u = 0;
    for( int i = 0; i < n; ++ i ) {
        u = acam.nxt[u][s[i] - 'a'];
        for( int v = u; v; v = acam.up[v] ) {
            if( acam.len[v] ) pos[v].push_back( i - acam.len[v] + 1 );
        }
    }

    for( int i = 1; i <= q; ++ i ) {
        int u = acam.ed[i];
        if( vis[u] ) {
            cout << ansmax[u] << " " << anssum[u] << '\n';
            continue;
        }
        int m = acam.len[u];
        ll mx = -inf;
        for( int p : pos[u] ) {
            mx = max( mx, sufmax[p + m] - premin[p] );
        }

        ll sum = 0;
        int lst = -1;
        for( int p : pos[u] ) {
            ll cntl = p - lst;
            ll cntr = n - p - m + 1;
            ll sumr = ask( p + m, n );
            ll suml = ask( lst + 1, p );
            sum = ( sum + cntl % mod * sumr % mod ) % mod;
            sum = ( sum - cntr % mod * suml % mod + mod ) % mod;
            lst = p;
        }
        vis[u] = 1;
        ansmax[u] = mx;
        anssum[u] = sum;
        cout << mx << " " << sum << '\n';
    }

}

int main( ) {
    solve( );
    return 0;
}
```

相关导航：[[AlgorithmGuide|算法与竞赛]] · [[NKSummer2|牛客暑期多校 2]] · [[HomePage|首页]]
