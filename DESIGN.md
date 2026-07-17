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

- **Success Green** (`#22c55e`) : Indicateur de disponibilité, succès d'envoi formulaire.

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

### Buttons

Précis et confiants. L'intention est immédiatement lisible.

- **Shape :** Coins 0.5rem (8px). Padding vertical : 0.75rem. Padding horizontal : 1.5rem.
- **Primary :** Fond Blueprint Blue, texte blanc. Hover : Blueprint Deep. Transition 0.2s ease-out.
- **Outline :** Bordure Border, texte Ink, fond transparent. Hover : fond Elevated.
- **Ghost :** Texte Muted, pas de bordure ni fond. Hover : fond Elevated.
- **Hover :** Changement tonal subtil (pas de scale, pas de lift).
- **Active :** Légère impression d'enfoncement (darken 5%), pas de scale dramatique.
- **Focus :** Ring bleu 2px avec offset 2px. Ne jamais supprimer le focus visible.
- **Disabled :** Opacité réduite (50%), pas d'ombre, pas de réaction hover. Pas de focus ring.

### Cards

Deux variantes, une philosophie : contenir sans enfermer.

- **UCard (variant="subtle") :** Fond `surface-subtle`, pas de bordure, coins 0.75rem (12px), padding 1.25rem.
  - Pas d'ombre au repos.
- **UPageCard (variant="naked") :** Pas de fond ni bordure. Image en pleine largeur (rounded-lg).
  - Hover : icône flèche qui slide (translateX).
- **Blog Post :** Image arrondie-lg avec `border-4` et `ring-2`. Rotation alternée (rotate-1/-1).
- **Hover (cards cliquables) :** Changement tonal subtil ou icône qui se déplace. Pas d'ombre au survol.
- **Focus :** Ring bleu 2px.
- **Disabled (si pertinent) :** Opacité réduite, pas d'interaction.

### Navigation

La barre de navigation est le seul élément qui flotte au-dessus du contenu.

- **Style :** Pilule arrondie (rounded-full), fond `bg-muted/80` + `backdrop-blur-sm`, bordure légère, `shadow-lg` minimal.
- **États :** Actif = texte primary. Inactif = muted. Survol = fond `muted/50`.
- **Mobile :** Même pilule, adaptée à la largeur.

### Inputs / Fields

Fonctionnels, propres, sans fioriture.

- **Style :** Fond `surface-default`, bordure `border-default`, coins 0.5rem (8px). Icône intérieure optionnelle.
- **Focus :** Bordure primaire + ring bleu 2px. Transition douce.
- **Hover :** Bordure légèrement plus foncée (darken 10%).
- **Error :** Texte d'erreur rouge, bordure rouge, icône d'erreur.
- **Disabled :** Opacité réduite, pas de focus ring, pas de réaction hover.
- **Placeholder :** `text-secondary` (contrôle volontaire, pas un gré clair par défaut).
- **Autocomplete :** Attributs `autocomplete` présents.

### Chips / Badges

Pour la stack technique, tags, métadonnées.

- **Style :** Fond `surface-subtle`, texte `text-secondary`, rounded-full, gap 1.5, px-3 py-1.5.
- **Icône :** 16px, incluse avant le texte.

### Accordion (FAQ)

- **Style :** Fond `surface-subtle` à 60%, coins 0.5rem, pas de bordure, padding 1rem.
- **Trigger hover :** Fond `muted/50`.
- **Trailing icon :** Lucide plus (+) → rotation 135° à l'ouverture. Transition fluide.
- **Espacement :** `mb-2` entre les items.

## 6. Layout & Spacing

### Spacing Rules

- **xs** (0.5rem) : Espacement inline, gaps d'icônes, padding de chip.
- **sm** (1rem) : Intérieurs de composants tassés, gaps de formulaires.
- **md** (1.5rem) : Intérieurs de composants standards, gaps de grille.
- **lg** (2rem) : Espacement entre cartes et blocs.
- **xl** (3rem) : Rythme entre sections sur mobile.
- **section** (4rem minimum) : Espacement vertical entre sections majeures. Ne jamais descendre sous 4rem sur desktop.

### Grid Rules

- **Prose width :** 65-75ch max. Les paragraphes ne s'étendent jamais sur toute la largeur du conteneur.
- **Content container :** `--container-4xl` (56rem / 896px), centré. Bordures latérales sur desktop (`border-x`).
- **Hero :** Peut dépasser du conteneur standard, mais le texte body reste contraint.
- **Services grid :** 1 colonne mobile, 2 colonnes tablette, 3 colonnes desktop.
- **Projets :** Liste verticale avec cartes horizontales alternées (reverse sur un élément sur deux).
- **Blog :** Grille verticale, cartes horizontales avec rotation alternée.

## 7. Do's and Don'ts

### Do:

- **Do** utiliser le bleu primaire sur ≤ 15% de la surface. Un bouton CTA, une icône, un lien.
- **Do** créer la profondeur par les changements de tonalité (surface-subtle) plutôt que par les ombres.
- **Do** utiliser Instrument Serif uniquement pour les moments à fort impact (hero, citation).
- **Do** garder le body à 1rem minimum. Jamais en dessous de 16px.
- **Do** respecter un rythme vertical de 4rem minimum entre les sections majeures.
- **Do** animer avec des ease-out doux (duration 0.4-0.6s, cubic-bezier(0.16, 1, 0.3, 1)).
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
