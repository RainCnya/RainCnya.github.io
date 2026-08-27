"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const {
  extractLuoguProblemIds,
  getDifficultyState,
  getLuoguProblemId,
  isTemporaryPostPath,
  renderLuoguDifficultyHtml,
} = require("../lib/luogu_difficulty");
const { syncDifficultyCache } = require("../lib/luogu_difficulty_sync");

test("recognizes normal and RemoteJudge Luogu problem URLs", () => {
  assert.equal(getLuoguProblemId("https://www.luogu.com.cn/problem/P1000"), "P1000");
  assert.equal(getLuoguProblemId("https://luogu.com.cn/problem/CF1000A?contestId=1"), "CF1000A");
  assert.equal(getLuoguProblemId("https://www.luogu.com.cn/problem/AT_dp_f#solution"), "AT_dp_f");
  assert.equal(getLuoguProblemId("https://codeforces.com/problemset/problem/1/A"), null);
});

test("distinguishes explicit unranked data from missing or invalid cache entries", () => {
  assert.deepEqual(getDifficultyState({ difficulty: 0 }), { status: "unrated", difficulty: 0 });
  assert.deepEqual(getDifficultyState({ difficulty: 6 }), { status: "rated", difficulty: 6 });
  assert.deepEqual(getDifficultyState(undefined), { status: "missing" });
  assert.deepEqual(getDifficultyState({ difficulty: 9 }), { status: "missing" });
});

test("renders full Luogu anchors statically while preserving non-Luogu links", () => {
  const html = '<p><a href="https://www.luogu.com.cn/problem/P1000">P1000 超级玛丽</a></p><p><a href="https://www.luogu.com.cn/problem/CF1000A">CF1000A Codeforces</a></p><p><a href="https://example.com/problem/P1000">other link</a></p>';
  const cache = { problems: { P1000: { difficulty: 1, syncedAt: "2026-08-27T00:00:00.000Z" }, CF1000A: { difficulty: 0, syncedAt: "2026-08-27T00:00:00.000Z" } } };
  const rendered = renderLuoguDifficultyHtml(html, cache, true);
  assert.match(rendered, /class="luogu-difficulty luogu-difficulty-1"/);
  assert.match(rendered, /data-luogu-problem="P1000"/);
  assert.match(rendered, /class="luogu-difficulty luogu-difficulty-0"/);
  assert.match(rendered, /data-luogu-status="unrated"/);
  assert.match(rendered, /href="https:\/\/example\.com\/problem\/P1000"/);
  assert.doesNotMatch(rendered, /example\.com\/problem\/P1000"[^>]*luogu-difficulty/);
});

test("marks an identifiable but uncached Luogu problem as an anomaly", () => {
  const rendered = renderLuoguDifficultyHtml('<a href="https://www.luogu.com.cn/problem/AT_dp_f">AT_dp_f LCS</a>', { problems: {} }, true);
  assert.match(rendered, /class="luogu-difficulty luogu-difficulty-missing"/);
  assert.match(rendered, /data-luogu-status="missing"/);
});

test("leaves article links unchanged when difficulty is disabled", () => {
  const html = '<a href="https://www.luogu.com.cn/problem/P1000">P1000</a>';
  assert.equal(renderLuoguDifficultyHtml(html, { problems: {} }, false), html);
});

test("extracts only formal Markdown references outside fenced code", () => {
  const markdown = '[P1000](https://www.luogu.com.cn/problem/P1000)\nhttps://luogu.com.cn/problem/CF1000A\n```text\nhttps://www.luogu.com.cn/problem/P9999\n```\nhttps://example.com/problem/P1000';
  assert.deepEqual(extractLuoguProblemIds(markdown), ["P1000", "CF1000A"]);
});

test("reuses successful cached entries by default and fetches only missing problems", async () => {
  const calls = [];
  const result = await syncDifficultyCache({
    cache: { schemaVersion: 1, problems: { P1000: { difficulty: 1, syncedAt: "2026-08-01T00:00:00.000Z" } } },
    problemIds: ["P1000", "CF1000A"],
    now: () => "2026-08-27T00:00:00.000Z",
    fetchDifficulty: async (problemId) => {
      calls.push(problemId);
      return 6;
    },
  });

  assert.deepEqual(calls, ["CF1000A"]);
  assert.deepEqual(result.cache.problems.P1000, { difficulty: 1, syncedAt: "2026-08-01T00:00:00.000Z" });
  assert.deepEqual(result.cache.problems.CF1000A, { difficulty: 6, syncedAt: "2026-08-27T00:00:00.000Z" });
});

test("keeps old data when a refresh request fails while recording other successes", async () => {
  const result = await syncDifficultyCache({
    cache: { schemaVersion: 1, problems: { P1000: { difficulty: 1, syncedAt: "2026-08-01T00:00:00.000Z" } } },
    problemIds: ["P1000", "AT_dp_f"],
    refresh: true,
    now: () => "2026-08-27T00:00:00.000Z",
    fetchDifficulty: async (problemId) => {
      if (problemId === "P1000") {
        throw new Error("temporary network failure");
      }
      return 0;
    },
  });

  assert.deepEqual(result.cache.problems.P1000, { difficulty: 1, syncedAt: "2026-08-01T00:00:00.000Z" });
  assert.deepEqual(result.cache.problems.AT_dp_f, { difficulty: 0, syncedAt: "2026-08-27T00:00:00.000Z" });
  assert.equal(result.failures.length, 1);
  assert.equal(result.failures[0].problemId, "P1000");
});

test("excludes Temp drafts from publishing inputs regardless of slash style", () => {
  assert.equal(isTemporaryPostPath("source/_posts/260_Records/Temp/P1000.md"), true);
  assert.equal(isTemporaryPostPath("source\\_posts\\260_Records\\Temp\\P1000.md"), true);
  assert.equal(isTemporaryPostPath("source/_posts/260_Records/DP/P1000.md"), false);
});
