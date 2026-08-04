---
title: ABC468F Chmax
tags:
  - algorithm/记录
  - 动态规划
  - 数据结构/树状数组
status: solved
categories:
  - 260_Records
  - Archive
abbrlink: a468f001
date: 2026-07-25 00:00:00
updated: 2026-08-04 00:00:00
---

# ABC468F Chmax

> [!Question]
> 给定 $1\sim N$ 的排列 $P$。初始 $x=y=c=0$，按顺序处理 $P_k$；每次选择用 $P_k$ 更新 $x$ 或 $y$。若被更新的变量原本小于 $P_k$，则先令 $c$ 加一，再将该变量替换为它与 $P_k$ 的最大值。求最终 $c$ 的最大可能值。
>
> 数据规模：$1\le N\le 5\times 10^5$。

由于每次严格增大的元素会导致 $c$ 值增大，所以我首先会想到，这是否就构成了两条严格上升子序列？

但这题不能直接这么转化，因为每个数都必须执行一次操作，即分给 $x$ 或者 $y$，那些在求子序列时被跳过的元素可能抬高原本的变量，从而影响后面的得分。

举个例子 $P = (5, 2, 1, 4, 3)$，从上升子序列考虑可以选 $(2, 4)$ 和 $(1,3)$，但是实际操作中第一个 $5$ 必须被分配给 $x$，那实际上就不符合 LIS 模型了。

所以这题更像一个双状态 $DP$，两个关键的状态分别是处理完前 $i$ 个元素后 $x$ 的最大值，以及 $y$ 的最大值。由于当前前缀最大值一定被分配给了 $x$ 或 $y$，所以我们记录较小的那个值就行。

记 $dp[z]$ 表示处理完当前前缀，两个变量为 $mx, z$ 时的最大得分。

当我们把一个新元素 $v = P_{k}$ 加入时，有两种选择：把 $v$ 放入当前值为 $mx$ 的变量，以及放入当前值为 $z$ 的变量。

接下来考虑转移：

1. $v > mx$ 时，此时 $v$ 是新的前缀最大值，无论把 $v$ 放到哪，都一定能得 $1$ 分。
	- 放到值为 $mx$ 的变量上，状态从 $(mx, z) \to (v, z)$。
	- 放到值为 $z$ 的变量上，状态从 $(mx, z) \to (v, mx)$。
2. $v < mx$ 时：
	- 放到值为 $mx$ 的变量上，不得分状态不变。
	- 放到值为 $z$ 的变量上，当 $z < v$ 时得一分 $(mx, z) \to (mx, v)$，反之不得分且状态不变。

其中，当 $v<mx$ 时，真正产生的新状态只有：

$$
dp[v] = \max\left( dp[v], \max_{z<v}dp[z]+1\right )
$$

而当 $v>mx$ 时，所有原状态都会得到 $1$ 分；此外，把 $v$ 放入原本值为 $z$ 的变量后，会产生新的状态 $z=mx$，其得分为 $\max_z dp[z]+1$，随后令 $mx=v$。

于是我们就可以写出这样一版基础的朴素 $\mathcal{O}(N^{2})$ 转移。

```cpp title:"FFF1" fold
int p[maxn];
int f[maxn];
// f[z] 表示处理完当前前缀，两个变量的较大值为 mx、
// 另一个变量的值为 z 时，能够获得的最大分数

void solve( ) {
    int n = read( );
    for( int i = 1; i <= n; ++ i ) p[i] = read( );

    for( int i = 0; i <= n; ++ i ) f[i] = -inf;
    f[0] = 0;

    int mx = 0;
    for( int i = 1; i <= n; ++ i ) {
        int v = p[i];
        if( v > mx ) {
            int pre = -inf;
            for( int z = 0; z <= n; ++ z ) {
                pre = max( pre, f[z] );
            }

            for( int z = 0; z <= n; ++ z ) {
                if( f[z] > -inf ) f[z] ++;
            }
            f[mx] = max( f[mx], pre + 1 );
            mx = v;
        }
        else {
            int pre = -inf;
            for( int z = 0; z < v; ++ z ) {
                pre = max( pre, f[z] );
            }
            f[v] = max( f[v], pre + 1 );
        }
    }

    int ans = 0;
    for( int i = 0; i <= n; ++ i ) ans = max( ans, f[i] );
    cout << ans << '\n';
}
```

但本题数据规模会 T，考虑优化，这里选用数据结构优化，因为只需要查询前缀最大值，以及单点取最大值，所以可以直接用树状数组来维护，单次修改及转移均为 $\mathcal{O}(\log(n))$。

```cpp title:"FFF2" fold

struct BIT {
/* ======================================== */
ll tr[maxn];
int sz;
void init( int N ) { sz = N + 1;
    fill( tr, tr + sz + 2, -inf );
}
void upd( int idx, ll val ) {
    idx ++;
    for( int i = idx; i <= sz; i += i & -i ) tr[i] = max( tr[i], val );
}
ll ask( int idx ) {
    idx ++;
    ll res = -inf;
    for( int i = idx; i; i -= i & -i ) res = max( res, tr[i] );
    return res;
}
/* ======================================== */
} bit;

ll p[maxn];

void solve( ) {
    int n = read( );
    for( int i = 1; i <= n; ++ i ) p[i] = read( );

    bit.init( n );
    bit.upd( 0, 0 );
    
    int mx = 0;
    int offset = 0;
    for( int i = 1; i <= n; ++ i ) {
        int v = p[i];
        if( v > mx ) {
            offset ++;
            int pre = bit.ask( n );
            bit.upd( mx, pre );
            mx = v;
        }
        else {
            int pre = bit.ask( v - 1 );
            bit.upd( v, pre + 1 );
        }
    }
    cout << bit.ask( n ) + offset << '\n';
}
```

最终复杂度为 $\mathcal{O}(n \log(n))$。

## 记录

- 来源：[[ABC468 A~G]]；
- 归属：[[树状数组]]；
- 新增：每个数都必须分配使问题不能直接化为两条 LIS；利用前缀最大值必在两变量之一，把二维状态压成另一变量的值，再分离全局加一与前缀最大值转移。
- 分类：待定

