---
title: '[Leaf] [ABC439E] Kite'
tags:
  - DP/线性
  - 难度/P3
categories:
  - 220_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: 2d2f3a03
date: 2026-01-05 00:00:00
---
# [ABC439E - Kite](https://atcoder.jp/contests/abc439/tasks/abc439_e "null")

## 1. 核心逻辑

- **模型抽象**: 给定二维点对 $(a_i, b_i)$，选择最大数量的子集，使得子集中不存在任何两个点满足包含关系（即 $a_i \le a_j$ 且 $b_i \ge b_j$）。
    
- **破局路径**:
    
    1. **维度缩减**: 首先对第一维 $a$ 进行升序排列。若 $a$ 相同，则对第二维 $b$ 进行降序排列。
        
    2. **不变量转换**: 在上述排序规则下，若 $i < j$，已知 $a_i \le a_j$。若要避免包含关系，必须满足 $b_i < b_j$。
        
    3. **LIS 映射**: 题目转化为在排序后的 $b$ 序列中寻找“最长上升子序列”。
        
- **细节处理**: $b$ 降序排序是关键细节，它保证了在 $a$ 相同的区间内，我们无法通过 LIS 选择多于一个的风筝，从而符合“不包含”的逻辑约束。

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair< int, int >;

const int maxn = 2e5 + 50;

struct Kite {
    int a, b;
    bool operator < ( const Kite &other )  {
        if( a != other.a )
            return a < other.a;
        return b > other.b;
    }
} kites[maxn];

int f[maxn];
int n;

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );
    
    cin >> n;
    
    for( int i = 1; i <= n; ++ i )
    {
        cin >> kites[i].a >> kites[i].b;
    }

    sort( kites + 1, kites + n + 1 );

    vector< int > vec;
    for( int i = 1; i <= n; ++ i )
    {
        if( vec.empty( ) || kites[i].b > vec.back( ) )
        {
            vec.push_back( kites[i].b );
        }
        else
        {
            auto it = lower_bound( vec.begin( ), vec.end( ), kites[i].b );
            *it = kites[i].b;
        }
    }
    
    cout << vec.size( ) << endl;
    
    return 0;
}
```

{% endfold %}

## 3. 复盘

- **复杂度**: $O(N \log N)$，排序与二分查找。
    
- **灵感反思**: 二维偏序问题的经典套路——通过排序锁定一个维度的顺序，再利用数据结构处理剩余维度。本题中“不包含”关系的转化是关键点。
    
- **关联知识点**: [[线性DP]]