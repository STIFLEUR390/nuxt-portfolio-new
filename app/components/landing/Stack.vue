<script setup lang="ts">
import type { PageData } from '~/data/types'

defineProps<{
  page: PageData
}>()
</script>

<template>
  <UPageSection
    :title="'Stack & expertise'"
    :description="'Une stack technique cohérente et moderne, hiérarchisée par niveau de maîtrise.'"
    :ui="{
      container: 'px-0 pt-0!',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <div class="flex flex-col gap-8">
      <div
        v-for="(category, catIndex) in page.stack"
        :key="category.label"
      >
        <div class="mb-3">
          <h3 class="text-base font-semibold text-highlighted">
            {{ category.label }}
          </h3>
          <p
            v-if="category.description"
            class="text-xs text-muted mt-0.5"
          >
            {{ category.description }}
          </p>
        </div>
        <Motion
          :initial="{ opacity: 0 }"
          :while-in-view="{ opacity: 1 }"
          :transition="{ delay: 0.1 * catIndex }"
          :in-view-options="{ once: true }"
          class="flex flex-wrap gap-2"
        >
          <UBadge
            v-for="item in category.items"
            :key="item.name"
            variant="subtle"
            color="neutral"
            class="gap-1.5 px-3 py-1.5 text-sm"
          >
            <UIcon
              v-if="item.icon"
              :name="item.icon"
              class="size-4"
            />
            {{ item.name }}
          </UBadge>
        </Motion>
      </div>
    </div>
  </UPageSection>
</template>
