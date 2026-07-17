<script setup lang="ts">
const { global } = useAppConfig()

useSeoMeta({
  title: 'Contact - Hérold H.',
  description: 'Contactez-moi pour discuter de votre projet web, SaaS ou application métier.'
})

defineOgImage('Portfolio', { title: 'Contact', description: 'Contactez-moi' })
</script>

<template>
  <UPage>
    <UPageHero
      :title="'Parlons de votre projet'"
      :description="'Disponible pour missions freelance, CDI ou CDD. Une idée, un besoin technique, une collaboration ? Écrivez-moi.'"
      :ui="{
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
        links: 'justify-start'
      }"
    >
      <template #links>
        <div class="flex flex-wrap gap-3">
          <UButton
            :to="`mailto:${global.email}`"
            label="M'écrire par email"
            color="neutral"
          />
          <UButton
            to="https://linkedin.com/in/heroldev"
            label="LinkedIn"
            variant="ghost"
            color="neutral"
          />
          <UButton
            to="https://github.com/heroldev"
            label="GitHub"
            variant="ghost"
            color="neutral"
          />
        </div>
      </template>
    </UPageHero>
  </UPage>
</template>
