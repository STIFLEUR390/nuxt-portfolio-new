import { describe, it, expect } from 'vitest'
import { getSortedPosts } from '~/data/blog'
import validator from 'validator'
import disposableDomains from 'disposable-email-domains'

describe('contact page', () => {
  it('has at least one blog post (data layer sanity)', () => {
    const posts = getSortedPosts()
    expect(posts.length).toBeGreaterThan(0)
  })

  describe('email validation', () => {
    it('accepts valid email', () => {
      expect(validator.isEmail('jean@example.com')).toBe(true)
      expect(validator.isEmail('contact@entreprise.fr')).toBe(true)
      expect(validator.isEmail('user+tag@domain.co')).toBe(true)
    })

    it('rejects invalid email', () => {
      expect(validator.isEmail('')).toBe(false)
      expect(validator.isEmail('pas-un-email')).toBe(false)
      expect(validator.isEmail('@domain.com')).toBe(false)
      expect(validator.isEmail('user@')).toBe(false)
    })

    it('detects disposable email domains', () => {
      const domains = disposableDomains as string[]
      expect(domains.includes('mailinator.com')).toBe(true)
      expect(domains.includes('tempmail.com')).toBe(true)
      expect(domains.includes('yopmail.com')).toBe(true)
      expect(domains.includes('gmail.com')).toBe(false)
    })

    it('rejects disposable email addresses', () => {
      const domains = disposableDomains as string[]
      const email = 'test@mailinator.com'
      const domain = email.split('@')[1]?.toLowerCase()
      expect(domain && domains.includes(domain)).toBe(true)
    })
  })
})
