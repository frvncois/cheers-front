<template>
  <section>
    <div class="intro">
      <div data-animate="reveal" data-animate-delay="500" class="is-cover">
        <img src="~@/assets/intro.png" alt="Introduction Image"/>
      </div>
    </div>
    <div class="marquee" ref="sectionRef">
      <div class="is-wrap">
        <div class="is-track" ref="marqueeRef">
          <div class="is-items">
            <div class="txt">
              <h1>Suivez-nous</h1>
            </div>
            <div class="img">
              <Element01 />
            </div>
            <div class="txt">
              <h1>Sur instagram</h1>
            </div>
            <div class="img">
              <Element02 />
            </div>
            <div class="txt">
              <h1>Suivez-nous</h1>
            </div>
            <div class="img">
              <Element03 />
            </div>
            <div class="txt">
              <h1>Sur instagram</h1>
            </div>
            <div class="img">
              <Element01 />
            </div>
            <div class="txt">
              <h1>Suivez-nous</h1>
            </div>
            <div class="img">
              <Element02 />
            </div>
            <div class="txt">
              <h1>Sur instagram</h1>
            </div>
            <div class="img">
              <Element03 />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="about">
      <div class="is-title">
        <h2 data-animate="reveal" data-animate-delay="500">Cultivé avec <br>passion</h2>
        <h2 data-animate="reveal" data-animate-delay="500">Partagé avec <br>plaisir</h2>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Element01 from '@/assets/Element01.vue'
import Element02 from '@/assets/Element02.vue'
import Element03 from '@/assets/Element03.vue'

const sectionRef = ref(null)
const marqueeRef = ref(null)

const handleScroll = () => {
  if (!sectionRef.value || !marqueeRef.value) return
  
  const section = sectionRef.value
  const marquee = marqueeRef.value
  
  // Get section bounds
  const sectionRect = section.getBoundingClientRect()
  const sectionTop = sectionRect.top
  const sectionHeight = sectionRect.height
  const windowHeight = window.innerHeight
  
  const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)))
  
  const translateX = -scrollProgress * 50
  
  // Apply transform
  marquee.style.transform = `translateX(${translateX}%)`
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.intro {
  > .is-cover {
    width: 30em;
    aspect-ratio: 1;
    overflow: hidden;
    margin: auto;
    position: relative;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.marquee {
  > .is-wrap {
    display: flex;
    overflow: hidden;
    justify-content: center;
    gap: var(--space-lg);
    padding: var(--space-lg) 0;
    > .is-track {
      display: flex;
      min-width: 200vw;
      align-items: center;
      justify-content: space-between;
    }
    & .is-items {
      display: flex;
      align-items: center;
      gap: var(--space-rg);
      > .txt {
        white-space: nowrap;
        font-size: var(--font-xl);
      }
    }
    & img {
      width: 10em;
    }
  }
}

.about {
  > .is-title {
    display: flex;
    flex: 0 0 100%;
    flex-direction: row;
    padding: var(--space-rg);
    justify-content: space-between;
    position: relative;
    > h2:last-child {
      text-align: right;
    }
  }
}
</style>