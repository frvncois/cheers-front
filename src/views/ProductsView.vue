<script setup>
import ProductsTitle from '@/components/products/ProductsTitle.vue'
import ProductsList from '@/components/products/ProductsList.vue'
import ProductsAbout from '@/components/products/ProductsAbout.vue'
import ProductCTA from '@/components/products/ProductCTA.vue'
import GlobalTestimonials from '@/components/global/GlobalTestimonials.vue'
import GlobalFooter from '@/components/global/GlobalFooter.vue'

// Props from App.vue (filtered products)
const props = defineProps({
  filteredProducts: {
    type: Array,
    default: () => []
  }
})
</script>
<template>
  <ProductsTitle />
  <ProductsList :products="props.filteredProducts" />
  <ProductsAbout />
  <ProductCTA />
  <GlobalTestimonials />
  <GlobalFooter />
</template>