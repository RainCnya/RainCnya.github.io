---
title: 'P1006 [NOIP2008] 传纸条 (Grid_Concurrent_NonOverlap)'
tags:
  - DP/线性
  - 算法/多路并发
difficulty: 普及+/提高
categories:
  - 10_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: 8a9a7c5e
date: 2025-11-23 00:00:00
---
# [Luogu-P1006](https://www.luogu.com.cn/problem/P1006) 传纸条

## 1. 核心逻辑

- **问题本质**: 一来一回两条路径，要求除起点和终点外，路径上的点不得重复。
    
- **破局转换**:
    
    1. **同向化**: 一来一回等价于“两人同时从起点出发去终点”。
        
    2. **互斥逻辑**: 在动态规划中，只需在转移时增加限制：$r_1 \neq r_2$。
        
    3. **隐式优化**: 实际上，如果格子权值均为正数，最大收益路径天然会避开重合（因为分开展能获取更多权值）。但在本题严格定义下，我们通过 $r_1 < r_2$ 的循环顺序，既能去重又能天然保证两人不重合。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

int a[ 55 ][ 55 ], f[ 110 ][ 55 ][ 55 ], n, m;

int main( ) 
{
    cin >> n >> m;
    for( int i = 1; i <= n; ++ i ) 
    {
        for( int j = 1; j <= m; ++ j ) cin >> a[ i ][ j ];
    }

    // k = r + c (步数)
    for( int k = 2; k <= n + m; ++ k ) 
    {
        // 强制 r1 < r2 以规避重合点
        for( int r1 = 1; r1 <= n; ++ r1 ) 
        {
            for( int r2 = r1 + 1; r2 <= n; ++ r2 ) 
            {
                int c1 = k - r1, c2 = k - r2;
                if( c1 < 1 || c1 > m || c2 < 1 || c2 > m ) continue;

                int &res = f[ k ][ r1 ][ r2 ];
                res = max( { f[ k - 1 ][ r1 ][ r2 ], f[ k - 1 ][ r1 - 1 ][ r2 ], f[ k - 1 ][ r1 ][ r2 - 1 ], f[ k - 1 ][ r1 - 1 ][ r2 - 1 ] } );
                res += a[ r1 ][ c1 ] + a[ r2 ][ c2 ];
            }
        }
    }

    // 终点处特殊处理：由于循环限制 r1 < r2，终点 (n, m) 的结果存在于 f[n+m-1][n-1][n] + a[n][m]
    // 或者简单将步数跑到 n+m-1，最后一步手动指向最终点。
    cout << f[ n + m - 1 ][ n - 1 ][ n ] << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O( (N+M) \cdot N^2 )$。
    
- **关键点**: $r_1 < r_2$ 这一循环不等式是保证路径不重叠的物理级约束。