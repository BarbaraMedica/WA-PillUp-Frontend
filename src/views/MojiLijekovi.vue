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
                class="w-full text-left px-4 py-3 bg-cyan-50 text-cyan-600 rounded-lg font-semibold flex items-center gap-2"
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

            <Kalendar/>
          </div>

          <!-- Main Content -->
          <div class="col-span-9">
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-2xl font-bold text-cyan-600">Moji lijekovi i suplementi</h3>
                <button 
                  @click="$router.push('/dodaj-lijek')"
                  class="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Dodaj novi
                </button>
              </div>

              <!-- Lijekovi Grid -->
              <div v-if="lijekovi.length > 0" class="grid grid-cols-3 gap-6">
                <div
                  v-for="lijek in lijekovi"
                  :key="lijek._id"
                  :class="[
                    'rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow',
                    lijek.preostalo <= 5 ? 'bg-red-50 border-2 border-red-400' : 'bg-cyan-50'
                  ]"
                >
                  <!-- Ikona lijeka -->
                  <div class="flex justify-center mb-4">
                    <div class="w-20 h-20 bg-gradient-to-br from-red-400 to-yellow-400 rounded-full flex items-center justify-center shadow-lg transform rotate-45">
                      <div class="w-16 h-16 bg-white rounded-full transform -rotate-45"></div>
                    </div>
                  </div>

                  <h4 class="text-xl font-bold text-center mb-2">{{ lijek.ime }}</h4>
                  <p class="text-center text-gray-600 mb-4">{{ lijek.doza }}</p>

                  <div class="space-y-2 text-sm text-gray-700">
                    <p><strong>Preostalo tableta:</strong> {{ lijek.preostalo }}</p>
                    <p v-if="lijek.preostalo <= 5" class="text-xs text-red-600"> Male zalihe - nabavi novi!</p>
                    <p><strong>Treba naručiti za:</strong> {{ izracunajDanaDoNarucivanja(lijek) }} dana</p>
                    <p class="text-xs text-gray-500">{{ lijek.ucestalost }}x dnevno - {{ lijek.vrijeme }}</p>
                  </div>

                  <div class="mt-4 flex gap-2">
                    <button 
                      @click="urediLijek(lijek._id)"
                      class="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg font-semibold transition-colors"
                    >
                      Uredi
                    </button>
                    <button 
                      @click="obrisiLijek(lijek._id)"
                      class="px-4 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg font-semibold transition-colors"
                    >
                      Izbriši
                    </button>
                  </div>
                </div>
              </div>

              <!-- Prazna lista -->
              <div v-else class="text-center py-12">
                <p class="text-gray-500 text-lg mb-4">Nemate dodanih lijekova ili suplemenata</p>
                <button 
                  @click="$router.push('/dodaj-lijek')"
                  class="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Dodaj prvi lijek
                </button>
              </div>
            </div>

            <!-- Filter sekcija -->
<div class="bg-white rounded-lg shadow-md p-6">
  <h3 class="text-xl font-bold text-cyan-600 mb-4">Zabilježi djelotvoni utjecaj</h3>
  <!-- Odabir lijeka -->
  <div class="mb-4">
    <label class="block text-sm font-semibold text-gray-700 mb-1">Za koji lijek/suplement?</label>
    <select 
      v-model="odabraniLijekId"
      class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
    >
      <option value="">-- Odaberite lijek --</option>
      <option v-for="lijek in lijekovi" :key="lijek._id" :value="lijek._id">
        {{ lijek.ime }} ({{ lijek.doza }})
      </option>
    </select>
  </div>
  <!-- Vrsta bilješke -->
  <div class="grid grid-cols-3 gap-4 mb-4">
    <button 
      :class="filter === 'djelotvornost' ? 'bg-cyan-600 text-white' : 'bg-gray-100'"
      @click="filter = 'djelotvornost'"
      class="px-4 py-2 rounded-lg font-semibold transition-colors"
    >
      Djelotvornost
    </button>
    <button 
      :class="filter === 'nuspojave' ? 'bg-cyan-600 text-white' : 'bg-gray-100'"
      @click="filter = 'nuspojave'"
      class="px-4 py-2 rounded-lg font-semibold transition-colors"
    >
      Nuspojave i blagotvorne učinke
    </button>
    <button 
      :class="filter === 'biljeska' ? 'bg-cyan-600 text-white' : 'bg-gray-100'"
      @click="filter = 'biljeska'"
      class="px-4 py-2 rounded-lg font-semibold transition-colors"
    >
      Bilješka
    </button>
  </div>
  <div class="bg-cyan-50 rounded-lg p-4">
    <p class="text-gray-700 mb-3">{{ filterOpis }}</p>
    <textarea 
      v-model="biljeska"
      placeholder="Unesite svoju bilješku..."
      class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      rows="3"
    ></textarea>
    <div class="flex items-center gap-3 mt-3">
      <button 
        @click="spreminiBiljesku"
        :disabled="spremavanjeUTijeku || !odabraniLijekId || !biljeska.trim()"
        class="bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold transition-colors"
      >
        {{ spremavanjeUTijeku ? 'Sprema se...' : 'Spremi unos' }}
      </button>
      <span v-if="porukaUspjeha" class="text-green-600 font-semibold">✅ Bilješka spremljena!</span>
      <span v-if="porukaGreske" class="text-red-600 font-semibold">❌ Greška pri spremanju</span>
    </div>
  </div>
  <!-- Prikaz prethodnih bilješki -->
  <div v-if="biljeske.length > 0" class="mt-6">
    <h4 class="font-bold text-gray-700 mb-3">Prethodne bilješke</h4>
    <div class="space-y-3 max-h-60 overflow-y-auto">
      <div 
        v-for="b in biljeske" 
        :key="b._id"
        class="bg-gray-50 rounded-lg p-3 border-l-4 border-cyan-400"
      >
        <div class="flex items-center justify-between mb-1">
          <span class="font-semibold text-sm text-cyan-700">{{ b.lijek_ime || 'Nepoznat lijek' }}</span>
          <span class="text-xs text-gray-400 capitalize">{{ b.vrsta }}</span>
        </div>
        <p class="text-sm text-gray-700">{{ b.tekst }}</p>
        <p class="text-xs text-gray-400 mt-1">{{ formatirajDatum(b.createdAt) }}</p>
      </div>
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

const imeKorisnika = ref("Korisnik");
const lijekovi = ref([]);
const filter = ref('djelotvornost');
const menuOpen = ref(false);
const trenutniDatum = ref("");
const trenutnoVrijeme = ref("");
const odabraniLijekId = ref('');
const biljeska = ref('');
const biljeske = ref([]);
const spremavanjeUTijeku = ref(false);
const porukaUspjeha = ref(false);
const porukaGreske = ref(false);

const filterOpis = computed(() => {
  const opisi = {
    djelotvornost: 'Ocijenite koliko vam lijek/suplement pomaže kod simptoma zbog kojih ste ga počeli uzimati.',
    nuspojave: 'Zabilježite sve nuspojave ili blagotvorne učinke koje primjećujete.',
    biljeska: 'Dodatna opažanja i napomene o lijeku.'
  };
  return opisi[filter.value];
});

const idiNaPostavke = () => {
  menuOpen.value = false;
  router.push("/postavke");
};

const odjava = () => {
  menuOpen.value = false;
  router.push("/glavni");
};

const dohvatiLijekove = async () => {
  try {
    const res = await api.get("/lijekovi");
    lijekovi.value = res.data;
  } catch (error) {
    console.error("Greška pri dohvaćanju lijekova:", error);
  }
};

const urediLijek = (id) => {
  router.push(`/uredi-lijek/${id}`);
};

const obrisiLijek = async (id) => {
  if (!id) {
    console.error("Greška: ID lijeka nije definiran");
    return;
  }
  if (confirm("Jeste li sigurni da želite obrisati ovaj lijek?")) {
    try {
      await api.delete(`/lijekovi/${id}`);
      await dohvatiLijekove(); // osvježava listu lijekova
    } catch (error) {
      console.error("Greška pri brisanju lijeka:", error);
      alert("Došlo je do greške pri brisanju lijeka");
    }
  }
};

const izracunajDanaDoNarucivanja = (lijek) => {
  if (lijek.preostalo == null || lijek.ucestalost == null) return 'N/A';
  return Math.floor(lijek.preostalo / lijek.ucestalost);
};

const spreminiBiljesku = async () => {
  if (!odabraniLijekId.value || !biljeska.value.trim()) return;
  spremavanjeUTijeku.value = true;
  porukaUspjeha.value = false;
  porukaGreske.value = false;
  try {
    await api.post("/biljeske", {
      lijek_id: odabraniLijekId.value,
      vrsta: filter.value,
      tekst: biljeska.value.trim(),
    });
    biljeska.value = '';
    odabraniLijekId.value = '';
    porukaUspjeha.value = true;
    setTimeout(() => (porukaUspjeha.value = false), 3000);
    await dohvatiBiljeske();
  } catch (error) {
    console.error("Greška pri spremanju bilješke:", error);
    porukaGreske.value = true;
    setTimeout(() => (porukaGreske.value = false), 3000);
  } finally {
    spremavanjeUTijeku.value = false;
  }
};

const dohvatiBiljeske = async () => {
  try {
    const res = await api.get("/biljeske");
    console.log(res.data);
    biljeske.value = res.data;
  } catch (error) {
    console.error("Greška pri dohvaćanju bilješki:", error);
  }
};

const imeLijekaPoId = (id) => {
  const lijek = lijekovi.value.find(l => l._id === id);
  return lijek ? lijek.ime : 'Nepoznat lijek';
};

const formatirajDatum = (datum) => {
  if (!datum) return '';
  return new Date(datum).toLocaleString('hr-HR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};

const azurirajVrijeme = () => {
  const sada = new Date();
  const danTjedna = sada.toLocaleDateString("hr-HR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  trenutniDatum.value = danTjedna;
  const sati = String(sada.getHours()).padStart(2, '0');
  const minute = String(sada.getMinutes()).padStart(2, '0');
  trenutnoVrijeme.value = `${sati}:${minute}`;
};

onMounted(async () => {
  azurirajVrijeme();
  setInterval(azurirajVrijeme, 1000);
  try {
    const res = await api.get("/korisnik/profil");
    imeKorisnika.value = res.data.ime || "Korisnik";
  } catch (error) {
    console.error("Greška:", error);
  }
  await dohvatiLijekove();
  await dohvatiBiljeske();
});
</script>
<style scoped></style>