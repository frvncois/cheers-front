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
  },
  content: {
    type: Object,
    default: () => ({})
  }
})

const cmsContent = computed(() => props.content || {})

const translations = computed(() => {
  const store = props.translationStore
  return store?.translations?.products?.[store?.currentLanguage] || {}
})

const introText = computed(() => {
  return (
    props.intro ||
    cmsContent.value.Intro ||
    cmsContent.value.intro ||
    cmsContent.value.introText ||
    cmsContent.value.description ||
    ''
  )
})

const primaryHeading = computed(() => {
  return (
    cmsContent.value.headingPrimary ||
    cmsContent.value.primaryHeading ||
    cmsContent.value.primaryTitle ||
    cmsContent.value.Primary_Heading ||
    cmsContent.value.cultivatedWithPassion ||
    translations.value.cultivatedWithPassion ||
    null
  )
})

const secondaryHeading = computed(() => {
  return (
    cmsContent.value.headingSecondary ||
    cmsContent.value.secondaryHeading ||
    cmsContent.value.secondaryTitle ||
    cmsContent.value.Secondary_Heading ||
    cmsContent.value.sharedWithPleasure ||
    translations.value.sharedWithPleasure ||
    null
  )
})
</script>

<template>
  <section data-bg="purple">
    <div class="title">
      <div class="is-content">
        <div speed="0.5">
          <img src="@/assets/cup.png" />
        </div>

        <p
          v-if="introText"
          data-animate="fade"
          data-animate-duration="2500"
        >
          {{ introText }}
        </p>
      </div>

      <div class="is-bottom">
        <h2
          v-if="primaryHeading"
          data-animate="reveal"
          data-animate-duration="1000"
          v-html="primaryHeading"
        />
        <h2
          v-if="secondaryHeading"
          data-animate="reveal"
          data-animate-duration="1000"
          v-html="secondaryHeading"
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
