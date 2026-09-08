---
title: P13467 Triangle Areas
tags:
  - 数学/构造
  - 计算几何/叉积
status: solved
categories:
  - 260_Records
  - Misc
abbrlink: a4d4cea3
date: 2026-09-07 00:00:00
updated: 2026-09-08 00:00:00
---

# 叉积构造中的商与余数

> [!question] [P13467 [GCJ 2008 #2] Triangle Areas](https://www.luogu.com.cn/problem/P13467)
> 在 $0\le x\le N,0\le y\le M$ 的整点矩形中，构造三个整点，使三角形面积恰为 $A/2$，或判断无解。
> 
> 数据规模：多组数据不超过 $1000$ 组，$N,M\le10^4$，$A\le10^8$。

## 思路

由于是构造题，不妨将一个点固定下来，由于在角落能形成最大的面积，因此令一号点在 $(0, 0)$。

设二号点为 $(x_1,y_1)$，三号点为 $(x_2,y_2)$，那么三角形的二倍面积为 $x_1y_2-x_2y_1$，于是目标变成构造 $x_{1} \cdot y_{2} - x_{2} \cdot y_{1} = A$ 了。

设 $x_{2}, y_{2}$ 为未知数，那么问题就是 $x_{1} \cdot y - y_{1} \cdot x = A$，这就是一个类似裴蜀定理的式子，方程有解当且仅当 $\gcd(x_{1}, y_{1} ) \mid A$。

所以若想满足所有的 $A$，我们肯定选择一组 $x_{1}, y_{1}$ 使得 $\gcd(x_{1}, y_{1}) = 1$。

于是选一组 $(N, 1)$ 就很合适，因为它一定满足，并且方程就转化为了 $Ny - x = A$，于是只需要用 $A$ 对 $N$ 取除数和余数即可构造。

还需要检查构造结果位于矩形内。因为只有 $A > NM$ 时，矩形中三角形的最大二倍面积也不可能超过 $NM$，因此无解，其他情况都可以通过上述逻辑构造出来。

## AC 代码

```cpp title:"P13467" fold
void solve( ) {
    int n = read( ), m = read( ), A = read( );
    if( n * m < A ) {
        cout << "IMPOSSIBLE" << '\n';
        return ;
    }

    cout << 0 << " " << 0 << " ";
    cout << n << " " << 1 << " ";
    int tmp = A % n;
    int x, y;
    if( tmp == 0 ) {
        y = A / n, x = 0;
    } else {
        y = A / n + 1, x = n * y - A;
    }
    cout << x << " " << y << '\n';
}
```