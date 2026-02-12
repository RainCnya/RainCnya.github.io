---
title: "[Leaf] CF2196C1\_Interactive Graph (Simple Version)"
tags:
  - 交互
  - 图论/基础
  - 策略/二分答案
  - 难度/P4
categories:
  - 220_Library
  - 70_杂项专题
  - 73_交互专题
abbrlink: 77269bf1
date: 2026-02-12 10:14:43
---

# [CF2196C1 - Interactive Graph (Simple Version)](https://codeforces.com/contest/2196/problem/C1)

## 1. 题面梗概

**中译中**：交互题，给定有一个 DAG，你可以询问 **所有路径按字典序排序后**，第 $k$ 条路径是什么。

目标是在有限次数内通过询问把所有的边都还原出来。

> 限制条件 $32 \cdot (n + m)$ 次询问，$n \leq 15$。

## 2. 逻辑推导

这题的关键在于理解路径按字典序排序后的形式。

### 2.1 字典序

这里以题目的样例为例：

![[Pasted image 20260212100703.png]]

{% fold info @AcCode %}

```
1
1→2
1→2→4
1→2→5
1→3
1→3→4
1→3→5
2
2→4
2→5
3
3→4
3→5
4
5
```

{% endfold %}

注意到字典序有很明显的顺序：

首先关注只有一个节点的路径：$1, 8, 11, 14, 15$ 这 5 行的路径。

而我们再观察，发现 $8, 9, 10$ 这 3 行的路径，其实就是 $2, 3, 4$ 这 3 行路径删掉第一个点之后。

这就暗示着我们，可以跳着来找点，先不考虑具体的算法，我们想想，对于这张图，我们应该怎么通过字典序来复原。

第一个节点是 $1$，然后找 $1$ 的邻居，发现是 $2, 3$。再找 $2$ 的邻居，发现是 $4, 5$；再找 $3$ 的邻居，发现是 $4, 5$，而 $4, 5$ 没有邻居，图画出来了。

### 2.2 二分

首先这题没有告诉我们总共有多少条边，我们第一步可以考虑先二分出总共有多少条路径。

然后我们再二分，找到每个 **单独点的路径**。

记 $rnk[u]$ 表示 $u$ 单独点路径的位置，$dp[u]$ 表示 $u$ 开头的路径的数量。

显然：$dp[u] = rnk[u + 1] - rnk[u]$。

### 2.3 建图

处理完 $dp, rnk$ 数组后，我们就可以开始建图了。

在以 $u$ 开头的路径里，第一条只有它自己，我们记作第 $cur$ 条路径。

第 $cur + 1$ 条路径的第二个点就是它的第一个邻居，我们记为 $v$，此时确定第一条边 $(u \to v)$。

然后我们再找第二个邻居，很显然中间要跳过很多路径，所以我们直接找第 $cur + 1 + dp[v]$ 条路径，此时找到的就是第二个邻居。

最后保证在 $< rnk[u + 1]$ 的路径中查找即可，超过了就说明到下一个节点了，接着处理 $u + 1$ 节点即可完成建图。

### 2.3 结论

交互 + 二分 + 字典序 +图论DAG。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 15 + 5;

struct Edge { int u, v; };

int cache[maxn];
int dp[maxn];
int rnk[maxn];
int n, m;

int ask( ll k )
{
    cout << "? " << k << endl;
    int len = 0;
    cin >> len;
    if( len == 0 ) return 0;
    for( int i = 0; i < len; ++ i ) cin >> cache[i];
    return len;
}

void solve( )
{
    cin >> n;

    ll limit = 1ll << n;

    ll l = 1, r = limit, sum = 0;
    while( l <= r )
    {
        ll mid = ( l + r ) >> 1;
        int len = ask( mid );
        if( len != 0 ) sum = mid, l = mid + 1;
        else r = mid - 1;
    }

    rnk[n + 1] = sum + 1;
    for( int u = 1; u <= n; ++ u )
    {
        ll l = 1, r = sum, res = sum + 1;
        while( l <= r )
        {
            ll mid = ( l + r ) >> 1;
            int len = ask( mid );
            if( len != 0 && cache[0] >= u ) res = mid, r = mid - 1;
            else l = mid + 1;
        }
        rnk[u] = res;
    }

    for( int u = 1; u <= n; ++ u ) dp[u] = rnk[u + 1] - rnk[u];

    vector< Edge > ans;
    for( int u = 1; u <= n; ++ u )
    {
        ll cur = rnk[u] + 1;
        while( cur < rnk[u + 1] )
        {
            int len = ask( cur );
            int v = cache[1];
            ans.push_back({ u, v });
            cur += dp[v];
        }
    }
    
    cout << "! " << ans.size( ) << endl;
    for( auto &[u, v] : ans ) cout << u << " " << v << endl;
}

int main( )
{
    int _t = 1;
    cin >> _t;
    while( _t -- ) solve( );
    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度分析**：
    
    - 索引构建：$O( n \log (\text{paths}) )$，总路径数不超过 $2^{30}$。
        
    - 边还原：每条边仅触发一次 `ask`。
        
    - 总询问次数远低于 $32 \cdot (n+m)$。
        
- **碎碎念**：这题一大难点就是交互题吧，不过其实也还好，通过对字典序的观察很容易能得到这个规律。
    
- **关联笔记**：[[交互专题]]
