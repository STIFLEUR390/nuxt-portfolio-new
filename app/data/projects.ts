import type { PageData, ProjectItem } from '~/data/types'

export const projectsPage: PageData = {
  seo: {
    title: 'Projets',
    description: 'Découvrez mes projets phares : applications SaaS, marketplaces, plateformes métier et outils modernes.'
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
    description: 'Plateforme SaaS de marketing WhatsApp : envoi automatisé de campagnes, gestion de contacts, modèles de messages, statistiques en temps réel. Architecture Laravel + Vue.js avec file d\'attente Redis, webhooks et API REST.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    url: '#',
    tags: ['Laravel', 'Vue.js', 'SaaS', 'Redis', 'WhatsApp API', 'Stripe'],
    date: '2024'
  },
  {
    title: 'TCF Canada Suite',
    description: 'Plateforme complète de préparation au TCF Canada : exercices interactifs, tests blancs, suivi de progression, dashboard candidat et panneau admin. Projet longue durée (2023-2026) avec évolutions continues et déploiement Docker.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    url: '#',
    tags: ['Laravel', 'Nuxt', 'PostgreSQL', 'Docker', 'CI/CD', 'Filament'],
    date: '2023'
  },
  {
    title: 'E-Key Market',
    description: 'Marketplace digitale pour l\'achat et la vente de clés de jeux et logiciels. Paiements multiples (Stripe, Flutterwave, PayPal), gestion de stock automatisée, interface utilisateur réactive, dashboard vendeur complet.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    url: '#',
    tags: ['Laravel', 'Vue.js', 'E-commerce', 'Stripe', 'Flutterwave', 'PayPal'],
    date: '2023'
  },
  {
    title: 'Nuxt Modern Starter',
    description: 'Kit de démarrage moderne pour projets Nuxt 4 : configuration Tailwind, modules essentiels, structure clean, composants prêts à l\'emploi. Pensé pour accélérer le lancement de nouveaux projets frontend.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    url: '#',
    tags: ['Nuxt', 'Tailwind CSS', 'TypeScript', 'Starter Kit', 'Open Source'],
    date: '2025'
  }
]
