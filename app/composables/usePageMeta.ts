/**
 * Fetch page metadata (SEO) by slug from Directus `pages` collection.
 */
export function usePageMeta(slug: string) {
  const directus = useDirectus()

  return useAsyncData(`page-meta-${slug}`, async () => {
    const items = await directus.request(readItems('pages' as const, {
      filter: { slug: { _eq: slug } },
      fields: ['id', 'slug', 'title', 'description', 'seo_title', 'seo_description', 'translations'],
      limit: 1
    }))
    return items?.[0] || null
  })
}
