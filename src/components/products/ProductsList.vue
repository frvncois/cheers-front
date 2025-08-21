<script setup>
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'

const router = useRouter()
const productsStore = useProductsStore()
const products = productsStore.getAllProducts

function handleClick(event, product) {
  event.preventDefault()

  // the <a> rendered by router-link (custom)
  const link = event.currentTarget
  const item = link.closest('li.is-item')
  const overlay = item?.querySelector('.is-transition')

  // 1) fade out ONLY the clicked link (no classes)
  link.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
  link.style.opacity = '0'
  link.style.pointerEvents = 'none'

  // 2) play the overlay (sibling, sits above page; not affected by link opacity)
  if (overlay) {
    overlay.style.display = 'block' // was none
    overlay.style.height = '0vh'    // ensure start
    overlay.style.transition = 'height 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    // force style flush so the next write animates
    // eslint-disable-next-line no-unused-expressions
    overlay.offsetHeight
    overlay.style.height = '100vh'
  }

  // 3) navigate when the animation completes
  setTimeout(() => {
    router.push({ name: 'product', params: { id: product.id } })
  }, 600)
}
</script>

<template>
  <section>
    <div class="products">
      <ul class="is-items">
        <li class="is-item" v-for="product in products" :key="product.id">
          <!-- overlay sibling (NOT inside the link) -->
          <div class="is-transition" aria-hidden="true"></div>

          <router-link
            :to="{ name: 'product', params: { id: product.id } }"
            class="is-link"
            custom
            v-slot="{ href }"
          >
            <a :href="href" @click="(e) => handleClick(e, product)">
              <div class="is-title">
                <h1 data-animate="reveal" data-animate-duration="1000">{{ product.title }}</h1>
              </div>
              <div class="is-details">
                <h2 data-animate="fade" data-animate-delay="250" data-animate-duration="1000">
                  {{ product.aroma }}
                </h2>
              </div>
              <div class="is-type">
                <h2 data-animate="fade" data-animate-delay="300" data-animate-duration="1000">
                  {{ product.terpenes }}
                </h2>
              </div>
              <div class="is-type" data-animate="fade" data-animate-delay="350" data-animate-duration="1000">
                <div>{{ product.thc }}</div>
                <div>{{ product.cbd }}</div>
              </div>
            </a>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.products {
  padding: 0;
}
.products > .is-items {
  display: flex;
  flex-direction: column;
}
.products > .is-items > li.is-item {
  position: relative;
}

/* Overlay sits ABOVE the page, hidden until click */
.products > .is-items > li.is-item > .is-transition {
  position: fixed;
  inset: 0;                 /* top/right/bottom/left: 0 */
  width: 100vw;
  height: 0vh;              /* start collapsed */
  background: var(--yellow);
  z-index: 9999;            /* above everything; not affected by link fading */
  pointer-events: none;
  display: none;            /* shown by script on click */
}

.products > .is-items > li.is-item > .is-link {
  display: flex;
  gap: var(--space-md);
  padding: var(--space-rg);
  text-decoration: none;
  color: inherit;
}
.products > .is-items > li.is-item > .is-link > .is-title {
  font-size: var(--font-lg);
  flex: 1;
}
.products > .is-items > li.is-item > .is-link > .is-details {
  flex: 0.25;
  text-align: right;
}
.products > .is-items > li.is-item > .is-link > .is-type {
  display: flex;
  flex-direction: column;
  align-items: end;
  flex: 0.25;
  text-align: right;
}

/* Hover style remains; it won't affect the overlay */
.products > .is-items > li.is-item:hover .is-link {
  background: var(--yellow);
  color: var(--purple);
}
</style>
