# Josué Rocha Portfolio — Design System

A bold, maximalist personal portfolio for **Josué Rocha**, a Strasbourg-based COBOL mainframe consultant and full-stack web developer (former lawyer, three languages, banking & insurance background). The portfolio reads as a tactile, playful, slightly anarchic poster — equal parts editorial print magazine, art-school zine, and modern web-app. It celebrates craft, motion and weight (literally — the display type animates its own font weight on hover).

## Sources

- **Codebase:** [josuerochadev/portfolio](https://github.com/josuerochadev/portfolio) @ `main` (commit `7f027a5`). Built with React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router 7, Lenis, react-i18next.
- **Live site (referenced in code):** `https://josuerocha.dev/`

There is exactly **one product**: a single-page portfolio site (with a few legal/project-detail subpages). All tokens, components and copy in this design system are extracted from that codebase — no Figma exists.

## Index

| File | What it is |
|---|---|
| `README.md` | This file. Overview + content/visual/iconography fundamentals. |
| `colors_and_type.css` | Single source of truth — all CSS custom properties, fonts, semantic styles. |
| `SKILL.md` | Cross-compatible Claude Skill manifest. |
| `fonts/` | Self-hosted Fraunces + Rubik (woff2). |
| `assets/` | Logos (favicon = stylized "smile"), icon SVGs (smile, sun), project thumbs. |
| `preview/` | One small HTML card per token/component, registered to the Design System tab. |
| `ui_kits/portfolio/` | Pixel-faithful HTML/JSX recreation of the homepage. |

---

## Brand voice

**Josué's portfolio reads like a personally-narrated cover letter, written by someone who is both a craftsman and a storyteller.** The site is multilingual (French primary, plus English and Portuguese) and uses different voices in different sections — but always first-person, conversational, and slightly self-deprecating.

### CONTENT FUNDAMENTALS

- **Person & POV:** First person ("I"). Direct address ("you" / "vous") in CTAs and contact. Singular voice — never corporate "we".
- **Tone:** Warm, slightly literary, confident-but-modest. Short declarative sentences punctuated by a longer reflective one. There is a *humanist* undercurrent — the bio talks about being a former lawyer, learning to code in his thirties, being a father.
- **Casing:**
  - **Display headlines:** Sentence case, but very large. Ex. "Selected Work", "About me", "Let's talk".
  - **Eyebrows / nav / buttons:** ALL CAPS with `tracking-wider` (0.05em). Ex. `GITHUB`, `LINKEDIN`, `WORK`, `ABOUT`, `BLOG`, `MORE DETAILS`, `DELIVERABLES`.
  - **Body:** Sentence case prose.
- **Punctuation:** En-dashes used liberally to set off clauses. French quote marks (« ») in French content. Commas instead of bullets where possible — the bio prefers flowing sentences over lists.
- **Emoji:** Used very sparingly in code/internal docs (📦 🎯 ✨ in the `README.md`) but **never in user-facing UI copy**. Production strings have no emoji.
- **Numbers:** Rounded and concrete. "5+ years in banking & insurance", "200+ articles/day", "40+ sources RSS", "Lighthouse 85+". Used to ground claims, not to brag.
- **Multilingual:** All copy authored in three languages and stored in i18next JSON files. Switching is a feature, not an afterthought.

#### Copy specimens (extracted from `src/i18n/locales`)

- Hero intro: *"Hi, my name is"* / *"Bonjour, je m'appelle"*
- Hero name: **Josué Rocha** (always rendered with the letter-ripple effect)
- Hero phrases (English): short bio lines stacked, like a handwritten note: *"Mainframe consultant by day. Web developer by night."* / *"Former lawyer, full-stack now."*
- Hero tagline (orange, large, hover-reveals smiles): *"I build things on screens — and I smile a lot."*
- Section headlines (always 2–4 words, display weight): **"Selected Work"**, **"About me"**, **"Skills"**, **"Let's talk"**.
- Project labels: **DELIVERABLES**, **CONTEXT** — uppercase eyebrows above prose.
- Footer: *"Crafted with care in Strasbourg."* — a single italic sentence followed by © and legal links.

> Rule of thumb: write like you're writing a postcard to a recruiter you actually like. Not a press release.

---

## VISUAL FOUNDATIONS

The design language is **bold maximalist editorial**: flat saturated color, heavyweight serif display, one signature glass-card pattern, generous negative space, and motion *everywhere* (but performance-aware — `prefers-reduced-motion` is respected throughout).

### Color
Five hero colors, used flat and saturated. No tints/shades scale — everything is the base color modulated with `/10`, `/20`, `/30` alpha (Tailwind opacity syntax) for layering.

| Token | Hex | Role |
|---|---|---|
| `--violet` | `#6900FF` | Primary fg in light mode. Brand color. The "Josué" purple. |
| `--violet-dark` | `#5500CC` | Text on lime backgrounds (better contrast). |
| `--lime` | `#B5FF00` | Electric accent. Footer bg, navbar bar effect, focus halos. |
| `--orange` | `#FF7A00` | CTA/hover. The "smile" color. |
| `--orange-dark` | `#C56200` | AA-safe orange text on light. |
| `--beige` | `#F5F0E8` | Page bg in light mode. Warm, paper-like. |
| `--dark-bg` | `#0F0A1A` | Page bg in dark mode. Near-black violet. |
| `--dark-surface` | `#1A1230` | Footer/lifted surfaces in dark. |

**Vibe:** the palette feels like a 1970s Penguin paperback that fell into a synthwave poster. Warm cream + electric lime + sunset orange + deep violet. Not "techy". Not "minimal". Distinctive.

### Type
Two families, both variable.

- **Fraunces** (display, serif) — used at every level above body. Weights swing from 100 → 900 within a single word as you hover (the *letter-ripple* effect). Optical size 144 forced on hero. `letter-spacing: -0.02em` on display sizes.
- **Rubik** (sans, body) — calm, geometric. Weights 400/500/700 used. ALL-CAPS + tracking-wider for navigation, buttons, eyebrows.

Display sizes use `clamp()` for fluid responsive scaling (e.g. `clamp(4rem, 12vw, 12rem)` on the hero name).

### Backgrounds
- **Animated soft-warm gradient.** Three radial gradients + a 135° linear, blended overlay/soft-light, panned over a `300%` background size with a 25-second `ease-in-out infinite` loop. Two variants: warm cream/peach for light mode, deep purple-on-black for dark.
- **Light strip:** a 12-rem-tall lime blur band runs across the top of the hero and the bottom of the contact section — a horizontal lime ribbon of glow.
- **Layered iconography:** large faint icons (FaUser, FaStar) sit behind bio paragraphs as pale background ornaments. The Projects section has a giant `sun.svg` rotating slowly behind it (linked to scroll).
- **No images as full-bleed backgrounds.** Backgrounds are always color/gradient; imagery is foreground.

### Cards (the signature pattern)
Every elevated surface — projects, contact, timeline steps, the year picker — uses **the same recipe**:

```css
background: linear-gradient(135deg, lime/20, orange/10, violet/5);
backdrop-filter: blur(12px);
border: 1px solid lime/30;
border-radius: 1rem;          /* rounded-2xl */
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.10);
```

Hover: `scale(1.01)` + softer-but-larger shadow. Active: `scale(0.95)`.

### Borders
- Cards: `1px solid lime/30` (light) / `lime/20` (dark). Always lime, always low-alpha.
- Navbar: 2px solid lime band on the bottom edge (with bars effect above).
- Hairlines (separators): `bg-violet-dark/20` (light) or `bg-beige/20` (dark) at 1px height.

### Shadow system
- `shadow-md` (default cards): `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)`.
- `shadow-lg` (hover): elevated.
- `shadow-2xl` (drag state on photo-frame).
- No inner shadows. No colored shadows.

### Animation
- **Easing:** Three named curves are reused — `[0.65, 0, 0.35, 1]` (smooth), `[0.6, 0.05, 0.01, 0.99]` (bounce), `[0.83, 0, 0.17, 1]` (cubic, used on the navbar bars and card transitions).
- **Durations:** 100ms (navbar bars), 300ms (default), 600ms (entrances), 1.2s (long emphasis), 25s (background gradient loop).
- **Pattern:** `FadeInUp` with cascading 0.05–0.2s delays on viewport entry. `LetterRipple` swaps font-variation-settings letter-by-letter on hover via spring physics. `SmileGrid` spawns floating smile SVGs on tagline hover. The hero "light strip" fades up after 10ms post-mount. Project cards have a giant rotating sun behind them tied to scroll progress.
- **Reduced-motion:** all animation durations forced to 0.01ms via `prefers-reduced-motion: reduce`.

### Hover & press states
- **Buttons / nav links:** color shift to `--orange` + `scale(1.15)` (nav). 300ms ease.
- **Cards:** `scale(1.01)` + heavier shadow.
- **Pills (orange):** `scale(1.05)` + shadow + bg→solid orange + text→beige. Active: `scale(0.95)`.
- **Press:** universal `active:scale(0.95)` — present on every interactive element including the theme toggle and year picker.

### Transparency & blur
- `backdrop-filter: blur(12px)` is **the** unifying treatment. Every card, button, the navbar, the floating language switcher, the year-picker capsule — all blur the background behind them.
- Layer alphas are always one of: 5%, 10%, 20%, 30%, 60%.

### Layout rules
- **Fixed elements:** Theme toggle (bottom-left), language switcher (top-right corner), navbar (top, full-width). PhotoFrame appears as a fixed draggable video in the corner once a scroll trigger fires.
- **Container:** `max-w-6xl mx-auto px-4` is the spine. Sections use `px-6 py-20`.
- **Alignment:** Display headlines are left-aligned (some center on contact). Body left. Footer is the only centered region.
- **Vertical rhythm:** Sections breathe — `min-h-[calc(100vh-6rem)]` on hero, `pt-32 pb-56` on contact. Generosity, not density.

### Imagery
- Project screenshots: bright, warm, mostly outdoor/photographic — they match the palette without trying. Stored as `.webp` at 3 sizes (desktop / mobile / thumb) for responsive serving.
- **Bio timeline** uses six animated `.webp` "video" frames as parallax characters — they look hand-illustrated.
- No b&w. No grain. No filters.

### Corner radii
- `0.25rem` (focus rings)
- `0.5rem` (small chips, language switcher)
- `1rem` (cards — the workhorse)
- `9999px` (pills, buttons, navbar capsule, year-picker)

---

## ICONOGRAPHY

The portfolio's icon language is **utility-first via `react-icons` (Font Awesome) for UI affordances**, plus **two custom SVG glyphs that carry the brand identity**: a stylized smile (also serves as logo/favicon) and a sun.

### Icon systems in use

- **`react-icons/fa`** (Font Awesome 5/6 via React-Icons) — the primary UI icon set. Strokes are filled solid, friendly, slightly cartoony. Used at sizes 16–24px in body, larger in section ornaments.
  - Examples in code: `FaGithub`, `FaLinkedin`, `FaEnvelope`, `FaSun`, `FaMoon`, `FaUser`, `FaStar`, `FaEye`.
- **Custom SVGs (in `assets/`):**
  - `smile.svg` — the brand mark. Three holes: two eyes + a wide arc smile. Also serves as **the favicon and home-link logo in the navbar**. Always rendered with `currentColor` so it inherits the surrounding text color (violet in light, beige in dark, lime when sprinkled by the SmileGrid effect).
  - `sun.svg` — a generous concentric-ray sun. Used as a giant background ornament behind the Projects section, slowly rotating with scroll progress.
- **Emoji:** **Not used in user-facing UI.** Used decoratively in internal markdown/source-code comments only.
- **Unicode characters as icons:** Used minimally — `×` close button, `•` separators in the year-picker.
- **No icon font** is bundled. Icons are tree-shaken from `react-icons` per-component.

### Substitutions
The set is provided in full inside the codebase — **no CDN substitution needed**. For ad-hoc additions, use `react-icons/fa` (Font Awesome) to match the filled-glyph style. Avoid outline / stroke-based sets (Lucide, Heroicons-outline) — they break the "warm, slightly cartoony" personality.

### Approach summary
- **Filled glyphs > stroked.** All UI icons are solid.
- **Generous size in headers.** A small icon next to a button label, but a giant icon (`w-full h-full` of a 1600px container) when used as background ornament.
- **`currentColor` always.** Icons never have hard-coded fills; they inherit from text color so they recolor with theme switches automatically.
- **The smile is the hero.** It's the favicon, the navbar logo, the trailing sprite when you hover the hero tagline. Treat it as the brand mascot.
