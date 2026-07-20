# AGENTS.md — Nuxt Portfolio

## Stack

| Layer | Tech |
|-------|------|
| Framework | Nuxt 4 + Vue 3, Nitro `node-server` preset |
| UI | Nuxt UI v4 + Tailwind CSS v4 |
| i18n | `@nuxtjs/i18n` — FR default, EN prefix-less |
| CMS | `nuxt-directus-sdk` v6.1.2 → `portfolio-directus.aplix.nl` |
| Animations | `motion-v` (framer-motion wrapper) |
| Contact | `usesend-js` |
| Markdown | `marked` (render), `md-editor-v3` (admin editor) |
| Analytics | `nuxt-umami` v3, proxy `cloak` |
| Tests | Vitest + `@nuxt/test-utils` |
| Node | >=22 (`.nvmrc`) |
| Package | pnpm |

## Commands

```bash
pnpm dev          # localhost:3000
pnpm build        # production (requires 2.5GB+ Node memory, see nixpacks.toml)
pnpm lint         # ESLint — run before typecheck
pnpm typecheck    # vue-tsc — BLOCKS compilation, fix before commit
pnpm test         # Vitest
pnpm generate     # static export
pnpm preview      # preview production build
```

Run `pnpm lint` then `pnpm typecheck` before committing.

## Content Architecture

Hybrid **Directus-first, static fallback** pattern:

```
Pages → Composables (useAsyncData) → Directus SDK
                                       ↕ (catch → null)
                                       app/data/*.ts (fallback)
```

6 composables in `app/composables/`:
- `useLandingData()` / `useProjects()` / `useBlog(page)` / `useBlogPost(slug)` / `useAboutPage()` / `useGlobalSettings()`
- All use `readItems('collection' as const, { fields: [...], ... })` with explicit field lists
- Mapped to `PageData` / `ProjectItem` / `BlogPost` types in `app/data/types.ts`

Static fallbacks in `app/data/*.ts` — delete once Directus migration is validated.

## Admin Panel (`/portfolio`)

Protected by middleware `portfolio-auth` (checks `useDirectusAuth().loggedIn`).
Login credentials in `directus_info.txt`.

| Route | Content |
|-------|---------|
| `/portfolio` | Dashboard |
| `/portfolio/login` | Login form, layout `false` |
| `/portfolio/projects` | CRUD projects |
| `/portfolio/blog` | CRUD blog (md-editor-v3 body) |

Layout `portfolio` in `app/layouts/portfolio.vue` — sidebar + top bar.
Sidebar at `app/components/portfolio/Sidebar.vue` — 10 nav links + logout.

### CRUD pattern

```ts
const FIELDS = ['id', 'title', ...] as const
const dreq = directus.request as any  // only for aggregate queries

// Read
const { data, status, refresh } = useAsyncData('key', async () => {
  try { return await directus.request(readItems('coll' as const, { fields: [...FIELDS], sort: ['-date'] })) }
  catch { return [] }
})

// Write — payload as any bypasses generated strict types
await directus.request(createItem('coll' as const, payload as any, { fields: [...FIELDS] } as any))
await directus.request(updateItem('coll' as const, id, payload as any, { fields: [...FIELDS] } as any))
await directus.request(deleteItem('coll' as const, id))
```

## Directus SDK Gotchas

- **`readItems('coll' as const, ...)`** — NEVER `(readItems as any)(...)`. The latter breaks SSR with `Cannot use 'in' operator to search for 'getToken' in undefined`.
- **Explicit fields** — always list specific fields. Never `*`. The `translations` alias field causes `column X.translations does not exist` 500 on PATCH/POST if included.
- **Payload cast** — generated types are strict. Cast payloads `as any` for `createItem`/`updateItem`.
- **Typegen** — runs on dev/build; needs `DIRECTUS_URL` + `DIRECTUS_ADMIN_TOKEN` in `.env`. Types prefixed `App`.
- **Aggregate** — not in generated schema types; cast query `as any`: `readItems('coll' as const, { aggregate: { count: '*' } } as any)`.

## Critical Gotchas

- **`motion-v` in `vite.optimizeDeps.include`** — never remove; runtime crash otherwise.
- **No `content/` dir** — `ui.content: true` in config is an artifact. Do NOT create a `content/` folder.
- **`@source "../../../content/**/*"`** in `main.css` — artifact, ignore.
- **Build memory** — 3GB server; `NODE_OPTIONS=--max-old-space-size=2560` in `nixpacks.toml`.
- **`UPage` → `UPageHero`/`UPageSection`** is the standard public page layout.
- **`useAppToast()`** in `app/composables/useAppToast.ts` — `toast.success/error/warning/info` for feedback.
- **`i-lucide-layer-stack` does NOT exist** — use `i-lucide-layers` instead.

## Deployment (Nixpacks)

```bash
nixpacks build . --name nuxt-portfolio
```

Build in `nixpacks.toml`: `NITRO_PRESET=node-server`, start with `node .output/server/index.mjs`.
Required env in production: `NUXT_USESEND_API_KEY`, `NUXT_FROM_EMAIL`, `NUXT_CONTACT_EMAIL`, `DIRECTUS_URL`, `DIRECTUS_ADMIN_TOKEN`, `NUXT_UMAMI_HOST`, `NUXT_UMAMI_ID`.

## i18n

- `strategy: 'no_prefix'` — FR default, EN via cookie detection, no URL prefix.
- `app/utils/links.ts` — hardcoded FR nav labels, router-links array.
- `useLocaleHead()` for meta/links.
- Locale files in `i18n/locales/`.
- Portfolio admin pages are FR only.
