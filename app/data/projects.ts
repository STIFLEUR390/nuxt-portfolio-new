import type { PageData, ProjectItem } from '~/data/types'

export const projectsPage: PageData = {
  seo: {
    title: 'Projets',
    description: 'Découvrez mes projets phares : applications SaaS, marketplaces, APIs, plateformes métier et outils modernes.'
  },
  title: 'Des projets concrets, orientés résultats.',
  description: 'Chaque projet raconte une histoire : un besoin, une solution technique, un livrable. Voici une sélection de mes réalisations les plus significatives.',
  links: [
    { label: 'Discutons de votre projet', color: 'neutral' },
    { label: 'M\'écrire' }
  ]
}

export const projects: ProjectItem[] = [
  {
    title: 'KwikTalk — WhatsApp Marketing SaaS',
    description: 'Plateforme SaaS de gestion de contacts WhatsApp avec Laravel 13 et Inertia.js v3. Synchronisation via Evolution Go API, RBAC complet, campagnes de messages, templates dynamiques, facturation et abonnements.',
    image: '/img/projects/kwiktalk.jpg',
    url: 'https://github.com/STIFLEUR390/kwiktalk-inertiajs',
    tags: ['Laravel 13', 'Inertia.js', 'Vue 3', 'shadcn-vue', 'WhatsApp API', 'SaaS'],
    date: '2026'
  },
  {
    title: 'TCF Canada Suite — Préparation aux examens',
    description: 'Plateforme SaaS complète de préparation au TCF Canada : quiz chronométrés, 4 compétences (CE, CO, EE, EO), abonnements multi-paiements (Stripe, Flutterwave, NotchPay), panel admin Filament 3, scraping AdonisJS.',
    image: '/img/projects/tcf-canada.jpg',
    url: 'https://github.com/STIFLEUR390/tool-tcf-canada',
    tags: ['Laravel', 'Livewire', 'Filament', 'AdonisJS', 'Stripe', 'Flutterwave'],
    date: '2023'
  },
  {
    title: 'E-Key Market — Marketplace e-commerce',
    description: 'Marketplace digitale avec catalogue, panier, checkout, authentification, dashboard utilisateur, wishlist, programme de fidélité et responsive design. State management Pinia, routing Vue Router, UI Tailwind CSS.',
    image: '/img/projects/ekey-market.jpg',
    url: 'https://github.com/STIFLEUR390/etech-store-front',
    tags: ['Vue 3', 'Pinia', 'Tailwind CSS', 'E-commerce', 'Vite'],
    date: '2025'
  },
  {
    title: 'Nuxt Modern Starter — Template full-stack',
    description: 'Template GitHub public pour démarrer des projets Nuxt 4 avec auth OIDC/Keycloak, monitoring Sentry, i18n, RGPD, PWA, shadcn-vue, Reka UI et dashboard admin prêt à l\'emploi.',
    image: '/img/projects/nuxt-starter.jpg',
    url: 'https://github.com/STIFLEUR390/nuxt-modern-starter',
    tags: ['Nuxt 4', 'OIDC', 'Keycloak', 'shadcn-vue', 'PWA', 'Sentry'],
    date: '2026'
  },
  {
    title: 'HookBridge API — Gestion de webhooks',
    description: 'API REST Laravel complète pour centraliser la gestion de projets, webhooks et callbacks. Architecture Repository + Service + Policy, API versionnée, jobs asynchrones, documentation complète.',
    image: '/img/projects/hookbridge.jpg',
    url: 'https://github.com/STIFLEUR390/hookbridge-api',
    tags: ['Laravel', 'PHP 8.3', 'REST API', 'MySQL', 'Repository Pattern'],
    date: '2025'
  },
  {
    title: 'Kit — Opinionated API Starter',
    description: 'Starter API Laravel opinionated : Sanctum, contrôleurs invokables, Scribe + OpenAPI contract tests, routes versionnées, SQLite-first, Saloon, Stripe, RBAC, Sunset middleware, DDEV.',
    image: '/img/projects/kit-api.jpg',
    url: 'https://github.com/STIFLEUR390/kwiktalk-api',
    tags: ['Laravel 12', 'Sanctum', 'Scribe', 'OpenAPI', 'PHP 8.5', 'DDEV'],
    date: '2026'
  },
  {
    title: 'BookShelf — Exploration de livres',
    description: 'Application web 100% frontend interrogeant l\'API publique OpenLibrary. Recherche par mot-clé, filtres, pagination, couvertures. Deux versions : JavaScript natif et Vue 3 CDN pour démonstration pédagogique.',
    image: '/img/projects/bookshelf.jpg',
    url: 'https://github.com/STIFLEUR390/book-shelf',
    tags: ['Vue 3', 'Bootstrap', 'OpenLibrary API', 'JavaScript', 'CDN'],
    date: '2025'
  },
  {
    title: 'AI Tools Platform — Documentation & outils IA',
    description: 'Plateforme de documentation sur Claude Code, Cursor et Windsurf avec Mintlify. Interface Nuxt pour gérer les règles AI (Cursor Rules). Bonnes pratiques, workflows et astuces pour les développeurs fullstack utilisant l\'IA.',
    image: '/img/projects/ai-tools.jpg',
    url: 'https://github.com/STIFLEUR390/nuxt-ai-tool',
    tags: ['Nuxt', 'Mintlify', 'TypeScript', 'AI', 'Documentation'],
    date: '2025'
  }
]
