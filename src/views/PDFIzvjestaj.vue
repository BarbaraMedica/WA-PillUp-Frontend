<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
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
            <button 
              @click="idiNaPostavke"
              class="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-t-lg flex items-center gap-2"
            >
              <span>👤</span> Promijeni ime
            </button>
            <button 
              @click="odjava"
              class="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-b-lg flex items-center gap-2 text-red-600"
            >
              <span>🚪</span> Odjava
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="p-8">
      <div class="max-w-7xl mx-auto">
        <div class="mb-8">
          <h2 class="text-4xl font-bold text-cyan-600 mb-2">
            Pozdrav, {{ imeKorisnika }}! 😊
          </h2>
          <div class="flex items-center gap-4 text-gray-600">
            <span class="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold">
              1. prosinac 2025
            </span>
            <span class="bg-cyan-100 text-cyan-600 px-4 py-2 rounded-full font-semibold">
              9:41 AM
            </span>
          </div>
        </div>

        <!-- Grid Layout -->
        <div class="grid grid-cols-12 gap-6">
          <!-- Sidebar -->
          <div class="col-span-3 bg-white rounded-lg shadow-md p-4">
            <nav class="space-y-2">
              <button 
                @click="$router.push('/glavni')"
                class="w-full text-left px-4 py-3 hover:bg-cyan-50 rounded-lg flex items-center gap-2"
              >
                <span>📅</span> Početna - dnevni raspored
              </button>
              <button 
                @click="$router.push('/moji-lijekovi')"
                class="w-full text-left px-4 py-3 hover:bg-cyan-50 rounded-lg flex items-center gap-2"
              >
                <span>💊</span> Moji lijekovi/suplementi
              </button>
              <button 
                @click="$router.push('/dodaj-lijek')"
                class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-2"
              >
                <span>➕</span> Dodaj lijek/suplement
              </button>
              <button 
                class="w-full text-left px-4 py-3 bg-cyan-50 text-cyan-600 rounded-lg font-semibold flex items-center gap-2"
              >
                <span>📊</span> PDF Izvještaj
              </button>
              <button 
                @click="$router.push('/statistika')"
                class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-2"
              >
                <span>📈</span> Moja statistika
              </button>
              <button 
                @click="$router.push('/postavke')"
                class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-2"
              >
                <span>⚙️</span> Postavke
              </button>
              <button class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-2">
                <span>❓</span> O nama
              </button>
            </nav>

            <!-- Calendar -->
            <div class="mt-6 bg-cyan-50 rounded-lg p-4">
              <h3 class="font-bold text-center mb-3">Kalendar</h3>
              <div class="flex items-center justify-between mb-2">
                <button class="text-cyan-600">&lt;</button>
                <span class="font-semibold">Sep 2025</span>
                <button class="text-cyan-600">&gt;</button>
              </div>
              <div class="grid grid-cols-7 gap-1 text-xs text-center">
                <div class="font-semibold">Su</div>
                <div class="font-semibold">Mo</div>
                <div class="font-semibold">Tu</div>
                <div class="font-semibold">We</div>
                <div class="font-semibold">Th</div>
                <div class="font-semibold">Fr</div>
                <div class="font-semibold">Sa</div>
                <div class="p-1">1</div>
                <div class="p-1">2</div>
                <div class="p-1">3</div>
                <div class="p-1">4</div>
                <div class="p-1">5</div>
                <div class="p-1">6</div>
                <div class="p-1">7</div>
                <div class="p-1">8</div>
                <div class="p-1 bg-cyan-600 text-white rounded">9</div>
                <div class="p-1">10</div>
                <div class="p-1">11</div>
                <div class="p-1 bg-cyan-600 text-white rounded">12</div>
                <div class="p-1">13</div>
                <div class="p-1">14</div>
              </div>
            </div>
          </div>

          <!-- Main Content -->
          <div class="col-span-9 space-y-6">
            <!-- Header s buttonom -->
            <div class="flex items-center justify-between">
              <h3 class="text-3xl font-bold text-cyan-600">Izvještaj</h3>
              <button 
                @click="preuzimiPDF"
                class="bg-white border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Preuzmi pdf dokument
              </button>
            </div>

            <!-- Uzeti lijekovi/suplementi -->
            <div class="bg-white rounded-2xl shadow-md p-6">
              <h4 class="text-2xl font-bold text-cyan-600 mb-4">Uzeti lijekovi/suplementi</h4>
              <p class="text-gray-600 mb-6">Prikaz povljienih lijekova/suplementata u njihov utjecaj</p>

              <div class="space-y-4">
                <div 
                  v-for="lijek in uzetiLijekovi" 
                  :key="lijek.id"
                  class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-red-400 to-yellow-400 rounded-full flex items-center justify-center shadow-md transform rotate-45">
                      <div class="w-8 h-8 bg-white rounded-full transform -rotate-45"></div>
                    </div>
                    <div>
                      <h5 class="font-bold text-gray-800">{{ lijek.naziv }}</h5>
                      <p class="text-sm text-gray-600">{{ lijek.opis }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-gray-800">{{ lijek.efekt }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Osobno unesene bilješke -->
            <div class="bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-2xl shadow-md p-6 text-white">
              <h4 class="text-2xl font-bold mb-4">Osobno unesene bilješke</h4>
              <p class="text-sm mb-6 opacity-90">Odjeceni / zaostatanh o lijeku/suplementu</p>

              <div class="grid grid-cols-2 gap-4">
                <div 
                  v-for="biljezka in biljezke" 
                  :key="biljezka.id"
                  class="bg-cyan-300/50 backdrop-blur rounded-xl p-4"
                >
                  <div class="flex items-start gap-3 mb-3">
                    <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                      <span class="text-2xl">{{ biljezka.ikona }}</span>
                    </div>
                    <div class="flex-1">
                      <h5 class="font-bold text-lg mb-1">{{ biljezka.naziv }}</h5>
                      <p class="text-xs opacity-90">{{ biljezka.kategorija }}</p>
                    </div>
                  </div>
                  <p class="text-sm leading-relaxed">{{ biljezka.tekst }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "../usluge/api";

const imeKorisnika = ref("Barbara");
const menuOpen = ref(false);

const idiNaPostavke = () => {
  menuOpen.value = false;
  router.push("/postavke");
};

const odjava = () => {
  localStorage.removeItem("token");
  menuOpen.value = false;
  router.push("/prijava");
};

const uzetiLijekovi = ref([
  {
    id: 1,
    naziv: "Aspirin",
    opis: "Utomanje od glavobolje",
    efekt: "Osjećaj djelovanja nakon 30 minuta"
  },
  {
    id: 2,
    naziv: "Multivitamins",
    opis: "Dieta suplement",
    efekt: "Osjećaj više energičnosti"
  },
  {
    id: 3,
    naziv: "Melatonin",
    opis: "Za probleme sa spavanjem",
    efekt: "Zabilježeno pomoćio sa kvalitetom sna"
  },
  {
    id: 4,
    naziv: "Željezo",
    opis: "Doze mikronutrient",
    efekt: "Manji osjećaj slabosti"
  }
]);

const biljezke = ref([
  {
    id: 1,
    naziv: "Aspirin",
    kategorija: "Otključaj svakodnevne",
    ikona: "💊",
    tekst: "Nakon uzimanja aspirina, moje su glavobolje nestale nakon oko 30 minuta. Djelovanje je brzo!"
  },
  {
    id: 2,
    naziv: "Melatonin",
    kategorija: "Potpuno za spavanje",
    ikona: "😴",
    tekst: "Melatonin mi je pomogao da brže zaspavam i da se dobro odmorim. Osjećam se puno sveže nakon!"
  },
  {
    id: 3,
    naziv: "Vitamin C",
    kategorija: "Green Energy Room",
    ikona: "🌿",
    tekst: "Vitamin C mi daje energiju kroz cio dan. Također sam primjetio da se rjeđe prehladujem."
  },
  {
    id: 4,
    naziv: "Željezo kapsule",
    kategorija: "Manji umor",
    ikona: "🔴",
    tekst: "Otkako sam započela željeza kapsule, primjetila sam poboljšanje u energiji. Manji osjećaji slabosti tijekom dana."
  }
]);



const preuzimiPDF = async () => {
  try {
    const response = await api.get("/izvjestaj/pdf", {
      responseType: 'blob'
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `PillUp_Izvjestaj_${new Date().toISOString().split('T')[0]}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Greška pri preuzimanju PDF-a:", error);
    alert("Došlo je do greške pri preuzimanju izvještaja");
  }
};

onMounted(async () => {
  try {
    const res = await api.get("/korisnik/profil");
    imeKorisnika.value = res.data.ime || "Korisnik";
    
    // Dohvati uzete lijekove
    const lijekoviRes = await api.get("/izvjestaj/uzeti-lijekovi");
    if (lijekoviRes.data) {
      uzetiLijekovi.value = lijekoviRes.data;
    }
    
    // Dohvati bilješke
    const biljezkeRes = await api.get("/izvjestaj/biljezke");
    if (biljezkeRes.data) {
      biljezke.value = biljezkeRes.data;
    }
  } catch (error) {
    console.error("Greška:", error);
  }
});
</script>
<style scoped></style>