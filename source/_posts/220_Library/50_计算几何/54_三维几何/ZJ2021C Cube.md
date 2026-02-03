---
title: '[Leaf] [ZJ2021C] Cube'
tags:
  - 计算几何/三维几何
  - 难度/P1
categories:
  - 220_Library
  - 50_计算几何
  - 54_三维几何
abbrlink: e3e61edb
date: 2026-01-22 00:00:00
---
# [ZH2021C - Cube](https://codeforces.com/gym/103055/problem/C)

## 1. 题面梗概

**中译中**: 给定三维空间里的 8 个点，判断它们能不能组成一个正方体。

## 2. 逻辑推导

验证是否为正方体 $\iff$ 其 $8$ 个顶点间能连出 $\binom{8}{2} = 28$ 条线段。

对于这 $28$ 条线段，他只包括三种情况：

棱长 $L^2,12$ | 面对角线 $2L^2$ 12 | 体对角线 $3L^2,4$ 

那么我们只需要算出所有距离，然后验证即可。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair<int, int>;

const int maxn = 2e5 + 5;

struct Point {
    int x, y, z;
};

int dist( Point a, Point b ) {
    return ( a.x - b.x ) * ( a.x - b.x ) + ( a.y - b.y ) * ( a.y - b.y ) + ( a.z - b.z ) * ( a.z - b.z );
}

bool solve( )
{
    vector<Point> p(8);
    for( int i = 0; i < 8; ++ i )
    {
        cin >> p[i].x >> p[i].y >> p[i].z;
    }

    vector<int> dists;
    for( int i = 0; i < 8; ++ i )
    {
        for( int j = i + 1; j < 8; ++ j )
        {
            int d = dist( p[i], p[j] );
            if( d == 0 ) return 0;
            dists.push_back( d );
        }
    }

    sort( dists.begin( ), dists.end( ) );
    int d = dists[0];

    for( int i = 0; i < 28; ++ i )
    {
        if( i < 12 ) {
            if( dists[i] != d ) return 0;
        } else if( i < 24 ) {
            if( dists[i] != 2 * d ) return 0;
        } else {
            if( dists[i] != 3 * d ) return 0;
        }
    }

    return 1;
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int _t = 1;
    cin >> _t;
    while( _t -- )
    {
        if( solve( ) ) cout << "YES" << '\n';
        else cout << "NO" << '\n';
    }
    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度**：$O(V^2)$

- **碎碎念**：注意点重合的特殊判断。
        
- **关联笔记**: [[三维几何基础]]