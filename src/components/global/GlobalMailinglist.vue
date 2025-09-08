<script setup>
import ButtonMailing from '@/assets/ButtonMailing.vue';
import Element03 from '@/assets/Element03.vue';

const props = defineProps({
  translationStore: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section data-bg="purple">
    <div class="mailinglist" data-animate="fade" data-animate-duration="2000">
      <div>
        <h1 v-html="props.translationStore.translations.newsletter[props.translationStore.currentLanguage].title"></h1>
        <Element03/>
      </div>
      <div>
        <p>{{ props.translationStore.translations.newsletter[props.translationStore.currentLanguage].description }}</p>
        <form>
          <input :placeholder="props.translationStore.translations.newsletter[props.translationStore.currentLanguage].emailPlaceholder"/>
          <button>{{ props.translationStore.translations.newsletter[props.translationStore.currentLanguage].subscribe }}<ButtonMailing/></button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mailinglist {
    display: flex;
    gap: var(--space-xl);
    padding: var(--space-xl) var(--space-2xl);
    > div {
        flex: 1;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
        align-items: stretch;
        
        > svg {
            position: absolute;
            bottom: 0;
            right: 0;
        }
    }
    & input {
        background-color: transparent;
        border: unset;
        border-bottom: 1px solid var(--accent);
        padding: var(--space-sm) 0;
        flex: 1;
        color: var(--yellow);
        &::placeholder {
            color: var(--yellow);
        }
        &:focus {
            outline: unset;
            border-bottom: 1px solid var(--yellow);
        }
    }
    & button {
        background: var(--accent);
        display: flex;
        gap: var(--space-xs);
        align-items: center;
        border-radius: 10em;
        justify-content: center;
        padding: var(--space-sm) var(--space-md);
        transition: all 0.3s ease;
        &:hover {
            background: var(--yellow);
            color: var(--purple);
        }
    }
    & h1 {
        font-size: var(--font-lg);
    }
    & form {    
        display: flex;
        flex: 1;
    }
}

@media screen and (max-width: 768px) {
    .mailinglist {
        flex-direction: column;
        gap: var(--space-md);
        padding: var(--space-xl) var(--space-rg);
        & form {
            flex-direction: column;
            gap: var(--space-sm);
        }
    }
}
</style>