'use strict';

const escape = value => String(value).replace(/[&<>"']/g, character =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

function renderAtlasDirectory({ domains, articles, pinned = [], recommendationCount }) {
  const byId = new Map(articles.map(article => [article.id, article]));
  const resolve = ids => [...new Set(ids)].map(id => byId.get(id)).filter(Boolean);
  const newest = (left, right) => Date.parse(right.updated) - Date.parse(left.updated)
    || left.id.localeCompare(right.id);
  const link = article => `<a href="${escape(article.url)}">${escape(article.title)}</a>`;
  const list = members => `<ul>${members.map(article => `<li>${link(article)}</li>`).join('')}</ul>`;
  const directory = domains.map(domain => {
    const topics = domain.topics.map(topic => {
      const members = resolve(topic.members);
      if (!topic.manualOrder) members.sort(newest);
      const title = escape(topic.title);
      if (members.length === 0) return `<li>${title}</li>`;
      if (members.length === 1) return `<li>${link({ ...members[0], title: topic.title })}</li>`;
      return `<li><a href="#atlas-topic-${escape(topic.id)}">${title}</a>` +
        `<section id="atlas-topic-${escape(topic.id)}"><h3>${title}</h3>${list(members)}</section></li>`;
    });
    return `<details open><summary>${escape(domain.title)}</summary><ul>${topics.join('')}</ul></details>`;
  });
  const members = resolve(domains.flatMap(domain => domain.topics.flatMap(topic => topic.members)));
  const eligible = new Set(members.map(article => article.id));
  const recommendations = resolve([...pinned.filter(id => eligible.has(id)),
    ...members.sort(newest).map(article => article.id)]).slice(0, recommendationCount);
  const recent = recommendations.length ? `<section><h2>近期推荐</h2>${list(recommendations)}</section>` : '';
  return `<div class="atlas-directory">${directory.join('')}${recent}</div>`;
}

module.exports = { renderAtlasDirectory };
