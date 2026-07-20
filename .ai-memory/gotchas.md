# Gotchas

## Admin Panel / Portfolio

- Toutes les pages admin sont sous `app/pages/portfolio/` avec `middleware: 'portfolio-auth'`
- Layout admin : `portfolio` (sidebar + top bar) — sauf login qui utilise `layout: false`
- Les CRUD doivent utiliser `readItems('collection' as const, {...})` — NE PAS utiliser `(readItems as any)(...)` (casse le runtime SDK en SSR)
- Le champ `translations` (alias Directus) des collections `projects` et `blog_posts` a été supprimé (plantait les PATCH/POST). Portfolio monolingue FR.
- Toujours spécifier `fields: [...FIELDS]` dans les requêtes CRUD pour éviter que Directus n'ajoute `translations` automatiquement.
- Les payloads `createItem`/`updateItem` doivent être castés `as any` (types générés stricts).
- `md-editor-v3` : import du composant + CSS, wrapper `ClientOnly` pour SSR, toolbar names = clés de `ToolbarTips` (ex: `title` au lieu de `heading`, `-` comme séparateur).

## motion-v

- `motion-v` est listé dans `vite.optimizeDeps.include` de `nuxt.config.ts`
- NE PAS SUPPRIMER — nécessaire au fonctionnement au runtime
- `MotionConfig reduced-motion="user"` respecte les préférences OS

## Contenu data-driven

- TOUT le contenu est dans `app/data/*.ts`
- Pas de CMS, pas de `nuxt/content`
- Modifier les fichiers `.ts` pour changer le texte du site
- Les articles de blog ont leur body en markdown dans `app/data/blog.ts`

## i18n

- Français = locale par défaut
- Anglais = sans préfixe d'URL
- Fichiers locales dans `i18n/locales/` (`fr.json`, `en.json`)
- `@nuxtjs/i18n` avec stratégie `prefix_except_default`
- `useLocaleHead()` pour les meta/links i18n

## Styling

- `@source "../../../content/**/*"` dans `main.css` = artefact, pas de dossier `content/`
- `ui.content: true` = artefact du template
- Thème via `app/app.config.ts` (`ui.colors.primary: 'blue'`, `ui.colors.neutral: 'zinc'`)
- `--ui-container: var(--container-4xl)` = 56rem max-width
- Tokens Nuxt UI : `text-highlighted`, `text-muted`, `text-primary`, etc.

## SEO

- Title template dans `app/layouts/default.vue` : `%s - Franck Hérold TAMTO TAMKO · Full-Stack Developer`
- OG images : générées statiquement via `nuxt-og-image` avec `zeroRuntime: true`
- Template OG custom : `app/components/OgImage/Portfolio.takumi.vue` (dépend de `@takumi-rs/core`)

## Accessibilité

- Skip-link dans le layout : focus visible après tabulation
- Safe-area-inset via `env()` dans `main.css`

## Codegraph / Rustrak

- `.codegraph/` présent et actif — daemon tourne
- Utiliser codegraph pour explorer le code (plus rapide que grep/read manuel)

## Umami Analytics

- `nuxt-umami` v3 — module `nuxt-umami` dans `nuxt.config.ts` + bloc `umami`
- `proxy: 'cloak'` — le host et id restent côté serveur ; nécessite un build pour les tests
- `ignoreLocalhost: true` — pas de tracking en dev, penser à désactiver pour tester ses propres visites
- `autoTrack: true` — tracking automatique via `<NuxtPage>` ; si une page n'a pas `<NuxtPage>`, tracker manuellement avec `umTrackView()` dans `onMounted`
- Pour exclure son propre navigateur : `localStorage.setItem('umami.disabled', '1')`
- Les composables sont auto-importés : `umTrackView()`, `umTrackEvent()`, `umIdentify()`, `umTrackRevenue()`
