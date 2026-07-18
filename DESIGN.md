---
name: Nuxt Portfolio
description: Portfolio personnel — développeur full-stack
colors:
  primary: "#3b82f6"
  primary-deep: "#2563eb"
  neutral-bg: "#ffffff"
  neutral-ink: "#18181b"
  neutral-muted: "#71717a"
  surface-elevated: "#f4f4f5"
  border-default: "#e4e4e7"
  success: "#22c55e"
  dark-bg: "#020618"
  dark-ink: "#f4f4f5"
  dark-muted: "#a1a1aa"
  dark-elevated: "#27272a"
  dark-border: "#27272a"
  text-primary: "#18181b"
  text-secondary: "#71717a"
  text-inverse: "#ffffff"
  surface-default: "#ffffff"
  surface-subtle: "#f4f4f5"
  focus-ring: "#3b82f6"
  link-default: "#3b82f6"
  link-hover: "#2563eb"
  dark-text-primary: "#f4f4f5"
  dark-text-secondary: "#a1a1aa"
  dark-text-inverse: "#020618"
  dark-surface-default: "#020618"
  dark-surface-subtle: "#27272a"
  dark-link-default: "#3b82f6"
  dark-link-hover: "#60a5fa"
  selection-light: "#c8c8c8"
  selection-dark: "#3f3f46"
  selection-ink-light: "#282a30"
  selection-ink-dark: "#ffffff"
typography:
  display:
    fontFamily: "'Instrument Serif', serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Public Sans', sans-serif"
    fontSize: "clamp(1.25rem, 3vw, 2rem)"
    fontWeight: 500
    lineHeight: 1.2
  title:
    fontFamily: "'Public Sans', sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "'Public Sans', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Public Sans', sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.02em"
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.75rem"
  xl: "1rem"
  full: "9999px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "3rem"
  section: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-inverse}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.text-inverse}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
    border: "1px solid {colors.border-default}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  card-default:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "1.25rem"
  input-default:
    backgroundColor: "{colors.surface-default}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "0.625rem 0.875rem"
    border: "1px solid {colors.border-default}"
  nav-pill:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.5rem"
  badge-subtle:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.full}"
    padding: "0.375rem 0.75rem"
---

# Design System: Le Blueprint

## 1. Overview

**Creative North Star : "Le Blueprint"**

Comme un plan d'architecte, ce portfolio construit la confiance par la clarté, la précision, et l'intention visible. Rien n'est décoratif : chaque espace, chaque trait, chaque transition sert une fonction. L'objectif unique est de convaincre le visiteur que le développeur derrière ce code maîtrise son artisanat.

L'esthétique est techniquement précise sans être froide. Le bleu primaire apporte une signature professionnelle reconnaissable ; les zinc neutres offrent un socle stable et lisible. La profondeur est créée par les changements de tonalité ; les ombres sont utilisées avec parcimonie, réservées à la navigation flottante et à certains états interactifs.

Le système repose sur `@nuxt/ui` v4 comme fondation de composants, avec des surcharges de classes Tailwind ciblées pour les patterns propres au portfolio. Les animations orchestrent les entrées via la librairie `motion-v` en mode reveal (opacity + translateY), jamais en gate (le contenu reste visible sans JS).

Ce système rejette explicitement : les templates génériques, les dégradés décoratifs, les cartes fantômes (1px border + grosse ombre), les coins excessivement arrondis (>16px), les eyebrow labels en uppercase au-dessus de chaque section, et la glassmorphose décorative.

### Key Characteristics

- **Architectural.** Structure visible, lignes nettes, espacement délibéré.
- **Confident.** Bleu affirmé sans excès, zinc stables, pas besoin d'en faire trop.
- **Précis.** Pas de dégradés, pas d'effets gratuits, pas de bruit visuel.
- **Technique mais pas froid.** Le sérieux du blueprint équilibré par une typographie choisie avec soin.

## 2. Colors

Deux mondes distincts — light et dark — qui partagent la même ossature bleue. Les tokens ci-dessous sont organisés par rôle d'usage, pas par nom de matière brute.

### Semantic Usage Tokens

| Token | Light | Dark | Usage |
|---|---|---|---|
| `surface-default` | `#ffffff` | `#020618` | Fond de page principal |
| `surface-subtle` | `#f4f4f5` | `#27272a` | Cartes, sections élevées, fonds secondaires |
| `text-primary` | `#18181b` | `#f4f4f5` | Titres, corps de texte |
| `text-secondary` | `#71717a` | `#a1a1aa` | Descriptions, métadonnées, textes d'appoint |
| `text-inverse` | `#ffffff` | `#020618` | Texte sur fond primaire |
| `border-default` | `#e4e4e7` | `#27272a` | Bordures de champs, séparateurs |
| `focus-ring` | `#3b82f6` | `#3b82f6` | Focus visible clavier (2px, offset 2px) |
| `link-default` | `#3b82f6` | `#3b82f6` | Liens dans le texte |
| `link-hover` | `#2563eb` | `#60a5fa` | Liens au survol |

### Primary

- **Blueprint Blue** (`#3b82f6` / oklch(0.546 0.245 263)) : Le bleu signature. Utilisé sur les boutons CTA, les icônes de services, les liens dans le texte. Jamais plus de 15% d'une surface.
- **Blueprint Deep** (`#2563eb`) : Hover state du primary. Apporte de la profondeur à l'interaction.

### Neutral

- **Paper** (`#ffffff`) : Fond light.
- **Ink** (`#18181b` / zinc-900) : Texte body light. Contraste ≥ 15:1.
- **Muted** (`#71717a` / zinc-500) : Texte secondaire light. Contraste ≥ 4.5:1.
- **Elevated** (`#f4f4f5` / zinc-100) : Fond des cartes et surfaces secondaires.
- **Border** (`#e4e4e7` / zinc-200) : Séparateurs, bordures de champs.

### Dark Mode

- **Midnight Ink** (`#020618`) : Fond dark — noir bleuté profond.
- **Dark Ink** (`#f4f4f5` / zinc-100) : Texte body dark.
- **Dark Muted** (`#a1a1aa` / zinc-400) : Texte secondaire dark.
- **Dark Elevated** (`#27272a` / zinc-800) : Surfaces élevées dark.
- **Dark Border** (`#27272a` / zinc-800) : Bordures dark.

### Semantic

- **Selection Light** (`#c8c8c8`) : Fond de sélection de texte en mode light. Gris neutre.
- **Selection Dark** (`#3f3f46` / zinc-700) : Fond de sélection de texte en mode dark. Ton sur ton avec le fond `#020618`.
- **Selection Ink Light** (`#282a30`) : Couleur du texte sélectionné en mode light.
- **Selection Ink Dark** (`#ffffff`) : Couleur du texte sélectionné en mode dark.
- **Success Green** (`#22c55e`) : Indicateur de disponibilité, succès d'envoi formulaire. Utilisé dans le Hero (indicateur "Disponible" avec animation ping) et les notifications toast.

### Named Rules

**La Règle du 15%.** Le bleu primaire n'occupe jamais plus de 15% de la surface visible. Sa rareté est son autorité.

**La Règle des Deux Mondes.** Light et dark ont leurs propres valeurs de gris. Ne pas réutiliser les tokens light en dark.

## 3. Typography

**Display Font:** Instrument Serif, serif
**Body Font:** Public Sans, sans-serif

**Character :** Le duo Public Sans + Instrument Serif crée une tension productive : le sérieux technique du sans-serif adouci par la chaleur mesurée du serif en affichage. Public Sans est géométrique et lisible (famille de 9 graisses). Instrument Serif apporte une note éditoriale discrète — réservée aux titres héroïques et aux citations.

### Hierarchy

| Level | Font | Weight | Size | Line Height | Where |
|---|---|---|---|---|---|
| **Display** | Instrument Serif | 400 | `clamp(2rem, 5vw, 3.5rem)` | 1.1 | Hero uniquement |
| **Headline** | Public Sans | 500 | `clamp(1.25rem, 3vw, 2rem)` | 1.2 | Titres de sections |
| **Title** | Public Sans | 600 | `1rem` | 1.3 | Cartes, items |
| **Body** | Public Sans | 400 | `1rem` (16px) | 1.6 | Texte courant |
| **Label** | Public Sans | 500 | `0.8125rem` (13px) | 1 | Métadonnées, tags |

### Usage Rules

- **Display** : hero seulement. Pas de serif ailleurs. `text-wrap: balance`.
- **Headline** : sections. `text-wrap: balance`.
- **Title** : cartes, listes, items nommés.
- **Body** : jamais en dessous de 16px (1rem). Max 75ch. `text-wrap: pretty`.
- **Label** : metadata, dates, tags. Jamais pour du texte long.

### Named Rules

**La Règle des 75 Caractères.** Le corps de texte ne dépasse jamais 75 caractères par ligne.

**La Règle du Serif Rare.** Instrument Serif est réservé aux moments à fort impact visuel (hero, citation). Pas de serif dans le corps, les cartes ou la navigation.

## 4. Elevation

La profondeur est principalement créée par les changements de tonalité ; les ombres ne sont utilisées qu'avec parcimonie, réservées à la navigation flottante et à certains états interactifs.

Principe : un élément a soit un fond différencié (`surface-subtle`), soit une ombre légère — jamais les deux simultanément.

### Shadow Vocabulary

- **Nav Float** (`0 10px 15px -3px rgba(9, 9, 11, 0.05)`) : Barre de navigation fixe. Diffuse, à peine perceptible.
- **Hover Lift** (`0 4px 6px -1px rgba(0, 0, 0, 0.05)`) : Optionnel pour cartes interactives au survol.

### Named Rules

**La Règle Plat-par-Défaut.** Les surfaces sont plates au repos. L'élévation est un signal d'interaction ou de hiérarchie, pas un décor permanent.

## 5. Components

Tous les composants UI sont issus de `@nuxt/ui` v4. Les descriptions ci-dessous documentent les surcharges propres au portfolio — les valeurs non mentionnées suivent les defaults du module.

### Page Wrappers

Trois niveaux de mise en page fournis par `@nuxt/ui` :

- **UPage** : Conteneur racine de chaque page. Gère le padding et la largeur max du contenu.
- **UPageHero** : Section héro — portrait, titre, description, CTA. Slot `headline`, `title`, `description`, `links`. Container : `py-18 sm:py-24 lg:py-32`. Titre : `mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl`.
- **UPageSection** : Section standard. Container `px-0 pt-0!` surchargé pour contrôler le padding finement. Titre aligné à gauche, `text-xl sm:text-xl lg:text-2xl font-medium`, description `text-muted` en `text-sm`.

### Buttons

Implémentés via `UButton` de `@nuxt/ui`. Le système utilise trois variantes :

- **Primary (solid)** : Fond `primary` (Blueprint Blue `#3b82f6`), texte blanc. Hover : `bg-primary/75`. Taille `lg` dans le hero, `md` ailleurs.
- **Outline** : Bordure `primary/50` (ou zinc), fond transparent. Hover : `bg-primary/10`. Utilisé pour les CTA secondaires.
- **Ghost** : Texte `muted`, pas de fond ni bordure. Hover : `bg-elevated`. Utilisé pour le lien CV dans le hero.

States : hover change tonalité (pas de scale, pas de lift). Active : `bg-primary/75`. Focus : ring bleu 2px (`outline-primary/25 focus-visible:outline-3`). Disabled : `opacity-75`, pas de réaction hover.

### Navigation

Implémentée via `UNavigationMenu` avec surcharges.

- **Style** : Pilule arrondie (`rounded-full`), fond `bg-muted/80` + `backdrop-blur-sm`, bordure `border border-muted/50`, ombre `shadow-lg shadow-neutral-950/5`. Fixe en haut de page (`fixed top-2 sm:top-4`), centrée via transform.
- **Variante** : `variant="link"` `color="neutral"`.
- **Liens** : `px-2 py-1`, `linkLeadingIcon: hidden`.
- **États** : Actif = texte `highlighted`. Inactif = `muted`. Survol = fond `muted/50`.
- **Trailing** : Boutons de langue (FR/EN) en ghost size xs + ColorModeButton.

### Cards

Implémentées via `UCard variant="subtle"` pour les services.

- **Style** : Fond `bg-elevated/50`, pas de bordure ni ombre, coins 0.75rem (rounded-lg via Nuxt UI radius scale).
- **Contenu** : `p-5`, flex column gap-3. Icône `text-primary` size-6. Titre `text-base font-semibold text-highlighted`. Description `text-sm text-muted leading-relaxed`.
- **Grille** : `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`.

### Badges / Chips

Implémentés via `UBadge variant="subtle" color="neutral"`.

- **Style** : Ring subtil, texte `text-default`, fond `bg-elevated`. Coins `rounded-md` (par défaut). Surcharges Tailwind : `gap-1.5 px-3 py-1.5 text-sm`.
- **Icône** : 16px (`size-4`), placée avant le texte via `UIcon`.
- **Usage** : Stack technique, tags de catégorie. Regroupés par catégorie avec titre `text-base font-semibold text-highlighted`.

### Accordion (FAQ)

Implémenté via `UAccordion` avec surcharges, combiné avec `UTabs` pour les catégories.

- **Tabs** : `UTabs` horizontal avec indicateur `bg-elevated/60`. Triggers : `px-3 py-2 rounded-lg hover:bg-muted/50`. Actif = `text-highlighted`, inactif = `text-muted`.
- **Accordion items** : `border-none`, `mb-2`.
- **Trigger** : `mb-2 border-0 group px-4 transform-gpu rounded-lg bg-elevated/60 will-change-transform hover:bg-muted/50 text-base`.
- **Trailing icon** : `lucide:plus`. Rotation 135° à l'ouverture (`group-data-[state=open]:rotate-135`). Transition fluide via Nuxt UI.
- **Body** : Contenu markdown rendu par `MarkdownRenderer` (unwrap p, px-4).

### Stats Bar

Barre horizontale d'indicateurs clés sous le hero.

- **Style** : `flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted py-6 sm:py-8 border-y border-default my-8`.
- **Items** : Icône Lucide 16px + texte. Séparateurs `text-muted/30`.
- **Contenu** : Années d'expérience, localisation, stack, rôle.

### Hero Availability Indicator

Indicateur de disponibilité freelance dans le hero.

- **Style** : `flex items-center gap-1.5 text-sm text-muted`. Point vert avec animation ping (`animate-ping` + `bg-success`). Séparateurs `text-muted/50 · text-muted/50`.

### Motion (Animations d'entrée)

Tous les reveals utilisent `motion-v` (wrapper Vue du framer-motion). Pattern uniforme :

- **Hero** : `Motion` avec initial `{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }`, animate `{ opacity: 1, filter: 'blur(0px)', scale: 1 }`, duration 0.6s, delays staggerés (0.1s / 0.3s / 0.5s).
- **Sections** : `Motion` avec `initial="{ opacity: 0, transform: 'translateY(10px)' }"`, `while-in-view="{ opacity: 1, transform: 'translateY(0)' }"`, `in-view-options="{ once: true }"`, delay calculé par index (`0.1 * index`).
- **Work Experience** : translateY(20px), delay base 0.4s + 0.2s par item.
- **Stack** : fade-in simple (`opacity`), delay 0.1s par catégorie.

Contenu jamais caché par défaut : les `initial` sont des états améliorables, pas des gates. Si le JS ne charge pas, le contenu reste pleinement visible.

### Form Inputs

Implémentés via `UInput` et `UTextarea` de `@nuxt/ui`. Variante `outline` par défaut, `size="md"`, `color="primary"`.

### Changelog (Work Experience)

- **Date** : `text-sm`, texte `text-muted`.
- **Séparateur** : `USeparator`.
- **Lien entreprise** : `ULink` avec icône. Couleur de l'entreprise via style inline `{ color: experience.company.color }`. Nom en `font-medium`.
- **Highlights** : `ul list-disc list-inside space-y-1 text-sm text-muted`.

### Toast Notifications

Configuration : `color: 'neutral'` par défaut. Utilisé pour les retours de soumission de formulaire.

## 6. Do's and Don'ts

### Do:

- **Do** utiliser le bleu primaire sur ≤ 15% de la surface. Un bouton CTA, une icône, un lien.
- **Do** créer la profondeur par les changements de tonalité (surface-subtle) plutôt que par les ombres.
- **Do** utiliser Instrument Serif uniquement pour les moments à fort impact (hero, citation).
- **Do** garder le body à 1rem minimum. Jamais en dessous de 16px.
- **Do** respecter un rythme vertical de 4rem minimum entre les sections majeures.
- **Do** animer avec des ease-out doux (duration 0.4-0.6s). Utiliser `motion-v` pour les reveals en scroll.
- **Do** utiliser les composants `@nuxt/ui` (`UButton`, `UCard`, `UBadge`, `UAccordion`, `UNavigationMenu`) et surcharger via `:ui` prop ou classes Tailwind.
- **Do** garder le contenu visible sans JS — les animations motion-v sont des enhancements, pas des gates.
- **Do** documenter tous les états interactifs : hover, active, focus, disabled.
- **Do** respecter WCAG AA : contraste ≥ 4.5:1, focus visible, prefers-reduced-motion supporté.
- **Do** limiter le texte body à 75 caractères par ligne max.

### Don't:

- **Don't** utiliser border-left/right > 1px comme accent décoratif.
- **Don't** utiliser de dégradés sur le texte (`background-clip: text + gradient`).
- **Don't** faire de glassmorphose décorative (backdrop-filter sans raison fonctionnelle).
- **Don't** dépasser 16px de border-radius sur les cartes.
- **Don't** associer `border: 1px solid` + `box-shadow` large sur le même élément.
- **Don't** mettre d'eyebrow label en uppercase au-dessus de chaque section.
- **Don't** utiliser de fond beige/crème/sable. Les neutres tendent vers le zinc (gris neutre), pas vers le warm-toned.
- **Don't** utiliser d'ombres sur les cartes au repos. Les ombres sont réservées à la navigation et aux états interactifs.
- **Don't** aligner trois cartes identiques dans chaque section — varier les grilles pour éviter l'effet template.
- **Don't** supprimer le focus visible. Le focus ring bleu fait partie du système.
- **Don't** ajouter de composants UI customs quand `@nuxt/ui` fournit déjà le pattern.
