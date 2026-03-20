<template>
  <div class="w-64 h-64 mx-auto">
    <DoughnutChart :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps({
  statistika: {
    type: Object,
    required: true
    // očekuje { naVrijeme: 10, kasno: 2, preskoceno: 1 }
  }
});

const chartData = computed(() => ({
  labels: ["Na vrijeme", "Kasno", "Preskočeno"],
  datasets: [
    {
      label: "Uzimanje lijekova",
      data: [
        props.statistika.naVrijeme || 0,
        props.statistika.kasno || 0,
        props.statistika.preskoceno || 0
      ],
      backgroundColor: ["#06b6d4", "#facc15", "#f87171"],
      borderWidth: 2
    }
  ]
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom"
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          const total = context.dataset.data.reduce((a,b)=>a+b,0);
          const value = context.raw;
          const percent = total ? ((value/total)*100).toFixed(1) : 0;
          return `${context.label}: ${value} (${percent}%)`;
        }
      }
    }
  }
};

const DoughnutChart = Doughnut;
</script>

<style scoped>

</style>