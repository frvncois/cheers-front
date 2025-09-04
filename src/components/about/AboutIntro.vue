<script setup>
import { computed } from 'vue'
import { useContentStore } from '@/stores/content.js'

const contentStore = useContentStore()

const mission = computed(() => {
  return contentStore.about?.Mission || ''
})

const missionImage = computed(() => {
  if (!contentStore.about?.Image_Mission) return null
  const baseURL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'
  return `${baseURL}${contentStore.about.Image_Mission.url}`
})
</script>

<template>
    <section data-bg="light">
        <div class="intro">
            <div class="is-content">
                <h2 data-animate="fade" data-animate-duration="1000"> Chaque gramme<br>est le fruit de<br>notre savoir-faire</h2>
                <p data-animate="fade" data-animate-duration="1000">{{ mission }}</p>
            </div>
            <div class="is-action">
              <img
                v-if="missionImage"
                :src="missionImage"
                alt="Mission image"
                data-animate="reveal"
                data-animate-duration="2000"
              >
                <button>Contactez-nous</button>
            </div>
        </div>
    </section>
</template>

<style scoped>
section {
    background: var(--light);
    color: var(--purple);
   > .intro {
    display: flex;
    gap: var(--space-md);
    padding: 0 var(--space-xl) var(--space-xl) var(--space-xl);
    > .is-content {
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
        padding: var(--space-rg) 0;
        flex: 1;
        > h2 {
            font-size: var(--font-lg);
        }
        > p {
            max-width: 50ch;
        }
    }
    > .is-action {
        flex: 1;
        width: 100%;
        overflow: hidden;
        background: var(--purple);
        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
}


</style>





