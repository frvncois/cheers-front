<script setup>
import { computed } from 'vue'
import { useContentStore } from '@/stores/content.js'
import HomeHero from '@/components/home/HomeHero.vue'
import HomeIntro from '@/components/home/HomeIntro.vue'
import HomeProducts from '@/components/home/HomeProducts.vue'
import GlobalImageMarquee from '@/components/global/GlobalImageMarquee.vue'
import HomeCTA from '@/components/home/HomeCTA.vue'
import GlobalTestimonials from '@/components/global/GlobalTestimonials.vue'
import HomeTagline from '@/components/home/HomeTagline.vue'
import GlobalMailinglist from '@/components/global/GlobalMailinglist.vue'
import GlobalFooter from '@/components/global/GlobalFooter.vue'
import HomeMarquee from '@/components/home/HomeMarquee.vue'

const props = defineProps({
  filteredProducts: {
    type: Array,
    default: () => []
  }
})

const contentStore = useContentStore()

const galleryImages = computed(() => {
  return contentStore.home?.Gallery || []
})

</script>

<template>
  <HomeHero />
  <HomeIntro />
  <HomeProducts :products="props.filteredProducts" />
  <HomeMarquee />
  <GlobalImageMarquee :images="galleryImages" />
  <HomeCTA />
  <GlobalTestimonials />
  <HomeTagline />
  <GlobalMailinglist />
  <GlobalFooter />
</template>