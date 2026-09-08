---
title: P16357 Blocks
tags:
  - 数学/构造
  - 数学/对称
status: solved
categories:
  - 260_Records
  - Misc
abbrlink: 96f96474
date: 2026-09-07 00:00:00
updated: 2026-09-08 00:00:00
---

# 用中心对称实现每种颜色的平均位置

> [!question] [P16357 [BalticOI 2026] Blocks](https://www.luogu.com.cn/problem/P16357)
> 有 $n$ 个木块、$k$ 种颜色，可以任意重排。要求每种颜色所有出现位置的平均值都等于 $(n+1)/2$，构造任意可行排列或判断无解。
>
> 数据规模：$1\le k\le n\le2\times10^5$，所有测试中 $\sum n\le2\times10^5$。

最开始的思路是把所有颜色的平均位置条件一起求和，希望推出一个全局限制，但最后两边只会变成同一个恒等式……

所以只能把每个颜色都分开看。若某种颜色一共出现 $s$ 次，占据位置 $p_1,\dots,p_s$，那么限制条件为 $\displaystyle \sum_{i=1}^{s} p_i = \frac{n+1}{2}\cdot s \iff \displaystyle \sum_{i=1}^{s} 2p_i = (n+1)s$。

当 $n$ 为偶数时，左边一定是偶数，而 $n+1$ 为奇数，因此 $s$ 只能是偶数。这种情况下直接把同色块放在关于中心对称的位置即可。

接着考虑当 $n$ 为奇数的情况，此时存在唯一的中心格子，满足 $p[mid] = (n + 1) / 2$，若有两个颜色都只出现了一次，那就无解了。

反之有解的情况，都可以用中心点消掉一个奇数计数，剩下的偶数可以对称，问题就在于如何处理剩余的奇数了。

处理中心后，剩余奇数计数颜色数一定是偶数，设为 $2r$。接着给每一个位置设置相对中心的偏移量，目标就是把一段正负偏移拆成若干个和为 $0$ 的三元组。

例如 $r=2$ 时，可以把 $\pm1,\dots,\pm6$ 分成四个零和三元组：$(-6,1,5)$，$(-5,2,3)$，$(6,-2,-4)$，$(4,-1,-3)$。

可以这么理解，由于每个三元组一定是 一正两负 或者 一负两正，所以可以让单独的那一个数字拿大一点，来抵消另外两个。

对第 $i$ 对颜色，使用下面两组三元偏移：`{3r+1-i, -3r+2i-1, -i}`，`{-3r+2i-2, 2r+1-i, r+1-i}` 即可构造。它们不仅各自和为 $0$，而且所有正偏移恰好覆盖 $1,\dots,3r$，所有负偏移恰好覆盖 $-1,\dots,-3r$，所以不会重复占位。

```cpp title:"P16357" fold
void solve( ) {
    int n, k;
    cin >> n >> k;

    vector<int> cnt( k + 1 );
    vector<int> ans( n + 1 );

    for( int i = 1; i <= n; ++ i ) {
        int x;
        cin >> x;
        ++ cnt[x];
    }

    if( n % 2 == 0 ) {
        for( int c = 1; c <= k; ++ c ) {
            if( cnt[c] % 2 ) {
                cout << "NO\n";
                return;
            }
        }

        int l = 1, r = n;
        for( int c = 1; c <= k; ++ c ) {
            while( cnt[c] ) {
                ans[l ++] = c;
                ans[r --] = c;
                cnt[c] -= 2;
            }
        }
    } else {
        vector<int> one;
        for( int c = 1; c <= k; ++ c ) {
            if( cnt[c] == 1 ) one.push_back( c );
        }

        if( one.size( ) > 1 ) {
            cout << "NO\n";
            return;
        }

        int mid = ( n + 1 ) / 2;

        if( !one.empty( ) ) {
            ans[mid] = one[0];
            -- cnt[one[0]];
        } else {
            for( int c = 1; c <= k; ++ c ) {
                if( cnt[c] % 2 ) {
                    ans[mid] = c;
                    -- cnt[c];
                    break;
                }
            }
        }

        vector<int> odd;
        for( int c = 1; c <= k; ++ c ) {
            if( cnt[c] % 2 ) {
                odd.push_back( c );
                cnt[c] -= 3;
            }
        }

        int r = odd.size( ) / 2;
        int ptr = 0;

        for( int i = 1; i <= r; ++ i ) {
            int x1 = 3 * r + 1 - i;
            int x2 = -3 * r + 2 * i - 1;
            int x3 = -i;

            int y1 = -3 * r + 2 * i - 2;
            int y2 = 2 * r + 1 - i;
            int y3 = r + 1 - i;

            int c1 = odd[ptr ++], c2 = odd[ptr ++];

            ans[mid + x1] = c1;
            ans[mid + x2] = c1;
            ans[mid + x3] = c1;

            ans[mid + y1] = c2;
            ans[mid + y2] = c2;
            ans[mid + y3] = c2;
        }

        int cur = 1;
        for( int d = 3 * r + 1; d <= ( n - 1 ) / 2; ++ d ) {
            while( cur <= k && cnt[cur] == 0 ) ++ cur;
            ans[mid - d] = ans[mid + d] = cur;
            cnt[cur] -= 2;
        }
    }

    cout << "YES\n";
    for( int i = 1; i <= n; ++ i ) {
        cout << ans[i] << " \n"[i == n];
    }
}
```
