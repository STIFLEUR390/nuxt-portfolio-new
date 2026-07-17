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
    <UPageSection
      :ui="{
        container: 'pt-0! lg:grid lg:grid-cols-2 lg:gap-8'
      }"
    >
      <LandingAbout :page />
      <LandingWorkExperience :page />
    </UPageSection>
    <LandingBlog :page />
    <LandingTestimonials :page />
    <LandingFAQ :page />
  </UPage>
</template>
