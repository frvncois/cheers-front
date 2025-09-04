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
            v-if="article.Cover?.url"
            :src="getStrapiImageUrl(article.Cover.url)"
            :alt="article.Cover.alternativeText || article.Title"
            loading="lazy"
          />
          <div v-else class="placeholder-image">
            <span>No Image</span>
          </div>
        </div>
        <div class="is-content">
          <h1>{{ article.Title }}</h1>
          <p>{{ article.Intro }}</p>
          <router-link 
            :to="`/blog/${article.documentId}`"
            class="read-more"
          >
            Lire la suite
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useContentStore } from '@/stores/content.js'

const contentStore = useContentStore()

// Get published blog articles sorted by publication date
const articles = computed(() => {
  return contentStore.publishedBlogPosts
})

// Helper function to get full Strapi image URL
const getStrapiImageUrl = (url) => {
  if (!url) return ''
  const baseURL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'
  
  // If URL is already absolute, return as is
  if (url.startsWith('http')) {
    return url
  }
  
  // If URL starts with /, prepend base URL
  if (url.startsWith('/')) {
    return `${baseURL}${url}`
  }
  
  // Otherwise, construct full URL
  return `${baseURL}/${url}`
}
</script>


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