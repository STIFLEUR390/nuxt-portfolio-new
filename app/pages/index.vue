<script setup lang="ts">
import { indexPage } from '~/data/index'

const page = indexPage

useSeoMeta({
  title: page.seo?.title || page.title,
  ogTitle: page.seo?.title || page.title,
  description: page.seo?.description || page.description,
  ogDescription: page.seo?.description || page.description
})

defineOgImage('Portfolio', {
  title: page.title,
  description: page.description,
  headline: 'Portfolio'
})
</script>

<template>
  <UPage v-if="page">
    <LandingHero :page />

    <div
      class="flex items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm text-muted py-4 sm:py-5 border-b border-default/60 mb-8 sm:mb-10"
    >
      <span class="flex items-center gap-1.5">
        <UIcon
          name="i-lucide-map-pin"
          class="size-3.5 sm:size-4"
        />
        Douala, Cameroun
      </span>
      <span class="text-muted/20">·</span>
      <span class="flex items-center gap-1.5">
        <UIcon
          name="i-lucide-layers"
          class="size-3.5 sm:size-4"
        />
        Full-Stack
      </span>
      <span class="text-muted/20">·</span>
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
              <p class="text-xs font-medium text-primary uppercase tracking-wider">
                Tarifs
              </p>
              <h3 class="text-lg sm:text-xl font-semibold text-highlighted mt-1">
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
          <p class="text-xs font-medium text-primary uppercase tracking-wider">
            Collaboration
          </p>
          <h2 class="text-2xl sm:text-3xl font-semibold text-highlighted mt-2 max-w-lg mx-auto text-balance">
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
