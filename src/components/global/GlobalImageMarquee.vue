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
            data-animate="reveal" 
            :data-animate-delay="index * 100" 
            data-animate-duration="1000"
          >
            <img 
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
        aspect-ratio: 2/3;
        overflow: hidden;
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
</style>