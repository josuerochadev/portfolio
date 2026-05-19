# DS Integration & Cleanup — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the Design System deliverables into the portfolio codebase and clean up the DS preview cards for self-consistency.

**Architecture:** Two sequential phases — Phase B (DS internal, zero regression) then Phase A (portfolio integration, ascending risk). Each task is independently verifiable.

**Tech Stack:** HTML/CSS/JS vanilla (DS), React 19 + TypeScript + Tailwind CSS + Framer Motion (portfolio)

**DS root:** `Josue Rocha Portfolio Design System/` (referred to as `DS/` below)

---

## Phase B — DS Internal (zero regression on portfolio)

### Task B1: Fix hardcoded shadows in preview cards

**Files:**
- Modify: `DS/preview/component-cards.html`
- Modify: `DS/preview/component-buttons.html`
- Modify: `DS/preview/spacing-shadows.html`
- Modify: `DS/preview/brand-dark-mode.html`

The majority of preview cards already use CSS variables correctly. The remaining issues are hardcoded `box-shadow` values using `rgba(0,0,0,...)` instead of the new chromatic shadow tokens, and a few hardcoded rgba colors.

- [ ] **Step 1: Update component-cards.html — replace neutral shadows with tokens**

Replace the two card divs' `box-shadow` with CSS variable references:

```html
<!-- Card default: replace box-shadow -->
<!-- OLD: box-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06) -->
<!-- NEW: -->
box-shadow:var(--card-shadow);

<!-- Card hover: replace box-shadow -->
<!-- OLD: box-shadow:0 10px 15px -3px rgba(0,0,0,.10),0 4px 6px -2px rgba(0,0,0,.05) -->
<!-- NEW: -->
box-shadow:var(--card-shadow-hover);
```

Also replace hardcoded `color:rgba(105,0,255,.8)` with `color:var(--fg-2)` in both card descriptions.

- [ ] **Step 2: Update spacing-shadows.html — show chromatic shadows**

Replace the 3 shadow specimens with the new chromatic tokens. The card currently shows neutral black shadows — update to show the DS tokens:

```html
<!-- Shadow 1 -->
<div class="label-xs">--card-shadow (default cards)</div>
<div style="...box-shadow:var(--card-shadow);"></div>

<!-- Shadow 2 -->
<div class="label-xs">--card-shadow-hover (hover)</div>
<div style="...box-shadow:var(--card-shadow-hover);"></div>

<!-- Shadow 3 -->
<div class="label-xs">--shadow-cta (CTA buttons)</div>
<div style="...box-shadow:var(--shadow-cta);"></div>

<!-- Shadow 4 (add new) -->
<div class="label-xs">--shadow-lime-glow (focus / navbar)</div>
<div style="...box-shadow:var(--shadow-lime-glow);"></div>
```

Also replace `background:#fff` with `background:var(--bg-2)` on the shadow demo boxes.

- [ ] **Step 3: Update component-buttons.html — replace hardcoded shadow**

In the pill hover state, replace:
```
box-shadow:0 4px 6px -1px rgba(0,0,0,.1)
```
with:
```
box-shadow:var(--card-shadow)
```

- [ ] **Step 4: Verify all cards open correctly in browser**

Open each modified file via `file://` path. Check both light and dark mode (use the toggle button). Verify shadows render and dark mode tokens apply.

- [ ] **Step 5: Commit**

```bash
cd "Josue Rocha Portfolio Design System"
git add preview/component-cards.html preview/component-buttons.html preview/spacing-shadows.html preview/brand-dark-mode.html
git commit -m "fix(ds): replace hardcoded neutral shadows with chromatic tokens in preview cards"
```

---

### Task B2: Inline SVG smile in component-navbar.html

**Files:**
- Modify: `DS/preview/component-navbar.html`
- Modify: `DS/preview/brand-smile.html`

- [ ] **Step 1: Replace `<img>` with inline SVG in component-navbar.html**

Replace line 14:
```html
<img src="../assets/smile.svg" style="width:32px;height:32px;color:var(--violet);" />
```
with the inline SVG (extracted from `DS/ui_kit/Portfolio Homepage.html` line 882):
```html
<svg viewBox="0 0 810 810" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:32px;height:32px;">
  <path fill="currentColor" d="M 404.964844 44.640625 C 354.480469 44.640625 306.605469 55.230469 263.082031 74.417969 C 259.925781 75.796875 256.734375 77.285156 253.398438 78.769531 C 132.476562 136.476562 48.769531 260.839844 48.769531 404.976562 C 48.769531 604.054688 208.171875 765.417969 404.964844 765.417969 C 555.046875 765.417969 683.476562 671.515625 735.8125 538.554688 C 737.300781 535.289062 738.386719 531.917969 739.765625 528.652344 C 753.511719 490.0625 761.128906 448.425781 761.128906 404.976562 C 761.128906 206.003906 601.652344 44.640625 404.964844 44.640625 Z M 496.183594 335.011719 C 499.445312 298.488281 517.945312 270.597656 540.324219 270.597656 C 564.949219 270.597656 584.933594 304.546875 584.933594 346.398438 C 584.933594 388.144531 564.949219 422.09375 540.324219 422.09375 C 517.945312 422.09375 499.445312 394.203125 496.183594 357.789062 L 529.625 346.398438 Z M 225.070312 335.011719 C 228.335938 298.488281 246.832031 270.597656 269.210938 270.597656 C 293.839844 270.597656 313.820312 304.546875 313.820312 346.398438 C 313.820312 388.144531 293.839844 422.09375 269.210938 422.09375 C 246.832031 422.09375 228.335938 394.203125 225.070312 357.789062 L 258.511719 346.398438 Z M 707.703125 429.710938 L 679.996094 429.710938 C 677.925781 454.265625 672.886719 478.203125 664.652344 500.941406 L 663.566406 503.699219 C 662.984375 505.367188 662.296875 507.070312 661.570312 508.742188 C 619.535156 615.40625 518.816406 684.574219 405.039062 684.574219 C 261.667969 684.574219 142.269531 573.152344 129.902344 429.710938 L 104.476562 429.710938 L 104.476562 419.808594 L 168.492188 419.808594 L 168.492188 429.710938 L 139.910156 429.710938 C 152.171875 567.640625 267.144531 674.671875 405.074219 674.671875 C 514.789062 674.671875 611.84375 607.972656 652.539062 504.894531 C 653.226562 503.226562 653.808594 501.742188 654.425781 500.144531 L 655.511719 497.386719 C 663.238281 475.917969 668.0625 453.066406 670.164062 429.710938 L 643.835938 429.710938 L 643.835938 419.808594 L 707.742188 419.808594 L 707.742188 429.710938 Z"/>
</svg>
```

- [ ] **Step 2: Replace `<img>` tags with inline SVG in brand-smile.html**

Same SVG path, replace the 4 `<img src="../assets/smile.svg" ...>` with inline SVGs using `fill="currentColor"`. Remove the CSS filter hacks (e.g. `filter:invert(1) brightness(2)...`) and instead use appropriate `color` on the parent div:
- Smile violet: parent `color:var(--violet)`, SVG `fill="currentColor"`
- Favicon bg: parent `color:var(--beige)`, SVG `fill="currentColor"` (on violet bg)
- Smile on lime: parent `color:var(--violet-dark)`, SVG `fill="currentColor"`
- Smile dark: parent `color:var(--beige)`, SVG `fill="currentColor"` (on dark-bg)

- [ ] **Step 3: Verify in browser — dark mode toggle should now change smile color**

- [ ] **Step 4: Commit**

```bash
git add preview/component-navbar.html preview/brand-smile.html
git commit -m "fix(ds): inline smile SVG for currentColor support in navbar and brand cards"
```

---

### Task B3: Create 7 new preview cards

**Files:**
- Create: `DS/preview/component-theme-toggle.html`
- Create: `DS/preview/component-timeline.html`
- Create: `DS/preview/component-year-picker.html`
- Create: `DS/preview/component-project-card.html`
- Create: `DS/preview/component-footer.html`
- Create: `DS/preview/type-display-num.html`
- Create: `DS/preview/component-states.html`

All new cards follow the same pattern: `<!doctype html>`, import `_card.css`, include `<script src="_theme.js"></script>` before `</body>`.

- [ ] **Step 1: Create component-theme-toggle.html**

Show the theme toggle button in both states side by side. Use the same glass capsule recipe from `_theme.js`:

```html
<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="_card.css"></head>
<body>
<div class="col" style="gap:16px;">
  <div class="label-xs">Theme Toggle — fixed bottom-left in production</div>
  <div class="row" style="gap:24px;align-items:center;">
    <!-- Light state (shows moon icon) -->
    <div style="text-align:center;">
      <div style="width:48px;height:48px;border-radius:9999px;background:linear-gradient(135deg,rgba(181,255,0,.20),rgba(255,122,0,.10),rgba(105,0,255,.05));backdrop-filter:blur(12px);border:1px solid rgba(181,255,0,.30);display:flex;align-items:center;justify-content:center;color:var(--violet);box-shadow:var(--card-shadow);">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </div>
      <div class="mono" style="margin-top:6px;">light mode</div>
    </div>
    <!-- Dark state (shows sun icon) -->
    <div style="text-align:center;">
      <div style="width:48px;height:48px;border-radius:9999px;background:linear-gradient(135deg,rgba(181,255,0,.10),rgba(255,122,0,.05),rgba(105,0,255,.10));backdrop-filter:blur(12px);border:1px solid rgba(181,255,0,.20);display:flex;align-items:center;justify-content:center;color:var(--beige);background-color:var(--dark-surface);box-shadow:var(--card-shadow);">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      </div>
      <div class="mono" style="margin-top:6px;">dark mode</div>
    </div>
  </div>
  <div class="muted">Glass capsule, 90deg icon rotate on toggle via AnimatePresence. Position: fixed bottom-left.</div>
</div>
<script src="_theme.js"></script>
</body></html>
```

- [ ] **Step 2: Create component-timeline.html**

Show a timeline step card in default and hover states:

```html
<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="_card.css"></head>
<body>
<div class="col" style="gap:16px;">
  <div class="label-xs">Timeline card — default + hover</div>
  <div class="row" style="gap:14px;flex-wrap:wrap;align-items:stretch;">
    <!-- Default -->
    <div style="flex:1;min-width:240px;background:linear-gradient(135deg,rgba(181,255,0,.20),rgba(255,122,0,.10),rgba(105,0,255,.05));backdrop-filter:blur(12px);border:1px solid var(--card-border);border-radius:16px;box-shadow:var(--card-shadow);padding:20px 24px;display:flex;flex-direction:column;gap:4px;">
      <span style="font-family:var(--font-display);font-weight:600;font-size:12px;color:rgba(255,122,0,.70);text-transform:uppercase;letter-spacing:0.05em;">2018 — 2021</span>
      <h3 style="font-family:var(--font-display);font-weight:800;font-size:1.25rem;line-height:1.375;color:var(--fg-1);margin:0;">Law studies in Brazil</h3>
      <p style="font-family:var(--font-sans);font-size:14px;line-height:1.625;color:var(--fg-2);margin:4px 0 0;">Five years of legal training before pivoting to tech.</p>
    </div>
    <!-- Hover state -->
    <div style="flex:1;min-width:240px;background:linear-gradient(135deg,rgba(181,255,0,.20),rgba(255,122,0,.10),rgba(105,0,255,.05));backdrop-filter:blur(12px);border:1px solid var(--card-border);border-radius:16px;box-shadow:var(--card-shadow-hover);padding:20px 24px;display:flex;flex-direction:column;gap:4px;transform:scale(1.01);">
      <span style="font-family:var(--font-display);font-weight:600;font-size:12px;color:rgba(255,122,0,.70);text-transform:uppercase;letter-spacing:0.05em;">2022 — 2023</span>
      <h3 style="font-family:var(--font-display);font-weight:800;font-size:1.25rem;line-height:1.375;color:var(--fg-1);margin:0;">First lines of code</h3>
      <p style="font-family:var(--font-sans);font-size:14px;line-height:1.625;color:var(--fg-2);margin:4px 0 0;">Discovered web development and never looked back.</p>
    </div>
  </div>
  <div class="muted">Period eyebrow (orange/70) + Fraunces 800 title + Rubik body. Hover: scale(1.01) + shadow-hover. 300ms cubic easing.</div>
</div>
<script src="_theme.js"></script>
</body></html>
```

- [ ] **Step 3: Create component-year-picker.html**

```html
<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="_card.css"></head>
<body>
<div class="col" style="gap:16px;">
  <div class="label-xs">Year picker — timeline navigation capsule</div>
  <div style="display:inline-flex;align-items:center;gap:8px;padding:10px 24px;border-radius:9999px;background:linear-gradient(135deg,rgba(181,255,0,.20),rgba(255,122,0,.10),rgba(105,0,255,.05));backdrop-filter:blur(12px);border:1px solid var(--card-border);box-shadow:var(--card-shadow);font-family:var(--font-sans);font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">
    <span style="color:var(--orange-dark);">2018</span>
    <span style="color:var(--fg-3);font-size:8px;">&#8226;</span>
    <span style="color:var(--fg-1);cursor:pointer;">2021</span>
    <span style="color:var(--fg-3);font-size:8px;">&#8226;</span>
    <span style="color:var(--fg-1);cursor:pointer;">2022</span>
    <span style="color:var(--fg-3);font-size:8px;">&#8226;</span>
    <span style="color:var(--fg-1);cursor:pointer;">2023</span>
    <span style="color:var(--fg-3);font-size:8px;">&#8226;</span>
    <span style="color:var(--fg-1);cursor:pointer;">2024</span>
  </div>
  <div class="muted">Sticky capsule, same glass recipe. Active year: --orange-dark (light) / --orange (dark). Inactive: --violet / --beige. Separator: bullet, fg-3.</div>
</div>
<script src="_theme.js"></script>
</body></html>
```

- [ ] **Step 4: Create component-project-card.html**

```html
<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="_card.css"></head>
<body>
<div class="col" style="gap:16px;">
  <div class="label-xs">Project card — image + ghost-num + title + pills</div>
  <div style="display:flex;gap:20px;background:linear-gradient(135deg,rgba(181,255,0,.20),rgba(255,122,0,.10),rgba(105,0,255,.05));backdrop-filter:blur(12px);border:1px solid var(--card-border);border-radius:16px;box-shadow:var(--card-shadow);padding:20px;flex-wrap:wrap;">
    <!-- Image placeholder -->
    <div style="flex:1;min-width:180px;max-width:280px;aspect-ratio:4/3;background:linear-gradient(135deg,var(--violet),rgba(105,0,255,.6));border-radius:12px;display:flex;align-items:center;justify-content:center;color:var(--beige);font-family:var(--font-sans);font-size:11px;text-transform:uppercase;letter-spacing:0.08em;">Screenshot</div>
    <!-- Content -->
    <div style="flex:1;min-width:200px;display:flex;flex-direction:column;gap:6px;">
      <div style="display:flex;align-items:baseline;gap:8px;">
        <span class="ghost-num">1.</span>
        <h3 style="font-family:var(--font-display);font-weight:800;font-size:1.6rem;line-height:1.2;color:var(--fg-1);margin:0;">Avocate.app</h3>
      </div>
      <p style="font-family:var(--font-sans);font-size:14px;line-height:1.625;color:var(--fg-2);">Full-stack legal SaaS platform for French lawyers.</p>
      <div class="label-xs" style="margin-top:6px;">DELIVERABLES</div>
      <p style="font-family:var(--font-sans);font-size:13px;color:var(--fg-2);">Multi-page site, design system, animations, contact form</p>
      <div style="margin-top:8px;">
        <a style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:9999px;background:rgba(255,122,0,.10);color:var(--accent-text);border:1px solid rgba(255,122,0,.20);font-family:var(--font-sans);font-weight:500;font-size:13px;text-decoration:none;cursor:pointer;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
          MORE DETAILS
        </a>
      </div>
    </div>
  </div>
  <div class="muted">Ghost-num pattern: Fraunces 100, clamp(3rem,6vw,5rem), --orange-dark. Pill: orange/10 bg, orange-dark text, rounded-full.</div>
</div>
<script src="_theme.js"></script>
</body></html>
```

- [ ] **Step 5: Create component-footer.html**

```html
<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="_card.css"></head>
<body style="padding:0;">
<div style="background:var(--lime);padding:32px 24px;text-align:center;">
  <div style="font-family:var(--font-display);font-weight:800;font-size:1.5rem;color:var(--violet-dark);margin-bottom:16px;font-variation-settings:var(--fv-editorial);">Josue Rocha</div>
  <nav style="display:flex;justify-content:center;gap:24px;margin-bottom:16px;font-family:var(--font-sans);font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;color:var(--violet-dark);">
    <span>HOME</span><span>ABOUT</span><span>WORK</span><span>CONTACT</span>
  </nav>
  <p class="italic-aside" style="border-left:none;padding-left:0;text-align:center;color:var(--surface-citron-muted, rgba(85,0,204,.60));font-size:14px;">Crafted with care in Strasbourg.</p>
  <div style="width:64px;height:1px;background:rgba(85,0,204,.20);margin:16px auto;"></div>
  <div style="display:flex;justify-content:center;gap:16px;font-family:var(--font-sans);font-size:11px;color:var(--surface-citron-muted, rgba(85,0,204,.60));">
    <span style="text-decoration:underline;cursor:pointer;">Legal Notice</span>
    <span>&#8226;</span>
    <span style="text-decoration:underline;cursor:pointer;">Privacy Policy</span>
  </div>
  <p style="font-family:var(--font-sans);font-size:11px;color:rgba(85,0,204,.50);margin-top:8px;">&copy; 2026 Josue Rocha. All rights reserved.</p>
</div>
<div class="muted" style="padding:8px 20px;">Footer — bg lime (light) / dark-surface (dark). Fraunces name + nav + italic tagline + legal links.</div>
<script src="_theme.js"></script>
</body></html>
```

- [ ] **Step 6: Create type-display-num.html**

```html
<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="_card.css"></head>
<body>
<div class="col" style="gap:16px;">
  <div class="label-xs">Ghost number specimen — project numbering</div>
  <div style="display:flex;gap:32px;align-items:baseline;flex-wrap:wrap;">
    <div style="display:flex;align-items:baseline;gap:8px;">
      <span class="ghost-num" style="font-size:72px;">1.</span>
      <span style="font-family:var(--font-display);font-weight:800;font-size:1.4rem;color:var(--fg-1);">Avocate.app</span>
    </div>
    <div style="display:flex;align-items:baseline;gap:8px;">
      <span class="ghost-num" style="font-size:72px;">2.</span>
      <span style="font-family:var(--font-display);font-weight:800;font-size:1.4rem;color:var(--fg-1);">Lunetterie</span>
    </div>
    <div style="display:flex;align-items:baseline;gap:8px;">
      <span class="ghost-num" style="font-size:72px;">3.</span>
      <span style="font-family:var(--font-display);font-weight:800;font-size:1.4rem;color:var(--fg-1);">Luciole</span>
    </div>
  </div>
  <div class="muted">Fraunces 100 (--fv-ghost) · 72px · --orange-dark · letter-spacing -.03em. The thinnest weight creates maximum contrast with the 800-weight title beside it.</div>
</div>
<script src="_theme.js"></script>
</body></html>
```

- [ ] **Step 7: Create component-states.html**

```html
<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="_card.css"></head>
<body>
<div class="col" style="gap:20px;">
  <div class="label-xs">Interactive states</div>
  <div class="row" style="gap:16px;flex-wrap:wrap;align-items:flex-start;">
    <!-- Focus ring -->
    <div style="text-align:center;">
      <a href="#" style="display:inline-flex;align-items:center;gap:8px;padding:.6rem 1.5rem;border-radius:9999px;background:linear-gradient(135deg,rgba(181,255,0,.20),rgba(255,122,0,.10),rgba(105,0,255,.05));backdrop-filter:blur(12px);border:1px solid var(--card-border);font-family:var(--font-sans);font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.05em;text-decoration:none;color:var(--fg-1);outline:2px solid var(--focus-ring);outline-offset:2px;">FOCUS</a>
      <div class="mono" style="margin-top:8px;">outline 2px --focus-ring</div>
    </div>
    <!-- Default -->
    <div style="text-align:center;">
      <button style="display:inline-flex;align-items:center;gap:8px;padding:.6rem 1.5rem;border-radius:9999px;background:linear-gradient(135deg,rgba(181,255,0,.20),rgba(255,122,0,.10),rgba(105,0,255,.05));backdrop-filter:blur(12px);border:1px solid var(--card-border);font-family:var(--font-sans);font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:var(--fg-1);cursor:pointer;">DEFAULT</button>
      <div class="mono" style="margin-top:8px;">resting state</div>
    </div>
    <!-- Hover -->
    <div style="text-align:center;">
      <button style="display:inline-flex;align-items:center;gap:8px;padding:.6rem 1.5rem;border-radius:9999px;background:var(--lime);border:1px solid rgba(181,255,0,.3);font-family:var(--font-sans);font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:var(--orange);cursor:pointer;">HOVER</button>
      <div class="mono" style="margin-top:8px;">bg lime, text orange</div>
    </div>
    <!-- Active / pressed -->
    <div style="text-align:center;">
      <button style="display:inline-flex;align-items:center;gap:8px;padding:.6rem 1.5rem;border-radius:9999px;background:var(--lime);border:1px solid rgba(181,255,0,.3);font-family:var(--font-sans);font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:var(--orange);cursor:pointer;transform:scale(0.95);">ACTIVE</button>
      <div class="mono" style="margin-top:8px;">scale(0.95)</div>
    </div>
    <!-- Disabled -->
    <div style="text-align:center;">
      <button disabled style="display:inline-flex;align-items:center;gap:8px;padding:.6rem 1.5rem;border-radius:9999px;background:linear-gradient(135deg,rgba(181,255,0,.20),rgba(255,122,0,.10),rgba(105,0,255,.05));backdrop-filter:blur(12px);border:1px solid var(--card-border);font-family:var(--font-sans);font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:var(--fg-1);opacity:0.5;pointer-events:none;cursor:not-allowed;">DISABLED</button>
      <div class="mono" style="margin-top:8px;">opacity 0.5</div>
    </div>
  </div>
  <div class="muted">All interactive elements share: active:scale(.95), focus:outline 2px --focus-ring offset 2px, disabled:opacity .5 + pointer-events none.</div>
</div>
<script src="_theme.js"></script>
</body></html>
```

- [ ] **Step 8: Verify all 7 new cards in browser (light + dark)**

- [ ] **Step 9: Commit**

```bash
git add preview/component-theme-toggle.html preview/component-timeline.html preview/component-year-picker.html preview/component-project-card.html preview/component-footer.html preview/type-display-num.html preview/component-states.html
git commit -m "feat(ds): add 7 new preview cards — toggle, timeline, year-picker, project, footer, ghost-num, states"
```

---

### Task B4: Create Do/Don't card

**Files:**
- Create: `DS/preview/brand-do-dont.html`

- [ ] **Step 1: Create brand-do-dont.html**

```html
<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="_card.css">
<style>
  .grid-dd { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .do-col { background:rgba(0,200,0,.05); border-radius:12px; padding:16px; }
  .dont-col { background:rgba(200,0,0,.05); border-radius:12px; padding:16px; }
  .rule { display:flex; gap:10px; align-items:center; padding:8px 0; border-bottom:1px solid rgba(0,0,0,.05); }
  .rule:last-child { border-bottom:none; }
  .rule-label { font-family:var(--font-sans); font-size:12px; color:var(--fg-2); }
  .do-title { font-family:var(--font-sans); font-weight:700; font-size:14px; color:#1a7a1a; margin-bottom:12px; }
  .dont-title { font-family:var(--font-sans); font-weight:700; font-size:14px; color:#b91c1c; margin-bottom:12px; }
  html.dark .do-col { background:rgba(0,200,0,.08); }
  html.dark .dont-col { background:rgba(200,0,0,.08); }
  html.dark .do-title { color:#4ade80; }
  html.dark .dont-title { color:#f87171; }
</style>
</head>
<body>
<div class="col" style="gap:12px;">
  <div class="label-xs">Visual rules — Do / Don't</div>
  <div class="grid-dd">
    <div class="do-col">
      <div class="do-title">Do</div>
      <!-- Rule 1: Fraunces for titles -->
      <div class="rule">
        <span style="font-family:var(--font-display);font-weight:800;font-size:18px;color:var(--fg-1);">Title</span>
        <span class="rule-label">Fraunces for headings</span>
      </div>
      <!-- Rule 2: Rounded-full buttons -->
      <div class="rule">
        <span style="display:inline-block;padding:4px 14px;border-radius:9999px;background:var(--lime);font-family:var(--font-sans);font-size:11px;font-weight:700;color:var(--violet-dark);text-transform:uppercase;">BUTTON</span>
        <span class="rule-label">border-radius 9999px</span>
      </div>
      <!-- Rule 3: Lime border on cards -->
      <div class="rule">
        <span style="display:inline-block;width:48px;height:32px;border-radius:8px;border:1px solid var(--lime);background:rgba(181,255,0,.1);"></span>
        <span class="rule-label">lime border on cards</span>
      </div>
      <!-- Rule 4: Flat color + alpha -->
      <div class="rule">
        <span style="display:inline-flex;gap:2px;">
          <span style="width:18px;height:18px;border-radius:4px;background:var(--violet);"></span>
          <span style="width:18px;height:18px;border-radius:4px;background:rgba(105,0,255,.20);"></span>
        </span>
        <span class="rule-label">flat color + alpha modulation</span>
      </div>
      <!-- Rule 5: SVG inline -->
      <div class="rule">
        <code style="font-size:10px;color:var(--fg-2);">&lt;svg fill="currentColor"&gt;</code>
        <span class="rule-label">SVG inline for smile</span>
      </div>
      <!-- Rule 6: ALL CAPS labels -->
      <div class="rule">
        <span style="font-family:var(--font-sans);font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:var(--fg-1);">LABEL</span>
        <span class="rule-label">ALL CAPS + tracking</span>
      </div>
    </div>
    <div class="dont-col">
      <div class="dont-title">Don't</div>
      <!-- Rule 1 -->
      <div class="rule">
        <span style="font-family:var(--font-display);font-size:13px;color:var(--fg-3);">Body text in Fraunces</span>
        <span class="rule-label">Fraunces at body size</span>
      </div>
      <!-- Rule 2 -->
      <div class="rule">
        <span style="display:inline-block;padding:4px 14px;border-radius:4px;background:var(--lime);font-family:var(--font-sans);font-size:11px;font-weight:700;color:var(--violet-dark);text-transform:uppercase;">BUTTON</span>
        <span class="rule-label">square corners on buttons</span>
      </div>
      <!-- Rule 3 -->
      <div class="rule">
        <span style="display:inline-block;width:48px;height:32px;border-radius:8px;border:1px solid var(--violet);background:rgba(105,0,255,.05);"></span>
        <span class="rule-label">violet border on cards</span>
      </div>
      <!-- Rule 4 -->
      <div class="rule">
        <span style="display:inline-flex;gap:2px;">
          <span style="width:18px;height:18px;border-radius:4px;background:#e74c3c;"></span>
          <span style="width:18px;height:18px;border-radius:4px;background:#3498db;"></span>
        </span>
        <span class="rule-label">colors outside palette</span>
      </div>
      <!-- Rule 5 -->
      <div class="rule">
        <code style="font-size:10px;color:var(--fg-3);">&lt;img src="smile"&gt;</code>
        <span class="rule-label">img tag (no currentColor)</span>
      </div>
      <!-- Rule 6 -->
      <div class="rule">
        <span style="font-family:var(--font-sans);font-size:11px;color:var(--fg-3);">See more details</span>
        <span class="rule-label">Sentence case on labels</span>
      </div>
    </div>
  </div>
</div>
<script src="_theme.js"></script>
</body></html>
```

- [ ] **Step 2: Verify in browser**

- [ ] **Step 3: Commit**

```bash
git add preview/brand-do-dont.html
git commit -m "feat(ds): add Do/Don't visual rules card"
```

---

### Task B5: Replace easing card with interactive motion demo

**Files:**
- Modify: `DS/preview/easing.html` (rewrite)

- [ ] **Step 1: Rewrite easing.html as motion-easing.html**

Rename and rewrite with 3 animated balls + Play button using Web Animations API:

```html
<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="_card.css">
<style>
  .track { position:relative; height:40px; margin:4px 0; background:rgba(105,0,255,.04); border-radius:20px; overflow:hidden; }
  .ball { position:absolute; left:8px; top:50%; width:24px; height:24px; border-radius:50%; transform:translateY(-50%); }
  .play-btn { display:inline-flex; align-items:center; gap:6px; padding:8px 20px; border-radius:9999px; background:linear-gradient(135deg,rgba(181,255,0,.20),rgba(255,122,0,.10),rgba(105,0,255,.05)); backdrop-filter:blur(12px); border:1px solid var(--card-border); font-family:var(--font-sans); font-weight:700; font-size:12px; text-transform:uppercase; letter-spacing:0.05em; color:var(--fg-1); cursor:pointer; }
  .play-btn:active { transform:scale(0.95); }
</style>
</head>
<body>
<div class="col" style="gap:12px;">
  <div class="label-xs">Easing curves — interactive demo</div>

  <div style="display:flex;gap:8px;align-items:center;">
    <div class="mono" style="width:140px;color:var(--violet);">smooth · 0.65,0,0.35,1</div>
    <div class="track" style="flex:1;"><div class="ball" id="b1" style="background:var(--violet);"></div></div>
  </div>
  <div style="display:flex;gap:8px;align-items:center;">
    <div class="mono" style="width:140px;color:var(--orange);">bounce · 0.6,0.05,0.01,0.99</div>
    <div class="track" style="flex:1;"><div class="ball" id="b2" style="background:var(--orange);"></div></div>
  </div>
  <div style="display:flex;gap:8px;align-items:center;">
    <div class="mono" style="width:140px;color:var(--violet-dark);">cubic · 0.83,0,0.17,1</div>
    <div class="track" style="flex:1;"><div class="ball" id="b3" style="background:var(--lime);border:1px solid var(--violet-dark);"></div></div>
  </div>

  <button class="play-btn" id="play-btn" type="button">&#9654; Play</button>
  <div class="muted">Three named curves reused everywhere. Durations: 100 / 300 / 600 / 1200ms; gradient loop 25s.</div>
</div>

<script>
(function(){
  var btn = document.getElementById('play-btn');
  var balls = [
    { el: document.getElementById('b1'), easing: 'cubic-bezier(0.65,0,0.35,1)' },
    { el: document.getElementById('b2'), easing: 'cubic-bezier(0.6,0.05,0.01,0.99)' },
    { el: document.getElementById('b3'), easing: 'cubic-bezier(0.83,0,0.17,1)' }
  ];
  btn.addEventListener('click', function(){
    balls.forEach(function(b){
      var track = b.el.parentElement;
      var dist = track.offsetWidth - 40;
      b.el.animate([
        { left: '8px' },
        { left: dist + 'px' }
      ], { duration: 1200, easing: b.easing, fill: 'forwards' });
    });
    setTimeout(function(){
      balls.forEach(function(b){
        b.el.animate([
          { left: b.el.getBoundingClientRect().left - b.el.parentElement.getBoundingClientRect().left + 'px' },
          { left: '8px' }
        ], { duration: 600, easing: 'cubic-bezier(0.65,0,0.35,1)', fill: 'forwards' });
      });
    }, 1800);
  });
})();
</script>
<script src="_theme.js"></script>
</body></html>
```

- [ ] **Step 2: Verify the animation plays correctly in browser**

- [ ] **Step 3: Commit**

```bash
git add preview/easing.html
git commit -m "feat(ds): replace static easing curves with interactive motion demo"
```

---

### Task B6: Create DS index.html

**Files:**
- Create: `DS/index.html`

- [ ] **Step 1: Create index.html — DS homepage with iframe grid and theme sync**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Josue Rocha — Design System</title>
  <link rel="stylesheet" href="colors_and_type.css">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: var(--font-sans);
      color: var(--fg-1);
      background: var(--bg-1);
      background-image: var(--bg-gradient-light);
      background-size: 300% 300%;
      animation: bg-pan 25s ease-in-out infinite;
    }
    html.dark body {
      background-image: var(--bg-gradient-dark);
    }
    @keyframes bg-pan {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    header {
      padding: 32px 24px 24px;
      text-align: center;
    }
    header h1 {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      color: var(--fg-1);
      font-variation-settings: var(--fv-editorial);
    }
    header .smile { width: 48px; height: 48px; display: inline-block; vertical-align: middle; margin-right: 12px; color: var(--fg-1); }

    .sticky-nav {
      position: sticky; top: 0; z-index: 50;
      background: rgba(245,240,232,.8);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 2px solid var(--lime);
      padding: 12px 24px;
      display: flex; gap: 24px; justify-content: center;
      font-family: var(--font-sans); font-weight: 700; font-size: 13px;
      text-transform: uppercase; letter-spacing: 0.05em;
    }
    html.dark .sticky-nav { background: rgba(15,10,26,.85); }
    .sticky-nav a { color: var(--fg-1); text-decoration: none; transition: color .3s; }
    .sticky-nav a:hover { color: var(--orange); }

    .section { padding: 40px 24px; max-width: 1200px; margin: 0 auto; }
    .section h2 {
      font-family: var(--font-display); font-weight: 800;
      font-size: clamp(1.5rem, 3vw, 2rem); color: var(--fg-1);
      margin-bottom: 20px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 16px;
    }
    .card-frame {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--card-border);
      background: var(--bg-2);
      box-shadow: var(--card-shadow);
      transition: box-shadow .3s var(--easing-cubic);
    }
    .card-frame:hover { box-shadow: var(--card-shadow-hover); }
    .card-frame iframe {
      width: 100%; height: 220px; border: none; display: block;
      pointer-events: none;
    }
    .card-frame .open-link {
      display: block; padding: 6px 12px; text-align: right;
      font-family: var(--font-sans); font-size: 11px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.05em;
      color: var(--fg-3); text-decoration: none;
    }
    .card-frame .open-link:hover { color: var(--orange); }

    #theme-toggle {
      position: fixed; bottom: 16px; right: 16px; z-index: 100;
      width: 44px; height: 44px; border-radius: 9999px;
      background: linear-gradient(135deg,rgba(181,255,0,.20),rgba(255,122,0,.10),rgba(105,0,255,.05));
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--card-border); color: var(--fg-1);
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      box-shadow: var(--card-shadow); transition: all .25s ease;
    }
    #theme-toggle:active { transform: scale(0.95); }

    footer {
      text-align: center; padding: 32px 24px;
      font-family: var(--font-sans); font-size: 12px; color: var(--fg-3);
    }
    footer a { color: var(--fg-2); }
  </style>
</head>
<body>

<header>
  <h1>
    <svg class="smile" viewBox="0 0 810 810" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M 404.964844 44.640625 C 354.480469 44.640625 306.605469 55.230469 263.082031 74.417969 C 259.925781 75.796875 256.734375 77.285156 253.398438 78.769531 C 132.476562 136.476562 48.769531 260.839844 48.769531 404.976562 C 48.769531 604.054688 208.171875 765.417969 404.964844 765.417969 C 555.046875 765.417969 683.476562 671.515625 735.8125 538.554688 C 737.300781 535.289062 738.386719 531.917969 739.765625 528.652344 C 753.511719 490.0625 761.128906 448.425781 761.128906 404.976562 C 761.128906 206.003906 601.652344 44.640625 404.964844 44.640625 Z M 496.183594 335.011719 C 499.445312 298.488281 517.945312 270.597656 540.324219 270.597656 C 564.949219 270.597656 584.933594 304.546875 584.933594 346.398438 C 584.933594 388.144531 564.949219 422.09375 540.324219 422.09375 C 517.945312 422.09375 499.445312 394.203125 496.183594 357.789062 L 529.625 346.398438 Z M 225.070312 335.011719 C 228.335938 298.488281 246.832031 270.597656 269.210938 270.597656 C 293.839844 270.597656 313.820312 304.546875 313.820312 346.398438 C 313.820312 388.144531 293.839844 422.09375 269.210938 422.09375 C 246.832031 422.09375 228.335938 394.203125 225.070312 357.789062 L 258.511719 346.398438 Z M 707.703125 429.710938 L 679.996094 429.710938 C 677.925781 454.265625 672.886719 478.203125 664.652344 500.941406 L 663.566406 503.699219 C 662.984375 505.367188 662.296875 507.070312 661.570312 508.742188 C 619.535156 615.40625 518.816406 684.574219 405.039062 684.574219 C 261.667969 684.574219 142.269531 573.152344 129.902344 429.710938 L 104.476562 429.710938 L 104.476562 419.808594 L 168.492188 419.808594 L 168.492188 429.710938 L 139.910156 429.710938 C 152.171875 567.640625 267.144531 674.671875 405.074219 674.671875 C 514.789062 674.671875 611.84375 607.972656 652.539062 504.894531 C 653.226562 503.226562 653.808594 501.742188 654.425781 500.144531 L 655.511719 497.386719 C 663.238281 475.917969 668.0625 453.066406 670.164062 429.710938 L 643.835938 429.710938 L 643.835938 419.808594 L 707.742188 419.808594 L 707.742188 429.710938 Z"/>
    </svg>
    Josue Rocha Design System
  </h1>
</header>

<nav class="sticky-nav">
  <a href="#colors">Colors</a>
  <a href="#type">Type</a>
  <a href="#spacing">Spacing</a>
  <a href="#components">Components</a>
  <a href="#brand">Brand</a>
</nav>

<div class="section" id="colors">
  <h2>Colors</h2>
  <div class="grid">
    <div class="card-frame"><iframe src="preview/colors-primary.html"></iframe><a class="open-link" href="preview/colors-primary.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/colors-neutrals.html"></iframe><a class="open-link" href="preview/colors-neutrals.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/colors-alphas.html"></iframe><a class="open-link" href="preview/colors-alphas.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/gradients.html"></iframe><a class="open-link" href="preview/gradients.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/surfaces.html"></iframe><a class="open-link" href="preview/surfaces.html" target="_blank">Open full</a></div>
  </div>
</div>

<div class="section" id="type">
  <h2>Type</h2>
  <div class="grid">
    <div class="card-frame"><iframe src="preview/type-display-xl.html"></iframe><a class="open-link" href="preview/type-display-xl.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/type-display-md.html"></iframe><a class="open-link" href="preview/type-display-md.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/type-body.html"></iframe><a class="open-link" href="preview/type-body.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/type-eyebrow.html"></iframe><a class="open-link" href="preview/type-eyebrow.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/type-fraunces-weights.html"></iframe><a class="open-link" href="preview/type-fraunces-weights.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/type-ghost-num.html"></iframe><a class="open-link" href="preview/type-ghost-num.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/type-display-num.html"></iframe><a class="open-link" href="preview/type-display-num.html" target="_blank">Open full</a></div>
  </div>
</div>

<div class="section" id="spacing">
  <h2>Spacing & Shadows</h2>
  <div class="grid">
    <div class="card-frame"><iframe src="preview/spacing-scale.html"></iframe><a class="open-link" href="preview/spacing-scale.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/spacing-radii.html"></iframe><a class="open-link" href="preview/spacing-radii.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/spacing-shadows.html"></iframe><a class="open-link" href="preview/spacing-shadows.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/shadows-chromatic.html"></iframe><a class="open-link" href="preview/shadows-chromatic.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/easing.html"></iframe><a class="open-link" href="preview/easing.html" target="_blank">Open full</a></div>
  </div>
</div>

<div class="section" id="components">
  <h2>Components</h2>
  <div class="grid">
    <div class="card-frame"><iframe src="preview/component-cards.html"></iframe><a class="open-link" href="preview/component-cards.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/component-buttons.html"></iframe><a class="open-link" href="preview/component-buttons.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/component-skill-chips.html"></iframe><a class="open-link" href="preview/component-skill-chips.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/component-navbar.html"></iframe><a class="open-link" href="preview/component-navbar.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/component-theme-toggle.html"></iframe><a class="open-link" href="preview/component-theme-toggle.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/component-timeline.html"></iframe><a class="open-link" href="preview/component-timeline.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/component-year-picker.html"></iframe><a class="open-link" href="preview/component-year-picker.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/component-project-card.html"></iframe><a class="open-link" href="preview/component-project-card.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/component-footer.html"></iframe><a class="open-link" href="preview/component-footer.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/component-states.html"></iframe><a class="open-link" href="preview/component-states.html" target="_blank">Open full</a></div>
  </div>
</div>

<div class="section" id="brand">
  <h2>Brand</h2>
  <div class="grid">
    <div class="card-frame"><iframe src="preview/brand-smile.html"></iframe><a class="open-link" href="preview/brand-smile.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/brand-icons.html"></iframe><a class="open-link" href="preview/brand-icons.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/brand-dark-mode.html"></iframe><a class="open-link" href="preview/brand-dark-mode.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/brand-imagery.html"></iframe><a class="open-link" href="preview/brand-imagery.html" target="_blank">Open full</a></div>
    <div class="card-frame"><iframe src="preview/brand-do-dont.html"></iframe><a class="open-link" href="preview/brand-do-dont.html" target="_blank">Open full</a></div>
  </div>
</div>

<footer>
  <p>Source: <a href="https://github.com/josuerochadev/portfolio" target="_blank" rel="noopener">josuerochadev/portfolio</a></p>
</footer>

<button id="theme-toggle" title="Toggle theme" aria-label="Toggle theme">
  <svg id="toggle-moon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
  <svg id="toggle-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="display:none;"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
</button>

<script>
(function(){
  var saved = localStorage.getItem('ds-theme');
  if (saved === 'dark') document.documentElement.classList.add('dark');

  var btn = document.getElementById('theme-toggle');
  var moon = document.getElementById('toggle-moon');
  var sun = document.getElementById('toggle-sun');

  function updateIcon() {
    var isDark = document.documentElement.classList.contains('dark');
    moon.style.display = isDark ? 'none' : 'block';
    sun.style.display = isDark ? 'block' : 'none';
  }
  updateIcon();

  function syncIframes(theme) {
    var iframes = document.querySelectorAll('iframe');
    iframes.forEach(function(iframe) {
      try { iframe.contentWindow.postMessage({ theme: theme }, '*'); } catch(e) {}
    });
  }

  btn.addEventListener('click', function() {
    var isDark = document.documentElement.classList.toggle('dark');
    var theme = isDark ? 'dark' : 'light';
    localStorage.setItem('ds-theme', theme);
    updateIcon();
    syncIframes(theme);
  });

  // Sync iframes on load
  window.addEventListener('load', function() {
    var theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setTimeout(function() { syncIframes(theme); }, 500);
  });
})();
</script>
</body>
</html>
```

- [ ] **Step 2: Verify index.html in browser — check all iframes load, theme toggle syncs across iframes**

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat(ds): add index.html — DS homepage with iframe grid and theme sync"
```

---

## Phase A — Portfolio Integration (ascending risk)

### Task A1: Chromatic shadows — Tailwind config + component updates

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/components/sections/projects.tsx`
- Modify: `src/components/sections/bio/timeline.tsx`
- Modify: `src/components/sections/contact.tsx`

- [ ] **Step 1: Update tailwind.config.ts — add chromatic shadow tokens**

Add the new tokens alongside existing ones. Keep the existing `glow-*` shadows for now (they may be used elsewhere):

```ts
boxShadow: {
  'glow-lime': '0 4px 18px -2px rgba(181, 255, 0, 0.35)',
  'glow-lime-lg': '0 8px 30px -3px rgba(181, 255, 0, 0.5)',
  'glow-orange': '0 4px 18px -2px rgba(255, 122, 0, 0.4)',
  'glow-orange-lg': '0 8px 30px -3px rgba(255, 122, 0, 0.55)',
  'glow-violet': '0 4px 18px -2px rgba(105, 0, 255, 0.35)',
  'glow-violet-lg': '0 8px 30px -3px rgba(105, 0, 255, 0.5)',
  // DS chromatic shadows (D03)
  card: '0 8px 32px rgba(105, 0, 255, 0.15), 0 2px 8px rgba(105, 0, 255, 0.06)',
  'card-hover': '0 16px 48px rgba(105, 0, 255, 0.22), 0 4px 12px rgba(105, 0, 255, 0.10)',
  cta: '0 4px 24px rgba(255, 122, 0, 0.35), 0 1px 4px rgba(255, 122, 0, 0.20)',
  'lime-glow': '0 0 40px rgba(181, 255, 0, 0.30)',
},
```

- [ ] **Step 2: Update projects.tsx — replace shadow classes on project cards**

In `projects.tsx`, in the `<article>` className (line 102-103), replace:
```
shadow-glow-lime
hover:shadow-glow-lime-lg
```
with:
```
shadow-card
hover:shadow-card-hover
```

- [ ] **Step 3: Update timeline.tsx — replace shadow classes on timeline cards and year picker**

In `timeline.tsx` line 75-76 (TimelineStep card), replace:
```
shadow-glow-lime
hover:shadow-glow-lime-lg
```
with:
```
shadow-card
hover:shadow-card-hover
```

In the year picker nav (line 188), replace:
```
shadow-glow-lime hover:shadow-glow-lime-lg
```
with:
```
shadow-card hover:shadow-card-hover
```

- [ ] **Step 4: Update contact.tsx — replace shadow classes on contact card**

In `contact.tsx` line 63, replace:
```
shadow-glow-lime
```
with:
```
shadow-card
```

- [ ] **Step 5: Run dev server and verify visually**

```bash
npm run dev
```

Check in browser: projects, timeline, contact sections in both light and dark mode. Shadows should now have a violet tint instead of lime glow.

- [ ] **Step 6: Commit**

```bash
git add tailwind.config.ts src/components/sections/projects.tsx src/components/sections/bio/timeline.tsx src/components/sections/contact.tsx
git commit -m "style: apply chromatic shadows (D03) — violet-tinted card shadows replace lime glow"
```

---

### Task A2: Ghost-num refinement + italic-aside on footer

**Files:**
- Modify: `src/components/sections/projects.tsx`
- Modify: `src/components/layout/footer.tsx`
- Modify: `src/index.css`

- [ ] **Step 1: Add DS font-variation CSS custom properties to index.css**

Add after the existing CSS (before `@media (prefers-reduced-motion)`):

```css
/* === DS FONT VARIATION PRESETS === */
:root {
  --fv-editorial: "opsz" 144, "SOFT" 0, "WONK" 0;
  --fv-playful: "opsz" 72, "SOFT" 100, "WONK" 1;
  --fv-ghost: "opsz" 144, "SOFT" 0, "WONK" 0;
}
```

- [ ] **Step 2: Refine ghost-num in projects.tsx**

In `projects.tsx` line 116, the span already has `text-6xl font-display font-extralight text-orange-dark`. Update to match DS spec exactly:

Change:
```tsx
<span className="text-6xl font-display font-extralight text-orange-dark leading-none">
```
to:
```tsx
<span className="text-6xl font-display font-thin text-orange-dark leading-none tracking-[-0.03em]" style={{ fontVariationSettings: 'var(--fv-ghost)' }}>
```

`font-thin` = weight 100 (vs `font-extralight` = 200). Added `tracking-[-0.03em]` and `fontVariationSettings`.

- [ ] **Step 3: Apply italic-aside on footer tagline**

In `footer.tsx` line 50, change:
```tsx
<p className="text-sm italic text-violet-dark dark:text-beige/70 mb-6">{t('footer.craftedWith')}</p>
```
to:
```tsx
<p className="font-display italic font-normal text-sm border-l-[2.5px] border-lime pl-4 text-violet-dark/80 dark:text-beige/70 mb-6">{t('footer.craftedWith')}</p>
```

- [ ] **Step 4: Verify in browser — check project numbers and footer tagline in both modes**

- [ ] **Step 5: Commit**

```bash
git add src/index.css src/components/sections/projects.tsx src/components/layout/footer.tsx
git commit -m "style: apply ghost-num (D01) on project numbers + italic-aside on footer tagline"
```

---

### Task A3: Font-variation tokens — replace hardcoded fontVariationSettings

**Files:**
- Modify: `src/components/layout/footer.tsx`

- [ ] **Step 1: Replace hardcoded fontVariationSettings in footer.tsx**

In `footer.tsx` line 34, replace:
```tsx
style={{ fontVariationSettings: '"opsz" 144, "SOFT" 0, "WONK" 0' }}
```
with:
```tsx
style={{ fontVariationSettings: 'var(--fv-editorial)' }}
```

- [ ] **Step 2: Verify footer name renders correctly**

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/footer.tsx
git commit -m "refactor: use --fv-editorial CSS var instead of hardcoded fontVariationSettings"
```

---

### Task A4: Grain texture overlay

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/layout/footer.tsx`

- [ ] **Step 1: Add grain utility classes to index.css**

Add after the font-variation presets:

```css
/* === GRAIN TEXTURE (D04) === */
.grain { position: relative; }
.grain::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.grain-citron::after { opacity: 0.07; }
.grain-dark::after { opacity: 0.05; }
/* Ensure content inside grain surfaces stays above the overlay */
.grain > * { position: relative; z-index: 1; }
```

- [ ] **Step 2: Add grain-citron to footer**

In `footer.tsx` line 33, add `grain grain-citron` to the footer className:

Change:
```tsx
<footer className="relative w-full bg-lime dark:bg-dark-surface text-violet-dark dark:text-beige pt-8 pb-40 px-6 md:px-10 text-center">
```
to:
```tsx
<footer className="relative w-full bg-lime dark:bg-dark-surface text-violet-dark dark:text-beige pt-8 pb-40 px-6 md:px-10 text-center grain grain-citron">
```

- [ ] **Step 3: Verify in browser — check grain is visible as subtle texture on footer, no z-index issues with footer content**

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/components/layout/footer.tsx
git commit -m "style: add grain texture overlay (D04) — grain-citron on footer"
```

---

### Task A5: Surface tokens — Tailwind config + Skills section

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/index.css`

- [ ] **Step 1: Add surface color tokens to tailwind.config.ts**

Add to the `colors` extend:

```ts
// Surface Citron tokens
'surface-citron-fg': 'var(--surface-citron-fg, #5500CC)',
'surface-citron-muted': 'var(--surface-citron-muted, rgba(85, 0, 204, 0.60))',
'surface-citron-border': 'var(--surface-citron-border, rgba(85, 0, 204, 0.15))',
// Surface Nuit tokens
'surface-nuit-fg': 'var(--surface-nuit-fg, #F5F0E8)',
'surface-nuit-muted': 'var(--surface-nuit-muted, rgba(245, 240, 232, 0.55))',
'surface-nuit-border': 'var(--surface-nuit-border, rgba(181, 255, 0, 0.22))',
```

- [ ] **Step 2: Add surface CSS custom properties to index.css**

Add after the font-variation presets block:

```css
/* === SURFACE TOKENS (D02) === */
:root {
  --surface-citron-bg: #B5FF00;
  --surface-citron-fg: #5500CC;
  --surface-citron-muted: rgba(85, 0, 204, 0.60);
  --surface-citron-border: rgba(85, 0, 204, 0.15);
  --surface-citron-card: rgba(255, 255, 255, 0.28);
  --surface-nuit-bg: #6900FF;
  --surface-nuit-fg: #F5F0E8;
  --surface-nuit-muted: rgba(245, 240, 232, 0.55);
  --surface-nuit-border: rgba(181, 255, 0, 0.22);
  --surface-nuit-card: linear-gradient(135deg, rgba(181,255,0,0.12), rgba(245,240,232,0.06));
}
```

- [ ] **Step 3: Verify tokens are available in Tailwind — run dev server**

```bash
npm run dev
```

Surface tokens are now available for future use. The Skills section and Timeline/About can be updated to use these surfaces in a later iteration when the user is ready for a bigger visual change.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts src/index.css
git commit -m "feat: add surface tokens (D02) — Citron and Nuit available in Tailwind + CSS vars"
```

---

## Summary of all commits (expected)

| # | Commit message | Phase |
|---|---|---|
| 1 | `fix(ds): replace hardcoded neutral shadows with chromatic tokens` | B1 |
| 2 | `fix(ds): inline smile SVG for currentColor support` | B2 |
| 3 | `feat(ds): add 7 new preview cards` | B3 |
| 4 | `feat(ds): add Do/Don't visual rules card` | B4 |
| 5 | `feat(ds): replace static easing with interactive motion demo` | B5 |
| 6 | `feat(ds): add index.html — DS homepage` | B6 |
| 7 | `style: apply chromatic shadows (D03)` | A1 |
| 8 | `style: apply ghost-num + italic-aside (D01)` | A2 |
| 9 | `refactor: use --fv-editorial CSS var` | A3 |
| 10 | `style: add grain texture overlay (D04)` | A4 |
| 11 | `feat: add surface tokens (D02)` | A5 |
