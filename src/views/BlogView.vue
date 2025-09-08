<script setup>
import BlogArticles from '@/components/blog/BlogArticles.vue';
import BlogFooter from '@/components/blog/BlogFooter.vue';
import BlogIntro from '@/components/blog/BlogIntro.vue';

const props = defineProps({
  translationStore: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <BlogIntro :translation-store="props.translationStore" />
  <BlogArticles :translation-store="props.translationStore" />
  <BlogFooter :translation-store="props.translationStore" />
</template>