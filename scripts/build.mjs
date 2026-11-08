import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "_site");
const CATALOG = path.join(ROOT, "catalog.json");

const excluded = new Set([".git", "node_modules", "_site", ".github", "scripts", "package.json", "package-lock.json"]);
const html = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[char]);

async function copySiteFiles() {
  await fs.rm(OUT, { recursive: true, force: true });
  await fs.mkdir(OUT, { recursive: true });
  for (const entry of await fs.readdir(ROOT, { withFileTypes: true })) {
    if (excluded.has(entry.name)) continue;
    await fs.cp(path.join(ROOT, entry.name), path.join(OUT, entry.name), { recursive: true });
  }
  await fs.writeFile(path.join(OUT, ".nojekyll"), "");
}

function pageTemplate({ title, kicker, description, preview, actions, content, depth = 2 }) {
  const root = "../".repeat(depth);
  const actionMarkup = actions.map((action) =>
    `<a class="button ${action.primary ? "button-primary" : "button-quiet"}" href="${html(action.url)}" ${action.external ? 'target="_blank" rel="noopener noreferrer"' : ""}>${html(action.label)}</a>`
  ).join("");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${html(description)}">
  <title>${html(title)} — yaPDP Goodies</title>
  <link rel="icon" href="https://amesk.github.io/yaPDP/favicon.ico">
  <link rel="stylesheet" href="${root}css/goodies.css">
</head>
<body class="detail-page">
  <header class="site-header">
    <a class="brand" href="${root}" aria-label="yaPDP Goodies home">
      <span class="brand-mark">yaPDP</span>
      <span class="brand-copy"><strong>GOODIES</strong><small>THE PDP-11 COLLECTION</small></span>
    </a>
    <nav class="top-nav" aria-label="Main navigation">
      <a href="${root}#states">States</a><a href="${root}#disks">Disk images</a><a href="${root}#documentation">Documentation</a>
    </nav>
    <a class="emulator-link" href="https://amesk.github.io/yaPDP/pdp11.html">OPEN EMULATOR ↗</a>
  </header>
  <main class="page-shell detail-shell">
    <a class="back-link" href="${root}#collection">← BACK TO COLLECTION</a>
    <section class="detail-hero">
      <div class="detail-copy">
        <p class="eyebrow">${html(kicker)}</p>
        <h1>${html(title)}</h1>
        <p class="hero-copy">${html(description)}</p>
        <div class="hero-actions">${actionMarkup}</div>
      </div>
      ${preview ? `<a class="detail-preview" href="${html(preview)}" target="_blank" rel="noopener noreferrer"><img src="${html(preview)}" alt="Preview: ${html(title)}"></a>` : ""}
    </section>
    <article class="markdown-content">${content}</article>
    <div class="detail-bottom"><a class="text-link" href="${root}#collection">← Return to the collection</a><a class="text-link" href="https://github.com/amesk/yaPDP-goodies">View source on GitHub ↗</a></div>
  </main>
  <footer class="site-footer"><a href="https://github.com/amesk/yaPDP-goodies">yaPDP-goodies on GitHub</a><span>Made for curious operators.</span><a href="https://amesk.github.io/yaPDP/pdp11.html">Return to yaPDP ↗</a></footer>
</body>
</html>`;
}

async function buildItemPage(item) {
  const readmeAction = (item.actions || []).find((action) => typeof action.url === "string" && action.url.endsWith(".md"));
  if (!readmeAction) return;
  const readmePath = path.resolve(ROOT, readmeAction.url);
  if (!readmePath.startsWith(ROOT + path.sep)) throw new Error(`README path escapes repository: ${readmeAction.url}`);
  const markdown = await fs.readFile(readmePath, "utf8");
  const cleaned = markdown
    .replace(/^\[▶ \*\*Launch this demonstration in yaPDP\*\*\][^\n]*\n+/m, "")
    .replace(/^!\[[^\]]*\]\([^\n]*\)\s*\n*/m, "");
  const folder = path.dirname(readmeAction.url);
  const outputDir = path.join(OUT, folder);
  await fs.mkdir(outputDir, { recursive: true });
  const preview = item.preview ? `../../${item.preview}` : "";
  const actions = (item.actions || []).filter((action) => !action.url.endsWith(".md"));
  const page = pageTemplate({
    title: item.title,
    kicker: item.kicker || item.type,
    description: item.description || "",
    preview,
    actions,
    content: marked.parse(cleaned),
    depth: folder.split("/").length
  });
  await fs.writeFile(path.join(outputDir, "index.html"), page);
}

async function main() {
  await copySiteFiles();
  const catalogue = JSON.parse(await fs.readFile(CATALOG, "utf8"));
  for (const item of catalogue.items || []) await buildItemPage(item);
  console.log(`Built yaPDP Goodies into ${OUT}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
