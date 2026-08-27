"use strict";

const { getDifficultyState } = require("./luogu_difficulty");

function normalizeCache(cache) {
  const copy = cache && typeof cache === "object" ? JSON.parse(JSON.stringify(cache)) : {};
  copy.schemaVersion = 1;
  copy.problems = copy.problems && typeof copy.problems === "object" ? copy.problems : {};
  return copy;
}

async function syncDifficultyCache({ cache, problemIds, refresh = false, fetchDifficulty, now = () => new Date().toISOString() }) {
  const nextCache = normalizeCache(cache);
  const failures = [];
  const updated = [];
  const uniqueIds = [...new Set(problemIds || [])];

  for (const problemId of uniqueIds) {
    if (!refresh && getDifficultyState(nextCache.problems[problemId]).status !== "missing") {
      continue;
    }

    try {
      const difficulty = await fetchDifficulty(problemId);
      if (getDifficultyState({ difficulty }).status === "missing") {
        throw new Error(`Luogu returned invalid difficulty for ${problemId}`);
      }
      nextCache.problems[problemId] = { difficulty, syncedAt: now() };
      updated.push(problemId);
    } catch (error) {
      failures.push({ problemId, error: String(error && error.message ? error.message : error) });
    }
  }

  return { cache: nextCache, updated, failures };
}

module.exports = {
  syncDifficultyCache,
};
