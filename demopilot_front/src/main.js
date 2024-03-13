import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import vuetify from "./vuetify.js";
import VueCookies from "vue-cookies";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(VueCookies);
app.mount("#app");
