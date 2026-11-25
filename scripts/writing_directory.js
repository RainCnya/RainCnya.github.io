'use strict';

const { load } = require('cheerio');
const { escapeHTML, url_for } = require('hexo-util');

const yearArticle = /^_posts\/290_Writings\/\d{4}\/[^/]+\.(?:md|markdown)$/i;
const slot = '<!-- writing-archive -->';

function paragraph(html) {
  const $ = load(html || '', {}, false);
  const paragraphs = $('p').toArray()
    .map(node => $(node).text().replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  return paragraphs.find(text => text.length >= 18) || paragraphs[0] || '';
}

function renderEntry(post, date, url) {
  const description = String(post.description ?? '').trim();
  const excerpt = description || paragraph(post.excerpt) || paragraph(post.content);
  const chars = Array.from(excerpt);
  const summary = chars.length > 88 ? chars.slice(0, 88).join('').trimEnd() + '…' : excerpt;
  return `<li class="writing-entry">
  <time datetime="${date}">${date.slice(5).replace('-', '.')}</time>
  <div>
    <h4><a href="${escapeHTML(url)}">${escapeHTML(post.title)}</a></h4>
    ${summary ? `<p>${escapeHTML(summary)}</p>` : ''}
  </div>
</li>`;
}

// Route locals are built after Hexo has loaded and filtered the public posts.
// Fluid's normal posts include articles excluded only from the homepage archive.
hexo.extend.filter.register('template_locals', function(locals) {
  const { page, site } = locals;
  if (page?.source !== 'writing/index.md' || !page.content.includes(slot)) return locals;

  const date = hexo.extend.helper.get('date').bind(locals);
  const posts = site.posts.toArray()
    .filter(post => yearArticle.test(post.source.replace(/\\/g, '/')))
    .sort((a, b) => Number(b.date) - Number(a.date) || a.path.localeCompare(b.path));
  const years = new Map();
  for (const post of posts) {
    const published = date(new Date(Number(post.date)), 'YYYY-MM-DD');
    const year = published.slice(0, 4);
    if (!years.has(year)) years.set(year, []);
    years.get(year).push(renderEntry(post, published, url_for.call(locals, post.path)));
  }

  const yearLinks = [...years.keys()].map(year => `<a href="#writing-${year}">${year}</a>`).join('');
  const groups = [...years].map(([year, entries]) => `<section class="writing-year" aria-labelledby="writing-${year}">
    <h3 id="writing-${year}">${year}</h3>
    <ul class="writing-entries">${entries.join('\n')}</ul>
  </section>`).join('\n');
  const directory = `<div class="writing-section-heading">
    <h2 id="writing-archive-title">独立文字</h2>
    ${yearLinks ? `<nav class="writing-year-links" aria-label="按年份跳转">${yearLinks}</nav>` : ''}
  </div>
  ${groups || '<p>暂无独立文字。</p>'}`;
  locals.page = { ...page, content: page.content.replace(slot, () => directory) };
  return locals;
});
