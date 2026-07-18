const PER_PAGE = 6

/**
 * Fetch blog page meta and paginated blog posts.
 */
export function useBlog(page = 1) {
  const directus = useDirectus()
  const offset = (page - 1) * PER_PAGE

  return useAsyncData(`blog-${page}`, async () => {
    const [pages, posts, totalAgg] = await Promise.all([
      directus.request(readItems('pages' as const, {
        filter: { slug: { _eq: 'blog' } },
        fields: ['id', 'slug', 'title', 'description', 'seo_title', 'seo_description'],
        limit: 1
      })),
      directus.request(readItems('blog_posts' as const, {
        filter: { status: { _eq: 'published' } },
        sort: ['-date'],
        limit: PER_PAGE,
        offset,
        fields: ['id', 'title', 'description', 'slug', 'date', 'image', 'min_read']
      })),
      directus.request(readItems('blog_posts' as const, {
        filter: { status: { _eq: 'published' } },
        aggregate: { count: '*' }
      }))
    ])

    const agg = totalAgg?.[0] as Record<string, unknown> | undefined
    const count = typeof agg?.count === 'object' && agg.count !== null
      ? (agg.count as Record<string, number>)?.id ?? 0
      : 0
    const total = Number(count)
    const totalPages = Math.ceil(total / PER_PAGE)

    return {
      page: pages?.[0] || null,
      posts,
      pagination: { currentPage: page, totalPages, total, perPage: PER_PAGE }
    }
  })
}

/**
 * Fetch a single blog post by slug.
 */
export function useBlogPost(slug: string) {
  const directus = useDirectus()

  return useAsyncData(`blog-post-${slug}`, async () => {
    const posts = await directus.request(readItems('blog_posts' as const, {
      filter: {
        _and: [
          { slug: { _eq: slug } },
          { status: { _eq: 'published' } }
        ]
      },
      limit: 1,
      fields: ['id', 'title', 'description', 'slug', 'date', 'image', 'min_read', 'body']
    }))

    if (!posts?.length) {
      throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
    }

    // Get surrounding posts
    const allPosts = await directus.request(readItems('blog_posts' as const, {
      filter: { status: { _eq: 'published' } },
      sort: ['-date'],
      fields: ['id', 'title', 'description', 'slug']
    }))

    const currentIndex = allPosts.findIndex(p => p.slug === slug)
    const surround = []
    if (currentIndex < allPosts.length - 1) surround.push(allPosts[currentIndex + 1])
    if (currentIndex > 0) surround.push(allPosts[currentIndex - 1])

    return { post: posts[0], surround }
  })
}

/**
 * Fetch latest blog posts (for landing page).
 */
export function useLatestPosts(limit = 3) {
  const directus = useDirectus()

  return useAsyncData('latest-posts', () =>
    directus.request(readItems('blog_posts' as const, {
      filter: { status: { _eq: 'published' } },
      sort: ['-date'],
      limit,
      fields: ['id', 'title', 'description', 'slug', 'date', 'image', 'min_read']
    }))
  )
}
