---
title: "[Leaf] [P3800] Power收集"
tags:
  - DP/网格
  - DP/优化
  - 单调性/单调队列
  - 难度/P2/提高
categories:
  - 10_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: 2f2b56ea
date: 2025-11-08 00:00:00
---
# [Luogu-P3800](https://www.luogu.com.cn/problem/P3800) Power收集

## 1. 题面梗概

**中译中**: 在 $N \times M$ 的网格里，你从第一行出发，每秒下一行。你在第 $i$ 行第 $j$ 列时，下一秒可以跳到第 $i+1$ 行的 $[j-T, j+T]$ 范围内。有些格子有能量，求通关能拿到的最大能量。

## 2. 逻辑推理

这是一道典型的网格路径规划，但是加入了一个跳跃距离的限制条件，问题不大，我们本能的考虑采用 DP 。

### 2.1 DP

**状态定义**：$f[i][j]$ 表示到达 $(i, j)$ 时的最大能量。

**状态转移**：$f[i][j] = val[i][j] + \max_{j-T \leq k \leq j + T}{f[i-1][k]}$。

简单分析一下复杂度：共有 $N \times M$ 个状态，每个状态要扫描 $2T$ 个点。总复杂度为 $O(NMT)$，这显然不能接受。

### 2.2 优化

我们从转移方程入手：当 $j$ 变成 $j+1$ 时，我们观察的窗口从 $[j-T,j+T]$ 变成了 $[j + 1 - T, j + 1 + T]$。

那这不就是个典型的**滑动窗口最值问题**吗？每一行计算前，先对上一行的 $f$ 数组跑一遍单调队列，这样总复杂度就降到了 $O(N \times M)$。

## 3. 代码实现

{% fold info @AcCode %}

```cpp
#include<bits/stdc++.h>
using namespace std;

const int maxn = 4000 + 50;

int n, m, k, t;
long long dp[maxn][maxn];
deque<int> q;

void insert( int k, int pos )
{
    while( !q.empty( ) && dp[k][pos] > dp[k][ q.back( ) ] )
        q.pop_back( );
    q.push_back( pos );
}

int find( int k, int pos )
{
    if( pos + t <= m )
        insert( k, pos + t );
    while( q.front( ) + t < pos )
        q.pop_front( );
    return q.front( );
}

int main()
{	
    cin >> n >> m >> k >> t;
    while( k -- )
    {
        int x, y, v;
        cin >> x >> y >> v;
        dp[x][y] = v;
    }
    for( int i = 2; i <= n; ++ i )
    {
        for( int j = 1; j <= t; ++ j )
        {
            insert( i - 1, j );
        }
        for( int j = 1; j <= m; ++ j )
        {
            dp[i][j] += dp[i-1][ find( i - 1, j ) ];
        }
        q.clear( );
    }
    long long ans = 0;
    for( int i = 1; i <= m; ++ i )
    {
        ans = max( ans, dp[n][i] );
    }
    cout << ans << '\n';
    return 0;
}
```

{% endfold %}

## 4. 复盘

- **复杂度**: $O( NM )$。
    
- **碎碎念**: 很多网格题一旦涉及区间转移，就可以考虑使用单调队列降维。注意滚动数组的使用，可以节省空间。
    
- **关联笔记**: [[网格DP]] | [[单调栈与队列]]