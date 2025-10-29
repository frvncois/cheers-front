<script setup>
import { computed } from 'vue'
import Element03 from '@/assets/Element03.vue'
import introFallback from '@/assets/intro.png'

const props = defineProps({
  translationStore: {
    type: Object,
    required: true
  },
  content: {
    type: Object,
    default: () => ({})
  },
  aboutImageUrl: {
    type: String,
    default: ''
  }
})

const cmsContent = computed(() => props.content || {})

const translations = computed(() => {
  const store = props.translationStore
  return store?.translations?.products?.[store?.currentLanguage] || {}
})

const craftsmanshipTitle = computed(() => {
  return (
    cmsContent.value.About_Title ||
    cmsContent.value.craftsmanshipTitle ||
    cmsContent.value.title ||
    translations.value.craftsmanshipTitle ||
    ''
  )
})

const aboutDescription = computed(() => {
  return (
    cmsContent.value.About_Content ||
    cmsContent.value.aboutDescription ||
    cmsContent.value.description ||
    translations.value.aboutDescription ||
    ''
  )
})

const baseURL = import.meta.env.VITE_STRAPI_URL || 'https://heroic-champion-86333ba9c3.strapiapp.com'

const imageSrc = computed(() => {
  if (props.aboutImageUrl) return props.aboutImageUrl

  const media =
    cmsContent.value.About_Cover ||
    cmsContent.value.aboutCover ||
    cmsContent.value.aboutImage ||
    cmsContent.value.coverImage

  if (typeof media === 'string') {
    if (media.startsWith('http://') || media.startsWith('https://')) {
      return media
    }
    if (media.startsWith('/')) {
      return `${baseURL}${media}`
    }
    return media
  }

  const mediaData = media?.data || media
  const url = mediaData?.attributes?.url || mediaData?.url
  if (url) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }
    return `${baseURL}${url}`
  }

  return introFallback
})
</script>

<template>
  <section>
    <div class="about">
      <div class="is-content">
        <Element03/>
        <h2
          v-if="craftsmanshipTitle"
          data-animate="fade"
          data-animate-duration="2500"
          v-html="craftsmanshipTitle"
        />
        <p
          v-if="aboutDescription"
          data-animate="fade"
          data-animate-delay="250"
        >
          {{ aboutDescription }}
        </p>
      </div>
      <div class="is-cover" data-animate="reveal">
        <img :src="imageSrc" alt="" />
      </div>
    </div>
  </section>
</template>


<style scoped>
.about {
    display: flex;
    gap: var(--space-md);
    padding: var(--space-rg);
    margin-top: var(--space-xl);
    > .is-content {
        display: flex;
        position: relative;
        flex-direction: column;
        gap: var(--space-md);
        padding: var(--space-rg) 0;
        flex: 1;
        > h2 {
            font-size: var(--font-lg);
            max-width: 10ch;
        }
        > p {
            max-width: 50ch;
        }
        > svg {
            position: absolute;
            top: var(--space-rg);
            right: 0;
        }
    }
    > .is-cover {
        flex: 1;
        width: 100%;
        aspect-ratio: 16 / 9;
        overflow: hidden;
        background: red;
        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}

@media screen and (max-width: 768px) {
    .about {
        flex-direction: column-reverse;
        margin-top: unset;
        gap: unset;
        > .is-content {
            order: 2;
        }
        > .is-cover {
            order: 1;
        }
    }
}
</style>
