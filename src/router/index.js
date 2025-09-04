import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ProductsView from '@/views/ProductsView.vue'
import SingleView from '@/views/SingleView.vue'
import SaintLaurentView from '@/views/SaintLaurentView.vue'
import BlogView from '@/views/BlogView.vue'
import ArticleView from '@/views/ArticleView.vue'
import ContactView from '@/views/ContactView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/saint-laurent', name: 'saint-laurent', component: SaintLaurentView },
  { path: '/products', name: 'products', component: ProductsView },
  { path: '/products/:id', name: 'product', component: SingleView },
  { path: '/blog', name: 'blog', component: BlogView },
  { path: '/blog/:id', name: 'article', component: ArticleView },
  { path: '/contact', name: 'contact', component: ContactView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
})
