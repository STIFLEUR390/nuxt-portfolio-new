import type { PageData } from '~/data/types'

export const indexPage: PageData = {
  seo: {
    title: 'Franck Hérold TAMTO TAMKO - Développeur Full-Stack Laravel / Vue.js / Nuxt',
    description: 'Développeur Full-Stack basé à Douala. Je conçois des applications web modernes, SaaS, APIs et outils métiers avec Laravel, Vue.js, Nuxt, Inertia.js et PostgreSQL.'
  },
  title: 'Développeur Full-Stack, applications web & SaaS',
  description: 'Je conçois des applications web modernes, SaaS, APIs et outils métiers pour les entreprises qui veulent mieux vendre, automatiser ou scaler leurs services.',
  hero: {
    links: [
      { label: 'Voir mes projets', to: '/projects', color: 'neutral' },
      { label: 'Mission freelance', to: 'mailto:heroldtamko39@gmail.com' },
      { label: 'Télécharger mon CV', color: 'neutral' }
    ],
    images: []
  },
  about: {
    title: 'À propos',
    description: 'Développeur full-stack basé à Douala, spécialisé Laravel, Vue.js et Nuxt.',
    content: 'Depuis 2019, j\'accompagne des entreprises — startups, PME, scale-ups — dans la conception et le développement de leurs produits web. Je construis des applications métier, des SaaS, des APIs et des dashboards avec une obsession pour la qualité du code, les performances et l\'expérience utilisateur.\n\nCe qui me distingue : je comprends à la fois le backend et le frontend, ce qui me permet de livrer des produits cohérents de bout en bout, sans friction entre les couches.'
  },
  services: [
    {
      title: 'Développement web full-stack',
      description: 'Applications métier, dashboards, plateformes SaaS, e-commerce. Laravel + Vue.js/Nuxt + PostgreSQL, de la conception au déploiement.',
      icon: 'i-lucide-globe'
    },
    {
      title: 'APIs & intégrations',
      description: 'Laravel REST API, webhooks, paiements Stripe / Flutterwave / PayPal, intégrations tierces (MoySklad, Calendly, etc.).',
      icon: 'i-lucide-link'
    },
    {
      title: 'Modernisation frontend',
      description: 'Vue 3, Nuxt 4, Inertia.js, Tailwind CSS, shadcn-vue. Migration progressive et interfaces modernes et performantes.',
      icon: 'i-lucide-palette'
    },
    {
      title: 'Automatisation & IA appliquée',
      description: 'Assistants intelligents, workflows automatisés, scraping web, chatbots, automatisations métier sur mesure avec Laravel AI et Claude Code.',
      icon: 'i-lucide-bot'
    },
    {
      title: 'Intégrations WhatsApp & APIs tierces',
      description: 'Solutions SaaS connectées à WhatsApp (Evolution Go API), webhooks, APIs REST, paiements Stripe/Flutterwave/PayPal.',
      icon: 'i-lucide-message-square'
    },
    {
      title: 'Supports marketing digitaux',
      description: 'Landing pages, tunnels de conversion, pages produit, visuels promotionnels. Création rapide de supports pour accompagner vos campagnes.',
      icon: 'i-lucide-megaphone'
    }
  ],
  stack: [
    {
      label: 'Stack principale',
      description: 'Mon socle technique pour les projets full-stack',
      items: [
        { name: 'Laravel', icon: 'i-simple-icons-laravel' },
        { name: 'Vue.js', icon: 'i-simple-icons-vuedotjs' },
        { name: 'Nuxt', icon: 'i-simple-icons-nuxtdotjs' },
        { name: 'Inertia.js', icon: 'i-simple-icons-inertia' },
        { name: 'PostgreSQL', icon: 'i-simple-icons-postgresql' },
        { name: 'Tailwind CSS', icon: 'i-simple-icons-tailwindcss' }
      ]
    },
    {
      label: 'Stack secondaire',
      description: 'Technologies complémentaires maîtrisées',
      items: [
        { name: 'TypeScript' },
        { name: 'shadcn-vue' },
        { name: 'AdonisJS', icon: 'i-simple-icons-adonisjs' },
        { name: 'Livewire', icon: 'i-simple-icons-livewire' },
        { name: 'Filament' },
        { name: 'GraphQL', icon: 'i-simple-icons-graphql' },
        { name: 'Pinia' }
      ]
    },
    {
      label: 'Outils & expertise',
      description: 'Infrastructure, CI/CD, paiements et environnements',
      items: [
        { name: 'Docker', icon: 'i-simple-icons-docker' },
        { name: 'CI/CD' },
        { name: 'Sentry' },
        { name: 'Redis', icon: 'i-simple-icons-redis' },
        { name: 'Tauri' },
        { name: 'Rust / WASM' },
        { name: 'Stripe', icon: 'i-simple-icons-stripe' },
        { name: 'Flutterwave' },
        { name: 'PayPal', icon: 'i-simple-icons-paypal' }
      ]
    }
  ],
  experience: {
    title: 'Expérience',
    items: [
      {
        position: 'Développeur Web Full-Stack',
        date: '2019 - Présent',
        company: { name: 'ETECH KEYS', logo: 'i-simple-icons-codefactor', url: '#', color: '#2563EB' },
        highlights: [
          'Conception et développement de solutions web innovantes pour une clientèle variée',
          'Maintenance et optimisation d\'applications existantes : performances, bugs, refactoring',
          'Architecture d\'APIs REST robustes avec Laravel et intégration frontend Vue.js',
          'Gestion de bases de données : modélisation, migrations, optimisation (MySQL, SQLite, PostgreSQL)',
          'Documentation technique complète : spécifications, guides, procédures de déploiement',
          'Veille technologique active et proposition d\'améliorations pour la pérennité des solutions'
        ]
      }
    ]
  },
  testimonials: [
    {
      quote: 'Hérold a réalisé notre plateforme SaaS de A à Z. Son expertise Laravel + Vue.js nous a permis d\'avoir un produit stable, rapide et évolutif. Professionnel, à l\'écoute et très réactif.',
      author: {
        name: 'Client KwikTalk',
        description: 'Fondateur de KwikTalk',
        avatar: {
          src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=40&h=40&q=80',
          srcset: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=80&h=80&q=80 2x'
        }
      }
    },
    {
      quote: 'Un développeur qui comprend à la fois le backend, le frontend et les enjeux métier. Rare et précieux. Notre marketplace lui doit beaucoup.',
      author: {
        name: 'Client E-Key Market',
        description: 'Responsable produit',
        avatar: {
          src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=40&h=40&q=80',
          srcset: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=80&h=80&q=80 2x'
        }
      }
    },
    {
      quote: 'Hérold a su moderniser notre application legacy avec Nuxt et Tailwind. Résultat : une interface plus rapide, plus agréable et une équipe enfin sereine sur la maintenance.',
      author: {
        name: 'Client TCF Canada Suite',
        description: 'Chef de projet',
        avatar: {
          src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=40&h=40&q=80',
          srcset: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=80&h=80&q=80 2x'
        }
      }
    }
  ],
  blog: {
    title: 'Articles récents',
    description: 'Réflexions sur le développement web, Laravel, Vue.js, Nuxt et l\'écosystème AI.'
  },
  faq: {
    title: 'Questions fréquentes',
    description: 'Tout savoir sur ma façon de travailler et mes services.',
    categories: [
      {
        title: 'Services & Process',
        questions: [
          {
            label: 'Quels types de projets acceptez-vous ?',
            content: 'Je travaille principalement sur des applications web complètes : SaaS, plateformes métier, dashboards, APIs, marketplaces, sites à fort trafic. Si votre projet utilise Laravel, Vue.js, Nuxt ou nécessite une architecture full-stack moderne, c\'est idéal. Je peux aussi intervenir sur des missions plus courtes (audit, intégration, modernisation).'
          },
          {
            label: 'Comment se déroule une mission ?',
            content: 'On commence par un échange pour comprendre le besoin, le contexte et les contraintes. Je propose ensuite un cadre clair : périmètre, livrables, jalons et budget. Pendant la mission, je communique régulièrement (souvent via Discord ou Slack) et je livre en continu sur un repository privé. À la fin, vous avez le code, la doc et les accès.'
          },
          {
            label: 'Travaillez-vous en équipe ou en solo ?',
            content: 'Je peux travailler seul sur l\'ensemble du projet, ou m\'intégrer dans une équipe existante (développeurs, designers, chefs de projet). Je suis habitué aux environnements collaboratifs et aux outils modernes (Git, CI/CD, ticketing).'
          }
        ]
      },
      {
        title: 'Prix & Disponibilité',
        questions: [
          {
            label: 'Combien coûte un projet ?',
            content: 'Chaque projet est différent, je fais un devis personnalisé après analyse du besoin. Pour une idée : un SaaS simple commence autour de 3000 €, un projet plus complet (dashboard + API + panel admin) peut aller de 8000 à 20 000 €. Je propose aussi des forfaits maintenance / évolutions.'
          },
          {
            label: 'Quels sont vos modes de paiement ?',
            content: 'J\'accepte les virements bancaires, Stripe et PayPal. Généralement je demande un acompte de 40% au lancement, le solde à la livraison. Pour les gros projets, un échelonnement sur plusieurs jalons est possible.'
          },
          {
            label: 'Quels sont vos délais ?',
            content: 'Cela dépend de la charge. Un projet simple peut être livré en 2-3 semaines. Un projet complet avec plusieurs modules peut prendre 2 à 4 mois. Je donne toujours une estimation après la phase de cadrage.'
          }
        ]
      },
      {
        title: 'À propos',
        questions: [
          {
            label: 'Êtes-vous basé à Douala ? Travaillez-vous à distance ?',
            content: 'Oui, je suis basé à Douala, Cameroun. Je travaille principalement à distance avec des clients partout dans le monde (France, Canada, Afrique). Les échanges se font par visio, messagerie et email. Je peux me déplacer ponctuellement si nécessaire.'
          },
          {
            label: 'Qu\'est-ce qui vous passionne dans le développement ?',
            content: 'Ce qui me motive, c\'est de construire des outils qui résolvent des vrais problèmes. J\'aime particulièrement la conception d\'architecture, l\'optimisation des performances, et le travail sur des produits complets (du backend jusqu\'à l\'interface utilisateur). Je suis aussi très intéressé par l\'IA appliquée et l\'automatisation business.'
          }
        ]
      }
    ]
  }
}
