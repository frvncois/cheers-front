<script setup>
import Element03 from '@/assets/Element03.vue';

const props = defineProps({
  translationStore: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section>
    <div class="about">
      <div class="is-content">
        <Element03/>
        <h2 data-animate="fade" data-animate-duration="2500" v-html="props.translationStore.translations.products[props.translationStore.currentLanguage].craftsmanshipTitle"></h2>
        <p data-animate="fade" data-animate-delay="250">{{ props.translationStore.translations.products[props.translationStore.currentLanguage].aboutDescription }}</p>
      </div>
      <div class="is-cover" data-animate="reveal">
        <img src="@/assets/intro.png"/>
      </div>
    </div>
  </section>
</template>


<style scoped>
.about {
    display: flex;
    gap: var(--space-md);
    padding: var(--space-rg);
    margin-top: var(--space-xl);
    > .is-content {
        display: flex;
        position: relative;
        flex-direction: column;
        gap: var(--space-md);
        padding: var(--space-rg) 0;
        flex: 1;
        > h2 {
            font-size: var(--font-lg);
        }
        > p {
            max-width: 50ch;
        }
        > svg {
            position: absolute;
            top: var(--space-rg);
            right: 0;
        }
    }
    > .is-cover {
        flex: 1;
        width: 100%;
        overflow: hidden;
        background: red;
        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}

@media screen and (max-width: 768px) {
    .about {
        flex-direction: column-reverse;
        margin-top: unset;
        gap: unset;
        > .is-content {
            order: 2;
        }
        > .is-cover {
            order: 1;
        }
    }
}
</style>