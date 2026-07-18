# Erreurs fréquentes

## motion-v introuvable au runtime

**Symptôme**: Les animations ne fonctionnent pas, erreur console sur motion-v

**Cause**: La dépendance Vite optimizeDeps est manquante ou supprimée de `nuxt.config.ts`

**Solution**: Vérifier que `nuxt.config.ts` contient :

```ts
vite: {
  optimizeDeps: {
    include: ['motion-v', 'framer-motion', 'framer-motion/dom']
  }
}
```

## Contact form → 500

**Symptôme**: Erreur 500 à l'envoi du formulaire de contact

**Cause**: Variables d'environnement manquantes

**Solution**: Vérifier `.env` contient :
- `NUXT_USESEND_API_KEY`
- `NUXT_FROM_EMAIL`
- `NUXT_CONTACT_EMAIL`
- `NUXT_USESEND_BASE_URL` (optionnel, pour self-hosted UseSend)

Les clés `runtimeConfig` : `usesendApiKey`, `fromEmail`, `contactEmail`, `usesendBaseUrl`

## Typecheck bloque le build

**Symptôme**: `pnpm typecheck` échoue, build cassé

**Cause**: Incompatibilité de types, imports manquants

**Solution**: Corriger les types avant de build. Ne pas utiliser `// @ts-nocheck` ou `as any` sauf si vraiment nécessaire.

## Dossier content/ manquant

**Symptôme**: Avertissement sur `@source` dans le CSS

**Cause**: `@source "../../../content/**/*"` dans `main.css` et `ui.content: true` dans config sont des artefacts du template Nuxt UI Portfolio

**Solution**: Ignorer — il n'y a pas de dossier `content/` dans ce projet. Ne pas le créer.
