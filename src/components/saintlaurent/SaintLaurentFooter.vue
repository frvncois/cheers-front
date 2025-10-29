<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useContentStore } from '@/stores/content.js'
import CheersLogo from '@/assets/CheersLogo.vue'
import CheersIcon from '@/assets/CheersIcon.vue'
import Element01 from '@/assets/Element01.vue'
import Element02 from '@/assets/Element02.vue'
import Element03 from '@/assets/Element03.vue'

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

const contentStore = useContentStore()
const sectionRef = ref(null)
const marqueeRef = ref(null)

const marqueeText1 = computed(() => {
  return props.content?.MarqueeText1 || 'Cultivons'
})

const marqueeText2 = computed(() => {
  return props.content?.MarqueeText2 || 'Ensemble, partageons'
})

const marqueeText3 = computed(() => {
  return props.content?.MarqueeText3 || 'De la hauteur'
})

const navLinks = computed(() => ({
  home: props.translationStore.translations.navigation[props.translationStore.currentLanguage].home,
  products: props.translationStore.translations.navigation[props.translationStore.currentLanguage].products,
  saintLaurent: props.translationStore.translations.navigation[props.translationStore.currentLanguage].saintLaurent,
  about: props.translationStore.translations.navigation[props.translationStore.currentLanguage].about,
  blog: props.translationStore.translations.navigation[props.translationStore.currentLanguage].blog,
  contact: props.translationStore.translations.navigation[props.translationStore.currentLanguage].contact,
  instagram: props.translationStore.translations.navigation[props.translationStore.currentLanguage].instagram,
  facebook: props.translationStore.translations.navigation[props.translationStore.currentLanguage].facebook,
  newsletter: props.translationStore.translations.navigation[props.translationStore.currentLanguage].newsletter
}))

const copyrightText = computed(() => {
  return props.translationStore.translations.footer[props.translationStore.currentLanguage].copyright
})

const handleScroll = () => {
  if (!sectionRef.value || !marqueeRef.value) return
  
  const section = sectionRef.value
  const marquee = marqueeRef.value
  
  const sectionRect = section.getBoundingClientRect()
  const sectionTop = sectionRect.top
  const sectionHeight = sectionRect.height
  const windowHeight = window.innerHeight
  
  const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)))
  
  const translateX = -scrollProgress * 50
  
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

<template>
  <section data-bg="green">
    <div class="marquee" ref="sectionRef">
      <div class="is-wrap">
        <div class="is-track" ref="marqueeRef">
          <div class="is-items">
            <div class="txt">
              <h1>{{ marqueeText1 }}</h1>
            </div>
            <div class="img">
              <Element01 />
            </div>
            <div class="txt">
              <h1>{{ marqueeText2 }}</h1>
            </div>
            <div class="img">
              <Element02 />
            </div>
            <div class="txt">
              <h1>{{ marqueeText3 }}</h1>
            </div>
            <div class="img">
              <Element03 />
            </div>
            <div class="txt">
              <h1>{{ marqueeText1 }}</h1>
            </div>
            <div class="img">
              <Element01 />
            </div>
            <div class="txt">
              <h1>{{ marqueeText2 }}</h1>
            </div>
            <div class="img">
              <Element02 />
            </div>
            <div class="txt">
              <h1>{{ marqueeText3 }}</h1>
            </div>
            <div class="img">
              <Element03 />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <footer>
      <div class="is-logo" data-animate="reveal" data-animate-duration="1500">
        <CheersLogo/>
      </div>
      <ul>
        <li data-animate="fade" data-animate-delay="500" data-animate-duration="1000">
          <RouterLink to="/">{{ navLinks.home }}</RouterLink>
        </li>
        <li data-animate="fade" data-animate-delay="600" data-animate-duration="1000">
          <RouterLink to="/products">{{ navLinks.products }}</RouterLink>
          <RouterLink to="/saint-laurent">{{ navLinks.saintLaurent }}</RouterLink>
        </li>
        <li data-animate="fade" data-animate-delay="700" data-animate-duration="1000">
          <RouterLink to="/about">{{ navLinks.about }}</RouterLink>
          <RouterLink to="/blog">{{ navLinks.blog }}</RouterLink>
          <RouterLink to="/contact">{{ navLinks.contact }}</RouterLink>
        </li>
        <li data-animate="fade" data-animate-delay="800" data-animate-duration="1000">
          <a href="https://www.instagram.com/cheerscannabis" target="_blank">{{ navLinks.instagram }}</a>
          <a href="https://www.facebook.com/Cheerscannabinc" target="_blank">{{ navLinks.facebook }}</a>
          <a href="https://www.cheerscannabis.com/newsletter" target="_blank">{{ navLinks.newsletter }}</a>
        </li>
        <li class="imprint" data-animate="fade" data-animate-delay="800" data-animate-duration="1000">
          <CheersIcon/>
        </li>
      </ul>
      <div class="imprint" data-animate="fade" data-animate-delay="800" data-animate-duration="1000">
        <p>{{ copyrightText }}</p>
      </div>
    </footer>
  </section>
</template>


<style scoped>
.marquee {
  > .is-wrap {
    display: flex;
    overflow: hidden;
    justify-content: center;
    gap: var(--space-lg);
    padding: var(--space-lg) 0;
    background-color: var(--green);
    color: var(--light);
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

footer {
display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 5;
    background-color: var(--green);
    color: var(--light);
  > ul {
    display: flex;
    padding: var(--space-rg);
    margin-bottom: var(--space-lg);
    > li {
      display: flex;
      flex-direction: column;
      flex: 1;
      &:last-child {
        align-items: end;
      }
    }
  }
  > .is-logo {
    position: relative;
    margin: 0 var(--space-rg);
    > svg {
      width: 100%;
      height: 100%;
    }
  }
  > .imprint {
    padding: var(--space-rg);
  }
}

@media screen and (max-width: 768px) {
  footer {
    gap: var(--space-sm);
  > ul {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-md);
      padding: 0 var(--space-sm);
      margin-bottom: 0;
      & svg {
        display: none;
      }
      }

    > .is-logo {
      margin: var(--space-sm);
    }
    > .imprint {
      padding: var(--space-sm);
      padding-top: unset;
      > p {
        max-width: 18ch;
      }
    }
  }
}
</style>
