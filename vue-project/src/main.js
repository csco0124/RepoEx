import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import mixins from "./mixins";

const app = createApp(App).use(router).mixin(mixins).mount("#app");

window.Kakao.init("749ee852ff8d08a9202a172774492887"); //발급 받은 앱키