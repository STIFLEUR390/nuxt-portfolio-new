# Architecture — Migration Directus

## Contexte

Migration des données statiques (`app/data/*.ts`) vers Directus CMS (`portfolio-directus.aplix.nl`).
Les pages utilisent des composables qui tentent Directus en premier, avec fallback statique.

## Collections Directus (19)

### Singletons
- `global_settings` — config site (email, CV, disponibilité, footer)
- `about_content` — contenu page "À propos" (body markdown)

### Collections avec traductions
- `pages` — SEO/metadata par page (index, projects, about, contact, blog)
- `projects` — projets avec tags (M2M)
- `blog_posts` — articles de blog (M2M tags)
- `services` — services landing
- `experience` — expériences (O2M highlights)
- `experience_highlights` — points clés
- `testimonials` — témoignages
- `faq_categories` — catégories FAQ (O2M items)
- `faq_items` — questions/réponses

### Collections sans traductions
- `social_links` — liens footer
- `project_tags` / `blog_tags` — tags
- `stack_categories` / `stack_items` — stack technique
- `project_tag_assignments` / `blog_tag_assignments` — jonctions M2M
- `profile_images` — jonction about_content ↔ images

## Nuxt Config

Module `nuxt-directus-sdk` dans nuxt.config.ts :
- `url`: DIRECTUS_URL from .env
- `proxy.enabled`: true (production)
- `types.prefix`: 'App' (AppPage, AppProject, etc.)
- `image.setDefaultProvider`: true
- `visualEditor`: false (désactivé)

## Composables

- `usePageMeta(slug)` — SEO metadata d'une page
- `useGlobalSettings()` — settings + social links
- `useLandingData()` — landing complète (services, stack, experience, testimonials, faq, blog)
- `useProjects()` — projets page + liste
- `useBlog(page)` / `useBlogPost(slug)` — blog paginé + article
- `useAboutPage()` — about page content

## Données statiques (fallback)

Les fichiers dans `app/data/` servent de fallback si Directus n'est pas accessible.
Les pages hybrides : `const { data } = useXxx()` avec `const page = computed(() => data.value || staticData)`.

## Pipeline

1. `pnpm dev` / `pnpm build` → typegen Directus (`#build/types/directus.d.ts`)
2. Pages → composables → `useAsyncData` → `directus.request(readItems(...))`
3. Si Directus répond → utiliser les données CMS
4. Si Directus échoue → fallback statique
