---
title: P1719 最大加权矩形 (Grid_2D_to_1D_MaxSub)
tags:
  - DP/线性
  - 数学/矩阵压缩
difficulty: 普及/提高-
categories:
  - 10_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: '62485430'
date: 2025-11-02 00:00:00
---
# [Luogu-P1719](https://www.luogu.com.cn/problem/P1719) 最大加权矩形

## 1. 核心逻辑

- **问题本质**: 在二维 $N \times N$ 矩阵中寻找权值和最大的子矩形。
    
- **破局转换**:
    
    1. **降维思想**: 直接枚举四元组 $(x_1, y_1, x_2, y_2)$ 复杂度为 $O(N^4)$。若能固定上下边界，则左右边界的选择等价于一维子段和。
        
    2. **模型坍缩**:
        
        - 枚举矩形的**起始行** $i$ 与**终止行** $j$。
            
        - 将 $i \sim j$ 行中每一列的元素进行纵向累加，得到一个一维数组 $B$（其中 $B[k] = \sum_{r=i}^{j} a[r][k]$）。
            
        - 在数组 $B$ 上执行标准 **Kadane 算法**（最大子段和），结果即为固定高度下的最优矩形。
            
    3. **性能**: 复杂度由 $O(N^4)$ 优化至 $O(N^3)$。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxn = 125;
const int inf = 0x3f3f3f3f;
int a[ maxn ][ maxn ], col_sum[ maxn ][ maxn ], n;

int main( ) 
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n;
    for( int i = 1; i <= n; ++ i ) 
    {
        for( int j = 1; j <= n; ++ j ) 
        {
            cin >> a[ i ][ j ];
            // 预处理每一列的前缀和，方便 $O(1)$ 压缩维度
            col_sum[ i ][ j ] = col_sum[ i - 1 ][ j ] + a[ i ][ j ];
        }
    }

    int max_ans = -inf;

    // 枚举上下界 i, j
    for( int i = 1; i <= n; ++ i ) 
    {
        for( int j = i; j <= n; ++ j ) 
        {
            // 在压缩后的数组上跑 Kadane
            int current_sum = 0;
            for( int k = 1; k <= n; ++ k ) 
            {
                int val = col_sum[ j ][ k ] - col_sum[ i - 1 ][ k ];
                current_sum += val;
                max_ans = max( max_ans, current_sum );
                if( current_sum < 0 ) current_sum = 0;
            }
        }
    }

    cout << max_ans << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N^3)$ 时间，$O(N^2)$ 空间。
    
- **关键点**: 理解“纵向求和 + 横向 DP”的降维技巧。这是处理二维区间问题的标准范式。