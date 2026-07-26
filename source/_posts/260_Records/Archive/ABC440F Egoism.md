---
title: '[Leaf] ABC440F Egoism'
tags:
  - 数据结构/树状数组
  - 算法/离散化
  - 策略/动态维护
categories:
  - 260_Records
  - Archive
abbrlink: 5021de5b
date: 2026-07-09 00:00:00
updated: 2026-07-09 00:00:00
---

# [ABC440 F - Egoism](https://atcoder.jp/contests/abc440/tasks/abc440_f)

## 1. 题意

有 $N$ 匹马，每匹马有两个属性：$A_i$：心情值；$B_i$：整洁度 $\{1, 2\}$。每天会修改一匹马的 $(A_i,B_i)$。

若洗澡顺序为 $p_1,p_2,\dots,p_N$，则第 $p_j$ 匹马的满意度为：若 $j=1$，贡献为 $A_{p_j}$；若 $j \ge 2$，贡献为 $A_{p_j}B_{p_{j-1}}$。

修改后，可以任意决定这 $N$ 匹马洗澡的顺序，要求输出最大可能的总满意度。

> $1 \le N,Q \le 2\times 10^5$，$1\le A_i,X_i\le 10^6$，$B_i,Y_i\in\{1,2\}$。

## 2. 思路

这是一个动态修改查询处理的问题，我们可以从总满意度入手拆解。

对于一个确定的排列 $p$，它的总满意度为 $\displaystyle A_{p_{1}} + \sum_{j=2}^{N} A_{p_{j}} B_{j-1}$。
由于 $B_{i}$ 只可能是 $1$ 或者 $2$，所以我们把每匹马本身的 $A_{i}$ 拿出来，然后再考虑额外增加的满意度：$\displaystyle \sum_{i=1}^{N} A_{i} + \sum_{j=2}^{N}[B_{p_{j}-1}=2] A_{P_{j}}$，不妨记 $\displaystyle S = \sum_{i=1}^{N} A_{i}$。

也就是说，每一匹 $B=2$ 的马如果不是最后一匹，就可以让它后面的马额外贡献一次 $A$。

那么现在问题就转化为，在这个排列 $p$ 中，我们要尽可能的让大的 $A$ 出现在  $B = 2$ 的马后面，从而得到额外的满意度。

设 $c_{1}$ 表示 $\mid B = 1 \mid$ 的数量，$c_{2}$ 表示 $\mid B = 2 \mid$ 的数量。

简单规划我们会发现一共存在三种情况，分类讨论。

第一种：$c_{2} = 0$，此时没有任何马能提供额外满意度，所以答案就是 $S$。

第二种：$c_{1} = 0$，所有马都是 $B = 2$，此时除了第一匹马以外，其他马都可以获得一次额外贡献，为了获取最大的收益，很容易想到把 $A$ 最小的马，因此答案为 $S + (S - \min(A))$。

第三种：$c_{1} > 0, c_{2} > 0$，由于存在 $B = 1$ 的马，我们可以构造出 $c_{2}$ 个额外满意度的排序方式，但是由于连续的这一段 $B = 2$ 的第一个一定得是 $B = 1$ 的马，所以这种情况下我们需要选择一个 $B =1$ 的最大的放在最后一个，然后选择 $c_{2} - 1$ 个 $B = 2$ 的马被加成。

所以我们现在只需要动态维护下面这些数据：

1. 当前所有 $A$ 的总和 $S$；
2. 当前所有 $A$ 的数量分布；
3. 当前所有 $A$ 的权值和；
4. 当前 $B=1$ 的马的 $A$ 最大值。

既然是动态维护数据，我们自然会往数据结构的方向思考，这里我使用两棵权值树状数组来维护：

一颗维护 `cntv`，维护每个权值出现了多少次，用于配合 `sumv` 查询第 $k$ 大。
一颗维护 `sumv`，维护每个权值的总和。

然后我们可以开一个 `multiset` 多重集来维护最大的 $B = 1$ 的马的下标。

接下来还需要支持查询当前集合中最大的 $k$ 个 $A$ 的和。

设当前集合大小为 `num`，总和为 `sum`，最大的 $k$ 个数中最小的那个，是整体中的第 $num-k+1$ 小。

这个可以使用树状数组的 `kth` 找到这个位置，记其真实值为 $v$。

所有大于等于 $v$ 的数都会被 `sumv` 前缀差统计出来，但如果 $v$ 出现多次，可能会多取若干个 $v$，因此减掉多余部分就行。

这样每次询问只需要：

1. 删除被修改马的旧状态；
2. 插入新状态；
3. 按上面的分类公式计算答案。

最终复杂度为 $\mathcal{O}((N+Q)\log(N+Q))$。

## 3. 代码部分

{% fold info @AcCode %}
```cpp
ll read( ) { /* 模板代码略 */}

// 树状数组
struct BIT { /* 模板代码略 */ } cntv, sumv;

// 离散化
struct Disc { /* 模板代码略 */ } disc;

int n, q;

int a[maxn], b[maxn];
int va[maxn];
int w[maxn], x[maxn], y[maxn];

multiset<int> B1;

ll tot = 0;

void modify( int idx, int tar, int opt ) {
    int val = disc.get_val( idx );

    tot += 1ll * val * opt;

    cntv.add( idx, opt );
    sumv.add( idx, 1ll * val * opt );

    if( tar == 1 ) {
        if( opt == 1 ) B1.insert( idx );
        else B1.erase( B1.find( idx ) );
    }
}

ll Sum( ll k ) {
    if( k <= 0 ) return 0;

    ll num = cntv.ask( cntv.sz );
    ll sum = sumv.ask( sumv.sz );

    if( k >= num ) return sum;

    int idx = cntv.kth( num - k + 1 );
    ll val = disc.get_val( idx );

    ll num1 = num - cntv.ask( idx - 1 );
    ll sum1 = sum - sumv.ask( idx - 1 );

    return sum1 - ( num1 - k ) * val;
}

ll calc( ) {
    ll c1 = B1.size( );
    ll c2 = n - c1;

    if( c2 == 0 ) return tot;

    if( c1 == 0 ) {
        int mn = cntv.kth( 1 );
        return tot + tot - disc.get_val( mn );
    }

    int mxidx = *B1.rbegin( );
    int mxval = disc.get_val( mxidx );

    cntv.add( mxidx, -1 );
    sumv.add( mxidx, -mxval );

    ll extra = mxval + Sum( c2 - 1 );

    cntv.add( mxidx, 1 );
    sumv.add( mxidx, mxval );

    return tot + extra;
}

void solve( ) {
    n = read( ), q = read( );

    disc.clear( );

    for( int i = 1; i <= n; ++ i ) {
        va[i] = read( ), b[i] = read( );
        disc.add( va[i] );
    }

    for( int i = 1; i <= q; ++ i ) {
        w[i] = read( ), x[i] = read( ), y[i] = read( );
        disc.add( x[i] );
    }

    disc.init( );

    int m = disc.size( );

    cntv.init( m );
    sumv.init( m );

    for( int i = 1; i <= n; ++ i ) {
        a[i] = disc.get_idx( va[i] );
        modify( a[i], b[i], 1 );
    }

    for( int i = 1; i <= q; ++ i ) {
        int idx = w[i];

        modify( a[idx], b[idx], -1 );

        a[idx] = disc.get_idx( x[i] );
        b[idx] = y[i];

        modify( a[idx], b[idx], 1 );

        cout << calc( ) << '\n';
    }
}
```
{% endfold %}

## 4. 复盘

- **复杂度分析**：离散化复杂度为 $\mathcal{O}((N+Q)\log(N+Q))$，每次修改和查询需要若干次树状数组操作，总复杂度为 $\mathcal{O}((N+Q)\log(N+Q))$。

- **关键转化**：把原排列最大化问题转化为“哪些马能吃到 $B=2$ 带来的额外一份 $A$”，然后动态维护最大的若干个 $A$ 的和。

- **关联笔记**：[[树状数组]] | [[离散化]] | [[动态维护]] | [[贪心]]