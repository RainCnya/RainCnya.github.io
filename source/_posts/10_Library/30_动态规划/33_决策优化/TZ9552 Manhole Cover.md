---
title: '[Leaf] [TZ9552] Manhole Cover'
tags:
  - 策略/贪心
  - 难度/P2/提高
categories:
  - 10_Library
  - 30_动态规划
  - 33_决策优化
abbrlink: 4784ed20
date: 2026-01-07
---
    

# [TZ9552 - Manhole Cover](https://www.tzcoder.cn/acmhome/problemdetail.do?method=showdetail&id=9552)

## 1. 核心逻辑

- **模型抽象**: 给定 01 序列，每秒结算一次“0”位置的索引和，然后可将一个“1”向相邻“0”移动。求 $m$ 秒后的最小总和。
    
    - **中译中**: 把井盖（1）往右挪。每挪一步，接下来的每一秒都能少一点湿度。
        
- **逻辑支点**:
    
    1. **单位收益**: 每一秒的一次移动，能使**后续所有秒数**的湿度增量减少 $1$。
        
    2. **步数统计**: 设初始 $1$ 的位置为 $p_1, p_2, \dots, p_k$，目标位置为 $n, n-1, \dots, n-k+1$。总可移动步数为 $cnt = \sum (Target_i - p_i)$。
        
    3. **分段结算**:
        
        - 第 1 秒增量为 $sum$（初始 0 的索引和）。
            
        - 只要能挪动，增量就会按 $sum, sum-1, sum-2, \dots$ 递减。
            
        - 这是一个公差为 $-1$ 的等差数列。
            

## 2. 逻辑演算

设初始湿度增量为 $S$，最大移动步数为 $C$：

- 若 $m \le C$:
    
    $$Ans = \sum_{i=0}^{m-1} (S - i) = \frac{(S + S - m + 1) \times m}{2}$$
- 若 $m > C$:
    
    $$Ans = \frac{(S + S - C + 1) \times C}{2} + (m - C) \times (S - C)$$

## 3. 代码实现

{% fold info @AcCode %}

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 2e5 + 50;

int n, m;

void solve( )
{
    cin >> n >> m;

    string s;
    cin >> s;
    s = ' ' + s;
    
    vector<int> pos; 
    ll sum = 0;

    for( int i = 1; i <= n; ++ i )
    {
        if( s[i] == '0' ) sum += i;
        if( s[i] == '1' ) pos.push_back( i );
    }

    int r = n;
    ll cnt = 0;
    for( int i = pos.size( ) - 1; i >= 0; -- i )
    {
        int l = pos[i];
        cnt += r - l;
        r --;
    }
    
    ll ans = 0;

    if( m <= cnt ) ans = ( sum + sum - m + 1 ) * m / 2;
    else ans = ( sum + sum - cnt + 1 ) * cnt / 2 + ( sum - cnt ) * ( m - cnt );

    cout << ans << '\n';
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);

    int _t = 1;
    cin >> _t;
    while( _t -- )
    {
        solve( );
    }
    return 0;
}
```

{% endfold %}

## 4. 复盘

- **复杂度**: $O(N)$。
    
- **认知补丁**:
    
    - 遇到“随时间变化的贡献”问题，优先考虑**单次操作对后续时间线的总贡献**（积分思维）。
        
    - 动态过程如果具有单调性（如本题盖子只能右移），通常可以转化为静态的步数结算。
        
- **关联母题**: [[Note] 决策优化与贡献度转化]