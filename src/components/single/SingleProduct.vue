<script setup>
import { computed, ref } from 'vue'
import ButtonBorder from '@/assets/ButtonBorder.vue'

const props = defineProps({
  product: {
    type: Object,
    default: null
  }
})

const currentSlide = ref(0)

const aromaText = computed(() => {
  if (!props.product?.Aroma?.notes) return ''
  return props.product.Aroma.notes.join(', ')
})

const thcText = computed(() => {
  if (!props.product?.THCmin && !props.product?.THCmax) return 'N/A'
  if (props.product.THCmin === props.product.THCmax) return props.product.THCmin
  return `${props.product.THCmin || '0'} - ${props.product.THCmax || '0'}`
})

const cbdText = computed(() => {
  if (!props.product?.CBDmin && !props.product?.CBDmax) return 'N/A'
  if (props.product.CBDmin === props.product.CBDmax) return props.product.CBDmin
  return `${props.product.CBDmin || '0'} - ${props.product.CBDmax || '0'}`
})

const goToSlide = (index) => {
  currentSlide.value = index
}

const images = computed(() => props.product?.Images || [])
</script>

<template>
  <section>
    <div class="single" v-if="product">
      <div class="is-image">
        <div class="is-slider" v-if="images.length > 0">
          <div class="is-slides">
            <img 
              v-for="(image, index) in images" 
              :key="image.id"
              :src="image.url" 
              :alt="image.name"
              :class="{ 'is-active': index === currentSlide }"
              data-animate="reveal" 
              data-animate-duration="1000"
            />
          </div>
          <div class="is-dots" v-if="images.length > 1">
            <div
              v-for="(image, index) in images"
              :key="`dot-${image.id}`"
              @click="goToSlide(index)"
              :class="{ 'is-active': index === currentSlide }"
              class="is-dot"
            ></div>
          </div>
        </div>
      </div>
      <div class="is-content">
        <div class="is-title">
          <h1 data-animate="reveal" data-animate-duration="1000">{{ product.Title }}</h1>
          <h2 data-animate="fade" data-animate-delay="500">{{ product.Category }}</h2>
        </div>
        <div class="is-details" data-animate="fade" data-animate-delay="500">
          <div>{{ aromaText }}</div>
          <div>{{ product.Terpenes }}</div>
          <div>{{ product.Format }}</div>
          <div>{{ product.Parent }}</div>
          <div><span>THC {{ thcText }}</span><span>CBD {{ cbdText }}</span></div>
        </div>
        <div class="is-description" data-animate="fade" data-animate-delay="750">
<p v-for="block in product.Description" :key="block.id">
    <span v-for="child in block.children" :key="child.id">{{ child.text }}</span>
  </p>
          <a :href="product.Link?.startsWith('http') ? product.Link : `https://${product.Link}`" target="_blank">Acheter<ButtonBorder /></a>
        </div>
      </div>
    </div>
    <div v-else class="single">
      <div class="is-content">
        <div class="is-title">
          <h1>Product not found</h1>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.single {
  display: flex;
  gap: var(--space-md);
  padding: var(--space-rg);
  
  > .is-image {
    flex: 1;
    
    > .is-slider {
      position: relative;
      width: 100%;
      
      > .is-slides {
        position: relative;
        width: 100%;
        overflow: hidden;
        aspect-ratio: 1;
        
        > img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 0.3s ease;
          
          &.is-active {
            opacity: 1;
            position: relative;
          }
        }
      }
      
      > .is-dots {
        display: flex;
        justify-content: center;
        gap: var(--space-sm);
        margin-top: var(--space-sm);
        
        > .is-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: background 0.3s ease;
          
          &.is-active {
            background: rgba(255, 255, 255, 0.8);
          }
          
          &:hover {
            background: rgba(255, 255, 255, 0.6);
          }
        }
      }
    }
  }
  
  > .is-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    
    > .is-title {
      display: flex;
      justify-content: space-between;
      
      > h1 {
        font-size: var(--font-xl);
      }
    }
    
    > .is-details {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: var(--space-md);
      row-gap: var(--space-sm);
      
      > div:nth-child(2) {
        grid-column: span 2;
      }
      
      > div:nth-child(5) {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
    
    }
    
    > .is-description {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      
      > a {
        position: relative;
        z-index: 1;
        padding: 2.5em;
        
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
    }
  }
}

@media screen and (max-width: 768px) {
  .single {
    flex-direction: column;
  }
}
</style>
