---
title: P3467 PLA-Postering
tags:
  - algorithm/记录
  - 数据结构/单调栈
status: solved
categories:
  - 260_Records
  - Temp
abbrlink: a3467001
date: 2026-07-29 00:00:00
updated: 2026-07-29 00:00:00
---

# PLA-Postering：维护仍未结束的高度层

> [!question] [P3467 PLA-Postering - 洛谷](https://www.luogu.com.cn/problem/P3467)
> 给出一条由若干建筑组成的轮廓，求覆盖整个轮廓至少需要多少张矩形海报。

扫描轮廓时，与其尝试确定每张海报的左右端点，不如维护当前仍可能向右延伸的高度层。

栈中保存尚未结束的不同高度，并保持单调递增。读入新的高度 $h$ 时：

1. 所有高于 $h$ 的层不可能跨过当前位置，依次弹出；
2. 若栈顶已经等于 $h$，说明这个高度层可以由之前开启的同一张海报继续覆盖；
3. 否则必须从当前位置新开一张高度为 $h$ 的海报，答案加一。

```cpp title:"P3467" fold
using namespace std;
using ll = long long;
using ull = unsigned long long;
using i128 = __int128_t;

const int maxn = 3e5 + 5;
const int mod = 998244353;
const ll inf = 4e18;

ll read( ) {
    ll x = 0, f = 1;
    char ch = getchar( );
    for( ; !isdigit( ch ); ch = getchar( ) ) if( ch == '-' ) f = -1;
    for( ; isdigit( ch ); ch = getchar( ) ) x = x * 10 + ch - '0';
    return x * f;
}

void solve( ) {
    int n = read( );
    stack<int> stk;
    int cnt = 0;
    stk.push( 0 );
    for( int i = 1; i <= n; ++ i ) {
        int x = read( ), y = read( );
        while( !stk.empty( ) && stk.top( ) > y ) stk.pop( );
        if( stk.top( ) != y ) ++ cnt;
        stk.push( y );
    }
    cout << cnt << '\n';
}
```

横坐标只保证轮廓的先后顺序；对于海报数量，真正影响状态的是相邻位置的高度变化。

## 为什么等高不能重复计数

例如高度序列：

```text
2 5 3 5
```

第二个高度 $5$ 在遇到 $3$ 时已经被弹出，因为高度下降说明原来的 $5$ 层被截断。最后再次遇到 $5$ 时必须重新开海报。

而序列：

```text
2 5 2
```

回到 $2$ 后，栈中原来的 $2$ 仍然存在，说明这一层从左到右没有被更低轮廓截断，不需要新增海报。

因此栈记录的不是“出现过哪些高度”，而是“哪些高度层目前仍连续有效”。

每个高度最多入栈、出栈一次，时间复杂度为 $O(n)$，空间复杂度为 $O(n)$。

## 与当前 AC 实现的差别

当前代码即使遇到与栈顶相等的高度也会再次 `push`。这些重复元素之后会一起弹出，不影响计数正确性。初稿中的代码保持 AC 文件原样，不在记录中改写实现。

## 记录

这题暂记为 **B 类记录**。它适合作为单调栈“维护仍然有效的层”这一模型的短例题；若后续重构单调栈专题，可以压缩后并入专题，而不必长期保留完整独立题解。

> [!todo] 人工修改
> 可以决定是否保留为独立记录，并补充自己第一次理解“弹栈意味着这一层永久结束”时使用的反例。
