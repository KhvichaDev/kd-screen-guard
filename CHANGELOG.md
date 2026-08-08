# Changelog

All notable changes to this project will be documented in this file.

## [v1.1.0] - 2026-08-08 - v1.1.0 - Next-Level Security Upgrades (DOM Vault, Shadow DOM & Panic Lock)

## 🛡️ KD Screen Guard v1.1.0 - Next-Level Security Upgrades

We are excited to announce **v1.1.0**, introducing advanced, highly configurable anti-tampering and privacy protection features designed for high-security enterprise web applications.

### ✨ What's New in v1.1.0

- 🔒 **DOM Vault / Detachment (`enableDomVault` & `domVaultTarget`)**:
  Physically detaches target application DOM nodes into memory during locked state, eliminating DevTools Console DOM text inspection (`document.querySelector('main').innerText`).
- 🛡️ **Closed Shadow DOM Boundary (`useShadowDom`)**:
  Renders the lock screen overlay inside a `Closed` Shadow Root host (`attachShadow({ mode: 'closed' })`) to isolate overlay UI styles from host application CSS/JS tampering.
- ⚡ **Panic Lock on Blur (`lockOnBlur`)**:
  Triggers an instant screen lock whenever the browser window or tab loses focus.

### ⚙️ New Configuration Flags (`kd_ScreenGuardOptions`)

| Flag | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `enableDomVault` | `boolean` | `false` | Enable physical DOM content detachment during lock state. |
| `domVaultTarget` | `string \| HTMLElement` | `'main'` | Target selector or element to physically detach when DOM Vault is enabled. |
| `useShadowDom` | `boolean` | `false` | Render lock overlay inside a Closed Shadow DOM boundary. |
| `lockOnBlur` | `boolean` | `false` | Trigger instant lock when browser window/tab loses focus. |

### 🧪 Automated Testing
- Verified 100% test suite execution across 20 automated test cases (Suite 6 added for DOM Vault, Shadow DOM, and Panic Lock).

### 📦 Installation
```bash
npm install kd-screen-guard@1.1.0

## [v1.0.1] - 2026-07-25 - v1.0.1 - First Functional Release 🚀



