<template>
    <div class="breadcrumb">
        <a>Produits</a> / <p>{{ props.product.title }}</p>
    </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.breadcrumb {
  display: flex;
  padding: var(--space-rg);
  margin-top: var(--space-xl);
}
</style>