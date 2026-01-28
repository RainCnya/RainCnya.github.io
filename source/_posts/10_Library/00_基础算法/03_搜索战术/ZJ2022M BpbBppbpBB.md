---
title: '[Leaf] [ZJ2022M] BpbBppbpBB'
tags:
  - 搜索/BFS
  - 连通性
  - 难度/P1/提高-
categories:
  - 10_Library
  - 00_基础算法
  - 03_搜索战术
abbrlink: a20a354
date: 2026-01-24 21:31:38
---
# [ZJ2022M - BpbBppbpBB](https://codeforces.com/gym/103687/problem/M)

## 1. 题面梗概

**中译中**: 在地图中寻找有几个 $C$ type，几个 $S$ type。

![[Pasted image 20260124213409.png]]

## 2. 逻辑推导

这题的难点在于，图形可能会"黏连"，所以直接数连通块大概率会导致结果偏少。

既然形状是完全固定的，那每一个 **子图** 贡献的 **黑色像素点总面积** 和 **内部空洞总个数** 都是固定的，我们可以列出下面这个二元一次方程组。
$$\begin{cases}
2C + S = Holes \\
146C + 100S = Black
\end{cases}$$

那么问题就很简单了，我们只需要找出总共有多少洞即可，黑色像素点在读入的时候就可以处理。

**但是**，这里会出现一个问题，如果我们在查询空洞的时候，只判断它的大小是否为 12 格的话，就会出现问题，如果两个 S type 拼在一起刚好凑出了一个 12 格的洞呢？

那不就炸了，所以，我们还需要匹配白色空洞的形状，也就是合法性。

## 3. 代码实现

{% fold info @AcCode %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using PII = pair<int, int>;

const int maxn = 1000 + 5;

bool vis[maxn][maxn];
string s[maxn];
int n, m;
int holes = 0;

int dx[] = { 0, 0, 1, -1 };
int dy[] = { 1, -1, 0, 0 };

bool check( int x, int y )
{
    return 1 <= x && x <= n && 1 <= y && y <= m;
}

void bfs( int x, int y )
{
    queue< PII > q;
    q.push({ x, y });
    vis[x][y] = 1;
    bool edge = 0;
    int cnt = 0;
    int x1 = x, x2 = x;
    int y1 = y, y2 = y;

    while( !q.empty( ) )
    {
        cnt ++;
        auto [x, y] = q.front( );
        q.pop( );
		
        // 判定是否接触边界 —— 接触边界的不是封闭空洞
        if( x == 1 || x == n || y == 1 || y == m ) edge = 1;
		
        x1 = min( x1, x );
        x2 = max( x2, x );
        y1 = min( y1, y );
        y2 = max( y2, y );
        
        for( int dir = 0; dir < 4; ++ dir )
        {
            int nx = x + dx[dir];
            int ny = y + dy[dir];

            if( check( nx, ny ) && s[nx][ny] == '.' && !vis[nx][ny] ) 
            {
                q.push({ nx, ny });
                vis[nx][ny] = 1;
            }
        }
    }
    
    if( edge || cnt != 12 ) return ;
    if( x2 - x1 + 1 != 4 || y2 - y1 + 1 != 4 ) return ;

    int row[4] = { 2, 4, 4, 2 };
    for( int i = 0; i < 4; ++ i )
    {
        for( int j = 0; j < 4; ++ j )
        {
            if( s[x1 + i][y1 + j] == '.' ) row[i] --;
        }
    }
    for( int i = 0; i < 4; ++ i )
    {
        if( row[i] != 0 ) return ;
    }
    holes ++;
}

void solve( )
{
    cin >> n >> m;

    int black = 0;
    for( int i = 1; i <= n; ++ i )
    {
        cin >> s[i];
        s[i] = ' ' + s[i];
        for( int j = 1; j <= m; ++ j )
        {
            if( s[i][j] == '#' ) black ++;
        }
    }
	
	// 扫描地图，寻找所有潜在空洞
    for( int i = 1; i <= n; ++ i )
    {
        for( int j = 1; j <= m; ++ j )
        {
            if( s[i][j] == '.' && !vis[i][j] )
            {
                bfs( i, j );
            }
        }
    }
	
    // 通过二元一次方程组求解印章数量
    // 这里数据范围不大，我就偷懒不解方程了
    for( int c = 0; c <= holes / 2; ++ c )
    {
        int s = holes - c * 2;
        if( 146 * c + 100 * s == black )
        {
            cout << c << ' ' << s << '\n';
            return;
        }
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
- **复杂度**: $O( N \times M )$

- **碎碎念**: 这个解法有点小巧思在里面，我最开始想着用哈希图像判断，但是发现太难实现了，复杂度也不好说。后来观察到空洞的特殊性，以及图像不会重叠，才通过列方程解决问题。当然这题坑有不少。。。

- **关联笔记**: [[连通块]] | [[搜索专题]]