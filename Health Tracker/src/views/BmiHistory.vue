<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({
  name: 'BmiHistoryView',
})

type BmiEntry = {
  date: string
  weightKg: number
  bmi: number
}

const heightCm = ref<number | null>(null)
const historyDate = ref('')
const historyWeightKg = ref<number | null>(null)
const bmiHistory = ref<BmiEntry[]>([])

const chartWidth = 700
const chartHeight = 240
const chartPadding = 28

const chartEntries = computed(() => {
  return [...bmiHistory.value].sort((a, b) => a.date.localeCompare(b.date))
})

const bmiBounds = computed(() => {
  if (chartEntries.value.length === 0) {
    return { min: 0, max: 1 }
  }

  const values = chartEntries.value.map((entry) => entry.bmi)
  const minRaw = Math.min(...values)
  const maxRaw = Math.max(...values)
  const pad = 0.8

  return {
    min: Math.max(0, minRaw - pad),
    max: maxRaw + pad,
  }
})

const chartPoints = computed(() => {
  if (chartEntries.value.length === 0) {
    return ''
  }

  const rangeX = chartWidth - chartPadding * 2
  const rangeY = chartHeight - chartPadding * 2
  const steps = Math.max(chartEntries.value.length - 1, 1)
  const valueRange = Math.max(bmiBounds.value.max - bmiBounds.value.min, 0.1)

  return chartEntries.value
    .map((entry, index) => {
      const x = chartPadding + (index / steps) * rangeX
      const y =
        chartHeight - chartPadding - ((entry.bmi - bmiBounds.value.min) / valueRange) * rangeY
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
})

const chartDots = computed(() => {
  if (chartEntries.value.length === 0) {
    return [] as Array<{ x: number; y: number; bmi: number; date: string }>
  }

  const rangeX = chartWidth - chartPadding * 2
  const rangeY = chartHeight - chartPadding * 2
  const steps = Math.max(chartEntries.value.length - 1, 1)
  const valueRange = Math.max(bmiBounds.value.max - bmiBounds.value.min, 0.1)

  return chartEntries.value.map((entry, index) => {
    const x = chartPadding + (index / steps) * rangeX
    const y =
      chartHeight - chartPadding - ((entry.bmi - bmiBounds.value.min) / valueRange) * rangeY

    return { x, y, bmi: entry.bmi, date: entry.date }
  })
})

const addHistoryEntry = () => {
  if (!heightCm.value || heightCm.value <= 0 || !historyDate.value || !historyWeightKg.value) {
    return
  }

  const heightM = heightCm.value / 100
  const calculatedBmi = Number((historyWeightKg.value / (heightM * heightM)).toFixed(1))

  bmiHistory.value.push({
    date: historyDate.value,
    weightKg: historyWeightKg.value,
    bmi: calculatedBmi,
  })

  historyDate.value = ''
  historyWeightKg.value = null
}

const formatDate = (value: string) => {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return value
  }
  return parsed.toLocaleDateString('de-DE')
}
</script>

<template>
  <main class="bmi-page">
    <section class="bmi-card">
      <header class="head">
        <h1>BMI Verlauf</h1>
        <p>Hier kannst du dein Gewicht pro Datum erfassen und den BMI als Liniendiagramm sehen.</p>
      </header>

      <form class="entry-form" @submit.prevent="addHistoryEntry">
        <label class="field">
          <span>Groesse (cm)</span>
          <input v-model.number="heightCm" type="number" min="50" max="260" placeholder="175" required />
        </label>

        <label class="field">
          <span>Datum</span>
          <input v-model="historyDate" type="date" required />
        </label>

        <label class="field">
          <span>Gewicht (kg)</span>
          <input v-model.number="historyWeightKg" type="number" min="20" max="400" step="0.1" required />
        </label>

        <button type="submit">Wert hinzufuegen</button>
      </form>

      <div v-if="chartEntries.length" class="chart-wrap">
        <svg
          :viewBox="`0 0 ${chartWidth} ${chartHeight}`"
          class="chart"
          role="img"
          aria-label="BMI Verlauf als Liniendiagramm"
        >
          <line
            :x1="chartPadding"
            :y1="chartHeight - chartPadding"
            :x2="chartWidth - chartPadding"
            :y2="chartHeight - chartPadding"
            class="axis"
          />
          <line
            :x1="chartPadding"
            :y1="chartPadding"
            :x2="chartPadding"
            :y2="chartHeight - chartPadding"
            class="axis"
          />
          <polyline :points="chartPoints" class="bmi-line" />
          <circle
            v-for="dot in chartDots"
            :key="`${dot.date}-${dot.bmi}`"
            :cx="dot.x"
            :cy="dot.y"
            r="4"
            class="bmi-dot"
          />
        </svg>

        <div class="chart-scale">
          <span>min {{ bmiBounds.min.toFixed(1) }}</span>
          <span>max {{ bmiBounds.max.toFixed(1) }}</span>
        </div>
      </div>

      <p v-else class="hint">Noch keine Verlaufseintraege vorhanden.</p>

      <div v-if="chartEntries.length" class="history-list" aria-label="BMI Verlaufsliste">
        <article v-for="entry in chartEntries" :key="`${entry.date}-${entry.weightKg}`" class="history-item">
          <strong>{{ formatDate(entry.date) }}</strong>
          <span>{{ entry.weightKg.toFixed(1) }} kg</span>
          <span>BMI {{ entry.bmi.toFixed(1) }}</span>
        </article>
      </div>

      <RouterLink class="back-link" :to="{ name: 'main' }">Zurueck zur Mainpage</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.bmi-page {
  min-height: 100vh;
  background: var(--app-bg);
  padding: 4.5rem 2rem 2rem;
  display: grid;
  place-items: start center;
}

.bmi-card {
  width: min(980px, 100%);
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--app-shadow);
  display: grid;
  gap: 1rem;
}

.head h1 {
  margin: 0 0 0.4rem;
}

.head p {
  margin: 0;
  color: var(--app-text-muted);
}

.entry-form {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;
  align-items: end;
}

.field {
  display: grid;
  gap: 0.45rem;
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

.chart-wrap {
  border: 1px solid var(--app-border);
  border-radius: 10px;
  background: var(--app-surface-muted);
  padding: 0.7rem;
}

.chart {
  width: 100%;
  height: auto;
  display: block;
}

.axis {
  stroke: var(--app-text-muted);
  stroke-width: 1.5;
}

.bmi-line {
  fill: none;
  stroke: var(--app-accent);
  stroke-width: 3;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.bmi-dot {
  fill: var(--app-accent);
}

.chart-scale {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  color: var(--app-text-muted);
  font-size: 0.85rem;
}

.hint {
  color: var(--app-text-muted);
}

.history-list {
  display: grid;
  gap: 0.5rem;
}

.history-item {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 0.5rem;
  padding: 0.5rem 0.7rem;
  border: 1px solid var(--app-border);
  border-radius: 8px;
  background: var(--app-surface-muted);
}

.back-link {
  justify-self: start;
  border: 1px solid var(--app-accent);
  background: var(--app-accent);
  color: #ffffff;
  border-radius: 8px;
  padding: 0.65rem 1rem;
  font-weight: 700;
}

.back-link:hover {
  background: var(--app-accent-hover);
}

@media (max-width: 780px) {
  .entry-form {
    grid-template-columns: 1fr;
  }

  .history-item {
    grid-template-columns: 1fr;
  }

  .back-link {
    width: 100%;
    text-align: center;
  }
}
</style>

