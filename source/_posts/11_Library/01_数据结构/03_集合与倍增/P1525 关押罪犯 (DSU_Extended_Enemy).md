---
title: 'P1525 [NOIP2010] 关押罪犯'
tags:
  - 数据结构/并查集
  - 策略/贪心
difficulty: 普及+/提高
categories:
  - 11_Library
  - 01_数据结构
  - 03_集合与倍增
abbrlink: d06e55a1
date: 2025-11-28 00:00:00
---
# [Luogu-P1525](https://www.luogu.com.cn/problem/P1525) 关押罪犯

## 1. 核心逻辑

- **问题本质**: 将 $N$ 个元素分入两类，使同类间的最大冲突值最小。
    
- **破局转换**:
    
    1. **贪心排序**：按仇恨值从大到小排序，优先处理破坏力大的关系。
        
    2. **扩展域 (Enemy of Enemy is Friend)**：
        
        - 每个罪犯 $i$ 映射两个状态：$i$ (罪犯所在的监狱) 和 $i+N$ (其对手所在的监狱)。
            
        - 处理仇恨 $(u, v)$：尝试将 $u$ 放入 $v$ 的对手监狱 (`merge(u, v+n)`)，将 $v$ 放入 $u$ 的对手监狱 (`merge(v, u+n)`)。
            
        - 冲突判定：如果 `find(u) == find(v)`，说明大仇恨值的两者被迫在同一监狱，即为答案。
            

## 2. 代码实现

{% fold info @AcCode %}

```cpp
// P1525 [NOIP2010] 关押罪犯
// Key Logic: Extended DSU with greedy sorting

#include <bits/stdc++.h>
using namespace std;

const int maxn = 2e4 + 50;
const int maxm = 1e5 + 50;

struct Edge
{
    int u, v, cost;
    bool operator < ( const Edge &other ) const
    {
        return cost > other.cost;
    }
} e[ maxm ];

int n, m, fa[ maxn << 1 ];

int find( int x )
{
    return fa[ x ] == x ? x : fa[ x ] = find( fa[ x ] );
}

void merge( int x, int y )
{
    int fx = find( x ), fy = find( y );
    if( fx != fy ) fa[ fx ] = fy;
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> m;
    for( int i = 1; i <= ( n << 1 ); ++ i ) fa[ i ] = i;

    for( int i = 1; i <= m; ++ i )
    {
        cin >> e[ i ].u >> e[ i ].v >> e[ i ].cost;
    }

    sort( e + 1, e + m + 1 );

    for( int i = 1; i <= m; ++ i )
    {
        int u = e[ i ].u, v = e[ i ].v;
        if( find( u ) == find( v ) )
        {
            cout << e[ i ].cost << endl;
            return 0;
        }
        // 标记为敌人：u 的敌人是 v，v 的敌人是 u
        merge( u, v + n );
        merge( v, u + n );
    }

    cout << 0 << endl;
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- 扩展域并查集的母题。
    
- 也可以通过二分答案 + 二分图染色解决，但并查集在此处复杂度与逻辑更简洁。