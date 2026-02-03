---
title: P3199 最小圈 (Fractional_Programming_Graph)
tags:
  - 图论/最短路
  - 策略/二分答案/分数规划
difficulty:
  - 提高+/省选-
categories:
  - 221_Library
  - 02_图论
  - 01_最短路及其应用
abbrlink: a3783e6
date: 2025-12-01 00:00:00
---
# [Luogu-P3199](https://www.luogu.com.cn/problem/P3199) 最小圈

## 1. 核心逻辑

- **问题本质**: 在有向图中寻找一个环，最小化环上边权的平均值 $\frac{\sum w}{|V|}$。
    
- **核心切入点**:
    
    1. **01 分数规划**: 假设平均值为 $\lambda$，判定是否存在环满足 $\frac{\sum w}{|V|} < \lambda$。
        
    2. **数学变换**:
        
        $$\sum w < \lambda \cdot |V| \implies \sum (w - \lambda) < 0$$
    3. **判定转换**: 将图中所有边权 $w$ 修改为 $w' = w - \lambda$。若图中存在**负环**，则当前的 $\lambda$ 过大，可以继续减小。
        
    4. **优化细节**: 判负环建议使用 DFS 版 SPFA，虽然最坏复杂度较高，但在随机图和二分判定中通常具有显著的时间优势。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
// P3199 最小圈
// Key Logic: 01 Fractional Programming + SPFA Negative Cycle (DFS Version)

#include <bits/stdc++.h>
using namespace std;

const int maxn = 3005;
const double eps = 1e-9;

struct Edge
{
    int to;
    double w;
};

vector< Edge > adj[ maxn ];
double dist[ maxn ];
bool vis[ maxn ];
int n, m;

bool dfs( int u, double mid )
{
    vis[ u ] = true;
    for( auto &e : adj[ u ] )
    {
        double weight = e.w - mid;
        if( dist[ u ] + weight < dist[ e.to ] )
        {
            dist[ e.to ] = dist[ u ] + weight;
            if( vis[ e.to ] || dfs( e.to, mid ) )
            {
                return true;
            }
        }
    }
    vis[ u ] = false;
    return false;
}

bool check( double mid )
{
    for( int i = 1; i <= n; ++ i )
    {
        dist[ i ] = 0;
        vis[ i ] = false;
    }
    for( int i = 1; i <= n; ++ i )
    {
        if( dfs( i, mid ) )
        {
            return true;
        }
    }
    return false;
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> m;
    for( int i = 0; i < m; ++ i )
    {
        int u, v;
        double w;
        cin >> u >> v >> w;
        adj[ u ].push_back( { v, w } );
    }

    double l = -1e7, r = 1e7;
    for( int i = 0; i < 60; ++ i )
    {
        double mid = ( l + r ) / 2.0;
        if( check( mid ) )
        {
            r = mid;
        }
        else
        {
            l = mid;
        }
    }

    cout << fixed << setprecision( 8 ) << l << "\n";

    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **时间复杂度**: $O(K \cdot N \cdot M)$，其中 $K$ 为二分次数。
    
- **核心思路**: 利用分数规划的思想将“平均值最优化”转化为“含权图负环判定”。注意多连通分量情况需对全点集执行 DFS。