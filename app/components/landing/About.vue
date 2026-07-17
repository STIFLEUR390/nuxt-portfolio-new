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
      v-if="page.about?.content"
      :initial="{ opacity: 0, transform: 'translateY(10px)' }"
      :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
      :in-view-options="{ once: true }"
      :transition="{ delay: 0.2 }"
    >
      <p class="text-base text-highlighted leading-relaxed whitespace-pre-line">
        {{ page.about.content }}
      </p>
    </Motion>
  </UPageSection>
</template>
