# Portfolio — Franck Hérold TAMTO TAMKO

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

Portfolio personnel de développeur full-stack. Construit avec **Nuxt 4**, **Nuxt UI v4**, **Tailwind CSS v4**.

## Stack

| Couche | Technologie |
|--------|-------------|
| Framework | Nuxt 4 + Vue 3 |
| UI | Nuxt UI v4 + Tailwind CSS v4 |
| i18n | `@nuxtjs/i18n` (FR par défaut, EN sans préfixe) |
| Animations | `motion-v` (framer-motion Vue wrapper) |
| Contact | `usesend-js` (formulaire → email) |
| SEO | Sitemap automatique + OG Images + i18n |
| Tests | Vitest + `@nuxt/test-utils` |

## Fonctionnalités

- **Landing page** — Hero, services, expérience, stack technique, témoignages, FAQ, blog
- **Projets** — 8 projets détaillés avec tags, liens GitHub et démos
- **Blog** — 12 articles tech avec markdown, pagination, search
- **Page À propos** — Parcours, compétences, software
- **Contact** — Formulaire → email via useSend
- **Mode sombre** — Toggle avec transition View API
- **i18n** — Français (défaut) / Anglais

## Démarrer

```bash
pnpm install
pnpm dev        # localhost:3000
```

## Commandes

```bash
pnpm build      # production
pnpm generate   # static export
pnpm preview    # preview production build
pnpm lint       # ESLint
pnpm typecheck  # vue-tsc (blocke la compilation)
pnpm test       # Vitest
```

## Pages

Tout le contenu est **data-driven** depuis `app/data/*.ts` :

- `index.ts` — landing page
- `projects.ts` — projets
- `about.ts` — à propos
- `blog.ts` — articles (12 posts, markdown body)
- `types.ts` — interfaces TypeScript

Éditez ces fichiers pour changer le contenu — pas de CMS, pas de `nuxt/content`.

## Déploiement

Déployé sur [Vercel](https://vercel.com) (ou tout host Node supportant Nitro).

```bash
pnpm build
```

Variables d'environnement requises pour le formulaire de contact :

```
NUXT_USESEND_API_KEY=us_...
NUXT_FROM_EMAIL=...
NUXT_CONTACT_EMAIL=...
```

## Licence

Projet personnel — tous droits réservés.
