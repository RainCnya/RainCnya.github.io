---
title: 线性状态 DP
tags:
  - DP/线性
  - 难度/P4
date: 2026-04-23 00:00:00
---


# 一、单序列问题

## Ex.1 [P1020 导弹拦截](https://www.luogu.com.cn/problem/P1020)

### 1. 题意

这是很经典的一道 “子序列相关” 模型，给出一组序列，问 最长不上升 子序列的长度最长为多少？至少可以划分多少组？

> $n \leq 5e4$

### 2. 思路

设计状态 $f[i]$ 表示之考虑前 $i$ 个数，并且以第 $i$ 个数为结尾的子序列的长度。

接着是状态的转移，只需要考虑把第 $i$ 个数接在某个已知序列后面，这个序列必然是以 $a_{1}$ 到 $a_{i-1}$ 中大于 $a_{i}$ 的某一个数结尾的，而且越长越好，也就是：

$$
f[i] = max_{j < i, a[j] > a[i]} (f[j]) + 1
$$

那这就是 $O(N^2)$ 的转移，不过考虑到数据规模，该复杂度会 TLE，考虑优化，可以采用 $O( N \log N)$ 的贪心做法。

#### Dilworth 定理



### 3. 代码实现

{% fold info @AcCode %}
```cpp

```
{% endfold %}


- **相关例题**：
		
	- [[P1020 导弹拦截]] ：子序列提取 -> 经典 LIS 模型 / Diliworth定理
	- [[P1725 琪露诺]]：子序列提取 -> 单调队列优化
	- [[P4933 大师]] ：子序列提取变体 + 计数类  
	- [[P1874 快速求和]]：子段划分 + 背包模型

#### LIS 模型模板

{% fold info @LIS 模型 %}
```cpp
// LIS 模型：最长上升子序列 - O(N^2)
// 逻辑：f[i] 表示以 a[i] 结尾的最长上升子序列长度。
void LIS( ) {
    for( int i = 1; i <= n; ++ i ) {
        f[i] = 1;
        for( int j = 1; j <= n; ++ j ) {
            if( a[j] < a[i] ) f[i] = max( f[i], f[j] + 1 );
        }
    }
}

// LIS 模型：最长上升子序列 - O(N log N)
// lower_bound: >=, 对应严格上升 LIS
// upper_bound: >, 对应不下降序列
// STL vector 写法 
int LIS( vector<int> &nums ) {
    vector<int> g;
    for( int x : nums ) {
        auto it = lower_bound( g.begin( ), g.end( ), x );
        if( it == g.end( ) ) g.push_back( x );
        else *it = x;
    }
    return g.size( );
}
```
{% endfold %}