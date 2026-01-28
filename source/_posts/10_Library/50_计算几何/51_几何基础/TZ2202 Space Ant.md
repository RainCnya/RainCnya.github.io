---
title: '[Leaf] [TZ2202] Space Ant'
tags:
  - 几何/计算几何
  - 策略/贪心
  - 难度/P2/提高
categories:
  - 10_Library
  - 50_计算几何
  - 51_几何基础
abbrlink: becb779e
date: 2026-01-06
---
    
# [2202:Space Ant](https://www.tzcoder.cn/acmhome/problemdetail.do?method=showdetail&id=2202)

## 1. 核心逻辑

- **模型抽象**: 给定 $N$ 个点，从最低点出发，每次只能左转且不能穿过旧路径，求最长访问序列。
    
- **逻辑支点 (螺旋构造)**:
    
    1. **拓扑坍缩**: 在只能左转且路径不自交的约束下，全局最优解必然呈现为一个**逆时针向内螺旋**的结构。
        
    2. **贪心演化**: 在当前位置 $P_{cur}$，为了保证路径始终向内“包裹”且旋转角度尽可能小，应在剩余点中寻找相对于当前点**最右侧**的点作为下一站。
        
    3. **判定算子**: 利用叉积 $\vec{AB} \times \vec{AC} < 0$ 判定点 $C$ 是否在向量 $\vec{AB}$ 的右侧。若叉积为 0（共线），则优先选取距离更远的点。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 100 + 5;

struct Point {
    int id, x, y;
} ps[maxn];

bool vis[maxn];
int n;

// 叉积计算：判断点 c 相对于向量 ab 的位置
int cross( Point a, Point b, Point c ) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

// 距离平方计算
int dist( Point a, Point b ) {
    return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
}

void solve( )
{
    cin >> n;
    memset( vis, 0, sizeof( vis ) );

    int start = 1;
    for( int i = 1; i <= n; i ++ )
    {
        cin >> ps[i].id >> ps[i].x >> ps[i].y;
        // 初始寻找最低点（y 最小）
        if( ps[i].y < ps[start].y ) start = i;
    }

    Point cur = ps[start];
    vector<int> ans;

    vis[start] = 1;
    ans.push_back( cur.id );
    
    // 螺旋构造：每次选择最靠右侧的点
    for( int i = 1; i < n; ++ i )
    {
        int nxt = -1;

        for( int j = 1; j <= n; ++ j )
        {
            if( vis[j] ) continue;
        
            if( nxt == -1 )
            {
                nxt = j;
                continue;
            }

            int cp = cross( cur, ps[nxt], ps[j] );
            // 寻找最右侧的点 (cp < 0 说明 ps[j] 在向量 cur->ps[nxt] 的右侧)

            if( cp < 0 )
            {
                nxt = j;
            }
            else if( cp == 0 )
            {
	            // 共线时，选择距离较远的点以维持外包络线
                if( dist( cur, ps[j] ) > dist( cur, ps[nxt] ) ) 
                    nxt = j;
            }
        }

        vis[nxt] = 1;
        cur = ps[nxt];
        ans.push_back( cur.id );
    }

    cout << ans.size( ) << " ";
    for( int i = 0; i < ans.size( ); ++ i )
    {
        cout << ans[i] << " ";
    }
    cout << '\n';
}

int main( )
{
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

- **复杂度**: $O(N^2)$。鉴于 $N \le 50$，该暴力构造在算力上属于降维打击。
    
- **灵感反思**: 该题是 Jarvis March（卷包裹算法）的一种变体。普通的卷包裹是为了找凸包边界，而本题通过不断“吃掉”已经使用的点，将外包裹演化为了向内收敛的路径。
    
- **关联母题**: [[Jarvis March 卷包裹算法]], [[极角排序与贪心构造]]