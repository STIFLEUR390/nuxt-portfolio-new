<script setup lang="ts">
import type { BlogPost } from '~/data/types'
import { blogPageMeta as staticBlogMeta, getPaginatedPosts as staticPaginated } from '~/data/blog'

const route = useRoute()
const router = useRouter()

const currentPage = computed(() => {
  const p = Number(route.query.page) || 1
  return Math.max(1, p)
})

const perPage = 6

const { data: blogData, status } = useBlog(currentPage.value)

const page = computed(() => blogData.value?.page || staticBlogMeta)
const paginated = computed(() => {
  if (blogData.value?.posts?.length) {
    const posts = blogData.value.posts
    const pagination = blogData.value.pagination
    return {
      items: posts.map(p => ({
        title: p.title || '',
        description: p.description || '',
        date: p.date || '',
        image: p.image || undefined,
        minRead: p.min_read || undefined,
        author: { name: 'Franck Hérold TAMTO TAMKO' },
        body: '',
        path: `/blog/${p.slug || ''}`
      } as BlogPost)),
      totalPages: pagination.totalPages,
      currentPage: pagination.currentPage
    }
  }
  return staticPaginated(currentPage.value, perPage)
})

const title = computed(() => (page.value as any)?.seo?.title || (page.value as any)?.title || '')
const description = computed(() => (page.value as any)?.seo?.description || (page.value as any)?.description || '')

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImage('Portfolio', { title, description })

const isPending = computed(() => status.value === 'pending')

function goToPage(p: number) {
  router.push({ query: { page: p > 1 ? p : undefined } })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <UPage v-if="page">
    <!-- Skeleton loader -->
    <template v-if="isPending">
      <div class="flex flex-col gap-4 py-18 sm:py-24">
        <USkeleton class="h-8 w-[250px]" />
        <USkeleton class="h-5 w-[450px] max-w-full" />
      </div>

      <UPageSection :ui="{ container: 'pt-0!' }">
        <div class="space-y-6">
          <div v-for="i in 6" :key="i" class="flex flex-col md:flex-row gap-4 md:gap-6">
            <USkeleton class="h-44 w-full md:w-72 rounded-lg" />
            <div class="flex-1 space-y-3">
              <USkeleton class="h-5 w-[150px]" />
              <USkeleton class="h-6 w-[90%]" />
              <USkeleton class="h-4 w-full" />
              <USkeleton class="h-4 w-[70%]" />
              <USkeleton class="h-4 w-[100px]" />
            </div>
          </div>
        </div>
      </UPageSection>
    </template>

    <!-- Actual content -->
    <template v-else>
      <UPageHero
        :title="(page.title as string) || ''"
        :description="(page.description as string) || ''"
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
      </template>
  </UPage>
</template>
