<script setup>
const props = defineProps({
  translationStore: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section>
    <div class="tagline">
      <div class="is-content">
        <h1 v-html="props.translationStore.translations.about[props.translationStore.currentLanguage].tagline"></h1>
      </div>
      <div class="is-bottom">
        <div>
          <p v-html="props.translationStore.translations.about[props.translationStore.currentLanguage].cultivatedWith"></p>
        </div>
        <div>
          <p v-html="props.translationStore.translations.about[props.translationStore.currentLanguage].sharedWith"></p>
        </div>
      </div>
      <div class="is-images">
        <img speed="0.25" src="@/assets/productTag-01.jpg"/>
        <img speed="0.5" src="@/assets/productTag-02.jpg"/>
      </div>
    </div>
  </section>
</template>


<style scoped>
.tagline {
    display: flex;
    flex-direction: column;
    padding: var(--space-2xl) var(--space-rg);
    position: relative;
    > .is-content {
        display: flex;
        > h1 {
            font-size: var(--font-xl);
            max-width: 10ch;
        }
    }
    > .is-bottom {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid var(--yellow);
        padding: var(--space-sm) 0;
        > div:last-child {
            text-align: right;
        }
    }
    > .is-images {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top:0;
        bottom: 0;
        right: 0;
        left: 0;
        > img {
            height: 25vh;
            position: absolute;
            object-fit: cover;
            &:nth-child(1) {
                left: auto;
                right: auto;
                width: 15em;
                height: 25em;
            }
            &:nth-child(2) {
                right: var(--space-rg);
                top: var(--space-lg);
                width: 45vw;
                height: 20em;
            }
        }
    }
}
</style>