(() => {
  "use strict";
  const RAW = "https://raw.githubusercontent.com/amesk/yaPDP-goodies/master/";
  const $ = (s) => document.querySelector(s);
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function itemCard(item) {
    const image = item.preview ? `<img src="${esc(RAW+item.preview)}" alt="" loading="lazy">` : `<span class="image-placeholder" aria-hidden="true">${item.type==="disk"?"▤":"◈"}</span>`;
    const notes=(item.actions||[]).find(a=>a.url&&a.url.endsWith(".md"));
    const detail=item.page||(notes?`${notes.url.slice(0,notes.url.lastIndexOf("/"))}/`:null);
    const actions=(item.actions||[]).filter(a=>!a.url.endsWith(".md")).map(a=>`<a class="card-action ${a.primary?"primary":""}" href="${esc(a.url)}" ${a.external?'target="_blank" rel="noopener noreferrer"':""}>${esc(a.label)}</a>`).join("");
    return `<article class="item-card"><div class="item-image">${image}</div><div class="item-body"><span class="item-type">${esc(item.kicker||item.type)}</span><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p><div class="item-meta">${esc(item.meta||"")}</div><div class="card-actions">${actions}${detail?`<a class="card-action" href="${esc(detail)}">ITEM NOTES ↗</a>`:""}</div></div></article>`;
  }
  function renderItems(items) {
    const states=items.filter(i=>i.type==="state"),disks=items.filter(i=>i.type==="disk");
    $("#state-grid").innerHTML=states.length?states.map(itemCard).join(""):'<p class="empty-state">No saved states have been published yet.</p>';
    $("#disk-grid").innerHTML=disks.length?disks.map(itemCard).join(""):'<p class="empty-state">No disk images have been published yet.</p>';
    document.querySelector('[data-count="state"]').textContent=String(states.length).padStart(2,"0");
    document.querySelector('[data-count="disk"]').textContent=String(disks.length).padStart(2,"0");
  }
  let documentation=[];
  function renderDocs() {
    const q=$("#doc-search").value.trim().toLowerCase(),category=$("#doc-category").value;
    const filtered=documentation.filter(d=>{
      const hay=[d.title,d.year,d.category,d.document_number,d.summary,d.source,...(d.models||[]),...(d.systems||[]),...(d.topics||[])].join(" ").toLowerCase();
      return (!q||hay.includes(q))&&(category==="all"||d.category===category);
    });
    $("#documentation-list").innerHTML=filtered.length?filtered.map(d=>{
      const meta=[d.year,d.document_number,...(d.models||[]),...(d.systems||[])].filter(Boolean).join(" · ");
      const tags=(d.topics||[]).slice(0,6).map(t=>`<span class="doc-tag">${esc(t)}</span>`).join("");
      return `<article class="doc-row"><div class="doc-year">${esc(d.year||"—")}</div><div class="doc-main"><div class="doc-title">${esc(d.title)}</div><div class="doc-subtitle">${esc(meta)} · ${esc(d.source||"Archive")}</div><p class="doc-summary">${esc(d.summary||"")}</p><div class="doc-tags">${tags}</div></div><a class="doc-link" href="${esc(d.source_url||d.pcjs_url||"#")}" target="_blank" rel="noopener noreferrer">OPEN PDF ↗</a></article>`;
    }).join(""):'<p class="empty-state">No documents match this search.</p>';
    document.querySelector('[data-count="documentation"]').textContent=String(documentation.length).padStart(2,"0");
  }
  function initCarousels(){document.querySelectorAll("[data-scroll]").forEach(b=>b.addEventListener("click",()=>{const t=document.getElementById(b.dataset.scroll);if(!t)return;const c=t.querySelector(".item-card");t.scrollBy({left:Number(b.dataset.direction||1)*(c?c.getBoundingClientRect().width+16:t.clientWidth*.8),behavior:"smooth"});}));}
  async function init(){
    try{const r=await fetch("catalog.json");if(!r.ok)throw Error("catalog");renderItems((await r.json()).items||[]);}catch(e){$("#state-grid").innerHTML='<p class="empty-state">The catalogue could not be loaded.</p>';$("#disk-grid").innerHTML="";console.error(e);}
    try{const r=await fetch("documentation/catalog.json");if(!r.ok)throw Error("documentation");documentation=(await r.json()).items||[];renderDocs();}catch(e){$("#documentation-list").innerHTML='<p class="empty-state">Documentation references could not be loaded.</p>';console.error(e);}
  }
  initCarousels();$("#doc-search").addEventListener("input",renderDocs);$("#doc-category").addEventListener("change",renderDocs);init();
})();
