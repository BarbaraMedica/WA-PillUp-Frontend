<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto grid grid-cols-12 gap-6">

      <!-- SIDEBAR -->
      <aside class="col-span-3 bg-cyan-600 text-white rounded-xl p-4">
        <h2 class="text-xl font-bold mb-4">PillUp</h2>

        <nav class="space-y-2">
          <button class="w-full text-left px-3 py-2 rounded hover:bg-cyan-500">
            📅 Početna – dnevni raspored
          </button>
          <button class="w-full text-left px-3 py-2 rounded hover:bg-cyan-500">
            💊 Moji lijekovi/suplementi
          </button>
          <button class="w-full text-left px-3 py-2 rounded bg-cyan-500 font-semibold">
            ➕ Dodaj lijek/suplement
          </button>
          <button class="w-full text-left px-3 py-2 rounded hover:bg-cyan-500">
            🤖 AI analiza
          </button>
        </nav>

        <!-- KALENDAR (jednostavan placeholder) -->
        <div class="mt-6 bg-white text-gray-800 rounded-lg p-3">
          <h3 class="font-semibold mb-2 text-center">Kalendar</h3>
          <p class="text-sm text-center">Rujan 2025</p>
        </div>
      </aside>

      <!-- GLAVNI SADRŽAJ -->
      <main class="col-span-9 bg-white rounded-xl shadow p-6">
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
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
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

const spremiLijek = async () => {
  try {
    await api.post("/lijekovi", {
      ime: ime.value,
      doza: doza.value,
      vrijeme: vrijeme.value,
      kolicina: kolicina.value,
      trajanje: trajanje.value,
      nacin: "oralno",
      preostalo: kolicina.value
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
