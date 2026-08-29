---
title: 单调队列优化DP模型
tags:
  - algorithm/题型
  - DP/优化
  - 算法/单调队列
status: solved
categories:
  - 210_Atlas
  - 30_动态规划
abbrlink: monoqueue26
date: 2026-08-29
updated: 2026-08-29
---

# 单调队列优化DP模型

单调队列优化 DP 本质上，是用数据结构来加速状态转移。具体来说，就是把“每个状态枚举大量前驱”优化成“维护一个单向移动的候选集合”。

所以更重要的是：怎样通过状态设计、代数变形、重新分组或改变坐标，让合法前驱转化成一个可维护的窗口最值问题。

## 一、P1714 切蛋糕：窗口最值从哪里来

> [!question] [P1714 切蛋糕](https://www.luogu.com.cn/problem/P1714)
> 在长度为 $n$ 的序列中选择一个长度不超过 $m$ 的连续子段，使子段和最大。
>
> 数据规模：$1\le n\le5\times10^5$，且 $|p_i|\le500$。

求区段和不难想到可以使用前缀和。在固定右端点 $i$ 后，区间和可以写成 $s[i]-s[j]$，其中前缀位置满足 $j\in[i-m,i-1]$。

为了最大化子段和，我们需要找到最小的前缀和 $s[j]$。随着 $i$ 右移，合法的 $j$ 区间也同步右移，这就是一个典型的滑动窗口最值问题，可以使用单调队列维护。

这题本身不是 DP，但它给出了单调队列优化的一般结构：随着当前状态推进，合法候选集合形成一个单向移动的窗口，而我们只关心其中的最值。

```cpp title:"P1714" fold
ll a[maxn], sum[maxn];
int que[maxn];

void solve( ) {
    int n = read( ), m = read( );
    for( int i = 1; i <= n; ++ i ) {
        a[i] = read( );
        sum[i] = sum[i-1] + a[i];
    }

    int hh = 1, tt = 0;
    que[++ tt] = 0;

    ll ans = -inf;
    for( int i = 1; i <= n; ++ i ) {
        while( tt >= hh && que[hh] < i - m ) ++ hh;
        ans = max( ans, sum[i] - sum[que[hh]] );
        while( tt >= hh && sum[que[tt]] >= sum[i] ) tt --;
        que[++ tt] = i;
    }
    cout << ans << '\n';
}
```

## 二、P1725 琪露诺：DP 中的候选窗口

> [!question] [P1725 琪露诺](https://www.luogu.com.cn/problem/P1725)
> 从位置 $0$ 出发，每次只能向右跳 $L\sim R$ 格，停在格子上会获得对应冰冻指数，只要下一步跳到编号大于 $N$ 的位置就算到达对岸，求最大收益。
>
> 数据规模：$N\le2\times10^5$，$-10^3\le A_i\le10^3$，且 $1\le L\le R\le N$。

定义 $f[i]$ 表示到达位置 $i$ 时能够获得的最大收益。

接着考虑转移，为了跳到 $i$，前驱位置需要满足 $j \in [i-R,i-L]$，因此转移为 $f[i] = A_i + \max_{j} f[j]$。

朴素的做法是每个 $i$ 重新扫描整段前驱区间。不过观察相邻两个状态后，发现处理 $i+1$ 时窗口恰好变为 $[i-R+1,i-L+1]$，也就是说窗口只向右移动一格。

于是可以用单调队列维护窗口中的最大 $f[j]$。其中 $i-L$ 是刚进入候选集合的新状态，而小于 $i-R$ 的状态则过期可以删除。

```cpp title:"P1725" fold
ll a[maxn], f[maxn];
int que[maxn];

void solve( ) {
    int n = read( ), L = read( ), R = read( );
    for( int i = 0; i <= n; ++ i ) a[i] = read( );

    for( int i = 0; i <= n; ++ i ) f[i] = -inf;
    f[0] = 0;
    
    int hh = 1, tt = 0;
    ll ans = -inf;

    for( int i = L; i <= n; ++ i ) {
        int j = i - L;
        if( f[j] != -inf ) {
            while( tt >= hh && f[que[tt]] <= f[j] ) tt --;
            que[++ tt] = j;
        }
        while( tt >= hh && que[hh] < i - R ) ++ hh;
        if( tt >= hh ) f[i] = f[que[hh]] + a[i];
        if( i + R > n ) ans = max( ans, f[i] );
    }
    cout << ans << '\n';
}
```

## 三、P3800 Power 收集：高维 DP 中的一维窗口

> [!question] [P3800 Power 收集](https://www.luogu.com.cn/problem/P3800)
> 在 $N\times M$ 的网格中从第一行任意位置出发，每秒向下一行移动，同时横向最多移动 $T$ 格，部分格子具有价值，求最终能够收集的最大价值。
>
> 数据规模：$1\le N,M,K,T\le4000$，且 $0\le v\le100$。

定义 $f[i][j]$ 表示到达第 $i$ 行第 $j$ 列时能够获得的最大收益。

上一秒一定在第 $i-1$ 行，并且横向距离不能超过 $T$，所以转移为 $f[i][j]=val[i][j]+\max f[i-1][k]$，其中 $k\in[j-T,j+T]$。

固定当前行 $i$ 后，随着列 $j$ 从左向右扫描，上一行中的合法前驱区间也同步从左向右移动。因此每一行都可以对上一行的状态跑一次滑动窗口最大值。

这同样可以用单调队列优化，不过本题的启示在于，即便整个 DP 有多维状态，只要某一维形成移动的窗口，就可以单独优化这一维度。状态的自然处理顺序仍属于 [[线性DP|线性状态 DP]]，单调队列只负责其中一维的前驱最值。

```cpp title:"P3800" fold
ll f[maxn], nf[maxn];
int val[maxn][maxn]; 
int que[maxn];

void solve( ) {
    int n = read( ), m = read( );
    int k = read( ), t = read( );

    for( int i = 1; i <= k; ++ i ) {
        int x = read( ), y = read( ), v = read( );
        val[x][y] = v;
    }

    for( int j = 1; j <= m; ++ j ) f[j] = val[1][j];

    for( int i = 2; i <= n; ++ i ) {
        int hh = 1, tt = 0;
        int ptr = 0;
        for( int j = 1; j <= m; ++ j ) {
            while( ptr < m && ptr < j + t ) {
                ++ ptr;
                while( tt >= hh && f[que[tt]] <= f[ptr] ) tt --;
                que[++ tt] = ptr;
            }
            while( tt >= hh && que[hh] < j - t ) ++ hh;
            nf[j] = f[que[hh]] + val[i][j];
        }
        memcpy( f, nf, sizeof( f ) );
    }
    
    ll ans = 0;
    for( int j = 1; j <= m; ++ j ) ans = max( ans, f[j] );
    cout << ans << '\n';
}
```

## 四、P3957 跳房子：外层参数决定窗口

> [!question] [P3957 [NOIP 2017 普及组] 跳房子](https://www.luogu.com.cn/problem/P3957)
> 机器人原本跳跃距离为 $d$，花费 $g$ 后每次可以跳 $[\max(1,d-g),d+g]$ 的距离。给出若干带分数的位置，求获得至少 $k$ 分所需的最小花费。
>
> 数据规模：$1\le n\le5\times10^5$，$1\le d\le2\times10^3$，$1\le x_i,k\le10^9$，且 $|s_i|<10^5$。

注意到花费越大，合法跳跃范围只会扩大，因此能够获得的最大分数单调不减。答案具有单调性，所以可以按 [[浅谈二分答案|二分答案]] 的思路二分花费的钱 $g$。

固定一次 `check( g )` 后，令 $L=\max(1,d-g)$、$R=d+g$，问题就转化为了一个最大值 DP。

定义 $f[i]$ 表示跳到位置 $x_i$ 时能够获得的最大分数。那么合法的前驱就满足 $L\le x_i-x_j\le R$，因此转移为 $f[i]=s_i+\max(f[j])$，其中 $x_j\in[x_i-R,x_i-L]$。

随着 $i$ 向右扫描，两个坐标边界 $x_i-R$ 与 $x_i-L$ 都只会向右移动。因此可以用一个指针不断加入刚进入范围的前驱，再用单调队列维护其中最大的 $f[j]$。

```cpp title:"P3957" fold
int n;
ll d, k;
ll x[maxn], s[maxn], f[maxn];
int que[maxn];

bool check( ll mid ) {
    ll L = max( 1ll, d - mid );
    ll R = d + mid;
    for( int i = 1; i <= n; ++ i ) f[i] = -inf;
    f[0] = 0;
    int hh = 1, tt = 0;
    int ptr = 0;
    for( int i = 1; i <= n; ++ i ) {
        while( ptr < i && x[ptr] <= x[i] - L ) {
            if( f[ptr] != -inf ) {
                while( tt >= hh && f[que[tt]] <= f[ptr] ) tt --;
                que[++ tt] = ptr;
            }
            ++ ptr;
        }
        while( tt >= hh && x[que[hh]] < x[i] - R ) ++ hh;
        if( tt >= hh ) f[i] = f[que[hh]] + s[i];
        if( f[i] >= k ) return true;
    }
    return false;
}

void solve( ) {
    n = read( ), d = read( ), k = read( );

    x[0] = s[0] = 0;
    for( int i = 1; i <= n; ++ i ) {
        x[i] = read( ), s[i] = read( );
    }

    ll l = 0, r = x[n] + d, ans = -1;
    while( l <= r ) {
        ll mid = ( l + r ) >> 1;
        if( check( mid ) ) ans = mid, r = mid - 1;
        else l = mid + 1;
    }
    cout << ans << '\n';
}
```

## 五、P2034 选择数字：改变状态以后出现窗口

> [!question] [P2034 选择数字](https://www.luogu.com.cn/problem/P2034)
> 从 $n$ 个非负整数中选择若干个，使总和最大，但不能连续选择超过 $k$ 个数字。
>
> 数据规模：$1\le n\le10^5$，$1\le k\le n$，且 $0\le a_i\le10^9$。

朴素的想法是开一个二维的状态 $f[i][j]$ 表示前 $i$ 个整数，当前连续选择了 $j$ 个的最大总和。

这是可以转移的，但会产生一个 $O(nk)$ 的二维状态，从规模上不太现实。于是可以换一个角度，不能连续选择超过 $k$ 个，等价于任意连续 $k+1$ 个位置中都至少存在一个不选的位置。

那么就可以把 “不选的位置” 作为断点。定义 $f[i]$ 表示强制不选位置 $i$，并保证前 $i$ 个位置合法时，所有不选数字的最小总和。

如果上一个断点是 $j$，为了保证中间不会出现超过 $k$ 个连续选择的位置，必须满足 $j \in [i-k-1,i-1]$。因此转移为 $f[i]=a_i+\min(f[j])$。

随着 $i$ 右移，这个合法断点区间同步右移，于是就转化为了一维窗口最值。最后加入一个权值为 $0$ 的虚拟断点 $n+1$，答案就是总和减去 $f[n+1]$。

```cpp title:"P2034" fold
ll a[maxn], f[maxn];
int que[maxn];

void solve( ) {
    int n = read( ), k = read( );
    ll sum = 0;
    for( int i = 1; i <= n; ++ i ) {
        a[i] = read( );
        sum += a[i];
    }
    a[n + 1] = 0;
    int hh = 1, tt = 0;
    f[0] = 0;
    que[++ tt] = 0;
    for( int i = 1; i <= n + 1; ++ i ) {
        while( tt >= hh && que[hh] < i - k - 1 ) hh ++;
        if( tt >= hh ) f[i] = f[que[hh]] + a[i];
        while( tt >= hh && f[que[tt]] >= f[i] ) tt --;
        que[++ tt] = i;
    }
    cout << sum - f[n + 1] << '\n';
}
```

## 六、P1776 宝物筛选：重新分组以后出现窗口

> [!question] [P1776 宝物筛选](https://www.luogu.com.cn/problem/P1776)
> 有 $n$ 种宝物，第 $i$ 种宝物价值为 $v_i$、重量为 $w_i$、共有 $m_i$ 件，在总重量不超过 $W$ 的条件下最大化总价值。
>
> 数据规模：$1\le n\le100$，$0\le W\le4\times10^4$，$\sum m_i\le10^5$，且 $1\le w_i,v_i\le1000$。

这是标准的多重背包模型。朴素枚举每种物品选择多少个，复杂度为 $O(W\sum m_i)$；常见的二进制拆分可以降到 $O(W\sum_i\log(m_i+1))$。如果继续观察状态转移，还可以利用单调队列做到每种物品 $O(W)$，整体 $O(nW)$。

处理第 $i$ 种物品时，设上一层状态为 $g[j]$，当前层为 $f[j]$，其中状态值表示容量不超过 $j$ 时的最大价值。

如果当前物品重量为 $w$、价值为 $v$、数量上限为 $c$，朴素转移为 $f[j]=\max(g[j-qw]+qv)$，其中 $0\le q\le c$ 且 $qw\le j$。

这里的前驱容量状态是 $j,j-w,j-2w,\dots$，这在原容量轴上并不是连续窗口。但这些前驱都与 $j$ 模 $w$ 同余，因此可以固定余数 $r$，把容量 $r,r+w,r+2w,\dots$ 重新编号为一条状态链。

令当前容量为 $r+kw$，前驱容量为 $r+tw$，则数量限制变成 $k-c\le t\le k$，转移可以整理为 $f[r+kw]=kv+\max(g[r+tw]-tv)$，其中 $t$ 只在这个窗口中枚举。

于是在重新分组以后，每一条同余链都变成了普通的滑动窗口最大值，至此就可以用单调队列把当前物品的转移优化到 $O(W)$。从背包方法的全景看，它仍是 [[背包DP|多重背包]] 的一种优化选择；本节只负责解释分组以后为什么会出现窗口。

> 注：这里候选必须来自处理当前物品以前的上一层状态。也就是说，进入队列的是固定的 $g$，而当前层结果写入新的 $f$；否则本轮刚得到的状态又参与本轮转移，就会重复使用当前物品。
	
```cpp title:"P1776" fold
ll f[maxn], nf[maxn];
int que[maxn];

void solve( ) {
    int n = read( ), m = read( );
    for( int i = 1; i <= n; ++ i ) {
        int v = read( ), w = read( ), c = read( );
        for( int r = 0; r < w; ++ r ) {
            int hh = 1, tt = 0;
            for( int x = 0, j = r; j <= m; ++ x, j += w ) {
                while( tt >= hh && que[hh] < x - c ) hh ++;
                ll cur = f[j] - 1ll * x * v;
                while( tt >= hh ) {
                    int y = que[tt];
                    int pos = r + y * w;
                    if( f[pos] - 1ll * y * v > cur ) break;
                    -- tt;
                }
                que[++ tt] = x;
                int y = que[hh];
                int pos = r + y * w;
                nf[j] = f[pos] - 1ll * y * v + 1ll * x * v;
            }
        }
        memcpy( f, nf, sizeof( nf ) );
    }
    cout << f[m] << '\n';
}
```

## 七、P2569 股票交易：窗口合法性与候选可比较性

> [!question] [P2569 [SCOI2010] 股票交易](https://www.luogu.com.cn/problem/P2569)
> 已知未来 $T$ 天的股票买卖价格和每日交易数量限制，两次交易之间至少间隔 $W$ 天，持股数不超过 $\mathrm{MaxP}$，求最大利润。
>
> 数据规模：$0\le W<T\le2000$，$1\le\mathrm{MaxP}\le2000$，且 $1\le BP_i\le AP_i\le1000$，$1\le AS_i,BS_i\le\mathrm{MaxP}$。

本题有两个状态，其一是当前的时间，其二是当前的持股数。

那么定义 $f[i][j]$ 表示第 $i$ 天结束以后，手中持有 $j$ 股股票时的最大利润。除了直接买入和继承前一天状态以外，发生交易时只能从第 $i-W-1$ 天的状态转移。

考虑买入。若此前持有 $k$ 股，现在持有 $j$ 股，则需要买入 $j-k$ 股，并满足 $j-AS_i\le k\le j$，所以朴素转移为 $\displaystyle f[i][j]=\max_{j-AS_i\le k\le j}(f[i-W-1][k]-(j-k)AP_i)$。

展开变形得 $\displaystyle f[i][j]=\max_{j-AS_i\le k\le j}(f[i-W-1][k]+kAP_i)-jAP_i$。固定第 $i$ 天以后，随着 $j$ 增加，合法的 $k$ 区间单向右移，因此前驱首先形成了一个滑动窗口。

更重要的是，队列中真正需要比较的值变成了 $f[i-W-1][k]+kAP_i$，它只依赖候选 $k$，不会再随着当前持股量 $j$ 改变，因此被后来候选支配的状态可以永久删除。

卖出同理，可以整理为 $\displaystyle f[i][j]=\max_{j\le k\le j+BS_i}(f[i-W-1][k]+kBP_i)-jBP_i$，只需要反向扫描持股数。

所以这里其实有两个独立条件：**窗口合法性**决定哪些前驱可以参与转移，而**候选可比较性**决定较差候选能否被永久删除。二者同时成立以后，才能使用单调队列优化。

```cpp title:"P2569" fold
int ap[maxn], bp[maxn];
int as[maxn], bs[maxn];
ll f[maxn][maxp];
int que[maxn];

void solve( ) {
    int T = read( ), MaxP = read( ), W = read( );

    for( int i = 1; i <= T; ++ i ) {
        ap[i] = read( ), bp[i] = read( );
        as[i] = read( ), bs[i] = read( );
    }

    for( int i = 0; i <= T; ++ i ) {
        fill( f[i], f[i]+ MaxP + 1, -inf );
    }
    f[0][0] = 0;

    for( int i = 1; i <= T; ++ i ) {
        for( int j = 0; j <= MaxP; ++ j ) {
            f[i][j] = f[i-1][j];
        }
        for( int j = 0; j <= as[i] && j <= MaxP; ++ j ) {
            f[i][j] = max( f[i][j], -1ll * j * ap[i] );
        }
        int pre = i - W - 1;
        if( pre < 0 ) continue;
        int hh = 1, tt = 0;
        for( int j = 0; j <= MaxP; ++ j ) {
            while( tt >= hh && que[hh] < j - as[i] ) hh ++;
            if( f[pre][j] != -inf ) {
                ll val = f[pre][j] + j * ap[i];
                while( tt >= hh ) {
                    int k = que[tt];
                    ll back = f[pre][k] + k * ap[i];
                    if( back > val ) break;
                    tt --;
                }
                que[++ tt] = j;
            }
            if( tt >= hh ) {
                int k = que[hh];
                f[i][j] = max( f[i][j], f[pre][k] + ( k - j ) * ap[i] );
            }
        }
        hh = 1, tt = 0;
        for( int j = MaxP; j >= 0; -- j ) {
            while( tt >= hh && que[hh] > j + bs[i] ) hh ++;
            if( f[pre][j] != -inf ) {
                ll val = f[pre][j] + j * bp[i];
                while( tt >= hh ) {
                    int k = que[tt];
                    ll back = f[pre][k] + k * bp[i];
                    if( back > val ) break;
                    tt --;
                }
                que[++ tt] = j;
            }
            if( tt >= hh ) {
                int k = que[hh];
                f[i][j] = max( f[i][j], f[pre][k] + ( k - j ) * bp[i] );
            }
        }
    }

    ll ans = 0;
    for( int j = 0; j <= MaxP; ++ j ) ans = max( ans, f[T][j] );
    cout << ans << '\n';
}
```

## 八、P1070 道路游戏：改变坐标以后出现窗口

> [!question] [P1070 [NOIP 2009 普及组] 道路游戏](https://www.luogu.com.cn/problem/P1070)
> 环形道路上有 $n$ 个机器人工厂。机器人购买后顺时针行走 $1\sim p$ 个单位时间并收集沿途金币，机器人消失后必须立刻购买新的机器人，求经过 $m$ 个单位时间后的最大净收益。
>
> 数据规模：$2\le n\le1000$，$1\le m\le1000$，且 $1\le p\le m$；每段道路每时刻金币数和每个工厂购买费用均不超过 $100$。

定义 $f[t]$ 表示经过 $t$ 个单位时间以后能够获得的最大净收益。

考虑最后购买的一台机器人。假设它在时间 $s$ 被购买，并持续运行到时间 $t$，那么需要从 $f[s]$ 转移，再加上这台机器人从 $s$ 到 $t$ 收集的金币，最后减去购买机器人的费用。其中机器人最多运行 $p$ 秒，所以 $t-p\le s<t$。

难点在于这段收益同时依赖起点、终点与时间三个维度。但若是我们将位置与时间作为两个坐标建系，会发现机器人每经过一个时间单位，位置也恰好向前移动一个单位，刚好就是一条斜线。

于是就可以通过预处理对角线前缀和后，将机器人的行动收益快速计算出来了。对于固定的一条斜对角线，一段机器人路径的收益就可以拆成“当前终点的前缀贡献”减去“起点对应的前缀贡献与购买费用”。

重新观察转移，对于当前时间 $t$，终点部分已经固定，真正需要枚举的只剩下起始时间 $s$ 对应的候选值。而由于机器人最多运行 $p$ 秒，合法的 $s$ 始终位于 $[t-p,t-1]$ 中。

随着 $t$ 向后推进，这个起点区间也同步向右移动，于是原本同时混合位置、时间和路径收益的转移，经过 **坐标变换 + 对角线前缀和** 以后，最终转化为了若干个滑动窗口最大值问题，可以分别使用单调队列维护。

本题启示：当原状态中的前驱关系不够清楚时，可以先改变坐标表示，让转移沿某个具有规律的方向重新排列，再寻找其中的移动窗口。

```cpp title:"P1070" fold
int n, m, p;
int val[maxn][maxn], cost[maxn];
ll sum[maxn][maxn], f[maxn];
int que[maxn][maxn];
int hh[maxn], tt[maxn];

int pos( int id, int t ) {
    return ( id + t ) % n + 1;
}

void solve( ) {
    n = read( ), m = read( ), p = read( );

    for( int i = 1; i <= n; ++ i ) {
        for( int t = 1; t <= m; ++ t ) {
            val[i][t] = read( );
        }
    }
    for( int i = 1; i <= n; ++ i ) cost[i] = read( );

    // sum[id][t]：第 id 条斜线走到时间 t 的金币前缀和
    for( int id = 0; id < n; ++ id ) {
        for( int t = 1; t <= m; ++ t ) {
            int x = pos( id, t - 1 );
            sum[id][t] = sum[id][t-1] + val[x][t];
        }
    }

    for( int t = 1; t <= m; ++ t ) f[t] = -inf;
    f[0] = 0;

    for( int id = 0; id < n; ++ id ) {
        hh[id] = 1, tt[id] = 0;
    }

    for( int t = 1; t <= m; ++ t ) {
        int s = t - 1;
        for( int id = 0; id < n; ++ id ) {
            // 删除已经无法满足运行时间限制的起点
            while( tt[id] >= hh[id] && que[id][hh[id]] < t - p ) {
                ++ hh[id];
            }
            // 时间 s = t - 1 刚刚成为新的候选起点
            if( f[s] != -inf ) {
                ll cur = f[s] - sum[id][s] - cost[pos( id, s )];
                while( tt[id] >= hh[id] ) {
                    int k = que[id][tt[id]];
                    ll pre = f[k] - sum[id][k] - cost[pos( id, k )];
                    if( pre > cur ) break;
                    -- tt[id];
                }
                que[id][++ tt[id]] = s;
            }
            if( tt[id] >= hh[id] ) {
                int k = que[id][hh[id]];
                ll best = f[k] - sum[id][k] - cost[pos( id, k )];
                f[t] = max( f[t], sum[id][t] + best );
            }
        }
    }
    cout << f[m] << '\n';
}
```

## 九、统一模型

前面的题虽然形式不同，但最终都在把大量前驱整理成一个可以增量维护的候选集合。

最常见的转移形式是 $\displaystyle f[i]=A(i)+\operatorname{opt}_{L_i\le j\le R_i}B(j)$，其中随着当前状态 $i$ 推进，合法前驱区间也单向移动。

单调队列能够优化一段 DP 转移，核心只需要观察两件事。

**第一，合法候选是否形成滑动窗口。** 随着当前状态推进，新的候选不断进入，旧候选从另一端永久过期。这个窗口不一定直接对应原下标，也可能要像 P1776、P1070 一样先重新分组或改变坐标。

**第二，候选之间是否存在稳定的支配关系。** 如果一个后来进入的候选已经不差于旧候选，并且它不会更早失效，那么旧候选以后永远不可能成为最优，可以直接从队尾删除。

前者决定合法性，后者决定保留价值，若两者同时成立，就可以用单调队列维护候选集合。

## 十、复杂度与失效边界

单调队列中，每个候选在所属扫描链上最多入队一次、出队一次，所以维护复杂度对被扫描状态数是线性的，单次候选操作均摊 $O(1)$。例如 P1776 中一种物品的所有同余链总长度为 $O(W)$，P1070 中所有斜对角线上的候选扫描总量为 $O(nm)$。

反过来，如果候选过期以后还可能重新合法，或者两个候选之间的优劣会随着当前状态改变而反转，就不能直接使用普通单调队列。

另外，原下标中的候选不连续并不一定意味着失败。P1776 与 P1070 都说明，可以先通过重新分组、重新编号或改变坐标，把原本杂乱的候选重新组织成有序扫描的集合。

## 十一、小结

> [!summary]  
> 单调队列优化 DP 解决的不是某一种固定转移，而是一类“反复从大量前驱中查询最优值”的复杂度瓶颈。
> 
> 真正的关键通常发生在维护队列以前：先通过改变状态、重新分组、代数变形或坐标变换，把原本杂乱的前驱转化成一个合法性单向移动、候选评价稳定的集合。
> 
> 当合法前驱能够形成单向移动的窗口，并且候选之间存在稳定的支配关系以后，单调队列就可以把窗口中的重复枚举压缩为均摊 $O(1)$ 的候选维护。

相关导航：[[DPGuide|动态规划导览]] · [[AlgorithmGuide|算法与竞赛]]
