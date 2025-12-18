---
title: 传递闭包与Bitset优化 (Transitive_Closure_Bitset)
tags:
  - 传递闭包
  - Bitset
  - 连通性
categories:
  - 00_Atlas
  - 02_图论
abbrlink: d4dd66e8
date: 2025-12-16 15:30:00
---

## 1. 生态位

* **定义**: 计算图中所有点对 $(u, v)$ 是否可达。
* **解决痛点**: 
    * 稠密图的连通性查询。
    * **Bitset 优化**: 将 $O(N^3)$ 的 Floyd 优化 $1/32$ 或 $1/64$，解决 $N=2000$ 级别的问题。

## 2. 逻辑支点

* **Floyd 变体**: 若 $i$ 能到 $k$，且 $k$ 能到 $j$，则 $i$ 能到 $j$。
* **行压缩**: 用 `bitset<N> B[i]` 表示第 $i$ 行的状态（即 $i$ 能到达的点集）。
* **并行计算**: `if( B[i][k] ) B[i] |= B[k]`。意为：如果 $i$ 能到 $k$，那么 $k$ 能到的所有点，$i$ 也能到。

## 3. 实战部署

{% fold info @Code: Bitset Floyd %}
```cpp
// P4306 连通数
bitset<2005> f[2005];

void solve()
{
    int n; cin >> n;
    for( int i = 1; i <= n; ++ i )
    {
        string s; cin >> s;
        for( int j = 0; j < n; ++ j )
            if( s[j] == '1' ) f[i][j+1] = 1;
        f[i][i] = 1; // 自己到自己
    }
    
    // Floyd with Bitset
    for( int k = 1; k <= n; ++ k )
    {
        for( int i = 1; i <= n; ++ i )
        {
            if( f[i][k] ) f[i] |= f[k];
        }
    }
    
    int ans = 0;
    for( int i = 1; i <= n; ++ i ) ans += f[i].count();
    cout << ans << '\n';
}
```

{% endfold %}

## 4. 知识粘附

- **母题索引**:
    
    - **[P4306](https://www.luogu.com.cn/problem/P4306)**: 连通数。
        
    - **[B3611](https://www.luogu.com.cn/problem/B3611)**: 传递闭包。
      