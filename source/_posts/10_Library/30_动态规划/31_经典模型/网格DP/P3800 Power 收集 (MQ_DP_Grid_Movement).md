---
title: P3800 Power收集 (MQ_DP_Grid_Movement)
tags:
  - DP/优化
  - 单调性/单调队列
difficulty: 普及+/提高
categories:
  - 10_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: 2f2b56ea
date: 2025-11-08 00:00:00
---
# [Luogu-P3800](https://www.luogu.com.cn/problem/P3800) Power收集

## ## 1. 核心逻辑

- **问题本质**: 在 $N \times M$ 网格中规划路径，每层可横向移动 $T$ 步，最大化权值和。
    
- **破局转换**:
    
    1. **状态定义**: $f[ i ][ j ]$ 表示到达第 $i$ 行第 $j$ 列时的最大能量。
        
    2. **转移方程**: $f[ i ][ j ] = val[ i ][ j ] + \max_{k \in [j-T, j+T]} \{ f[ i - 1 ][ k ] \}$。
        
    3. **模型坍缩**: 对于当前行 $i$ 的每一个 $j$，其依赖的是上一行 $i-1$ 在 $j$ 附近的滑动窗口最值。
        
    4. **优化**: 每一行计算前，对上一行的 $f$ 值序列跑一次单调队列，实现 $O(M)$ 的状态迁移。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxm = 4005;
int f[ 2 ][ maxm ], val[ maxm ][ maxm ];
int n, m, k, t;

int main( ) 
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> m >> k >> t;
    for( int i = 1; i <= k; ++ i ) 
    {
        int r, c, v;
        cin >> r >> c >> v;
        val[ r ][ c ] = v;
    }

    int cur = 1, pre = 0;
    for( int j = 1; j <= m; ++ j ) f[ pre ][ j ] = val[ 1 ][ j ];

    for( int i = 2; i <= n; ++ i ) 
    {
        deque< int > q;
        // 预填左侧窗口 [1, t]
        for( int j = 1; j <= min( m, t ); ++ j ) 
        {
            while( ! q.empty( ) && f[ pre ][ q.back( ) ] <= f[ pre ][ j ] ) q.pop_back( );
            q.push_back( j );
        }

        for( int j = 1; j <= m; ++ j ) 
        {
            // 进队右边界 j+t
            int right = j + t;
            if( right <= m ) 
            {
                while( ! q.empty( ) && f[ pre ][ q.back( ) ] <= f[ pre ][ right ] ) q.pop_back( );
                q.push_back( right );
            }
            // 出队左边界 < j-t
            while( ! q.empty( ) && q.front( ) < j - t ) q.pop_front( );

            f[ cur ][ j ] = f[ pre ][ q.front( ) ] + val[ i ][ j ];
        }
        swap( cur, pre );
    }

    int ans = 0;
    for( int j = 1; j <= m; ++ j ) ans = max( ans, f[ pre ][ j ] );
    cout << ans << "\n";

    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N \cdot M)$。
    
- **关键点**: 滑动窗口的边界初始化。由于起始位置 $(i, j)$ 可能在列边界，窗口需要动态调整。