import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VueShowdownPlugin } from 'vue-showdown'

createApp(App)
    .use(router)
    .use(VueShowdownPlugin, {
        flavor: 'github',
    })
    .use(store)
    .mount('#app')
