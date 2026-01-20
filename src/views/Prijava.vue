<template>
  <div
    class="min-h-screen flex items-center justify-center bg-cover bg-center relative bg-gradient-to-br from-cyan-400 to-cyan-600"
  >
    <!-- Background overlay for better contrast -->
    <div class="absolute inset-0 bg-black/10"></div>
    
    <!-- Content -->
    <div class="relative z-10 w-full max-w-6xl mx-auto px-8 flex items-start justify-between gap-12">
      <div class="flex flex-col items-start pt-8">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <!-- Add your pill logo here or use an img tag -->
            <img src="/logo.webp" alt="PillUp" class="w-20 h-20" />
          </div>
          <div>
            <h1 class="text-5xl font-bold text-cyan-400 leading-tight" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.3)">
              Evidencija lijekova
            </h1>
            <h2 class="text-5xl font-bold text-cyan-300 leading-tight italic" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.3)">
              PillUp
            </h2>
          </div>
        </div>
        <p class="text-gray-600 text-lg font-medium bg-white/80 px-4 py-2 rounded-lg shadow">
          Evidentiraj svoje lijekove, nikad ne zaboravi terapiju!
        </p>
      </div>

      <!-- Login Card -->
      <div class="bg-gradient-to-br from-cyan-500 to-cyan-600 w-96 p-10 rounded-3xl text-white shadow-2xl">
        <h2 class="text-4xl font-bold text-center mb-8">Prijava</h2>

        <div class="mb-6">
          <label class="block text-sm font-semibold mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Unesite email"
            class="w-full p-3 rounded-lg text-gray-800 bg-gray-700/50 placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-cyan-300"
          />
        </div>

        <div class="mb-8">
          <label class="block text-sm font-semibold mb-2">Lozinka</label>
          <input
            v-model="lozinka"
            type="password"
            placeholder="Unesite lozinku"
            class="w-full p-3 rounded-lg text-gray-800 bg-gray-700/50 placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-cyan-300"
          />
        </div>

        <button
          @click="prijava"
          class="w-full bg-cyan-300 hover:bg-cyan-400 text-cyan-900 font-bold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Prijavi se
        </button>

        <p
          class="text-center text-sm mt-6 underline cursor-pointer hover:text-cyan-200 transition-colors"
          @click="$router.push('/registracija')"
        >
          Nemaš račun? Registriraj se
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../usluge/api";

const router = useRouter();
const email = ref("");
const lozinka = ref("");

const prijava = async () => {
  try {
    const res = await api.post("/autentikacija/prijava", {
      email: email.value,
      lozinka: lozinka.value
    });

    localStorage.setItem("token", res.data.token);
    
    // Preusmjeri na glavni zaslon
    router.push("/glavni");
  } catch (error) {
    console.error("Greška:", error);
    alert("Neispravni pristupni podaci");
  }
};
</script>
<style scoped>  </style>