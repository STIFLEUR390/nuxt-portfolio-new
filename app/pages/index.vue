<script setup lang="ts">
import { indexPage } from '~/data/index'

const page = indexPage

useSeoMeta({
  title: page.seo?.title || page.title,
  ogTitle: page.seo?.title || page.title,
  description: page.seo?.description || page.description,
  ogDescription: page.seo?.description || page.description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png'
})
</script>

<template>
  <UPage v-if="page">
    <LandingHero :page />

    <div
      class="flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted py-6 sm:py-8 border-y border-default my-8"
    >
      <span class="flex items-center gap-1.5">
        <UIcon
          name="i-lucide-calendar"
          class="size-4"
        />
        4+ ans d'expérience
      </span>
      <span class="text-muted/30">|</span>
      <span class="flex items-center gap-1.5">
        <UIcon
          name="i-lucide-map-pin"
          class="size-4"
        />
        Douala
      </span>
      <span class="text-muted/30">|</span>
      <span class="flex items-center gap-1.5">
        <UIcon
          name="i-lucide-layers"
          class="size-4"
        />
        Full-Stack
      </span>
      <span class="text-muted/30">|</span>
      <span class="flex items-center gap-1.5">
        <UIcon
          name="i-lucide-code"
          class="size-4"
        />
        Laravel / Vue / Nuxt
      </span>
    </div>

    <LandingServices :page />

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
  </UPage>
</template>
