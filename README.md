# ⚡ ChatGPT Prompt Vault & Web Clipper

[![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green.svg)](https://chrome.google.com)
[![Privacy: 100% Local](https://img.shields.io/badge/Privacy-100%25%20Local-brightgreen.svg)](#privacy--security)

A powerful, high-utility Chrome Extension (Manifest V3) for developers, researchers, prompters, and power users to store, search, and 1-click inject reusable prompt templates with dynamic `{variable}` placeholders directly into ChatGPT (`chatgpt.com`). Includes right-click web clipping!

---

## 📸 Interface Preview

```
┌────────────────────────────────────────────────────────────────────────┐
│ ChatGPT - New Chat                                      [⚡ Prompt Vault]│
├──────────────────────────────────────────────────┬─────────────────────┤
│                                                  │ ⚡ PROMPT VAULT     │
│  User: What are microservices?                   │ ─────────────────── │
│  ChatGPT: Microservices architecture is...       │ 🔍 Search templates │
│                                                  │ 📌 Saved Templates: │
│                                                  │ • [Code Reviewer]   │
│                                                  │ • [Bug Explainer]   │
│                                                  │ • [SQL Generator]   │
│                                                  │ ─────────────────── │
│ [ Enter prompt with {language} or {topic} ]      │ [+ New Template]    │
└──────────────────────────────────────────────────┴─────────────────────┘
```

---

## 🌟 Key Features

- ⚡ **1-Click Prompt Drawer**: Floating trigger button injected directly into `chatgpt.com`.
- 🎯 **Dynamic `{variable}` Placeholders**: Embed placeholders like `{code_snippet}` or `{target_audience}` into templates. When clicked, an input modal opens to populate values before pasting.
- 🖱️ **Right-Click Web Clipper**: Highlight text on any website, right-click, and select *"Save Selection to ChatGPT Prompt Vault"*.
- 🔍 **Instant Search & Tagging**: Filter prompt templates by title, tag, or category in real-time.
- ☁️ **Chrome Storage Sync**: Automatically syncs your template library across all your Chrome browsers.
- 🎨 **Glassmorphism Dark Theme**: Sleek UI designed to match modern AI dark interfaces.

---

## 🚀 Easy Installation Guide

### Option 1: 1-Click Download (Recommended)
1. Download [**chatgpt-prompt-vault-v1.0.0.zip**](./chatgpt-prompt-vault-v1.0.0.zip).
2. Extract the unzipped folder on your machine.
3. Open Google Chrome and go to `chrome://extensions`.
4. Turn ON **Developer mode** in the top-right corner.
5. Click **Load unpacked** and select the unzipped directory.

### Option 2: Clone via Git
```bash
git clone https://github.com/giridharpatil333/chatgpt-prompt-vault.git
```
Then load the cloned folder in `chrome://extensions`.

---

## 💡 How to Use

1. Open [ChatGPT](https://chatgpt.com).
2. Click the floating ⚡ button or click the extension icon in your Chrome toolbar.
3. Select any saved prompt. If it contains placeholders like `{topic}`, fill in the pop-up fields and click **Insert into Chat**!

---

## 🔒 Privacy & Security

Your prompts and web clips are stored locally using `chrome.storage.sync` within your own Google Chrome profile. No external servers or analytics trackers are used.

---

## 📜 License

MIT License © [Giridhar Patil](https://github.com/giridharpatil333).

