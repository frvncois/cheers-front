<script setup>
const props = defineProps({
  translationStore: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section data-bg="yellow">
    <div class="socials">
      <div class="is-title">
        <h1>{{ props.translationStore.translations.contact[props.translationStore.currentLanguage].findUsOnSocial }}</h1>
        <p>{{ props.translationStore.translations.contact[props.translationStore.currentLanguage].followUsDescription }}</p>
      </div>
      <div class="is-content">
        <a href="https://www.instagram.com/cheerscannabis" target="_blank">
          <h2>{{ props.translationStore.translations.contact[props.translationStore.currentLanguage].instagram }}</h2>
          <p>@cheerscannabis</p>
        </a>
        <a href="https://www.facebook.com/Cheerscannabinc" target="_blank">
          <h2>{{ props.translationStore.translations.contact[props.translationStore.currentLanguage].facebook }}</h2>
          <p>@cheerscannabis</p>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
    background: var(--light);
    color: var(--purple);
    padding: var(--space-xl)  var(--space-2xl);
    > .socials {
        display: flex;
        flex-direction: column;
        gap: var(--space-xl);
        > .is-title {
            display: flex;
            gap: var(--space-lg);
            > h1 {
                flex: 1;
            }
            > p {
                flex: 1;
            }
        }
        > .is-content {
            display: flex;
            > a {
                display: flex;
                flex-direction: column;
                flex: 1;
                align-items: center;
            }
        }
    }
}

@media screen and (max-width: 768px) {
    section {
    background: var(--light);
    color: var(--purple);
    padding: var(--space-xl)  var(--space-2xl);
    > .socials {
        > .is-title {
            flex-direction: column;
        }
        > .is-content {
            flex-direction: column;
            gap: var(--space-lg);
        }
    }
    }
}
</style>