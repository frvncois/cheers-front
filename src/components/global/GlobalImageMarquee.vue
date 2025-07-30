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
          <li class="is-item">
          </li>
          <li class="is-item">
          </li>
          <li class="is-item">
          </li>
          <li class="is-item">
          </li>
          <li class="is-item">
          </li>
          <li class="is-item">
          </li>
          <li class="is-item">
          </li>
          <li class="is-item">
          </li>
          <li class="is-item">
          </li>
          <li class="is-item">
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
                background: #452833;
                flex: 0 0 20vw;
                aspect-ratio: 1;
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