---
title: 'P2627 [USACO11OPEN] Mowing the Lawn G (MQ_DP_Consecutive_Limit)'
tags:
  - DP/优化
  - 单调性/单调队列
difficulty: 普及+/提高
date: 2025-11-7
categories:
  - 11_Library
  - 03_动态规划
  - 05_优化模型
abbrlink: '628847e6'
---
# [Luogu-P2627](https://www.luogu.com.cn/problem/P2627) 修剪草坪

## 1. 核心逻辑

- **问题本质**: 同 P2034。选若干只奶牛，要求连续选的数量不得超过 $K$。
    
- **破局转换**:
    
    - 本题与选择数字模型的唯一区别在于其数值规模和背景。核心逻辑依然是：**寻找上一个空闲时刻** $j$**。**
        
    - 状态方程：$f[ i ]$ 为处理到第 $i$ 只奶牛的最优解。
        
    - 若第 $i$ 只选，则必须由 $f[ j - 1 ] + \text{sum}(j+1, i)$ 转移，其中 $j \in [i-K, i]$ 是那个不修剪的断点。
        
    - 整理得 $f[ i ] = S[ i ] + \max \{ f[ j - 1 ] - S[ j ] \}$。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
const int maxn = 1e5 + 50;
ll s[ maxn ], f[ maxn ];
int n, k;

int main( ) 
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> k;
    for( int i = 1; i <= n; ++ i ) 
    {
        ll x; cin >> x;
        s[ i ] = s[ i - 1 ] + x;
    }

    deque< int > q;
    q.push_back( 0 );

    for( int i = 1; i <= n; ++ i ) 
    {
        // 维持窗口 [i-k, i]
        while( ! q.empty( ) && q.front( ) < i - k ) q.pop_front( );
        
        // 这里的 j 是断点位置，计算 f[j-1] - s[j]
        // 由于循环 i 从 1 开始，需处理 j=0 的情况
        auto calc = [ & ]( int j ) { return ( j == 0 ? 0 : f[ j - 1 ] ) - s[ j ]; };

        f[ i ] = s[ i ] + calc( q.front( ) );

        // 维护 f[i-1][0] 的继承逻辑：实际 f[i] 应该包含“当前不选”的情况
        f[ i ] = max( f[ i ], f[ i - 1 ] );

        // 入队当前 i 作为未来可能的断点
        while( ! q.empty( ) && calc( q.back( ) ) <= calc( i ) ) q.pop_back( );
        q.push_back( i );
    }

    cout << f[ n ] << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N)$。
    
- **关键点**: 本实现采用了一维简化版逻辑，通过 `f[i] = max(f[i], f[i-1])` 自动处理了“当前位不选”的最优继承。