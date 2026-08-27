"use strict";

const fs = require("fs");
const path = require("path");
const { renderLuoguDifficultyHtml } = require("../lib/luogu_difficulty");

const cachePath = path.join(hexo.base_dir, "data", "luogu_difficulties.json");
let cachedDifficultyData;

function loadDifficultyCache() {
  if (cachedDifficultyData) {
    return cachedDifficultyData;
  }

  try {
    const parsed = JSON.parse(fs.readFileSync(cachePath, "utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("缓存根节点不是对象");
    }
    cachedDifficultyData = parsed;
  } catch (error) {
    hexo.log.warn(`洛谷难度缓存不可用，将以异常状态渲染：${error.message}`);
    cachedDifficultyData = { schemaVersion: 1, problems: {} };
  }

  return cachedDifficultyData;
}

hexo.extend.filter.register("after_post_render", (data) => {
  if (data.difficulty === false) {
    return data;
  }

  const cache = loadDifficultyCache();
  for (const field of ["content", "excerpt", "more"]) {
    if (typeof data[field] === "string") {
      data[field] = renderLuoguDifficultyHtml(data[field], cache, true);
    }
  }
  return data;
}, 20);
