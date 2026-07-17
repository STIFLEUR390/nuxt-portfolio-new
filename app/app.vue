<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')
const { locale } = useI18n()

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
  <UApp :locale="locales[locale]">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <ClientOnly />
  </UApp>
</template>
