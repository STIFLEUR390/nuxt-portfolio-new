<script setup lang="ts">
import { projectsPage, projects } from '~/data/projects'

const page = projectsPage
const { global } = useAppConfig()

const title = page.seo?.title || page.title
const description = page.seo?.description || page.description

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
      :ui="{
        title: 'mx-0! text-left text-balance',
        description: 'mx-0! text-left text-pretty',
        links: 'justify-start'
      }"
    >
      <template #links>
        <div
          v-if="page.links"
          class="flex items-center gap-2"
        >
          <UButton
            :label="page.links[0]?.label"
            :to="global.meetingLink"
            :color="page.links[0]?.color"
          />
          <UButton
            :to="`mailto:${global.email}`"
            :label="page.links[1]?.label"
            variant="outline"
          />
        </div>
      </template>
    </UPageHero>
    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <Motion
        v-for="(project, index) in projects"
        :key="project.title"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.2 * index }"
        :in-view-options="{ once: true }"
      >
        <UPageCard
          :title="project.title"
          :description="project.description"
          :to="project.url"
          orientation="horizontal"
          variant="naked"
          :reverse="index % 2 === 1"
          class="group"
          :ui="{
            wrapper: 'max-sm:order-last'
          }"
        >
          <template #leading>
            <span class="text-sm text-muted">
              {{ project.date }}
            </span>
          </template>
          <template #body>
            <div class="flex flex-wrap gap-1.5 mt-2">
              <UBadge
                v-for="tag in project.tags"
                :key="tag"
                variant="subtle"
                color="neutral"
                class="gap-1 px-2 py-0.5 text-xs"
              >
                {{ tag }}
              </UBadge>
            </div>
          </template>
          <template #footer>
            <div class="flex items-center gap-3">
              <ULink
                :to="project.url"
                class="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                Voir le code
                <UIcon
                  name="i-lucide-arrow-right"
                  class="size-4 text-primary transition-all group-hover:translate-x-0.5"
                />
              </ULink>
              <span
                v-if="project.demo"
                class="text-xs text-muted"
              >
                ·
              </span>
              <ULink
                v-if="project.demo"
                :to="project.demo"
                class="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all"
                target="_blank"
              >
                Démo en direct
                <UIcon
                  name="i-lucide-external-link"
                  class="size-3.5"
                />
              </ULink>
            </div>
          </template>
          <ProjectImage :project />
        </UPageCard>
      </Motion>
    </UPageSection>
  </UPage>
</template>
