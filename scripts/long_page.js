"use strict";

const cheerio = require("cheerio");

/**
 * Long Page 模式（超长结构化文章专用）。
 *
 * 由文章 Front Matter 中的 long_page: true 显式开启，不依赖 URL、标题或 DOM 数量猜测。
 *
 * 1. after_post_render：构建期把正文按现有 Part（顶层 h2 以 "Part " 开头）包裹成粗粒度容器，
 *    供浏览器用 content-visibility 跳过屏外整块渲染。
 * 2. after_render:html：Long Page 关闭 banner parallax（移除 parallax="true" 属性，
 *    使 Fluid 的 registerParallaxEvent 找不到目标而不会绑定滚动监听）。
 */

function isPartHeading($heading) {
  return /^Part\s+\d+/i.test($heading.text().trim());
}

hexo.extend.filter.register("after_post_render", (data) => {
  if (data.long_page !== true || typeof data.content !== "string") {
    return data;
  }

  const $ = cheerio.load(data.content, { decodeEntities: false }, false);
  const topLevel = $.root().children();
  const partIndexes = [];

  topLevel.each((index, element) => {
    if (element.tagName === "h2" && isPartHeading($(element))) {
      partIndexes.push(index);
    }
  });

  if (partIndexes.length === 0) {
    return data;
  }

  const elements = topLevel.toArray();
  const partSet = new Set(partIndexes);
  let currentSection = null;

  for (let index = partIndexes[0]; index < elements.length; index++) {
    const $element = $(elements[index]);
    if (partSet.has(index)) {
      currentSection = $("<section class=\"long-page-part\"></section>");
      $element.before(currentSection);
      currentSection.append($element);
    } else if (currentSection) {
      currentSection.append($element);
    }
  }

  data.content = $.html();
  return data;
}, 100);

hexo.extend.filter.register("after_render:html", (html, data) => {
  const page = data && data.page;
  if (page && page.long_page === true && typeof html === "string") {
    html = html.replace(/(<div id="banner"[^>]*?)\s+parallax=(?:true|"true")/i, "$1");
    html = html.replace(/"expand_all":\s*true/, "\"expand_all\":false");
  }
  return html;
}, 100);
