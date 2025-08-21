<script setup>
import { ref, onMounted, nextTick } from 'vue'
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

const currentProduct = computed(() =>
  productsStore.getAllProducts.find(p => p.id === route.params.id)
)
const otherProducts = computed(() =>
  productsStore.getAllProducts.filter(p => p.id !== route.params.id)
)

const enterHeight = ref('100vh')
onMounted(async () => {
  await nextTick()
  requestAnimationFrame(() => {
    enterHeight.value = '0vh'
  })
})
</script>

<template>
  <div class="page-enter" :style="{ height: enterHeight }" aria-hidden="true"></div>
  <SingleBreadcrumbs :product="currentProduct" />
  <SingleProduct :product="currentProduct" />
  <SingleTagline />
  <SingleProducts :products="otherProducts" :current-product="currentProduct" />
  <GlobalMailinglist />
  <GlobalFooter />
</template>

<style scoped>
.page-enter {
  position: fixed;
  top: 0; left: 0; right: 0;
  width: 100vw;
  height: 100vh;               /* starts full */
  background: var(--yellow);
  z-index: 9999;
  pointer-events: none;
  transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
