import './assets/styles.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bulma/css/bulma.css'

// Import the FontAwesome core
import { library } from '@fortawesome/fontawesome-svg-core'

// Import specific icons
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'

// Add icons to the library
library.add(faDumbbell)

const app = createApp(App)

app.use(router)

app.mount('#app')
