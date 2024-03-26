import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import  'bulma/css/bulma.css'
import  'bulma/css/bulma.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import router from './Routes'

const pinia = createPinia()



createApp(App).use(router).use(pinia)
.mount('#app')
