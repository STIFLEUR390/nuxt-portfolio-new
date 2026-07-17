import type { PageData } from '~/data/types'

export const aboutPage: PageData = {
  seo: {
    title: 'À propos',
    description: 'Développeur Full-Stack basé à Douala. Laravel, Vue.js, Nuxt, Inertia.js, PostgreSQL. 4+ ans d\'expérience chez ETECH KEYS.'
  },
  title: 'À propos de moi',
  description: 'Développeur Full-Stack basé à Douala, passionné par la conception d\'applications web modernes et d\'outils qui résolvent des problèmes concrets.',
  content: `Je suis **Franck Hérold TAMTO TAMKO**, développeur Full-Stack basé à Douala, Cameroun. Diplômé d'un **Master en Informatique Industrielle & Automatisme** (Institut Universitaire de la Côte, 2020), j'accompagne depuis plus de 4 ans la conception, l'évolution et le déploiement d'applications web pour des clients variés — de l'analyse jusqu'à la mise en production.

Je suis spécialisé dans l'écosystème **Laravel / Vue.js / Nuxt / Inertia.js / PostgreSQL**, avec une solide expérience en conception d'APIs RESTful, intégration de passerelles de paiement (Stripe, Flutterwave, PayPal, NotchPay), automatisation de processus métier et déploiement Docker.

### Ma philosophie

Je crois qu'une bonne application ne se limite pas à un code qui marche. Elle doit être :
- **Maintenable** : architecture propre, services, repository, policies
- **Performante** : optimisée pour la vitesse et l'expérience utilisateur
- **Évolutive** : pensée pour grandir avec le besoin
- **Utile** : centrée sur le problème réel du client

### Ce qui me motive

Ce qui me passionne, c'est de voir un projet passer du concept à la réalité — une idée qui devient un outil utilisé au quotidien par des vrais utilisateurs. L'IA appliquée (Claude Code, assistants intelligents) et l'automatisation m'intéressent particulièrement comme leviers pour créer encore plus de valeur. Je maintiens une trentaine de dépôts publics sur GitHub et une veille technologique active.

### En dehors du code

Quand je ne développe pas, j'aime explorer les nouvelles technologies, jouer de la musique, contribuer à des projets open source, et réfléchir à des solutions innovantes pour les défis techniques du quotidien.

Vous avez un projet en tête ? [Parlons-en](/contact) ou [jetez un œil à mes réalisations](/projects).`,
  images: [
    {
      src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470&auto=format&fit=crop',
      alt: 'Espace de travail développement'
    },
    {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop',
      alt: 'Projets et réalisations'
    }
  ]
}
