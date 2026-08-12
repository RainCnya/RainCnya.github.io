---
title: P1823 Patrik 音乐会的等待
tags:
  - 数据结构/单调栈
status: solved
categories:
  - 260_Records
  - DS
abbrlink: b1823001
date: 2026-07-28 00:00:00
updated: 2026-07-30 00:00:00
---

# Patrik 音乐会的等待：同高分组的单调栈

> [!question] [P1823 Patrik 音乐会的等待](https://www.luogu.com.cn/problem/P1823)
> 给定一个人的身高序列。如果两人相邻，或两人之间没有人比他们都高，则两人能够互相看见。求可见的人对数。
>
> 数据规模：$n\le 5\times 10^5$。

只是个单调栈模型的题目，所以我最开始想到先预处理每个人的左右边界，然后对每个人进行区间计数统计。

但这个计数模型并不成立。对 $i<j$，两人可见的条件是 $\displaystyle \max_{i<k<j}a_k\le \min(a_i,a_j)$。它不能转化为 "$i$ 与某个边界内的所有人都可见"，特别在出现相等身高时，就会很复杂。 

所以我们考虑之维护仍然可以和右侧相见的人，也就是一个单调递减栈。栈中的节点记录 `(val, cnt)`，其中 `cnt` 表示这一层有多少个相同身高的人。

1. 处理当前身高 $x$ 时，弹出所有不高于 $x$ 的栈顶：

2. 栈顶 $< x$ 时，这一组人都能看见当前的 $x$，贡献 `cnt`，而他们会被 $x$ 挡住看不到后面的人了。

3. 栈顶 $= x$ 时，这一组人都能看见当前的的 $x$，贡献 `cnt`，并且合并。

4. 弹完后若栈非空，栈顶一定比 $x$ 搞，此时 $x$ 可以看见这个更近的的更高的人，贡献 `1`，因为我们只考虑左对右的贡献值，所以这里不加剩余栈的大小。

每个人至多入栈、出栈一次，时间复杂度为 $O(n)$，空间复杂度为 $O(n)$。答案最大为 $\frac{n(n-1)}2$，需要使用 `long long`。

```cpp title:"P1823" fold
struct Stack {
    int val, cnt;
} stk[maxn];

void solve( ) {
    int n = read( );
    int top = 0;
    ll ans = 0;

    for( int i = 1; i <= n; ++ i ) {
        int x = read( );
        Stack cur = { x, 1 };

        while( top && stk[top].val <= x ) {
            ans += stk[top].cnt;
            if( stk[top].val == x ) cur.cnt += stk[top].cnt;
            top --;
        }
        if( top ) ans ++;
        stk[++ top] = cur;
    }
    cout << ans << '\n';
}
```

## 记录

- 新增：可见关系不能按连续区间计数；单调栈应维护仍可能参与未来答案的候选，并把同高者压缩成一组统计组合贡献。

- 分类：C

