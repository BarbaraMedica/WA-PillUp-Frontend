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
                class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-2"
              >
                <span>💊</span> Moji lijekovi/suplementi
              </button>
              <button 
                class="w-full text-left px-4 py-3 bg-cyan-50 text-cyan-600 rounded-lg font-semibold flex items-center gap-2"
              >
                <span>➕</span> Dodaj lijek/suplement
              </button>
              <button 
                @click="$router.push('/pdf-izvjestaj')"
                class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-2"
                >
                <span>📊</span> PDF Izvještaj
                </button>
              <button class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-2">
                <span>📈</span> Moja statistika
              </button>
              <button 
                @click="$router.push('/postavke')"
                class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-2"
                >
                <span>⚙️</span> Postavke
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
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 class="text-3xl font-bold text-cyan-600 mb-4">
                Dodavanje lijeka / suplementa
              </h1>

              <h2 class="text-xl font-semibold mb-6 text-gray-700">
                Trenutni lijek
              </h2>

              <div class="grid grid-cols-2 gap-6">

                <!-- LIJEVA STRANA -->
                <div class="space-y-4">
                  <div>
                    <label class="block font-semibold mb-1">Naziv lijeka</label>
                    <input v-model="ime" class="input" placeholder="Npr. Aspirin" />
                  </div>

                  <div>
                    <label class="block font-semibold mb-1">Učestalost uzimanja</label>
                    <select v-model="ucestalost" class="input">
                      <option disabled value="">Odaberi</option>
                <option value="1">1x dnevno</option>
                <option value="2">2x dnevno</option>
                <option value="3">3x dnevno</option>
              </select>
            </div>

            <div>
              <label class="block font-semibold mb-1">Doza</label>
              <input v-model="doza" class="input" placeholder="Npr. 275mg" />
            </div>

            <div>
              <label class="block font-semibold mb-1">
                Koliko tableta/kapsula sadrži pakiranje
              </label>
              <input
                v-model.number="kolicina"
                type="number"
                class="input"
                placeholder="Npr. 20"
              />
            </div>

            <label class="flex items-center gap-2 text-sm">
              <input type="checkbox" v-model="podsjetnik" />
              Želim podsjetnike na uzimanje ovog lijeka
            </label>
          </div>

          <!-- DESNA STRANA -->
          <div class="space-y-4">
            <div class="bg-cyan-100 rounded-xl p-4 text-center">
              <p class="font-semibold mb-2">
                Unesi preferirano vrijeme uzimanja lijeka
              </p>

              <input
                type="time"
                v-model="vrijeme"
                class="text-2xl text-center rounded-lg p-2"
              />
            </div>

            <div class="bg-cyan-100 rounded-xl p-4">
              <label class="block font-semibold mb-1">
                Podsjetnik na podizanje lijeka
              </label>
              <select v-model="trajanje" class="input">
                <option value="3">3 dana prije</option>
                <option value="5">5 dana prije</option>
                <option value="7">7 dana prije</option>
              </select>
            </div>
          </div>
        </div>

        <button
          @click="spremiLijek"
          class="mt-8 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl"
        >
          Spremi informacije o lijeku
        </button>
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

const ime = ref("");
const ucestalost = ref("");
const doza = ref("");
const vrijeme = ref("08:00");
const kolicina = ref(null);
const trajanje = ref(3);
const podsjetnik = ref(true);

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
  } catch (err) {
    console.error("Greška pri dohvaćanju profila:", err);
  }
});

const spremiLijek = async () => {
  try {
    await api.post("/lijekovi", {
      ime: ime.value,
      doza: doza.value,
      vrijeme: vrijeme.value,
      kolicina: kolicina.value,
      trajanje: trajanje.value,
      nacin: "oralno",
      preostalo: kolicina.value,
      podsjetnik: podsjetnik.value
    });

    alert("Lijek uspješno spremljen");
    router.push("/glavni");
  } catch (err) {
    console.error(err);
    alert("Greška pri spremanju lijeka");
  }
};
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
}
</style>
