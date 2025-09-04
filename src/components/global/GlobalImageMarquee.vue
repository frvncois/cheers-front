<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  }
})

const sliderRef = ref(null)
const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)

const startDrag = (e) => {
  isDragging.value = true
  startX.value = e.pageX - sliderRef.value.offsetLeft
  scrollLeft.value = sliderRef.value.scrollLeft
}

const drag = (e) => {
  if (!isDragging.value) return
  e.preventDefault()
  const x = e.pageX - sliderRef.value.offsetLeft
  const walk = (x - startX.value) * 2
  sliderRef.value.scrollLeft = scrollLeft.value - walk
}

const endDrag = () => {
  isDragging.value = false
}

const galleryImages = computed(() => {
  const baseURL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'
  
  return props.images.map((image, index) => ({
    id: image.id || index,
    url: `${baseURL}${image.url}`,
    alt: image.alternativeText || image.name || `Gallery image ${index + 1}`,
    name: image.name || `Image ${index + 1}`
  }))
})
</script>

<template>
  <section data-bg="purple">
    <div class="slider">
      <div class="is-container">
        <ul 
          class="is-items"
          ref="sliderRef"
          @mousedown="startDrag"
          @mousemove="drag"
          @mouseup="endDrag"
          @mouseleave="endDrag"
        >
          <li 
            v-for="(image, index) in galleryImages" 
            :key="image.id"
            class="is-item" 
          >
            <img 
                        data-animate="reveal" 
            :data-animate-delay="index * 100" 
            data-animate-duration="1000"
              :src="image.url" 
              :alt="image.alt"
            />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.slider {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  > .is-container {
    overflow: hidden;
    > .is-items {
      display: flex;
      overflow-x: auto;
      gap: var(--space-rg);
      padding: var(--space-rg);
      cursor: grab;
      scrollbar-width: none;
      -ms-overflow-style: none;
      > .is-item {
        background: var(--accent);
        flex: 0 0 20vw;
        height: 30em;
        overflow: hidden;
        &:nth-child(2) {
          flex: 0 0 40vw;
        }
        &:nth-child(3) {
          flex: 0 0 25vw;
        }
        &:nth-child(4) {
          flex: 0 0 40vw;
        }
        &:nth-child(5) {
          flex: 0 0 20vw;
        }
        &:nth-child(6) {
          flex: 0 0 50vw;
        }
        & img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          pointer-events: none;
          user-select: none;
        }
      }
    }
  }
}

.is-items::-webkit-scrollbar {
  display: none;
}

.is-items:active {
  cursor: grabbing;
}

@media screen and (max-width: 768px) {
  .slider {
    flex-direction: column;
    gap: 0;
    & .is-items {
    gap: var(--space-sm)!important;
      padding: var(--space-sm)!important;
      > .is-item {
        flex: 0 0 60vw!important;
        > .is-details {
          grid-template-columns: 1fr 1fr;
          & img {
            right: -5em;
          }
        }
      }
    }
  }
}
</style>