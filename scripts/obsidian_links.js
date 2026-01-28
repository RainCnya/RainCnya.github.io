/**
 * Hexo Script: Smart Obsidian Link Resolver
 * Author: Qu Xi (System)
 * Description: Converts [Label](Path.md) to Permalinks using Hexo's database.
 * Supports relative paths, Chinese filenames, and hexo-abbrlink.
 */

const path = require('path');
const url = require('url');

hexo.extend.filter.register('before_post_render', function(data) {
  // 核心正则：匹配 [Label](Path.md) 或 [Label](Path)
  // 排除 http:// 开头的链接
  const linkRegex = /\[([^\]]+)\]\((?!http)(.+?\.md)\)/g;

  data.content = data.content.replace(linkRegex, (match, label, linkPath) => {
    try {
      // 1. 解码 URL (处理中文路径被转义为 %E4%B8... 的情况)
      const decodedPath = decodeURIComponent(linkPath);

      // 2. 计算绝对路径
      // data.source 是当前文章的源路径 (例如: _posts/00_Atlas/Test.md)
      // 我们基于当前文章的位置，解析目标文件的位置
      const currentDir = path.dirname(data.source);
      let targetSource = path.resolve(currentDir, decodedPath);
      
      // Hexo 的 source 路径通常是相对 source/ 的，path.resolve 可能会带上系统盘符
      // 我们需要把它转回 Hexo 数据库能识别的相对路径格式
      // 这一步有点 trick，我们直接在数据库里搜“文件名结尾匹配”的更稳健
      
      const Post = hexo.model('Post');
      const allPosts = Post.toArray();

      // 3. 模糊查找策略 (Fuzzy Search)
      // 直接找 source 路径结尾匹配的文件
      // 比如链接是 ../00_图论指南.md，我们就找数据库里 source 结尾是 00_图论指南.md 的文章
      // 这里的 path.basename 解决了相对路径计算复杂的问题
      const targetFilename = path.basename(decodedPath);
      
      const targetPost = allPosts.find(p => {
        // 比较文件名 (兼容 Windows/Linux 分隔符)
        return p.source.endsWith(targetFilename) || p.source.endsWith(targetFilename.replace(/\//g, '\\'));
      });

      if (targetPost) {
        // ✅ 找到了！返回永久链接 (Abbrlink 会自动处理 permalink)
        return `[${label}](${hexo.config.root}${targetPost.path})`;
      } else {
        // ❌ 没找到 (可能是草稿、未渲染或文件名写错)
        // 保持原样，方便在网页上发现错误，而不是崩溃
        console.warn(`[Qu Xi Link Warning] Target not found: ${decodedPath} in ${data.source}`);
        return match;
      }

    } catch (e) {
      console.error(`[Link Error] ${e.message}`);
      return match;
    }
  });

  return data;
});