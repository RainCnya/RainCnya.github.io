'use strict';

const { createHash } = require('node:crypto');
const { load } = require('cheerio');
const INSTALLED = Symbol('framework stable headings');
const MARKER = 'data-ff2-heading';
const SELECTOR = 'h2,h3,h4,h5,h6';
const normalize = s => String(s).replace(/\s+/g, ' ').trim();
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const fail = message => { throw new Error('[FF2 stability] ' + message); };
const escapeAttribute = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function firstFree(base, used) {
  base = base || 'section';
  let id = base, suffix = 2;
  while (used.has(id)) id = `${base}-${suffix++}`;
  used.add(id);
  return id;
}

function rejectAuthorMarkerNodes($, stage, identity) {
  if ($(SELECTOR).filter(`[${MARKER}]`).length) {
    fail(`${MARKER} author namespace collision at ${stage}${identity ? ' (' + identity + ')' : ''}`);
  }
}

function assertNoAuthorHeadingMarkers(html, stage = 'HTML input', identity = '') {
  if (typeof html === 'string') rejectAuthorMarkerNodes(load(html, {}, false), stage, identity);
}

function installStableHeadings(md, options, slugize) {
  if (md[INSTALLED]) return;
  if (options.level !== 2 || options.permalink) fail('unsupported anchors configuration');
  md[INSTALLED] = true;
  md.core.ruler.push('framework_stable_headings', state => {
    const used = new Set();
    const reserve = tokens => {
      for (const token of tokens) {
        if (token.type === 'heading_open' && Number(token.tag.slice(1)) >= options.level && token.attrGet(MARKER) !== null) {
          fail(`${MARKER} author namespace collision at Markdown token input`);
        }
        const explicit = token.attrGet('id');
        if (explicit !== null) used.add(explicit);
        if (token.type === 'html_block' || token.type === 'html_inline') {
          const $ = load(token.content, {}, false);
          rejectAuthorMarkerNodes($, 'Markdown raw HTML input', state.env?.source || state.env?.path || '');
          $('[id]').each((_, n) => used.add($(n).attr('id')));
        }
        if (token.children) reserve(token.children);
      }
    };
    reserve(state.tokens);
    let ordinal = 0;
    for (let i = 0; i < state.tokens.length; i++) {
      const token = state.tokens[i];
      if (token.type !== 'heading_open' || Number(token.tag.slice(1)) < options.level) continue;
      if (token.attrGet('id') !== null) continue;
      const title = state.tokens[i + 1].children.reduce((acc, t) => acc + t.content, '');
      const id = firstFree(slugize(title, { transform: options.case, ...options }), used);
      token.attrSet('id', id);
      token.attrSet(MARKER, String(ordinal++));
    }
  });
  // The upstream rule owns a shared titleStore. Never call it again.
  md.renderer.rules.heading_open = (tokens, idx, opts, env, self) => self.renderToken(tokens, idx, opts);
}

function inspect(html, bodyOnly = false) {
  const $ = load(html, { sourceCodeLocationInfo: true }, false);
  const scope = bodyOnly ? $('.markdown-body') : $.root();
  if (bodyOnly && scope.length !== 1) fail('ordinary article must have one markdown-body');
  const all = scope.find(SELECTOR).toArray();
  const vector = all.map(n => [Number(n.tagName.slice(1)), normalize($(n).text())]);
  const generated = all.filter(n => $(n).attr(MARKER) !== undefined);
  const seen = new Set();
  for (const node of generated) {
    const marker = $(node).attr(MARKER);
    if (!/^\d+$/.test(marker) || seen.has(marker)) fail('duplicate or invalid marker (nested parse)');
    seen.add(marker);
  }
  // Markers on non-heading nodes are never valid ownership evidence.
  if (scope.find(`[${MARKER}]`).length !== generated.length) fail('marker on non-target node');
  return { $, scope, all, vector, generated };
}

function recordsFor(info) {
  const occurrences = new Map();
  return info.generated.map(node => {
    const bodyOrdinal = info.all.indexOf(node);
    const [level, normalizedText] = info.vector[bodyOrdinal];
    const key = JSON.stringify([level, normalizedText]);
    const repeatedTextOccurrence = (occurrences.get(key) || 0) + 1;
    occurrences.set(key, repeatedTextOccurrence);
    // Ordered heading neighborhood + full vector + occurrence bind repeated text
    // without freezing unrelated body prose, callout labels or math serialization.
    const contextDigest = digest([info.vector, bodyOrdinal, repeatedTextOccurrence, info.vector.slice(Math.max(0, bodyOrdinal - 1), bodyOrdinal + 2)]);
    return { bodyOrdinal, level, normalizedText, repeatedTextOccurrence, contextDigest };
  });
}

function validateLegacyRegistry(registry) {
  if (registry.schemaVersion !== 1 || !registry.baseline || !registry.documents) fail('invalid registry schema');
  const routes = new Set();
  for (const [source, record] of Object.entries(registry.documents)) {
    if (!source.startsWith('_posts/') || source.includes('\\') || source.split('/').includes('..')) fail('invalid source');
    if (!/^posts\/[^/]+\/index\.html$/.test(record.route) || routes.has(record.route)) fail('duplicate/invalid route');
    routes.add(record.route);
    if (!/^[a-f0-9]{64}$/.test(record.sourceSha256)) fail('missing source fingerprint');
    const ids = new Set();
    const fake = { all: record.headingVector.map((_, i) => i), vector: record.headingVector, generated: record.headings.map(h => h.bodyOrdinal) };
    const expected = recordsFor(fake);
    record.headings.forEach((h, i) => {
      if (i && h.bodyOrdinal <= record.headings[i - 1].bodyOrdinal) fail('non-increasing ordinal');
      if (JSON.stringify(expected[i]) !== JSON.stringify(Object.fromEntries(Object.keys(expected[i]).map(k => [k, h[k]])))) fail('registry heading context mismatch');
      if (!h.oldCanonicalId || ids.has(h.oldCanonicalId)) fail('duplicate/empty legacy canonical id');
      ids.add(h.oldCanonicalId);
    });
  }
  return registry;
}

function exportLegacyRegistry(acceptedDocuments, d2Proofs) {
  const registry = { schemaVersion: 1, baseline: d2Proofs.baseline, documents: {} };
  const byRoute = new Map();
  for (const doc of acceptedDocuments) {
    if (registry.documents[doc.source] || byRoute.has(doc.route)) fail('source/route not one-to-one');
    const fresh = inspect(doc.html);
    const old = inspect(doc.oldHtml, true);
    if (JSON.stringify(fresh.vector) !== JSON.stringify(old.vector)) fail('source/old body vector mismatch: ' + doc.source);
    const headings = recordsFor(fresh).map(h => ({ ...h, oldCanonicalId: old.$(old.all[h.bodyOrdinal]).attr('id') }));
    registry.documents[doc.source] = { route: doc.route, sourceSha256: doc.sourceSha256, headingVector: fresh.vector, headings };
    byRoute.set(doc.route, { doc, fresh, old });
  }
  const required = d2Proofs.mapping.map(p => ({ ...p, requiredId: p.oldId, newId: p.newHeading.id, text: p.oldHeading.text, tag: p.oldHeading.tag }))
    .concat(d2Proofs.cases.map(p => ({ ...p, requiredId: p.oldIdStillPresent, newId: p.mappedNewIdForOriginalHeading, text: p.oldHeading.text, tag: p.oldHeading.tag })));
  const keys = new Set();
  for (const proof of required) {
    const bound = byRoute.get(proof.page);
    if (!bound) fail('required route unbound: ' + proof.page);
    const matches = bound.old.all.filter(n => bound.old.$(n).attr('id') === proof.requiredId);
    if (matches.length !== 1) fail('required old id not unique');
    const ordinal = bound.old.all.indexOf(matches[0]);
    const heading = registry.documents[bound.doc.source].headings.find(h => h.bodyOrdinal === ordinal);
    const attempted = bound.attempted || (bound.attempted = inspect(bound.doc.attemptHtml, true));
    const next = attempted.all[ordinal];
    if (!heading || heading.oldCanonicalId !== proof.requiredId || matches[0].tagName !== proof.tag || heading.normalizedText !== normalize(proof.text)
        || !next || next.tagName !== proof.tag || normalize(attempted.$(next).text()) !== heading.normalizedText || attempted.$(next).attr('id') !== proof.newId) fail('required proof position mismatch: ' + proof.page + '#' + proof.requiredId);
    if (JSON.stringify(bound.old.vector) !== JSON.stringify(attempted.vector) || normalize(bound.old.scope.text()) !== normalize(attempted.scope.text())) fail('actual body evidence context mismatch');
    const key = proof.page + '#' + proof.requiredId;
    if (keys.has(key)) fail('duplicate required key');
    keys.add(key);
  }
  registry.requiredKeys = [...keys].sort();
  return validateLegacyRegistry(registry);
}

function canonicalRoute(value) {
  return String(value || '').replace(/^\//, '').replace(/\/$/, '/index.html');
}

function spliceIds(html, info, assignments) {
  const edits = [];
  for (const node of info.generated) {
    const attrs = node.sourceCodeLocation?.attrs;
    if (!attrs?.id || !attrs[MARKER]) fail('missing parse5 attribute source location');
    const id = assignments.get(node);
    if (id === undefined) fail('missing final id');
    edits.push({ ...attrs.id, value: `id="${escapeAttribute(id)}"` });
    edits.push({ ...attrs[MARKER], value: '' });
  }
  edits.sort((a, b) => b.startOffset - a.startOffset);
  for (const edit of edits) html = html.slice(0, edit.startOffset) + edit.value + html.slice(edit.endOffset);
  return html;
}

function finalizePostFields(data, legacyRecord) {
  if (typeof data.content !== 'string') return data;
  if (legacyRecord && canonicalRoute(data.path) !== legacyRecord.route) fail('runtime route mismatch');
  const full = inspect(data.content);
  if (!full.generated.length) {
    if (legacyRecord) {
      // Already-finalized data is valid only if its entire stored vector/IDs agree.
      if (JSON.stringify(full.vector) !== JSON.stringify(legacyRecord.headingVector) || legacyRecord.headings.some(h => full.$(full.all[h.bodyOrdinal]).attr('id') !== h.oldCanonicalId)) fail('unmarked legacy content mismatch');
    }
    for (const field of ['excerpt', 'more']) if (typeof data[field] === 'string' && inspect(data[field]).generated.length) fail('orphan fragment marker');
    return data;
  }
  const records = recordsFor(full);
  if (legacyRecord) {
    if (JSON.stringify(full.vector) !== JSON.stringify(legacyRecord.headingVector) || records.length !== legacyRecord.headings.length) fail('runtime heading vector mismatch');
    records.forEach((h, i) => { for (const k of Object.keys(h)) if (h[k] !== legacyRecord.headings[i][k]) fail('runtime context mismatch'); });
  }
  const used = new Set();
  const generatedSet = new Set(full.generated);
  full.scope.find('[id]').each((_, n) => {
    if (!generatedSet.has(n)) {
      const id = full.$(n).attr('id');
      if (used.has(id)) fail('duplicate non-target id: ' + id);
      used.add(id);
    }
  });
  const final = new Map();
  full.generated.forEach((n, i) => {
    let id;
    if (legacyRecord) {
      id = legacyRecord.headings[i].oldCanonicalId;
      if (used.has(id)) fail('legacy/non-target collision: ' + id);
      used.add(id);
    } else id = firstFree(full.$(n).attr('id'), used);
    final.set(n, id);
  });
  const markerVector = full.generated.map(n => [full.$(n).attr(MARKER), n.tagName, normalize(full.$(n).text())]);
  const result = { content: spliceIds(data.content, full, final) };
  for (const field of ['excerpt', 'more']) {
    if (typeof data[field] !== 'string') continue;
    const fragment = inspect(data[field]);
    if (!fragment.generated.length) { result[field] = data[field]; continue; }
    const vector = fragment.generated.map(n => [fragment.$(n).attr(MARKER), n.tagName, normalize(fragment.$(n).text())]);
    const candidates = [];
    for (let start = 0; start + vector.length <= markerVector.length; start++) {
      if (JSON.stringify(markerVector.slice(start, start + vector.length)) === JSON.stringify(vector)) candidates.push(start);
    }
    if (candidates.length !== 1) fail('fragment cannot uniquely align: ' + field);
    const assignments = new Map(fragment.generated.map((n, i) => [n, final.get(full.generated[candidates[0] + i])]));
    result[field] = spliceIds(data[field], fragment, assignments);
  }
  Object.assign(data, result);
  return data;
}

module.exports = { installStableHeadings, finalizePostFields, exportLegacyRegistry, validateLegacyRegistry, assertNoAuthorHeadingMarkers };
