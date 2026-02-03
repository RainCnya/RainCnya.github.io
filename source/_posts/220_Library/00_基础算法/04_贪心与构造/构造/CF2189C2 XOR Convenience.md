---
title: '[Leaf] [CF2189C2] XOR Convenience'
tags:
  - 策略/构造
  - 算法/位运算
  - 难度/P2
categories:
  - 220_Library
  - 00_基础算法
  - 04_贪心与构造
abbrlink: 7a0fbe6b
date: 2026-01-24 15:04:35
---
# [CF2189C2 - XOR Convenience](https://codeforces.com/contest/2189/problem/C2)

## 1. 题面梗概

**中译中**: 构造一个 $1, \dots, n$ 的排列 $p$，使得每个 $i \in [1, n-1]$，都存在 $j \geq i$，满足 $p_i \oplus p_j = i$。

## 2. 逻辑推导

### 2.1 猜测

这题与 Easy 版的差别就是：需要考虑 $i = 1$ 的情况，这就意味着我们不能随意处理 $p_1$ 的情况了。

构造排列的复杂度为 $n!$，不妨先打个表，看看有没有什么规律。不过想了想，感觉可以用随机性搜搜，于是就有了下面这段打表程序：

{% fold info @打表 %}

```cpp
#include <bits/stdc++.h>
using namespace std;

bool check( const vector<int>& p, int n ) 
{
    for( int i = 1; i < n; ++ i ) 
    {
        bool found = false;
        for( int j = i; j <= n; ++ j ) 
        {
            if( (p[i-1] ^ p[j-1]) == i ) 
            {
                found = true;
                break;
            }
        }
        if( !found ) return false;
    }
    return true;
}

void search( int n ) 
{
    vector<int> p(n);
    iota( p.begin( ), p.end( ), 1 );

    mt19937 g( random_device{ }( ) );

    long long attempts = 0;
    while( attempts < 1000000000 ) 
    {   // 设定一个 1e9 的尝试上限
        shuffle( p.begin( ), p.end( ), g );
        if( check( p, n ) ) 
        {
            printf("N = %d: (Found in %lld): ", n, attempts);
            for( int x : p ) printf("%d ", x);
            printf("\n");
            return;
        }
        attempts++;
    }
    printf("N = %d: Failed After 1e9 Attempts\n", n);
}

int main( ) 
{
    int n;
    cin >> n;
    for( int i = 1; i <= n; ++ i )
    {
        search( i );
    }
    return 0;
}
```

{% endfold %}

得到的结果如下：

```text
N = 1: (Found in 0): 1
N = 2: Failed After 1e9 Attempts
N = 3: (Found in 4): 2 1 3
N = 4: Failed After 1e9 Attempts
N = 5: (Found in 12): 4 3 2 1 5
N = 6: (Found in 101): 4 1 5 2 3 6
N = 7: (Found in 156): 5 6 1 3 7 2 4
N = 8: Failed After 1e9 Attempts
N = 9: (Found in 63995): 8 3 5 2 4 7 6 9 1
N = 10: (Found in 26333): 8 6 9 1 7 4 5 2 10 3
N = 11: (Found in 14826): 10 7 11 5 3 4 6 9 1 2 8
N = 12: (Found in 25891): 6 7 2 5 4 10 12 11 1 9 8 3
N = 13: (Found in 37887): 5 11 9 6 8 2 3 12 4 7 10 13 1
N = 14: (Found in 307471): 4 8 9 1 14 13 2 3 5 6 12 11 10 7
N = 15: (Found in 8370): 2 7 6 1 15 10 4 13 12 3 14 9 8 5 11
N = 16: Failed After 1e9 Attempts
N = 17: (Found in 116870508): 16 4 12 2 6 11 9 7 10 5 8 13 3 15 14 17 1
N = 18: Failed After 1e9 Attempts
N = 19: Failed After 1e9 Attempts
N = 20: Failed After 1e9 Attempts
```

> 忽略掉可能运气不好的 $18,19,20$，我们发现，凡是属于 $2$ 的幂的数，都不成立。

假设 $p_i = n = 2^k$，若 $i < n$，则需要 $p_i \oplus i = p_j$。因为 $i < 2^k$，且 $p_i = 2^k$，问题就诞生了，他们异或出来的结果一定比 $2^k$ 要大，显然是矛盾的。

### 2.2 分析

当 $n \neq 2^k$ 时，设 $n$ 的最高位为 $2^k$，定义余数为 $r= n - 2^k$，发现 $n \oplus 2^k = r$。

而通过上面的分析，我们发现有三个位置很特殊 $i = 1, i = 2^k, i = r$。

- 若要解决 $i = 1$，可以简要构造 $k \oplus (k + 1) = 1$。
- 若要解决 $i = 2^k$，可以利用 $n, r$。
- 若要解决 $i = r$，可以利用 $n, 2^k$。

1. 而因为 $r < 2^k$，所以可以让 $p_r = n$，根据题意，只需要把 $2^k$ 放在 $r$ 后面的某个位置即可。

2. 但原本在 $r$ 位置上的那个数 (假设是 $v$) 就被踢走了。

3. 考虑到 $1$ 号元素前面是空的，不妨把 $v$ 换到 $p_1$。

4. 那么，只要我们最开始的构造是 $k \leftrightarrow k + 1$，$p_1 = v$ 就一定能和 $p_{r+1}$ 或者 $p_{r-1}$ 异或得到 $1$。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int n;

void solve( )
{
    cin >> n;
    if( (n & ( n - 1 )) == 0 )
    {
        cout << -1 << endl;
        return;
    }

    vector< int > ans( n + 1 );

    if( n % 2 == 0 )
    {
        ans[1] = n;
        for( int i = 2; i <= n - 1; i += 2 )
        {
            ans[i] = i + 1;
            ans[i+1] = i;
        }
        ans[n] = 1;

        int k = 1;
        while( ( k << 1 ) <= n ) k <<= 1;
        int r = n - k;

        swap( ans[1], ans[r] );
    }
    else
    {
        ans[1] = n - 1;
        for( int i = 2; i <= n - 2; i += 2 )
        {
            ans[i] = i + 1;
            ans[i+1] = i;
        }
        ans[n-1] = n, ans[n] = 1;
    }
    
    for( int i = 1; i <= n; ++ i )
    {
        cout << ans[i] << " " ;
    }
    cout << '\n';
}

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int _t = 1;
    cin >> _t;
    while( _t -- )
    {
        solve( );
    }
    return 0;
}
```
{% endfold %}

## 4. 复盘

- **碎碎念**: 数论能力不够，赛场上真写不出来这题，思维！重点在 $2^k \oplus r = n$，能想到这个大概有切入点了。

- **关联笔记**: [[构造体系]]