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

        <!-- Sidebar and Content Grid -->
        <div class="grid grid-cols-12 gap-6">
          <!-- Sidebar -->
          <div class="col-span-3 bg-white rounded-lg shadow-md p-4">
            <nav class="space-y-2">
              <button class="w-full text-left px-4 py-3 bg-cyan-50 text-cyan-600 rounded-lg font-semibold flex items-center gap-2">
                <span>📅</span> Početna - dnevni raspored
              </button>
              <button 
                @click="$router.push('/moji-lijekovi')"
                class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-2"
              >
                <span>💊</span> Moji lijekovi/suplementi
              </button>
              <button
               @click="$router.push('/dodaj-lijek')"
               class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-2">
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
              @click="router.push('/statistika')"
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

            <div class="mt-6 bg-cyan-50 rounded-lg p-4">
              <h3 class="font-bold text-center mb-3">Kalendar</h3>
              <div class="mt-6">
                <Kalendar />
                </div>
            </div>
          </div>

          <div class="col-span-9 bg-light-blue-50 rounded-lg shadow-md p-6 border-cyan-200 bg-gray-100">
            <h3 class="text-2xl font-bold text-black-600 mb-4">Današnji raspored</h3>
            <p class="text-gray-600 mb-6">
              Za najbolje rezultate nastojte se držati rasporeda kojeg ste stvorili. 
              Ukoliko uzimate lijekove na recept obavezno unesite informacije prema receptu.
            </p>

            <!-- Raspored lijekova -->
            <div class="space-y-4 border border-cyan-200 bg-white rounded-lg p-4">
              <div
                v-for="lijek in lijekovi"
                :key="lijek._id"
                class="flex items-center justify-between p-4 bg-cyan-50 rounded-lg"
              >
                <div class="flex items-center gap-4">
                  <span class="font-semibold text-cyan-600">{{ lijek.vrijeme }}</span>
                  <span class="font-medium">{{ lijek.ime }}</span>
                </div>
                <div class="flex items-center gap-4">
                  <span class="text-gray-600">{{ lijek.doza }}</span>
                  <input 
                    type="checkbox" 
                    class="w-5 h-5 text-cyan-600" 
                    @change="potvrdiUzimanje(lijek._id, lijek.vrijeme, index)"
                  />
                </div>
              </div>
            </div>
            <!-- Raspoloženja -->
            <div class="mt-6 bg-cyan-50 rounded-lg p-4">
              <h3 class="font-bold mb-3 text-center">Raspoloženje</h3>
              <div class="flex flex-wrap gap-3 justify-center">
                <button
                    v-for="(raspolozenje, index) in raspolozenja"
                    :key="index"
                    @click="() => { potvrdiRaspolozenje(index); spremiRaspolozenje(raspolozenje) }"
                    :class="[
                      'flex flex-col items-center justify-center px-5 py-4 rounded-xl font-semibold transition-all duration-200',
                      raspolozenje.odabrano 
                        ? 'bg-cyan-600 text-white scale-105 shadow-md' 
                        : 'bg-white text-cyan-600 border border-cyan-200 hover:scale-105'
                    ]"
                  >
                  <span class="text-3xl">{{ raspolozenje.emoji }}</span>  <span class="text-sm">{{ raspolozenje.ime }}</span>
                </button>
              </div>
            </div>

            <!-- Tegobe -->
            <div class="mt-6 bg-cyan-50 rounded-lg p-4">
              <h3 class="font-bold mb-3 text-center">Tegobe</h3>
              <div class="flex flex-wrap gap-3 justify-center">
                <button
                  v-for="(tegoba, index) in tegobe"
                  :key="index"
                  @click="() => { potvrdiTegobu(index); spremiTegobu(tegoba.ime) }"
                  :class="[
                    'flex flex-col items-center justify-center px-5 py-4 rounded-xl font-semibold transition-all duration-200',
                    tegoba.odabrano 
                      ? 'bg-red-600 text-white scale-105 shadow-md' 
                      : 'bg-white text-red-600 border border-red-200 hover:scale-105'
                  ]"
                >
                  <span class="text-3xl">{{ tegoba.emoji }}</span>  <span class="text-sm">{{ tegoba.ime }}</span>
                </button>
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
import Kalendar from "../components/Kalendar.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const imeKorisnika = ref("");
const lijekovi = ref([]);
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

const azurirajVrijeme = () => {
  const sada = new Date();
  
  const danTjedna = sada.toLocaleDateString("hr-HR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  
  // Format vremena: "19:23"
  const sati = String(sada.getHours()).padStart(2, '0');
  const minute = String(sada.getMinutes()).padStart(2, '0');
  
  trenutniDatum.value = danTjedna;
  trenutnoVrijeme.value = `${sati}:${minute}`;
};

const potvrdiUzimanje = async (lijekId, vrijeme) => {
  try {
    await api.post(`/lijekovi/${lijekId}/uzimanje`, { vrijeme });
    await api.get("/statistika/uzimanje");
    alert("Uzimanje lijeka potvrđeno!");
    
    const lijekoviRes = await api.get("/lijekovi");
    lijekovi.value = lijekoviRes.data;
  } catch (error) {
    console.error("Greška pri potvrdi uzimanja:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Status:", error.response.status);
    }
    alert("Greška pri potvrdi uzimanja");
  }
};
//donji dio emojii sa getemoji.com
//treba povezati sa statistikom i AI analizom
const raspolozenja = ref([
  { ime: "Sretan", emoji: "😄", stanje:"pozitivno", odabrano: false },
  { ime: "Tužan", emoji: "😢", stanje:"negativno", odabrano: false },
  { ime: "Umoran", emoji: "😴", stanje:"negativno", odabrano: false },
  { ime: "Uznemiren", emoji: "😟", stanje:"negativno", odabrano: false },
  { ime: "Anksiozan", emoji: "😰", stanje:"negativno", odabrano: false },
  { ime: "Raspoložen", emoji: "😊", stanje:"pozitivno", odabrano: false },
  { ime: "Opušten", emoji: "😌", stanje:"pozitivno", odabrano: false },
  { ime: "Normalno", emoji: "😊", stanje:"neutralno", odabrano: false },
]);

const tegobe = ref([
  { ime: "Nesanica", emoji: "😴", odabrano: false },
  { ime: "Glavobolja", emoji: "🤕", odabrano: false },
  { ime: "Mučnina", emoji: "🤢", odabrano: false },
  { ime: "Bol u mišićima", emoji: "👎", odabrano: false },
  { ime: "Probavne smetnje", emoji: "🍽️", odabrano: false },
  { ime: "Prehlada", emoji: "🤧", odabrano: false },
  { ime: "Povišena temperatura", emoji: "🌡️", odabrano: false },
  { ime: "Vrtoglavica", emoji: "😵‍💫", odabrano: false },
]);

const potvrdiRaspolozenje = (index) => {
  raspolozenja.value[index].odabrano = !raspolozenja.value[index].odabrano;
};

const potvrdiTegobu = (index) => {
  tegobe.value[index].odabrano = !tegobe.value[index].odabrano;
};
const spremiRaspolozenje = async (raspolozenjeObj) => {
  try {
    await api.post("/raspolozenja", {
      datum: new Date(),
      raspolozenje: raspolozenjeObj.ime,
      stanje: raspolozenjeObj.stanje
    });
    alert("Raspoloženje spremljeno!");
  } catch (error) {
    console.error("Greška pri spremanju raspoloženja:", error);
    alert("Greška pri spremanju raspoloženja");
  }
};

const spremiTegobu = async (tegoba) => {
  try {
    await api.post("/tegobe", {
      datum: new Date(),
      tegoba: tegoba
    });
    alert("Tegoba spremljena!");
  } catch (error) {
    console.error("Greška pri spremanju tegobe:", error);
    alert("Greška pri spremanju tegobe");
  }
};

onMounted(async () => {
  // Ažuriraj vrijeme odmah
  azurirajVrijeme();
  // Ažuriraj vrijeme svaku sekun
  setInterval(azurirajVrijeme, 1000);
  
  try {
    // Dohvati profil korisnika
    const resLijekovi = await api.get("/lijekovi");
    const sviLijekovi = resLijekovi.data;
    const uzimanjaRes = await api.get("/lijekovi/danasnja-uzimanja");
    const popijenoDanas = uzimanjaRes.data;
    lijekovi.value = sviLijekovi.map(l => {
    const zapis = popijenoDanas.find(u => String(u.lijek) === String(l._id));
    return {
      ...l,
      uzetDanas: !!zapis,
      statusUzimanja: zapis ? zapis.status : null
    };
    });

    const profilRes = await api.get("/korisnik/profil");
    imeKorisnika.value = profilRes.data.ime || "Korisnik";
  } catch (error) {
    console.error("Greška:", error);
  }
});
</script>
<style scoped></style>