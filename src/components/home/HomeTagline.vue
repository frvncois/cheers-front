<template>
  <section data-bg="purple">
    <div class="tagline">
      <div class="is-content">
        <div class="is-image">
          <img
            v-if="introImage"
            :src="introImage"
            alt="Intro image"
            data-animate="reveal"
            data-animate-duration="2000"
            data-animate-delay="0"
            speed="-0.75"
          >
        </div>
        <div class="is-title" animte="fade-up">
          <h1 v-html="translationStore.translations.home[translationStore.currentLanguage].taglineText"></h1>
        </div>
        <div class="is-image">
          <img
            v-if="intro2Image"
            :src="intro2Image"
            alt="Intro image"
            data-animate="reveal"
            data-animate-duration="2000"
            data-animate-delay="0"
            speed="0.75"
          >
        </div>
      </div>
      <div class="is-cover">
        <img
          v-if="intro3Image"
          :src="intro3Image"
          alt="Intro image"
          data-animate="reveal"
          data-animate-duration="2000"
          data-animate-delay="0"
          speed="0.75"
        >
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useContentStore } from '@/stores/content.js'

const props = defineProps({
  translationStore: {
    type: Object,
    required: true
  }
})

const translationStore = props.translationStore
const contentStore = useContentStore()

const intro = computed(() => {
  return contentStore.home?.Intro || ''
})

const introImage = computed(() => {
  if (!contentStore.home?.Image01_CTA?.url) return null
  return contentStore.home.Image01_CTA.url
})

const intro2Image = computed(() => {
  if (!contentStore.home?.Image02_CTA?.url) return null
  return contentStore.home.Image02_CTA.url
})

const intro3Image = computed(() => {
  if (!contentStore.home?.Image03_CTA?.url) return null
  return contentStore.home.Image03_CTA.url
})
</script>

<style scoped>
.tagline {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: var(--space-rg);
    gap: var(--space-lg);
    > .is-content {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
        > .is-image {
          display: flex;
          align-items: center;
          overflow: hidden;
          position: relative;
          aspect-ratio: 1;
          flex: 1;
          height: 100%;
          width: 100%;
          background: var(--accent);
          &:last-child {
            margin-top: 30%;
          }
          > img {
            position: absolute;
            width: 100%;
            object-fit: cover;
            height: 150%;
          }
        }
        > .is-title {
        flex: 1;
        aspect-ratio: 1/2;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        > h1 {
            font-size: var(--font-lg);
        }
        }
    }
    > .is-cover {
        overflow: hidden;
        height: 50vh;
        position: relative;
        background: var(--accent);
        > img {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 200%;
          object-fit: cover;
        }
    }
}

@media screen and (max-width: 768px) {
    .tagline {
    display: none;
    }
}
</style>