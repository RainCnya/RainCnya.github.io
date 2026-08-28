"use strict";

const fs = require("fs");
const https = require("https");
const path = require("path");
const {
  extractLuoguProblemIds,
  isTemporaryPostPath,
} = require("../lib/luogu_difficulty");
const { syncDifficultyCache } = require("../lib/luogu_difficulty_sync");

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "source", "_posts");
const CACHE_PATH = path.join(ROOT, "data", "luogu_difficulties.json");
const REFRESH = process.argv.includes("--refresh");

function readCache(cachePath) {
  if (!fs.existsSync(cachePath)) {
    return { schemaVersion: 1, problems: {} };
  }

  const value = JSON.parse(fs.readFileSync(cachePath, "utf8"));
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("洛谷难度缓存不是有效的 JSON 对象");
  }
  return value;
}

function collectPostFiles(directory) {
  const files = [];
  const pending = [directory];
  while (pending.length > 0) {
    const current = pending.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      const relativePath = path.relative(ROOT, fullPath);
      if (isTemporaryPostPath(relativePath)) {
        continue;
      }
      if (entry.isDirectory()) {
        pending.push(fullPath);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

function collectProblemIds(postFiles) {
  const ids = new Set();
  for (const filePath of postFiles) {
    const markdown = fs.readFileSync(filePath, "utf8");
    for (const problemId of extractLuoguProblemIds(markdown)) {
      ids.add(problemId);
    }
  }
  return [...ids].sort((left, right) => left.localeCompare(right));
}

let luoguCookie = null;
let luoguCookieExpiry = 0;

function requestLuoguText(url, headers) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, { headers }, (response) => {
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("error", reject);
      response.on("end", () => {
        resolve({
          statusCode: response.statusCode,
          headers: response.headers,
          body: Buffer.concat(chunks).toString("utf8"),
        });
      });
    });
    request.setTimeout(15000, () => request.destroy(new Error("洛谷请求超时")));
    request.on("error", reject);
  });
};

async function ensureLuoguCookie() {
  if (luoguCookie && Date.now() < luoguCookieExpiry) {
    return luoguCookie;
  }
  const response = await requestLuoguText("https://www.luogu.com.cn/", {
    "user-agent": "MiQiu-Blog-Difficulty-Cache/1.0",
  });
  const match = response.body.match(/cookie="([^"]+)"/);
  luoguCookie = match ? match[1].split(";")[0] : null;
  luoguCookieExpiry = Date.now() + 4 * 60 * 1000;
  return luoguCookie;
};

async function fetchLuoguDifficulty(problemId) {
  const url = `https://www.luogu.com.cn/problem/${encodeURIComponent(problemId)}?_contentOnly=1`;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const cookie = await ensureLuoguCookie();
    const headers = {
      "x-lentille-request": "content-only",
      "user-agent": "MiQiu-Blog-Difficulty-Cache/1.0",
      "referer": "https://www.luogu.com.cn/",
    };
    if (cookie) { headers["cookie"] = cookie; }
    const response = await requestLuoguText(url, headers);
    if (response.statusCode === 302 || (response.statusCode === 200 && !response.body.trim().startsWith("{"))) {
      luoguCookie = null;
      continue;
    }
    if (response.statusCode !== 200) {
      throw new Error(`洛谷返回 HTTP ${response.statusCode}`);
    }
    const payload = JSON.parse(response.body);
    const difficulty = payload && payload.data && payload.data.problem && payload.data.problem.difficulty;
    if (!Number.isInteger(difficulty) || difficulty < 0 || difficulty > 8) {
      throw new Error("洛谷响应中没有有效的 difficulty");
    }
    return difficulty;
  }
  throw new Error("洛谷请求多次失败（可能是访问受限）");
};


function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function writeCacheAtomically(cachePath, cache) {
  fs.mkdirSync(path.dirname(cachePath), { recursive: true });
  const temporaryPath = `${cachePath}.tmp`;
  fs.writeFileSync(temporaryPath, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
  try {
    fs.renameSync(temporaryPath, cachePath);
  } catch (error) {
    fs.rmSync(temporaryPath, { force: true });
    throw error;
  }
}

async function main() {
  const cache = readCache(CACHE_PATH);
  const postFiles = collectPostFiles(POSTS_DIR);
  const problemIds = collectProblemIds(postFiles);
  let requested = false;
  const result = await syncDifficultyCache({
    cache,
    problemIds,
    refresh: REFRESH,
    fetchDifficulty: async (problemId) => {
      if (requested) {
        await delay(350);
      }
      requested = true;
      return fetchLuoguDifficulty(problemId);
    },
  });

  if (result.updated.length > 0) {
    writeCacheAtomically(CACHE_PATH, result.cache);
  }

  console.log(`扫描 ${postFiles.length} 篇已发布文章，发现 ${problemIds.length} 个洛谷题目链接。`);
  console.log(`本次成功更新 ${result.updated.length} 题，保留缓存 ${Object.keys(result.cache.problems).length} 题。`);
  if (result.failures.length > 0) {
    console.warn(`有 ${result.failures.length} 题未同步成功；其已有缓存未被覆盖。`);
    for (const failure of result.failures) {
      console.warn(`- ${failure.problemId}: ${failure.error}`);
    }
    process.exitCode = 1;
  }
}

module.exports = {
  collectPostFiles,
  collectProblemIds,
  fetchLuoguDifficulty,
  readCache,
  writeCacheAtomically,
};

if (require.main === module) {
  main().catch((error) => {
    console.error(`同步洛谷难度缓存失败：${error.message}`);
    process.exitCode = 1;
  });
}
