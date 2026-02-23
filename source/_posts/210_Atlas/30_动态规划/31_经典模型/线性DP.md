---
title: 线性DP
tags:
  - DP/线性
  - 难度/P3
categories:
  - 210_Atlas
  - 30_动态规划
  - 31_经典模型
abbrlink: ea2a560b
date: 2026-02-23 00:00:00
---

# 线性状态 动态规划

顾名思义：指的是一类状态定义与题设内容线性相关的动态规划。

> 题设中有序列（数组） -> 一维；有网格（棋盘） -> 二维

线性状态动态规划定义状态时经常会考虑 ”某类有序事件中，前若干子事件的答案“。

## 单序列问题

### LIS 模型

- **最长上升子序列**：在给定序列中寻找一个尽量长的子序列，使得这个子序列中的元素是严格递增的（或不下降的）。

- **核心原理**：
		
    - **朴素** $O(N^2)$： 状态 $f[i]$ 表示以 $a[i]$ 结尾的最长上升子序列长度。转移方程：$f[i] = \max_{0 \le j < i, a[j] < a[i]}\{f[j]\} + 1$。
		
    - **贪心** $O(N \log N)$： 维护一个单调数组，同样长度的上升序列，结尾元素越小，后续接纳潜力越大。利用二分加速。

- **相关例题**：
		
	- [[P1020 导弹拦截]] ：子序列提取 -> 经典 LIS 模型 / Diliworth定理
	- [[P1725 琪露诺]]：子序列提取 -> 单调队列优化
	- [[P4933 大师]] ：子序列提取变体 + 计数类  
	- [[P1874 快速求和]]：子段划分 + 背包模型

#### LIS 模型模板

{% fold info @LIS 模型 %}
```cpp
// LIS 模型 O(N^2)
void LIS1( )
{
    for( int i = 1; i <= n; ++ i )
    {
        f[i] = 1;
        for( int j = 1; j < i; ++ j )
        {
            if( a[j] < a[i] ) f[i] = max( f[i], f[j] + 1 );
        }
    }
}

// LIS 模型 O(N log N) STL vector 写法 
vector<int> g;
int LIS2( vector<int> &nums ) 
{
    for( int x : nums ) 
    {
        auto it = lower_bound( g.begin( ), g.end( ), x );
        if( it == g.end( ) ) g.push_back(x);
        else *it = x;
    }
    return g.size( );
}

// LIS 模型 O(N log N) 静态数组写法
int LIS3( vector<int> &nums )
{
	int len = 0;
    for( int x : nums )
    {
        int pos = lower_bound( f + 1, f + len + 1, x ) - f;
        f[pos] = x;
        if( pos > len ) len = pos;
    }
    return len;
}

// lower_bound: >=, 对应严格上升 LIS
// upper_bound: >, 对应不下降序列
```
{% endfold %}






### 实战案例

- [[P1052 过河]]：路径压缩，压缩状态。
- [[CF2193F Pizza Delivery]]：通过单调性，将二维移动简化为一维转移。

## 多序列问题

### LCS 模型

- **最长相同子序列**：给定两个序列，求它们长度最长的公共子序列。
	
- **核心原理**：将两序列匹配映射为二维状态。状态 $f[i][j]$ 表示 A 前 $i$ 个 和 B 前 $j$ 个的 LCS 长度。
$$
f[i][j] = \begin{cases}  
f[i-1][j-1] + 1 & (A_i = B_j)  \\
\max(f[i-1][j], f[i][j-1]) & (A_i \neq B_j)  \\
\end{cases}
$$

- **相关例题**：
	- [[P2758 编辑距离]]：LCS 模型变体
	- [[P1439 两个排列的最长公共子序列]]：伪装成 LCS 的 LIS 模型
	- [[P2679 子串]]：双序列 + 子段划分 + 计数类
	- [[P2516 最长公共子序列]]：LCS 计数模型（容斥原理）

#### LCS 模型模板
{% fold info @LCS 模型 %}
```cpp
// LCS 模型：最长公共子序列 - O(N * M)
int f_lcs[maxn][maxn];
int get_lcs( int n, int m, string s1, string s2 )
{
    for( int i = 1; i <= n; ++ i )
    {
        for( int j = 1; j <= m; ++ j )
        {
            if( s1[i - 1] == s2[j - 1] ) f_lcs[i][j] = f_lcs[i - 1][j - 1] + 1;
            else f_lcs[i][j] = max( f_lcs[i - 1][j], f_lcs[i][j - 1] );
        }
    }
    return f_lcs[n][m];
}
```
{% endfold %}


## 高维问题

- **高维**：状态存在于二维（或更高维）坐标系中，通常不止 表示移动的 $(x, y)$ 坐标，还有别的限制条件作为状态的扩展。
    
- **相关例题**：
	
	- [[P1544 三倍经验]]：拓展状态 的 线性 DP（分层图思想）
		
	- [[P1006 传纸条]]：网格图上 的 线性 DP（双人同时走）

- **实战案例**：
    
	- [[ABC442F Diagonal Separation 2]]：后缀最值优化

	- [[CF2194E The Turtle Strikes Back]]：前后缀最值优化
    
> **反对角线性质**：网格图中任何左上到右下的路径必过每一条反对角线。