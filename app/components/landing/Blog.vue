<script setup lang="ts">
import type { PageData } from '~/data/types'
import { getSortedPosts } from '~/data/blog'

defineProps<{
  page: PageData
}>()

const posts = computed(() => getSortedPosts().slice(0, 3))
</script>

<template>
  <UPageSection
    :title="page.blog?.title ?? ''"
    :description="page.blog?.description ?? ''"
    :ui="{
      container: 'px-0 pt-0! sm:gap-6 lg:gap-8',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <UBlogPosts
      orientation="horizontal"
      class="gap-4 lg:gap-y-4"
    >
      <Motion
        v-for="(post, index) in posts"
        :key="index"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.1 * index }"
        :in-view-options="{ once: true }"
      >
        <UBlogPost
          orientation="horizontal"
          variant="naked"
          v-bind="post"
          :to="post.path"
          :ui="{
            root: 'group relative lg:items-start lg:flex ring-0 hover:ring-0',
            body: 'px-0!',
            header: 'hidden'
          }"
        >
          <template #footer>
            <UButton
              size="xs"
              variant="link"
              class="px-0 gap-0"
              label="Lire l'article"
            >
              <template #trailing>
                <UIcon
                  name="i-lucide-arrow-right"
                  class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </template>
            </UButton>
          </template>
        </UBlogPost>
      </Motion>
    </UBlogPosts>
  </UPageSection>
</template>
