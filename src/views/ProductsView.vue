<script setup>
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import ProductsTitle from '@/components/products/ProductsTitle.vue'
import ProductsList from '@/components/products/ProductsList.vue'
import ProductsAbout from '@/components/products/ProductsAbout.vue'
import GlobalTestimonials from '@/components/global/GlobalTestimonials.vue'
import GlobalFooter from '@/components/global/GlobalFooter.vue'
import { useContentStore } from '@/stores/content.js'

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

const contentStore = useContentStore()
const { productList } = storeToRefs(contentStore)

watch(
  () => props.translationStore?.currentLanguage,
  (language) => {
    if (!language) return

    if (contentStore.currentLanguage !== language) {
      contentStore.setLanguage(language)
    }

    contentStore.fetchProductList()
  },
  { immediate: true }
)

const productListContent = computed(() => {
  const entry = productList.value
  if (!entry) return null
  return entry.attributes || entry
})

const productIntro = computed(() => {
  const content = productListContent.value || {}
  return (
    content.Intro ||
    content.intro ||
    content.introText ||
    content.description ||
    ''
  )
})

const aboutImageUrl = computed(() => {
  if (!productListContent.value) return null

  const candidates = [
    productListContent.value.About_Cover,
    productListContent.value.aboutCover,
    productListContent.value.aboutImage,
    productListContent.value.coverImage
  ]

  for (const candidate of candidates) {
    const url = contentStore.getMediaURL(candidate)
    if (url) return url
  }

  return null
})
</script>

<template>
  <ProductsTitle
    :translation-store="props.translationStore"
    :intro="productIntro"
    :content="productListContent"
  />
  <ProductsList :products="props.filteredProducts" :translation-store="props.translationStore" />
  <ProductsAbout
    :translation-store="props.translationStore"
    :content="productListContent"
    :about-image-url="aboutImageUrl"
  />
  <GlobalTestimonials :translation-store="props.translationStore" />
  <GlobalFooter :translation-store="props.translationStore" />
</template>
