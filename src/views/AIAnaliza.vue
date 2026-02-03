<template>
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
  <div class="min-h-screen bg-gray-50">
    <!-- Main Content -->
    <div class="p-8">
      <div class="max-w-7xl mx-auto">
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
                class="w-full text-left px-4 py-3 bg-cyan-50 text-cyan-600 rounded-lg font-semibold flex items-center gap-2"
              >
                <span>🧠</span> AI analiza
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
          <div class="col-span-9">
            <div class="mb-8">
              <h2 class="text-4xl font-bold text-cyan-600 mb-2">
                AI analiza 🧠
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

            <div class="bg-white rounded-xl shadow p-6 mb-6">
              <h3 class="text-xl font-semibold mb-2">
                AI analiza Vam poručuje:
              </h3>
              <p class="text-gray-700">
                Primijećeno je lošije raspoloženje u dane kada je terapija preskočena.
              </p>
            </div>

            <div class="bg-white rounded-xl shadow p-6">
              <h3 class="text-xl font-semibold mb-4">
                Pregled terapije (zadnjih 7 dana)
              </h3>

              <ul class="list-disc pl-6 text-gray-700 space-y-1">
                <li>Terapija uzeta na vrijeme: 62%</li>
                <li>Terapija uzeta do 1h kasnije: 23%</li>
                <li>Terapija preskočena: 15%</li>
              </ul>
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

const router = useRouter();

const imeKorisnika = ref("");
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

onMounted(async () => {
  try {
    const res = await api.get("/korisnik/profil");
    imeKorisnika.value = res.data.ime || "Korisnik";
  } catch (error) {
    console.error("Greška pri dohvaćanju profila:", error);
    imeKorisnika.value = "Korisnik";
  }
});
</script>
<style scoped></style>