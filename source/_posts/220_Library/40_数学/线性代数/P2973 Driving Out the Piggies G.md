---
title: '[Leaf] P2973 Driving Out the Piggies G'
tags:
  - 数学/期望
  - 线代/线性方程组
  - 难度/P5
categories:
  - 220_Library
  - 40_数学
  - 线性代数
abbrlink: d16b3d17
date: 2026-03-08 19:26:39
---

# [P2973 [USACO10HOL] Driving Out the Piggies G - 洛谷](https://www.luogu.com.cn/problem/P2973)

## 1. 题面梗概

**中译中**：给出一个 $n$ 个点，$m$ 条边的无向图，节点 $1$ 有一个炸弹，在单位时间内，有 $\frac{p}{q}$ 的概率在这个节点炸掉，有 $1 - \frac{p}{q}$ 的概率随机选一条出去的路到其他的节点上，去每个节点的概率相等。

问：最终炸弹在每个节点爆炸的概率。

> $2 \le N \le 300, M \le 44850, 1 \le P \le Q \le 10^6$

## 2. 逻辑推导

首先有一个很显然的结论：在一个点爆炸的概率 = 这个点期望经过次数 $\times$ 每次炸弹爆炸的概率 $\frac{p}{q}$。

> 这里感性理解很容易，简单写一下解释：炸弹爆炸的次数的取值只有 $\{0, 1\}$，所以，炸弹期望爆炸次数与爆炸概率 在数值上相等。

### 2.1 期望 DP

设 $Ans_{u}$ 为炸弹在城市 $u$ 爆炸的概率，那么 $Ans_{u} = E_{u} \cdot p$，其中 $E_{u}$ 为炸弹在爆炸前经过城市 $u$ 的期望次数。

由于图中存在环路，炸弹可能在 $1 \to 2 \to 1$ 来回横跳，这意味着我们无法通过有限次数的计算，求出期望。

这种 “你中有我，我中有你” 的环状依赖关系（ 类马尔科夫链 ），我们就需要建立线性方程组。 

简要写一下方程：（ $d_{u}$ 为节点 $u$ 的度数 ）

- 如果这个节点是 $1$，它由初始情况，加上从相邻城市转移过来的次数：

$$
E_{1} = 1 + \sum_{(v, 1) \in E} \left( f_{v} \times ( 1 - p ) \times \frac{1}{d_{v}}  \right)
$$

- 如果这个节点不是 $1$，那么它只由相邻的城市转移过来：

$$
E_{v} = \sum_{(u, v) \in E} \left( f_{u} \times (1 - p) \times \frac{1}{d_{u}} \right)
$$

### 2.2 线性方程组

这样我们就可以得到 $N$ 个 $N$ 元一次方程，接着把方程转化为 $Ax = B$ 的标准形式，就可以通过高斯消元法，快乐消元求解了。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 300 + 5;
const double eps = 1e-7;

double a[maxn][maxn];
int g[maxn][maxn];
int deg[maxn];
int n, m, p, q;
double P;

void gauss( )
{
    int row = 1;
    for( int col = 1; col <= n; ++ col )
    {
        int pivot = row;
        for( int i = row + 1; i <= n; ++ i )
            if( fabs( a[i][col] ) > fabs( a[pivot][col] ) ) pivot = i;
        
        if( fabs( a[pivot][col] ) < eps ) continue;

        swap( a[pivot], a[col] );

        double div = a[row][col];
        for( int j = col; j <= n + 1; ++ j ) a[row][j] /= div;
        
        for( int i = 1; i <= n; ++ i )
        {
            if( i != row )
            {
                double fac = a[i][col];
                for( int j = col; j <= n + 1; ++ j )
                    a[i][j] -= fac * a[row][j];
            }
        }
        row ++;
    }
}

int main( )
{
    ios::sync_with_stdio( 0 ); cin.tie( 0 );
    
    cin >> n >> m >> p >> q;
    P = 1.0 * p / q;

    for( int i = 1; i <= m; ++ i )
    {
        int u, v; cin >> u >> v;
        if( g[u][v] ) continue;
        g[u][v] = g[v][u] = 1;
        deg[u] ++, deg[v] ++;
    }

    for( int i = 1; i <= n; ++ i )
    {
        a[i][i] = 1;
        for( int j = 1; j <= n; ++ j )
        {
            if( g[i][j] ) a[i][j] -= ( 1.0 - P ) / deg[j];
        }
    }
    a[1][n + 1] = 1.0;
    gauss( );

    cout << fixed << setprecision( 9 );

    for( int i = 1; i <= n; ++ i )
    {
        double ans = a[i][n + 1] * P;
        cout << ans << '\n';
    }

    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度分析**：$O( N^3 )$。
    
- **碎碎念**：类马尔科夫链的这种环形依赖 DP，可以考虑转化为线性方程组，然后高斯消元求解即可。
    
- **关联笔记**：[[线性代数#高斯消元]]
