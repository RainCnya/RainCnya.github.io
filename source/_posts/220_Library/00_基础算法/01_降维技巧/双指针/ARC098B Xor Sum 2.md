---
title: '[Leaf] [ARC098B] Xor Sum 2'
tags:
  - 算法/双指针
  - 数学/位运算
  - 难度/P3
categories:
  - 220_Library
  - 00_基础算法
  - 01_降维技巧
abbrlink: 1be22388
date: 2025-11-6
---
# [ARC098B - Xor Sum 2](https://www.luogu.com.cn/problem/AT_arc098_b)

## 1. 核心逻辑

- **问题本质**: 统计满足“区间和等于区间异或和”的子区间数量。
    
- **破局转换**:
    
    1. **位运算性质**: $A + B = A \oplus B \iff (A \& B) = 0$。
        
        - 物理含义：二进制加法中没有任何一位发生进位。
            
        - 推论：区间 $[L, R]$ 合法 $\iff$ 该区间内所有数字在任意二进制位上至多只有一个 1。
            
    2. **单调性**: 若区间 $[L, R]$ 满足无进位加法，则其子区间必然也满足。
        
    3. **双指针滑动**: 固定 $R$，寻找最左侧的 $L$。当加入 $a[R]$ 导致按位与冲突时，右移 $L$ 释放资源。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
// AT_arc098_b Xor Sum 2
// Key Logic: Two Pointers + Bitwise AND for No-Carry Sum

#include <bits/stdc++.h>
using namespace std;

using ll = long long;
const int maxn = 2e5 + 50;

int n;
ll a[ maxn ];

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n;
    for( int i = 1; i <= n; ++ i ) cin >> a[ i ];

    ll ans = 0, cur_sum = 0;
    int L = 1;

    for( int R = 1; R <= n; ++ R )
    {
        // 若当前窗口已有位与 a[R] 冲突，则右移 L
        while( ( cur_sum & a[ R ] ) != 0 )
        {
            cur_sum ^= a[ L ];
            ++ L;
        }
        
        // 加入 a[R] 到窗口
        cur_sum |= a[ R ];
        
        // 贡献：以 R 为右端点的合法区间个数为 R - L + 1
        ans += ( ll )( R - L + 1 );
    }

    cout << ans << "\n";

    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **状态维护**: 使用 `cur_sum |= a[R]` 和 `cur_sum ^= a[L]` 动态维护窗口内的位状态，优于前缀和减法，且逻辑更贴合位运算本质。

- **相关知识点**：[[双指针]]