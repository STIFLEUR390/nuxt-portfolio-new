# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev           # Dev server on http://localhost:3000
pnpm build         # Production build (requires 2.5GB+ Node memory)
pnpm lint          # ESLint (uses @nuxt/eslint)
pnpm lint:fix      # ESLint auto-fix
pnpm typecheck     # vue-tsc via nuxt typecheck (blocks build on failure)
pnpm test          # Vitest
pnpm test:watch    # Vitest watch mode
pnpm generate      # Static export
pnpm preview       # Preview production build
pnpm postinstall   # nuxt prepare (auto-runs on install)
```

Always run `pnpm lint` then `pnpm typecheck` before committing. Typecheck errors block compilation.

## Key Stack

| Layer | Technology |
|-------|-----------|
| Framework | Nuxt 4 + Vue 3 |
| UI | Nuxt UI v4 + Tailwind CSS v4 |
| i18n | `@nuxtjs/i18n` (FR default, EN prefix-less at `/en/...`) |
| CMS | `nuxt-directus-sdk` v6.1.2 → Directus at `portfolio-directus.aplix.nl` |
| Animations | `motion-v` (framer-motion Vue wrapper) |
| Contact | `usesend-js` (form → email API) |
| SEO | `nuxt-og-image` + `@nuxtjs/sitemap` |
| Tests | Vitest + `@nuxt/test-utils` |
| Node | >=22 (see `.nvmrc`) |

## Project Architecture

### Content Sources (hybrid Directus/static pattern)

All pages fetch data from **Directus CMS first**, falling back to **static files** in `app/data/`:

```
Pages → Composables (useAsyncData) → Directus SDK (SSR with admin token)
                                      ↕ (fallback on error)
                                      app/data/*.ts
```

6 composables in `app/composables/`:
- `useLandingData()` — home page (services, stack, experience, testimonials, FAQ, blog, page meta)
- `useGlobalSettings()` — site config + social links
- `useProjects()` — projects page + project list with tags
- `useBlog(page)`, `useBlogPost(slug)`, `useLatestPosts(limit)` — blog with pagination
- `useAboutPage()` — about page content
- `usePageMeta(slug)` — SEO metadata for any page

### Data Fetching Details

- All Directus SDK calls use `as const` on collection names for type inference: `readItems('pages' as const, ...)`
- Composables request explicit field lists (not `*`) to avoid alias field issues (e.g., `translations`)
- Directus returns `null` but Vue props expect `undefined` — use `|| undefined` coercion in mappings
- Singleton collections use `readSingleton('collection' as const)`

### Pages

```
app/pages/
├── index.vue          # Landing page (Hero, Services, Stack, Experience, etc.)
├── projects.vue       # 8 projects with tags, GitHub links, demos
├── about.vue          # About page with markdown content
├── contact.vue        # Contact form → /api/contact → useSend email
└── blog/
    ├── index.vue      # Paginated blog list (6 per page, 12 posts total)
    └── [...slug].vue  # Single blog post (markdown body via marked, surround nav)
```

### Components

```
app/components/
├── AppFooter.vue         # Social links, credits, color mode
├── AppHeader.vue         # Navigation menu (UNavigationMenu)
├── ColorModeButton.vue   # Dark/light toggle with View Transition API
├── MarkdownRenderer.vue  # Renders markdown → HTML via `marked` library
├── PolaroidItem.vue      # Polaroid-style image for about page
├── ProjectImage.vue      # Project card image
└── landing/
    ├── Hero.vue, Services.vue, Stack.vue, WorkExperience.vue
    ├── Testimonials.vue, FAQ.vue, Blog.vue, About.vue
```

### Layout & App Config

- `app/layouts/default.vue` — standard layout (AppHeader + AppFooter + UToaster)
- `app/app.config.ts` — global persona settings (photo, email, CV, calendar link), UI theme overrides, footer social links (GitHub, LinkedIn, X)
- `app/app.vue` — root: wraps `<NuxtPage>` in `<UApp>` with locale, toaster config, `MotionConfig`

### i18n

- `i18n/locales/fr.json` + `en.json` — translation strings for nav, hero, SEO, contact placeholders
- Strategy: `prefix_except_default` (FR at `/`, EN at `/en/...`)
- Cookie-based browser language detection (`i18n_redirected`)
- Navigation links in `app/utils/links.ts` — hardcoded French labels, router-links array

### Styles

- CSS entry: `app/assets/css/main.css` (`@import "tailwindcss"` + `@import "@nuxt/ui"`)
- Fonts: `--font-sans`: Public Sans, `--font-serif`: Instrument Serif (hero only)
- Container: `--ui-container: var(--container-4xl)` (56rem max-width)
- Colors: primary=blue, neutral=zinc (set in `app/app.config.ts`)
- ESLint: commaDangle: never, braceStyle: 1tbs, no-explicit-any: off

### TODO / Remaining Migration

- `profile_images` junction table — needs images uploaded to Directus first
- Some blog posts (9 of 12) still only exist in static fallback, not Directus
- About page images currently use Unsplash URLs in static fallback
- AppFooter social_links haven't been migrated to Directus
- Static data files (`app/data/*.ts`) should be removed once migration is fully validated

## Directus CMS Configuration

### Collections (19 total on `portfolio-directus.aplix.nl`)

**Singletons**: `global_settings`, `about_content`
**Content (translatable)**: `pages` (5 slugs), `projects`, `blog_posts`, `services`, `testimonials`, `experience`, `faq_categories`, `faq_items`
**Taxonomy**: `project_tags` (41 tags), `blog_tags` (25 tags), `stack_categories`, `stack_items`, `experience_highlights`
**Junctions**: `project_tag_assignments` (44), `blog_tag_assignments` (15), `profile_images` (empty)
**Links**: `social_links`

### Permissions (Public Read)

The **Public policy** (`abf8a154-...`) has `read` permission on all 19 content collections. This enables:
- Directus proxy (`/directus/items/*`) to work without auth
- SSR fetches use the admin token for full access
- Write operations (create/update/delete) still require admin auth

To modify permissions via API:
```bash
# Sourcing .env is required for admin token access to system collections
set -a && source .env && set +a
curl -s -X POST -H "Authorization: Bearer $DIRECTUS_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  "https://portfolio-directus.aplix.nl/permissions" \
  -d '{"policy":"<policy-uuid>","collection":"<collection>","action":"read","fields":["*"]}'
```

### Collection Meta Pitfalls

Some collections initially had `sort_field: "sort"` and `archive_field: "status"` pointing to non-existent columns, causing 403 errors on public queries. Fixed for: `blog_posts`, `projects`, `services` (sort_field removed), `pages` (archive_field removed).

### SDK Configuration (nuxt.config.ts)

```ts
directus: {
  url: process.env.DIRECTUS_URL,
  adminToken: process.env.DIRECTUS_ADMIN_TOKEN,
  proxy: { enabled: true, path: '/directus' },
  types: { prefix: 'App' },
  image: { setDefaultProvider: true },
  visualEditor: false
}
```

Required `.env` vars: `DIRECTUS_URL`, `DIRECTUS_ADMIN_TOKEN` (for typegen + SSR auth)

## Critical Gotchas

- **`motion-v` in `vite.optimizeDeps.include`** — must never be removed; prevents runtime "motion-v not found" errors
- **No `content/` directory** — project is data-driven, NOT using `nuxt/content`. `ui.content: true` in nuxt.config is an artifact; do NOT create a `content/` folder
- **Build memory** — server has only 3GB RAM; `NODE_OPTIONS=--max-old-space-size=2560` in `nixpacks.toml`
- **Hybrid fallback** — pages use `const page = computed(() => data.value || staticData)` so both Directus and static data flow through the same template
- **Directus typegen** — needs both `DIRECTUS_URL` and `DIRECTUS_ADMIN_TOKEN` in `.env`. Types are auto-generated with the `App` prefix
- **`as const` on collection names** — required for type inference in `nuxt-directus-sdk`
- **Explicit fields only** — composables must list specific fields, never `*`, because `translations` alias fields cause 500 errors on wildcard queries
- **Public collections need `sort_field`/`archive_field` cleanup** — if a collection meta references non-existent columns, public queries return 403

## Deployment (Nixpacks)

Build config in `nixpacks.toml`:
- Nitro preset: `node-server`
- Start command: `node .output/server/index.mjs`
- Build via Docker: `nixpacks build . --name nuxt-portfolio`
