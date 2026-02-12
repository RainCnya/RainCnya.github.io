---
title: '[Leaf] [ZJ2021M] Game Theory'
tags:
  - 数学/博弈
  - 数学/概率
  - 难度/P2
categories:
  - 220_Library
  - 70_杂项专题
  - 71_公平博弈
abbrlink: 6ed7e9f3
date: 2026-01-22 00:00:00
---
# [ZJ2021M - Game Theory](https://codeforces.com/gym/103055/problem/M)

## 1. 题面梗概

**中译中**：老师和同学玩游戏，老师随机出一个 $[1,20]$ 中的数，$n - 1$ 个同学会以最优策略，同样出一个 $[1,20]$ 的数，求老师的收益期望。

**规则**：老师给学生 $x$ 分，学生给老师 $y$ 分。若 $x > y$，则老师 $+10$ 分；若 $x < y$，则学生 $+10$ 分。

## 2. 逻辑推导

既然同学们会以最有策略出 $y$，那么他们的策略肯定是相同的，我们只需要算出一个期望，再乘上 $(n - 1)$ 即可。

设学生选 $y$ 时，老师的期望收益为 $E(y)$，那么老师得分如下：

$$
Score(x, y) = y - x + \begin{cases}
10 & x > y \\
0 & x = y \\
-10 & x < y \\
\end{cases}
$$

那么总期望就是：

$$
E(y) = (n - 1) \times \min_{y = 1}^{20}(\sum_{x=1}^{20}(\frac{1}{20}\times score(x,y)))
$$
接下来就很简单了，对于如此小的数据范围，直接跑暴力就能算出答案了。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair<int, int>;

const int maxn = 1e5 + 50;
const double inf = 1e18;

int n;

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    
    cin >> n;

    double ans = inf;

    for( int y = 1; y <= 20; ++ y )
    {
        double cur = 0;
        for( int x = 1; x <= 20; ++ x )
        {
            double score = y - x;
            if( x > y ) score += 10;
            else if( x < y ) score -= 10;
            cur += score;
        }
        double avg = cur / 20.0;
        ans = min( ans, avg );
    }

    ans = ( n - 1 ) * ans;

    cout << fixed << setprecision(4) << ans << '\n';

    return 0;
}
```
{% endfold %} 

## 4. 还没结束

我们重新对公式进行推导：

$$
E(y) = \frac{1}{20} \left[\sum_{x=1}^{20}(y-x) + \sum_{x=1}^{20}(10 \cdot [x > y]) + \sum_{x=1}^{20}(-10 \cdot [x < y]) \right]
$$

**基础分**：$\sum(y) + \sum(x) = 20y - \frac{20\times21}{2} = 20y -210$
**老师加分**：$x > y \iff x \in (y,20]$，共有 $20-y$ 个可能，得分为 $10 \times (20 - y) = 200 - 10y$。
**老师减分**：$x < y \iff x \in [1,y)$，共有 $y-1$ 个可能，得分为 $-10 \times (y - 1) = -10y + 10$。

$$
Sum = (20y - 210) + (200 -10y) + (-10y + 10) = 0
$$
惊人的发现，期望永远是 $0$。本质是因为 $20$ 个数和 $+10/-10$ 的机制正好平衡了。

## 4. 复盘

- **碎碎念**: 简单模拟一遍也能过，考验对期望的简单运用。如果能进一步挖掘柿子本身，会得到意料之外的结果。
	
- **关联笔记**: [[博弈论基础]]