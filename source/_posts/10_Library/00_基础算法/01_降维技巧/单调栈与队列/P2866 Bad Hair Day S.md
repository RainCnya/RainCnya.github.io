---
title: '[Leaf] [P2866] [USACO06NOV] Bad Hair Day S'
tags:
  - 单调性/单调栈
  - 算法/贡献法
  - 难度/P1/提高-
categories:
  - 10_Library
  - 00_基础算法
  - 01_降维技巧
abbrlink: c971b93
date: 2025-11-6
update: 2026-01-28 17:23:23
---
# [Luogu-P2866](https://www.luogu.com.cn/problem/P2866) Bad Hair Day S

## 1. 题面梗概

**中译中**: 有一群牛排队，每头牛只能看到它右边比它矮的牛的头顶。一旦遇到一个比它高的或者一样高的，视线就被挡住了。问所有牛能看到的头顶总数。

## 2. 逻辑推导

**直觉**： 按题意，我们可以去算 **每头牛能看到多少牛**。但这很难麻烦，因为你要往右扫，遇到高个子才停，这在最坏情况下（递减序列），复杂度会退化到 $O(N^2)$。

**转换视角**：与其问 我能看到谁，不如问 **谁能看到我**？

- 如果我站在位置 $i$，谁能看到我的头顶？答案很显然：所有在我左边，且和我之间没有比我高的牛。
    
- 换句话说，当我进入队列时，如果我左边那些牛都比我高，那它们都能看到我。如果有个牛比我矮，它绝对看不到我，而且由于我的存在，它后面的牛也永远看不到我了。

这样看，问题就转换为了维护一个**单调递减**的栈，为什么前面说队列，这里又说是栈呢？因为我们不考虑区间，也就是队头出队的情况。


## 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    int n;
    cin >> n;

    stack< int > stk;
    ll ans = 0;

    for( int i = 1; i <= n; ++ i )
    {
        int h; cin >> h;
        while( !stk.empty( ) && stk.top( ) <= h ) stk.pop( );
        ans += stk.size( );
        stk.push( h );
    }
    cout << ans << endl;
    return 0;
}
```

{% endfold %}

## 4. 复盘

- **复杂度**: $O( N )$。每头牛进出栈各一次。
    
- **碎碎念**: 视角转换是这道题的关键思路。
        
- **关联笔记**: [[单调栈与队列]] | [[贡献法]]