import { describe, it, expect } from 'vitest'
import { getSortedPosts } from '~/data/blog'

describe('contact page', () => {
  it('has at least one blog post (data layer sanity)', () => {
    const posts = getSortedPosts()
    expect(posts.length).toBeGreaterThan(0)
  })
})
