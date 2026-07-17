import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinks: NavigationMenuItem[] = [{
  label: 'Accueil',
  icon: 'i-lucide-home',
  to: '/'
}, {
  label: 'Projets',
  icon: 'i-lucide-folder',
  to: '/projects'
}, {
  label: 'Services',
  icon: 'i-lucide-code',
  to: '/#services'
}, {
  label: 'Blog',
  icon: 'i-lucide-file-text',
  to: '/blog'
}, {
  label: 'À propos',
  icon: 'i-lucide-user',
  to: '/about'
}, {
  label: 'Contact',
  icon: 'i-lucide-mail',
  to: '/speaking'
}]
