<script setup>
const props = defineProps({
  currentProduct: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <div class="breadcrumb" data-animate="fade" data-animate-duration="1000">
    <router-link to="/products">Produits</router-link> / <p>{{ props.currentProduct?.Title || 'Product' }}</p>
  </div>
</template>

<style scoped>
.breadcrumb {
  display: flex;
  padding: var(--space-rg);
  margin-top: var(--space-xl);
  gap: var(--space-xs);
}
</style>