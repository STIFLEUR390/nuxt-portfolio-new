<script setup lang="ts">
import { indexPage } from '~/data/index'

const { data: landing, status } = useLandingData()

// Use static data as fallback until Directus data is ready
const page = computed(() => landing.value?.page || indexPage)
const latestPosts = computed(() => landing.value?.latestPosts || [])

const isPending = computed(() => status === 'pending')

useSeoMeta({
  title: page.value.seo?.title || page.value.title || '',
  ogTitle: page.value.seo?.title || page.value.title || '',
  description: page.value.seo?.description || page.value.description || '',
  ogDescription: page.value.seo?.description || page.value.description || ''
})

defineOgImage('Portfolio', {
  title: page.value.title || 'Portfolio',
  description: page.value.description || '',
  headline: 'Portfolio'
})
</script>

<template>
  <UPage v-if="page">
    <!-- Skeleton loader -->
    <template v-if="isPending">
      <div class="flex flex-col items-center text-center py-18 sm:py-24 lg:py-32 gap-4">
        <USkeleton class="h-10 w-[500px] max-w-full" />
        <USkeleton class="h-5 w-[400px] max-w-full" />
        <div class="flex gap-3 mt-4">
          <USkeleton class="h-10 w-[150px] rounded-lg" />
          <USkeleton class="h-10 w-[160px] rounded-lg" />
          <USkeleton class="h-10 w-[190px] rounded-lg" />
        </div>
        <USkeleton class="h-4 w-[250px] mt-4" />
      </div>

      <div class="flex items-center justify-center gap-3 sm:gap-5 py-4 sm:py-5 border-b border-default/60 mb-8 sm:mb-10 flex-wrap">
        <USkeleton class="h-4 w-[150px]" />
        <USkeleton class="h-4 w-[100px]" />
        <USkeleton class="h-4 w-[100px]" />
      </div>

      <UPageSection :ui="{ container: 'pt-0!' }">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 6" :key="i" class="space-y-3 rounded-lg border border-default p-5">
            <USkeleton class="size-10 rounded-lg" />
            <USkeleton class="h-5 w-[80%]" />
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-4 w-[60%]" />
          </div>
        </div>
      </UPageSection>

      <UPageSection :ui="{ container: 'pt-0!' }">
        <div class="rounded-xl border border-primary/10 bg-primary/5 p-6 sm:p-8">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="space-y-2">
              <USkeleton class="h-6 w-[300px]" />
              <USkeleton class="h-4 w-[400px]" />
            </div>
            <USkeleton class="h-10 w-[200px] rounded-lg" />
          </div>
        </div>
      </UPageSection>

      <UPageSection :ui="{ container: 'pt-0! lg:grid lg:grid-cols-2 lg:gap-8' }">
        <div v-for="i in 2" :key="i" class="space-y-3">
          <USkeleton class="h-6 w-[200px]" />
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-[80%]" />
          <div class="space-y-2 mt-4">
            <div v-for="j in 4" :key="j" class="flex gap-3 items-start">
              <USkeleton class="size-5 rounded-full shrink-0" />
              <USkeleton class="h-4 w-[90%]" />
            </div>
          </div>
        </div>
      </UPageSection>
    </template>

    <!-- Actual content -->
    <template v-else>
      <LandingHero :page />

    <div
      class="flex items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm text-muted py-4 sm:py-5 border-b border-default/60 mb-8 sm:mb-10 flex-wrap"
    >
      <span class="flex items-center gap-1.5">
        <UIcon
          name="i-lucide-map-pin"
          class="size-3.5 sm:size-4"
        />
        Douala, Cameroun
      </span>
      <span class="text-muted">·</span>
      <span class="flex items-center gap-1.5">
        <UIcon
          name="i-lucide-layers"
          class="size-3.5 sm:size-4"
        />
        Full-Stack
      </span>
      <span class="text-muted">·</span>
      <span class="flex items-center gap-1.5">
        <UIcon
          name="i-lucide-clock"
          class="size-3.5 sm:size-4"
        />
        Disponible
      </span>
    </div>

    <LandingServices :page />

    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <Motion
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :in-view-options="{ once: true }"
      >
        <div
          class="relative overflow-hidden rounded-xl bg-primary/5 border border-primary/10 p-6 sm:p-8"
        >
          <div class="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 class="text-lg sm:text-xl font-semibold text-highlighted">
                Projets à partir de <span class="text-primary">3 000 €</span>
              </h3>
              <p class="text-sm text-muted mt-1 max-w-md">
                Devis personnalisé après analyse du besoin. Projets SaaS complets de 8 000 à 20 000 €.
              </p>
            </div>
            <UButton
              label="Discutons de votre projet"
              to="mailto:heroldtamko39@gmail.com"
              color="neutral"
              size="md"
            />
          </div>
        </div>
      </Motion>
    </UPageSection>

    <UPageSection
      :ui="{
        container: 'pt-0! lg:grid lg:grid-cols-2 lg:gap-8'
      }"
    >
      <LandingAbout :page />
      <LandingWorkExperience :page />
    </UPageSection>

    <LandingStack :page />

    <LandingBlog :page />
    <LandingTestimonials :page />
    <LandingFAQ :page />

    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <Motion
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :in-view-options="{ once: true }"
      >
        <div class="text-center py-10 sm:py-14">
          <h2 class="text-2xl sm:text-3xl font-semibold text-highlighted max-w-lg mx-auto text-balance">
            Prêt à construire quelque chose de solide ?
          </h2>
          <p class="text-sm text-muted mt-3 max-w-md mx-auto text-pretty">
            Discutons de votre projet sans engagement. Je vous réponds sous 24h.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <UButton
              label="Me contacter"
              to="mailto:heroldtamko39@gmail.com"
              color="neutral"
              size="lg"
            />
            <UButton
              label="Voir mes projets"
              to="/projects"
              variant="outline"
              size="lg"
            />
          </div>
        </div>
      </Motion>
    </UPageSection>
  </UPage>
</template>
