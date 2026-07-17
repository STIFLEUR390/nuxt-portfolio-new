<script setup lang="ts">
import { marked } from 'marked'

const props = defineProps<{
  value?: string
  unwrap?: 'p' | 'div'
}>()

const html = computed(() => {
  if (!props.value) return ''
  const result = marked.parse(props.value, { async: false }) as string
  if (props.unwrap === 'p') {
    return result.replace(/^<p>|<\/p>$/g, '')
  }
  return result
})
</script>

<template>
  <div v-html="html" />
</template>
