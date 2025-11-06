<template>
  <template v-if="!contentLoaded">
    <GlobalRouter @verified="handleUserVerified" :user-store="userStore" />
  </template>
  <template v-else>
    <GlobalHeader :translation-store="translationStore" />
    <RouterView :filtered-products="filteredProducts" :translation-store="translationStore" />
  </template>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { useContentStore } from '@/stores/content.js'
import { useTranslationStore } from '@/stores/translation.js'
import GlobalHeader from '@/components/global/GlobalHeader.vue'
import GlobalRouter from './components/global/GlobalRouter.vue'

const userStore = useUserStore()
const contentStore = useContentStore()
const translationStore = useTranslationStore()

const contentLoaded = ref(false)

const locationAvailabilityMap = {
  'QC': 'SQDC',
  'ON': 'OCS',
  'DE': 'International',
  'UK': 'International',
  'AB': 'Alberta'
}

const filteredProducts = computed(() => {
  const allProducts = contentStore.products || []
  const userLocationCode = userStore.user.location?.code
  
  if (!userLocationCode) {
    return allProducts
  }
  
  const requiredAvailability = locationAvailabilityMap[userLocationCode]
  
  if (!requiredAvailability) {
    return allProducts
  }
  
  return allProducts.filter(product => 
    product.Availability === requiredAvailability
  )
})

const handleUserVerified = async (verificationData) => {
  const userLocation = verificationData.user.location?.code
  const language = userLocation === 'QC' ? 'fr-CA' : 'en'
  
  translationStore.setLanguage(language)
  contentStore.setLanguage(language)
  
  await contentStore.fetchAllContent(true)
  console.debug('[Politique] content', contentStore.politique)
  contentLoaded.value = true
}

const loadAllContent = async () => {
  try {
    await contentStore.loadAllLanguages()
  } catch {
  }
}

onMounted(async () => {
  translationStore.init()
})
</script>
