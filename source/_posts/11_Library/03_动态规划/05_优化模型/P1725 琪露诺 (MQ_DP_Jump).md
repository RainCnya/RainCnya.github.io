---
title: P1725 琪露诺 (MQ_DP_Jump)
tags:
  - DP/优化
  - 单调性/单调队列
difficulty: 普及+/提高
date: 2025-11-7
categories:
  - 11_Library
  - 03_动态规划
  - 05_优化模型
abbrlink: 5efb4c60
---
# [Luogu-P1725](https://www.luogu.com.cn/problem/P1725) 琪露诺

## 1. 核心逻辑

- **问题本质**: 跳跃步长范围 $[L, R]$，求到达终点的最大收益。
    
- **破局转换**:
    
    1. **状态定义**: $f[ i ]$ 为跳到位置 $i$ 时的最大收益。
        
    2. **转移方程**: $f[ i ] = a[ i ] + \max_{j \in [i-R, i-L]} \{ f[ j ] \}$。
        
    3. **同步维护**: 随着 $i$ 自增，可选集合的左界 $i-R$ 与右界 $i-L$ 均单调右移。
        
    4. **优化**: 单调队列维护 $f[ j ]$。注意 $j$ 入队的时刻是其刚刚满足 $j \le i - L$ 的时刻。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxn = 2e5 + 50;
const int inf = 0x3f3f3f3f;
int a[ maxn ], f[ maxn ], n, l, r;

int main( ) 
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> l >> r;
    for( int i = 0; i <= n; ++ i ) cin >> a[ i ];

    memset( f, 128, sizeof( f ) ); // 初始化为负无穷
    f[ 0 ] = 0;

    deque< int > q;
    int ans = -inf;

    for( int i = l; i <= n; ++ i ) 
    {
        // 入队候选点: i-l 刚刚进入窗口
        int candidate = i - l;
        while( ! q.empty( ) && f[ q.back( ) ] <= f[ candidate ] ) q.pop_back( );
        q.push_back( candidate );

        // 剔除过期点: < i-r
        while( ! q.empty( ) && q.front( ) < i - r ) q.pop_front( );

        if( f[ q.front( ) ] != ( int )0x80808080 ) 
        {
            f[ i ] = f[ q.front( ) ] + a[ i ];
        }

        if( i + r > n ) ans = max( ans, f[ i ] );
    }

    cout << ans << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N)$。
    
- **关键点**: $f$ 数组必须处理负值初始化。只有从 $f[ 0 ]$ 出发的路径才是合法的。