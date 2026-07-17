---
target: landing page (index.vue + landing components)
total_score: 25
p0_count: 2
p1_count: 2
timestamp: 2026-07-17T19-43-14Z
slug: app-pages-index-vue
---
# Critique: Landing Page (index.vue + landing components)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Motion entrance animations signal "ready." No scroll-progress indicator, no loading states. |
| 2 | Match System / Real World | 3 | Clean French copy, tech terms explained. Pricing hidden behind 2 interactions in FAQ — mismatch with "I want to know if I can afford this." |
| 3 | User Control and Freedom | 2 | Carousel autoplays with no visible pause control. No "back to top." Strictly linear navigation. |
| 4 | Consistency and Standards | 3 | Section structure consistent. Inconsistency: hardcoded titles in "Services" / "Stack" vs data-driven elsewhere. Blog orientation mismatch (vertical parent, horizontal children). |
| 5 | Error Prevention | 3 | No error-prone UI. Mailto link in hero will open default app — fine on desktop, surprising on mobile. |
| 6 | Recognition Rather Than Recall | 3 | Labels are clear. User must remember pricing location across scroll and tab interaction. |
| 7 | Flexibility and Efficiency | 2 | No keyboard shortcuts, no search, no skip-to-content. Strictly linear scroll. |
| 8 | Aesthetic and Minimalist Design | 3 | Clean, restrained. Separator bar (border-y) between hero + services interrupts flow. |
| 9 | Error Recovery | 1 | No visible 404, error states, undo. Empty FAQ tabs show blank panel. |
| 10 | Help and Documentation | 2 | FAQ covers practical questions. No onboarding, no tooltips. Pricing 3 tabs deep from conversion moment. |
| **Total** | | **25/40** | **Acceptable — significant improvements needed** |

## Anti-Patterns Verdict

**LLM Assessment**: Not AI-generated. The page avoids nearly every tell from the ban list — no gradient text, no glassmorphism, no hero-metrics, no numbered section markers, no eyebrow labels, no ghost-cards, no 32px+ radii. The Instrument Serif + Public Sans pairing is a deliberate design choice. The motion entrance (blur+scale cascade) feels crafted.

The single strongest "AI template" tell is the 6-card Services grid: identical skeleton (icon + title + description) × 6 in a perfect 3×2 grid. The copy differentiates them, but the container pattern echoes a template library. The 6/7/9 badge rows in Stack also feel templated.

**Deterministic Scan**: CLI detector (`detect.mjs`) scanned all 9 landing components — found zero issues across rule sets. Code is clean by automated standards.

**Visual Overlays**: inject.js loaded on localhost:3000. No issues reported by the detector engine in the page context.

**Net assessment**: Genuinely well-crafted. The issues are in UX strategy and content presentation, not technical slop.

## Overall Impression

Confident, clean, and architecturally sound — "Le Blueprint" is a fitting name. The entrance animation, typography pairing, and overall restraint show a designer who knows the rules. But the page stops at "good" when it could be "unforgettable." The biggest single gap: the page ends without asking for the sale. Everything builds trust, then says goodbye. The second: stock photo avatars in a portfolio that sells trust.

## What's Working

1. **Entrance motion.** The blur→scale→clear cascade with staggered delays (0.1/0.15/0.3/0.45) is precisely the confident, technical-but-warm first impression this brand needs. The avatar ring + ping availability dot work as a unified statement.

2. **Typography pairing.** Instrument Serif for the hero display + Public Sans for everything else is a correct, distinctive choice that avoids the Inter/Geist monoculture. `text-pretty`/`text-balance` applied where they matter.

3. **Testimonial treatment.** The full-bleed carousel with dramatic quote marks (5xl→7xl decorative quotes) is the only layout surprise on the page. It breaks the grid intentionally, giving the social proof section genuine weight.

## Priority Issues

**P0 — Stock photo avatars in testimonials.** Unsplash headshots are immediately recognizable as "template person." For a portfolio where trust IS the product, this is the most damaging detail. User sees fake faces → questions everything else. Fix: remove avatars entirely (initials or no avatar), or secure real client-consented photos.

**P0 — No closing CTA.** Page ends at FAQ → footer with social links. The most engaged visitors (those who scrolled the entire page) get no "Travaillons ensemble," no "Contactez-moi," no final conversion prompt. This is a direct revenue leak. Fix: add a closing CTA section between FAQ and footer.

**P1 — Services grid, 6 identical cards.** Same skeleton × 6 in 3×2 grid. The good copy saves it from irrelevance, but the container is the single strongest "AI template" tell on the page. Fix: vary layout — make one card featured/wide, mix an icon-free card, break the 2D grid with a full-width statement card.

**P1 — Three competing hero CTAs.** "Voir mes projets" (neutral solid), "Mission freelance" (outline), "Télécharger mon CV" (ghost). Three buttons, three intents, equal visual weight. No dominant action. Fix: pick one primary CTA, demote the others below the fold or into the nav.

**P2 — Pricing hidden 3 interactions deep.** The highest-stakes question ("how much?") requires: scroll past hero, stats, 6 services, about, experience, stack → find FAQ → click "Prix & Disponibilité" tab → click accordion. Fix: surface a pricing callout between Services and About, or link hero CTA to a visible pricing card.

**P2 — Single experience entry.** "2019 - Présent" at one company reads as "one job." For a senior freelance full-stack developer, this looks thin. Fix: add freelance/agency entries or restructure as "Projects sélectionnés" with the client as context.

**P2 — Carousel has no pause control.** Autoplay at 4s with no visible pause button. Users reading slowly (or fact-checking a quote) get interrupted. Fix: add dot hover-to-pause or a visible pause button.

**P3 — Heavy separator bar.** `border-y border-default` with `my-8 sm:my-12` creates a thick horizontal interrupt right after hero. The location/stack/disponible line would work better as a thin sub-footer to the hero section.

**P3 — Blog orientation mismatch.** `UBlogPosts orientation="vertical"` wraps `UBlogPost orientation="horizontal"`. The intent is horizontal rows — parent should match.

## Persona Red Flags

**Jordan (First-Timer — evaluating fit)**
- "Can I afford this?" → Pricing is invisible until FAQ tab 2 of 3. Jordan won't dig that deep.
- "Is this real?" → Stock photo avatars → doubts the testimonials → doubts the developer.
- "What do I do next?" → Three CTAs, none dominant. Jordan gets decision paralysis.
- "Does he do my thing?" → 6 service choices overwhelms. Jordan leaves.

**Alex (Power User — quick evaluation of competence)**
- "Show me the code" → Blog posts demonstrate depth, but no direct GitHub link from hero.
- "Give me your rate" → Must traverse 5 sections + 2 clicks to find pricing. Not worth the effort.
- "I want your CV now" → CV button is ghost variant (lowest visual weight). Counterintuitive — Alex expects the concrete action to be most prominent.
- No keyboard shortcuts, no skip nav, no search.

**Casey (Mobile User — one-handed, interrupted)**
- Three CTAs stack vertically in `flex-col` — takes 50%+ of hero viewport height. Critical info pushed below fold.
- 6 service cards go single-column → very long scroll.
- Carousel autoplay = frustrating on mobile where reading in motion is harder.
- Mailto link in hero opens mail app without warning — no subtlety on mobile.
- Pricing journey on mobile is even worse (more scroll, smaller tap targets).

## Minor Observations

1. **Company color override (#2563EB)** in WorkExperience is slightly darker than primary (#3b82f6) — minor inconsistency.
2. **FAQ tabs** with `grow` prop force long and short labels to same width.
3. **Empty FAQ tab panels** — inactive tabs show nothing, no placeholder state.
4. **Footer vs hero name**: footer uses full "Franck Hérold TAMTO TAMKO", hero uses "Hérold H." — slight inconsistency.
5. **No active nav state**: nav links stay muted on current page.

## Questions to Consider

1. **If pricing is your highest-stakes conversion moment, why hide it behind 2+ interactions?** What if hero's "Mission freelance" CTA opened a pricing summary instead of a mailto link?

2. **Stock photos say "template" while your copy says "rare et précieux." Which story wins when they conflict?** Is a portfolio without client faces better or worse than one with fake ones?

3. **Six services, three CTAs, three testimonials, twenty-two stack badges** — is "I do everything" a stronger signal than "I do this one thing exceptionally well"? What gets cut?
