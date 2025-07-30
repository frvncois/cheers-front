<script setup>
import { ref } from 'vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()
const products = productsStore.getAllProducts
</script>

<template>
  <section>
    <div class="products">
      <ul class="is-items">
        <li class="is-item" v-for="product in products" :key="product.id">
          <router-link 
            :to="{ name: 'product', params: { id: product.id } }"
            class="is-link"
          >
            <div class="is-title">
              <h1>{{ product.title }}</h1>
            </div>
            <div class="is-details">
              <h2>{{ product.aroma }}</h2>
            </div>
            <div class="is-type">
              <h2>{{ product.terpenes }}</h2>
            </div>
            <div class="is-type">
              <div>{{ product.thc }}</div>
              <div>{{ product.cbd }}</div>
            </div>
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
        > .is-type {
          display: flex;
          flex-direction: column;
          align-items: end;
          flex: 0.25;
          text-align: right;
        }
        > .is-thumbnail {
          position: absolute;
        }
      }
      &:hover .is-link {
        background: var(--yellow);
        color: var(--purple);
      }
    }
  }
}
</style>