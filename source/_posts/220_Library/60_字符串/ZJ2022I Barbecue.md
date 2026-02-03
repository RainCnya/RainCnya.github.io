---
title: '[Leaf] [ZJ2022I] Barbecue'
tags:
  - 字符串/Manacher
  - 数学/博弈
  - 难度/P3
categories:
  - 220_Library
  - 60_字符串
abbrlink: a58b0ec6
date: 2026-01-24 21:46:35
---
# [ZJ2022I - Barbecue](https://codeforces.com/gym/103687/problem/I)

## 1. 题面梗概

Putata 和 Budada 玩一个撕纸条的游戏。纸条上有个字符串，轮到你时，你必须从开头或结尾撕掉一个字符，然后传给对方。

谁手上的纸条变成**回文串**，谁就输（撕之前撕之后都一样，只要纸条在你手中变成了回文，就输）。

现给你一个长字符串和 $Q$ 次询问，每次询问游戏纸条字符串 $[S_l, S_r]$，问谁赢。

## 2. 逻辑推导

这题看起来很莫名其妙，不好切入，特别是这个撕前撕后。但我们从“回文串”切入分析，就会好理解多。

首先是：任何长度为 1 的字符串都是回文，所以游戏必然会在只剩下 1 个字符时强制结束。

### 2.1 博弈论

接下来我们从**博弈论**角度分析：

1. 若字符串是回文的：那么作为先手的 `Putata` 必输。

2. 若字符串不是回文，长度为偶数：

	- 那么 `Putata` 撕掉一个，变成奇数长度，若剩下来的是回文串，则 `Putata` 输；

	- 注意到每次交替撕，所以这种情况下，`Putata` 都是在将一个偶数长度的字符串变成奇数长度。

	- 还记得吗？任何长度为 1 的字符串都是回文串，这就意味着，如果给到 `Putata`的字符串是偶数长度的，那么他必输。

3. 若字符串不是回文，长度为奇数：

	- 那么 `Putata` 撕掉一个，变成偶数长度，若剩下来的是回文串，则 `Putata` 输；
	
	- 但是如果剩下来的不是回文串呢？那 `Putata` 就把 “长度为偶数，不是回文串的情况” 丢给 `Budada` 了。

	- 根据上面分析，这种情况下 `Putata` 必胜。

通过上述分析，我们把问题转化为了快速查询 $[S_l, S_r]$ 这个字符串是否为回文串的问题上。

### 2.2 字符串

接着我们得从**字符串**角度切入分析：

如何快速预处理子串的回文情况呢？在当前题目条件下，Manacher 算法绝对是不二之选。

它通过维护每个字符左右能扩展的长度，快速进行回文串判断。

当然，因为这题我们只需要判断奇数长度的回文串，所以不用考虑那个特殊的 Manacher 变形。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int maxn = 1e6 + 5;

int n, q;
string s;

int dist[maxn];

void manacher( string &s, int n )
{
    s = ' ' + s;

    int l = 1, r = 0;
    for( int i = 1; i <= n; ++ i )
    {
        int k = 1;
        if( i <= r ) k = min( dist[l + r - i], r - i + 1);  
        while( 1 <= i - k && i + k <= n && s[i-k] == s[i+k] ) k ++;

        dist[i] = k --;
        if( i + k > r )
        {
            l = i - k;
            r = i + k;
        }
    }
}

void solve( )
{
    cin >> n >> q;
    cin >> s;
    manacher( s, n );
    
    for( int i = 1; i <= q; ++ i )
    {
        int l, r;
        cin >> l >> r;
        int len = r - l + 1;
        
        // 偶数长度必败
        if( len % 2 == 0 ) 
        {
            cout << "Budada" << '\n';
            continue;
        }
        int mid = (l + r) >> 1;
        // 奇数长度，且是为回文，必败
        if( dist[mid] > len / 2 ) cout << "Budada" << '\n';
        // 奇数长度，且不是回文，必胜
        else cout << "Putata" << '\n';
    }
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int _t = 1;
    // cin >> _t;
    while( _t -- )
    {
        solve( );
    }
    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度**: Manacher 预处理 $O(n)$，单次查询 $O(1)$。总复杂度 $O(n + q)$。
    
- **碎碎念**:

	- 博弈论的题目往往难在“翻译”上。一旦把这个逻辑梳理明白了，这题就变成了纯粹的字符串练习。
        
    - **Manacher 细节**: 题目只关心奇数长度的回文判定，因此代码中省去了插入分隔符 `#` 的步骤，直接跑原串的奇回文逻辑即可。
        
- **关联笔记**: [[Manacher]] | [[博弈论基础]]]