<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SingleBreadcrumbs from '@/components/single/SingleBreadcrumbs.vue'
import SingleProduct from '@/components/single/SingleProduct.vue'
import SingleTagline from '@/components/single/SingleTagline.vue'
import SingleProducts from '@/components/single/SingleProducts.vue'
import GlobalMailinglist from '@/components/global/GlobalMailinglist.vue'
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

const route = useRoute()


const currentProduct = computed(() => {
  const productId = route.params.id
  return props.filteredProducts.find(p => p.id == productId || p.documentId === productId)
})


const otherProducts = computed(() => {
  if (!currentProduct.value) return props.filteredProducts
  return props.filteredProducts.filter(p =>
    p.id !== currentProduct.value.id && p.documentId !== currentProduct.value.documentId
  )
})
</script>

<template>
  <SingleBreadcrumbs :current-product="currentProduct" :translation-store="props.translationStore" />
  <SingleProduct :product="currentProduct" :translation-store="props.translationStore" />
  <SingleTagline :product="currentProduct" :translation-store="props.translationStore" />
  <SingleProducts :products="otherProducts" :translation-store="props.translationStore" />
  <GlobalMailinglist :translation-store="props.translationStore" />
  <GlobalFooter :translation-store="props.translationStore" />
</template>

<style scoped>
.page-enter {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: var(--yellow);
  z-index: 9999;
  pointer-events: none;
  transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>