---
title: 'P5017 [NOIP 2018] 摆渡车 (MQ_DP_Path_Compression)'
tags:
  - DP/线性
  - 算法/离散化
difficulty: 提高+/省选-
categories:
  - 220_Library
  - 30_动态规划
  - 33_决策优化
abbrlink: a1b39cf5
date: 2025-11-24 00:00:00
---
# [Luogu-P5017](https://www.luogu.com.cn/problem/P5017) 摆渡车

## 1. 核心逻辑

- **问题本质**: 时轴上的任务覆盖最小化代价。发车间隔必须 $\ge m$。
    
- **破局转换**:
    
    1. **状态定义**: $f[ t ]$ 为在时刻 $t$ 发出一班车时的最小等待总时长。
        
    2. **物理剪枝**:
        
        - 转移范围只需考察 $[t-2m, t-m]$，因为间隔超过 $2m$ 一定不如在中间多发一班车。
            
        - **路径压缩**: 若两批人到达时间间隔 $> 2m$，中间多余的时间段不会产生新的决策分支，可直接压缩。
            
    3. **转移方程**: $f[ t ] = \min_{j \in [t-2m, t-m]} \{ f[ j ] + (t \cdot \text{cnt}(j, t) - \text{sum}(j, t)) \}$。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxt = 200000; // 压缩后的时轴范围
int t[ 505 ], cnt[ maxt ], sum[ maxt ], f[ maxt ], n, m;

int main( ) 
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> m;
    for( int i = 1; i <= n; ++ i ) cin >> t[ i ];
    sort( t + 1, t + n + 1 );

    // 时间轴压缩: 消除 > 2m 的无效空白
    int offset = 0, last_t = 0;
    for( int i = 1; i <= n; ++ i ) 
    {
        int diff = t[ i ] - last_t;
        if( diff > 2 * m ) offset += diff - 2 * m;
        last_t = t[ i ];
        t[ i ] -= offset;
    }

    int end_t = t[ n ] + m;
    for( int i = 1; i <= n; ++ i ) 
    {
        cnt[ t[ i ] ] ++;
        sum[ t[ i ] ] += t[ i ];
    }
    for( int i = 1; i <= end_t; ++ i ) 
    {
        cnt[ i ] += cnt[ i - 1 ];
        sum[ i ] += sum[ i - 1 ];
    }

    memset( f, 0x3f, sizeof( f ) );
    f[ 0 ] = 0;

    for( int i = 1; i < end_t; ++ i ) 
    {
        // 剪枝: 若周期内无人到达，直接继承上一状态
        if( i >= m && cnt[ i ] == cnt[ i - m ] ) 
        {
            f[ i ] = f[ i - m ];
            continue;
        }
        for( int j = max( 0, i - 2 * m ); j <= i - m; ++ j ) 
        {
            f[ i ] = min( f[ i ], f[ j ] + i * ( cnt[ i ] - cnt[ j ] ) - ( sum[ i ] - sum[ j ] ) );
        }
    }

    int ans = 1e9;
    for( int i = t[ n ]; i < end_t; ++ i ) ans = min( ans, f[ i ] );
    cout << ans << "\n";

    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N \cdot M)$。
    
- **关键点**: 理解“无效空白”对 DP 决策的影响。时间轴压缩是处理此类稀疏事件问题的通用技巧。