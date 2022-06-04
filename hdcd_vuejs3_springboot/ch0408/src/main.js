import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store/index.js'

/*
createApp(App).mount('#app')
*/
const app = createApp(App)
app.use(store).mount('#app')
