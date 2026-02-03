---
title: '[Leaf] [TZ9547] Silly Xiao Zhang'
tags:
  - DP/线性
  - 数据结构/单调栈
  - 难度/P3
categories:
  - 220_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: 79b83310
date: 2026-01-07 00:00:00
---

# [TZ9547 - Silly Xiao Zhang](https://www.tzcoder.cn/acmhome/problemdetail.do?method=showdetail&id=9547)

## 1. 题意梗概

给定序列 $a$，构造单增序列。若 $a_i > top$ 则强制入栈；若 $a_i < top$ 可选入栈或丢弃。求不同序列方案数。

## 2. 逻辑推导

### 2.1 题意抽象

我们想想，每个元素入栈的限制条件。如果当前栈顶是 $a_i$，设下一个比它大的数是 $a_{next[i]}$。

那么，在 $(i,next[i])$ 这个区间，我们可以选择加入元素，否则就必须把 $a_{next[i]}$ 加入序列。

- 如果 $j < nxt[i]$，说明 $a_j < a_i$，你可以选也可以不选。一旦选了，$a_j$ 变成新栈顶。
		
- 如果你一直不选，到了 $nxt[i]$，因为 $a_{nxt[i]} > a_i$，你**必须**选它作为新栈顶。
		
如此，我们就明确了这题的基本逻辑。

**定义**：`dp[i]` 表示以 $a_i$ 为结尾的合法序列方案数。 

**状态转移**: $dp[i] = \sum_{j=i+1}^{nxt[i]} dp[j]$

### 2.2 细节优化

**单调栈**: $O(N)$ 预处理每个元素右侧第一个比它大的位置 $nxt[i]$。
	
- **避坑**: 栈内应存储下标而非数值，防止 `a[stk.top()]` 发生数组越界。

**区间和优化**: 由于转移是连续区间 $(i, nxt[i]]$，利用后缀和数组 `sum` 将 $O(N^2)$ 的转移压至 $O(N)$。

至此，本题分析完毕，可以开始写代码了。

## 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 5e5 + 10;
const int inf = 0x3f3f3f3f;
const int mod = 998244353;

int n, cnt;
int a[maxn], nxt[maxn];
int dp[maxn], sum[maxn];

void solve( )
{
    cin >> n;

    a[n + 1] = inf;
    for( int i = 1; i <= n; ++ i )
    {
        cin >> a[i];
    }

    // 单调栈预处理右侧第一个更大元素位置
    stack<int> stk;
    stk.push( n + 1 ); 
    for( int i = n; i >= 1; -- i )
    {
        while( a[stk.top( )] < a[i] ) stk.pop( );
        nxt[i] = stk.top( );
        stk.push( i );
    }

    // 初始化边界
    dp[n + 1] = 1;
    sum[n + 1] = 1;
    nxt[0] = 1; 

    // 线性 DP + 后缀和优化
    for( int i = n; i >= 0; -- i )
    {
        // 转移区间 (i, nxt[i]]
        dp[i] = ( sum[i + 1] - sum[nxt[i] + 1] + mod ) % mod;
        sum[i] = ( dp[i] + sum[i + 1] ) % mod;
    }

    // 这里包含空序列方案，题目要求统计本质不同的结果，空序列也算一种
    cout << dp[0] % mod << endl;
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );
    cout.tie( 0 );

    solve( );
    return 0;
}
```

{% endfold %}

## 4. 复盘

- **复杂度**: $O(N)$。
    
- **认知补丁**:
    
    - **空序列判别**: 除非题目明确说明“非空子序列”，否则 $dp[0]$ 推导出的全路径数（包含不选任何元素到达终点的路径）即为答案。
        
    - **下标**: 再次强调单调栈存 Index 避开数值越界，以及 $nxt[0]=1$ 的初始化逻辑。
        
- **关联知识点**: [[线性DP]]