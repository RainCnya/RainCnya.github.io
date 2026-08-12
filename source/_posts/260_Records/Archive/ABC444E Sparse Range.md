---
title: 'ABC444E Sparse Range'
tags:
  - 策略/双指针
  - 数据结构/平衡树
  - 算法/滑动窗口
categories:
  - 260_Records
  - Archive
abbrlink: 54bff8b4
date: 2026-02-07 00:00:00
---
# [E - Sparse Range](https://atcoder.jp/contests/abc444/tasks/abc444_e)

## 1. 题意梗概

给定一个长度为 $N$ 的数组 $A$ 和一个正整数 $D$。

求有多少子区间 $(L, R)$ 满足：区间内任意两个元素之差的绝对值都 $\ge D$。

## 2. 逻辑推导

其实看到这个 **子区间**，**计数**，**范围约束**。很容易会想到滑动窗口（双指针）的写法。

起手就可以固定右端点 $R$，尝试寻找最小的合法左端点 $L$。
    
如果区间 $[L, R]$ 合法，那么它的所有子区间 $[L+1, R], \dots, [R, R]$ 也都合法。

当加入新元素 $A_R$ 时，我们需要检查它是否与当前窗口 $[L, R-1]$ 内的元素冲突。

即 $[L,R-1]$ 内的元素是否存在一个值在区间 $(A_R - D, A_R + D)$。

前面都很简单，都很好想，但问题就在这里，这个判断怎么写呢？

首先排除暴力，因为一旦暴力复杂度就是 $N^2$，原地爆炸，双指针优化了个寂寞
（bushi。

我们需要一种能够快速进行**范围查询**的数据结构。

### 2.1 辅助数据结构

1. **权值树状数组**

不难想到可以用权值树状数组来维护这个查询，但我们回到数据范围 $N \leq 4 \times 10^5$，$A_1 \leq 10^9$，$D \leq 10^9$。

这个值域可不好维护啊，注意到 $N \leq 4 \times 10^5$，好像可以离散化处理，这样就是可以接受范围的权值树状数组了。

Anyway，这里就会出现新的问题，因为每次加入的右端点之后，新的限制值域 $(A_R - D, A_R + D)$ 这两个边界的值没有离散化，所以这样离散化很麻烦，很难处理（理论上应该是可行的，不推荐）。

2. **平衡树**

利用红黑树的特性，我们可以在 $O(\log N)$ 的时间内完成这个动态维护和查找。

只需要 `lower_bound( A[r] - D + 1 )` 找到窗口内第一个 $\geq A_R - D + 1$ 的数。

然后再判断这个数是否冲突，即是否 $< A_R + D$，如果冲突就删掉，收缩窗口。

### 2.2 set or multiset

直观上，如果数组中存在重复元素，应该使用 `multiset`。但结合题意分析：如果数组中存在两个相同的数，则它们的差值为 $0$，而题目给定的 $D \geq 1$，这显然是矛盾的。

这就意味着，合法区间内是不允许出现重复元素的，因此这里使用 `set` 也是能 AC 的，但逻辑上可能会有点奇怪。

不过这里我采用 `multiset` 维护窗口中的元素（赛场上没想到上面这个点）。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 4e5 + 50;

multiset< ll > s;
ll a[maxn], D;
int n;

void solve( )
{
    cin >> n >> D;
    for( int i = 1; i <= n; ++ i ) cin >> a[i];

    ll ans = 0;
    ll l = 1; 
    for( ll r = 1; r <= n; ++ r )
    {
	    // while 此处作用为收缩窗口 把不满足条件的 a[l] 都删掉
        while( 1 )
        {
            auto it = s.lower_bound( a[r] - D + 1 );
            if( it != s.end( ) && *it < a[r] + D ) s.erase( s.find( a[l ++] ) );
            else break;
        }

        ans += r - l + 1;
        s.insert( a[r] );
    }

    cout << ans << endl;
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
