<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import SingleBreadcrumbs from '@/components/single/SingleBreadcrumbs.vue'
import SingleProduct from '@/components/single/SingleProduct.vue'
import SingleTagline from '@/components/single/SingleTagline.vue'
import SingleProducts from '@/components/single/SingleProducts.vue'
import GlobalMailinglist from '@/components/global/GlobalMailinglist.vue'
import GlobalFooter from '@/components/global/GlobalFooter.vue'

const route = useRoute()
const productsStore = useProductsStore()

const currentProduct = computed(() => {
  return productsStore.getAllProducts.find(p => p.id === route.params.id)
})

const otherProducts = computed(() => {
  return productsStore.getAllProducts.filter(p => p.id !== route.params.id)
})
</script>

<template>
  <SingleBreadcrumbs :product="currentProduct" />
  <SingleProduct :product="currentProduct" />
  <SingleTagline />
  <SingleProducts :products="otherProducts" :current-product="currentProduct" />
  <GlobalMailinglist />
  <GlobalFooter />
</template>