import { createApp } from "vue";
import { createPinia } from "pinia";
// Import our custom CSS
import "@/assets/scss/styles.scss";
import "@bootstrap/scss/bootstrap.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(bootstrap);

app.mount("#app");
