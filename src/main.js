import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Lenis from 'lenis'
import './assets/scrollr.js'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const lenis = new Lenis({
  autoRaf: true,
});

// Make lenis globally available for scrollr
window.lenis = lenis;

lenis.on('scroll', (e) => {
  console.log(e);
  // Update scrollr elements on Lenis scroll
  if (window.scrollr) {
    window.scrollr.updateElements();
  }
});

// Scroll to top on route change
router.beforeEach((to, from, next) => {
  lenis.scrollTo(0, { immediate: true });
  next();
});

app.use(createPinia())
app.use(router)
app.mount('#app')