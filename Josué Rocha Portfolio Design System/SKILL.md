# SKILL — Josué Rocha Portfolio Design System

## Purpose
This design system captures the complete visual language, component patterns, copy voice, and interaction model for **josuerocha.dev** — Josué Rocha's personal portfolio. Use it whenever prototyping new pages, redesigns, or feature explorations for this portfolio.

## Quick-start

```html
<!-- 1. Import the token sheet -->
<link rel="stylesheet" href="../colors_and_type.css" />

<!-- 2. Reference fonts (already embedded via @font-face in colors_and_type.css) -->

<!-- 3. Set body class for dark mode -->
<body class="dark"> <!-- or omit for light -->
```

Or copy `ui_kit/Portfolio Homepage.html` as a starting point — it's a pixel-faithful, fully interactive recreation of the homepage with all effects working.

## File map

| Path | Contents |
|---|---|
| `README.md` | Full design reference: brand voice, visual foundations, iconography |
| `colors_and_type.css` | All CSS custom properties, font declarations, semantic element styles, `.button`, `.pill`, `.card` helpers |
| `fonts/` | Self-hosted Fraunces (display, variable, 100–900) and Rubik (sans, variable, 400–700) |
| `assets/` | `smile.svg` (brand mark), `sun.svg` (background ornament), `favicon.svg`, project screenshots |
| `preview/` | Individual token/component preview cards registered to the Design System tab |
| `ui_kit/Portfolio Homepage.html` | Full interactive homepage recreation |

## Design system in 60 seconds

**Palette:** 5 flat hero colors — `#6900FF` violet, `#B5FF00` lime, `#FF7A00` orange, `#C56200` orange-dark, `#F5F0E8` beige. Plus dark surfaces `#0F0A1A` / `#1A1230`. No tints/shades scale — modulate with alpha (`/10`, `/20`, `/30`, `/60`).

**Type:** Fraunces (display, all headlines) + Rubik (sans, body + UI). Display always at 900 weight, letter-tracked at −0.02em, with `font-variation-settings: "opsz" 144`. All-caps Rubik 700 for eyebrows, buttons, nav.

**Signature card:** `linear-gradient(135deg, lime/20, orange/10, violet/5)` + `backdrop-filter: blur(12px)` + `1px solid lime/30` + `border-radius: 1rem`. Same recipe everywhere — projects, bio, contact, year-picker.

**Interactions:**
- Letter-ripple: hover a letter → weight waterfall from 900 → 100 outward from cursor
- Navbar bars: mouse proximity drives lime bars via `width` transition
- Smile float: hover tagline → lime smile SVGs float upward
- Scroll entry: all sections `fadeUp` at `opacity 0 → 1` with 0.6s smooth easing
- Theme toggle: fixed bottom-left, moon/sun icon with 90° rotate AnimatePresence

**Easings:**
- `cubic-bezier(0.65, 0, 0.35, 1)` — smooth (fade-ins)
- `cubic-bezier(0.6, 0.05, 0.01, 0.99)` — bounce (hand image)
- `cubic-bezier(0.83, 0, 0.17, 1)` — cubic (cards, navbar bars)

## Copy rules
- Headlines: Sentence case, 2–4 words ("Selected Work", "About me", "Let's talk")
- Buttons/nav: ALL CAPS + tracking-wider ("GITHUB", "LINKEDIN", "MORE DETAILS")
- Body: First-person, conversational, slightly literary. No emoji in UI.
- Footer sign-off: *"Crafted with care in Strasbourg."*

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use flat brand colors with alpha modulation | Invent new colors |
| Fraunces for all display text | Use Fraunces at body size |
| `border-radius: 9999px` on all buttons | Mix outline-icon sets with filled FA icons |
| `scale(0.95)` on `:active` everywhere | Add emoji to UI copy |
| Lime border on cards | Use colored or inner shadows |
| Subtitle: "Crafted with care in Strasbourg." | Generic Lorem Ipsum in contact section |

## Assets usage

- **smile.svg** — always with `currentColor` or explicit violet/lime fill. Never stroke it.
- **sun.svg** — use only as a large background ornament. Rotate slowly. Low opacity (8–15%).
- **favicon.svg** — violet filled path. Use as brand mark in any context needing a logo.
- **Project images** — warm, photographic `.webp` files. No filters, no grayscale, no overlays.

## Extending the system

When adding a new section:
1. Use `<section class="section" id="new-section">` + inner `<div class="section-inner">`
2. Open with `<h2 class="section-title fade-observe">` containing `<span class="ripple-word" data-text="…">` elements
3. Use the card recipe for any elevated content
4. Add scroll-reveal via `fade-observe` class + the IntersectionObserver pattern from the homepage
5. End the section with a lime light-strip blur band (top or bottom) if it's a key section

## i18n note
All user-facing strings are managed via `react-i18next` with JSON namespaces in `src/i18n/locales/{en,fr,pt}/`. When prototyping in plain HTML, use the English strings from `src/i18n/locales/en/` as canonical copy.
