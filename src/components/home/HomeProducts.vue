<script setup>
import { ref } from 'vue'
import ButtonArrow from '@/assets/ButtonArrow.vue'

const props = defineProps({
  products: {
    type: Array,
    default: () => []
  }
})

const sliderRef = ref(null)
const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)

const startDrag = (e) => {
  const el = sliderRef.value
  if (!el) return
  isDragging.value = true
  startX.value = e.pageX - el.offsetLeft
  scrollLeft.value = el.scrollLeft
}

const drag = (e) => {
  if (!isDragging.value) return
  e.preventDefault()
  const el = sliderRef.value
  const x = e.pageX - el.offsetLeft
  const walk = (x - startX.value) * 2
  el.scrollLeft = scrollLeft.value - walk
}

const endDrag = () => { isDragging.value = false }

const aromaText = (product) => {
  if (!product.Aroma?.notes) return ''
  return product.Aroma.notes.join(', ')
}

const rangeText = (min, max) => {
  if (!min && !max) return 'N/A'
  if (min === max) return min
  return `${min || '0'} - ${max || '0'}`
}
</script>
<template>
  <section data-bg="purple">
    <div class="slider">
      <div class="is-header" data-animate="fade-up">
        <div><h1>Découvrez<br>nos produits</h1></div>
        <div><router-link to="/products">Voir tous nos produits<ButtonArrow /></router-link></div>
      </div>
      <div class="is-container">
        <ul class="is-items"
          ref="sliderRef"
          @mousedown="startDrag"
          @mousemove="drag"
          @mouseup="endDrag"
          @mouseleave="endDrag">
          <li class="is-item" v-for="product in props.products" :key="product.id || product.Title">
            <div class="is-header" data-animate="reveal">
              <h1>{{ product.Title }}</h1>
              <h2>{{ aromaText(product) }}</h2>
            </div>
            <div class="is-details" data-animate="fade">
              <div><p>THC</p>{{ rangeText(product.THCmin, product.THCmax) }}</div>
              <div><p>CBD</p>{{ rangeText(product.CBDmin, product.CBDmax) }}</div>
              <div>
                <img :src="`http://localhost:1337${product.Thumbnail.url}`" :alt="product.Title" />
              </div>
              <div class="is-link">
                <router-link :to="{ name: 'product', params: { id: product.id || product.Title } }">Voir le produit</router-link>
              </div>
            </div>
          </li>
          <li v-if="!props.products?.length" class="is-item">
            Aucun produit disponible.
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
    & a {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
      > svg {
        transition: all 0.3s ease;
      }
      &:hover svg {
        transform: translateX(0.5em);
      }
    }
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
    padding: var(--space-rg);
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
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: flex-end;
        > .is-link {
          margin-top: var(--space-sm);
          grid-column: span 3;
        }
        & img {
          position: absolute;
          bottom: -2.5em;
          right: -2.5em;
          width: 10em;
          transform: rotate(2deg);
          pointer-events: none;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .slider {
    flex-direction: column;
    gap: 0;
    >  .is-header {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-rg);
      padding: var(--space-sm);
      padding-bottom: 0;
    }
    & .is-items {
      padding: var(--space-sm) var(--space-sm);
      > .is-item {
        flex: 0 0 60vw;
        > .is-details {
          grid-template-columns: 1fr 1fr;
          & img {
            right: -5em;
          }
        }
      }
    }
  }
}
</style>


