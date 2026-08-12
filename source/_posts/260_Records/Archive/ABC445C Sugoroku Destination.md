---
title: 'ABC445C Sugoroku Destination'
tags:
  - DP
  - 图论/函数图
categories:
  - 260_Records
  - Archive
abbrlink: cc06f0c1
date: 2026-02-14 00:00:00
---
# [C - Sugoroku Destination](https://atcoder.jp/contests/abc445/tasks/abc445_c)

## 1. 题意梗概

有 $N$ 个单元格，每个格子写着一个数字 $A_i$。棋子从位置 $s$ 出发，每次移动到当前格子上写的数字对应的格子。求 $10^{100}$ 次移动后棋子的位置。

-   $1 \le N \le 5\times10^5$
-   $i \le A_i \le N\ (1 \le i \le N)$

## 2. 逻辑推导

这题有点小巧思，因为要求移动 $10^{100}$ 次，这就不能手动模拟了。

注意到一个关键约束 $A_i \ge i$，意味着棋子只能向后移动或留在原处。

所以经过极多次移动后，棋子 $x$ 一定会留在某个 $A_{x} = x$ 的自环上。

**DP**：由于路径没有回退（无环），我们可以反过来计算 每个点的最终归宿。

- 若 $A_{i} = i$，则终点是它自己；否则它的终点就是 $A_{i}$ 的终点。

> 插一嘴，有点像并查集了哈。

## 3. 代码实现

```cpp
void solve( )
{
    cin >> n;
    for( int i = 1; i <= n; ++ i ) cin >> a[i];

    for( int i = n; i >= 1; -- i )
    {
        if( a[i] == i ) to[i] = i;
        else to[i] = to[ a[i] ];
    }

    for( int i = 1; i <= n; ++ i ) cout << to[i] << ' ';
}
```

---
