<template>
  <section data-bg="purple">
    <div class="cta">
      <div class="is-content">
        <h2 data-animate="fade" data-animate-delay="500">
          {{ translationStore.translations.home[translationStore.currentLanguage].passionateProducer }}
        </h2>
        <div class="is-title">
          <div>
            <h1 
              data-animate="fade-up" 
              data-animate-delay="150" 
              data-animate-duration="1000"
            >
              {{ translationStore.translations.home[translationStore.currentLanguage].produceA }} 
              <span>{{ translationStore.translations.home[translationStore.currentLanguage].cannabis }}</span>
            </h1>
          </div>
          <div>
            <h1 
              data-animate="fade-up" 
              data-animate-delay="350" 
              data-animate-duration="1000"
            >
              {{ translationStore.translations.home[translationStore.currentLanguage].thatHonors }} 
              <span>{{ translationStore.translations.home[translationStore.currentLanguage].honor }}</span> 
              <template v-if="translationStore.translations.home[translationStore.currentLanguage].toThe">
                {{ translationStore.translations.home[translationStore.currentLanguage].toThe }}
              </template>
            </h1>
          </div>
          <div>
            <h1 
              data-animate="fade-up" 
              data-animate-delay="500" 
              data-animate-duration="1000"
            >
              <template v-if="translationStore.translations.home[translationStore.currentLanguage].toThe">
                {{ translationStore.translations.home[translationStore.currentLanguage].toThe }} 
              </template>
              <span>{{ translationStore.translations.home[translationStore.currentLanguage].culture }}</span>
            </h1>
          </div>
        </div>
        <h2 data-animate="fade" data-animate-delay="500">
          {{ translationStore.translations.home[translationStore.currentLanguage].qualityCannabis }}
        </h2>
      </div>
      <div speed="-0.5" class="is-image">
        <img src="@/assets/cup.png"/>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  translationStore: {
    type: Object,
    required: true
  }
})

const translationStore = props.translationStore
</script>


<style scoped>
.cta {
 > .is-content {
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: end;
text-align: center;
padding: var(--space-rg);
> .is-title div {
  overflow: hidden;
}
 > div {
flex-shrink: 0;
 &:last-child {
 text-align: right;
}
 }
 & h1 {
font-size: var(--font-xl);
}
 & h1 span {
font-family: 'italic';
}
 }
> .is-image {
display: flex;
flex: 1;
margin-top: -6em;
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
      height: 75vh;
    }

    > .is-image {
      position: absolute;
      top: var(--space-lg);
      width: 100vw;
      height: 75vh;
      margin-top: 1em;
      > img {
        height: 25vh;
      }
    }
    h2 {
      grid-column: 1;
      grid-row: 2; 
      text-align: left;
    }

    .is-title {
      grid-column: span 2;
    }

    h2:nth-child(3) {
      grid-column: 2;
      grid-row: 2;
      text-align: right;
}
  }

  }
</style>