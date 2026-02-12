---
title: P1714 切蛋糕 (MQ_DP_PrefixSum)
tags:
  - DP/优化
  - 算法/前缀差分
difficulty: 普及+/提高
date: 2025-11-7
categories:
  - 220_Library
  - 30_动态规划
  - 33_决策优化
abbrlink: 758c84b3
---
# [Luogu-P1714](https://www.luogu.com.cn/problem/P1714) 切蛋糕

## 1. 核心逻辑

- **问题本质**: 寻找长度不超过 $M$ 的最大子段和。
    
- **破局转换**:
    
    1. **代数变形**: 子段和 $S[ i \dots j ] = \text{sum}[ j ] - \text{sum}[ i - 1 ]$。
        
    2. **极值条件**: 固定右端点 $j$，目标是寻找 $i \in [j-M+1, j]$ 使得 $\text{sum}[ i - 1 ]$ 最小。
        
    3. **优化**: 维护一个长度为 $M$ 的滑动窗口内前缀和的**单调递增队列**。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxn = 5e5 + 50;
int s[ maxn ], n, m;

int main( ) 
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> m;
    for( int i = 1; i <= n; ++ i ) 
    {
        int x; cin >> x;
        s[ i ] = s[ i - 1 ] + x;
    }

    deque< int > q;
    q.push_back( 0 ); // 入队 sum[0]

    int ans = -2e9;
    for( int i = 1; i <= n; ++ i ) 
    {
        // 维持窗口长度 M
        while( ! q.empty( ) && q.front( ) < i - m ) q.pop_front( );
        
        ans = max( ans, s[ i ] - s[ q.front( ) ] );

        // 入队新前缀和，保持递增以求最小值
        while( ! q.empty( ) && s[ q.back( ) ] >= s[ i ] ) q.pop_back( );
        q.push_back( i );
    }

    cout << ans << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N)$。
    
- **关键点**: 不要漏掉 $s[ 0 ]$。单调队列维护的是候选的前缀和最小值，而不是收益最大值。