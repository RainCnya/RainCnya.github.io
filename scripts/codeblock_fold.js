/**
 * Codeblock Customizer fence metadata -> Fluid fold tag
 *
 * Obsidian source:
 * ```cpp title:"参考代码" fold
 * // code
 * ```
 *
 * Hexo receives:
 * {% fold info @参考代码 %}
 * ```cpp
 * // code
 * ```
 * {% endfold %}
 *
 * This keeps the source convenient in Obsidian while reusing Fluid's native
 * fold markup, syntax highlighting, copy button and responsive behaviour.
 */

"use strict";

const FENCE_START = /^(\s*)(`{3,}|~{3,})([^\s`~]+)(.*)$/;
const TITLE_PARAMETER =
  /(?:^|\s)(?:title|file)\s*[:=]\s*(?:"([^"]*)"|'([^']*)'|([^\s]+))/i;
const FOLD_PARAMETER = /(?:^|\s)fold(?=\s|$)/i;

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeFluidTitle(value) {
  // Fluid separates the style and title at "@". Keeping it out of the title
  // prevents accidental argument splitting; braces are neutralised so a title
  // cannot terminate the generated Hexo tag.
  return String(value || "代码")
    .replace(/@/g, "＠")
    .replace(/\{%/g, "｛％")
    .replace(/%\}/g, "％｝")
    .trim() || "代码";
}

function transformCodeblockFolds(markdown) {
  if (typeof markdown !== "string" || !markdown) {
    return markdown;
  }

  const lines = markdown.split(/\r?\n/);
  const output = [];
  let activeFence = null;

  for (const line of lines) {
    if (!activeFence) {
      const match = line.match(FENCE_START);

      if (!match) {
        output.push(line);
        continue;
      }

      const [, indent, fence, language, parameters] = match;
      const hasFold = FOLD_PARAMETER.test(parameters);
      const titleMatch = parameters.match(TITLE_PARAMETER);

      // Leave ordinary fenced code completely untouched. This also preserves
      // any markdown-it metadata owned by another plugin.
      if (!hasFold && !titleMatch) {
        output.push(line);
        activeFence = {
          character: fence[0],
          length: fence.length,
          indent,
          fold: false,
        };
        continue;
      }

      const title = titleMatch
        ? titleMatch[1] ?? titleMatch[2] ?? titleMatch[3]
        : "代码";

      activeFence = {
        character: fence[0],
        length: fence.length,
        indent,
        fold: hasFold,
      };

      if (hasFold) {
        output.push(`${indent}{% fold info @${escapeFluidTitle(title)} %}`);
      }

      // Strip Codeblock Customizer parameters before markdown-it parses the
      // info string. Fluid only needs the language for highlighting.
      output.push(`${indent}${fence}${language}`);
      continue;
    }

    const closingFence = new RegExp(
      `^${escapeRegExp(activeFence.indent)}${escapeRegExp(activeFence.character)}{${activeFence.length},}\\s*$`
    );

    output.push(line);

    if (closingFence.test(line)) {
      if (activeFence.fold) {
        output.push(`${activeFence.indent}{% endfold %}`);
      }
      activeFence = null;
    }
  }

  return output.join("\n");
}

hexo.extend.filter.register("before_post_render", function (data) {
  for (const field of ["content", "excerpt", "more"]) {
    if (typeof data[field] === "string") {
      data[field] = transformCodeblockFolds(data[field]);
    }
  }

  return data;
}, 8);
