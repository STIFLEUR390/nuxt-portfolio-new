export const useFeedbackStore = defineStore('feedback', () => {
  const submitting = ref(false)
  const lastResult = ref<'success' | 'error' | null>(null)

  function setSubmitting(v: boolean) {
    submitting.value = v
  }
  function setResult(r: 'success' | 'error') {
    lastResult.value = r
  }
  function clearResult() {
    lastResult.value = null
  }

  return { submitting, lastResult, setSubmitting, setResult, clearResult }
})
