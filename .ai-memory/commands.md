# Commandes

```bash
pnpm dev          # Dev server → localhost:3000
pnpm build        # Production build
pnpm generate     # Static export (SSG)
pnpm preview      # Preview production build
pnpm lint         # ESLint (@nuxt/eslint)
pnpm lint:fix     # ESLint auto-fix
pnpm typecheck    # vue-tsc via nuxt typecheck
pnpm postinstall  # nuxt prepare (auto-run)
```

## Ordre avant commit

1. `pnpm lint`
2. `pnpm typecheck`

Les erreurs de typecheck bloquent la compilation — les corriger obligatoirement.

## Notes

- Pas de test suite
- Pas de CI/CD
- Utiliser pnpm pour les commandes (bun.lock existe mais README dit pnpm)
