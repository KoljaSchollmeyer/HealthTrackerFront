<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
const age = ref<number | null>(null);
const gender = ref("");
const heightCm = ref<number | null>(null);
const weightKg = ref<number | null>(null);

const onSubmit = () => {
  console.log("overview-submit", {
    name: name.value,
    age: age.value,
    gender: gender.value,
    heightCm: heightCm.value,
    weightKg: weightKg.value,
  });
};
</script>

<template>
  <main class="overview">
    <section class="card">
      <h1>Health Tracker Uebersicht</h1>
      <p>Bitte gib deine Daten ein.</p>

      <form class="form" @submit.prevent="onSubmit">
        <label class="field">
          <span>Name</span>
          <input v-model="name" type="text" placeholder="Max Mustermann" required />
        </label>

        <label class="field">
          <span>Alter</span>
          <input v-model.number="age" type="number" min="0" max="130" placeholder="30" required />
        </label>

        <label class="field">
          <span>Geschlecht</span>
          <select v-model="gender" required>
            <option value="" disabled>Bitte waehlen</option>
            <option value="weiblich">Weiblich</option>
            <option value="maennlich">Maennlich</option>
            <option value="divers">Divers</option>
            <option value="Spaghetti-Monster">Spaghetti Monster</option>
          </select>
        </label>

        <label class="field">
          <span>Groesse (cm)</span>
          <input v-model.number="heightCm" type="number" min="0" max="260" placeholder="175" required />
        </label>

        <label class="field">
          <span>Gewicht (kg)</span>
          <input v-model.number="weightKg" type="number" min="0" max="400" placeholder="70" required />
        </label>

        <button type="submit">Speichern</button>
      </form>
    </section>
  </main>
</template>

<style scoped>
.overview {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 4.5rem 2rem 2rem;
  background: var(--app-bg);
}

.card {
  width: min(520px, 100%);
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: var(--app-shadow);
}

h1 {
  margin: 0 0 0.5rem;
}

p {
  margin: 0 0 1.5rem;
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
select {
  padding: 0.75rem;
  border: 1px solid var(--app-border);
  border-radius: 8px;
  font-size: 1rem;
  background: var(--app-surface-muted);
  color: var(--app-text-primary);
}

button {
  padding: 0.75rem 1rem;
  border: 0;
  border-radius: 8px;
  background: var(--app-accent);
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  background: var(--app-accent-hover);
}
</style>
