'use strict';

// Inspect with the existing parser, but splice the original HTML by source offsets.
// Never serialize the DOM: navigation, search, content and unrelated scripts stay byte-identical.
const { load } = require('cheerio');

hexo.extend.filter.register('after_render:html', function(html, data = {}) {
  const pagePath = String(data.path || '').replace(/\\/g, '/');
  if (/(?:^|\/)works(?:\/|$)/i.test(pagePath)) return html;
  const $ = load(html, { sourceCodeLocationInfo: true });
  const complete = ['html', 'head', 'body'].every(tag => {
    const location = $(tag)[0]?.sourceCodeLocation;
    return location && location.startTag && location.endTag;
  });
  if (!complete) return html;
  const defaultMode = $('html').attr('data-default-color-scheme');
  const configs = $('head script#fluid-configs');
  if (defaultMode === undefined && !configs.length) return html;
  function fail(reason) { throw new Error('[FF2 theme] ' + reason); }
  if (defaultMode === undefined || configs.length !== 1) fail('Unknown Fluid shared-page structure');

  const root = String(hexo.config.root || '/');
  if (!root.startsWith('/') || root.startsWith('//') || !root.endsWith('/')) fail('Unknown site root');
  const oldPath = root + 'js/color-schema.js';
  const newPath = root + 'js/site-theme.js';
  const scripts = $('script[src]').toArray().filter(node => {
    const src = $(node).attr('src');
    return /(?:^|\/)\s*(?:color-schema|site-theme)\.js(?:[?#]|$)/i.test(src);
  });
  if (scripts.length !== 1) fail('Expected exactly one old or new theme script');
  const node = scripts[0];
  const src = $(node).attr('src');
  const pathname = src.split('?')[0];
  if (pathname !== oldPath && pathname !== newPath) fail('Unknown theme script URL: ' + src);
  const type = ($(node).attr('type') || '').trim().toLowerCase();
  if (node.parent?.name !== 'head' || $(node).attr('async') !== undefined ||
      $(node).attr('defer') !== undefined || $(node).attr('nomodule') !== undefined ||
      !['', 'text/javascript', 'application/javascript'].includes(type)) {
    fail('Theme initialization must remain synchronous in head');
  }
  // An upstream hash cannot authenticate the different replacement resource.
  if ($(node).attr('integrity') !== undefined) fail('Theme script integrity needs separate review');
  if (pathname === newPath) return html;
  const location = node.sourceCodeLocation?.attrs?.src;
  if (!location) fail('Missing original script source location');
  const attribute = html.slice(location.startOffset, location.endOffset);
  const value = /^(src\s*=\s*)(["']?)([^]*?)\2$/i.exec(attribute);
  if (!value || value[3] !== src) fail('Unknown src attribute encoding');
  const replacement = value[1] + value[2] + newPath + src.slice(oldPath.length) + value[2];
  return html.slice(0, location.startOffset) + replacement + html.slice(location.endOffset);
});
