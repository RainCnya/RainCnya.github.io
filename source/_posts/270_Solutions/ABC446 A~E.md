---
title: Solution_ABC446 A~E
tags: ABC
date: 2026-02-21
---


## [A - Handmaid](https://atcoder.jp/contests/abc446/tasks/abc446_a)

### 1. 题意梗概

给定一个字符串 $S$，要求将其首字母转换为小写，并在字符串前面拼接 "Of" 后输出。

### 2. 逻辑推导

基础字符串处理题。`Pass`

### 3. 代码实现

```cpp
void solve( )
{
    string s;
    cin >> s;
    s[0] = tolower(s[0]);
    s = "Of" + s;
    cout << s << endl;
}
```

---

## [B - Greedy Draft](https://atcoder.jp/contests/abc446/tasks/abc446_b)

### 1. 题意梗概

$N$ 位顾客按照编号顺序挑选 $M$ 种果汁。每位顾客有一个愿望清单。顾客会选择清单中 **最早出现且尚未被他人取走** 的果汁。

> $N, M \leq 100$

### 2. 逻辑推导

简单的模拟问题，使用 `used[i]` 数组维护编号为 $i$ 的果汁是否已被领走。

**贪心**：对于每一位顾客，遍历其愿望清单，找到第一个没被领走的果汁，记录结果即可。

### 3. 代码实现

```cpp
void solve( )
{
    cin >> n >> m;
    vector< int > ans;
    for( int i = 1; i <= n; ++ i )
    {
        int l; cin >> l;
        for( int j = 1; j <= l; ++ j ) cin >> x[j];

        int res = 0;
        for( int j = 1; j <= l; ++ j )
        {
            if( used[ x[j] ] == 0 )
            {
                used[ x[j] ] = 1;
                res = x[j];
                break;
            }
        }
        ans.push_back( res );
    }
    for( int x : ans ) cout << x << endl;
}
```

## [C - Omelette Restaurant](https://atcoder.jp/contests/abc446/tasks/abc446_c)

### 1. 题意梗概

餐厅经营 $N$ 天。每天的操作流程为：

1. **早上**：买入 $A_i$ 个鸡蛋。
    
2. **中午**：使用 $B_i$ 个鸡蛋，按照购买顺序使用。
    
3. **晚上**：丢弃所有存放了 $D$ 天或更久的鸡蛋。
    
求第 $N$ 天晚上操作结束后剩余的鸡蛋总数。

> $1 \leq D, M \leq 2 \times 10^5$

### 2. 逻辑推导

购买顺序 -> 先入先出 -> 队列顺序。

那么就可以用简单的单调队列滑动窗口来解决了。

因为每天不止买一个鸡蛋，为了保证丢弃掉所有不满足条件的鸡蛋，队列元素维护两个状态，*购买日期* 和 *数量*。

**出队判定**：晚上判定条件为 $i - day + 1 \ge D$，过期的鸡蛋无论数量全部出队。

### 3. 代码实现

```cpp
struct State { int day, cnt; };

void solve( )
{
    cin >> n >> d;
    for( int i = 1; i <= n; ++ i ) cin >> a[i];
    for( int i = 1; i <= n; ++ i ) cin >> b[i];

    deque< State > q;
    for( int i = 1; i <= n; ++ i )
    {
        q.push_back({ i, a[i] }); // 早上
        int rem = b[i];           // 中午
        while( !q.empty( ) && rem > 0 )
        {
            if( q.front( ).cnt <= rem ) {
                rem -= q.front( ).cnt;
                q.pop_front( );
            } else {
                q.front( ).cnt -= rem;
                rem = 0;
            }
        }
        int lim = i - d + 1; // 晚上
        while( !q.empty( ) && q.front( ).day < lim ) q.pop_front( );
    }
    ll sum = 0;
    for( auto &x : q ) sum += x.cnt;
    cout << sum << '\n';
}
```

---

## [D - Max Straight](https://atcoder.jp/contests/abc446/tasks/abc446_d)

### 1. 题意梗概

给定长度为 $N$ 的序列 $A$，求最长子序列 $B$ 的长度，使得 $B$ 满足 $B_i + 1 = B_{i+1}$（即数值连续递增）。

> $N \leq 2 \times 10^5; A_{i} \leq 10^9$

### 2. 逻辑推导

这个一眼 线性DP LIS 模型。

直接定义：$dp[x]$ 表示以数值 $x$ 结尾满足条件的最长子序列长度。

转移：$dp[x] = dp[x - 1] + 1$。

但是问题在于 $A \leq 10 ^9$ 不能直接开数组，这里采用 `map` 来离散化存储 DP 状态。
    
### 3. 代码实现

```cpp
void solve( )
{
    cin >> n;
    for( int i = 1; i <= n; ++ i ) cin >> a[i];

    map< int, int > dp;
    int len = 0;
    for( int i = 1; i <= n; ++ i )
    {
	    // 注意顺序即可，后面的数字不影响本次转移
        dp[ a[i] ] = dp[ a[i] - 1 ] + 1;
        len = max( len, dp[ a[i] ] );
    }
    cout << len << '\n';
}
```

---

## [E - Multiple-Free Sequences](https://atcoder.jp/contests/abc446/tasks/abc446_e)

### 1. 题意梗概

给定一组 $M, A, B$，对于所有 $0 \leq x, y \leq M - 1$，统计有多少对 $(x, y)$ 满足条件：

**条件**：序列中不包含 $M$ 的倍数。
**序列**：$s_1 = x, s_2 = y, s_n = A s_{n-1} + B s_{n-2}$ 

> $M \leq 1000, A, B \leq M - 1$

### 2. 逻辑推导


注意到 $s_{n}$ 的值取决于 $s_{n-1}$ 和 $s_{n-2}$ 两个值，涉及到倍数，我们只需要在 模 $M$ 的剩余系里面搜索即可。

> 吐槽，这个转移有点像斐波那契数列，只是常数不同。

而理论上在 模 $M$ 的剩余系里面，总共只有 $M^2$ 个状态，因此在某次转移之后，它必然回到了之前的某一个状态，也就是出现了环。

如果某个环上有一个 $0$，那这整个环中的所有状态都是不可能满足条件的。

因为 $M^2 \leq 10^6$，这就很适合采用 **记忆化搜索** 的打法，

**接着确立边界条件**：`dfs( int x, int y );`

若 $x = 0$ 或者 $y = 0$，都是不可行的；若 $Ax + By \pmod M = 0$，也是不可行的。

接着我们就可以快乐地开始记忆化搜索了，这里特别处理非 $0$ 环，如果搜索过程中找到了之前搜过的状态，并且没出现 $0$，就说明当前环上所有状态都是非 $0$ 的。

### 3. 代码实现

```cpp
// 记忆化搜索
int dfs( int x, int y )
{
    if( x == 0 || y == 0 ) return 0; // 不合法
    if( memo[x][y] != -1 ) return memo[x][y]; // 记忆化
    if( vis[x][y] ) return 1; // 发现环且此前未撞 0，安全

    vis[x][y] = 1; // 标记
    ll nxt = ( a * y + b * x ) % m;
    int res = dfs( y, nxt );
    vis[x][y] = 0; // 回溯

    return memo[x][y] = res; // 记录并返回
}

void solve( )
{
    cin >> m >> a >> b;
    memset( memo, -1, sizeof( memo ) );
    ll cnt = 0;
    for( int x = 0; x <= m - 1; ++ x )
        for( int y = 0; y <= m - 1; ++ y )
            cnt += ( dfs( x, y ) == 1 ); // 统计非 0 状态
    cout << cnt << '\n';
}
```