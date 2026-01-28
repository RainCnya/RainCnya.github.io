---
title: '[Leaf] [ABC441C] Sake and Water'
tags:
  - 策略/贪心
  - 难度/P1/普及
categories:
  - 10_Library
  - 00_基础算法
  - 04_贪心与构造
abbrlink: 37c1990d
date: 2026-01-19
---
# [ABC441C - Sake or Water](https://atcoder.jp/contests/abc441/tasks/abc441_c)

## 1. 题面梗概（翻译）

给定 $N$ 杯液体，其中 $K$ 杯是酒，其余是水。已知每杯体积 $A_i$。求最少需要选多少个杯子，才能保证无论哪 $K$ 杯是酒，选出的杯子中酒的总量都至少为 $X$ 毫升。

## 2. 逻辑推导

这题的关键在构造**最坏情况**，即贪心思想的应用。

为了保证在最坏情况也能喝到 $X$ 毫升的酒，我们就需要让我们选出的杯子中，酒的最少可能总量 “大于等于” $X$。

假设我们选了 $m$ 个杯子，在所有 $N$ 个杯子中，有 $K$ 杯是酒，$N-K$ 杯是水。为了让我们喝到的酒最少，那 $N - K$ 杯水就需要占据我们选出的杯子中容量较大的那部分。

- 若 $m \leq N - K$ ，就说明此时喝不到酒，$k = 0$。
- 若 $m \geq N - K$ ，此时酒的杯子数： $k = m - (N - K)$。
- 为了让这 $k$ 杯酒的容量尽可能少，所以贪心选择这 $m$ 被中容量最小的即可。

明确了这些之后，我们先进行一次排序，将 $A$ 降序（从大到小）排序。

如果我们选前 $m$ 大的杯子。那么这 $m$ 个杯子中，容量最小的 $k$ 个分别为：$A'_{m-k+1}, A'_{m-k+2},\dots,A'_{m}$。

代入 $k = m - (N - K)$ ，得到酒的初始下标为 $m - (m - (N - K)) + 1  = N - K + 1$，即把问题转换为，从 $N - K + 1$ 开始，一直加到第 $m$ 大的杯子的总和。

## 3. 代码实现

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

## 4. 复盘

- **复杂度**: $O( N \log N )$，瓶颈在于排序。
    
- **碎碎念**: 本题是比较简单的贪心。
    
- **关联笔记**: [[贪心体系]]