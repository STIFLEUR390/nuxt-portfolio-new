<script setup lang="ts">
import type { PageData } from '~/data/types'

defineProps<{
  page: PageData
}>()
</script>

<template>
  <UPageSection
    :title="page.experience?.title ?? ''"
    :ui="{
      container: 'p-0! gap-4 sm:gap-4',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'mt-2'
    }"
  >
    <template #description>
      <div class="flex flex-col gap-4">
        <Motion
          v-for="(experience, index) in page.experience?.items ?? []"
          :key="index"
          :initial="{ opacity: 0, transform: 'translateY(20px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.4 + 0.2 * index }"
          :in-view-options="{ once: true }"
          class="text-muted"
        >
          <div class="flex items-center text-nowrap gap-2 mb-3">
            <p class="text-sm">
              {{ experience.date }}
            </p>
            <USeparator />
            <ULink
              class="flex items-center gap-1"
              :to="experience.company.url"
              target="_blank"
            >
              <span class="text-sm">
                {{ experience.position }}
              </span>
              <div
                class="inline-flex items-center gap-1"
                :style="{ color: experience.company.color }"
              >
                <span class="font-medium">{{ experience.company.name }}</span>
                <UIcon :name="experience.company.logo" />
              </div>
            </ULink>
          </div>
          <ul
            v-if="experience.highlights"
            class="list-disc list-inside space-y-1 text-sm text-muted"
          >
            <li
              v-for="(highlight, hIndex) in experience.highlights"
              :key="hIndex"
            >
              {{ highlight }}
            </li>
          </ul>
        </Motion>
      </div>
    </template>
  </UPageSection>
</template>
