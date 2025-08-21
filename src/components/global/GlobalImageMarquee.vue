<script setup>
import { ref } from 'vue'


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
</script>

<template>
  <section>
    <div class="slider">
      <div class="is-container">
        <ul class="is-items" 
            ref="sliderRef"
            @mousedown="startDrag"
            @mousemove="drag"
            @mouseup="endDrag"
            @mouseleave="endDrag">
          <li class="is-item" data-animate="reveal" data-animate-delay="0" data-animate-duration="1000">
            <img src="@/assets/thumb.png"/>
          </li>
          <li class="is-item" data-animate="reveal" data-animate-delay="100" data-animate-duration="1000">
            <img src="@/assets/thumb.png"/>
          </li>
          <li class="is-item" data-animate="reveal" data-animate-delay="200" data-animate-duration="1000">
            <img src="@/assets/thumb.png"/>
          </li>
          <li class="is-item" data-animate="reveal" data-animate-delay="300" data-animate-duration="1000">
            <img src="@/assets/thumb.png"/>
          </li>
          <li class="is-item" data-animate="reveal" data-animate-delay="400" data-animate-duration="1000">
            <img src="@/assets/thumb.png"/>
          </li>
          <li class="is-item" data-animate="reveal" data-animate-delay="500" data-animate-duration="1000">
            <img src="@/assets/thumb.png"/>
          </li>
          <li class="is-item" data-animate="reveal" data-animate-delay="600" data-animate-duration="1000">
            <img src="@/assets/thumb.png"/>
          </li>
          <li class="is-item" data-animate="reveal" data-animate-delay="700" data-animate-duration="1000">
            <img src="@/assets/thumb.png"/>
          </li>
          <li class="is-item" data-animate="reveal" data-animate-delay="800" data-animate-duration="1000">
            <img src="@/assets/thumb.png"/>
          </li>
          <li class="is-item" data-animate="reveal" data-animate-delay="900" data-animate-duration="1000">
            <img src="@/assets/thumb.png"/>
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
                  object-fit: cover;
                  pointer-events: none;
                  user-select: none;
                }
            }
        }
    }
}

.is-wrap {

}

.is-wrap::-webkit-scrollbar {
  display: none;
}

.is-wrap:active {
  cursor: grabbing;
}

.is-item {

}
</style>