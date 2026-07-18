<script setup lang="ts">
import { blogPageMeta, getPaginatedPosts } from '~/data/blog'

const page = blogPageMeta
const route = useRoute()
const router = useRouter()

const currentPage = computed(() => {
  const p = Number(route.query.page) || 1
  return Math.max(1, p)
})

const perPage = 6

const paginated = computed(() => {
  return getPaginatedPosts(currentPage.value, perPage)
})

const title = page.seo?.title || page.title
const description = page.seo?.description || page.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImage('Portfolio', { title, description })

function goToPage(p: number) {
  router.push({ query: { page: p > 1 ? p : undefined } })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
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
    />
    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <UBlogPosts orientation="vertical">
        <Motion
          v-for="(post, index) in paginated.items"
          :key="post.path"
          :initial="{ opacity: 0, transform: 'translateY(10px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.2 * index }"
          :in-view-options="{ once: true }"
        >
          <UBlogPost
            variant="naked"
            orientation="horizontal"
            :to="post.path"
            v-bind="post"
            :ui="{
              root: 'md:grid md:grid-cols-2 group overflow-visible transition-all duration-300',
              image:
                'group-hover/blog-post:scale-[1.02] rounded-lg shadow-sm border border-default transition-transform duration-300',
              header: ''
            }"
          >
            <template #footer>
              <div class="flex items-center gap-2 text-xs text-muted">
                <span>{{ new Date(post.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' }) }}</span>
                <span class="text-muted">·</span>
                <span>{{ post.minRead }} min</span>
              </div>
            </template>
          </UBlogPost>
        </Motion>
      </UBlogPosts>

      <div
        v-if="paginated.totalPages > 1"
        class="flex items-center justify-center gap-2 mt-10"
      >
        <UButton
          variant="ghost"
          color="neutral"
          icon="i-lucide-chevron-left"
          :disabled="currentPage <= 1"
          @click="goToPage(currentPage - 1)"
        />
        <span class="text-sm text-muted px-2">
          Page {{ currentPage }} / {{ paginated.totalPages }}
        </span>
        <UButton
          variant="ghost"
          color="neutral"
          icon="i-lucide-chevron-right"
          :disabled="currentPage >= paginated.totalPages"
          @click="goToPage(currentPage + 1)"
        />
      </div>
    </UPageSection>
  </UPage>
</template>
