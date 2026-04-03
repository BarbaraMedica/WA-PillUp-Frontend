<template>
  <div class="mt-6 bg-cyan-50 rounded-lg p-4">
    <h3 class="font-bold text-center mb-3">Kalendar</h3>

    <div class="flex items-center justify-between mb-2">
      <button @click="prethodniMjesec">&lt;</button>
      <span class="font-semibold">{{ nazivMjeseca }}</span>
      <button @click="sljedeciMjesec">&gt;</button>
    </div>

    <div class="grid grid-cols-7 gap-1 text-xs text-center">
      <div v-for="d in ['Po','Ut','Sr','Če','Pe','Su','Ne']" :key="d" class="font-semibold">
        {{ d }}
      </div>

      <div
        v-for="(dan, i) in daniUMjesecu.cells"
        :key="i"
        class="p-1 rounded"
        :class="dan === daniUMjesecu.danasDan &&
                daniUMjesecu.mj === daniUMjesecu.danasMj &&
                daniUMjesecu.god === daniUMjesecu.danasGod
          ? 'bg-cyan-600 text-white'
          : 'bg-white'"
      >
        {{ dan ?? '' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"

const trenutniMjesec = ref(new Date())

const nazivMjeseca = computed(() => {
  return trenutniMjesec.value.toLocaleDateString("hr-HR", {
    month: "long",
    year: "numeric"
  })
})

const daniUMjesecu = computed(() => {
  const god = trenutniMjesec.value.getFullYear()
  const mj = trenutniMjesec.value.getMonth()

  let prviDan = new Date(god, mj, 1).getDay()
  prviDan = prviDan === 0 ? 6 : prviDan - 1 // ponedjeljak prvi

  const ukupnoDana = new Date(god, mj + 1, 0).getDate()
  const danas = new Date()

  const cells = Array(prviDan).fill(null)

  for (let d = 1; d <= ukupnoDana; d++) {
    cells.push(d)
  }

  return {
    cells,
    danasDan: danas.getDate(),
    danasMj: danas.getMonth(),
    danasGod: danas.getFullYear(),
    mj,
    god
  }
})

const prethodniMjesec = () => {
  const d = new Date(trenutniMjesec.value)
  d.setMonth(d.getMonth() - 1)
  trenutniMjesec.value = d
}

const sljedeciMjesec = () => {
  const d = new Date(trenutniMjesec.value)
  d.setMonth(d.getMonth() + 1)
  trenutniMjesec.value = d
}
</script>

<style scoped> </style>