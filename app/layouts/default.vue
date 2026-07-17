<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'fr'
  }
})

useSeoMeta({
  titleTemplate: '%s - Hérold H. · Full-Stack Developer',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UMain class="relative">
    <div>
      <UContainer class="sm:border-x border-default pt-10">
        <AppHeader :links="navLinks" />
        <slot />
        <AppFooter />
      </UContainer>
    </div>
  </UMain>
</template>
