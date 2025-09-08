<script setup>
import Element04 from '@/assets/Element04.vue';

const props = defineProps({
  translationStore: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section data-bg="light">
    <div class="intro">
      <div class="is-title">
        <h1 data-animate="reveal" data-animate-duration="1000">{{ props.translationStore.translations.blog[props.translationStore.currentLanguage].discover }}</h1>
        <Element04/>
        <h1 data-animate="reveal" data-animate-duration="1000">{{ props.translationStore.translations.blog[props.translationStore.currentLanguage].ourBlog }}</h1>
      </div>
      <div class="is-content">
        <h2>{{ props.translationStore.translations.blog[props.translationStore.currentLanguage].whatsHappening }}</h2>
        <p>{{ props.translationStore.translations.blog[props.translationStore.currentLanguage].blogDescription }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.intro {
    padding: var(--space-xl) var(--space-rg);
    background: var(--light);
    color: var(--purple);
    > .is-title {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: var(--space-lg);
        gap: var(--space-md);
        > h1 {
            font-size: var(--font-xl);
        }
    }
    > .is-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: var(--space-sm);
        > p {
            max-width: 50ch;
        }
    }
}

@media screen and (max-width: 768px) {
  .intro {
    padding: var(--space-sm);
    padding-top: 50vh;
    > .is-title {
        flex-direction: column;
    }
  }
  }
</style>