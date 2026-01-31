---
title: "[Leaf] [ABC443F] Non-Increasing Number"
tags:
  - 图论/同余最短路
  - 搜索/BFS
  - 难度/P2/提高
date: 2026-01-31
---
# [F - Non-Increasing Number](https://atcoder.jp/contests/abc443/tasks/abc443_f)

## 1. 题面梗概

定义一个 “好数字”，它的数位从个位到高位是非递增的。也就是从左往右读，数字是不减的，比如 $112389, 777$ 这种。

求最小的 $N$ 的倍数，且它是 "好数字"，如果不存在就输出 $-1$。

## 2. 逻辑推导

我第一想法是枚举 $N$ 的倍数，然后判断是否为 “好数字”，但是想想都知道，这个复杂度太高了，所以我转而思考搜索这个角度切入。

我们需要找到最小的 $X$，满足 $X \equiv 0 \pmod N$。最小意味着两点，位数越小越好，字典序越小越好。

最小的那个答案，那不就可以用 BFS 搜索吗？以数字的长度和字典序为状态搜索，第一个搜到的就是最小的答案。

> BFS 的特性就是搜索到最短路（最小值），而 DFS 的特性是判断是否可行。

同时题目还给了我们一个信息，答案可能比 $2^{64}$ 还大，这就暗示我们可以只关注余数，如果某次搜索得到的余数为 $0$，那就是答案 $X$。

### 2.1 同余最短路

没想到吧，这个破题居然还可以转化为图论问题。

**节点**： ${remain, last\_dight}$，记录余数和最后一位数字。
**边**：$(r, d) \to ( (r \times 10 + nd) \pmod N ), nd )$，其中 $nd \geq d$。

**细节**：因为要输出整个数字，所以我们需要记录每个状态的**前驱**用于还原。

### 2.2 数位DP

其实在写完复盘的时候，我突然想到，这种类型能不能用数位DP来解决呢？因为有数位约束，又有余数。

但是数位DP的常态是：给定一个上限 $R$，问 $[0,R]$ 之间有多少个都符合条件的数。

本题的最大问题就是，没有给出这个上限 $R$，因此没法开状态。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 3e6 + 5;

struct State {
    int rem, dig;
} pre[maxn][10];

bool vis[maxn][10];

int n;

void solve( )
{
    cin >> n;

    queue< State > q;
    for( int d = 1; d <= 9; ++ d )
    {
        int r = d % n;
        if( vis[r][d] ) continue;
        vis[r][d] = 1;
        q.push({ r, d });
        pre[r][d] = { -1, -1 };
    }

    State ans = { -1, -1 };  

    while( !q.empty( ) )
    {
        auto [r, d] = q.front( );
        q.pop( );

        if( r == 0 )
        {
            ans = { r, d };
            break;
        }

        for( int nd = d; nd <= 9; ++ nd )
        {
            int nr = ( r * 10 + nd ) % n;
            if( vis[nr][nd] ) continue;
            vis[nr][nd] = 1;
            q.push({ nr, nd });
            pre[nr][nd] = { r, d };
        }
    }

    if( ans.rem == -1 )
    {
        cout << -1 << '\n';
        return;
    }

    vector< int > res;
    while( ans.rem != -1 )
    {
        res.push_back( ans.dig );
        ans = pre[ans.rem][ans.dig];
    }
    reverse( res.begin( ), res.end( ) );
    for( int d : res ) cout << d;
    cout << '\n';

}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int _t = 1;
    // cin >> _t;
    while( _t -- ) solve( );
    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度**: $O(10N)$。空间 $O(10N)$。
    
- **碎碎念**: 这题想了想大概就是用搜索来解决，或者DP？**最小的答案**暗示我们使用BFS，**非递减**这个数位约束限制了 BFS 的搜素方向，**最小倍数**引导我们使用**同余最短路**模型。
        
- **关联笔记**: [[同余最短路]] | [[搜索]]