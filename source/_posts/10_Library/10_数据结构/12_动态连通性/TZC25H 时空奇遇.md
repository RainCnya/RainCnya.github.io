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
## 1. 核心逻辑

- **模型抽象**: 

	- 维护一个具有 $n$ 个节点的集合，支持合并与查询大小。合并规则具有特定的优先级顺序。
    
- **破局路径**:
    
    - **并查集扩展**: 使用标准并查集维护连通性，额外维护 `sz[]` 数组记录势力人数。
        
    - **规则注入**:
        
        1. 规模优先：人数多的收编人数少的。
        2. 编号优先：人数相等时，首领编号小的收编大的。
            
    - **不变量执行**: 合并后更新新领袖的 `sz` 值。
        
- **细节处理**: 终局判断归元大帝（编号 1）是否仍为首领，只需校验 `find( 1 ) == 1`。
    

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

## 3. 复盘

- **复杂度**: $O( Q )$。
    
- **灵感反思**: 并查集在处理此类带有“特殊规则”的合并时，核心在于**明确合并方向**。

	- 手动控制合并方向（按秩合并的变体）不仅能满足题目逻辑，还能天然维持树的高度平衡。
    
- **关联母题**: [[Note] 并查集属性维护]