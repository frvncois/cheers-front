<script setup>
import { ref } from 'vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()
const products = productsStore.getAllProducts
</script>

<template>
  <section>
    <div class="products">
        <div class="is-title">
            <h2 data-animate="reveal" data-animate-duration="750">Découvrez nos autres gammes et<br>produits de la famille Cheers</h2>
        </div>
      <ul class="is-items">
        <li class="is-item" v-for="product in products" :key="product.id" >
          <router-link 
            :to="{ name: 'product', params: { id: product.id } }"
            class="is-link"
          >
            <div class="is-title" data-animate="reveal" data-animate-delay="250" data-animate-duration="1000">
              <h1>{{ product.title }}</h1>
            </div>
            <div class="is-details" data-animate="fade" data-animate-delay="250" data-animate-duration="1000">
              <h2>{{ product.aroma }}</h2>
            </div>
            <div class="is-type" data-animate="fade" data-animate-delay="300" data-animate-duration="1000">
              <h2>{{ product.terpenes }}</h2>
            </div>
            <div class="is-type" data-animate="fade" data-animate-delay="350" data-animate-duration="1000">
              <div>{{ product.thc }}</div>
              <div>{{ product.cbd }}</div>
            </div>
            <div class="is-thumbnail">
            </div>
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
        display: flex;
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
</style>