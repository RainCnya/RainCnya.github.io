---
title: '[Leaf] [CF2193F] Pizza Delivery'
tags:
  - DP/线性
  - 策略/贪心
  - 难度/P2/提高
categories:
  - 10_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: 24bb9c7
date: 2026-01-26 00:00:00
---
# [CF2193F - Pizza Delivery](https://codeforces.com/contest/2193/problem/F)

## 1. 题面梗概

快递员从 $(Ax, Ay)$ 出发，要去 $n$ 个点送外卖，最后回到 $(Bx, By)$。移动规则：只能往右 $(x+1)$、往上 $(y+1)$ 或往下 $(y-1)$ 走。

求完成所有任务的最短时间。

## 2. 逻辑推导

我们从移动规则切入这道题，发现 $x$ 是固定单调递增的，那么水平运动的距离固定就是 $B_x - A_x$。

那么 $y$ 轴呢？注意到我们每一列的 $y_{min}$ 和 $y_{max}$ 是必须经过的，所以，$y_{max} - y_{min}$ 这段路也是固定的。

那么我们就只需要考虑每一列的端点处的转移了。

这里我采用自定义 `sort` 来进行排序，按 $x$ 升序排序，$x$ 相同的情况，按 $y$ 升序排序。

这样一来某个 $x$ 的区间 $[L,R]$，`ymin = p[L].y, ymax = p[R].y;` 用双指针维护即可。

**定义**：

- 设 $dp_{min}[i]$ 表示完成前 $i$ 个 $x$ 坐标后，停留在 $y_{min}$ 的最小数值代价。
- 设 $dp_{max}[i]$ 表示完成前 $i$ 个 $x$ 坐标后，停留在 $y_{max}$ 的最小数值代价。

**转移**：简单分析后有四种情况：

- $pre_{ymin} \to cur_{ymin} \to cur_{ymax}$
- $pre_{ymin} \to cur_{ymax} \to cur_{ymin}$
- $pre_{ymax} \to cur_{ymin} \to cur_{ymax}$
- $pre_{ymax} \to cur_{ymax} \to cur_{ymin}$

针对转移写出代码即可。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 2e5 + 5;

struct Point {
    ll x, y;
} a[maxn], st, ed;

struct Seg {
    ll ymin, ymax;
} last, cur;

ll dpmin[maxn], dpmax[maxn];

bool cmp( const Point &a, const Point &b )
{
    if( a.x == b.x ) return a.y < b.y;
    return a.x < b.x;
}

void solve( )
{
    int n;
    cin >> n >> st.x >> st.y >> ed.x >> ed.y;
    
    for( int i = 1; i <= n; ++ i ) cin >> a[i].x;
    for( int i = 1; i <= n; ++ i ) cin >> a[i].y;
    // 偷懒把 a[n + 1]  设置为 ed，这样跑转移就一步到位了。
    a[n + 1] = { ed.x, ed.y };

    sort( a + 1, a + n + 1, cmp );

    int pos = 0;
    last = { st.y, st.y };
    dpmin[0] = dpmax[0] = 0;

    for( int l = 1; l <= n + 1; )
    {
        int r = l;
        while( r <= n + 1 && a[r].x == a[l].x ) r ++;

        cur = { a[l].y, a[r-1].y };
        ll len = cur.ymax - cur.ymin;
        pos ++;

        dpmin[pos] = min( dpmin[pos-1] + abs( last.ymin - cur.ymax ), dpmax[pos-1] + abs( last.ymax - cur.ymax ) ) + len;
        dpmax[pos] = min( dpmin[pos-1] + abs( last.ymin - cur.ymin ), dpmax[pos-1] + abs( last.ymax - cur.ymin ) ) + len;
        last = cur;
        l = r;
    }

    ll ans = abs( ed.x - st.x ) + min( dpmin[pos], dpmax[pos] );
    cout << ans << '\n';
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

## ## 4. 复盘

- **复杂度**: $O( n \log n )$。瓶颈在于对 $n$ 个坐标点的排序。
    
- **碎碎念**: 初看题目下意识可能会想到二分。但注意到 $x$ **的单向性** 这一降维性质后，问题为可以化为每一步只有两个端点选择的线性 DP。
        
- **关联笔记**: [[线性DP]] 