<script setup>
import ContactForm from '@/components/contact/ContactForm.vue';
import ContactSocials from '@/components/contact/ContactSocials.vue';
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
  <ContactForm :translation-store="props.translationStore" />
  <GlobalTestimonials :translation-store="props.translationStore" />
  <ContactSocials :translation-store="props.translationStore" />
  <GlobalTextMarquee :translation-store="props.translationStore" />
  <GlobalMailinglist :translation-store="props.translationStore" />
  <GlobalFooter :translation-store="props.translationStore" />
</template>