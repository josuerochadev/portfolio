# Refonte section Resultats — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refondre la section Resultats de project-detail.tsx en bento asymetrique avec parsing intelligent des valeurs metrics.

**Architecture:** Une fonction utilitaire `parseMetricValue` extrait chiffre/detail des valeurs. Le JSX utilise ces infos pour determiner le col-span, le style de card (hero/compact/wide/fulltext) et l'alternance violet/lime par parite d'index.

**Tech Stack:** React, TypeScript, Tailwind CSS (tokens existants)

---

### Task 1: Ajouter la fonction parseMetricValue

**Files:**
- Modify: `src/pages/project-detail.tsx:16` (ajouter avant `getStatusColor`)

- [ ] **Step 1: Ajouter la fonction utilitaire en haut du fichier**

Inserer apres les imports (ligne 15), avant `getStatusColor` :

```typescript
const parseMetricValue = (value: string): { number: string | null; detail: string | null } => {
	const match = value.match(/^(\d+[\d.,]*)\s*(?:\((.+)\)|(.+))?$/);
	if (!match) return { number: null, detail: null };
	const number = match[1];
	const detail = (match[2] || match[3] || '').trim() || null;
	return { number, detail };
};
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/project-detail.tsx
git commit -m "feat(project-detail): ajouter parseMetricValue — extraction chiffre/detail des metrics"
```

---

### Task 2: Refondre le JSX de la section Resultats

**Files:**
- Modify: `src/pages/project-detail.tsx:439-491` (remplacer toute la section Resultats)

- [ ] **Step 1: Remplacer le bloc Resultats (lignes 439-491)**

Remplacer le contenu entre `{/* Resultats / Metrics */}` et la fermeture `)}` par :

```tsx
{/* Resultats / Metrics — bento asymetrique */}
{hasMetrics && (
	<FadeInUp delay={0.6}>
		<section id="results" className="mb-24 scroll-mt-24">
			<h2 className="text-base md:text-lg font-sans font-bold uppercase tracking-widest text-orange-dark dark:text-orange mb-8">
				{t('projects:detail.results')}
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{detailMetrics.map((metric, index) => {
					const { number, detail } = parseMetricValue(metric.value);
					const isHero = index === 0;
					const isNuit = index % 2 === 0;
					const isFullText = number === null;
					const isLongDetail = detail !== null && detail.length >= 40;

					// Col span logic
					const colSpan = isHero
						? 'sm:col-span-2 lg:col-span-3'
						: (isFullText || isLongDetail)
							? 'sm:col-span-2'
							: '';

					// Color classes
					const bgClass = isNuit
						? 'bg-violet dark:bg-dark-surface border-violet/20 dark:border-beige/10'
						: 'bg-lime dark:bg-dark-surface border-lime/30 dark:border-lime/20 grain grain-citron';
					const labelClass = isNuit
						? 'text-beige/50 dark:text-beige/50'
						: 'text-surface-citron-muted dark:text-beige/55';
					const numberClass = isNuit
						? 'text-beige dark:text-beige'
						: 'text-surface-citron-fg dark:text-beige';
					const detailClass = isNuit
						? 'text-beige/70 dark:text-beige/70'
						: 'text-surface-citron-muted dark:text-beige/60';
					const textClass = isNuit
						? 'text-beige dark:text-beige'
						: 'text-surface-citron-fg dark:text-beige';

					return (
						<div
							key={metric.label}
							className={`flex flex-col justify-between p-6 rounded-2xl
								border shadow-card
								hover:shadow-card-hover hover:scale-[1.01]
								transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]
								${colSpan}
								${bgClass}
								${isHero ? 'min-h-[200px]' : 'min-h-[140px]'}`}
						>
							<span className={`text-xs font-sans font-bold uppercase tracking-[0.2em] mb-4 ${labelClass}`}>
								{metric.label}
							</span>

							{/* Hero card */}
							{isHero && number !== null && (
								<div className="flex flex-col gap-1">
									<span
										className={`text-5xl md:text-7xl font-display font-thin leading-none ${numberClass}`}
										style={{ fontVariationSettings: 'var(--fv-ghost)' }}
									>
										{number}
									</span>
									{detail && (
										<span className={`text-base leading-relaxed mt-2 ${detailClass}`}>
											{detail}
										</span>
									)}
								</div>
							)}

							{/* Compact card — number with short detail */}
							{!isHero && number !== null && !isLongDetail && (
								<div className="flex flex-col gap-1">
									<span
										className={`text-4xl md:text-5xl font-display font-thin leading-none ${numberClass}`}
										style={{ fontVariationSettings: 'var(--fv-ghost)' }}
									>
										{number}
									</span>
									{detail && (
										<span className={`text-sm leading-relaxed ${detailClass}`}>
											{detail}
										</span>
									)}
								</div>
							)}

							{/* Wide card — number + long detail side by side */}
							{!isHero && number !== null && isLongDetail && (
								<div className="flex items-end gap-6">
									<span
										className={`text-4xl md:text-5xl font-display font-thin leading-none shrink-0 ${numberClass}`}
										style={{ fontVariationSettings: 'var(--fv-ghost)' }}
									>
										{number}
									</span>
									<div className={`border-l pl-6 py-1 ${isNuit ? 'border-beige/20' : 'border-violet/15 dark:border-beige/15'}`}>
										<span className={`text-sm leading-relaxed block ${detailClass}`}>
											{detail}
										</span>
									</div>
								</div>
							)}

							{/* Full-text card — no extractable number */}
							{isFullText && (
								<span className={`text-xl md:text-2xl font-display font-semibold italic leading-snug break-words ${textClass}`}>
									{metric.value}
								</span>
							)}
						</div>
					);
				})}
			</div>
		</section>
	</FadeInUp>
)}
```

- [ ] **Step 2: Verifier le rendu dans le navigateur**

Run: `npm run dev` (ou `pnpm dev`)

Verifier sur plusieurs projets :
- OKLM Drag Club (mix chiffres courts + listes longues)
- Luciole (7 metrics, valeurs variees)
- Tour de Controle (9 metrics dont full-text securite/deploiement)

Points de controle :
- La premiere card prend toute la largeur (hero)
- Les cards avec listes longues ont le chiffre a gauche + detail a droite avec bordure verticale
- L'alternance violet/lime est par parite d'index
- Les cards full-text (securite, deploiement) sont en col-span-2
- Le dark mode fonctionne correctement
- Le responsive mobile empile correctement

- [ ] **Step 3: Commit**

```bash
git add src/pages/project-detail.tsx
git commit -m "style(project-detail): refonte section Resultats — bento asymetrique, parsing valeurs, cards hero/compact/wide"
```
