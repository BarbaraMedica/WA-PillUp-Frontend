<template>
  <div class="w-64 h-64 mx-auto">
    <Doughnut :data="chartData" :options="chartOptions" />
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
  }
});

const chartData = computed(() => ({
  labels: ["Na vrijeme", "Kasno", "Preskočeno"],
  datasets: [
    {
      label: "Uzimanje lijekova",
      data: [
        props.statistika?.naVrijeme || 0,
        props.statistika?.kasno || 0,
        props.statistika?.preskoceno || 0
      ],
      backgroundColor: ["#06b6d4", "#facc15", "#f87171"],
      borderWidth: 2
    }
  ]
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" }
  }
};
</script>