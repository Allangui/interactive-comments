import { createApp } from 'vue'
import App from './App.vue'
import { Vue3Mq } from "vue3-mq"

createApp(App).use(Vue3Mq , { breakpoints:{s:0,m:600}}).mount('#app')
