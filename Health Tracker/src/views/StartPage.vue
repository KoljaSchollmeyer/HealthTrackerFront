<template>
<main class="home">
<section class="card">
  <h3>Willkommen!</h3>
  <h1>Health Tracker</h1>
  <p>Wir werden dich in der Zukunft dabei unterstützen deine Gesundheitsziele zu erreichen </p>

  <form class="form" @submit.prevent="onLogin">
    <label class="field">
      <span>E‑Mail</span>
      <input v-model="email" type="email" placeholder="name@example.com" required />
    </label>

    <label class="field">
      <span>Passwort</span>
      <input v-model="password" type="password" placeholder="••••••••" required />
    </label>

    <button type="submit">Anmelden</button>
  </form>
</section>
</main>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const isLoggedIn = inject<any>('isLoggedIn');

const onLogin = () => {
  console.log("login", { email: email.value, password: password.value });

  // Setze Login-Status über injected Ref
  if (isLoggedIn) {
    isLoggedIn.value = true;
  }

  // Nach erfolgreichem Login zur Main-Page navigieren
  router.push({ name: 'main' });
};
</script>

<style scoped>
.home {
  min-height:100vh;
  display: grid;
  place-items: center;
  padding:4.5rem 2rem 2rem;
  background: var(--app-bg);
}

.card {
  width: min(420px,100%);
  background: var(--app-surface);
  border:1px solid var(--app-border);
  border-radius:12px;
  padding:2rem;
  box-shadow: var(--app-shadow);
}

h3 {
  margin:0;
  color: var(--app-accent);
  font-weight: 800;
  text-transform: uppercase;
  text-align: center;
  font-family: sans-serif;

}

h1 {
  margin:000.5rem;
  color: var(--app-text-primary);
  align-items: center;
  text-align: center;
  font-size: 3rem;
  font-weight: 800;
  font-family: sans-serif;

}

p {
  margin:001.5rem;
  color: var(--app-text-muted);
}

.form {
  display: grid;
  gap:1rem;
}

.field {
  display: grid;
  gap:0.5rem;
  color: var(--app-text-primary);
}

input {
  padding:0.75rem;
  border:1px solid var(--app-border);
  border-radius:8px;
  font-size:1rem;
  background: var(--app-surface-muted);
  color: var(--app-text-primary);
}

button {
  padding:0.75rem;
  border:0;
  border-radius:8px;
  background: var(--app-accent);
  color: #ffffff;
  font-weight:600;
  cursor: pointer;
}

button:hover {
  background: var(--app-accent-hover);
}
</style>
