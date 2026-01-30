---
title: 'P1198 [JSOI2008] 最大数'
tags:
  - 数据结构/倍增
  - 数据结构/RMQ
difficulty: 普及+/提高
categories:
  - 11_Library
  - 01_数据结构
  - 03_集合与倍增
abbrlink: 3cab7524
date: 2025-11-28 00:00:00
---
# [Luogu-P1198](https://www.luogu.com.cn/problem/P1198) 最大数

## 1. 核心逻辑

- **问题本质**: 末尾不断追加元素的动态序列，查询后缀最值。
    
- **破局转换**:
    
    1. **动态 ST 表**：通常 ST 表是静态的，但在末尾追加时，旧的倍增值并不会受影响。
        
    2. **递推维护**：当加入第 `cnt` 个元素时，利用 $ST[cnt][j] = \max(ST[cnt][j-1], ST[cnt - 2^{j-1}][j-1])$ 计算当前点的所有倍增祖先。
        
    3. **后缀查询**：查询末尾 $L$ 个元素的最值，等价于区间 $[cnt - L + 1, cnt]$。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
// P1198 [JSOI2008] 最大数
// Key Logic: Dynamic addition in ST table

#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 2e5 + 50;
const int maxlg = 20;

int m, d, cnt = 0;
int st[ maxn ][ maxlg ], lg2[ maxn ];
ll last_ans = 0;

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> m >> d;

    // 预处理 log
    lg2[ 1 ] = 0;
    for( int i = 2; i < maxn; ++ i ) lg2[ i ] = lg2[ i >> 1 ] + 1;

    while( m -- )
    {
        char op;
        int x;
        cin >> op >> x;
        if( op == 'A' )
        {
            ++ cnt;
            st[ cnt ][ 0 ] = ( ( ll )x + last_ans ) % d;
            for( int j = 1; j < maxlg; ++ j )
            {
                if( ( 1 << j ) > cnt ) break;
                st[ cnt ][ j ] = max( st[ cnt ][ j - 1 ], st[ cnt - ( 1 << ( j - 1 ) ) ][ j - 1 ] );
            }
        }
        else
        {
            if( x == 0 ) 
            {
                last_ans = 0;
            }
            else 
            {
                int k = lg2[ x ];
                last_ans = max( st[ cnt ][ k ], st[ cnt - x + ( 1 << k ) ][ k ] );
            }
            cout << last_ans << "\n";
        }
    }

    return 0;
}
```

{% endfold %}

## 3. 归档备注

- 线段树也可以解此题，但 ST 表在“查询次数远多于修改次数”或“仅末尾追加”时具有更小的常数。
    
- 注意题目中的 $L$ 询问是指最后 $L$ 个数，需要进行区间换算。