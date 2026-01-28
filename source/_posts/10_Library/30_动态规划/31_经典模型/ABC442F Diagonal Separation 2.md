---
title: '[Leaf] [ABC442F] Diagonal Separation 2'
tags:
  - DP/线性
  - 逆运算/前缀和
  - 难度/P2/提高
categories:
  - 10_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: a5a4bb40
date: 2026-01-25 12:09:11
---
# [F - Diagonal Separation 2](https://atcoder.jp/contests/abc442/tasks/abc442_f)

## 1. 题面梗概

给你一个 $N \times N$ 的网格。你要给它重新染色，使得它满足两个条件：
    
1. **行约束**: 每一行必须是“左边全是白，右边全是黑”。
        
2. **列约束**: 每一列必须是“上边全是白，下边全是黑”。
        
问：最少需要改动多少个格子的颜色？

## 2. 逻辑推导
### 2.1 分析

从**行约束**入手，设第 $i$ 行分界点为 $k_i$，即 $(i, 1 \cdots k_i)$ 是白色，$(i, k_i + 1 \cdots N)$ 是黑色。

接着考虑**列约束**，如果格子 $(i, j)$ 是黑色，那么它下方的所有格子 $(i + 1, j), (i + 2, j) \dots$ 都是黑色。

这说明了什么？说明如果第 $i$ 行从第 $j$ 列开始变黑，那么第 $i + 1$ 行在第 $j$ 列也必须是黑的。这就意味着：$k_{i+1} \leq k_{i}$，$k$ 数组是**非递增**的序列。

![[Pasted image 20260125124842.png]]

**结论**：问题的本质就是寻找一组 $k_1, k_2, \dots, k_n$，使得修改代价最少。

### 2.2 DP

遇到这种情况，我们考虑用 DP 来解决最优化问题。

**定义**：`dp[i][j]` 表示处理完前 $i$ 行，且第 $i$ 行分界点为 $j$ 时的最小代价。

**转移**：$dp[i][j] = Cost(i, j) + min_{k = j}^{N}(dp[i-1][k])$。

- 其中 $Cost(i, j)$ 表示把第 $i$ 行变为 **前 $j$ 白，后 $N-j$ 黑** 的代价，这一项可以用前缀和快速查询。
- 然后就是 $\min_{k = j}^{N}(dp[i-1][k])$ 这一项，前面提到 $k$ 数组是非递增的，所以我们只需要从后面的转移。

**瓶颈**：如果暴力转移势必会在 $\min$ 这一项中浪费大量时间，导致复杂度退化为 $O(N^3)$，那样就 TLE 了。

观察：
$$
\begin{cases}
dp[i][n] = Cost(i, n) + \min(dp[i][n]) \\
dp[i][n-1] = Cost(i, n-1) + \min(dp[i][n-1], dp[i][n]) \\
dp[i][n-2] = Cost(i, n-2) + \min(dp[i][n-2], dp[i][n-1], dp[i][n])
\end{cases}
$$

发现了吗？$\min_{k=j}^{N}(dp[i-1][k])$ 是一个典型的后缀最小值，所以在处理每一行时，我们只需要预处理出上一行 DP 的后缀最小值数组，即可将转移复杂度从 $O(N^3)$ 降维到 $O(N^2)$。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair<int, int>;

const int maxn = 5e3 + 50;
const ll inf = 1e18;

char g[maxn][maxn];
ll dp[maxn][maxn];
ll sum[maxn][maxn];
ll tmp[maxn];
int n;

// Cost 函数计算
ll get_cost( int i, int j )
{
	// 黑 -> 白
    ll cnt1 = sum[i][j];
    // 白 -> 黑
    ll cnt2 = ( n - j ) - ( sum[i][n] - sum[i][j] );
    return cnt1 + cnt2;
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    
    cin >> n;
    for( int i = 1; i <= n; ++ i )
    {
        for( int j = 1; j <= n; ++ j )
        {
            cin >> g[i][j];
            sum[i][j] = sum[i][j-1];
            if( g[i][j] == '#' ) sum[i][j] ++;
        }
    }
	
	// DP 初始化
    for( int j = 0; j <= n; ++ j ) 
    {
        dp[0][j] = 0;
    }

    for( int i = 1; i <= n; ++ i )
    {
	    // 上一行 DP 的后缀最小值
        tmp[n] = dp[i-1][n];
        for( int j = n - 1; j >= 0; -- j )
        {
            tmp[j] = min( tmp[j+1], dp[i-1][j] );
        }
        
        // 状态转移
        for( int j = 0; j <= n; ++ j )
        {
            dp[i][j] = tmp[j] + get_cost( i, j );
        }
    }

	// 统计答案
    ll ans = inf;
    for( int j = 0; j <= n; ++ j )
    {
        ans = min( ans, dp[n][j] );
    }
    cout << ans << "\n";

    return 0;
}
```
{% endfold %}

## ## 4. 复盘

- **复杂度**: 时间复杂度 $O(N^2)$，空间复杂度 $O(N^2)$。
    
- **碎碎念**:
    
    - **转化**：题目描述的条件看起来有点抽象，但说白了其实就是，在网格中划出一条**单调下降的阶梯线**。线的左上方全是白，右下方全是黑。
        
    - **坑点**: 注意分界点 $k$ 的范围是 $[0, N]$，共有 $N+1$ 种状态（从全黑到全白），初始化和循环边界不要写错。
        
- **关联笔记**: [[线性DP]] | [[前缀和与差分]]