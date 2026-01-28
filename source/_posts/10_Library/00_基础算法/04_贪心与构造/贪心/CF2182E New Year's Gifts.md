---
title: "[Leaf] [CF2182E] New Year's Gifts"
tags:
  - 策略/贪心
  - 数据结构/多重集
  - 难度/P2/提高
categories:
  - 10_Library
  - 00_基础算法
  - 04_贪心与构造
abbrlink: 391614d0
date: 2026-01-05
---
# [CF2182E - New Year's Gifts](https://codeforces.com/contest/2182/problem/E "null")

## 1. 核心逻辑

- **模型抽象**: 需求获取有两种路径：

	- 使用免费资源匹配门槛 $x$，或支付额外代价 $cost$ 强行获取。总预算为 $K$。
    
- **破局路径**:
    
    1. **基准转化**: 假设所有需求先拿基础收益（消耗基础开销），计算剩余预算。
        
    2. **第一路径（资源优先）**: 按代价降序排序（代价高的优先尝试匹配资源，以节省更多预算）。利用 `multiset::lower_bound` 寻找最小且满足门槛的资源。
        
    3. **第二路径（预算兜底）**: 匹配失败的需求，放入代价列表按升序排序，用剩余预算尽可能填补。
        
- **细节处理**: `lower_bound` 配合 `erase` 是处理动态资源匹配的标准算子。
    

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 2e5 + 50;

struct Node {
    ll x, y, z, cost;
    bool operator < ( const Node &other ) const {
        return cost > other.cost;
    }
} fri[maxn];

int n, m;
ll a[maxn];
ll k;

void solve( )
{
    cin >> n >> m >> k;

    multiset< ll > s;

    for( int i = 1; i <= m; ++ i )
    {
        cin >> a[i];
        s.insert( a[i] );
    }

    ll sum = 0;
    for( int i = 1; i <= n; ++ i )
    {
        cin >> fri[i].x >> fri[i].y >> fri[i].z;
        fri[i].cost = fri[i].z - fri[i].y;
        sum += fri[i].y;
    }

    ll remain = k - sum;
    ll ans = 0;
    vector< ll > remains;

    sort( fri + 1, fri + n + 1 );

    for( int i = 1; i <= n; ++ i )
    {
        auto it = s.lower_bound( fri[i].x );
        if( it != s.end( ) )
        {
            s.erase( it );
            ans ++;
        }
        else
        {
            remains.push_back( fri[i].cost );
        }
    }

    sort( remains.begin( ), remains.end( ) );

    for( ll cost : remains )
    {
        if( remain >= cost )
        {
            remain -= cost;
            ans ++;
        }
        else break;
    }
    
    cout << ans << '\n';
}

int main( )
{
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

## 3. 复盘

- **复杂度**: $O((N+M) \log M)$。
    
- **灵感反思**: 核心在于对“代价”的排序方向。先用资源覆盖掉高代价项，再用预算覆盖低代价项，这是双重资源约束下的最优解。
    
- **关联母题**: [[贪心体系]]