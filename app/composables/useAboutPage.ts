import type { PageData } from '~/data/types'
import { aboutPage as staticAboutPage } from '~/data/about'

/**
 * Fetch about page data and transform to PageData shape.
 * Falls back to static data if Directus fetch fails.
 */
export function useAboutPage() {
  const directus = useDirectus()

  return useAsyncData('about', async () => {
    const [pages, aboutContent] = await Promise.all([
      directus.request(readItems('pages' as const, {
        filter: { slug: { _eq: 'about' } },
        fields: ['id', 'slug', 'title', 'description', 'seo_title', 'seo_description'],
        limit: 1
      })).catch(() => null),
      directus.request(readSingleton('about_content' as const)).catch(() => null)
    ])

    const page = pages?.[0]
    if (!page || !aboutContent) {
      return { page: staticAboutPage }
    }

    const aboutContentBody = aboutContent as Record<string, unknown>

    const pageData: PageData = {
      seo: { title: page.seo_title || undefined, description: page.seo_description || undefined },
      title: page.title || '',
      description: page.description || '',
      content: aboutContentBody.body as string || '',
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

    return { page: pageData }
  })
}
