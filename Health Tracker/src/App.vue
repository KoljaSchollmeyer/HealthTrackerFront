<script setup lang="ts">
import { computed, onMounted, provide, ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'

type Theme = 'light' | 'dark'

const theme = ref<Theme>('light')
const isLoggedIn = ref(false)
const router = useRouter()

const themeLabel = computed(() => (theme.value === 'light' ? 'Dark Mode' : 'Light Mode'))

const applyTheme = (value: Theme) => {
  document.documentElement.setAttribute('data-theme', value)
}

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const logout = () => {
  isLoggedIn.value = false
  localStorage.removeItem('isLoggedIn')
  router.push({ name: 'home' })
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'light' || savedTheme === 'dark') {
    theme.value = savedTheme
  }
  applyTheme(theme.value)

  const savedLoginState = localStorage.getItem('isLoggedIn')
  isLoggedIn.value = savedLoginState === 'true'
})

watch(theme, (value) => {
  applyTheme(value)
  localStorage.setItem('theme', value)
})

watch(isLoggedIn, (value) => {
  localStorage.setItem('isLoggedIn', value ? 'true' : 'false')
})

// Provide isLoggedIn für die Verwendung in Child Components
provide('isLoggedIn', isLoggedIn)
</script>

<template>
  <button class="theme-toggle" type="button" @click="toggleTheme">
    {{ themeLabel }}
  </button>
  <button v-if="isLoggedIn" class="logout-button" type="button" @click="logout">
    Abmelden
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

.logout-button {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  border: 1px solid var(--app-accent);
  background: var(--app-accent);
  color: #ffffff;
  border-radius: 999px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.14);
}

.logout-button:hover {
  background: var(--app-accent-hover);
  border-color: var(--app-accent-hover);
}
</style>

