#!/usr/bin/env node
"use strict";

/**
 * Hexo site validator
 *
 * Source checks:
 * - missing Front Matter
 * - missing title / date / abbrlink
 * - duplicate abbrlink
 * - missing local image files
 *
 * Generated-site checks:
 * - public/index.html and public/CNAME
 * - residual example.com
 * - unresolved ![[...]]
 * - generated links still pointing to .md
 * - missing local <img> resources
 *
 * Run after `hexo generate`.
 */

const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SOURCE_DIR = path.join(ROOT, "source");
const POSTS_DIR = path.join(SOURCE_DIR, "_posts");
const PUBLIC_DIR = path.join(ROOT, "public");

const errors = [];
const warnings = [];

let postCount = 0;
let htmlCount = 0;
let checkedImageCount = 0;

function relative(filePath) {
  return path.relative(ROOT, filePath).replace(/\\/g, "/");
}

function addError(message) {
  errors.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

function exists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function walkFiles(dir, predicate = () => true) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const result = [];
  const stack = [dir];

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);

      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (entry.isFile() && predicate(fullPath)) {
        result.push(fullPath);
      }
    }
  }

  return result.sort();
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function parseFrontMatter(markdown) {
  const match = markdown.match(
    /^(?:\uFEFF)?---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/
  );

  if (!match) {
    return null;
  }

  return match[1];
}

function readFrontMatterScalar(frontMatter, key) {
  if (!frontMatter) {
    return "";
  }

  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`^${escapedKey}:[ \\t]*(.*)$`, "m");
  const match = frontMatter.match(pattern);

  if (!match) {
    return "";
  }

  let value = match[1].trim();

  if (
    value.length >= 2 &&
    ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'")))
  ) {
    value = value.slice(1, -1);
  } else {
    value = value.replace(/[ \t]+#.*$/, "").trim();
  }

  return value.trim();
}

function normalizeReference(rawReference) {
  if (!rawReference) {
    return "";
  }

  let reference = String(rawReference)
    .trim()
    .replace(/^<|>$/g, "")
    .replace(/&amp;/g, "&");

  reference = reference.split("#")[0].split("?")[0];

  try {
    reference = decodeURIComponent(reference);
  } catch {
    // Keep the original reference when it is not valid URI encoding.
  }

  return reference.replace(/\\/g, "/");
}

function isExternalReference(reference) {
  return (
    !reference ||
    reference.startsWith("#") ||
    reference.startsWith("//") ||
    /^[a-z][a-z0-9+.-]*:/i.test(reference)
  );
}

function extractSourceImageReferences(markdown, frontMatter) {
  const references = new Set();

  const markdownImagePattern =
    /!\[[^\]]*]\(\s*(?:<([^>]+)>|([^\s)]+))(?:\s+["'][^"']*["'])?\s*\)/g;

  for (const match of markdown.matchAll(markdownImagePattern)) {
    references.add(match[1] || match[2]);
  }

  const htmlImagePattern =
    /<img\b[^>]*?\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi;

  for (const match of markdown.matchAll(htmlImagePattern)) {
    references.add(match[1]);
  }

  for (const key of ["banner_img", "index_img"]) {
    const value = readFrontMatterScalar(frontMatter, key);
    if (value) {
      references.add(value);
    }
  }

  return [...references];
}

function sourceImageExists(markdownFile, rawReference) {
  const reference = normalizeReference(rawReference);

  if (isExternalReference(reference)) {
    return true;
  }

  const cleanReference = reference.replace(/^\/+/, "");
  const candidates = [];

  if (reference.startsWith("/")) {
    candidates.push(path.join(PUBLIC_DIR, cleanReference));
    candidates.push(path.join(SOURCE_DIR, cleanReference));
  } else {
    candidates.push(path.resolve(path.dirname(markdownFile), reference));
    candidates.push(path.resolve(SOURCE_DIR, reference));
    candidates.push(path.resolve(PUBLIC_DIR, reference));
  }

  return candidates.some(exists);
}

function removeCodeContainers(html) {
  return html
    .replace(/<pre\b[\s\S]*?<\/pre>/gi, "")
    .replace(/<code\b[\s\S]*?<\/code>/gi, "");
}

function extractHtmlImageReferences(html) {
  const references = new Set();
  const pattern =
    /<img\b[^>]*?\b(?:src|data-src)\s*=\s*["']([^"']+)["'][^>]*>/gi;

  for (const match of html.matchAll(pattern)) {
    references.add(match[1]);
  }

  return [...references];
}

function publicImageExists(htmlFile, rawReference) {
  const reference = normalizeReference(rawReference);

  if (isExternalReference(reference)) {
    return true;
  }

  const cleanReference = reference.replace(/^\/+/, "");
  const candidates = [];

  if (reference.startsWith("/")) {
    candidates.push(path.join(PUBLIC_DIR, cleanReference));
  } else {
    candidates.push(path.resolve(path.dirname(htmlFile), reference));
    candidates.push(path.resolve(PUBLIC_DIR, reference));
  }

  return candidates.some(exists);
}

function checkSourcePosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    addError("Missing source/_posts directory.");
    return;
  }

  const markdownFiles = walkFiles(
    POSTS_DIR,
    (filePath) => path.extname(filePath).toLowerCase() === ".md"
  );

  postCount = markdownFiles.length;
  const abbrlinks = new Map();

  for (const filePath of markdownFiles) {
    const markdown = readText(filePath);
    const frontMatter = parseFrontMatter(markdown);
    const displayPath = relative(filePath);

    if (!frontMatter) {
      addError(`${displayPath}: missing Front Matter.`);
      continue;
    }

    const title = readFrontMatterScalar(frontMatter, "title");
    const date = readFrontMatterScalar(frontMatter, "date");
    const abbrlink = readFrontMatterScalar(frontMatter, "abbrlink");

    if (!title) {
      addError(`${displayPath}: missing title.`);
    }

    if (!date) {
      addError(`${displayPath}: missing date.`);
    }

    if (!abbrlink) {
      addError(`${displayPath}: missing abbrlink.`);
    } else {
      if (!abbrlinks.has(abbrlink)) {
        abbrlinks.set(abbrlink, []);
      }
      abbrlinks.get(abbrlink).push(displayPath);
    }

    for (const imageReference of extractSourceImageReferences(
      markdown,
      frontMatter
    )) {
      checkedImageCount++;

      if (!sourceImageExists(filePath, imageReference)) {
        addError(
          `${displayPath}: local image not found: ${imageReference}`
        );
      }
    }
  }

  for (const [abbrlink, files] of abbrlinks.entries()) {
    if (files.length > 1) {
      addError(
        `Duplicate abbrlink "${abbrlink}":\n    ${files.join("\n    ")}`
      );
    }
  }
}

function checkGeneratedSite() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    addError("Missing public directory. Run Hexo generate first.");
    return;
  }

  for (const requiredFile of ["index.html", "CNAME"]) {
    const fullPath = path.join(PUBLIC_DIR, requiredFile);

    if (!exists(fullPath)) {
      addError(`Missing generated file: public/${requiredFile}`);
    }
  }

  const htmlFiles = walkFiles(
    PUBLIC_DIR,
    (filePath) => path.extname(filePath).toLowerCase() === ".html"
  );

  htmlCount = htmlFiles.length;

  for (const filePath of htmlFiles) {
    const html = readText(filePath);
    const displayPath = relative(filePath);

    const $ = cheerio.load(html, {
      decodeEntities: false,
    });

    $("script, style, pre, code").remove();

    const visibleText = $("body").text();
    const content = $.html();

    if (/https?:\/\/example\.com\b/i.test(content)) {
      addError(`${displayPath}: contains example.com.`);
    }

    const normalizedPath = relative(filePath);

    const isPostPage =
      normalizedPath.startsWith("public/posts/") &&
      normalizedPath.endsWith("/index.html");

    if (
      isPostPage &&
      /!\[\[[^\]]+]]/.test(visibleText)
    ) {
      addWarning(
        `${displayPath}: contains retained ![[...]] fallback text; verify the embed visually.`
      );
    }

    const markdownHrefPattern =
      /\bhref\s*=\s*["']([^"']+\.md(?:[?#][^"']*)?)["']/gi;

    for (const match of content.matchAll(markdownHrefPattern)) {
      addError(
        `${displayPath}: generated link still points to Markdown: ${match[1]}`
      );
    }

    for (const imageReference of extractHtmlImageReferences(content)) {
      checkedImageCount++;

      if (!publicImageExists(filePath, imageReference)) {
        addError(
          `${displayPath}: generated image not found: ${imageReference}`
        );
      }
    }
  }
}

function printMessages(title, messages) {
  if (messages.length === 0) {
    return;
  }

  console.log(`\n${title}`);

  for (const message of messages) {
    console.log(`- ${message}`);
  }
}

function main() {
  console.log("Checking Hexo source and generated site...");

  checkSourcePosts();
  checkGeneratedSite();

  printMessages("Warnings", warnings);
  printMessages("Errors", errors);

  console.log("\nSummary");
  console.log(`- Posts checked: ${postCount}`);
  console.log(`- HTML files checked: ${htmlCount}`);
  console.log(`- Image references checked: ${checkedImageCount}`);
  console.log(`- Warnings: ${warnings.length}`);
  console.log(`- Errors: ${errors.length}`);

  if (errors.length > 0) {
    console.error("\nSite validation failed.");
    process.exitCode = 1;
    return;
  }

  console.log("\nSite validation passed.");
}

main();
