<template>
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      :width="svgWidth" 
      :height="svgHeight" 
      :viewBox="viewBox"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      class="morphing-svg"
    >
      <path 
        :d="currentPath" 
        :transform="currentTransform"
        fill="none" 
        stroke="currentColor" 
        stroke-width="0.556"
        class="animated-path"
      />
    </svg>
</template>

<script setup>
import { ref, computed } from 'vue'

const isHovered = ref(false)
const initialPath = "M74.676,4.147c20.509-4.321,141.5-14.585,109.446,35.836C121.192,117.009-110.343,43.124,74.676,4.147Z"
const hoverPath = "M74.676,97.185c39.758-.014,149.54,13.528,109.446,35.836C52.193,206.425-90.417,97.241,74.676,97.185Z"
const initialTransform = "translate(-4.077 0.016)"
const hoverTransform = "translate(0.042 -96.907)"
const currentPath = computed(() => {
  return isHovered.value ? hoverPath : initialPath
})

const currentTransform = computed(() => {
  return isHovered.value ? hoverTransform : initialTransform
})

const svgWidth = computed(() => {
  return isHovered.value ? "193.112" : "185.72"
})

const svgHeight = computed(() => {
  return isHovered.value ? "61.769" : "73.967"
})

const viewBox = computed(() => {
  return isHovered.value ? "0 0 193.112 61.769" : "0 0 185.72 73.967"
})
</script>
