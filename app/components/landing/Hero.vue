<script setup lang="ts">
import type { PageData } from '~/data/types'

const { global } = useAppConfig()

defineProps<{
  page: PageData
}>()

function animate() {
  return {
    initial: {
      scale: 1.1,
      opacity: 0,
      filter: 'blur(20px)'
    },
    animate: {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)'
    },
    transition: {
      duration: 0.6
    }
  }
}
</script>

<template>
  <UPageHero
    :ui="{
      headline: 'flex items-center justify-center',
      title: 'text-shadow-md max-w-lg mx-auto',
      links: 'mt-4 flex-col justify-center items-center'
    }"
  >
    <template #headline>
      <Motion
        v-bind="animate()"
        :transition="{ duration: 0.6, delay: 0.1 }"
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
        v-bind="animate()"
        :transition="{ duration: 0.6, delay: 0.1 }"
      >
        {{ page.title }}
      </Motion>
    </template>

    <template #description>
      <Motion
        v-bind="animate()"
        :transition="{ duration: 0.6, delay: 0.3 }"
      >
        {{ page.description }}
      </Motion>
    </template>

    <template #links>
      <Motion
        v-bind="animate()"
        :transition="{ duration: 0.6, delay: 0.5 }"
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
          <UButton
            :label="page.hero.links[2]?.label"
            :to="global.cvUrl"
            variant="ghost"
            size="lg"
            color="neutral"
          />
        </div>
      </Motion>

      <div class="flex items-center gap-2 mt-4 text-sm text-muted">
        <span class="flex items-center gap-1.5">
          <span class="relative flex size-2">
            <span class="absolute inline-flex size-full rounded-full bg-success animate-ping" />
            <span class="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          Disponible pour missions freelance
        </span>
        <span class="text-muted/50">·</span>
        <span>4+ ans d'expérience</span>
        <span class="text-muted/50">·</span>
        <span>Laravel / Vue / Nuxt</span>
      </div>
    </template>
  </UPageHero>
</template>
