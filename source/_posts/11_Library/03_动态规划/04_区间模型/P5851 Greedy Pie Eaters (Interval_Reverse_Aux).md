---
title: 'P5851 [USACO19DEC] Greedy Pie Eaters P (Interval_Reverse_Aux)'
tags:
  - DP/区间
  - 算法/逆向思维
difficulty: 提高+/省选-
categories:
  - 11_Library
  - 03_动态规划
  - 04_区间模型
abbrlink: 6ba58ea6
date: 2025-11-25 00:00:00
---
# [Luogu-P5851](https://www.luogu.com.cn/problem/P5851) Greedy Pie Eaters P

## 1. 核心逻辑

- **问题本质**: 在长度为 $N$ 的序列上选取若干个带权区间，区间内的“饼”被吃掉。求权值和最大值。注意：若一个位置已被吃掉，覆盖该位置的其他饼不能再选。
    
- **破局转换**:
    
    1. **逆向视角**: 考虑区间 $[l, r]$ 内**最后**被吃掉的位置 $k$。这意味着 $k$ 被某个包含 $k$ 且完全落在 $[l, r]$ 内的饼覆盖，而 $k$ 的左右两侧区间 $[l, k-1]$ 和 $[k+1, r]$ 已经独立处理完成。
        
    2. **辅助数组设计**: 预处理 `g[l][r][k]` 表示在区间 $[l, r]$ 内，所有包含位置 $k$ 的饼的最大权值。
        
        - $g[l][r][k] = \max(g[l][r][k], g[l+1][r][k], g[l][r-1][k])$。
            
    3. **转移方程**:
        
        $$f[l][r] = \max_{k=l}^{r} \{ f[l][k-1] + f[k+1][r] + g[l][r][k] \}$$

## 2. 代码实现

{% fold info @AcCode %}

```
#include <bits/stdc++.h>
using namespace std;

const int maxn = 305;
int n, m, g[ maxn ][ maxn ][ maxn ], f[ maxn ][ maxn ];

int main( ) 
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> m;
    for( int i = 1; i <= m; ++ i ) 
    {
        int w, l, r;
        cin >> w >> l >> r;
        for( int k = l; k <= r; ++ k ) g[ l ][ r ][ k ] = max( g[ l ][ r ][ k ], w );
    }

    // 1. 预处理 g: 扩展区间范围使 g[l][r][k] 包含所有属于 [l, r] 且覆盖 k 的饼
    for( int len = 1; len <= n; ++ len ) 
    {
        for( int l = 1; l + len - 1 <= n; ++ l ) 
        {
            int r = l + len - 1;
            for( int k = l; k <= r; ++ k ) 
            {
                if( l < r ) 
                {
                    if( l < k ) g[ l ][ r ][ k ] = max( g[ l ][ r ][ k ], g[ l + 1 ][ r ][ k ] );
                    if( r > k ) g[ l ][ r ][ k ] = max( g[ l ][ r ][ k ], g[ l ][ r - 1 ][ k ] );
                }
            }
        }
    }

    // 2. 区间 DP
    for( int len = 1; len <= n; ++ len ) 
    {
        for( int l = 1; l + len - 1 <= n; ++ l ) 
        {
            int r = l + len - 1;
            for( int k = l; k <= r; ++ k ) 
            {
                f[ l ][ r ] = max( f[ l ][ r ], f[ l ][ k - 1 ] + f[ k + 1 ][ r ] + g[ l ][ r ][ k ] );
            }
        }
    }

    cout << f[ 1 ][ n ] << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N^3)$，主要开销在于三维辅助数组的遍历与转移。
    
- **关键点**: 理解“最后吃掉的饼”如何充当区间分割的纽带。辅助数组 $g$ 的预处理顺序必须严格从小区间到大区间。