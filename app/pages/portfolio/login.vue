<script setup lang="ts">
definePageMeta({
  layout: false
})

const { loggedIn, login } = useDirectusAuth()
const toast = useAppToast()
const router = useRouter()

const state = reactive({
  email: '',
  password: ''
})

const loading = ref(false)

if (loggedIn.value) {
  navigateTo('/portfolio', { replace: true })
}

async function onSubmit() {
  loading.value = true
  try {
    await login(state.email, state.password, { redirect: false })
    toast.success('Connecté', 'Bienvenue sur l\'interface d\'administration')
    await router.push('/portfolio')
  } catch (err: any) {
    const message = err?.response?.data?.errors?.[0]?.message
      || err?.data?.errors?.[0]?.message
      || err?.message
      || 'Email ou mot de passe incorrect'
    toast.error('Erreur de connexion', message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 bg-default">
    <div class="w-full max-w-sm space-y-8">
      <div class="text-center space-y-2">
        <h1 class="text-2xl font-bold text-highlighted">
          Portfolio Admin
        </h1>
        <p class="text-sm text-muted">
          Connectez-vous pour gérer le contenu
        </p>
      </div>

      <UForm
        :state="state"
        class="space-y-5"
        @submit="onSubmit"
      >
        <UFormField
          label="Email"
          name="email"
          required
        >
          <UInput
            v-model="state.email"
            type="email"
            placeholder="admin@exemple.com"
            icon="i-lucide-mail"
            autocomplete="email"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="Mot de passe"
          name="password"
          required
        >
          <UInput
            v-model="state.password"
            type="password"
            placeholder="••••••••"
            icon="i-lucide-lock"
            autocomplete="current-password"
            class="w-full"
          />
        </UFormField>

        <UButton
          type="submit"
          label="Se connecter"
          color="primary"
          block
          size="lg"
          :loading="loading"
        />
      </UForm>

      <p class="text-center text-xs text-muted">
        <ULink
          to="/"
          class="hover:text-primary transition-colors"
        >
          &larr; Retour au site
        </ULink>
      </p>
    </div>
  </div>
</template>
