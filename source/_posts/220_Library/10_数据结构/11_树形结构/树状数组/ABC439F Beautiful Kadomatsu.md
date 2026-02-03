---
title: '[Leaf] [ABC439F] Beautiful Kadomatsu'
tags:
  - DP/计数
  - 数据结构/树状数组
  - 难度/P3
categories:
  - 220_Library
  - 10_数据结构
  - 11_树形结构
abbrlink: '2785680'
date: 2026-01-05 00:00:00
---
    
# [ABC439F - Beautiful Kadomatsu](https://atcoder.jp/contests/abc439/tasks/abc439_f "null")

## 1. 核心逻辑

- **模型抽象**: 给定排列 $P$，求满足 $x > y$ 的子序列数量。
		
	- 其中 $x$ 为峰值（$a_{i-1} < a_i > a_{i+1}$）数量，$y$ 为谷值（$a_{i-1} > a_i < a_{i+1}$）数量。
	
- **逻辑支点 (核心推导)**:
    
    1. **趋势交错性**: 在任何序列中，波峰与波谷必然交错出现。

		- U（Up），D（Down），P（Peak），V（valley）。
        - 若趋势为 $U$ 和 $D$ ，则极值点序列必然遵循 $P \to V \to P \to V \dots$ 的规律。
            
    2. $x$ **与** $y$ **的关系**：

		- $P \dots P \iff x = y + 1$
		- $P \dots V \iff x = y$
		- $V \dots P \iff x = y$
		- $V \dots V \iff x = y - 1$ 
		
		- **结论**：只有 $P \dots P$ 情况下 $x > y$ 成立。
            
    3. **不变量判定**:
        
        - 以 $P$ 开始 $\iff$ 第一个趋势必为 $U$ $\iff$ $a_1 < a_2$  。
		- 以 $P$ 结束 $\iff$ 最后一个趋势必为 $D$ $\iff$ $a_{k-1} > a_k$ 。
            
        - **结论**: $x > y \iff (s_1 < s_2) \land (s_{k-1} > s_k)$。
            

## 2. 逻辑演算与证明

### 2.1 原始公式推导：

根据结论，我们需要锁定子序列中 “第一段上升” 的终点 $i$ ，和 “最后一段下降” 的起点 $j$ 。

- $L(i)$：位置 $i$ 左侧比它小的元素个数。
    
- $R(j)$：位置 $j$ 右侧比它小的元素个数。
    
- **中间项**: 当 $i < j$ 时，下标在 $(i, j)$ 之间的元素共 $j - i - 1$ 个。

- 因为中间部分选或不选不影响 $x / y$ 的 关系，所以方案数为 $2^{j-i-1}$。

- 所以原始公式如下：如果暴力计算，显然是 $O(N^2)$ 的复杂度。
$$Ans = \sum_{1 < i \le j < N} (L_i \times R_j) \times 2^{j-i-1}$$
### 2.2 线性降维推导：

注意到，题目的 $n \le 3e5$ ，因此 $O(N^2)$ 的复杂度肯定是不行的。我们考虑推公式降维。

我们固定 $j$ 作为“下降段起点”，寻找所有可能的 $(i, j)$。

$$Ans = \sum_{j=1}^{N} (R_j \times \sum_{i=1}^{j} (L_i \times 2^{j-i-1}) )$$
$$ Ans = \sum_{j=1}^{N}(R_j * ( L_j + \sum_{i=1}^{j-1}( L_i \times 2^{j-i-1} ) ) )$$
注意到：若令 $S_j = \sum_{i=1}{j}(L_i \times 2^{j-i-1})$

$$ S_2 = L_1 \times 2^0 / S_3 = L_1 \times 2^1 + L_2 \times 2^0$$
由此大胆推测： $S_j = S_{j-1} \times 2 + L_{j-1}$

$$Ans = \sum_{j=1}^{N}(R_j \times S_j) / S_j = S_{j-1} \times 2 | L_{j-1}$$
至此：成功完成降维，最终是一个线性推导公式，复杂度为 $O(N)$，足以应付这一题。
## 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 3e5 + 50;
const int mod = 998244353;

int a[maxn], c[maxn];
ll l[maxn], r[maxn];
int n;

int lowbit( int x ) { return x & -x; }

void update( int x, int val )
{
    for( ; x <= n; x += lowbit( x ) ) c[x] += val;
}

ll query( int x )
{
    ll res = 0;
    for( ; x; x -= lowbit( x ) ) res += c[x];
    return res;
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );
    
    cin >> n;
    for( int i = 1; i <= n; ++ i ) cin >> a[i];

    // 预处理左侧比 a[i] 小的元素个数 L(i)
    for( int i = 1; i <= n; ++ i )
    {
        l[i] = query( a[i] - 1 );
        update( a[i], 1 );
    }

    // 预处理右侧比 a[i] 小的元素个数 R(i)
    memset( c, 0, sizeof( c ) );
    for( int i = n; i >= 1; -- i )
    {
        r[i] = query( a[i] - 1 );
        update( a[i], 1 );
    }

    ll ans = 0, sum = 0;
    for( int l_idx = 1; l_idx <= n; ++ l_idx )
    {
        // cur = S(l) + L(l)
        // sum 维护的是 S(l)，即所有 (i, j) 且 j < l 的组合贡献
        ll cur = ( sum + l[l_idx] ) % mod;
        
        // 贡献到最终答案：(始于上升，终于下降)
        ans = ( ans + cur * r[l_idx] ) % mod;
        
        // 递推 S(l+1) = 2 * S(l) + L(l)
        sum = ( sum * 2 + l[l_idx] ) % mod;
    }

    cout << ans % mod << '\n';
    return 0;
}
```

{% endfold %}

## 4. 复盘

- **复杂度**: $O(N \log N)$，瓶颈在于树状数组预处理 $L_i, R_j$。
    
- **认知补丁**:
    
    - 子序列问题如果看起来像“波浪”，优先考虑**极值点交错性**。
        
    - $2^{j-i-1}$ 这种系数是典型的“中间随便选”信号，通常可以配合线性递推优化掉一个 $\sum$。
        
- **关联母题**: [[Note] 树状数组], [[Note] 线性DP优化]]]