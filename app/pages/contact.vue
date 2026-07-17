<script setup lang="ts">
const { global } = useAppConfig()

useSeoMeta({
  title: 'Contact - Franck Hérold TAMTO TAMKO',
  description: 'Contactez-moi pour discuter de votre projet web, SaaS ou application métier.'
})

defineOgImage('Portfolio', { title: 'Contact', description: 'Contactez-moi' })

const state = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitted = ref(false)
const errorMsg = ref('')

function validate(state: { name: string, email: string, subject: string, message: string }): { name: string, message: string }[] {
  const errors: { name: string, message: string }[] = []
  if (!state.name) errors.push({ name: 'name', message: 'Le nom est requis' })
  if (!state.email) errors.push({ name: 'email', message: 'L\'email est requis' })
  if (!state.subject) errors.push({ name: 'subject', message: 'Le sujet est requis' })
  if (!state.message) errors.push({ name: 'message', message: 'Le message est requis' })
  return errors
}

async function onSubmit() {
  submitted.value = false
  errorMsg.value = ''

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: state.value
    })

    submitted.value = true
    state.value = { name: '', email: '', subject: '', message: '' }
  } catch {
    errorMsg.value = 'Échec de l\'envoi. Veuillez réessayer ou m\'écrire directement par email.'
  }
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
            to="https://linkedin.com/in/heroldtamko"
            label="LinkedIn"
            variant="ghost"
            color="neutral"
          />
          <UButton
            to="https://github.com/STIFLEUR390"
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
      <div class="max-w-xl mx-auto">
        <p class="text-sm text-muted mb-6">
          Ou utilisez le formulaire ci-dessous. Je vous répondrai dans les plus brefs délais.
        </p>

        <UAlert
          v-if="submitted"
          color="success"
          variant="soft"
          title="Message envoyé !"
          description="Merci pour votre message. Je vous répondrai rapidement."
          class="mb-6"
        />

        <UAlert
          v-if="errorMsg"
          color="error"
          variant="soft"
          :title="'Erreur'"
          :description="errorMsg"
          class="mb-6"
        />

        <UForm
          v-if="!submitted"
          :state="state"
          :validate="validate"
          class="space-y-4"
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

        <UButton
          v-else
          label="Envoyer un autre message"
          color="neutral"
          variant="ghost"
          block
          @click="submitted = false"
        />
      </div>
    </UPageSection>
  </UPage>
</template>
