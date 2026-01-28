---
title: '[Leaf] [ZJ2020C] Crossword Validation'
tags:
  - 数据结构/哈希表
  - 难度/P1/提高-
categories:
  - 10_Library
  - 60_字符串
abbrlink: 9b9ebd6f
date: 2026-01-20
---
# [ZJ2020C - Crossword Validation](https://codeforces.com/gym/102770/problem/C)

## 1. 题面梗概

**中译中**: 给你一个 $N \times N$ 的填字游戏方格，以及一个带分数的词典。
**规则**：方格中横向或纵向**连续的极长字母段**被称为“候选词”。
**判定**：如果所有候选词都在词典里，则拼图有效。 
**目标**：输出所有候选词分数的总和，若无效则输出 $-1$。

## 2. 逻辑推导

问这个拼图是否合法，以及它的总分是多少？

既然合法性的定义是“每一个候选词都必须在词典中”，而候选词又分为横向和纵向。

那么问题就转化为了，准确提取出所有的候选词，然后再快速查它们的分数。

提取的部分难度不大，这里具体说说快速查询：字符串哈希表 / 字典树 (Trie)。

我这里采取 `unordered_map` 来实现，因为题目只要求完整的单词匹配，不涉及前缀。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair<int, int>;

const int maxn = 1e3 + 5;
unordered_map< string, int > dict;
char g[maxn][maxn];
int n, m;

// 辅助 check 函数，校验候选词
bool check( string s, ll &ans )
{
    s += '#';
    string cur = "";

    for( char c : s )
    {
        if( c != '#' )
        {
            cur += c;
            continue;
        }

        if( !cur.empty( ) )
        {
            auto it = dict.find( cur );
            if( it == dict.end( ) ) return 0;
            ans += it->second;
        }
        cur = "";
    }
    return 1;
}

void solve( )
{
    dict.clear( );
    cin >> n >> m;
    for( int i = 1; i <= n; ++ i )
    {
        for( int j = 1; j <= n; ++ j )
        {
            cin >> g[i][j];
        }
    }

    for( int i = 1; i <= m; ++ i )
    {
        string s;
        int score;
        cin >> s >> score;
        dict[s] += score;
    }

    ll ans = 0;
    bool ok = 1;

	// 扫描每一行
    for( int i = 1; i <= n; ++ i )
    {
        string word = "";
        for( int j = 1; j <= n; ++ j ) word += g[i][j];
        if( check( word, ans ) ) continue;
        ok = 0;
        break;
    }

    if( ok == 0 ) 
    {
        cout << "-1" << '\n';
        return ;
    }

	// 扫描每一列
    for( int j = 1; j <= n; ++ j )
    {
        string word = "";
        for( int i = 1; i <= n; ++ i ) word += g[i][j];
        if( check( word, ans ) ) continue;
        ok = 0;
        break;
    }

    if( ok == 0 )
    {
        cout << "-1" << '\n';
        return ;
    }

    cout << ans << '\n';
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

- **复杂度**: $O( N^2 + M \times L )$，其中 $L$ 为单词平均长度。
    
- **碎碎念**:
    
    - 候选词的定义是“不能再延伸”，所以在代码里可以通过 `#` 中断符分割。
        
    - **避雷**：如果拼图中有单个字母且左右上下都是黑块，它既是横向候选词也是纵向候选词，需要分别计分。
        
    - 题目要求“每个”候选词都必须在词典中，漏掉一个就是不合法的。
        
- **关联笔记**:  [[哈希表体系]]