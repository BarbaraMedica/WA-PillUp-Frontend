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
              {{ trenutniDatum }}
            </span>
            <span class="bg-cyan-100 text-cyan-600 px-4 py-2 rounded-full font-semibold">
              {{ trenutnoVrijeme }}
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
              @click="router.push('/ai-analiza')"
              class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-2"
            >
               <span>🧠</span> AI analiza
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
            </nav>

            <div class="mt-6">
              <Kalendar />
             </div>
          </div>

          <!-- Main Content -->
          <div class="col-span-9 space-y-6">
            <div class="flex items-center justify-between">
              <h3 class="text-3xl font-bold text-cyan-600">Izvještaj</h3>
              <button 
                @click="preuzimiPDF"
                class="bg-white border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Preuzmi PDF dokument
              </button>
            </div>

            <!-- Uzeti lijekovi/suplementi -->
            <div class="bg-white rounded-2xl shadow-md p-6">
              <h4 class="text-2xl font-bold text-cyan-600 mb-4">
                Uzeti lijekovi / suplementi
              </h4>
              <p class="text-gray-600 mb-6">
                Prikaz povijesti uzimanja lijekova
              </p>

              <div v-if="uzetiLijekovi.length === 0" class="text-gray-500">
                Nema podataka o uzimanju lijekova.
              </div>

              <div class="space-y-4">
                <div
                  v-for="u in uzetiLijekovi"
                  :key="u._id"
                  class="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
                >
                  <!-- LIJEVI DIO -->
                  <div>
                    <h5 class="font-bold text-gray-800 text-lg">
                      {{ u.lijek?.ime || "Nepoznat lijek" }}
                    </h5>

                    <p class="text-sm text-gray-600 mt-1">
                      Doza: <span class="font-medium">{{ u.lijek?.doza || "Nije uneseno" }}</span> |
                      Način: <span class="font-medium">{{ u.lijek?.nacin || "Nije uneseno" }}</span> |
                      Preostalo: <span class="font-medium">{{ u.lijek?.preostalo ?? "Nije uneseno" }}</span>
                    </p>

                    <p class="text-xs text-gray-500 mt-1">
                      {{ new Date(u.datum).toLocaleDateString("hr-HR") }}
                      u {{ u.vrijeme || "--:--" }}
                    </p>
                  </div>

                  <!-- DESNI DIO -->
                  <div>
                    <span
                      class="px-3 py-1 rounded-full text-sm font-semibold"
                      :class="u.status === 'uzet'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'"
                    >
                      {{ u.status === "uzet" ? "Uzeto" : "Preskočeno" }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Osobno unesene bilješke -->
            <div class="bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-2xl shadow-md p-6 text-white">
              <h4 class="text-2xl font-bold mb-4">Osobno unesene bilješke</h4>
              <p class="text-sm mb-6 opacity-90">Dojmovi o lijeku/suplementu</p>

              <div class="grid grid-cols-2 gap-4">
                <div v-for="biljeska in biljeske" :key="biljeska._id" class="bg-cyan-300/50 backdrop-blur rounded-xl p-4">
                  <h5 class="font-bold text-lg mb-1">
                    {{ biljeska.lijek_id ? biljeska.lijek_id.ime : "Nije vezano uz lijek" }}
                    <span class="text-sm opacity-70">({{ biljeska.lijek_id?.doza || "—" }})</span>
                  </h5>
                  <p class="text-xs opacity-90">{{ biljeska.vrsta }}</p>
                  <p class="text-sm leading-relaxed mt-2">{{ biljeska.tekst }}</p>
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
import { useRouter } from "vue-router";
import Kalendar from "@/components/Kalendar.vue";

const router = useRouter();
const imeKorisnika = ref("");
const menuOpen = ref(false);
const trenutniDatum = ref("");
const trenutnoVrijeme = ref("");

const idiNaPostavke = () => {
  menuOpen.value = false;
  router.push("/postavke");
};

const odjava = () => {
  menuOpen.value = false;
  router.push("/glavni");
};

const uzetiLijekovi = ref([]);

const biljeske = ref([]);
  



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

const azurirajVrijeme = () => {
  const sada = new Date();
  
  // Format: samo dan tjedna i vrijeme (npr. "Pon, 19:23")
  const danTjedna = sada.toLocaleDateString("hr-HR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  
  // Format vremena: "19:23"
  const sati = String(sada.getHours()).padStart(2, '0');
  const minute = String(sada.getMinutes()).padStart(2, '0');
  
  trenutniDatum.value = danTjedna;
  trenutnoVrijeme.value = `${sati}:${minute}`;
};

onMounted(async () => {
  // Ažuriraj vrijeme odmah
  azurirajVrijeme();
  // Ažuriraj vrijeme svaku sekun
  setInterval(azurirajVrijeme, 1000);
  
  try {
    const res = await api.get("/korisnik/profil");
    imeKorisnika.value = res.data.ime || "Korisnik";
    
    // Dohvati uzete lijekove
    const lijekoviRes = await api.get("/izvjestaj/uzeti-lijekovi");
    if (lijekoviRes.data) {
      uzetiLijekovi.value = lijekoviRes.data;
    }
    
    // Dohvati bilješke
    const biljeskeRes = await api.get("/izvjestaj/biljeske");
    if (biljeskeRes.data) {
      biljeske.value = biljeskeRes.data;
    }
  } catch (error) {
    console.error("Greška:", error);
  }
});
</script>
<style scoped></style>