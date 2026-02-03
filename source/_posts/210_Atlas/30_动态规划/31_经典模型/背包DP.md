---
title: '[Note] 背包DP'
tags:
  - DP/背包
  - 难度/P3
categories:
  - 210_Atlas
  - 30_动态规划
  - 31_经典模型
abbrlink: 3349ba31
date: 2026-01-31 00:00:00
---
# [L4] 背包DP

## 1. 生态位

- **识别**: 
		
	1. **决策**: 面对一组**离散物品**，需对每个物品做出**选/不选**或**选多少**的决策。
	    
	2. **限制**: 决策受限于一个或多个**物理维度**（容量、负重、体积），无法无限叠加。
	    
	3. **目标**: 目标通常是**总价值最大化**或**特定状态的可达性**。
    
- **地位**: 动态规划的基础模型，是后续学习数位 DP、状压 DP 的前置。
    
- **用途**: 最优化决策，资源分配，可行性判断。

## 2. 逻辑支点

### 2.1 核心原理

背包问题的本质是在**有限的容量轴**上进行决策填充。

最经典的滚动数组背包循环方向中，其实就暗含着对物品的复用性定义。

二者都是通过 $f[j - w]$ 来更新 $f[j]$，但得到的结果完全不同。

- **倒序循环**：$V \to w$，这种情况下 $f[j - w]$ 是上一个物品的状态，每个物品只会对当前层产生一次影响 $\to$ 0/1 背包。

- **正序循环**：$w \to V$，这种情况下 $f[j-w]$ 是这一轮中刚刚被更新的状态，每个物品会多次更新累积 $\to$ 完全背包。

### 2.2 变种模型

1. **多重背包**，第 $i$ 个物品有 $C_i$ 个。

	- **朴素解法**，暴力计算 $C_i$ 个独立的 0/1 背包，复杂度爆炸 $O(V \cdot \sum C_i)$。
	- **优化1**：二进制拆分，把 $C_i$ 个物品拆解为 $\log C_i$ 个合成物品，降维。
	- **优化2**：单调队列同余系优化，用的不多，证明略，复杂度是线性的。

2. **分组背包**，每组物品最多选一个。

	- **逻辑**：$k \to j \to i$，从组到容量（倒序），再到组内物品。
	- **关键**：循环顺序不能乱，不然就会违背无后效性。

3. **依赖背包**，物品之间有依赖关系。

	- 简单的依赖关系可以通过转化为分组背包。
	- 但复杂的依赖关系就需要采用树形背包求解了。

### 2.3 广义背包

当我们把视野从 背包 和 物品 本身移开，我们会发现背包模型的本质是：代价和收益的博弈。（$Cost, Value$）

只要满足以下特征的问题，都可以是广义背包：

1. **资源限制**：存在一个消耗品（时间，步数，兵力，钱……）。
2. **阶段独立**：过程可以划分为若干个独立 的阶段（城堡，关卡，物品组……）。
3. **决策离散**：每个阶段中有若干互斥的操作。

从这个角度再回顾背包问题，你就会发现广义背包不止局限于背包。

## 3. 实战部署

{% fold info @代码实现: 标准模板 %}
```cpp
const int MAXV = 1e5 + 5;
int f[MAXV];

// 1. 0/1 背包
// 场景: 每个物品仅 1 个
// 顺序: 物品 -> 容量(倒序)
void solve_zero_one( int n, int V, int w[], int v[] )
{
    for( int i = 1; i <= n; ++ i )
    {
        for( int j = V; j >= w[i]; -- j )
        {
            f[j] = max( f[j], f[j - w[i]] + v[i] );
        }
    }
}

// 2. 完全背包
// 场景: 物品无限个
// 顺序: 物品 -> 容量(正序)
void solve_complete( int n, int V, int w[], int v[] )
{
    for( int i = 1; i <= n; ++ i )
    {
        for( int j = w[i]; j <= V; ++ j )
        {
            f[j] = max( f[j], f[j - w[i]] + v[i] );
        }
    }
}


// 3. 多重背包 - 二进制拆分 (Binary Splitting)
// 场景: 物品有限个 (count[i])
// 逻辑: 拆分为 0/1 物品后直接调用 solve_zero_one
struct Item { int w, v; };
vector< Item > items;

void add_item( int w, int v, int count )
{
    for( int k = 1; k <= count; k <<= 1 )
    {
        items.push_back( { k * w, k * v } );
        count -= k;
    }
    if( count > 0 ) items.push_back( { count * w, count * v } );
}

// 3.1 多重背包 - 单调队列优化
// 场景: 物品数量 N 巨大，容量 V 巨大，追求 O(NV) 极限复杂度
// 逻辑: 按 j % w 分组，每组内部是一个滑动窗口最大值问题
struct DQItem { int idx, val; }; // 队列存储: 原始下标, 修正后的价值
void solve_multi_deque( int n, int V, int w[], int v[], int c[] )
{
    // g[j] 保存上一轮(i-1)的状态，f[j] 更新当前轮(i)
    static int g[MAXV]; 
    static DQItem q[MAXV]; // 手写单调队列

    for( int i = 1; i <= n; ++ i )
    {
        memcpy( g, f, sizeof( f ) ); // 复制上一轮状态
        int weight = w[i], value = v[i], limit = c[i];

        // 枚举余数 r (0 ... weight-1)
        for( int r = 0; r < weight; ++ r )
        {
            int head = 1, tail = 0;
            // 在余数链上遍历: k = 0, 1, 2... 表示真实容量 r, r+w, r+2w...
            // 极限位置: (V - r) / weight
            for( int k = 0; r + k * weight <= V; ++ k )
            {
                // 1. 窗口过期: 只能从 [k - limit, k - 1] 转移
                if( head <= tail && q[head].idx < k - limit ) head ++;
                
                // 2. 准备入队的新决策: 来自 g 数组 (上一层)
                // 变形核心: max( g[t] - t/w * v ) + j/w * v
                // 这里 k 就是 j/w (在当前链中的相对下标)
                // 存入队列的值是: g[... + k*w] - k * v
                int calc_val = g[r + k * weight] - k * value;
                
                // 维护单调递减队列
                while( head <= tail && q[tail].val <= calc_val ) tail --;
                q[++tail] = { k, calc_val };
                
                // 3. 更新 f (当前层)
                // f[j] = 队首最优值 + k * v
                f[r + k * weight] = q[head].val + k * value;
            }
        }
    }
}

// 4. 分组背包
// 场景: 物品被分组，每组最多选 1 个
// 顺序: 组 -> 容量(倒序) -> 组内决策
// 警示: 组内决策循环必须在容量循环 *内部*，否则就变成了“每组每个物品都能选一次”
void solve_group( int group_cnt, int V, vector<int> group_items[] )
{
    for( int k = 1; k <= group_cnt; ++ k )
    {
        // 必须倒序，确保 f[j-w] 取自上一组的状态
        for( int j = V; j >= 0; -- j )
        {
            for( auto &idx : group_items[k] ) 
            {
                // w[idx], v[idx] 为对应物品属性
                if( j >= w[idx] ) f[j] = max( f[j], f[j - w[idx]] + v[idx] );
            }
        }
    }
}

```
{% endfold %}

## 4. 知识关联

- **实战案例**：

	- **状态可达性判定**: [[P5020 货币系统]]
    
	- **混合背包**: [[P1941 飞扬的小鸟]] 完全背包 + 0/1 背包。
    
	- **互斥分组背包**: [[P5322 排兵布阵]] 广义背包的典例。
    
	- **前后缀分析**: [[ABC441F Must Buy]] 前后缀背包，快速计算强制选/不选某个物品

	- **依赖背包**: [[P1064 金明的预算]]
    
	- **BFS 预处理代价**: [[ZJ2021J Grammy and Jewelry]] 图论中的广义背包。
    