---
title: '[Leaf] [P2519] problem a'
tags:
  - DP/线性
  - 单调性/二分
  - 难度/P2/省选-
categories:
  - 10_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: 31829f80
date: 2025-11-13
---
# [Luogu-P2519](https://www.luogu.com.cn/problem/P2519) problem a

## 1. 核心逻辑

- **问题本质**: 确定最多的说真话人数，使得所有人的排名信息不产生物理冲突。
    
- **破局转换**:
    
    1. **排名映射**: 若某人说“$a$ 个人比我高，$b$ 个人比我矮”，则其可能的排名区间为 $[a + 1, N - b]$。
        
    2. **冲突剔除**:
        
        - 若 $a + b \ge N$，该说法物理不可能，直接剔除。
            
        - 相同区间 $[L, R]$ 的说真话人数上限为 $R - L + 1$。
            
    3. **模型坍缩**: 统计每个合法区间出现的频次，并将其权值设定为 $v = \min(\text{count}, R - L + 1)$。
        
    4. **求解**: 问题转化为“在数轴上选取若干互不重叠的加权区间，使权值总和最大”。

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxn = 1e5 + 50;
int n, f[ maxn ];
map< pair< int, int >, int > counts;
vector< pair< int, int > > intervals[ maxn ];

int main( ) 
{
    cin >> n;
    for( int i = 1; i <= n; ++ i ) 
    {
        int a, b;
        cin >> a >> b;
        if( a + b < n ) 
        {
            int l = a + 1, r = n - b;
            counts[ { l, r } ] ++;
        }
    }

    for( auto const& [ range, cnt ] : counts ) 
    {
        int l = range.first, r = range.second;
        intervals[ r ].push_back( { l, min( cnt, r - l + 1 ) } );
    }

    for( int i = 1; i <= n; ++ i ) 
    {
        f[ i ] = f[ i - 1 ];
        for( auto &it : intervals[ i ] ) 
        {
            f[ i ] = max( f[ i ], f[ it.first - 1 ] + it.second );
        }
    }

    cout << n - f[ n ] << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N \log N)$，受限于 `map` 的区间频次统计。
    
- **关键点**: 理解“说真话人数”与“排名区间长度”的制约关系。输出结果为 $N - f[N]$（即最少说谎人数）。