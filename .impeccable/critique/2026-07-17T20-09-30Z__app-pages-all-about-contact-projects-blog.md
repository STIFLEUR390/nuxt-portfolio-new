---
target: all pages (about, contact, projects, blog index, blog article)
total_score: 28
p0_count: 0
p1_count: 4
timestamp: 2026-07-17T20-09-30Z
slug: app-pages-all-about-contact-projects-blog
---
# Critique: All Pages (about, contact, projects, blog index, blog article)

## Global Assessment

**Consistency score: 7/10**

Solid foundation with fraying edges. `UPageHero` template is applied uniformly across all pages — same overrides (`mx-0! text-left text-balance`), same rhythm. Coherent. But consistency breaks in critical details.

### Cross-Page Issues

1. **All images are Unsplash stock photos** — every project image, every blog post, the about page workspace photos, and the author avatar on every blog post. Stock photos for abstract imagery (workspace, servers) are acceptable, but using a stock face as the author portrait across 11+ blog posts is a credibility failure. Recruiters see this immediately.

2. **Same motion on every page** — every `Motion` wrapper uses `translateY(10px)` → `translateY(0)` with `0.2 * index` stagger. Consistent but monotonous. No page differentiates its entrance rhythm. The blog article uses 3 sequential Motion wrappers with 0/0.1/0s delay — unnecessarily fragmented.

3. **Navigation: 6 items + locale toggle + color mode** — exceeds the 4±1 heuristic. Dense header.

4. **No dark-mode verification on PolaroidItem** — hardcoded `bg-white text-black` renders wrong in dark mode.

5. **Landing page (index.vue)** was critiqued and fixed in a prior run. Issues noted below are for the remaining 5 pages.

---

## Per-Page Findings

### About (`/about`)

**AI Slop**: None severe. The "Ma philosophie" with 4 bullet values (Maintenable / Performante / Évolutive / Utile) is slightly templated but authentic.

**Low scores**:
- Consistency (#4): PolaroidItem breaks dark mode + brand palette + shadow rule.

**Cognitive load**: Low. Hero → philosophy → motivation → CTA. Clean path.

**Strengths**:
- Horizontal hero with `sm:rotate-4` avatar is distinctive. The ring + ring-offset creates nice depth.
- MarkdownRenderer with Motion fade `delay: 0.3` gives content space to breathe after hero.

**Priority Issues**:
- **P1** — PolaroidItem: hardcoded `bg-white text-black` breaks dark mode. `drop-shadow-2xl` violates flat-by-default rule. `font-serif` contradicts brand typography. Hover uses 4 simultaneous transforms (over-animated).
- **P2** — Inline CTA at bottom of markdown ("Vous avez un projet en tête ? Parlons-en") is easy to miss. Needs a proper `UButton` below the Polaroid strip.
- **P3** — Page ends abruptly on Polaroid strip. No secondary section.

**Detector**: No issues found.

---

### Contact (`/contact`)

**AI Slop**: None. Clean form, no over-designed patterns.

**Low scores**:
- Flexibility (#7): No keyboard submit shortcut. No attachment or budget field.

**Cognitive load**: Very low. 4 fields with clear labels and help text.

**Strengths**:
- Email button (neutral) + LinkedIn/GitHub (ghost) — correct hierarchy.
- Submitted state with check icon + reset is clean and complete.
- Validation thorough: required fields, email `@` check, message min 10 chars.
- `max-w-xl` form width keeps line length readable.

**Priority Issues**:
- **P2** — No visible rate limiting or honeypot. Error toast is generic ("Échec de l'envoi").
- **P3** — "Ou utilisez le formulaire ci-dessous" is a sentence, not a heading. Doesn't visually anchor the form.

**Minor**:
- No phone field — intentional or oversight for CDI/CDD candidates?
- Textarea has 5 rows — fine. Icon on each field except textarea, correct.

---

### Projects (`/projects`)

**AI Slop**: 8 project cards, all stock photos. Server racks, keyboards, bookshelves, code screens — recognizable Unsplash. This is the most visible slop tell on the entire site.

**Low scores**:
- Recognition (#6): Tags consistent. But "Voir le projet" links all point to GitHub — no live demos. Technical evaluators can't verify the UI quality.

**Cognitive load**: Medium. 8 projects with alternating layout is well-structured but dense.

**Strengths**:
- Alternating `reverse` pattern is well-implemented. `group-hover:gap-2` / `group-hover:translate-x-0.5` is a nice micro-interaction.
- Staggered `0.2 * index` reveal creates natural cascade.
- Hero CTAs ("Discutons de votre projet" + "M'écrire") are well-paired.

**Priority Issues**:
- **P1** — Stock photos for all 8 projects. Replace with project-specific screenshots, mockups, or architecture diagrams. Current photos tell recruiters nothing about the actual project.
- **P3** — All "Voir le projet" links go to GitHub. For non-technical founders, GitHub is intimidating. At least one project needs a live demo or case study page.

**Minor**:
- `loading="lazy"` on images — correct.
- No project count visible.

---

### Blog Index (`/blog`)

**AI Slop**: Each blog post image is stock. `border-4 border-muted ring-2 ring-default` creates a heavy double-border effect — too busy. `-rotate-1` / `+rotate-1` tilt on images misaligns vertical baseline with straight text.

**Low scores**:
- Aesthetic (#8): Triple border (border-4 + ring-2 + ring-default) on blog images is over-specified.

**Cognitive load**: Low. Posts sorted by date, predictable scan.

**Strengths**:
- Consistent metadata (date, min read) signals content investment.
- Locale-aware date formatting.

**Priority Issues**:
- **P2** — `scale-105` on hover + `rotate-1/-rotate-1` baseline + `shadow-lg` = 3 conflicting hover effects on one element. Motion noise.
- **P2** — Stock photos add zero value. Architecture diagrams or code screenshots would be more authentic.

---

### Blog Article (`/blog/[...slug]`)

**AI Slop**: Cleanest page. No slop.

**Low scores**:
- Visibility (#1): No reading progress indicator on long articles (8 min).
- User control (#3): Back link is small text at top. Small target.

**Cognitive load**: Low. Linear reading: back → metadata → image → title → description → author → body → copy link → prev/next.

**Strengths**:
- `UContentSurround` prev/next navigation works correctly.
- `copyToClipboard` with toast feedback — good utility.
- `max-w-3xl` body width — typographic best practice.

**Priority Issues**:
- **P1** — Author avatar is an Unsplash stock face. For a personal portfolio blog with 11+ articles, this is a credibility killer. A real photo is non-negotiable.
- **P2** — No table of contents for long articles. Articles with multiple H2 sections scroll without navigation.
- **P2** — 3 separate Motion wrappers (0/0.1/0s delay) create stuttered entrance. One wrapper with `staggerChildren` on the container would be smoother.
- **P3** — No Twitter/LinkedIn share buttons. "Copier le lien" is the only sharing mechanism.
- **P3** — `articleLink` uses `window.location.href` — SSR will produce empty string before hydration. Button should be disabled until client-side hydration.

---

## PolaroidItem Component

| Rule | Violation |
|------|-----------|
| **Dark mode** | `bg-white text-black` hardcoded. Dark mode renders white-on-dark or black-on-white. |
| **"Le Blueprint" flat rule** | `drop-shadow-2xl` — 25px blur + 13px offset. Heaviest shadow token. Violates flat-by-default. |
| **Brand typography** | `font-serif` hardcoded. Brand uses Instrument Serif only for hero display. |
| **Brand colors** | `text-black` bypasses the zinc/neutral system. |
| **Hover motion** | `scale-105` + `rotate-0` + `translate-x-4` + `z-10` — 4 simultaneous transforms. Over-animated. |
| **Rotation** | 5° is aggressive for stacked gallery. 2-3° more architectural. |

---

## Persona Red Flags

**Jordan (first-timer, founder/small business owner)**:
- **Stock photos everywhere** → "Is this real or a template?" A developer who uses Unsplash for every project image signals they don't have real screenshots.
- **GitHub-only project links** → "How do I know these work?" Jordan wants live demos.
- **Generic avatar** → #1 credibility killer on personal sites.

**Alex (power user, CTO/tech lead)**:
- **Duplicate stock face as blog author** → "Are these real articles?" Undermines the entire blog.
- **No project screenshots** → "KwikTalk SaaS" has zero visual evidence of the actual interface.
- **No code sandbox in blog** → Can't verify claims without cloning repos.
- **PolaroidItem dark mode break** → "If this breaks, what else breaks?" Triggers quality intuition.

---

## Questions to Consider

1. **Every project and blog post uses a different Unsplash photo instead of a real screenshot.** Zero visual proof of actual work. For a "full-stack developer portfolio," is the visual proof gap between "I built this" and "here's a stock photo of a server" the single largest conversion killer?

2. **The PolaroidItem dark-mode failure suggests the design system is enforced at the template level but not at the component level.** Are other custom components equally fragile?

3. **`translateY(10px)` + stagger on every single page** — when the same entrance animation plays on a blog post, a project card, and a contact form, does it lose communicative power and become visual noise?
