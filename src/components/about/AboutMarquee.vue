<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useContentStore } from '@/stores/content.js'

const contentStore = useContentStore()

const intro = computed(() => {
  return contentStore.about?.Intro || ''
})

const about = computed(() => {
  return contentStore.about?.About || ''
})

const introImage = computed(() => {
  if (!contentStore.about?.Image_Intro?.url) return null
  return contentStore.about.Image_Intro.url
})

const aboutImage = computed(() => {
  if (!contentStore.about?.About_Image?.url) return null
  return contentStore.about.About_Image.url
})

const itemsRef = ref(null)

const handleScroll = () => {
  if (!itemsRef.value) return
  const section = itemsRef.value.closest('section')
  const rect = section.getBoundingClientRect()
  const sectionHeight = section.offsetHeight
  const viewportHeight = window.innerHeight
  const scrolled = Math.max(0, -rect.top)
  const maxScroll = sectionHeight - viewportHeight
  const progress = Math.min(scrolled / maxScroll, 1)
  const translateX = progress * -100
  itemsRef.value.style.transform = `translateX(${translateX}vw)`
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <section data-bg="light">
    <div class="intro">
      <div class="is-track">
        <div class="is-items" ref="itemsRef">
          <div class="is-item">
            <div class="is-title">
              <h1 data-animate="fade" data-animate-duration="1000">Une histoire<br>de famille</h1>
            </div>
            <div class="is-content">
              <p data-animate="reveal" data-animate-duration="750">{{ intro }}</p>
            </div>
          </div>
          <div class="is-item">
            <div class="is-image"data-animate="fade" data-animate-duration="1000">
              <img
                v-if="introImage"
                :src="introImage"
                alt="Intro image"
                data-animate="reveal"
                data-animate-duration="2000"
              >
              </div>
              <h1 data-animate="reveal" data-animate-duration="1000">Depuis 2018</h1>
          </div>
          <div class="is-item">
              <h1 data-animate="fade" data-animate-duration="750">À Propos</h1>
              <p data-animate="reveal" data-animate-duration="750">{{ about }}</p>
          </div>
          <div class="is-item" >
            <div class="is-image">
              <img
                v-if="aboutImage"
                :src="aboutImage"
                alt="About image"
                data-animate="reveal"
                data-animate-duration="2000"
              >
              </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  background: var(--light);
  color: var(--purple);
}

.intro {
  height: 200vh;
  > .is-track {
    position: sticky;
    height: 100vh;
    top: 0;
    width: 100vw;
    overflow: hidden;
    > .is-items {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-xl);
      width: 200vw;
      height: 100vh;
      transition: transform 0.1s ease-out;
      > .is-item {
        display: flex;
        flex-direction: column;
        padding: var(--space-rg);
        gap: var(--space-lg);
        height: 50vh;
        &:first-child {
          flex: 0.95;
          > .is-title {
            flex: 0.75;
          }
          > .is-content {
            flex: 1;
            width: 50%;
            margin-left: auto;
          }
        }
        &:nth-child(2) {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          text-align: center;
        }
        &:nth-child(3) {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-lg);
          > p {
            max-width: 80ch;
            text-align: left;
          }
        }
        &:last-child {
          width: 20em;
          padding-right: var(--space-xl);
        }
        > .is-image {
          background: var(--purple);
          > img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }
      }
      & h1 {
        font-size: var(--font-xl);
      }
    }
  }
}

@media (max-width: 768px) {
  .intro {
    height: auto;
      > .is-track {
      position: relative;
      height: auto;
      overflow: visible;
      > .is-items {
        width: 100%;
        height: 100%;
        flex-direction: column;
        align-items: stretch;
        transform: none !important;
        gap: 0;
          > .is-item {
          height: auto;
          padding: var(--space-sm);
          &:first-child {
            padding-top: 50vh;
            padding-bottom: 0;
                gap: var(--space-sm);
            & > .is-content {
              flex: 1;
              width: 100%;
              margin-left: unset;
            }
          }
          &:nth-child(2) {
            padding-bottom: unset;
            text-align: left;
            gap: var(--space-sm);
            flex:1;
            > h1 {
              max-width: 5ch;
            }
          }
          &:nth-child(3) {
            padding-top: unset;
            align-items: stretch;
            gap: var(--space-sm);
            > h1 {
              text-align: right;
            }
          }
        }
      }
    }
  }
}

</style>