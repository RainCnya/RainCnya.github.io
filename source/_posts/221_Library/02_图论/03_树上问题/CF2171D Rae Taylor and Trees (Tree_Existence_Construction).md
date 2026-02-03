---
title: CF2171D Rae Taylor and Trees (Tree_Existence_Construction)
tags:
  - 策略/构造
  - 算法/性质分析
difficulty: Div.3 D
categories:
  - 221_Library
  - 02_图论
  - 03_树上问题
abbrlink: c64787d4
date: 2025-12-19 00:00:00
---
# [CF2171D](https://codeforces.com/problemset/problem/2171/D) Rae Taylor and Trees (Easy)

## 1. 核心逻辑

- **问题本质**: 给定排列 $P$，判断是否存在一棵树，使得任意边 $(u, v)$ (设 $u < v$) 均满足 $u$ 在 $P$ 中出现的位置早于 $v$。
    
- **核心切入点**:
    
    1. **必要条件分析**: 若树存在，则对于任何一种将点集划分为左右两半的切分，必须存在一条边跨越切口。
        
    2. **数值断层**: 如果在排列的某个前缀 $P[1 \dots i]$ 中，所有的元素都**大于**后缀 $P[i+1 \dots n]$ 中的所有元素（即 $\min(P_{pre}) > \max(P_{suf})$），则：
        
        - 跨越此切口的任何边 $(u, v)$，若 $u$ 先于 $v$ 出现，则必有 $u \in P_{pre}$ 且 $v \in P_{suf}$。
            
        - 此时根据前提条件 $u > v$，这与题目要求的 $u < v$ 产生致命冲突。
            
    3. **逻辑简化**: 检查排列中是否存在任意一个位置，使得其前缀最小值大于后缀最大值。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxn = 2e5 + 50;
int a[ maxn ], pre_min[ maxn ], suf_max[ maxn ];

void solve( )
{
    int n;
    cin >> n;
    for( int i = 1; i <= n; ++ i ) cin >> a[ i ];

    pre_min[ 1 ] = a[ 1 ];
    for( int i = 2; i <= n; ++ i ) pre_min[ i ] = min( pre_min[ i - 1 ], a[ i ] );

    suf_max[ n ] = a[ n ];
    for( int i = n - 1; i >= 1; -- i ) suf_max[ i ] = max( suf_max[ i + 1 ], a[ i ] );

    bool ok = true;
    for( int i = 1; i < n; ++ i )
    {
        // 发现数值断层：左侧全员必然作为大于右侧全员的 u 出现
        if( pre_min[ i ] > suf_max[ i + 1 ] )
        {
            ok = false;
            break;
        }
    }

    if( ok ) cout << "Yes\n";
    else cout << "No\n";
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );
    int t;
    cin >> t;
    while( t -- ) solve( );
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N)$。两次线性扫描。
    
- **关键点**: 理解拓扑序（出现位置）与数值序（$u < v$）之间的竞争关系。该问题通过检测是否存在「逻辑阻断点」来判定全局可行性。