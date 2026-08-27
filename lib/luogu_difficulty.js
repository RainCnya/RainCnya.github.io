"use strict";

const cheerio = require("cheerio");

const LUOGU_HOSTS = new Set(["luogu.com.cn", "www.luogu.com.cn"]);
const PROBLEM_ID_PATTERN = /^[A-Za-z0-9_-]+$/;
const DIFFICULTY_LABELS = [
  "暂无评级",
  "入门",
  "普及-",
  "普及",
  "普及+/提高-",
  "提高",
  "提高+/省选-",
  "省选/NOI-",
  "NOI/NOI+/CTS",
];

function getLuoguProblemId(href) {
  if (typeof href !== "string" || !href.trim()) {
    return null;
  }

  let parsed;
  try {
    parsed = new URL(href, "https://raincnya.space/");
  } catch {
    return null;
  }

  if (!LUOGU_HOSTS.has(parsed.hostname.toLowerCase())) {
    return null;
  }

  const match = parsed.pathname.match(/^\/problem\/([^/]+)\/?$/);
  if (!match) {
    return null;
  }

  let problemId;
  try {
    problemId = decodeURIComponent(match[1]);
  } catch {
    return null;
  }

  return PROBLEM_ID_PATTERN.test(problemId) ? problemId : null;
}

function getDifficultyState(entry) {
  const difficulty = entry && entry.difficulty;
  if (!Number.isInteger(difficulty) || difficulty < 0 || difficulty > 8) {
    return { status: "missing" };
  }

  if (difficulty === 0) {
    return { status: "unrated", difficulty };
  }

  return { status: "rated", difficulty };
}

function addClass($anchor, className) {
  const existing = String($anchor.attr("class") || "")
    .split(/\s+/)
    .filter(Boolean)
    .filter((item) => !item.startsWith("luogu-difficulty"));
  $anchor.attr("class", [...existing, "luogu-difficulty", className].join(" "));
}

function getStatusTitle(state) {
  if (state.status === "missing") {
    return "洛谷难度数据异常";
  }
  return `洛谷难度：${DIFFICULTY_LABELS[state.difficulty]}`;
}

function renderLuoguDifficultyHtml(html, cache, enabled) {
  if (enabled === false || typeof html !== "string" || !html.includes("luogu.com.cn")) {
    return html;
  }

  const problems = cache && typeof cache.problems === "object" ? cache.problems : {};
  const $ = cheerio.load(html, { decodeEntities: false }, false);

  $("a[href]").each((_, anchor) => {
    const $anchor = $(anchor);
    if ($anchor.closest("pre, code").length > 0) {
      return;
    }

    const problemId = getLuoguProblemId($anchor.attr("href"));
    if (!problemId) {
      return;
    }

    const state = getDifficultyState(problems[problemId]);
    const className = state.status === "missing"
      ? "luogu-difficulty-missing"
      : `luogu-difficulty-${state.difficulty}`;

    addClass($anchor, className);
    $anchor.attr("data-luogu-problem", problemId);
    $anchor.attr("data-luogu-status", state.status);
    $anchor.attr("title", getStatusTitle(state));
  });

  return $.html();
}

function isFence(line) {
  return line.match(/^\s*(`{3,}|~{3,})/);
}

function isTemporaryPostPath(filePath) {
  return /(^|\/)260_Records\/Temp(?:\/|$)/i.test(String(filePath || "").replace(/\\/g, "/"));
}

function extractLuoguProblemIds(markdown) {
  if (typeof markdown !== "string" || !markdown.includes("luogu.com.cn")) {
    return [];
  }

  const found = [];
  const seen = new Set();
  let activeFence = null;

  for (const line of markdown.split(/\r?\n/)) {
    const fence = isFence(line);
    if (fence) {
      const marker = fence[1];
      if (!activeFence) {
        activeFence = { character: marker[0], length: marker.length };
      } else if (marker[0] === activeFence.character && marker.length >= activeFence.length) {
        activeFence = null;
      }
      continue;
    }

    if (activeFence) {
      continue;
    }

    for (const match of line.matchAll(/https?:\/\/(?:www\.)?luogu\.com\.cn\/problem\/[^\s<>()\[\]{}"']+/gi)) {
      const problemId = getLuoguProblemId(match[0].replace(/[.,;:!?]+$/, ""));
      if (problemId && !seen.has(problemId)) {
        seen.add(problemId);
        found.push(problemId);
      }
    }
  }

  return found;
}

module.exports = {
  isTemporaryPostPath,
  extractLuoguProblemIds,
  getDifficultyState,
  getLuoguProblemId,
  renderLuoguDifficultyHtml,
};
