---
title: '[Leaf] [ZJ2021L] String Freshman'
tags:
  - 字符串/KMP
  - 难度/P1/提高-
categories:
  - 10_Library
  - 60_字符串
abbrlink: da53b8d
date: 2026-01-22 00:00:00
---
# [ZJ2021L String Freshman](https://codeforces.com/gym/103055/problem/L)

## 1. 题面梗概

**中译中**: 给定一个长度为 $m$ 的模式串 $T$，给定匹配字符串的有缺陷贪心代码，问是否存在一个 $S$ 使得这个算法的结果错误。

代码如下，反例是 $T = aaa, S = aaaa$，正解是 $2$，错误解是 $1$。 
```cpp
int Find_Answer( ) {
	int j = 1, ans = 0;
	for( int i = 1; i <= n; ++ i ) {
		if( S[i] != T[j] ) j = 1;
		if( S[i] == T[j] ) j ++;
		if( j > m ) {
			ans ++;
			j = 1;
		}
	}
	return ans;
}
```

## 2. 逻辑推导

首先这是个字符串匹配问题，再仔细看题目的这份代码，我第一反应是一个“断腿”的 KMP 匹配。

它的一个重要问题就是，在匹配失败时 $j = 1$，而不是跳转到 $next$ 中尽可能长的公共前后缀。

这就导致了一个问题，如果 $T$ 模式串里，存在这某种“循环节”的结构，这个算法就会匹配失败。

**结论**：那么我们只需要判断 $T[1]$ 是否在 $T[2 \dots m]$ 中再次出现即可。

- **为什么**？如果 $T[i] == T[1]$，那么就说明 $T$ 内部存在着一段既是开头又是结尾的重复片段\或者是潜在的匹配陷阱。
- **重复陷阱**：$T = aaa$，显然，在匹配完一个 $T$ 之后，重新开始匹配，没有处理上一个匹配的结尾是下一个匹配的开始。
- **匹配陷阱**：$T = abcab$，如果 $S = abcabcab$，那么在匹配第一个串后，第二个 $c$ 就被贪心算法舍弃了，所以中间丢失了一个字符串。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair<int, int>;

const int maxn = 1e5 + 50;

int main( )
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    
    int n;
    string s;
    cin >> n >> s;

    char c = s[0];

    for( int i = 1; i < n; ++ i )
    {
        if( s[i] == c )
        {
            cout << "Wrong Answer" << '\n';
            return 0;
        }
    }

    cout << "Correct" << '\n';
    return 0;
}
```
{% endfold %}

## 4. 复盘

- **复杂度**: $O( M )$。
    
- **碎碎念**: 其实这题是考察 KMP 算法中 `next` 数组的意义。
    
- **关联笔记**: [[KMP 算法]]