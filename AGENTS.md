# AGENTS.md — Nuxt Portfolio

## Stack

- **Framework**: Nuxt 4 + Nuxt UI v4 + Tailwind CSS v4
- **Package manager**: pnpm (see `README.md`)
- **TypeScript**: strict via vue-tsc
- **Motion**: `motion-v` (framer-motion Vue wrapper)

## Commands

```bash
pnpm dev          # dev server on localhost:3000
pnpm build        # production build
pnpm lint         # ESLint (uses @nuxt/eslint)
pnpm typecheck    # vue-tsc via nuxt typecheck
pnpm generate     # static export
pnpm preview      # preview production build
pnpm postinstall  # nuxt prepare (auto-runs on install)
```

Run `lint` then `typecheck` before committing. Fix typecheck errors — they block compilation.

## Contact form

The `/contact` page POSTs to `/api/contact` which sends email via `usesend-js`. Requires `.env`:

```
NUXT_USESEND_API_KEY=us_...
NUXT_FROM_EMAIL=...        # verified sender on useSend
NUXT_CONTACT_EMAIL=...     # recipient
```

## Architecture

All page content is **data-driven** from `app/data/*.ts` files — not from CMS or `nuxt/content`. Edit data there to change copy, services, projects, testimonials, FAQ, blog posts.

- `app/data/index.ts` — landing page (hero, services, about, experience, stack, testimonials, FAQ, blog)
- `app/data/projects.ts` — projects page
- `app/data/about.ts` — about page
- `app/data/blog.ts` — 12 blog posts with full markdown body
- `app/data/types.ts` — shared TypeScript interfaces

**Pages**: `app/pages/` — index, about, contact, projects, blog/index, blog/[...slug]
**Landing components**: `app/components/landing/` — Hero, Services, About, WorkExperience, Stack, Blog, Testimonials, FAQ
**Custom components**: PolaroidItem, ProjectImage, MarkdownRenderer, ColorModeButton
**Composables**: `useAppToast()` wraps `useToast()` with success/error/warning/info helpers
**Utils**: `navLinks` (router-links array), `copyToClipboard()` (with toast feedback)

## Styling conventions

- Fonts: Public Sans (`--font-sans`) for body, Instrument Serif (`--font-serif`) for hero display only
- Colors: `primary="blue"`, `neutral="zinc"` (set in `app/app.config.ts`)
- CSS entry: `app/assets/css/main.css` uses `@import "tailwindcss"` + `@import "@nuxt/ui"`
- Container max-width: `--ui-container: var(--container-4xl)` (56rem)
- Tokens used in templates: `text-highlighted`, `text-muted`, `text-primary`, `bg-elevated`, `bg-default`, `border-default`, etc. (Nuxt UI semantic tokens)
- ESLint: `commaDangle: 'never'`, `braceStyle: '1tbs'`, `no-explicit-any: off`

## Key patterns

- All reveal animations use `<Motion>` with `{ opacity: 0, transform: 'translateY(10px)' }` → `{ opacity: 1, transform: 'translateY(0)' }`, staggered by index
- `UPage` → `UPageHero`/`UPageSection` is the standard page layout
- `app/app.config.ts` holds global config: social links, email, calendar link, footer, UI theme overrides
- Navigation links defined in `app/utils/links.ts` (6 items + locale toggle + color mode in header)
- Layout: `UContainer` with `sm:border-x border-default`, fixed `UNavigationMenu` with `backdrop-blur-sm`
- i18n: French default, English prefix-less, `prefix_except_default` strategy, detects browser language
- ColorModeButton uses View Transition API for animated theme switch (circular clip-path reveal)

## Testing

No test suite exists. No CI/CD workflows.
