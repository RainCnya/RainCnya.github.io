---
title: '[Leaf] [CF149D] Coloring Brackets'
tags:
  - DP/区间
  - 难度/P3
categories:
  - 220_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: a3e9be80
date: 2025-11-25 00:00:00
updated: 2026-02-03 13:48:20
---
# [CF149D Coloring Brackets - 洛谷](https://www.luogu.com.cn/problem/CF149D)
## 1. 题面梗概

 **中译中**: 给一个合法的括号序列。你要给括号染色：红色、蓝色或不染。要求：
    
1. 每对配对的括号，恰好有一个有色。
    
2. 相邻的括号颜色不能相同（除非都是不染色）。

求总方案数。

## 2. 逻辑推导

合法括号匹配显然很符合递归的特性，这引导我们使用区间 DP 递归求解。

### 2.1 结构分析

我们发现，合法的括号序列只有两种组合情况：1. $(A)$ 嵌套型；2. $AB$ 拼接型。这就意味着，区间 $[l,r]$ 的方案数只取决于它的子结构。

因此不难想到，定义 $f[l][r]$ 表示区间 $[l,r]$ 的合法序列括号总方案数。但因为相邻括号颜色不能相同，所以我们必须知道左右端点染了什么颜色。

从而我们扩展状态，定义 $f[l][r][cl][cr]$ 为区间 $[l,r]$，左端点染 $cl$ 色，右端点染 $rl$ 色的方案数。

### 2.2 递归

从两个合法情况进行分析，我们首先需要处理出每个括号的对应的匹配位置 $match[i]$。

- 情况 $1$ ：$match[l] == r$，也就是 $(A)$ 嵌套型。

	- 递归 $f[l+1][r-1][nl][nr]$，只有 $cl,nl \quad cr, nr$ 不冲突时，进行累加。

- 情况 $2$ ：$match[l] < r$，也就是 $AB$ 拼接型。

	- 找到第一个完整的括号对 $[l,mid]$，序列就被切分为 $[l,mid]$ 和 $[mid+1,r]$ 两部分，分别递归两个子区间，然后在 $mid, mid+1$ 检查颜色冲突。

### 2.3 结论

如此我们就解决了这个复杂的区间DP问题，解决方案就是新增两个状态维度，用于处理转移。

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>#include<bits/stdc++.h>
using namespace std;

const int maxn = 1005;
const int mod = 1000000007;

string s;
int dp[maxn][maxn][3][3];
int p[maxn];
int n;

bool ok( int c1, int c2 )
{
    return !( c1 > 0 && c2 > 0 && c1 == c2 );
}

bool check( int cl, int cr )
{
    return ( cl > 0 ) ^ ( cr > 0 ); 
}

long long dfs( int l, int r, int cl, int cr )
{
    if( dp[l][r][cl][cr] != -1 ) return dp[l][r][cl][cr];

    long long ans = 0;

    if( l + 1 == r )
    {
        return dp[l][r][cl][cr] = check( cl, cr );
    }

    if( p[l] == r )
    {
        if( !check( cl, cr ) ) return dp[l][r][cl][cr] = 0;
        for( int ncl = 0; ncl < 3; ++ ncl )
        {
            for( int ncr = 0; ncr < 3; ++ ncr )
            {
                if( !ok( cl, ncl ) || !ok( cr, ncr ) ) continue;
                ans = ( ans + dfs( l + 1, r - 1, ncl, ncr ) ) % mod;
            }
        }
    }
    else
    {
        int k = p[l];
        for( int mcl = 0; mcl < 3; ++ mcl )
        {
            for( int mcr = 0; mcr < 3; ++ mcr )
            {
                if( !ok( mcl, mcr ) ) continue;
                long long lres = dfs( l, k, cl, mcl );
                long long rres = dfs( k+1, r, mcr, cr );
                if( lres && rres )
                {
                    ans = ( ans + lres * rres ) % mod;
                }
            }
        }
    }

    return dp[l][r][cl][cr] = ans;
}

int main()
{	
    cin >> s;
    n = s.length( );
    s = ' ' + s;

    stack<int> stk;
    for( int i = 1; i <= n; ++ i )
    {
        if( s[i] == '(' ) stk.push( i );
        else if( !stk.empty( ) )
        {
            p[stk.top( )] = i;
            p[i] = stk.top( );
            stk.pop( );
        }
    }

    memset( dp, -1, sizeof( dp ) );

    long long ans = 0;
    for( int i = 0; i < 3; ++ i )
    {
        for( int j = 0; j < 3; ++ j )
        {
            ans = ( ans + dfs( 1, n, i, j ) ) % mod;
        }
    }

    cout << ans << '\n';
    return 0;
}
```

{% endfold %}

## 4. 复盘

- **复杂度**: $O( N \cdot 3^4 )$。
    
- **碎碎念**:  说是区间 DP，但我感觉它更像是一个在树上进行的 DP。每个括号对就是一个节点。
        
- **关联笔记**: [[区间DP]]