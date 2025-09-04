import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Lenis from 'lenis'
import './assets/scrollr.js'
import './assets/animate.js';
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

const lenis = new Lenis({ autoRaf: true })
window.lenis = lenis

router.beforeEach((to, from, next) => {
  lenis.scrollTo(0, { immediate: true })
  next()
})

app.use(pinia)
app.use(router)

app.mount('#app')

// Initialize translation store AFTER the app is mounted
import { useTranslationStore } from '@/stores/translation.js'
const translationStore = useTranslationStore()
translationStore.init()

window.scrollr = new window.Scrollr({
  multiplier: 0.08,
  ease: 0.15,
  clamp: [-2, 2]
})