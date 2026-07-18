<script setup lang="ts">
defineProps<{
  image: {
    src: string
    alt: string
  }
  index: number
}>()
</script>

<template>
  <div
    class="bg-elevated dark:bg-elevated p-2 flex flex-col shadow-sm transition-transform duration-300 ease-out"
    :class="[
      index % 2 === 0 ? '-rotate-3' : 'rotate-3',
      index % 2 === 0 ? 'hover:-translate-y-2' : 'hover:translate-y-2'
    ]"
  >
    <NuxtImg
      :src="image.src"
      :alt="image.alt"
      width="128"
      height="128"
      loading="lazy"
      class="size-32 object-cover"
    />
    <span class="w-32 text-xs text-highlighted font-medium text-center mt-2">
      {{ image.alt }}
    </span>
  </div>
</template>
