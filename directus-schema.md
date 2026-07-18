# Schema Directus — Portfolio Nuxt

> Modèle de données pour remplacer les fichiers `app/data/*.ts` statiques par un headless CMS Directus.
> Utilise **nuxt-directus-sdk** (session auth, types auto-générés, proxy, visual editor).
> Stack : Nuxt 4 + i18n (fr/en) + Nuxt UI v4.

---

## 1. Installation & configuration

### 1.1 Ajouter le module

```bash
pnpm add nuxt-directus-sdk
```

### 1.2 `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: [
    'nuxt-directus-sdk',
    // autres modules…
  ],

  directus: {
    url: process.env.DIRECTUS_URL,
    // Types auto-générés depuis le schema Directus
    types: { prefix: 'App' },
    // Proxy dev (CORS + cookies)
    proxy: { enabled: true },
    // Visual editor (édition inline depuis Directus)
    visualEditor: true
  }
})
```

### 1.3 `.env`

```dotenv
DIRECTUS_URL=https://directus.aplix.nl
DIRECTUS_ADMIN_TOKEN=<admin_token>
```

> `DIRECTUS_ADMIN_TOKEN` est nécessaire pour la **génération automatique des types TypeScript** et les opérations admin.

### 1.4 Configuration Directus (côté serveur)

```dotenv
# Directus .env
AUTH_LOCAL_MODE=session
CORS_ENABLED=true
CORS_ORIGIN=http://localhost:3000
SESSION_COOKIE_SECURE=false     # true en prod
SESSION_COOKIE_SAME_SITE=Lax
WEBSOCKETS_ENABLED=true
```

---

## 2. Collections principales

Les types sont **auto-générés** par le module à chaque build.  
Le préfixe `App` est configuré dans `nuxt.config.ts` → les interfaces deviennent `AppProject`, `AppBlogPost`, etc.

> Les collections système Directus (`DirectusUser`, `DirectusFile`) ne sont **jamais préfixées**.

---

### 2.1 `global_settings` — Singleton

Configuration globale du site.

| Champ | Type | Interface | Notes |
|-------|------|-----------|-------|
| `id` | uuid | PK | |
| `picture` | uuid | file | Photo de profil |
| `meeting_link` | string | input | Lien Cal.com |
| `email` | string | input | `heroldtamko39@gmail.com` |
| `cv_url` | string | input | Lien vers le PDF du CV |
| `available` | boolean | toggle | Disponibilité |
| `footer_credits` | string | input | `© 2026 Franck Hérold TAMTO TAMKO · Full-Stack Developer` |
| `locale` | string | select-dropdown | `fr` par défaut |

**Relations** : aucune.

**Règles** :
- Singleton — un seul enregistrement.
- Les liens sociaux (GitHub, LinkedIn, X) sont dans `social_links`.

**Requête SDK** :
```ts
const directus = useDirectus()
const settings = await directus.request(readSingleton('global_settings'))
```

---

### 2.2 `social_links` — Plusieurs

Liens sociaux du footer.

| Champ | Type | Interface | Notes |
|-------|------|-----------|-------|
| `id` | uuid | PK | |
| `label` | string | input | `GitHub`, `LinkedIn`, `X` |
| `icon` | string | input | `i-simple-icons-github` |
| `url` | string | input | URL complète |
| `sort` | integer | sort | Ordre d'affichage |
| `status` | string | select-dropdown | `published`, `draft` |

**Règles** :
- Triable via `sort`.
- `status` permet de masquer temporairement un lien.

**Requête SDK** :
```ts
const links = await directus.request(readItems('social_links', {
  sort: ['sort'],
  filter: { status: { _eq: 'published' } }
}))
```

---

### 2.3 `pages` — Plusieurs

SEO et métadonnées de chaque page statique.

| Champ | Type | Interface | Notes |
|-------|------|-----------|-------|
| `id` | uuid | PK | |
| `slug` | string | input | `index`, `projects`, `about`, `contact`, `blog` |
| `title` | string | input | Titre de la page |
| `description` | text | input-rich-text-md | Description / sous-titre |
| `seo_title` | string | input | SEO meta title (optionnel) |
| `seo_description` | text | textarea | SEO meta description (optionnel) |
| `translations` | alias | translations | Contenu traduit (fr/en) |

**Translations** (via `directus_translations`) :
| Champ | Langue | Notes |
|-------|--------|-------|
| `title` | fr + en | Titre de la page |
| `description` | fr + en | Description |
| `seo_title` | fr + en | |
| `seo_description` | fr + en | |

**Règles** :
- Le slug est fixe : `index`, `projects`, `about`, `contact`, `blog`.
- i18n gérée par le système de translations Directus.

**Requête SDK** :
```ts
const page = await directus.request(readItems('pages', {
  filter: { slug: { _eq: 'index' } },
  fields: ['*', { translations: ['*'] }]
}))
// → typé avec DirectusSchema['pages'][0]
```

---

### 2.4 `projects` — Plusieurs

Projets du portfolio.

| Champ | Type | Interface | Notes |
|-------|------|-----------|-------|
| `id` | uuid | PK | |
| `title` | string | input | Titre du projet |
| `description` | text | input-rich-text-md | Description détaillée |
| `image` | uuid | file | Image de couverture |
| `url` | string | input | Lien GitHub |
| `demo` | string | input | Lien démo (optionnel) |
| `date` | date | date | Année du projet |
| `sort` | integer | sort | Ordre d'affichage |
| `status` | string | select-dropdown | `published`, `draft` |

**Relations** :
- `tags` → m2m vers `project_tags` via `project_tag_assignments`

**Traductions** :
- `title` (fr/en)
- `description` (fr/en)

**Règles** :
- Trié par `sort` puis par `date` descendante.
- `status = draft` caché du frontend.

**Requête SDK** :
```ts
const projects = await directus.request(readItems('projects', {
  filter: { status: { _eq: 'published' } },
  sort: ['-date'],
  fields: ['*', { tags: [{ project_tag_assignments_id: [{ project_tags_id: ['*'] }] }] }]
}))

// Un seul projet par slug ou id
const project = await directus.request(readItem('projects', id, {
  fields: ['*', { tags: ['*'] }]
}))
```

---

### 2.5 `project_tags` — Plusieurs

Tags de technologie pour les projets.

| Champ | Type | Interface | Notes |
|-------|------|-----------|-------|
| `id` | uuid | PK | |
| `name` | string | input | `Nuxt 4`, `Laravel`, `Stripe` |
| `color` | string | select-color | Optionnel — couleur du badge |
| `sort` | integer | sort | |

**Relations** :
- Assigné aux projets via collection de jonction `project_tag_assignments`.

---

### 2.6 `project_tag_assignments` — Jonction M2M

| Champ | Type | Notes |
|-------|------|-------|
| `id` | uuid | PK |
| `project_id` | uuid | FK → `projects.id` |
| `tag_id` | uuid | FK → `project_tags.id` |
| `sort` | integer | Ordre des tags sur le projet |

---

### 2.7 `blog_posts` — Plusieurs

Articles de blog.

| Champ | Type | Interface | Notes |
|-------|------|-----------|-------|
| `id` | uuid | PK | |
| `title` | string | input | Titre |
| `description` | text | textarea | Résumé / extrait |
| `image` | uuid | file | Image de couverture |
| `body` | text | input-rich-text-md | Contenu markdown |
| `slug` | string | input | URL-friendly, unique |
| `date` | date | date | Date de publication |
| `min_read` | integer | input | Minutes de lecture |
| `featured` | boolean | toggle | Article en vedette |
| `status` | string | select-dropdown | `published`, `draft` |

**Relations** :
- `tags` → m2m vers `blog_tags` via `blog_tag_assignments`

**Traductions** :
- `title` (fr/en)
- `description` (fr/en)
- `body` (fr/en)

**Règles** :
- Tri par `date` descendante.
- Pagination : 6 articles par page.
- `slug` sert de clé pour le routing Nuxt `blog/[...slug].vue`.

**Requête SDK** :
```ts
// Liste paginée
const posts = await directus.request(readItems('blog_posts', {
  filter: { status: { _eq: 'published' } },
  sort: ['-date'],
  limit: 6,
  page: 1,
  fields: ['*', { tags: ['*'] }]
}))

// Article par slug
const post = await directus.request(readItems('blog_posts', {
  filter: { slug: { _eq: route.params.slug } },
  fields: ['*', { tags: ['*'] }]
}))
// → typé avec AppBlogPost[]
```

---

### 2.8 `blog_tag_assignments` — Jonction M2M

| Champ | Type | Notes |
|-------|------|-------|
| `id` | uuid | PK |
| `blog_post_id` | uuid | FK → `blog_posts.id` |
| `tag_id` | uuid | FK → `blog_tags.id` |

---

### 2.9 `services` — Plusieurs

Services proposés (section landing).

| Champ | Type | Interface | Notes |
|-------|------|-----------|-------|
| `id` | uuid | PK | |
| `title` | string | input | |
| `description` | text | textarea | |
| `icon` | string | input | `i-lucide-globe` |
| `sort` | integer | sort | |

**Traductions** :
- `title` (fr/en)
- `description` (fr/en)

**Requête SDK** :
```ts
const services = await directus.request(readItems('services', {
  sort: ['sort'],
  fields: ['*', { translations: ['*'] }]
}))
```

---

### 2.10 `stack_categories` — Plusieurs

Catégories de technologies (section landing).

| Champ | Type | Interface | Notes |
|-------|------|-----------|-------|
| `id` | uuid | PK | |
| `label` | string | input | `Stack principale` |
| `description` | text | textarea | Optionnel |
| `sort` | integer | sort | |

**Relations** :
- O2M vers `stack_items`.

**Requête SDK** :
```ts
const categories = await directus.request(readItems('stack_categories', {
  sort: ['sort'],
  fields: ['*', { items: ['*'] }]
}))
```

---

### 2.11 `stack_items` — Plusieurs

Technologies individuelles.

| Champ | Type | Interface | Notes |
|-------|------|-----------|-------|
| `id` | uuid | PK | |
| `category_id` | uuid | select-dropdown-m2o | FK → `stack_categories.id` |
| `name` | string | input | `Laravel` |
| `icon` | string | input | `i-simple-icons-laravel` (optionnel) |
| `sort` | integer | sort | |

---

### 2.12 `experience` — Plusieurs

Expériences professionnelles.

| Champ | Type | Interface | Notes |
|-------|------|-----------|-------|
| `id` | uuid | PK | |
| `position` | string | input | `Développeur Full-Stack` |
| `date_range` | string | input | `2019 - Présent` |
| `company_name` | string | input | `ETECH KEYS` |
| `company_logo` | string | input | `i-simple-icons-codefactor` (optionnel) |
| `company_url` | string | input | Lien du site (optionnel) |
| `company_color` | string | select-color | `#2563EB` (optionnel) |
| `sort` | integer | sort | |

**Relations** :
- O2M vers `experience_highlights`.

**Traductions** :
- `position` (fr/en)
- `date_range` (fr/en)

**Requête SDK** :
```ts
const experience = await directus.request(readItems('experience', {
  sort: ['sort'],
  fields: ['*', { highlights: ['*'] }]
}))
```

---

### 2.13 `experience_highlights` — Plusieurs

Points clés d'une expérience.

| Champ | Type | Interface | Notes |
|-------|------|-----------|-------|
| `id` | uuid | PK | |
| `experience_id` | uuid | select-dropdown-m2o | FK → `experience.id` |
| `text` | text | textarea | |
| `sort` | integer | sort | |

**Traductions** :
- `text` (fr/en)

---

### 2.14 `testimonials` — Plusieurs

Témoignages clients (section landing).

| Champ | Type | Interface | Notes |
|-------|------|-----------|-------|
| `id` | uuid | PK | |
| `quote` | text | textarea | |
| `author_name` | string | input | |
| `author_description` | string | input | `Fondateur de KwikTalk` |
| `author_avatar` | uuid | file | Photo (optionnel) |
| `sort` | integer | sort | |

**Traductions** :
- `quote` (fr/en)

---

### 2.15 `faq_categories` — Plusieurs

Catégories de FAQ.

| Champ | Type | Interface | Notes |
|-------|------|-----------|-------|
| `id` | uuid | PK | |
| `title` | string | input | `Services & Process` |
| `sort` | integer | sort | |

**Relations** :
- O2M vers `faq_items`.

**Traductions** :
- `title` (fr/en)

**Requête SDK** :
```ts
const faq = await directus.request(readItems('faq_categories', {
  sort: ['sort'],
  fields: ['*', { items: ['*', { translations: ['*'] }] }]
}))
```

---

### 2.16 `faq_items` — Plusieurs

Questions/réponses individuelles.

| Champ | Type | Interface | Notes |
|-------|------|-----------|-------|
| `id` | uuid | PK | |
| `category_id` | uuid | select-dropdown-m2o | FK → `faq_categories.id` |
| `label` | text | textarea | Question |
| `content` | text | input-rich-text-md | Réponse |
| `sort` | integer | sort | |

**Traductions** :
- `label` (fr/en)
- `content` (fr/en)

---

### 2.17 `about_content` — Singleton

Contenu de la page "À propos".

| Champ | Type | Interface | Notes |
|-------|------|-----------|-------|
| `id` | uuid | PK | |
| `body` | text | input-rich-text-md | Markdown du contenu principal |
| `images` | alias | files | Photos illustratives |

**Traductions** :
- `body` (fr/en)

**Requête SDK** :
```ts
const about = await directus.request(readSingleton('about_content', {
  fields: ['*', { images: ['*'] }]
}))
```

---

### 2.18 `profile_images` — Jonction pour les images de la page about

| Champ | Type | Notes |
|-------|------|-------|
| `id` | uuid | PK |
| `about_content_id` | uuid | FK |
| `directus_files_id` | uuid | FK |
| `sort` | integer | |

---

## 3. Résumé des relations

```
global_settings        (singleton)
social_links           (simple list)

pages                  (slug: index|projects|about|contact|blog)
  └─ translations      (via Directus)

projects               (m2m)
  ├─ project_tags      ─via─ project_tag_assignments
  └─ translations

blog_posts             (m2m)
  ├─ blog_tags         ─via─ blog_tag_assignments
  └─ translations

services               (simple list, translatable)
  └─ translations

stack_categories       (o2m)
  └─ stack_items

experience             (o2m)
  ├─ experience_highlights
  └─ translations

testimonials           (simple list, translatable)
  └─ translations

faq_categories         (o2m)
  ├─ faq_items
  └─ translations

about_content          (singleton)
  ├─ files (profile_images)
  └─ translations
```

---

## 4. Mapping données statiques → Collections Directus

| Fichier `app/data/` | Collection Directus |
|---------------------|-------------------|
| `index.ts` | `pages` (slug: index) + `services` + `stack_categories`/`stack_items` + `experience`/`experience_highlights` + `testimonials` + `faq_categories`/`faq_items` |
| `projects.ts` | `pages` (slug: projects) + `projects` + `project_tags` |
| `about.ts` | `pages` (slug: about) + `about_content` |
| `blog.ts` | `pages` (slug: blog) + `blog_posts` + `blog_tags` |
| `app.config.ts` | `global_settings` + `social_links` + `pages` |

---

## 5. Utilisation du SDK dans les pages Nuxt

Les composables et fonctions SDK sont **auto-importés** — pas besoin d'importer manuellement.

### 5.1 Composables disponibles

```ts
// Client Directus (toutes les requêtes)
const directus = useDirectus()

// Auth
const { user, loggedIn, login, logout } = useDirectusAuth()

// URLs fichiers
const url = getDirectusFileUrl(fileId, { width: 800, format: 'webp' })

// Upload
const uploaded = await uploadDirectusFile({ file: myFile })

// URLs Directus
const apiUrl = useDirectusUrl('items/projects')

// Visual editor
const isEditing = useDirectusVisualEditor()

// Preview mode
const isPreview = useDirectusPreview()
```

### 5.2 Pattern recommandé par page

```vue
<script setup lang="ts">
const directus = useDirectus()

const { data: projects, status, error } = await useAsyncData('projects', () =>
  directus.request(readItems('projects', {
    filter: { status: { _eq: 'published' } },
    sort: ['-date'],
    fields: ['*', { tags: ['*'] }]
  }))
)

const { data: pageMeta } = await useAsyncData('page-projects', () =>
  directus.request(readItems('pages', {
    filter: { slug: { _eq: 'projects' } },
    fields: ['*', { translations: ['*'] }]
  }))
)

// SEO
const title = pageMeta.value?.[0]?.seo_title || 'Projets'
const description = pageMeta.value?.[0]?.seo_description || ''

useSeoMeta({ title, description })
</script>

<template>
  <!-- loading -->
  <UPageSkeleton v-if="status === 'pending'" />

  <!-- error -->
  <UPageError v-else-if="error" :error="error" />

  <!-- empty -->
  <UPageEmpty v-else-if="!projects?.length" title="Aucun projet" description="Revenez plus tard" />

  <!-- data -->
  <UPage v-else>
    <UPageHero :title="pageMeta?.[0]?.title" :description="pageMeta?.[0]?.description" />
    <!-- … -->
  </UPage>
</template>
```

### 5.3 Gestion des fichiers (images)

```ts
// Image de couverture d'un projet
const coverUrl = getDirectusFileUrl(project.image, {
  width: 800,
  format: 'webp',
  quality: 80,
  fit: 'cover'
})

// Avec <NuxtImg> et le provider Directus
// l'image src est le file.id
// <NuxtImg provider="directus" :src="project.image" width="800" format="webp" />
```

### 5.4 Visual Editor (édition inline)

```vue
<DirectusVisualEditor
  collection="projects"
  :item="project.id"
  fields="title"
>
  <h2>{{ project.title }}</h2>
</DirectusVisualEditor>
```

> Activé automatiquement quand le site est chargé dans un iframe Directus.
> Un `MutationObserver` détecte les attributs `data-directus` dans le DOM et applique le SDK d'édition visuelle (`@directus/visual-editing`).

---

## 6. Migration : fichiers statiques → SDK

### 6.1 Exemple : remplacement de `app/data/projects.ts`

**Avant** (statique) :
```ts
import { projectsPage, projects } from '~/data/projects'
const page = projectsPage    // données hardcodées
```

**Après** (SDK) :
```ts
const directus = useDirectus()

const { data: projects } = await useAsyncData('projects', () =>
  directus.request(readItems('projects', {
    filter: { status: { _eq: 'published' } },
    sort: ['-date'],
    fields: ['*', { tags: ['*'] }]
  }))
)
```

### 6.2 Plan de migration

1. **Installer** `nuxt-directus-sdk` + configurer `.env` + `nuxt.config.ts`
2. **Créer les collections** dans Directus (via MCP ou UI)
3. **Importer les données** depuis `app/data/*.ts` (script d'import)
4. **Créer des composables** `useLandingData`, `useProjects`, `useBlog`, `useAbout` pour encapsuler les requêtes
5. **Remplacer les imports statiques** page par page
6. **Gérer les états** (loading / error / empty) dans chaque page
7. **Vérifier le type** avec les types auto-générés (`pnpm typecheck`)
8. **Supprimer** `app/data/*.ts` une fois la migration validée
