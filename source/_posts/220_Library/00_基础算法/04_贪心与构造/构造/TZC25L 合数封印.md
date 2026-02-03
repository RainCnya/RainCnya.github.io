---
title: '[Leaf] [TZ9516] 合数封印'
tags:
  - 策略/构造
  - 难度/P2
categories:
  - 220_Library
  - 00_基础算法
  - 04_贪心与构造
abbrlink: a05d1987
date: 2026-01-05 00:00:00
---
# [9516:归元大帝的「灵阵合数封印」](https://www.tzcoder.cn/acmhome/problemdetail.do?method=showdetail&id=9516)

## 1. 核心逻辑

- **模型抽象**: 构造 $1 \dots n$ 的全排列，使得任意连续 $k$ 个数之和均为合数。
    
- **破局路径**:
    
    - $k \ge 3$ **的普适证明**: 设起始数为 $x$，连续 $k$ 个数的和为 $S = \frac{k(2x + k - 1)}{2}$。
        
        - 若 $k$ 为奇数：由于 $2x$ 和 $k-1$ 均为偶数，$\frac{2x+k-1}{2}$ 为整数。则 $S$ 是 $k$ 的倍数。由于 $k \ge 3$ 且 $S > k$，故 $S$ 必为合数。
            
        - 若 $k$ 为偶数（且 $k > 2$）：则 $\frac{k}{2}$ 为整数且 $\ge 2$。则 $S = \frac{k}{2} \cdot (2x + k - 1)$。由于两因子均 $\ge 2$，故 $S$ 必为合数。
            
        - **结论**: $k \ge 3$ 时，直接输出 $1, 2, \dots, n$ 即可通过。
            
    - $k = 2$ **的奇偶隔离**: 两个数之和为合数。由于“奇+偶=奇”，极易产生质数（如 $2+3=5$）。
        
        - **核心构造**: 采用“奇偶分区”法。将所有偶数放在左侧，所有奇数放在右侧。
            
        - **能量桥接**: 唯一可能产生质数的点在奇偶交界处。选取 $(4, 5)$ 作为接头，因为 $4+5=9$（合数）。
            
        - **不变量**: 偶数+偶数 $\ge 6$（必为合数），奇数+奇数 $\ge 4$（除 $1+3=4$ 外均为合数，而 $1+3$ 本身也是合数）。
            
- **细节处理**: 当 $k=2$ 且 $n < 5$ 时，无法构造出包含 $4, 5$ 的接头，判定为无解。

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

void solve( )
{
    int n, k;
    cin >> n >> k;

    if( k == 2 )
    {
        if( n < 5 )
        {
            cout << -1 << '\n';
        }
        else
        {
            cout << n << '\n';
            vector< int > res;
            
            // 1. 放置左侧偶数区（排除接头 4）
            for( int i = 2; i <= n; i += 2 )
            {
                if( i != 4 )
                {
                    res.push_back( i );
                }
            }
            
            // 2. 放置核心逻辑接头 (4, 5)
            res.push_back( 4 );
            res.push_back( 5 );
            
            // 3. 放置右侧奇数区（排除接头 5）
            for( int i = 1; i <= n; i += 2 )
            {
                if( i != 5 )
                {
                    res.push_back( i );
                }
            }

            for( int i = 0; i < n; ++ i )
            {
                cout << res[i];
                if( i != n - 1 )
                {
                    cout << " ";
                }
            }
            cout << '\n';
        }
    }
    else
    {
        // k >= 3 时，利用等差数列求和性质直接输出自然序列
        cout << n << "\n";
        for( int i = 1; i <= n; ++ i )
        {
            cout << i;
            if( i != n ) cout << " ";
        }
        cout << "\n";
    }
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    int t;
    cin >> t;
    while( t -- )
    {
        solve( );
    }
    return 0;
}
```

{% endfold %}

## 3. 复盘

- **复杂度**: $O(N)$，空间与时间均为线性。
    
- **灵感反思**: 构造题的本质是“寻找不变量”。

	- 通过数学证明将 $k \ge 3$ 的复杂情况降维打击，再通过奇偶分类解决 $k=2$ 的冲突点。
    
- **关联知识点**: [[构造体系]]