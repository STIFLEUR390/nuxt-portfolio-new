# Schema Directus — Portfolio Nuxt

> Modèle de données pour remplacer les fichiers `app/data/*.ts` statiques par un headless CMS Directus.
> Architecture pensé pour Nuxt 4, i18n (fr/en), et réutilisation dans `app/pages/`.

---

## 1. Collections principales

### 1.1 `global_settings` — Singleton

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
- Les liens sociaux (GitHub, LinkedIn, X) seront gérés dans une collection dédiée `social_links`.

---

### 1.2 `social_links` — Plusieurs

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

---

### 1.3 `pages` — Plusieurs

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

---

### 1.4 `projects` — Plusieurs

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

---

### 1.5 `project_tags` — Plusieurs

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

### 1.6 `project_tag_assignments` — Jonction M2M

| Champ | Type | Notes |
|-------|------|-------|
| `id` | uuid | PK |
| `project_id` | uuid | FK → `projects.id` |
| `tag_id` | uuid | FK → `project_tags.id` |
| `sort` | integer | Ordre des tags sur le projet |

---

### 1.7 `blog_posts` — Plusieurs

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

---

### 1.8 `blog_tags` — Plusieurs

Tags pour les articles.

| Champ | Type | Interface | Notes |
|-------|------|-----------|-------|
| `id` | uuid | PK | |
| `name` | string | input | |

**Relations** :
- Jonction M2M via `blog_tag_assignments`.

---

### 1.9 `services` — Plusieurs

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

---

### 1.10 `stack_categories` — Plusieurs

Catégories de technologies (section landing).

| Champ | Type | Interface | Notes |
|-------|------|-----------|-------|
| `id` | uuid | PK | |
| `label` | string | input | `Stack principale` |
| `description` | text | textarea | Optionnel |
| `sort` | integer | sort | |

**Relations** :
- O2M vers `stack_items`.

---

### 1.11 `stack_items` — Plusieurs

Technologies individuelles.

| Champ | Type | Interface | Notes |
|-------|------|-----------|-------|
| `id` | uuid | PK | |
| `category_id` | uuid | select-dropdown-m2o | FK → `stack_categories.id` |
| `name` | string | input | `Laravel` |
| `icon` | string | input | `i-simple-icons-laravel` (optionnel) |
| `sort` | integer | sort | |

---

### 1.12 `experience` — Plusieurs

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

---

### 1.13 `experience_highlights` — Plusieurs

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

### 1.14 `testimonials` — Plusieurs

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

### 1.15 `faq_categories` — Plusieurs

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

---

### 1.16 `faq_items` — Plusieurs

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

### 1.17 `about_content` — Singleton

Contenu de la page "À propos".

| Champ | Type | Interface | Notes |
|-------|------|-----------|-------|
| `id` | uuid | PK | |
| `body` | text | input-rich-text-md | Markdown du contenu principal |
| `images` | alias | files | Photos illustratives |

**Traductions** :
- `body` (fr/en)

---

### 1.18 `profile_images` — Jonction pour les images de la page about

| Champ | Type | Notes |
|-------|------|-------|
| `id` | uuid | PK |
| `about_content_id` | uuid | FK |
| `directus_files_id` | uuid | FK |
| `sort` | integer | |

---

## 2. Résumé des relations

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

## 3. Règles générales

### Statut / Publication
- Les collections `projects`, `blog_posts` ont un champ `status` (`published`, `draft`).
- Le frontend ne doit requêter que les éléments `status = published`.

### Traductions (i18n)
- Directus gère les traductions natif via `directus_translations`.
- Chaque collection traduisible a une relation M2A vers `directus_translations`.
- Le frontend envoie le header `Accept-Language: fr` ou `en`.

### Images
- Stockées dans `directus_files`.
- Transforms via les presets Directus (thumbnail, webp).

### Ordre d'affichage
- `sort` champ présent sur toutes les collections ordonnables.
- Le frontend trie par `sort` asc, puis par `date` desc si applicable.

### Collections de jonction
- `project_tag_assignments` — relation M2M entre `projects` et `project_tags`.
- `blog_tag_assignments` — relation M2M entre `blog_posts` et `blog_tags`.

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

## 5. Endpoints API REST attendus

> Base : `https://directus.aplix.nl`

```bash
# Global
GET  /items/global_settings
GET  /items/social_links?sort=sort&filter[status][_eq]=published

# Pages
GET  /items/pages?filter[slug][_eq]=index&fields=*,translations.*

# Projets
GET  /items/projects?filter[status][_eq]=published&sort=-date
GET  /items/projects/:id?fields=*,tags.*,translations.*

# Blog
GET  /items/blog_posts?filter[status][_eq]=published&sort=-date&limit=6
GET  /items/blog_posts?filter[slug][_eq]=:slug&fields=*,tags.*,translations.*

# Landing sections
GET  /items/services?sort=sort&fields=*,translations.*
GET  /items/stack_categories?sort=sort&fields=*,items.*
GET  /items/experience?sort=sort&fields=*,highlights.*,translations.*
GET  /items/testimonials?sort=sort&fields=*,translations.*
GET  /items/faq_categories?sort=sort&fields=*,items.*,translations.*

# About
GET  /items/about_content?fields=*,images.*,translations.*
```

---

## 6. Prochaine étape

Une fois ces collections créées dans Directus :

1. **Importer les données** depuis `app/data/*.ts` via l'API REST Directus (script d'import).
2. **Créer un composable Nuxt `useDirectus`** pour encapsuler les appels API.
3. **Remplacer les imports statiques** dans chaque page par des appels au composable.
4. **Ajouter la gestion d'états** (loading, error, empty) dans chaque page.
5. **Supprimer les fichiers `app/data/*.ts`** une fois la migration validée.
