# Architecture

## Stack

- **Framework**: Nuxt 4 + Nuxt UI v4 + Tailwind CSS v4
- **Package manager**: pnpm (bun.lock aussi présent)
- **TypeScript**: strict via vue-tsc
- **Animations**: `motion-v` (wrapper Vue pour framer-motion)
- **Erreurs**: Rustrak (codegraph daemon)
- **i18n**: `@nuxtjs/i18n` (FR par défaut, EN sans préfixe)
- **OG images**: `nuxt-og-image` + `@takumi-rs/core`

## Entrypoint

```
app/app.vue
  └─ <UApp locale={locales[locale]} toaster={bottom-right, 5s, expandable}>
       └─ <NuxtLayout>
            └─ <MotionConfig reduced-motion="user">
                 └─ <NuxtPage />
  └─ <ClientOnly />
```

- `app.vue` : `useLocaleHead()` pour meta/links i18n, `useSeoMeta()` pour Twitter Card
- Layout `default.vue` : `UContainer sm:border-x border-default`, skip-link, AppHeader + AppFooter
- Error page `error.vue` : standalone (pas de layout), rend AppHeader + UError + AppFooter inline + UToaster

## Data flow

```
app/data/*.ts  ──>  pages/*.vue  ──>  components/ (landing/*.vue, custom)
```

Tout le contenu vit dans `app/data/`. Les pages importent ces données et les passent aux composants.

### Fichiers data

| Fichier | Contenu |
|---|---|
| `app/data/index.ts` | Hero, services, about, experience, stack, testimonials, FAQ, blog |
| `app/data/projects.ts` | Projets |
| `app/data/about.ts` | Page about |
| `app/data/blog.ts` | Articles de blog (body markdown) |
| `app/data/types.ts` | Interfaces TypeScript partagées |

### Pages

| Route | Fichier |
|---|---|
| `/` | `app/pages/index.vue` |
| `/projects` | `app/pages/projects.vue` |
| `/about` | `app/pages/about.vue` |
| `/contact` | `app/pages/contact.vue` |
| `/blog` | `app/pages/blog/index.vue` |
| `/blog/[...slug]` | `app/pages/blog/[...slug].vue` |

### Composants personnalisés

- `PolaroidItem.vue`, `ProjectImage.vue`, `MarkdownRenderer.vue`, `ColorModeButton.vue`
- `OgImage/Portfolio.takumi.vue` — template OG image personnalisé
- `landing/` : Hero, Services, About, WorkExperience, Stack, Blog, Testimonials, FAQ

## Composables & Utils

- `useAppToast()` : wrapper autour de `useToast()` avec success/error/warning/info
- `copyToClipboard()` : copie + toast feedback
- `navLinks` : tableau `NavigationMenuItem[]` pour le header

## Config

| Fichier | Rôle |
|---|---|
| `nuxt.config.ts` | Modules, i18n, runtimeConfig, vite optimizeDeps, nitro prerender, OG |
| `app/app.config.ts` | `ui.colors`, `global` (email, meetingLink, social), footer links |
| `app/assets/css/main.css` | `@import "tailwindcss" "@nuxt/ui"`, fonts, safe-area-inset |

## Contact form

`POST /api/contact` → `usesend-js` → email via UseSend.
Handler dans `server/api/contact.post.ts`.
Variables d'env → `runtimeConfig` : `usesendApiKey`, `fromEmail`, `contactEmail`, `usesendBaseUrl`.

## SEO

- `useSeoMeta()` + `useLocaleHead()` via `@nuxtjs/i18n`
- Title template : `%s - Franck Hérold TAMTO TAMKO · Full-Stack Developer`
- OG image : `nuxt-og-image` avec `zeroRuntime: true`, template custom `OgImage/Portfolio.takumi.vue`

## i18n

- `@nuxtjs/i18n` module
- FR par défaut, EN sans préfixe, stratégie `prefix_except_default`
- Détection navigateur activée
- Fichiers : `i18n/locales/fr.json`, `i18n/locales/en.json`
