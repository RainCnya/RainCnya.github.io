---
title: '[Leaf] [TZ9506] 灵脉共鸣'
tags:
  - 数论/整除/GCD
  - 难度/P3
difficulty: P2
categories:
  - 220_Library
  - 40_数学
  - 41_数论基础
abbrlink: e32cbbf7
date: 2026-01-06 00:00:00
---
    
# [9506:归元大帝的「灵脉共鸣」仪式](https://www.tzcoder.cn/acmhome/problemdetail.do?method=showdetail&id=9506)

## 1. 核心逻辑

- **模型抽象**: 
		
	- 给定序列，最多修改 $k$ 个数，求修改后全序列的最大公约数（GCD）最大值。
	    
- **破局路径**:
	    
    - **值域降维**: 最终的 GCD 一定是原序列中至少 $n-k$ 个数的约数。
        
    - **预处理约数**: 利用调和级数 $O(V \log V)$ 预处理出值域内每个数的所有约数。
        
    - **频次统计**: 遍历序列中的数，统计其所有约数出现的频次。若某个约数 $d$ 的频次 $\ge n-k$，则 $d$ 是一个合法候选解。
        
- **细节处理**:
    
    - 当 $n=k$ 时，可以将所有数修改为任意大的值，输出 -1。
        
    - 使用约数桶进行 $O(1)$ 的频次更新与回滚，避免多测清空导致的复杂度爆炸。

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxn = 5e5 + 5;
vector< int > divs[maxn];
int bucket[maxn];
int p[maxn];
int cnt[maxn];

void init( )
{
    for( int i = 1; i < maxn; ++ i )
    {
        for( int j = i; j < maxn; j += i )
        {
            cnt[j] ++;
        }
    }
    for( int i = 1; i < maxn; ++ i )
    {
        divs[i].reserve( cnt[i] );
    }
    for( int i = 1; i < maxn; ++ i )
    {
        for( int j = i; j < maxn; j += i )
        {
            divs[j].push_back( i );
        }
    }
}

void solve( )
{
    int n, k;
    cin >> n >> k;
    
    for( int i = 1; i <= n; ++ i ) cin >> p[i];

    if( n == k )
    {
        cout << -1 << '\n';
        return;
    }

    int ans = 1;
    for( int i = 1; i <= n; ++ i )
    {
        for( int &d : divs[p[i]] )
        {
            bucket[d] ++;
            if( bucket[d] >= n - k )
            {
                ans = max( ans, d );
            }
        }
    }

    cout << ans << '\n';

    // 逻辑回滚：仅清理受影响的桶
    for( int i = 1; i <= n; ++ i )
    {
        for( int &d : divs[p[i]] )
        {
            bucket[d] --;
        }
    }
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    init( );
    
    int t;
    cin >> t;
    while( t -- )
    {
        solve( );
    }
    return 0;
}
```

{% endfold %}

## 3. 复盘

- **复杂度**: 预处理 $O(V \log V)$，单次查询 $O(N \times \text{Divisors})$。
    
- **灵感反思**: 该题强化了“以值域为底盘”的思维。

	- 在面对 GCD 组合优化时，直接从约数频次入手通常比分析质因子更直观。
    
- **关联母题**: [[Note] 调和级数计数技巧]