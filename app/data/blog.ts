import type { BlogPost } from '~/data/types'

const _posts: BlogPost[] = [
  {
    title: 'Web Scraping avec AdonisJS : archiver les sujets du TCF Canada',
    description: 'Le TCF Canada publie régulièrement des sujets d\'expression écrite et orale sur divers sites. J\'ai créé un outil qui automatise la collecte et l\'archivage de ces sujets avec AdonisJS 7.',
    date: '2026-03-15',
    image: '/img/blog/scraping-adonisjs.jpg',
    minRead: 5,
    author: {
      name: 'Franck Hérold TAMTO TAMKO'
    },
    body: `# Web Scraping avec AdonisJS : archiver les sujets du TCF Canada

> **Projet lié :** TCF Canada Suite

Le TCF Canada publie régulièrement des sujets d'expression écrite et orale sur divers sites. Les candidats passent un temps fou à chercher ces sujets manuellement. J'ai voulu créer un outil qui automatise cette collecte.

## Le problème

Les sujets sont publiés sur des pages web avec des structures très différentes selon la source. Chaque URL peut pointer vers :
- Un sujet d'expression écrite
- Un sujet d'expression orale
- Une page d'index listant plusieurs sujets

Je voulais que l'utilisateur n'ait qu'à **coller une URL** pour que l'application détecte automatiquement le type de sujet et l'archive.

## Pourquoi AdonisJS ?

J'ai choisi AdonisJS 7 pour plusieurs raisons :
- **Edge templates** — rendu serveur simple sans nécessiter de SPA
- **Session Auth** intégrée, parfaite pour une application à utilisateurs
- **SQLite** en base — zéro configuration, le fichier suit le projet
- **CLI intégré** — génération rapide de contrôleurs, migrations, etc.

## L'approche scraping

Le cœur du projet repose sur une logique de **détection intelligente** :

\`\`\`javascript
// Concept : analyser l'URL et le contenu pour déterminer le type
function detectSubjectType(url, htmlContent) {
  if (url.includes('expression-orale')) return 'oral'
  if (url.includes('expression-ecrite')) return 'written'
  // fallback : analyse du contenu HTML
  if (htmlContent.includes('expression orale')) return 'oral'
  return 'unknown'
}
\`\`\`

L'utilisateur entre une URL, l'application scrape le contenu, détecte le type et l'archive automatiquement avec la date et la source.

## Ce que j'en retiens

- Le **scraping** est un processus délicat : les sites changent, les sélecteurs cassent. Une approche par patterns plutôt que par sélecteurs CSS stricts est plus robuste.
- **AdonisJS** est excellent pour des apps CRUD + scraping : pas de lourdeur, tout est dans le framework.
- L'**archivage structuré** de données non structurées (pages web) est un problème fascinant, surtout quand chaque source a son propre format.

## Leçon pour un portfolio

Ce projet montre ma capacité à :
- Analyser un besoin utilisateur concret
- Choisir la bonne stack (AdonisJS plutôt que Laravel ici pour sa légèreté)
- Implémenter du web scraping fiable
- Livrer une application fonctionnelle avec auth intégrée`,
    path: '/blog/scraping-adonisjs-tcf'
  },
  {
    title: 'Architecture Laravel : Repository, Service, Policy — Ce que j\'ai appris sur HookBridge',
    description: 'Quand j\'ai commencé avec Laravel, tout tenait dans les contrôleurs. HookBridge API a été l\'occasion de structurer proprement avec Repository, Service et Policy patterns.',
    date: '2026-02-28',
    image: '/img/blog/architecture-laravel.jpg',
    minRead: 6,
    author: {
      name: 'Franck Hérold TAMTO TAMKO'
    },
    body: `# Architecture Laravel : Repository, Service, Policy — Ce que j'ai appris sur HookBridge

> **Projet lié :** HookBridge API

Quand j'ai commencé avec Laravel, tout tenait dans les contrôleurs. Puis le code grossit, les contrôleurs deviennent des fourre-tout, et maintenir devient un enfer. HookBridge API a été l'occasion de structurer proprement.

## Le problème initial

HookBridge est une API de gestion de webhooks et callbacks. Concrètement :
- Création de projets avec configuration
- Endpoints webhooks avec secrets et événements
- Callbacks avec validation et historique
- Notifications asynchrones

Sans structure, chaque contrôleur aurait contenu : validation + requêtes SQL + logique métier + transformation de réponse → des milliers de lignes impossibles à tester.

## La solution en couches

### 1. Repository Pattern

Les repositories encapsulent l'accès aux données :

\`\`\`
App/Repositories/
├── ProjectRepository.php
├── WebhookRepository.php
└── CallbackRepository.php
\`\`\`

Chaque repository contient **uniquement** des requêtes Eloquent. Pas de logique métier, juste "comment récupérer/enregistrer les données".

### 2. Service Layer

Les services contiennent la **logique métier** :

\`\`\`
App/Services/
├── WebhookService.php      # Traitement des payloads webhook
├── CallbackService.php     # Logique de callback
└── NotificationService.php # Envoi des notifications
\`\`\`

Un contrôleur appelle un service, le service utilise un repository si besoin.

### 3. Policies

Les policies gèrent les **autorisations** :

\`\`\`php
// Exemple : seul le propriétaire du projet peut configurer ses webhooks
public function configure(User $user, Project $project)
{
    return $user->id === $project->user_id;
}
\`\`\`

### 4. Traits pour le cross-cutting

Des traits réutilisables pour la pagination, les réponses formatées, la validation, etc.

## Le résultat

\`\`\`
Contrôleur (10 lignes)
  → Service (50 lignes, logique métier)
    → Repository (20 lignes, requêtes)
      → Policy (5 lignes, autorisation)
\`\`\`

Chaque couche a une responsabilité unique. Tester devient trivial : on mock le repository, on teste le service.

## Le retour d'expérience

- **Ne pas over-engineer** — Pour une CRUD simple, Repository + Service c'est trop. J'ai appris à doser : un pattern par besoin, pas par dogme.
- **Les Policies Laravel sont sous-estimées** — Elles permettent une séparation nette des autorisations, bien plus clean que des \`if\` dans les contrôleurs.
- **La cohérence paie** — Une fois la structure en place, ajouter une nouvelle entité prend 10 minutes au lieu d'une heure.

Si vous démarrez un projet Laravel qui va durer, prenez le temps de poser cette architecture dès le départ. La refactorisation après coup est toujours plus douloureuse.`,
    path: '/blog/architecture-laravel-hookbridge'
  },
  {
    title: 'Keycloak : créer un thème WhatsApp personnalisé de A à Z',
    description: 'Keycloak est un des meilleurs SSO open-source, mais ses pages d\'authentification par défaut sont spartiates. J\'ai créé un thème WhatsApp personnalisé, dockerisé et documenté.',
    date: '2026-02-10',
    image: '/img/blog/keycloak-themes.jpg',
    minRead: 6,
    author: {
      name: 'Franck Hérold TAMTO TAMKO'
    },
    body: `# Keycloak : créer un thème WhatsApp personnalisé de A à Z

> **Projet lié :** Keycloak WhatsApp Theme

Keycloak est un des meilleurs solutions SSO (Single Sign-On) open-source. Mais ses pages d'authentification par défaut sont… fonctionnelles, sans plus. Quand on veut offrir une expérience utilisateur fluide, un thème personnalisé fait toute la différence.

## Pourquoi WhatsApp ?

L'idée : proposer un thème qui soit **instantanément reconnaissable**. L'interface WhatsApp est familière à des milliards d'utilisateurs. En l'utilisant comme inspiration visuelle, les utilisateurs se sentent immédiatement à l'aise sur les pages de connexion.

## Comprendre l'architecture des thèmes Keycloak

Keycloak utilise **FreeMarker** comme moteur de templates. Un thème se structure ainsi :

\`\`\`
themes/
  mon-theme/
    login/
      login.ftl          # Page de connexion
      register.ftl        # Page d'inscription
      reset-password.ftl  # Mot de passe oublié
      confirm.ftl         # Confirmation email
      passkey.ftl         # Authentification passkey
    account/
      account.ftl         # Gestion de compte
    resources/
      css/
        styles.css
      img/
        logo.png
\`\`\`

Chaque fichier \`.ftl\` est un template HTML avec des variables FreeMarker injectées par Keycloak.

## Les pages personnalisées

Pour le thème WhatsApp, j'ai couvert :

1. **Login** — Interface de connexion avec le champ utilisateur/mot de passe aux couleurs WhatsApp (vert caractéristique #25D366)
2. **Register** — Formulaire d'inscription complet
3. **Reset Password** — Flux de réinitialisation de mot de passe
4. **Confirm Email** — Page de confirmation avec instruction claire
5. **Passkey** — Authentification sans mot de passe (modernité)

## Déploiement avec Docker

Le projet inclut un \`docker-compose.yaml\` et un \`docker-compose.whatsapp.yaml\` pour :

\`\`\`yaml
# Concept : monter le thème dans le conteneur Keycloak
volumes:
  - ./themes/whatsapp:/opt/keycloak/themes/whatsapp
\`\`\`

Avec un guide complet (\`GUIDE_THEMES.md\`) expliquant comment créer ses propres thèmes, de la structure au déploiement.

## Ce que j'ai appris

- **FreeMarker** est puissant mais a ses particularités (échappement, macros). Bien comprendre le moteur de templates évite des heures de debug.
- Un **guide complet** (GUIDE_THEMES.md) double la valeur du projet — les autres développeurs peuvent réutiliser le travail pour créer leurs propres thèmes.
- La **personnalisation des pages d'auth** est un excellent moyen d'améliorer l'expérience utilisateur sans toucher au backend.

## Résultat

Un thème Keycloak professionnel, dockerisé, documenté, avec 5+ templates personnalisés — prêt à être déployé en production.`,
    path: '/blog/keycloak-themes-whatsapp'
  },
  {
    title: 'Construire 7 plugins Claude Code pour le développement fullstack',
    description: 'Après des mois à utiliser Claude Code au quotidien, j\'ai transformé mes configurations récurrentes en 7 plugins réutilisables pour accélérer le développement fullstack.',
    date: '2026-01-20',
    image: '/img/blog/plugins-claude.jpg',
    minRead: 5,
    author: {
      name: 'Franck Hérold TAMTO TAMKO'
    },
    body: `# Construire 7 plugins Claude Code pour le développement fullstack

> **Projet lié :** Fullstack Dev Skills

Claude Code est un assistant AI puissant, mais sa véritable force réside dans sa capacité à être **enrichi par des plugins** (skills). Après des mois à l'utiliser au quotidien pour du développement fullstack, j'ai remarqué un pattern : je répétais toujours les mêmes instructions.

## L'idée

Et si je transformais mes configurations récurrentes en **plugins réutilisables** ? Chaque plugin regrouperait des skills spécialisés par domaine, avec des instructions précises, des contraintes et des bonnes pratiques.

## Les 7 plugins

| Plugin | Pourquoi ? | Contenu |
|--------|-----------|---------|
| **Frontend** | Nuxt 4, Vue 3, Tailwind — des conventions UI précises | Composants, accessibilité, shadcn-vue |
| **Backend** | Laravel 12+, PHP 8.3 — beaucoup de boilerplate | API REST, GraphQL, Redis, Eloquent |
| **Cross-Platform** | NativePHP et Tauri — deux mondes différents | Desktop Rust, mobile PHP |
| **Database** | Schémas, indexes, optimisation | MySQL, PostgreSQL, migrations |
| **Design** | Cohérence visuelle entre projets | Design tokens, systèmes de composants |
| **DevOps** | Docker, CI/CD — infrastructure reproductible | GitHub Actions, Docker Compose |
| **Practices** | Git, tests, sécurité — la qualité | TDD, OWASP, code review, debug |

## Comment ça marche ?

Chaque plugin contient des **skills** (fichiers de configuration) qui définissent comment Claude Code doit se comporter pour une tâche donnée :

\`\`\`
skills/
  frontend/
    nuxt-ui.skill.md       # Créer des composants Nuxt UI
    vue3-composition.skill.md  # Utiliser la Composition API
    shadcn-vue.skill.md    # Intégrer shadcn-vue accessible
\`\`\`

Un skill, c'est un fichier markdown avec :
- Un **déclencheur** (quand ce skill est pertinent)
- Des **instructions précises** (pas de place à l'interprétation)
- Des **contraintes** (versions, conventions de nommage)
- Des **exemples** (code à suivre)

## La vente en marketplace

Les plugins sont disponibles sur la **Marketplace Claude Code** :

\`\`\`bash
/plugin marketplace add STIFLEUR390/fullstack-dev-skills
/plugin install frontend@fullstack-dev-skills
\`\`\`

Une commande, et Claude Code sait exactement comment coder du Laravel 12 ou du Nuxt 4.

## Leçons

- **La réutilisabilité paie** — J'estime gagner ~30% de temps sur chaque projet depuis que j'utilise ces plugins.
- **Documenter pour les autres** m'a forcé à clarifier mes propres pratiques.
- Un bon plugin ne dit pas "quoi faire" mais **"comment le faire ici"** — le contexte du projet compte.

Si vous utilisez Claude Code, créez ne serait-ce qu'un plugin pour votre stack principale. Vous serez surpris de la différence.`,
    path: '/blog/plugins-claude-code-fullstack'
  },
  {
    title: 'GraphQL vs REST avec Laravel : mon retour d\'expérience',
    description: 'J\'ai construit la même todolist avec REST et GraphQL (Lighthouse) pour comparer les deux approches. Voici mon verdict et quand choisir l\'une ou l\'autre.',
    date: '2026-01-05',
    image: '/img/blog/graphql-vs-rest.jpg',
    minRead: 7,
    author: {
      name: 'Franck Hérold TAMTO TAMKO'
    },
    body: `# GraphQL vs REST avec Laravel : mon retour d'expérience

> **Projet lié :** Todo GraphQL

REST, c'est la norme. GraphQL, c'est la promesse de flexibilité totale. J'ai voulu construire le même projet (une todolist) avec les deux approches pour me faire mon propre avis.

## Le projet test : une todolist

Une todolist, c'est simple : des tâches avec un titre, un statut, une date. Mais les interactions sont variées :
- Lister les tâches (avec filtres et tris)
- Créer / modifier / supprimer
- Marquer comme terminée
- Rechercher par mots-clés

Parfait pour comparer.

## Approche REST

Avec une API REST Laravel classique :

\`\`\`
GET    /api/taches           → liste (avec ?status=done&sort=created_at)
POST   /api/taches           → créer
PUT    /api/taches/{id}      → modifier
DELETE /api/taches/{id}      → supprimer
\`\`\`

**Avantages :**
- Simple, prévisible, bien supporté
- Cache HTTP facile (ETags, Cache-Control)
- Outillage standard (Postman, insomnia)

**Inconvénients :**
- **Over-fetching** — l'API renvoie toujours le même payload, même si le client ne veut qu'un champ
- **Multi-endpoints** — pour charger une tâche + son auteur + ses commentaires, il faut 3 requêtes
- **Versioning** — changer le payload = nouvelle version d'API

## Approche GraphQL

Avec Lighthouse (PHP GraphQL server pour Laravel) :

\`\`\`graphql
query {
  tasks(status: DONE) {
    id
    title
    created_at
    author {
      name
    }
  }
}
\`\`\`

**Avantages :**
- **Requêtes exactes** — le client reçoit uniquement ce qu'il demande
- **Nested queries** — une seule requête pour charger la tâche, l'auteur ET les commentaires
- **Pas de versioning** — on ajoute des champs, on ne casse jamais le contrat

**Inconvénients :**
- **Complexité** — le schéma GraphQL, les résolveurs, les types, c'est plus de code
- **Cache** — le cache HTTP devient compliqué (tous les appels sont des POST)
- **Performance** — N+1 problem si mal implémenté (mais Lighthouse a des solutions)

## Mon verdict

| Critère | REST | GraphQL |
|---------|------|---------|
| Simplicité initiale | ✅✅ | ✅ |
| Documentation auto | ✅ (Swagger) | ✅✅ (Introspection) |
| Performance requêtes | ✅✅ | ✅ (si bien fait) |
| Flexibilité client | ✅ | ✅✅ |
| Cache | ✅✅ | ✅ |
| Outillage | ✅✅ | ✅ |

**Si je devais recommencer :**
- Pour une **API publique** (consommateurs inconnus) → REST. Simple, standard, tout le monde sait l'utiliser.
- Pour un **client-first** (SPA, mobile) → GraphQL. La flexibilité côté client est imbattable.
- Pour une **todolist** → REST. GraphQL est overkill ici.

GraphQL brille vraiment quand le client a des besoins de données complexes et variables. Pour le reste, REST fait très bien le job.`,
    path: '/blog/graphql-vs-rest-laravel'
  },
  {
    title: 'Ajouter MeiliSearch à un portfolio Nuxt pour une recherche full-text instantanée',
    description: 'J\'ai intégré MeiliSearch dans mon site Nuxt pour offrir une recherche full-text ultra-rapide, typo-tolérante, le tout dockerisé et open source.',
    date: '2025-12-10',
    image: '/img/blog/meilisearch.jpg',
    minRead: 5,
    author: {
      name: 'Franck Hérold TAMTO TAMKO'
    },
    body: `# Ajouter MeiliSearch à un portfolio Nuxt pour une recherche full-text instantanée

> **Projet lié :** Portfolio Website

Un portfolio, c'est bien. Un portfolio où on trouve instantanément ce qu'on cherche, c'est mieux. J'ai intégré **MeiliSearch** dans mon site Nuxt pour offrir une recherche full-text ultra-rapide.

## Pourquoi MeiliSearch ?

J'aurais pu utiliser Algolia (payant), Elasticsearch (lourd) ou une simple recherche côté client (limitée). MeiliSearch coche toutes les cases :
- **Open source** — pas de dépendance à un service payant
- **Rapide** — temps de réponse < 50ms
- **Typo-tolerant** — "portflio" trouve "portfolio"
- **Léger** — un binaire Rust, pas de JVM
- **Docker-ready** — un service dans mon docker-compose

## L'architecture

\`\`\`
[Nuxt App] ← requête AJAX → [MeiliSearch API] ← index → [Base de données]
\`\`\`

Les données des projets sont indexées dans MeiliSearch au build ou à chaque mise à jour. La recherche côté client envoie une requête directe à MeiliSearch via son API REST.

## Indexation des projets

\`\`\`javascript
// Concept : structurer les données pour la recherche
const projectIndex = {
  id: 'tcf-canada',
  title: 'TCF Canada Suite',
  tags: ['AdonisJS', 'TypeScript', 'Vue', 'scraping'],
  description: "Application de scraping et d'archivage...",
  technologies: ['AdonisJS 7', 'TypeScript', 'SQLite'],
  year: 2026
}
\`\`\`

MeiliSearch accepte la recherche sur tous les champs avec des poids différents (le titre plus important que la description).

## Dockerisation

\`\`\`yaml
services:
  meilisearch:
    image: getmeili/meilisearch:v1.0
    ports:
      - "7700:7700"
    volumes:
      - ./meili_data:/meili_data
    environment:
      MEILI_MASTER_KEY: \${MEILI_KEY}
\`\`\`

Un service Docker, un volume persistant, une clé API — prêt en 5 minutes.

## Résultats

- Recherche **instantanée** dans tous les projets
- **Typo-tolérante** — utile pour les visiteurs qui ne connaissent pas l'orthographe exacte
- **Filtrable par technologie, année, type de projet**
- Zéro dépendance externe (pas d'appel API payant)

## Ce que j'ai appris

- **MeiliSearch est incroyablement simple** à mettre en place comparé à Elasticsearch. La documentation est claire, l'API est propre.
- La recherche full-text est un **élément différenciant** pour un portfolio — ça montre de l'attention au détail.
- Docker rend le déploiement trivial : \`docker compose up\` et c'est prêt.

Si vous avez un site avec du contenu textuel, ajoutez MeiliSearch. C'est le meilleur rapport simplicité/valeur ajoutée que j'ai trouvé.`,
    path: '/blog/meilisearch-nuxt-portfolio'
  },
  {
    title: 'Créer une marketplace Vue 3 de A à Z : architecture, état, routing',
    description: 'Une marketplace e-commerce complète avec Vue 3, Pinia, Vue Router et Tailwind CSS. Panier, checkout, authentification, wishlist, programme de fidélité — tout est là.',
    date: '2025-11-18',
    image: '/img/blog/vue3-marketplace.jpg',
    minRead: 6,
    author: {
      name: 'Franck Hérold TAMTO TAMKO'
    },
    body: `# Créer une marketplace Vue 3 de A à Z : architecture, état, routing

> **Projet lié :** E-Key Market

Une marketplace e-commerce, c'est bien plus qu'un catalogue. C'est un panier, un checkout, des comptes utilisateurs, un programme de fidélité, une wishlist, du suivi de commandes… J'ai tout construit avec Vue 3.

## Le défi

**E-Key Market** devait gérer :
- Un catalogue de produits avec catégories
- Un **panier** avec gestion des quantités et persistance
- Un **checkout** en plusieurs étapes
- L'**authentification** complète (register, login, reset, confirm email)
- Un **dashboard utilisateur** avec historique et tracking
- Une **wishlist** avec alertes de prix
- Un **programme de fidélité** (points, badges, récompenses)

Le tout en responsive (desktop + mobile).

## Architecture choisie

### State management avec Pinia

Pinia remplace Vuex pour la gestion d'état. Un store par domaine :

\`\`\`
stores/
├── cart.store.js         # Panier (persistant dans localStorage)
├── products.store.js     # Catalogue et filtres
├── auth.store.js         # Authentification et token
├── user.store.js         # Profil et préférences
└── loyalty.store.js      # Points et badges
\`\`\`

L'avantage de Pinia par rapport à Vuex : **TypeScript-ready**, **DevTools intégré**, API plus intuitive (plus de mutations, actions directes).

### Routing avec Vue Router

Des routes organisées par module :

\`\`\`javascript
const routes = [
  // Publiques
  { path: '/', component: Home },
  { path: '/products/:id', component: ProductDetail },

  // Auth
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/reset-password', component: ResetPassword },

  // Utilisateur (protégées)
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/orders', component: Orders, meta: { requiresAuth: true } },
  { path: '/wishlist', component: Wishlist, meta: { requiresAuth: true } },

  // Checkout
  { path: '/cart', component: Cart },
  { path: '/checkout', component: Checkout },
]
\`\`\`

Les **Navigation Guards** vérifient le token à chaque route protégée.

### UI avec Tailwind CSS

Tailwind a permis un développement rapide sans sortir du HTML. Le thème est cohérent : couleurs, espacements, typographie — tout dans \`tailwind.config.js\`.

## Les leçons

1. **Pinia est un vrai game-changer** par rapport à Vuex. Moins de boilerplate, plus de flexibilité.
2. **La persistance du panier** (localStorage + Pinia) doit être robuste — ne pas perdre le panier au refresh est critique en e-commerce.
3. **Le responsive design** avec Tailwind, c'est juste des classes. \`lg:grid-cols-4 md:grid-cols-2\` et c'est plié.
4. **Un programme de fidélité** ajoute une vraie valeur perçue à l'application — les utilisateurs reviennent pour leurs points.

## Résultat

Un frontend e-commerce complet, modulaire, responsive, avec une architecture d'état claire et des routes bien organisées. Prêt à être connecté à n'importe quelle API backend.`,
    path: '/blog/vue3-marketplace-ekey'
  },
  {
    title: 'Explorer l\'API OpenLibrary avec JavaScript et Vue.js',
    description: 'J\'ai construit BookShelf, une application zéro build qui interroge l\'API OpenLibrary pour rechercher des livres — en deux versions : Vanilla JS et Vue 3 CDN.',
    date: '2025-10-25',
    image: '/img/blog/openlibrary-api.jpg',
    minRead: 5,
    author: {
      name: 'Franck Hérold TAMTO TAMKO'
    },
    body: `# Explorer l'API OpenLibrary avec JavaScript et Vue.js

> **Projet lié :** BookShelf

OpenLibrary est une API publique fantastique : elle donne accès à des millions de livres, gratuitement, sans authentification. J'ai voulu construire une application qui l'exploite pleinement — en deux versions.

## L'API OpenLibrary

Pas de clé API, pas de quota limitant a priori. Juste des endpoints REST :

\`\`\`
Recherche :   https://openlibrary.org/search.json?q=harry+potter
Couvertures : https://covers.openlibrary.org/b/id/{id}-L.jpg
Détails :     https://openlibrary.org/works/{key}.json
\`\`\`

L'API retourne des résultats paginés avec titre, auteur, année, couverture et identifiants.

## Le concept de BookShelf

Une application **zéro build** : ouvrir \`index.html\` dans un navigateur et ça marche. Pas de npm install, pas de serveur, pas de build step.

### Version 1 : JavaScript natif

La première version utilise **Vanilla JS** avec :
- Fetch API pour les appels HTTP
- DOM manipulation directe pour l'affichage
- Bootstrap 5 pour le design responsive
- Gestion manuelle de la pagination et des filtres

\`\`\`javascript
// Concept : requête à OpenLibrary
async function searchBooks(query, page = 1) {
  const response = await fetch(
    \`https://openlibrary.org/search.json?q=\${query}&page=\${page}\`
  )
  const data = await response.json()
  return { books: data.docs, total: data.numFound }
}
\`\`\`

La pagination est dynamique : 20 livres par page, 4 par ligne, avec une navigation complète.

### Version 2 : Vue.js 3 (CDN)

J'ai migré la même logique vers **Vue 3 en CDN** pour comparer :

\`\`\`html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
\`\`\`

La logique devient plus propre : données réactives, computed properties pour les filtres, templates déclaratifs. Même résultat, mais le code est plus maintenable.

## Gestion des états

Un point important : chaque appel API peut échouer (réseau, limite, erreur). L'application gère :
- **Loading** — spinner pendant la requête
- **Success** — affichage des résultats
- **Error** — message d'erreur clair
- **Empty** — "aucun résultat trouvé"

## Ce que j'ai appris

- **OpenLibrary est une ressource incroyable** pour apprendre à manipuler des API. Gratuite, bien documentée, riche.
- **CDN Vue.js** est parfait pour des prototypes ou des applications légères — pas besoin de Vite/Webpack pour être productif.
- **Deux versions** du même projet (Vanilla JS vs Vue 3) est un excellent exercice pédagogique pour comprendre ce qu'un framework apporte vraiment.

## Pour un portfolio

Ce projet montre :
- La capacité à intégrer une API publique
- La maîtrise du JavaScript asynchrone (async/await, Fetch API)
- La connaissance de Vue.js 3 (même en version CDN)
- L'attention aux détails UX (états loading/error/empty)`,
    path: '/blog/openlibrary-api-bookshelf'
  },
  {
    title: 'Livewire vs Sanctum : deux philosophies d\'authentification Laravel',
    description: 'J\'ai exploré l\'authentification Laravel avec Livewire (server-side) et Sanctum (SPA token-based). Voici mon comparatif et quand choisir chaque approche.',
    date: '2025-09-12',
    image: '/img/blog/livewire-vs-sanctum.jpg',
    minRead: 8,
    author: {
      name: 'Franck Hérold TAMTO TAMKO'
    },
    body: `# Livewire vs Sanctum : deux philosophies d'authentification Laravel

> **Projet lié :** Auth Solutions & Boilerplates

En explorant l'authentification Laravel, j'ai construit des projets avec deux approches radicalement différentes : **Livewire** (server-side) et **Sanctum** (SPA token-based). Voici ce que j'en retiens.

## Livewire : l'authentification server-side

Livewire permet de créer des interfaces dynamiques sans écrire une ligne de JavaScript. L'auth se fait via les sessions PHP classiques.

### Comment ça marche

\`\`\`php
// Livewire component : formulaire de connexion
class LoginForm extends Component
{
    public \$email;
    public \$password;

    public function login()
    {
        \$this->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt(\$this->only('email', 'password'))) {
            return redirect()->intended('/dashboard');
        }

        \$this->addError('email', 'Identifiants incorrects.');
    }

    public function render()
    {
        return view('livewire.login-form');
    }
}
\`\`\`

Le formulaire est rendu côté serveur, les mises à jour se font via AJAX (Wire). Zéro JavaScript à écrire.

**Avantages :**
- Simple à mettre en œuvre
- Sécurité maximum (tout se passe côté serveur)
- Compatible avec les templates Blade + AdminLTE
- Pas de gestion de tokens

**Inconvénients :**
- Pas de véritable SPA — chaque interaction recharge partiellement la page
- Moins adapté pour une API publique

## Sanctum : l'authentification SPA token-based

Sanctum permet une authentification via **tokens API** (stateless) ou **cookies** (stateful). Parfait pour des SPA Vue.js.

### Comment ça marche

\`\`\`javascript
// Côté Vue 3 : connexion avec Sanctum
async function login(email, password) {
  // Étape 1 : GET CSRF cookie (pour SPA first-party)
  await axios.get('/sanctum/csrf-cookie')

  // Étape 2 : POST login
  const response = await axios.post('/api/login', { email, password })

  // Le token est stocké côté client
  localStorage.setItem('auth_token', response.data.token)
}

// Chaque requête authentifiée inclut le token
axios.defaults.headers.common['Authorization'] = \`Bearer \${token}\`
\`\`\`

**Avantages :**
- Architecture SPA complète (Vue 3, React, etc.)
- API REST réutilisable (mobile, tiers)
- Tokens avec scopes et permissions
- CSRF protection automatique

**Inconvénients :**
- Gestion des tokens côté client (stockage, refresh, expiration)
- Plus de code à écrire (interceptors axios, guards de route)

## Comparatif

| Critère | Livewire | Sanctum |
|---------|----------|---------|
| Complexité | Faible | Moyenne |
| Expérience utilisateur | Quasi-SPA | SPA complète |
| API réutilisable | Non | Oui |
| Sécurité | ✅✅ (serveur) | ✅ (tokens) |
| Idéal pour | Apps Laravel monolithes | APIs + SPA / mobile |
| Courbe d'apprentissage | Douce | Modérée |

## Mon choix selon le projet

- **Dashboard admin** (AdminLTE, Blade) → **Livewire**. Rapide à développer, sécurisé, pas besoin de SPA.
- **Marketplace, application interactive** → **Sanctum**. La flexibilité d'une SPA Vue 3 + la réutilisabilité de l'API.
- **Projet solo ou équipe réduite** → **Livewire**. Moins de code, moins de bugs.
- **API publique + clients multiples** → **Sanctum**. C'est fait pour ça.

Les deux sont excellents. Le choix dépend du contexte, pas du dogme.`,
    path: '/blog/livewire-vs-sanctum-auth'
  },
  {
    title: 'Du premier commit au déploiement : itérations sur mon portfolio Nuxt',
    description: 'Mon portfolio a connu trois versions majeures, chacune apportant son lot d\'apprentissages. De Nuxt 3 minimal à l\'architecture modulaire actuelle avec MeiliSearch.',
    date: '2025-08-30',
    image: '/img/blog/iterations-portfolio.jpg',
    minRead: 5,
    author: {
      name: 'Franck Hérold TAMTO TAMKO'
    },
    body: `# Du premier commit au déploiement : itérations sur mon portfolio Nuxt

> **Projet lié :** Portfolio Website

Un portfolio n'est jamais vraiment "fini". Le mien a connu **trois versions majeures**, chacune apportant son lot d'apprentissages. Voici l'histoire.

## Version 1 : Nuxt 3 minimal (Juin 2025)

La première version était… basique. Un starter Nuxt 3, un layout, quelques pages statiques. Ça faisait le job, mais :

- **Pas de recherche** — le visiteur devait tout parcourir
- **Pas de contenu dynamique** — chaque ajout nécessitait une modification du code
- **Design générique** — le starter Nuxt ne se démarquait pas

**Leçon :** Un portfolio doit montrer ce qu'on sait faire, pas juste exister.

## Version 2 : Portfolio MeiliSearch (Juillet 2025)

J'ai décidé d'ajouter un moteur de recherche full-text. **MeiliSearch** s'est imposé comme la solution évidente :

- Un service Docker, une clé API, et c'est parti
- Indexation des projets (titre, description, technologies, année)
- Recherche typo-tolérante en temps réel depuis le frontend

L'ajout de Docker a aussi structuré le déploiement :

\`\`\`yaml
services:
  nuxt:
    build: .
    ports:
      - "3000:3000"
  meilisearch:
    image: getmeili/meilisearch:v1.0
    ports:
      - "7700:7700"
\`\`\`

**Leçon :** Ajouter une fonctionnalité technique concrète (recherche full-text, Docker) valorise plus qu'un design parfait.

## Version 3 : Portfolio Frontend (Juillet 2025)

La version la plus aboutie : architecture Vue 3 propre, composants modulaires, thème personnalisé. J'ai repris tout depuis zéro en appliquant les leçons des versions précédentes :

- **Architecture claire** — layouts, composants, pages bien séparés
- **Contenu dynamique** — les projets sont des données, pas du HTML statique
- **Design cohérent** — palette, typographie, espacements réfléchis
- **Responsive** — adapté desktop et mobile

## Le tableau d'évolution

| Version | Date | Stack | Taille (CSS) | Recherche | Docker |
|---------|------|-------|-------------|-----------|--------|
| Nuxt | 06/2025 | Nuxt 3 + Vue 3 | ~755KB | ❌ | ❌ |
| MeiliSearch | 07/2025 | Nuxt 3 + MeiliSearch | ~664KB | ✅ | ✅ |
| Frontend | 07/2025 | Nuxt 3 + Vue 3 refiné | ~670KB | ✅ | ✅ |

## Ce que je retiens

1. **Itérer est plus important que perfectionner.** Chaque version m'a appris quelque chose que je n'aurais pas découvert en réfléchissant.
2. **Les fonctionnalités techniques parlent.** Un moteur de recherche ou Docker dans un portfolio démontre des compétences concrètes.
3. **Ne pas hésiter à tout réécrire.** La V3 était bien meilleure parce que je savais exactement ce que je voulais, après avoir fait les erreurs en V1 et V2.

Mon conseil : publiez votre V1 rapidement, même imparfaite. Les retours (les vôtres et ceux des autres) guideront la V2 bien mieux que la réflexion abstraite.`,
    path: '/blog/iterations-portfolio-nuxt'
  },
  {
    title: 'Laravel 13 + Inertia.js v3 : pourquoi j\'ai choisi cette stack pour KwikTalk',
    description: 'KwikTalk est un SaaS WhatsApp construit avec Laravel 13 et Inertia.js v3. Voici pourquoi cette stack est le sweet spot entre Livewire et une SPA complète.',
    date: '2025-07-15',
    image: '/img/blog/inertiajs-kwiktalk.jpg',
    minRead: 7,
    author: {
      name: 'Franck Hérold TAMTO TAMKO'
    },
    body: `# Laravel 13 + Inertia.js v3 : pourquoi j'ai choisi cette stack pour KwikTalk

> **Projet lié :** KwikTalk

KwikTalk est une application SaaS de gestion de contacts WhatsApp. Pour ce projet, j'ai choisi une stack que je n'avais encore jamais utilisée en production : **Laravel 13 + Inertia.js v3**. Voici pourquoi.

## Le dilemme : SPA ou server-side ?

J'avais deux options classiques :

1. **SPA complète** (Vue 3 + Laravel API) — plein de flexibilité, mais double codebase, gestion de tokens CORS, complexité
2. **Livewire** — simple, server-side, mais pas une vraie SPA, moins fluide pour des interfaces complexes

Inertia.js est le **pont** entre les deux : on écrit des composants Vue 3, mais ils sont rendus côté serveur. Pas d'API à construire, pas de CORS, pas de double validation.

## Comment Inertia.js change la donne

### Route unique, composants multiples

Au lieu d'avoir une API Laravel ET un router Vue, tout part de Laravel :

\`\`\`php
// Laravel : une route, un contrôleur, un composant Inertia
Route::inertia('/contacts', 'Contacts/Index')
  ->name('contacts.index')
  ->middleware('auth');
\`\`\`

\`\`\`vue
<!-- Vue 3 : un composant qui reçoit ses props du serveur -->
<script setup lang="ts">
defineProps<{
  contacts: PaginatedData<Contact>
  groups: Group[]
}>()
</script>
\`\`\`

Plus de double routage. Plus de duplication de validation. Les props sont typées (TypeScript strict) et viennent directement du backend.

### Avantages concrets pour KwikTalk

KwikTalk a des interfaces complexes : gestion de contacts, campagnes de messages, templates, facturation. Inertia.js permet :

- **État partagé** — les données viennent du serveur, pas besoin de synchroniser un store Pinia avec une API
- **Navigation instantanée** — Inertia interpole les pages sans rechargement complet
- **Formulaires progressifs** — validation Laravel côté serveur + feedback visuel Vue 3
- **Pas de CORS** — tout est sur le même domaine

## shadcn-vue + Tailwind v4

Le frontend utilise **shadcn-vue** (port de shadcn/ui pour Vue), ce qui donne :
- Des composants accessibles et stylés prêts à l'emploi
- Une personnalisation totale via Tailwind
- Une cohérence visuelle sans réinventer chaque bouton

## RBAC avec Spatie Permission

Les permissions sont déclarées côté Laravel, exposées à Inertia, et utilisées dans les templates Vue :

\`\`\`php
// Laravel : middleware de permission
Route::middleware('can:view-contacts')->group(function () {
    Route::inertia('/contacts', ...);
});
\`\`\`

\`\`\`vue
<!-- Vue 3 : affichage conditionnel -->
<Button v-if="can('delete-contacts')" variant="destructive">
  Supprimer
</Button>
\`\`\`

## Ce que j'ai appris

- **Inertia.js est le meilleur des deux mondes** — la puissance de Vue 3 sans la complexité d'une API séparée
- **Laravel 13** est stable et mature, même en version récente
- **shadcn-vue** accélère considérablement le développement UI
- **DDEV** est un excellent remplacement à Docker Compose manuel pour le dev Laravel
- Le pattern Inertia + Fortify + Spatie Permission est **très productif** pour des apps SaaS

Si vous hésitez entre Livewire et une SPA complète pour votre prochain projet Laravel, essayez Inertia.js. C'est le sweet spot que je cherchais.`,
    path: '/blog/inertiajs-kwiktalk'
  },
  {
    title: 'Opinionated API Starter : ce que j\'ai mis dans Kit et pourquoi',
    description: 'Kit est mon starter API Laravel opinionated. Contrôleurs invokables, OpenAPI contract tests, SQLite-first, routes versionnées — toutes les décisions architecturales que j\'ai standardisées.',
    date: '2025-06-20',
    image: '/img/blog/kit-api-starter.jpg',
    minRead: 8,
    author: {
      name: 'Franck Hérold TAMTO TAMKO'
    },
    body: `# Opinionated API Starter : ce que j'ai mis dans Kit et pourquoi

> **Projet lié :** Kit — API Starter

Après avoir démarré des dizaines de projets Laravel, j'ai remarqué un pattern : je passe les 2 premières heures à configurer les mêmes choses. J'ai décidé de créer **Kit**, un starter API qui embarque toutes mes décisions architecturales.

## Les décisions fortes

### 1. Contrôleurs invokables

Un contrôleur = une action. Finies les classes avec 6 méthodes :

\`\`\`php
// ✅ Avant (Laravel standard)
class ContactController {
  public function index() { ... }
  public function store() { ... }
  public function show(\$id) { ... }
  public function update(\$id) { ... }
  public function destroy(\$id) { ... }
}
\`\`\`

\`\`\`php
// ✅ Après (invokable)
class RegisterController {
  public function __invoke(RegisterRequest \$request) {
    // Une seule responsabilité
  }
}
\`\`\`

**Pourquoi :** Chaque action est testable isolément. Pas de tentation de mutualiser du code qui n'a pas à l'être. Single Responsibility Principle appliqué aux contrôleurs.

### 2. Routes versionnées sans préfixe \`/api\`

Plus de \`/api/v1/auth/login\`. Juste \`/v1/auth/login\` :

\`\`\`
GET    /v1/auth/me
POST   /v1/auth/register
POST   /v1/auth/login
\`\`\`

La config se fait dans \`bootstrap/app.php\` avec \`apiPrefix: ''\`.

### 3. Scribe + OpenAPI Contract Tests

La documentation API est générée automatiquement par **Scribe** à partir d'attributs PHP 8. Mais surtout, j'ai ajouté des **OpenAPI Contract Tests** :

\`\`\`php
// Concept : un test qui vérifie que l'API correspond à sa spec
test('api matches openapi spec')
  ->expect(fn () => \$this->get('/v1/auth/register'))
  ->toMatchOpenApiSpec()
\`\`\`

Si tu changes le comportement sans mettre à jour la spec, le test échoue. Si tu mets à jour la spec sans changer le comportement, le test échoue aussi. Les deux doivent être synchronisés en permanence.

### 4. SQLite-first

En développement, pas de MySQL. SQLite, un fichier, zéro configuration :

\`\`\`bash
touch database/database.sqlite
php artisan migrate
\`\`\`

**Pourquoi :** Plus besoin de lancer un conteneur MySQL en dev. Les tests sont plus rapides. La CI est plus simple. Et SQLite gère très bien les volumétries de développement.

### 5. Localisation API

Le header \`Accept-Language\` détermine la langue de la réponse, et \`Content-Language\` indique celle utilisée :

\`\`\`
> Accept-Language: fr
< Content-Language: fr
< { "message": "Inscription réussie" }
\`\`\`

### 6. Sunset middleware

Les API évoluent. Les endpoints meurent. Le Sunset middleware permet de marquer un endpoint comme déprécié et de planifier sa suppression :

\`\`\`php
Route::middleware('sunset:2026-09-01')->group(function () {
    Route::get('/v1/old-endpoint', ...);
});
\`\`\`

Le header \`Sunset: Sat, 01 Sep 2026\` est automatiquement ajouté à la réponse, prévenant les clients.

## Les packages inclus

| Package | Utilité |
|---------|---------|
| **Saloon** | Client HTTP avec cache, rate-limiting, pagination |
| **Stripe** | Paiements et abonnements |
| **Laravel Excel** | Import/export fichiers |
| **Laravel AI** | Fonctionnalités AI |
| **Spatie Data** | DTO avec validation |
| **Spatie Permission** | RBAC |
| **Laravel Phone** | Validation téléphone |
| **Sentry** | Monitoring |

## Résultat

Un nouveau projet Laravel API est opérationnel en **30 secondes** :
\`\`\`bash
git clone kit mon-projet
cd mon-projet && composer install && composer run setup
php artisan serve
# API prête sur /v1/auth/register
\`\`\`

J'ai transformé 2h de setup répétitif en 30s de clone. Et chaque nouveau projet bénéficie de toutes les améliorations que j'apporte à Kit.`,
    path: '/blog/kit-api-starter'
  }
]

export const blogPageMeta: { seo: { title: string, description: string }, title: string, description: string } = {
  seo: {
    title: 'Blog technique',
    description: 'Articles sur le développement web, Laravel, Vue.js, Nuxt, et les outils AI.'
  },
  title: 'Blog technique',
  description: 'Retours d\'expérience sur mes projets réels : architecture, scraping, authentification, APIs, et outils AI.'
}

export function getSortedPosts(): BlogPost[] {
  return [..._posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostByPath(path: string): BlogPost | undefined {
  return _posts.find(p => p.path === path)
}

export function getSurroundingPosts(path: string, fields?: { fields?: string[] }): { prev?: { title: string, path?: string, description?: string }, next?: { title: string, path?: string, description?: string } } {
  const sorted = getSortedPosts()
  const index = sorted.findIndex(p => p.path === path)
  const result: { prev?: { title: string, path?: string, description?: string }, next?: { title: string, path?: string, description?: string } } = {}

  if (index < sorted.length - 1) {
    const nextPost = sorted[index + 1]!
    result.next = { title: nextPost.title, path: nextPost.path }
    if (fields?.fields?.includes('description')) {
      result.next.description = nextPost.description
    }
  }
  if (index > 0) {
    const prevPost = sorted[index - 1]!
    result.prev = { title: prevPost.title, path: prevPost.path }
    if (fields?.fields?.includes('description')) {
      result.prev.description = prevPost.description
    }
  }

  return result
}
