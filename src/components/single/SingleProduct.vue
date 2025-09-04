<script setup>
import { computed } from 'vue'
import ButtonBorder from '@/assets/ButtonBorder.vue'

// Props
const props = defineProps({
  product: {
    type: Object,
    default: null
  }
})

// Helper functions for product data
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
</script>
<template>
  <section>
    <div class="single" v-if="product">
      <div class="is-image">
        <img src="@/assets/thumb.png" data-animate="reveal" data-animate-duration="1000" />
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
          <div class="is-description" data-animate="fade" data-animate-delay="750">
            <p>
              Cette variété de {{ product.Category || 'cannabis' }}, sous forme de fleurs séchées,
              possède une intensité de THC et contient du CBD.
              Elle pourrait laisser une impression d'être plus relaxé.
              Ses terpènes génèrent naturellement des arômes
              {{ aromaText ? aromaText.toLowerCase() : 'variés' }}.
            </p>
            <a>Acheter<ButtonBorder /></a>
          </div>
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
    > img {
      width: 100%;
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
      > div:last-child {
        grid-column: span 2;
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
}

@media screen and (max-width: 768px) {
  .single {
    flex-direction: column;
  }
}
</style>