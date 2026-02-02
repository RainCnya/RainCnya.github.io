---
title: '[Leaf] [CF2187D] Shortest Statement Ever'
tags:
  - DP/数位
  - 策略/构造
  - 策略/贪心
  - 难度/P2/提高
categories:
  - 10_Library
  - 30_动态规划
  - 35_进阶模型
abbrlink: 3054ee91
date: 2026-01-31 00:00:00
---
# [CF2187D - Shortest Statement Ever](https://codeforces.com/contest/2188/problem/D)

## 1. 题面梗概

**中译中**: 给定两个数 $x, y$，找出两个数 $p, q$，满足 $p \& q = 0$，使得 $| x - p | + | y - q |$ 的值最小。

## 2. 逻辑推导

> 本题存在 数位DP 的通解，以及 贪心构造 的特解。

### 2.1 切入点

$p \& q = 0$ 这个约束条件提示我们，每一个二进制位 $i$ 都是不可共享的资源。对于第 $i$ 位，要不给 $p$，要不给 $q$，要不都没有。

既然我们的目标是最小化 $|x - p| + [y - q|$，当 $x, y$ 的第 $i$ 位都是 $1$ 呢？这是最棘手的情况，必须有一个数作出让步。

既然是让步，那么就存在两种情况，向下截断，或是向上进位。

那么问题就变成了，在 向下截断 带来的变小，和 向上进位 带来的变大，二者中找到平衡点。

### 2.2 数位DP

既然涉及到进位这种问题，数位DP是很显然的写法。通常的数位DP 是从高位到低位，但本题要处理加减法，状态比较麻烦，所以我们采用从低位到高位的DP设计。

我们先处理目标函数的这个绝对值，$\min(|x - p| + |y - q|)$，可以转化为 $\min({(x - p) + (y - q)}, {(x - p) - (y - q)}, {-(x - p) + (y - q)}, {-(x - p) - (y - q)})$。

其实就是枚举四种情况的符号，然后跑4遍DP即可。

**定义**：`dp[i][cx][cy]` 表示处理到第 $i$ 位，$x$ 的进位值 $cx$，$y$ 的进位值 $cy$。

以计算 $( p - x )$ 为例：

1. **当前位**：假设上一位传来的进位是 `last_cx`。当前位我们需要决策 $p_i$ 是 $0/1$。当前位实际数值差位：$val = last\_cx + p_i - x_i$。

2. **贡献**：当前位对答案的贡献就是剩下的余数：`cost = (val & 1) * (1 << i)`。

3. **进位**：新产生的进位为 `new_cx = val >> 1`。

### 2.3 贪心与构造

直觉上其实有一个猜想：最优解大概率在边界上，即 $p = x$，或者 $q = y$。

若我们固定 $p = x$，那么只需要寻找 $|q - y|$ 的最小值，且 $q \& x = 0$。我们只需要避开 $x$ 中二进制为 $1$ 的位置即可。

同样还是两种思路，向下取整，向上进位，计算完答案后取 $\min$ 即可。

## 3. 代码实现

{% fold info @AcCode DP %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const ll inf = 2e18;

struct Node {
    ll pp, qq;
    ll xx, yy;
} pre[35][3][3];
ll dp[35][3][3];

ll x, y, p, q;
ll ans;

void DP( int optx, int opty )
{
    for( int i = 0; i <= 31; ++ i )
    for( int j = 0; j < 3; ++ j )
    for( int k = 0; k < 3; ++ k )
    dp[i][j][k] = inf;

    dp[0][1][1] = 0;

    for( int i = 0; i <= 30; ++ i )
    {
        ll cur = 1ll << i;
        int xb = (x >> i) & 1;
        int yb = (y >> i) & 1;

		// 枚举上一步的进位状态 xx, yy
        for( int xx = 0; xx <= 2; ++ xx )
        {
            for( int yy = 0; yy <= 2; ++ yy )
            {
                if( dp[i][xx][yy] == inf ) continue;

				// 枚举当前位的 p, q 取值 0/1
                for( int pp = 0; pp <= 1; ++ pp )
                {
                    for( int qq = 0; qq <= 1; ++ qq )
                    {
                        if( pp == 1 && qq == 1 ) break;

                        int vx = xx - 1, vy = yy - 1;

                        if( optx == 1 ) vx += pp - xb;
                        else vx -= pp - xb;

                        if( opty == 1 ) vy += qq - yb;
                        else vy -= qq - yb;

                        int nx = (vx >> 1) + 1;
                        int ny = (vy >> 1) + 1;

                        if( nx < 0 || nx > 2 || ny < 0 || ny > 2 ) continue;

                        ll cost = ( ( vx & 1 ) + ( vy & 1 ) ) * cur;
                        if( dp[i][xx][yy] + cost < dp[i+1][nx][ny] )
                        {
                            dp[i+1][nx][ny] = dp[i][xx][yy] + cost;
                            pre[i+1][nx][ny] = { pp, qq, xx, yy };
                        }

                    }
                }

            }
        }

    }

    if( dp[31][1][1] < ans )
    {
        ans = dp[31][1][1];
        ll _p = 0, _q = 0;
        int xx = 1, yy = 1;

        for( int i = 31; i >= 1; -- i )
        {
            Node cur = pre[i][xx][yy];
            if( cur.pp ) _p |= ( 1ll << ( i - 1 ) );
            if( cur.qq ) _q |= ( 1ll << ( i - 1 ) );
            xx = cur.xx, yy = cur.yy;
        }
        p = _p, q = _q;
    }
}

void solve( )
{
    ans = inf;
    cin >> x >> y;

    DP( 1, 1 ); DP( 1, -1 );
    DP( -1, 1 ); DP( -1, -1 );

    cout << p << ' ' << q << '\n';
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int _t = 1;
    cin >> _t;
    while( _t -- ) solve( );
    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度**: $O(4 \times N \times 3^2)$，其中 $N \approx 30$。非常高效且稳健。
    
- **碎碎念**:
    
    - 遇到加减法 DP，若发现有进位/借位干扰，可以考虑改为从低到高进行DP。同时可以用枚举 $\pm$ 来拆解绝对值，这也是一个小技巧。
        
- **关联笔记**: [[数位DP]]