# Git Workflow + CHANGELOG Integration

## 🔄 Workflow Quotidien

### Début d'une feature
```bash
git checkout dev
git pull origin dev
git checkout -b feature/nom-de-la-feature
```

### Pendant le développement
```bash
# 1. Code tes changes
# 2. TOUJOURS mettre à jour CHANGELOG.md dans [Unreleased]
# 3. Commit avec template
git add .
git commit  # Template s'ouvre automatiquement
```

### Format commit (template configuré)
```
feat(contact): add form validation with success animation

- Implement email validation with regex patterns
- Add success animation after form submission  
- Update CHANGELOG.md with new features
- Add unit tests for validation logic

Closes #123
```

## 🚀 Release Process

### 1. Préparation release (sur dev)
```bash
# Vérifier que tout est prêt
pnpm run release:check

# Si OK, préparer la release
vim CHANGELOG.md
# Transformer [Unreleased] → [1.3.0] - 2025-01-15

vim package.json  
# "version": "1.3.0"

git add CHANGELOG.md package.json
git commit -m "chore: prepare release v1.3.0

- Update CHANGELOG.md with v1.3.0 entries
- Bump package.json version to 1.3.0"
```

### 2. Création du tag et déploiement
```bash
# Merge vers main
git checkout main
git pull origin main
git merge dev
git push origin main

# Créer tag (déclenche GitHub Actions automatiquement)
git tag -a v1.3.0 -m "Release v1.3.0

Features:
- Contact form with validation
- Dark mode toggle

Performance:
- Bundle size reduction"

git push origin v1.3.0

# Retour sur dev
git checkout dev
```

### 3. Automatisation (GitHub Actions)
Le push du tag déclenche automatiquement :
- ✅ Tests (unit + e2e + lint)
- ✅ Build
- ✅ Création GitHub Release avec notes du CHANGELOG
- ✅ Déploiement Vercel (si configuré)

## 🛠️ Commandes utiles

```bash
# Vérifier sync version/CHANGELOG
pnpm run version:sync

# Vérifier si prêt pour release  
pnpm run release:check

# Voir commits depuis dernière version
git log v1.2.0..HEAD --oneline

# Générer changelog rapide
git log v1.2.0..HEAD --pretty=format:"- %s" --no-merges
```

## 📋 Checklist release

### Avant tag
- [ ] Tests passent (`pnpm run test:run`)
- [ ] Linting propre (`pnpm run lint`)  
- [ ] CHANGELOG.md à jour avec nouvelle version
- [ ] package.json version bump
- [ ] `pnpm run release:check` vert

### Après tag
- [ ] GitHub Actions successful
- [ ] GitHub Release créée automatiquement
- [ ] Vercel déployé
- [ ] Team notifiée (optionnel)

## 🎯 Template CHANGELOG [Unreleased]

```markdown
## [Unreleased]

### Added
- New feature descriptions

### Changed  
- Modified functionality

### Fixed
- Bug fixes with specific descriptions

### Performance
- Optimization improvements with metrics

### Documentation
- Docs updates and improvements
```

## 🚫 Erreurs communes

❌ **Oublier CHANGELOG** → CI peut rejeter
❌ **Version pas sync** → `pnpm run version:sync` pour vérifier  
❌ **Tests failing** → Toujours `pnpm run release:check` avant
❌ **Tag sans prefix v** → Utiliser `v1.3.0` pas `1.3.0`