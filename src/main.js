import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";

if (typeof localStorage !== "undefined" && !localStorage.getItem("token")) {
  localStorage.setItem("token", "token-user-1");
}

createApp(App).use(router).mount("#app");
