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
import HomeHero from './components/home/HomeHero.vue'

// Initialize stores
const userStore = useUserStore()
const contentStore = useContentStore()
const translationStore = useTranslationStore()

// Control when to show main app content
const contentLoaded = ref(false)

// Location mapping for availability
const locationAvailabilityMap = {
  'QC': 'SQDC',        
  'ON': 'OCS',         
  'DE': 'International', 
  'UK': 'International'  
}

// Computed property to filter products based on user location
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

// Handle user verification - this now controls when to show main content
const handleUserVerified = async (verificationData) => {
  // Set language based on user location
  translationStore.setLanguageByLocation(verificationData.user.location?.code)
  
  // Load content after user verification
  await loadAllContent()
  
  // Show main app content (this hides the modal)
  contentLoaded.value = true
}

// Load all content from Strapi
const loadAllContent = async () => {
  try {
    await contentStore.fetchAllContent()
  } catch (error) {
    console.error('Error loading content:', error)
  }
}

// Initialize translation store on mount
onMounted(async () => {
  translationStore.init()
})
</script>