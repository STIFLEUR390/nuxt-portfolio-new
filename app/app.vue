<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')
const { locale } = useI18n()
const head = useLocaleHead()

const toaster = { position: 'bottom-right', duration: 5000, expand: true } as const

useHead(() => ({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
    { key: 'theme-color', name: 'theme-color', content: color.value },
    ...(head.value.meta || [])
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    ...(head.value.link || [])
  ],
  htmlAttrs: {
    lang: head.value.htmlAttrs.lang
  }
}))

useSeoMeta({
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp
    :locale="locales[locale]"
    :toaster="toaster"
  >
    <NuxtLayout>
      <MotionConfig
        :reduced-motion="'user'"
      >
        <NuxtPage />
      </MotionConfig>
    </NuxtLayout>

    <ClientOnly />
  </UApp>
</template>
