---
title: "[Leaf] [CF2157D] Billion Players Game"
tags:
  - 策略/贪心
  - 数学/函数极值
  - 难度/P2/提高+
categories:
  - 10_Library
  - 00_基础算法
  - 04_贪心与构造
abbrlink: 4679a094
date: 2025-12-19
---
# [CF2157D - Billion Players Game](https://codeforces.com/problemset/problem/2157/D) 

## 1. 题面梗概

**中译中**: 有 $n$ 个玩家预测了一个数值 $a_i$。我们需要为每个玩家分配一个“立场”：向上（计算 $p - a_i$）或向下（计算 $a_i - p$）。

我们的目标是选择一套立场分配方案，使得在最坏情况（即真实值 $p$ 在区间 $[l, r]$ 内波动时）下的总收益依然能够达到最大。

## 2. 逻辑推导

- **模型**: 最大化最小值的线性优化问题：$\max_{S} \min_{p \in [l, r]} \sum_{i \in S} (p - a_i) + \sum_{i \notin S} (a_i - p)$。
    
- **性质**:
    
    1. **线性极值原理**: 对于任何确定的立场分配方案，总收益函数 $f(p)$ 都是关于 $p$ 的一次函数。
        
    2. **端点定胜负**: 由于一次函数在闭区间 $[l, r]$ 上是单调的，其最小值必然在区间的左端点 $p = l$ 或右端点 $p = r$ 处取得。
        
    3. **贪心分割性**: 观察函数 $f(p) = (\text{count}_{up} - \text{count}_{down}) \cdot p + (\sum a_{down} - \sum a_{up})$。为了让 $f(p)$ 尽可能大，我们直觉上应该让较小的 $a_i$ 选“向上”，较大的 $a_i$ 选“向下”。这意味着存在一个最优分割点，使得排序后的 $a$ 数组左侧全向上，右侧全向下。
        
- **推导**:
    
    1. 将 $a$ 数组从小到大排序，并预处理前缀和。
        
    2. 设前 $i$ 个玩家向上，后 $j$ 个玩家向下（其中 $i+j=n$）。
        
    3. 总收益函数简化为：$f(p) = (i - j) \cdot p + (\text{Sum}_{suffix} - \text{Sum}_{prefix})$。
        
    4. 遍历所有可能的分割点 $i \in [0, n]$，代入 $p=l$ 和 $p=r$ 计算 $\min(f(l), f(r))$，取其最大值即可。

## 3. 代码实现

{% fold info @AcCode %}

```cpp
// CF2157D Billion Players Game
// Key Logic: Linear function properties (Min at endpoints) + Split point enumeration

#include <bits/stdc++.h>
using namespace std;

using ll = long long;
const int maxn = 2e5 + 50;
const ll inf = 1e18;

ll a[maxn], s[maxn], l, r;
int n;

ll calc( int i, int j )
{
    if( i + j > n ) return -inf;
    ll s1 = s[i], s2 = s[n] - s[n - j];
    // f(p) = (i - j) * p + (s2 - s1)
    return min( l * ( i - j ), r * ( i - j ) ) + ( s2 - s1 );
}

void solve( )
{
    cin >> n >> l >> r;
    for( int i = 1; i <= n; ++ i ) cin >> a[i];
    sort( a + 1, a + n + 1 );
    for( int i = 1; i <= n; ++ i ) s[i] = s[i - 1] + a[i];

    ll ans = -inf;
    for( int i = 0; i <= n; ++ i )
    {
        ans = max( ans, calc( i, n - i ) );
        if( n - i >= 1 ) ans = max( ans, calc( i, n - i - 1 ) );
    }
    cout << ans << "\n";
}

int main( )
{
    ios::sync_with_stdio( 0 ); cin.tie( 0 );
    int t; cin >> t;
    while( t -- ) solve( );
    return 0;
}
```

{% endfold %}

## 4. 复盘

- **复杂度**: 排序 $O(N \log N)$，枚举分割点 $O(N)$。整体复杂度 $O(N \log N)$，空间复杂度 $O(N)$。
    
- **碎碎念**: 不要被“博弈”的背景吓到。看到区间波动下的最坏收益，第一反应应该是从收益函数的性质出发。

- **关联笔记**：[[贪心体系]] | [[前缀和与差分]]