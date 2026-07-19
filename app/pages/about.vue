<script setup lang="ts">
import { aboutPage as staticAboutPage } from '~/data/about'

const { data: aboutData, status } = useAboutPage()

const page = computed(() => aboutData.value?.page || staticAboutPage)
const { global } = useAppConfig()

const isPending = computed(() => status.value === 'pending')

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
    <!-- Skeleton loader -->
    <template v-if="isPending">
      <div class="flex flex-col lg:flex-row-reverse items-center gap-8 py-18">
        <USkeleton class="size-36 rounded-lg shrink-0" />
        <div class="flex-1 space-y-3">
          <USkeleton class="h-8 w-[300px]" />
          <USkeleton class="h-5 w-[450px] max-w-full" />
        </div>
      </div>

      <UPageSection :ui="{ container: 'pt-0!' }">
        <div class="space-y-3">
          <USkeleton v-for="i in 10" :key="i" class="h-4 w-full" />
          <USkeleton class="h-4 w-[70%]" />
        </div>
        <div class="flex justify-center py-10 gap-4">
          <USkeleton v-for="i in 2" :key="i" class="size-32 rounded-lg -rotate-3" />
        </div>
        <div class="flex justify-center gap-3 mt-8">
          <USkeleton class="h-10 w-[220px] rounded-lg" />
          <USkeleton class="h-10 w-[180px] rounded-lg" />
        </div>
      </UPageSection>
    </template>

    <!-- Actual content -->
    <template v-else>
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
        class="flex flex-row justify-center items-center py-10 gap-4 sm:gap-0 sm:-space-x-6"
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
      </template>
  </UPage>
</template>
