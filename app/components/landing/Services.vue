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
      container: 'px-0 pt-0!'
    }"
  >
    <div
      v-if="page.services"
      class="flex flex-col lg:grid lg:grid-cols-3 gap-4"
    >
      <Motion
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0 }"
        :in-view-options="{ once: true }"
        class="lg:col-span-2"
      >
        <div class="h-full rounded-xl bg-primary/5 border border-primary/10 p-6 flex flex-col gap-2 justify-center transition-transform duration-300 ease-out hover:-translate-y-0.5">
          <h3 class="font-semibold text-lg text-highlighted">
            {{ page.services[0]?.title }}
          </h3>
          <p class="text-sm text-muted leading-relaxed max-w-lg">
            {{ page.services[0]?.description }}
          </p>
        </div>
      </Motion>

      <Motion
        v-for="(service, index) in page.services.slice(1, 3)"
        :key="service.title"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.1 * (index + 1) }"
        :in-view-options="{ once: true }"
        class="group"
      >
        <UCard
          variant="subtle"
          class="h-full transition-transform duration-300 ease-out hover:-translate-y-0.5"
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

      <Motion
        v-for="(service, index) in page.services.slice(3, 5)"
        :key="service.title"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.1 * (index + 3) }"
        :in-view-options="{ once: true }"
        class="group"
      >
        <UCard
          variant="subtle"
          class="h-full transition-transform duration-300 ease-out hover:-translate-y-0.5"
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

      <Motion
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.5 }"
        :in-view-options="{ once: true }"
        class="group lg:col-span-3"
      >
        <UCard
          variant="subtle"
          class="h-full border border-dashed border-primary/20 bg-primary/[0.02] transition-transform duration-300 ease-out hover:-translate-y-0.5"
          :ui="{
            body: 'flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5'
          }"
        >
          <div class="flex-1">
            <h3 class="font-semibold text-base text-highlighted">
              {{ page.services[5]?.title }}
            </h3>
            <p class="text-sm text-muted leading-relaxed">
              {{ page.services[5]?.description }}
            </p>
          </div>
          <UIcon
            :name="page.services[5]?.icon"
            class="size-6 text-primary shrink-0"
          />
        </UCard>
      </Motion>
    </div>
  </UPageSection>
</template>
