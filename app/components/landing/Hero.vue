<script setup lang="ts">
import type { PageData } from '~/data/types'

const { global } = useAppConfig()

defineProps<{
  page: PageData
}>()

const animate = {
  initial: {
    scale: 1.05,
    opacity: 0,
    filter: 'blur(8px)'
  },
  animate: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0px)'
  },
  transition: {
    duration: 0.5,
    ease: 'easeOut'
  }
}
</script>

<template>
  <UPageHero
    :ui="{
      headline: 'flex items-center justify-center',
      title: 'text-shadow-md max-w-lg mx-auto text-balance',
      links: 'mt-4 flex-col justify-center items-center'
    }"
  >
    <template #headline>
      <Motion
        v-bind="animate"
        :transition="{ duration: 0.5, delay: 0.1, ease: 'easeOut' }"
      >
        <UColorModeAvatar
          class="size-18 ring ring-default ring-offset-3 ring-offset-bg"
          :light="global.picture?.light!"
          :dark="global.picture?.dark!"
          :alt="global.picture?.alt!"
        />
      </Motion>
    </template>

    <template #title>
      <Motion
        v-bind="animate"
        :transition="{ duration: 0.5, delay: 0.15, ease: 'easeOut' }"
      >
        {{ page.title }}
      </Motion>
    </template>

    <template #description>
      <Motion
        v-bind="animate"
        :transition="{ duration: 0.5, delay: 0.3, ease: 'easeOut' }"
      >
        {{ page.description }}
      </Motion>
    </template>

    <template #links>
      <Motion
        v-bind="animate"
        :transition="{ duration: 0.5, delay: 0.45, ease: 'easeOut' }"
      >
        <div
          v-if="page.hero?.links"
          class="flex flex-col sm:flex-row items-center gap-2 sm:gap-3"
        >
          <UButton
            :label="page.hero.links[0]?.label"
            :to="page.hero.links[0]?.to"
            :color="page.hero.links[0]?.color"
            size="lg"
          />
          <UButton
            :label="page.hero.links[1]?.label"
            :to="page.hero.links[1]?.to"
            variant="outline"
            size="lg"
          />
        </div>
        <div
          v-if="page.hero?.links?.[2]"
          class="flex items-center justify-center gap-3 mt-3"
        >
          <UButton
            :label="page.hero.links[2]?.label"
            :to="global.cvUrl"
            variant="ghost"
            size="sm"
            color="neutral"
            icon="i-lucide-download"
          />
        </div>
      </Motion>

      <div class="flex items-center justify-center gap-2 mt-4 text-sm text-muted">
        <span class="flex items-center gap-1.5">
          <span class="relative flex size-2">
            <span class="absolute inline-flex size-full rounded-full bg-success animate-ping" />
            <span class="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          Disponible
        </span>
        <span class="text-muted">·</span>
        <span>4+ ans d'expérience</span>
        <span class="text-muted">·</span>
        <span>Freelance</span>
      </div>
    </template>
  </UPageHero>
</template>
