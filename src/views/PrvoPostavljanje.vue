<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-cyan-600 mb-6">Prvo postavljanje</h1>
      
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="mb-6">
          <label class="block text-gray-700 font-semibold mb-2">Vaše ime</label>
          <input
            v-model="ime"
            type="text"
            placeholder="Unesite svoje ime"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <button
          @click="spremiPodatke"
          class="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Nastavi
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../usluge/api";

const router = useRouter();
const ime = ref("");

const spremiPodatke = async () => {
  if (!ime.value.trim()) {
    alert("Molimo unesite svoje ime");
    return;
  }

  try {
    // Spremi ime na backend
    await api.post("/korisnik/postavi-ime", {
      ime: ime.value
    });

    // Preusmjeri na glavni zaslon
    router.push("/glavni");
  } catch (error) {
    console.error("Greška:", error);
    alert("Došlo je do greške");
  }
};
</script>