import { Buffer } from 'buffer'
globalThis.Buffer = Buffer;

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
