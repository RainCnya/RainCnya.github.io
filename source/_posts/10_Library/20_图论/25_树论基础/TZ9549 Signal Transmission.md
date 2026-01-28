---
title: '[Leaf] [TZ9549] Signal Transmission'
tags:
  - 树论/树上递推
  - 数据结构/单调栈
  - 单调性/二分
  - 难度/P1/基础
categories:
  - 10_Library
  - 20_图论
  - 25_树论基础
abbrlink: '8e450243'
date: 2026-01-07
---
# [TZ9549 - Signal Transmission](https://www.tzcoder.cn/acmhome/problemdetail.do?method=showdetail&id=9549)

## 1. 核心逻辑

- **模型抽象**: 信号从节点 $u$ 向根节点传输，若当前信号 $S > a_p$ 则 $S$ 变为 $a_p$ 且压缩次数 $+1$。求各节点总压缩次数。
    
    - **中译中**: 找根到节点路径上，“前缀最小值”的变化次数。这本质上是在树上跑 **LIS (最长下降子序列)**。
        
- **逻辑支点 (树上 LIS 贪心)**:
    
    1. **贪心策略**: 维护一个从根出发的单调递减栈 `stk`。
        
    2. **二分定位**: 采用 $O(N \log N)$ 的 LIS 核心思想。每到一个新节点 $u$，在栈中二分找到第一个 $\ge a_u$ 的位置并替换它。
        
    3. **状态转移**: $dp[u] = dp[stk[pos - 1]] + 1$。
    
	    - 这里 `pos` 是 $u$ 在单调栈中的插入位置。
        
	    - `stk[pos-1]` 即为 $u$ 上方最近的一个能够触发压缩的祖先。

## 2. 逻辑演算

- **初始化**:
    
    - 设一个虚拟节点 `0`，其带宽 $a[0] = 0$，作为所有压缩的逻辑终点。
        
    - 令 `dp[0] = -1`，确保根节点（1号点）出发时的压缩次数初始化为 $0$。
        
- **回溯**: 

	- 由于是全局数组模拟栈，DFS 返回前必须还原 `stk[pos]`，防止污染其他分支。
        

## 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxn = 5e5 + 50;

vector<int> adj[maxn];
int n;
int a[maxn];
int dp[maxn];
int stk[maxn];

// 二分查找
int find( int val, int len )
{
    int l = 0, r = len - 1;
    int res = len;
    while( l <= r )
    {
        int mid = ( l + r ) >> 1;
        if( a[stk[mid]] >= val ) res = mid, r = mid - 1;
        else l = mid + 1;
    }
    return res;
}

void dfs( int u, int pa, int len ) 
{
    // LIS 核心：二分查找第一个比 a[u] 小或等于的位置
    // 栈内保持严格递减：a[stk[0]] > a[stk[1]] > a[stk[2]] ...
    int pos = find( a[u], len );

    // u 在递减序列中的位置即为其压缩次数
    dp[u] = pos;

    // 经典 LIS 替换逻辑 + 树上回溯保护
    int tmp = stk[pos];
    stk[pos] = u;

    for( int v : adj[u] ) 
    {
        if( v == pa ) continue;
        dfs( v, u, max( len, pos + 1 ) );
    }
    
    // 恢复现场：将栈中位置还原，供兄弟节点使用
    stk[pos] = tmp;
}

int main( ) 
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 ); 
    cout.tie( 0 );

    cin >> n;
    for( int i = 1; i <= n; ++ i )
    {
        cin >> a[i];
    }

    for( int i = 1; i < n; ++ i ) 
    {
        int u, v;
        cin >> u >> v;
        adj[u].push_back( v );
        adj[v].push_back( u );
    }

    // 逻辑基准点初始化
    a[0] = 0;
    dp[0] = -1;
    stk[0] = 0;
    
    dfs( 1, 0, 1 );

    for( int i = 1; i <= n; ++ i )
    {
        cout << dp[i] << ( i == n ? "" : " " );
    }
    cout << endl;

    return 0;
}
```

{% endfold %}

## 4. 复盘

- **复杂度**: $O(N \log N)$。
    
- **认知补丁**:
    
    - **逻辑穿透**: 不要被“信号传输”带歪。看到路径上的“变化次数”，第一反应应该是单调性维护。
        
    - **初始化技巧**: `dp[0] = -1` 配合虚拟节点 `0` 是处理这种“根节点作为终点不计数”边界情况的常用手段。
        
- **关联母题**: [[Note] 树上LIS问题], [[Note] DFS状态回溯]