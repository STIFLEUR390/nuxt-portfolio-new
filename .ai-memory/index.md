# Nuxt Portfolio — AI Memory

## Résumé

Portfolio full-stack basé sur Nuxt 4 + Nuxt UI v4 + Tailwind CSS v4.
Migration en cours : données statiques (`app/data/*.ts`) → Directus CMS (`portfolio-directus.aplix.nl`).
Utilise `nuxt-directus-sdk` v6.1.2 avec session auth, proxy, types auto-générés (préfixe App).
Analytics : Umami via `nuxt-umami` v3 avec `proxy: 'cloak'`.

Site personnel de Franck Hérold TAMTO TAMKO, développeur Full-Stack (Laravel, Vue, Nuxt, Inertia.js, PostgreSQL).

## Liens rapides

- [Architecture](architecture.md)
- [Commandes](commands.md)
- [Erreurs fréquentes](errors.md)
- [Gotchas](gotchas.md)
- [Tests](tests.md)
- [Workflows](workflows.md)

## Conventions importantes

- `pnpm lint` puis `pnpm typecheck` avant tout commit
- `motion-v` dans `vite.optimizeDeps.include` — NE PAS SUPPRIMER (casse le runtime)
- Tout le contenu se modifie maintenant soit dans Directus (CMS), soit dans les données statiques `app/data/*.ts` (fallback)
- Erreur de type = build cassé ; les corriger avant de continuer
- `@source "../../../content/**/*"` et `ui.content: true` sont des artefacts — pas de dossier `content/`
- `nuxt-directus-sdk` configuré dans `nuxt.config.ts` avec `proxy: true`, `types.prefix: 'App'`, `image.setDefaultProvider: true`
- Umami analytics : `NUXT_UMAMI_HOST` + `NUXT_UMAMI_ID` dans `.env` ; mode `proxy: 'cloak'` pour protéger les identifiants

## Erreurs fréquentes

- **`motion-v` non trouvé au runtime** → vérifier `vite.optimizeDeps.include` dans `nuxt.config.ts`
- **Contact form 500** → vérifier les 4 vars d'env (`NUXT_USESEND_API_KEY`, `NUXT_FROM_EMAIL`, `NUXT_CONTACT_EMAIL`, `NUXT_USESEND_BASE_URL`)
- **Typecheck failures** → souvent des imports manquants ou types incompatibles ; ne pas ignorer
- **`content/` directory not found** → ne pas recréer ce dossier, c'est un artefact du template
- **Umami pas de tracking** → vérifier `NUXT_UMAMI_HOST` et `NUXT_UMAMI_ID` dans `.env`, mode `cloak` nécessite un build (`pnpm dev` ne suffit pas si le endpoint n'est pas accessible)
- **`column X.translations does not exist`** → champ `translations` alias mal configuré dans Directus. Solution : supprimer le champ `translations` de la collection dans Directus (portfolio monolingue FR).
- **SSR `Cannot use 'in' operator to search for 'getToken' in undefined`** → ne pas utiliser `(readItems as any)(...)`. Utiliser `readItems('collection' as const, {...})` (caster le paramètre string, pas la fonction).
- **`updateItem`/`createItem` erreur 500 avec `translations`** → pareil, retirer le champ de la collection Directus.

## Interface d'administration

- Route : `/portfolio` — accès protégé par middleware `portfolio-auth`
- Login : `/portfolio/login` — utilise `useDirectusAuth().login()`, layout `false` (full-page)
- Layout : `portfolio` (`app/layouts/portfolio.vue`) — sidebar fixe w-64 + top bar
- Sidebar : `app/components/portfolio/Sidebar.vue` — 10 liens de navigation + logout
- Dashboard : `/portfolio/index` — stats (projets, blog, services, témoignages) + cartes sections
- CRUD Projets : `/portfolio/projects` (list, create, edit, delete, upload image Directus)
- CRUD Blog : `/portfolio/blog` (list, create, edit, delete, upload image, éditeur markdown `md-editor-v3`)

### Pattern CRUD admin

```ts
// Toujours spécifier fields explicitement pour éviter translations
const FIELDS = ['id', 'title', '...'] as const

// Read - try/catch avec fallback []
const { data, status, refresh } = useAsyncData('key', async () => {
  try {
    return await directus.request(readItems('collection' as const, { fields: [...FIELDS], sort: ['-date'] }))
  } catch { return [] }
})

// Create/Update - payload as any, fields dans opts
await directus.request(createItem('collection' as const, payload as any, { fields: [...FIELDS] } as any))
await directus.request(updateItem('collection' as const, id, payload as any, { fields: [...FIELDS] } as any))

// Delete
await directus.request(deleteItem('collection' as const, id))
```

### Composants Nuxt UI utilisés dans l'admin

- `UModal` avec `v-model:open`, slots `#body` + `#footer`
- `UCard`, `UInput`, `UTextarea`, `USelect`, `UButton`, `UBadge`, `UIcon`, `USkeleton`
- `MdEditor` de `md-editor-v3` pour le body markdown (import + CSS séparé, `ClientOnly`)
