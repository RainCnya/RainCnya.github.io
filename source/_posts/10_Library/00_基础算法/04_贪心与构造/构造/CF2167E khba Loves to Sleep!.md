---
title: '[Leaf] [CF2167E] khba Loves to Sleep!'
tags:
  - 策略/构造
  - 单调性/二分
  - 难度/P2/提高
categories:
  - 10_Library
  - 00_基础算法
  - 04_贪心与构造
abbrlink: e2c6b2ef
date: 2026-01-06
---
# [CF2167E - khba Loves to Sleep!](https://codeforces.com/contest/2167/problem/E)

## 1. 核心逻辑

- **模型抽象**: 在 $[0, x]$ 内放置 $k$ 个互异传送点，使所有朋友到最近传送点的距离的**最小值最大化**。
    
- **逻辑支点**:
    
    - **反过来思考**: 设目标距离为 $d$，则对每个朋友坐标 $a_i$，区间 $(a_i - d, a_i + d)$ 为传送点的放置禁区。
        
    - **容量计算**:
        
        - 左侧可用区间 $[0, a_1 - d]$ 的容量为 $a_1 - d + 1$。
            
        - 两个朋友 $a_i, a_{i+1}$ 之间的可用区间 $[a_i + d, a_{i+1} - d]$ 容量为 $(a_{i+1} - a_i) - 2d + 1$。
            
        - 右侧可用区间 $[a_n + d, x]$ 的容量为 $x - a_n - d + 1$。
            
- **算力降维**:
    
    - 随着 $d$ 增大，可用点的总数单调递减。采用二分答案搜索最大可行 $d$。
        
## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 2e5 + 50;
ll a[maxn];
ll k, x, cnt;
int n;

void print( ll l, ll r )
{
    for( ll p = l; p <= r && cnt < k; ++ p )
    {
        cout << p << ( cnt == k - 1 ? "" : " " );
        ++ cnt;
    }
}

bool check( ll mid )
{
    ll tcnt = 0;
    if( a[1] >= mid )
    {
        tcnt += a[1] - mid + 1;
    }
    
    for( int i = 1; i < n; ++ i )
    {
        ll diff = a[i + 1] - a[i];
        if( diff >= mid * 2 )
        {
            tcnt += diff - 2 * mid + 1;
        }
    }

    if( x - a[n] >= mid )
    {
        tcnt += x - a[n] - mid + 1;
    }

    return tcnt >= k;
}

void solve( ) 
{
    cnt = 0;
    cin >> n >> k >> x;
    for( int i = 1; i <= n; ++ i ) 
    {
        cin >> a[i];
    }
    sort( a + 1, a + n + 1 );

    ll l = 0, r = x;
    ll ans = 0;

    while( l <= r )  
    {
        ll mid = l + ( r - l ) / 2;
        if( check( mid ) ) 
        {
            ans = mid;
            l = mid + 1;
        }
        else 
        {
            r = mid - 1;
        }
    }

    if( ans == 0 )
    {
        for( int i = 0; i < k; ++ i )
        {
            cout << i << ( i == k - 1 ? "" : " " );
        }
        cout << '\n';
        return;
    }

    if( a[1] >= ans ) 
    {
        print( 0, a[1] - ans );
    }
    
    for( int i = 1; i < n; ++ i )
    {
        ll st = a[i] + ans;
        ll ed = a[i + 1] - ans;
        if( st <= ed ) 
        {
            print( st, ed );
        }
    }

    if( x - a[n] >= ans ) 
    {
        print( a[n] + ans, x );
    }
    cout << '\n';
}

int main( ) 
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );
    
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

- **复杂度**: $O(N \log X)$。
    
- **灵感反思**: 将“传送点位置”转化为“禁区外可用区间的补集”，是处理坐标轴构造问题的标准降维思路。
    
- **关联母题**: [[构造体系]]