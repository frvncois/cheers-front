<script setup>
import Element04 from '@/assets/Element04.vue'

const props = defineProps({
  translationStore: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <section data-bg="light">
    <div class="intro" data-animate="reveal" data-animate-duration="1000">
      <Element04 />
      <h1>{{ props.translationStore.translations.policy[props.translationStore.currentLanguage].policyTitle }}</h1>
      <Element04 />
    </div>
  </section>
</template>

<style scoped>
.intro {
  color: var(--purple);
  background: var(--light);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  padding: var(--space-xl) var(--space-rg);
  text-align: center;
  > h1 {
    font-size: var(--font-xl);
  }
}

@media screen and (max-width: 768px) {
  .intro {
    flex-direction: column;
    padding: var(--space-lg) var(--space-sm);
  }
}
</style>
