---
title: '[Leaf] [P5851] Greedy Pie Eaters P'
tags:
  - DP/区间
  - 策略/逆向思维
  - 难度/P4
categories:
  - 220_Library
  - 30_动态规划
  - 31_经典模型
abbrlink: 6ba58ea6
date: 2025-11-25 00:00:00
updated: 2026-02-02 22:46:49
---
# [P5851 [USACO19DEC] Greedy Pie Eaters P - 洛谷](https://www.luogu.com.cn/problem/P5851)

## 1. 题面梗概

**中译中**: 有 $N$ 个位置的饼，还有 $M$ 头奶牛。每头牛有个“势力范围” $[L_i, R_i]$ 和一个权值 $W_i$。若一头牛吃掉它的范围内一个饼，那这个范围内的饼全没了。一个饼只能被一头牛吃。求能获得的最大权值和。

## 2. 逻辑推理

第一反应是**贪心**：如果按牛的权值排序或者位置从左往右推呢？但这样会存在一个问题，由于一头牛会毁掉一整段饼，状态里就必须记录哪些饼还在。但这个复杂度 $O(2^{300})$，呵呵。

既然我们很难决定谁先吃，不妨反过来想，在区间 $[l,r]$ 中，位置 $k$ 上的饼最后是被哪头牛吃掉的？假设是被牛 $i$ 吃掉的，这就意味着：

1. 牛 $i$ 的势力范围必须包含 $k$，且牛 $i$ 的势力范围完全落在 $[l,r]$ 之内。
2. 位置 $k$ 左右两侧的区间 $[l,k-1]$ 和 $[k+1,r]$ 已经**独立**完成了它们的吃饼过程。

### 2.1 DP设计

既然如此，我们就可以考虑区间 DP 来正式解决这道题。

**定义**：$f[l][r]$ 为区间 $[l,r]$ 的饼的最大权值。

**转移**：枚举位置 $k$，假设 $k$ 处是最后被吃掉的。

$$
f[l][r] = \max_{l \leq k \leq r}(f[l][k-1] + f[k+1][r] + g[l][r][k])
$$
这里 $g[l][r][k]$ 表示包含位置 $k$ 且属于 $[l,r]$ 的牛的最大权值。

### 2.2 辅助函数

在区间 DP 之前我们需要解决这个 $g$ 函数的问题，而这个函数，我们同样可以用区间 DP 的方式预处理：

$$
g[l][r][k] = \max(g[l][r][k-1], g[l+1][r][k], g[l][r-1][k])
$$

本质上也是从小区间向大区间递推。

如此，我们就将复杂的重叠问题，转化为了以 $k$ 为支点的区间合并问题。

## 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 300 + 5;

ll f[maxn][maxn];
ll g[maxn][maxn][maxn];
int n, m;

void solve( )
{
    cin >> n >> m;
    for( int i = 1; i <= m; ++ i )
    {
        ll w, l, r;
        cin >> w >> l >> r;
        for( int k = l; k <= r; ++ k ) g[l][r][k] = max( g[l][r][k], w );
    }

    for( int len = 1; len <= n; ++ len )
    {
        for( int l = 1; l + len - 1 <= n; ++ l )
        {
            int r = l + len - 1;
            for( int k = l; k <= r; ++ k )
            {
                if( l < k ) g[l][r][k] = max( g[l][r][k], g[l+1][r][k] );
                if( k < r ) g[l][r][k] = max( g[l][r][k], g[l][r-1][k] );
            }
        }
    }

    for( int len = 1; len <= n; ++ len )
    {
        for( int l = 1; l + len - 1 <= n; ++ l )
        {
            int r = l + len - 1;
            for( int k = l; k <= r; ++ k )
            {
                f[l][r] = max( f[l][r], f[l][k-1] + f[k+1][r] + g[l][r][k] );            
            }
        }
    }
    cout << f[1][n] << '\n';
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

- **复杂度**: $O( N^3 )$。
    
- **碎碎念**：本题的一大关键在于逆向思维。如果一直纠结牛的进入顺序，这题就是不可做的。为什么是 **最后吃掉** $k$？因为如果 $k$ 不是最后吃掉的，那 $k$ 两边的区间就不可能保持独立，状态就无法转移。
        
- **关联笔记**: [[区间DP]]