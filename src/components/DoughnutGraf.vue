<template>
  <div class="w-full h-full">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps({
  statistika: {
    type: Object,
    required: true,
    default: () => ({ naVrijeme: 0, kasno: 0, preskoceno: 0 })
  }
});

const chartCanvas = ref(null);
let chartInstance = null;

const initChart = () => {
  if (chartCanvas.value) {
    // Uništi stari graf ako postoji
    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = chartCanvas.value.getContext("2d");

    const data = {
      labels: ["Na vrijeme", "Kasno ⏰", "Preskočeno ❌"],
      datasets: [
        {
          label: "Status uzimanja lijekova",
          data: [
            props.statistika.naVrijeme || 0,
            props.statistika.kasno || 0,
            props.statistika.preskoceno || 0
          ],
          backgroundColor: [
            "#10b981", // Zelena - na vrijeme
            "#f59e0b", // Žuta/Narandžasta - kasno
            "#ef4444"  // Crvena - preskočeno
          ],
          borderColor: [
            "#059669",
            "#d97706",
            "#dc2626"
          ],
          borderWidth: 2,
          hoverOffset: 10
        }
      ]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 20,
            font: {
              size: 12,
              weight: "bold"
            },
            usePointStyle: true,
            pointStyle: "circle"
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || "";
              const value = context.parsed || 0;
              return `${label}: ${value}%`;
            }
          },
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: 12,
          titleFont: { size: 13, weight: "bold" },
          bodyFont: { size: 12 },
          borderColor: "#ccc",
          borderWidth: 1
        }
      }
    };

    chartInstance = new ChartJS(ctx, {
      type: "doughnut",
      data: data,
      options: options
    });

    console.log("📊 Graf ažuriran sa podacima:", {
      naVrijeme: props.statistika.naVrijeme,
      kasno: props.statistika.kasno,
      preskoceno: props.statistika.preskoceno
    });
  }
};

onMounted(() => {
  initChart();
});

// Ažurira graf kada se promijene podaci
watch(
  () => props.statistika,
  (newVal) => {
    console.log(" Statistika se promijenila:", newVal);
    initChart();
  },
  { deep: true }
);

</script>

<style scoped>
</style>