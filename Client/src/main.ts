import './assets/styles.css'
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga.css'

const app = createApp(App)

app.use(router)
app.use(Oruga)

app.mount('#app')
