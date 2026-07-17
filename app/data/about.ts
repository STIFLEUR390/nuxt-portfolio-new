import type { PageData } from '~/data/types'

export const aboutPage: PageData = {
  seo: {
    title: 'À propos',
    description: 'Développeur Full-Stack basé à Douala. Laravel, Vue.js, Nuxt, PostgreSQL. 4+ ans d\'expérience chez ETECH KEYS.'
  },
  title: 'À propos de moi',
  description: 'Développeur Full-Stack basé à Douala, passionné par la conception d\'applications web modernes et d\'outils qui résolvent des problèmes concrets.',
  content: `Je suis **Hérold**, développeur Full-Stack basé à Douala, Cameroun. Depuis plus de 4 ans, j'accompagne la conception, l'évolution et le déploiement d'applications web pour des clients variés — de l'analyse jusqu'à la mise en production.

Je suis spécialisé dans l'écosystème **Laravel / Vue.js / Nuxt / PostgreSQL**, avec une solide expérience en conception d'APIs RESTful, intégration de paiements en ligne, déploiement Docker et automatisation de processus métier.

### Ma philosophie

Je crois qu'une bonne application ne se limite pas à un code qui marche. Elle doit être :
- **Maintenable** : architecture propre, code commenté, tests
- **Performante** : optimisée pour la vitesse et l'expérience utilisateur
- **Évolutive** : pensée pour grandir avec le besoin
- **Utile** : centrée sur le problème réel du client

### Ce qui me motive

Ce qui me passionne, c'est de voir un projet passer du concept à la réalité — une idée discutée autour d'un café qui devient un outil utilisé au quotidien par des vrais utilisateurs. L'IA appliquée et l'automatisation m'intéressent particulièrement comme leviers pour créer encore plus de valeur.

### En dehors du code

Quand je ne développe pas, j'aime explorer les nouvelles technologies, contribuer à des projets open source, et réfléchir à des solutions innovantes pour les défis techniques du quotidien.

Vous avez un projet en tête ? [Parlons-en](/speaking) ou [jetez un œil à mes réalisations](/projects).`,
  images: [
    {
      src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470&auto=format&fit=crop',
      alt: 'Espace de travail développement'
    },
    {
      src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop',
      alt: 'Code et développement'
    }
  ]
}
