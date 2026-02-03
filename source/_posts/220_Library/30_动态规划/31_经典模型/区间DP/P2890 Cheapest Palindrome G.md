---
title: '[Leaf] [P2890] Cheapest Palindrome G'
tags:
  - DP/区间
  - 算法/对称性
  - 字符串/回文
  - 难度/P2
categories:
  - 220_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: e4f80a95
date: 2025-11-24 00:00:00
updated: 2026-02-03 14:56:48
---
# [P2890 [USACO07OPEN] Cheapest Palindrome G - 洛谷](https://www.luogu.com.cn/problem/P2890)

## 1. 题面梗概

**中译中**: 给你一个字符串，你可以通过“增加”或“删除”字符的方式它变成回文串。每个字符的增、删代价不一样。求最小总代价。

## 2. 逻辑推导

处理回文串是 区间DP 的舒适区，但这题比较麻烦。

### 2.1 区间DP

**状态定义**：$f[l][r]$ 表示使子串 $[l,r]$ 变回文的最小成本。

**状态转移**：若 $s[l] \neq s[r]$，那么我就有四种手段，左加，左减，右加，右减。

问题来了，虽说直接写四个转移也能写，但是“增加”这个操作会影响字符串长度，总不能再开一个维度记录长度吧。

### 2.2 回文

重新回到**回文串**的角度分析这个问题，注意到回文的本质是**对称**。

如果 $s[l] \neq s[r]$，我们为了保持对称，显然就有两种手段：

1. 删除：把左边的 $s[l]$ 直接删掉。
2. 增加：把右边的 $s[r+1]$ 处补一个 $s[l]$。

这两种手段在结果上都是等价的，都是处理掉 $s[l]$ 这个变量，进入 $[l+1,r]$ 的子区间问题。

### 2.3 转移

既然增减效果等价，我们只需要考虑哪个方案更便宜：$Cost(c) = \min(Add_c, Del_c)$。

- 若 $s[l] = s[r]$: $f[l][r] = f[l+1][r-1]$。
		
- 若$s[l] \neq s[r]$: $f[l][r] = \min(f[l+1][r] + Cost(s[l]), f[l][r-1] + Cost(s[r]))$。

### 2.4 结论

本题的关键在于识别回文串的对称逻辑，操作本身不重要，它带来的效果才是建模的核心要素。

## 3. 代码实现

{% fold info @AcCode %}

```cpp
#include<bits/stdc++.h>
using namespace std;

const int maxn = 2e3 + 50;

int dp[maxn][maxn];
int c[30];
int n, m;

int main()
{	
    cin >> m >> n;
    string s;
    cin >> s;
    s = ' ' + s;

    for( int i = 1; i <= m; ++ i )
    {
        char ch;
        int a, b;
        cin >> ch >> a >> b;
        c[ ch - 'a' ] = min( a, b );
    }

    memset( dp, 127, sizeof( dp ) );

    for( int i = 1; i <= n; ++ i )
    {
        dp[i][i] = 0;
        dp[i][i-1] = 0;
    }

    for( int len = 2; len <= n; ++ len )
    {
        for( int l = 1; l + len - 1 <= n; ++ l )
        {
            int r = l + len - 1;
            if( s[l] == s[r] )
                dp[l][r] = min( dp[l][r], dp[l+1][r-1] );

            dp[l][r] = min( dp[l][r], dp[l+1][r] + c[ s[l] - 'a' ] );
            dp[l][r] = min( dp[l][r], dp[l][r-1] + c[ s[r] - 'a' ] );
        }
    }

    cout << dp[1][n] << '\n';
    return 0;
}
```

{% endfold %}

## 4. 复盘

- **复杂度**: $O( N^2 )$。
    
- **碎碎念**:  注意 $s[l] == s[r]$ 时的边界，特别是长度为 2 的特判。
        
- **关联笔记**: [[区间DP]] | [[回文串]]