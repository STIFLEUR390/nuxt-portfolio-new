<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

useHead({
  meta: [
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ]
})

useSeoMeta({
  titleTemplate: '%s - Franck Hérold TAMTO TAMKO · Full-Stack Developer',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div>
    <a
      href="#main-content"
      class="skip-link"
    >
      Aller au contenu
    </a>

    <UMain
      id="main-content"
      class="relative"
    >
      <div>
        <UContainer class="sm:border-x border-default pt-10">
          <AppHeader :links="navLinks" />
          <slot />
          <AppFooter />
        </UContainer>
      </div>
    </UMain>
  </div>
</template>
