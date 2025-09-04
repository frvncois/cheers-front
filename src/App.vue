<template>
  <template v-if="!contentLoaded">
    <GlobalRouter @verified="handleUserVerified" :user-store="userStore" />
    <HomeHero />
  </template>
  <template v-else>
    <GlobalHeader />
    <RouterView :filtered-products="filteredProducts" />
  </template>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { useContentStore } from '@/stores/content.js'
import GlobalHeader from '@/components/global/GlobalHeader.vue'
import GlobalRouter from './components/global/GlobalRouter.vue'
import HomeHero from './components/home/HomeHero.vue'

// Initialize stores
const userStore = useUserStore()
const contentStore = useContentStore()

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
    return allProducts // Return all if no location set
  }
  
  const requiredAvailability = locationAvailabilityMap[userLocationCode]
  
  if (!requiredAvailability) {
    return allProducts // Return all if unknown location
  }
  
  // Filter products by availability
  return allProducts.filter(product => 
    product.Availability === requiredAvailability
  )
})

// Handle user verification - this now controls when to show main content
const handleUserVerified = async (verificationData) => {
  console.log('User verified successfully:', verificationData)
  console.log('User data:', verificationData.user)
  console.log('User location:', verificationData.user.location)
  console.log('Can access products:', verificationData.canAccessProducts)
  
  if (verificationData.fromStorage) {
    console.log('Verification loaded from storage (existing session)')
  } else {
    console.log('New verification completed')
  }
  
  // Load content after user verification
  await loadAllContent()
  
  // Show main app content (this hides the modal)
  contentLoaded.value = true
}

// Load all content from Strapi
const loadAllContent = async () => {
  console.log('Starting to load all content from Strapi...')
  
  try {
    // Load all content at once
    await contentStore.fetchAllContent()
    
    // Log what we loaded - DETAILED CONTENT LOGGING
    console.log('CONTENT STORE LOADED:')
    console.log('='.repeat(50))
    
    // Home content
    console.log('HOME CONTENT:')
    if (contentStore.home) {
      console.log('Home content loaded successfully!')
      console.log('Home data structure:', Object.keys(contentStore.home))
      console.log('Full home content:', JSON.stringify(contentStore.home, null, 2))
    } else {
      console.warn('Home content is null/undefined')
    }
    console.log('-'.repeat(30))
    
    // About content
    console.log('ABOUT CONTENT:')
    if (contentStore.about) {
      console.log('About content loaded successfully!')
      console.log('About data structure:', Object.keys(contentStore.about))
      console.log('Full about content:', JSON.stringify(contentStore.about, null, 2))
    } else {
      console.warn('About content is null/undefined')
    }
    console.log('-'.repeat(30))
    
    // Saint-Laurent content
    console.log('SAINT-LAURENT CONTENT:')
    if (contentStore.saintLaurent) {
      console.log('Saint-Laurent content loaded successfully!')
      console.log('Saint-Laurent data structure:', Object.keys(contentStore.saintLaurent))
      console.log('Full Saint-Laurent content:', JSON.stringify(contentStore.saintLaurent, null, 2))
    } else {
      console.warn('Saint-Laurent content is null/undefined')
    }
    console.log('-'.repeat(30))
    
    // Products
    console.log('PRODUCTS CONTENT:')
    if (contentStore.products && contentStore.products.length > 0) {
      console.log(`Products loaded: ${contentStore.products.length} products`)
      console.log('Published products:', contentStore.publishedProducts.length)
      console.log('Products for user location:', userStore.getLocationSpecificContent(contentStore.products).length)
      console.log('First product structure:', Object.keys(contentStore.products[0] || {}))
      console.log('All products data:', JSON.stringify(contentStore.products, null, 2))
    } else {
      console.warn('No products loaded or products array is empty')
      console.log('Products value:', contentStore.products)
    }
    console.log('-'.repeat(30))
    
    // Blog posts
    console.log('BLOG CONTENT:')
    if (contentStore.blog && contentStore.blog.length > 0) {
      console.log(`Blog posts loaded: ${contentStore.blog.length} posts`)
      console.log('Published blog posts:', contentStore.publishedBlogPosts.length)
      console.log('Recent blog posts:', contentStore.recentBlogPosts.length)
      console.log('All blog data:', JSON.stringify(contentStore.blog, null, 2))
    } else {
      console.log('Blog is disabled/empty (expected)')
    }
    console.log('-'.repeat(30))
    
    // Store States
    console.log('STORE STATES:')
    console.log('Loading states:', JSON.stringify(contentStore.loading, null, 2))
    
    // Error states
    const hasErrors = Object.values(contentStore.errors).some(error => error)
    if (hasErrors) {
      console.error('CONTENT ERRORS:')
      Object.entries(contentStore.errors).forEach(([key, error]) => {
        if (error) {
          console.error(`   ${key}: ${error}`)
        }
      })
    } else {
      console.log('No content loading errors')
    }
    
    // Cache states
    console.log('Cache timestamps:', JSON.stringify(contentStore.lastFetched, null, 2))
    
    console.log('='.repeat(50))
    console.log('CONTENT LOADING ANALYSIS COMPLETED!')
    
    // Summary
    const summary = {
      home: !!contentStore.home,
      about: !!contentStore.about,
      saintLaurent: !!contentStore.saintLaurent,
      productsCount: contentStore.products?.length || 0,
      blogCount: contentStore.blog?.length || 0,
      hasErrors: hasErrors,
      allLoaded: contentStore.isAllContentLoaded
    }
    
    console.log('CONTENT SUMMARY:', summary)
    
    // Log filtered products for current user location
    console.log('LOCATION-FILTERED PRODUCTS:')
    console.log('-'.repeat(30))
    if (filteredProducts.value && filteredProducts.value.length > 0) {
      console.log(`Filtered products for ${userStore.user.location?.name} (${userStore.user.location?.code}):`, filteredProducts.value.length)
      console.log(`Showing products with availability: ${locationAvailabilityMap[userStore.user.location?.code]}`)
      console.log('Filtered products list:')
      filteredProducts.value.forEach((product, index) => {
        console.log(`   ${index + 1}. ${product.Title} (${product.Availability})`)
      })
      console.log('Full filtered products data:', JSON.stringify(filteredProducts.value, null, 2))
    } else {
      console.warn('No products available for current user location')
      console.log(`User location: ${userStore.user.location?.name} (${userStore.user.location?.code})`)
      console.log(`Required availability: ${locationAvailabilityMap[userStore.user.location?.code]}`)
    }
    console.log('-'.repeat(30))
    
  } catch (error) {
    console.error('Error loading content:', error)
    console.error('Error stack:', error.stack)
  }
}

// Load user data on app mount (but don't auto-load content)
onMounted(async () => {
  // Wait for user verification before loading content
})
</script>