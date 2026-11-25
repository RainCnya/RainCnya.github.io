'use strict';

const escape = value => String(value).replace(/[&<>"']/g, character =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

function renderAtlasDirectory({ domains, articles, pinned = [], recommendationCount }) {
  const byId = new Map(articles.map(article => [article.id, article]));
  const resolve = ids => [...new Set(ids)].map(id => byId.get(id)).filter(Boolean);
  const newest = (left, right) => Date.parse(right.updated) - Date.parse(left.updated)
    || left.id.localeCompare(right.id);
  const link = (article, topic = false) =>
    `<a${topic ? ' class="atlas-topic-title"' : ''} href="${escape(article.url)}">${escape(article.title)}</a>`;
  const list = members => `<ul>${members.map(article => `<li>${link(article)}</li>`).join('')}</ul>`;
  const directory = domains.map(domain => {
    const topics = domain.topics.map(topic => {
      const members = resolve(topic.members);
      if (!topic.manualOrder) members.sort(newest);
      const title = escape(topic.title);
      if (members.length === 0) return `<li><span class="atlas-topic-title">${title}</span></li>`;
      if (members.length === 1) return `<li>${link({ ...members[0], title: topic.title }, true)}</li>`;
      return `<li><section id="atlas-topic-${escape(topic.id)}">` +
        `<h3 class="atlas-topic-title">${title}</h3>${list(members)}</section></li>`;
    });
    const anchor = domain.id ? ` id="${escape(domain.id)}"` : '';
    return `<details${anchor} open><summary>${escape(domain.title)}</summary><ul class="atlas-domain-topics">${topics.join('')}</ul></details>`;
  });
  const members = resolve(domains.flatMap(domain => domain.topics.flatMap(topic => topic.members)));
  const eligible = new Set(members.map(article => article.id));
  const recommendations = resolve([...pinned.filter(id => eligible.has(id)),
    ...members.sort(newest).map(article => article.id)]).slice(0, recommendationCount);
  const recent = recommendations.length ? `<section class="atlas-recent"><h2>近期推荐</h2>${list(recommendations)}</section>` : '';
  const topicCount = domains.reduce((count, domain) => count + domain.topics.length, 0);
  const heading = `<header class="atlas-masthead">
    <p class="atlas-stats">${domains.length} 知识域 · ${topicCount} 主题 · ${members.length} 篇</p>
    <h1 id="atlas">Atlas</h1>
    <p>按主题浏览算法与训练中积累的知识笔记。</p>
  </header>`;
  return `<div class="atlas-directory">${heading}${directory.join('')}${recent}</div>`;
}

module.exports = { renderAtlasDirectory };
