---
title: '[Leaf] [CF2164D] Copy String'
tags:
  - 策略/构造
  - 策略/贪心
  - 难度/P2
categories:
  - 220_Library
  - 00_基础算法
  - 04_贪心与构造
abbrlink: ed8782a8
date: 2026-01-06 00:00:00
---
    
# [CF2164D - Copy String](https://codeforces.com/contest/2164/problem/D)

## 1. 核心逻辑

- **模型抽象**: 

	- 给定变换规则 $s'_i \in \{s_i, s_{i-1}\}$，本质上是字符在单次操作中最多向右移动 1 位。
    
- **破局路径**:
    
    1. **位移转化**: 目标字符串 $t$ 的位置 $j$ 需要字符 $b_j$，该字符必须由 $s$ 中的某个位置 $i$ 贡献。满足 $s_i = b_j$ 且 $i \le j$。
        
    2. **贪心匹配**: 为使总步数最小，对于每个 $j$，应选择满足条件的**最大**索引 $i$。这可以通过从右向左的一次线性扫描完成。
        
    3. **不变量判定**: 单次操作最大位移为 1，故位置 $j$ 就位所需的步数为 $j - i$。全局最小步数即为所有位置位移的最大值 $K = \max \{j - i\}$。
        
    4. **构造仿真**: 在第 $step$ 步时，位置 $j$ 的字符取决于其目标来源索引与当前传播距离的权衡，即 $idx = \max(j - offset[j], j - step)$。
        
- **细节处理**:
    
    - 使用 `a = ' ' + a` 进行 1-indexed 偏移对齐。
        
    - 若某个字符无法在左侧找到匹配项，则输出 -1。
        
    - 若 $\max \{offset\} > k_{max}$，输出 -1。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 1e6 + 5;

int offset[maxn];
int n, k;
string a, b;

void solve( )
{
    cin >> n >> k;
    for( int i = 1; i <= n; ++ i )
    {
        offset[i] = -1;
    }

    cin >> a >> b;
    a = ' ' + a;
    b = ' ' + b;

    bool ok = 1;
    int res = 0;
    int i = n;
    
    for( int j = n; j >= 1 && i >= 1; -- j )
    {
        i = min( i, j );
        
        while( i >= 1 && a[i] != b[j] ) i --;
        if( a[i] == b[j] ) offset[j] = j - i;

        res = max( res, offset[j] );
        if( offset[j] == -1 ) ok = 0;
    }

    if( res > k || ok == 0 ) 
    {
        cout << -1 << '\n';
    }
    else
    {
        cout << res << '\n';
        string row = string( n, ' ' );
        for( int step = 1; step <= res; ++ step )
        {
            for( int j = 1; j <= n; ++ j )
            {
                int idx = max( j - offset[j], j - step );
                row[j-1] = a[idx];
            }
            cout << row << '\n';
        }
    }
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    
    int _t = 1;
    cin >> _t;
    while( _t -- )
    {
        solve( );
    }
    return 0;
}

```

{% endfold %}

## 3. 复盘

- **复杂度**: $O(N \cdot K)$ 用于输出，逻辑匹配为 $O(N)$。
    
- **灵感反思**: 该变换规则初看具有递归性（$s'_i$ 依赖于 $s_{i-1}$），但拆解后发现其本质是**扩散**。通过维护 offset 数组，将动态的传播过程静态化为“距离”计算，是典型的构造降维思路。
    
- **关联母题**: [[构造体系]] 