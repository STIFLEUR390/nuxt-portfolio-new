<script setup lang="ts">
import type { ProjectItem } from '~/data/types'

defineProps<{
  project: ProjectItem
}>()
</script>

<template>
  <div class="relative w-full aspect-video rounded-lg overflow-hidden">
    <img
      :src="project.image"
      :alt="project.title"
      loading="lazy"
      class="absolute inset-0 size-full object-cover"
    >
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
    <div class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
      <p class="text-sm font-semibold text-white line-clamp-2 max-w-[80%] drop-shadow-sm">
        {{ project.title }}
      </p>
      <div class="flex flex-wrap justify-center gap-1.5 mt-3">
        <span
          v-for="tag in project.tags.slice(0, 4)"
          :key="tag"
          class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-white/15 text-white/90 backdrop-blur-sm"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>
