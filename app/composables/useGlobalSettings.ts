/**
 * Fetch global site settings (singleton) and social links from Directus.
 */
export function useGlobalSettings() {
  const directus = useDirectus()

  return useAsyncData('global-settings', async () => {
    const [settings, socialLinks] = await Promise.all([
      directus.request(readSingleton('global_settings' as const)),
      directus.request(readItems('social_links' as const, {
        sort: ['sort'],
        filter: { status: { _eq: 'published' } },
        fields: ['id', 'label', 'icon', 'url', 'sort', 'status']
      }))
    ])
    return { settings, socialLinks }
  })
}
