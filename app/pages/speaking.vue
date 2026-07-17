<script setup lang="ts">
const { global } = useAppConfig()

useSeoMeta({
  title: 'Contact - Hérold H.',
  description: 'Contactez-moi pour discuter de votre projet web, SaaS ou application métier.'
})

defineOgImage('Portfolio', { title: 'Contact', description: 'Contactez-moi' })

const state = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

function validate(state: { name: string, email: string, subject: string, message: string }): { name: string, message: string }[] {
  const errors: { name: string, message: string }[] = []
  if (!state.name) errors.push({ name: 'name', message: 'Le nom est requis' })
  if (!state.email) errors.push({ name: 'email', message: 'L\'email est requis' })
  if (!state.subject) errors.push({ name: 'subject', message: 'Le sujet est requis' })
  if (!state.message) errors.push({ name: 'message', message: 'Le message est requis' })
  return errors
}

function onSubmit() {
  const mailtoLink = `mailto:${global.email}?subject=${encodeURIComponent(state.value.subject)}&body=${encodeURIComponent(`De : ${state.value.name} (${state.value.email})\n\n${state.value.message}`)}`
  window.location.href = mailtoLink
}
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

    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <UForm
        :state="state"
        :validate="validate"
        class="max-w-xl mx-auto space-y-4"
        @submit="onSubmit"
      >
        <UInput
          v-model="state.name"
          name="name"
          placeholder="Votre nom"
        />
        <UInput
          v-model="state.email"
          name="email"
          type="email"
          placeholder="Votre email"
        />
        <UInput
          v-model="state.subject"
          name="subject"
          placeholder="Sujet"
        />
        <UTextarea
          v-model="state.message"
          name="message"
          :rows="5"
          placeholder="Votre message"
        />
        <UButton
          type="submit"
          label="Envoyer le message"
          color="neutral"
          block
        />
      </UForm>
    </UPageSection>
  </UPage>
</template>
