<script setup>
import BlogContent from '@/components/blog/BlogContent.vue'
import GlobalFooter from '@/components/global/GlobalFooter.vue'
import GlobalMailinglist from '@/components/global/GlobalMailinglist.vue'
import GlobalTestimonials from '@/components/global/GlobalTestimonials.vue'

// ✅ Receive translationStore as prop
const props = defineProps({
  translationStore: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <!-- ✅ Pass translationStore to children -->
  <BlogContent :translation-store="props.translationStore" />
  <GlobalTestimonials :translation-store="props.translationStore" />
  <GlobalMailinglist :translation-store="props.translationStore" />
  <GlobalFooter :translation-store="props.translationStore" />
</template>
