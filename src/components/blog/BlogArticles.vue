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

const articles = computed(() => contentStore.publishedBlogPosts || [])

const getArticleImage = (article) => {
  if (!article) return null
  return article?.Cover?.url || null
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
            <span>
              {{
                props.translationStore.translations.blog[
                  props.translationStore.currentLanguage
                ].noImage
              }}
            </span>
          </div>
        </div>

        <div class="is-content">
          <h1>{{ article.Title }}</h1>
          <p>{{ article.Intro }}</p>
          <router-link
            :to="`/blog/${article.documentId}`"
            class="read-more"
          >
            {{
              props.translationStore.translations.blog[
                props.translationStore.currentLanguage
              ].readMore
            }}
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
      border-radius: var(--radius-md);
      overflow: hidden;
      background: #f5f5f5;
      position: relative;

      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      > .placeholder-image {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        background: #ddd;
        color: #666;
        font-size: var(--font-sm);
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
    padding: 0;
    > .is-item {
      display: flex;
      flex-direction: column;
      padding: var(--space-sm);
    }
  }
}
</style>
