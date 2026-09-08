---
title: CF2257E Busy Beaver
tags:
  - 贪心/优先队列
  - 贪心/分段
status: solved
categories:
  - 260_Records
  - Misc
abbrlink: df94c64c
date: 2026-09-07 00:00:00
updated: 2026-09-08 00:00:00
---

# 先吃完非亏损段，再选一栋楼冲刺

> [!question] [CF2257E Busy Beaver](https://codeforces.com/problemset/problem/2257/E)
> 有 $n$ 栋建筑，每栋必须从下往上施工。建第 $i$ 栋第 $j$ 层时先支付 $a_{i,j}$，再获得 $b_{i,j}$；不同建筑之间可以任意交错。给定初始资金 $x$，要求让某一栋楼尽量高，并在并列时取最小编号。
>
> 数据规模：$1\le n\le2\times10^5$，$0\le x\le10^{18}$，所有测试中总楼层数不超过 $2\times10^5$。

单层可能亏损，但和后续若干层合起来可以不亏，所以可以把每栋楼自下而上分段，记录下每一段净收益非负。

最开始把一段的入口资金记成了这一段最大的单层花费，但这是错的。比如 $a = (5, 5)$，$b = (0, 20)$，那么整段仍然净赚，但是入口资金应该是 10。

所以每一段的入口资金应该是 $\max(a[j] - pre)$，$pre$ 表示当前层之前的累计净收益。由于每一段做完资金是不减少的，所以我们可以贪心先把所有有收益的楼层都做了。

注意每一栋楼内部有先后顺序，这样用一个类似多路归并的小根堆来处理即可。如果堆顶都做不了，那么就无法再赚经费了，此时可以考虑最后选一栋楼冲刺高度了。

```cpp title:"CF2257E" fold
struct Task {
    ll cost, diff, id, len;
    bool operator < ( const Task &rhs ) const {
        return cost > rhs.cost;
    }
};

void solve( ) {
    int n = read( ); 
    ll x = read( );
    
    vector<ll> high( n + 1 );
    vector< deque<Task> > tasks( n + 1 );

    vector< vector<ll> > a( n + 1 );
    vector< vector<ll> > b( n + 1 );
    
    priority_queue<Task> pq;
    for( int i = 1; i <= n; ++ i ) {
        int m = read( );
        a[i].resize( m + 1 );
        b[i].resize( m + 1 );
        for( int j = 1; j <= m; ++ j ) a[i][j] = read( );
        for( int j = 1; j <= m; ++ j ) b[i][j] = read( );
        ll mxcost = 0, sum = 0, st = 1;
        for( int j = 1; j <= m; ++ j ) {
            mxcost = max( mxcost, a[i][j] - sum );
            sum += b[i][j] - a[i][j];
            if( sum >= 0 ) {
                tasks[i].push_back({ mxcost, sum, i, j - st + 1 });
                st = j + 1;
                mxcost = 0;
                sum = 0;
            }
        }
    }

    for( int i = 1; i <= n; ++ i ) {
        if( tasks[i].empty( ) ) continue;
        pq.push( tasks[i].front( ) );
        tasks[i].pop_front( );
    }

    while( !pq.empty( ) ) {
        auto [cost, diff, id, len] = pq.top( );
        if( x < cost ) break; 
        pq.pop( );
        x += diff;
        high[id] += len;
        if( tasks[id].empty( ) ) continue;
        pq.push( tasks[id].front( ) );
        tasks[id].pop_front( );
    }

    ll ans = -1;
    int id = -1;
    for( int i = 1; i <= n; ++ i ) {
        ll cur = x, h = high[i];
        for( int j = high[i] + 1; j < (int)a[i].size( ); ++ j ) {
            if( cur < a[i][j] ) break;
            cur += b[i][j] - a[i][j];
            h ++;
        }
        if( h > ans ) ans = h, id = i;
    }

    cout << ans << " " << id << "\n";
}
```
