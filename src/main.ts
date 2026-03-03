import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './plugins/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Registrar componente global
app.component('FaIcon', FontAwesomeIcon)

app.mount('#app')
