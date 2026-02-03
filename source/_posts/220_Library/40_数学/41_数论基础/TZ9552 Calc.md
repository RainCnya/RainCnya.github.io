---
title: '[Leaf] [TZ9554] Calc'
tags:
  - 算法/位运算
  - 难度/P3
categories:
  - 220_Library
  - 40_数学
  - 41_数论基础
abbrlink: e1f12260
date: 2026-01-07 00:00:00
---
# [TZ9554 - Calc](https://www.tzcoder.cn/acmhome/problemdetail.do?method=showdetail&id=9552)

## 1. 核心逻辑

- **模型抽象**: 在 DAG 上计算复合表达式。支持加法、乘法以及特异算子 $u \cdot 2^{val(v)}$。
    
    - **中译中**: 这是一个计算器，但其中一个按键（指数运算）要求你必须遵守两套不同的取模法则。
        
- **逻辑支点 (双轨取模机制)**:
    
    1. **底数**: 所有的常规加法、乘法和最终输出，都在 $\pmod{10^9+7}$ 下运行。
        
    2. **指数**: 欧拉定理指出，$a^b \equiv a^{b \pmod{\phi(P)}} \pmod P$。对于质数 $10^9+7$，其 $\phi$ 值为 $10^9+6$。
        
    3. **物理隔离**: 为了处理 `< u v` ($val(u) \cdot 2^{val(v)}$)，每个节点必须同时记录它在两个轨道下的值，确保作为底数和作为指数时都能提供正确的余数。

## 2. 逻辑演算

设 $P = 10^9+7, \Phi = 10^9+6$：

- 对于操作 `+ u v`:
    
    - $V_P(i) = (V_P(u) + V_P(v)) \pmod P$
        
    - $V_\Phi(i) = (V_\Phi(u) + V_\Phi(v)) \pmod \Phi$
        
- 对于操作 `< u v`:
    
    - $V_P(i) = (V_P(u) \cdot 2^{V_\Phi(v)}) \pmod P$
        
    - $V_\Phi(i) = (V_\Phi(u) \cdot 2^{V_\Phi(v)}) \pmod \Phi$

#### 推导部分：费马小定理

对于质数 $P$（比如 $10^9+7$），费马小定理告诉我们：

$$a^{P-1} \equiv 1 \pmod P \quad (\text{前提是 } \gcd(a, P) = 1)$$

这意味着：

$$a^b = a^{k(P-1) + r} = (a^{P-1})^k \cdot a^r \equiv 1^k \cdot a^r \equiv a^{b \pmod{P-1}} \pmod P$$

## 3. 代码实现

{% fold info @AcCode %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const ll mod0 = 1e9 + 7;
const ll mod1 = 1e9 + 6;
const int maxn = 3e5 + 50;

ll val0[maxn];
ll val1[maxn];
int n;

ll qpow( ll base, ll k, ll mod )
{
    ll res = 1;
    while( k )
    {
        if( k & 1 ) res = ( res * base ) % mod;
        base = ( base * base ) % mod;
        k >>= 1;
    }
    return res;
}

int main( )
{
    ios::sync_with_stdio( 0 );
    cin.tie( 0 );

    cin >> n;
    for( int i = 1; i <= n; ++ i )
    {
        char opt;
        int x, u, v;
        cin >> opt;

        if( opt == 'N' )
        {
            cin >> x;
            val0[i] = x % mod0;
            val1[i] = x % mod1;
        }
        else if( opt == '+' )
        {
            cin >> u >> v;
            val0[i] = ( val0[u] + val0[v] ) % mod0;
            val1[i] = ( val1[u] + val1[v] ) % mod1;
        }
        else if( opt == '*' )
        {
            cin >> u >> v;
            val0[i] = ( val0[u] * val0[v] ) % mod0;
            val1[i] = ( val1[u] * val1[v] ) % mod1;
        }
        else
        {
            cin >> u >> v;
            val0[i] = ( val0[u] * qpow( 2, val1[v], mod0 ) ) % mod0;
            val1[i] = ( val1[u] * qpow( 2, val1[v], mod1 ) ) % mod1;
        }
    }
    
    for( int i = 1; i <= n; ++ i )
    {
        cout << val0[i] << '\n';
    }

    return 0;
}
```

{% endfold %}

## 4. 复盘

- **复杂度**: $O(N \log P)$，每个节点进行一次快速幂。
    
- **认知补丁**:
    
    - 凡是涉及到指数位置有运算或变量的题目，第一反应必须是**指数取模的独立性**。
        
    - 欧拉定理是这类题目的物理底座。
        
- **关联母题**: [[Note] 数论基础与指数取模]