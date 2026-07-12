/**
 * 给分类页和最近更新页补充相邻的辅助入口。
 * 这些入口不再占用页眉，但页面本身仍然可以正常访问。
 */

hexo.extend.filter.register("after_render:html", function (html, data) {
  const path = String(data.path || "").replace(/\\/g, "/");

  if (path === "categories/index.html") {
    const navigation = `
      <div class="auxiliary-navigation text-center mb-4">
        需要更细致地筛选？<a href="/tags/">浏览全部标签 →</a>
      </div>`;
    return html.replace('<div class="category-list">', `${navigation}\n<div class="category-list">`);
  }

  if (path === "recent/index.html") {
    const navigation = `
      <div class="auxiliary-navigation text-center mb-4">
        想按年份查看？<a href="/archives/">进入时间归档 →</a>
      </div>`;
    return html.replace('<div class="row mx-auto index-card">', `${navigation}\n<div class="row mx-auto index-card">`);
  }

  return html;
});
