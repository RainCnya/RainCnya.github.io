'use strict';

const { escapeHTML, url_for } = require('hexo-util');

const sections = [
  { directory: '210_Atlas', name: 'Atlas', path: 'algorithm/atlas/', description: '可复用的正式知识体系与定理模板。' },
  { directory: '260_Records', name: 'Records', path: 'categories/新记录/', description: '单题学习记录，动态积累并逐步抽象。' },
  { directory: '270_Solutions', name: 'Solutions', path: 'categories/新题解/', description: '按年份与比赛组织的赛后题解归档。' },
  { directory: '280_Study', name: 'Study', path: 'categories/学习论/', description: '学习方法、题单与阶段性训练资料。' }
];
const sourceDirectory = /^_posts\/([^/]+)\/.+\.(?:md|markdown)$/i;

function timestamp(value) {
  return value == null || value === '' ? NaN : new Date(value.valueOf()).getTime();
}

hexo.extend.filter.register('template_locals', function(locals) {
  const { page, site } = locals;
  if (page?.source !== 'algorithm/index.md') return locals;

  const atlas = hexo.extend.helper.get('atlas_hub_data')();
  const url = path => escapeHTML(url_for.call(locals, path));
  const date = hexo.extend.helper.get('date').bind(locals);
  const groups = new Map(sections.map(section => [section.directory, { section, posts: [] }]));
  for (const post of site.posts.toArray()) {
    const source = post.source.replace(/\\/g, '/');
    const group = groups.get(source.match(sourceDirectory)?.[1]);
    if (!group || !post.path || post.hide || post.published === false) continue;
    if (post.tags?.toArray().some(tag => tag.name === 'Meta/Guide')) continue;
    group.posts.push(post);
  }

  const atlasPath = sections[0].path;
  const domains = atlas.domains.map(({ title, id }) =>
    `<a href="${url(atlasPath + '#' + id)}">${escapeHTML(title)}</a>`).join('');
  const focus = `<div>
    <p class="algorithm-atlas-meta">正式知识体系 · ${atlas.domains.length} 知识域 · ${atlas.topicCount} 主题 · ${atlas.articleCount} 篇</p>
    <h2 id="algorithm-atlas-title">Atlas 知识目录</h2>
    <nav class="algorithm-domains" aria-label="Atlas 知识域">${domains}</nav>
  </div>
  <a class="algorithm-atlas-enter" href="${url(atlasPath)}">进入 Atlas <span aria-hidden="true">↗</span></a>`;
  const matrix = `<ul class="algorithm-matrix">${[...groups.values()].map(({ section, posts }, index) =>
    `<li><a href="${url(section.path)}">
      <h3><span class="algorithm-number" aria-hidden="true">0${index + 1} · </span>${section.name}</h3>
      <span class="algorithm-count">${index === 0 ? atlas.articleCount : posts.length} 篇</span>
      <p>${section.description}</p>
      <span class="algorithm-arrow" aria-hidden="true">↗</span>
    </a></li>`).join('\n')}</ul>`;

  const recent = [...groups.values()].flatMap(({ section, posts }) => posts.map(post => {
    const published = timestamp(post.date);
    return { post, name: section.name, when: Number.isFinite(published) ? published : timestamp(post.updated) };
  })).filter(entry => Number.isFinite(entry.when))
    .map(entry => ({ ...entry, day: date(new Date(entry.when), 'YYYY-MM-DD') }))
    .sort((a, b) => b.day.localeCompare(a.day) || a.post.path.localeCompare(b.post.path, 'en'))
    .slice(0, 5);
  const withYear = new Set(recent.map(entry => entry.day.slice(0, 4))).size > 1;
  const list = recent.length ? `<ul class="algorithm-recent-list">${recent.map(({ post, name, day }) =>
    `<li><a href="${url(post.path)}">
      <time datetime="${day}">${(withYear ? day : day.slice(5)).replaceAll('-', '.')}</time>
      <span class="algorithm-recent-title">${escapeHTML(post.title)}</span>
      <span class="algorithm-recent-source">${name}</span>
    </a></li>`).join('\n')}</ul>` : '<p>暂无近期文章。</p>';

  locals.page = { ...page, content: page.content
    .replace('<!-- algorithm-atlas -->', () => focus)
    .replace('<!-- algorithm-subsystems -->', () => matrix)
    .replace('<!-- algorithm-recent -->', () => list) };
  return locals;
});
