# Nuxt Portfolio — AI Memory

## Résumé

Portfolio full-stack basé sur Nuxt 4 + Nuxt UI v4 + Tailwind CSS v4.
Tout le contenu est data-driven depuis `app/data/*.ts`. Pas de CMS, pas de `nuxt/content`.

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
- Tout le contenu se modifie dans `app/data/*.ts`, pas de CMS
- Erreur de type = build cassé ; les corriger avant de continuer
- `@source "../../../content/**/*"` et `ui.content: true` sont des artefacts — pas de dossier `content/`

## Erreurs fréquentes

- **`motion-v` non trouvé au runtime** → vérifier `vite.optimizeDeps.include` dans `nuxt.config.ts`
- **Contact form 500** → vérifier les 4 vars d'env (`NUXT_USESEND_API_KEY`, `NUXT_FROM_EMAIL`, `NUXT_CONTACT_EMAIL`, `NUXT_USESEND_BASE_URL`)
- **Typecheck failures** → souvent des imports manquants ou types incompatibles ; ne pas ignorer
- **`content/` directory not found** → ne pas recréer ce dossier, c'est un artefact du template
