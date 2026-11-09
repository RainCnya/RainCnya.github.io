'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const { installStableHeadings, finalizePostFields, validateLegacyRegistry, assertNoAuthorHeadingMarkers } = require('../lib/framework_headings.cjs');
const rendererRequire = createRequire(require.resolve('hexo-renderer-markdown-it'));
const { slugize } = rendererRequire('hexo-util');
const readData = name => JSON.parse(fs.readFileSync(path.join(hexo.base_dir, 'data', name), 'utf8'));
const registry = validateLegacyRegistry(readData('framework_legacy_fragments.json'));
const BRIDGED = Symbol.for('miqiu.framework.stable-generators');
const PAGE_SOURCES = ['algorithm/index.md', 'here/index.md', 'math/index.md', 'writing/index.md'];
const APPROVED_DATE = '2026-11-05T10:53:55+08:00';
let authorInputParser;
const fail = message => { throw new Error('[FF2 stability] ' + message); };

function validatePosts(posts) {
  const sources = new Set(), paths = new Set();
  posts.forEach(post => {
    if (typeof post.source !== 'string' || !post.source || sources.has(post.source)) fail('empty/duplicate Post.source');
    if (typeof post.path !== 'string' || paths.has(post.path)) fail('invalid/duplicate Post.path');
    if (post.date == null || !Number.isFinite(Number(post.date))) fail('invalid Post.date');
    sources.add(post.source); paths.add(post.path);
  });
}

function view(original, fields) {
  return Object.defineProperties(Object.create(original), Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, { value, writable: true, enumerable: true, configurable: true }])));
}

hexo.extend.filter.register('markdown-it:renderer', function(md) {
  installStableHeadings(md, hexo.config.markdown.anchors, slugize);
}, 1000);

hexo.extend.filter.register('before_post_render', function(data) {
  const source = typeof data.source === 'string' ? data.source.replace(/\\/g, '/') : '';
  if (source && !/\.(md|markdown|mkd|mkdn|mdwn|mdtxt|mdtext)$/i.test(source)) return data;
  const identity = source || data.path || 'embedded';
  // Hexo hides Swig/Nunjucks blocks before invoking the real Markdown core.
  // Inspect original Markdown first when the reserved attribute is mentioned;
  // tokenization keeps fenced/inline code from becoming false HTML targets.
  if (typeof data.content === 'string' && data.content.toLowerCase().includes('data-ff2-heading')) {
    if (!authorInputParser) {
      const Renderer = rendererRequire('./lib/renderer');
      authorInputParser = new Renderer(hexo).parser;
    }
    const check = tokens => {
      for (const token of tokens) {
        if (token.type === 'html_block' || token.type === 'html_inline') {
          assertNoAuthorHeadingMarkers(token.content, 'before_post_render Markdown input', identity);
        }
        if (token.children) check(token.children);
      }
    };
    check(authorInputParser.parse(data.content));
  }
  // Supplied HTML excerpts/more bypass the main parser, so check them at input.
  for (const field of ['excerpt', 'more']) {
    assertNoAuthorHeadingMarkers(data[field], `before_post_render ${field} HTML input`, identity);
  }
  return data;
}, -1000);

hexo.extend.filter.register('after_post_render', function(data) {
  const source = typeof data.source === 'string' ? data.source.replace(/\\/g, '/') : '';
  const isMarkdown = /\.(md|markdown|mkd|mkdn|mdwn|mdtxt|mdtext)$/i.test(source);
  const legacy = isMarkdown && source.startsWith('_posts/') ? registry.documents[source] : undefined;
  // Non-Markdown resources cannot contain parser-owned markers.
  if (source && !isMarkdown) return data;
  return finalizePostFields(data, legacy);
}, 200);

hexo.extend.filter.register('after_init', function() {
  if (this[BRIDGED]) return;
  const generators = this.extend.generator;
  const post = generators.get('post'), search = generators.get('_hexo_generator_search');
  if (!post || !search) fail('final Fluid generators missing');
  this[BRIDGED] = true;
  generators.register('post', function(locals) {
    const seen = new Map();
    for (const item of locals.posts.toArray().concat(locals.hide_posts.toArray())) {
      if (seen.has(item.source)) {
        const previous = seen.get(item.source);
        if (previous === item || (item._id && previous._id === item._id && previous.path === item.path)) continue;
        fail('ambiguous duplicated source');
      }
      seen.set(item.source, item);
    }
    const posts = new locals.posts.constructor([...seen.values()]);
    validatePosts(posts);
    const sorted = posts.sort('-date source');
    return post.call(this, view(locals, { posts: sorted, hide_posts: new locals.posts.constructor([]) }));
  });
  generators.register('_hexo_generator_search', function(locals) {
    validatePosts(locals.posts);
    const sorted = locals.posts.sort('-date source');
    const projected = sorted.map(item => Object.freeze({
      title: item.title, path: item.path, content: item.content, categories: item.categories,
      tags: item.tags && item.tags.sort('name path'), indexing: item.indexing,
      date: item.date, source: item.source
    }));
    return search.call(this, view(locals, { posts: new locals.posts.constructor(projected) }));
  });
}, 100);

hexo.extend.filter.register('template_locals', function(locals) {
  if (locals.page?.__post && locals.page.tags) return view(locals, { page: view(locals.page, { tags: locals.page.tags.sort('name path') }) });
  return locals;
}, 5);

hexo.extend.filter.register('before_generate', async function() {
  validatePosts(this.model('Post'));
  for (const name of ['Category', 'Tag']) {
    const keys = new Set();
    this.model(name).forEach(item => {
      if (!item.path || keys.has(item.path)) fail('empty/duplicate ' + name + '.path');
      keys.add(item.path);
    });
  }
  const mapping = readData('framework_page_dates.json');
  if (mapping.schemaVersion !== 1 || mapping.timezone !== 'Asia/Shanghai' || JSON.stringify(Object.keys(mapping.pages || {}).sort()) !== JSON.stringify(PAGE_SOURCES)) fail('invalid four-page whitelist');
  const Page = this.model('Page');
  const targets = PAGE_SOURCES.map(source => {
    const matches = Page.filter(page => page.source === source).toArray();
    const dates = mapping.pages[source];
    if (matches.length !== 1 || dates.date !== APPROVED_DATE || dates.updated !== APPROVED_DATE || !Number.isFinite(Date.parse(dates.date))) fail('missing/invalid approved Page date: ' + source);
    return { page: matches[0], dates };
  });
  for (const { page, dates } of targets) {
    // update uses the installed Page schema's Moment cast/validate/save path.
    await page.update({ date: new Date(dates.date), updated: new Date(dates.updated) });
    // Warehouse stores the instant as UTC; Hexo date consumers apply the existing
    // Asia/Shanghai config. The source mapping retains the owner's +08:00 value.
  }
}, 200);
