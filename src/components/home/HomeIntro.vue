<script setup>
import { computed } from 'vue'
import { useContentStore } from '@/stores/content.js'
import Element01 from '@/assets/Element01.vue'
import ButtonBorder from '@/assets/ButtonBorder.vue'

const contentStore = useContentStore()

const intro = computed(() => {
  return contentStore.home?.Intro || ''
})

const introImage = computed(() => {
  if (!contentStore.home?.Intro_Image) return null
  const baseURL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'
  return `${baseURL}${contentStore.home.Intro_Image.url}`
})

</script>

<template>
  <section>
    <div class="intro">
      <div class="is-title">
        <h2 data-animate="reveal">Cultivé avec <br>passion</h2>
        <img src="@/assets/hero.png" speed="-0.5"/>
        <h2 data-animate="reveal">Partagé avec <br>plaisir</h2>
      </div>
    </div>
    <div class="about">
      <div class="is-content">
        <p data-animate="fade" data-animate-delay="350" data-animate-duration="1000">
          {{ intro }}
        </p>
        <button data-animate="fade" data-animate-delay="550" data-animate-duration="1000">
          <router-link to="/about">En savoir plus</router-link>
        </button>
      </div>
      <div class="is-actions" data-animate="fade" data-animate-delay="250" data-animate-duration="200">
        <button>
          <span>Où acheter</span>
          <ButtonBorder />
        </button>
      </div>
      <div class="is-cover">
        <img
          v-if="introImage"
          :src="introImage"
          alt="Intro image"
          data-animate="reveal"
          data-animate-duration="2000"
          speed="-0.75"
        >
      </div>
      <div class="is-title">
        <h2 data-animate="reveal" data-animate-delay="500">Cultivé avec <br>passion</h2>
        <Element01/>
        <h2 data-animate="reveal" data-animate-delay="500">Partagé avec <br>plaisir</h2>
      </div>
    </div>
  </section>
</template>

<style scoped>
.intro {
  display: flex;
  flex-direction: column;
  padding: var(--space-rg);
  margin-bottom: var(--space-xl);
  position: relative;
  > .is-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  > .is-title img {
    position: absolute;
    height: clamp(10em, 50vw, 30em);
    width: 100%;
    object-fit: contain;
    object-position: center;
    pointer-events: none;
    bottom: -10em;
    left: 0;
    right: 0;
  }
  > .is-title h2:last-child {
    text-align: right;
  }
}

.about {
  display: flex;
  gap: var(--space-md);
  padding: var(--space-rg);
  flex-wrap: wrap;
  justify-content: space-between;
  > .is-cover {
    display: flex;
    flex: 0 0 100%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    height: 50vh;
    background: var(--accent);
  }
  > .is-cover img {
    position: absolute;
    width: 100%;
    height: 150%;
    object-fit: cover;
  }
  > .is-actions {
    display: flex;
    flex: 0 0 calc(50% - var(--space-rg));
    align-items: flex-start;
    justify-content: flex-end;
    > button {
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
  > .is-content {
    display: flex;
    flex: 0 0 calc(50% - var(--space-rg));
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
  > .is-title {
    display: flex;
    flex: 0 0 100%;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    > h2:last-child {
      text-align: right;
    }
  }
}

@media screen and (max-width: 768px) {
  .about {
    flex-direction: column;
    >  .is-actions {
      justify-content: center;
    }
  }
}
</style>