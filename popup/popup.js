// ChatGPT Prompt Vault Popup Logic
document.addEventListener("DOMContentLoaded", () => {
  const btnToggleAdd = document.getElementById("btn-toggle-add");
  const btnCancelAdd = document.getElementById("btn-cancel-add");
  const btnSaveTpl = document.getElementById("btn-save-tpl");
  const addForm = document.getElementById("add-form");
  const inpTitle = document.getElementById("inp-title");
  const inpCat = document.getElementById("inp-cat");
  const inpPrompt = document.getElementById("inp-prompt");
  const inpSearch = document.getElementById("inp-search");
  const tplList = document.getElementById("tpl-list");

  let templates = [];

  function loadTemplates() {
    chrome.storage.sync.get(["promptTemplates"], (res) => {
      templates = res.promptTemplates || [];
      renderList(templates);
    });
  }

  function renderList(items) {
    if (items.length === 0) {
      tplList.innerHTML = `<div style="text-align:center; color:#737373; padding:20px 0; font-size:12px;">No templates found.</div>`;
      return;
    }

    tplList.innerHTML = items.map(t => `
      <div class="item">
        <div class="item-header">
          <span>${escapeHtml(t.title)}</span>
          <span class="item-cat">${escapeHtml(t.category || "General")}</span>
        </div>
        <div class="item-prompt">${escapeHtml(t.prompt)}</div>
        <div class="item-actions">
          <button class="btn-icon btn-del" data-id="${t.id}">Delete</button>
        </div>
      </div>
    `).join("");

    tplList.querySelectorAll(".btn-del").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        deleteTemplate(id);
      });
    });
  }

  function deleteTemplate(id) {
    templates = templates.filter(t => t.id !== id);
    chrome.storage.sync.set({ promptTemplates: templates }, () => {
      loadTemplates();
    });
  }

  btnToggleAdd.addEventListener("click", () => {
    addForm.classList.toggle("active");
    inpTitle.focus();
  });

  btnCancelAdd.addEventListener("click", () => {
    addForm.classList.remove("active");
  });

  btnSaveTpl.addEventListener("click", () => {
    const title = inpTitle.value.trim();
    const category = inpCat.value.trim() || "Custom";
    const prompt = inpPrompt.value.trim();

    if (!title || !prompt) {
      alert("Please fill in both title and prompt body.");
      return;
    }

    const newTpl = {
      id: "tpl_" + Date.now(),
      title,
      category,
      prompt,
      createdAt: new Date().toISOString()
    };

    templates.unshift(newTpl);
    chrome.storage.sync.set({ promptTemplates: templates }, () => {
      inpTitle.value = "";
      inpCat.value = "";
      inpPrompt.value = "";
      addForm.classList.remove("active");
      loadTemplates();
    });
  });

  inpSearch.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().trim();
    const filtered = templates.filter(t => 
      t.title.toLowerCase().includes(q) ||
      t.prompt.toLowerCase().includes(q) ||
      (t.category && t.category.toLowerCase().includes(q))
    );
    renderList(filtered);
  });

  function escapeHtml(str) {
    return (str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  loadTemplates();
});
