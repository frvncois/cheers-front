<script setup>
import { computed } from 'vue'
import SaintLaurentLogo from '@/assets/SaintLaurentLogo.vue'

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

// Get translations for Saint-Laurent section
const t = computed(() => props.translationStore.t)

// Get title from Strapi content or fallback to translations
const introTitle1 = computed(() => {
  return props.content?.IntroTitle1 || props.translationStore.translations.saintLaurent[props.translationStore.currentLanguage].introTitle1
})

const introTitle2 = computed(() => {
  return props.content?.IntroTitle2 || props.translationStore.translations.saintLaurent[props.translationStore.currentLanguage].introTitle2
})

// Get Cover image URL from Strapi
const coverImageUrl = computed(() => {
  return props.content?.Cover?.url || null
})
</script>

<template>
  <section data-bg="green">
    <div class="intro">
      <div class="is-title">
        <h2 data-animate="reveal">{{ introTitle1 }}</h2>
        <h2 data-animate="reveal">{{ introTitle2 }}</h2>
      </div>
      <div class="is-logo" data-animate="reveal" data-animate-delay="0" data-animate-duration="1000">
        <SaintLaurentLogo/>
      </div>

      <div class="cover" data-animate="reveal" v-if="coverImageUrl">
        <img :src="coverImageUrl" alt="Saint-Laurent Cover" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.intro {
  display: flex;
  flex-direction: column;
  padding: var(--space-2xl)  var(--space-rg) var(--space-xl) var(--space-rg);
  position: relative;
  background: var(--green);
  gap: var(--space-lg);
  color: var(--light);
  > .is-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  > .is-logo svg {
    width: 100%;
    height: auto;
  }
  > .is-title img {
    position: absolute;
    height: 30em;
    width: 100%;
    object-fit: contain;
    object-position: center;
    pointer-events: none;
    bottom: -12em;
    left: 0;
    right: 0;
  }
  > .is-title h2:last-child {
    text-align: right;
  }
  > .cover {
    width: 100%;
    overflow: hidden;
  }
  > .cover img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
}
.cover {
  aspect-ratio: 16/9;
  overflow: hidden;
}
@media screen and (max-width: 768px) {
  .intro {
    gap: var(--space-rg);
    padding: var(--space-sm);
    padding-top: 50vh;
  }
}
</style>