<template>
  <div class="min-h-screen bg-gray-50">
    <!-- HEADER -->
    <header class="bg-white shadow-sm p-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img src="/logo.webp" alt="PillUp" class="w-12 h-12" />
        <h1 class="text-2xl font-bold text-cyan-600">PillUp</h1>
      </div>
      
      <div class="flex items-center gap-4">
        <button class="p-2 hover:bg-gray-100 rounded-full">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        <div class="flex items-center gap-2 relative">
          <button @click="menuOpen = !menuOpen" class="font-semibold text-gray-700 hover:text-cyan-600 transition-colors">
            {{ imeKorisnika }}
          </button>
          <!-- Dropdown Menu -->
          <div v-if="menuOpen" class="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
            <button @click="idiNaPostavke" class="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-t-lg flex items-center gap-2">
              <span>👤</span> Promijeni ime
            </button>
            <button @click="odjava" class="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-b-lg flex items-center gap-2 text-red-600">
              <span>🚪</span> Odjava
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="p-8 max-w-7xl mx-auto">
      <div class="mb-8">
        <h2 class="text-4xl font-bold text-cyan-600 mb-2">Pozdrav, {{ imeKorisnika }}! 😊</h2>
        <div class="flex items-center gap-4 text-gray-600">
          <span class="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold">{{ trenutniDatum }}</span>
          <span class="bg-cyan-100 text-cyan-600 px-4 py-2 rounded-full font-semibold">{{ trenutnoVrijeme }}</span>
        </div>
      </div>

      <!-- Grid Layout: Sidebar + Content -->
      <div class="grid grid-cols-12 gap-6">
        <!-- Sidebar -->
        <div class="col-span-3 bg-white rounded-lg shadow-md p-4">
          <nav class="space-y-2">
            <button class="w-full text-left px-4 py-3 bg-cyan-50 text-cyan-600 rounded-lg font-semibold flex items-center gap-2">
              <span>📅</span> Početna - dnevni raspored
            </button>
            <button @click="$router.push('/moji-lijekovi')" class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-2">
              <span>💊</span> Moji lijekovi/suplementi
            </button>
            <button @click="$router.push('/dodaj-lijek')" class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-2">
              <span>➕</span> Dodaj lijek/suplement
            </button>
            <button @click="$router.push('/pdf-izvjestaj')" class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-2">
              <span>📊</span> PDF Izvještaj
            </button>
            <button @click="$router.push('/ai-analiza')" class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-2">
              <span>🧠</span> AI analiza
            </button>
            <button @click="$router.push('/statistika')" class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-2">
              <span>📈</span> Moja statistika
            </button>
            <button @click="$router.push('/postavke')" class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-2">
              <span>⚙️</span> Postavke
            </button>
          </nav>

          <div class="mt-6 bg-cyan-50 rounded-lg p-4">
            <h3 class="font-bold text-center mb-3">Kalendar</h3>
            <Kalendar />
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="col-span-9 space-y-6">
          <!-- AI Analiza -->
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
              <p><strong>Interpretacija:</strong> {{ aiAnalysis.interpretation }}</p>
              <p><strong>Savjet:</strong> {{ aiAnalysis.advice }}</p>
              <div v-if="aiAnalysis.actions && aiAnalysis.actions.length" class="mt-3">
                <p class="font-semibold mb-2">Preporučene akcije:</p>
                <ul class="list-disc pl-6 text-gray-700">
                  <li v-for="(action, index) in aiAnalysis.actions" :key="index">{{ action }}</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Tekstualna Statistika (zadnjih 7 dana) -->
          <div class="bg-white rounded-xl shadow p-6">
            <h2 class="text-2xl font-bold text-cyan-600 mb-4">📋 Pregled terapije (zadnjih 7 dana)</h2>
            <div v-if="loadingStats" class="text-gray-500">Učitavanje statistike...</div>
            <div v-else class="space-y-2">
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-green-500 rounded-full"></div>
                <span class="text-gray-700"><strong>Terapija uzeta na vrijeme:</strong> {{ stats.adherence }}%</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span class="text-gray-700"><strong>Terapija uzeta kasnije:</strong> {{ stats.late }}%</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-red-500 rounded-full"></div>
                <span class="text-gray-700"><strong>Terapija preskočena:</strong> {{ stats.missed }}%</span>
              </div>
            </div>
          </div>

          <!-- Doughnut Graf -->
          <div class="bg-white rounded-xl shadow p-6">
            <h2 class="text-2xl font-bold text-cyan-600 mb-4">📊 Status uzimanja lijekova</h2>
            <div v-if="loadingStats" class="text-gray-500">Učitavanje grafova...</div>
            <div v-else class="w-full flex justify-center">
              <div class="w-64 h-64">
                <DoughnutGraf :statistika="statistikaUzimanja" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../usluge/api";
import { useRouter } from "vue-router";
import DoughnutGraf from "../components/DoughnutGraf.vue";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import Kalendar from '@/components/Kalendar.vue';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const router = useRouter();
const imeKorisnika = ref("");
const menuOpen = ref(false);

const idiNaPostavke = () => { menuOpen.value = false; router.push("/postavke"); };
const odjava = () => { localStorage.removeItem("token"); router.push("/"); };

const aiAnalysis = ref({ interpretation: "", advice: "", actions: [] });
const loadingAI = ref(false);

const stats = ref({ adherence: 0, late: 0, missed: 0 });
const statistikaUzimanja = ref({ naVrijeme: 0, kasno: 0, preskoceno: 0 });
const loadingStats = ref(true);

const refreshData = async () => {
  loadingAI.value = true;
  loadingStats.value = true;
  try {
    const statRes = await api.get("/statistika/uzimanje");
    const statistikaData = statRes.data;

    statistikaUzimanja.value = {
      naVrijeme: statistikaData.naVrijeme || 0,
      kasno: statistikaData.kasno || 0,
      preskoceno: statistikaData.preskoceno || 0
    };

    stats.value = {
      adherence: statistikaData.naVrijeme || 0,
      late: statistikaData.kasno || 0,
      missed: statistikaData.preskoceno || 0
    };

    console.log("📊 Učitana statistika:", statistikaUzimanja.value);

    // Učitaj prosječno raspoloženje za AI analizu
    const analizaRes = await api.get("/analiza");
    const avgMood = analizaRes.data.avgMood ?? 50;

    // Pozovi Groq analizu sa ispravnim podacima
    const aiRes = await api.post("/analiza/analyze", {
      adherence: stats.value.adherence,
      avgMood: avgMood,
      missed: stats.value.missed
    });

    aiAnalysis.value = {
      interpretation: aiRes.data.interpretation || "",
      advice: aiRes.data.advice || "",
      actions: Array.isArray(aiRes.data.actions) ? aiRes.data.actions : []
    };

    console.log("🤖 AI analiza:", aiAnalysis.value);

  } catch (error) {
    console.error("Greška pri dohvaćanju podataka:", error);
    // Fallback
    aiAnalysis.value = {
      interpretation: "Nije moguće dohvatiti AI analizu trenutno.",
      advice: "Provjerite vezu s internetom.",
      actions: []
    };
  } finally {
    loadingAI.value = false;
    loadingStats.value = false;
  }
};

onMounted(() => {
  api.get("/korisnik/profil").then(res => {
    imeKorisnika.value = res.data.ime || "Korisnik";
  }).catch(err => {
    console.error("Greška pri učitavanju profila:", err);
  });
  
  refreshData();
});

const trenutniDatum = ref("");
const trenutnoVrijeme = ref("");
const azurirajVrijeme = () => {
  const sada = new Date();
  const danTjedna = sada.toLocaleDateString("hr-HR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const vrijeme = sada.toLocaleTimeString("hr-HR", { hour: "2-digit", minute: "2-digit" });
  trenutniDatum.value = danTjedna;
  trenutnoVrijeme.value = vrijeme;
};

azurirajVrijeme();
setInterval(azurirajVrijeme, 60000); 

</script>

<style scoped>
</style>