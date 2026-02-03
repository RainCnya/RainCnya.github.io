---
title: '[Leaf] [ABC441E] A > B substring'
tags:
  - 数据结构/树状数组
  - 算法/前缀差分
  - 难度/P2
categories:
  - 220_Library
  - 10_数据结构
  - 11_树形结构
abbrlink: 44e8719f
date: 2026-01-19 00:00:00
---

# [ABC441E A > B substring](https://atcoder.jp/contests/abc441/tasks/abc441_e )

## 1. 题面梗概（翻译）

给定一个仅包含 `A, B, C` 的字符串 $S$，长度为 $N$。求有多少个子串满足其中 `A` 的出现次数严格大于 `B` 的出现次数。
    

## 2. 逻辑推导

问有多少个区间内 `A` 的数量大于 `B`。

我们只关心 `A` 和 `B` 的相对数量。令 `A = 1`, `B = -1`, `C = 0`。

对于一个子串 $[l,r]$ 满足条件 $\iff$ $\sum_{k=1}^{r}(cnt[k]) > 0$

既然要用区间和，不妨用前缀和优化。

那么问题就转化为了，找到 $i < j$ 使得 $s[j] - s[i-1] > 0 \iff s[i-1] < s[j]$，咦，看起来这就是 "顺序对" 啊。

那么这里有两种方案了。"树状数组" / "归并排序"。

我才用树状数组来统计答案，应该是比较经典的写法。

注意：有负数，所以用一个偏移量来处理。

## 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 5e5 + 50;
int BIT[maxn << 1];
string s;
int offset = maxn;
int n;

int lowbit( int x )
{
    return x & -x;
}

void add( int idx, int val )
{
    for( ; idx <= ( maxn << 1 ); idx += lowbit( idx ) )
    {
        BIT[idx] += val;
    }
}

ll query( int idx )
{
    ll res = 0;
    for( ; idx > 0; idx -= lowbit( idx ) )
    {
        res += BIT[idx];
    }
    return res;
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n >> s;
    // 个人习惯，转为 1-Base 计算
    s = ' ' + s;

    ll ans = 0;
    int cnt = 0;
    
    // 初始前缀和 P[0] = 0 入树
    add( offset, 1 );

    for( int i = 1; i <= n; ++ i )
    {
        if( s[i] == 'A' ) cnt ++;
        else if( s[i] == 'B' ) cnt --;

        // 统计之前出现过的所有 P[j] < P[i] 的个数
		// 答案统计，注意是统计到 cnt - 1，cnt 不算
        ans += query( cnt + offset - 1 );
        add( cnt + offset, 1 );
    }

    cout << ans << '\n';
    return 0;
}
```

{% endfold %}

## 4. 复盘

- **复杂度**: $O( N \log N )$，瓶颈在于树状数组的单点修改与区间查询。
    
- **碎碎念**: 看到“**A 比 B 多**”这种相对关系的区间统计，第一反应就是转化为 $1$ 和 $-1$。把问题从“字符统计”拉回到“数值求和”，逻辑就清晰了。
- **Trick**：树状数组处理负数索引时，`offset` 必须给足，防止下标越界。
    
- **关联笔记**: [[树状数组]]