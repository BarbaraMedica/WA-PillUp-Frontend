<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center gap-3 mb-6">
          <button @click="$router.back()" class="text-gray-500 hover:text-cyan-600">
             Natrag
          </button>
          <h2 class="text-2xl font-bold text-cyan-600">Uredi lijek</h2>
        </div>

        <div v-if="ucitavanje" class="text-center py-12 text-gray-500">
          Učitavanje...
        </div>

        <form v-else @submit.prevent="spremiPromjene" class="space-y-4">
          <!-- Ime -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Naziv lijeka</label>
            <input
              v-model="forma.ime"
              type="text"
              required
              class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <!-- Doza -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Doza</label>
            <input
              v-model="forma.doza"
              type="text"
              placeholder="npr. 500mg"
              class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <!-- Vrijeme -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Vrijeme uzimanja</label>
            <input
              v-model="forma.vrijeme"
              type="time"
              class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <!-- Način primjene -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Način primjene</label>
            <select
              v-model="forma.nacin"
              class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
            >
              <option value="oralno">Oralno (na usta)</option>
              <option value="injekcija">Injekcija</option>
              <option value="lokalno">Lokalno (na kožu)</option>
              <option value="inhalacija">Inhalacija</option>
              <option value="sublingvalno">Sublingvalno (pod jezik)</option>
              <option value="ostalo">Ostalo</option>
            </select>
          </div>

          <!-- Učestalost i Količina u redu -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Učestalost (x dnevno)</label>
              <input
                v-model.number="forma.ucestalost"
                type="number"
                min="1"
                max="10"
                class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Ukupna količina</label>
              <input
                v-model.number="forma.kolicina"
                type="number"
                min="1"
                class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          <!-- Trajanje -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Trajanje kutije (dana)</label>
            <input
              v-model.number="forma.trajanje"
              type="number"
              min="1"
              class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <!-- Podsjetnik toggle -->
          <div class="flex items-center gap-3 p-4 bg-cyan-50 rounded-lg">
            <input
              v-model="forma.podsjetnik"
              type="checkbox"
              id="podsjetnik"
              class="w-5 h-5 accent-cyan-600"
            />
            <label for="podsjetnik" class="font-semibold text-gray-700 cursor-pointer">
              Uključi podsjetnik za uzimanje
            </label>
          </div>

          <!-- Poruke -->
          <div v-if="porukaUspjeha" class="p-3 bg-green-50 text-green-700 rounded-lg font-semibold">
             Lijek uspješno ažuriran!
          </div>
          <div v-if="porukaGreske" class="p-3 bg-red-50 text-red-700 rounded-lg font-semibold">
             {{ porukaGreske }}
          </div>

          <!-- Gumbi -->
          <div class="flex gap-3 pt-2">
            <button
              type="submit"
              :disabled="spremavanjeUTijeku"
              class="flex-1 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              {{ spremavanjeUTijeku ? 'Sprema se...' : 'Spremi promjene' }}
            </button>
            <button
              type="button"
              @click="$router.back()"
              class="px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
            >
              Odustani
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../usluge/api";

const route = useRoute();
const router = useRouter();

const ucitavanje = ref(true);
const spremavanjeUTijeku = ref(false);
const porukaUspjeha = ref(false);
const porukaGreske = ref("");

const forma = ref({
  ime: "",
  doza: "",
  vrijeme: "",
  nacin: "oralno",
  kolicina: 0,
  trajanje: 0,
  ucestalost: 1,
  podsjetnik: false,
});

onMounted(async () => {
  try {
    const res = await api.get(`/lijekovi/${route.params.id}`);
    // Popuni formu s postojećim podacima
    const l = res.data;
    forma.value = {
      ime: l.ime || "",
      doza: l.doza || "",
      vrijeme: l.vrijeme || "",
      nacin: l.nacin || "oralno",
      kolicina: l.kolicina || 0,
      trajanje: l.trajanje || 0,
      ucestalost: l.ucestalost || 1,
      podsjetnik: l.podsjetnik || false,
    };
  } catch (err) {
    porukaGreske.value = "Greška pri učitavanju lijeka";
  } finally {
    ucitavanje.value = false;
  }
});

const spremiPromjene = async () => {
  spremavanjeUTijeku.value = true;
  porukaUspjeha.value = false;
  porukaGreske.value = "";

  try {
    await api.put(`/lijekovi/${route.params.id}`, forma.value);
    porukaUspjeha.value = true;
    setTimeout(() => router.push("/lijekovi"), 1500);
  } catch (err) {
    porukaGreske.value = err.response?.data?.message || "Greška pri spremanju";
  } finally {
    spremavanjeUTijeku.value = false;
  }
};
</script>