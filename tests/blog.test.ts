import { describe, it, expect } from 'vitest'
import { getSortedPosts, getPaginatedPosts, getPostByPath } from '~/data/blog'

describe('blog data', () => {
  it('getSortedPosts returns posts sorted by date desc', () => {
    const posts = getSortedPosts()
    expect(posts.length).toBeGreaterThan(0)
    for (let i = 1; i < posts.length; i++) {
      expect(new Date(posts[i - 1].date).getTime())
        .toBeGreaterThanOrEqual(new Date(posts[i].date).getTime())
    }
  })

  it('getPostByPath returns undefined for unknown path', () => {
    expect(getPostByPath('/unknown')).toBeUndefined()
  })

  it('getPostByPath returns a post for valid path', () => {
    const posts = getSortedPosts()
    const found = getPostByPath(posts[0].path)
    expect(found).toBeDefined()
    expect(found?.title).toBe(posts[0].title)
  })

  it('getPaginatedPosts returns first page with correct count', () => {
    const result = getPaginatedPosts(1, 6)
    expect(result.items.length).toBeLessThanOrEqual(6)
    expect(result.page).toBe(1)
    expect(result.totalPages).toBeGreaterThanOrEqual(2)
    expect(result.total).toBeGreaterThan(6)
  })

  it('getPaginatedPosts returns different items on page 2', () => {
    const page1 = getPaginatedPosts(1, 6)
    const page2 = getPaginatedPosts(2, 6)
    const ids1 = page1.items.map(p => p.path)
    const ids2 = page2.items.map(p => p.path)
    expect(ids1).not.toEqual(ids2)
  })
})
