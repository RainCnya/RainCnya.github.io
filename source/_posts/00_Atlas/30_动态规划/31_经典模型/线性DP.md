---
title: '[Note] 线性DP'
tags:
  - DP/线性
  - 难度/P2/提高
categories:
  - 00_Atlas
  - 30_动态规划
  - 31_经典模型
abbrlink: 63c36af9
date: 2026-01-20 00:00:00
---
# [L4] 线性DP

## 1. 生态位

- **识别**:
    
    1. **拓扑序**: 序列索引下标自然就是状态转移方向。
        
    2. **无后效性**: 当前决策仅取决于 $1 \dots i-1$ 的最优子结构。
        
- **地位**: 基础 DP 模型。本质是记忆化搜索，用空间换时间。
    
- **用途**: 解决序列上的**子序列选择**、**排列匹配**、**覆盖划分**等最优化问题。

## 2. 逻辑支点

### 2.1 核心原理

在线性序列中，下标 $i$，自然就是拓扑序，这意味着我们无需显式建图，只需按索引顺序扫描，即可天然满足无后效性。

### 2.2 基础模型

1. **LIS 模型**：最长上升子序列( Longest Increasing Subsequence )
		
	- **基础 $O(N^2)$**: 每个位置 $i$ 都在寻找前缀中最优的接纳者 $j$。
    - **贪心 $O(N \log N)$**: 同样长度的上升序列，结尾元素越小，后续接纳潜力越大。
	
2. **LCS 模型**：最长相同子序列( Longest Common Subsequence )
		
	- 将两序列匹配映射为二维网格决策（匹配、跳过 A、跳过 B）。
	
3. **Dilworth 定理**： 
		
	- 最小链覆盖数 = 最长反链长度。将“集合划分”降维为“序列查找”。
	- 要用最少的单调递增序列覆盖原序列，其数量等于原序列中“最长下降子序列”的长度。
	
4. **多维降维模型**：
		
	- **场景**：二维偏序下的子集选择。
	- 通过排序锁定一维排序，将另一维转化为 LIS 序列处理。

## 3. 实战部署

### 3.1 LIS (最长上升子序列)

{% fold info @LIS 模型 %}
```cpp
// 1. 基础 O(N^2) - 记录前驱方案时常用
void LIS( )
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
// 2. 贪心二分优化 O(N log N) - 仅求长度或大数据量
int LIS( vector<int> &nums ) 
{
	// 找到第一个 >= a[i] 的位置并替换
	// lower_bound: >=, 对应严格上升 LIS
	// upper_bound: >, 对应不下降序列
	
	// STL vector 写法 
    vector<int> g;
    for( int x : nums ) 
    {
        auto it = lower_bound( g.begin( ), g.end( ), x );
        if( it == g.end( ) ) g.push_back(x);
        else *it = x;
    }
    return g.size( );
    
    // 静态数组写法
	int len = 0;
    for( int x : nums )
    {
        int pos = lower_bound( g + 1, g + len + 1, x ) - g;
        f[pos] = val;
        if( pos > len ) len = pos;
    }
    return len;
}
```
{% endfold %}

### 3.2 LCS (最长公共子序列)

{% fold info @LCS 模型 %}

```cpp
// f[i][j] 表示 A 前 i 个与 B 前 j 个的匹配长度
for( int i = 1; i <= n; ++ i )
{
    for( int j = 1; j <= m; ++ j )
    {
        if( a[i] == b[j] ) {
	        f[i][j] = f[i-1][j-1] + 1;  // 匹配
	    } 
	    else 
	    {
			f[i][j] = max( f[i-1][j], f[i][j-1] );    // 错位
		}
    }
}
```

{% endfold %}

## 4. 知识关联

- **实战案例**:
    
    - **对偶转化**: [[P1020 导弹拦截]] —— Dilworth 定理应用典例。
        
    - **多维降维**: [[ABC439E Kite]] —— 二维偏序转化 LIS。
        
    - **路径压缩**: [[P1052 过河]] —— 稀疏 DP 的离散化技巧。
        
    - **计数优化**: [[P2516 最长公共子序列]] —— 计数类 DP 的去重逻辑。
        
    - **转移优化**: [[TZ9547 Silly Xiao Zhang]] —— 单调栈 NGE 约束 + 后缀和优化。
        
- **关联笔记**:
    
    - [[树状数组]]: LIS 的 $O(N \log N)$ 实现同样可以通过权值树状数组实现。
        
    - [[区间 DP]]: 线性序列向内部折叠、对称性转移的进阶模型。