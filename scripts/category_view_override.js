'use strict';

const fs = require('node:fs');
const path = require('node:path');

// Use Hexo's existing view registration API for this one Fluid partial.
hexo.extend.filter.register('before_generate', function() {
  if (this.config.theme !== 'fluid') return;
  const filename = path.join(this.theme_dir, 'layout/_partials/category-list.ejs');
  const original = fs.readFileSync(filename, 'utf8');
  const occurrences = original.match(/md5\(cat\.name\)/g) || [];
  if (occurrences.length !== 4) {
    throw new Error('[category view] Installed category partial differs from the approved four ID expressions');
  }
  this.theme.setView('_partials/category-list.ejs', original.replace(/md5\(cat\.name\)/g, 'md5(cat.path)'));
  const layout = fs.readFileSync(path.join(this.theme_dir, 'layout/category.ejs'), 'utf8');
  const lookup = 'var cat = site.categories.find({name: page.category}).filter(cat => cat.length).data[0]';
  if (layout.split(lookup).length !== 2) {
    throw new Error('[category view] Unexpected Fluid category lookup');
  }
  // Hexo pagination carries the full category path in page.base on every page.
  this.theme.setView('category.ejs', layout.replace(lookup, `
var matches = site.categories.filter(cat => cat.path === page.base).data
if (matches.length !== 1) throw new Error('[category view] Cannot resolve category: ' + page.base)
var cat = matches[0]`));
}, 100);
