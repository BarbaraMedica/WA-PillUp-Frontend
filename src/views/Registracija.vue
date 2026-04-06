<template>
  <div
    class="min-h-screen flex items-center justify-center bg-cover bg-center bg-gradient-to-br from-cyan-400 to-cyan-600"
  >
    <div class="relative z-10 w-full max-w-6xl mx-auto px-8 flex items-start justify-between gap-12">
      <div class="flex flex-col items-start pt-8">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-lg">
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

        <div v-if="error" class="bg-red-500 text-white p-3 rounded-lg mb-4 text-sm">
          {{ error }}
        </div>

        <button
          @click="registracija"
          :disabled="loading"
          class="w-full bg-cyan-300 hover:bg-cyan-400 text-white font-semibold py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed mb-2"
        >
          {{ loading ? "Registriranje..." : "Registriraj se" }}
        </button>

        <button
          @click="idiNaPrijavu"
          :disabled="loading"
          class="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Nazad na prijavu
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
const email = ref("");
const lozinka = ref("");
const error = ref("");
const loading = ref(false);

const validateForm = () => {
  error.value = "";
  
  if (!email.value) {
    error.value = "Email je obavezan";
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    error.value = "Email nije ispravnog formata";
    return false;
  }
  
  if (!lozinka.value) {
    error.value = "Lozinka je obavezna";
    return false;
  }
  
  if (lozinka.value.length < 6) {
    error.value = "Lozinka mora imati najmanje 6 znakova";
    return false;
  }
  
  return true;
};

const registracija = async () => {
  if (!validateForm()) {
    return;
  }
  
  loading.value = true;
  error.value = "";
  
  try {
    const response = await api.post("/autentikacija/registracija", {
      email: email.value,
      lozinka: lozinka.value
    });

    console.log("Registracija uspješna:", response.data);

    const loginResponse = await api.post("/autentikacija/prijava", {
      email: email.value,
      lozinka: lozinka.value
    });

    localStorage.setItem("token", loginResponse.data.token);
    await router.push("/prvo-postavljanje");
  } catch (err) {
    console.error("Greška pri registraciji:", err);
    
    if (err.response?.data?.errors) {
      error.value = err.response.data.errors.map(e => e.msg).join(", ");
    } else if (err.response?.data?.msg) {
      error.value = err.response.data.msg;
    } else {
      error.value = "Greška pri registraciji - pokušajte ponovno";
    }
  } finally {
    loading.value = false;
  }
};

const idiNaPrijavu = () => {
  router.push("/");
};
</script>
<style scoped></style>