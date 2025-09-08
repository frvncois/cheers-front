<script setup>
import ButtonMailing from '@/assets/ButtonMailing.vue';
import ButtonBorder from '@/assets/ButtonBorder.vue';

const props = defineProps({
  translationStore: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section data-bg="yellow">
    <div class="contact">
      <div class="is-content">
        <h1 data-animate="fade" data-animate-duration="1000" v-html="props.translationStore.translations.contact[props.translationStore.currentLanguage].contactUs"></h1>
        <p data-animate="fade" data-animate-delay="150">{{ props.translationStore.translations.contact[props.translationStore.currentLanguage].description }}</p>
        <a data-animate="fade" data-animate-delay="200">{{ props.translationStore.translations.contact[props.translationStore.currentLanguage].email }}</a>
        <p data-animate="fade" data-animate-delay="250" v-html="props.translationStore.translations.contact[props.translationStore.currentLanguage].address"></p>
      </div>
      <form class="is-form" data-animate="reveal" data-animate-delay="250">
        <div>
          <label>{{ props.translationStore.translations.contact[props.translationStore.currentLanguage].lastName }}</label>
          <input :placeholder="props.translationStore.translations.contact[props.translationStore.currentLanguage].lastNamePlaceholder"/>
        </div>
        <div>
          <label>{{ props.translationStore.translations.contact[props.translationStore.currentLanguage].firstName }}</label>
          <input :placeholder="props.translationStore.translations.contact[props.translationStore.currentLanguage].firstNamePlaceholder"/>
        </div>
        <div>
          <label>{{ props.translationStore.translations.contact[props.translationStore.currentLanguage].emailLabel }}</label>
          <input :placeholder="props.translationStore.translations.contact[props.translationStore.currentLanguage].emailPlaceholder"/>
        </div>
        <div>
          <label>{{ props.translationStore.translations.contact[props.translationStore.currentLanguage].subject }}</label>
          <input :placeholder="props.translationStore.translations.contact[props.translationStore.currentLanguage].subjectPlaceholder"/>
        </div>
        <div>
          <label>{{ props.translationStore.translations.contact[props.translationStore.currentLanguage].message }}</label>
          <textarea :placeholder="props.translationStore.translations.contact[props.translationStore.currentLanguage].messagePlaceholder"></textarea>
        </div>
        <button>{{ props.translationStore.translations.contact[props.translationStore.currentLanguage].send }}<ButtonMailing/><ButtonBorder /></button>
      </form>
    </div>
    <div class="overlay">
      <div class="is-image">
        <img speed="-0.5" src="@/assets/hero.png" alt="Contact Cover"/>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
    > .contact {
        display: flex;
        flex-direction: row;
        padding: var(--space-2xl);
        gap: var(--space-lg);
    background: var(--yellow);
    color: var(--purple);
    position: relative;
        > .is-content {
            display: flex;
            flex-direction: column;
            flex: 1;
            gap: var(--font-xl);
            > h1 {
                font-size: var(--font-xl);
            }
        }
        > .is-form {
            display: flex;
            flex-direction: column;
            flex: 1;
            gap: var(--space-rg);
            > div {
                display: flex;
                flex-direction: column;
            }
        }
    }
    > .cover {
        flex: 1;
        overflow: hidden;
        display: flex;
        align-items: center;
        padding-bottom: var(--space-lg);
        > .is-image {
            height: 100%;
            margin: auto;
            > img {
                height: 100%;
                object-fit: cover;
            }
        }
    }
    > .overlay {
        position: absolute;
        top: 70vh;
        width: 25em;
        height: 100%;
        pointer-events: none;
        > .is-image {
            width: 25em;
            height: 100%;
            margin: auto;
            transform: rotate(15deg);
            
            > img {
                width: 45em;
                height: 100%;
                object-fit: contain;
                margin-left: -20em;
            }
        }
    }
    & input, textarea {
        background: transparent;
        border: unset;
        border-bottom: 1px solid var(--purple);
        font-family: 'body';
        font-size: var(--font-md);
        padding: var(--space-xs) 0;
        resize: none;
        :focus {
            outline: none;
        }
    }
    & button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        gap: var(--space-xs);
        position: relative;
        padding-right: 2.5ch;
        > svg:nth-child(2) {
            position: absolute;
            width: 10em;
            height: 100%;
            top: 0;
            right: 0;
            margin-right: 0;
            bottom: 0;
        }
    }
}

@media screen and (max-width: 768px) {
section {
  > .contact {
      padding: var(--space-lg);
      padding-top: 50vh;
      flex-direction: column;
    }
    > .overlay {
        display: none;
    }
    > .cover {
        display: none;
    }
  }
}
</style>