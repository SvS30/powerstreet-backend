import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueShowdownPlugin } from 'vue-showdown'

createApp(App).use(router).use(VueShowdownPlugin, {
    flavor: 'github',
}).mount('#app')
