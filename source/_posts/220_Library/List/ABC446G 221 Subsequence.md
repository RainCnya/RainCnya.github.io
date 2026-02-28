---
title: '[Leaf] [ABC446G] 221 Subsequence'
tags:
  - DP/计数
  - 算法/前缀差分
  - 难度/P4
categories:
  - 220_Library
  - List
abbrlink: d730d533
date: 2026-02-21 22:34:30
---

# [G - 221 Subsequence](https://atcoder.jp/contests/abc446/tasks/abc446_g)

## 1. 题面梗概

**中译中**：定义一种 “221 序列” ，每个数字 $x$ 必须连续出现恰好 $x$ 次。给一个长度为 $N$ 的数组 $A$，求其中有多少个不同的 221 子序列。

> $N \leq 5 \times 10^5$，答案对 $998244353$ 取模。

## 2. 逻辑推导

221 序列的本质上是由若干个数值块组成的。一个值为 $x$ 的块必须包含且仅包含 $x$ 个 $x$。

> $\{1\},\{2, 2\},\{3, 3, 3\}$

我们的目标是统计不同的子序列。在子序列计数问题中，为了避免重复统计，对于同一种序列，只在它第一次能被构造出来的地方进行统计。

### 2.1 定义

**定义**：$dp[i]$ 为以 $A[i]$ 为最后一个元素，且 $A[i]$ 刚好完成了一个数值块的不同子序列数量。

假设 $A[i] = x$，若要让 $A[i]$ 作为一个块的终点，我们必须在 $i$ 之前找 $x - 1$ 个值为 $x$ 的元素。

### 2.2 转移

记录数值 $x$ 出现的所有下标序列为 $pos[x]$。设当前 $A[i]$ 是 $x$ 在原数组中第 $cnt$ 次出现（从 1 开始计数）：

1. **确定边界**：当前块的**起点下标**（即该块中第一个 $x$ 的位置）必须是 $pos[x][cnt - x]$。记为 $r$。

2. **确定转移区间 $[l, r-1]$**：

- 我们要从上一个已经合法的 221 序列转移过来。上一个序列的结尾下标 $j$ 必须满足 $j < r$。
    
- 设 $x$ 的第 $cnt-x$ 次出现的位置为 $l$（若不存在则为 0）。
    
> 如果转移点 $j < l$，说明我们完全可以用 $pos[x][cnt-x-1]$（即第 $cnt-x$ 个 $x$）替换掉当前的 $pos[x][cnt-1]$（即第 $cnt$ 个 $x$），从而在更早的位置构造出同样的子序列。
        
- 因此，有效的转移来源区间被限定在 $(l, r)$ 之间。即 $j \in [l, r-1]$。

### 2.3 前缀和优化

设 $sum[i] = \sum_{k=0}^{i}dp[k]$，则状态转移方程就简化为：

$$
dp[i] = sum[r-1] - sum[l]
$$

注：$dp[0] = 1$ 表示空序列为状态起点，最后减去这个不合法区间。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 5e5 + 5;
const int mod = 998244353;

vector< int > pos[maxn];
ll sum[maxn];
ll dp[maxn];
int a[maxn];
int n;

void solve( )
{
    cin >> n;
    for( int i = 1; i <= n; ++ i )  cin >> a[i];

	// 边界 空序列
    sum[0] = dp[0] = 1;

    for( int i = 1; i <= n; ++ i )
    {
        int x = a[i];
        pos[x].push_back( i );

        int cnt = pos[x].size( );

        if( cnt >= x )
        {
            int r = pos[x][cnt - x];
            int l = 0;
            if( cnt - x > 0 ) l = pos[x][cnt - x - 1];
            
            ll cur = sum[r - 1];
            if( l != 0 ) cur = ( cur - sum[l] + mod ) % mod;

            dp[i] = cur;
        }

        sum[i] = ( sum[i - 1] + dp[i] ) % mod;
    }

	// 空序列不算 -1
    ll ans = ( sum[n] - 1 + mod ) % mod;
    cout << ans << '\n';
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    solve( );
    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度分析**：$O(N)$。

- **碎碎念**：本题是前缀和优化计数 DP 的运用，重点注意去重的细节即可。

- **关联笔记**：[[计数DP]] | [[降维技巧#前缀和与差分]]] | [[优化DP]]
