---
title: 'P1063 [NOIP2006] 能量项链 (Interval_Ring_Merge)'
tags:
  - DP/区间
  - 算法/环形处理
difficulty: 普及+/提高
categories:
  - 11_Library
  - 03_动态规划
  - 04_区间模型
abbrlink: 8102430d
date: 2025-11-25 00:00:00
---
# [Luogu-P1063](https://www.luogu.com.cn/problem/P1063) 能量项链

## ## 1. 核心逻辑

- **问题本质**: 珠子 $i$ 的参数为 $(a_i, a_{i+1})$，合并珠子 $i, j$ 产生能量 $a_i \cdot a_{mid+1} \cdot a_{j+1}$。求释放能量的最大值。
    
- **破局转换**:
    
    1. **模型归约**: 本质是“矩阵链乘”问题的变体。每一个区间 $[l, r]$ 最终会坍缩为一颗虚拟珠子，其特征由 $a_l$ 和 $a_{r+1}$ 描述。
        
    2. **破环成链**: 同石子合并，复制一份序列。
        
    3. **转移**: 枚举最后一次合并的断点 $k$。
        
        $$f[l][r] = \max_{k=l}^{r-1} \{ f[l][k] + f[k+1][r] + a[l] \cdot a[k+1] \cdot a[r+1] \}$$

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxn = 205;
int a[ maxn ], f[ maxn ][ maxn ], n;

int main( ) 
{
    cin >> n;
    for( int i = 1; i <= n; ++ i ) 
    {
        cin >> a[ i ];
        a[ i + n ] = a[ i ];
    }

    for( int len = 2; len <= n; ++ len ) 
    {
        for( int l = 1; l + len - 1 <= 2 * n; ++ l ) 
        {
            int r = l + len - 1;
            for( int k = l; k < r; ++ k ) 
            {
                f[ l ][ r ] = max( f[ l ][ r ], f[ l ][ k ] + f[ k + 1 ][ r ] + a[ l ] * a[ k + 1 ] * a[ r + 1 ] );
            }
        }
    }

    int ans = 0;
    for( int i = 1; i <= n; ++ i ) ans = max( ans, f[ i ][ i + n - 1 ] );
    cout << ans << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N^3)$。
    
- **关键点**: 区分“合并位置”与“珠子索引”。项链的尾标记是 $a[r+1]$ 而非 $a[r]$，这是解决此类问题的物理边界关键点。