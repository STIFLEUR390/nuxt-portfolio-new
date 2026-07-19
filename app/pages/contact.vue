<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

const { global } = useAppConfig()

useSeoMeta({
  title: 'Contact - Franck Hérold TAMTO TAMKO',
  description: 'Contactez-moi pour discuter de votre projet web, SaaS ou application métier.'
})

defineOgImage('Portfolio', { title: 'Contact', description: 'Contactez-moi' })

const state = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  _hp: '' // honeypot — laissé vide par les humains
})

type Schema = typeof state

const submitted = ref(false)
const submitting = ref(false)

function validate(state: Partial<Schema>): FormError[] {
  const errors: FormError[] = []
  if (!state.name) errors.push({ name: 'name', message: 'Le nom est requis' })
  if (!state.email) errors.push({ name: 'email', message: 'L\'email est requis' })
  if (!state.email?.includes('@')) errors.push({ name: 'email', message: 'Email invalide' })
  if (!state.subject) errors.push({ name: 'subject', message: 'Le sujet est requis' })
  if (!state.message) errors.push({ name: 'message', message: 'Le message est requis' })
  if ((state.message?.length ?? 0) < 10) errors.push({ name: 'message', message: 'Minimum 10 caractères' })
  return errors
}

const toast = useAppToast()
const feedback = useFeedbackStore()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true
  feedback.setSubmitting(true)
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: event.data
    })

    submitted.value = true
    state.name = ''
    state.email = ''
    state.subject = ''
    state.message = ''

    feedback.setResult('success')
    toast.success('Message envoyé !', 'Merci, je vous répondrai rapidement.')
  } catch {
    feedback.setResult('error')
    toast.error('Erreur', 'Échec de l\'envoi. Veuillez réessayer ou m\'écrire directement par email.')
  } finally {
    submitting.value = false
    feedback.setSubmitting(false)
  }
}
</script>

<template>
  <UPage>
    <UPageHero
      :title="'Parlons de votre projet'"
      :description="'Disponible pour missions freelance, CDI ou CDD. Une idée, un besoin technique, une collaboration ? Écrivez-moi.'"
      :ui="{
        title: 'mx-0! text-left text-balance',
        description: 'mx-0! text-left text-pretty',
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

        <UForm
          v-if="!submitted"
          :state="state"
          :validate="validate"
          class="space-y-6"
          @submit="onSubmit"
        >
          <input
            v-model="state._hp"
            type="text"
            name="_hp"
            class="absolute -left-[9999px]"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
          >
          <UFormField
            label="Nom"
            name="name"
            required
            description="Votre nom ou celui de votre entreprise"
          >
            <UInput
              v-model="state.name"
              placeholder="Jean Dupont"
              icon="i-lucide-user"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Email"
            name="email"
            required
            description="Pour que je puisse vous répondre"
          >
            <UInput
              v-model="state.email"
              type="email"
              placeholder="vous@exemple.com"
              icon="i-lucide-at-sign"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Sujet"
            name="subject"
            required
            description="De quoi s'agit-il ?"
          >
            <UInput
              v-model="state.subject"
              placeholder="Site web, SaaS, mission freelance..."
              icon="i-lucide-file-text"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Message"
            name="message"
            required
            description="Décrivez votre projet ou votre demande"
          >
            <UTextarea
              v-model="state.message"
              :rows="5"
              placeholder="Bonjour, je souhaiterais discuter d'un projet de..."
              class="w-full"
            />
          </UFormField>

          <UButton
            type="submit"
            label="Envoyer le message"
            color="primary"
            block
            size="lg"
            :loading="submitting"
          />
        </UForm>

        <div
          v-else
          class="text-center space-y-4"
        >
          <UIcon
            name="i-lucide-circle-check"
            class="size-12 text-success mx-auto"
          />
          <p class="text-lg font-medium">
            Message envoyé !
          </p>
          <p class="text-sm text-muted">
            Merci pour votre message. Je vous répondrai dans les plus brefs délais.
          </p>
          <UButton
            label="Envoyer un autre message"
            color="neutral"
            variant="outline"
            @click="submitted = false"
          />
        </div>
      </div>
    </UPageSection>
  </UPage>
</template>
