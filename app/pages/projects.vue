<script setup lang="ts">
import { projectsPage as staticProjectsPage, projects as staticProjects } from '~/data/projects'

const { data: projectsData, status } = useProjects()

const page = computed(() => projectsData.value?.page || staticProjectsPage)
const projects = computed(() => projectsData.value?.projects || staticProjects)
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
      <div class="flex flex-col gap-4 py-18 sm:py-24">
        <USkeleton class="h-8 w-[350px]" />
        <USkeleton class="h-5 w-[500px] max-w-full" />
        <div class="flex gap-2 mt-2">
          <USkeleton class="h-10 w-[180px] rounded-lg" />
          <USkeleton class="h-10 w-[100px] rounded-lg" />
        </div>
      </div>

      <UPageSection :ui="{ container: 'pt-0!' }">
        <div class="space-y-10">
          <div v-for="i in 4" :key="i" class="flex flex-col md:flex-row gap-6">
            <USkeleton class="h-48 w-full md:w-72 rounded-lg" />
            <div class="flex-1 space-y-3">
              <USkeleton class="h-6 w-[250px]" />
              <USkeleton class="h-4 w-full" />
              <USkeleton class="h-4 w-[80%]" />
              <USkeleton class="h-4 w-[60%]" />
              <div class="flex gap-1.5 mt-2">
                <USkeleton v-for="j in 4" :key="j" class="h-6 w-[80px] rounded-full" />
              </div>
              <USkeleton class="h-4 w-[120px] mt-2" />
            </div>
          </div>
        </div>
      </UPageSection>
    </template>

    <!-- Actual content -->
    <template v-else>
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
      </template>
  </UPage>
</template>
