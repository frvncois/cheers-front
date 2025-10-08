<script setup>
import { computed } from 'vue'

const props = defineProps({
  intro: {
    type: String,
    default: ''
  },
  translationStore: {
    type: Object,
    required: false
  }
})

// 🧠 Use computed for reactivity
const t = computed(() => {
  const store = props.translationStore
  return store?.translations?.products?.[store?.currentLanguage] || {}
})
</script>

<template>
  <section data-bg="purple">
    <div class="title">
      <div class="is-content">
        <div speed="0.5">
          <img src="@/assets/cup.png" />
        </div>

        <!-- ✅ Always safe, reactive -->
        <p data-animate="fade" data-animate-duration="2500">
          {{ props.intro }}
        </p>
      </div>

      <div class="is-bottom">
        <!-- ✅ Guarded dynamic titles -->
        <h2
          v-if="t.cultivatedWithPassion"
          data-animate="reveal"
          data-animate-duration="1000"
          v-html="t.cultivatedWithPassion"
        />
        <h2
          v-if="t.sharedWithPleasure"
          data-animate="reveal"
          data-animate-duration="1000"
          v-html="t.sharedWithPleasure"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.title {
  padding: var(--space-xl) var(--space-rg);

  > .is-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--space-lg);

    > p {
      font-size: var(--font-md);
      max-width: 60ch;
    }

    & img {
      margin-bottom: -2em;
      transform: rotate(-20deg);
    }
  }

  > .is-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > h2:last-child {
      text-align: right;
    }
  }
}

@media screen and (max-width: 768px) {
  .title {
    padding: var(--space-sm);

    p {
      display: none;
    }
  }
}
</style>
