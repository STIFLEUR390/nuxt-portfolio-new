# Plan — Interface d'administration Portfolio

> Interface admin headless CMS intégrée au Nuxt app, protégée par auth Directus.
> Route : `/portfolio` — Login : `/portfolio/login`

---

## §A — Architecture

```
app/
├── middleware/
│   └── portfolio-auth.ts          # [x] Redirige → /portfolio/login si !loggedIn
├── layouts/
│   └── portfolio.vue              # [ ] Layout admin : sidebar + header + logout
├── pages/portfolio/
│   ├── login.vue                  # [ ] Formulaire email/password → Directus login
│   ├── index.vue                  # [ ] Dashboard — stats + liens vers chaque section
│   ├── projects.vue               # [ ] CRUD projets (liste + édition inline)
│   ├── blog.vue                   # [ ] CRUD articles de blog
│   ├── pages.vue                  # [ ] Édition meta SEO des pages (slug: index, projects…)
│   ├── services.vue               # [ ] CRUD services
│   ├── experience.vue             # [ ] CRUD expériences + highlights
│   ├── stack.vue                  # [ ] CRUD catégories stack + items
│   ├── testimonials.vue           # [ ] CRUD témoignages
│   ├── faq.vue                    # [ ] CRUD FAQ catégories + questions
│   └── settings.vue               # [ ] Global settings + social links
└── components/portfolio/
    ├── Sidebar.vue                # [ ] Navigation latérale admin
    ├── DataTable.vue              # [ ] Tableau réutilisable (tri, pagination)
    ├── FormField.vue              # [ ] Champ de formulaire réutilisable
    └── EmptyState.vue             # [ ] État vide pour les listes
```

---

## §B — Étapes d'implémentation

### B.1 — Auth middleware + Login page + Layout

| # | Tâche | Fichiers | Statut |
|---|-------|----------|--------|
| 1 | Middleware `portfolio-auth` — check `loggedIn`, redirect `/portfolio/login` | `app/middleware/portfolio-auth.ts` | ⏳ |
| 2 | Login page — form email/password, Directus `login()`, redirect `/portfolio` | `app/pages/portfolio/login.vue` | ⏳ |
| 3 | Portfolio layout — sidebar nav, header user info + logout | `app/layouts/portfolio.vue` + `app/components/portfolio/Sidebar.vue` | ⏳ |
| 4 | Config `nuxt.config.ts` — ajout `directus.auth.redirect` | `nuxt.config.ts` | ⏳ |
| 5 | Dashboard `/portfolio` — cartes stats + liens vers chaque section | `app/pages/portfolio/index.vue` | ⏳ |

### B.2 — CRUD Projects

| # | Tâche | Fichiers | Statut |
|---|-------|----------|--------|
| 6 | Page liste projets — tableau avec `readItems('projects')` | `app/pages/portfolio/projects.vue` | ✅ |
| 7 | Modal create/edit projet — formulaire + `createItem()` / `updateItem()` | `app/pages/portfolio/projects.vue` | ✅ |
| 8 | Delete projet — confirmation + `deleteItem()` | `app/pages/portfolio/projects.vue` | ✅ |
| 9 | Upload image Directus via `UInput type="file"` + `uploadDirectusFile()` | `app/pages/portfolio/projects.vue` | ✅ |
| 10 | États loading / empty / error | `app/pages/portfolio/projects.vue` | ✅ |

### B.3 — CRUD Blog

| # | Tâche | Fichiers | Statut |
|---|-------|----------|--------|
| 11 | Page liste articles — tableau (image, titre, slug, lecture, date, statut, actions) | `app/pages/portfolio/blog.vue` | ✅ |
| 12 | Modal create/edit — form (titre, slug, description, body markdown, image upload, date, lecture, statut, une) | `app/pages/portfolio/blog.vue` | ✅ |
| 13 | Delete article + toggle status published/draft | `app/pages/portfolio/blog.vue` | ✅ |
| 14 | États loading / empty / error | `app/pages/portfolio/blog.vue` | ✅ |

### B.4 — CRUD contenu du site

| # | Tâche | Fichiers | Statut |
|---|-------|----------|--------|
| 13 | Services — liste + edit (title, description, icon, sort) | `app/pages/portfolio/services.vue` | ⏳ |
| 14 | Stack — catégories + items imbriqués | `app/pages/portfolio/stack.vue` | ⏳ |
| 15 | Experience — liste + highlights imbriqués | `app/pages/portfolio/experience.vue` | ⏳ |
| 16 | Testimonials — liste + edit (quote, author, avatar) | `app/pages/portfolio/testimonials.vue` | ⏳ |
| 17 | FAQ — catégories + questions imbriquées | `app/pages/portfolio/faq.vue` | ⏳ |

### B.5 — Pages SEO + Settings

| # | Tâche | Fichiers | Statut |
|---|-------|----------|--------|
| 18 | Pages SEO — édition meta title/description par slug | `app/pages/portfolio/pages.vue` | ⏳ |
| 19 | Global settings — édition singleton + social links | `app/pages/portfolio/settings.vue` | ⏳ |

### B.6 — Finalisation

| # | Tâche | Fichiers | Statut |
|---|-------|----------|--------|
| 20 | Affiner UX (toasts feedback, loading states, skeleton) | Multiples fichiers | ⏳ |
| 21 | `pnpm lint` + `pnpm typecheck` | — | ⏳ |
| 22 | Test manuel complet du flow auth + CRUD | — | ⏳ |

---

## §C — Changements / Notes par étape exécutée

| Étape | Changement effectué | Notes pour la suite |
|-------|---------------------|---------------------|
| B.1 | Middleware `portfolio-auth`, Login page, Layout + Sidebar, Dashboard | ✅ Fait |
| B.1 | `app/middleware/portfolio-auth.ts` — vérifie `loggedIn`, redirect `/portfolio/login` | OK |
| B.1 | `app/pages/portfolio/login.vue` — form email/password, `login({ redirect: false })`, la page login utilise `layout: 'portfolio'` pour avoir un rendu full-page sans sidebar | Le layout portfolio comprend la sidebar, ce qui n'est pas idéal pour la page login. Solution : la sidebar est cachée sur login car le layout l'affiche mais le login n'a pas de contenu navigable. Pour améliorer : créer un layout admin vide séparé ou utiliser `<div>` direct sans layout. |
| B.1 | `app/layouts/portfolio.vue` — layout full avec sidebar fixe + top bar + ColorModeButton | La sidebar est w-64 fixe, responsive (mobile → overlay). Fonctionne bien. |
| B.1 | `app/components/portfolio/Sidebar.vue` — nav verticale avec 10 entrées, état actif basé sur `route.path`, bouton logout avec `useDirectusAuth().logout()` | Liens : Dashboard, Projets, Blog, Services, Stack, Expériences, Témoignages, FAQ, Pages SEO, Paramètres. |
| B.1 | `app/pages/portfolio/index.vue` — Dashboard avec 4 cartes stats (projets, blog, services, témoignages) + 5 cartes liens sections | Les `aggregate` queries nécessitent un cast `as any` car le typegen Directus échoue (fetch failed). Problème pré-existant. |
| B.1 | `directus: { auth: { redirect: { login: '/portfolio/login' } } }` NON ajouté à `nuxt.config.ts` | Pas nécessaire : le middleware custom `portfolio-auth` gère la redirection. Le module `auth` middleware global n'est pas activé. |
| B.2 | `app/pages/portfolio/projects.vue` — CRUD complet : liste (tableau), create/edit (UModal), delete (inline) | ✅ Fait |
| B.2 | Utilisation de `(directus.request as any)((readItems as any)(...))` pour contourner le typegen Directus qui échoue | Pattern identique aux composables existants. À garder pour toutes les pages admin. |
| B.2 | `UTable` (TanStack) non utilisé — trop complexe pour un CRUD simple. Table HTML simple avec classes Tailwind. | Si on veut plus tard : tri, pagination, filtres → migrer vers `UTable` avec colonnes TanStack. |
| B.2 | Upload image via `UInput type="file"` + `uploadDirectusFile()` | ✨ Nouveau : plus besoin de coller un ID Directus. Upload direct vers Directus, l'ID est automatiquement stocké dans le champ `image`. |
| B.2 | `UModal` avec `v-model:open`, slots `#body` et `#footer` au lieu de wrapper `UCard` | Pattern Nuxt UI idiomatique. `title` prop utilisée pour le header. |
| B.3 | `app/pages/portfolio/blog.vue` — CRUD complet articles | ✅ Fait, reprend le même pattern que projects. Slug auto-généré depuis le titre (au blur). `type="date"` pour le champ date. Body markdown en `UTextarea` monospace. |

---

## §D — Règles techniques

1. **Auth** : utiliser `useDirectusAuth()` — `login(email, password, { redirect: false })` + navigation manuelle
2. **Middleware** : `definePageMeta({ middleware: 'portfolio-auth' })` sur chaque page `/portfolio/*`
3. **Layout** : `definePageMeta({ layout: 'portfolio' })` avec layout par défaut dédié
4. **CRUD** : utiliser `readItems`, `createItem`, `updateItem`, `deleteItem` auto-importés du SDK
5. **Feedback** : utiliser `useAppToast()` existant pour success/error
6. **Images** : utiliser `getDirectusFileUrl()` pour les aperçus, `uploadDirectusFile()` pour l'upload
7. **i18n** : l'interface admin sera en français uniquement (cohérent avec le site)
8. **Pas de registration** — un seul compte admin Directus existant

---

## §E — Dépendances

Aucune nouvelle dépendance nécessaire. Tout est déjà dans `package.json` :
- `nuxt-directus-sdk` (auth, CRUD, types)
- `@nuxt/ui` (composants UI : table, form, button, toast, modal)
- `@pinia/nuxt` (état app)
- `@iconify-json/lucide` (icônes sidebar)
- `@vueuse/nuxt` (utilitaires VueUse)

---

## §F — Notes techniques Directus SDK

```ts
// Auth déjà disponible
const { user, loggedIn, login, logout } = useDirectusAuth()

// Login manuel (sans redirect auto)
await login('email', 'password', { redirect: false })

// CRUD — auto-importé depuis nuxt-directus-sdk
const directus = useDirectus()
await directus.request(readItems('projects', { ... }))
await directus.request(createItem('projects', { ... }))
await directus.request(updateItem('projects', id, { ... }))
await directus.request(deleteItem('projects', id))

// Upload image
const uploaded = await uploadDirectusFile({ file })
const url = getDirectusFileUrl(uploaded.id, { width: 200, format: 'webp' })
```
