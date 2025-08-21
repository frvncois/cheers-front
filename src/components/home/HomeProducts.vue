<script setup>
import { ref } from 'vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()
const products = productsStore.getAllProducts

const sliderRef = ref(null)
const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)

const startDrag = (e) => {
  isDragging.value = true
  startX.value = e.pageX - sliderRef.value.offsetLeft
  scrollLeft.value = sliderRef.value.scrollLeft
}

const drag = (e) => {
  if (!isDragging.value) return
  e.preventDefault()
  const x = e.pageX - sliderRef.value.offsetLeft
  const walk = (x - startX.value) * 2
  sliderRef.value.scrollLeft = scrollLeft.value - walk
}

const endDrag = () => {
  isDragging.value = false
}
</script>

<template>
  <section>
    <div class="slider">
      <div class="is-header" data-animate="fade-up">
        <div><h1>Découvrez<br>nos produits</h1></div>
        <div><button>Voir tout nos produits</button></div>
      </div>
      <div class="is-container">
        <ul class="is-items" 
            ref="sliderRef"
            @mousedown="startDrag"
            @mousemove="drag"
            @mouseup="endDrag"
            @mouseleave="endDrag">
          <li class="is-item" v-for="product in products" :key="product.title">
            <div class="is-header" data-animate="reveal">
              <h1>{{ product.title }}</h1>
              <h2>{{ product.aroma }}</h2>
            </div>
            <div class="is-details" data-animate="fade">
              <div><p>THC</p>{{ product.thc }}</div>
              <div><p>CBD</p>{{ product.cbd }}</div>
              <div>IMG</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>

.slider {
    display: flex;
    flex-direction: column;
    margin: var(--space-lg) 0;
    > .is-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
        padding: var(--space-rg);
    }
    > .is-header h1 {
      font-size: var(--font-lg);
    }
    > .is-container {
        overflow: hidden;
    }
    & .is-items {
        display: flex;
        overflow-x: auto;
        gap: var(--space-rg);
        cursor: grab;
        scrollbar-width: none;
        padding: 0 var(--space-rg);
        -ms-overflow-style: none;
        > .is-item {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: var(--space-lg);
            background: #452833;
            padding: var(--space-sm);
            flex: 0 0 20vw;
            user-select: none;
            & h1 {
              font-size: var(--font-md);
            }
            & h2 {
              font-size: var(--font-sm);
              max-width: 15ch;
              text-align: right;
            }
            > .is-header {
              display: flex;
              justify-content: space-between;
            }
            > .is-details {
              display: flex;
              justify-content: space-between;
            }
        }
    }
}

</style>