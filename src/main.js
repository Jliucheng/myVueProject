import { createApp } from 'vue'
import App from './App.vue'
import ViewUIPlus from 'view-ui-plus'

import 'view-ui-plus/dist/styles/viewuiplus.css'

//import './assets/main.css'
const app = createApp(App)

app
.use(ViewUIPlus)
.mount('#app')
