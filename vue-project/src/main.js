import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import mixins from "./mixins";

const app = createApp(App).use(router).mixin(mixins).mount("#app");
app.directive("focus", {
  mounted(e1) {
    e1.fucus();
  },
});
