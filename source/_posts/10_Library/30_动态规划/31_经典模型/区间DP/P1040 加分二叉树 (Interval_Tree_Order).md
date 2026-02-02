---
title: 'P1040 [NOIP2003] 加分二叉树 (Interval_Tree_Order)'
tags:
  - DP/区间
  - 树论/遍历
difficulty: 普及+/提高
categories:
  - 10_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: 38f7b3d1
date: 2025-11-24 00:00:00
---
# [Luogu-P1040](https://www.luogu.com.cn/problem/P1040) 加分二叉树

## 1. 核心逻辑

- **问题本质**: 给定中序遍历序列 $1, 2, \dots, N$，寻找一颗加分最高的二叉树。规则：左子树分 $\times$ 右子树分 $+$ 根节点分。
    
- **破局转换**:
    
    1. **遍历映射**: 中序遍历的子树必然对应原序列的一个连续区间 $[l, r]$。
        
    2. **阶段决策**: 枚举 $k \in [l, r]$ 作为当前子树的根。则左子树对应 $[l, k-1]$，右子树对应 $[k+1, r]$。
        
    3. **状态定义**: $f[l][r]$ 表示区间 $[l, r]$ 构成子树的最大得分。
        
    4. **基准特殊性**: 空子树分数为 1；叶子节点分数为其权重。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
const int maxn = 35;
ll a[ maxn ], f[ maxn ][ maxn ];
int root[ maxn ][ maxn ], n;

void print_preorder( int l, int r ) 
{
    if( l > r ) return;
    cout << root[ l ][ r ] << " ";
    print_preorder( l, root[ l ][ r ] - 1 );
    print_preorder( root[ l ][ r ] + 1, r );
}

int main( ) 
{
    cin >> n;
    for( int i = 1; i <= n; ++ i ) cin >> a[ i ];

    // 长度为 1: 分数即权重
    for( int i = 1; i <= n; ++ i ) f[ i ][ i ] = a[ i ], root[ i ][ i ] = i;

    for( int len = 2; len <= n; ++ len ) 
    {
        for( int l = 1; l + len - 1 <= n; ++ l ) 
        {
            int r = l + len - 1;
            for( int k = l; k <= r; ++ k ) 
            {
                ll L = ( k == l ) ? 1 : f[ l ][ k - 1 ];
                ll R = ( k == r ) ? 1 : f[ k + 1 ][ r ];
                ll score = L * R + a[ k ];
                if( score > f[ l ][ r ] ) 
                {
                    f[ l ][ r ] = score;
                    root[ l ][ r ] = k;
                }
            }
        }
    }

    cout << f[ 1 ][ n ] << "\n";
    print_preorder( 1, n );
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N^3)$。
    
- **关键点**: 使用 `root` 数组记录决策，递归输出前序。处理边界时，若子树为空，分数应视为 1 而非 0。