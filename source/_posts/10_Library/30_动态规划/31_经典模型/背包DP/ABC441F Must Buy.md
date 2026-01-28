---
title: '[Leaf] [ABC441F] Must Buy'
tags:
  - DP/背包
  - 难度/P2/省选-
categories:
  - 10_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: 79c2a83b
date: 2026-01-19
---
    
# [ABC441F - Must Buy](https://atcoder.jp/contests/abc441/tasks/abc441_f)

## 1. 题面梗概

给定 $N$ 个物品和预算 $M$，每个物品有其价格 $P_i$ 和价值 $V_i$。

在保证总价值最大化的前提下，判断每个物品属于哪一类：必选 (CateA)、必不选 (CateC)、或者可选可不选 (CateB)。

## 2. 逻辑推导

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

## 3. 代码实现

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

	// 前缀背包
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

	// 后缀背包
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

## 4. 复盘

- **复杂度**: $O( NM )$。前后缀背包预处理各一次，最后 $O( NM )$ 合并答案。
    
- **碎碎念**: 这种前后缀分解的思路在处理 “**某元素的影响**” 时非常通用。注意空间复杂度，若 $N, M$ 过大可能需要滚动数组优化，但本题 $1000 \times 50000$ 恰好够用，就不滚了。
    
- **关联笔记**: [[背包DP]]