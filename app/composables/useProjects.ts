import type { PageData, ProjectItem } from '~/data/types'
import { projectsPage as staticProjectsPage, projects as staticProjects } from '~/data/projects'

/**
 * Fetch projects page data and transform to PageData/ProjectItem shape.
 * Falls back to static data if Directus fetch fails.
 */
export function useProjects() {
  const directus = useDirectus()

  return useAsyncData('projects', async () => {
    const [pages, projects] = await Promise.all([
      directus.request(readItems('pages' as const, {
        filter: { slug: { _eq: 'projects' } },
        fields: ['id', 'slug', 'title', 'description', 'seo_title', 'seo_description'],
        limit: 1
      })).catch(() => null),
      directus.request(readItems('projects' as const, {
        filter: { status: { _eq: 'published' } },
        sort: ['-date'],
        fields: ['id', 'title', 'description', 'image', 'url', 'demo', 'date', 'sort', 'status']
      })).catch(() => null)
    ])

    const page = pages?.[0]
    if (!page) {
      return {
        page: staticProjectsPage,
        projects: staticProjects
      }
    }

    const pageData: PageData = {
      seo: { title: page.seo_title || undefined, description: page.seo_description || undefined },
      title: page.title || '',
      description: page.description || '',
      links: [
        { label: 'Discutons de votre projet', color: 'neutral' },
        { label: 'M\'écrire' }
      ]
    }

    const projectItems: ProjectItem[] = projects?.map((p: Record<string, unknown>) => ({
      title: p.title as string,
      description: p.description as string,
      image: p.image as string || '',
      url: p.url as string,
      demo: p.demo as string || undefined,
      tags: [],
      date: p.date as string
    })) || staticProjects

    return { page: pageData, projects: projectItems }
  })
}
