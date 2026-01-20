import { createRouter, createWebHistory } from "vue-router";
import Prijava from "../views/Prijava.vue";
import Registracija from "../views/Registracija.vue";
import PrvoPostavljanje from '../views/PrvoPostavljanje.vue'
import GlavniZaslon from '../views/GlavniZaslon.vue'
import DodajLijek from "../views/DodajLijek.vue";
import AIAnaliza from "../views/AIAnaliza.vue";

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
  path: "/dodaj-lijek",
  name: "DodajLijek",
  component: DodajLijek,
}
,
  {
    path: "/ai-analiza",
    component: AIAnaliza,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;