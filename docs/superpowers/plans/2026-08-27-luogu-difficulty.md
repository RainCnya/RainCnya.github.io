# 洛谷难度染色 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add offline-cached Luogu difficulty coloring to generated Hexo HTML without changing Markdown source or requiring visitor-side requests.

**Architecture:** A shared pure Node module recognizes Luogu problem URLs, validates cache entries, extracts Markdown references, and annotates rendered HTML. A separate synchronizer merges successful API responses into a Git-tracked cache; the Hexo filter and CSS only consume that cache.

**Tech Stack:** Node.js built-in test runner and HTTPS client, Hexo `after_post_render`, Cheerio, JSON cache, CSS custom properties.

**Spec:** `docs/superpowers/specs/2026-08-27-luogu-difficulty-design.md`

## Global Constraints

- Do not write difficulty metadata, colors, or classes into Markdown files.
- Do not request Luogu from `hexo generate` or visitor-side JavaScript.
- Preserve `difficulty: 0` as explicit unranked data; do not equate it with missing cache data.
- Preserve successful cached entries on partial or complete synchronization failure.
- Exclude `source/_posts/260_Records/Temp/**` from Git, Hexo deployment, synchronization, and site checks.

---

### Task 1: Add and prove the shared classification/rendering core

**Files:**
- Create: `test/luogu_difficulty.test.js`
- Create: `lib/luogu_difficulty.js`
- Modify: `package.json`

**Interfaces:**
- Produces `getLuoguProblemId(href)`, `getDifficultyState(entry)`, `renderLuoguDifficultyHtml(html, cache, enabled)`, and `extractLuoguProblemIds(markdown)`.
- `getDifficultyState` returns `{ status: "rated" | "unrated" | "missing", difficulty?: number }`.

- [ ] Write failing unit tests for a `P1000` URL, `CF1000A` and `AT_dp_f` RemoteJudge URLs, cache `difficulty: 0`, missing/invalid cache entries, non-Luogu links, disabled article output, and full-anchor classes.
- [ ] Run `npm test` and confirm that it fails because the shared module does not exist.
- [ ] Implement the smallest pure module that satisfies those behaviors. Cache values are valid only for integer `0..8`; `0` returns `unrated`; all other absent/invalid values return `missing`.
- [ ] Run `npm test` and confirm all shared-core tests pass.

### Task 2: Add the offline synchronization boundary

**Files:**
- Create: `tools/sync_luogu_difficulties.js`
- Create: `data/luogu_difficulties.json`
- Modify: `package.json`
- Modify: `test/luogu_difficulty.test.js`

**Interfaces:**
- Synchronizer accepts no flag for cache misses and `--refresh` for every discovered formal reference.
- Successful API results merge as `{ difficulty, syncedAt }`; failed calls leave existing JSON untouched for that ID.

- [ ] Write failing tests using a real temporary cache file and a controlled fetch function: a successful response updates one entry; a failed refresh retains the old entry; a numeric zero response stores the unranked value.
- [ ] Run `npm test` and confirm synchronization tests fail because no synchronizer module exists.
- [ ] Implement an HTTPS `content-only` fetcher with timeout, a sequential polite delay, JSON extraction, atomic temporary-cache write, and a command-line wrapper. Never remove entries during a normal run.
- [ ] Run `npm test` and confirm shared and synchronization tests pass.

### Task 3: Connect static rendering, theme styling, and Temp filters

**Files:**
- Create: `scripts/luogu_difficulty_render.js`
- Create: `source/css/luogu_difficulty.css`
- Modify: `_config.fluid.yml`
- Modify: `_config.yml`
- Modify: `.gitignore`
- Modify: `tools/site_check.js`

**Interfaces:**
- Hexo filter reads `data.difficulty`; only boolean `false` disables coloring.
- Generated links carry `luogu-difficulty`, `luogu-difficulty-<0..8>` or `luogu-difficulty-missing`, plus a descriptive `data-luogu-status`.

- [ ] Write failing tests for the registered render function with a post object whose `difficulty` is `false`, and for Temp-path exclusion in the source scanner/site-check predicate.
- [ ] Run `npm test` and confirm the integration behavior fails before registration/filter support exists.
- [ ] Register a priority-20 `after_post_render` Hexo filter, load cache defensively, inject the stylesheet through Fluid config, and add matching Git/Hexo/site-check exclusions for Temp.
- [ ] Run `npm test` and confirm the complete test suite passes.

### Task 4: Populate cache and perform end-to-end verification

**Files:**
- Modify: `data/luogu_difficulties.json`

- [ ] Run `npm run sync:luogu` to populate currently referenced formal problem IDs; record failed IDs without erasing any cache data.
- [ ] Run `git diff --check`, `npm test`, `npm.cmd run clean`, `npm.cmd run build`, and `npm.cmd run check:site`.
- [ ] Build again with the network-unavailable synchronizer omitted; inspect generated normal and RemoteJudge pages for static classes, verify Temp routes are absent, and inspect CSS selectors for both theme modes.
- [ ] Review `git status --short` and confirm Temp drafts remain ignored while feature files are the only new tracked candidates.
