<script setup>
import GlobalFooter from '@/components/global/GlobalFooter.vue';
import GlobalTestimonials from '@/components/global/GlobalTestimonials.vue';
import GlobalTextMarquee from '@/components/global/GlobalTextMarquee.vue';
import GlobalMailinglist from '@/components/global/GlobalMailinglist.vue';

const props = defineProps({
  translationStore: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <GlobalMailinglist :translation-store="props.translationStore" />
  <GlobalFooter :translation-store="props.translationStore" />
</template>