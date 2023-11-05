/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import redaxios from "https://cdn.jsdelivr.net/npm/redaxios@0.5.1/+esm";

const app = createApp(App)
app.use(redaxios)
registerPlugins(app)

app.mount('#app')
