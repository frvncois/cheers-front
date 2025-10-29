<script setup>
import { computed } from 'vue'

const props = defineProps({
  content: {
    type: Object,
    default: () => ({})
  },
  translationStore: {
    type: Object,
    required: true
  }
})


const featuredProducts = computed(() => {
  return props.content?.Product || []
})


const getProductImage = (product) => {
  const image = product.Image?.[0]
  if (image && image.url) {
    return image.url
  }
  return null
}


const getProductTitle = (product) => {
  return product.Title
}


const getProductType = (product) => {
  return product.Type
}


const getProductTHC = (product) => {
  return product.THC
}


const getProductSize = (product) => {
  return product.Size
}


const sectionTitle = computed(() => {
  return props.content?.ProductsTitle || 'Notre produit phare'
})
</script>

<template>
  <section data-bg="green">
    <div class="products">
      <div>
        <h2 data-animate="reveal" data-animate-delay="500">{{ sectionTitle }}</h2>
      </div>
      <div class="is-items">
        <div
          v-for="product in featuredProducts"
          :key="product.id"
          class="is-item"
          data-animate="reveal"
          data-animate-delay="500"
        >
          <div>
            <h3>{{ getProductType(product) }}</h3>
            <h3>THC {{ getProductTHC(product) }}</h3>
          </div>
          <div>
            <img
              v-if="getProductImage(product)"
              :src="getProductImage(product)"
              :alt="getProductTitle(product)"
            />
          </div>
          <div>
            <h3>{{ getProductTitle(product) }}</h3>
            <h3>Format<br>{{ getProductSize(product) }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
.products {
  display: flex;
  gap: var(--space-md);
  padding: var(--space-lg) var(--space-2xl);
  flex-wrap: wrap;
  flex-direction: column;
  background: var(--green);
  color: var(--light);
  > .is-items {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-xl);
    & img {
        margin: auto;
        width:100%;
    }
    > .is-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: var(--space-sm);
    }
    > .is-item div {
        display: flex;
        justify-content: space-between;
    }
  }
}

@media screen and (max-width: 768px) {
  .products {
    flex-direction: column;
    padding: var(--space-sm);
    > .is-items {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      & img {
        margin: auto;
      }
    }
  }
}
</style>