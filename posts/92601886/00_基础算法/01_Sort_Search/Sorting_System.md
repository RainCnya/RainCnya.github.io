---
title: 基础排序体系 (Basic Sorting System)
tags:
  - 排序
  - 分治
  - 逆序对
categories:
  - 00_Atlas
  - 00_基础算法
abbrlink: 50dbb92c
date: 2025-12-11 23:59:55
---

## 1. 生态位

* **定义**: 将无序序列映射为单调序列的过程。本质是消除序列中的 **逆序对 (Inversion Pair)**。
* **前置依赖**: [递归], [分治思想]
* **解决痛点**: 
    * **冒泡排序**: 教学模型，用于建立“交换一次相邻元素 = 消除一个逆序对”的理论直觉。
    * **快速排序 (Quick Sort)**: 解决大规模数据 ($N \ge 10^5$) 的通用排序，追求平均性能极致。
    * **归并排序 (Merge Sort)**: 解决 **稳定性 (Stability)** 需求及 **逆序对统计** 问题，这是 `std::sort` 无法替代的。
* **竞品对比**:

| 算法 | 平均复杂度 | 空间复杂度 | 稳定性 | 核心特征 (Key Feature) |
| :--- | :--- | :--- | :--- | :--- |
| **Bubble** | $O(N^2)$ | $O(1)$ | ✅ | 交换次数严格等于逆序对数量。 |
| **Quick** | $O(N \log N)$ | $O(\log N)$ | ❌ | **原址排序 (In-place)**，常数极小，最坏 $O(N^2)$。 |
| **Merge** | $O(N \log N)$ | $O(N)$ | ✅ | **分治 (Divide & Conquer)**，适合统计过程量，需要辅助数组。 |

## 2. 逻辑支点

### 2.1 冒泡排序：逆序对的度量

* **核心直觉**: 每一轮“冒泡”必然将当前未排序部分的最值归位。
* **关键性质**: 
    * **交换守恒**: 交换相邻的 $(a[i], a[i+1])$，若 $a[i] > a[i+1]$，则全排列的逆序对总数严格 $-1$。
    * **推论**: 冒泡排序的总交换次数 $=$ 初始序列的逆序对总数。

### 2.2 快排 vs 归并：分治的对偶性

这两种算法是分治思想的两个极端：

* **快速排序 (Quick Sort)** —— **重“分”轻“合”**
    * **逻辑**: 选取基准 (Pivot) $P$，将数组划分为 `< P` 和 `> P` 两部分。
    * **难点**: Partition (划分) 过程复杂，需要双指针技巧。
    * **Easy**: 递归结束后，整个数组天然有序，无需合并操作。
    * **数学表达**: $S_{total} = S_{left} \cup \{Pivot\} \cup S_{right}$

* **归并排序 (Merge Sort)** —— **重“合”轻“分”**
    * **逻辑**: 无脑从中间切开，递归到底。
    * **Easy**: 划分过程是 $O(1)$ 的（直接取中点）。
    * **难点**: Merge (合并) 过程，需要将两个有序子序列“拉链式”咬合，同时在此过程中可以统计逆序对。
    * **数学表达**: $T(n) = 2T(n/2) + O(n)$

## 3. 实战部署 (Battle Deployment)

### 3.1 快速排序 (通用模板)
* **策略**: 选取 `mid` 值作为 Pivot (防止有序数组退化为 $O(N^2)$)，采用双指针交换法。

{% fold info @Code: Quick Sort %}
```cpp
// Quick Sort Template
// 1-based indexing, O(N log N)

const int maxn = 1e5 + 50;
int a[maxn];

void quick_sort( int l, int r )
{
    // 递归边界
    if( l >= r ) return;

    // 1. Partition: 取中点为基准，防止退化
    int mid = a[(l + r) >> 1]; 
    int i = l, j = r;

    while( i <= j )
    {
        // 寻找不符合条件的元素
        while( a[i] < mid ) i++;
        while( a[j] > mid ) j--;
        
        if( i <= j )
        {
            swap( a[i], a[j] );
            i++; 
            j--;
        }
    }

    // 2. Recursion: 递归处理子区间
    // 此时 j < i, 分界线在 j 和 i 之间
    if( l < j ) quick_sort( l, j );
    if( i < r ) quick_sort( i, r );
}
````

{% endfold %}

### 3.2 归并排序 (逆序对统计版)

- **策略**: 使用全局 `tmp` 数组避免频繁 `new`。在右边元素比左边元素小的时候，说明左边剩余的所有元素都能与该右边元素构成逆序对。
    

{% fold info @Code: Merge Sort & Inversion Count %}

```cpp
// Merge Sort Template (with Inversion Counting)
// 1-based indexing

using ll = long long;
const int maxn = 5e5 + 50;

int a[maxn], tmp[maxn]; // 辅助数组必须全局定义
ll total_inversions = 0;

void merge_sort( int l, int r )
{
    if( l >= r ) return;

    int mid = (l + r) >> 1;
    
    // 1. Divide
    merge_sort( l, mid );
    merge_sort( mid + 1, r );

    // 2. Conquer (Merge)
    int i = l, j = mid + 1, k = 0;
    while( i <= mid && j <= r )
    {
        if( a[i] <= a[j] )
        {
            tmp[k++] = a[i++];
        }
        else
        {
            tmp[k++] = a[j++];
            // 核心: 统计逆序对
            // 左边 a[i...mid] 都比 a[j] 大
            total_inversions += (ll)(mid - i + 1);
        }
    }

    while( i <= mid ) tmp[k++] = a[i++];
    while( j <= r )   tmp[k++] = a[j++];

    // 3. Copy Back
    for( int i = l, k = 0; i <= r; ++i, ++k )
    {
        a[i] = tmp[k];
    }
}
```

{% endfold %}

### ⚠️ 边界与 Hack

- **[Quick Sort 坑点]**:
    
    - **基准选择**: 严禁直接选 `a[l]` 作为基准，遇到有序数据会退化成 $O(N^2)$ 导致 TLE。
        
    - **死循环**: `while(a[i] < mid)` 不能写成 `<=`, 否则遇到全相等数组会指针越界或死循环。
        
- **[Merge Sort 坑点]**:
    
    - **内存爆炸**: `tmp` 数组如果写在函数内部 `vector<int> tmp`，会因为频繁分配内存导致 MLE 或 TLE。必须全局静态分配。
        
    - **long long**: $N=5 \times 10^5$ 时，逆序对数量级为 $\approx 1.25 \times 10^{11}$，使用 `int` 必溢出。
        

## 4. 知识粘附 (Knowledge Adhesion)

> _体系关联_

- **变体模型**:
    
    - **第 K 大数 (Quick Select)**: 快排思想的变体，只递归一半，复杂度 $O(N)$。
        
    - **CDQ 分治**: 归并排序思想的二维扩展，用于解决多维偏序问题。
        
- **母题索引**:
    
    - **[Luogu P1177]**: 快速排序模板（需抗 $O(N^2)$ 卡常）。
        
    - **[Luogu P1908]**: 逆序对计数（归并排序经典应用）。