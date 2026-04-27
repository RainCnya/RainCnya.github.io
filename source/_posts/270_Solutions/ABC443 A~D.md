---
title: Solution_ABC443 A~D
tags: ABC
date: 2026-01-31
---


## [A - Append s](https://atcoder.jp/contests/abc443/tasks/abc443_a)

### 1. 题意梗概

输入一个 $S$，$S$，要求在其末尾追加一个字符 's' 并输出。

### 2. 逻辑推导

string 语法题，Pass！

### 3. 代码实现

{% fold info @AcCode %}

```cpp
void solve( )
{
    string s;
    cin >> s;
    s = s + 's';
    cout << s;
}
```

{% endfold %}

## [B - Setsubun](https://atcoder.jp/contests/abc443/tasks/abc443_b)

### 1. 题意梗概

给定一个首项 $a_1 = N$、公差为 $1$ 的等差数列。求最少需要累加多少项，才能使数列之和大于等于 $K$？

### 2. 逻辑推导

数据范围很小 $K \leq 10^8$，直接暴力枚举即可。若数据范围大，可以考虑用公式算。

### 3. 代码实现

{% fold info @AcCode %}

```cpp
void solve( )
{
    ll n, k;
    cin >> n >> k;

    ll sum = n;
    ll cnt = 0;
    while( sum < k )
    {
        cnt ++;
        sum += ( n + cnt );
    }
    cout << cnt << '\n';
}
```

{% endfold %}

## [C - Chokutter Addiction](https://atcoder.jp/contests/abc443/tasks/abc443_c)

### 1. 题意梗概

给定 $n$ 个观测时间点。若在时间 $a_i$ 查看时机器处于开启状态，则机器会立即关闭，并在 100 秒后重新自动开启。求在时间 $T$ 结束时，机器总计运行的时长。

### 2. 逻辑推导

简单的模拟题，我们可以维护一个变量 `nxt`，记录下一次可开机的最早时间。若判定时间点大于开机时间，则关掉机器，并累积时长，更新下一次开机时间。最后特殊判断结束时间即可。

### 3. 代码实现

{% fold info @AcCode %}

```cpp
void solve( )
{
    cin >> n >> t;
    for( int i = 1; i <= n; i ++ ) cin >> a[i];

    ll sum = 0;
    ll nxt = 0;
    
    for( int i = 1; i <= n; ++ i )
    {
        if( a[i] > nxt )
        {
            sum += a[i] - nxt;
            nxt = a[i] + 100;
        }
    }

    if( t > nxt ) sum += t - nxt;
    cout << sum << '\n';
}

```

{% endfold %}

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
