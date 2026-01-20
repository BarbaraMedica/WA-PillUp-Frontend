<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-4xl font-bold text-cyan-600 mb-6">
        AI analiza 🧠
      </h1>

      <div class="bg-white rounded-xl shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-2">
          AI analiza Vam poručuje:
        </h2>
        <p class="text-gray-700">
          Primijećeno je lošije raspoloženje u dane kada je terapija preskočena.
        </p>
      </div>

      <div class="bg-white rounded-xl shadow p-6">
        <h2 class="text-xl font-semibold mb-4">
          Pregled terapije (zadnjih 7 dana)
        </h2>

        <ul class="list-disc pl-6 text-gray-700 space-y-1">
          <li>Terapija uzeta na vrijeme: 62%</li>
          <li>Terapija uzeta do 1h kasnije: 23%</li>
          <li>Terapija preskočena: 15%</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
// kasnije ćemo ovdje dohvaćati podatke s backenda
</script>
<style scoped></style>