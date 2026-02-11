---
title: '[Leaf] [CF2194E] The Turtle Strikes Back'
tags:
  - DP/线性
  - 策略/转换
  - 难度/P4
categories:
  - 220_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: 8b34838d
date: 2026-02-09 00:00:00
---
# [CF2194E - The Turtle Strikes Back](https://codeforces.com/contest/2194/problem/E)

## 1. 题面梗概

**中译中**：

小 A 从 $(1,1)$ 走到 $(n,m)$，每经过一个格子 $(i,j)$ 都会获得 $a_{i,j}$ 的权值。但在小 A 出发后，捣蛋鬼小 $B$ 会反转一个格子，$a_{i,j} \to -a_{i,j}$。

小 $A$ 想选一条路径，使得小 $B$ 出手后，路径和依然尽可能大；而小 $B$ 想让这个值尽可能小。求最终路径权值。

## 2. 逻辑推导

这题的核心在于理解这个博弈关系。但其实只需要算出：对于每一个格子 $(i, j)$，如果它被翻转了，整张图的最大路径和会变成多少。

### 2.1 对角线

有一个很特殊的性质，任何一条从左上角到右下角的路径，必然会经过每一条 **反对角线** （ $i + j = k$ 的集合 ）上的某一个格子。

这意味着如果小 B 翻转了 $(i, j)$，小 A 面临的路径选择只有两类：

1. 走经过 $(i, j)$ 的路径：收益为 $Path(i, j) - 2a_{i, j}$。
2. 不走经过 $(i, j)$ 的路径，收益为 $\max(Path(ii, jj))$，$ii + jj = i + j$，即同一对角线的另一个点。

### 2.2 前后缀DP

既然我们要枚举每一个点，我们不妨计算前后缀路径最值。

- $pre[i][j]$ 表示 $(1, 1) \to (i, j)$ 的最大路径。
- $suf[i][j]$ 表示 $(i, j) \to (n, m)$ 的最大路径。

这样对于经过每个点的最大路径就很好维护了：

- $dp[i][j]$ 表示 $(1, 1) \to (n, m)$ 经过 $(i, j)$ 的最大路径。
- 显然：$dp[i][j] = pre[i][j] + suf[i][j] - a[i][j]$。

### 2.3 对角线

接着我们维护每条对角线的最大值和次大值即可，如果当前这一点就是最大值，且最大值只有一个，那么不经过这点的路径最大值就是，这条对角线上的次大值。

### 2.3 结论

这是一道有趣的线性 DP，通过对角线转换可以大幅度优化时间复杂度。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const ll inf = 1e18;

int n, m;

void solve( )
{
    cin >> n >> m;

    vector< vector< ll > > a( n + 5, vector< ll >( m + 5 ) );
    for( int i = 1; i <= n; ++ i )
    {
        for( int j = 1; j <= m; ++ j )
        {
            cin >> a[i][j];
        }
    }

    vector< vector< ll > > pre( n + 5, vector< ll >( m + 5, -inf ) );
    for( int i = 1; i <= n; ++ i )
    {
        for( int j = 1; j <= m; ++ j )
        {
            if( i == 1 && j == 1 ) pre[i][j] = a[i][j];
            else pre[i][j] = max( pre[i][j - 1], pre[i - 1][j] ) + a[i][j];
        }
    }

    vector< vector< ll > > suf( n + 5, vector< ll >( m + 5, -inf ) );
    for( int i = n; i >= 1; -- i )
    {
        for( int j = m; j >= 1; -- j )
        {
            if( i == n && j == m ) suf[i][j] = a[i][j];
            else suf[i][j] = max( suf[i][j + 1], suf[i + 1][j] ) + a[i][j];
        }
    }

    vector< vector< ll > > dp( n + 5, vector< ll >( m + 5, inf ) );

    vector< ll > mx1( n + m + 1, -inf ), mx2( n + m + 1, -inf );
    vector< ll > cnt( n + m + 1, 0 );

    for( int i = 1; i <= n; ++ i )
    {
        for( int j = 1; j <= m; ++ j )
        {
            int idx = i + j - 1;
            dp[i][j] = pre[i][j] + suf[i][j] - a[i][j];

            if( dp[i][j] > mx1[idx] )
            {
                mx2[idx] = mx1[idx];
                mx1[idx] = dp[i][j];
                cnt[idx] = 1;
            }
            else if( dp[i][j] == mx1[idx] )
            {
                cnt[idx] ++;
            }
            else if( dp[i][j] > mx2[idx] )
            {
                mx2[idx] = dp[i][j];
            }
        }
    }

    ll ans = inf;

    for( int i = 1; i <= n; ++ i )
    {
        for( int j = 1; j <= m; ++ j )
        {
            int idx = i + j - 1;

            ll mx = mx1[idx];
            if( dp[i][j] == mx1[idx] && cnt[idx] == 1 ) mx = mx2[idx];

            ll cur = max( mx, dp[i][j] - 2 * a[i][j] );
            ans = min( ans, cur );
        }
    }

    cout << ans << '\n';
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int _t = 1;
    cin >> _t;
    while( _t -- ) solve( );
    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度分析**：$O( n \cdot m )$。
    
- **碎碎念**：刚开始想暴力跑每一个点的删点 DP，一看复杂度 $O((NM)^2)$ 必炸。但如果想到对角线这个性质，就很巧妙了，不管你怎么走，都逃不出这道斜线。
        
- **关联笔记**：[[线性DP]] 
