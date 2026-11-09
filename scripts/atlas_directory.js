'use strict';

const { renderAtlasDirectory } = require('../lib/atlas-directory.cjs');

// S10-ATLAS-V1. Topic membership and reading order are explicitly curated.
const domains = [
  { title: '区间维护', topics: [
    { id: 'fenwick', title: '树状数组', members: ['43666fa1'] },
    { id: 'segment-tree', title: '线段树', manualOrder: true, members: ['dba9a34f', 'c0ad84cf', 'ec824ae8'] },
  ] },
  { title: '图结构', topics: [
    { id: 'spanning-tree', title: '生成树', manualOrder: true, members: ['msttheory26', 'mstcases26'] },
    { id: 'scc', title: '有向图缩点', members: ['dbe3a645'] },
  ] },
  { title: '动态规划建模', topics: [
    { id: 'lis', title: '最长上升子序列', manualOrder: true, members: ['b55c738e', 'ff454fea'] },
    { id: 'monotone-queue', title: '单调队列优化', members: ['monoqueue26'] },
  ] },
];

const articles = [
  { id: '43666fa1', title: '[Note] 树状数组', updated: '', date: '2026-01-19 00:00:00' },
  { id: 'dba9a34f', title: '线段树基础理论', updated: '2026-08-15 00:00:00', date: '2026-08-15 00:00:00' },
  { id: 'c0ad84cf', title: '浅谈线段树懒标记', updated: '2026-08-15 00:00:00', date: '2026-08-15 00:00:00' },
  { id: 'ec824ae8', title: '浅谈线段树信息合并', updated: '2026-08-15 00:00:00', date: '2026-08-15 00:00:00' },
  { id: 'msttheory26', title: '生成树理论', updated: '2026-08-30 00:00:00', date: '2026-08-30 00:00:00' },
  { id: 'mstcases26', title: '生成树题型整理', updated: '2026-08-30 00:00:00', date: '2026-08-30 00:00:00' },
  { id: 'dbe3a645', title: '[Note] SCC 缩点', updated: '2026-08-29 00:00:00', date: '2025-12-15 11:30:00' },
  { id: 'b55c738e', title: 'LIS模型', updated: '2026-07-11 00:00:00', date: '2026-07-11 00:00:00' },
  { id: 'ff454fea', title: 'LIS题型整理', updated: '2026-07-12 00:00:00', date: '2026-07-11 00:00:00' },
  { id: 'monoqueue26', title: '单调队列优化DP模型', updated: '2026-08-29', date: '2026-08-29' },
].map(article => {
  const parse = value => Date.parse(value.replace(' ', 'T').replace(/T(.+)$/, 'T$1+08:00'));
  const updated = [article.updated, article.date].map(parse).find(Number.isFinite);
  return {
    ...article,
    url: `/posts/${article.id}/`,
    updated: new Date(updated ?? -8640000000000000).toISOString(),
  };
});

hexo.extend.tag.register('atlas_directory', () =>
  renderAtlasDirectory({ domains, articles, pinned: ['dba9a34f'], recommendationCount: 3 }));
