<script setup>
import HomeHero from '@/components/home/HomeHero.vue';
import HomeIntro from '@/components/home/HomeIntro.vue';
import GlobalTextMarquee from '@/components/global/GlobalTextMarquee.vue';
import GlobalImageMarquee from '@/components/global/GlobalImageMarquee.vue';
import HomeCTA from '@/components/home/HomeCTA.vue';
import GlobalTestimonials from '@/components/global/GlobalTestimonials.vue';
import GlobalMailinglist from '@/components/global/GlobalMailinglist.vue';
import GlobalFooter from '@/components/global/GlobalFooter.vue';
import HomeProducts from '@/components/home/HomeProducts.vue';
import HomeTagline from '@/components/home/HomeTagline.vue';

// Import your images
import demoImage from '@/assets/demo.png';
</script>

<template>
<HomeHero/>
<HomeIntro/>
<HomeProducts/>
<GlobalImageMarquee/>
<HomeCTA/>
<GlobalTestimonials/>
<HomeTagline/>
<GlobalMailinglist/>
<GlobalFooter/>
</template>