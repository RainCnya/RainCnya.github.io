const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

test('markdown-it task-list integration renders read-only task items', () => {
  const config = fs.readFileSync(
    path.join(__dirname, '..', '_config.yml'),
    'utf8'
  );

  assert.match(config, /name: 'markdown-it-task-lists'/);

  const stylesheet = fs.readFileSync(
    path.join(__dirname, '..', 'source', 'css', 'article_v1.css'),
    'utf8'
  );
  assert.match(
    stylesheet,
    /\.markdown-body \.task-list-item-checkbox\s*\{[\s\S]*?margin: 0 0\.55rem 0 0 !important;/
  );

  const MarkdownIt = require('markdown-it');
  const taskLists = require('markdown-it-task-lists');
  const html = new MarkdownIt().use(taskLists, { enabled: false }).render([
    '- [ ] 未完成',
    '- [x] [已完成链接](https://example.com/done)',
    '- [X] 大写完成',
    '- 普通列表',
    '  - [ ] 嵌套任务',
    '  - 嵌套普通列表',
  ].join('\n'));

  assert.match(html, /<ul class="contains-task-list">/);
  assert.match(
    html,
    /<li class="task-list-item"><input(?=[^>]*class="task-list-item-checkbox")(?=[^>]*type="checkbox")(?=[^>]*disabled)[^>]*>/
  );
  assert.match(
    html,
    /<input(?=[^>]*type="checkbox")(?=[^>]*checked)(?=[^>]*disabled)[^>]*>/
  );
  assert.match(html, /href="https:\/\/example\.com\/done"/);
  assert.match(html, /普通列表/);
  assert.match(html, /嵌套任务/);
});
