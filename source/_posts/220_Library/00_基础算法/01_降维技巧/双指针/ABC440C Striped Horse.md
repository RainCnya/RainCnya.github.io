---
title: '[Leaf] [ABC440C] Striped Horse'
tags:
  - 算法/双指针
  - 难度/P1
categories:
  - 220_Library
  - 00_基础算法
  - 01_降维技巧
abbrlink: c10ff944
date: 2026-01-13 00:00:00
---
# [ABC440C - Striped Horse](https://atcoder.jp/contests/abc440/tasks/abc440_c "null")

## 1. 题面梗概（翻译）

存在 $N$ 个方格，编号 $1 \to N$。将第 $i$ 个方格涂黑的成本为 $Cost_i$。

寻找一个偏移量 $x$，使得周期性涂色总成本 $\sum_{i=1}^{N} Cost_{ (x+i) \mod (2w) < w }$ 最小。

{% fold info @参考 %}

```cpp
int sum = 0;
for( int i = 1; i <= n; ++ i )
{
	if( (i + x) % (2 * w) < w )
		sum += cost[i];
}
```

{% endfold %}

## 2. 逻辑推理

我们从具体的样例出发，观察题目中那个判定式 $( (x+i) \mod 2w ) < w$ 到底在做什么。

假设 $N=8, W=3$，我们来看当 $x=4$ 时的情况：

| 项目                        | $i=1$ | $i=2$ | $i=3$ | $i=4$ | $i=5$ | $i=6$ | $i=7$ | $i=8$ |
| ------------------------- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| $Cost$                    | 1     | 10    | 10    | 1     | 1     | 10    | 10    | 1     |
| $(x + i)$ <br>(**$x=4$**) | 5     | 6     | 7     | 8     | 9     | 10    | 11    | 12    |
| $\mod 2w$                 | 5     | 0 (√) | 1 (√) | 2 (√) | 3     | 4     | 5     | 0 (√) |
| **计入成本**                  | 否     | **是** | **是** | **是** | 否     | 否     | 否     | **是** |

**直觉发现**：

1. 判定条件本质上是在看 $(x+i)$ 对 $2w$ 取模后的余数。
    
2. 只有余数落在 $[0, w-1]$ 范围内的 $Cost$ 才会被累加。
    
3. 随着 $x$ 的变化，实际上是这块长度为 $w$ 的“有效取模区间”在 $0 \dots 2w-1$ 这个圆环上滑动。
    

**核心转化**： 

与其去枚举每一个 $x$ 再跑 $O(N)$ 算总和（这样会变成 $O(NW)$），不如**先统计每个余数对应的贡献**。

- 我们开一个数组 `cnt[r]`，记录所有满足 $(i \mod 2w) = r$ 的 $Cost_i$ 之和。
    
- 此时对于任何一个 $x$，其总成本就是 `cnt` 数组中一段长度为 $w$ 的**环形连续区间和**。
    
- 这样，问题就优化成了在一个长度为 $2w$ 的数组上跑一遍**滑动窗口**。

## 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 4e5 + 50;

ll cost[maxn];
ll cnt[maxn];
ll n, w;

void solve( )
{
    // 输入部分
    cin >> n >> w;
    for( int i = 1; i <= n; ++ i )
        cin >> cost[i];

    // 此处是多组数组初始化
    ll remain = w * 2;
    for( int i = 0; i < remain; ++ i ) 
        cnt[i] = 0;
    
    // 按余数分组
    for( int i = 1; i <= n; ++ i ) 
        cnt[i % remain] += cost[i];

    // 滑动窗口初始化
    ll sum = 0;
    for( int i = 0; i < w; ++ i )
        sum += cnt[i];

    // 标准滑动窗口
    ll ans = sum;
    for( int i = 0; i < remain; ++ i )
    {
        // 滑动窗口移动
        sum -= cnt[i]; 
        sum += cnt[(i + w) % remain];
        // 更新答案
        ans = min( ans, sum );
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

## 4. 复盘

- **复杂度**: $O( N + W )$
    
- **碎碎念**: 原题的表述比较抽象，但结合样例分析就能明白题目含义的。接着就是转化为标准的滑动窗口问题，通过贡献法解决。
    
- **关联笔记**: [[双指针]]