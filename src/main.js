import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './Routes'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import  'bulma/css/bulma.css'
import  'bulma/css/bulma.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bulma-extensions'
import 'bulma-extensions/dist/css/bulma-extensions.min.css'
const pinia = createPinia()


createApp(App).use(router).use(pinia)
.mount('#app')
