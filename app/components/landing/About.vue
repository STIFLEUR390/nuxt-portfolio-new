<script setup lang="ts">
import type { PageData } from '~/data/types'

defineProps<{
  page: PageData
}>()
</script>

<template>
  <UPageSection
    :title="page.about?.title ?? ''"
    :description="page.about?.description ?? ''"
    :ui="{
      container: 'p-0!'
    }"
  >
    <Motion
      :initial="{ opacity: 0, transform: 'translateY(10px)' }"
      :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
      :in-view-options="{ once: true }"
      :transition="{ delay: 0.1 }"
    >
      <div class="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
        <div class="rounded-xl bg-primary/5 border border-primary/10 p-4 text-center">
          <p class="text-2xl font-semibold text-primary">
            4+
          </p>
          <p class="text-xs text-muted mt-1">
            Ans d'expérience
          </p>
        </div>
        <div class="rounded-xl bg-primary/5 border border-primary/10 p-4 text-center">
          <p class="text-2xl font-semibold text-primary">
            30+
          </p>
          <p class="text-xs text-muted mt-1">
            Repos GitHub
          </p>
        </div>
        <div class="rounded-xl bg-primary/5 border border-primary/10 p-4 text-center">
          <p class="text-2xl font-semibold text-primary">
            3
          </p>
          <p class="text-xs text-muted mt-1">
            Continents clients
          </p>
        </div>
      </div>
    </Motion>

    <Motion
      v-if="page.about?.content"
      :initial="{ opacity: 0, transform: 'translateY(10px)' }"
      :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
      :in-view-options="{ once: true }"
      :transition="{ delay: 0.2 }"
    >
      <p class="text-base text-highlighted leading-relaxed whitespace-pre-line max-w-[75ch]">
        {{ page.about.content }}
      </p>
    </Motion>
  </UPageSection>
</template>
