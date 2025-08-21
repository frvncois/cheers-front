<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section>
    <div class="single" v-if="props.product">
      <div class="is-image" >
        <img src="@/assets/thumb.png" data-animate="reveal" data-animate-duration="1000"/>
      </div>
      <div class="is-content">
        <div class="is-title">
          <h1 data-animate="reveal" data-animate-duration="1000">{{ props.product.title }}</h1>
          <h2 data-animate="fade" data-animate-delay="500">{{ props.product.category }}</h2>
        </div>
        
        <div class="is-details" data-animate="fade" data-animate-delay="500">
          <div>{{ props.product.aroma }}</div>
          <div>{{ props.product.terpenes }}</div>
          <div>{{ props.product.format }}</div>
          <div>{{ props.product.parent }}</div>
          <div>THC {{ props.product.thc }} CBD {{ props.product.cbd }}</div>
          <div class="is-description" data-animate="fade" data-animate-delay="750">
            <p>Cette variété de {{ props.product.category }}, sous forme de fleurs séchées, possède une intensité élevée de THC et contient du CBD. Elle pourrait laisser une impression d'être plus relaxé. Ses terpènes génèrent naturellement des arômes {{ props.product.aroma.toLowerCase() }}.</p>
            <button>Acheter</button>
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
            > div:last-child {
               grid-column: span 2;
            }
                    > .is-description {
          margin-top: var(--space-rg);
        }
        }

    }
}
</style>