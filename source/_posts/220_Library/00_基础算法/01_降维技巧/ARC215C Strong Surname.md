---
title: '[Leaf] [ARC215C] Strong Surname'
tags:
  - 算法/前缀差分
  - 策略/转化
  - 难度/P4
categories:
  - 220_Library
  - 00_基础算法
  - 01_降维技巧
abbrlink: b5dccad
date: 2026-02-24 22:50:27
---

# [C - Strong Surname](https://atcoder.jp/contests/arc215/tasks/arc215_c)

## 1. 题面梗概

**中译中**：有 $N$ 个人，每个人有三个属性 $(X, Y, Z)$。两两合并时，如果 A 在三个属性上都严格大于 B，则 B 必须消失；否则，可以随机留下一方。

求：哪些人有可能成为最后的唯一幸存者？

> $N \le 2 \times 10^5, T \le 2 \times 10^5$

## 2. 逻辑推导

注意到两个约束 “有可能成为最后的幸存者” 和 “随机留下一方”。

反过来思考，谁不可能成为幸存者呢？如果 $A$ 的三维条件完全大于 $B$，那么 $B$ 就不可能成为幸存者。

### 2.1 三维偏序

如果我们把所有人 按照 $X$ 属性从大到小排序，有可能幸存的人，是否就是这个排序后的序列的前缀呢？

假设前 $k$ 个人能活下来，记作 $S$，也就是说 $S$ 中的每一个成员在 $Y$ 和 $Z$ 维度上都完全碾压 $S$ 外的所有人，那么 $S$ 外的所有人都无法淘汰 $S$ 内的任何一人，闭环。

### 2.2 优化

第一步排序，第二步寻找这个 $k$，我们需要前 $k$ 个人的最小 $Y$ 和 $Z$ 都大于后 $n - k$ 个人的最大 $Y$ 和 $Z$。

也就是说，我们需要维护 **前缀最小值** 和 **后缀最大值**。

**前缀最小值**：这个好处理，我们在从左往右线性扫描的时候就能维护。

**后缀最大值**：这个我们可以直接用一个 `suf` 数组来维护。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 2e5 + 5;
const int inf = 1e9;

struct Name { int x, y, z; } name[maxn];

int sufy[maxn], sufz[maxn];
int n;

bool cmp( Name a, Name b ) { return a.x > b.x; }

void solve( )
{
    cin >> n;
    
    for( int i = 1; i <= n; ++ i )
    {
        int x, y, z;
        cin >> x >> y >> z;
        name[i] = { x, y, z };
    }
    sort( name + 1, name + n + 1, cmp );
	
	// 预处理后缀最大值
    sufy[n + 1] = sufz[n + 1] = 0;
    for( int i = n; i >= 1; -- i )
    {
        sufy[i] = max( sufy[i + 1], name[i].y );
        sufz[i] = max( sufz[i + 1], name[i].z );
    }
    
    int miny = inf, minz = inf;
    int ans = n;
    for( int k = 1; k <= n; ++ k )
    {
        miny = min( miny, name[k].y );
        minz = min( minz, name[k].z );
        if( name[k].x > name[k + 1].x && miny > sufy[k + 1] && minz > sufz[k + 1] )
        {
            ans = k;
            break;
        }
    }
    cout << ans << '\n';
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int _t = 1;
    cin >> _t;
    while( _t -- ) solve( );
    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度分析**：$O(N \log N)$，瓶颈在于排序。
    
- **碎碎念**：这题的关键在于转化，乍一看像是 三维偏序 的 CDQ分治，但是转化后发现可以转化为一维的序列问题。
    
- **关联笔记**：[[降维技巧]]
