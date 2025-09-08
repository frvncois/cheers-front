<script setup>
import ProductsTitle from '@/components/products/ProductsTitle.vue'
import ProductsList from '@/components/products/ProductsList.vue'
import ProductsAbout from '@/components/products/ProductsAbout.vue'
import ProductCTA from '@/components/products/ProductCTA.vue'
import GlobalTestimonials from '@/components/global/GlobalTestimonials.vue'
import GlobalFooter from '@/components/global/GlobalFooter.vue'

const props = defineProps({
  filteredProducts: {
    type: Array,
    default: () => []
  },
  translationStore: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <ProductsTitle :translation-store="props.translationStore" />
  <ProductsList :products="props.filteredProducts" :translation-store="props.translationStore" />
  <ProductsAbout :translation-store="props.translationStore" />
  <ProductCTA :translation-store="props.translationStore" />
  <GlobalTestimonials :translation-store="props.translationStore" />
  <GlobalFooter :translation-store="props.translationStore" />
</template>