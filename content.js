// ChatGPT Prompt Vault Content Script
(function () {
  let templates = [];

  // Load templates from sync storage
  function loadTemplates() {
    chrome.storage.sync.get(["promptTemplates"], (res) => {
      templates = res.promptTemplates || [];
      renderTemplatesList(templates);
    });
  }

  // Create floating launcher UI
  function initUI() {
    if (document.getElementById("cpv-root")) return;

    const root = document.createElement("div");
    root.id = "cpv-root";
    root.innerHTML = `
      <button class="cpv-floating-btn" id="cpv-trigger-btn" title="Open ChatGPT Prompt Vault">⚡</button>
      <div class="cpv-drawer-overlay" id="cpv-overlay">
        <div class="cpv-drawer">
          <div class="cpv-header">
            <div class="cpv-title">⚡ Prompt Vault</div>
            <button class="cpv-close-btn" id="cpv-close-btn">&times;</button>
          </div>
          <div class="cpv-search-bar">
            <input type="text" class="cpv-input" id="cpv-search-input" placeholder="Search templates by keyword or tag..." />
          </div>
          <div class="cpv-list" id="cpv-list"></div>
        </div>
      </div>
    `;
    document.body.appendChild(root);

    // Event listeners
    const overlay = document.getElementById("cpv-overlay");
    const triggerBtn = document.getElementById("cpv-trigger-btn");
    const closeBtn = document.getElementById("cpv-close-btn");
    const searchInput = document.getElementById("cpv-search-input");

    triggerBtn.addEventListener("click", () => {
      loadTemplates();
      overlay.classList.add("cpv-open");
      searchInput.focus();
    });

    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("cpv-open");
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("cpv-open");
      }
    });

    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = templates.filter(t => 
        t.title.toLowerCase().includes(q) ||
        t.prompt.toLowerCase().includes(q) ||
        (t.category && t.category.toLowerCase().includes(q)) ||
        (t.tags && t.tags.some(tag => tag.toLowerCase().includes(q)))
      );
      renderTemplatesList(filtered);
    });
  }

  // Render templates inside drawer
  function renderTemplatesList(items) {
    const listEl = document.getElementById("cpv-list");
    if (!listEl) return;

    if (items.length === 0) {
      listEl.innerHTML = `<div style="text-align:center; color:#737373; margin-top:20px; font-size:13px;">No templates found. Add one via popup!</div>`;
      return;
    }

    listEl.innerHTML = items.map(t => `
      <div class="cpv-card" data-id="${t.id}">
        <div class="cpv-card-title">
          <span>${escapeHtml(t.title)}</span>
          <span class="cpv-card-cat">${escapeHtml(t.category || "General")}</span>
        </div>
        <div class="cpv-card-body">${escapeHtml(t.prompt)}</div>
        <div class="cpv-card-actions">
          <button class="cpv-btn-inject" data-id="${t.id}">Inject Prompt &rarr;</button>
        </div>
      </div>
    `).join("");

    // Attach inject button events
    listEl.querySelectorAll(".cpv-btn-inject").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        const tpl = templates.find(t => t.id === id);
        if (tpl) {
          injectPromptIntoChatGPT(tpl.prompt);
          document.getElementById("cpv-overlay").classList.remove("cpv-open");
        }
      });
    });
  }

  // Inject prompt into ChatGPT's contenteditable / textarea prompt box
  function injectPromptIntoChatGPT(promptText) {
    const inputEl = document.querySelector("#prompt-textarea, textarea[placeholder*='Message'], div[contenteditable='true']");
    if (!inputEl) {
      alert("Could not locate ChatGPT prompt box.");
      return;
    }

    if (inputEl.tagName === "TEXTAREA" || inputEl.tagName === "INPUT") {
      inputEl.value = promptText;
      inputEl.dispatchEvent(new Event("input", { bubbles: true }));
    } else {
      inputEl.innerHTML = `<p>${escapeHtml(promptText)}</p>`;
      inputEl.dispatchEvent(new Event("input", { bubbles: true }));
    }
    inputEl.focus();
  }

  function escapeHtml(str) {
    return (str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // Initialize script
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initUI);
  } else {
    initUI();
  }

  // Listen for background notifications
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "PROMPT_SAVED") {
      loadTemplates();
    }
  });
})();
