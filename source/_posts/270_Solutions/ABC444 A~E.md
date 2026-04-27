---
title: Solution_ABC444 A~E
tags: ABC
categories:
  - 270_Solutions
abbrlink: f6702b6
date: 2026-02-07 00:00:00
---


写在前面，为什么没有 F 和 G，不嘻嘻，这两题没法写。

## [A - Repdigit](https://atcoder.jp/contests/abc444/tasks/abc444_a)

### 1. 题意梗概

给定一个 3 位的正整数 $N$。判断 $N$ 的十进制表示中，所有数位上的数字是否相同。

### 2. 逻辑推导

语法题。`Pass`

### 3. 代码实现

{% fold info @AcCode %}

```cpp
void solve( )
{
    int n;
    cin >> n;
    int a = n / 100;
    int b = n / 10 % 10;
    int c = n % 10;
    if( a == b && b == c) cout << "Yes" << '\n';
    else cout << "No" << '\n';
}
````

{% endfold %}

## [B - Digit Sum](https://atcoder.jp/contests/abc444/tasks/abc444_b)

### 1. 题意梗概

定义一个正整数 $n$ 的数位和为 $n$ 在十进制表示下各数位数字之和。

给定 $N$ 和 $K$，求所有不超过 $N$ 的正整数中，数位和恰好为 $K$ 的数字个数。

### 2. 逻辑推导

观察数据范围，本题 $N$ 的范围较小 $10^5$。在这种情况下，我们可以直接从 $1$ 遍历到 $N$，对每个数计算其数位和并判断是否等于 $K$。

时间复杂度为 $O(N \log_{10} N)$，可以通过。

### 3. 代码实现

{% fold info @AcCode %}
```cpp
int calc( int x )
{
    int res = 0;
    while( x )
    {
        res += x % 10;
        x /= 10;
    }
    return res;
}

void solve( )
{
    int n, k;
    cin >> n >> k;
    int cnt = 0;
    for( int i = 1; i <= n; ++ i )
    {
        if( calc( i ) == k ) cnt ++;
    }
    cout << cnt << '\n';
}
```
{% endfold %}

## [C - AtCoder Riko](https://atcoder.jp/contests/abc444/tasks/abc444_c)

### 1. 题意梗概

给定一个包含 $N$ 个正整数的序列 $A$。这些数字是由若干根长度为 $L$ 的零食经过摇晃后产生的。每根原始长度为 $L$ 的零食要么保持完整，要么断成两截（长度和为 $L$）。

求所有可能的原始长度 $L$。

### 2. 逻辑推导

这其实是一个构造问题，注意到每个零食只有两种情况，所以我们可以把目光转移到最大值上。

- **情况一**：$A_{max}$ 是一根完整的零食。那么 $L = A_{max}$。此时需要验证剩下的所有元素能否两两配对成 $A_{max}$。
    
- **情况二**：$A_{max}$ 也是断裂后的碎片之一。这意味着没有任何一根零食是完整的。此时，$A_{max}$ 必须与序列中最小的元素 $A_{min}$ 配对。即 $L = A_{min} + A_{max}$。    

因此，可能的 $L$ 只有两个可能得情况。我们只需对这两个值分别进行 $O(N)$ 的双指针配对检验即可。

### 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 3e5 + 50;

set< ll > res;

ll a[maxn];
int n;

bool check( int x )
{
    vector< int > tmp;
    for( int i = 1; i <= n; ++ i )
    {
        if( a[i] < x ) tmp.push_back( a[i] );
    }

    if( tmp.size( ) % 2 == 1 ) return 0;

    int l = 0, r = tmp.size( ) - 1;
    while( l < r )
    {
        if( tmp[l] + tmp[r] != x ) return 0;
        l ++, r --;
    }

    res.insert( x );
    return 1;
}

void solve( )
{
    cin >> n;
    ll sum = 0;
    for( int i = 1; i <= n; ++ i ) cin >> a[i], sum += a[i];
    sort( a + 1, a + n + 1 );

    int minv = a[1], maxv = a[n];

    check( maxv );

    check( minv + maxv );

    for( int ans : res ) cout << ans << ' ';

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

## [D - Many Repunit Sum](https://atcoder.jp/contests/abc444/tasks/abc444_d)

### 1. 题意梗概

给定 $N$ 个整数 $A_i$，对于每个 $A_i$，定义 $B_i$ 为由 $A_i$ 个 `1` 组成的整数（例如 $A_i=3 \to B_i=111$）。求 $\sum_{i=1}^{N} B_i$ 的值。

### 2. 逻辑推导

最直接的想法就是直接加起来，然后输出答案。但是这题麻烦就麻烦在 $A_i \leq 2 \times 10^5$，这个长度的数字 `__int128` 都存不下，高精度启动。

注意到 $A_i$ 表示前 $A_i$ 位都是 `1`，那我们就可以先统计每个长度出现的次数 `cnt[i]`。再跑一遍后缀和 `sum[i]` 表示长度 $\geq i$ 的数字个数。

接着模拟高精度加法模拟处理进位即可。

### 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 2e5 + 50;

int A[maxn];
int cnt[maxn];
int sum[maxn];
int n;

void solve( )
{
    cin >> n;
    
    int maxa = -1;
    for( int i = 1; i <= n; ++ i )
    {
        int a;
        cin >> a;
        maxa = max( maxa, a );
        cnt[a] ++;
    }

    for( int i = maxa; i >= 1; -- i )
    {
        sum[i] = sum[i+1] + cnt[i];
    }

    int len = maxa;
    int carry = 0;
    for( int i = 1; i <= len; ++ i )
    {
        ll cur = sum[i] + carry;
        A[i] = cur % 10;
        carry = cur / 10;
        if( i == len && carry > 0 ) len ++;
    }

    for( int i = len; i >= 1; -- i )
    {
        cout << A[i];
    }

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

## [E - Sparse Range](https://atcoder.jp/contests/abc444/tasks/abc444_e)

### 1. 题意梗概

给定一个长度为 $N$ 的数组 $A$ 和一个正整数 $D$。

求有多少子区间 $(L, R)$ 满足：区间内任意两个元素之差的绝对值都 $\ge D$。

### 2. 逻辑推导

其实看到这个 **子区间**，**计数**，**范围约束**。很容易会想到滑动窗口（双指针）的写法。

起手就可以固定右端点 $R$，尝试寻找最小的合法左端点 $L$。
    
如果区间 $[L, R]$ 合法，那么它的所有子区间 $[L+1, R], \dots, [R, R]$ 也都合法。

当加入新元素 $A_R$ 时，我们需要检查它是否与当前窗口 $[L, R-1]$ 内的元素冲突。

即 $[L,R-1]$ 内的元素是否存在一个值在区间 $(A_R - D, A_R + D)$。

前面都很简单，都很好想，但问题就在这里，这个判断怎么写呢？

首先排除暴力，因为一旦暴力复杂度就是 $N^2$，原地爆炸，双指针优化了个寂寞
（bushi。

我们需要一种能够快速进行**范围查询**的数据结构。

#### 2.1 辅助数据结构

1. **权值树状数组**

不难想到可以用权值树状数组来维护这个查询，但我们回到数据范围 $N \leq 4 \times 10^5$，$A_1 \leq 10^9$，$D \leq 10^9$。

这个值域可不好维护啊，注意到 $N \leq 4 \times 10^5$，好像可以离散化处理，这样就是可以接受范围的权值树状数组了。

Anyway，这里就会出现新的问题，因为每次加入的右端点之后，新的限制值域 $(A_R - D, A_R + D)$ 这两个边界的值没有离散化，所以这样离散化很麻烦，很难处理（理论上应该是可行的，不推荐）。

2. **平衡树**

利用红黑树的特性，我们可以在 $O(\log N)$ 的时间内完成这个动态维护和查找。

只需要 `lower_bound( A[r] - D + 1 )` 找到窗口内第一个 $\geq A_R - D + 1$ 的数。

然后再判断这个数是否冲突，即是否 $< A_R + D$，如果冲突就删掉，收缩窗口。

#### 2.2 set or multiset

直观上，如果数组中存在重复元素，应该使用 `multiset`。但结合题意分析：如果数组中存在两个相同的数，则它们的差值为 $0$，而题目给定的 $D \geq 1$，这显然是矛盾的。

这就意味着，合法区间内是不允许出现重复元素的，因此这里使用 `set` 也是能 AC 的，但逻辑上可能会有点奇怪。

不过这里我采用 `multiset` 维护窗口中的元素（赛场上没想到上面这个点）。

### 3. 代码实现

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