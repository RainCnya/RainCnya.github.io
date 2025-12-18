---
title: 离散化 (Discretization)
tags:
  - 离散化
categories:
  - 00_Atlas
  - 00_基础算法
abbrlink: ef28f194
date: 2025-12-12 00:00:00
category:
---

## 1. 生态位

* **定义**: 在不改变数据**相对大小 (Relative Order)** 的前提下，将分布稀疏的大值域数据映射为紧凑的小下标数据。
* **解决痛点**: 
    * 题目给出的数值范围很大 (如 $10^9$)，但数据量 $N$ 较小 (如 $10^5$)。
    * 算法（如树状数组、线段树、差分）的空间复杂度依赖于**值域**而非数据量。
* **本质**: **Value $\to$ Rank** 的映射。

## 2. 逻辑支点 

* **核心不变量**: **Rank (排名)**。
    * 离散化后的数组 `b[i]` 表示原数组 `a[i]` 在所有出现过的数中排第几小。
* **映射过程**:
    1.  **Sort**: 将所有出现的数排序。
    2.  **Unique**: 去除重复的数，得到“有序去重值域”。
    3.  **Binary Search**: 对于原数组的每个数，二分查找它在去重值域中的位置（下标）。

## 3. 实战部署 

### 3.1 STL 离散化模板

* 利用 `std::unique` 和 `std::lower_bound` 组合拳。

{% fold info @Code: Discretization Template %}
```cpp
const int maxn = 1e5 + 50;
int a[maxn], b[maxn]; // a: 原数组, b: 临时数组用于排序去重
int n;

void discretize() 
{
    // 1. Copy: 复制一份数据到 b
    for( int i = 1; i <= n; ++ i ) b[i] = a[i];
    
    // 2. Sort: 排序
    sort( b + 1, b + n + 1 );
    
    // 3. Unique: 去重
    // unique 返回去重后末尾元素的下一个迭代器
    int len = unique( b + 1, b + n + 1 ) - ( b + 1 );
    
    // 4. Map: 构造映射 (Value -> Rank)
    for( int i = 1; i <= n; ++ i ) 
    {
        // lower_bound 查找 a[i] 在 b 中的位置 (1-based)
        // 此时 a[i] 的值变为 range [1, len]
        a[i] = lower_bound( b + 1, b + len + 1, a[i] ) - ( b + 1 ) + 1;
    }
}
```

{% endfold %}

### ⚠️ 边界与 Hack

- **[坑点 1] 下标体系**: `lower_bound` 返回的是指针/迭代器。
    
    - 若是 `vector`，`it - v.begin()` 是 0-based index。
        
    - 若是数组 `b + 1` 开始，`ptr - (b + 1) + 1` 才是 1-based rank。建议统一使用 1-based 以适配 BIT/线段树。
        
- **[坑点 2] 原值查询**: 离散化后 `a[i]` 变成了 Rank。如果后续需要输出原始数值，需保留 `b` 数组，`b[ a[i] ]` 即为原值。
    

## 4. 知识粘附 

- **典型应用**:
    
    - **逆序对 (Inversion Pair)**: 树状数组求逆序对时，若数值过大，必须先离散化。
        
    - **二维平面扫描线**: 坐标值很大时，需对 X 或 Y 坐标离散化。
        
    - **主席树 (可持久化线段树)**: 处理值域线段树时，必须离散化。
        
- **母题索引**:
    
    - **[Luogu P1908] 逆序对**: 离散化 + 权值树状数组的标准入门题。