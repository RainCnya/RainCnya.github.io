---
title: '[Leaf] [ABC445F] Exactly K Steps 2'
tags:
  - 数学/矩阵快速幂
  - DP/优化
  - 难度/P4
categories:
  - 220_Library
  - 40_数学
abbrlink: f7bde76f
date: 2026-02-15 13:58:01
---

# [F - Exactly K Steps 2](https://atcoder.jp/contests/abc445/tasks/abc445_f)

## 1. 题面梗概

**中译中**：给一个 $N$ 个点的完全有向图，每条边 $(i, j)$ 都有代价 $C_{i,j}$。给定 $K$，对于每个起点 $s$，求出恰好经过 $K$ 条边并回到 $s$ 的最小总代价。

-   $1 \le N \le 100$
-   $1 \le K \le 10^9$
-   $0 \le C_{i,j} \le 10^9\ (1 \le i \le N,1 \le j \le N)$

## 2. 逻辑推导

考虑 DP，设 $dp[k][i][j]$ 表示**恰好**经过 $k$ 条边从 $i$ 到 $j$ 的最小代价。

那么很容易能写出一个转移方程。

$$
dp[k+1][i][j] = \min_{1 \le m \le N} \{ dp[k][i][m] + C_{m,j} \}
$$
为了走 $k + 1$ 步到 $j$，我可以先走 $k$ 步到某个中间点 $m$，然后再花 $C_{m,j}$ 的代价走最后一步。

但是！$k \leq 10^9$，直接状态转移，绝对会TLE，我们需要优化。

### 2.1 优化

对于这个数量级的规模，最简单想到的一种优化就是 二分 或者 倍增 这种带 $\log$ 的复杂度。

我们再拆解一下这个转移方程：

$$
dp[a + b][i][j] = \min_{1 \leq p \leq n}(dp[a][i][p] + dp[b][p][j])
$$

有思路了吗？没有？我们再对比一下下面这个柿子：

$$
C[i][j] = \sum( A[i][p] \cdot B[p][j])
$$

是不是惊人的相似，这里解释一下，下面这个是 矩阵乘法，而前面那个状态转移其实是满足 **结合律** 的。

我们只需要把 求和 替换为 取最小值，乘法 换成 加法，这个问题就可以用矩阵快速幂优化。

> 插入一句，这玩意学名好像叫 $(min, +)$ 卷积。

### 2.2 快速幂

既然这种运算符合 **结合律** 的，我们就可以定义一个初始代价矩阵 $M$，其中 $M_{i,j} = C_{i, j}$，经过 $K$ 条边的最短路径矩阵就是 $M^{K}$。

**单位矩阵**：在这个 $(min, +)$ 运算下，单位矩阵 $I$ 满足 $I_{i,i} = 0$，其余元素为 $\infty$。

### 2.3 广义单位矩阵

*这里插入一节拓展知识*。

在标准的算术矩阵中，单位矩阵 $I$ 的对角线是 $1$（乘法单位元），其余是 $0$（加法单位元）。

但在 $(\min, +)$ 代数系中：

- **乘法 $\to$ 加法**：其单位元是 $0$（因为 $x + 0 = x$）。
    
- **加法 $\to$ 最小值**：其单位元是 $\infty$（因为 $\min(x, \infty) = x$）。
    
因此，$(\min, +)$ 意义下的**单位矩阵** $I$ 必须满足：

- **对角线** $I_{i,i} = 0$：代表走 $0$ 步的代价为 $0$。
    
- **其余** $I_{i,j} = \infty$：代表走 $0$ 步无法到达其他位置。

> 但是这里我偷懒了，我直接把矩阵初始化为第一步的情况，就避免了 走 0 步 的边界处理。

### 2.4 结论

通过矩阵快速幂，我们将复杂度从 $O(K \cdot N^2)$ 降低到了 $O(\log K \cdot N^3)$。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 100 + 5;
const ll inf = 1e18;

ll n, k;

struct Mat {
    ll mat[maxn][maxn];
    Mat( ) { memset( mat, 0x3f, sizeof (mat) ); }
    
    // (min, +) 矩阵乘法
    Mat mul( const Mat &A, const Mat &B )
    {
        Mat res;
        for( int k = 1; k <= n; ++ k )
        {
            for( int i = 1; i <= n; ++ i )
            {
                if( A.mat[i][k] == inf ) continue;
                for( int j = 1; j <= n; ++ j )
                {
                    if( B.mat[k][j] == inf ) continue;
                    res.mat[i][j] = min( res.mat[i][j], A.mat[i][k] + B.mat[k][j] );
                }
            }
        }
        return res;
    }
    // 矩阵快速幂
    Mat pow( Mat A, ll k )
    {
        Mat res = A;
        while( k )
        {
            if( k & 1 ) res = mul( res, A );
            A = mul( A, A );
            k >>= 1;
        }
        return res;
    }
};

void solve( )
{
    cin >> n >> k;

    Mat c;
    for( int i = 1; i <= n; ++ i )
    {
        for( int j = 1; j <= n; ++ j )
        {
            cin >> c.mat[i][j];
        }
    }

	// 刚开始是 1 步，还需要再走 k - 1 步。
    Mat ans = c.pow( c, k - 1 );

    for( int i = 1; i <= n; ++ i )
    {
        cout << ans.mat[i][i] << '\n';
    }
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    solve( );
    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度分析**：$O(N^3 \log K)$。
    
- **碎碎念**：这道题的关键在于，将一个线性增长的 DP 过程，转化为一个对数增长的代数问题，然后通过矩阵快速幂加速。
    
- **关联笔记**：[[线性DP]] | [[矩阵快速幂]]
