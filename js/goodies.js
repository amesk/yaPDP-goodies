(() => {
  "use strict";
  const RAW = "https://raw.githubusercontent.com/amesk/yaPDP-goodies/main/";
  const $ = (selector) => document.querySelector(selector);
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[ch]);

  function itemCard(item) {
    const image = item.preview
      ? `<img src="${escapeHtml(RAW + item.preview)}" alt="" loading="lazy">`
      : `<span class="image-placeholder" aria-hidden="true">${item.type === "disk" ? "▤" : "◈"}</span>`;
    const actions = (item.actions || []).map((action) =>
      `<a class="card-action ${action.primary ? "primary" : ""}" href="${escapeHtml(action.url)}" ${action.external ? 'target="_blank" rel="noopener noreferrer"' : ""}>${escapeHtml(action.label)}</a>`
    ).join("");
    return `<article class="item-card">
      <div class="item-image">${image}</div>
      <div class="item-body">
        <span class="item-type">${escapeHtml(item.kicker || item.type)}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
        <div class="item-meta">${escapeHtml(item.meta || "")}</div>
        <div class="card-actions">${actions}</div>
      </div>
    </article>`;
  }

  function renderItems(items) {
    const states = items.filter((item) => item.type === "state");
    const disks = items.filter((item) => item.type === "disk");
    $("#state-grid").innerHTML = states.length ? states.map(itemCard).join("") : '<p class="empty-state">No saved states have been published yet.</p>';
    $("#disk-grid").innerHTML = disks.length ? disks.map(itemCard).join("") : '<p class="empty-state">No disk images have been published yet.</p>';
    document.querySelector('[data-count="state"]').textContent = String(states.length).padStart(2, "0");
    document.querySelector('[data-count="disk"]').textContent = String(disks.length).padStart(2, "0");
  }

  let documentation = [];
  function renderDocs() {
    const query = $("#doc-search").value.trim().toLowerCase();
    const category = $("#doc-category").value;
    const filtered = documentation.filter((doc) => {
      const text = [doc.title, doc.year, doc.category, ...(doc.models || []), ...(doc.systems || [])].join(" ").toLowerCase();
      return (!query || text.includes(query)) && (category === "all" || doc.category === category);
    });
    $("#documentation-list").innerHTML = filtered.length ? filtered.map((doc) => {
      const details = [doc.publisher, ...(doc.models || []), ...(doc.systems || [])].filter(Boolean).join(" · ");
      const url = doc.source_url || doc.pcjs_url || "https://www.pcjs.org/machines/dec/pdp11/";
      return `<article class="doc-row">
        <div class="doc-year">${escapeHtml(doc.year || "—")}</div>
        <div><div class="doc-title">${escapeHtml(doc.title)}</div><div class="doc-subtitle">${escapeHtml(details || doc.category || "PDP-11 reference")}</div></div>
        <a class="doc-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">VIEW SOURCE ↗</a>
      </article>`;
    }).join("") : '<p class="empty-state">No documents match this search.</p>';
    document.querySelector('[data-count="documentation"]').textContent = String(documentation.length).padStart(2, "0");
  }

  async function init() {
    try {
      const response = await fetch("catalog.json");
      if (!response.ok) throw new Error("Could not load catalogue");
      const catalogue = await response.json();
      renderItems(catalogue.items || []);
    } catch (error) {
      $("#state-grid").innerHTML = '<p class="empty-state">The catalogue could not be loaded. Please try again later.</p>';
      $("#disk-grid").innerHTML = "";
      console.error(error);
    }
    try {
      const response = await fetch("documentation/catalog.json");
      if (!response.ok) throw new Error("Could not load documentation references");
      const catalogue = await response.json();
      documentation = catalogue.items || [];
      renderDocs();
    } catch (error) {
      $("#documentation-list").innerHTML = '<p class="empty-state">Documentation references could not be loaded.</p>';
      console.error(error);
    }
  }
  $("#doc-search").addEventListener("input", renderDocs);
  $("#doc-category").addEventListener("change", renderDocs);
  init();
})();