<script setup lang="ts">
import { getPostByPath, getSurroundingPosts } from '~/data/blog'

const route = useRoute()

const postPath = computed(() => {
  return route.path.replace(/^\/(en|fr)(\/|$)/, '/')
})

const page = computed(() => {
  const post = getPostByPath(postPath.value)
  if (!post) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  return post
})

const surround = computed(() => {
  const data = getSurroundingPosts(postPath.value, { fields: ['description'] })
  const result: { title?: string, _path?: string, description?: string }[] = []
  if (data.prev) result.push({ title: data.prev.title, _path: data.prev.path, description: data.prev.description })
  if (data.next) result.push({ title: data.next.title, _path: data.next.path, description: data.next.description })
  return result
})

const title = computed(() => page.value.title)
const description = computed(() => page.value.description)

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogTitle: title
})

if (page.value.image) {
  useSeoMeta({ ogImage: page.value.image })
} else {
  defineOgImage('Portfolio', {
    title,
    description,
    headline: 'Blog'
  })
}

const articleLink = computed(() => typeof window !== 'undefined' ? window.location.href : '')

const { locale } = useI18n()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(locale.value === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="mt-20">
    <UPage v-if="page">
      <Motion
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :in-view-options="{ once: true }"
      >
        <div class="flex flex-col gap-3">
          <ULink
            to="/blog"
            class="text-sm flex items-center gap-1 text-muted hover:text-highlighted transition-colors"
          >
            <UIcon name="i-lucide-chevron-left" />
            Blog
          </ULink>
        </div>
      </Motion>

      <Motion
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.15 }"
        :in-view-options="{ once: true }"
        class="flex flex-col gap-3 mt-8"
      >
        <div class="flex text-xs text-muted items-center justify-center gap-2">
          <span v-if="page.date">
            {{ formatDate(page.date) }}
          </span>
          <span v-if="page.date && page.minRead">
            -
          </span>
          <span v-if="page.minRead">
            {{ page.minRead }} min de lecture
          </span>
        </div>
        <NuxtImg
          v-if="page.image"
          :src="page.image"
          :alt="page.title"
          class="rounded-lg w-full aspect-video object-cover object-center"
          loading="lazy"
        />
        <h1 class="text-4xl text-center font-medium max-w-3xl mx-auto mt-4 text-balance font-serif">
          {{ page.title }}
        </h1>
        <p class="text-muted text-center max-w-2xl mx-auto text-pretty">
          {{ page.description }}
        </p>
        <div class="flex items-center justify-center gap-2 mt-2">
          <UUser
            orientation="vertical"
            color="neutral"
            variant="outline"
            class="justify-center items-center text-center"
            v-bind="page.author"
          />
        </div>
      </Motion>

      <UPageBody class="max-w-3xl mx-auto">
        <MarkdownRenderer
          v-if="page.body"
          :value="page.body"
        />

        <ClientOnly>
          <div class="flex items-center justify-between gap-2 text-sm text-muted mt-8 pt-6 border-t border-default">
            <div class="flex items-center gap-2">
              <UButton
                size="sm"
                variant="ghost"
                color="neutral"
                icon="i-simple-icons-x"
                :to="'https://x.com/intent/post?text=' + encodeURIComponent(page.title) + '&url=' + encodeURIComponent(articleLink)"
                target="_blank"
              />
              <UButton
                size="sm"
                variant="ghost"
                color="neutral"
                icon="i-lucide-linkedin"
                :to="'https://linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(articleLink)"
                target="_blank"
              />
            </div>
            <UButton
              size="sm"
              variant="link"
              color="neutral"
              label="Copier le lien"
              @click="copyToClipboard(articleLink, 'Lien copié dans le presse-papier')"
            />
          </div>
          <template #fallback>
            <div class="h-10" />
          </template>
        </ClientOnly>
        <UContentSurround :surround />
      </UPageBody>
    </UPage>
  </div>
</template>
