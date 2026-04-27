---
title: Solution_ABC442 A~D
tags: ABC
categories:
  - 270_Solutions
abbrlink: f720c780
date: 2026-01-25 00:00:00
---

## [A - Count .](https://atcoder.jp/contests/abc442/tasks/abc442_a)

### 1. 题意梗概（翻译）

给定一个字符串，查询其中有几个 `i` `j`。

### 2. 逻辑推导

语法题，`Pass`。

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
int main( )
{
    string s;
    cin >> s;
    int ans = 0;
    for( char c : s ) if( c == 'i' || c == 'j' ) ans ++;
    cout << ans << '\n';
    return 0;
}
```

{% endfold %}

## [B - Music Player](https://atcoder.jp/contests/abc442/tasks/abc442_b)

### 1. 题意梗概（翻译）

有一个音乐播放器，初始**关机**且**音量为0**，若开启并且音量 $\geq 3$，则输出 `Yes`。给定 $Q$ 次操作，问每次操作后是否满足条件。

### 2. 逻辑推导

大大大模拟，`Pass`。

### 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
int main( )
{
    int Q;
    cin >> Q;

    int sound = 0;
    bool open = 0;
    for( int i = 1; i <= Q; ++ i )
    {
        int a;
        cin >> a;
        if( a == 1 )
        {
            sound ++;
        }
        else if( a == 2 )
        {
            if( sound > 0 )
                sound --;
        }
        else
        {
            open = !open;
        }
        if( sound >= 3 && open ) cout << "Yes\n";
        else cout << "No\n";
    }
    
    return 0;
}
```

{% endfold %}


## [C - Peer Review](https://atcoder.jp/contests/abc442/tasks/abc442_c)

### 1. 题意梗概（翻译）

有 $N$ 个人，$M$ 个冲突，每一个人都要发论文，需要选 3 个审稿人，求每个研究员 $i$，他有多少种合法的审稿人组合。

限制条件：审稿人不能是他自己，不能是他的死对头，必须是三个不同的人。

### 2. 逻辑推导

这题考察的是组合数学 $C_{n}^{r}$ ，考虑到所有不合法的情况只有两种，**自己**和**死对头**，那么我们就把问题转化为了，找出每个人有几个死对头即可。

不过遇到这种敌对关系，我下意识敲了个扩展域并查集，然后意识到好像没必要，因为我们只需要算出每个人的死对头，不需要维护“连通性”这种关系。

那么很简单，每一组输入 $A_i, B_i$，给 $Cnt_{A_i} + 1, Cnt_{B_i} + 1$ 即可，这里 $Cnt_i$ 表示 $i$ 的死对头个数。

接着对于每个人，直接套公式就行，候选人：$k_i = N - 1 - Cnt_i$。

$$
Ans_i = C_{K_i}^{3} = \frac{k_i \times (k_i - 1) \times (k_i - 2)}{3 * 2 * 1}
$$

### 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 2e5 + 50;

int cnt[maxn];
int n, m;

int main( )
{
    cin >> n >> m;

    for( int i = 1; i <= m; ++ i )
    {
        int u, v;
        cin >> u >> v;
        cnt[u] ++;
        cnt[v] ++;
    }

    for( int i = 1; i <= n; ++ i )
    {
        ll remain = n - 1 - cnt[i];
        if( remain < 3 ) cout << 0 << " ";
        else cout << remain * ( remain - 1 ) * ( remain - 2 ) / 6 << " ";
    }

    return 0;
}
```

{% endfold %}

## [D - Swap and Range Sum](https://atcoder.jp/contests/abc442/tasks/abc442_d)

### 1. 题意梗概（翻译）

给定一个长度为 $N$ 的数组 $A$，你需要处理 $Q$ 次操作。

1. `1 x`：交换相邻两个元素 $A_x$ 和 $A_{x+1}$。
2. `2 l r`：查询区间 $[l,r]$ 的元素总和。

### 2. 逻辑推导

分析这两个操作，发现第一个是单点修改，第二个是区间查询，同时是动态维护，那么解法就很明确了，树状数组或者线段树了。

考虑到线段树太麻烦了，我们采用轻量化的树状数组来解决这个题目。

当 $A_x$ 和 $A_{x+1}$ 交换时，$A_x$ 的值增加了 $A_{x+1} - A_{x}$；$A_{x+1}$ 的值增加了 $A_{x} - A_{x+1}$。

然后就是套模版解决的事了。

### 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 2e5 + 50;

ll Bit[maxn];
int a[maxn];
int n, Q;

int lowbit( int x ) { return x & -x; }

void update( int idx, int val )
{
    for( int i = idx; i <= n; i += lowbit(i) )
        Bit[i] += val;
}

ll query( int idx )
{
    ll res = 0;
    for( int i = idx; i > 0; i -= lowbit(i) )
        res += Bit[i];
    return res;
}

int main( )
{
    cin >> n >> Q;
    for( int i = 1; i <= n; ++ i )
    {
        cin >> a[i];
        update( i, a[i] );
    }

    while( Q -- )
    {
        int opt, x, l, r;
        cin >> opt;
        if( opt == 1 )
        {
            cin >> x;
            update( x, a[x+1] - a[x] );
            update( x+1, a[x] - a[x+1] );
            swap( a[x], a[x+1] );
        }
        else
        {
            cin >> l >> r;
            cout << query(r) - query(l - 1) << "\n";
        }
    }

    return 0;
}
```

{% endfold %}

