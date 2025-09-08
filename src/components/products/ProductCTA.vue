<script setup>
const props = defineProps({
  translationStore: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="cta">
    <div class="is-content">
      <h2 data-animate="fade-up" data-animate-delay="500" v-html="props.translationStore.translations.products[props.translationStore.currentLanguage].cultivatedWithPassion"></h2>
      <h1 data-animate="reveal" data-animate-duration="2000" v-html="props.translationStore.translations.products[props.translationStore.currentLanguage].craftsmanshipTitle"></h1>
      <h2 data-animate="fade-up" data-animate-delay="500" v-html="props.translationStore.translations.products[props.translationStore.currentLanguage].sharedWithPleasure"></h2>
    </div>
  </div>
</template>


<style scoped>
.cta {
    > .is-content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: var(--space-xl) var(--space-rg);
        > div {
            flex-shrink: 0;
            &:last-child {
                text-align: right;
            }
            h1 {
                font-size: var(--font-xl);
                text-align: center;
            }
        }
    }
    > .is-image {
        display: flex;
        flex: 1;
        margin-top: -4.5em;
        > img {
            margin: auto;
        }
    }
}

@media screen and (max-width: 768px) {
  .cta {
    flex-direction: column;
    gap: 0;
    position: relative;

    >  .is-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-xl);
    h2:first-child {
      grid-column: 1;
      grid-row: 2; 
      text-align: left;

    }

    h1 {
      grid-column: span 2;
      text-align: center;
    }

    h2:last-child {
      grid-column: 2;
      grid-row: 2;
      text-align: right;
    }
    }

    > .is-image {
      position: absolute;
      top: var(--space-lg);
      width: 100vw;
      height: 75vh;
      margin-top: 0;
      > img {
        height: 25vh;
      }
    }
  }

  }
</style>