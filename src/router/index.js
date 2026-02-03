import { createRouter, createWebHistory } from "vue-router";
import Prijava from "../views/Prijava.vue";
import Registracija from "../views/Registracija.vue";
import PrvoPostavljanje from '../views/PrvoPostavljanje.vue';
import GlavniZaslon from '../views/GlavniZaslon.vue';
import MojiLijekovi from '../views/MojiLijekovi.vue'
import DodajLijek from "../views/DodajLijek.vue";
import PDFIzvjestaj from '../views/PDFIzvjestaj.vue';
import AIAnaliza from "../views/AIAnaliza.vue";
import Postavke from '../views/Postavke.vue';

const routes = [
  {
    path: "/",             
    name: "Prijava",
    component: Prijava
  },
  {
    path: "/registracija",
    name: "Registracija",
    component: Registracija
  },
  { 
    path: '/prvo-postavljanje', 
    name: 'PrvoPostavljanje',
    component: PrvoPostavljanje
  },
  { 
    path: '/glavni', 
    name: 'GlavniZaslon',
    component: GlavniZaslon
  },
  { 
    path: '/moji-lijekovi', 
    name: 'MojiLijekovi',
    component: MojiLijekovi
  },
  {
  path: "/dodaj-lijek",
  name: "DodajLijek",
  component: DodajLijek,
},
  { 
    path: '/pdf-izvjestaj', 
    name: 'PDFIzvjestaj',
    component: PDFIzvjestaj
  },
  {
    path: "/ai-analiza",
    component: AIAnaliza,
    meta: { requiresAuth: true }
  },
  { 
    path: '/postavke', 
    name: 'Postavke',
    component: Postavke
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;