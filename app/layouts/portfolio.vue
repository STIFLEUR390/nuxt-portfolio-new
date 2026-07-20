<script setup lang="ts">
const mobileOpen = ref(false)
</script>

<template>
  <div class="min-h-screen flex bg-default">
    <PortfolioSidebar
      :mobile-open="mobileOpen"
      @close-mobile="mobileOpen = false"
    />

    <div class="flex-1 flex flex-col min-w-0 lg:pl-64">
      <header class="h-16 border-b border-default flex items-center gap-4 px-4 lg:px-6 shrink-0 bg-elevated/50 backdrop-blur-sm sticky top-0 z-30">
        <UButton
          color="neutral"
          variant="ghost"
          size="sm"
          icon="i-lucide-menu"
          class="lg:hidden"
          @click="mobileOpen = !mobileOpen"
        />

        <div class="flex-1" />

        <UColorModeButton />
      </header>

      <main class="flex-1 p-4 lg:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
