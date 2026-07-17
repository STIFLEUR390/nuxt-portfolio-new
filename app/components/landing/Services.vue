<script setup lang="ts">
import type { PageData } from '~/data/types'

defineProps<{
  page: PageData
}>()
</script>

<template>
  <UPageSection
    id="services"
    :title="'Services'"
    :description="'Ce que je peux construire pour vous. Chaque service est pensé pour apporter une valeur concrète à votre projet ou votre entreprise.'"
    :ui="{
      container: 'px-0 pt-0!',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Motion
        v-for="(service, index) in page.services"
        :key="service.title"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.1 * index }"
        :in-view-options="{ once: true }"
        class="group"
      >
        <UCard
          variant="subtle"
          class="h-full"
          :ui="{
            body: 'flex flex-col gap-3 p-5'
          }"
        >
          <UIcon
            :name="service.icon"
            class="size-6 text-primary"
          />
          <h3 class="font-semibold text-base text-highlighted">
            {{ service.title }}
          </h3>
          <p class="text-sm text-muted leading-relaxed">
            {{ service.description }}
          </p>
        </UCard>
      </Motion>
    </div>
  </UPageSection>
</template>
