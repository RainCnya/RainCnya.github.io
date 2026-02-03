---
title: 'P2467 [SDOI2010] 地精部落 (Seq_Wiggle_Permutation)'
tags:
  - DP/计数
  - 算法/对称性
difficulty: 提高+/省选-
categories:
  - 220_Library
  - 30_动态规划
  - 34_进阶模型
abbrlink: 64a7bd0f
date: 2025-11-24 00:00:00
---
# [Luogu-P2467](https://www.luogu.com.cn/problem/P2467) 地精部落

## ## 1. 核心逻辑

- **问题本质**: 求长度为 $N$ 的抖动序列方案数（先大后小或先小后大）。
    
- **破局转换**:
    
    1. **对称性**: 先升后降与先降后升的方案数相等。最终答案为单向方案 $\times 2$。
        
    2. **状态压缩**: $f[ i ][ j ]$ 表示用 $i$ 个数的排列，第一个数为 $j$ 且作为“山峰”（大于第二位）的方案数。
        
    3. **转移推导**:
        
        - 若 $j$ 选了，剩余 $i-1$ 个数重新标号。
            
        - 如果 $j$ 不是第一位山峰，则方案由 $f[ i ][ j-1 ]$ 贡献。
            
        - 如果 $j$ 是第一位山峰，则第二位必须是山谷。由于对称性，以 $k$ 开头的 $i-1$ 位山谷排列数 $\iff$ 以 $(i-1)-k+1$ 开头的 $i-1$ 位山峰排列数。
            
    4. **最终方程**: $f[ i ][ j ] = f[ i ][ j-1 ] + f[ i-1 ][ i-j+1 ]$。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

int n, p, f[ 2 ][ 4205 ];

int main( ) 
{
    cin >> n >> p;

    f[ 0 ][ 2 ] = 1; // i=2 的基础态
    for( int i = 3; i <= n; ++ i ) 
    {
        int cur = i & 1, pre = ( i - 1 ) & 1;
        for( int j = 2; j <= i; ++ j ) 
        {
            f[ cur ][ j ] = ( f[ cur ][ j - 1 ] + f[ pre ][ i - j + 1 ] ) % p;
        }
    }

    int ans = 0;
    for( int j = 2; j <= n; ++ j ) ans = ( ans + f[ n & 1 ][ j ] ) % p;
    cout << ( ans * 2 ) % p << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N^2)$。
    
- **关键点**: 理解“值域映射”下的状态等价。滚动数组优化物理空间至 $O(N)$。