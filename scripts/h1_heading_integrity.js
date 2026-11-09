'use strict';

const { load } = require('cheerio');

// Assign bare Markdown H1 ids before Fluid's priority-10 post filter. Preserve
// author ids and inner markup; attribute values must come from visible text.
hexo.extend.filter.register('after_post_render', function(data) {
  const source = typeof data.source === 'string' ? data.source.replace(/\\/g, '/') : '';
  if (!source.startsWith('_posts/') || !/\.(md|markdown|mkd|mkdn|mdwn|mdtxt|mdtext)$/i.test(source)
      || typeof data.content !== 'string' || !/<h1>/i.test(data.content)) return data;

  const html = data.content;
  const $ = load(html, { sourceCodeLocationInfo: true }, false);
  const used = new Set($('[id]').map((_, node) => $(node).attr('id')).get());
  const edits = [];
  $('h1').each((_, node) => {
    const tag = node.sourceCodeLocation && node.sourceCodeLocation.startTag;
    if (!tag || !/^<h1>$/i.test(html.slice(tag.startOffset, tag.endOffset))) return;
    if (!$(node).find('a').length) return;
    const base = $(node).text().trim().toLowerCase().replace(/\s+/g, '-').replace(/[?#&]/g, '') || 'default';
    let id = base;
    let suffix = 1;
    while (used.has(id)) id = base + '-' + suffix++;
    used.add(id);
    const escaped = id.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    edits.push({ start: tag.startOffset, end: tag.endOffset, text: '<h1 id="' + escaped + '">' });
  });
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    data.content = data.content.slice(0, edit.start) + edit.text + data.content.slice(edit.end);
  }
  return data;
}, 5);
