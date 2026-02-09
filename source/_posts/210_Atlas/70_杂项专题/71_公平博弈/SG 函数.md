---
title: '[Note] SG 函数'
tags:
  - 数学/博弈/SG函数
  - 难度/P3
categories:
  - 210_Atlas
  - 70_杂项专题
  - 71_公平博弈
abbrlink: fcbc3385
date: 2026-01-04 00:00:00
---
# SG 函数

## 1. 生态位

- **识别**: 两人博弈、规则对称（你干嘛我也能干嘛）、有限步终止、无随机因素。
    
- **地位**: 公平组合博弈（ICG）的判断标准。
    
- **用途**: 将任意 DAG 上的路径搜索问题，转化为数值间的异或计算

## 2. 逻辑支点

- **核心原理**: 游戏的本质是状态的流转。我们定义两种状态：
    
    1. **P-position (必败态)**：前一个玩家（刚走完的那个）赢。意味着当前玩家走投无路。
        
    2. **N-position (必胜态)**：下一个玩家（正要走的那个）赢。
        
    _判定准则_：
    
    - 终点节点（走不动的）是 P。
        
    - 只要能走到一个 P，当前就是 N。
        
    - 无论怎么走都只能到 N，当前就是 P。
        
- **具体原理**: **SG 函数** 是 P/N 逻辑的数值量化：
    
    $$G(s) = \text{mex}(\{G(s') \mid s \to s'\})$$
    - **MEX (Minimum Excluded value)**：集合中未出现的最小非负整数。
        
    - **物理意义**：SG 值代表了当前局面等价于“一堆多少个石子的 Nim 堆”。
        
    - **组合游戏**：若 $G = G_1 + G_2 + \dots$，则 $SG(G) = SG(G_1) \oplus SG(G_2) \oplus \dots$。

## ## 3. 实战部署

{% fold info @代码实现: 标准 SG 函数计算 %}

```cpp
const int maxn = 1e5 + 50;
int sg[maxn];

// 计算状态 x 的 SG 值
int get_sg( int x )
{
    if( sg[x] != -1 )
    {
        return sg[x];
    }
    
    set< int > S;
    // 获取所有合法的后继状态
    vector< int > moves = generate_moves( x );
    
    for( int next_v : moves )
    {
        S.insert( get_sg( next_v ) );
    }
    
    // MEX 运算
    int res = 0;
    while( S.count( res ) )
    {
        ++ res;
    }
    
    return sg[x] = res;
}
```

{% endfold %}

## ## 4. 知识关联

- **母题**: [[P2197 模板 Nim 游戏]] —— 所有 SG 理论最终收敛的物理母模型。
    
- **实战演练**:
    
    - [[P1290 欧几里德的游戏]] —— 理解博弈中的“控制权”与决策点。
        
    - [[P1288 取石子游戏 II]] —— 判定 P/N 态在路径距离上的最本原演推。
        
    - [[P2148 SDOI2009 E&D]] —— 面对复杂 SG 转移时的打表找规律补丁。
        
    - [[P2575 高手过招]] —— 状态压缩后的通用 SG 搜索实现。
        
- **关联笔记**: [[Nim 游戏及其变体]]