<script setup>
import { computed, watchEffect } from 'vue'

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

const orderValue = (product) => {
  const raw = product?.Order ?? product?.order ?? product?.attributes?.Order ?? product?.attributes?.order
  const value = Number(raw)
  return Number.isFinite(value) ? value : Number.MAX_SAFE_INTEGER
}

const sortedProducts = computed(() => {
  if (!Array.isArray(props.products)) return []
  return [...props.products].sort((a, b) => orderValue(a) - orderValue(b))
})

watchEffect(() => {
  console.log('[SingleProducts] Sorted products', sortedProducts.value)
})


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
  <section>
    <div class="products">
      <div class="is-title">
        <h2 data-animate="reveal" data-animate-duration="750" v-html="props.translationStore.translations.products[props.translationStore.currentLanguage].sectionTitle">
        </h2>
      </div>
      <ul class="is-items">
        <li class="is-item" v-for="p in sortedProducts" :key="p.id || p.documentId || p.Title">
          <router-link
            :to="{ name: 'product', params: { id: p.id || p.documentId } }"
            class="is-link"
          >
            <div class="is-title" data-animate="reveal" data-animate-delay="250" data-animate-duration="1000">
              <h1>{{ p.Title }}</h1>
            </div>
            <div class="is-details" data-animate="fade" data-animate-delay="250" data-animate-duration="1000">
              <h2>{{ aromaText(p) }}</h2>
            </div>
            <div class="is-type" data-animate="fade" data-animate-delay="300" data-animate-duration="1000">
              <h2>{{ p.Terpenes }}</h2>
            </div>
            <div class="is-type" data-animate="fade" data-animate-delay="350" data-animate-duration="1000">
              <div>{{ props.translationStore.translations.products[props.translationStore.currentLanguage].thcRange }} {{ rangeText(p.THCmin, p.THCmax) }}</div>
              <div>{{ props.translationStore.translations.products[props.translationStore.currentLanguage].cbdRange }} {{ rangeText(p.CBDmin, p.CBDmax) }}</div>
            </div>
            <div class="is-thumbnail"></div>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>
<style scoped>
section {
  background: var(--yellow);
  color: var(--purple);
}
.products {
  > .is-title {
    padding: var(--space-xl);
    & h2 {
      font-size: var(--font-lg);
      text-align: center;
    }
  }
  > .is-items {
    display: flex;
    flex-direction: column;
    > li.is-item {
      > .is-link {
        display: grid;
        grid-template-columns: 1fr 0.25fr 0.25fr 0.25fr;
        gap: var(--space-md);
        padding: var(--space-rg);
        text-decoration: none;
        color: inherit;
        > .is-title {
          flex: 1;
          & h1 {
            font-size: var(--font-lg);
          }
        }
        > .is-thumbnail {
          position: absolute;
        }
      }
      &:hover .is-link {
        background: var(--purple);
        color: var(--yellow);
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .products {
    > .is-title {
       padding: var(--space-md);
    }
    & .is-item {
      border-top: 1px solid var(--purple);
      > a {
        padding: var(--space-md);
        > .is-type {
          display: none;
        }
        > .is-thumbnail {
          display: none;
        }
        > .is-details {
          display: none;
        }
      }
    }
  }
}
</style>
