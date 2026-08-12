---
title: 'ABC448C Except and Min'
tags:
  - 策略/预处理
  - 算法/枚举
categories:
  - 260_Records
  - Archive
abbrlink: 4753aee0
date: 2026-03-08 00:00:00
---
# [C - Except and Min](https://atcoder.jp/contests/abc448/tasks/abc448_c)

## 1. 题意梗概

袋子里有 $N$ 个球，有 $Q$ 次询问，每次询问临时拿出 $K$ 个指定的球，求袋子里剩下的球中数字的最小值。询问结束后把球放回。

> $N \leq 3 \times 10^5; Q \leq 2 \times 10^5; K \leq 5$

## 2. 逻辑推导

## 1. 切入点

这题的突破点在于 $k \leq 5$ 哈。最小值的可能性是固定的。

## 2. 思路分析

注意到 $k \leq 5$，意味着每次查询的答案数据规模是固定的，最坏的情况是拿出了五个最小的球，答案就是第六小的球，由此发现虽然 $N \leq 3e5$ 但实际能用的数据只有前 $6$ 个最小的。

那么提前把这 $6$ 个提取出来，然后每次用取出的球 和 前六小的球 进行匹配，这样就解决了这个查询问题。

## 3. 代码实现

```cpp
// 这里用结构体存储球，因为要按照值排序，但是查询的时候还需要用到初始下标，所以这里也存了
struct Ball { int val, id; } a[maxn];
int n, q, k;
int b[10];

// 这里就是简单的排序逻辑，找出前六小的球
bool cmp( Ball a, Ball b ) { 
    if( a.val != b.val ) return a.val < b.val;
    return a.id < b.id; 
}

void solve( )
{
    cin >> n >> q;
    for( int i = 1; i <= n; ++ i ) 
    {
        cin >> a[i].val;
        a[i].id = i;
    }

    sort( a + 1, a + n + 1, cmp );

	// 简易 临时存储前 6 最小，方便 pk 匹配
    vector< Ball > tmp;
    int cnt = min( 6, n );
    for( int i = 1; i <= cnt; ++ i ) tmp.push_back( a[i] );

    while( q -- )
    {
        cin >> k;
        for( int i = 1; i <= k; ++ i ) cin >> b[i];

		// 下面这个语句略微有点奇怪，我给它换个形式哈
		// for( int i = 0; i < tmp.size( ); ++ i )
		// Ball ball = tmp[i];
		// 这里是等价的
        for( const auto &ball : tmp )
        {
	        // 标记是否被移除
            bool rmv = 0;
            for( int i = 1; i <= k; ++ i )
            {
                if( ball.id == b[i] )
                {
                    rmv = 1;
                    break;
                }
            }
            // 从小到大找，第一个没被移除的就是最终答案
            if( rmv == 0 )
            {
                cout << ball.val << '\n';
                break;
            }
        }
    }
}
```

---
