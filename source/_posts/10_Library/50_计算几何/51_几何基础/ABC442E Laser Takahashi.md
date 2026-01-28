---
title: '[Leaf] [ABC442E] Laser Takahashi'
tags:
  - 计算几何/极角排序
  - 逆运算/前缀和
  - 难度/P2/提高
categories:
  - 10_Library
  - 50_计算几何
  - 51_几何基础
abbrlink: 3f05f1b9
date: 2026-01-25 11:23:38
---
# [E - Laser Takahashi](https://atcoder.jp/contests/abc442/tasks/abc442_e)

## 1. 题面梗概

高桥站在原点 $(0,0)$，每一次可以发出一道激光，干掉在同一条射线上的所有怪兽。

给你 $N$ 个怪兽的坐标。有 $Q$ 个独立询问，每次给你两个怪兽 $A$ 和 $B$。高桥先盯着 $A$，然后**顺时针**转头，直到盯着 $B$ 为止。

问这期间一共消灭了多少只怪兽？

## 2. 逻辑推导

### 2.1 分析

**第一反应**：看到顺时针旋转 + 射线上的怪兽，我的直觉告诉我，这就是一个在**环形坐标系**上的 **区间查询**。

接着推理，一条射线上的所有怪物都是捆绑的。那么我们就可以按照射线计算出，每个方向上的怪物数量。

> 这里可以采用 `atan2l( y, x )` 算极角，也可以用 GCD 化简坐标 `( x/g, y/g )`。
> 斜率 k ？不行！它是直线，没法区分完全相反的情况，比如 $(1, 1)$ 和 $(-1, -1)$。

对于本题来说，`atan2l( y, x )` 算出来的极角，能直观地处理这种顺时针排序问题。它的值域是 $(- \pi, \pi]$，且按逆时针增加的，其实就是 $arctan( \frac{y}{x} )$，那么我们从大到小排序，即可保证顺时针。

同时还有一个问题，高桥转头可能会跨越 $\pm \pi$ 的分界线，对于这种情况，我们考虑”**断环成链**“，把序列在末尾复制再接一组，从而处理这种环形的问题。

### 2.2 建模

1. 把所有坐标通过 $gcd$ 标准化为最简向量，统计每个方向上有多少怪物。
2. 计算每个方向的 **极角**，并按照极角降序排序。
3. 维护一个关于怪兽数量的前缀和数组 $S$。
4. 利用前缀和快速查询 区间内 有多少怪物。

> 注意，如果 B < A，说明跨越了分界点，在 $2m$ 的链上，$B \to B + m$。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ld = long double;

const int maxn = 2e5 + 50;

struct Point {
    ll x, y;
} p[maxn];

struct Dir {
    ll x, y;
    int cnt;
    ld angle;
};

ll s[maxn << 1];
int n, Q;

bool cmp( const Dir& a, const Dir& b )
{
    return a.angle > b.angle;
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    
    cin >> n >> Q;

    map< pair< ll, ll >, int > cnts;
    for( int i = 1; i <= n; ++ i )
    {
        ll x, y;
        cin >> x >> y;
        ll g = __gcd( abs(x), abs(y) );
        x /= g, y /= g;

        cnts[{x, y}] ++;
        p[i] = {x, y};
    }

    vector< Dir > vec;
    for( auto& [dir, cnt] : cnts )
    {
        ld angle = atan2l( dir.second, dir.first );
        vec.push_back({ dir.first, dir.second, cnt, angle });
    }
    sort( vec.begin( ), vec.end( ), cmp );
    int m = vec.size( );
	
	// 索引映射，快速通过怪物编号找到它所在方向
    map< pair< ll, ll >, int > idx;
    for( int i = 0; i < m; ++ i )
    {
        idx[{ vec[i].x, vec[i].y }] = i;
    }

	// 环形前缀和
    for( int i = 1; i <= m * 2; ++ i )
    {
        s[i] = s[i-1] + vec[(i-1) % m].cnt;
    }

    while( Q -- )
    {
        int a, b;
        cin >> a >> b;
        int st = idx[{ p[a].x, p[a].y }];
        int ed = idx[{ p[b].x, p[b].y }];
        if( ed < st ) ed += m;
        cout << s[ed + 1] - s[st] << "\n";
    }

    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度**: $O( (N+Q) \log N )$。
    
- **碎碎念**:
    
    - **关于斜率 vs 极角**：对于这种射线问题，极角的确实更优解。
        
    - **精度**：`atan2l` 处理这种旋转逻辑非常清晰，但是要考虑精度，比如说我没开 `long double` 就 WA 了。
        
- **关联笔记**: [[前缀和与差分]] | [[极角排序]]