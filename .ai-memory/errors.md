# Erreurs fréquentes

## Directus — `column projects.translations does not exist`

**Symptôme**: Erreur 500 sur PATCH/POST `projects` ou `blog_posts`. SQL tente `SELECT "projects"."translations"`.

**Cause**: Le champ `translations` (alias M2M vers `directus_translations`) est mal configuré. Directus le traite comme colonne physique.

**Solution**: Supprimer le champ `translations` de la collection dans Directus. Portfolio monolingue FR, pas besoin de traductions.

## Directus SDK SSR — `Cannot use 'in' operator to search for 'getToken' in undefined`

**Symptôme**: SSR crash, page admin non hydratée, data vide.

**Cause**: `(readItems as any)('collection', {...})` casse le runtime SDK. `as any` sur la fonction modifie son comportement interne.

**Solution**: Toujours utiliser `readItems('collection' as const, {...})` — caster le paramètre string, pas la fonction. Même pattern : `(updateItem as any)` → `updateItem('collection' as const, ...)`.

## md-editor-v3 — ToolbarNames type error

**Symptôme**: `Type '"heading"' is not assignable to type 'ToolbarNames'`

**Cause**: Les noms de toolbar md-editor-v3 sont les clés de `ToolbarTips` : `title` (pas `heading`), `unorderedList` (pas `list`), `-` (pas `|`).

**Solution**: Utiliser les noms exacts : `['bold', 'italic', 'strikeThrough', 'title', '-', 'quote', 'code', '-', 'unorderedList', 'orderedList', 'table', '-', 'link', 'image', '-', 'preview', 'catalog', 'fullscreen']`

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

## Umami — pas de tracking

**Symptôme**: Aucun événement dans le dashboard Umami

**Cause**: Variables d'environnement manquantes ou mode proxy mal configuré

**Solution**:
- Vérifier `.env` contient `NUXT_UMAMI_HOST` et `NUXT_UMAMI_ID`
- Le mode `proxy: 'cloak'` nécessite un build (`pnpm dev` derrière un proxy fonctionne normalement)
- Les adblockers peuvent bloquer même en mode `cloak` ; dans ce cas essayer sans proxy ou avec `proxy: 'direct'`
