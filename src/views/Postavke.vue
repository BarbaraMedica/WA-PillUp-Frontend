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
                @click="$router.push('/pdf-izvjestaj')"
                class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-2"
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
              class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-2">
                <span>📈</span> Moja statistika
              </button>
              <button 
                @click="$router.push('/postavke')"
                class="w-full text-left px-4 py-3 bg-cyan-50 text-cyan-600 rounded-lg font-semibold flex items-center gap-2"
              >
                <span>⚙️</span> Postavke
              </button>
            </nav>

            <Kalendar />
          </div>

          <!-- Main Content -->
          <div class="col-span-9">
            <!-- Postavi ime -->
            <div class="bg-white rounded-3xl p-8 shadow-xl mb-6">
              <h3 class="text-2xl font-bold text-gray-800 mb-6">Postavi ime</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Vaše ime</label>
                  <input
                    v-model="novoIme"
                    type="text"
                    placeholder="Unesite vaše ime"
                    class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <button
                  @click="spremiIme"
                  class="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Spremi ime
                </button>
              </div>
            </div>

            <div class="bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-3xl p-8 shadow-xl text-white">
              <h3 class="text-3xl font-bold text-center mb-8">Personalizacija podsjetnika</h3>

              <!-- Lista lijekova s podsjetnicima -->
              <div class="space-y-4">
                <div 
                  v-for="lijek in lijekovi" 
                  :key="lijek.id"
                  class="bg-white/95 rounded-2xl p-5 flex items-center justify-between shadow-md"
                >
                  <!-- Ikona i info -->
                  <div class="flex items-center gap-4">
                    <div class="w-14 h-14 bg-gradient-to-br from-red-400 to-yellow-400 rounded-full flex items-center justify-center shadow-md transform rotate-45">
                      <div class="w-10 h-10 bg-white rounded-full transform -rotate-45"></div>
                    </div>
                    <div>
                      <h4 class="text-lg font-bold text-gray-800">{{ lijek.ime }}</h4>
                      <p class="text-sm text-gray-600">{{ lijek.doza }}</p>
                    </div>
                  </div>

                  <!-- Vrijeme i akcije -->
                  <div class="flex items-center gap-4">
                    <span class="font-semibold text-gray-700">{{ lijek.vrijeme }}</span>
                    <button 
                      @click="urediPodsjetnik(lijek.id)"
                      class="bg-cyan-400 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-sm"
                    >
                      Uredi
                    </button>
                    <button 
                      @click="togglePodsjetnik(lijek.id)"
                      class="w-12 h-12 bg-gray-800 hover:bg-gray-900 rounded-lg flex items-center justify-center text-white transition-colors"
                    >
                      ⏸
                    </button>
                  </div>
                </div>
              </div>

              <!-- Prazan state -->
              <div v-if="lijekovi.length === 0" class="text-center py-12">
                <p class="text-lg mb-4">Nemate postavljenih podsjetnika</p>
                <button 
                  @click="$router.push('/dodaj-lijek')"
                  class="bg-white text-cyan-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Dodaj prvi lijek s podsjetnikom
                </button>
              </div>
            </div>

            <!-- Dodatne postavke -->
            <div class="mt-6 bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-cyan-600 mb-6">Općenite postavke obavijesti</h3>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 class="font-semibold text-gray-800">Zvučne obavijesti</h4>
                    <p class="text-sm text-gray-600">Pušta zvuk kada dođe vrijeme za lijek</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="postavke.zvuk" class="sr-only peer">
                    <div class="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>

                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 class="font-semibold text-gray-800">Push notifikacije</h4>
                    <p class="text-sm text-gray-600">Primaj obavijesti i kada aplikacija nije otvorena</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="postavke.push" class="sr-only peer">
                    <div class="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>

                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 class="font-semibold text-gray-800">Email podsjetnici</h4>
                    <p class="text-sm text-gray-600">Primaj dnevni sažetak na email</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="postavke.email" class="sr-only peer">
                    <div class="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>
              </div>

              <button 
                @click="spremiPostavke"
                class="mt-6 w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Spremi promjene
              </button>
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
const imeKorisnika = ref("Barbara");
const lijekovi = ref([]);
const trenutniDatum = ref("");
const trenutnoVrijeme = ref("");

const postavke = ref({
  zvuk: true,
  push: true,
  email: false
});
const menuOpen = ref(false);
const novoIme = ref("");



const idiNaPostavke = () => {
  menuOpen.value = false;
  // Already in postavke, maybe do nothing or refresh
};

const odjava = () => {
  localStorage.removeItem("token");
  menuOpen.value = false;
  router.push("/prijava");
};

const spremiIme = async () => {
  if (!novoIme.value.trim()) {
    alert("Molimo unesite ime");
    return;
  }
  try {
    await api.post("/korisnik/postavi-ime", { ime: novoIme.value });
    imeKorisnika.value = novoIme.value;
    alert("Ime uspješno spremljeno");
  } catch (error) {
    console.error("Greška pri spremanju imena:", error);
    alert("Greška pri spremanju imena");
  }
};

const urediPodsjetnik = (id) => {
  router.push(`/uredi-podsjetnik/${id}`);
};

const togglePodsjetnik = async (id) => {
  try {
    await api.patch(`/lijekovi/${id}/toggle-podsjetnik`);
    alert("Podsjetnik pauziran");
  } catch (error) {
    console.error("Greška:", error);
  }
};

const spremiPostavke = async () => {
  try {
    await api.post("/korisnik/postavke", postavke.value);
    alert("Postavke uspješno spremljene!");
  } catch (error) {
    console.error("Greška pri spremanju postavki:", error);
    alert("Došlo je do greške");
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
    novoIme.value = imeKorisnika.value;
    
    // Dohvati lijekove s podsjetnicima
    const lijekoviRes = await api.get("/lijekovi/sa-podsjetnicima");
    lijekovi.value = lijekoviRes.data;
    
    // Dohvati postavke
    const postavkeRes = await api.get("/korisnik/postavke");
    postavke.value = postavkeRes.data;
  } catch (error) {
    console.error("Greška:", error);
  }
});
</script>
<style scoped></style>