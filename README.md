# Live build snapshot: gulfrecoverygroup.org (2026-10-02)

This branch archives the static files deployed at https://gulfrecoverygroup.org as of 2 Oct 2026.
It contains build output only, no source code.

- **Base:** the 21 Sep 2026 build. It was deployed from a working copy that was never pushed to GitHub:
  - an EmailJS lead form on `/`, `/en/` and both contact pages;
  - a footer without the CTA band or the company block;
  - JSON-LD without `sameAs`.
- **Plus:** the client's compliance text, patched into those files on 2 Oct 2026. This is the same text change as PR #2 on `main`.
  - The patched content-dictionary chunk is `_next/static/chunks/066q-891hxt72-orgfa58eb87.js`.
  - The original `066q-891hxt72.js` is kept because it still exists on the server.
- **Included:** every file from the current deploy (server date 21 Sep or 2 Oct 2026): page HTML, RSC payloads, JS
  chunks, CSS, fonts, build manifests, `.htaccess`, `sitemap.xml`/`urls.xml`.
- **Not included:** older builds under `/_next/` and the stale 10 Jul copies that are still on the server.

**Restore:** upload these files over the FTP root `/` (the docroot). Overwrite only, never clear the folder.

**Source of truth for code:** `main` plus the developer's unpushed 21 Sep working copy. Do not merge this branch into `main`.
