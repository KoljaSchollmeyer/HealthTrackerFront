<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterView } from 'vue-router'

type Theme = 'light' | 'dark'

const theme = ref<Theme>('light')

const themeLabel = computed(() => (theme.value === 'light' ? 'Dark Mode' : 'Light Mode'))

const applyTheme = (value: Theme) => {
  document.documentElement.setAttribute('data-theme', value)
}

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'light' || savedTheme === 'dark') {
    theme.value = savedTheme
  }
  applyTheme(theme.value)
})

watch(theme, (value) => {
  applyTheme(value)
  localStorage.setItem('theme', value)
})
</script>

<template>
  <button class="theme-toggle" type="button" @click="toggleTheme">
    {{ themeLabel }}
  </button>
  <RouterView />
</template>

<style scoped>
.theme-toggle {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
  border: 1px solid var(--app-border);
  background: var(--app-surface);
  color: var(--app-text-primary);
  border-radius: 999px;
  padding: 0.5rem 0.9rem;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.14);
}

.theme-toggle:hover {
  background: var(--app-surface-muted);
}
</style>

