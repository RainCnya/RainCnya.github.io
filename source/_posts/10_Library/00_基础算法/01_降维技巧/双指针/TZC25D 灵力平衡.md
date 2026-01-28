---
title: '[Leaf] [TZ9508] 灵力平衡'
tags:
  - 单调性/双指针
  - 难度/P2/提高
categories:
  - 10_Library
  - 00_基础算法
  - 01_降维技巧
abbrlink: a0cfe40f
date: 2026-01-05
---

# [9508:归元大帝的「三界灵力平衡」仪式](https://www.tzcoder.cn/acmhome/problemdetail.do?method=showdetail&id=9508)

## 1. 核心逻辑

- **模型抽象**: 

	- 在三个已排序序列 $S_1, S_2, S_3$ 中各取一数 $a, b, c$，求 $f = |a-b| + |b-c| + |c-a|$ 的最小值。
    
- **破局路径**:
    
    - **代数降维**: 设 $a \le b \le c$，则 $f = (b-a) + (c-b) + (c-a) = 2(c-a)$。

		- 即目标是最小化三元组的“极差”。
        
    - **单调性排除**: 

		- 使用三指针 $i, j, k$ 分别指向三个数组。
		- 在当前状态下，为了缩小极差，唯一的尝试方向是让**最小值变大**。
		- 因此，每次移动指向当前最小值的指针，直到某一数组遍历结束。
        
- **细节处理**:
    
    - 稳定性公式结果涉及大数运算，需使用 `long long`。
    - 排序是该逻辑的前提不变量。

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 1e5 + 50;
ll s1[maxn], s2[maxn], s3[maxn];

ll calc( ll a, ll b, ll c )
{
    return abs( a - b ) + abs( b - c ) + abs( c - a );
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    int t;
    cin >> t;

    while( t -- )
    {
        int x, y, z;
        cin >> x >> y >> z;

        for( int i = 1; i <= x; ++ i ) cin >> s1[i];
        for( int i = 1; i <= y; ++ i ) cin >> s2[i];
        for( int i = 1; i <= z; ++ i ) cin >> s3[i];

        sort( s1 + 1, s1 + x + 1 );
        sort( s2 + 1, s2 + y + 1 );
        sort( s3 + 1, s3 + z + 1 );

        ll ans = 1e18;
        int i = 1, j = 1, k = 1;

        while( i <= x && j <= y && k <= z )
        {
			int min_num = 1e9, min_pos = -1;
			if( s1[i] < min_num )
			{
				min_num = s1[i];
				min_pos = 1;
			}
			if( s2[j] < min_num )
			{
				min_num = s2[j];
				min_pos = 2;
			}
			if( s3[k] < min_num )
			{
				min_num = s3[k];
				min_pos = 3;
			}
			ans = min( ans, calc( s1[i], s2[j], s3[k] ) );
			
			if( min_pos == 1 ) i++;
			else if( min_pos == 2 ) j ++;
			else k ++;
        }
        cout << ans << '\n';
    }
    return 0;
}
```

{% endfold %}

## 3. 复盘

- **复杂度**: $O( \sum N \log N )$，瓶颈在于排序。
    
- **灵感反思**: 该模型通过“移动最小值”实现了对 $N^3$ 暴力空间的线性扫描，是双指针向多维扩展的典例。
    
- **关联知识点**: [[双指针]]