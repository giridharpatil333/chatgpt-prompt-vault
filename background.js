// ChatGPT Prompt Vault Background Service Worker
chrome.runtime.onInstalled.addListener(() => {
  // Initialize default prompt templates if none exist
  chrome.storage.sync.get(["promptTemplates"], (result) => {
    if (!result.promptTemplates || result.promptTemplates.length === 0) {
      const defaultTemplates = [
        {
          id: "tpl_1",
          title: "Code Review & Refactor",
          category: "Engineering",
          tags: ["code", "refactor", "review"],
          prompt: "Please review the following {language} code for performance, readability, edge-case bugs, and modern best practices:\n\n```{language}\n{code}\n```\n\nProvide actionable suggestions with refactored code snippets.",
          createdAt: new Date().toISOString()
        },
        {
          id: "tpl_2",
          title: "Explain Complex Concept Simply",
          category: "Learning",
          tags: ["explanation", "eli5"],
          prompt: "Explain {topic} in simple terms so that someone without a technical background can easily understand. Use real-world analogies, short bullet points, and key takeaways.",
          createdAt: new Date().toISOString()
        },
        {
          id: "tpl_3",
          title: "Bug Diagnostic & Root Cause Analysis",
          category: "Debugging",
          tags: ["bugs", "debugging", "stacktrace"],
          prompt: "I am encountering an error in my {framework} application. Here is the error log / stacktrace:\n\n```\n{stacktrace}\n```\n\nAnalyze the root cause, explain why this happens, and provide step-by-step instructions to resolve it.",
          createdAt: new Date().toISOString()
        },
        {
          id: "tpl_4",
          title: "PRD & Feature Specification Writer",
          category: "Product",
          tags: ["prd", "specification", "product"],
          prompt: "Act as a Senior Product Manager. Write a concise Product Requirement Document (PRD) for {feature_name}. Include: Executive Summary, Target User Persona, User Stories, Acceptance Criteria, and Potential Risks.",
          createdAt: new Date().toISOString()
        }
      ];
      chrome.storage.sync.set({ promptTemplates: defaultTemplates });
    }
  });

  // Create right-click context menu
  chrome.contextMenus.create({
    id: "save_to_prompt_vault",
    title: "Save Selection as ChatGPT Prompt Template",
    contexts: ["selection"]
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "save_to_prompt_vault" && info.selectionText) {
    const selectedText = info.selectionText.trim();
    chrome.storage.sync.get(["promptTemplates"], (result) => {
      const templates = result.promptTemplates || [];
      const newTpl = {
        id: "tpl_" + Date.now(),
        title: selectedText.slice(0, 30) + (selectedText.length > 30 ? "..." : ""),
        category: "Custom",
        tags: ["saved"],
        prompt: selectedText,
        createdAt: new Date().toISOString()
      };
      templates.unshift(newTpl);
      chrome.storage.sync.set({ promptTemplates: templates }, () => {
        // Send notification/message to active tab if available
        if (tab && tab.id) {
          chrome.tabs.sendMessage(tab.id, { type: "PROMPT_SAVED", template: newTpl });
        }
      });
    });
  }
});
