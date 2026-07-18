# Gotchas

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
