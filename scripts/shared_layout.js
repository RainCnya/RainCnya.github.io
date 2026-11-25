'use strict';

const { load } = require('cheerio');
const { readFileSync } = require('node:fs');

function readingLayout(page) {
  if (page.path === 'algorithm/atlas/index.html') return true;
  return page.__post && page.path !== 'index.html' && page.source !== '_posts/HomePage.md';
}

hexo.extend.helper.register('site_reading_layout', readingLayout);

hexo.extend.helper.register('site_reading_content', function(page) {
  if (page.abbrlink !== 'chengdu2026') return page.content;

  // This original starts with a hand-written H2 identical to its front matter title.
  const $ = load(page.content, { sourceCodeLocationInfo: true }, false);
  const heading = $.root().children().first();
  const location = heading[0]?.sourceCodeLocation;
  const id = location?.attrs?.id;
  if (!heading.is('h2') || heading.text().trim() !== page.title || !id) return page.content;

  const anchor = page.content.slice(id.startOffset, id.endOffset);
  return page.content.slice(0, location.startOffset) +
    `<span ${anchor} class="reading-title-anchor" tabindex="-1"></span>` +
    page.content.slice(location.endOffset);
});

// Adapt the installed Fluid views in memory, leaving its dependency and inject points intact.
hexo.extend.filter.register('before_generate', function() {
  const theme = this.theme;
  function override(path, replacements, target = path) {
    let content = readFileSync(theme.getView(path).source, 'utf8').replace(/\r\n/g, '\n');
    for (const [original, replacement] of replacements) {
      const found = typeof original === 'string' ? content.includes(original) : original.test(content);
      if (!found) throw new Error(`[Shared layout] Unexpected Fluid view: ${path}`);
      content = content.replace(original, replacement);
    }
    theme.setView(target, content);
  }

  const title = '<h1 id="seo-header"><%= page.subtitle || page.title %></h1>';
  override('post.ejs', [
    [title, `<% if (site_reading_layout(page)) { %>
              <div class="reading-header">
                ${title}
                <%- inject_point('postMetaTop') %>
              </div>
            <% } else { %>
              ${title}
            <% } %>`],
    ['<%- page.content %>\n                <%- inject_point(\'postMarkdownEnd\') %>',
      "<%- site_reading_content(page) %>\n                <%- inject_point('postMarkdownEnd') %>"]
  ]);
  // Fluid copies this partial into its default header injection on generateBefore.
  override('_partials/header.ejs', [
    ['class="header-inner"', 'class="header-inner<%= site_reading_layout(page) ? \' reading-header-spacer\' : \'\' %>"'],
    ['<%= banner_img_height %>vh', "<%= site_reading_layout(page) ? '68px' : banner_img_height + 'vh' %>"],
    ["<%- partial('_partials/header/banner') %>", `<% if (!site_reading_layout(page)) { %>
    <%- partial('_partials/header/banner') %>
  <% } %>`]
  ], 'inject/header/default.ejs');

  const search = / {4}<% if \(theme\.search\.enable\) \{ %>\s*<%- partial\('_partials\/search\.ejs'\) %>\s*<% } %>\r?\n/;
  override('layout.ejs', [
    [search, ''],
    ['</main>', `</main>

  <% if (theme.search.enable) { %>
    <%- partial('_partials/search.ejs') %>
  <% } %>`]
  ]);
  override('_partials/search.ejs', [
    ['modal-dialog modal-dialog-scrollable', 'modal-dialog modal-dialog-centered modal-dialog-scrollable'],
    ['class="modal-title', 'id="ModalLabel" class="modal-title']
  ]);
});

const heroImages = {
  '.space-landscape img': ['/img/banner_index_v2.webp'],
  '.here-room img': ['/img/space-pages/here-room-light.svg', '/img/space-pages/here-room-dark.svg']
};

// Run after Fluid's default-priority page filter and remove only its placeholder attributes.
hexo.extend.filter.register('after_render:html', function(html) {
  if (!/<html[\s>]/i.test(html) || !/class="(?:space-landscape|here-room)"/.test(html)) return html;

  const $ = load(html, { sourceCodeLocationInfo: true });
  const edits = [];
  for (const [selector, sources] of Object.entries(heroImages)) {
    $(selector).each((_, image) => {
      if (!sources.includes($(image).attr('src'))) return;
      const attributes = image.sourceCodeLocation.attrs;
      if (!attributes.lazyload || !attributes.srcset) return;
      if ($(image).attr('srcset') !== '/img/loading.gif') return;
      edits.push(attributes.lazyload, attributes.srcset);
    });
  }
  for (const { startOffset, endOffset } of edits.sort((a, b) => b.startOffset - a.startOffset)) {
    html = html.slice(0, html[startOffset - 1] === ' ' ? startOffset - 1 : startOffset) + html.slice(endOffset);
  }
  return html;
}, 20);
