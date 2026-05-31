# Media Section Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refondre la section media de la page projet — masonry layout, groupes thematiques, hover overlay, lightbox, alignement DS.

**Architecture:** Le `MediaItem` gagne un champ `group?`. La section media passe d'une separation rigide (videos/images) a un flux unique ordonne par groupes. Les images utilisent un layout masonry CSS natif (`columns`). Un nouveau composant `MediaLightbox` gere l'affichage plein ecran. Le style s'aligne sur le DS existant (gradient, lime border, rounded-2xl).

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Framer Motion, createPortal

---

## File Structure

| File | Responsibility |
|------|---------------|
| `src/data/projects.ts` | `MediaItem` interface + group data on existing projects |
| `src/components/MediaLightbox.tsx` | **NEW** — Fullscreen lightbox with keyboard nav, portal, focus trap |
| `src/pages/project-detail.tsx` | Refactored media section — grouped flow, masonry, hover overlay, lightbox trigger |
| `src/i18n/locales/fr/projects.json` | French group label translations in media captions |
| `src/i18n/locales/en/projects.json` | English group label translations in media captions |

---

### Task 1: Add `group` field to `MediaItem` interface

**Files:**
- Modify: `src/data/projects.ts:22-27`

- [ ] **Step 1: Add `group?` to `MediaItem` interface**

```typescript
export interface MediaItem {
	type: 'image' | 'video' | 'embed' | 'pdf';
	src: string;
	poster?: string;
	caption: string;
	group?: string;
}
```

- [ ] **Step 2: Verify the project compiles**

Run: `npx tsc --noEmit`
Expected: no errors (the field is optional, so all existing data remains valid)

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat(media): add optional group field to MediaItem interface"
```

---

### Task 2: Add group data to Tour de Controle media items

**Files:**
- Modify: `src/data/projects.ts:325-426`

- [ ] **Step 1: Add group fields to Tour de Controle media**

Replace the `media` array for tour-de-controle (starting at line 325) with groups assigned. Reorder items so that within each group, videos/embeds come first, then images:

```typescript
media: [
	// --- Architecture ---
	{
		type: "embed",
		src: "/assets/media/projects/tour-de-controle/architecture-diagram.html",
		caption: "Architecture — Frontend ↔ API ↔ PostgreSQL / Redis + déploiement Vercel / Railway / Neon",
		group: "Architecture"
	},
	// --- Demo ---
	{
		type: "video",
		src: "/assets/media/projects/tour-de-controle/tour-demo.mp4",
		caption: "Parcours utilisateur — login, dashboard, caisse, transactions",
		group: "Démo"
	},
	{
		type: "video",
		src: "/assets/media/projects/tour-de-controle/tour-responsive.mp4",
		caption: "Vue responsive — mobile et tablette",
		group: "Démo"
	},
	// --- Design System ---
	{
		type: "image",
		src: "/assets/media/projects/tour-de-controle/design-system-1.webp",
		caption: "Design System — Cover",
		group: "Design System"
	},
	{
		type: "image",
		src: "/assets/media/projects/tour-de-controle/design-system-2.webp",
		caption: "Design System — Brand (Le Phare)",
		group: "Design System"
	},
	{
		type: "image",
		src: "/assets/media/projects/tour-de-controle/design-system-3.webp",
		caption: "Design System — Couleurs (La Palette)",
		group: "Design System"
	},
	{
		type: "image",
		src: "/assets/media/projects/tour-de-controle/design-system-4.webp",
		caption: "Design System — Typographie (Le Système)",
		group: "Design System"
	},
	{
		type: "image",
		src: "/assets/media/projects/tour-de-controle/design-system-5.webp",
		caption: "Design System — Formes & Espacement (Le Rythme)",
		group: "Design System"
	},
	{
		type: "image",
		src: "/assets/media/projects/tour-de-controle/design-system-6.webp",
		caption: "Design System — Composants (La Boîte à Outils)",
		group: "Design System"
	},
	// --- Maquettes print ---
	{
		type: "image",
		src: "/assets/media/projects/tour-de-controle/print-1.webp",
		caption: "Print — Cover",
		group: "Maquettes"
	},
	{
		type: "image",
		src: "/assets/media/projects/tour-de-controle/print-2.webp",
		caption: "Print — Vue La Vigie (Dashboard)",
		group: "Maquettes"
	},
	{
		type: "image",
		src: "/assets/media/projects/tour-de-controle/print-3.webp",
		caption: "Print — Vue La Caisse",
		group: "Maquettes"
	},
	{
		type: "image",
		src: "/assets/media/projects/tour-de-controle/print-4.webp",
		caption: "Print — Vue Le Flux (Transactions)",
		group: "Maquettes"
	},
	{
		type: "image",
		src: "/assets/media/projects/tour-de-controle/print-5.webp",
		caption: "Print — Vue L'Équipage (Personnel)",
		group: "Maquettes"
	},
	{
		type: "image",
		src: "/assets/media/projects/tour-de-controle/maquette-caisse.webp",
		caption: "Maquette — 7 vues de la gestion de caisse",
		group: "Maquettes"
	},
	// --- Diagrammes ---
	{
		type: "image",
		src: "/assets/media/projects/tour-de-controle/erd.webp",
		caption: "Schéma base de données — ERD (6 tables, relations FK)",
		group: "Diagrammes"
	},
	{
		type: "image",
		src: "/assets/media/projects/tour-de-controle/mcd.webp",
		caption: "Modèle conceptuel de données — MCD Merise",
		group: "Diagrammes"
	},
	{
		type: "image",
		src: "/assets/media/projects/tour-de-controle/use-cases.webp",
		caption: "Diagramme de cas d'utilisation — 4 rôles RBAC",
		group: "Diagrammes"
	},
	{
		type: "image",
		src: "/assets/media/projects/tour-de-controle/sequence.webp",
		caption: "Diagramme de séquence — flux auth, caisse, admin",
		group: "Diagrammes"
	},
	{
		type: "image",
		src: "/assets/media/projects/tour-de-controle/arborescence.webp",
		caption: "Arborescence — sitemap et navigation de l'application",
		group: "Diagrammes"
	}
]
```

- [ ] **Step 2: Verify the project compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "content(tour-de-controle): add group labels to media items"
```

---

### Task 3: Add group data to OKLM Drag Club media items

**Files:**
- Modify: `src/data/projects.ts:508-559`

- [ ] **Step 1: Add group fields to OKLM Drag Club media**

```typescript
media: [
	// --- Architecture ---
	{
		type: "embed",
		src: "/assets/media/projects/oklm-drag-club/pipeline-diagram.html",
		caption: "Pipeline de données — RSS → APIs → Build statique",
		group: "Architecture"
	},
	// --- Demo ---
	{
		type: "video",
		src: "/assets/media/projects/oklm-drag-club/oklm-demo.mp4",
		caption: "Parcours utilisateur — navigation, filtres, épisodes",
		group: "Démo"
	},
	{
		type: "video",
		src: "/assets/media/projects/oklm-drag-club/oklm-responsive.mp4",
		caption: "Vue responsive — mobile et tablette",
		group: "Démo"
	},
	// --- Design System ---
	{
		type: "image",
		src: "/assets/media/projects/oklm-drag-club/design-system-1.webp",
		caption: "Design System — Cover",
		group: "Design System"
	},
	{
		type: "image",
		src: "/assets/media/projects/oklm-drag-club/design-system-2.webp",
		caption: "Design System — Couleurs OKLCH",
		group: "Design System"
	},
	{
		type: "image",
		src: "/assets/media/projects/oklm-drag-club/design-system-3.webp",
		caption: "Design System — Typographie",
		group: "Design System"
	},
	{
		type: "image",
		src: "/assets/media/projects/oklm-drag-club/design-system-4.webp",
		caption: "Design System — Composants",
		group: "Design System"
	},
	{
		type: "image",
		src: "/assets/media/projects/oklm-drag-club/design-system-5.webp",
		caption: "Design System — Formulaires",
		group: "Design System"
	},
	{
		type: "image",
		src: "/assets/media/projects/oklm-drag-club/design-system-6.webp",
		caption: "Design System — Grille & Spacing",
		group: "Design System"
	},
	{
		type: "image",
		src: "/assets/media/projects/oklm-drag-club/design-system-7.webp",
		caption: "Design System — Iconographie",
		group: "Design System"
	}
]
```

- [ ] **Step 2: Verify the project compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "content(oklm-drag-club): add group labels to media items"
```

---

### Task 4: Update i18n — add group field to media captions

**Files:**
- Modify: `src/i18n/locales/fr/projects.json`
- Modify: `src/i18n/locales/en/projects.json`

The i18n media arrays only contain `caption` strings. Since we reordered the media items in the data file (Task 2 & 3), we must reorder the i18n captions to match.

- [ ] **Step 1: Reorder French captions for Tour de Controle**

The `items.tour-de-controle.detail.media` array in `fr/projects.json` must match the new order from Task 2. The new order is:
1. Architecture embed
2. Demo video 1
3. Demo video 2
4. Design System 1-6
5. Print 1-5
6. Maquette caisse
7. ERD, MCD, Use cases, Sequence, Arborescence

Update the array so the captions are in that order (same captions, just reordered to match the new data order).

- [ ] **Step 2: Reorder English captions for Tour de Controle**

Same reorder in `en/projects.json` for `items.tour-de-controle.detail.media`.

- [ ] **Step 3: OKLM Drag Club captions — no reorder needed**

The OKLM media items keep the same order (embed, video, video, images), so no caption reorder is needed. Verify the order matches.

- [ ] **Step 4: Verify the project compiles and loads**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add src/i18n/locales/fr/projects.json src/i18n/locales/en/projects.json
git commit -m "i18n(media): reorder captions to match new grouped media order"
```

---

### Task 5: Create the `MediaLightbox` component

**Files:**
- Create: `src/components/MediaLightbox.tsx`

- [ ] **Step 1: Create the MediaLightbox component**

```tsx
import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import type { MediaItem } from "@/data/projects";

interface MediaLightboxProps {
	items: MediaItem[];
	captions: string[];
	currentIndex: number;
	onClose: () => void;
	onNavigate: (index: number) => void;
}

export default function MediaLightbox({ items, captions, currentIndex, onClose, onNavigate }: MediaLightboxProps) {
	const item = items[currentIndex];
	const caption = captions[currentIndex];
	const total = items.length;

	const goPrev = useCallback(() => {
		onNavigate(currentIndex > 0 ? currentIndex - 1 : total - 1);
	}, [currentIndex, total, onNavigate]);

	const goNext = useCallback(() => {
		onNavigate(currentIndex < total - 1 ? currentIndex + 1 : 0);
	}, [currentIndex, total, onNavigate]);

	// Keyboard navigation + scroll lock
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowLeft") goPrev();
			if (e.key === "ArrowRight") goNext();
		};
		document.addEventListener("keydown", handleKey);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", handleKey);
			document.body.style.overflow = "";
		};
	}, [onClose, goPrev, goNext]);

	const renderMedia = () => {
		if (item.type === "image") {
			return (
				<img
					src={item.src}
					alt={caption}
					className="max-w-5xl max-h-[85vh] w-auto h-auto object-contain rounded-lg"
				/>
			);
		}
		if (item.type === "video") {
			return (
				<video
					key={item.src}
					src={item.src}
					poster={item.poster}
					controls
					preload="metadata"
					className="max-w-5xl max-h-[85vh] w-auto h-auto object-contain rounded-lg"
				>
					<track kind="captions" />
				</video>
			);
		}
		if (item.type === "embed") {
			return (
				<iframe
					src={item.src}
					title={caption}
					className="w-full max-w-5xl border-0 rounded-lg"
					style={{ height: "80vh" }}
				/>
			);
		}
		return null;
	};

	return createPortal(
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
				onClick={onClose}
				role="dialog"
				aria-label="Media lightbox"
				aria-modal="true"
			>
				{/* Content — stop propagation so clicking media doesn't close */}
				<div
					className="relative flex flex-col items-center gap-4 px-4 sm:px-12"
					onClick={(e) => e.stopPropagation()}
				>
					{/* Close button */}
					<button
						onClick={onClose}
						className="absolute -top-12 right-4 sm:right-0 text-white/70 hover:text-white transition-colors"
						aria-label="Fermer"
					>
						<FaTimes size={24} />
					</button>

					{/* Media */}
					<motion.div
						key={item.src}
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.2 }}
					>
						{renderMedia()}
					</motion.div>

					{/* Caption + counter */}
					<div className="text-center max-w-3xl">
						<p className="text-sm text-white/80">{caption}</p>
						<p className="text-xs text-white/40 mt-1">
							{currentIndex + 1} / {total}
						</p>
					</div>
				</div>

				{/* Navigation arrows — desktop only */}
				<button
					onClick={(e) => { e.stopPropagation(); goPrev(); }}
					className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center
						rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
					aria-label="Image précédente"
				>
					<FaChevronLeft size={20} />
				</button>
				<button
					onClick={(e) => { e.stopPropagation(); goNext(); }}
					className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center
						rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
					aria-label="Image suivante"
				>
					<FaChevronRight size={20} />
				</button>

				{/* Mobile tap zones */}
				<div
					className="sm:hidden absolute left-0 top-0 w-1/2 h-full"
					onClick={(e) => { e.stopPropagation(); goPrev(); }}
					aria-hidden="true"
				/>
				<div
					className="sm:hidden absolute right-0 top-0 w-1/2 h-full"
					onClick={(e) => { e.stopPropagation(); goNext(); }}
					aria-hidden="true"
				/>
			</motion.div>
		</AnimatePresence>,
		document.body
	);
}
```

- [ ] **Step 2: Verify the project compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/MediaLightbox.tsx
git commit -m "feat(media): create MediaLightbox component — portal, keyboard nav, mobile tap zones"
```

---

### Task 6: Refactor the media section in `project-detail.tsx`

This is the main task. Replace lines 378-458 with the new grouped flow + masonry layout + hover overlay + lightbox integration.

**Files:**
- Modify: `src/pages/project-detail.tsx:1-458`

- [ ] **Step 1: Add imports and state at the top of the file**

Add to the imports (line 4 area):

```typescript
import { useState } from "react";
import MediaLightbox from "@/components/MediaLightbox";
```

Add `useState` to the existing React import if not already there. Add after line 87 (the `hasMetrics` line):

```typescript
const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
```

- [ ] **Step 2: Build the helper to resolve captions**

Add this helper function inside the component, after the `lightboxIndex` state (around line 89):

```typescript
const resolveCaption = (index: number): string => {
	if (Array.isArray(detailMedia) && detailMedia[index]?.caption) {
		return detailMedia[index].caption;
	}
	return mediaItems[index]?.caption ?? '';
};

const allCaptions = mediaItems.map((_, i) => resolveCaption(i));
```

- [ ] **Step 3: Replace the entire media section (lines 378-458)**

Replace the `{/* Galerie / Media */}` section with:

```tsx
{/* Galerie / Media */}
{hasMedia && (
	<FadeInUp delay={0.55}>
		<section id="gallery" className="mb-24 scroll-mt-24">
			<h2 className="text-base md:text-lg font-sans font-bold uppercase tracking-widest text-orange-dark dark:text-orange mb-8">
				{t('projects:detail.gallery')}
			</h2>

			{(() => {
				// Group media items while preserving flat index for lightbox
				const groups: { label: string | null; items: { item: MediaItem; flatIndex: number }[] }[] = [];
				let currentGroup: string | null | undefined = undefined;

				mediaItems.forEach((item, flatIndex) => {
					const groupLabel = item.group ?? null;
					if (groupLabel !== currentGroup) {
						groups.push({ label: groupLabel, items: [] });
						currentGroup = groupLabel;
					}
					groups[groups.length - 1].items.push({ item, flatIndex });
				});

				let staggerCounter = 0;

				return groups.map((group, groupIndex) => {
					const videosAndEmbeds = group.items.filter(({ item }) => item.type === 'video' || item.type === 'embed');
					const images = group.items.filter(({ item }) => item.type === 'image');

					return (
						<div key={group.label ?? `group-${groupIndex}`}>
							{/* Group subtitle */}
							{group.label && (
								<FadeInUp delay={Math.min(0.05 * staggerCounter, 0.5)}>
									<h3 className={`text-sm font-sans font-semibold uppercase tracking-wider text-violet/40 dark:text-beige/40 mb-4 ${groupIndex > 0 ? 'mt-8' : ''}`}>
										{group.label}
									</h3>
								</FadeInUp>
							)}

							{/* Videos & Embeds — full width */}
							{videosAndEmbeds.length > 0 && (
								<div className="flex flex-col gap-8 mb-8">
									{videosAndEmbeds.map(({ item, flatIndex }) => {
										const caption = allCaptions[flatIndex];
										const delay = Math.min(0.05 * staggerCounter++, 0.5);

										return (
											<FadeInUp key={item.src} delay={delay}>
												<figure
													className="flex flex-col gap-3 cursor-pointer group"
													onClick={() => setLightboxIndex(flatIndex)}
												>
													<div className="w-full rounded-2xl overflow-hidden p-2
														bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5
														dark:from-lime/10 dark:via-orange/5 dark:to-violet/10
														backdrop-blur-md border border-lime/30 dark:border-lime/20 shadow-card
														hover:shadow-card-hover hover:scale-[1.01]
														transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]">
														{item.type === 'embed' && (
															<iframe
																src={item.src}
																title={caption}
																className="w-full border-0 rounded-xl"
																style={{ height: '480px' }}
																loading="lazy"
															/>
														)}
														{item.type === 'video' && (
															<video
																src={item.src}
																poster={item.poster}
																controls
																preload="metadata"
																className="w-full rounded-xl"
																onClick={(e) => e.stopPropagation()}
															>
																<track kind="captions" />
															</video>
														)}
													</div>
													<figcaption className="text-sm text-violet/60 dark:text-beige/60 text-center">
														{caption}
													</figcaption>
												</figure>
											</FadeInUp>
										);
									})}
								</div>
							)}

							{/* Images — masonry */}
							{images.length > 0 && (
								<div className="columns-1 sm:columns-2 lg:columns-3 gap-4 mb-8">
									{images.map(({ item, flatIndex }) => {
										const caption = allCaptions[flatIndex];
										const delay = Math.min(0.05 * staggerCounter++, 0.5);

										return (
											<FadeInUp key={item.src} delay={delay}>
												<figure
													className="break-inside-avoid mb-4 cursor-pointer group"
													onClick={() => setLightboxIndex(flatIndex)}
												>
													<div className="relative rounded-2xl overflow-hidden p-2
														bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5
														dark:from-lime/10 dark:via-orange/5 dark:to-violet/10
														backdrop-blur-md border border-lime/30 dark:border-lime/20 shadow-card
														hover:shadow-card-hover
														transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]">
														<div className="rounded-xl overflow-hidden relative">
															<img
																src={item.src}
																alt={caption}
																className="w-full h-auto block group-hover:scale-[1.03] transition-transform duration-300"
																loading="lazy"
															/>
															{/* Hover overlay with caption */}
															<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent
																opacity-0 group-hover:opacity-100 transition-opacity duration-300
																flex items-end p-4">
																<span className="text-sm text-white font-medium">
																	{caption}
																</span>
															</div>
														</div>
													</div>
													<figcaption className="sr-only">{caption}</figcaption>
												</figure>
											</FadeInUp>
										);
									})}
								</div>
							)}
						</div>
					);
				});
			})()}
		</section>
	</FadeInUp>
)}

{/* Lightbox */}
{lightboxIndex !== null && (
	<MediaLightbox
		items={mediaItems}
		captions={allCaptions}
		currentIndex={lightboxIndex}
		onClose={() => setLightboxIndex(null)}
		onNavigate={setLightboxIndex}
	/>
)}
```

Note: the `allCaptions` and `resolveCaption` must be defined even when `hasMedia` is false — but they depend on `mediaItems` which defaults to `[]`, so this is safe. The lightbox JSX goes **outside** the `hasMedia` block but still inside the `<main>`, right before the closing `</main>` tag, or right after the media section block. It will only render when `lightboxIndex !== null`.

- [ ] **Step 4: Verify the project compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 5: Visual check in dev server**

Run: `npm run dev`

Check:
1. Navigate to `/projet/tour-de-controle` — verify groups appear with subtitles (Architecture, Demo, Design System, Maquettes, Diagrammes)
2. Verify masonry layout for images — variable heights, 3 columns on desktop, 2 on tablet, 1 on mobile
3. Hover on an image — check zoom + overlay with caption
4. Click an image — lightbox opens
5. Arrow keys / click arrows — navigate between all media
6. Escape / click backdrop — closes
7. Navigate to `/projet/oklm-drag-club` — same checks
8. Check dark mode

- [ ] **Step 6: Commit**

```bash
git add src/pages/project-detail.tsx
git commit -m "feat(media): refonte section medias — flux groupe, masonry, hover overlay, lightbox"
```

---

### Task 7: Final polish and edge cases

**Files:**
- Modify: `src/pages/project-detail.tsx` (if needed)
- Modify: `src/components/MediaLightbox.tsx` (if needed)

- [ ] **Step 1: Test with a project that has NO media**

Navigate to `/projet/luciole` and `/projet/stella-ecommerce` — verify no errors, no empty section rendered.

- [ ] **Step 2: Test with a project that has NO groups**

If a project has media without `group` fields, it should render in a single ungrouped flow with no subtitles. Verify this works by temporarily removing groups from one project's data.

- [ ] **Step 3: Test responsive breakpoints**

- Mobile (< 640px): 1 column masonry, full-width videos, lightbox tap zones work
- Tablet (640-1024px): 2 columns masonry, lightbox arrows visible
- Desktop (> 1024px): 3 columns masonry, lightbox arrows visible

- [ ] **Step 4: Test keyboard accessibility**

- Tab into the gallery — images should be focusable (they're clickable via cursor-pointer)
- In lightbox: Escape closes, ArrowLeft/ArrowRight navigates

- [ ] **Step 5: Fix any issues found during testing**

Address any visual or functional issues found in steps 1-4.

- [ ] **Step 6: Final commit if fixes were needed**

```bash
git add -u
git commit -m "fix(media): address edge cases and polish from visual review"
```
