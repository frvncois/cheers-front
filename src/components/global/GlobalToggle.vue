<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}

// Your hamburger menu paths
const hamburgerPaths = [
  "M14 18 L54 18 L54 20 L14 20 Z",
  "M29 29 L39 29 L39 31 L29 31 Z", 
  "M14 40 L54 40 L54 42 L14 42 Z",
  "M34 40 L42 40 L42 42 L34 42 Z"
]

// Your organic shape path (scaled to fit 68x60 viewBox)
const organicPath = "M0.076 25.613C8.944 24.561 8.759 19.575 12.976 19.562C15.041 20.078 21.679 25.069 27.656 25.542C25.375 21.820 20.796 17.437 18.090 14.143C17.649 13.608 17.666 12.841 18.125 12.316C20.010 10.138 24.778 5.415 25.973 1.456C21.780 1.203 19.087 4.419 13.545 7.846C9.873 7.695 5.385 0.585 0.297 0.138C2.325 5.010 5.415 8.921 7.932 12.633C7.768 14.727 0.005 22.100 0.076 25.619Z"
</script>

<template>
  <svg 
    width="68" 
    height="60" 
    viewBox="0 0 68 60"
    @click="toggle"
  >
    <!-- Hamburger lines -->
    <g v-if="!isOpen">
      <path 
        v-for="(path, index) in hamburgerPaths" 
        :key="index"
        :d="path" 
        fill="currentColor"
      />
    </g>
    
    <!-- Organic shape -->
    <path 
      v-if="isOpen"
      :d="organicPath" 
      fill="currentColor"
      transform="scale(2.4, 2.3) translate(1, 1)"
    />
    
    <!-- Morphing path -->
    <path
      :d="isOpen ? organicPath : hamburgerPaths.join(' ')"
      fill="currentColor"
      :style="{
        transform: isOpen ? 'scale(2.4, 2.3) translate(1, 1)' : 'scale(1, 1) translate(0, 0)',
        opacity: isOpen ? '1' : '0',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }"
    />
  </svg>
</template>

<style scoped>
svg {
  cursor: pointer;
  color: currentColor;
}
</style>