---
title: '[Leaf] [TZ3709] Number Maze'
tags:
  - 图论/最短路
  - 搜索/BFS
  - 难度/P2/提高
categories:
  - 10_Library
  - 00_基础算法
  - 03_搜索战术
abbrlink: 619363dc
date: 2026-01-05
---
# [3709:Number Maze](https://www.tzcoder.cn/acmhome/problemdetail.do?method=showdetail&id=3709)

## 1. 核心逻辑

- **模型抽象**: 在带约束的网格图中求最短路径。移动判定函数为 $f(prev, curr, next) = ((val[prev] + val[curr]) \pmod{val[next]} == 0)$。
    
- **破局路径**:
    
    1. **状态升维**: 鉴于下一步的合法性依赖于前两步的数值和，单一坐标 $(x, y)$ 存在逻辑空缺。需扩展状态为 $(cx, cy, px, py)$，表示“当前位于 $(cx, cy)$ 且是从 $(px, py)$ 移动而来的”。
        
    2. **限制条件**: 题目明确禁止回头，即 $next \neq prev$。在枚举邻居时需强制跳过前驱格。
        
    3. **边界衔接**:
        
        - 起点 $S$ 位于 $(1, 0)$，第一步强制移动到 $(1, 1)$。
            
        - 终点 $T$ 位于 $(n, n+1)$，当到达 $(n, n)$ 时需额外判定一次能否跳向 $T$。
            
- **细节处理**:
    
    - $N \le 10$，四维数组 `dist[11][11][11][11]` 空间开销极小。
        
    - 初始状态：`dist[1][1][1][0] = 1`（代表 $S \to (1, 1)$ 这第一步）。

## 2. 代码实现

{% fold info @AcCode #trd %}

```cpp
#include<bits/stdc++.h>
using namespace std;

const int maxn = 12;
const int inf = 0x3f3f3f3f;

int n, s, t;
int mat[maxn][maxn];
int dist[maxn][maxn][maxn][maxn];
int ans;

int dx[4] = {0, 1, 0, -1};
int dy[4] = {1, 0, -1, 0};

bool check( int x, int y, int sum )
{
	if( 1 <= x && x <= n && 1 <= y && y <= n )
	{
		if( mat[x][y] == 0 ) return 0;
		if( sum % mat[x][y] == 0 ) return 1;
	}
	return 0;
}

struct Node {
	int cx, cy;
	int px, py;
};

void bfs( int x, int y )
{
	queue<Node> q;
	
	q.push({ 1, 1, 1, 0 });

	while( !q.empty( ) )
	{
		auto [cx, cy, px, py] = q.front( );
		q.pop( );
		
		int cur_d = dist[cx][cy][px][py];
		int sum = mat[px][py] + mat[cx][cy];
		
		if( cx == n && cy == n )
		{
			if( sum % t == 0 )
			{
				ans = min( ans, cur_d + 1 );
			}
		}
		
		for( int dir = 0 ; dir < 4; ++ dir )
		{			
			int nx = cx + dx[dir];
			int ny = cy + dy[dir];
			if( nx == px && ny == py ) continue;

			if( check( nx, ny, sum ) && dist[nx][ny][cx][cy] == inf )
			{
				dist[nx][ny][cx][cy] = cur_d + 1;
				q.push({ nx, ny, cx, cy });
			}

		}
	}
}

int main( )
{
	while( cin >> n >> s >> t )
	{
		memset( dist, 0x3f, sizeof( dist ) );
		ans = inf;
		
		for( int i = 1; i <= n; ++ i )
		{
			for( int j = 1; j <= n; ++ j )
			{
				cin >> mat[i][j];
			}
		}
		
		mat[1][0] = s;
		dist[1][1][1][0] = 1;
		mat[n][n+1] = t;
		
		bfs( 1, 1 );
		
		if( ans == inf ) cout << "Impossible" << '\n';
		else cout << ans << '\n';
	}
}


```

{% endfold %}

## 3. 复盘

- **复杂度**: $O(N^2 \times 4)$。每个状态只会被处理一次，计算量级为 $10^2$ 级别。
    
- **灵感反思**: 原代码使用 `steps <= 100` 是典型的“算力浪费”与“不确定性建模”。通过状态升维，将隐含的路径依赖显式化，是搜索算法从“试错”转向“逻辑审计”的关键步骤。
    
- **关联母题**: [[分层图最短路]]