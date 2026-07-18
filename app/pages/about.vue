<script setup lang="ts">
import { aboutPage as staticAboutPage } from '~/data/about'

const { data: aboutData, status, error } = useAboutPage()

const page = computed(() => aboutData.value?.page || staticAboutPage)
const { global } = useAppConfig()

const title = page.value?.seo?.title || page.value?.title || ''
const description = page.value?.seo?.description || page.value?.description || ''

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImage('Portfolio', { title, description })
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      orientation="horizontal"
      :ui="{
        container: 'lg:flex sm:flex-row items-center',
        title: 'mx-0! text-left text-balance',
        description: 'mx-0! text-left text-pretty',
        links: 'justify-start'
      }"
    >
      <NuxtImg
        :src="global.picture?.src || '/profile.png'"
        :alt="global.picture?.alt || 'Franck Hérold TAMTO TAMKO'"
        class="sm:rotate-4 size-36 rounded-lg ring ring-default ring-offset-3 ring-offset-bg object-cover"
        width="144"
        height="144"
      />
    </UPageHero>
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
        <MarkdownRenderer
          :value="page.content"
          unwrap="p"
        />
      </Motion>
      <Motion
        :initial="{ opacity: 0 }"
        :while-in-view="{ opacity: 1 }"
        :transition="{ delay: 0.3 }"
        :in-view-options="{ once: true }"
        class="flex flex-row justify-center items-center py-10 -space-x-6"
      >
        <PolaroidItem
          v-for="(image, index) in page.images"
          :key="index"
          :image="image"
          :index
        />
      </Motion>

      <Motion
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.5 }"
        :in-view-options="{ once: true }"
        class="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
      >
        <UButton
          label="Discutons de votre projet"
          to="/contact"
          color="neutral"
          size="lg"
        />
        <UButton
          label="Voir mes réalisations"
          to="/projects"
          variant="outline"
          size="lg"
        />
      </Motion>
    </UPageSection>
  </UPage>
</template>
