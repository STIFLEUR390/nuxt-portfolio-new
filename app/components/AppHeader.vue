<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

defineProps<{
  links: NavigationMenuItem[]
}>()

const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => {
  return locales.value.filter(l => l.code !== locale.value)
})
</script>

<template>
  <div class="fixed top-2 sm:top-4 mx-auto left-1/2 transform -translate-x-1/2 z-10">
    <UNavigationMenu
      :items="links"
      variant="link"
      color="neutral"
      class="bg-muted/80 backdrop-blur-sm rounded-full px-2 sm:px-4 border border-muted/50"
      :ui="{
        link: 'px-2 py-1.5',
        linkLeadingIcon: 'hidden'
      }"
    >
      <template #list-trailing>
        <div class="flex items-center gap-0.5">
          <UButton
            v-for="loc in availableLocales"
            :key="loc.code"
            variant="ghost"
            color="neutral"
            size="sm"
            @click="setLocale(loc.code)"
          >
            {{ loc.code === 'fr' ? 'FR' : 'EN' }}
          </UButton>
          <ColorModeButton />
        </div>
      </template>
    </UNavigationMenu>
  </div>
</template>
