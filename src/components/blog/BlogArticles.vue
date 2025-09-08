<script setup>
import { computed } from 'vue'
import { useContentStore } from '@/stores/content.js'

const props = defineProps({
  translationStore: {
    type: Object,
    required: true
  }
})

const contentStore = useContentStore()

// Get published blog articles sorted by publication date
const articles = computed(() => {
  return contentStore.publishedBlogPosts
})

// Use content store's getMediaURL method for proper image handling
const getArticleImage = (article) => {
  if (article.Cover?.data) {
    return contentStore.getMediaURL(article.Cover.data)
  } else if (article.Cover?.url) {
    return contentStore.getMediaURL(article.Cover)
  }
  return null
}
</script>

<template>
  <section data-bg="light">
    <div class="articles">
      <div
        v-for="article in articles"
        :key="article.id"
        class="is-item"
      >
        <div class="is-cover">
          <img
            v-if="getArticleImage(article)"
            :src="getArticleImage(article)"
            :alt="article.Cover?.alternativeText || article.Title"
            loading="lazy"
          />
          <div v-else class="placeholder-image">
            <span>{{ props.translationStore.translations.blog[props.translationStore.currentLanguage].noImage }}</span>
          </div>
        </div>
        <div class="is-content">
          <h1>{{ article.Title }}</h1>
          <p>{{ article.Intro }}</p>
          <router-link
            :to="`/blog/${article.documentId}`"
            class="read-more"
          >
            {{ props.translationStore.translations.blog[props.translationStore.currentLanguage].readMore }}
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.articles {
    padding: 0 var(--space-2xl);
    background: var(--light);
    color: var(--purple);
    > .is-item {
        display: grid;
        grid-template-columns: 0.33fr 0.66fr;
        padding: var(--space-md);
        gap: var(--space-md);
        > .is-cover {
            aspect-ratio: 1;
            > img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        > .is-content {
            display: flex;
            flex-direction: column;
            gap: var(--space-rg);
        }
        > h1 {
            font-size: var(--font-xl);
        }
    }
}

@media screen and (max-width: 768px) {
  .articles {
    padding: 0 0;
    > .is-item {
      display: flex;
      padding: var(--space-sm);
      flex-direction: column;
    }
  }
}

</style>