# Analyse & Améliorations — Portfolio

## ✅ Ce qui est bon

- Stack technique propre : Nuxt 4 + Nuxt UI v4 + Tailwind v4 + motion-v
- Architecture data-driven : contenu centralisé dans `app/data/`
- i18n FR/EN, détection navigateur
- Dark/light mode fluide avec View Transition API
- Animations Motion staggered cohérentes
- SEO meta + OG images sur chaque page
- Accessibilité : labels, aria, rôles

## ✅ Changements effectués (juillet 2026)

| # | Suggestion | Statut |
|---|------------|--------|
| 1 | Photo — dualité dark/light | ✅ `UColorModeAvatar` → `<NuxtImg>`, config simplifiée `picture.src` |
| 2 | Tests | ✅ `vitest` + `@nuxt/test-utils`, tests data layer blog |
| 3 | Blog — contenu statique | ⏸ Gardé statique (12 articles, paginé) |
| 4 | Performance images | ✅ `<NuxtImg>` dans `PolaroidItem`, domaine Unsplash configuré |
| 5 | CV non disponible | ✅ Déjà OK (`/cv.pdf` existant, config OK) |
| 6 | Accessibilité carousel | ✅ `@focusin`/`@focusout` en plus de `mouseenter`/`mouseleave` |
| 7 | SEO | ✅ `@nuxtjs/sitemap` ajouté + configuré |
| 8 | Error page | ✅ Déjà OK (`app/error.vue` existant) |
| 9 | Pagination blog | ✅ 6 posts/page avec navigation paginée |
| 10 | Sécurité contact | ✅ Honeypot (champ caché) + rate limiting (3 req/min/IP) |

## 📝 Détail des changements

### 1. Photo — `UColorModeAvatar` → `<NuxtImg>`
- `app/components/landing/Hero.vue` — remplacement + suppression dépendance dualité
- `app/pages/about.vue` — idem
- `app/app.config.ts` — `picture.dark`/`light` fusionné en `picture.src`

### 2. Tests
- `vitest.config.ts` avec `@nuxt/test-utils`
- `tests/blog.test.ts` — pagination, tri, lookup
- `pnpm test` / `pnpm test:watch`

### 3. Blog — performances & UX
- Pagination : 6 posts/page, navigation prev/next, scroll to top
- Images blog déjà présentes dans `/public/img/blog/` (12 fichiers)

### 4. Optimisation images
- `app/components/PolaroidItem.vue` — `<img>` → `<NuxtImg>`
- `nuxt.config.ts` — `image.domains: ['images.unsplash.com']`

### 5. Sécurité contact
- **Honeypot** : champ `_hp` caché (CSS `left:-9999px`, `tabindex=-1`), rejeté côté serveur si rempli
- **Rate limiting** : `Map<IP, {count, resetAt}>`, max 3 requêtes / 60s par IP

### 6. SEO
- `@nuxtjs/sitemap` v8 installé, sitemap statique configuré

### 7. Accessibilité carousel
- `app/components/landing/Testimonials.vue` — pause autoplay aussi au `focusin`/`focusout`

## 🚀 Améliorations futures possibles

| Priorité | Suggestion |
|----------|------------|
| 🟡 Moyenne | Tests composants landing (mount + rendu) |
| 🟡 Moyenne | Tests e2e Playwright |
| 🟡 Moyenne | Migration blog → nuxt/content ou CMS |
| 🟡 Moyenne | RSS feed |
| 🟢 Faible | Vérification contrastes couleurs |
