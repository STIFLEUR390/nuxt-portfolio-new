<script setup lang="ts">
import type { ProjectItem } from '~/data/types'

defineProps<{
  project: ProjectItem
}>()
</script>

<template>
  <div class="relative w-full aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 via-primary/5 to-elevated">
    <div class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
      <p class="text-sm font-semibold text-highlighted line-clamp-2 max-w-[80%]">
        {{ project.title }}
      </p>
      <div class="flex flex-wrap justify-center gap-1.5 mt-3">
        <span
          v-for="tag in project.tags.slice(0, 4)"
          :key="tag"
          class="inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary/10 text-primary"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>
