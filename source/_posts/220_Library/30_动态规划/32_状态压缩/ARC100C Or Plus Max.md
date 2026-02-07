---
title: '[Leaf] [ARC100C] Or Plus Max'
tags:
  - DP/状压
  - 数学/位运算
  - 难度/P4
categories:
  - 220_Library
  - 30_动态规划
  - 32_状态压缩
abbrlink: 121e91e
date: 2025-11-1
---
# [ARC100C - Or Plus Max](https://www.luogu.com.cn/problem/AT_arc100_c)

## 1. 核心逻辑

- **问题本质**: 对于每个 $K \in [1, 2^N-1]$，求 $\max \{ A[i] + A[j] \}$，满足 $i \lor j \le K$（即 $i, j$ 都是 $K$ 的子集）。
    
- **破局转换**:
    
    1. **子集化**: $i \lor j \le K$ 在位运算意义下意味着 $i$ 是 $K$ 的子集，且 $j$ 是 $K$ 的子集。
        
    2. **目标坍缩**: 对每个 $mask$，我们需要找到其所有子集 $\{sub \subseteq mask\}$ 中最大的两个数 $v_1, v_2$。
        
    3. **SOS DP**: 使用 Sum Over Subsets (高维前缀和) 技巧。
        
        - 定义 $f[mask]$ 记录该掩码下子集的 Top2 值。
            
        - 按位枚举，将 $f[mask \setminus \{bit\}]$ 的信息合并至 $f[mask]$。
            

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

struct node 
{
    int fmax, smax;
    node( ) : fmax( -1e9 ), smax( -1e9 ) { }
    void update( int v ) 
    {
        if( v > fmax ) smax = fmax, fmax = v;
        else if( v > smax ) smax = v;
    }
} f[ 1 << 19 ];

void merge( node &a, const node &b ) 
{
    a.update( b.fmax );
    a.update( b.smax );
}

int main( ) 
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    int n; cin >> n;
    for( int i = 0; i < ( 1 << n ); ++ i ) 
    {
        int x; cin >> x;
        f[ i ].update( x );
    }

    // SOS DP: 按位转移
    for( int j = 0; j < n; ++ j ) 
    {
        for( int i = 0; i < ( 1 << n ); ++ i ) 
        {
            if( ( i >> j ) & 1 ) merge( f[ i ], f[ i ^ ( 1 << j ) ] );
        }
    }

    int current_max = 0;
    for( int i = 1; i < ( 1 << n ); ++ i ) 
    {
        current_max = max( current_max, f[ i ].fmax + f[ i ].smax );
        cout << current_max << "\n";
    }
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N \cdot 2^N)$。
    
- **关键点**: 理解 $i \lor j \le K$ 与子集关系的等价性。SOS DP 的核心在于 Top2 信息的无损合并。

- **相关知识点**：[[SOSDP]]