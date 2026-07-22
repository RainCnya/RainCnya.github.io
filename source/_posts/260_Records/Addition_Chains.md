---
title: Addition Chains
tags:
  - algorithm/记录
  - 搜索
status: solved
categories:
  - 260_Records
abbrlink: 767ccc92
date: 2026-07-16 00:00:00
---

# Addition Chains

> [!question] [6136:Addition Chains](https://www.tzcoder.cn/acmhome/problemdetail.do?method=showdetail&id=6136)
> 从 $1$ 开始构造一个严格递增序列，每个新数都必须由序列中此前出现的两个数相加得到，要求最后得到 $n$，并使序列长度最短。
>
> 数据规模：$1 \le n \le 100$，多组数据，以 $0$ 结束。

## 问题抽象

从初始状态 $[1]$ 出发，每次选择当前序列中的两个数 $a_i,a_j$，将 $a_i+a_j$ 加入序列末尾，并保持序列严格递增。求第一次到达 $n$ 所需的最少操作数，并输出任意一条最短路径。

我最初的思路是按照 $n$ 的二进制表示构造，先不断翻倍，然后再考虑不足的位置补充。

比如 `15 : 1 2 4 8 12 14 15`，但是发现还有更短的加法链 `15 : 1 2 3 5 10 15`。

这就很糟糕了，没法直接通过构造来找到答案，观察数据规模后决定采用搜索，首先既然是最短路径，那么显然应该是使用 BFS 来实现。

但是，由于队列中每个状态都必须保存整条历史链，否则没法转移，所以空间消耗很大，这个做法不太行。于是我想到了 DFS 的回溯性质，如果接着回溯的栈，好像就可以避免过大的空间开销了。

可是原始的 DFS 复杂度有限，我们可以考虑使用迭代加深 DFS，从小到大枚举允许的最大深度，这是一种结合了 BFS 和 DFS 的做法吧。

### 可行性剪枝

当前最大值为 $a_{dep}$，还剩 $lim-dep$ 次操作。

因为每一步能够取得的最大增长是将当前最大值翻倍，因此最终至多可以达到：$a_{dep}\cdot 2^{lim-dep}$；若 $a_{dep}\cdot 2^{lim-dep}<n$，那么即使之后每一步都翻倍，也无法到达目标，可以直接回溯。

这种通过对当前状态是否能抵达目标的判断剪枝，称之为可行性剪枝。

除此以外常见的还有 [[最优性剪枝]] | [[重复状态剪枝]] 等。

### 搜索顺序与局部去重

这里我们选择倒序枚举元素，使较大的和优先被搜索，从而更容易尽快接近 $n$。

同一个状态中，不同的数对可能产生相同的新数。例如：$1+4=2+3=5$，它们生成的子状态完全相同，因此每个 DFS 节点内部使用局部 `vis` 对新数去重，这也是一种剪枝。

## 实现

```cpp title:"代码" fold
int n;
int a[maxn];

bool dfs( int dep, int lim ) {
    if( dep == lim ) return a[dep] == n;

    // 即使剩余每一步都翻倍，也无法到达 n
    if( 1ll * a[dep] * ( 1ll << ( lim - dep ) ) < n ) {
        return 0;
    }

    // 只对当前搜索节点生成的下一步去重
    bool vis[maxn] = { 0 };

    for( int i = dep; i >= 1; -- i ) {
        for( int j = i; j >= 1; -- j ) {
            int x = a[i] + a[j];
            if( x <= a[dep] || x > n || vis[x] ) continue;
            vis[x] = 1;
            a[dep + 1] = x;
            if( dfs( dep + 1, lim ) ) return 1;
        }
    }
    return 0;
}

void solve( ) {
    while( scanf( "%d", &n ) != EOF && n ) {
        a[1] = 1;
        for( int lim = 1; ; ++ lim ) {
            if( !dfs( 1, lim ) ) continue;
            for( int i = 1; i <= lim; ++ i ) {
                if( i != 1 ) cout << ' ';
                cout << a[i];
            }
            cout << '\n';
            break;
        }
    }
}
```

## 复盘

1. 迭代加深 DFS 本质上是用 DFS 的空间逐层模拟 BFS。

2. 搜索的某些剪枝方案。

3. 搜索状态必须保留所有会影响未来决策的信息。 

相关内容：[[迭代加深DFS]] | [[搜索的状态设计与剪枝]]
