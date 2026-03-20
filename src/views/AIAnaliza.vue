<template>
  <div class="min-h-screen bg-gray-50">

    <!-- HEADER -->
    <header class="bg-white shadow-sm p-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img src="/logo.webp" alt="PillUp" class="w-12 h-12" />
        <h1 class="text-2xl font-bold text-cyan-600">PillUp</h1>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2 relative">
          <button @click="menuOpen = !menuOpen" class="font-semibold text-gray-700 hover:text-cyan-600">
            {{ imeKorisnika }}
          </button>

          <div v-if="menuOpen" class="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
            <button @click="idiNaPostavke" class="w-full text-left px-4 py-2 hover:bg-gray-50">
              👤 Promijeni ime
            </button>
            <button @click="odjava" class="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600">
              🚪 Odjava
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- MAIN CONTENT -->
    <div class="p-8 max-w-5xl mx-auto space-y-8">

      <!-- AI ANALIZA -->
      <div class="bg-white rounded-xl shadow p-6">
        <h2 class="text-2xl font-bold text-cyan-600 mb-4">AI analiza 🧠</h2>

        <button
          @click="refreshData"
          class="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg mb-4"
          :disabled="loadingAI || loadingStats"
        >
          {{ loadingAI || loadingStats ? "Učitavanje..." : "Refresh AI i graf" }}
        </button>

        <div v-if="loadingAI" class="text-gray-500">AI analizira podatke...</div>
        <div v-else class="space-y-3">
          <p><strong>Interpretation:</strong> {{ aiAnalysis.interpretation }}</p>
          <p><strong>Advice:</strong> {{ aiAnalysis.advice }}</p>
          <ul class="list-disc pl-6">
            <li v-for="(a, index) in aiAnalysis.actions" :key="index">{{ a }}</li>
          </ul>
        </div>
      </div>

      <!-- TEKSTUALNA STATISTIKA -->
      <div class="bg-white rounded-xl shadow p-6">
        <h2 class="text-2xl font-bold text-cyan-600 mb-4">Pregled terapije (zadnjih 7 dana)</h2>

        <div v-if="loadingStats" class="text-gray-500">Učitavanje statistike...</div>
        <ul v-else class="list-disc pl-6 text-gray-700 space-y-1">
          <li>Terapija uzeta na vrijeme: {{ stats.adherence }}%</li>
          <li>Terapija uzeta kasnije: {{ stats.late }}%</li>
          <li>Terapija preskočena: {{ stats.missed }}%</li>
        </ul>
      </div>

      <!-- DOUGHNUT GRAF -->
      <div class="bg-white rounded-xl shadow p-6">
        <h2 class="text-2xl font-bold text-cyan-600 mb-4">Status uzimanja lijekova</h2>

        <div v-if="loadingStats" class="text-gray-500">Učitavanje grafova...</div>
        <div v-else class="w-64 h-64 mx-auto">
          <DoughnutGraf :statistika="statistikaUzimanja" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../usluge/api";
import { useRouter } from "vue-router";
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

// Doughnut graf komponenta
const DoughnutGraf = {
  props: { statistika: { type: Object, required: true } },
  setup(props) {
    const chartData = {
      labels: ["Na vrijeme", "Kasno", "Preskočeno"],
      datasets: [
        {
          label: "Uzimanje lijekova",
          data: [
            props.statistika.naVrijeme || 0,
            props.statistika.kasno || 0,
            props.statistika.preskoceno || 0
          ],
          backgroundColor: ["#06b6d4", "#facc15", "#f87171"],
          borderWidth: 2
        }
      ]
    };
    const chartOptions = {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        tooltip: {
          callbacks: {
            label(context) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const value = context.raw;
              const percent = total ? ((value / total) * 100).toFixed(1) : 0;
              return `${context.label}: ${value} (${percent}%)`;
            }
          }
        }
      }
    };
    return () => <Doughnut chart-data={chartData} chart-options={chartOptions} />;
  }
};


const router = useRouter();
const imeKorisnika = ref("");
const menuOpen = ref(false);

const idiNaPostavke = () => {
  menuOpen.value = false;
  router.push("/postavke");
};

const odjava = () => {
  localStorage.removeItem("token");
  router.push("/prijava");
};

// AI analiza
const aiAnalysis = ref({ interpretation: "", advice: "", actions: [] });
const loadingAI = ref(false);

// Stat i graf
const stats = ref({ adherence: 0, late: 0, missed: 0 });
const statistikaUzimanja = ref({ naVrijeme: 0, kasno: 0, preskoceno: 0 });
const loadingStats = ref(true);

// Funkcija za refresh AI i statistiku
const refreshData = async () => {
  loadingAI.value = true;
  loadingStats.value = true;
  try {
    // Dohvati statistiku za graf
    const statRes = await api.get("/statistika/uzimanje");
    statistikaUzimanja.value = statRes.data;

    stats.value = {
      adherence: statRes.data.naVrijeme || 0,
      late: statRes.data.kasno || 0,
      missed: statRes.data.preskoceno || 0
    };

    // ai analiza
    const aiRes = await api.post("/analiza/analyze", {
      adherence: stats.value.adherence,
      avgMood: 2.8, // placeholder, može se zamijeniti stvarnim podacima o raspoloženju
      missed: stats.value.missed
    });

    aiAnalysis.value = aiRes.data.analysis || {
      interpretation: aiRes.data.interpretation || "",
      advice: aiRes.data.advice || "",
      actions: aiRes.data.actions || []
    };

  } catch (error) {
    console.error("Greška pri dohvaćanju podataka:", error);
  } finally {
    loadingAI.value = false;
    loadingStats.value = false;
  }
};

//  refresh na mount
onMounted(() => {
  api.get("/korisnik/profil").then(res => imeKorisnika.value = res.data.ime || "Korisnik");
  refreshData();
});
</script>

<style scoped>

</style>