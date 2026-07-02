/**
 * Hexo Script: Public Category Mapper
 *
 * 职责分工：
 * - hexo-auto-category：根据目录生成并写回内部 categories
 * - 本脚本：构建时将内部 categories 映射为公开分类
 *
 * 本脚本不会修改 Markdown 文件。
 */

const ROOT_CATEGORY_MAP = {
  "210_Atlas": "算法图谱",
  "220_Library": "题型书库",
  "230_Notes": "专题笔记",
  "240_Math": "数学体系",
  "270_Solutions": "比赛题解",
  "280_Study": "学习档案",
  "290_WindTrace": "风迹",
};

/**
 * 去掉目录分类前面的排序编号。
 *
 * 03_数论      -> 数论
 * 30_动态规划  -> 动态规划
 * 10-数据结构  -> 数据结构
 */
function stripPrefix(name) {
  return String(name || "")
    .replace(/^\d+[_\-\s]+/, "")
    .trim();
}

/**
 * 根据文章路径恢复分类层级。
 *
 * 例如：
 * _posts/240_Math/03_数论/01_整数分解.md
 *
 * 得到：
 * ["240_Math", "03_数论"]
 */
function getDirectoryCategories(source) {
  const parts = String(source || "")
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .split("/")
    .filter(Boolean);

  if (parts[0] === "_posts") {
    parts.shift();
  }

  // 移除 Markdown 文件名
  parts.pop();

  return parts;
}

/**
 * 内部分类名转公开名称。
 */
function mapCategory(name, level) {
  if (level === 0 && ROOT_CATEGORY_MAP[name]) {
    return ROOT_CATEGORY_MAP[name];
  }

  return stripPrefix(name);
}

/**
 * auto-category 已在文章处理阶段写入分类。
 * 此处在页面生成前，重新建立“公开分类”关系。
 */
hexo.extend.filter.register("before_generate", async function () {
  const posts = hexo.locals.get("posts").toArray();

  let mapped = 0;
  let skipped = 0;

  for (const post of posts) {
    const internalCategories = getDirectoryCategories(post.source);

    if (internalCategories.length === 0) {
      skipped++;
      continue;
    }

    const publicCategories = internalCategories
      .map(mapCategory)
      .filter(Boolean);

    if (publicCategories.length === 0) {
      skipped++;
      continue;
    }

    // 双层数组表示一条层级：
    // 数学体系 -> 数论
    await post.setCategories([publicCategories]);
    mapped++;
  }

  hexo.log.info(
    `[Public Categories] 已映射 ${mapped} 篇文章，跳过 ${skipped} 篇。`
  );
});