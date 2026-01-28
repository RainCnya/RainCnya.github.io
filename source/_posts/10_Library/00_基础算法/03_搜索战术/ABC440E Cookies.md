---
title: '[Leaf] ABC440E Cookies'
tags:
  - 搜索/堆优化
  - 策略/贪心
  - 难度/P2/提高+
categories:
  - 10_Library
  - 00_基础算法
  - 03_搜索战术
abbrlink: 2288891e
date: 2026-01-13
---
# [ABC440E - Cookies](https://atcoder.jp/contests/abc440/tasks/abc440_e)

## 1. 题意梗概（翻译）

叽里咕噜说什么呢？ $10^{100}$ 何意味？仔细一看，发现这是个无效信息。

有 $N$ 中类型的饼干，第 $i$ 种类型饼干价值为 $A_i$。

需要选 $K$ 块饼干（可重复），请按降序输出前 $X$ 大的组合总价值。

## 2. 逻辑推理

其实这题我第一眼看上去是 `背包DP`，决策在选和不选，`dp[i][j]` 就表示选了 $i$ 中饼干，总数为 $j$ 时的前 $X$ 大和，但是 $N \leq 50, K \leq 1e5$，导致状态过大，复杂度爆炸了$O(K \cdot N \cdot X)$。

既然不能正着把全部情况都算出来，那么不妨采用剪枝策略，使用**搜索**，去查找可能的情况。

### 初步分析

我们先把饼干的价值从大到小排序： $A_1 \geq A_2 \geq \dots \geq A_N$。

显然发现，最大和的情况就是：全选 $A_1 \iff Sum = A_1 \times k$。

然后其他的所有选择方法，都是在此基础上的修改 $\iff$ 将其中的若干个 $A_1$ 替换成价值更低的饼干。

### 深入分析

说到这里了，很显然能看出那个 $10^{100}$ 完全是唬人的。

那么我们的目标就变成了：**如何通过最少的代价，去产生下一个最优解**。

不妨设：`D[i] = A[1] - A[i]` 表示替换一个 $A_1$ 饼干的代价。 

然后我们可以通过 **优先队列(堆)**，从最小代价接着搜索。

### 堆优化搜索（类Dijkstra）

到此为止，本题的基本分析就结束了：通过堆优化的搜索，去查询到前 $X$ 中最大价值。

我们将状态定义为 `(Cost, idx, cnt)`。

- `Cost`: 当前累计的代价（总价值 = $Sum - Cost$）。
    
- `idx`: 当前最后一次替换所使用的饼干种类（为了去重）。
    
- `cnt`: 已替换的饼干总数（不能超过 $K$）。
    
**转移路径：**

1. **继续加饼干**：在当前位置 `idx` 再替换一个饼干。
    
    - `(cost + D[idx], idx, cnt + 1)`
        
2. **换一个饼干**：撤销上一次的替换，换成一种价值更低的饼干。
    
    - `(cost - D[idx] + D[idx+1], idx + 1, cnt)`

通过优先队列（小根堆）维护代价，我们就能保证弹出的价值一定是按降序排列的。

## 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 55;

struct State // 状态
{
    ll cost; // 代价
    int idx; // 当前是第 idx 块饼干
    int cnt; // 第 idx 块饼干换了几个
    // 这里是重载运算符，优先队列默认是大根堆，这里反转一下。
    bool operator < ( const State &oth )
    {
        return cost > oth.cost;
    }
};

ll a[maxn];
ll d[maxn];
int n, k, x;

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    if( !( cin >> n >> k >> x ) )
    {
        return 0;
    }

    for( int i = 1; i <= n; ++ i )
    {
        cin >> a[i];
    }

    sort( a + 1, a + n + 1, greater<ll>( ) );

    // 计算相对于最高价值的亏损额
    for( int i = 2; i <= n; ++ i )
    {
        d[i] = a[1] - a[i];
    }

    ll base = a[1] * k;
    cout << base << '\n';

    priority_queue<State> pq;
// 初始化
	pq.push({ d[2], 2, 1 });
	
	for( int i = 2; i <= x; ++ i )
	{
		auto [cost, idx, cnt] = pq.top();
		pq.pop();
		
		cout << res - cost << "\n";
		// 继续加饼干；限制条件：总替换数不能超过 K。
		if( cnt + 1 <= k ) pq.push({ cost + d[idx], idx, cnt + 1 });
		// 换一种饼干；限制条件：idx + 1 是可以取到的饼干类型。
		if( idx + 1 <= n ) pq.push({ cost + ( d[idx + 1] - d[idx] ), idx + 1, cnt });
	}

    return 0;
}
```

{% endfold %}

## 3. 复盘

- **复杂度**: $O( X \log X )$。
    
- **碎碎念**: 多重集的去重，可以通过限定搜索顺序来达到。其实这题有点 K 短路的角度。
    
- **关联笔记**: [[Note] 堆优化搜索-K优解问题]