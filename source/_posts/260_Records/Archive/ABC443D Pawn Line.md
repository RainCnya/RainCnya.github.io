---
title: 'ABC443D Pawn Line'
categories:
  - 260_Records
  - Archive
abbrlink: ca40ee30
date: 2026-01-31 00:00:00
tags:
  - 策略/贪心
  - 算法/双向扫描
---

## [D - Pawn Line](https://atcoder.jp/contests/abc443/tasks/abc443_d)

### 1. 题意梗概

在 $N \times N$ 的棋盘上，每一列 $i$ 都有一个初始位于第 $R_i$ 行的棋子。每次操作可将棋子**向上**移动一格（即行号减小）。 

要求最终状态下，相邻两列棋子的行数差的绝对值 $\le 1$。求实现该目标的最小移动总次数。

### 2. 逻辑推导

这题有点上难度了，注意限制条件，每次只能向上移动棋子。

设初始行号为 $R_i$，最终行号为 $X_i$，则 $1 \leq X_i \leq R_i$， $X_{i} - 1 \leq X_{i+1} \leq X_{i} + 1$。

操作次数为：$Sum = \sum(R_i - X_i)$。因为 $R_i$ 是固定的，所以我们需要尽可能让 $X_i$ 大，也就是尽可能少向上跑，能不动就不动。

基于此策略，我们从两侧分别扫描一遍数组，即可得到 $X_i$ 的一种最优策略。（因为有两个限制条件，每个棋子受到相邻两列棋子的限制）

正向扫描：$X_i = \min(X_{i}, X_{i-1} + 1)$。反向扫描：$X_i = \min(X_{i},X_{i+1} + 1)$。

最后统计答案即可。

### 3. 代码实现

{% fold info @AcCode %}

```cpp
void solve( )
{
    cin >> n;
    for( int i = 1; i <= n; ++ i ) 
    {
        cin >> R[i];
        RR[i] = R[i];
    }

    for( int i = 2; i <= n; ++ i ) 
    {
        RR[i] = min( RR[i], RR[i - 1] + 1 );
    }

    for( int i = n - 1; i >= 1; -- i ) 
    {
        RR[i] = min( RR[i], RR[i + 1] + 1 );
    }

    ll sum = 0;
    for( int i = 1; i <= n; ++ i ) 
    {
        sum += R[i] - RR[i];
    }
    cout << sum << '\n';
}
```

{% endfold %}
