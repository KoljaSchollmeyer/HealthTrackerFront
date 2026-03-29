<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({
  name: 'MainView',
})

const name = ref('')
const birthDate = ref('')
const heightCm = ref<number | null>(null)
const weightKg = ref<number | null>(null)

const bmi = computed(() => {
  if (!heightCm.value || !weightKg.value || heightCm.value <= 0) {
    return null
  }

  const heightM = heightCm.value / 100
  return (weightKg.value / (heightM * heightM)).toFixed(1)
})

const onSubmit = () => {
  console.log('profile-submit', {
    name: name.value,
    birthDate: birthDate.value,
    heightCm: heightCm.value,
    weightKg: weightKg.value,
    bmi: bmi.value,
  })
}
</script>

<template>
  <main class="main-page">
    <section class="overview-panel">
      <header class="hero">
        <h1>Health Tracker Mainpage</h1>
        <p>
          Hier siehst du deine persoenliche Uebersicht. Rechts kannst du deine Profildaten
          eintragen und aktuell halten.
        </p>
      </header>

      <section class="stats-grid" aria-label="Gesundheitsuebersicht">
        <article class="stat-card">
          <h3>Name</h3>
          <strong>{{ name || 'Noch nicht gesetzt' }}</strong>
        </article>

        <article class="stat-card">
          <h3>Geburtsdatum</h3>
          <strong>{{ birthDate || 'Noch nicht gesetzt' }}</strong>
        </article>

        <article class="stat-card">
          <h3>Groesse</h3>
          <strong>{{ heightCm ? `${heightCm} cm` : 'Noch nicht gesetzt' }}</strong>
        </article>

        <article class="stat-card">
          <h3>Gewicht</h3>
          <strong>{{ weightKg ? `${weightKg} kg` : 'Noch nicht gesetzt' }}</strong>
        </article>
      </section>

      <section class="highlight-card">
        <h2>BMI</h2>
        <p v-if="bmi">Aktueller Wert: <strong>{{ bmi }}</strong></p>
        <p v-else>Bitte Groesse und Gewicht eingeben, um den BMI zu sehen.</p>
      </section>

      <section class="history-cta">
        <h2>BMI Verlauf als Diagramm</h2>
        <p>
          Fuer eine bessere Uebersicht liegt der Verlauf jetzt in einer eigenen Seite.
        </p>
        <RouterLink class="history-link" :to="{ name: 'bmi-history' }">
          Zum BMI-Diagramm
        </RouterLink>
      </section>
    </section>

    <aside class="profile-panel">
      <h2>Profil</h2>
      <p>Bitte trage hier deine Daten ein.</p>

      <form class="form" @submit.prevent="onSubmit">
        <label class="field">
          <span>Name</span>
          <input v-model="name" type="text" placeholder="Max Mustermann" required />
        </label>

        <label class="field">
          <span>Geburtsdatum</span>
          <input v-model="birthDate" type="date" required />
        </label>

        <label class="field">
          <span>Groesse (cm)</span>
          <input v-model.number="heightCm" type="number" min="50" max="260" placeholder="175" required />
        </label>

        <label class="field">
          <span>Gewicht (kg)</span>
          <input v-model.number="weightKg" type="number" min="20" max="400" placeholder="70" required />
        </label>

        <button type="submit">Profil speichern</button>
      </form>
    </aside>
  </main>
</template>

<style scoped>
.main-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(300px, 1fr);
  gap: 1.5rem;
  padding: 4.5rem 2rem 2rem;
  background: var(--app-bg);
}

.overview-panel,
.profile-panel {
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: var(--app-shadow);
}

.overview-panel {
  display: grid;
  gap: 1.25rem;
}

.hero h1 {
  margin: 0 0 0.6rem;
  font-size: clamp(1.7rem, 2.7vw, 2.4rem);
}

.hero p {
  margin: 0;
  color: var(--app-text-muted);
  max-width: 60ch;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.stat-card {
  background: var(--app-surface-muted);
  border: 1px solid var(--app-border);
  border-radius: 10px;
  padding: 1rem;
}

.stat-card h3 {
  margin: 0 0 0.4rem;
  color: var(--app-accent);
  font-size: 0.95rem;
}

.stat-card strong {
  font-size: 1.15rem;
  color: var(--app-text-primary);
}

.highlight-card {
  background: linear-gradient(145deg, #eff6ff, #dbeafe);
  border: 1px solid #bfdbfe;
  border-radius: 12px;
  padding: 1rem 1.2rem;
}

.highlight-card h2 {
  margin: 0 0 0.35rem;
  color: #1e3a8a;
}

.highlight-card p {
  margin: 0;
  color: var(--app-text-primary);
}

.history-cta {
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: 12px;
  padding: 1rem 1.2rem;
  display: grid;
  gap: 0.75rem;
}

.history-cta h2 {
  margin: 0;
}

.history-cta p {
  margin: 0;
  color: var(--app-text-muted);
}

.history-link {
  justify-self: start;
  border: 1px solid var(--app-accent);
  background: var(--app-accent);
  color: #ffffff;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  font-weight: 700;
}

.history-link:hover {
  background: var(--app-accent-hover);
}

.profile-panel h2 {
  margin: 0 0 0.4rem;
}

.profile-panel p {
  margin: 0 0 1rem;
  color: var(--app-text-muted);
}

.form {
  display: grid;
  gap: 1rem;
}

.field {
  display: grid;
  gap: 0.5rem;
}

input,
button {
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
}

input {
  border: 1px solid var(--app-border);
  background: var(--app-surface-muted);
  color: var(--app-text-primary);
}

button {
  border: 0;
  background: var(--app-accent);
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  background: var(--app-accent-hover);
}

@media (max-width: 980px) {
  .main-page {
    grid-template-columns: 1fr;
  }

  .profile-panel {
    order: -1;
  }
}

@media (max-width: 640px) {
  .main-page {
    padding: 1rem;
  }

  .overview-panel,
  .profile-panel {
    padding: 1.2rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .history-link {
    width: 100%;
    text-align: center;
  }
}
</style>

