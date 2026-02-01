---
title: '[Leaf] [ABC443E] Climbing Silver'
tags:
  - DP/网格
  - 难度/P1/提高-
categories:
  - 10_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: cb5cdc4d
date: 2026-01-31 00:00:00
---
# [E - Climbing Silver](https://atcoder.jp/contests/abc443/tasks/abc443_e)

## 1. 题面梗概

**中译中**: 你从底层 $(N, C)$ 出发，每次可以向上移动 $1$ 层。每一步可以向左上、正上、右上移动。
    
**移动规则**: 如果目的地是空格，直接走。如果目的地是墙，只有当该格下方所有格子目前都是空格时，你才能把墙拆了走进去。
        
**目标**: 判断顶层 $(1, 1 \dots N)$ 哪些格子是可达的。

## 2. 逻辑推导

这题的主要难点在于这个拆墙机制，因为前面的墙存在与否会影响到后续的决策，但仔细分析后，会发现它的一些收敛性质。

因为每次只能横向移动 $1$ 格，因此从起点 $(N,C)$ 出发，能够抵达的范围就是两条 $45°$ 的射线范围内。

然后我们考虑墙的问题，由于只能从下往上爬，所以每一列墙的破坏顺序也只能从下往上，那我们可以记录每一列最下面的那个墙 $limit[j]$，这个最底下的墙，就是强限制条件。

接着考虑，如果我们从 $j - 1$ 列跳往 $j$ 列，有什么限制呢？—— 如果这是个空格子，直接就能跳，如果是墙，我们就必须在 $limit[j]$ 之前进入这一列，不然就没法破墙。

### 2.1 DP

**状态定义**： $dp[i][j]$ 为 $(i, j)$ 位置的状态，$0$ 不可能到达，$1$ 可以破墙，$2$ 只能走空格子。

**状态转移**：

- **规则**：由于状态 $1$ 包含状态 $2$，所以我们的转移逻辑是，能破墙就破墙，实在破不了才设置为 $2$。
- **同列转移**：若下方是 $1$，那么现在也是 $1$。若下方是 $2$，且当前是空格，则现在是 $2$。
- **非同列转移**：若当前行 $i \geq limit[j]$，只要左下或右下可到达，则状态转移为 $1$。反之若当前行 $i < limit[j]$，且当前为空格，则状态转移为 $2$。

最后统计第一行状态情况即可。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 3e3 + 5;

int dp[maxn][maxn];
int limit[maxn];
string s[maxn];
int n, c;

void solve( )
{
    cin >> n >> c;

    for( int i = 1; i <= n; ++ i ) limit[i] = 0;

    for( int i = 1; i <= n; ++ i ) 
    {
        cin >> s[i];
        s[i] = ' ' + s[i];
        for( int j = 1; j <= n; ++ j )
        {
            if( s[i][j] == '#' ) limit[j] = i;
            dp[i][j] = 0;
        }
    }

    dp[n][c] = 1;
    for( int i = n - 1; i >= 1; -- i )
    {
        for( int j = 1; j <= n; ++ j )
        {
	        // 同列转移
            if( dp[i + 1][j] == 1 ) dp[i][j] = 1;
            else if( dp[i + 1][j] == 2 && s[i][j] == '.' ) dp[i][j] = 2;

			// 跨列转移
            if( j > 1 && dp[i + 1][j - 1] > 0 )
            {
                if( i >= limit[j] ) dp[i][j] = 1;
                else if( dp[i][j] == 0 && s[i][j] == '.' ) dp[i][j] = 2;
            }

            if( j < n && dp[i + 1][j + 1] > 0 )
            {
                if( i >= limit[j] ) dp[i][j] = 1;
                else if( dp[i][j] == 0 && s[i][j] == '.' ) dp[i][j] = 2;
            }
        }
    }

	// 统计答案
    for( int j = 1; j <= n; ++ j )
    {
        if( dp[1][j] > 0 ) cout << 1;
        else cout << 0;
    }
    cout << '\n';
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

- **复杂度分析**: $O( T \times N^2 )$。
    
- **碎碎念**: 这题很明显是用 DP 转移，但 DP 的状态设计更体现这题的水准。然后就是注意多组数据初始化，我用 `memset` 直接 TLE 了（怒！
        
- **关联笔记**: [[网格DP]] 