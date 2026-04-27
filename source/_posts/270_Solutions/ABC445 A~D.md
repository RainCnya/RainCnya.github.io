---
title: Solution_ABC445 A~D
tags: ABC
date: 2026-02-14
---

## [A - Strong Word](https://atcoder.jp/contests/abc445/tasks/abc445_a)

### 1. 题意梗概

给定一个字符串 $S$，判断该字符串的首位字符与末位字符是否相同。

### 2. 逻辑推导

基础语法题。直接通过下标 `s[0]` 和 `s[n-1]` 进行比对即可。

### 3. 代码实现

C++

```cpp
void solve( )
{
    string s;
    cin >> s;
    int n = s.length( );
    if( s[0] == s[n - 1] ) cout << "Yes" << '\n';
    else cout << "No" << '\n';
}
```

---

## [B - Center Alignment](https://atcoder.jp/contests/abc445/tasks/abc445_b)

### 1. 题意梗概

给定 $N$ 个长度为奇数的字符串。求出所有字符串中最长的长度 $m$，并将所有字符串通过在前后填充点号 `.` 的方式对齐到长度 $m$。

### 2. 逻辑推导

简单模拟题，找出最大长度 $m$，然后由于是奇数对称的，所以单侧填充长度就是 $cnt = (m - len) / 2$。

### 3. 代码实现

```cpp
void solve( )
{
    cin >> n;
    int m = 0;
    for( int i = 1; i <= n; ++ i )
    {
        cin >> s[i];
        m = max( m, (int)s[i].length( ) );
    }

    for( int i = 1; i <= n; ++ i )
    {
        int cur = s[i].length( );
        int cnt = ( m - cur ) / 2;
        cout << string( cnt, '.' ) << s[i] << string( cnt, '.' ) << '\n';
    }
}
```

---

## [C - Sugoroku Destination](https://atcoder.jp/contests/abc445/tasks/abc445_c)

### 1. 题意梗概

有 $N$ 个单元格，每个格子写着一个数字 $A_i$。棋子从位置 $s$ 出发，每次移动到当前格子上写的数字对应的格子。求 $10^{100}$ 次移动后棋子的位置。

-   $1 \le N \le 5\times10^5$
-   $i \le A_i \le N\ (1 \le i \le N)$

### 2. 逻辑推导

这题有点小巧思，因为要求移动 $10^{100}$ 次，这就不能手动模拟了。

注意到一个关键约束 $A_i \ge i$，意味着棋子只能向后移动或留在原处。

所以经过极多次移动后，棋子 $x$ 一定会留在某个 $A_{x} = x$ 的自环上。

**DP**：由于路径没有回退（无环），我们可以反过来计算 每个点的最终归宿。

- 若 $A_{i} = i$，则终点是它自己；否则它的终点就是 $A_{i}$ 的终点。

> 插一嘴，有点像并查集了哈。

### 3. 代码实现

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

## [D - Reconstruct Chocolate](https://atcoder.jp/contests/abc445/tasks/abc445_d)

### 1. 题意梗概

给定 $N$ 个矩形巧克力碎片的尺寸 $(h_i, w_i)$，这些碎片是通过对一个 $H \times W$ 的大矩形进行 $N-1$ 次操作得到的；操作为切下一块放在桌上，手里留一块。求出每个碎片的左上角坐标 $(x_i, y_i)$。

### Constraints

-   $1 \leq H \leq 10^9$
-   $1 \leq W \leq 10^9$
-   $2 \leq N \leq 2\times 10^5$
-   $1 \leq h_i \leq H$
-   $1 \leq w_i \leq W$

### 2. 逻辑推导

这个 $N \leq 2e5$，就没法暴力了。

我们分析这个操作，每一次操作，都会让手上现有的巧克力切成两块，而且是沿着水平或者垂直线切的，这意味这什么？

这意味着切完之后这两块巧克力，要么 $h$ 相等，要么 $w$ 相等。

所以我们可以采用**贪心模拟**的策略，由于从最后一块开始拼装处理起来很麻烦，所以我们考虑从完整的巧克力开始切，考虑剩余的部分可以塞下谁。

维护当前剩余矩形的左上角坐标 `(cx, cy)` 和剩余尺寸 `(ch, cw)`。
    
1. 若存在碎片高度等于 `ch`，则该碎片填在当前列，`cy` 向右移动该碎片的宽度，`cw` 减少。
        
2. 若存在碎片宽度等于 `cw`，则该碎片填在当前行，`cx` 向下移动该碎片的高度，`ch` 减少。

然后就是快速查询的问题了，由于这题的 $H, W \le 1e9$，但是 $N \leq 2e5$，最直接的想法就是离散化，然后二分查询。

因为标准离散化写起来比较麻烦（苍天可鉴，代码复杂度高），我这里就偷懒采用 $map$ 作为离散化工具。

因为同一高度或者宽度的巧克力可能有很多，所以我开了一个 `map< int, set< int > >` 来存储，第一维是具体的值，第二位是符合条件的值的下标。

找到之后再通过 `erase` 函数删掉就行了，代码写起来很优雅，如下。

### 3. 代码实现

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 2e5 + 50;

struct Point { ll x, y; } ans[maxn];

map< int, set< int > > hh, ww;
ll h[maxn], w[maxn];
ll H, W;
int n;

void solve( )
{
    cin >> H >> W >> n;
    for( int i = 1; i <= n; ++ i )
    {
        cin >> h[i] >> w[i];
        hh[ h[i] ].insert( i );
        ww[ w[i] ].insert( i );
    }

    ll cx = 1, cy = 1;
    ll ch = H, cw = W;

    for( int i = 1; i <= n; ++ i )
    {
        int idx = -1;
        // 先判断高度有没有合适的
        if( hh.count( ch ) && !hh[ch].empty( ) )
        {
            idx = *hh[ch].begin( );
            ans[idx] = { cx, cy };
            cy += w[idx]; 
            cw -= w[idx];
        }
        // 如果没有高度合适的，就找长度合适的
        else if( ww.count( cw ) && !ww[cw].empty( ) )
        {
            idx = *ww[cw].begin( );
            ans[idx] = { cx, cy };
            cx += h[idx]; ch -= h[idx];
        }
        // 如果找到了能用的，就同步移除已经使用的碎片
        if( idx != - 1 )
        {
            hh[h[idx]].erase( idx );
            ww[w[idx]].erase( idx );
        }
    }
    // 输出
}
```
