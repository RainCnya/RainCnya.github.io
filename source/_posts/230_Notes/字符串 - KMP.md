---
title: 字符串 - KMP
tags: 字符串/KMP
date: 2026-04-06
---

## KMP 例题

### 1. [P4391 Radio Transmission 无线传输](https://www.luogu.com.cn/problem/P4391)

#### 题意
给定一个字符串 $S_{1}$，它是由某个字符串 $S_{2}$ 不断自我连接形成的。但是字符串 $S_{2}$ 是不确定的，要求其最短值。

> 举个例子：`cabcabca` 可以视为 `cab` 的不断连接 `(cab,cab,ca)b`

#### 思路
如果一个字符串 $S_{1}$ 是由 $S_{2}$ 重复拼接而成的子串，那么 $S_{1}$ 一定具有 **周期性**。

这里有一个结论：对于一个长度为 $L$ 的字符串，如果它有一个长度为 $x$ 的 Border，那么 $L - x$ 就是该字符串的一个周期。

> Border: 字符串 $S$ 的一个子串，既是 $S$ 的真前缀，也是 $S$ 的真后缀。
> 周期：对于所有满足条件的 $i$，都有 $S[i] = S[i+k]$，则 $k$ 是 $S$ 的周期。

如下图，把前后缀分开，令它们上下一一相等，此时红色段加上后缀就是原字符串。

接着可以推出，由于上下对应，$0=1,2=3,4=5,6=7,8=9$；
由于公共前后缀，$1=2,3=4,5=6,7=8,9=10$，因此，红色段 $0$ 即循环子串。

![[Pasted image 20260406152646.png]]

题目要求最短周期子串，即 $k = n - max(border)$，问题就转化为了求最长 $Border$，而最长 $Border$ 正好就是 KMP 算法中的 Next 数组，至此逻辑完整。

#### 代码部分
```cpp
void solve( )
{
    cin >> n >> P;
    P = " " + P;
    int m = P.length( ) - 1;
    for( int i = 2, j = 0; i <= m; ++ i )
    {
        while( j > 0 && P[i] != P[j + 1] ) j = nxt[j];
        if( P[i] == P[j + 1] ) j ++;
        nxt[i] = j;
    }
    cout << n - nxt[n] << '\n';
}
```

### 2. [P3435 OKR-Periods of Words](https://www.luogu.com.cn/problem/P3435)

#### 题意
如果 $Q$ 是 $A$ 的真前缀，并且 $A$ 是 $QQ$ 的前缀，那么 $Q$ 是 $A$ 的**周期**，要求给定字符串 $S$ 的所有前缀的**最大周期**长度之和。

> 字符串 $A$ 的**最大周期**是其最长的周期，例如：`ababab` 的最大周期是 `abab`。

#### 思路
参考上题思路，因为 $Q$ 是 $A$ 的真前缀，不妨记 $A = QS'$，而 $A$ 是 $QQ$ 的前缀，则 $QS'$ 是 $QQ$ 的前缀，也就是说 $S'$ 是 $Q$ 的前缀。

因为 $S'$ 本来是 $A$ 的后缀，又是 $A$ 的前缀（ $S'$ 是 $Q$ 的前缀，$Q$ 是 $A$ 的前缀 ），所以，$S'$ 是 $A$ 的一个 Border。

要使 $Q$ 的长度最长，也就是 Border $S'$ 的长度最短。因此，对于长度为 $i$ 的前缀，其 *最大周期长度* = $i - min(Border)$。

由于在 KMP 算法中，求得的 Next 是最长的 Border，我们没法直接套用，需要再进行修改。根据 Next 数组的性质，一个字符串的所有 Border 长度构成一个链式结构：

$$
Border(i) = \{ nxt[i], nxt[nxt[i]], nxt[nxt[nxt[i]]] \dots \}
$$

我们要找的就是这个序列中最后一个大于 $0$ 的数，举个例子，`babababa` 的前缀 `babab` ( 长度为 5 )，`nxt[5] = 3, nxt[3] = 1, nxt[1] = 0`，所以最长周期长度 = $5 - 1 = 4$。

由于可能会出现不断跳跃的情况，我们可以采用并查集的路径压缩思路来进行优化。

#### 代码部分
```cpp
void solve( )
{
    cin >> n >> s;
    s = " " + s;
    
    for( int i = 2, j = 0; i <= n; ++ i )
    {
        while( j && s[i] != s[j + 1] ) j = nxt[j];
        if( s[i] == s[j + 1] ) j ++;
        nxt[i] = j;
    }

    ll ans = 0;
    for( int i = 2, j = 2; i <= n; ++ i, j = i )
    {
        while( nxt[j] ) j = nxt[j];
        if( nxt[i] ) nxt[i] = j;
        ans += i - j;
    }
    cout << ans << '\n';
}
```

### 3. [P3121 Censoring G](https://www.luogu.com.cn/problem/P3121)

#### 题意
给定一个字符串 $S$，要求删除其中所有的子串 $T$。（注：删除后可能会形成新的子串）

#### 思路
模式串匹配，自然能想到 KMP 匹配，但是发现是删除操作，所以需要针对删除操作修改 KMP。

由于匹配成功等于这个串删除了，都是在序列的右端进行操作，所以想到了 *栈* 这种数据结构，但是这样就会遇到一个新问题，如何处理删除后产生的新串，也就是 $j$ 指针应该如何移动呢？

如果按照朴素的 KMP 来说，匹配成功后 $j$ 要转移到 $nxt[j]$ 处，问题是原串变了，这个就不一定成立（样例比较良心，告诉你这样是过不去的）。发现对于一个没有匹配成功的字符，它对应的目标字符串的位置是不会变的，所以就可以开一个辅助数组来记录这个对应位置。

#### 代码部分
```cpp
void solve( )
{
    cin >> s >> t;
    s = " " + s, t = " " + t;
    build_nxt( t );

    int n = s.length( ) - 1;
    int m = t.length( ) - 1;

    top = 1;
    for( int i = 1, j = 0; i <= n; ++ i )
    {
        while( j && s[i] != t[j + 1] ) j = nxt[j];
        if( s[i] == t[j + 1] ) j ++;
        stk[top ++] = s[i];
        pos[top] = j;
        if( j == m ) {
            top -= m;
            j = pos[top];
        }
    }

    // cout << top << '\n';
    for( int i = 1; i < top; ++ i ) cout << stk[i];
}
```

### 4. [P2375 动物园](https://www.luogu.com.cn/problem/P2375)

#### 题意
在 KMP 算法的 `next` 数组基础上，求出字符串的 `num` 数组，定义为：对于字符串 $S$ 的前 $i$ 个字符构成的子串，既是它的后缀又同时是它的前缀，并且该后缀与该前缀不重叠，这种字符串的数量记为 `num[i]`。

> 举个例子：若 $S$ 为 `aaaaa`，则 `num[4] = 2`，因为长度为 3 的 `aaa` 前后缀重叠了，就不满足条件。

最后输出 $\prod( num[i] + 1 ) \bmod (10^9+7)$。

#### 思路
前面推导过，对于一个前缀 $i$ 的 $next[i]$，它长这样：

$$
Border(i) = \{ nxt[i], nxt[nxt[i]], nxt[nxt[nxt[i]]] \dots \}
$$

那么，为了统计 $num$ 数组，我们只需要在预处理 $next$ 数组的同时把这个数量递推一下就行，这样就得到了题目下弱化的 $num$ 数组：可以重叠的公共前后缀数量。

接着我们只需要顺着第二个限制条件去重即可，首先 $next[i] < i$，也就是说，如果一个递归了 $k$ 次的 $next$，如果比原前缀 $i$ 的长度的一半要小，那么这个 $next$ 递推出来的答案 $ans$ 就是本题下 $i$ 的真正 $num$ 了。

#### 代码部分
```cpp
void build_nxt( const string &P )
{
    int m = P.length( ) - 1;
    for( int i = 2, j = 0; i <= m; ++ i )
    {
        while( j && P[i] != P[j + 1] ) j = nxt[j];
        if( P[i] == P[j + 1] ) j ++;
        nxt[i] = j; num[i] = num[j] + 1;
    }
}

void solve( )
{
    cin >> s;
    s = " " + s;
    num[0] = 0, num[1] = 1;
    build_nxt( s );

    int n = s.length( ) - 1;
    ll ans = 1;
    for( int i = 2, j = 0; i <= n; ++ i )
    {
        while( j && s[i] != s[j + 1] ) j = nxt[j];
        if( s[i] == s[j + 1] ) j ++;
        while( ( j << 1 ) > i ) j = nxt[j];
        ans = ( ans * ( num[j] + 1) ) % mod;
    }
    cout << ans << '\n';
}
```

### 5. [P3426 SZA-Template](https://www.luogu.com.cn/problem/P3426)

#### 题意
给定一个字符串 $S$，要求找出其中的最短印章（模版） $T$ 来覆盖原串。

>例子如下：印章 $T$ 是 `ababbaba`，长度为 8。
```text
ababbababbabababbabababbababbaba
ababbaba
     ababbaba
            ababbaba
                   ababbaba
                        ababbaba
```

#### 思路
注意到印章 $T$ 一定是 $S$ 的前后缀，不然没法印到开头和结尾，所以 $T$ 一定是原串 $S$ 的一个 Border。虽然印章一定是 Border，但是 Border 不一定是印章，比如 `abababa` 的 Border 有 `aba` 和 `a`，但是 `a` 显然不行。

那么我们就需要判断：对于长度为 $i$ 的前缀 $S[1\dots i]$，它的最短印章长度 $f[i]$ 是多少？这里可以采用 DP 的思想，首先考虑 $nxt[i] = 0$ 的情况，此时 $f[i] = i$，因为没有更短的子串能覆盖它。

> 为什么采用 DP 的思想？
> 1. 最优子结构：一个大串的印章，如果能缩短，那个缩短后的印章必然也是它某个 Border 的印章。 
> 2. 重叠子问题：在判定 $f[i]$ 时，其实是在利用已经算好的 $f[nxt[i]]$。
> 3. 无后效性：当我们确定了 $f[i]$ 的值以后，只需要关心这个长度以及它最后出现的位置，并不需要知道前缀 $i$ 中的印章轨迹。只要 $f[i]$ 算出来了，它对后续 $f[k] (k > i)$ 的贡献就是确定的。

然后考虑能否使用更短的印章，如果能，那么这个印章肯定也能覆盖更短的 Border，记 $L = nxt[i]$，那么也就是 $f[i] = f[L]$。什么情况下可以覆盖到呢？

模拟后发现，$f[L]$ 能覆盖 $S[1\dots i]$ 的充要条件是：在 $[i-L,i-1]$ 之间，曾经出现过一个位置 $j$，使得 $f[j] = f[L]$。

> 直观上的理解就是：$f[L]$ 已经能覆盖前缀 $S[1\dots L]$。如果在靠近结尾的地方，$f[L]$ 再次出现并覆盖了某个前缀 $S[1\dots j]$，那么这两次 “盖印” 就把中间的空隙填充了。

#### 代码部分
```cpp
void solve( )
{
    cin >> s;
    s = " " + s;
    build_nxt( s );

    int n = s.length( ) - 1;
    for( int i = 2, j = 0; i <= n; ++ i )
    {
        while( j && s[i] != s[j + 1] ) j = nxt[j];
        if( s[i] == s[j + 1] ) j ++;
        nxt[i] = j;
    }
    f[1] = 1, last[1] = 1;
    for( int i = 2; i <= n; ++ i )
    {
        f[i] = i;
        if( last[f[nxt[i]]] >= i - nxt[i] ) f[i] = f[nxt[i]];
        else f[i] = i;
        last[f[i]] = i;
    }
    cout << f[n] << '\n';
}
```
