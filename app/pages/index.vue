<script setup lang="ts">
const { locale } = useI18n()

const title = computed(() => locale.value === 'fr' ? 'Développeur Web' : 'Web Developer')
const description = computed(() => locale.value === 'fr'
  ? 'Je crée des applications modernes avec Nuxt, Vue et l\'écosystème JavaScript.'
  : 'I build modern applications with Nuxt, Vue and the JavaScript ecosystem.')
</script>

<template>
  <UPage>
    <UPageHero
      :title="title"
      :description="description"
      orientation="horizontal"
    >
      <UAvatar
        src="https://github.com/nuxt.png"
        alt="Avatar"
        size="3xl"
        class="ring-4 ring-default shadow-2xl"
      />
    </UPageHero>

    <UPageSection
      id="projets"
      headline="Projets"
      title="Ce que j'ai construit"
      description="Une sélection de mes projets récents."
      :features="[
        { title: 'Projet 1', description: 'Description du projet 1', icon: 'i-lucide-folder' },
        { title: 'Projet 2', description: 'Description du projet 2', icon: 'i-lucide-folder' },
        { title: 'Projet 3', description: 'Description du projet 3', icon: 'i-lucide-folder' }
      ]"
    />

    <UPageCTA
      title="Travaillons ensemble"
      description="Vous avez un projet en tête ? N'hésitez pas à me contacter."
      :links="[
        { label: 'Me contacter', color: 'neutral' },
        { label: 'Voir mon CV', color: 'neutral', variant: 'subtle', trailingIcon: 'i-lucide-arrow-right' }
      ]"
    />
  </UPage>
</template>
