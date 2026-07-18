import type { PageData, ServiceItem, StackCategory, ExperienceItem, Testimonial, FaqCategory, FaqQuestion } from '~/data/types'

/**
 * Fetch all data needed for the landing page and transform to PageData shape.
 */
export function useLandingData() {
  const directus = useDirectus()

  return useAsyncData('landing', async () => {
    const [
      pages,
      services,
      stackCategories,
      experienceItems,
      testimonials,
      faqCategories,
      blogPosts
    ] = await Promise.all([
      directus.request(readItems('pages' as const, {
        filter: { slug: { _eq: 'index' } },
        fields: ['id', 'slug', 'title', 'description', 'seo_title', 'seo_description'],
        limit: 1
      })),
      directus.request(readItems('services' as const, {
        sort: ['sort'],
        fields: ['id', 'title', 'description', 'icon', 'sort']
      })),
      directus.request(readItems('stack_categories' as const, {
        sort: ['sort'],
        fields: ['id', 'label', 'description', 'sort']
      })),
      directus.request(readItems('experience' as const, {
        sort: ['sort'],
        fields: ['id', 'position', 'date_range', 'company_name', 'company_logo', 'company_url', 'company_color', 'sort']
      })),
      directus.request(readItems('testimonials' as const, {
        sort: ['sort'],
        fields: ['id', 'quote', 'author_name', 'author_description', 'sort']
      })),
      directus.request(readItems('faq_categories' as const, {
        sort: ['sort'],
        fields: ['id', 'title', 'sort']
      })),
      directus.request(readItems('blog_posts' as const, {
        filter: { status: { _eq: 'published' } },
        sort: ['-date'],
        limit: 3,
        fields: ['id', 'title', 'description', 'slug', 'date', 'image', 'min_read']
      }))
    ])

    const page = pages?.[0] || null

    // Fetch child items
    const [stackItems, expHighlights, faqItems] = await Promise.all([
      directus.request(readItems('stack_items' as const, {
        sort: ['sort'],
        fields: ['id', 'name', 'icon', 'category_id', 'sort']
      })),
      directus.request(readItems('experience_highlights' as const, {
        sort: ['sort'],
        fields: ['id', 'text', 'experience_id', 'sort']
      })),
      directus.request(readItems('faq_items' as const, {
        sort: ['sort'],
        fields: ['id', 'label', 'content', 'category_id', 'sort']
      }))
    ])

    // Transform to PageData shape
    const landingPage: PageData = {
      seo: {
        title: page?.seo_title || page?.title || undefined,
        description: page?.seo_description || page?.description || undefined
      },
      title: page?.title || '',
      description: page?.description || '',
      hero: {
        links: [
          { label: 'Voir mes projets', to: '/projects', color: 'neutral' },
          { label: 'Mission freelance', to: 'mailto:heroldtamko39@gmail.com' },
          { label: 'Télécharger mon CV', color: 'neutral' }
        ]
      },
      about: {
        title: 'À propos',
        description: 'Développeur full-stack basé à Douala, spécialisé Laravel, Vue.js et Nuxt.',
        content: 'Depuis 2019, j\'accompagne des entreprises dans la conception et le développement de leurs produits web.'
      },
      services: services.map((s: Record<string, unknown>) => ({
        title: s.title as string,
        description: s.description as string,
        icon: s.icon as string
      } as ServiceItem)),
      stack: stackCategories.map((cat: Record<string, unknown>) => ({
        label: cat.label as string,
        description: (cat.description as string) || undefined,
        items: stackItems
          .filter((si: Record<string, unknown>) => si.category_id === cat.id)
          .map((si: Record<string, unknown>) => ({
            name: si.name as string,
            icon: (si.icon as string) || undefined
          }))
      } as StackCategory)),
      experience: {
        title: 'Expérience',
        items: experienceItems.map((exp: Record<string, unknown>) => ({
          position: exp.position as string,
          date: exp.date_range as string,
          company: {
            name: exp.company_name as string,
            logo: exp.company_logo as string,
            url: exp.company_url as string,
            color: exp.company_color as string
          },
          highlights: expHighlights
            .filter((h: Record<string, unknown>) => h.experience_id === exp.id)
            .map((h: Record<string, unknown>) => h.text as string)
        } as ExperienceItem))
      },
      testimonials: testimonials.map((t: Record<string, unknown>) => ({
        quote: t.quote as string,
        author: {
          name: t.author_name as string,
          description: t.author_description as string
        }
      } as Testimonial)),
      blog: {
        title: 'Articles récents',
        description: 'Réflexions sur le développement web, Laravel, Vue.js, Nuxt et l\'écosystème AI.'
      },
      faq: {
        title: 'Questions fréquentes',
        description: 'Tout savoir sur ma façon de travailler et mes services.',
        categories: faqCategories.map((cat: Record<string, unknown>) => ({
          title: cat.title as string,
          questions: faqItems
            .filter((fi: Record<string, unknown>) => fi.category_id === cat.id)
            .map((fi: Record<string, unknown>) => ({
              label: fi.label as string,
              content: fi.content as string
            } as FaqQuestion))
        } as FaqCategory))
      }
    }

    // Blog posts for the landing page section
    const latestPosts = blogPosts.map((p: Record<string, unknown>) => ({
      title: p.title as string,
      description: p.description as string,
      date: p.date as string,
      image: p.image as string,
      minRead: p.min_read as number,
      author: { name: 'Franck Hérold TAMTO TAMKO' },
      body: '',
      path: `/blog/${p.slug as string}`
    }))

    return { page: landingPage, latestPosts }
  })
}
