/**
 * Obsidian image embeds -> Hexo post assets
 *
 * Obsidian source:
 * ![[Post Name/diagram.png]]
 * ![[Post Name/diagram.png|Caption]]
 *
 * Hexo receives:
 * {% asset_img "diagram.png" "Caption" %}
 *
 * With post_asset_folder enabled, Hexo copies the contents of the post's
 * sibling asset directory into the generated post directory. Therefore the
 * Obsidian folder prefix must be removed and only the asset filename retained.
 */

"use strict";

const path = require("path");

const IMAGE_EXTENSION = /\.(?:avif|gif|jpe?g|png|svg|webp)$/i;
const FENCE_START = /^\s*(`{3,}|~{3,})/;

function quoteTagArgument(value) {
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function transformEmbed(match, rawTarget) {
  const [rawPath, rawLabel] = rawTarget.split("|", 2);
  const normalizedPath = String(rawPath || "").trim().replace(/\\/g, "/");

  if (!IMAGE_EXTENSION.test(normalizedPath)) {
    return match;
  }

  const filename = path.posix.basename(normalizedPath);
  const fallbackLabel = filename.replace(IMAGE_EXTENSION, "");
  const requestedLabel = String(rawLabel || "").trim();
  const label = requestedLabel && !/^\d+(?:x\d+)?$/i.test(requestedLabel)
    ? requestedLabel
    : fallbackLabel;

  return `{% asset_img ${quoteTagArgument(filename)} ${quoteTagArgument(label)} %}`;
}

function transformObsidianImages(markdown) {
  if (typeof markdown !== "string" || !markdown.includes("![[")) {
    return markdown;
  }

  const lines = markdown.split(/\r?\n/);
  let activeFence = null;

  return lines.map((line) => {
    const fence = line.match(FENCE_START);

    if (fence) {
      const marker = fence[1];

      if (!activeFence) {
        activeFence = { character: marker[0], length: marker.length };
      } else if (
        marker[0] === activeFence.character &&
        marker.length >= activeFence.length
      ) {
        activeFence = null;
      }

      return line;
    }

    if (activeFence) {
      return line;
    }

    return line.replace(/!\[\[([^\]\r\n]+)\]\]/g, transformEmbed);
  }).join("\n");
}

hexo.extend.filter.register("before_post_render", function (data) {
  for (const field of ["content", "excerpt", "more"]) {
    if (typeof data[field] === "string") {
      data[field] = transformObsidianImages(data[field]);
    }
  }

  return data;
}, 7);

