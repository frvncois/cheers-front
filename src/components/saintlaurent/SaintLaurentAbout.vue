<script setup>
import { computed } from 'vue'
import ButtonBorder from '@/assets/ButtonBorder.vue'

const props = defineProps({
  content: {
    type: Object,
    default: () => ({})
  },
  translationStore: {
    type: Object,
    required: true
  }
})


const t = computed(() => props.translationStore.t)


const aboutTitle = computed(() => {
  return props.content?.AboutTitle || props.translationStore.translations.saintLaurent[props.translationStore.currentLanguage].aboutTitle
})


const aboutDescription1 = computed(() => {
  return props.content?.Intro || props.translationStore.translations.saintLaurent[props.translationStore.currentLanguage].aboutDescription1
})

const aboutTitle2 = computed(() => {
  return props.content?.AboutTitle2 || props.translationStore.translations.saintLaurent[props.translationStore.currentLanguage].aboutTitle2
})

const aboutDescription2 = computed(() => {
  return props.content?.About || props.translationStore.translations.saintLaurent[props.translationStore.currentLanguage].aboutDescription2
})

const aboutDescription3 = computed(() => {
  return props.content?.Mission || props.translationStore.translations.saintLaurent[props.translationStore.currentLanguage].aboutDescription3
})

const whereToBuy = computed(() => {
  return props.content?.WhereToBuy || props.translationStore.translations.saintLaurent[props.translationStore.currentLanguage].whereToBuy
})
</script>

<template>
  <section data-bg="green">
    <div class="about">
      <div class="is-content">
        <h2 data-animate="reveal" data-animate-delay="500">{{ aboutTitle }}</h2>
        <p data-animate="fade" data-animate-delay="350" data-animate-duration="500">
          {{ aboutDescription1 }}
        </p>
        <h2 data-animate="reveal" data-animate-delay="500">{{ aboutTitle2 }}</h2>
        <p data-animate="fade" data-animate-delay="350" data-animate-duration="500">
          {{ aboutDescription2 }}
        </p>
      </div>
      <div class="is-content" data-animate="fade" data-animate-delay="250" data-animate-duration="200">
        <p data-animate="fade" data-animate-delay="350" data-animate-duration="500">
          {{ aboutDescription3 }}
        </p>
        <router-link to="/products">
          <span>{{ whereToBuy }}</span>
          <ButtonBorder />
        </router-link>
      </div>
    </div>
  </section> 
</template>

<style scoped>
.about {
  display: flex;
  gap: var(--space-xl);
  padding: var(--space-lg) var(--space-2xl);
  flex-wrap: wrap;
  background: var(--green);
  color: var(--light);
  > .is-content {
    display: flex;
    flex: 0 0 calc(50% - var(--space-lg));
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-md);
  }
  & a {
      position: relative;
      z-index: 1;
      padding: 2.5em;
    }
    & svg {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
}

@media screen and (max-width: 768px) {
  .about {
    flex-direction: column;
    padding: var(--space-sm);
    padding-top: var(--space-xl);
    > .is-content  a { 
      margin: auto;
    }
  }
}
</style>