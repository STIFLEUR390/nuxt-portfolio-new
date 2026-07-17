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
  body:
    fontFamily: "'Public Sans', sans-serif"
    fontSize: "0.9375rem"
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
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
    border: "1px solid {colors.border-default}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.neutral-muted}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  card-default:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.lg}"
    padding: "1.25rem"
  input-default:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.md}"
    padding: "0.625rem 0.875rem"
    border: "1px solid {colors.border-default}"
  nav-pill:
    backgroundColor: "transparent"
    textColor: "{colors.neutral-muted}"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.5rem"
  badge-subtle:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.neutral-muted}"
    rounded: "{rounded.full}"
    padding: "0.375rem 0.75rem"
---

# Design System: Le Blueprint

## 1. Overview

**Creative North Star : "Le Blueprint"**

Comme un plan d'architecte, ce portfolio construit la confiance par la clarté, la précision, et l'intention visible. Rien n'est décoratif — chaque espace, chaque trait, chaque transition sert une fonction : convaincre le visiteur que le développeur derrière ce code maîtrise son artisanat.

L'esthétique est techniquement précise sans être froide. Le bleu primaire apporte une signature professionnelle recognisable ; les zinc neutres offrent un socle stable et lisible. Les ombres sont légères, les arrondis mesurés, le rythme respiré.

Ce système rejette explicitement : les templates génériques, les dégradés décoratifs, les cartes fantômes (1px border + grosse ombre), les coins excessivement arrondis (>16px), les eyebrow labels en uppercase au-dessus de chaque section, et la glassmorphose décorative.

### Key Characteristics

- **Architectural.** Structure visible, lignes nettes, espacement délibéré.
- **Confident.** Bleu affirmé, zinc stables, ombres légères — pas besoin d'en faire trop.
- **Précis.** Chaque pixel compte. Pas de dégradés, pas d'effets gratuits, pas de bruit visuel.
- **Technique mais pas froid.** Le sérieux du blueprint équilibré par une typographie choisie avec soin.

## 2. Colors

Deux mondes distincts — light et dark — qui partagent la même ossature bleue. Le zinc côté light apporte de la chaleur contenue ; le noir bleuté (#020618) côté dark ancre le portfolio dans une ambiance technique premium.

### Primary

- **Blueprint Blue** (`#3b82f6` / oklch(0.546 0.245 263)) : Le bleu signature. Utilisé sur les boutons CTA, les icônes de services, les liens dans le texte. Jamais plus de 15% d'une page — sa rareté est son impact.
- **Blueprint Deep** (`#2563eb`) : Hover state du primary. Apporte de la profondeur à l'interaction.

### Neutral

- **Paper** (`#ffffff` / oklch(1 0 0)) : Fond light — blanc pur. Crée un contraste maximum avec l'encre.
- **Ink** (`#18181b` / oklch(0.141 0.005 285)) : Texte body. Zinc-900. Assure un ratio de contraste ≥ 15:1 sur fond blanc.
- **Muted** (`#71717a` / oklch(0.447 0.009 286)) : Texte secondaire, descriptions, meta. Zinc-500. Contraste ≥ 4.5:1 sur fond blanc.
- **Elevated** (`#f4f4f5` / oklch(0.967 0.001 286)) : Fond des cartes et surfaces secondaires. Zinc-100. Différenciation subtile.
- **Border** (`#e4e4e7` / oklch(0.92 0.004 286)) : Séparateurs, bordures de champs. Zinc-200.

### Dark Mode

- **Midnight Ink** (`#020618`) : Fond dark — noir bleuté profond. Personnalisé, ni zinc ni neutral par défaut. Donne l'identité sombre du portfolio.
- **Dark Ink** (`#f4f4f5` / zinc-100) : Texte body en dark mode.
- **Dark Muted** (`#a1a1aa` / zinc-400) : Texte secondaire en dark mode.
- **Dark Elevated** (`#27272a` / zinc-800) : Surfaces élevées en dark mode (accordéon, cartes).
- **Dark Border** (`#27272a` / zinc-800) : Bordures en dark mode.

### Semantic

- **Success Green** (`#22c55e` / oklch(0.627 0.194 149)) : Indicateur de disponibilité, succès d'envoi formulaire, validations. Utilisé avec parcimonie — un point qui pulse, une icône de check.

### Named Rules

**La Règle du 15%.** Le bleu primaire n'occupe jamais plus de 15% de la surface visible. Sa rareté est son autorité. Un bouton CTA, une icône par carte, un lien dans le texte — jamais de fond bleu massif.

**La Règle des Deux Mondes.** Light et dark ont leurs propres valeurs de gris. Ne pas réutiliser les tokens light en dark. L'ossature (le bleu) reste la même ; les neutres s'inversent.

## 3. Typography

**Display Font:** Instrument Serif, serif
**Body Font:** Public Sans, sans-serif

**Character :** Le duo Public Sans + Instrument Serif crée une tension productive : le sérieux technique du sans-serif adouci par la chaleur mesurée du serif en affichage. Public Sans est géométrique et lisible (famille de 9 graisses). Instrument Serif apporte une note éditoriale discrète — réservée aux titres héroïques et aux citations.

### Hierarchy

- **Display** (Instrument Serif Regular 400, `clamp(2rem, 5vw, 3.5rem)`, line-height 1.1, letter-spacing -0.02em) : Titres de héros, sections principales. Maximum 6rem. `text-wrap: balance`.
- **Headline** (Public Sans Medium 500, `clamp(1.25rem, 3vw, 2rem)`, line-height 1.2) : Titres de sections, cartes. `text-wrap: balance`.
- **Title** (Public Sans Semibold 600, 0.9375–1rem, line-height 1.3) : Noms de projets, titres de services.
- **Body** (Public Sans Regular 400, 0.9375rem, line-height 1.6) : Texte courant. Max 65-75ch. `text-wrap: pretty`.
- **Label** (Public Sans Medium 500, 0.8125rem, letter-spacing 0.02em) : Métadonnées, dates, petits textes.

### Named Rules

**La Règle des 75 Caractères.** Le corps de texte ne dépasse jamais 75 caractères par ligne. Sur écran large, les paragraphes sont contenus par `max-w-prose` ou `max-w-2xl`. La lisibilité prime sur l'occupation de l'espace.

**La Règle du Serif Rare.** Instrument Serif est réservé aux moments à fort impact visuel : hero, citation, titre de page. Pas de serif dans le corps de texte, les cartes, ou la navigation.

## 4. Elevation

La profondeur est construite par **ombres légères et changements de tonalité**, jamais par les deux simultanément sur le même élément. Principe : un élément a soit une ombre, soit un fond différencié (bg-elevated / bg-muted), pas les deux.

**Interaction de surface :** les cartes (UCard variant="subtle") utilisent le fond elevated pour se détacher du fond principal, sans ombre. Les éléments survolables (boutons, liens) utilisent des transitions de couleur sans ombre. La navigation flottante utilise une légère ombre (`shadow-lg shadow-neutral-950/5`) pour signaler sa superposition.

### Shadow Vocabulary

- **Nav Float** (`box-shadow: 0 10px 15px -3px rgba(9, 9, 11, 0.05)` ou équivalent `shadow-lg shadow-neutral-950/5`) : Barre de navigation fixe. Diffuse, à peine perceptible.
- **Hover Lift** (`box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05)`) : Optionnel pour cartes interactives au survol.

### Named Rules

**La Règle Plat-par-Défaut.** Les surfaces sont plates au repos. L'élévation est un signal d'interaction ou de hiérarchie, pas un décor permanent. Si un élément n'est ni interactif ni hiérarchiquement prioritaire, il reste plat.

## 5. Components

### Buttons

Précis et confiants. L'intention est immédiatement lisible : un bouton primaire = action principale, outline = action secondaire, ghost = action tertiaire.

- **Shape :** Coins modérément arrondis (0.5rem / 8px). Padding vertical généreux pour la cible tactile.
- **Primary :** Fond Blueprint Blue, texte blanc. Hover : Blueprint Deep. Transition douce (0.2s ease-out).
- **Outline :** Bordure Border, texte Ink, fond transparent. Hover : fond Elevated. Idéal pour les actions secondaires.
- **Ghost :** Texte Muted, pas de bordure ni fond. Hover : fond Elevated. Pour les actions tertiaires (CV, lien mail).
- **Focus-visible :** Ring bleu (2px, offset 2px) pour l'accessibilité clavier.

### Cards

Deux variantes, une philosophie : contenir sans enfermer.

- **UCard (variant="subtle") :** Fond Elevated, pas de bordure, coins arrondis (0.75rem), padding 1.25rem.
  - Utilisé pour les grilles de services, FAQ, stack.
  - Aucune ombre au repos.
- **UPageCard (variant="naked") :** Pas de fond ni bordure. Padding 0. Image en pleine largeur arrondie (rounded-lg).
  - Utilisé pour la timeline de projets.
  - Effet hover : icône flèche qui slide.
- **UBlogPost :** Fond transparent, image arrondie-lg avec bordure-4 et ring. Rotation subtile (rotate-1/-1) pour alternance visuelle.

### Navigation

La barre de navigation est le seul élément qui flotte au-dessus du contenu.

- **Style :** Pilule arrondie (rounded-full), fond bg-muted/80 avec backdrop-blur-sm, bordure légère, shadow-lg minimal.
- **Typographie :** Public Sans, taille nav par défaut Nuxt UI.
- **États :** Lien actif = texte primary. Lien inactif = texte muted. Survol = fond muted/50.
- **Mobile :** Même pilule, adaptée à la largeur.

### Inputs / Fields

Fonctionnels, propres, sans fioriture.

- **Style :** Fond blanc (light) / Dark Elevated (dark), bordure Border, coins 0.5rem. Icône intérieure optionnelle.
- **Focus :** Ring bleu (2px) avec transition douce. Bordure primaire au focus.
- **Error :** Texte d'erreur en rouge (danger), bordure rouge.
- **Disabled :** Opacité réduite, pas de focus ring.
- **Autocomplete :** Attributs `autocomplete` présents (name, email, etc.).

### Badges / Chips (UBadge)

Pour la stack technique, tags, métadonnées.

- **Style :** Fond Elevated, texte Muted, rounded-full, gap 1.5, padding horizontal 0.75rem, padding vertical 0.375rem.
- **Icône :** 16px (size-4), incluse avant le texte.
- **Variante :** "subtle" par défaut, "neutral" pour la couleur.

### Accordion (FAQ)

Contenu dépliable, propre et spacieux.

- **Style :** Fond Elevated/60, coins 0.5rem, pas de bordure, padding 1rem.
- **Trailing icon :** Lucide plus (+) qui tourne à 135° à l'ouverture. Transition fluide.
- **Espacement :** mb-2 entre les items.

## 6. Do's and Don'ts

### Do:

- **Do** utiliser le bleu primaire sur ≤ 15% de la surface. Un bouton CTA, une icône, un lien.
- **Do** privilégier les surfaces plates avec des changements de tonalité (bg-elevated, bg-muted) plutôt que des ombres.
- **Do** utiliser Instrument Serif uniquement pour les moments à fort impact (hero, citation).
- **Do** garder un rythme vertical aéré : padding généreux dans les sections (py-18+), gap-4 entre les cartes.
- **Do** animer avec des ease-out doux (duration 0.4-0.6s) : translateY(10px) + opacity pour les révélations, blur(20px) → blur(0) pour le hero.
- **Do** respecter WCAG AA : contraste ≥ 4.5:1 pour le texte body, focus visible sur tous les éléments interactifs, `prefers-reduced-motion` supporté.
- **Do** alterner la rotation des images de blog (rotate-1/-1) pour casser la monotonie d'une grille identique.

### Don't:

- **Don't** utiliser border-left/right > 1px comme accent décoratif. Jamais de stripe latérale.
- **Don't** utiliser de dégradés sur le texte (`background-clip: text + gradient`). Toujours une couleur solide.
- **Don't** faire de la glassmorphose décorative (fond flou sans raison). Le backdrop-blur est réservé à la navigation flottante.
- **Don't** dépasser 16px de border-radius sur les cartes. Les coins sur-arrondis (24px+) sont un marqueur "AI made this".
- **Don't** associer `border: 1px solid X` avec `box-shadow` de blur ≥ 16px sur le même élément. Choisir l'un ou l'autre.
- **Don't** mettre d'eyebrow label en uppercase au-dessus de chaque section. Pas de "SERVICES" "PROJETS" "CONTACT" en petit texte tracké.
- **Don't** utiliser de fond beige/crème/sable. Les neutres tendent vers le zinc (gris neutre), pas vers le warm-toned.
- **Don't** aligner un bouton "primary" avec une ombre portée large. Les boutons sont plats ou ont un hover lift minimal.
- **Don't** utiliser de grille CSS décorative en background (les lignes `linear-gradient`). Le surface doit être un fond uni ou elevated.
- **Don't** utiliser de SVG sketch/doodle/feTurbulence. Pas d'illustrations fait main en SVG.
