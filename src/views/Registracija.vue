<template>
  <div
    class="min-h-screen flex items-center justify-center bg-cover bg-center"
    style="background-image: url('/pills.jpg')"
  >
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

      <div class="bg-cyan-600/90 w-80 p-8 rounded-3xl text-white shadow-xl">
        <h2 class="text-2xl font-bold text-center mb-6">Registracija</h2>

        <input
          v-model="email"
          type="email"
          placeholder="Unesite email"
          class="w-full p-2 mb-4 rounded-md text-gray-800"
        />

        <input
          v-model="lozinka"
          type="password"
          placeholder="Unesite lozinku"
          class="w-full p-2 rounded-md text-gray-800"
        />

        <p class="text-xs mt-1 mb-4">
          Lozinka mora imati najmanje 6 znakova
        </p>

        <button
          @click="registracija"
          class="w-full bg-cyan-300 hover:bg-cyan-400 text-white font-semibold py-2 rounded-lg"
        >
          Registriraj se
        </button>
      </div>
    </div> <!-- Close the max-w-6xl container -->
  </div> <!-- Close the min-h-screen container -->
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../usluge/api";

const router = useRouter();
const email = ref("");
const lozinka = ref("");

const registracija = async () => {
  try {
    await api.post("/autentikacija/registracija", {
      email: email.value,
      lozinka: lozinka.value
    });

    // Preusmjeri na prvo postavljanje
    router.push("/prvo-postavljanje");
  } catch (error) {
    console.error("Greška:", error);
    alert("Došlo je do greške pri registraciji");
  }
};
</script>
<style scoped></style>