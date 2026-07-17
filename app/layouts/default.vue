<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = computed<NavigationMenuItem[]>(() => [{
  label: 'Accueil',
  to: '/'
}, {
  label: 'Projets',
  to: '/projets'
}, {
  label: 'À propos',
  to: '/a-propos'
}, {
  label: 'Blog',
  to: '/blog'
}, {
  label: 'Contact',
  to: '/contact'
}])

const links = [{
  label: 'GitHub',
  to: 'https://github.com',
  icon: 'i-simple-icons-github',
  target: '_blank'
}, {
  label: 'LinkedIn',
  to: 'https://linkedin.com',
  icon: 'i-simple-icons-linkedin',
  target: '_blank'
}, {
  label: 'Twitter',
  to: 'https://twitter.com',
  icon: 'i-simple-icons-x',
  target: '_blank'
}]
</script>

<template>
  <UHeader>
    <template #title>
      <span class="font-bold">Portfolio</span>
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>

  <UMain>
    <slot />
  </UMain>

  <UFooter>
    <template #left>
      <p class="text-muted text-sm">
        &copy; {{ new Date().getFullYear() }} Tous droits réservés.
      </p>
    </template>
    <template #right>
      <UButton
        v-for="link in links"
        :key="link.label"
        :icon="link.icon"
        :to="link.to"
        :target="link.target"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
