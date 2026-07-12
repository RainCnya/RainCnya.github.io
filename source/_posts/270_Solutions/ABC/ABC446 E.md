---
title: '[Solution] ABC446 A~E'
tags:
categories:
  - 270_Solutions
  - ABC
abbrlink: 75a751d6
date: 2026-02-21 00:00:00
---

## [E - Multiple-Free Sequences](https://atcoder.jp/contests/abc446/tasks/abc446_e)

### 1. 题意梗概

给定一组 $M, A, B$，对于所有 $0 \leq x, y \leq M - 1$，统计有多少对 $(x, y)$ 满足条件：

**条件**：序列中不包含 $M$ 的倍数。
**序列**：$s_1 = x, s_2 = y, s_n = A s_{n-1} + B s_{n-2}$ 

> $M \leq 1000, A, B \leq M - 1$

### 2. 逻辑推导


注意到 $s_{n}$ 的值取决于 $s_{n-1}$ 和 $s_{n-2}$ 两个值，涉及到倍数，我们只需要在 模 $M$ 的剩余系里面搜索即可。

> 吐槽，这个转移有点像斐波那契数列，只是常数不同。

而理论上在 模 $M$ 的剩余系里面，总共只有 $M^2$ 个状态，因此在某次转移之后，它必然回到了之前的某一个状态，也就是出现了环。

如果某个环上有一个 $0$，那这整个环中的所有状态都是不可能满足条件的。

因为 $M^2 \leq 10^6$，这就很适合采用 **记忆化搜索** 的打法，

**接着确立边界条件**：`dfs( int x, int y );`

若 $x = 0$ 或者 $y = 0$，都是不可行的；若 $Ax + By \pmod M = 0$，也是不可行的。

接着我们就可以快乐地开始记忆化搜索了，这里特别处理非 $0$ 环，如果搜索过程中找到了之前搜过的状态，并且没出现 $0$，就说明当前环上所有状态都是非 $0$ 的。

### 3. 代码实现

```cpp
// 记忆化搜索
int dfs( int x, int y )
{
    if( x == 0 || y == 0 ) return 0; // 不合法
    if( memo[x][y] != -1 ) return memo[x][y]; // 记忆化
    if( vis[x][y] ) return 1; // 发现环且此前未撞 0，安全

    vis[x][y] = 1; // 标记
    ll nxt = ( a * y + b * x ) % m;
    int res = dfs( y, nxt );
    vis[x][y] = 0; // 回溯

    return memo[x][y] = res; // 记录并返回
}

void solve( )
{
    cin >> m >> a >> b;
    memset( memo, -1, sizeof( memo ) );
    ll cnt = 0;
    for( int x = 0; x <= m - 1; ++ x )
        for( int y = 0; y <= m - 1; ++ y )
            cnt += ( dfs( x, y ) == 1 ); // 统计非 0 状态
    cout << cnt << '\n';
}
```
