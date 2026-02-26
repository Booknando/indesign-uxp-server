# Quick Task 001: Build Phase 1 — InDesign UXP Plugin + Bridge Server

**Date:** 2026-02-26
**Mode:** quick
**Goal:** Create minimal UXP plugin and WebSocket bridge server for InDesign, with step-by-step verification instructions.

---

## Task 1: Create UXP Plugin Files

**Files:**
- `plugin/manifest.json`
- `plugin/index.html`
- `plugin/index.js` (feasibility test — DOM access + eval only, no WebSocket)

**Action:** Create the `plugin/` directory and write all three files with exact content as specified.

**Verify:**
- Files exist at correct paths
- `manifest.json` parses as valid JSON
- User instructions printed for loading in UDT

**Done when:** All 3 files exist with correct content.

---

## Task 2: Create Node.js Bridge Server

**Files:**
- `bridge/package.json`
- `bridge/server.js`

**Action:**
1. Create `bridge/` directory
2. Write `package.json` and `server.js` with exact content as specified
3. Run `npm install` in the `bridge/` directory

**Verify:**
- Files created
- `npm install` exits 0
- User instructions printed: "Run `node bridge/server.js` from project root"

**Done when:** Both files exist, `node_modules` installed in bridge/.

---

## Task 3: Update Plugin with WebSocket Connection

**Files:**
- `plugin/index.js` (update)

**Action:** Replace `plugin/index.js` content with the WebSocket-enabled version that keeps DOM/eval tests and adds `connectToBridge()`.

**Verify:**
- File updated with `connectToBridge` function
- Instructions printed for end-to-end verification

**Done when:** `plugin/index.js` contains `connectToBridge` function.

---

## Task 4: Git Commit

**Action:** Commit all new/modified files with message: `feat: add UXP plugin and bridge server scaffolding (Phase 1)`

**Done when:** Commit exists in git log.
