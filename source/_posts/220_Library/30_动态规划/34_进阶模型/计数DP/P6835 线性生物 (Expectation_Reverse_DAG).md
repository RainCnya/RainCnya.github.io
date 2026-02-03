---
title: 'P6835 [Cnoi2019] 线性生物'
tags:
  - DP/计数
  - 数学/概率
difficulty: 提高+/省选-
categories:
  - 220_Library
  - 30_动态规划
  - 34_进阶模型
abbrlink: 77237d38
date: 2025-11-12 00:00:00
---
# [Luogu-P6835](https://www.luogu.com.cn/problem/P6835) 线性生物

## ## 1. 核心逻辑

- **问题本质**: 在带返祖边的链式图上，求从起点 $1$ 走到终点 $N+1$ 的期望步数。
    
- **破局转换**:
    
    1. **期望线性性**: 总期望 = $\sum_{i=1}^{N} E(i \to i+1)$。
        
    2. **方程构建**: 从点 $i$ 出发有 $deg_i$ 条边。其中 1 条去往 $i+1$，其余 $|adj_i|$ 条去往返祖点 $y \le i$。
        
        $$E(i \to i+1) = \frac{1}{deg_i} \cdot 1 + \sum_{y \in adj_i} \frac{1}{deg_i} \cdot (1 + \text{dist}(y \to i) + E(i \to i+1))$$
    3. **模型坍缩**: $\text{dist}(y \to i) = \sum_{k=y}^{i-1} E(k \to k+1)$。 代入化简可得：$E(i \to i+1) = deg_i + \sum_{y \in adj_i} \sum_{k=y}^{i-1} E(k \to k+1)$。
        
    4. **优化**: 利用前缀和 $S[ i ] = \sum_{j=1}^{i} E(j \to j+1)$，实现 $O(1)$ 转移。
        

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
const int maxn = 1e6 + 50;
const int mod = 998244353;
ll e[ maxn ], s[ maxn ];
vector< int > adj[ maxn ];
int id, n, m;

int main( ) 
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> id >> n >> m;
    for( int i = 1; i <= m; ++ i ) 
    {
        int u, v; cin >> u >> v;
        adj[ u ].push_back( v );
    }

    for( int i = 1; i <= n; ++ i ) 
    {
        // e[i] 表示 i -> i+1 的期望。deg = adj[i].size() + 1
        ll sum_dist = ( ll )adj[ i ].size( ) + 1;
        for( int y : adj[ i ] ) 
        {
            // dist(y -> i) = S[i-1] - S[y-1]
            sum_dist = ( sum_dist + s[ i - 1 ] - s[ y - 1 ] + mod ) % mod;
        }
        e[ i ] = sum_dist;
        s[ i ] = ( s[ i - 1 ] + e[ i ] ) % mod;
    }

    cout << s[ n ] << "\n";
    return 0;
}
```

{% endfold %}

## 3. 归档备注

- **复杂度**: $O(N + M)$。
    
- **关键点**: 理解“期望的分解”。将大期望拆分为相邻节点的增量，并利用返祖边的特殊性质构建递推链条。