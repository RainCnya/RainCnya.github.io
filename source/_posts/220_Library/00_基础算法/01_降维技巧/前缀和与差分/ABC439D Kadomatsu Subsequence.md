---
title: '[Leaf] [ABC439D] Kadomatsu Subsequence'
tags:
  - 组合/贡献法
  - 算法/前缀差分
  - 难度/P2
categories:
  - 220_Library
  - 00_基础算法
  - 01_降维技巧
abbrlink: d9d9e338
date: 2026-01-05 00:00:00
---
# [ABC439D -  Kadomatsu Subsequence](https://atcoder.jp/contests/abc439/tasks/abc439_d "null")

## 1. 核心逻辑

- **模型抽象**: 给定序列 $A$，统计满足特定比例关系或代数性质的三元组 $(i, j, k)$ 数量，且要求 $i, k$ 同时位于 $j$ 的同侧。
    
- **破局路径**:
    
    1. **枚举支点**: 固定中间元素 $j$，题目要求 $i, k$ 都在 $j$ 左侧或都在 $j$ 右侧。
        
    2. **动态统计**: 维护两个计数器（如 `map`），分别记录当前扫描点左侧 (`cntl`) 和右侧 (`cntr`) 的权值频率。
        
    3. **贡献结算**: 扫描到 $j$ 时，预计算满足条件的 $i, k$ 对应的权值 $ii$ 和 $kk$，其贡献为 `cntl[ii] * cntl[kk] + cntr[ii] * cntr[kk]`。
        
- **细节处理**: 注意数据范围，乘法结算需使用 `long long` 防止溢出。

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 3e5 + 50;

int a[maxn];
int n;

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );
    cout.tie( 0 );

    map< int, ll > cntl, cntr;

    cin >> n;
    for( int i = 1; i <= n; ++ i )
    {
        cin >> a[i];
        cntr[ a[i] ] ++;  
    }

    ll ans = 0;
    for( int jj = 1; jj <= n; ++ jj )
    {
        cntr[ a[jj] ] --;

        if( a[jj] % 5 == 0 )
        {
            int cur = a[jj] / 5;
            ll ii = cur * 7ll;
            ll kk = cur * 3ll;

            if( cntl.count( ii ) && cntl.count( kk ) )
            {
                ans += cntl[ii] * cntl[kk];
            }
            
            if( cntr.count( ii ) && cntr.count( kk ) )
            {
                ans += cntr[ii] * cntr[kk];
            }
        }

        cntl[ a[jj] ] ++;
    }
    cout << ans << '\n';
    
    return 0;
}
```

{% endfold %}

## 3. 复盘

- **复杂度**: $O(N \log N)$，瓶颈在于 `map` 的维护。
    
- **灵感反思**: 贡献度拆解。通过将全局三元组计数转化为以 $j$ 为分割点的局部计数，并利用扫描过程动态维护`cntl`和`cntr`，实现了复杂度的降维。
    
- **关联知识点**: [[前缀和与差分]]