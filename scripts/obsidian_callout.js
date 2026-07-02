/**
 * Obsidian Callout -> Hexo HTML
 *
 * 支持：
 * > [!note]
 * > 内容
 *
 * > [!tip] 自定义标题
 * > 内容
 *
 * > [!warning]+ 默认展开
 * > 内容
 *
 * > [!example]- 默认折叠
 * > 内容
 */

const cheerio = require("cheerio");

const TYPE_ALIASES = {
  summary: "abstract",
  tldr: "abstract",
  hint: "tip",
  important: "tip",
  check: "success",
  done: "success",
  help: "question",
  faq: "question",
  caution: "warning",
  attention: "warning",
  fail: "failure",
  missing: "failure",
  error: "danger",
  cite: "quote",
};

const DEFAULT_TITLES = {
  note: "笔记",
  abstract: "摘要",
  info: "信息",
  todo: "待办",
  tip: "提示",
  success: "完成",
  question: "问题",
  warning: "注意",
  failure: "失败",
  danger: "危险",
  bug: "问题",
  example: "示例",
  quote: "引用",
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeType(rawType) {
  const type = String(rawType || "note").toLowerCase();
  return TYPE_ALIASES[type] || type;
}

function transformCallouts(html) {
  if (!html || !html.includes("[!")) {
    return html;
  }

  const $ = cheerio.load(html, { decodeEntities: false }, false);
  const blockquotes = $("blockquote").toArray().reverse();

  for (const element of blockquotes) {
    const $quote = $(element);
    const $first = $quote.children().first();

    if (!$first.is("p")) {
      continue;
    }

    const firstHtml = $first.html() || "";
    const marker = firstHtml.match(
      /^\s*\[!([A-Za-z0-9_-]+)\]([+-])?(?:[ \t]+([^\n<]*))?(?:\r?\n|<br\s*\/?>)?/i
    );

    if (!marker) {
      continue;
    }

    const rawType = marker[1];
    const fold = marker[2] || "";
    const type = normalizeType(rawType);
    const customTitle = String(marker[3] || "").trim();
    const title =
      customTitle ||
      DEFAULT_TITLES[type] ||
      rawType.replace(/[-_]+/g, " ");

    const remaining = firstHtml.slice(marker[0].length).trim();

    if (remaining) {
      $first.html(remaining);
    } else {
      $first.remove();
    }

    const bodyHtml = $quote.html() || "";
    const safeType = type.replace(/[^a-z0-9_-]/g, "") || "note";
    const safeTitle = escapeHtml(title);

    const titleInner = `
      <span class="callout-icon" aria-hidden="true"></span>
      <span class="callout-title-inner">${safeTitle}</span>
    `;

    if (fold) {
      const open = fold === "+" ? " open" : "";

      $quote.replaceWith(`
        <details class="obsidian-callout callout-${safeType} is-collapsible"
                 data-callout="${safeType}"${open}>
          <summary class="callout-title">
            ${titleInner}
            <span class="callout-fold" aria-hidden="true"></span>
          </summary>
          <div class="callout-content">
            ${bodyHtml}
          </div>
        </details>
      `);
    } else {
      $quote.replaceWith(`
        <div class="obsidian-callout callout-${safeType}"
             data-callout="${safeType}">
          <div class="callout-title">
            ${titleInner}
          </div>
          <div class="callout-content">
            ${bodyHtml}
          </div>
        </div>
      `);
    }
  }

  return $.html();
}

hexo.extend.filter.register("after_post_render", function (data) {
  for (const field of ["content", "excerpt", "more"]) {
    if (typeof data[field] === "string") {
      data[field] = transformCallouts(data[field]);
    }
  }

  return data;
});
