---
title: '[Leaf] [TZ9512] 时空奇遇'
tags:
  - 数据结构/并查集
  - 难度/P1/提高-
categories:
  - 10_Library
  - 10_数据结构
  - 12_动态连通性
abbrlink: f3ae506a
date: 2026-01-05
---
# [9512:归元大帝的时空奇遇](https://www.tzcoder.cn/acmhome/problemdetail.do?method=showdetail&id=9512)

## 1. 题意梗概

**中译中**: 维护一堆势力。支持合并和查询。合并规则为：人多的赢；人一样多就编号小的赢。问最后 1 号是不是那个最终 BOSS。


## 2. 逻辑推导

**直觉**：应对这种动态维护问题，并查集显然就是首选。但标准的并查集只能维护连通性，并无法维护谁更强，不好处理本题复杂的合并问题。

那么我们可以在根节点再维护一个 `size[]` 数组，用于记录这个势力中的人数。

然后就是简单的并查集逻辑了，终局判断归元大帝（编号 1）是否仍为首领，只需校验 `find( 1 ) == 1 ?`。
    

## 2. 代码实现

{% fold info @AcCode %}

```cpp
#include<bits/stdc++.h>
using namespace std;

const int maxn = 1e5 + 50;

int fa[maxn], sz[maxn];
int n, q;

int find( int x )
{
	if( fa[x] == x ) return fa[x];
	else return fa[x] = find( fa[x] );
}

void merge( int u, int v )
{
	fa[v] = u;
	sz[u] += sz[v];
}

int main( )
{
	cin >> n >> q;
	
	for( int i = 1; i <= n; ++ i )
	{
		fa[i] = i;
		sz[i] = 1;
	}
	
	while( q -- )
	{
		int x;
		cin >> x;
		
		if( x == 1 )
		{
			int u, v;
			cin >> u >> v;
			
			int ru = find( u );
			int rv = find( v );
			
			if( ru == rv ) continue;
			
			int cnt_u = sz[ ru ];
			int cnt_v = sz[ rv ];
			
			if( cnt_u == cnt_v )
			{
				if( ru < rv ) merge( ru, rv );
				else merge( rv, ru );
			}
			else
			{
				if( cnt_u > cnt_v ) merge( ru, rv );
				else merge( rv, ru );
			}
		}
		else 
		{
			int u;
			cin >> u;
			cout << sz[find(u)] << '\n';
		}
	}
	if( fa[1] == 1 ) cout << sz[1] << '\n';
	else cout << "HO NO!" << '\n';
}

```

{% endfold %}

## 4. 复盘

- **复杂度**: $O( Q \alpha(N) )$。
    
- **碎碎念**: 并查集不只是维护 `fa` 数组，任何关于集合的“加法型不变量”（如人数、边数、权值和）都可以在合并时顺便维护。
    
- **关联知识点**: [[并查集]]