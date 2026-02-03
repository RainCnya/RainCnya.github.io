---
title: '[Leaf] [ABC440D] Forbidden List 2'
tags:
  - 策略/二分答案
  - 难度/P2
categories:
  - 220_Library
  - 00_基础算法
  - 02_排序与二分
abbrlink: 509521cc
date: 2026-01-13 00:00:00
---
  
# [ABC440D - Forbidden List 2](https://atcoder.jp/contests/abc440/tasks/abc440_d "null")

## 1. 题意梗概（翻译）

有一组长度为 $N$ 的各不相同的数列。

有 $Q$ 次询问，问在大于等于 $X$ 的整数中，不在数组中的第 $Y$ 个最小值。

## 2. 逻辑推导

直接遍历查找，在多次查询效率极低，必定会 `TLE`，因此我们需要优化。

注意到所有数各不相同，同时询问对元素的顺序没有强制要求，所以我们可以先用 `sort` 进行单调性处理。

### 分析样例

```text
5 4
16 9 2 3 1

6 10
12 4
1 1
1000000000 1000000000
```

排完序后 `1, 2, 3, 9, 16`。
第一个询问 $x = 6, y = 10$：`6, 7, 8, 9, 10, 11, 12, 13, 14`

| 顺序  | 1   | 2   | 3   | ~~4~~ | 4   | 5   | 6   | 7   | 8   | 9   | ~~10~~ | 10  |
| --- | --- | --- | --- | ----- | --- | --- | --- | --- | --- | --- | ------ | --- |
| 值   | 6   | 7   | 8   | 9 出现  | 10  | 11  | 12  | 13  | 14  | 15  | 16 出现  | 17  |
所以此次询问答案为 $17$。

### 深入分析：

从上面的分析可以发现，其实该询问类似于：寻找**第 $k$ 个不存在的数**。

直接找很麻烦，为了找到缺失的数，我们可以换个角度：记 $B_i = A_i - i$，当然是 `sort` 后的。

这个 $B_i$ 的意思就是 $[1,A_i]$ 中少了几个数。当然 $B$ 数组也是单调的，这里不证明了。

这样我们就可以把询问 $(X,Y)$ 转化为：先找出 $[1,X)$ 有多少个缺失的数，然后再查找满足条件的那个数。

{% fold info @Logic %}

```cpp
// 第一步：计算出 X 前缺少了几个数。
// lower_bound 找到第一个 >= x 的位置，也就是前面有几个数比 x 小
int cnt = lower_bound( a + 1, a + n + 1, x ) - a;
int miss = x - cnt;

// 第二步：转换为全局的第 K 个缺失数。
int k = y + miss;

// 第三步：查询，在 B 数组里找到这个 K。
// pos 是第一个使得 B[pos] >= k 的下标
int pos = lower_bound( b + 1, b + n + 1, k ) - b;

// 第四步：输出答案。
// 数值 = 缺失排名 + 存在数个数（跳过了）
cout << k + ( pos - 1 ) << '\n';
```

{% endfold %}

## 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 3e5 + 50;

ll a[maxn];
ll b[maxn];
int n, q;

int main( )
{
    cin >> n >> q;
    for( int i = 1; i <= n; ++ i )
    {
        cin >> a[i];
    }

    sort( a + 1, a + n + 1 );

    for( int i = 1; i <= n; ++ i )
    {
        b[i] = a[i] - i;
    }

    for( int i = 1; i <= q; ++ i )
    {
        ll x, y;
        cin >> x >> y;

        int cnt = lower_bound( a + 1, a + n + 1, x ) - a;

        ll miss = x - cnt ;
        ll k = y + miss;

        int pos = lower_bound( b + 1, b + n + 1, k ) - b;
        ll ans = k + ( pos - 1 );

        cout << ans << '\n'; 
    }

    return 0;
}
```

{% endfold %}

## 3. 复盘

- **复杂度**: $O( (N + Q) \log N )$。
    
- **碎碎念**: 绕来绕去麻烦吧，不过其实注意到单调性就可以往二分上面靠了。
    
- **关联笔记**: [[二分体系]]