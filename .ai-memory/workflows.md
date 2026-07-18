# Workflows

## Développement

```bash
pnpm dev         # Lance le dev server
pnpm lint:fix    # Auto-format avant commit (optionnel)
pnpm lint        # Vérification ESLint
pnpm typecheck   # Vérification TypeScript
pnpm build       # Build production (inclut lint + typecheck automatiquement)
```

## Avant commit

1. Vérifier `git status` / `git diff`
2. `pnpm lint` (ou `pnpm lint:fix` pour auto-corriger)
3. `pnpm typecheck` — bloquant, doit passer
4. Commiter uniquement les fichiers prévus
5. Ne pas commiter de secrets (API keys, .env)

## Modification de contenu

1. Identifier la section à modifier dans `app/data/*.ts`
2. Modifier les données
3. Vérifier le rendu : `pnpm dev`
4. Si le body markdown change : vérifier `MarkdownRenderer.vue`

## Ajout d'une page

1. Créer le fichier dans `app/pages/`
2. Ajouter les données dans `app/data/`
3. Ajouter le lien dans `app/utils/links.ts` (si navigation)
4. Ajouter les traductions dans `i18n/locales/fr.json` et `i18n/locales/en.json`
5. Tester avec `pnpm dev`

## Déploiement

```bash
pnpm generate    # Export statique (SSG)
pnpm preview     # Preview locale du build
```

Le build statique est dans `dist/`. Prêt pour déploiement Vercel/Netlify/Cloudflare.
