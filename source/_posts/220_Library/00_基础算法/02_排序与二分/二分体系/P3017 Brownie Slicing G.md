---
title: '[Leaf] [P3017] [USACO11MAR] Brownie Slicing G'
tags:
  - 策略/二分答案
  - 算法/前缀差分
  - 策略/贪心
  - 难度/P3
categories:
  - 220_Library
  - 00_基础算法
  - 02_排序与二分
abbrlink: 31dd7f12
date: 2025-10-31 00:00:00
---
# [Luogu-P3017](https://www.luogu.com.cn/problem/P3017) Brownie Slicing G

## 1. 核心逻辑

- **模型抽象**: 二维网格划分，最大化最小块权值和。
    
- **破局路径**:
    
    1. **二分答案**: 最小值最大化问题，锁定最小可能面积为 $mid$。
        
    2. **维度坍缩**:
        
        - **外层（行）**: 贪心行切分。逐行扫描，当前行块能满足列向切分约束时，立即切断，为下方行留出更多资源。
            
        - **内层（列）**: 在确定的行块高度内，执行一维贪心竖切。
            
    3. **判定核心**: 判定在当前 $mid$ 下，能否横切 $\ge A+1$ 次且每块横向切片能纵切 $\ge B+1$ 次。
        
    4. **二维前缀和**: 预处理 $sum[i][j]$，实现 $O(1)$ 子矩阵权值提取。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
// P3017 Brownie Slicing G
// Standard: Airy Logic v3.2 (Compact Index)

#include <bits/stdc++.h>
using namespace std;

const int maxn = 505;
int r, c, a, b;
int sum[maxn][maxn];

bool check( int mid )
{
    int row_cnt = 0, last_row = 0;
    for( int i = 1; i <= r; ++ i )
    {
        int col_cnt = 0, last_col = 0;
        // 尝试在该行切断，看当前行块是否支持 B 次竖切
        for( int j = 1; j <= c; ++ j )
        {
            int area = sum[i][j] - sum[last_r][j] - sum[i][last_c] + sum[last_r][last_c];
            
            if( area >= mid )
            {
                ++ col_cnt;
                last_col = j;
            }
        }
        
        if( col_cnt >= b + 1 )
        {
            ++ row_cnt;
            last_row = i;
        }
    }
    return row_cnt >= a + 1;
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> r >> c >> a >> b;
    for( int i = 1; i <= r; ++ i )
    {
        for( int j = 1; j <= c; ++ j )
        {
            int x; cin >> x;
            sum[ i ][ j ] = sum[ i - 1 ][ j ] + sum[ i ][ j - 1 ] - sum[ i - 1 ][ j - 1 ] + x;
        }
    }

    int L = 0, R = sum[ r ][ c ], ans = 0;
    while( L <= R )
    {
        int mid = L + ( ( R - L ) >> 1 );
        if( check( mid ) )
        {
            ans = mid;
            L = mid + 1;
        }
        else
        {
            R = mid - 1;
        }
    }

    cout << ans << "\n";
    return 0;
}
```

{% endfold %}

## 3. 复盘

- **复杂度**: $O(R \cdot C \cdot \log(\text{TotalSum}))$。
    
- **不变量**: 贪心逻辑“刚好满足就切”是保证全局可行解空间最大的最优策略。

- **关联知识点**：[[二分体系]]