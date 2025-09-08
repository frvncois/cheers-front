<script setup>
import { useRouter } from 'vue-router'
import { useContentStore } from '@/stores/content.js'

const props = defineProps({
  products: {
    type: Array,
    default: () => []
  },
  translationStore: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const contentStore = useContentStore()

function handleClick(event, product) {
  event.preventDefault()
  const link = event.currentTarget
  const item = link.closest('li.is-item')
  const overlay = item?.querySelector('.is-transition')

  // 1) fade only the clicked link
  link.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
  link.style.opacity = '0'
  link.style.pointerEvents = 'none'

  // 2) play overlay
  if (overlay) {
    overlay.style.display = 'block'
    overlay.style.height = '0vh'
    overlay.style.transition = 'height 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    // force reflow
    // eslint-disable-next-line no-unused-expressions
    overlay.offsetHeight
    overlay.style.height = '100vh'
  }

  // 3) navigate after animation
  setTimeout(() => {
    router.push({ name: 'product', params: { id: product.id } })
  }, 600)
}

// Helper functions for product data
const aromaText = (product) => {
  if (!product.Aroma?.notes) return ''
  return product.Aroma.notes.join(', ')
}

const rangeText = (min, max) => {
  if (!min && !max) return 'N/A'
  if (min === max) return min
  return `${min || '0'} - ${max || '0'}`
}

const getProductImage = (product) => {
  console.log('Product Thumbnail:', product.Thumbnail)
  
  if (product.Thumbnail?.url) {
    return product.Thumbnail.url  
  }
  
  return '/assets/flower.png'
}
</script>

<template>
  <section>
    <div class="products">
      <ul class="is-items">
        <li class="is-item" v-for="product in props.products" :key="product.id">
          <router-link
            :to="{ name: 'product', params: { id: product.id } }"
            class="is-link"
            custom
            v-slot="{ href }"
          >
            <a :href="href" @click="(e) => handleClick(e, product)">
              <div class="is-title">
                <h1 data-animate="reveal" data-animate-duration="1000">
                  {{ product.Title }}
                </h1>
              </div>
              <div class="is-details">
                <h2 data-animate="fade" data-animate-delay="250" data-animate-duration="1000">
                  {{ aromaText(product) }}
                </h2>
              </div>
              <div class="is-thumbnail">
                <img :src="getProductImage(product)" :alt="product.Title" />
              </div>
              <div class="is-type">
                <h2 data-animate="fade" data-animate-delay="300" data-animate-duration="1000">
                  {{ product.Terpenes }}
                </h2>
              </div>
              <div class="is-type" data-animate="fade" data-animate-delay="350" data-animate-duration="1000">
                <div><span>THC </span><span>{{ rangeText(product.THCmin, product.THCmax) }}</span></div>
                <div><span>CBD </span><span>{{ rangeText(product.CBDmin, product.CBDmax) }}</span></div>
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

  > .is-items {
    display: flex;
    flex-direction: column;

    > li.is-item {
      position: relative;

      > .is-link {
        display: flex;
        gap: var(--space-md);
        padding: var(--space-rg);
        text-decoration: none;
        color: inherit;

        > .is-title {
          font-size: var(--font-lg);
          flex: 1;
        }

        > .is-details {
          flex: 0.25;
          text-align: right;
        }

        > .is-thumbnail {
          position: relative;
          flex: 0.25;
          display: flex;
          justify-content: center;
          align-items: center;
          & img {
            position: absolute;
            top: -8em;
            height: 18em;
            opacity: 0;
            transform: rotate(8deg);
            transition: all 0.3s ease;
          }
        }

        > .is-type {
          display: flex;
          flex-direction: column;
          align-items: end;
          flex: 0.25;
          text-align: right;
          > div {
            width: 100%;
            display: flex;
            justify-content: space-between;
          }
        }
      }

      &:hover {
        > .is-link {
          background: var(--yellow);
          color: var(--purple);
          > .is-thumbnail img {
            opacity: 1;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .is-items {
    border-top: 1px solid var(--yellow);
  }
  .is-item {
    border-bottom: 1px solid var(--yellow);
    > .is-link {
    padding: var(--space-sm)!important;
    }
  }
  h1 {
    font-size: var(--font-rg);
  }
    .is-details {
        display: none;
    }
    .is-type {
        display: none!important;
    }
    .is-thumbnail {
        display: none!important;
    }
    .is-details {
        display: none;
    }
}
</style>
