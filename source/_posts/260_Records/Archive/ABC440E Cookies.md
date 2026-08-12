---
title: 'ABC440E Cookies'
tags:
  - 策略/贪心
  - 搜索/堆优化
categories:
  - 260_Records
  - Archive
abbrlink: 2288891e
date: 2026-07-06 00:00:00
updated: 2026-07-06 00:00:00
---

# [ABC440 E - Cookies](https://atcoder.jp/contests/abc440/tasks/abc440_e)  
  
## 1. 题意  
  
有 $N$ 中类型的饼干，第 $i$ 种类型饼干价值为 $A_i$。

需要选 $K$ 块饼干（可重复），请按降序输出前 $X$ 大的组合总价值。
  
> $1 \le N \le 50$，$1 \le K \le 10^5$，$1 \le X \le 10^5$，$-10^9 \le A_i \le 10^9$。

## 2. 思路

> 叽里咕噜说什么呢？ $10^{100}$ 何意味？仔细一看，发现这是个无效信息。

这题我的第一想法其实是背包 DP，决策在选与不选，`dp[i][j]` 就表示选了 $i$ 种饼干，总和为 $j$ 时的前 $X$ 大和，但是这样的状态数是 $\mathcal{O}(K \cdot N \cdot X)$，显然爆了。

既然不能把所有情况都算出来，那我们回到题目的要求，只算出前 $X$ 个状态，于是就想到了搜索。

我们先考虑最大值这么得到，显然就是 $k$ 个最大的饼干加起来。

然后我们考虑第二大的情况如何取得 —— 删掉一个最大的，加入一个次大的饼干。

OK，至此我们得到了一个处理思路，不断替换当前的高价值饼干成价值更低的饼干。

先对饼干的价值从大到小排序：$A_{1} \ge A_{2} \ge \cdots \ge A_{N}$。

不妨设 $D_{i} = A_{1} - A_{i}$，表示替换一个饼干 $A_{1}$ 的代价。

接下来我们就可以通过 **优先队列** 来优化搜索，有点类似 Dijkstra。

定义状态 State：`(cost, idx, cnt)`。

- `cost` 当前累计的代价 | 总价值 = `Sum - cost`。
- `idx` 最后一次替换的饼干种类 | 为了去重。
- `cnt` 已替换的饼干总数 | 不能超过 $K$。

接着我们考虑状态的转移：

1. 继续加饼干：在当前 `idx` 再换一个饼干 $\to (cost + D[idx], idx, cnt + 1)$。
2. 下一个饼干：撤销上一次替换，换一种 $\to (cost - D[idx] + D[idx+1], idx + 1, cnt)$。

于是通过 **小根堆** 的维护代价，我们就能保证被弹出的价值一定是按降序排序的。

> 注：不同饼干的多重集即便得到相同的总和，也要分别计入答案（题目要求），因此我们不能只用 `cost` 去重。
  
最终复杂度为 $\mathcal{O}(N\log N+X\log X)$。  
  
## 3. 代码部分  
  
{% fold info @AcCode %}  
```cpp  
ll read( ) { /* 模版略 */ }

struct State {
    ll cost;
    int idx, cnt;
    bool operator < ( const State &oth ) const { return cost > oth.cost; }
};

bool cmp( ll A, ll B ) { return A > B; }

ll a[maxn], d[maxn];

void solve( ) {
    int n = read( ), k = read( ), x = read( );
    for( int i = 1; i <= n; ++ i ) a[i] = read( );
    sort( a + 1, a + n + 1, cmp );
    for( int i = 2; i <= n; ++ i ) d[i] = a[1] - a[i];

    ll sum = a[1] * k;
    cout << sum << '\n';

    priority_queue<State> pq;
    pq.push({ d[2], 2, 1 });

    for( int i = 2; i <= x; ++ i ) {
        auto [cost, idx, cnt] = pq.top( );
        pq.pop( );
        cout << sum - cost << '\n';
        if( cnt + 1 <= k ) pq.push({ cost + d[idx], idx, cnt + 1 });
        if( idx + 1 <= n ) pq.push({ cost + d[idx + 1] - d[idx], idx + 1, cnt });
    }
}
```  
{% endfold %}  
  
## 4. 复盘  
  
- **复杂度分析**：排序复杂度为 $\mathcal{O}(N\log N)$，优先队列中每次弹出一个状态，并最多加入两个新状态，因此总复杂度为 $\mathcal{O}(N\log N+X\log X)$。  
  
- **关键转化**：个人理解是搜索的优化题，从全搜索的背包DP 思路转化为，堆优化的部分最优解查询。
  
- **关联笔记**：[[搜索]] | [[堆]]